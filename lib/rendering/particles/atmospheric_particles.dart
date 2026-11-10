import 'dart:math' as math;

import '../api/capabilities.dart';
import '../api/frame.dart';
import '../api/handles.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../math/frustum.dart';
import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';

enum AtmosphericParticleAnchor { world, camera }

final class AtmosphericParticleBudget {
  final int requestedCount;
  final int maximumCount;

  const AtmosphericParticleBudget({
    required this.requestedCount,
    required this.maximumCount,
  });

  factory AtmosphericParticleBudget.forProfile({
    required QualityProfile profile,
    required int requestedCount,
  }) {
    profile.validate();
    final maximumCount = switch (profile.kind) {
      QualityProfileKind.safe => 0,
      QualityProfileKind.standard => 32,
      QualityProfileKind.high => 96,
      QualityProfileKind.deterministicReference => 64,
      QualityProfileKind.shipping => 128,
      QualityProfileKind.legacyComparison => 32,
    };
    final budget = AtmosphericParticleBudget(
      requestedCount: requestedCount,
      maximumCount: maximumCount,
    );
    budget.validate();
    return budget;
  }

  void validate() {
    if (requestedCount < 0 || maximumCount < 0) {
      throw ArgumentError('atmospheric particle counts must be >= 0');
    }
  }

  int get effectiveCount => requestedCount.clamp(0, maximumCount);

  bool get wasCapped => effectiveCount != requestedCount;
}

final class AtmosphericParticleFrameStats {
  final int candidateCount;
  final int visibleCount;
  final int culledCount;

  const AtmosphericParticleFrameStats({
    required this.candidateCount,
    required this.visibleCount,
    required this.culledCount,
  });

  void validate() {
    if (candidateCount < 0 || visibleCount < 0 || culledCount < 0) {
      throw ArgumentError('atmospheric visibility counts must be >= 0');
    }
    if (visibleCount + culledCount != candidateCount) {
      throw StateError(
        'atmospheric visibility counts do not reconcile: '
        '$candidateCount != $visibleCount + $culledCount',
      );
    }
  }
}

final class AtmosphericParticleDiagnostics {
  final int requestedCount;
  final int effectiveCount;
  final bool budgetCapped;
  final int candidateCount;
  final int frustumVisibleCount;
  final int frustumCulledCount;
  final double averageSpeedMps;

  const AtmosphericParticleDiagnostics({
    required this.requestedCount,
    required this.effectiveCount,
    required this.budgetCapped,
    required this.candidateCount,
    required this.frustumVisibleCount,
    required this.frustumCulledCount,
    required this.averageSpeedMps,
  });

  void validate() {
    if (requestedCount < 0 ||
        effectiveCount < 0 ||
        effectiveCount > requestedCount ||
        candidateCount != effectiveCount ||
        frustumVisibleCount < 0 ||
        frustumCulledCount < 0 ||
        frustumVisibleCount + frustumCulledCount != candidateCount ||
        !averageSpeedMps.isFinite ||
        averageSpeedMps < 0) {
      throw StateError('atmospheric diagnostics do not reconcile');
    }
    if (budgetCapped != (effectiveCount != requestedCount)) {
      throw StateError('atmospheric budget cap state does not reconcile');
    }
  }
}

final class AtmosphericParticleKinematics {
  final double age;
  final Vec3 spawnPosition;
  final Vec3 position;
  final Vec3 velocity;

  const AtmosphericParticleKinematics({
    required this.age,
    required this.spawnPosition,
    required this.position,
    required this.velocity,
  });

  void validate() {
    if (!age.isFinite || age < 0.0) {
      throw ArgumentError('atmospheric particle age must be finite and >= 0');
    }
    if (!spawnPosition.isFinite || !position.isFinite || !velocity.isFinite) {
      throw ArgumentError('atmospheric particle kinematics must be finite');
    }
  }
}

final class AtmosphericParticleField {
  final MeshHandle mesh;
  final MaterialHandle material;
  final AtmosphericParticleAnchor anchor;

  final Vec3 origin;

  final Vec3 halfExtents;

  final Vec3 initialVelocity;

  final Vec3 acceleration;

  final Vec3? terminalVelocity;

  final double dragCoefficient;

  final double lifetimeSeconds;
  final int particleCount;
  final int seed;
  final double particleScale;

  final bool alignToVelocity;
  final DrawMode drawMode;
  final BlendMode blendMode;
  final bool castsShadow;
  final bool receivesShadow;
  final int sortTiebreakerBase;
  final int? instanceFamilyKey;

