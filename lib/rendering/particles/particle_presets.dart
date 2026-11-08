import 'dart:math' as math;

import '../api/handles.dart';
import '../api/lights.dart';
import '../api/scene.dart';
import '../math/curves.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import 'particle_emitter.dart';
import 'particle_shapes.dart';

/// Turnkey, high-fidelity universal presets for the Pixeldart particle system.
abstract final class ParticlePresets {
  /// Realistic campfire / torch flames rising with turbulence and tapering scale.
  static ParticleEmitter campfire({
    required MeshHandle mesh,
    required MaterialHandle material,
    List<MaterialHandle>? materialRamp,
    Vec3 origin = Vec3.zero,
    double scale = 1.0,
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      materialRamp: materialRamp,
      shape: ConeShape(
        radius: 0.15 * scale,
        angleRadians: 0.15,
        length: 0.2 * scale,
        mode: ConeEmissionMode.base,
      ),
      transform: Transform.at(origin),
      rate: 75.0,
      minLifetime: 0.6,
      maxLifetime: 1.1,
      minSpeed: 1.2 * scale,
      maxSpeed: 2.2 * scale,
      minStartSize: 0.25 * scale,
      maxStartSize: 0.40 * scale,
      minEndSize: 0.05 * scale,
      maxEndSize: 0.10 * scale,
      sizeCurve: Curves.easeInQuad,
      fadeInFraction: 0.1,
      fadeOutFraction: 0.4,
      gravity: Vec3(0, 0.5 * scale, 0), // Slight buoyant lift
      dragCoefficient: 0.4,
      noiseStrength: 1.2 * scale,
      noiseFrequency: 1.5,
      noiseSpeed: 2.0,
      minInitialRotation: 0,
      maxInitialRotation: math.pi * 2,
      minAngularVelocity: -1.5,
      maxAngularVelocity: 1.5,
      alignment: ParticleAlignment.billboard,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: 200,
      seed: seed ?? 1001,
      colorGradient: ParticleColorGradient([
        const ParticleColorStop(0.0, LinearColor(1.0, 1.0, 0.8)),
        const ParticleColorStop(0.3, LinearColor(1.0, 0.65, 0.1)),
        const ParticleColorStop(0.7, LinearColor(0.85, 0.15, 0.02)),
        const ParticleColorStop(1.0, LinearColor(0.2, 0.05, 0.02)),
      ]),
    );
  }

  /// Instantaneous high-energy explosion blast with shockwave expansion, debris, and drag.
  static ParticleEmitter explosion({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    double radius = 1.5,
    int particleCount = 120,
    double explosionSpeed = 12.0,
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: SphereShape(
        radius: radius * 0.2,
        mode: SphereEmissionMode.volume,
        directionMode: SphereDirectionMode.outward,
      ),
      transform: Transform.at(origin),
      rate: 0.0,
      bursts: [
        ParticleBurst(
          time: 0.0,
          minCount: particleCount,
          maxCount: particleCount,
          cycles: 1,
        ),
      ],
      duration: 1.5,
      isLooping: false,
      minLifetime: 0.8,
      maxLifetime: 1.4,
      minSpeed: explosionSpeed * 0.6,
      maxSpeed: explosionSpeed,
      minStartSize: 0.35,
      maxStartSize: 0.55,
      minEndSize: 0.02,
      maxEndSize: 0.08,
      sizeCurve: Curves.easeOutCubic,
      gravity: const Vec3(0, -9.81, 0),
      gravityModifier: 0.6,
      dragCoefficient: 2.5,
      radialAcceleration: 4.0,
      alignment: ParticleAlignment.velocityStretched,
      stretchFactor: 0.15,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: particleCount + 20,
      seed: seed ?? 2002,
    );
  }

