import 'package:pixeldart/pixeldart.dart';

final class _CollectingEncoder implements RenderEncoder {
  final items = <RetainedItemDescriptor>[];

  @override
  void submit(RetainedItemDescriptor item) => items.add(item);
}

void main() {
  _testPresets();
  _testFogEnvironment();
  print('Atmospheric presets and environment tests passed.');
}

void _testPresets() {
  const mesh = MeshHandle(1, 1, 'particle_mesh');
  const mat = MaterialHandle(1, 1, 'particle_mat');

  final presets = <String, AtmosphericParticleField>{
    'floatingEmbers': AtmosphericPresets.floatingEmbers(
      mesh: mesh,
      material: mat,
      particleCount: 32,
    ),
    'dustMotes': AtmosphericPresets.dustMotes(
      mesh: mesh,
      material: mat,
      particleCount: 32,
    ),
    'snow': AtmosphericPresets.snow(
      mesh: mesh,
      material: mat,
      particleCount: 32,
    ),
    'rain': AtmosphericPresets.rain(
      mesh: mesh,
      material: mat,
      particleCount: 32,
    ),
    'cosmicDust': AtmosphericPresets.cosmicDust(
      mesh: mesh,
      material: mat,
      particleCount: 32,
    ),
  };

  final frame = FrameInput(
    camera: CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: const Vec3(0, 2, 5),
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 1,
    ),
    environment: const FrameEnvironment(),
    post: PostProcessState.off,
    frameIndex: 0,
    historyEpoch: 0,
    noiseSeed: 0,
    timeSeconds: 1.0,
  );

  for (final entry in presets.entries) {
    final name = entry.key;
    final field = entry.value;

    // Validate field definition
    field.validate();

    // Verify deterministic frame stats
    final stats = field.frameStats(frame);
    stats.validate();
    assert(stats.candidateCount == 32, '$name candidate count should be 32');

    // Verify submission to encoder
    final encoder = _CollectingEncoder();
    final submitted = field.submit(encoder, frame);
    assert(submitted == 32, '$name submitted count should be 32');
    assert(encoder.items.length == 32, '$name encoder should have 32 items');

    // Verify diagnostics
    final budget = AtmosphericParticleBudget(
      requestedCount: 32,
      maximumCount: 64,
    );
    final diag = field.diagnostics(frame, budget: budget);
    diag.validate();
    assert(diag.effectiveCount == 32);
    assert(!diag.budgetCapped);
  }
}

void _testFogEnvironment() {
  var env = const FrameEnvironment();
  assert(env.fogEnd >= env.fogStart);

  // Configure fog
  env = env.copyWith(
    fogColor: const LinearColor(0.1, 0.1, 0.1),
    fogStart: 10.0,
    fogEnd: 80.0,
    fogDensity: 0.05,
    fogHeightFalloff: 0.1,
  );
  env.validate();
  assert(env.fogStart == 10.0);
  assert(env.fogEnd == 80.0);
  assert(env.fogDensity == 0.05);
  assert(env.fogHeightFalloff == 0.1);

  // Configure volumetric participating medium
  env = env.copyWith(
    volumetricAlbedo: LinearColor.white,
    volumetricIntensity: 1.5,
    volumetricHeightFalloff: 0.03,
    volumetricDustDensity: 0.04,
    volumetricAnisotropy: 0.65,
    volumetricSampleCount: 16,
  );
  env.validate();
  assert(env.volumetricIntensity == 1.5);
  assert(env.volumetricDustDensity == 0.04);
  assert(env.volumetricSampleCount == 16);
}
