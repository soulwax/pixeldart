import '../api/effects.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'grade_resources.dart';
import 'pass_context_impl.dart';
import 'ps1_resources.dart';

final class Ps1QuantizeProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'ps1Quantize',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uScene': 0},
    requiredUniforms: const ['uQuantizationBits', 'uDitherStrength'],
  );
}

/// RV-09 rung 3's PS1 quantize+dither — §6.2 places this immediately after
/// LUT grade and before VHS (not built yet). Reads
/// [GradeResources.gradeOutput], writes its own distinct
/// [Ps1Resources.ps1Output], same reasoning as every prior post-DOF stage:
/// this shader reads the pre-quantize scene as one input texture while
/// writing a different one in the same draw call.
///
/// Covers only the "quantization/dither is an explicit composite" piece of
/// §6.2's PS1 world behavior list. Vertex snapping was wired directly into
/// `shadowed_world.vert`/`.dart` this same rung (§9's "vertex snapping...
/// live[s] in the world vertex path", not a post-process), and affine UV
/// joined it there in a follow-up packet — both are world-path vertex
/// behaviors, so neither is reachable from this composite. Vertex lighting
/// (would move `shadowedWorld`'s already browser-confirmed N·L/shadow/
/// ambient math from per-fragment to per-vertex, changing the existing lit
/// look even when the PS1 profile is off unless very carefully gated)
/// remains undone — see the board packet.
final class Ps1QuantizeFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;

  Ps1QuantizeFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
  });

  @override
  String get id => 'ps1Quantize';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'ps1Quantize',
        stage: GraphStage.afterResolve,
        uses: [
          const ResourceUse(GradeResources.gradeOutput, ResourceAccess.read),
          const ResourceUse(Ps1Resources.ps1Output, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      Ps1QuantizeProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    return [
      _Ps1QuantizePass(
        descriptor: PassDescriptor(
          id: 'ps1Quantize',
          stage: GraphStage.afterResolve,
          uses: [
            const ResourceUse(
              GradeResources.gradeOutput,
              ResourceAccess.read,
            ),
            const ResourceUse(Ps1Resources.ps1Output, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _Ps1QuantizePass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;

  const _Ps1QuantizePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
  });

  @override
  void execute(RenderPassContext context) {
    final sceneView =
        context.viewOf(GradeResources.gradeOutput.name) as BoundResourceView;
    final outputView =
        context.viewOf(Ps1Resources.ps1Output.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final post = context.frameScene.post as PostProcessState;

    encoder.bindTarget(outputView.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, sceneView.gpuObject);
    encoder.setUniform('uScene', const UniformValue.sampler(0));
    encoder.setUniform(
      'uQuantizationBits',
      UniformValue.float1(post.quantizationBits.toDouble()),
    );
    encoder.setUniform(
      'uDitherStrength',
      UniformValue.float1(post.ditherStrength),
    );
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
