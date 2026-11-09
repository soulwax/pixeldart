import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError('msaa negotiation: $message');
}

const _surface = SurfaceMetrics(
  cssWidth: 320,
  cssHeight: 180,
  pixelWidth: 320,
  pixelHeight: 180,
);

RendererConfiguration _config(QualityProfile profile, int samples) =>
    RendererConfiguration(
      profile: profile,
      internalWidth: 320,
      internalHeight: 180,
      sampleCount: samples,
      outputEncoding: ColorEncoding.linear,
    );

final _frame = FrameInput(
  camera: CameraView(
    view: Mat4.identity(),
    projection: Mat4.identity(),
    viewProjection: Mat4.identity(),
    eye: Vec3.zero,
    forward: const Vec3(0, 0, -1),
    near: 0.1,
    far: 100,
    aspect: 16 / 9,
  ),
  environment: const FrameEnvironment(clearColor: LinearColor(0, 0, 0)),
  post: const PostProcessState(),
  frameIndex: 1,
  historyEpoch: 0,
  noiseSeed: 1,
  timeSeconds: 0,
);

final class _Scene {
  final SceneRendererImpl renderer;
  final RenderWorld world;
  final MeshHandle mesh;
  final MaterialHandle material;
  _Scene(this.renderer, this.world, this.mesh, this.material);

  static Future<_Scene> start(
    FakeGpuDevice device,
    RendererConfiguration configuration,
  ) async {
    final renderer = SceneRendererImpl(device);
    await renderer.initialize(configuration, _surface);
    final resources = renderer.resources;
    final mesh = resources.registerMesh(
      MeshData(
        layout: VertexLayoutDescriptor.compatibility14,
        vertices: Float32List(42),
        localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
      ),
    );
    final material = resources.registerMaterial(
      const MaterialDefinition(key: 'msaa'),
    );
    return _Scene(renderer, renderer.createWorld(), mesh, material);
  }

  void draw() {
    final encoder = renderer.beginFrame(world, _frame);
    encoder.submit(RetainedItemDescriptor(mesh: mesh, material: material));
    renderer.endFrame();
  }
}

int _maxTargetSamples(FakeGpuDevice device) => device.liveTargetDescriptors
    .fold(1, (max, d) => d.samples > max ? d.samples : max);

void _negotiationRules() {
  RenderCapabilities caps(int maxSamples) => RenderCapabilities(
    webglVersion: 'test',
    maxTextureSize: 4096,
    maxTextureArrayLayers: 8,
    maxSamples: maxSamples,
    maxVertexAttributes: 16,
    maxColorAttachments: 4,
  );

  final off = MsaaStatus.negotiate(1, caps(1));
  require(
    off.effective == 1 && !off.fellBack,
    '1× must be honoured even without multisample support',
  );
  final honoured = MsaaStatus.negotiate(2, caps(4));
  require(
    honoured.effective == 2 && !honoured.fellBack,
    'a supported count must be used as requested',
  );
  final clamped = MsaaStatus.negotiate(8, caps(4));
  require(
    clamped.effective == 4 &&
        clamped.reason == MsaaFallbackReason.exceedsDeviceLimit,
    'a count above maxSamples must clamp to it: $clamped',
  );
  final unsupported = MsaaStatus.negotiate(4, caps(1));
  require(
    unsupported.effective == 1 &&
        unsupported.reason == MsaaFallbackReason.unsupported,
    'maxSamples < 2 must fall back to 1×: $unsupported',
  );
  final halved = clamped.afterIncompleteFramebuffer();
  require(
    halved.effective == 2 &&
        halved.requested == 8 &&
        halved.reason == MsaaFallbackReason.framebufferIncomplete,
    'an incomplete framebuffer must halve the count: $halved',
  );
  require(
    halved.afterIncompleteFramebuffer().effective == 1,
    'halving must bottom out at 1×',
  );
  var rejected = false;
  try {
    MsaaStatus.negotiate(0, caps(4));
  } catch (error) {
    rejected = error is ArgumentError;
  }
  require(rejected, 'a zero sample count must be rejected');
}

Future<void> _singleSampleIsFree() async {
  final device = FakeGpuDevice();
  final scene = await _Scene.start(device, _config(QualityProfile.flat2d, 1));
  scene.draw();
  require(device.resolveTargetCalls == 0, '1× must not resolve');
  require(
    _maxTargetSamples(device) == 1,
    '1× must not allocate multisample storage',
  );
  require(scene.renderer.msaa == const MsaaStatus.off(), '1× status');
  scene.renderer.dispose();
}

