import 'dart:math' as math;

import 'package:pixeldart/rendering/api/environment.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/passes/ibl_prefilter.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

/// S4-A test: Verifies SH9 irradiance projection against an analytic constant
/// and directional reference, prefilter mip-chain counts, split-sum BRDF LUT
/// energy bounds, EnvironmentBlockLayout packing, and skybox shaders.
void main() {
  // 1. Constant white environment -> SH9 evaluates to (1,1,1) in all directions
  final whiteSh = IblBaker.projectSh9Irradiance((_) => (1.0, 1.0, 1.0));
  for (final n in const [
    Vec3(0, 1, 0),
    Vec3(0, -1, 0),
    Vec3(1, 0, 0),
    Vec3(0, 0, 1),
    Vec3(0.577, 0.577, 0.577),
  ]) {
    final (r, g, b) = IblBaker.evaluateSh9(whiteSh, n);
    assert((r - 1.0).abs() < 0.02, 'SH9 white r=$r for $n');
    assert((g - 1.0).abs() < 0.02, 'SH9 white g=$g for $n');
    assert((b - 1.0).abs() < 0.02, 'SH9 white b=$b for $n');
  }

  // 2. Sky-gradient environment (bright zenith +Y, dark nadir -Y)
  final skySh = IblBaker.projectSh9Irradiance((d) {
    final t = (d.y * 0.5 + 0.5).clamp(0.0, 1.0);
    return (0.2 + 0.8 * t, 0.3 + 0.7 * t, 0.5 + 0.5 * t);
  });
  final (upR, _, _) = IblBaker.evaluateSh9(skySh, const Vec3(0, 1, 0));
  final (dnR, _, _) = IblBaker.evaluateSh9(skySh, const Vec3(0, -1, 0));
  assert(upR > dnR + 0.25, 'Sky zenith irradiance ($upR) should exceed nadir ($dnR)');

  // 3. Prefilter mip counts match floor(log2(cubeSize)) + 1
  assert(IblBaker.prefilterMipCount(128) == 8);
  assert(IblBaker.prefilterMipCount(256) == 9);
  assert(IblBaker.prefilterMipCount(512) == 10);
  assert((IblBaker.roughnessForMip(0, 9) - 0.0).abs() < 1e-6);
  assert((IblBaker.roughnessForMip(8, 9) - 1.0).abs() < 1e-6);

  // 4. Split-sum BRDF LUT energy bounds
  for (final ndv in [0.1, 0.5, 0.9]) {
    for (final rough in [0.1, 0.5, 0.9]) {
      final (scale, bias) = IblBaker.integrateBrdf(ndv, rough);
      assert(scale >= 0.0 && scale <= 1.0);
      assert(bias >= 0.0 && bias <= 1.0);
      assert(scale + bias <= 1.05);
    }
  }

  // 5. std140 EnvironmentBlockLayout packing
  final packed = EnvironmentBlockLayout.pack(
    sh9Rgb: skySh,
    exposure: 1.2,
    iblIntensity: 0.8,
    probeBlendWeight: 0.5,
  );
  assert(packed.length == EnvironmentBlockLayout.floatCount);
  assert((packed[36] - 1.2).abs() < 1e-6);
  assert((packed[38] - 0.5).abs() < 1e-6);

  // 6. Skybox shaders present
  assert(skyboxVertSrc.contains('clip.xyww'));
  assert(skyboxFragSrc.contains('uSkyCubemap'));

  // Silence unused import warning if math not directly needed
  assert(math.pi > 3.0);

  print(
    'IblBaker passed (SH9 analytic white & sky gradient, mip counts, split-sum BRDF LUT, skybox shaders).',
  );
}
