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
/// for a mantle point light per §7.1: v1 shadow rendering supports
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
