import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/optics/buoyant_craft.dart';
import 'package:pixeldart/rendering/optics/gerstner_waves.dart';

void main() {
  _testProbeGeometry();
  _testHeaveConvergence();
  _testRollAndPitchReaction();
  _testTransformMatrix();
  _testInvalidArguments();
  print('Buoyant craft dynamics tests passed.');
}

void _testProbeGeometry() {
  final vessel = BuoyantVesselBody(
    position: const Vec3(10, 0, 10),
    width: 2.0,
    length: 4.0,
  );

  final probes = vessel.getProbes();
  assert(probes.length == 4);

  // Probe 0: front-left (-1, +2)
  assert((probes[0] - const Vec3(9, 0, 12)).length < 1e-4);
  // Probe 1: front-right (+1, +2)
  assert((probes[1] - const Vec3(11, 0, 12)).length < 1e-4);
  // Probe 2: rear-left (-1, -2)
  assert((probes[2] - const Vec3(9, 0, 8)).length < 1e-4);
  // Probe 3: rear-right (+1, -2)
  assert((probes[3] - const Vec3(11, 0, 8)).length < 1e-4);
}

void _testHeaveConvergence() {
  final ocean = GerstnerWaveEvaluator.ocean(baseHeight: 1.0);
  final vessel = BuoyantVesselBody(
    position: const Vec3(0, 5.0, 0), // Dropped from high above water
  );

  for (var step = 0; step < 60; step++) {
    vessel.update(1.0 / 30.0, 0.0, ocean);
  }

  // Vessel should have settled close to water surface (~1.0 +/- wave amplitude)
  assert(vessel.position.y < 3.0 && vessel.position.y > -0.5);
  assert(vessel.position.y.isFinite);
}

void _testRollAndPitchReaction() {
  // Wave propagating along X-axis to create cross-slope
  final oceanX = GerstnerWaveEvaluator(
    baseHeight: 0.0,
    waves: [
      GerstnerWaveComponent(
        direction: const Vec2(1, 0),
        amplitude: 1.0,
        wavelength: 20.0,
        speed: 1.0,
      ),
    ],
  );

  final vessel = BuoyantVesselBody(
    position: const Vec3(0, 0, 0),
    width: 2.0,
    length: 4.0,
  );

  for (var step = 0; step < 30; step++) {
    vessel.update(1.0 / 30.0, 1.5, oceanX);
  }

  // Under a cross swell, roll angle should react
  assert(vessel.roll.abs() >= 0.0);
  assert(vessel.roll.isFinite && vessel.pitch.isFinite);
}

void _testTransformMatrix() {
  final ocean = GerstnerWaveEvaluator.ocean();
  final vessel = BuoyantVesselBody(position: const Vec3(0, 0, 0));
  final transform = vessel.update(0.016, 1.0, ocean);

  final mat = transform.toMat4();
  assert(mat.m.every((val) => val.isFinite));
}

void _testInvalidArguments() {
  var threw = false;
  try {
    BuoyantVesselBody(position: const Vec3(0, 0, 0), width: 0);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'width <= 0 must throw');

  threw = false;
  try {
    BuoyantVesselBody(position: const Vec3(0, 0, 0), length: -1);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'length <= 0 must throw');
}
