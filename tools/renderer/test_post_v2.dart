import 'package:pixeldart/rendering/api/environment.dart';

/// S4-D test: Verifies PostProcessVolumeProfile blending math and
/// Halton(2,3) TAA jitter sequence determinism and bounds.
void main() {
  // 1. Halton(2, 3) jitter determinism and [-0.5, 0.5] bounds
  final seqA = [for (var i = 0; i < 16; i++) HaltonJitter.pixelOffset(i)];
  final seqB = [for (var i = 0; i < 16; i++) HaltonJitter.pixelOffset(i)];
  for (var i = 0; i < 16; i++) {
    assert(seqA[i] == seqB[i], 'Halton sequence must be deterministic');
    final (jx, jy) = seqA[i];
    assert(jx >= -0.5 && jx <= 0.5);
    assert(jy >= -0.5 && jy <= 0.5);
  }
  // Wraps cleanly at sequenceLength
  assert(HaltonJitter.pixelOffset(0) == HaltonJitter.pixelOffset(16));

  // 2. PostProcessVolumeProfile blending math
  const base = PostProcessVolumeProfile.defaults;
  const local = PostProcessVolumeProfile(
    bloomIntensity: 0.85,
    exposureEv100: 2.0,
    ssrEnabled: true,
    gtaoRadius: 1.2,
  );

  final half = base.blendWith(local, 0.5);
  assert((half.bloomIntensity! - 0.55).abs() < 1e-6);
  assert((half.exposureEv100! - 1.0).abs() < 1e-6);
  assert(half.ssrEnabled == true);
  assert((half.gtaoRadius! - 0.9).abs() < 1e-6);
  // Unoverridden fields remain intact
  assert(half.taaEnabled == base.taaEnabled);
  assert(half.bloomThreshold == base.bloomThreshold);

  final zero = base.blendWith(local, 0.0);
  assert(zero.bloomIntensity == base.bloomIntensity);
  assert(zero.ssrEnabled == base.ssrEnabled);

  print(
    'PostProcess v2 passed (Halton(2,3) jitter determinism, VolumeProfile blending).',
  );
}
