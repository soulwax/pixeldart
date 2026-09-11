import 'dart:math' as math;

import '../api/frame.dart';
import '../api/handles.dart';
import '../api/lights.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../math/curves.dart';
import '../math/frustum.dart';
import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import 'particle_shapes.dart';

/// Alignment modes for particle rendering.
enum ParticleAlignment {
  /// Particle quad faces camera eye (spherical billboard).
  billboard,

  /// Particle rotates so its local -Y axis aligns with instantaneous velocity.
  velocityAligned,

  /// Particle aligns with velocity and dynamically elongates length based on speed.
  velocityStretched,

  /// Free 3D tumbling rotation determined by initial angle and angular velocity.
  axial,
}

/// Actions performed when a particle strikes a collision plane.
enum ParticleCollisionAction {
  /// Reflects velocity across plane normal with restitution (bounciness).
  bounce,

  /// Particle dies immediately on impact.
  kill,

  /// Velocity along plane normal is cancelled; particle continues sliding along surface.
  slide,
}

/// Authored burst event triggering a packet of particles at a timestamp.
final class ParticleBurst {
  /// Time relative to emitter duration when burst occurs, in seconds.
  final double time;

  /// Minimum particle count emitted in this burst.
  final int minCount;

  /// Maximum particle count emitted in this burst.
  final int maxCount;

  /// Number of times this burst repeats (1 = one-shot, <= 0 = infinite).
  final int cycles;

  /// Interval between repeated cycles, in seconds.
  final double repeatInterval;

  const ParticleBurst({
    required this.time,
    required this.minCount,
    int? maxCount,
    this.cycles = 1,
    this.repeatInterval = 1.0,
  }) : maxCount = maxCount ?? minCount;

  void validate() {
    if (!time.isFinite || time < 0) {
      throw ArgumentError('ParticleBurst.time must be finite and >= 0');
    }
    if (minCount < 0 || maxCount < minCount) {
      throw ArgumentError('ParticleBurst count range must be valid: $minCount..$maxCount');
    }
    if (!repeatInterval.isFinite || repeatInterval <= 0) {
      throw ArgumentError('ParticleBurst.repeatInterval must be finite and > 0');
    }
  }

  int sampleCount(math.Random random) {
    if (minCount == maxCount) return minCount;
    return minCount + random.nextInt(maxCount - minCount + 1);
  }
}

/// One keyed color entry in a multi-stop color ramp.
final class ParticleColorStop {
  final double t;
  final LinearColor color;

  const ParticleColorStop(this.t, this.color);

  void validate() {
    if (!t.isFinite || t < 0.0 || t > 1.0) {
      throw ArgumentError('ParticleColorStop.t must be in [0, 1]');
    }
    if (!color.r.isFinite || !color.g.isFinite || !color.b.isFinite) {
      throw ArgumentError('ParticleColorStop.color channels must be finite');
    }
  }
}

/// Multi-stop linear color gradient over particle normalized lifetime [0, 1].
final class ParticleColorGradient {
  final List<ParticleColorStop> stops;

  ParticleColorGradient(List<ParticleColorStop> stops)
      : stops = List.unmodifiable(
          List<ParticleColorStop>.from(stops)..sort((a, b) => a.t.compareTo(b.t)),
        ) {
    validate();
  }

  void validate() {
    if (stops.isEmpty) {
      throw ArgumentError('ParticleColorGradient requires at least one stop');
    }
    for (final stop in stops) {
      stop.validate();
    }
  }

  LinearColor sample(double t) {
    final clampedT = t.clamp(0.0, 1.0);
    if (clampedT <= stops.first.t) return stops.first.color;
    if (clampedT >= stops.last.t) return stops.last.color;

    var i = 0;
    while (i < stops.length - 1 && stops[i + 1].t < clampedT) {
      i++;
    }

    final s0 = stops[i];
    final s1 = stops[i + 1];
    final dt = s1.t - s0.t;
    final factor = dt > 1e-6 ? (clampedT - s0.t) / dt : 0.0;

    return LinearColor(
      s0.color.r + (s1.color.r - s0.color.r) * factor,
      s0.color.g + (s1.color.g - s0.color.g) * factor,
      s0.color.b + (s1.color.b - s0.color.b) * factor,
    );
  }
}

/// Distance falloff curve for [ParticleAttractor] force calculation.
enum AttractorFalloff {
  /// Linear falloff from center to range: (1 - dist / range).
  linear,

  /// Inverse-square falloff: 1 / (1 + 4 * (dist / range)^2).
  inverseSquare,

  /// Constant force regardless of distance within range.
  constant,
}

/// Spatial point attractor applying distance-scaled inward or outward pull,
/// with optional tangential vortex swirl around an axis.
final class ParticleAttractor {
  final Vec3 position;
  final double strength;
  final double range;
  final double killRadius;
  final AttractorFalloff falloff;
  final double orbitalStrength;
  final Vec3 axis;

  const ParticleAttractor({
    required this.position,
    required this.strength,
    required this.range,
    this.killRadius = 0.0,
    this.falloff = AttractorFalloff.linear,
    this.orbitalStrength = 0.0,
    this.axis = Vec3.unitY,
  });

  void validate() {
    if (!position.isFinite) {
      throw ArgumentError('ParticleAttractor.position must be finite');
    }
    if (!strength.isFinite) {
      throw ArgumentError('ParticleAttractor.strength must be finite');
    }
    if (!range.isFinite || range <= 0) {
      throw ArgumentError('ParticleAttractor.range must be finite and > 0');
    }
    if (!killRadius.isFinite || killRadius < 0 || killRadius >= range) {
      throw ArgumentError('ParticleAttractor.killRadius must be in [0, range)');
    }
    if (!orbitalStrength.isFinite) {
      throw ArgumentError('ParticleAttractor.orbitalStrength must be finite');
    }
    if (!axis.isFinite || axis.lengthSquared < 1e-6) {
      throw ArgumentError('ParticleAttractor.axis must be finite and non-zero');
    }
  }
}