  /// Billowing smoke plume expanding continuously into ambient air.
  static ParticleEmitter smokePlume({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    double scale = 1.0,
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: CircleShape(
        radius: 0.25 * scale,
        normal: Vec3.unitY,
        mode: CircleEmissionMode.volume,
        directionMode: CircleDirectionMode.normal,
      ),
      transform: Transform.at(origin),
      rate: 35.0,
      minLifetime: 2.5,
      maxLifetime: 4.0,
      minSpeed: 0.8 * scale,
      maxSpeed: 1.4 * scale,
      minStartSize: 0.3 * scale,
      maxStartSize: 0.5 * scale,
      minEndSize: 1.6 * scale,
      maxEndSize: 2.4 * scale,
      sizeCurve: Curves.easeOutQuad,
      fadeInFraction: 0.15,
      fadeOutFraction: 0.45,
      acceleration: Vec3(0.2 * scale, 0.4 * scale, 0.1 * scale),
      dragCoefficient: 0.3,
      noiseStrength: 0.8 * scale,
      noiseFrequency: 0.8,
      noiseSpeed: 0.5,
      minInitialRotation: 0,
      maxInitialRotation: math.pi * 2,
      minAngularVelocity: -0.4,
      maxAngularVelocity: 0.4,
      alignment: ParticleAlignment.billboard,
      blendMode: BlendMode.alpha,
      drawMode: DrawMode.blended,
      maxParticles: 250,
      seed: seed ?? 3003,
    );
  }

  /// High-speed sparks reflecting and bouncing off a ground contact plane.
  static ParticleEmitter bouncingSparks({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = const Vec3(0, 1.5, 0),
    Vec3 sprayDirection = const Vec3(0.8, -0.5, 0),
    double groundHeight = 0.0,
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: PointShape(
        direction: sprayDirection,
        spreadAngleRadians: 0.4,
      ),
      transform: Transform.at(origin),
      rate: 80.0,
      minLifetime: 1.2,
      maxLifetime: 2.2,
      minSpeed: 6.0,
      maxSpeed: 11.0,
      minStartSize: 0.08,
      maxStartSize: 0.12,
      minEndSize: 0.01,
      maxEndSize: 0.03,
      gravity: const Vec3(0, -9.81, 0),
      dragCoefficient: 0.8,
      collisionPlane: ParticleCollisionPlane(
        point: Vec3(0, groundHeight, 0),
        normal: Vec3.unitY,
        restitution: 0.55,
        friction: 0.15,
        action: ParticleCollisionAction.bounce,
      ),
      alignment: ParticleAlignment.velocityStretched,
      stretchFactor: 0.25,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: 300,
      seed: seed ?? 4004,
    );
  }

  /// Swirling magical vortex or portal with inward spiral acceleration.
  static ParticleEmitter swirlingVortex({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    double radius = 3.0,
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: CircleShape(
        radius: radius,
        innerRadius: radius * 0.7,
        normal: Vec3.unitY,
        mode: CircleEmissionMode.volume,
        directionMode: CircleDirectionMode.tangent,
      ),
      transform: Transform.at(origin),
      rate: 90.0,
      minLifetime: 1.8,
      maxLifetime: 2.8,
      minSpeed: 2.0,
      maxSpeed: 3.5,
      minStartSize: 0.15,
      maxStartSize: 0.25,
      minEndSize: 0.02,
      maxEndSize: 0.05,
      radialAcceleration: -4.5, // Strong inward centripetal draw
      orbitalAcceleration: 6.0,  // High tangential swirl
      orbitalAxis: Vec3.unitY,
      noiseStrength: 0.5,
      noiseFrequency: 2.0,
      alignment: ParticleAlignment.billboard,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: 400,
      seed: seed ?? 5005,
    );
  }

