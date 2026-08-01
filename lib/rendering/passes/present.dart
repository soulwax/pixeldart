import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';

final class PresentProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
    String programId = 'present',
  }) => ProgramSource(
    id: programId,
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uTex': 0},
    requiredUniforms: const [],
  );
}

/// §6.1's final stage: NEAREST blit of `sceneColor` to the default (canvas)
/// framebuffer. `bindTarget(null)` targets the canvas per
/// `DrawCommandEncoder`'s contract. [programId] defaults to `'present'` but
/// must be overridden to a distinct value whenever two independently-built
/// graphs share one `ProgramLibrary` and are both live in the same frame
/// loop (as `buildShadowGraph` and `buildDepthDebugGraph` are in the
/// renderer-test bootstrap) — `ProgramLibrary.publish` deletes the
/// *previous* program registered under the same id once a new one compiles,
/// so two `PresentFeature`s both defaulting to `'present'` would have the
/// second one silently invalidate the first's already-compiled program,
/// producing a `useProgram: Object already deleted` GL warning the moment
/// the first graph's present pass runs again.
///
/// [sceneColorResource] defaults to `SafeGraphResources.sceneColor` (version
/// 0) but must be overridden to a later version whenever a pass between the
/// world pass and present also *writes* sceneColor — `buildShadowGraph`'s
/// bloom composite does exactly this (§8.7), and reading the base version
/// there would collide with the graph validator's duplicate-writer check
/// (two passes both declaring a write to `sceneColor#0`) the moment bloom
/// tried to declare its own write. `viewOf` only ever keys off the
/// resource's *name*, never its version, so this override changes nothing
/// about which real GPU object gets bound at runtime — it only changes what
/// the declared graph honestly claims about write ordering.
final class PresentFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final String programId;
  final ResourceRef sceneColorResource;

  PresentFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    this.programId = 'present',
    this.sceneColorResource = SafeGraphResources.sceneColor,
  });

  @override
  String get id => programId;

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'present',
        stage: GraphStage.beforePresent,
        uses: [ResourceUse(sceneColorResource, ResourceAccess.read)],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      PresentProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
        programId: programId,
      ),
    );
    // The present shader draws a full-screen triangle from `gl_VertexID`
    // alone (no vertex attributes) — WebGL2 still requires *some* VAO
    // bound for portability across drivers, so one empty VAO is created
    // once here and reused for the pass's whole lifetime, not per frame.
    final emptyVao = device.createVertexArray();
    return [
      _PresentPass(
        descriptor: PassDescriptor(
          id: 'present',
          stage: GraphStage.beforePresent,
          uses: [ResourceUse(sceneColorResource, ResourceAccess.read)],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        sceneColorResource: sceneColorResource,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _PresentPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final ResourceRef sceneColorResource;

  const _PresentPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.sceneColorResource,
  });

  @override
  void execute(RenderPassContext context) {
    final source =
        context.viewOf(sceneColorResource.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(null);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindVertexArray(emptyVao);
    encoder.bindTexture(0, source.gpuObject);
    encoder.drawArrays(first: 0, count: 3);
  }
}
