import '../api/lights.dart';

final class EnvironmentResponse {
  const EnvironmentResponse._();

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