  /// Pressurized water fountain launching in a parabolic gravity arc.
  static ParticleEmitter waterFountain({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    double height = 4.0,
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: ConeShape(
        radius: 0.1,
        angleRadians: 0.12,
        length: 0.3,
        mode: ConeEmissionMode.base,
      ),
      transform: Transform.at(origin),
      rate: 110.0,
      minLifetime: 1.4,
      maxLifetime: 1.8,
      minSpeed: math.sqrt(2 * 9.81 * height),
      maxSpeed: math.sqrt(2 * 9.81 * height) * 1.15,
      minStartSize: 0.08,
      maxStartSize: 0.14,
      minEndSize: 0.16,
      maxEndSize: 0.22,
      gravity: const Vec3(0, -9.81, 0),
      dragCoefficient: 0.25,
      collisionPlane: ParticleCollisionPlane(
        point: origin,
        normal: Vec3.unitY,
        action: ParticleCollisionAction.kill,
      ),
      alignment: ParticleAlignment.velocityAligned,
      blendMode: BlendMode.alpha,
      drawMode: DrawMode.blended,
      maxParticles: 350,
      seed: seed ?? 6006,
    );
  }

  /// Ethereal wandering fireflies drifting lazily with 3D organic turbulence.
  static ParticleEmitter fireflies({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = Vec3.zero,
    Vec3 boundsHalfExtents = const Vec3(5, 2, 5),
    int particleCount = 40,
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: BoxShape(
        halfExtents: boundsHalfExtents,
        mode: BoxEmissionMode.volume,
      ),
      transform: Transform.at(origin),
      rate: 15.0,
      minLifetime: 4.0,
      maxLifetime: 7.0,
      minSpeed: 0.2,
      maxSpeed: 0.5,
      minStartSize: 0.08,
      maxStartSize: 0.14,
      minEndSize: 0.04,
      maxEndSize: 0.08,
      fadeInFraction: 0.3,
      fadeOutFraction: 0.3,
      dragCoefficient: 0.5,
      noiseStrength: 0.8,
      noiseFrequency: 1.2,
      noiseSpeed: 0.8,
      alignment: ParticleAlignment.billboard,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: particleCount,
      seed: seed ?? 7007,
    );
  }

  /// Starfield warp-speed effect streaming rapidly past the viewer.
  static ParticleEmitter warpSpeed({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = const Vec3(0, 0, -20),
    double speed = 35.0,
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: CircleShape(
        radius: 8.0,
        innerRadius: 0.5,
        normal: Vec3.unitZ,
        mode: CircleEmissionMode.volume,
        directionMode: CircleDirectionMode.normal,
      ),
      transform: Transform.at(origin),
      rate: 140.0,
      minLifetime: 0.8,
      maxLifetime: 1.2,
      minSpeed: speed * 0.8,
      maxSpeed: speed,
      minStartSize: 0.06,
      maxStartSize: 0.12,
      minEndSize: 0.08,
      maxEndSize: 0.14,
      alignment: ParticleAlignment.velocityStretched,
      stretchFactor: 0.35,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: 300,
      seed: seed ?? 8008,
    );
  }

  /// Celebratory tumbling confetti with aerodynamic air resistance.
  static ParticleEmitter confetti({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = const Vec3(0, 6, 0),
    Vec3 areaHalfExtents = const Vec3(4, 0.5, 4),
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: BoxShape(
        halfExtents: areaHalfExtents,
        mode: BoxEmissionMode.volume,
      ),
      transform: Transform.at(origin),
      rate: 60.0,
      minLifetime: 3.5,
      maxLifetime: 5.5,
      minSpeed: 0.5,
      maxSpeed: 1.5,
      minStartSize: 0.12,
      maxStartSize: 0.20,
      minEndSize: 0.12,
      maxEndSize: 0.20,
      gravity: const Vec3(0, -2.5, 0),
      dragCoefficient: 0.85,
      noiseStrength: 1.4,
      noiseFrequency: 1.0,
      noiseSpeed: 1.2,
      minInitialRotation: 0,
      maxInitialRotation: math.pi * 2,
      minAngularVelocity: -3.0,
      maxAngularVelocity: 3.0,
      alignment: ParticleAlignment.axial,
      blendMode: BlendMode.alpha,
      drawMode: DrawMode.blended,
      maxParticles: 350,
      seed: seed ?? 9009,
    );
  }

