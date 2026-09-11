import 'dart:math' as math;
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/optics/gerstner_waves.dart';

void main() {
  _testWaveComponentInitialization();
  _testOceanPresetDisplacement();
  _testSurfaceNormals();
  _testBuoyancyPhysics();
  print('Gerstner wave optics tests passed.');
}

void _testWaveComponentInitialization() {
  final comp = GerstnerWaveComponent(
    direction: const Vec2(3.0, 4.0),
    amplitude: 0.5,
    wavelength: 10.0,
    steepness: 0.4,
    speed: 2.0,
  );

  // Direction normalized
  assert((comp.direction.length - 1.0).abs() < 1e-5);
  assert((comp.dirX - 0.6).abs() < 1e-5);
  assert((comp.dirZ - 0.8).abs() < 1e-5);

  // Wavenumber 2*pi / 10
  assert((comp.wavenumber - (2.0 * math.pi / 10.0)).abs() < 1e-5);

  var threw = false;
  try {
    GerstnerWaveComponent(direction: const Vec2(1, 0), amplitude: -1, wavelength: 10);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'negative amplitude must throw');

  threw = false;
  try {
    GerstnerWaveComponent(direction: const Vec2(1, 0), amplitude: 1, wavelength: 0);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'zero wavelength must throw');
}

void _testOceanPresetDisplacement() {
  final ocean = GerstnerWaveEvaluator.ocean(baseHeight: 2.0);
  assert(ocean.waves.length == 4);

  final totalAmp = ocean.waves.fold(0.0, (sum, w) => sum + w.amplitude);

  for (var x = -20.0; x <= 20.0; x += 5.0) {
    for (var z = -20.0; z <= 20.0; z += 5.0) {
      final disp = ocean.sampleDisplacement(x, z, 1.25);
      assert(disp.x.isFinite && disp.y.isFinite && disp.z.isFinite);

      final pos = ocean.samplePosition(x, z, 1.25);
      assert((pos.y - 2.0).abs() <= totalAmp + 1e-4);

      final h = ocean.sampleHeight(x, z, 1.25);
      assert((h - 2.0).abs() <= totalAmp + 1e-4);
      assert((pos.y - h).abs() < 1e-4);
    }
  }
}

void _testSurfaceNormals() {
  final ocean = GerstnerWaveEvaluator.ocean();

  for (var t = 0.0; t < 5.0; t += 1.0) {
    for (var x = -10.0; x <= 10.0; x += 5.0) {
      for (var z = -10.0; z <= 10.0; z += 5.0) {
        final n = ocean.sampleNormal(x, z, t);
        assert((n.length - 1.0).abs() < 1e-4, 'normal must be normalized');
        assert(n.y > 0.1, 'normal must point predominantly upward');
      }
    }
  }
}

void _testBuoyancyPhysics() {
  final ocean = GerstnerWaveEvaluator.ocean(baseHeight: 0.0);
  const time = 0.5;
  final surfH = ocean.sampleHeight(0, 0, time);

  // Object high above water
  final above = ocean.sampleBuoyancy(
    bodyPosition: Vec3(0, surfH + 5.0, 0),
    submergedDepth: 1.0,
    time: time,
  );
  assert(!above.isSubmerged);
  assert(above.submersion == 0.0);
  assert(above.force.length == 0.0);

  // Object submerged halfway
  final halfSub = ocean.sampleBuoyancy(
    bodyPosition: Vec3(0, surfH - 0.5, 0),
    submergedDepth: 1.0,
    mass: 10.0,
    time: time,
  );
  assert(halfSub.isSubmerged);
  assert((halfSub.submersion - 0.5).abs() < 1e-4);
  assert(halfSub.force.y > 0.0);

  // Object deeply submerged
  final deepSub = ocean.sampleBuoyancy(
    bodyPosition: Vec3(0, surfH - 1.0, 0),
    submergedDepth: 1.0,
    mass: 10.0,
    time: time,
  );
  assert(deepSub.isSubmerged);
  assert(deepSub.force.y > halfSub.force.y, 'deeper body should experience greater buoyant force');
}
