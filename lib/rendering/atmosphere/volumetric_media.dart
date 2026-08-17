import 'dart:math' as math;

import '../math/vec.dart';

/// Participating volumetric media, height fog, and in-scattering models in PixelDart.
final class VolumetricMediaEngine {
  static const double _epsilon = 1e-8;

  /// Evaluates analytical point light in-scattering along a line segment.
  static double evaluatePointInScattering({
    required Vec3 rayOrigin,
    required Vec3 rayDirection,
    required double rayLength,
    required Vec3 lightPos,
    required double lightIntensity,
    required double scatteringCoeff,
    double anisotropy = 0.70,
  }) {
    _requireFinite('rayOrigin', rayOrigin);
    _requireFinite('rayDirection', rayDirection);
    _requireFinite('lightPos', lightPos);
    _requireFiniteScalar('rayLength', rayLength);
    _requireFiniteScalar('lightIntensity', lightIntensity);
    _requireFiniteScalar('scatteringCoeff', scatteringCoeff);
    _requireFiniteScalar('anisotropy', anisotropy);
    if (rayDirection.lengthSquared < _epsilon) {
      throw ArgumentError('rayDirection must be nonzero');
    }
    if (rayLength < 0) throw ArgumentError('rayLength must be >= 0');
    if (lightIntensity < 0 || scatteringCoeff < 0) {
      throw ArgumentError('lightIntensity and scatteringCoeff must be >= 0');
    }
    if (anisotropy <= -0.999 || anisotropy >= 0.999) {
      throw ArgumentError('anisotropy must be in (-0.999, 0.999)');
    }
    final direction = rayDirection.normalized;
    final toLight = Vec3(
      lightPos.x - rayOrigin.x,
      lightPos.y - rayOrigin.y,
      lightPos.z - rayOrigin.z,
    );
    final tClosest =
        (toLight.x * direction.x +
                toLight.y * direction.y +
                toLight.z * direction.z)
            .clamp(0.0, rayLength);

    final closestPoint = Vec3(
      rayOrigin.x + direction.x * tClosest,
      rayOrigin.y + direction.y * tClosest,
      rayOrigin.z + direction.z * tClosest,
    );

    final dX = lightPos.x - closestPoint.x;
    final dY = lightPos.y - closestPoint.y;
    final dZ = lightPos.z - closestPoint.z;
    final distSq = dX * dX + dY * dY + dZ * dZ;
    final d = math.sqrt(math.max(1e-4, distSq));

    final theta0 = math.atan((-tClosest) / d);
    final theta1 = math.atan((rayLength - tClosest) / d);
    final deltaTheta = theta1 - theta0;

    final cosAngle =
        (toLight.x * direction.x +
            toLight.y * direction.y +
            toLight.z * direction.z) /
        math.max(
          1e-4,
          math.sqrt(
            toLight.x * toLight.x +
                toLight.y * toLight.y +
                toLight.z * toLight.z,
          ),
        );

    final g = anisotropy;
    final phase =
        (1.0 - g * g) /
        (4.0 * math.pi * math.pow(1.0 + g * g - 2.0 * g * cosAngle, 1.5));

    final inScattering =
        (lightIntensity * scatteringCoeff / (4.0 * math.pi * d)) *
        deltaTheta *
        phase;

    return math.max(0.0, inScattering);
  }

  /// Evaluates exponential height-decay fog transmittance.
  static double evaluateHeightFogTransmittance({
    required double startY,
    required double endY,
    required double distance,
    double baseDensity = 0.008,
    double heightFalloff = 1.5,
  }) {
    final opticalDepth = evaluateHeightFogOpticalDepth(
      startY: startY,
      endY: endY,
      distance: distance,
      baseDensity: baseDensity,
      heightFalloff: heightFalloff,
    );
    return math.exp(-opticalDepth).clamp(0.0, 1.0);
  }

  /// Integrates an exponential height-density medium along a finite segment.
  /// The density is `baseDensity * exp(-heightFalloff * y)` and the segment's
  /// height changes linearly from [startY] to [endY]. This is exact for the
  /// authored medium model, including a stable constant-height limit, rather
  /// than approximating the segment with one midpoint sample.
  static double evaluateHeightFogOpticalDepth({
    required double startY,
    required double endY,
    required double distance,
    double baseDensity = 0.008,
    double heightFalloff = 1.5,
  }) {
    for (final (name, value) in [
      ('startY', startY),
      ('endY', endY),
      ('distance', distance),
      ('baseDensity', baseDensity),
      ('heightFalloff', heightFalloff),
    ]) {
      _requireFiniteScalar(name, value);
    }
    if (distance < 0 || baseDensity < 0 || heightFalloff < 0) {
      throw ArgumentError(
        'distance, baseDensity, and heightFalloff must be >= 0',
      );
    }
    if (distance == 0 || baseDensity == 0) return 0;
    final delta = heightFalloff * (endY - startY);
    final averageDensityFactor = delta.abs() < _epsilon
        ? math.exp(-heightFalloff * startY)
        : math.exp(-heightFalloff * startY) * (_oneMinusExpNeg(delta) / delta);
    final opticalDepth = baseDensity * distance * averageDensityFactor;
    if (!opticalDepth.isFinite || opticalDepth < 0) {
      throw StateError(
        'height-fog optical depth was not finite: $opticalDepth',
      );
    }
    return opticalDepth;
  }

  static void _requireFinite(String name, Vec3 value) {
    if (!value.isFinite) throw ArgumentError('$name must be finite: $value');
  }

  static void _requireFiniteScalar(String name, double value) {
    if (!value.isFinite) throw ArgumentError('$name must be finite: $value');
  }

  static double _oneMinusExpNeg(double value) {
    if (value.abs() < 1e-4) {
      // 1 - exp(-x), evaluated without cancellation around a level medium.
      final x2 = value * value;
      return value - x2 * 0.5 + x2 * value / 6 - x2 * x2 / 24;
    }
    return 1 - math.exp(-value);
  }
}
