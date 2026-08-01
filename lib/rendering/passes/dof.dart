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
import 'dof_resources.dart';
import 'pass_context_impl.dart';

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

/// RV-09's DOF blur — the exact same separable 5-tap gaussian shader
/// (`bloomBlurFragSrc`) bloom's own blur uses, since it's a generic "blur
/// whatever's bound to uSource" kernel with no bloom-specific logic in it.
/// Unlike bloom, DOF always samples plain color via `bindTexture`, never a
/// glow attachment through `bindGlowTexture` — it blurs the final,
/// already-composited scene (post-bloom), not an isolated emissive layer.
/// Reads `BloomResources.sceneColorPostBloom` by name (the physical target
/// bloom's composite pass already wrote in place), since a defocused
/// background must blur what the viewer will actually see, glow included.
final class DofBlurFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final String programId;
  final String passId;
  final _DofBlurAxis _axis;
  final ResourceRef sourceResource;
  final ResourceRef destResource;
  final GpuObject Function() resolveSource;

  DofBlurFeature.horizontal({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSource,
  }) : programId = 'dofBlurH',
       passId = 'dofBlurH',
       _axis = _DofBlurAxis.horizontal,
       sourceResource = BloomResources.sceneColorPostBloom,
       destResource = DofResources.dofBlurH;

  DofBlurFeature.vertical({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSource,
  }) : programId = 'dofBlurV',
       passId = 'dofBlurV',
       _axis = _DofBlurAxis.vertical,
       sourceResource = DofResources.dofBlurH,
       destResource = DofResources.dofBlurV;

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
    final emptyVao = device.createVertexArray();
    final texelStep = _axis == _DofBlurAxis.horizontal
        ? Float32List.fromList([1.0 / destResource.width, 0.0])
        : Float32List.fromList([0.0, 1.0 / destResource.height]);
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
  void dispose() {}
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

/// RV-09's DOF composite: blends the sharp post-bloom scene color against
/// [DofResources.dofBlurV] per-pixel by a circle-of-confusion derived from
/// the scene depth prepass vs. a fixed focus distance/range. Writes
/// [DofResources.dofOutput] — a genuinely distinct physical target from
/// `sceneColor`, never a `nextVersion()` of it like bloom's composite is,
/// since this shader reads the sharp scene color as one input texture while
/// writing a *different* texture in the same draw call (reading and writing
/// the same physical target in one draw is undefined in WebGL2, unlike
/// bloom's additive blend which reads/writes the same object safely via
/// blending rather than a second sampler). `uStrength` reads
/// `PostProcessState.depthOfFieldStrength` fresh every frame via
/// `context.frameScene.post` rather than a construction-time constant like
/// bloom's own `strength` field — RV-09 made DOF the first pass in this
/// renderer that must react to per-frame post-process weights.
final class DofCompositeFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveSharp;
  final GpuObject Function() resolveBlurred;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final double focusDistance;
  final double focusRange;

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
  });

  @override
  String get id => 'dofComposite';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'dofComposite',
        stage: GraphStage.afterResolve,
        uses: [
          ResourceUse(BloomResources.sceneColorPostBloom, ResourceAccess.read),
          const ResourceUse(DofResources.dofBlurV, ResourceAccess.read),
          const ResourceUse(DofResources.dofOutput, ResourceAccess.write),
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
    final emptyVao = device.createVertexArray();
    return [
      _DofCompositePass(
        descriptor: PassDescriptor(
          id: 'dofComposite',
          stage: GraphStage.afterResolve,
          uses: [
            ResourceUse(
              BloomResources.sceneColorPostBloom,
              ResourceAccess.read,
            ),
            const ResourceUse(DofResources.dofBlurV, ResourceAccess.read),
            const ResourceUse(DofResources.dofOutput, ResourceAccess.write),
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
      ),
    ];
  }

  @override
  void dispose() {}
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
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(DofResources.dofOutput.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final camera = resolveCamera();
    final post = context.frameScene.post as PostProcessState;

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
  }
}
