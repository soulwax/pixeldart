import 'package:pixeldart/rendering/rendering.dart';

void main() {
  const source = ThermalSource(
    id: 'radiator',
    position: Vec3.zero,
    radiusMeters: 2,
    dissolution01: 0.9,
  );
  final near = ThermalFieldEngine.dissolutionAt(
    position: const Vec3(0, 0, 0.25),
    sources: const [source],
    lingeringMemory01: 0.1,
  );
  final far = ThermalFieldEngine.dissolutionAt(
    position: const Vec3(0, 0, 8),
    sources: const [source],
    lingeringMemory01: 0.1,
  );
  _require(near > far && far > 0, 'thermal falloff must be smooth and linger');
  _throws(
    () => ThermalFieldEngine.dissolutionAt(
      position: Vec3.zero,
      sources: const [source, source],
    ),
    'duplicate thermal sources must be rejected',
  );
  print('Thermal field fixtures passed.');
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
