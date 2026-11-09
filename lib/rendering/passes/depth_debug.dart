import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'depth_resources.dart';
import 'empty_vao_owner.dart';
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';

final class DepthDebugProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'depthDebug',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uSceneDepth': 0},
    requiredUniforms: const ['uNear', 'uFar', 'uDisplayRange'],
  );
}

final class DepthDebugFeature with EmptyVaoOwner implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  @override
  final GpuDevice device;
  final GpuObject Function() resolveSceneDepth;
  final double near;
  final double far;
  final double displayRange;

  DepthDebugFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSceneDepth,
    required this.near,
    required this.far,
    required this.displayRange,
  });

  @override
  String get id => 'depthDebug';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'depthDebug',
        stage: GraphStage.beforeWorld,
        uses: [
          const ResourceUse(
            DepthPrepassResources.sceneDepth,
            ResourceAccess.read,
          ),
          const ResourceUse(
            SafeGraphResources.sceneColor,
            ResourceAccess.write,
          ),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publishNew(
      DepthDebugProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = createEmptyVao();
    return [
      _DepthDebugPass(
        descriptor: PassDescriptor(
          id: 'depthDebug',
          stage: GraphStage.beforeWorld,
          uses: [
            const ResourceUse(
              DepthPrepassResources.sceneDepth,
              ResourceAccess.read,
            ),
            const ResourceUse(
              SafeGraphResources.sceneColor,
              ResourceAccess.write,
            ),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveSceneDepth: resolveSceneDepth,
        near: near,
        far: far,
        displayRange: displayRange,
      ),
    ];
  }

  @override
  void dispose() => releaseEmptyVaos();
}

final class _DepthDebugPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveSceneDepth;
  final double near;
  final double far;
  final double displayRange;

  const _DepthDebugPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveSceneDepth,
    required this.near,
    required this.far,
    required this.displayRange,
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(SafeGraphResources.sceneColor.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(view.gpuObject);
    // sceneColor is a colorAndGlow target (2 active draw buffers by
    // default) shared with the real shadowedWorld pass, but this shader
    // only writes one output — some WebGL2 implementations raise
    // GL_INVALID_OPERATION otherwise (found on WebKit/Safari).
    encoder.setColorAttachmentCount(1);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorOnly);
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, resolveSceneDepth());
    encoder.setUniform('uSceneDepth', const UniformValue.sampler(0));
    encoder.setUniform('uNear', UniformValue.float1(near));
    encoder.setUniform('uFar', UniformValue.float1(far));
    encoder.setUniform('uDisplayRange', UniformValue.float1(displayRange));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
