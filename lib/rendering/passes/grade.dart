import '../api/effects.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'dof_resources.dart';
import 'grade_resources.dart';
import 'pass_context_impl.dart';
import 'post_chain.dart';

final class GradeProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'grade',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uScene': 0, 'uLut': 1},
    requiredUniforms: const ['uLutSize', 'uStrength'],
  );
}

final class GradeFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveLut;
  final double lutSize;
  final ResourceRef inputResource;
  final ResourceRef outputResource;
  final PostChain? chain;

  GradeFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveLut,
    this.lutSize = 16,
    this.inputResource = DofResources.dofOutput,
    this.outputResource = GradeResources.gradeOutput,
    this.chain,
  });

  @override
  String get id => 'grade';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'grade',
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
      GradeProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    return [
      _GradePass(
        descriptor: PassDescriptor(
          id: 'grade',
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
        resolveLut: resolveLut,
        lutSize: lutSize,
        inputResource: inputResource,
        outputResource: outputResource,
        chain: chain,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _GradePass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveLut;
  final double lutSize;
  final ResourceRef inputResource;
  final ResourceRef outputResource;
  final PostChain? chain;

  const _GradePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveLut,
    required this.lutSize,
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
    // mix(scene, graded, 0) is the scene itself.
    if (chain != null && post.colorGradeStrength == 0) {
      chain.bypass(outputResource, input);
      return;
    }

    encoder.bindTarget(outputView.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, input);
    encoder.setUniform('uScene', const UniformValue.sampler(0));
    encoder.bindTexture(1, resolveLut());
    encoder.setUniform('uLut', const UniformValue.sampler(1));
    encoder.setUniform('uLutSize', UniformValue.float1(lutSize));
    encoder.setUniform(
      'uStrength',
      UniformValue.float1(post.colorGradeStrength),
    );
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
    chain?.produced(outputResource, outputView.gpuObject);
  }
}
