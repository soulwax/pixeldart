import 'dart:math' as math;

import '../math/vec.dart';

/// A host-resolved local source for volumetric media. This is deliberately
/// separate from renderer light handles so a host can submit practicals,
/// lightning, or emissive volumes without giving Pixeldart scene ownership.
final class VolumetricSource {
  final String id;
  final Vec3 position;
  final Vec3 color;
  final double luminousIntensity;
  final double referenceDistance;
  final double cutoffDistance;

  const VolumetricSource({
    required this.id,
    required this.position,
    required this.color,
    required this.luminousIntensity,
    this.referenceDistance = 1.0,
    this.cutoffDistance = 100.0,
  });

  void validate() {
    if (id.isEmpty ||
        !position.isFinite ||
        !color.isFinite ||
        !luminousIntensity.isFinite ||
        !referenceDistance.isFinite ||
        !cutoffDistance.isFinite ||
        luminousIntensity < 0 ||
        color.x < 0 ||
        color.y < 0 ||
        color.z < 0 ||
        referenceDistance <= 0 ||
        cutoffDistance <= 0) {
      throw ArgumentError('invalid volumetric source $id');
    }
  }
}

/// Selects the strongest bounded volumetric sources for a capability-limited
/// shader. Ranking is independent of submission order and ties use the
/// authored id, so lightning/practical transitions remain deterministic.
List<VolumetricSource> selectVolumetricSources({
  required Iterable<VolumetricSource> sources,
  required Vec3 referencePosition,
  int limit = 4,
}) {
  if (!referencePosition.isFinite || limit < 0) {
    throw ArgumentError('invalid volumetric source selection inputs');
  }
  final seenIds = <String>{};
  final ranked = <({VolumetricSource source, double influence})>[];
  for (final source in sources) {
    source.validate();
    if (!seenIds.add(source.id)) {
      throw ArgumentError('duplicate volumetric source id: ${source.id}');
    }
    final distance = (source.position - referencePosition).length;
    final cutoff = VolumetricMediaEngine.evaluateInverseSquareAttenuation(
      distance: distance,
      referenceDistance: source.referenceDistance,
      cutoffDistance: source.cutoffDistance,
    );
    final peakColor = math.max(
      source.color.x,
      math.max(source.color.y, source.color.z),
    );
    ranked.add((
      source: source,
      influence: source.luminousIntensity * peakColor * cutoff,
    ));
  }
  ranked.sort((a, b) {
    final byInfluence = b.influence.compareTo(a.influence);
    return byInfluence == 0
        ? a.source.id.compareTo(b.source.id)
        : byInfluence;
  });
  return [for (final entry in ranked.take(limit)) entry.source];
}

final class VolumetricSourceFieldSample {
  final Vec3 radiance;
  final Vec3 dominantDirection;
  final int contributingSourceCount;

  const VolumetricSourceFieldSample({
    required this.radiance,
    required this.dominantDirection,
    required this.contributingSourceCount,
  });

  double get luminance =>
      radiance.x * 0.2126 + radiance.y * 0.7152 + radiance.z * 0.0722;
}