/// Planar collision barrier with restitution, surface friction, and contact actions.
final class ParticleCollisionPlane {
  final Vec3 point;
  final Vec3 normal;
  final double restitution;
  final double friction;
  final ParticleCollisionAction action;

  const ParticleCollisionPlane({
    this.point = Vec3.zero,
    this.normal = Vec3.unitY,
    this.restitution = 0.5,
    this.friction = 0.1,
    this.action = ParticleCollisionAction.bounce,
  });

  void validate() {
    if (!point.isFinite || !normal.isFinite || normal.lengthSquared < 1e-6) {
      throw ArgumentError('ParticleCollisionPlane geometry must be finite and valid');
    }
    if (!restitution.isFinite || restitution < 0 || restitution > 1) {
      throw ArgumentError('ParticleCollisionPlane.restitution must be in [0, 1]');
    }
    if (!friction.isFinite || friction < 0 || friction > 1) {
      throw ArgumentError('ParticleCollisionPlane.friction must be in [0, 1]');
    }
  }
}

/// Lifecycle events that trigger emission on a [SubEmitter].
enum SubEmitterTrigger {
  /// Fires when a parent particle is born (e.g. muzzle flashbang, sparks on ignition).
  birth,

  /// Fires when a parent particle expires or is killed (e.g. firework burst, popping bubbles, smoke puff).
  death,

  /// Fires when a parent particle strikes a collision plane (e.g. water droplet splash, bouncing spark shards).
  collision,

  /// Emits trailing particles continuously behind living parent particles (e.g. rocket smoke trail, ribbon dust).
  trail,
}

/// Cascading sub-emitter triggered by parent particle lifecycle and physics events.
final class SubEmitter {
  /// Child emitter that will be triggered.
  final ParticleEmitter emitter;

  /// Lifecycle event that triggers emission.
  final SubEmitterTrigger trigger;

  /// Particle count triggered per event.
  final int count;

  /// Whether spawned sub-particles inherit parent particle velocity.
  final bool inheritVelocity;

  /// Multiplier for inherited parent velocity.
  final double inheritVelocityFactor;

  /// Interval between trail particle emissions in seconds (for [SubEmitterTrigger.trail]).
  final double trailInterval;

  /// Distance threshold between trail emissions in world units (for [SubEmitterTrigger.trail]).
  /// When > 0, particles are emitted continuously along the travel path, preventing gaps at high speeds.
  final double trailDistance;

  const SubEmitter({
    required this.emitter,
    required this.trigger,
    this.count = 5,
    this.inheritVelocity = false,
    this.inheritVelocityFactor = 0.5,
    this.trailInterval = 0.05,
    this.trailDistance = 0.0,
  });

  void validate() {
    emitter.validate();
    if (count <= 0) {
      throw ArgumentError('SubEmitter.count must be > 0');
    }
    if (!inheritVelocityFactor.isFinite) {
      throw ArgumentError('SubEmitter.inheritVelocityFactor must be finite');
    }
    if (!trailInterval.isFinite || trailInterval <= 0) {
      throw ArgumentError('SubEmitter.trailInterval must be finite and > 0');
    }
    if (!trailDistance.isFinite || trailDistance < 0) {
      throw ArgumentError('SubEmitter.trailDistance must be finite and >= 0');
    }
  }
}

/// Comprehensive performance and culling diagnostic telemetry.
final class ParticleEmitterDiagnostics {
  final int activeCount;
  final int maxCapacity;
  final int totalSpawned;
  final int totalDied;
  final int frustumVisibleCount;
  final int frustumCulledCount;
  final double averageSpeed;
  final Aabb bounds;

  const ParticleEmitterDiagnostics({
    required this.activeCount,
    required this.maxCapacity,
    required this.totalSpawned,
    required this.totalDied,
    required this.frustumVisibleCount,
    required this.frustumCulledCount,
    required this.averageSpeed,
    required this.bounds,
  });

  void validate() {
    if (activeCount < 0 ||
        maxCapacity < 0 ||
        activeCount > maxCapacity ||
        totalSpawned < 0 ||
        totalDied < 0 ||
        frustumVisibleCount < 0 ||
        frustumCulledCount < 0 ||
        frustumVisibleCount + frustumCulledCount != activeCount ||
        !averageSpeed.isFinite ||
        averageSpeed < 0 ||
        !bounds.isValid) {
      throw StateError('ParticleEmitterDiagnostics do not reconcile');
    }
  }
}

/// Internal preallocated mutable record for zero-allocation simulation.
final class _ParticleState {
  double x = 0.0;
  double y = 0.0;
  double z = 0.0;

  double vx = 0.0;
  double vy = 0.0;
  double vz = 0.0;

  double spawnX = 0.0;
  double spawnY = 0.0;
  double spawnZ = 0.0;

  double prevX = 0.0;
  double prevY = 0.0;
  double prevZ = 0.0;
  double trailDistanceAccumulator = 0.0;

  double age = 0.0;
  double lifetime = 1.0;
  double size = 1.0;
  double startSize = 1.0;
  double endSize = 1.0;

  double rotation = 0.0;
  double angularVelocity = 0.0;
  double mass = 1.0;
  int materialIndex = 0;
  double trailTimer = 0.0;
  bool isAlive = false;

  void reset() {
    x = y = z = 0.0;
    vx = vy = vz = 0.0;
    spawnX = spawnY = spawnZ = 0.0;
    prevX = prevY = prevZ = 0.0;
    trailDistanceAccumulator = 0.0;
    age = 0.0;
    lifetime = 1.0;
    size = 1.0;
    startSize = 1.0;
    endSize = 1.0;
    rotation = 0.0;
    angularVelocity = 0.0;
    mass = 1.0;
    materialIndex = 0;
    trailTimer = 0.0;
    isAlive = false;
  }
}

