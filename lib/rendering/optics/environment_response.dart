import '../api/lights.dart';

/// Resolves a bounded environment colour for glossy and wet surfaces.
///
/// Hosts own the sky, directional source, and any located in-scattering
/// radiance. Pixeldart only combines those already-resolved facts into a
/// display-safe fallback; it does not allocate probes or claim a screen-space
/// hit. The same sky/source facts can therefore drive fog, shafts, and surface
/// response without duplicating weather or time-of-day policy in the renderer.
final class EnvironmentResponse {
  const EnvironmentResponse._();

  /// Blends sky radiance with a bounded key-light tint and a small contribution
  /// from located medium radiance. Values are clamped to [0, 1] because this
  /// colour is an environment fallback, not an HDR probe payload.
  static LinearColor resolve({
    required LinearColor skyColor,
    required LinearColor keyLightColor,
    required double keyLightIntensity,
    LinearColor sourceRadiance = LinearColor.black,
  }) {
    _validateColor('skyColor', skyColor);
    _validateColor('keyLightColor', keyLightColor);
    _validateColor('sourceRadiance', sourceRadiance);
    if (!keyLightIntensity.isFinite || keyLightIntensity < 0) {
      throw ArgumentError('keyLightIntensity must be finite and >= 0');
    }
    if (sourceRadiance.r < 0 || sourceRadiance.g < 0 || sourceRadiance.b < 0) {
      throw ArgumentError('sourceRadiance channels must be >= 0');
    }

    // Keep direct-source colour present at dawn/dusk without allowing a
    // lightning pulse or a bright practical to turn the fallback into an HDR
    // replacement for a real probe.
    final keyWeight = (keyLightIntensity * 0.12).clamp(0.0, 0.35).toDouble();
    final sourceWeight = 0.02;
    return LinearColor(
      _channel(
        skyColor.r * (1.0 - keyWeight) +
            keyLightColor.r * keyWeight +
            sourceRadiance.r * sourceWeight,
      ),
      _channel(
        skyColor.g * (1.0 - keyWeight) +
            keyLightColor.g * keyWeight +
            sourceRadiance.g * sourceWeight,
      ),
      _channel(
        skyColor.b * (1.0 - keyWeight) +
            keyLightColor.b * keyWeight +
            sourceRadiance.b * sourceWeight,
      ),
    );
  }

  static void _validateColor(String name, LinearColor color) {
    if (!color.isFinite) throw ArgumentError('$name must be finite');
  }

  static double _channel(double value) => value.clamp(0.0, 1.0).toDouble();
}
