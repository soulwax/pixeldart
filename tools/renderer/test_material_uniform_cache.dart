import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError('material uniform cache: $message');
}

List<double> sent(FakeGpuDevice device, String name) => device.uniformLog
    .where((entry) => entry.name == name)
    .map((entry) => (entry.value.value as double))
    .toList();

List<double> worldSent(FakeGpuDevice device, String name) {
  // The first coverage upload identifies the world pass. Its first cutoff
  // upload precedes it; earlier cutoff/affine uploads belong to depth passes.
  final uniforms = device.uniformLog;
  final coverage = uniforms.indexWhere(
    (entry) => entry.name == 'uOpaqueCoverage',
  );
  require(coverage >= 0, 'world pass did not upload coverage');
  final start = uniforms.lastIndexWhere(
    (entry) => entry.name == 'uAlphaCutoff',
    coverage,
  );
  require(start >= 0, 'world pass did not upload its first cutoff');
  return uniforms
      .skip(start)
      .where((entry) => entry.name == name)
      .map((entry) => entry.value.value as double)
      .toList();
}

Future<void> main() async {
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  await renderer.initialize(
    const RendererConfiguration(
      profile: QualityProfile.minimal,
      internalWidth: 64,
      internalHeight: 64,
      shadowMapCount: 1,
    ),
    SurfaceMetrics.pixels(width: 64, height: 64),
  );
  final mesh = renderer.resources.registerMesh(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(42),
      localBounds: const Aabb(Vec3(-0.2, -0.2, -0.2), Vec3(0.2, 0.2, 0.2)),
    ),
  );
  final opaque = renderer.resources.registerMaterial(
    const MaterialDefinition(key: 'opaque'),
  );
  final masked = renderer.resources.registerMaterial(
    const MaterialDefinition(
      key: 'masked',
      alphaMode: AlphaMode.masked,
      alphaCutoff: 0.6,
      affineSampling: true,
    ),
  );
  final world = renderer.createWorld();
  final encoder = renderer.beginFrame(
    world,
    FrameInput(
      camera: CameraView(
        view: Mat4.identity(),
        projection: Mat4.identity(),
        viewProjection: Mat4.identity(),
        eye: Vec3.zero,
        forward: const Vec3(0, 0, -1),
        near: 0.1,
        far: 100,
        aspect: 1,
      ),
      environment: const FrameEnvironment(),
      post: const PostProcessState(affineWarpStrength: 0.8),
      frameIndex: 1,
      historyEpoch: 0,
      noiseSeed: 1,
      timeSeconds: 0,
    ),
  );
  encoder.submit(RetainedItemDescriptor(mesh: mesh, material: opaque));
  encoder.submit(RetainedItemDescriptor(mesh: mesh, material: opaque));
  encoder.submit(RetainedItemDescriptor(mesh: mesh, material: masked));
  encoder.submit(
    RetainedItemDescriptor(
      mesh: mesh,
      material: opaque,
      drawMode: DrawMode.blended,
    ),
  );
  final stats = renderer.endFrame();
  require(
    stats.passStats['shadowedWorld']?.drawCalls == 4,
    'all four world items must draw',
  );
  require(
    worldSent(device, 'uAlphaCutoff').toString() == '[0.0, 0.6, 0.0]',
    'cutout must change only at material transitions: '
    '${sent(device, 'uAlphaCutoff')}',
  );
  require(
    worldSent(device, 'uOpaqueCoverage').toString() == '[1.0, 0.0]',
    'coverage must change when the blended item starts: '
    '${sent(device, 'uOpaqueCoverage')}',
  );
  require(
    worldSent(device, 'uAffineWarpStrength').toString() == '[0.0, 0.8, 0.0]',
    'affine strength must follow the material: '
    '${sent(device, 'uAffineWarpStrength')}',
  );
  renderer.dispose();
  require(device.liveObjectCount == 0, 'GPU objects leaked');
  print('Renderer material uniform cache fixtures passed.');
}