/// Universal, high-performance, high-fidelity particle emitter.
///
/// Features a preallocated particle pool for zero runtime garbage collection,
/// instanced WebGL2 batching via [instanceFamilyKey], universal spawning shapes,
/// comprehensive physics forces, and flexible lifetime modulators.
final class ParticleEmitter {
  static int _nextFamilyKey = 5000;

  // Visual Assets
  final MeshHandle mesh;
  final MaterialHandle material;
  final List<MaterialHandle>? materialRamp;
  final DrawMode drawMode;
  final BlendMode blendMode;
  final bool castsShadow;
  final bool receivesShadow;
  final int sortTiebreakerBase;
  final int instanceFamilyKey;

  // Spatial & Geometry
  EmitterShape shape;
  Transform transform;
  ParticleAlignment alignment;
  double stretchFactor;

  // Timing & Emission
  double rate;
  final List<ParticleBurst> bursts;
  double duration;
  bool isLooping;
  double startDelay;
  bool isEmitting;

  // Lifecycle & Kinematics
  double minLifetime;
  double maxLifetime;
  double minSpeed;
  double maxSpeed;
  double minStartSize;
  double maxStartSize;
  double minEndSize;
  double maxEndSize;
  Curve? sizeCurve;

  // Appearance & Rotation
  double fadeInFraction;
  double fadeOutFraction;
  Curve? alphaCurve;
  ParticleColorGradient? colorGradient;
  double minInitialRotation;
  double maxInitialRotation;
  double minAngularVelocity;
  double maxAngularVelocity;

  // Physical Forces & Modifiers
  Vec3 gravity;
  double gravityModifier;
  Vec3 acceleration;
  double dragCoefficient;
  double radialAcceleration;
  double orbitalAcceleration;
  Vec3 orbitalAxis;
  double noiseStrength;
  double noiseFrequency;
  double noiseSpeed;
  final List<ParticleAttractor> attractors;
  ParticleCollisionPlane? collisionPlane;

  /// Accesses or modifies the primary attractor (for single-attractor ergonomics).
  ParticleAttractor? get attractor => attractors.isNotEmpty ? attractors.first : null;
  set attractor(ParticleAttractor? value) {
    attractors.clear();
    if (value != null) attractors.add(value);
  }

  // Cascading Sub-Emitters
  final List<SubEmitter> subEmitters;

  // Memory & Capacity
  final int maxParticles;
  final math.Random _random;

  // Simulation State
  final List<_ParticleState> _pool;
  int _activeCount = 0;
  double _elapsedTime = 0.0;
  double _spawnDebt = 0.0;
  int _totalSpawned = 0;
  int _totalDied = 0;
  final List<int> _burstTriggerCounts;

  ParticleEmitter({
    required this.mesh,
    required this.material,
    this.materialRamp,
    this.drawMode = DrawMode.blended,
    this.blendMode = BlendMode.alpha,
    this.castsShadow = false,
    this.receivesShadow = false,
    this.sortTiebreakerBase = 0,
    int? instanceFamilyKey,
    EmitterShape? shape,
    this.transform = Transform.identity,
    this.alignment = ParticleAlignment.billboard,
    this.stretchFactor = 0.1,
    this.rate = 0.0,
    List<ParticleBurst>? bursts,
    List<SubEmitter>? subEmitters,
    this.duration = 0.0,
    this.isLooping = true,
    this.startDelay = 0.0,
    this.isEmitting = true,
    this.minLifetime = 1.0,
    double? maxLifetime,
    this.minSpeed = 1.0,
    double? maxSpeed,
    this.minStartSize = 1.0,
    double? maxStartSize,
    this.minEndSize = 0.0,
    double? maxEndSize,
    this.sizeCurve,
    this.fadeInFraction = 0.0,
    this.fadeOutFraction = 0.0,
    this.alphaCurve,
    this.colorGradient,
    this.minInitialRotation = 0.0,
    this.maxInitialRotation = 0.0,
    this.minAngularVelocity = 0.0,
    this.maxAngularVelocity = 0.0,
    this.gravity = Vec3.zero,
    this.gravityModifier = 1.0,
    this.acceleration = Vec3.zero,
    this.dragCoefficient = 0.0,
    this.radialAcceleration = 0.0,
    this.orbitalAcceleration = 0.0,
    this.orbitalAxis = Vec3.unitY,
    this.noiseStrength = 0.0,
    this.noiseFrequency = 1.0,
    this.noiseSpeed = 1.0,
    ParticleAttractor? attractor,
    List<ParticleAttractor>? attractors,
    this.collisionPlane,
    this.maxParticles = 500,
    int? seed,
  })  : instanceFamilyKey = instanceFamilyKey ?? (_nextFamilyKey++),
        shape = shape ?? const PointShape(),
        maxLifetime = maxLifetime ?? minLifetime,
        maxSpeed = maxSpeed ?? minSpeed,
        maxStartSize = maxStartSize ?? minStartSize,
        maxEndSize = maxEndSize ?? minEndSize,
        bursts = bursts == null ? const [] : List.unmodifiable(bursts),
        subEmitters = subEmitters == null ? const [] : List.unmodifiable(subEmitters),
        attractors = [
          if (attractor != null) attractor,
          if (attractors != null) ...attractors,
        ],
        _burstTriggerCounts = bursts == null ? [] : List.filled(bursts.length, 0),
        _random = seed != null ? math.Random(seed) : math.Random(),
        _pool = List<_ParticleState>.generate(maxParticles, (_) => _ParticleState(), growable: false) {
    validate();
  }

