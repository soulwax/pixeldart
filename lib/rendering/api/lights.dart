import 'dart:math' as math;
import 'dart:typed_data';

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

  /// Tier-derived light budget replacing fixed legacy constants (`[S3-0]`).
  static TierLightBudget forMaxVisibleLights(
    int maxVisibleLights, {
    int shadowCascades = 4,
    int maxShadowedPunctual = 8,
  }) => TierLightBudget(
    maxVisiblePunctualLights: maxVisibleLights,
    directionalCascades: shadowCascades,
    maxShadowedPunctualLights: maxShadowedPunctual,
  );
}

/// Tier-derived light & shadow capacity budget (`[S3-0]`).
final class TierLightBudget {
  final int maxVisiblePunctualLights;
  final int directionalCascades;
  final int maxShadowedPunctualLights;

  const TierLightBudget({
    required this.maxVisiblePunctualLights,
    required this.directionalCascades,
    required this.maxShadowedPunctualLights,
  });
}

/// std140 GPU directional light struct (48 bytes = 12 floats, `[S3-0]`):
/// - vec4 `direction_intensity` (xyz = dir, w = intensity)
/// - vec4 `color_shadowIndex` (rgb = linear color, w = cascade base index or -1)
/// - vec4 `shadowParams` (x = bias, y = normalBias, z = strength, w = cascadeCount)
abstract final class GpuDirectionalLightLayout {
  static const int floatCount = 12;
  static const int byteStride = floatCount * 4;

  static Float32List pack(
    DirectionalLight light, {
    int shadowCascadeBase = -1,
    double bias = 0.0005,
    double normalBias = 0.02,
    double shadowStrength = 1.0,
    int cascadeCount = 0,
  }) {
    final dir = light.direction.normalized;
    return Float32List.fromList([
      dir.x,
      dir.y,
      dir.z,
      light.intensity,
      light.color.r,
      light.color.g,
      light.color.b,
      shadowCascadeBase.toDouble(),
      bias,
      normalBias,
      shadowStrength,
      cascadeCount.toDouble(),
    ]);
  }
}

/// std140 GPU punctual light struct (64 bytes = 16 floats, `[S3-0]`):
/// - vec4 `position_range` (xyz = world pos, w = range/radius)
/// - vec4 `color_intensity` (rgb = linear color, w = intensity)
/// - vec4 `direction_type` (xyz = spot dir, w = 0.0 point | 1.0 spot)
/// - vec4 `cone_shadow` (x = cosInner, y = cosOuter, z = shadowAtlasIndex, w = flags)
abstract final class GpuPunctualLightLayout {
  static const int floatCount = 16;
  static const int byteStride = floatCount * 4;

  static void writePoint(
    Float32List dst,
    int lightIndex,
    PointLight light, {
    int shadowAtlasIndex = -1,
  }) {
    final o = lightIndex * floatCount;
    dst[o + 0] = light.position.x;
    dst[o + 1] = light.position.y;
    dst[o + 2] = light.position.z;
    dst[o + 3] = light.radius;
    dst[o + 4] = light.color.r;
    dst[o + 5] = light.color.g;
    dst[o + 6] = light.color.b;
    dst[o + 7] = light.intensity;
    dst[o + 8] = 0.0;
    dst[o + 9] = -1.0;
    dst[o + 10] = 0.0;
    dst[o + 11] = 0.0; // point
    dst[o + 12] = 1.0;
    dst[o + 13] = -1.0;
    dst[o + 14] = shadowAtlasIndex.toDouble();
    dst[o + 15] = light.castsShadow ? 1.0 : 0.0;
  }

  static void writeSpot(
    Float32List dst,
    int lightIndex,
    SpotLight light, {
    int shadowAtlasIndex = -1,
  }) {
    final o = lightIndex * floatCount;
    final dir = light.direction.normalized;
    dst[o + 0] = light.position.x;
    dst[o + 1] = light.position.y;
    dst[o + 2] = light.position.z;
    dst[o + 3] = light.range;
    dst[o + 4] = light.color.r;
    dst[o + 5] = light.color.g;
    dst[o + 6] = light.color.b;
    dst[o + 7] = light.intensity;
    dst[o + 8] = dir.x;
    dst[o + 9] = dir.y;
    dst[o + 10] = dir.z;
    dst[o + 11] = 1.0; // spot
    dst[o + 12] = math.cos(light.innerConeRadians);
    dst[o + 13] = math.cos(light.outerConeRadians);
    dst[o + 14] = shadowAtlasIndex.toDouble();
    dst[o + 15] = light.castsShadow ? 1.0 : 0.0;
  }
}
