import '../api/handles.dart';
import '../api/scene.dart';
import '../math/vec.dart';
import 'atmospheric_particles.dart';

/// Turnkey physical presets for atmospheric particle simulation.
///
/// Each preset configures physically consistent velocities, drag responses,
/// spawn volumes, and blend modes for instantaneous environmental ambiance.
abstract final class AtmosphericPresets {
  /// Gently rising, warm drifting embers or glowing motes with additive blending.
  static AtmosphericParticleField floatingEmbers({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    Vec3 halfExtents = const Vec3(8, 4, 8),
    int particleCount = 48,
    double particleScale = 0.055,
    AtmosphericParticleAnchor anchor = AtmosphericParticleAnchor.world,
    int seed = 101,
  }) {
    return AtmosphericParticleField(
      mesh: mesh,
      material: material,
      anchor: anchor,
      origin: origin,
      halfExtents: halfExtents,
      initialVelocity: const Vec3(0.05, 0.45, 0.02),
      acceleration: const Vec3(0, 0.2, 0),
      terminalVelocity: const Vec3(0.3, 0.85, 0.2),
      dragCoefficient: 0.55,
      lifetimeSeconds: 5.5,
      particleCount: particleCount,
      particleScale: particleScale,
      seed: seed,
      castsShadow: false,
      receivesShadow: false,
      blendMode: BlendMode.additive,
    );
  }

  /// Ambient floating dust motes drifting lazily through illuminated air.
  static AtmosphericParticleField dustMotes({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    Vec3 halfExtents = const Vec3(12, 5, 12),
    int particleCount = 64,
    double particleScale = 0.035,
    AtmosphericParticleAnchor anchor = AtmosphericParticleAnchor.camera,
    int seed = 202,
  }) {
    return AtmosphericParticleField(
      mesh: mesh,
      material: material,
      anchor: anchor,
      origin: origin,
      halfExtents: halfExtents,
      initialVelocity: const Vec3(0.04, -0.03, 0.02),
      acceleration: const Vec3(0.015, -0.015, 0.01),
      terminalVelocity: const Vec3(0.12, -0.12, 0.08),
      dragCoefficient: 0.80,
      lifetimeSeconds: 8.0,
      particleCount: particleCount,
      particleScale: particleScale,
      seed: seed,
      castsShadow: false,
      receivesShadow: true,
      blendMode: BlendMode.alpha,
    );
  }

  /// Gently falling and wind-swayed crystalline snowflakes.
  static AtmosphericParticleField snow({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    Vec3 halfExtents = const Vec3(20, 10, 20),
    int particleCount = 96,
    double particleScale = 0.04,
    AtmosphericParticleAnchor anchor = AtmosphericParticleAnchor.camera,
    int seed = 303,
  }) {
    return AtmosphericParticleField(
      mesh: mesh,
      material: material,
      anchor: anchor,
      origin: origin,
      halfExtents: halfExtents,
      initialVelocity: const Vec3(0.4, -1.2, 0.2),
      acceleration: const Vec3(0.15, -0.75, 0.1),
      terminalVelocity: const Vec3(0.9, -1.9, 0.4),
      dragCoefficient: 0.85,
      lifetimeSeconds: 7.0,
      particleCount: particleCount,
      particleScale: particleScale,
      seed: seed,
      castsShadow: false,
      receivesShadow: true,
      blendMode: BlendMode.alpha,
    );
  }

  /// Swift, streak-aligned precipitation with aerodynamic terminal velocity.
  static AtmosphericParticleField rain({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    Vec3 halfExtents = const Vec3(16, 12, 16),
    int particleCount = 128,
    double particleScale = 0.10,
    AtmosphericParticleAnchor anchor = AtmosphericParticleAnchor.camera,
    int seed = 404,
  }) {
    return AtmosphericParticleField(
      mesh: mesh,
      material: material,
      anchor: anchor,
      origin: origin,
      halfExtents: halfExtents,
      initialVelocity: const Vec3(0.6, -14.0, 0.3),
      acceleration: const Vec3(0, -9.8, 0),
      terminalVelocity: const Vec3(1.0, -18.0, 0.5),
      dragCoefficient: 0.25,
      lifetimeSeconds: 1.8,
      particleCount: particleCount,
      particleScale: particleScale,
      alignToVelocity: true,
      seed: seed,
      castsShadow: false,
      receivesShadow: false,
      blendMode: BlendMode.alpha,
    );
  }

  /// Slow tumbling cosmic space dust and micro-meteorite motes.
  static AtmosphericParticleField cosmicDust({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    Vec3 halfExtents = const Vec3(15, 8, 15),
    int particleCount = 50,
    double particleScale = 0.04,
    AtmosphericParticleAnchor anchor = AtmosphericParticleAnchor.world,
    int seed = 505,
  }) {
    return AtmosphericParticleField(
      mesh: mesh,
      material: material,
      anchor: anchor,
      origin: origin,
      halfExtents: halfExtents,
      initialVelocity: const Vec3(0.02, 0.01, -0.03),
      acceleration: const Vec3(0.005, 0.002, -0.005),
      terminalVelocity: const Vec3(0.06, 0.04, -0.08),
      dragCoefficient: 0.40,
      lifetimeSeconds: 10.0,
      particleCount: particleCount,
      particleScale: particleScale,
      seed: seed,
      castsShadow: false,
      receivesShadow: true,
      blendMode: BlendMode.additive,
    );
  }
}
