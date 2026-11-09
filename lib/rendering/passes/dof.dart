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
import 'bloom_resources.dart';
import 'depth_resources.dart';
import 'dof_resources.dart';
import 'empty_vao_owner.dart';
import 'pass_context_impl.dart';
import 'post_chain.dart';

enum _DofBlurAxis { horizontal, vertical }

final class DofBlurProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
    required String programId,
  }) => ProgramSource(
    id: programId,
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uSource': 0},
    requiredUniforms: const ['uTexelStep'],
  );
}

final class DofBlurFeature with EmptyVaoOwner implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  @override
  final GpuDevice device;
  final String programId;
  final String passId;
  final _DofBlurAxis _axis;
  final ResourceRef sourceResource;
  final ResourceRef destResource;
  final GpuObject Function() resolveSource;
  final int texelWidth;
  final int texelHeight;

  DofBlurFeature.horizontal({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSource,
    int? texelWidth,
    int? texelHeight,
    ResourceRef? sourceResource,
    ResourceRef? destResource,
  }) : programId = 'dofBlurH',
       passId = 'dofBlurH',
       _axis = _DofBlurAxis.horizontal,
       sourceResource = sourceResource ?? BloomResources.sceneColorPostBloom,
       destResource = destResource ?? DofResources.dofBlurH,
       texelWidth = texelWidth ?? DofResources.dofBlurH.width,
       texelHeight = texelHeight ?? DofResources.dofBlurH.height;

  DofBlurFeature.vertical({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSource,
    int? texelWidth,
    int? texelHeight,
    ResourceRef? sourceResource,
    ResourceRef? destResource,
  }) : programId = 'dofBlurV',
       passId = 'dofBlurV',
       _axis = _DofBlurAxis.vertical,
       sourceResource = sourceResource ?? DofResources.dofBlurH,
       destResource = destResource ?? DofResources.dofBlurV,
       texelWidth = texelWidth ?? DofResources.dofBlurV.width,
       texelHeight = texelHeight ?? DofResources.dofBlurV.height;

  @override
  String get id => passId;

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: passId,
        stage: GraphStage.afterResolve,
        uses: [
          ResourceUse(sourceResource, ResourceAccess.read),
          ResourceUse(destResource, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      DofBlurProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
        programId: programId,
      ),
    );
    final emptyVao = createEmptyVao();
    final texelStep = _axis == _DofBlurAxis.horizontal
        ? Float32List.fromList([1.0 / texelWidth, 0.0])
        : Float32List.fromList([0.0, 1.0 / texelHeight]);
    return [
      _DofBlurPass(
        descriptor: PassDescriptor(
          id: passId,
          stage: GraphStage.afterResolve,
          uses: [
            ResourceUse(sourceResource, ResourceAccess.read),
            ResourceUse(destResource, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveSource: resolveSource,
        texelStep: texelStep,
        destResourceName: destResource.name,
      ),
    ];
  }

  @override
  void dispose() => releaseEmptyVaos();
}

final class _DofBlurPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveSource;
  final Float32List texelStep;
  final String destResourceName;

  const _DofBlurPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveSource,
    required this.texelStep,
    required this.destResourceName,
  });

  @override
  void execute(RenderPassContext context) {
    // §8.8's gate: "zero frame strength skips its pass." dofComposite's own
    // mix(sharp, blurred, coc) already forces coc to 0 whenever
    // depthOfFieldStrength is 0 (uStrength scales coc directly in the
    // shader), so a stale or never-written blur texture contributes
    // nothing regardless of content — no clear needed, same reasoning as
    // bloom's blur skip.
    final strength =
        (context.frameScene.post as PostProcessState).depthOfFieldStrength;
    if (strength <= 0) return;

    final view = context.viewOf(destResourceName) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorOnly);
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, resolveSource());
    encoder.setUniform('uSource', const UniformValue.sampler(0));
    encoder.setUniform('uTexelStep', UniformValue.float2(texelStep));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}

final class DofCompositeProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'dofComposite',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uSharp': 0, 'uBlurred': 1, 'uSceneDepth': 2},
    requiredUniforms: const [
      'uNear',
      'uFar',
      'uFocusDistance',
      'uFocusRange',
      'uStrength',
    ],
  );
}

