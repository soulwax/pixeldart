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

final class Ps1QuantizeFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final ResourceRef inputResource;
  final ResourceRef outputResource;

  Ps1QuantizeFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    this.inputResource = GradeResources.gradeOutput,
    this.outputResource = Ps1Resources.ps1Output,
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
          ResourceUse(inputResource, ResourceAccess.read),
          ResourceUse(outputResource, ResourceAccess.write),
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
            ResourceUse(inputResource, ResourceAccess.read),
            ResourceUse(outputResource, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        inputResource: inputResource,
        outputResource: outputResource,
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
  final ResourceRef inputResource;
  final ResourceRef outputResource;

  const _Ps1QuantizePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.inputResource,
    required this.outputResource,
  });

  @override
  void execute(RenderPassContext context) {
    final sceneView = context.viewOf(inputResource.name) as BoundResourceView;
    final outputView = context.viewOf(outputResource.name) as BoundResourceView;
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
