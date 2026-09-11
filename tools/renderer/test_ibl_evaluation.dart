import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/optics/environment_response.dart';
import 'package:pixeldart/rendering/optics/spherical_harmonics.dart';

void main() {
  _testSphericalHarmonicsIrradiance();
  _testEnvironmentReflectionResponse();
  _testConductorFresnelResponse();
  print('IBL evaluation tests passed.');
}

void _testSphericalHarmonicsIrradiance() {
  final sh = SphericalHarmonicsL2.fromEnvironment(
    zenith: const LinearColor(0.2, 0.4, 0.8),
    horizon: const LinearColor(0.5, 0.5, 0.5),
    ground: const LinearColor(0.1, 0.1, 0.1),
  );

  // Normal pointing up should receive more zenith irradiance
  final up = sh.evaluate(const Vec3(0, 1, 0));
  // Normal pointing down should receive less irradiance
  final down = sh.evaluate(const Vec3(0, -1, 0));

  assert(up.y > down.y, 'Upward normal must receive higher irradiance than downward');
  assert(up.z > down.z);

  // Serialized uniforms must be 27 floats
  final floats = sh.toUniformArray();
  assert(floats.length == 27);
}

void _testEnvironmentReflectionResponse() {
  final reflection = EnvironmentResponse.resolve(
    skyColor: const LinearColor(0.3, 0.5, 0.7),
    keyLightColor: const LinearColor(1.0, 0.9, 0.7),
    keyLightIntensity: 2.0,
  );

  assert(reflection.r >= 0.0 && reflection.r <= 1.0);
  assert(reflection.g >= 0.0 && reflection.g <= 1.0);
  assert(reflection.b >= 0.0 && reflection.b <= 1.0);
  assert(reflection.r > 0.3, 'Key light should contribute warm tint');
}

void _testConductorFresnelResponse() {
  // Check Fresnel-Schlick behavior
  // For dielectrics F0 = 0.04; for gold conductor F0 = (1.0, 0.78, 0.34)
  final dielectricF0 = const Vec3(0.04, 0.04, 0.04);
  final goldF0 = const Vec3(1.0, 0.78, 0.34);

  // At grazing angles (cosTheta = 0), both approach 1.0
  const cosThetaGrazing = 0.0;
  final dielectricGrazing = _fresnelSchlick(dielectricF0, cosThetaGrazing);
  final goldGrazing = _fresnelSchlick(goldF0, cosThetaGrazing);

  assert((dielectricGrazing.x - 1.0).abs() < 1e-5);
  assert((goldGrazing.x - 1.0).abs() < 1e-5);

  // At normal incidence (cosTheta = 1), Fresnel equals F0
  const cosThetaNormal = 1.0;
  final dielectricNormal = _fresnelSchlick(dielectricF0, cosThetaNormal);
  final goldNormal = _fresnelSchlick(goldF0, cosThetaNormal);

  assert((dielectricNormal.x - 0.04).abs() < 1e-5);
  assert((goldNormal.x - 1.0).abs() < 1e-5);
  assert((goldNormal.y - 0.78).abs() < 1e-5);
}

Vec3 _fresnelSchlick(Vec3 f0, double cosTheta) {
  final factor = 1.0 - cosTheta;
  final p5 = factor * factor * factor * factor * factor;
  return f0 + (Vec3(1, 1, 1) - f0) * p5;
}
