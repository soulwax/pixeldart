import 'package:pixeldart/rendering/core/graph_resource.dart';
import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/passes/bloom.dart';
import 'package:pixeldart/rendering/passes/bloom_resources.dart';
import 'package:pixeldart/rendering/passes/dof.dart';
import 'package:pixeldart/rendering/passes/dof_resources.dart';
import 'package:pixeldart/rendering/passes/grade.dart';
import 'package:pixeldart/rendering/passes/grade_resources.dart';
import 'package:pixeldart/rendering/passes/pass_context_impl.dart';
import 'package:pixeldart/rendering/passes/ps1.dart';
import 'package:pixeldart/rendering/passes/ps1_resources.dart';
import 'package:pixeldart/rendering/passes/safe_graph_resources.dart';
import 'package:pixeldart/rendering/passes/ssao.dart';
import 'package:pixeldart/rendering/passes/ssao_resources.dart';
import 'package:pixeldart/rendering/passes/vhs.dart';
import 'package:pixeldart/rendering/passes/vhs_resources.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

/// RP-1: pins the draw-count half of §8.5/§8.7/§8.8's zero-cost-off gate,
/// which every zero-cost-off board entry has verified by browser evidence
/// and code review but never by an instrumented draw counter — named
/// explicitly as missing three times over (the zero-cost-off packet, the
/// affine-UV packet, and RP-0's own card).
///
/// Also pins the deliberate *complement*: grade, PS1 quantize, and VHS draw
/// unconditionally regardless of their own weight. That is not an oversight
/// this packet should paper over — a per-frame skip is structurally hard for
/// exactly the reason DOF's own composite can't skip either: each is a chain
/// link whose skipped output would leave the next read stale without a
/// fallback-copy path this renderer does not have. Their zero-cost story is
/// RP-3's build-time exclusion (never constructed under an excluding
/// profile), not a per-frame branch, and this fixture documents that instead
/// of silently proving only the passes that already do skip.
void main() {
  _ssaoBothPassesSkipAtZeroStrength();
  _ssaoBothPassesDrawAtFullStrength();
  _bloomBlurBothAxesSkipAtZeroStrength();
  _bloomBlurBothAxesDrawAtFullStrength();
  _bloomCompositeSkipsEntirelyAtZeroStrength();
  _bloomCompositeDrawsAtFullStrength();
  _dofBlurBothAxesSkipAtZeroStrength();
  _dofBlurBothAxesDrawAtFullStrength();
  _dofCompositeAlwaysDrawsRegardlessOfStrength();
  _gradePs1VhsAlwaysDrawRegardlessOfWeight();
  print('Renderer zero-cost fixtures passed.');
}

final _fakeCamera = CameraView(
  view: Mat4.identity(),
  projection: Mat4.identity(),
  viewProjection: Mat4.identity(),
  eye: Vec3.zero,
  forward: const Vec3(0, 0, -1),
  near: 0.1,
  far: 100,
  aspect: 16 / 9,
);

final class _FakeFrameScene implements FrameSceneData {
  final PostProcessState postState;
  const _FakeFrameScene(this.postState);

  @override
  Iterable<Object> get opaqueBatches => const [];
  @override
  Iterable<Object> get blendedItemsBackToFront => const [];
  @override
  Object get camera => _fakeCamera;
  @override
  Object get environment => const FrameEnvironment();
  @override
  Object get post => postState;
}

final class _AlwaysAvailableResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

/// Executes [pass] once against a fresh view map covering every name in
/// [resourceNames] (all bound to the same throwaway target — passes read
/// distinct *names*, not distinct physical objects, so one target reused
/// under several names is a legitimate fixture shortcut) and returns how
/// many real draw calls it issued.
int _drawCountFor({
  required FakeGpuDevice device,
  required RenderPass pass,
  required List<String> resourceNames,
  required PostProcessState post,
}) {
  final throwawayTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4),
  );
  final views = {
    for (final name in resourceNames)
      name: BoundResourceView(
        ResourceRef(name: name, format: ResourceFormat.rgba8, width: 4, height: 4),
        throwawayTarget,
      ),
  };
  final before = device.drawLog.length;
  pass.execute(
    BoundPassContext(
      views: views,
      encoder: DeviceDrawCommandEncoder(device),
      frameScene: _FakeFrameScene(post),
    ),
  );
  return device.drawLog
      .sublist(before)
      .where((line) => line.startsWith('drawArrays('))
      .length;
}