  const AtmosphericParticleField({
    required this.mesh,
    required this.material,
    this.anchor = AtmosphericParticleAnchor.world,
    this.origin = Vec3.zero,
    this.halfExtents = Vec3.zero,
    this.initialVelocity = Vec3.zero,
    this.acceleration = Vec3.zero,
    this.terminalVelocity,
    this.dragCoefficient = 0,
    required this.lifetimeSeconds,
    required this.particleCount,
    required this.seed,
    this.particleScale = 1,
    this.alignToVelocity = false,
    this.drawMode = DrawMode.blended,
    this.blendMode = BlendMode.alpha,
    this.castsShadow = false,
    this.receivesShadow = false,
    this.sortTiebreakerBase = 0,
    this.instanceFamilyKey,
  });

  void validate() {
    if (!mesh.isValid || !material.isValid) {
      throw ArgumentError('AtmosphericParticleField requires live resources');
    }
    for (final (name, value) in [
      ('origin', origin),
      ('halfExtents', halfExtents),
      ('initialVelocity', initialVelocity),
      ('acceleration', acceleration),
      if (terminalVelocity case final velocity?) ('terminalVelocity', velocity),
    ]) {
      if (!value.isFinite) {
        throw ArgumentError('AtmosphericParticleField.$name must be finite');
      }
    }
    if (halfExtents.x < 0 || halfExtents.y < 0 || halfExtents.z < 0) {
      throw ArgumentError('AtmosphericParticleField.halfExtents must be >= 0');
    }
    if (!lifetimeSeconds.isFinite || lifetimeSeconds <= 0) {
      throw ArgumentError(
        'AtmosphericParticleField.lifetimeSeconds must be finite and > 0',
      );
    }
    if (particleCount < 0) {
      throw ArgumentError(
        'AtmosphericParticleField.particleCount must be >= 0',
      );
    }
    if (!dragCoefficient.isFinite || dragCoefficient < 0) {
      throw ArgumentError(
        'AtmosphericParticleField.dragCoefficient must be finite and >= 0',
      );
    }
    if (terminalVelocity != null && dragCoefficient <= 0) {
      throw ArgumentError(
        'AtmosphericParticleField terminalVelocity requires dragCoefficient > 0',
      );
    }
    if (!particleScale.isFinite || particleScale <= 0) {
      throw ArgumentError(
        'AtmosphericParticleField.particleScale must be finite and > 0',
      );
    }
  }

  Transform sampleTransform(FrameInput frame, int particleIndex) {
    final kinematics = sampleKinematics(frame, particleIndex);
    final rotation = alignToVelocity
        ? _rotationForVelocity(kinematics.velocity)
        : Quat.identity;
    return Transform(
      translation: kinematics.position,
      rotation: rotation,
      scale: particleScale,
    );
  }

  AtmosphericParticleKinematics sampleKinematics(
    FrameInput frame,
    int particleIndex,
  ) {
    validate();
    if (particleIndex < 0 || particleIndex >= particleCount) {
      throw RangeError.range(
        particleIndex,
        0,
        particleCount - 1,
        'particleIndex',
      );
    }
    final lifetime = lifetimeSeconds;
    final birthOffset = _unit(particleIndex, 0) * lifetime;
    final age = (frame.timeSeconds + birthOffset) % lifetime;
    final anchorPosition = switch (anchor) {
      AtmosphericParticleAnchor.world => Vec3.zero,
      AtmosphericParticleAnchor.camera => frame.camera.eye,
    };
    final spawn =
        anchorPosition +
        origin +
        Vec3(
          (_unit(particleIndex, 1) * 2 - 1) * halfExtents.x,
          (_unit(particleIndex, 2) * 2 - 1) * halfExtents.y,
          (_unit(particleIndex, 3) * 2 - 1) * halfExtents.z,
        );
    final distance = _displacementAtAge(age);
    final kinematics = AtmosphericParticleKinematics(
      age: age,
      spawnPosition: spawn,
      position: spawn + distance,
      velocity: _velocityAtAge(age),
    );
    kinematics.validate();
    return kinematics;
  }

  Vec3 sampleVelocityAtAge(double age) {
    validate();
    if (!age.isFinite || age < 0) {
      throw ArgumentError('particle age must be finite and >= 0');
    }
    return _velocityAtAge(age);
  }

  int submit(RenderEncoder encoder, FrameInput frame) {
    return submitFiltered(encoder, frame, (_) => true);
  }