Future<void> _clampsToDeviceLimit() async {
  final device = FakeGpuDevice(maxSamples: 4);
  final scene = await _Scene.start(device, _config(QualityProfile.safe, 8));
  final msaa = scene.renderer.msaa;
  require(
    msaa.requested == 8 &&
        msaa.effective == 4 &&
        msaa.reason == MsaaFallbackReason.exceedsDeviceLimit,
    'request above the device limit was not clamped: $msaa',
  );
  require(
    scene.renderer.configuration.sampleCount == 8,
    'configuration must keep the host request; msaa reports the result',
  );
  require(_maxTargetSamples(device) == 4, 'targets must use the clamped count');
  scene.draw();
  require(device.resolveTargetCalls == 1, 'clamped MSAA must still resolve');
  scene.renderer.dispose();
}

Future<void> _incompleteFramebufferStepsDown() async {
  final device = FakeGpuDevice(maxSamples: 8, incompleteAboveSamples: 2);
  final scene = await _Scene.start(device, _config(QualityProfile.safe, 8));
  final msaa = scene.renderer.msaa;
  require(
    msaa.effective == 2 &&
        msaa.reason == MsaaFallbackReason.framebufferIncomplete,
    'incomplete MSAA framebuffers must step down: $msaa',
  );
  scene.draw();
  require(device.resolveTargetCalls == 1, 'stepped-down MSAA must resolve');

  // Nothing allocates at 1×-only either: the configure path steps down too.
  device.incompleteAboveSamples = 1;
  await scene.renderer.configure(_config(QualityProfile.safe, 4));
  require(
    scene.renderer.msaa.effective == 1 && _maxTargetSamples(device) == 1,
    'configure must fall back to 1× when no multisampled count completes',
  );
  final resolves = device.resolveTargetCalls;
  scene.draw();
  require(
    device.resolveTargetCalls == resolves,
    'a 1× fallback must drop the resolve pass',
  );
  scene.renderer.dispose();
  require(
    device.liveObjectCount == 0,
    'failed MSAA attempts leaked ${device.liveObjectCount} GPU objects',
  );
}

Future<void> _resolveCopiesOnlyWhatIsRead() async {
  final plain = FakeGpuDevice();
  final noBloom = await _Scene.start(plain, _config(QualityProfile.safe, 4));
  noBloom.draw();
  require(
    plain.lastResolvedAttachments.length == 1 &&
        plain.lastResolvedAttachments.contains('color'),
    'without bloom only color is read after the resolve, '
    'got ${plain.lastResolvedAttachments}',
  );
  noBloom.renderer.dispose();

  final glowing = FakeGpuDevice();
  final bloom = await _Scene.start(glowing, _config(QualityProfile.flat2d, 4));
  bloom.draw();
  require(
    glowing.lastResolvedAttachments.length == 2 &&
        glowing.lastResolvedAttachments.containsAll({'color', 'glow'}),
    'bloom samples glow, nothing samples resolved depth, '
    'got ${glowing.lastResolvedAttachments}',
  );
  final resolveTargets = glowing.liveTargetDescriptors.where(
    (d) => d.samples == 1 && d.attachments == GpuTargetAttachment.colorAndGlow,
  );
  require(
    resolveTargets.isNotEmpty && resolveTargets.every((d) => !d.hasDepth),
    'the resolve target must not allocate depth nobody reads',
  );
  bloom.renderer.dispose();
}

Future<void> _contextRestoreRenegotiates() async {
  final device = FakeGpuDevice(maxSamples: 4);
  final scene = await _Scene.start(device, _config(QualityProfile.flat2d, 4));
  scene.draw();
  require(scene.renderer.msaa.effective == 4, 'initial MSAA');

  // The restored context comes back on an adapter without multisampling.
  device.simulateContextLoss();
  device.maxSamples = 1;
  device.simulateContextRestore();
  final resolves = device.resolveTargetCalls;
  scene.draw();
  require(
    scene.renderer.msaa.reason == MsaaFallbackReason.unsupported &&
        device.resolveTargetCalls == resolves &&
        _maxTargetSamples(device) == 1,
    'restore must renegotiate MSAA against the new adapter',
  );

  device.simulateContextLoss();
  device.maxSamples = 4;
  device.simulateContextRestore();
  scene.draw();
  require(
    scene.renderer.msaa.effective == 4 &&
        device.resolveTargetCalls == resolves + 1,
    'restore onto a capable adapter must bring MSAA back',
  );
  scene.renderer.dispose();
}

Future<void> main() async {
  _negotiationRules();
  await _singleSampleIsFree();
  await _clampsToDeviceLimit();
  await _incompleteFramebufferStepsDown();
  await _resolveCopiesOnlyWhatIsRead();
  await _contextRestoreRenegotiates();
  print('Renderer MSAA negotiation fixtures passed.');
}