void _expect(int actual, int expected, String what) {
  if (actual != expected) {
    throw StateError('$what: expected $expected draw call(s), got $actual');
  }
}

// ---- SSAO (occlusion + blur) ----

(RenderPass, RenderPass) _buildSsaoPasses(FakeGpuDevice device) {
  final library = ProgramLibrary(device);
  final sceneDepthTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4, hasDepth: true),
  );
  final occlusion = SsaoOcclusionFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: ssaoOcclusionFragSrc,
    device: device,
    resolveSceneDepth: () => sceneDepthTarget,
    resolveCamera: () => _fakeCamera,
  );
  final blur = SsaoBlurFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: ssaoBlurFragSrc,
    device: device,
    resolveSsaoRaw: () => sceneDepthTarget,
    resolveSceneDepth: () => sceneDepthTarget,
    resolveCamera: () => _fakeCamera,
  );
  return (
    occlusion.createPasses(_AlwaysAvailableResources()).single,
    blur.createPasses(_AlwaysAvailableResources()).single,
  );
}

void _ssaoBothPassesSkipAtZeroStrength() {
  final device = FakeGpuDevice();
  final (occlusion, blur) = _buildSsaoPasses(device);
  const post = PostProcessState(ssaoStrength: 0);
  _expect(
    _drawCountFor(
      device: device,
      pass: occlusion,
      resourceNames: [SsaoResources.ssaoRaw.name],
      post: post,
    ),
    0,
    'ssaoOcclusion at zero strength',
  );
  _expect(
    _drawCountFor(
      device: device,
      pass: blur,
      resourceNames: [SsaoResources.ssaoBlurred.name],
      post: post,
    ),
    0,
    'ssaoBlur at zero strength',
  );
}

void _ssaoBothPassesDrawAtFullStrength() {
  final device = FakeGpuDevice();
  final (occlusion, blur) = _buildSsaoPasses(device);
  const post = PostProcessState(ssaoStrength: 1.2);
  _expect(
    _drawCountFor(
      device: device,
      pass: occlusion,
      resourceNames: [SsaoResources.ssaoRaw.name],
      post: post,
    ),
    1,
    'ssaoOcclusion at full strength',
  );
  _expect(
    _drawCountFor(
      device: device,
      pass: blur,
      resourceNames: [SsaoResources.ssaoBlurred.name],
      post: post,
    ),
    1,
    'ssaoBlur at full strength',
  );
}

// ---- Bloom (blur H/V + composite) ----

(RenderPass, RenderPass, RenderPass) _buildBloomPasses(FakeGpuDevice device) {
  final library = ProgramLibrary(device);
  final sourceTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4, attachments: GpuTargetAttachment.colorAndGlow),
  );
  final blurH = BloomBlurFeature.horizontal(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: () => sourceTarget,
  );
  final blurV = BloomBlurFeature.vertical(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: () => sourceTarget,
  );
  final composite = BloomCompositeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: bloomCompositeFragSrc,
    device: device,
    resolveBloom: () => sourceTarget,
  );
  return (
    blurH.createPasses(_AlwaysAvailableResources()).single,
    blurV.createPasses(_AlwaysAvailableResources()).single,
    composite.createPasses(_AlwaysAvailableResources()).single,
  );
}