  /// Number of currently active, living particles.
  int get activeCount => _activeCount;

  /// Maximum particle pool capacity.
  int get capacity => maxParticles;

  /// Total count of particles spawned over emitter lifetime.
  int get totalSpawned => _totalSpawned;

  /// Total count of particles expired or killed.
  int get totalDied => _totalDied;

  /// Current elapsed simulation time in seconds.
  double get elapsedTime => _elapsedTime;

  void validate() {
    if (!mesh.isValid || !material.isValid) {
      throw ArgumentError('ParticleEmitter requires live resources');
    }
    if (materialRamp != null) {
      for (final m in materialRamp!) {
        if (!m.isValid) throw ArgumentError('ParticleEmitter materialRamp contains invalid handle');
      }
    }
    shape.validate();
    transform.validate();

    if (!rate.isFinite || rate < 0) {
      throw ArgumentError('ParticleEmitter.rate must be finite and >= 0');
    }
    for (final burst in bursts) {
      burst.validate();
    }
    if (!duration.isFinite || duration < 0) {
      throw ArgumentError('ParticleEmitter.duration must be finite and >= 0');
    }
    if (!startDelay.isFinite || startDelay < 0) {
      throw ArgumentError('ParticleEmitter.startDelay must be finite and >= 0');
    }
    if (!minLifetime.isFinite || minLifetime <= 0 || maxLifetime < minLifetime) {
      throw ArgumentError('ParticleEmitter lifetime range must be valid: $minLifetime..$maxLifetime');
    }
    if (!minSpeed.isFinite || minSpeed < 0 || maxSpeed < minSpeed) {
      throw ArgumentError('ParticleEmitter speed range must be valid: $minSpeed..$maxSpeed');
    }
    if (!minStartSize.isFinite || minStartSize <= 0 || maxStartSize < minStartSize) {
      throw ArgumentError('ParticleEmitter start size range must be valid: $minStartSize..$maxStartSize');
    }
    if (!minEndSize.isFinite || minEndSize < 0 || maxEndSize < minEndSize) {
      throw ArgumentError('ParticleEmitter end size range must be valid: $minEndSize..$maxEndSize');
    }
    if (!fadeInFraction.isFinite || fadeInFraction < 0 || fadeInFraction > 1) {
      throw ArgumentError('ParticleEmitter.fadeInFraction must be in [0, 1]');
    }
    if (!fadeOutFraction.isFinite || fadeOutFraction < 0 || fadeOutFraction > 1) {
      throw ArgumentError('ParticleEmitter.fadeOutFraction must be in [0, 1]');
    }
    if (fadeInFraction + fadeOutFraction > 1.0) {
      throw ArgumentError('ParticleEmitter fadeInFraction + fadeOutFraction must be <= 1.0');
    }
    if (!gravity.isFinite || !acceleration.isFinite) {
      throw ArgumentError('ParticleEmitter gravity and acceleration must be finite');
    }
    if (!dragCoefficient.isFinite || dragCoefficient < 0) {
      throw ArgumentError('ParticleEmitter.dragCoefficient must be finite and >= 0');
    }
    if (!radialAcceleration.isFinite || !orbitalAcceleration.isFinite) {
      throw ArgumentError('ParticleEmitter radial and orbital accelerations must be finite');
    }
    if (!orbitalAxis.isFinite || orbitalAxis.lengthSquared < 1e-6) {
      throw ArgumentError('ParticleEmitter.orbitalAxis must be finite and non-zero');
    }
    if (!noiseStrength.isFinite || noiseStrength < 0 || !noiseFrequency.isFinite || !noiseSpeed.isFinite) {
      throw ArgumentError('ParticleEmitter noise parameters must be finite');
    }
    for (final s in subEmitters) {
      s.validate();
    }
    for (final a in attractors) {
      a.validate();
    }
    collisionPlane?.validate();
    colorGradient?.validate();
    if (maxParticles <= 0) {
      throw ArgumentError('ParticleEmitter.maxParticles must be > 0');
    }
  }

  /// Triggers an immediate burst of [count] particles (clamped to remaining pool capacity).
  ///
  /// Optionally overrides spawn position and applies inherited velocity (e.g. from parent particles).
  int burst(int count, {Vec3? position, Vec3? inheritedVelocity}) {
    if (count <= 0) return 0;
    var spawned = 0;
    final toSpawn = math.min(count, maxParticles - _activeCount);
    for (var i = 0; i < toSpawn; i++) {
      _spawnOne(positionOverride: position, inheritedVelocity: inheritedVelocity);
      spawned++;
    }
    return spawned;
  }

  /// Resets simulation state and clears active particles.
  void reset() {
    _activeCount = 0;
    _elapsedTime = 0.0;
    _spawnDebt = 0.0;
    _totalSpawned = 0;
    _totalDied = 0;
    for (var i = 0; i < _burstTriggerCounts.length; i++) {
      _burstTriggerCounts[i] = 0;
    }
    for (var i = 0; i < _pool.length; i++) {
      _pool[i].reset();
    }
    for (var i = 0; i < subEmitters.length; i++) {
      subEmitters[i].emitter.reset();
    }
  }

