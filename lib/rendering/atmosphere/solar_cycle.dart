import 'dart:math' as math;

import '../api/lights.dart';
import '../math/vec.dart';
import 'sky_atmosphere.dart';

/// Solar phases derived from geometric elevation, not arbitrary clock bands.
/// Dawn phases are used before solar noon and dusk phases after it.
enum SolarPhase {
  polarNight,
  astronomicalDawn,
  nauticalDawn,
  civilDawn,
  sunrise,
  morning,
  solarNoon,
  afternoon,
  goldenHour,
  sunset,
  civilDusk,
  nauticalDusk,
  astronomicalDusk,
  night,
  polarDay,
}

/// Host-owned facts needed to resolve one continuous solar state. The
/// renderer does not own a calendar or location; it only evaluates the
/// supplied astronomical inputs and weather attenuation.
final class SolarCycleInput {
  final double timeHours;
  final double solarNoonHours;
  final double latitudeRadians;
  final double solarDeclinationRadians;
  final double cloudCover01;
  final double precipitation01;
  final double aerosolTurbidity;
  final double relativeHumidity01;
  final double solarIntensity;
  final double baseFogDensity;
  final double fogHeightFalloff;

  const SolarCycleInput({
    required this.timeHours,
    this.solarNoonHours = 12.0,
    required this.latitudeRadians,
    required this.solarDeclinationRadians,
    this.cloudCover01 = 0.0,
    this.precipitation01 = 0.0,
    this.aerosolTurbidity = 2.0,
    this.relativeHumidity01 = 0.7,
    this.solarIntensity = 1.0,
    this.baseFogDensity = 0.0015,
    this.fogHeightFalloff = 0.06,
  });

  void validate() {
    for (final (name, value) in [
      ('timeHours', timeHours),
      ('solarNoonHours', solarNoonHours),
      ('latitudeRadians', latitudeRadians),
      ('solarDeclinationRadians', solarDeclinationRadians),
      ('cloudCover01', cloudCover01),
      ('precipitation01', precipitation01),
      ('aerosolTurbidity', aerosolTurbidity),
      ('relativeHumidity01', relativeHumidity01),
      ('solarIntensity', solarIntensity),
      ('baseFogDensity', baseFogDensity),
      ('fogHeightFalloff', fogHeightFalloff),
    ]) {
      if (!value.isFinite) throw ArgumentError('$name must be finite');
    }
    if (solarNoonHours < 0 || solarNoonHours >= 24) {
      throw ArgumentError('solarNoonHours must be in [0, 24)');
    }
    if (latitudeRadians < -math.pi / 2 || latitudeRadians > math.pi / 2) {
      throw ArgumentError('latitudeRadians must be in [-pi/2, pi/2]');
    }
    if (solarDeclinationRadians < -math.pi / 2 ||
        solarDeclinationRadians > math.pi / 2) {
      throw ArgumentError(
        'solarDeclinationRadians must be in [-pi/2, pi/2]',
      );
    }
    for (final (name, value) in [
      ('cloudCover01', cloudCover01),
      ('precipitation01', precipitation01),
      ('relativeHumidity01', relativeHumidity01),
    ]) {
      if (value < 0 || value > 1) {
        throw ArgumentError('$name must be in [0, 1]');
      }
    }
    if (aerosolTurbidity < 1 ||
        solarIntensity < 0 ||
        baseFogDensity < 0 ||
        fogHeightFalloff < 0) {
      throw ArgumentError('solar attenuation inputs are out of bounds');
    }
  }
}

/// Continuous renderer-facing solar and atmospheric state for one frame.
final class SolarLightingState {
  final SolarPhase phase;
  final double timeHours;
  final double sunriseHours;
  final double sunsetHours;
  final bool hasRiseAndSet;
  final double sunElevationRadians;
  final double sunAzimuthRadians;
  final Vec3 sunDirection;
  final Vec3 solarTransmittance;
  final double cloudTransmittance;
  final LinearColor sunColor;
  final double directionalIntensity;
  final LinearColor ambientColor;
  final double ambientIntensity;
  final LinearColor fogColor;
  final double fogDensity;
  final double fogHeightFalloff;

