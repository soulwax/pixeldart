import 'package:pixeldart/pixeldart_advanced.dart';

import 'renderer/fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() async {
  final device = FakeGpuDevice();
  final factory = const DefaultSceneRendererFactory();
  final renderer = factory.create(device);
  require(renderer.state == RendererState.constructed, 'factory allocated before initialize');
  require(device.liveObjectCount == 0, 'factory created GPU resources');

  await renderer.initialize(
    RendererConfiguration.safe,
    const SurfaceMetrics(cssWidth: 320, cssHeight: 180, pixelWidth: 320, pixelHeight: 180),
  );
  require(renderer.state == RendererState.ready, 'renderer did not become ready');
  final world = renderer.createWorld();
  var illegalEndFrame = false;
  try {
    renderer.endFrame();
  } on StateError {
    illegalEndFrame = true;
  }
  require(illegalEndFrame, 'endFrame without beginFrame was accepted');
  world.dispose();
  renderer.dispose();
  renderer.dispose();
  require(renderer.state == RendererState.disposed, 'dispose was not idempotent');
  print('PLIB-02 renderer factory tests passed.');
}
