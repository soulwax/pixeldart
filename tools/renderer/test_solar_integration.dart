import 'dart:math' as math;
import 'package:pixeldart/pixeldart.dart';

void main() {
  _testSolarCycleValidation();
  _testSolarNoonProperties();
  _testNightProperties();
  _testFullDayContinuity();
  print('Solar integration tests passed.');
}

void _testSolarCycleValidation() {
  final input = SolarCycleInput(
    timeHours: 14.5,
    latitudeRadians: 0.65,
    solarDeclinationRadians: 0.35,
    cloudCover01: 0.2,
    aerosolTurbidity: 2.5,
  );
  input.validate();

  final state = SolarCycleEngine.evaluate(input);
  state.validate();
  assert(state.timeHours == 14.5);
  assert(state.directionalLight.direction.isFinite);
  assert(state.directionalLight.intensity >= 0);
}

void _testSolarNoonProperties() {
  final noonInput = SolarCycleInput(
    timeHours: 12.0,
    solarNoonHours: 12.0,
    latitudeRadians: 0.5,
    solarDeclinationRadians: 0.3,
  );
  final noonState = SolarCycleEngine.evaluate(noonInput);
  noonState.validate();

  assert(noonState.phase == SolarPhase.solarNoon);
  assert(noonState.sunElevationRadians > 0, 'Sun should be well above horizon at noon');
  assert(noonState.sunDirection.y > 0, 'Sun direction points from above at noon');
  assert(noonState.directionalIntensity > 0.5, 'Strong directional light at noon');
  assert(noonState.twilightFactor01 == 1.0, 'Full daylight at noon');
  assert(noonState.ambientIntensity > 0.0);
}

void _testNightProperties() {
  final nightInput = SolarCycleInput(
    timeHours: 0.0,
    solarNoonHours: 12.0,
    latitudeRadians: 0.5,
    solarDeclinationRadians: 0.1,
  );
  final nightState = SolarCycleEngine.evaluate(nightInput);
  nightState.validate();

  assert(nightState.phase == SolarPhase.night || nightState.phase == SolarPhase.astronomicalDawn || nightState.phase == SolarPhase.astronomicalDusk);
  assert(nightState.sunElevationRadians < 0, 'Sun is below horizon at midnight');
  assert(nightState.directionalIntensity <= 0.05, 'Minimal or zero direct sunlight at night');
  assert(nightState.horizonVisibility01 == 0.0, 'No visible solar disc at midnight');
}

void _testFullDayContinuity() {
  // Sample every 30 minutes over 24 hours
  for (var m = 0; m < 48; m++) {
    final hour = m * 0.5;
    final input = SolarCycleInput(
      timeHours: hour,
      latitudeRadians: 0.7,
      solarDeclinationRadians: 0.2,
    );
    final state = SolarCycleEngine.evaluate(input);
    state.validate();

    assert(state.sunDirection.isFinite);
    assert((state.sunDirection.length - 1.0).abs() < 1e-3);
    assert(state.ambientIntensity >= 0);
    assert(state.directionalIntensity >= 0);
    assert(state.twilightFactor01 >= 0 && state.twilightFactor01 <= 1);
  }
}
