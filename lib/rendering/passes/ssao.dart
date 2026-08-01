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

/// §8.5's SSAO kernel pass: half-resolution, samples
/// `DepthPrepassResources.sceneDepth` alone (no G-buffer normal — normals
/// are reconstructed from depth via screen-space derivatives in the
/// shader, per this rung's deliberate scope decision to defer prepass MRT
/// until something needs a directly-written normal), rotates a small fixed
/// kernel per-pixel from a deterministic ("pinned") hash rather than
/// per-frame randomness, and outputs raw (unblurred, deliberately noisy)
/// occlusion to `SsaoResources.ssaoRaw`. Never sampled by a world pass
/// directly — only `SsaoBlurFeature`'s output is (§8.5: blur "rather than
/// smearing across silhouettes").
///
/// §8.5's own gate: "is skipped at zero frame strength... has a white
/// neutral fallback." Strength is read fresh every frame from
/// `PostProcessState.ssaoStrength` (previously a construction-time
/// constant nothing ever varied — SSAO did not consume its own weight
/// field at all before this fix, the same "designed but not read" gap
/// bloom/DOF/grade/PS1/VHS were each in before their own rungs) rather
/// than issuing the 8-tap kernel every frame regardless: at `<= 0`,
/// `_SsaoOcclusionPass.execute()` clears straight to white (`ao == 1`,
/// no occlusion) and returns before the expensive draw.
final class SsaoOcclusionFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final double radius;

  SsaoOcclusionFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSceneDepth,
    required this.resolveCamera,
    this.radius = 0.4,
  });

  @override
  String get id => 'ssaoOcclusion';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'ssaoOcclusion',
        stage: GraphStage.afterDepth,
        uses: [
          const ResourceUse(SsaoResources.ssaoRaw, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      SsaoOcclusionProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    return [
      _SsaoOcclusionPass(
        descriptor: PassDescriptor(
          id: 'ssaoOcclusion',
          stage: GraphStage.afterDepth,
          uses: [
            const ResourceUse(SsaoResources.ssaoRaw, ResourceAccess.write),
          ],
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
  void dispose() {}
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
    encoder.setUniform('uProjScaleX', UniformValue.float1(camera.projection.m[0]));
    encoder.setUniform('uProjScaleY', UniformValue.float1(camera.projection.m[5]));
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

/// §8.5's depth-aware bilateral blur — the only stage a world pass may
/// sample AO from. Kept as its own `RenderFeature` rather than folded into
/// the occlusion pass so each half of the pipeline can be independently
/// disabled/profiled later, matching every other multi-stage pipeline in
/// this renderer (shadow caster vs. shadowed world, depth prepass vs. depth
/// debug).
///
/// Reads the same `PostProcessState.ssaoStrength` the occlusion pass does
/// and mirrors its zero-strength skip: blurring the occlusion pass's own
/// white fallback would still be white, just at the depth-aware blur's
/// full per-pixel cost for no different result, so this pass short-
/// circuits to the identical white clear independently rather than relying
/// on the occlusion pass's output alone.
final class SsaoBlurFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveSsaoRaw;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;

  SsaoBlurFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSsaoRaw,
    required this.resolveSceneDepth,
    required this.resolveCamera,
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
          const ResourceUse(SsaoResources.ssaoRaw, ResourceAccess.read),
          const ResourceUse(SsaoResources.ssaoBlurred, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      SsaoBlurProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    return [
      _SsaoBlurPass(
        descriptor: PassDescriptor(
          id: 'ssaoBlur',
          stage: GraphStage.afterDepth,
          uses: [
            const ResourceUse(SsaoResources.ssaoRaw, ResourceAccess.read),
            const ResourceUse(
              SsaoResources.ssaoBlurred,
              ResourceAccess.write,
            ),
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
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _SsaoBlurPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveSsaoRaw;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;

  const _SsaoBlurPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveSsaoRaw,
    required this.resolveSceneDepth,
    required this.resolveCamera,
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
        Float32List.fromList([
          1.0 / SsaoResources.ssaoRaw.width,
          1.0 / SsaoResources.ssaoRaw.height,
        ]),
      ),
    );
    encoder.setUniform('uNear', UniformValue.float1(camera.near));
    encoder.setUniform('uFar', UniformValue.float1(camera.far));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
