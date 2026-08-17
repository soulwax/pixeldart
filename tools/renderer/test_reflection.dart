import 'package:pixeldart/rendering/rendering.dart';

void main() {
  final wet = ReflectionResolver.evaluate(
    const ReflectionInput(
      surfaceNormal: Vec3(0, 1, 0),
      viewDirection: Vec3(0, 1, 0),
      roughness: 0.12,
      wetness: 1,
      mediumTransmittance: 0.8,
      environmentIntensity: 2,
      hasScreenSpaceHit: true,
      hitDistance: 1,
      maxRayDistance: 20,
    ),
  );
  _require(
    wet.direction.y > 0.99,
    'reflection direction follows the surface normal',
  );
  _require(wet.energy > 0, 'wet surface reflects environment energy');
  _require(!wet.usesProbeFallback, 'confident depth hit avoids probe fallback');
  _require(
    wet.roughnessLod < 1,
    'smooth surface selects a sharp reflection mip',
  );

  final rough = ReflectionResolver.evaluate(
    const ReflectionInput(
      surfaceNormal: Vec3(0, 1, 0),
      viewDirection: Vec3(0.3, 0.95, 0),
      roughness: 0.95,
      wetness: 0.1,
      mediumTransmittance: 1,
      environmentIntensity: 2,
      hasScreenSpaceHit: false,
      hitDistance: 0,
      maxRayDistance: 20,
    ),
  );
  _require(
    rough.usesProbeFallback,
    'missing depth history requires probe fallback',
  );
  _require(
    rough.energy < wet.energy,
    'rough surfaces reflect less coherent energy',
  );
  _require(
    rough.confidence01 == 0,
    'missing depth hit has zero SSR confidence',
  );

  _throws(
    () => ReflectionResolver.evaluate(
      const ReflectionInput(
        surfaceNormal: Vec3.zero,
        viewDirection: Vec3.unitY,
        roughness: 0.2,
        wetness: 0.5,
        mediumTransmittance: 1,
        environmentIntensity: 1,
        hasScreenSpaceHit: false,
        hitDistance: 0,
        maxRayDistance: 10,
      ),
    ),
    'zero surface normal must reject',
  );
  print('reflection resolver fixtures passed.');
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
