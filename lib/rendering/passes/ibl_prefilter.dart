import 'dart:math' as math;
import 'dart:typed_data';

import '../math/vec.dart';

/// Pure-Dart IBL baker (`[S4-A]`):
/// - Projects equirectangular HDR environments or analytic sky functions into
///   9-band Spherical Harmonics (`SH9`) irradiance coefficients.
/// - Computes GGX split-sum 2D BRDF LUT (`scale`, `bias`).
/// - Computes cubemap prefilter mip-chain counts and roughness levels.
abstract final class IblBaker {
  /// Number of mip levels for a cubemap of edge size [cubeSize].
  static int prefilterMipCount(int cubeSize) {
    if (cubeSize <= 0) {
      throw ArgumentError.value(cubeSize, 'cubeSize', 'must be > 0');
    }
    return (math.log(cubeSize) / math.ln2).floor() + 1;
  }

  /// Target roughness for prefilter mip level [mip] out of [mipCount].
  static double roughnessForMip(int mip, int mipCount) {
    if (mipCount <= 1) return 0.0;
    return (mip / (mipCount - 1)).clamp(0.0, 1.0);
  }

  /// Projects a directional radiance callback `sampleEnv(Vec3 dir) -> (r,g,b)`
  /// onto 9-band Spherical Harmonics irradiance (`Float32List(27)`).
  ///
  /// Uses pre-convolved Lambertian cosine lobe factors (`A0=π`, `A1=2π/3`,
  /// `A2=π/4`) normalized by `1/π` so a constant radiance `(1,1,1)` evaluates to
  /// `(1,1,1)` in every normal direction!
  static Float32List projectSh9Irradiance(
    (double, double, double) Function(Vec3 dir) sampleEnv, {
    int thetaSteps = 32,
    int phiSteps = 64,
  }) {
    final coeffs = Float32List(27);
    final dTheta = math.pi / thetaSteps;
    final dPhi = (2.0 * math.pi) / phiSteps;

    // Real spherical harmonics basis constants
    const y0 = 0.28209479177387814; // 1/(2*sqrt(pi))
    const y1 = 0.4886025119029199; // sqrt(3/(4*pi))
    const y2a = 1.0925484305920792; // sqrt(15/(4*pi))
    const y2b = 0.31539156525252005; // sqrt(5/(16*pi))
    const y2c = 0.5462742152960396; // sqrt(15/(16*pi))

    for (var it = 0; it < thetaSteps; it++) {
      final theta = (it + 0.5) * dTheta;
      final sinT = math.sin(theta);
      final cosT = math.cos(theta);
      final solidAngle = sinT * dTheta * dPhi;

      for (var ip = 0; ip < phiSteps; ip++) {
        final phi = (ip + 0.5) * dPhi;
        final x = sinT * math.cos(phi);
        final y = cosT;
        final z = sinT * math.sin(phi);

        final (r, g, b) = sampleEnv(Vec3(x, y, z));
        final w = solidAngle;

        final basis = <double>[
          y0,
          y1 * y,
          y1 * z,
          y1 * x,
          y2a * x * y,
          y2a * y * z,
          y2b * (3.0 * z * z - 1.0),
          y2a * x * z,
          y2c * (x * x - y * y),
        ];

        for (var k = 0; k < 9; k++) {
          final bw = basis[k] * w;
          coeffs[k * 3 + 0] += r * bw;
          coeffs[k * 3 + 1] += g * bw;
          coeffs[k * 3 + 2] += b * bw;
        }
      }
    }

    // Apply Lambertian cosine convolution (A_l / pi):
    // l=0: 1.0, l=1: 2/3, l=2: 1/4
    const bandScale = <double>[
      1.0,
      2.0 / 3.0,
      2.0 / 3.0,
      2.0 / 3.0,
      0.25,
      0.25,
      0.25,
      0.25,
      0.25,
    ];
    for (var k = 0; k < 9; k++) {
      coeffs[k * 3 + 0] *= bandScale[k];
      coeffs[k * 3 + 1] *= bandScale[k];
      coeffs[k * 3 + 2] *= bandScale[k];
    }
    return coeffs;
  }

