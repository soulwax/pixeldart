import 'dart:math' as math;

import '../math/vec.dart';

final class LinearColor {
  final double r, g, b;
  const LinearColor(this.r, this.g, this.b);

  static const LinearColor black = LinearColor(0, 0, 0);
  static const LinearColor white = LinearColor(1, 1, 1);

  bool get isFinite => r.isFinite && g.isFinite && b.isFinite;

  @override
  bool operator ==(Object other) =>
      other is LinearColor && r == other.r && g == other.g && b == other.b;

  @override
  int get hashCode => Object.hash(r, g, b);

  @override
  String toString() => 'LinearColor($r, $g, $b)';
}

final class DirectionalLight {
  final Vec3 direction;
  final LinearColor color;
  final double intensity;

  const DirectionalLight({
    required this.direction,
    required this.color,
    this.intensity = 1,
  });

  void validate() {
    if (!direction.isFinite || direction.lengthSquared < 1e-12) {
      throw ArgumentError(
        'DirectionalLight.direction must be finite and nonzero: $direction',
      );
    }
    if (!intensity.isFinite || intensity < 0) {
      throw ArgumentError(
        'DirectionalLight.intensity must be >= 0: $intensity',
      );
    }
  }
}

final class PointLight {
  final int id;
  final Vec3 position;
  final LinearColor color;
  final double intensity;
  final double radius;
  final bool castsShadow;

  const PointLight({
    required this.id,
    required this.position,
    required this.color,
    this.intensity = 1,
    this.radius = 1,
    this.castsShadow = false,
  });

  void validate() {
    if (!position.isFinite) {
      throw ArgumentError('PointLight.position must be finite: $position');
    }
    if (!intensity.isFinite || intensity < 0) {
      throw ArgumentError('PointLight.intensity must be >= 0: $intensity');
    }
    if (!radius.isFinite || radius <= 0) {
      throw ArgumentError('PointLight.radius must be > 0: $radius');
    }
  }
}

final class SpotLight {
  final int id;
  final Vec3 position;
  final Vec3 direction;
  final LinearColor color;
  final double intensity;
  final double range;
  final double innerConeRadians;
  final double outerConeRadians;
  final bool castsShadow;

  const SpotLight({
    required this.id,
    required this.position,
    required this.direction,
    required this.color,
    this.intensity = 1,
    this.range = 1,
    this.innerConeRadians = 0.3,
    this.outerConeRadians = 0.5,
    this.castsShadow = false,
  });

  void validate() {
    if (!position.isFinite) {
      throw ArgumentError('SpotLight.position must be finite: $position');
    }
    if (!direction.isFinite || direction.lengthSquared < 1e-12) {
      throw ArgumentError(
        'SpotLight.direction must be finite and nonzero: $direction',
      );
    }
    if (outerConeRadians <= innerConeRadians) {
      throw ArgumentError(
        'SpotLight.outerConeRadians must exceed innerConeRadians',
      );
    }
  }
}

List<SpotLight> selectSpotLights({
  required Iterable<SpotLight> lights,
  required Vec3 referencePosition,
  SpotLight? shadowCaster,
  int limit = 3,
}) {
  if (limit < 0) {
    throw ArgumentError.value(limit, 'limit', 'must be >= 0');
  }
  final ranked = <({SpotLight light, double influence})>[];
  for (final light in lights) {
    if (light.id == shadowCaster?.id) continue;
    final distanceSquared = (light.position - referencePosition).lengthSquared;
    final chroma = math.max(
      light.color.r,
      math.max(light.color.g, light.color.b),
    );
    final influence =
        light.intensity *
        light.range *
        light.range *
        math.max(chroma, 1e-6) /
        (1 + distanceSquared);
    ranked.add((light: light, influence: influence));
  }
  ranked.sort((a, b) {
    final byInfluence = b.influence.compareTo(a.influence);
    return byInfluence == 0 ? a.light.id.compareTo(b.light.id) : byInfluence;
  });
  return [for (final entry in ranked.take(limit)) entry.light];
}

List<PointLight> selectPointLights({
  required Iterable<PointLight> lights,
  required Vec3 referencePosition,
  int limit = RuntimeLightBudget.pointLights,
}) {
  if (limit < 0) {
    throw ArgumentError.value(limit, 'limit', 'must be >= 0');
  }
  final all = lights.toList(growable: false);
  if (all.length <= limit) return all;
  final ranked = <({PointLight light, double influence})>[];
  for (final light in all) {
    final distanceSquared = (light.position - referencePosition).lengthSquared;
    final chroma = math.max(light.color.r, math.max(light.color.g, light.color.b));
    final influence =
        light.intensity * light.radius * light.radius * math.max(chroma, 1e-6) / (1 + distanceSquared);
    ranked.add((light: light, influence: influence));
  }
  ranked.sort((a, b) {
    final byInfluence = b.influence.compareTo(a.influence);
    return byInfluence == 0 ? a.light.id.compareTo(b.light.id) : byInfluence;
  });
  return [for (final entry in ranked.take(limit)) entry.light];
}

abstract final class RuntimeLightBudget {
  static const int directionalLights = 1;

  static const int pointLights = 4;

  static const int unshadowedSpotLights = 3;

  static const int shadowedSpotLights = 1;

  static const int dynamicLights =
      pointLights + unshadowedSpotLights + shadowedSpotLights;

  static const int shadowMaps = shadowedSpotLights;
}
