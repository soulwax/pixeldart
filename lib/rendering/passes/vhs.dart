import '../api/effects.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'pass_context_impl.dart';
import 'ps1_resources.dart';
import 'vhs_resources.dart';

final class VhsProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'vhs',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uScene': 0, 'uHistory': 1},
    requiredUniforms: const [
      'uTime',
      'uChromaWeight',
      'uTrackingWeight',
      'uNoiseWeight',
      'uHeadSwitchWeight',
      'uDropoutWeight',
      'uGhostWeight',
    ],
  );
}

/// RV-09 rung 4's VHS recording-stage treatment — §6.2's final pre-present
/// stage, reading [Ps1Resources.ps1Output] (the fully composed, graded,
/// PS1-quantized world — §8.10's "preserve the composed world input") and
/// writing [VhsResources.vhsOutput]. Unlike every prior post-DOF stage,
/// this pass also reads its own output back as history one frame later
/// (ghosting's feedback trail), which is why [resolveHistory] exists as a
/// second, independent resolver alongside the graph-declared write — the
/// bootstrap backs the one logical `vhsOutput` name with two physical
/// ping-ponged targets so a single frame's history read and write are never
/// the same GPU object.
///
/// §8.10's "reduced motion halves jitter and disables ghosting" is applied
/// here, in Dart, before any uniform reaches the shader — halving
/// `uTrackingWeight` and zeroing `uGhostWeight` at the CPU side keeps the
/// shader itself a plain six-weight composite with no comfort branching of
/// its own to get wrong.
final class VhsFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveHistory;
  final double Function() resolveTime;

  VhsFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveHistory,
    required this.resolveTime,
  });

  @override
  String get id => 'vhs';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.declareHistoryResource(VhsResources.vhsOutput.name);
    graph.addPass(
      PassDeclaration(
        id: 'vhs',
        stage: GraphStage.afterResolve,
        uses: [
          const ResourceUse(Ps1Resources.ps1Output, ResourceAccess.read),
          const ResourceUse(
            VhsResources.vhsOutput,
            ResourceAccess.historyRead,
          ),
          const ResourceUse(VhsResources.vhsOutput, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      VhsProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    return [
      _VhsPass(
        descriptor: PassDescriptor(
          id: 'vhs',
          stage: GraphStage.afterResolve,
          uses: [
            const ResourceUse(Ps1Resources.ps1Output, ResourceAccess.read),
            const ResourceUse(
              VhsResources.vhsOutput,
              ResourceAccess.historyRead,
            ),
            const ResourceUse(VhsResources.vhsOutput, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveHistory: resolveHistory,
        resolveTime: resolveTime,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _VhsPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveHistory;
  final double Function() resolveTime;

  const _VhsPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveHistory,
    required this.resolveTime,
  });

  @override
  void execute(RenderPassContext context) {
    final sceneView =
        context.viewOf(Ps1Resources.ps1Output.name) as BoundResourceView;
    final outputView =
        context.viewOf(VhsResources.vhsOutput.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final post = context.frameScene.post as PostProcessState;

    // §8.10: "reduced motion halves jitter and disables ghosting."
    final trackingWeight = post.reducedMotion
        ? post.vhsTrackingWeight * 0.5
        : post.vhsTrackingWeight;
    final ghostWeight = post.reducedMotion ? 0.0 : post.vhsGhostWeight;

    encoder.bindTarget(outputView.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, sceneView.gpuObject);
    encoder.setUniform('uScene', const UniformValue.sampler(0));
    encoder.bindTexture(1, resolveHistory());
    encoder.setUniform('uHistory', const UniformValue.sampler(1));
    encoder.setUniform('uTime', UniformValue.float1(resolveTime()));
    encoder.setUniform(
      'uChromaWeight',
      UniformValue.float1(post.vhsChromaWeight),
    );
    encoder.setUniform('uTrackingWeight', UniformValue.float1(trackingWeight));
    encoder.setUniform(
      'uNoiseWeight',
      UniformValue.float1(post.vhsNoiseWeight),
    );
    encoder.setUniform(
      'uHeadSwitchWeight',
      UniformValue.float1(post.vhsHeadSwitchWeight),
    );
    encoder.setUniform(
      'uDropoutWeight',
      UniformValue.float1(post.vhsDropoutWeight),
    );
    encoder.setUniform('uGhostWeight', UniformValue.float1(ghostWeight));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
