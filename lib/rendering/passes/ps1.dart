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
import 'post_chain.dart';
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
  final PostChain? chain;

  Ps1QuantizeFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    this.inputResource = GradeResources.gradeOutput,
    this.outputResource = Ps1Resources.ps1Output,
    this.chain,
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
        chain: chain,
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
  final PostChain? chain;

  const _Ps1QuantizePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.inputResource,
    required this.outputResource,
    this.chain,
  });

  @override
  void execute(RenderPassContext context) {
    final sceneView = context.viewOf(inputResource.name) as BoundResourceView;
    final outputView = context.viewOf(outputResource.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final post = context.frameScene.post as PostProcessState;
    final chain = this.chain;
    final input = chain == null
        ? sceneView.gpuObject
        : chain.source(inputResource, sceneView.gpuObject);
    // 8-bit quantization of an RGBA8 source with no dither offset rounds
    // every texel back to itself (see ps1_quantize.frag).
    if (chain != null &&
        post.quantizationBits == 8 &&
        post.ditherStrength == 0) {
      chain.bypass(outputResource, input);
      return;
    }

    encoder.bindTarget(outputView.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, input);
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
    chain?.produced(outputResource, outputView.gpuObject);
  }
}