  /// Evaluates pre-convolved `sh9` irradiance along unit normal [n].
  static (double, double, double) evaluateSh9(Float32List sh9, Vec3 n) {
    final d = n.normalized;
    final x = d.x, y = d.y, z = d.z;
    const y0 = 0.28209479177387814;
    const y1 = 0.4886025119029199;
    const y2a = 1.0925484305920792;
    const y2b = 0.31539156525252005;
    const y2c = 0.5462742152960396;
    final basis = <double>[
      y0,
      y1 * y,
      y1 * z,
      y1 * x,
      y2a * x * y,
      y2a * y * z,
      y2b * (3.0 * z * z - 1.0),
      y2a * x * z,
      y2c * (x * x - y * y),
    ];
    var r = 0.0, g = 0.0, b = 0.0;
    for (var k = 0; k < 9; k++) {
      final bk = basis[k];
      r += sh9[k * 3 + 0] * bk;
      g += sh9[k * 3 + 1] * bk;
      b += sh9[k * 3 + 2] * bk;
    }
    return (math.max(r, 0.0), math.max(g, 0.0), math.max(b, 0.0));
  }

  /// Split-sum GGX 2D BRDF LUT integration at `(nDotV, roughness)`.
  /// Returns `(scale, bias)` where specular reflectance ≈ `F0 * scale + bias`.
  static (double, double) integrateBrdf(
    double nDotV,
    double roughness, {
    int sampleCount = 64,
  }) {
    final ndv = nDotV.clamp(1e-3, 1.0);
    final a = (roughness * roughness).clamp(0.002, 1.0);
    final vx = math.sqrt((1.0 - ndv * ndv).clamp(0.0, 1.0));
    final vz = ndv;

    var scale = 0.0;
    var bias = 0.0;
    for (var i = 0; i < sampleCount; i++) {
      final u1 = (i + 0.5) / sampleCount;
      final u2 = _vanDerCorput(i);

      final phi = 2.0 * math.pi * u1;
      final cosTheta = math.sqrt((1.0 - u2) / (1.0 + (a * a - 1.0) * u2));
      final sinTheta = math.sqrt((1.0 - cosTheta * cosTheta).clamp(0.0, 1.0));

      final hx = math.cos(phi) * sinTheta;
      final hy = math.sin(phi) * sinTheta;
      final hz = cosTheta;

      final vDotH = (vx * hx + vz * hz).clamp(0.0, 1.0);
      final lx = 2.0 * vDotH * hx - vx;
      final ly = 2.0 * vDotH * hy;
      final lz = 2.0 * vDotH * hz - vz;
      final lLen = math.sqrt(lx * lx + ly * ly + lz * lz);
      final nDotL = lLen > 1e-6 ? (lz / lLen).clamp(0.0, 1.0) : 0.0;
      final nDotH = hz.clamp(0.0, 1.0);

      if (nDotL > 0.0) {
        final k = a * 0.5;
        final gv = ndv / (ndv * (1.0 - k) + k);
        final gl = nDotL / (nDotL * (1.0 - k) + k);
        final g = gv * gl;
        final gVis = (g * vDotH) / math.max(nDotH * ndv, 1e-5);
        final fc = math.pow(1.0 - vDotH, 5.0).toDouble();
        scale += (1.0 - fc) * gVis;
        bias += fc * gVis;
      }
    }
    return (
      (scale / sampleCount).clamp(0.0, 1.0),
      (bias / sampleCount).clamp(0.0, 1.0),
    );
  }

  static double _vanDerCorput(int bits) {
    var result = 0.0;
    var f = 0.5;
    var n = bits;
    while (n > 0) {
      if ((n & 1) != 0) result += f;
      n >>= 1;
      f *= 0.5;
    }
    return result;
  }
}