  /// Turbulent, wind-whipped mountain blizzard snowstorm.
  static ParticleEmitter blizzard({
    required MeshHandle mesh,
    required MaterialHandle material,
    Vec3 origin = const Vec3(0, 8, 0),
    Vec3 wind = const Vec3(10, -5, 2),
    int? seed,
  }) {
    return ParticleEmitter(
      mesh: mesh,
      material: material,
      shape: BoxShape(
        halfExtents: const Vec3(12, 1, 12),
        mode: BoxEmissionMode.volume,
      ),
      transform: Transform.at(origin),
      rate: 160.0,
      minLifetime: 2.0,
      maxLifetime: 3.2,
      minSpeed: 4.0,
      maxSpeed: 8.0,
      minStartSize: 0.04,
      maxStartSize: 0.08,
      minEndSize: 0.04,
      maxEndSize: 0.08,
      acceleration: wind,
      dragCoefficient: 0.6,
      noiseStrength: 2.2,
      noiseFrequency: 1.2,
      noiseSpeed: 2.5,
      alignment: ParticleAlignment.velocityStretched,
      stretchFactor: 0.12,
      blendMode: BlendMode.alpha,
      drawMode: DrawMode.blended,
      maxParticles: 500,
      seed: seed ?? 10101,
    );
  }

  /// Multi-stage firework rocket that trails glowing sparks, bursts at apex into
  /// a colorful explosion, and produces ground-impact bounce sparks.
  static ParticleEmitter fireworkRocket({
    required MeshHandle mesh,
    required MaterialHandle rocketMaterial,
    required MaterialHandle sparkMaterial,
    required MaterialHandle explosionMaterial,
    Vec3 origin = Vec3.zero,
    int? seed,
  }) {
    // 1. Trail sparks emitted behind the rising rocket
    final trailSparks = ParticleEmitter(
      mesh: mesh,
      material: sparkMaterial,
      shape: const PointShape(),
      rate: 0.0,
      minLifetime: 0.3,
      maxLifetime: 0.6,
      minSpeed: 0.2,
      maxSpeed: 0.8,
      minStartSize: 0.06,
      minEndSize: 0.01,
      gravity: const Vec3(0, -3.0, 0),
      dragCoefficient: 1.5,
      alignment: ParticleAlignment.billboard,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: 150,
      seed: seed != null ? seed + 1 : null,
    );

    // 2. Secondary ground bounce sparks triggered on collision
    final groundSparks = ParticleEmitter(
      mesh: mesh,
      material: sparkMaterial,
      shape: const PointShape(spreadAngleRadians: 0.8),
      rate: 0.0,
      minLifetime: 0.4,
      maxLifetime: 0.8,
      minSpeed: 2.0,
      maxSpeed: 4.5,
      minStartSize: 0.05,
      minEndSize: 0.01,
      gravity: const Vec3(0, -9.81, 0),
      dragCoefficient: 1.2,
      alignment: ParticleAlignment.velocityStretched,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: 80,
      seed: seed != null ? seed + 2 : null,
    );

    // 3. Apex burst explosion with ground collision sub-emitter
    final burstExplosion = ParticleEmitter(
      mesh: mesh,
      material: explosionMaterial,
      shape: const SphereShape(radius: 0.1, mode: SphereEmissionMode.volume),
      rate: 0.0,
      minLifetime: 0.9,
      maxLifetime: 1.5,
      minSpeed: 8.0,
      maxSpeed: 14.0,
      minStartSize: 0.20,
      minEndSize: 0.03,
      gravity: const Vec3(0, -6.0, 0),
      dragCoefficient: 2.0,
      collisionPlane: const ParticleCollisionPlane(
        point: Vec3.zero,
        normal: Vec3.unitY,
        restitution: 0.4,
        action: ParticleCollisionAction.bounce,
      ),
      subEmitters: [
        SubEmitter(
          emitter: groundSparks,
          trigger: SubEmitterTrigger.collision,
          count: 4,
          inheritVelocity: true,
          inheritVelocityFactor: 0.3,
        ),
      ],
      alignment: ParticleAlignment.velocityStretched,
      stretchFactor: 0.2,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: 120,
      seed: seed != null ? seed + 3 : null,
    );

    // 4. Root rocket projectile
    return ParticleEmitter(
      mesh: mesh,
      material: rocketMaterial,
      shape: const PointShape(direction: Vec3.unitY, spreadAngleRadians: 0.05),
      transform: Transform.at(origin),
      rate: 0.8,
      bursts: const [
        ParticleBurst(time: 0.0, minCount: 1),
      ],
      minLifetime: 1.2,
      maxLifetime: 1.5,
      minSpeed: 18.0,
      maxSpeed: 22.0,
      minStartSize: 0.14,
      minEndSize: 0.14,
      gravity: const Vec3(0, -9.81, 0),
      dragCoefficient: 0.1,
      alignment: ParticleAlignment.velocityAligned,
      blendMode: BlendMode.additive,
      drawMode: DrawMode.blended,
      maxParticles: 10,
      seed: seed,
      subEmitters: [
        SubEmitter(
          emitter: trailSparks,
          trigger: SubEmitterTrigger.trail,
          count: 1,
          trailDistance: 0.3,
          trailInterval: 0.03,
          inheritVelocity: true,
          inheritVelocityFactor: 0.1,
        ),
        SubEmitter(
          emitter: burstExplosion,
          trigger: SubEmitterTrigger.death,
          count: 80,
          inheritVelocity: true,
          inheritVelocityFactor: 0.2,
        ),
      ],
    );
  }