  /// Advances the simulation by [dt] seconds.
  void update(double dt) {
    if (!dt.isFinite || dt <= 0) return;
    validate();

    _elapsedTime += dt;

    // Check start delay
    if (_elapsedTime < startDelay) return;

    final simTime = _elapsedTime - startDelay;

    // Handle duration cycle looping
    var activeSimTime = simTime;
    if (duration > 0) {
      if (isLooping) {
        final cycleIndex = (simTime / duration).floor();
        activeSimTime = simTime % duration;
        // Reset burst triggers when a new cycle starts
        final expectedCycle = cycleIndex;
        for (var i = 0; i < bursts.length; i++) {
          if (bursts[i].cycles > 0 && expectedCycle >= bursts[i].cycles) {
            continue;
          }
        }
      } else if (simTime > duration) {
        isEmitting = false;
      }
    }

    // Process bursts
    if (isEmitting) {
      for (var b = 0; b < bursts.length; b++) {
        final burst = bursts[b];
        final maxCycles = burst.cycles;
        final countTriggered = _burstTriggerCounts[b];

        if (maxCycles > 0 && countTriggered >= maxCycles) continue;

        final triggerTime = burst.time + countTriggered * burst.repeatInterval;
        if (activeSimTime >= triggerTime) {
          this.burst(burst.sampleCount(_random));
          _burstTriggerCounts[b]++;
        }
      }

      // Process continuous rate emission
      if (rate > 0) {
        _spawnDebt += rate * dt;
        while (_spawnDebt >= 1.0 && _activeCount < maxParticles) {
          _spawnOne();
          _spawnDebt -= 1.0;
        }
        if (_activeCount >= maxParticles) {
          _spawnDebt = 0.0;
        }
      }
    }

    // Integrate live particles
    _integrateParticles(dt);

    // Update cascading sub-emitters
    for (var s = 0; s < subEmitters.length; s++) {
      subEmitters[s].emitter.update(dt);
    }
  }

  void _spawnOne({Vec3? positionOverride, Vec3? inheritedVelocity}) {
    if (_activeCount >= maxParticles) return;

    final p = _pool[_activeCount++];
    p.isAlive = true;
    p.trailTimer = 0.0;
    p.trailDistanceAccumulator = 0.0;

    // Spatial spawn
    final sample = shape.sampleSpawn(_random, transform);
    if (positionOverride != null) {
      p.x = positionOverride.x;
      p.y = positionOverride.y;
      p.z = positionOverride.z;
    } else {
      p.x = sample.position.x;
      p.y = sample.position.y;
      p.z = sample.position.z;
    }
    p.spawnX = p.x;
    p.spawnY = p.y;
    p.spawnZ = p.z;
    p.prevX = p.x;
    p.prevY = p.y;
    p.prevZ = p.z;

    // Velocity & Speed
    final speed = _lerpDouble(minSpeed, maxSpeed, _random.nextDouble());
    final launchVel = sample.direction * speed;
    p.vx = launchVel.x;
    p.vy = launchVel.y;
    p.vz = launchVel.z;
    if (inheritedVelocity != null) {
      p.vx += inheritedVelocity.x;
      p.vy += inheritedVelocity.y;
      p.vz += inheritedVelocity.z;
    }

    // Lifetime & Size
    p.age = 0.0;
    p.lifetime = _lerpDouble(minLifetime, maxLifetime, _random.nextDouble());
    p.startSize = _lerpDouble(minStartSize, maxStartSize, _random.nextDouble());
    p.endSize = _lerpDouble(minEndSize, maxEndSize, _random.nextDouble());
    p.size = p.startSize;

    // Rotation & Mass
    p.rotation = _lerpDouble(minInitialRotation, maxInitialRotation, _random.nextDouble());
    p.angularVelocity = _lerpDouble(minAngularVelocity, maxAngularVelocity, _random.nextDouble());
    p.mass = 1.0;
    p.materialIndex = 0;

    _totalSpawned++;

    // Trigger birth sub-emitters
    for (var s = 0; s < subEmitters.length; s++) {
      final sub = subEmitters[s];
      if (sub.trigger == SubEmitterTrigger.birth) {
        final vel = sub.inheritVelocity
            ? Vec3(p.vx, p.vy, p.vz) * sub.inheritVelocityFactor
            : Vec3.zero;
        sub.emitter.burst(sub.count, position: Vec3(p.x, p.y, p.z), inheritedVelocity: vel);
      }
    }
  }

