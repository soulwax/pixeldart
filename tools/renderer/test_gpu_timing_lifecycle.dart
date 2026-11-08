import 'package:pixeldart/rendering/rendering.dart';

import 'fake_gpu_device.dart';

Future<void> main() async {
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  await renderer.initialize(RendererConfiguration.safe, _surface());
  final world = renderer.createWorld();

  renderer.beginFrame(world, _frame(1));
  renderer.endFrame();
  require(
    renderer.pollGpuTiming().status == GpuTimingStatus.pending,
    'timer should be delayed before context loss',
  );
  device.simulateContextLoss();
  final disjoint = renderer.pollGpuTiming();
  require(
    disjoint.status == GpuTimingStatus.disjoint && device.liveTimerCount == 0,
    'context loss must invalidate and release pending timers',
  );

  var rejected = false;
  try {
    renderer.beginFrame(world, _frame(2));
  } catch (_) {
    rejected = true;
  }
  require(rejected, 'lost context accepted a frame');
  device.simulateContextRestore();
  renderer.beginFrame(world, _frame(3));
  renderer.abortFrame();
  require(device.liveTimerCount == 0, 'abort leaked an active timer');

  renderer.beginFrame(world, _frame(4));
  renderer.endFrame();
  require(
    renderer.pollGpuTiming().status == GpuTimingStatus.pending &&
        renderer.pollGpuTiming().status == GpuTimingStatus.ready,
    'restored timer did not complete normally',
  );
  renderer.dispose();
  require(
    device.timerBeginCalls == 3 &&
        device.timerEndCalls == 2 &&
        device.timerDeleteCalls == 3,
    'timer lifecycle counts did not balance across loss/abort/restore',
  );

  final unsupportedDevice = FakeGpuDevice(timerQueries: false);
  final unsupported = SceneRendererImpl(unsupportedDevice);
  await unsupported.initialize(RendererConfiguration.safe, _surface());
  require(
    unsupported.pollGpuTiming().status == GpuTimingStatus.unsupported,
    'unsupported adapter was not labelled before a frame',
  );
  final unsupportedWorld = unsupported.createWorld();
  unsupported.beginFrame(unsupportedWorld, _frame(5));
  unsupported.endFrame();
  require(
    unsupported.pollGpuTiming().status == GpuTimingStatus.unsupported,
    'unsupported adapter was not labelled after a frame',
  );
  unsupported.dispose();
  print('GPU timing lifecycle fixture passed.');
}

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

SurfaceMetrics _surface() => const SurfaceMetrics(
  cssWidth: 320,
  cssHeight: 180,
  pixelWidth: 320,
  pixelHeight: 180,
);

FrameInput _frame(int index) => FrameInput(
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
  environment: const FrameEnvironment(clearColor: LinearColor.black),
  post: const PostProcessState(),
  frameIndex: index,
  historyEpoch: 0,
  noiseSeed: 1,
  timeSeconds: index / 60,
);
