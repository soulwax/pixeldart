import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/assets/model_cache.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

Uint8List qmesh({int offset = 0}) {
  const stride = 14;
  final bytes = Uint8List(36 + 3 * stride * 4);
  final view = ByteData.sublistView(bytes);
  bytes.setAll(0, const [0x51, 0x4D, 0x53, 0x48]);
  view.setUint16(4, 1, Endian.little);
  view.setUint16(6, stride, Endian.little);
  view.setUint32(8, 3, Endian.little);
  for (var i = 0; i < 6; i++) {
    view.setFloat32(12 + i * 4, i < 3 ? -1 : 1, Endian.little);
  }
  for (var vertex = 0; vertex < 3; vertex++) {
    final base = 36 + vertex * stride * 4;
    view.setFloat32(
      base,
      (vertex == 1 ? 1 : 0) + offset.toDouble(),
      Endian.little,
    );
    view.setFloat32(base + 4, vertex == 2 ? 1 : 0, Endian.little);
    view.setFloat32(base + 8, 0, Endian.little);
    view.setFloat32(base + 12, 0, Endian.little);
    view.setFloat32(base + 16, 0, Endian.little);
    view.setFloat32(base + 20, 1, Endian.little);
  }
  return bytes;
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
  final resources = renderer.resources;
  final world = renderer.createWorld();
  final material = resources.registerMaterial(
    const MaterialDefinition(key: 'room'),
  );
  final package = ValidatedModelPackage(
    manifest: ModelPackageManifest(
      assetId: 'room',
      packageHash: '0' * 64,
      sourceFormat: 'gltf',
      lods: const ['LOD-S', 'LOD0', 'LOD1', 'LOD2'],
      materials: ['room'],
      parts: [
        const ModelPackagePart(
          id: 'shell',
          materialSlot: 0,
          lodFiles: {'LOD0': 'shell-0.qmesh', 'LOD1': 'shell-1.qmesh'},
        ),
      ],
    ),
    payloads: {'shell-0.qmesh': qmesh(), 'shell-1.qmesh': qmesh(offset: 2)},
  );
  final cache = ModelCache();
  final binding = ModelPackageSceneBinding(
    package: package,
    cache: cache,
    resources: resources,
    world: world,
    materialForSlot: (_) => material,
    transform: Transform.at(const Vec3(4, 0, 0)),
    visibilityMask: 4,
  );
  binding.attach();
  require(
    binding.itemCount == 1 && world.items.length == 1,
    'attach creates one retained item',
  );
  require(
    world.items.single.descriptor.visibilityMask == 4 &&
        world.items.single.descriptor.transform.translation.x == 4,
    'placement transform and visibility reach the retained descriptor',
  );
  binding.switchLod('LOD1');
  require(
    binding.activeLod == 'LOD1' && world.items.length == 1,
    'LOD switch is transactional',
  );
  binding.dispose();
  binding.dispose();
  require(
    world.items.isEmpty && cache.cachedCount == 0,
    'dispose releases world and cache ownership',
  );
  final broken = ModelPackageSceneBinding(
    package: package,
    cache: cache,
    resources: resources,
    world: world,
    materialForSlot: (_) => MaterialHandle.invalid,
  );
  var failed = false;
  try {
    broken.attach();
  } catch (error) {
    failed = error is StateError;
  }
  require(
    failed && world.items.isEmpty && cache.cachedCount == 0,
    'failed attach rolls back all ownership',
  );
  for (var cycle = 0; cycle < 100; cycle++) {
    final soak = ModelPackageSceneBinding(
      package: package,
      cache: cache,
      resources: resources,
      world: world,
      materialForSlot: (_) => material,
      visibilityMask: 4,
    );
    soak.attach();
    soak.switchLod('LOD1');
    soak.switchLod('LOD0');
    soak.dispose();
    require(
      world.items.isEmpty && cache.cachedCount == 0,
      'cycle $cycle leaked model binding ownership',
    );
  }
  final recovery = ModelPackageSceneBinding(
    package: package,
    cache: cache,
    resources: resources,
    world: world,
    materialForSlot: (_) => material,
  );
  recovery.attach();
  device.simulateContextLoss();
  var lossRejected = false;
  try {
    renderer.beginFrame(
      world,
      FrameInput(
        camera: CameraView(
          view: Mat4.identity(),
          projection: Mat4.identity(),
          viewProjection: Mat4.identity(),
          eye: Vec3.zero,
          forward: const Vec3(0, 0, 1),
          near: 0.1,
          far: 100,
          aspect: 16 / 9,
        ),
        environment: const FrameEnvironment(),
        post: PostProcessState.off,
        frameIndex: 1,
        historyEpoch: 1,
        noiseSeed: 1,
        timeSeconds: 0,
      ),
    );
  } catch (_) {
    lossRejected = true;
  }
  require(lossRejected, 'context loss must reject model frame submission');
  device.simulateContextRestore();
  final restored = renderer.beginFrame(
    world,
    FrameInput(
      camera: CameraView(
        view: Mat4.identity(),
        projection: Mat4.identity(),
        viewProjection: Mat4.identity(),
        eye: Vec3.zero,
        forward: const Vec3(0, 0, 1),
        near: 0.1,
        far: 100,
        aspect: 16 / 9,
      ),
      environment: const FrameEnvironment(),
      post: PostProcessState.off,
      frameIndex: 2,
      historyEpoch: 2,
      noiseSeed: 2,
      timeSeconds: 0,
    ),
  );
  restored.submit(world.items.single.descriptor);
  renderer.endFrame();
  require(recovery.itemCount == 1, 'context restore lost retained model item');
  recovery.dispose();
  require(world.items.isEmpty && cache.cachedCount == 0, 'context recovery leaked model ownership');
  renderer.dispose();
  print('RF-06 model package scene binding tests passed.');
}