  const SolarLightingState({
    required this.phase,
    required this.timeHours,
    required this.sunriseHours,
    required this.sunsetHours,
    required this.hasRiseAndSet,
    required this.sunElevationRadians,
    required this.sunAzimuthRadians,
    required this.sunDirection,
    required this.solarTransmittance,
    required this.cloudTransmittance,
    required this.sunColor,
    required this.directionalIntensity,
    required this.ambientColor,
    required this.ambientIntensity,
    required this.fogColor,
    required this.fogDensity,
    required this.fogHeightFalloff,
  });

  DirectionalLight get directionalLight => DirectionalLight(
    direction: sunDirection,
    color: sunColor,
    intensity: directionalIntensity,
  );

  void validate() {
    if (!timeHours.isFinite ||
        !sunriseHours.isFinite ||
        !sunsetHours.isFinite ||
        !sunElevationRadians.isFinite ||
        !sunAzimuthRadians.isFinite ||
        !directionalIntensity.isFinite ||
        !ambientIntensity.isFinite ||
        !fogDensity.isFinite ||
        !fogHeightFalloff.isFinite ||
        !sunDirection.isFinite ||
        !solarTransmittance.isFinite ||
        !sunColor.isFinite ||
        !ambientColor.isFinite ||
        !fogColor.isFinite) {
      throw StateError('solar lighting state is not finite');
    }
    if (sunDirection.lengthSquared < 0.999 ||
        sunDirection.lengthSquared > 1.001 ||
        directionalIntensity < 0 ||
        ambientIntensity < 0 ||
        fogDensity < 0 ||
        fogHeightFalloff < 0 ||
        cloudTransmittance < 0 ||
        cloudTransmittance > 1) {
      throw StateError('solar lighting state is out of bounds');
    }
    directionalLight.validate();
  }
}

/// Deterministic solar geometry and weather attenuation evaluator.
final class SolarCycleEngine {
  // Standard apparent sunrise/sunset elevation, including average refraction
  // and the solar disc radius. Hosts can still choose a different authored
  // horizon policy by supplying their own phase adapter.
  static const double _apparentHorizonRadians = -0.833 * math.pi / 180.0;