void _bloomBlurBothAxesSkipAtZeroStrength() {
  final device = FakeGpuDevice();
  final (blurH, blurV, _) = _buildBloomPasses(device);
  const post = PostProcessState(bloomStrength: 0);
  _expect(
    _drawCountFor(
      device: device,
      pass: blurH,
      resourceNames: [BloomResources.bloomBlurH.name],
      post: post,
    ),
    0,
    'bloomBlurH at zero strength',
  );
  _expect(
    _drawCountFor(
      device: device,
      pass: blurV,
      resourceNames: [BloomResources.bloomBlurV.name],
      post: post,
    ),
    0,
    'bloomBlurV at zero strength',
  );
}

void _bloomBlurBothAxesDrawAtFullStrength() {
  final device = FakeGpuDevice();
  final (blurH, blurV, _) = _buildBloomPasses(device);
  const post = PostProcessState(bloomStrength: 1.0);
  _expect(
    _drawCountFor(
      device: device,
      pass: blurH,
      resourceNames: [BloomResources.bloomBlurH.name],
      post: post,
    ),
    1,
    'bloomBlurH at full strength',
  );
  _expect(
    _drawCountFor(
      device: device,
      pass: blurV,
      resourceNames: [BloomResources.bloomBlurV.name],
      post: post,
    ),
    1,
    'bloomBlurV at full strength',
  );
}

/// Bloom's composite is the strictest of the three skips: at zero strength
/// it must not even call `bindTarget` (§8.7: it blends in place onto the
/// exact object `shadowedWorld` already wrote, so touching the target at
/// all is unearned work with an identical result to not touching it).
void _bloomCompositeSkipsEntirelyAtZeroStrength() {
  final device = FakeGpuDevice();
  final (_, _, composite) = _buildBloomPasses(device);
  const post = PostProcessState(bloomStrength: 0);
  final before = device.drawLog.length;
  composite.execute(
    BoundPassContext(
      views: const {},
      encoder: DeviceDrawCommandEncoder(device),
      frameScene: _FakeFrameScene(post),
    ),
  );
  if (device.drawLog.length != before) {
    throw StateError(
      'bloomComposite at zero strength must issue no GL calls at all, got '
      '${device.drawLog.sublist(before)}',
    );
  }
}

void _bloomCompositeDrawsAtFullStrength() {
  final device = FakeGpuDevice();
  final (_, _, composite) = _buildBloomPasses(device);
  const post = PostProcessState(bloomStrength: 1.0);
  _expect(
    _drawCountFor(
      device: device,
      pass: composite,
      resourceNames: [SafeGraphResources.sceneColor.name],
      post: post,
    ),
    1,
    'bloomComposite at full strength',
  );
}

// ---- DOF (blur H/V + composite) ----

(RenderPass, RenderPass, RenderPass) _buildDofPasses(FakeGpuDevice device) {
  final library = ProgramLibrary(device);
  final sourceTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4),
  );
  final sceneDepthTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4, hasDepth: true),
  );
  final blurH = DofBlurFeature.horizontal(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: () => sourceTarget,
  );
  final blurV = DofBlurFeature.vertical(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: () => sourceTarget,
  );
  final composite = DofCompositeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: dofCompositeFragSrc,
    device: device,
    resolveSharp: () => sourceTarget,
    resolveBlurred: () => sourceTarget,
    resolveSceneDepth: () => sceneDepthTarget,
    resolveCamera: () => _fakeCamera,
  );
  return (
    blurH.createPasses(_AlwaysAvailableResources()).single,
    blurV.createPasses(_AlwaysAvailableResources()).single,
    composite.createPasses(_AlwaysAvailableResources()).single,
  );
}

void _dofBlurBothAxesSkipAtZeroStrength() {
  final device = FakeGpuDevice();
  final (blurH, blurV, _) = _buildDofPasses(device);
  const post = PostProcessState(depthOfFieldStrength: 0);
  _expect(
    _drawCountFor(
      device: device,
      pass: blurH,
      resourceNames: [DofResources.dofBlurH.name],
      post: post,
    ),
    0,
    'dofBlurH at zero strength',
  );
  _expect(
    _drawCountFor(
      device: device,
      pass: blurV,
      resourceNames: [DofResources.dofBlurV.name],
      post: post,
    ),
    0,
    'dofBlurV at zero strength',
  );
}

