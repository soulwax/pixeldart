import 'dart:math' as math;
import 'dart:typed_data';

import '../api/lights.dart';
import '../math/vec.dart';

/// 3rd-order (9 coefficient) Spherical Harmonics ($L_2$ SH) representation
/// for diffuse ambient irradiance in Image-Based Lighting.
///
/// Implements the Ramamoorthi & Hanrahan (SIGGRAPH 2001) closed-form polynomial
/// evaluation for real-time environment irradiance.
final class SphericalHarmonicsL2 {
  /// 9 RGB coefficients ordered [L00, L1-1, L10, L11, L2-2, L2-1, L20, L21, L22].
  final List<Vec3> coefficients;

  const SphericalHarmonicsL2(this.coefficients)
      : assert(coefficients.length == 9, 'L2 SH requires exactly 9 coefficients');

  /// Analytical projection of a 3-band hemispherical environment (zenith, horizon, ground).
  factory SphericalHarmonicsL2.fromEnvironment({
    required LinearColor zenith,
    required LinearColor horizon,
    required LinearColor ground,
  }) {
    final z = Vec3(zenith.r, zenith.g, zenith.b);
    final h = Vec3(horizon.r, horizon.g, horizon.b);
    final g = Vec3(ground.r, ground.g, ground.b);

    // L00: isotropic DC term
    final l00 = (z + (h * 2.0) + g) * (0.282095 * 0.25 * math.pi);
    // L1-1: directional Y gradient
    final l1_1 = (z - g) * (0.488603 * 0.333333 * math.pi);
    // L20: quadratic Y curvature
    final l20 = ((z + g) - (h * 2.0)) * (0.315392 * 0.25 * math.pi);

    return SphericalHarmonicsL2([
      l00,
      l1_1,
      Vec3.zero, // L10 (Z)
      Vec3.zero, // L11 (X)
      Vec3.zero, // L2-2 (XY)
      Vec3.zero, // L2-1 (YZ)
      l20,       // L20 (3Z^2 - 1 / 3Y^2 - 1)
      Vec3.zero, // L21 (XZ)
      Vec3.zero, // L22 (X^2 - Y^2)
    ]);
  }

  /// Evaluates diffuse irradiance for a surface normal vector.
  Vec3 evaluate(Vec3 normal) {
    final n = normal.normalized;
    final x = n.x, y = n.y, z = n.z;

    const c1 = 0.429043;
    const c2 = 0.511664;
    const c3 = 0.743125;
    const c4 = 0.886227;
    const c5 = 0.247708;

    final l00 = coefficients[0];
    final l1_1 = coefficients[1];
    final l10 = coefficients[2];
    final l11 = coefficients[3];
    final l2_2 = coefficients[4];
    final l2_1 = coefficients[5];
    final l20 = coefficients[6];
    final l21 = coefficients[7];
    final l22 = coefficients[8];

    final term1 = (l22 * (c1 * (x * x - y * y))) +
        (l20 * (c3 * z * z - c5)) +
        (l00 * c4);

    final term2 = (l2_2 * (2.0 * c1 * x * y)) +
        (l21 * (2.0 * c1 * x * z)) +
        (l2_1 * (2.0 * c1 * y * z));

    final term3 = (l11 * (2.0 * c2 * x)) +
        (l1_1 * (2.0 * c2 * y)) +
        (l10 * (2.0 * c2 * z));

    final result = term1 + term2 + term3;
    return Vec3(
      result.x < 0 ? 0 : result.x,
      result.y < 0 ? 0 : result.y,
      result.z < 0 ? 0 : result.z,
    );
  }

  /// Serializes into a 27-float array (9 x vec3) for WebGL uniforms.
  Float32List toUniformArray() {
    final floats = Float32List(27);
    for (var i = 0; i < 9; i++) {
      final c = coefficients[i];
      floats[i * 3] = c.x;
      floats[i * 3 + 1] = c.y;
      floats[i * 3 + 2] = c.z;
    }
    return floats;
  }
}
