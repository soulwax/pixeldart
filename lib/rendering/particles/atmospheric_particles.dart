import '../api/frame.dart';
import '../api/handles.dart';
import '../api/scene.dart';
import '../math/transform.dart';
import '../math/vec.dart';

/// Selects whether an atmospheric field follows the viewer or occupies a
/// fixed position in the world. The host owns this policy: a sheltered room,
/// a courtyard, and a dust-filled tunnel can all use the same renderer path.
enum AtmosphericParticleAnchor { world, camera }

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

  /// Lifetime before deterministic respawn, in seconds.
  final double lifetimeSeconds;
  final int particleCount;
  final int seed;
  final double particleScale;
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
    required this.lifetimeSeconds,
    required this.particleCount,
    required this.seed,
    this.particleScale = 1,
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
    final distance =
        (initialVelocity * age) + (acceleration * (0.5 * age * age));
    return Transform(translation: spawn + distance, scale: particleScale);
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

  double _unit(int particleIndex, int salt) {
    var value =
        (seed ^ (particleIndex * 0x45d9f3b) ^ (salt * 0x27d4eb2d)) & 0x7fffffff;
    value = (value * 1103515245 + 12345) & 0x7fffffff;
    return value / 0x7fffffff;
  }
}