void _dofBlurBothAxesDrawAtFullStrength() {
  final device = FakeGpuDevice();
  final (blurH, blurV, _) = _buildDofPasses(device);
  const post = PostProcessState(depthOfFieldStrength: 1.0);
  _expect(
    _drawCountFor(
      device: device,
      pass: blurH,
      resourceNames: [DofResources.dofBlurH.name],
      post: post,
    ),
    1,
    'dofBlurH at full strength',
  );
  _expect(
    _drawCountFor(
      device: device,
      pass: blurV,
      resourceNames: [DofResources.dofBlurV.name],
      post: post,
    ),
    1,
    'dofBlurV at full strength',
  );
}

/// The complement for DOF's *composite*: unlike bloom's composite, it
/// writes a genuinely distinct target (`dofOutput`) that `present`'s
/// downstream chain depends on, so it cannot be skipped without a fallback
/// copy path this renderer does not have — it draws every frame regardless
/// of `depthOfFieldStrength`, relying on its own `mix(sharp, blurred, coc)`
/// forcing `coc` to 0 to make the *result* a no-op instead.
void _dofCompositeAlwaysDrawsRegardlessOfStrength() {
  final device = FakeGpuDevice();
  final (_, _, composite) = _buildDofPasses(device);
  for (final strength in [0.0, 1.0]) {
    _expect(
      _drawCountFor(
        device: device,
        pass: composite,
        resourceNames: [DofResources.dofOutput.name],
        post: PostProcessState(depthOfFieldStrength: strength),
      ),
      1,
      'dofComposite at strength $strength',
    );
  }
}

// ---- Grade / PS1 quantize / VHS: the documented non-skippers ----

/// None of these three passes have ever claimed a per-frame skip (no board
/// entry lists one), and this fixture is what makes that claim checkable
/// rather than assumed: each draws exactly once regardless of its own
/// weight, at both a zero and a representative nonzero value. Their
/// zero-cost story is RP-3's build-time exclusion — never constructed at
/// all under a profile that excludes them — not a branch inside `execute()`
/// the way SSAO/bloom/DOF's blur stages have. A per-frame skip here would
/// need a fallback-copy path (the same shape DOF's own composite already
/// can't avoid), which is exactly why build-time exclusion, not a runtime
/// branch, is the mechanism RP-3 builds instead.
void _gradePs1VhsAlwaysDrawRegardlessOfWeight() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final lutTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final vhsGhostTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4),
  );

  final grade = GradeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: gradeLutFragSrc,
    device: device,
    resolveLut: () => lutTexture,
  ).createPasses(_AlwaysAvailableResources()).single;
  final ps1 = Ps1QuantizeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: ps1QuantizeFragSrc,
    device: device,
  ).createPasses(_AlwaysAvailableResources()).single;
  final vhs = VhsFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: vhsFragSrc,
    device: device,
    resolveHistory: () => vhsGhostTarget,
    resolveTime: () => 0.0,
  ).createPasses(_AlwaysAvailableResources()).single;

  for (final weight in [0.0, 1.0]) {
    _expect(
      _drawCountFor(
        device: device,
        pass: grade,
        resourceNames: [DofResources.dofOutput.name, GradeResources.gradeOutput.name],
        post: PostProcessState(colorGradeStrength: weight),
      ),
      1,
      'grade at weight $weight',
    );
    _expect(
      _drawCountFor(
        device: device,
        pass: ps1,
        resourceNames: [GradeResources.gradeOutput.name, Ps1Resources.ps1Output.name],
        post: PostProcessState(ditherStrength: weight),
      ),
      1,
      'ps1Quantize at weight $weight',
    );
    _expect(
      _drawCountFor(
        device: device,
        pass: vhs,
        resourceNames: [Ps1Resources.ps1Output.name, VhsResources.vhsOutput.name],
        post: PostProcessState(vhsChromaWeight: weight),
      ),
      1,
      'vhs at weight $weight',
    );
  }
}
