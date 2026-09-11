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
      eye: const Vec3(0, 5, 15),
      forward: const Vec3(0, -0.2, -1),
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
  const mesh = MeshHandle(1, 1, 'particle');
  const mat = MaterialHandle(2, 1, 'particle_mat');
  final frame = _mockFrame();

  final presets = <String, ParticleEmitter>{
    'campfire': ParticlePresets.campfire(mesh: mesh, material: mat),
    'explosion': ParticlePresets.explosion(mesh: mesh, material: mat),
    'smokePlume': ParticlePresets.smokePlume(mesh: mesh, material: mat),
    'bouncingSparks': ParticlePresets.bouncingSparks(mesh: mesh, material: mat),
    'swirlingVortex': ParticlePresets.swirlingVortex(mesh: mesh, material: mat),
    'waterFountain': ParticlePresets.waterFountain(mesh: mesh, material: mat),
    'fireflies': ParticlePresets.fireflies(mesh: mesh, material: mat),
    'warpSpeed': ParticlePresets.warpSpeed(mesh: mesh, material: mat),
    'confetti': ParticlePresets.confetti(mesh: mesh, material: mat),
    'blizzard': ParticlePresets.blizzard(mesh: mesh, material: mat),
  };

  for (final entry in presets.entries) {
    final name = entry.key;
    final emitter = entry.value;

    emitter.validate();

    // Advance simulation
    emitter.update(0.2);

    _require(emitter.activeCount > 0, 'Preset "$name" must have active particles after update');

    final bounds = emitter.computeBounds();
    _require(bounds.isValid, 'Preset "$name" bounds must be valid');

    final encoder = _CollectingEncoder();
    final submitted = emitter.submit(encoder, frame);

    _require(submitted > 0, 'Preset "$name" must submit particles: got $submitted');
    _require(encoder.items.isNotEmpty, 'Preset "$name" encoder received descriptors');
    _require(
      encoder.items.every((it) => it.instanceFamilyKey == emitter.instanceFamilyKey),
      'Preset "$name" instanceFamilyKey applied',
    );
  }

  print('All 10 particle presets verified successfully.');
}
