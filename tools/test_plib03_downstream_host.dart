import 'dart:typed_data';

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
  final mesh = renderer.resources.registerMesh(
    stable.MeshData(
      layout: stable.VertexLayoutDescriptor.compatibility14,
      vertices: Float32List.fromList([
        // position       normal        colour/glow   alpha uv    effect
        -0.5, -0.5, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0,
        0.5, -0.5, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
        0.0, 0.5, 0, 0, 0, 1, 1, 1, 1, 0, 0.5, 1, 0, 0,
      ]),
      indices: Uint16List.fromList([0, 1, 2]),
      localBounds: const stable.Aabb(
        stable.Vec3(-0.5, -0.5, 0),
        stable.Vec3(0.5, 0.5, 0),
      ),
    ),
    debugLabel: 'neutral-triangle',
  );
  final material = renderer.resources.registerMaterial(
    const stable.MaterialDefinition(key: 'neutral-material'),
  );
  world.addItem(stable.RetainedItemDescriptor(mesh: mesh, material: material));
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
      environment: const stable.FrameEnvironment(
        ambientColor: stable.LinearColor.white,
        ambientIntensity: 0.2,
        directionalLight: stable.DirectionalLight(
          direction: stable.Vec3(0, 0, -1),
          color: stable.LinearColor.white,
        ),
      ),
      post: stable.PostProcessState.off,
      frameIndex: 0,
      historyEpoch: 0,
      noiseSeed: 0,
      timeSeconds: 0,
    ),
  );
  final stats = renderer.endFrame();
  require(stats.frameIndex == 0, 'downstream frame did not execute');
  require(
    renderer.capabilities.webglVersion == 'fake-2.0',
    'downstream host did not receive effective capabilities',
  );

  renderer.resize(
    const stable.SurfaceMetrics(
      cssWidth: 640,
      cssHeight: 360,
      pixelWidth: 640,
      pixelHeight: 360,
    ),
  );
  final resizedFrame = renderer.beginFrame(
    world,
    stable.FrameInput(
      camera: camera,
      environment: const stable.FrameEnvironment(),
      post: stable.PostProcessState.off,
      frameIndex: 1,
      historyEpoch: 0,
      noiseSeed: 1,
      timeSeconds: 1,
    ),
  );
  resizedFrame.submit(
    stable.RetainedItemDescriptor(mesh: mesh, material: material),
  );
  require(renderer.endFrame().frameIndex == 1, 'resize frame did not execute');

  device.simulateContextLoss();
  var rejectedDuringLoss = false;
  try {
    renderer.beginFrame(
      world,
      stable.FrameInput(
        camera: camera,
        environment: const stable.FrameEnvironment(),
        post: stable.PostProcessState.off,
        frameIndex: 2,
        historyEpoch: 1,
        noiseSeed: 2,
        timeSeconds: 2,
      ),
    );
  } catch (_) {
    rejectedDuringLoss = true;
  }
  require(rejectedDuringLoss, 'context loss accepted a frame');
  device.simulateContextRestore();
  final restoredFrame = renderer.beginFrame(
    world,
    stable.FrameInput(
      camera: camera,
      environment: const stable.FrameEnvironment(),
      post: stable.PostProcessState.off,
      frameIndex: 2,
      historyEpoch: 1,
      noiseSeed: 2,
      timeSeconds: 2,
    ),
  );
  restoredFrame.submit(
    stable.RetainedItemDescriptor(mesh: mesh, material: material),
  );
  require(renderer.endFrame().frameIndex == 2, 'restore frame did not execute');
  world.dispose();
  renderer.dispose();
  require(device.liveObjectCount == 0, 'downstream host leaked GPU resources');
  print('PLIB-03 downstream host tests passed.');
}
