import 'dart:math' as math;

import '../math/vec.dart';

/// Inputs for one physically bounded reflection decision.
final class ReflectionInput {
  final Vec3 surfaceNormal;
  final Vec3 viewDirection;
  final double roughness;
  final double wetness;
  final double mediumTransmittance;
  final double environmentIntensity;
  final bool hasScreenSpaceHit;
  final double hitDistance;
  final double maxRayDistance;

  const ReflectionInput({
    required this.surfaceNormal,
    required this.viewDirection,
    required this.roughness,
    required this.wetness,
    required this.mediumTransmittance,
    required this.environmentIntensity,
    required this.hasScreenSpaceHit,
    required this.hitDistance,
    required this.maxRayDistance,
  });

  void validate() {
    if (!surfaceNormal.isFinite || surfaceNormal.lengthSquared < 1e-12) {
      throw ArgumentError('surfaceNormal must be finite and nonzero');
    }
    if (!viewDirection.isFinite || viewDirection.lengthSquared < 1e-12) {
      throw ArgumentError('viewDirection must be finite and nonzero');
    }
    for (final (name, value) in [
      ('roughness', roughness),
      ('wetness', wetness),
      ('mediumTransmittance', mediumTransmittance),
      ('environmentIntensity', environmentIntensity),
      ('hitDistance', hitDistance),
      ('maxRayDistance', maxRayDistance),
    ]) {
      if (!value.isFinite) throw ArgumentError('$name must be finite');
    }
    if (roughness < 0 || roughness > 1 || wetness < 0 || wetness > 1) {
      throw ArgumentError('roughness and wetness must be in [0, 1]');
    }
    if (mediumTransmittance < 0 ||
        mediumTransmittance > 1 ||
        environmentIntensity < 0 ||
        hitDistance < 0 ||
        maxRayDistance <= 0) {
      throw ArgumentError('reflection scalar is out of bounds');
    }
    if (hitDistance > maxRayDistance) {
      throw ArgumentError('hitDistance must be <= maxRayDistance');
    }
  }
}

/// A reflection result that distinguishes a real screen-space hit from a
/// probe fallback. No hit is invented when depth history did not provide one.
final class ReflectionResult {
  final Vec3 direction;
  final double fresnel01;
  final double energy;
  final double confidence01;
  final double roughnessLod;
  final bool usesProbeFallback;

  const ReflectionResult({
    required this.direction,
    required this.fresnel01,
    required this.energy,
    required this.confidence01,
    required this.roughnessLod,
    required this.usesProbeFallback,
  });

  Map<String, dynamic> toJson() => {
    'direction': [direction.x, direction.y, direction.z],
    'fresnel01': fresnel01,
    'energy': energy,
    'confidence01': confidence01,
    'roughnessLod': roughnessLod,
    'usesProbeFallback': usesProbeFallback,
  };
}

/// Deterministic reflection weighting for glossy or wet surfaces.
///
/// The resolver reports how much screen-space history can be trusted and when
/// a host should blend to a probe/environment fallback. It does not invent a
/// hit, allocate a probe, or own scene capture policy.
final class ReflectionResolver {
  static ReflectionResult evaluate(ReflectionInput input) {
    input.validate();
    final normal = input.surfaceNormal.normalized;
    final view = input.viewDirection.normalized;
    final ndotv = normal.dot(view).clamp(0.0, 1.0).toDouble();
    final direction = normal * (2.0 * ndotv) - view;
    final f0 = (0.04 + input.wetness * 0.02).clamp(0.0, 1.0).toDouble();
    final fresnel = f0 + (1.0 - f0) * math.pow(1.0 - ndotv, 5).toDouble();
    final roughnessWeight = math.pow(1.0 - input.roughness, 2).toDouble();
    final surfaceWeight = 0.15 + input.wetness * 0.85;
    final energy =
        input.environmentIntensity *
        fresnel *
        roughnessWeight *
        surfaceWeight *
        input.mediumTransmittance;
    final hitConfidence = input.hasScreenSpaceHit
        ? (1.0 - input.hitDistance / input.maxRayDistance).clamp(0.0, 1.0)
        : 0.0;
    final confidence = (hitConfidence * (1.0 - input.roughness)).clamp(
      0.0,
      1.0,
    );
    return ReflectionResult(
      direction: direction.normalized,
      fresnel01: fresnel,
      energy: math.max(0.0, energy),
      confidence01: confidence,
      roughnessLod: input.roughness * input.roughness * 8.0,
      usesProbeFallback: confidence < 0.5 || !input.hasScreenSpaceHit,
    );
  }
}
