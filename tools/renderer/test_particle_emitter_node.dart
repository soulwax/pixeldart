import 'package:pixeldart/pixeldart.dart';

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

final class _CollectingEncoder implements RenderEncoder {
  final items = <RetainedItemDescriptor>[];

  @override
  void submit(RetainedItemDescriptor item) => items.add(item);
}

FrameInput _mockFrame() {
  return FrameInput(
    camera: CameraView.look(
      eye: const Vec3(0, 5, 20),
      forward: const Vec3(0, 0, -1),
      fovYRadians: 1.0,
      aspect: 16 / 9,
      near: 0.1,
      far: 200.0,
    ),
    environment: const FrameEnvironment(),
    post: PostProcessState.off,
    frameIndex: 1,
    historyEpoch: 0,
    noiseSeed: 1,
    timeSeconds: 0.5,
  );
}

void main() {
  const mesh = MeshHandle(1, 1, 'torch_particle');
  const mat = MaterialHandle(2, 1, 'torch_mat');

  final emitter = ParticleEmitter(
    mesh: mesh,
    material: mat,
    shape: const PointShape(),
    rate: 20.0,
    minSpeed: 0.0,
    maxSpeed: 0.0,
    minLifetime: 2.0,
    maxParticles: 50,
    seed: 42,
  );

  final emitterNode = ParticleEmitterNode(
    name: 'torch_fire',
    emitter: emitter,
    simulateInWorldSpace: true,
  );

  final parentNode = SceneNode(name: 'character');
  parentNode.addChild(emitterNode);

  // 1. Initial state
  _require(emitterNode.activeParticleCount == 0, 'No active particles initially');
  _require(emitterNode.capacity == 50, 'Capacity matches emitter');
  _require(emitterNode.instanceFamilyKey == emitter.instanceFamilyKey, 'Family key propagated');

  // 2. Hierarchical transform propagation
  parentNode.position = const Vec3(10, 2, -5);
  emitterNode.position = const Vec3(0, 1, 0); // Torch held 1m above character
  // Effective world position: (10, 3, -5)

  emitterNode.update(0.1);
  _require(emitterNode.activeParticleCount > 0, 'Particles spawned after update');

  final bounds = emitterNode.worldBounds;
  _require(bounds != null, 'World bounds exist for active particles');
  _require((bounds!.center.x - 10.0).abs() < 0.1, 'Spawned near parent X (10.0): ${bounds.center.x}');
  _require((bounds.center.y - 3.0).abs() < 0.1, 'Spawned near parent Y (3.0): ${bounds.center.y}');
  _require((bounds.center.z - -5.0).abs() < 0.1, 'Spawned near parent Z (-5.0): ${bounds.center.z}');

  // 3. World space simulation leaves trail behind
  parentNode.position = const Vec3(20, 2, -5);
  emitterNode.update(0.1);

  // New particles spawn at (20, 3, -5), old particles remain near (10, 3, -5)
  final trailBounds = emitterNode.worldBounds!;
  _require(trailBounds.min.x < 11.0, 'Old particle remained at previous world pos: ${trailBounds.min.x}');
  _require(trailBounds.max.x > 19.0, 'New particle spawned at new world pos: ${trailBounds.max.x}');

  // 4. Submission
  final encoder = _CollectingEncoder();
  final submitted = emitterNode.submit(encoder, _mockFrame());
  _require(submitted == emitterNode.activeParticleCount, 'All particles submitted');
  _require(encoder.items.length == submitted, 'Encoder items match active count');

  print('ParticleEmitterNode fixtures passed.');
}
