import 'package:pixeldart/rendering/rendering.dart';

void main() {
  final dawn = EnvironmentResponse.resolve(
    skyColor: const LinearColor(0.2, 0.3, 0.5),
    keyLightColor: const LinearColor(1.0, 0.4, 0.1),
    keyLightIntensity: 0.8,
  );
  _require(dawn.r > dawn.b * 0.35, 'key light tint reaches the fallback');
  _require(dawn.isFinite, 'resolved environment colour is finite');

  final source = EnvironmentResponse.resolve(
    skyColor: const LinearColor(0.2, 0.3, 0.5),
    keyLightColor: LinearColor.white,
    keyLightIntensity: 0,
    sourceRadiance: const LinearColor(9, 4, 2),
  );
  _require(
    source.r == 0.38,
    'located source radiance uses bounded contribution',
  );
  _require(source.g == 0.38, 'located source radiance remains channel-local');
  _require(
    source.b == 0.54,
    'sky colour remains present beside source radiance',
  );

  final bright = EnvironmentResponse.resolve(
    skyColor: const LinearColor(1, 1, 1),
    keyLightColor: const LinearColor(4, 3, 2),
    keyLightIntensity: 20,
    sourceRadiance: const LinearColor(100, 100, 100),
  );
  _require(
    bright.r <= 1 && bright.g <= 1 && bright.b <= 1,
    'fallback channels stay bounded for bright sources',
  );

  _throws(
    () => EnvironmentResponse.resolve(
      skyColor: const LinearColor(0, 0, 0),
      keyLightColor: LinearColor.white,
      keyLightIntensity: 1,
      sourceRadiance: const LinearColor(-1, 0, 0),
    ),
    'negative source radiance must reject',
  );
  print('environment response fixtures passed.');
}

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void _throws(void Function() action, String message) {
  try {
    action();
  } catch (_) {
    return;
  }
  throw StateError(message);
}