final class DofCompositeFeature with EmptyVaoOwner implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  @override
  final GpuDevice device;
  final GpuObject Function() resolveSharp;
  final GpuObject Function() resolveBlurred;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final double focusDistance;
  final double focusRange;
  final ResourceRef? sourceResource;
  final ResourceRef sceneDepthResource;
  final ResourceRef dofBlurredResource;
  final ResourceRef dofOutputResource;
  final PostChain? chain;

  DofCompositeFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSharp,
    required this.resolveBlurred,
    required this.resolveSceneDepth,
    required this.resolveCamera,
    this.focusDistance = 5.0,
    this.focusRange = 2.8,
    this.sourceResource,
    this.sceneDepthResource = DepthPrepassResources.sceneDepth,
    this.dofBlurredResource = DofResources.dofBlurV,
    this.dofOutputResource = DofResources.dofOutput,
    this.chain,
  });

  ResourceRef get _resolvedSource =>
      sourceResource ?? BloomResources.sceneColorPostBloom;

  @override
  String get id => 'dofComposite';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'dofComposite',
        stage: GraphStage.afterResolve,
        uses: [
          ResourceUse(_resolvedSource, ResourceAccess.read),
          ResourceUse(sceneDepthResource, ResourceAccess.read),
          ResourceUse(dofBlurredResource, ResourceAccess.read),
          ResourceUse(dofOutputResource, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      DofCompositeProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = createEmptyVao();
    return [
      _DofCompositePass(
        descriptor: PassDescriptor(
          id: 'dofComposite',
          stage: GraphStage.afterResolve,
          uses: [
            ResourceUse(_resolvedSource, ResourceAccess.read),
            ResourceUse(sceneDepthResource, ResourceAccess.read),
            ResourceUse(dofBlurredResource, ResourceAccess.read),
            ResourceUse(dofOutputResource, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveSharp: resolveSharp,
        resolveBlurred: resolveBlurred,
        resolveSceneDepth: resolveSceneDepth,
        resolveCamera: resolveCamera,
        focusDistance: focusDistance,
        focusRange: focusRange,
        outputResource: dofOutputResource,
        chain: chain,
      ),
    ];
  }

  @override
  void dispose() => releaseEmptyVaos();
}

final class _DofCompositePass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveSharp;
  final GpuObject Function() resolveBlurred;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final double focusDistance;
  final double focusRange;
  final ResourceRef outputResource;
  final PostChain? chain;

  const _DofCompositePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveSharp,
    required this.resolveBlurred,
    required this.resolveSceneDepth,
    required this.resolveCamera,
    required this.focusDistance,
    required this.focusRange,
    this.outputResource = DofResources.dofOutput,
    this.chain,
  });

  @override
  void execute(RenderPassContext context) {
    final post = context.frameScene.post as PostProcessState;
    final chain = this.chain;
    // dof_composite.frag copies the sharp input below this strength.
    if (chain != null &&
        !program.isHostOverride &&
        post.depthOfFieldStrength <= 0.0001) {
      chain.bypass(outputResource, resolveSharp());
      return;
    }
    final view = context.viewOf(outputResource.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final camera = resolveCamera();

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, resolveSharp());
    encoder.setUniform('uSharp', const UniformValue.sampler(0));
    encoder.bindTexture(1, resolveBlurred());
    encoder.setUniform('uBlurred', const UniformValue.sampler(1));
    encoder.bindTexture(2, resolveSceneDepth());
    encoder.setUniform('uSceneDepth', const UniformValue.sampler(2));
    encoder.setUniform('uNear', UniformValue.float1(camera.near));
    encoder.setUniform('uFar', UniformValue.float1(camera.far));
    encoder.setUniform('uFocusDistance', UniformValue.float1(focusDistance));
    encoder.setUniform('uFocusRange', UniformValue.float1(focusRange));
    encoder.setUniform(
      'uStrength',
      UniformValue.float1(post.depthOfFieldStrength),
    );
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
    chain?.produced(outputResource, view.gpuObject);
  }
}