  /// Downward falling rain droplets triggering ring splashes upon ground impact.
  static ParticleEmitter rainWithSplashes({
    required MeshHandle mesh,
    required MaterialHandle rainMaterial,
    required MaterialHandle splashMaterial,
    Vec3 origin = const Vec3(0, 10, 0),
    Vec3 areaHalfExtents = const Vec3(10, 1, 10),
    double groundHeight = 0.0,
    int? seed,
  }) {
    // Water splash droplet droplets triggered on ground collision
    final splashDroplets = ParticleEmitter(
      mesh: mesh,
      material: splashMaterial,
      shape: const CircleShape(
        radius: 0.3,
        normal: Vec3.unitY,
        mode: CircleEmissionMode.edge,
        directionMode: CircleDirectionMode.radialOutward,
      ),
      rate: 0.0,
      minLifetime: 0.2,
      maxLifetime: 0.4,
      minSpeed: 1.0,
      maxSpeed: 2.5,
      minStartSize: 0.04,
      minEndSize: 0.01,
      gravity: const Vec3(0, -9.81, 0),
      dragCoefficient: 0.5,
      alignment: ParticleAlignment.billboard,
      blendMode: BlendMode.alpha,
      drawMode: DrawMode.blended,
      maxParticles: 200,
      seed: seed != null ? seed + 1 : null,
    );

    return ParticleEmitter(
      mesh: mesh,
      material: rainMaterial,
      shape: BoxShape(halfExtents: areaHalfExtents, mode: BoxEmissionMode.volume),
      transform: Transform.at(origin),
      rate: 150.0,
      minLifetime: 0.8,
      maxLifetime: 1.2,
      minSpeed: 14.0,
      maxSpeed: 18.0,
      minStartSize: 0.06,
      minEndSize: 0.06,
      gravity: const Vec3(0, -9.81, 0),
      dragCoefficient: 0.1,
      collisionPlane: ParticleCollisionPlane(
        point: Vec3(0, groundHeight, 0),
        normal: Vec3.unitY,
        action: ParticleCollisionAction.kill,
      ),
      subEmitters: [
        SubEmitter(
          emitter: splashDroplets,
          trigger: SubEmitterTrigger.collision,
          count: 5,
        ),
      ],
      alignment: ParticleAlignment.velocityStretched,
      stretchFactor: 0.25,
      blendMode: BlendMode.alpha,
      drawMode: DrawMode.blended,
      maxParticles: 300,
      seed: seed,
    );
  }
}
