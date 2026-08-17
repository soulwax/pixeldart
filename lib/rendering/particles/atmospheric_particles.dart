import 'dart:math' as math;

import '../api/frame.dart';
import '../api/handles.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../math/frustum.dart';
import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';

/// Selects whether an atmospheric field follows the viewer or occupies a
/// fixed position in the world. The host owns this policy: a sheltered room,
/// a courtyard, and a dust-filled tunnel can all use the same renderer path.
enum AtmosphericParticleAnchor { world, camera }

/// Host-selected particle budget after quality/profile policy is resolved.
/// Keeping this separate from [AtmosphericParticleField] makes a capped
/// request observable without changing the field's deterministic simulation.
final class AtmosphericParticleBudget {
  final int requestedCount;
  final int maximumCount;

  const AtmosphericParticleBudget({
    required this.requestedCount,
    required this.maximumCount,
  });

  void validate() {
    if (requestedCount < 0 || maximumCount < 0) {
      throw ArgumentError('atmospheric particle counts must be >= 0');
    }
  }

  int get effectiveCount => requestedCount.clamp(0, maximumCount);

  bool get wasCapped => effectiveCount != requestedCount;
}

/// CPU visibility accounting for one atmospheric field and one frame.
///
/// The render graph still owns the authoritative transient-item cull. This
/// bounded diagnostic uses the same camera frustum and a conservative cube
/// around each particle so a host can explain why a requested field produced
/// fewer visible candidates without inventing a second draw path.
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

/// Deterministic, CPU-simulated atmospheric particles emitted through a
/// frame-local [RenderEncoder].
///
/// This is intentionally renderer-neutral: it knows meshes, materials,
/// transforms, camera snapshots, and physical motion, but not weather
/// schedules, rooms, collisions, gameplay, or post-processing policy. A host
/// chooses its own quality cap and may use the field for rain, snow, ash,
/// dust, pollen, embers, or other small-scale airborne phenomena.
///
/// The field has no mutable simulation state. Given the same [FrameInput] and
/// descriptor, it produces the same transforms. This keeps captures,
/// context recovery, and frame replay deterministic while allowing the host
/// to keep large weather volumes close to a moving camera when appropriate.
final class AtmosphericParticleField {
  final MeshHandle mesh;
  final MaterialHandle material;
  final AtmosphericParticleAnchor anchor;

  /// Origin relative to the selected [anchor].
  final Vec3 origin;

  /// Half-size of the deterministic spawn volume. It must be non-negative.
  final Vec3 halfExtents;

  /// Initial velocity at a particle's birth, in metres per second.
  final Vec3 initialVelocity;

  /// Constant acceleration, in metres per second squared.
  final Vec3 acceleration;

  /// Optional asymptotic velocity after linear air drag, in metres per
  /// second. A host can include wind in this vector. When omitted, the field
  /// uses the constant-acceleration model above.
  final Vec3? terminalVelocity;

  /// Linear drag response in inverse seconds. A terminal velocity requires a
  /// positive coefficient; zero keeps the legacy constant-acceleration path.
  final double dragCoefficient;

  /// Lifetime before deterministic respawn, in seconds.
  final double lifetimeSeconds;
  final int particleCount;
  final int seed;
  final double particleScale;

  /// When true, rotates each particle so its local downward (-Y) axis follows
  /// the analytic velocity. This is useful for streak-like geometry such as
  /// rain or hail; round flakes and motes should leave it disabled.
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

  /// Samples one particle transform without submitting it. Useful for host
  /// diagnostics and deterministic tests without a GPU.
  Transform sampleTransform(FrameInput frame, int particleIndex) {
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
    final rotation = alignToVelocity
        ? _rotationForVelocity(_velocityAtAge(age))
        : Quat.identity;
    return Transform(
      translation: spawn + distance,
      rotation: rotation,
      scale: particleScale,
    );
  }

  /// Returns the analytic velocity at an arbitrary particle age. With a
  /// terminal velocity this is the linear-drag solution
  /// `v(t)=v_terminal+(v0-v_terminal)e^(-drag*t)`; otherwise it is the
  /// constant-acceleration solution.
  Vec3 sampleVelocityAtAge(double age) {
    validate();
    if (!age.isFinite || age < 0) {
      throw ArgumentError('particle age must be finite and >= 0');
    }
    return _velocityAtAge(age);
  }

  /// Emits every particle as ordinary blended transient geometry and returns
  /// the count actually submitted. Frustum and depth rejection remain the
  /// normal render graph's responsibility, so particle behaviour does not
  /// fork from the rest of the world pass.
  int submit(RenderEncoder encoder, FrameInput frame) {
    validate();
    for (
      var particleIndex = 0;
      particleIndex < particleCount;
      particleIndex += 1
    ) {
      encoder.submit(
        RetainedItemDescriptor(
          mesh: mesh,
          material: material,
          transform: sampleTransform(frame, particleIndex),
          drawMode: drawMode,
          blendMode: blendMode,
          castsShadow: castsShadow,
          receivesShadow: receivesShadow,
          sortTiebreaker: sortTiebreakerBase + particleIndex,
          instanceFamilyKey: instanceFamilyKey,
        ),
      );
    }
    return particleCount;
  }

  /// Reports the conservative frustum result for the current field. The
  /// bounds match [FrameRenderEncoder]'s fixed half-unit transient bounds,
  /// scaled by this field's particle size.
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
