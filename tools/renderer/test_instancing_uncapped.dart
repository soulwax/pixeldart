import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/instanced_stream.dart';

import 'fake_gpu_device.dart';

/// `[S1-B]` Uncapped instancing gate:
/// Proves 4,096 instances of an indexed mesh go out in exactly ONE recorded
/// `drawElementsInstanced(..., 4096)` call with per-instance vertex attribute
/// divisors and zero 16-per-draw splitting.
Future<void> main() async {
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  await renderer.initialize(
    RendererConfiguration.safe,
    const SurfaceMetrics(
      cssWidth: 320,
      cssHeight: 180,
      pixelWidth: 320,
      pixelHeight: 180,
    ),
  );

  final library = renderer.resources as ResourceLibraryImpl;
  final mesh = library.registerMesh(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(42),
      indices: Uint16List.fromList([0, 1, 2]),
      localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
    ),
  );
  final material = library.registerMaterial(
    const MaterialDefinition(key: 'forest-tree'),
  );

  const instanceCount = 4096;
  final world = renderer.createWorld();
  for (var i = 0; i < instanceCount; i++) {
    world.addItem(
      RetainedItemDescriptor(
        mesh: mesh,
        material: material,
        transform: Transform.at(Vec3((i % 64) * 0.01, 0, -(i ~/ 64) * 0.01)),
        instanceFamilyKey: 1,
      ),
    );
  }

  final frame = FrameInput(
    camera: CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: Vec3.zero,
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 500,
      aspect: 16 / 9,
    ),
    environment: const FrameEnvironment(
      clearColor: LinearColor(0.02, 0.02, 0.02),
    ),
    post: const PostProcessState(),
    frameIndex: 1,
    historyEpoch: 0,
    noiseSeed: 1,
    timeSeconds: 0,
  );

  device.drawLog.clear();
  renderer.beginFrame(world, frame);
  renderer.endFrame();

  final instancedDraws = device.drawLog
      .where((entry) => entry.startsWith('drawElementsInstanced('))
      .toList();
  if (instancedDraws.length != 1) {
    throw StateError(
      'Expected exactly 1 drawElementsInstanced call for $instanceCount '
      'instances, got ${instancedDraws.length}: $instancedDraws',
    );
  }
  if (!instancedDraws.single.contains('$instanceCount')) {
    throw StateError(
      'Expected drawElementsInstanced to draw $instanceCount instances, '
      'got ${instancedDraws.single}',
    );
  }
  if (!device.drawLog.contains('vertexAttribDivisor(7, 1)')) {
    throw StateError('Missing per-instance vertexAttribDivisor(7, 1)');
  }

  // Verify FrameBlockUbo & SkinBlockUbo packing helpers
  final frameBytes = FrameBlockUbo.pack(
    viewProjection: Mat4.identity(),
    view: Mat4.identity(),
    cameraPosition: const Vec3(1, 2, 3),
    timeSeconds: 1.5,
    exposure: 1.2,
  );
  if (frameBytes.lengthInBytes != FrameBlockUbo.byteLength) {
    throw StateError('FrameBlockUbo byteLength mismatch');
  }
  if (SkinBlockUbo.maxJoints != 256 || SkinBlockUbo.byteLength != 16384) {
    throw StateError('SkinBlockUbo must support 256 joints (16384 bytes)');
  }

  renderer.dispose();
  print('Uncapped 4,096-instance single-draw test passed.');
}