  int submitFiltered(
    RenderEncoder encoder,
    FrameInput frame,
    bool Function(AtmosphericParticleKinematics) include,
  ) {
    validate();
    var submitted = 0;
    for (
      var particleIndex = 0;
      particleIndex < particleCount;
      particleIndex += 1
    ) {
      final kinematics = sampleKinematics(frame, particleIndex);
      if (!include(kinematics)) continue;
      encoder.submit(
        RetainedItemDescriptor(
          mesh: mesh,
          material: material,
          transform: _transformForKinematics(kinematics),
          drawMode: drawMode,
          blendMode: blendMode,
          castsShadow: castsShadow,
          receivesShadow: receivesShadow,
          sortTiebreaker: sortTiebreakerBase + particleIndex,
          instanceFamilyKey: instanceFamilyKey,
        ),
      );
      submitted += 1;
    }
    return submitted;
  }

  Transform _transformForKinematics(AtmosphericParticleKinematics kinematics) {
    final rotation = alignToVelocity
        ? _rotationForVelocity(kinematics.velocity)
        : Quat.identity;
    return Transform(
      translation: kinematics.position,
      rotation: rotation,
      scale: particleScale,
    );
  }

  AtmosphericParticleFrameStats frameStats(FrameInput frame) {
    validate();
    final frustum = frame.camera.buildFrustum();
    var visible = 0;
    for (
      var particleIndex = 0;
      particleIndex < particleCount;
      particleIndex++
    ) {
      final center = sampleTransform(frame, particleIndex).translation;
      final halfExtent = Vec3(
        particleScale * 0.5,
        particleScale * 0.5,
        particleScale * 0.5,
      );
      final result = frustum.testAabb(
        Aabb(center - halfExtent, center + halfExtent),
      );
      if (result != FrustumTest.outside) visible += 1;
    }
    final stats = AtmosphericParticleFrameStats(
      candidateCount: particleCount,
      visibleCount: visible,
      culledCount: particleCount - visible,
    );
    stats.validate();
    return stats;
  }

  AtmosphericParticleDiagnostics diagnostics(
    FrameInput frame, {
    required AtmosphericParticleBudget budget,
  }) {
    validate();
    budget.validate();
    if (particleCount != budget.effectiveCount) {
      throw StateError(
        'atmospheric field count $particleCount does not match '
        'budget effective count ${budget.effectiveCount}',
      );
    }
    final visibility = frameStats(frame);
    var speedTotal = 0.0;
    for (var index = 0; index < particleCount; index++) {
      speedTotal += sampleKinematics(frame, index).velocity.length;
    }
    final result = AtmosphericParticleDiagnostics(
      requestedCount: budget.requestedCount,
      effectiveCount: budget.effectiveCount,
      budgetCapped: budget.wasCapped,
      candidateCount: particleCount,
      frustumVisibleCount: visibility.visibleCount,
      frustumCulledCount: visibility.culledCount,
      averageSpeedMps: particleCount == 0 ? 0 : speedTotal / particleCount,
    );
    result.validate();
    return result;
  }

  Vec3 _velocityAtAge(double age) {
    final terminal = terminalVelocity;
    if (terminal == null) return initialVelocity + acceleration * age;
    final decay = _exp(-dragCoefficient * age);
    return terminal + (initialVelocity - terminal) * decay;
  }

  Vec3 _displacementAtAge(double age) {
    final terminal = terminalVelocity;
    if (terminal == null) {
      return (initialVelocity * age) + (acceleration * (0.5 * age * age));
    }
    final decay = _exp(-dragCoefficient * age);
    final response = (1 - decay) / dragCoefficient;
    return (terminal * age) + ((initialVelocity - terminal) * response);
  }

  Quat _rotationForVelocity(Vec3 velocity) {
    final direction = velocity.normalized;
    if (direction == Vec3.zero) return Quat.identity;
    // Rain's source mesh extends along local -Y, so align that axis rather
    // than +Y. The shortest-arc construction avoids introducing an arbitrary
    // roll and remains deterministic for every gust direction.
    const source = Vec3(0, -1, 0);
    final dot = source.dot(direction).clamp(-1.0, 1.0);
    if (dot > 0.999999) return Quat.identity;
    if (dot < -0.999999) {
      return Quat.axisAngle(const Vec3(1, 0, 0), math.pi);
    }
    final axis = source.cross(direction);
    return Quat.axisAngle(axis, math.acos(dot));
  }

  double _exp(double value) {
    // Keep dart:math out of the public API surface while retaining a single
    // deterministic implementation for VM, JS, and Wasm hosts.
    return math.exp(value);
  }

  double _unit(int particleIndex, int salt) {
    var value =
        (seed ^ (particleIndex * 0x45d9f3b) ^ (salt * 0x27d4eb2d)) & 0x7fffffff;
    value = (value * 1103515245 + 12345) & 0x7fffffff;
    return value / 0x7fffffff;
  }
}