  static SolarLightingState evaluate(SolarCycleInput input) {
    input.validate();
    final hour = _normalizeHour(input.timeHours);
    final signedHour = _signedHourDelta(hour, input.solarNoonHours);
    final hourAngle = signedHour * math.pi / 12.0;
    final sinLatitude = math.sin(input.latitudeRadians);
    final cosLatitude = math.cos(input.latitudeRadians);
    final sinDeclination = math.sin(input.solarDeclinationRadians);
    final cosDeclination = math.cos(input.solarDeclinationRadians);
    final sinElevation =
        sinLatitude * sinDeclination +
        cosLatitude * cosDeclination * math.cos(hourAngle);
    final elevation = math.asin(sinElevation.clamp(-1.0, 1.0));
    final cosElevation = math.cos(elevation);
    final azimuth = math.atan2(
      math.sin(hourAngle),
      math.cos(hourAngle) * sinLatitude -
          math.tan(input.solarDeclinationRadians) * cosLatitude,
    );
    final sunDirection = Vec3(
      math.sin(azimuth) * cosElevation,
      math.sin(elevation),
      math.cos(azimuth) * cosElevation,
    ).normalized;

    final denominator = cosLatitude * cosDeclination;
    final cosHourAtRise = denominator.abs() < 1e-12
        ? (sinElevation > 0 ? -2.0 : 2.0)
        : (math.sin(_apparentHorizonRadians) -
                  sinLatitude * sinDeclination) /
              denominator;
    final hasRiseAndSet = cosHourAtRise > -1 && cosHourAtRise < 1;
    final halfDayHours = hasRiseAndSet
        ? math.acos(cosHourAtRise) * 12.0 / math.pi
        : 0.0;
    final sunrise = _normalizeHour(input.solarNoonHours - halfDayHours);
    final sunset = _normalizeHour(input.solarNoonHours + halfDayHours);
    final polarDay = !hasRiseAndSet && sinElevation > 0;
    final polarNight = !hasRiseAndSet && !polarDay;
    final phase = _phase(
      elevation: elevation,
      hour: hour,
      solarNoon: input.solarNoonHours,
      polarDay: polarDay,
      polarNight: polarNight,
    );

    final effectiveTurbidity =
        input.aerosolTurbidity + input.cloudCover01 * 3.5 +
        input.precipitation01 * 1.5;
    final transmittance = SkyAtmosphericScatteringEngine.evaluateSunTransmittance(
      sunElevationRadians: elevation,
      turbidity: effectiveTurbidity,
    );
    final cloudOpticalDepth =
        input.cloudCover01 * (2.2 + input.precipitation01 * 2.0);
    final cloudTransmittance = math.exp(-cloudOpticalDepth).clamp(0.0, 1.0);
    final solarHeight = math.max(0.0, math.sin(elevation));
    final transmissionLuminance =
        transmittance.x * 0.2126 +
        transmittance.y * 0.7152 +
        transmittance.z * 0.0722;
    final direct = input.solarIntensity *
        math.pow(solarHeight, 0.35).toDouble() *
        transmissionLuminance *
        cloudTransmittance;
    final skyFactor = (solarHeight * transmissionLuminance).clamp(0.0, 1.0);
    final ambient = 0.055 +
        0.42 * skyFactor * (0.55 + 0.45 * (1.0 - input.cloudCover01));
    final fogDensity = input.baseFogDensity *
        (1.0 + input.relativeHumidity01 * 1.6 + input.precipitation01 * 4.0 +
            input.cloudCover01 * 0.8);
    final fog = LinearColor(
      0.035 + transmittance.x * 0.18 + input.cloudCover01 * 0.10,
      0.045 + transmittance.y * 0.20 + input.cloudCover01 * 0.12,
      0.070 + transmittance.z * 0.24 + input.cloudCover01 * 0.16,
    );
    final state = SolarLightingState(
      phase: phase,
      timeHours: hour,
      sunriseHours: sunrise,
      sunsetHours: sunset,
      hasRiseAndSet: hasRiseAndSet,
      sunElevationRadians: elevation,
      sunAzimuthRadians: azimuth,
      sunDirection: sunDirection,
      solarTransmittance: transmittance,
      cloudTransmittance: cloudTransmittance,
      sunColor: LinearColor(
        transmittance.x,
        transmittance.y,
        transmittance.z,
      ),
      directionalIntensity: direct,
      ambientColor: LinearColor(
        0.14 + 0.38 * skyFactor,
        0.16 + 0.42 * skyFactor,
        0.22 + 0.52 * skyFactor,
      ),
      ambientIntensity: ambient,
      fogColor: fog,
      fogDensity: fogDensity,
      fogHeightFalloff: input.fogHeightFalloff,
    );
    state.validate();
    return state;
  }

  static SolarPhase _phase({
    required double elevation,
    required double hour,
    required double solarNoon,
    required bool polarDay,
    required bool polarNight,
  }) {
    if (polarDay) return SolarPhase.polarDay;
    if (polarNight) return SolarPhase.polarNight;
    final noonDelta = _signedHourDelta(hour, solarNoon);
    if (noonDelta.abs() < 0.5 && elevation >= 15 * math.pi / 180) {
      return SolarPhase.solarNoon;
    }
    final beforeNoon = noonDelta < 0;
    if (elevation >= 15 * math.pi / 180) {
      return beforeNoon ? SolarPhase.morning : SolarPhase.afternoon;
    }
    if (elevation >= 6 * math.pi / 180) {
      return beforeNoon ? SolarPhase.morning : SolarPhase.goldenHour;
    }
    if (elevation >= _apparentHorizonRadians) {
      return beforeNoon ? SolarPhase.sunrise : SolarPhase.sunset;
    }
    final degrees = elevation * 180 / math.pi;
    if (degrees >= -6) {
      return beforeNoon ? SolarPhase.civilDawn : SolarPhase.civilDusk;
    }
    if (degrees >= -12) {
      return beforeNoon ? SolarPhase.nauticalDawn : SolarPhase.nauticalDusk;
    }
    if (degrees >= -18) {
      return beforeNoon
          ? SolarPhase.astronomicalDawn
          : SolarPhase.astronomicalDusk;
    }
    return SolarPhase.night;
  }

  static double _normalizeHour(double hour) => ((hour % 24) + 24) % 24;

  static double _signedHourDelta(double hour, double reference) {
    var delta = hour - reference;
    while (delta > 12) {
      delta -= 24;
    }
    while (delta < -12) {
      delta += 24;
    }
    return delta;
  }
}