  void _integrateParticles(double dt) {
    final gravX = gravity.x * gravityModifier;
    final gravY = gravity.y * gravityModifier;
    final gravZ = gravity.z * gravityModifier;

    final accelX = acceleration.x;
    final accelY = acceleration.y;
    final accelZ = acceleration.z;

    final dragDecay = dragCoefficient > 0 ? math.exp(-dragCoefficient * dt) : 1.0;
    final center = transform.translation;
    final normOrbitalAxis = orbitalAxis.normalized;

    final plane = collisionPlane;
    final matRamp = materialRamp;

    var index = 0;
    while (index < _activeCount) {
      final p = _pool[index];
      p.age += dt;

      // Check particle death
      if (p.age >= p.lifetime) {
        _killParticleAt(index);
        continue;
      }

      final tNorm = p.age / p.lifetime;

      // Store previous position for trajectory and distance tracking
      p.prevX = p.x;
      p.prevY = p.y;
      p.prevZ = p.z;

      // Base forces: gravity + constant acceleration
      var ax = gravX + accelX;
      var ay = gravY + accelY;
      var az = gravZ + accelZ;

      // Radial acceleration (relative to emitter center)
      if (radialAcceleration.abs() > 1e-6) {
        final rx = p.x - center.x;
        final ry = p.y - center.y;
        final rz = p.z - center.z;
        final rLen = math.sqrt(rx * rx + ry * ry + rz * rz);
        if (rLen > 1e-5) {
          final radScale = radialAcceleration / rLen;
          ax += rx * radScale;
          ay += ry * radScale;
          az += rz * radScale;
        }
      }

      // Orbital / tangential acceleration
      if (orbitalAcceleration.abs() > 1e-6) {
        final rx = p.x - center.x;
        final ry = p.y - center.y;
        final rz = p.z - center.z;
        // Tangent = orbitalAxis x r
        final tx = normOrbitalAxis.y * rz - normOrbitalAxis.z * ry;
        final ty = normOrbitalAxis.z * rx - normOrbitalAxis.x * rz;
        final tz = normOrbitalAxis.x * ry - normOrbitalAxis.y * rx;
        final tLen = math.sqrt(tx * tx + ty * ty + tz * tz);
        if (tLen > 1e-5) {
          final tanScale = orbitalAcceleration / tLen;
          ax += tx * tanScale;
          ay += ty * tanScale;
          az += tz * tanScale;
        }
      }

      // Procedural 3D turbulence noise
      if (noiseStrength > 1e-6) {
        final (nx, ny, nz) = _evaluateTurbulence(p.x, p.y, p.z, _elapsedTime);
        ax += nx * noiseStrength;
        ay += ny * noiseStrength;
        az += nz * noiseStrength;
      }

      // Attractor fields evaluation
      var absorbed = false;
      for (var a = 0; a < attractors.length; a++) {
        final attr = attractors[a];
        final dx = attr.position.x - p.x;
        final dy = attr.position.y - p.y;
        final dz = attr.position.z - p.z;
        final distSq = dx * dx + dy * dy + dz * dz;
        final dist = math.sqrt(distSq);

        if (attr.killRadius > 0 && dist <= attr.killRadius) {
          _killParticleAt(index);
          absorbed = true;
          break;
        }

        if (dist <= attr.range && dist > 1e-4) {
          double strengthFactor;
          switch (attr.falloff) {
            case AttractorFalloff.linear:
              strengthFactor = 1.0 - (dist / attr.range);
            case AttractorFalloff.inverseSquare:
              final normDist = dist / attr.range;
              strengthFactor = 1.0 / (1.0 + normDist * normDist * 4.0);
            case AttractorFalloff.constant:
              strengthFactor = 1.0;
          }
          final attrMag = (attr.strength * strengthFactor) / dist;
          ax += dx * attrMag;
          ay += dy * attrMag;
          az += dz * attrMag;

          // Localized tangential vortex swirl around attractor axis
          if (attr.orbitalStrength.abs() > 1e-6) {
            final normAxis = attr.axis.normalized;
            final rx = -dx;
            final ry = -dy;
            final rz = -dz;
            final tx = normAxis.y * rz - normAxis.z * ry;
            final ty = normAxis.z * rx - normAxis.x * rz;
            final tz = normAxis.x * ry - normAxis.y * rx;
            final tLen = math.sqrt(tx * tx + ty * ty + tz * tz);
            if (tLen > 1e-5) {
              final tanScale = (attr.orbitalStrength * strengthFactor) / tLen;
              ax += tx * tanScale;
              ay += ty * tanScale;
              az += tz * tanScale;
            }
          }
        }
      }
      if (absorbed) continue;

      // Position integration with acceleration term (exact for constant acceleration)
      p.x += p.vx * dt + 0.5 * ax * dt * dt;
      p.y += p.vy * dt + 0.5 * ay * dt * dt;
      p.z += p.vz * dt + 0.5 * az * dt * dt;

      // Apply acceleration to velocity and drag decay
      p.vx = (p.vx + ax * dt) * dragDecay;
      p.vy = (p.vy + ay * dt) * dragDecay;
      p.vz = (p.vz + az * dt) * dragDecay;

      // Post-move attractor absorption check
      var postAbsorbed = false;
      for (var a = 0; a < attractors.length; a++) {
        final attr = attractors[a];
        if (attr.killRadius > 0) {
          final kdx = attr.position.x - p.x;
          final kdy = attr.position.y - p.y;
          final kdz = attr.position.z - p.z;
          if (kdx * kdx + kdy * kdy + kdz * kdz <= attr.killRadius * attr.killRadius) {
            _killParticleAt(index);
            postAbsorbed = true;
            break;
          }
        }
      }
      if (postAbsorbed) continue;

      // Collision plane evaluation
      if (plane != null) {
        final normal = plane.normal.normalized;
        final toPlaneX = p.x - plane.point.x;
        final toPlaneY = p.y - plane.point.y;
        final toPlaneZ = p.z - plane.point.z;
        final dist = toPlaneX * normal.x + toPlaneY * normal.y + toPlaneZ * normal.z;

        if (dist <= 0) {
          // Trigger collision sub-emitters
          for (var s = 0; s < subEmitters.length; s++) {
            final sub = subEmitters[s];
            if (sub.trigger == SubEmitterTrigger.collision) {
              final vel = sub.inheritVelocity
                  ? Vec3(p.vx, p.vy, p.vz) * sub.inheritVelocityFactor
                  : Vec3.zero;
              sub.emitter.burst(sub.count, position: Vec3(p.x, p.y, p.z), inheritedVelocity: vel);
            }
          }

          switch (plane.action) {
            case ParticleCollisionAction.kill:
              _killParticleAt(index);
              continue;

            case ParticleCollisionAction.slide:
              // Push to surface and cancel velocity along normal
              p.x -= dist * normal.x;
              p.y -= dist * normal.y;
              p.z -= dist * normal.z;
              final dotV = p.vx * normal.x + p.vy * normal.y + p.vz * normal.z;
              p.vx -= dotV * normal.x;
              p.vy -= dotV * normal.y;
              p.vz -= dotV * normal.z;
              p.vx *= (1.0 - plane.friction);
              p.vy *= (1.0 - plane.friction);
              p.vz *= (1.0 - plane.friction);

            case ParticleCollisionAction.bounce:
              // Push out of plane
              p.x -= dist * normal.x;
              p.y -= dist * normal.y;
              p.z -= dist * normal.z;
              final dotV = p.vx * normal.x + p.vy * normal.y + p.vz * normal.z;
              if (dotV < 0) {
                final reflectX = p.vx - (1.0 + plane.restitution) * dotV * normal.x;
                final reflectY = p.vy - (1.0 + plane.restitution) * dotV * normal.y;
                final reflectZ = p.vz - (1.0 + plane.restitution) * dotV * normal.z;
                p.vx = reflectX * (1.0 - plane.friction);
                p.vy = reflectY * (1.0 - plane.friction);
                p.vz = reflectZ * (1.0 - plane.friction);
              }
          }
        }
      }

      // Modulators: Size over lifetime
      final curveFactor = sizeCurve?.transform(tNorm) ?? tNorm;
      p.size = _lerpDouble(p.startSize, p.endSize, curveFactor);

      // Modulators: Rotation
      p.rotation += p.angularVelocity * dt;

      // Trail sub-emitter emission (both continuous distance-based and time-based)
      final moveX = p.x - p.prevX;
      final moveY = p.y - p.prevY;
      final moveZ = p.z - p.prevZ;
      final moveDist = math.sqrt(moveX * moveX + moveY * moveY + moveZ * moveZ);

      p.trailTimer += dt;
      var hasFiredTimeTrail = false;

      for (var s = 0; s < subEmitters.length; s++) {
        final sub = subEmitters[s];
        if (sub.trigger == SubEmitterTrigger.trail) {
          final vel = sub.inheritVelocity
              ? Vec3(p.vx, p.vy, p.vz) * sub.inheritVelocityFactor
              : Vec3.zero;

          if (sub.trailDistance > 0) {
            p.trailDistanceAccumulator += moveDist;
            while (p.trailDistanceAccumulator >= sub.trailDistance) {
              p.trailDistanceAccumulator -= sub.trailDistance;
              final frac = moveDist > 1e-6
                  ? (moveDist - p.trailDistanceAccumulator).clamp(0.0, moveDist) / moveDist
                  : 1.0;
              final emitPos = Vec3(
                p.prevX + moveX * frac,
                p.prevY + moveY * frac,
                p.prevZ + moveZ * frac,
              );
              sub.emitter.burst(sub.count, position: emitPos, inheritedVelocity: vel);
            }
          } else if (p.trailTimer >= sub.trailInterval) {
            sub.emitter.burst(sub.count, position: Vec3(p.x, p.y, p.z), inheritedVelocity: vel);
            hasFiredTimeTrail = true;
          }
        }
      }
      if (hasFiredTimeTrail) {
        p.trailTimer = 0.0;
      }

      // Material ramp selection
      if (matRamp != null && matRamp.isNotEmpty) {
        final matIdx = (tNorm * matRamp.length).floor().clamp(0, matRamp.length - 1);
        p.materialIndex = matIdx;
      }

      index++;
    }
  }

