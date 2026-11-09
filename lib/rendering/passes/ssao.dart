import 'dart:typed_data';

import '../api/effects.dart';
import '../api/frame.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'empty_vao_owner.dart';
import 'pass_context_impl.dart';
import 'ssao_resources.dart';

final class SsaoOcclusionProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'ssaoOcclusion',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uSceneDepth': 0},
    requiredUniforms: const [
      'uNear',
      'uFar',
      'uProjScaleX',
      'uProjScaleY',
      'uRadius',
      'uStrength',
    ],
  );
}

final class SsaoOcclusionFeature with EmptyVaoOwner implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  @override
  final GpuDevice device;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final double radius;
  final ResourceRef ssaoRawResource;

  SsaoOcclusionFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSceneDepth,
    required this.resolveCamera,
    this.radius = 0.4,
    this.ssaoRawResource = SsaoResources.ssaoRaw,
  });

  @override
  String get id => 'ssaoOcclusion';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'ssaoOcclusion',
        stage: GraphStage.afterDepth,
        uses: [ResourceUse(ssaoRawResource, ResourceAccess.write)],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publishNew(
      SsaoOcclusionProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = createEmptyVao();
    return [
      _SsaoOcclusionPass(
        descriptor: PassDescriptor(
          id: 'ssaoOcclusion',
          stage: GraphStage.afterDepth,
          uses: [ResourceUse(ssaoRawResource, ResourceAccess.write)],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveSceneDepth: resolveSceneDepth,
        resolveCamera: resolveCamera,
        radius: radius,
      ),
    ];
  }

  @override
  void dispose() => releaseEmptyVaos();
}

final class _SsaoOcclusionPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final double radius;

  const _SsaoOcclusionPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveSceneDepth,
    required this.resolveCamera,
    required this.radius,
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(SsaoResources.ssaoRaw.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final strength = (context.frameScene.post as PostProcessState).ssaoStrength;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    if (strength <= 0) {
      encoder.clear(ClearMask.colorOnly, r: 1, g: 1, b: 1, a: 1);
      return;
    }
    encoder.clear(ClearMask.colorOnly);
    final camera = resolveCamera();
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, resolveSceneDepth());
    encoder.setUniform('uSceneDepth', const UniformValue.sampler(0));
    encoder.setUniform('uNear', UniformValue.float1(camera.near));
    encoder.setUniform('uFar', UniformValue.float1(camera.far));
    // projection.m is column-major; [0] is X scale (f/aspect), [5] is Y
    // scale (f) — the same two values Mat4.perspective wrote, read back
    // here rather than re-derived from FOV so this can never disagree with
    // the camera's actual projection matrix (§5.2's "never guesses a FOV").
    encoder.setUniform(
      'uProjScaleX',
      UniformValue.float1(camera.projection.m[0]),
    );
    encoder.setUniform(
      'uProjScaleY',
      UniformValue.float1(camera.projection.m[5]),
    );
    encoder.setUniform('uRadius', UniformValue.float1(radius));
    encoder.setUniform('uStrength', UniformValue.float1(strength));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}

final class SsaoBlurProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'ssaoBlur',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uSsaoRaw': 0, 'uSceneDepth': 1},
    requiredUniforms: const ['uTexelSize', 'uNear', 'uFar'],
  );
}

final class SsaoBlurFeature with EmptyVaoOwner implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  @override
  final GpuDevice device;
  final GpuObject Function() resolveSsaoRaw;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final int ssaoWidth;
  final int ssaoHeight;
  final ResourceRef ssaoRawResource;
  final ResourceRef ssaoBlurredResource;

  SsaoBlurFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSsaoRaw,
    required this.resolveSceneDepth,
    required this.resolveCamera,
    this.ssaoWidth = 192,
    this.ssaoHeight = 108,
    this.ssaoRawResource = SsaoResources.ssaoRaw,
    this.ssaoBlurredResource = SsaoResources.ssaoBlurred,
  });

  @override
  String get id => 'ssaoBlur';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'ssaoBlur',
        stage: GraphStage.afterDepth,
        uses: [
          ResourceUse(ssaoRawResource, ResourceAccess.read),
          ResourceUse(ssaoBlurredResource, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publishNew(
      SsaoBlurProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = createEmptyVao();
    return [
      _SsaoBlurPass(
        descriptor: PassDescriptor(
          id: 'ssaoBlur',
          stage: GraphStage.afterDepth,
          uses: [
            ResourceUse(ssaoRawResource, ResourceAccess.read),
            ResourceUse(ssaoBlurredResource, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveSsaoRaw: resolveSsaoRaw,
        resolveSceneDepth: resolveSceneDepth,
        resolveCamera: resolveCamera,
        ssaoWidth: ssaoWidth,
        ssaoHeight: ssaoHeight,
      ),
    ];
  }

  @override
  void dispose() => releaseEmptyVaos();
}

final class _SsaoBlurPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveSsaoRaw;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final int ssaoWidth;
  final int ssaoHeight;

  const _SsaoBlurPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveSsaoRaw,
    required this.resolveSceneDepth,
    required this.resolveCamera,
    required this.ssaoWidth,
    required this.ssaoHeight,
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(SsaoResources.ssaoBlurred.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final strength = (context.frameScene.post as PostProcessState).ssaoStrength;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    if (strength <= 0) {
      encoder.clear(ClearMask.colorOnly, r: 1, g: 1, b: 1, a: 1);
      return;
    }
    encoder.clear(ClearMask.colorOnly);
    final camera = resolveCamera();
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, resolveSsaoRaw());
    encoder.setUniform('uSsaoRaw', const UniformValue.sampler(0));
    encoder.bindTexture(1, resolveSceneDepth());
    encoder.setUniform('uSceneDepth', const UniformValue.sampler(1));
    encoder.setUniform(
      'uTexelSize',
      UniformValue.float2(
        Float32List.fromList([1.0 / ssaoWidth, 1.0 / ssaoHeight]),
      ),
    );
    encoder.setUniform('uNear', UniformValue.float1(camera.near));
    encoder.setUniform('uFar', UniformValue.float1(camera.far));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
