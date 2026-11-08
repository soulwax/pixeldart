import 'dart:math' as math;

import '../math/vec.dart';

/// Precomputed Rayleigh scattering coefficients for standard terrestrial atmosphere (m^-1).
/// Wavelengths: Red (680nm), Green (550nm), Blue (440nm).
final class PhysicalRayleighCoefficients {
  static const double r = 5.802e-6;
  static const double g = 13.558e-6;
  static const double b = 33.100e-6;
}

/// Physical Atmospheric Scattering Engine in PixelDart.
final class SkyAtmosphericScatteringEngine {
  /// Base Rayleigh molecular scale height (meters).
  static const double rayleighScaleHeight = 8000.0;

  /// Base Mie aerosol scale height (meters).
  static const double mieScaleHeight = 1200.0;

  /// Earth radius in meters used for Chapman spherical curvature.
  static const double earthRadius = 6360000.0;

  /// Atmosphere top altitude in meters.
  static const double atmosphereRadius = 6420000.0;

  /// Evaluates Rayleigh molecular phase function.
  static double rayleighPhase(double cosTheta) {
    return (3.0 / (16.0 * math.pi)) * (1.0 + cosTheta * cosTheta);
  }

  /// Evaluates Cornette-Shanks / Henyey-Greenstein Mie aerosol phase function.
  static double miePhase(double cosTheta, [double g = 0.76]) {
    final g2 = g * g;
    final denom = math.pow(1.0 + g2 - 2.0 * g * cosTheta, 1.5);
    if (denom <= 1e-7) return 0.0;
    return (3.0 / (8.0 * math.pi)) * ((1.0 - g2) * (1.0 + cosTheta * cosTheta) / ((2.0 + g2) * denom));
  }

  /// Calculates atmospheric optical airmass using Chapman spherical geometry.
  static double calculateAirmass(double zenithAngleRadians) {
    final cosZenith = math.cos(zenithAngleRadians);
    if (cosZenith >= 0.0) {
      // Rozenberg spherical approximation
      return 1.0 / (cosZenith + 0.025 * math.exp(-11.0 * cosZenith));
    } else {
      final zenithDeg = zenithAngleRadians * (180.0 / math.pi);
      final clampedDeg = zenithDeg.clamp(90.0, 105.0);
      final t = (clampedDeg - 90.0) / 15.0;
      return 38.0 + t * 62.0; // Dense grazing airmass at twilight
    }
  }

  /// Evaluates direct solar beam spectral transmittance and chromatic reddening.
  static Vec3 evaluateSunTransmittance({
    required double sunElevationRadians,
    double turbidity = 2.0,
  }) {
    final zenithAngle = math.max(0.0, (math.pi / 2.0) - sunElevationRadians);
    final airmass = calculateAirmass(zenithAngle);

    final opticalDepthR = (PhysicalRayleighCoefficients.r * rayleighScaleHeight * 0.1) * airmass * turbidity;
    final opticalDepthG = (PhysicalRayleighCoefficients.g * rayleighScaleHeight * 0.1) * airmass * turbidity;
    final opticalDepthB = (PhysicalRayleighCoefficients.b * rayleighScaleHeight * 0.1) * airmass * turbidity;

    return Vec3(
      math.exp(-opticalDepthR).clamp(0.0, 1.0),
      math.exp(-opticalDepthG).clamp(0.0, 1.0),
      math.exp(-opticalDepthB).clamp(0.0, 1.0),
    );
  }

  /// Evaluates in-scattered sky color for a given view direction and sun elevation.
  static Vec3 evaluateSkyRadiance({
    required Vec3 viewDirection,
    required Vec3 sunDirection,
    double turbidity = 2.0,
    double sunIntensity = 22.0,
  }) {
    final cosTheta = (viewDirection.x * sunDirection.x +
            viewDirection.y * sunDirection.y +
            viewDirection.z * sunDirection.z)
        .clamp(-1.0, 1.0);

    final sunElevation = math.asin(sunDirection.y.clamp(-1.0, 1.0));
    final sunTransmittance = evaluateSunTransmittance(
      sunElevationRadians: sunElevation,
      turbidity: turbidity,
    );

    final rPhase = rayleighPhase(cosTheta);
    final mPhase = miePhase(cosTheta, 0.76);

    final viewZenith = math.acos(viewDirection.y.clamp(-1.0, 1.0));
    final viewAirmass = calculateAirmass(viewZenith);

    final skyR = (PhysicalRayleighCoefficients.r * 1e5 * rPhase + 0.002 * mPhase) *
        sunTransmittance.x *
        viewAirmass *
        sunIntensity;
    final skyG = (PhysicalRayleighCoefficients.g * 1e5 * rPhase + 0.002 * mPhase) *
        sunTransmittance.y *
        viewAirmass *
        sunIntensity;
    final skyB = (PhysicalRayleighCoefficients.b * 1e5 * rPhase + 0.002 * mPhase) *
        sunTransmittance.z *
        viewAirmass *
        sunIntensity;

    return Vec3(
      skyR.clamp(0.0, 100.0),
      skyG.clamp(0.0, 100.0),
      skyB.clamp(0.0, 100.0),
    );
  }
}
