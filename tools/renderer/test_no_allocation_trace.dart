import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

Future<void> main() async {
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  await renderer.initialize(
    RendererConfiguration.safe,
    const SurfaceMetrics(
      cssWidth: 640,
      cssHeight: 360,
      pixelWidth: 640,
      pixelHeight: 360,
    ),
  );

  final library = renderer.resources as ResourceLibraryImpl;
  final mesh = library.registerMesh(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(42),
      localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
    ),
  );
  final material = library.registerMaterial(
    const MaterialDefinition(key: 'trace-material'),
  );
  final world = renderer.createWorld();
  final item = RetainedItemDescriptor(mesh: mesh, material: material);
  world.addItem(item);

  final warmup = _submitFrame(renderer, world, item, 0);
  _drainTiming(renderer, 0);
  final baseline = _allocationSnapshot(device);
  final baselineStats = warmup;
  require(
    baselineStats.passStats.isNotEmpty,
    'warm-up frame did not publish pass telemetry',
  );

  for (var frameIndex = 1; frameIndex <= 100; frameIndex++) {
    final stats = _submitFrame(renderer, world, item, frameIndex);
    _drainTiming(renderer, frameIndex);
    _requireSameFrameStats(baselineStats, stats, frameIndex);
    require(
      _allocationSnapshot(device) == baseline,
      'GPU/resource allocation changed during frame $frameIndex',
    );
  }

  require(
    device.timerBeginCalls == 101 &&
        device.timerEndCalls == 101 &&
        device.timerDeleteCalls == 101 &&
        device.liveTimerCount == 0,
    'delayed timer ownership did not balance across the 100-frame trace',
  );
  renderer.dispose();
  require(
    device.liveObjectCount == 0,
    'renderer dispose leaked a GPU object after the steady-state trace',
  );
  print(
    'Renderer 100-frame no-allocation trace passed '
    '(GPU/resource counts stable; 101 delayed timer samples balanced).',
  );
}

({
  int buffers,
  int textures,
  int targets,
  int vaos,
  int programs,
  int liveObjects,
})
_allocationSnapshot(FakeGpuDevice device) => (
  buffers: device.bufferCreateCalls,
  textures: device.textureCreateCalls,
  targets: device.targetCreateCalls,
  vaos: device.vaoCreateCalls,
  programs: device.programCompileCalls,
  liveObjects: device.liveObjectCount,
);

FrameStats _submitFrame(
  SceneRendererImpl renderer,
  RenderWorld world,
  RetainedItemDescriptor item,
  int frameIndex,
) {
  final encoder = renderer.beginFrame(world, _frame(frameIndex));
  encoder.submit(item);
  return renderer.endFrame();
}

void _drainTiming(SceneRendererImpl renderer, int frameIndex) {
  // The first result is deliberately delayed. The second poll is the ready
  // sample for FakeGpuDevice; a real adapter may require more frame turns.
  final first = renderer.pollGpuTiming();
  require(
    first.status == GpuTimingStatus.pending && first.frameIndex == frameIndex,
    'frame $frameIndex GPU timer was not delayed',
  );
  final second = renderer.pollGpuTiming();
  require(
    second.status == GpuTimingStatus.ready &&
        second.frameIndex == frameIndex &&
        second.elapsedNanoseconds == 1250000,
    'frame $frameIndex GPU timer did not become truthful ready data',
  );
}

void _requireSameFrameStats(FrameStats expected, FrameStats actual, int frame) {
  require(
    actual.frameIndex == frame &&
        actual.drawCalls == expected.drawCalls &&
        actual.trianglesSubmitted == expected.trianglesSubmitted &&
        actual.trianglesCulled == expected.trianglesCulled &&
        actual.instancesSubmitted == expected.instancesSubmitted &&
        actual.instancesCulled == expected.instancesCulled &&
        actual.liveGpuBytes == expected.liveGpuBytes &&
        actual.peakGpuBytes == expected.peakGpuBytes &&
        actual.resourceCreateCount == expected.resourceCreateCount &&
        actual.resourceDeleteCount == expected.resourceDeleteCount &&
        actual.passStats.length == expected.passStats.length,
    'frame $frame counters drifted from warm-up telemetry',
  );
  for (final entry in expected.passStats.entries) {
    final expectedPass = entry.value;
    final actualPass = actual.passStats[entry.key];
    require(
      actualPass != null &&
          actualPass.drawCalls == expectedPass.drawCalls &&
          actualPass.trianglesSubmitted == expectedPass.trianglesSubmitted &&
          actualPass.trianglesCulled == expectedPass.trianglesCulled &&
          actualPass.instancesSubmitted == expectedPass.instancesSubmitted &&
          actualPass.instancesCulled == expectedPass.instancesCulled,
      'frame $frame pass ${entry.key} telemetry drifted',
    );
  }
}

FrameInput _frame(int frameIndex) => FrameInput(
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
  environment: const FrameEnvironment(
    clearColor: LinearColor(0.03, 0.02, 0.01),
  ),
  post: const PostProcessState(exposure: 1.0, vignette: 0.2, grain: 0.1),
  frameIndex: frameIndex,
  historyEpoch: 0,
  noiseSeed: 7,
  timeSeconds: frameIndex / 60,
);
