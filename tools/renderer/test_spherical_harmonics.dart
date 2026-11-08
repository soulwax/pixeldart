import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/optics/spherical_harmonics.dart';

void main() {
  _testSphericalHarmonicsEvaluation();
  _testUniformArraySerialization();
  print('Spherical harmonics tests passed.');
}

void _testSphericalHarmonicsEvaluation() {
  const zenith = LinearColor(0.2, 0.4, 0.9); // sky blue
  const horizon = LinearColor(0.7, 0.6, 0.5); // warm horizon
  const ground = LinearColor(0.1, 0.08, 0.05); // dark ground

  final sh = SphericalHarmonicsL2.fromEnvironment(
    zenith: zenith,
    horizon: horizon,
    ground: ground,
  );

  final upIrr = sh.evaluate(const Vec3(0, 1, 0));
  final downIrr = sh.evaluate(const Vec3(0, -1, 0));
  final sideIrr = sh.evaluate(const Vec3(1, 0, 0));

  // Upward normal should receive stronger blue irradiance than downward normal
  assert(upIrr.z > downIrr.z, 'upward normal receives more sky blue light');
  assert(upIrr.y > downIrr.y, 'upward normal receives more light than ground');

  // Horizon normal should receive warm horizon light
  assert(sideIrr.x > downIrr.x, 'horizontal normal receives horizon light');
}

void _testUniformArraySerialization() {
  final sh = SphericalHarmonicsL2.fromEnvironment(
    zenith: const LinearColor(1, 1, 1),
    horizon: const LinearColor(0.5, 0.5, 0.5),
    ground: const LinearColor(0, 0, 0),
  );

  final arr = sh.toUniformArray();
  assert(arr.length == 27, 'uniform array must contain 27 floats (9 vec3s)');
  assert(arr[0] > 0, 'L00 DC component is positive');
}