  void _killParticleAt(int index) {
    final dying = _pool[index];
    final deathPos = Vec3(dying.x, dying.y, dying.z);

    // Trigger death sub-emitters before slot overwrite
    for (var s = 0; s < subEmitters.length; s++) {
      final sub = subEmitters[s];
      if (sub.trigger == SubEmitterTrigger.death) {
        final vel = sub.inheritVelocity
            ? Vec3(dying.vx, dying.vy, dying.vz) * sub.inheritVelocityFactor
            : Vec3.zero;
        sub.emitter.burst(sub.count, position: deathPos, inheritedVelocity: vel);
      }
    }

    _activeCount--;
    _totalDied++;
    if (index < _activeCount) {
      final last = _pool[_activeCount];

      // Swap fields
      dying.x = last.x;
      dying.y = last.y;
      dying.z = last.z;
      dying.vx = last.vx;
      dying.vy = last.vy;
      dying.vz = last.vz;
      dying.spawnX = last.spawnX;
      dying.spawnY = last.spawnY;
      dying.spawnZ = last.spawnZ;
      dying.prevX = last.prevX;
      dying.prevY = last.prevY;
      dying.prevZ = last.prevZ;
      dying.trailDistanceAccumulator = last.trailDistanceAccumulator;
      dying.age = last.age;
      dying.lifetime = last.lifetime;
      dying.size = last.size;
      dying.startSize = last.startSize;
      dying.endSize = last.endSize;
      dying.rotation = last.rotation;
      dying.angularVelocity = last.angularVelocity;
      dying.mass = last.mass;
      dying.materialIndex = last.materialIndex;
      dying.trailTimer = last.trailTimer;
      dying.isAlive = last.isAlive;
    }
    _pool[_activeCount].reset();
  }

  /// Calculates the dynamic axis-aligned bounding box enclosing all active particles.
  Aabb computeBounds({bool includeSubEmitters = true}) {
    Aabb bounds;
    if (_activeCount == 0) {
      final c = transform.translation;
      bounds = Aabb(c, c);
    } else {
      var minX = double.infinity, minY = double.infinity, minZ = double.infinity;
      var maxX = -double.infinity, maxY = -double.infinity, maxZ = -double.infinity;

      for (var i = 0; i < _activeCount; i++) {
        final p = _pool[i];
        final halfSize = p.size * 0.5;
        if (p.x - halfSize < minX) minX = p.x - halfSize;
        if (p.y - halfSize < minY) minY = p.y - halfSize;
        if (p.z - halfSize < minZ) minZ = p.z - halfSize;
        if (p.x + halfSize > maxX) maxX = p.x + halfSize;
        if (p.y + halfSize > maxY) maxY = p.y + halfSize;
        if (p.z + halfSize > maxZ) maxZ = p.z + halfSize;
      }

      bounds = Aabb(Vec3(minX, minY, minZ), Vec3(maxX, maxY, maxZ));
    }

    if (includeSubEmitters) {
      for (var s = 0; s < subEmitters.length; s++) {
        if (subEmitters[s].emitter.activeCount > 0) {
          bounds = bounds.union(subEmitters[s].emitter.computeBounds(includeSubEmitters: true));
        }
      }
    }

    return bounds;
  }

