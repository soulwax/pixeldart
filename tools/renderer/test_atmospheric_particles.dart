import 'package:pixeldart/rendering/rendering.dart';

void main() {
  for (final (profile, maximum) in const [
    (QualityProfile.safe, 0),
    (QualityProfile.minimal, 32),
    (QualityProfile.clean, 96),
    (QualityProfile(QualityProfileKind.deterministicReference, {}), 64),
    (QualityProfile.cinematic, 96),
    (QualityProfile.ps1Full, 128),
    (QualityProfile(QualityProfileKind.legacyComparison, {}), 32),
  ]) {
    final profileBudget = AtmosphericParticleBudget.forProfile(
      profile: profile,
      requestedCount: 200,
    );
    _require(
      profileBudget.maximumCount == maximum &&
          profileBudget.effectiveCount == maximum &&
          profileBudget.wasCapped,
      'profile atmospheric budget did not resolve for ${profile.kind.name}',
    );
  }

  const budget = AtmosphericParticleBudget(
    requestedCount: 32,
    maximumCount: 12,
  );
  budget.validate();
  _require(budget.effectiveCount == 12, 'particle budget did not cap request');
  _require(budget.wasCapped, 'particle budget did not report its cap');

  final frame = FrameInput(
    camera: CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: const Vec3(10, 2, -4),
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 16 / 9,
    ),
    environment: const FrameEnvironment(),
    post: PostProcessState.off,
    frameIndex: 7,
    historyEpoch: 0,
    noiseSeed: 99,
    timeSeconds: 1.25,
  );
  const field = AtmosphericParticleField(
    mesh: MeshHandle(1, 1, 'drop'),
    material: MaterialHandle(2, 1, 'rain'),
    anchor: AtmosphericParticleAnchor.camera,
    origin: Vec3(0, 3, 0),
    halfExtents: Vec3(2, 1, 2),
    initialVelocity: Vec3(0.5, -4, 0),
    acceleration: Vec3(0, -9.81, 0),
    lifetimeSeconds: 0.75,
    particleCount: 3,
    seed: 42,
    particleScale: 0.5,
    instanceFamilyKey: 77,
  );
  final fieldDiagnostics = field.diagnostics(
    frame,
    budget: const AtmosphericParticleBudget(
      requestedCount: 3,
      maximumCount: 12,
    ),
  );
  _require(
    fieldDiagnostics.requestedCount == 3 &&
        fieldDiagnostics.effectiveCount == 3 &&
        !fieldDiagnostics.budgetCapped &&
        fieldDiagnostics.candidateCount == 3 &&
        fieldDiagnostics.averageSpeedMps.isFinite,
    'atmospheric diagnostic snapshot did not reconcile',
  );
  _throws(
    () => field.diagnostics(
      frame,
      budget: const AtmosphericParticleBudget(
        requestedCount: 32,
        maximumCount: 2,
      ),
    ),
    'atmospheric diagnostics accepted an unapplied budget',
  );

  final first = field.sampleTransform(frame, 0);
  final again = field.sampleTransform(frame, 0);
  _require(first.translation == again.translation, 'sampling must be stable');
  _require(first.scale == 0.5, 'particle scale was not retained');
  _require(first.translation.x > 8, 'camera anchor was not applied');

  final visibleStats = field.frameStats(frame);
  _require(
    visibleStats.candidateCount == 3 &&
        visibleStats.visibleCount + visibleStats.culledCount == 3,
    'particle visibility stats did not reconcile',
  );

  const outsideField = AtmosphericParticleField(
    mesh: MeshHandle(1, 1, 'drop'),
    material: MaterialHandle(2, 1, 'rain'),
    origin: Vec3(10, 0, 0),
    lifetimeSeconds: 1,
    particleCount: 2,
    seed: 1,
  );
  final outsideStats = outsideField.frameStats(frame);
  _require(
    outsideStats.visibleCount == 0 && outsideStats.culledCount == 2,
    'frustum stats did not reject an outside field',
  );

  const physicalField = AtmosphericParticleField(
    mesh: MeshHandle(1, 1, 'drop'),
    material: MaterialHandle(2, 1, 'rain'),
    initialVelocity: Vec3(0, -1, 0),
    acceleration: Vec3(0, -9.81, 0),
    lifetimeSeconds: 100,
    particleCount: 1,
    seed: 3,
  );
  final beforeFall = physicalField.sampleTransform(_withTime(frame, 0), 0);
  final afterFall = physicalField.sampleTransform(_withTime(frame, 0.1), 0);
  _require(
    afterFall.translation.y < beforeFall.translation.y,
    'gravity did not move the particle down',
  );

  const alignedField = AtmosphericParticleField(
    mesh: MeshHandle(1, 1, 'drop'),
    material: MaterialHandle(2, 1, 'rain'),
    initialVelocity: Vec3(1, -2, 0),
    lifetimeSeconds: 100,
    particleCount: 1,
    seed: 5,
    alignToVelocity: true,
  );
  final aligned = alignedField.sampleTransform(_withTime(frame, 0), 0);
  final alignedAxis = aligned.rotation.rotate(const Vec3(0, -1, 0));
  final expectedAxis = const Vec3(1, -2, 0).normalized;
  _require(
    (alignedAxis - expectedAxis).length < 1e-9,
    'velocity alignment did not follow the physical motion vector',
  );
  _require(
    aligned.rotation != Quat.identity,
    'non-vertical velocity did not produce a streak rotation',
  );

  const dragField = AtmosphericParticleField(
    mesh: MeshHandle(1, 1, 'drop'),
    material: MaterialHandle(2, 1, 'rain'),
    initialVelocity: Vec3(0, -2, 0),
    acceleration: Vec3(0, -9.81, 0),
    terminalVelocity: Vec3(0, -8.8, 0),
    dragCoefficient: 4.5,
    lifetimeSeconds: 1,
    particleCount: 1,
    seed: 4,
  );
  final initialSpeed = dragField.sampleVelocityAtAge(0).y;
  final midSpeed = dragField.sampleVelocityAtAge(0.25).y;
  final lateSpeed = dragField.sampleVelocityAtAge(1).y;
  final kinematics = dragField.sampleKinematics(_withTime(frame, 0.25), 0);
  _require(
    kinematics.age >= 0 && kinematics.age < dragField.lifetimeSeconds,
    'particle kinematics age did not remain inside its lifetime',
  );
  _require(
    kinematics.position != kinematics.spawnPosition &&
        kinematics.velocity.y ==
            dragField.sampleVelocityAtAge(kinematics.age).y,
    'particle kinematics did not expose integrated position and velocity',
  );
  _require(
    dragField.sampleTransform(_withTime(frame, 0.25), 0).translation ==
        kinematics.position,
    'transform and kinematics paths disagree on world position',
  );
  _require(initialSpeed == -2, 'drag field did not retain initial velocity');
  _require(
    midSpeed < initialSpeed && midSpeed > -8.8,
    'drag response overshot terminal speed',
  );
  _require(
    (lateSpeed + 8.8).abs() < (midSpeed + 8.8).abs(),
    'drag response did not approach terminal velocity',
  );
  _throws(
    () => const AtmosphericParticleField(
      mesh: MeshHandle(1, 1, 'drop'),
      material: MaterialHandle(2, 1, 'rain'),
      terminalVelocity: Vec3(0, -8.8, 0),
      lifetimeSeconds: 1,
      particleCount: 1,
      seed: 4,
    ).validate(),
    'terminal velocity without drag must be rejected',
  );

  final neutralFixtures = <(String, AtmosphericParticleField)>[
    (
      'snow',
      const AtmosphericParticleField(
        mesh: MeshHandle(1, 1, 'flake'),
        material: MaterialHandle(2, 1, 'snow'),
        halfExtents: Vec3(0.5, 0.5, 0.5),
        initialVelocity: Vec3(0.08, -0.7, 0.02),
        acceleration: Vec3(0, -0.2, 0),
        terminalVelocity: Vec3(0.08, -0.7, 0.02),
        dragCoefficient: 1.4,
        lifetimeSeconds: 4,
        particleCount: 5,
        seed: 11,
        particleScale: 0.08,
      ),
    ),
    (
      'mote',
      const AtmosphericParticleField(
        mesh: MeshHandle(1, 1, 'mote'),
        material: MaterialHandle(2, 1, 'dust'),
        anchor: AtmosphericParticleAnchor.camera,
        origin: Vec3(0, 0, 0),
        halfExtents: Vec3(0.8, 0.8, 0.8),
        initialVelocity: Vec3(0.02, 0.03, -0.01),
        acceleration: Vec3(0, 0, 0),
        lifetimeSeconds: 2,
        particleCount: 4,
        seed: 22,
        particleScale: 0.03,
      ),
    ),
    (
      'spark',
      const AtmosphericParticleField(
        mesh: MeshHandle(1, 1, 'spark'),
        material: MaterialHandle(2, 1, 'ember'),
        origin: Vec3(0, 0.25, 0),
        halfExtents: Vec3(0.2, 0.2, 0.2),
        initialVelocity: Vec3(0.2, 1.4, 0.1),
        acceleration: Vec3(0, -3.2, 0),
        lifetimeSeconds: 0.6,
        particleCount: 3,
        seed: 33,
        particleScale: 0.04,
        blendMode: BlendMode.additive,
      ),
    ),
  ];
  for (final (name, fixture) in neutralFixtures) {
    fixture.validate();
    final atStart = fixture.sampleTransform(_withTime(frame, 0), 0);
    final atLater = fixture.sampleTransform(_withTime(frame, 0.1), 0);
    _require(
      atStart.translation != atLater.translation,
      '$name fixture did not produce physical motion',
    );
    final stats = fixture.frameStats(frame);
    _require(
      stats.candidateCount == fixture.particleCount &&
          stats.visibleCount + stats.culledCount == stats.candidateCount,
      '$name fixture visibility stats did not reconcile',
    );
  }

  final encoder = _RecordingEncoder();
  final submitted = field.submit(encoder, frame);
  _require(submitted == 3, 'unexpected submitted count: $submitted');
  _require(encoder.items.length == 3, 'encoder did not receive all particles');
  _require(
    encoder.items.every(
      (item) =>
          item.drawMode == DrawMode.blended &&
          item.instanceFamilyKey == 77 &&
          !item.castsShadow,
    ),
    'particle draw contract was not retained',
  );
  final filteredEncoder = _RecordingEncoder();
  final filtered = field.submitFiltered(
    filteredEncoder,
    frame,
    (kinematics) => kinematics.position.y > 2.5,
  );
  _require(
    filtered == filteredEncoder.items.length && filtered < submitted,
    'host particle filter did not remove crossed particles',
  );
  _throws(
    () => const AtmosphericParticleField(
      mesh: MeshHandle.invalid,
      material: MaterialHandle.invalid,
      lifetimeSeconds: 1,
      particleCount: 1,
      seed: 0,
    ).validate(),
    'invalid resources must be rejected',
  );
  _throws(() => field.sampleTransform(frame, 3), 'out-of-range particle index');
  print('Atmospheric particle field fixtures passed.');
}

final class _RecordingEncoder implements RenderEncoder {
  final List<RetainedItemDescriptor> items = [];

  @override
  void submit(RetainedItemDescriptor transientItem) => items.add(transientItem);
}

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void _throws(void Function() action, String message) {
  try {
    action();
  } catch (_) {
    return;
  }
  throw StateError(message);
}

FrameInput _withTime(FrameInput source, double timeSeconds) => FrameInput(
  camera: source.camera,
  environment: source.environment,
  post: source.post,
  visibilityMask: source.visibilityMask,
  frameIndex: source.frameIndex,
  historyEpoch: source.historyEpoch,
  noiseSeed: source.noiseSeed,
  timeSeconds: timeSeconds,
);
