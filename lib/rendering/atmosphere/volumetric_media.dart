import 'dart:math' as math;

import '../math/vec.dart';

/// Participating volumetric media, height fog, and in-scattering models in PixelDart.
final class VolumetricMediaEngine {
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
    final toLight = Vec3(
      lightPos.x - rayOrigin.x,
      lightPos.y - rayOrigin.y,
      lightPos.z - rayOrigin.z,
    );
    final tClosest = (toLight.x * rayDirection.x +
            toLight.y * rayDirection.y +
            toLight.z * rayDirection.z)
        .clamp(0.0, rayLength);

    final closestPoint = Vec3(
      rayOrigin.x + rayDirection.x * tClosest,
      rayOrigin.y + rayDirection.y * tClosest,
      rayOrigin.z + rayDirection.z * tClosest,
    );

    final dX = lightPos.x - closestPoint.x;
    final dY = lightPos.y - closestPoint.y;
    final dZ = lightPos.z - closestPoint.z;
    final distSq = dX * dX + dY * dY + dZ * dZ;
    final d = math.sqrt(math.max(1e-4, distSq));

    final theta0 = math.atan((-tClosest) / d);
    final theta1 = math.atan((rayLength - tClosest) / d);
    final deltaTheta = theta1 - theta0;

    final cosAngle = (toLight.x * rayDirection.x +
            toLight.y * rayDirection.y +
            toLight.z * rayDirection.z) /
        math.max(1e-4, math.sqrt(toLight.x * toLight.x + toLight.y * toLight.y + toLight.z * toLight.z));

    final g = anisotropy;
    final phase = (1.0 - g * g) /
        (4.0 * math.pi * math.pow(1.0 + g * g - 2.0 * g * cosAngle, 1.5));

    final inScattering = (lightIntensity * scatteringCoeff / (4.0 * math.pi * d)) *
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
    final avgY = (startY + endY) * 0.5;
    final density = baseDensity * math.exp(-heightFalloff * avgY);
    final opticalDepth = density * distance;
    return math.exp(-opticalDepth).clamp(0.0, 1.0);
  }
}