  /// Submits all active particles as frame-local transient items through [encoder].
  /// Returns the count of particles submitted.
  int submit(RenderEncoder encoder, FrameInput frame, {bool includeSubEmitters = true}) {
    var submitted = 0;
    if (_activeCount > 0) {
      final frustum = frame.camera.buildFrustum();
      final cameraEye = frame.camera.eye;
      final cameraForward = frame.camera.forward;

      final matRamp = materialRamp;
      final defaultMat = material;

      for (var i = 0; i < _activeCount; i++) {
        final p = _pool[i];
        final pos = Vec3(p.x, p.y, p.z);
        final halfExtent = Vec3(p.size * 0.5, p.size * 0.5, p.size * 0.5);

        // Frustum culling test
        final cullTest = frustum.testAabb(Aabb(pos - halfExtent, pos + halfExtent));
        if (cullTest == FrustumTest.outside) continue;

        // Particle rotation construction
        final rotation = _rotationForParticle(p, cameraEye, cameraForward);

        // Compute scale
        var finalScale = p.size;
        if (alignment == ParticleAlignment.velocityStretched) {
          final speed = math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
          finalScale = p.size * (1.0 + speed * stretchFactor);
        }
        if (finalScale <= 1e-6) finalScale = 1e-6;

        // Select active material
        final activeMat = (matRamp != null && matRamp.isNotEmpty)
            ? matRamp[p.materialIndex.clamp(0, matRamp.length - 1)]
            : defaultMat;

        encoder.submit(
          RetainedItemDescriptor(
            mesh: mesh,
            material: activeMat,
            transform: Transform(
              translation: pos,
              rotation: rotation,
              scale: finalScale,
            ),
            drawMode: drawMode,
            blendMode: blendMode,
            castsShadow: castsShadow,
            receivesShadow: receivesShadow,
            sortTiebreaker: sortTiebreakerBase + i,
            instanceFamilyKey: instanceFamilyKey,
          ),
        );
        submitted++;
      }
    }

    if (includeSubEmitters) {
      for (var s = 0; s < subEmitters.length; s++) {
        submitted += subEmitters[s].emitter.submit(encoder, frame, includeSubEmitters: true);
      }
    }

    return submitted;
  }

  /// Produces an immutable diagnostics snapshot for frame observation.
  ParticleEmitterDiagnostics diagnostics(FrameInput frame) {
    final bounds = computeBounds();
    final frustum = frame.camera.buildFrustum();
    var visible = 0;
    var speedTotal = 0.0;

    for (var i = 0; i < _activeCount; i++) {
      final p = _pool[i];
      final pos = Vec3(p.x, p.y, p.z);
      final halfExtent = Vec3(p.size * 0.5, p.size * 0.5, p.size * 0.5);
      final cull = frustum.testAabb(Aabb(pos - halfExtent, pos + halfExtent));
      if (cull != FrustumTest.outside) visible++;
      speedTotal += math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
    }

    final diag = ParticleEmitterDiagnostics(
      activeCount: _activeCount,
      maxCapacity: maxParticles,
      totalSpawned: _totalSpawned,
      totalDied: _totalDied,
      frustumVisibleCount: visible,
      frustumCulledCount: _activeCount - visible,
      averageSpeed: _activeCount == 0 ? 0.0 : speedTotal / _activeCount,
      bounds: bounds,
    );
    diag.validate();
    return diag;
  }

  Quat _rotationForParticle(_ParticleState p, Vec3 cameraEye, Vec3 cameraForward) {
    switch (alignment) {
      case ParticleAlignment.billboard:
        // Spherical billboard quad faces camera eye
        final toCamera = (cameraEye - Vec3(p.x, p.y, p.z)).normalized;
        if (toCamera.lengthSquared < 1e-6) return Quat.identity;
        final baseRot = Quat.fromTo(Vec3.unitZ, toCamera);
        if (p.rotation.abs() > 1e-6) {
          final roll = Quat.axisAngle(Vec3.unitZ, p.rotation);
          return (baseRot * roll).normalized;
        }
        return baseRot;

      case ParticleAlignment.velocityAligned:
      case ParticleAlignment.velocityStretched:
        final vel = Vec3(p.vx, p.vy, p.vz);
        if (vel.lengthSquared < 1e-6) {
          return p.rotation.abs() > 1e-6 ? Quat.axisAngle(Vec3.unitY, p.rotation) : Quat.identity;
        }
        final dir = vel.normalized;
        const source = Vec3(0, -1, 0); // Aligns along -Y (consistent with Pixeldart standard)
        final dot = source.dot(dir).clamp(-1.0, 1.0);
        if (dot > 0.999999) return Quat.identity;
        if (dot < -0.999999) return Quat.axisAngle(Vec3.unitX, math.pi);
        final axis = source.cross(dir);
        final alignRot = Quat.axisAngle(axis, math.acos(dot));
        if (p.rotation.abs() > 1e-6) {
          final spin = Quat.axisAngle(dir, p.rotation);
          return (spin * alignRot).normalized;
        }
        return alignRot;

      case ParticleAlignment.axial:
        return Quat.axisAngle(Vec3.unitY, p.rotation);
    }
  }

  (double, double, double) _evaluateTurbulence(double x, double y, double z, double time) {
    final f = noiseFrequency;
    final s = noiseSpeed * time;
    final nx = math.sin(y * f + s) + math.cos(z * f * 1.3 - s * 0.7);
    final ny = math.sin(z * f + s * 1.1) + math.cos(x * f * 1.1 - s);
    final nz = math.sin(x * f - s * 0.9) + math.cos(y * f * 0.9 + s * 1.2);
    return (nx, ny, nz);
  }

  static double _lerpDouble(double a, double b, double t) => a + (b - a) * t;
}
