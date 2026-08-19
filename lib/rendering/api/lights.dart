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

/// Generic point light. Stable [id] lets the renderer select a
/// capability-bounded per-draw subset by influence with a deterministic
/// tie-breaker (§7.1) rather than depending on submission order.
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

/// Generic spot light. Also used as the sole shadow-casting approximation
/// for a bounded point light per §7.1: v1 shadow rendering supports
/// directional/spot projections only, never an unimplemented cube shadow.
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

/// Returns the capability-bounded direct practical lights for one frame.
///
/// Selection is independent of submission order: lights are ranked by a
/// camera-relative influence estimate and ties resolve by stable authored ID.
/// A selected shadow caster is excluded because the shadowed world already
/// evaluates its direct contribution through the shadow map.
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

/// The light and shadow budget the shipping pipeline actually honours.
///
/// These are not aspirational limits. Each is a direct count of what
/// `shaders/rendering/world/shadowed_world.frag` declares and what
/// `passes/pipeline_resource_layout.dart` allocates. Hosts should size their
/// own light tables and quality profiles against these constants rather than
/// against numbers chosen independently — the mismatch between an advertised
/// budget and this one is what RENDERER plan packet R-A5 existed to close.
///
/// When a packet widens the runtime (R-B2 replaces the single shadow map with
/// an atlas), change the constant here in the same commit as the runtime, and
/// every host that reads it follows.
abstract final class RuntimeLightBudget {
  /// Directional lights (sun/moon). Contributes N·L and a specular lobe.
  static const int directionalLights = 1;

  /// Point lights: `uPointPosition0..3` in the shadowed world shader.
  static const int pointLights = 4;

  /// Unshadowed spot lights: `uDirectSpot*0..2`, ranked by [selectSpotLights].
  static const int unshadowedSpotLights = 3;

  /// Shadowed spot lights: `spotLights.first` only.
  static const int shadowedSpotLights = 1;

  /// Non-directional lights the world shader can evaluate in one pass.
  static const int dynamicLights =
      pointLights + unshadowedSpotLights + shadowedSpotLights;

  /// Shadow maps in the whole pipeline. There is exactly one `shadowMap`
  /// resource; the directional light does not cast at all.
  static const int shadowMaps = shadowedSpotLights;
}