/// Participating volumetric media, height fog, and in-scattering models in
/// Pixeldart. The host supplies bounded medium/source facts; this library
/// evaluates deterministic transport terms without owning weather state.
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

  /// Integrates the same exponential medium only inside a bounded world
  /// volume. The host supplies the volume bounds for steam, a cold room, or a
  /// shaft of dusty light; rays that miss the volume contribute no density.
  static double evaluateBoundedHeightFogOpticalDepth({
    required Vec3 rayOrigin,
    required Vec3 rayDirection,
    required double maxDistance,
    required Vec3 volumeMin,
    required Vec3 volumeMax,
    double baseDensity = 0.008,
    double heightFalloff = 1.5,
  }) {
    _requireFinite('rayOrigin', rayOrigin);
    _requireFinite('rayDirection', rayDirection);
    _requireFinite('volumeMin', volumeMin);
    _requireFinite('volumeMax', volumeMax);
    _requireFiniteScalar('maxDistance', maxDistance);
    if (rayDirection.lengthSquared < _epsilon) {
      throw ArgumentError('rayDirection must be nonzero');
    }
    if (maxDistance < 0 ||
        volumeMin.x > volumeMax.x ||
        volumeMin.y > volumeMax.y ||
        volumeMin.z > volumeMax.z) {
      throw ArgumentError('invalid bounded medium inputs');
    }
    if (maxDistance == 0) return 0;
    final direction = rayDirection.normalized;
    var enter = 0.0;
    var exit = maxDistance;
    for (final axis in [
      (rayOrigin.x, direction.x, volumeMin.x, volumeMax.x),
      (rayOrigin.y, direction.y, volumeMin.y, volumeMax.y),
      (rayOrigin.z, direction.z, volumeMin.z, volumeMax.z),
    ]) {
      final origin = axis.$1;
      final component = axis.$2;
      final min = axis.$3;
      final max = axis.$4;
      if (component.abs() < _epsilon) {
        if (origin < min || origin > max) return 0;
        continue;
      }
      var near = (min - origin) / component;
      var far = (max - origin) / component;
      if (near > far) {
        final swap = near;
        near = far;
        far = swap;
      }
      enter = math.max(enter, near);
      exit = math.min(exit, far);
      if (exit <= enter) return 0;
    }
    final start = rayOrigin + direction * enter;
    final end = rayOrigin + direction * exit;
    return evaluateHeightFogOpticalDepth(
      startY: start.y,
      endY: end.y,
      distance: exit - enter,
      baseDensity: baseDensity,
      heightFalloff: heightFalloff,
    );
  }

  /// Bounded inverse-square source attenuation for lightning and practicals.
  /// A finite cutoff prevents distant sources from consuming unbounded light
  /// while preserving the physically correct near-field falloff.
  static double evaluateInverseSquareAttenuation({
    required double distance,
    double referenceDistance = 1.0,
    double cutoffDistance = 100.0,
  }) {
    for (final (name, value) in [
      ('distance', distance),
      ('referenceDistance', referenceDistance),
      ('cutoffDistance', cutoffDistance),
    ]) {
      _requireFiniteScalar(name, value);
    }
    if (distance < 0 || referenceDistance <= 0 || cutoffDistance <= 0) {
      throw ArgumentError('invalid inverse-square attenuation inputs');
    }
    if (distance >= cutoffDistance) return 0;
    final inverseSquare =
        (referenceDistance * referenceDistance) /
        math.max(referenceDistance * referenceDistance, distance * distance);
    final cutoff = 1 - math.pow(distance / cutoffDistance, 4).toDouble();
    return (inverseSquare * cutoff).clamp(0.0, 1.0).toDouble();
  }

  /// Resolves source radiance after inverse-square falloff and medium loss.
  /// This is intentionally source-aware; it does not synthesize a global
  /// white flash when a host has no source position.
  static Vec3 evaluateTransientSourceRadiance({
    required Vec3 sourcePosition,
    required Vec3 samplePosition,
    required Vec3 sourceColor,
    required double luminousIntensity,
    double mediumTransmittance = 1.0,
    double referenceDistance = 1.0,
    double cutoffDistance = 100.0,
  }) {
    _requireFinite('sourcePosition', sourcePosition);
    _requireFinite('samplePosition', samplePosition);
    _requireFinite('sourceColor', sourceColor);
    _requireFiniteScalar('luminousIntensity', luminousIntensity);
    _requireFiniteScalar('mediumTransmittance', mediumTransmittance);
    if (luminousIntensity < 0 ||
        mediumTransmittance < 0 ||
        mediumTransmittance > 1) {
      throw ArgumentError('invalid transient source radiance inputs');
    }
    final offset = samplePosition - sourcePosition;
    final distance = offset.length;
    final factor =
        luminousIntensity *
        evaluateInverseSquareAttenuation(
          distance: distance,
          referenceDistance: referenceDistance,
          cutoffDistance: cutoffDistance,
        ) *
        mediumTransmittance;
    return sourceColor * factor;
  }

  /// Aggregates bounded in-scattering from resolved practical or transient
  /// sources along one camera ray. Sources past their cutoff contribute zero;
  /// empty input returns zero radiance and a zero direction rather than a
  /// fabricated white shaft.
  static VolumetricSourceFieldSample evaluateSourceField({
    required Vec3 rayOrigin,
    required Vec3 rayDirection,
    required double rayLength,
    required Iterable<VolumetricSource> sources,
    required double scatteringCoeff,
    double anisotropy = 0.70,
    double mediumTransmittance = 1.0,
  }) {
    _requireFinite('rayOrigin', rayOrigin);
    _requireFinite('rayDirection', rayDirection);
    _requireFiniteScalar('rayLength', rayLength);
    _requireFiniteScalar('scatteringCoeff', scatteringCoeff);
    _requireFiniteScalar('anisotropy', anisotropy);
    _requireFiniteScalar('mediumTransmittance', mediumTransmittance);
    if (rayDirection.lengthSquared < _epsilon ||
        rayLength < 0 ||
        scatteringCoeff < 0 ||
        mediumTransmittance < 0 ||
        mediumTransmittance > 1 ||
        anisotropy <= -0.999 ||
        anisotropy >= 0.999) {
      throw ArgumentError('invalid volumetric source-field inputs');
    }
    var radiance = Vec3.zero;
    var weightedDirection = Vec3.zero;
    var count = 0;
    for (final source in sources) {
      source.validate();
      final sourceDistance = (source.position - rayOrigin).length;
      final sourceCutoff = evaluateInverseSquareAttenuation(
        distance: sourceDistance,
        referenceDistance: source.referenceDistance,
        cutoffDistance: source.cutoffDistance,
      );
      if (sourceCutoff <= 0) continue;
      final scalar =
          evaluatePointInScattering(
            rayOrigin: rayOrigin,
            rayDirection: rayDirection,
            rayLength: rayLength,
            lightPos: source.position,
            lightIntensity: source.luminousIntensity,
            scatteringCoeff: scatteringCoeff,
            anisotropy: anisotropy,
          ) *
          mediumTransmittance *
          sourceCutoff;
      if (scalar <= 0) continue;
      final contribution = source.color * scalar;
      radiance += contribution;
      final offset = source.position - rayOrigin;
      final distance = math.max(_epsilon, offset.length);
      weightedDirection += offset * (scalar / distance);
      count++;
    }
    final direction = weightedDirection.lengthSquared < _epsilon
        ? Vec3.zero
        : weightedDirection.normalized;
    return VolumetricSourceFieldSample(
      radiance: radiance,
      dominantDirection: direction,
      contributingSourceCount: count,
    );
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
