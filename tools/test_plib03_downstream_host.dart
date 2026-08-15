import 'package:pixeldart/pixeldart.dart' as stable;
import 'package:pixeldart/pixeldart_advanced.dart' as advanced;

import 'renderer/fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

/// A downstream-style host: no game imports, assets, browser DOM, or internal
/// renderer paths. The fake device is fixture-owned and stands in for a host
/// backend adapter.
Future<void> main() async {
  final device = FakeGpuDevice();
  final renderer = const advanced.DefaultSceneRendererFactory().create(device);
  await renderer.initialize(
    stable.RendererConfiguration.safe,
    const stable.SurfaceMetrics(
      cssWidth: 320,
      cssHeight: 180,
      pixelWidth: 320,
      pixelHeight: 180,
    ),
  );
  final world = renderer.createWorld();
  final projection = stable.Mat4.perspective(
    fovYRadians: 1,
    aspect: 16 / 9,
    near: 0.1,
    far: 100,
  );
  final camera = stable.CameraView(
    view: stable.Mat4.identity(),
    projection: projection,
    viewProjection: projection,
    eye: stable.Vec3.zero,
    forward: const stable.Vec3(0, 0, 1),
    near: 0.1,
    far: 100,
    aspect: 16 / 9,
  );
  renderer.beginFrame(
    world,
    stable.FrameInput(
      camera: camera,
      environment: const stable.FrameEnvironment(),
      post: stable.PostProcessState.off,
      frameIndex: 0,
      historyEpoch: 0,
      noiseSeed: 0,
      timeSeconds: 0,
    ),
  );
  final stats = renderer.endFrame();
  require(stats.frameIndex == 0, 'downstream frame did not execute');
  world.dispose();
  renderer.dispose();
  require(device.liveObjectCount == 0, 'downstream host leaked GPU resources');
  print('PLIB-03 downstream host tests passed.');
}
