import 'dart:math' as math;

import '../math/vec.dart';

/// Single directional harmonic wave component of a Gerstner ocean surface.
final class GerstnerWaveComponent {
  final Vec2 direction;
  final double amplitude;
  final double wavelength;
  final double steepness;
  final double speed;

  late final double _wavenumber;
  late final double _phaseSpeed;
  late final double _dirX;
  late final double _dirZ;

  GerstnerWaveComponent({
    required Vec2 direction,
    required this.amplitude,
    required this.wavelength,
    this.steepness = 0.5,
    this.speed = 1.5,
  }) : direction = direction.lengthSquared > 1e-6 ? direction.normalized : const Vec2(1, 0) {
    if (amplitude < 0) throw ArgumentError.value(amplitude, 'amplitude', 'must be >= 0');
    if (wavelength <= 0) throw ArgumentError.value(wavelength, 'wavelength', 'must be > 0');

    _wavenumber = (2.0 * math.pi) / wavelength;
    _phaseSpeed = speed * _wavenumber;
    _dirX = this.direction.x;
    _dirZ = this.direction.y;
  }

  double get wavenumber => _wavenumber;
  double get phaseSpeed => _phaseSpeed;
  double get dirX => _dirX;
  double get dirZ => _dirZ;
}

/// Result of evaluating buoyancy physics at a point in the ocean.
final class BuoyancySample {
  /// Vertical surface height at the sample location.
  final double surfaceHeight;

  /// Current submerged depth (positive if below water surface, <= 0 if airborne).
  final double submersion;

  /// Normalized ocean surface normal at this point.
  final Vec3 surfaceNormal;

  /// Upward buoyancy force vector acting on the submerged body.
  final Vec3 force;

  const BuoyancySample({
    required this.surfaceHeight,
    required this.submersion,
    required this.surfaceNormal,
    required this.force,
  });

  bool get isSubmerged => submersion > 0.0;
}

/// Evaluates 3D trochoidal Gerstner ocean waves and physical buoyancy dynamics.
final class GerstnerWaveEvaluator {
  final List<GerstnerWaveComponent> waves;
  final double baseHeight;

  GerstnerWaveEvaluator({
    required List<GerstnerWaveComponent> waves,
    this.baseHeight = 0.0,
  }) : waves = List.unmodifiable(waves) {
    if (waves.isEmpty) {
      throw ArgumentError('GerstnerWaveEvaluator requires at least 1 wave component');
    }
  }

  /// Preset tuned for open-ocean rolling swells and surface chop.
  factory GerstnerWaveEvaluator.ocean({double baseHeight = 0.0}) {
    return GerstnerWaveEvaluator(
      baseHeight: baseHeight,
      waves: [
        // Primary deep-ocean swell
        GerstnerWaveComponent(
          direction: const Vec2(1.0, 0.2),
          amplitude: 0.6,
          wavelength: 18.0,
          steepness: 0.45,
          speed: 2.2,
        ),
        // Secondary cross-swell
        GerstnerWaveComponent(
          direction: const Vec2(0.3, 0.95),
          amplitude: 0.35,
          wavelength: 10.0,
          steepness: 0.35,
          speed: 1.8,
        ),
        // Medium wave
        GerstnerWaveComponent(
          direction: const Vec2(-0.7, 0.7),
          amplitude: 0.18,
          wavelength: 5.5,
          steepness: 0.25,
          speed: 1.4,
        ),
        // High-frequency surface capillary chop
        GerstnerWaveComponent(
          direction: const Vec2(0.8, -0.6),
          amplitude: 0.08,
          wavelength: 2.2,
          steepness: 0.20,
          speed: 1.1,
        ),
      ],
    );
  }

  /// Samples the 3D displacement vector (dx, dy, dz) at horizontal position (x, z) and time [t].
  Vec3 sampleDisplacement(double x, double z, double t) {
    var dx = 0.0;
    var dy = 0.0;
    var dz = 0.0;

    for (var i = 0; i < waves.length; i++) {
      final w = waves[i];
      final theta = (w.dirX * x + w.dirZ * z) * w.wavenumber + t * w.phaseSpeed;
      final cosTh = math.cos(theta);
      final sinTh = math.sin(theta);
      final qa = w.steepness * w.amplitude;

      dx += w.dirX * qa * cosTh;
      dy += w.amplitude * sinTh;
      dz += w.dirZ * qa * cosTh;
    }

    return Vec3(dx, dy, dz);
  }

  /// Samples the true displaced 3D world surface position at (x, z) and time [t].
  Vec3 samplePosition(double x, double z, double t) {
    final disp = sampleDisplacement(x, z, t);
    return Vec3(x + disp.x, baseHeight + disp.y, z + disp.z);
  }

  /// Samples vertical surface height at horizontal position (x, z) and time [t].
  double sampleHeight(double x, double z, double t) {
    var dy = 0.0;
    for (var i = 0; i < waves.length; i++) {
      final w = waves[i];
      final theta = (w.dirX * x + w.dirZ * z) * w.wavenumber + t * w.phaseSpeed;
      dy += w.amplitude * math.sin(theta);
    }
    return baseHeight + dy;
  }

  /// Samples the exact analytical 3D surface normal at horizontal position (x, z) and time [t].
  Vec3 sampleNormal(double x, double z, double t) {
    var nx = 0.0;
    var ny = 1.0;
    var nz = 0.0;

    for (var i = 0; i < waves.length; i++) {
      final w = waves[i];
      final theta = (w.dirX * x + w.dirZ * z) * w.wavenumber + t * w.phaseSpeed;
      final cosTh = math.cos(theta);
      final sinTh = math.sin(theta);
      final wa = w.wavenumber * w.amplitude;

      nx -= w.dirX * wa * cosTh;
      ny -= w.steepness * wa * sinTh;
      nz -= w.dirZ * wa * cosTh;
    }

    final len = math.sqrt(nx * nx + ny * ny + nz * nz);
    if (len < 1e-6) return const Vec3(0, 1, 0);
    final invLen = 1.0 / len;
    return Vec3(nx * invLen, ny * invLen, nz * invLen);
  }

  /// Evaluates physical buoyancy force for an object at [bodyPosition] in the ocean.
  BuoyancySample sampleBuoyancy({
    required Vec3 bodyPosition,
    double submergedDepth = 1.0,
    double mass = 1.0,
    double gravity = 9.81,
    double time = 0.0,
  }) {
    if (submergedDepth <= 0) throw ArgumentError.value(submergedDepth, 'submergedDepth', 'must be > 0');

    final surfH = sampleHeight(bodyPosition.x, bodyPosition.z, time);
    final depth = surfH - bodyPosition.y;
    final norm = sampleNormal(bodyPosition.x, bodyPosition.z, time);

    if (depth <= 0.0) {
      return BuoyancySample(
        surfaceHeight: surfH,
        submersion: 0.0,
        surfaceNormal: norm,
        force: const Vec3(0, 0, 0),
      );
    }

    final submergedRatio = (depth / submergedDepth).clamp(0.0, 1.5);
    final forceMagnitude = mass * gravity * submergedRatio;
    // Buoyancy acts primarily upwards aligned with local wave normal tilt
    final forceDir = Vec3(norm.x * 0.3, norm.y, norm.z * 0.3).normalized;
    final force = forceDir * forceMagnitude;

    return BuoyancySample(
      surfaceHeight: surfH,
      submersion: depth,
      surfaceNormal: norm,
      force: force,
    );
  }
}
