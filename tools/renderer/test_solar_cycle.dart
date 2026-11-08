import 'dart:math' as math;

import 'package:pixeldart/rendering/rendering.dart';

void main() {
  final clearAtNoon = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 12,
      latitudeRadians: 52 * math.pi / 180,
      solarDeclinationRadians: 0,
    ),
  );
  _require(
    (clearAtNoon.sunriseHours - 5.91).abs() < 0.02 &&
        (clearAtNoon.sunsetHours - 18.09).abs() < 0.02,
    'equinox sunrise and sunset must be geometrically symmetric',
  );
  _require(
    clearAtNoon.phase == SolarPhase.solarNoon &&
        clearAtNoon.sunElevationRadians > 0 &&
        clearAtNoon.directionalIntensity > 0 &&
        clearAtNoon.twilightFactor01 > 0 &&
        clearAtNoon.horizonVisibility01 > 0,
    'solar noon must produce an above-horizon direct source',
  );

  final dawn = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 5,
      latitudeRadians: 52 * math.pi / 180,
      solarDeclinationRadians: 0,
    ),
  );
  final dusk = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 19,
      latitudeRadians: 52 * math.pi / 180,
      solarDeclinationRadians: 0,
    ),
  );
  _require(
    dawn.phase == SolarPhase.nauticalDawn &&
        dusk.phase == SolarPhase.nauticalDusk,
    'pre-sunrise and post-sunset phases must remain distinct',
  );
  _require(
    dawn.sunDirection.y < 0 && dusk.sunDirection.y < 0,
    'twilight sun direction must retain its below-horizon elevation',
  );
  _require(
    dawn.twilightFactor01 > 0 &&
        dusk.twilightFactor01 > 0 &&
        dawn.horizonVisibility01 < 1 &&
        dusk.horizonVisibility01 < 1,
    'dawn and dusk must expose continuous twilight and horizon visibility',
  );

  final clear = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 12,
      latitudeRadians: 52 * math.pi / 180,
      solarDeclinationRadians: 0,
    ),
  );
  final storm = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 12,
      latitudeRadians: 52 * math.pi / 180,
      solarDeclinationRadians: 0,
      cloudCover01: 1,
      precipitation01: 1,
      relativeHumidity01: 1,
      aerosolTurbidity: 5,
    ),
  );
  _require(
    storm.directionalIntensity < clear.directionalIntensity &&
        storm.fogDensity > clear.fogDensity &&
        storm.cloudTransmittance < clear.cloudTransmittance,
    'cloud and precipitation attenuation must reduce direct light and raise fog',
  );

  final polarDay = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 12,
      latitudeRadians: 80 * math.pi / 180,
      solarDeclinationRadians: 23.4 * math.pi / 180,
    ),
  );
  final polarNight = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 12,
      latitudeRadians: 80 * math.pi / 180,
      solarDeclinationRadians: -23.4 * math.pi / 180,
    ),
  );
  _require(polarDay.phase == SolarPhase.polarDay, 'polar day must be explicit');
  _require(
    polarNight.phase == SolarPhase.polarNight,
    'polar night must be explicit',
  );

  var previous = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 5.5,
      latitudeRadians: 52 * math.pi / 180,
      solarDeclinationRadians: 0,
    ),
  );
  for (var i = 1; i <= 20; i++) {
    final next = SolarCycleEngine.evaluate(
      SolarCycleInput(
        timeHours: 5.5 + i * 0.05,
        latitudeRadians: 52 * math.pi / 180,
        solarDeclinationRadians: 0,
      ),
    );
    _require(
      (next.directionalIntensity - previous.directionalIntensity).abs() < 0.2,
      'sunrise intensity must change continuously between frames',
    );
    previous = next;
  }
  var previousTwilight = SolarCycleEngine.evaluate(
    const SolarCycleInput(
      timeHours: 4.5,
      latitudeRadians: 52 * math.pi / 180,
      solarDeclinationRadians: 0,
    ),
  );
  for (var i = 1; i <= 30; i++) {
    final next = SolarCycleEngine.evaluate(
      SolarCycleInput(
        timeHours: 4.5 + i * 0.05,
        latitudeRadians: 52 * math.pi / 180,
        solarDeclinationRadians: 0,
      ),
    );
    _require(
      (next.twilightFactor01 - previousTwilight.twilightFactor01).abs() < 0.08,
      'twilight factor must change continuously between frames',
    );
    previousTwilight = next;
  }
  print('Solar cycle fixtures passed.');
}

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}
