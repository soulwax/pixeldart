import 'package:pixeldart/rendering/api/capabilities.dart';
import 'package:pixeldart/rendering/api/settings.dart';
import 'package:pixeldart/rendering/passes/exposure.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

/// S3-D test: Verifies HDR scene color target selection (RGBA16F vs RGBA8
/// fallback), physical EV100 exposure & auto-exposure adaptation, ACES/AgX/
/// Khronos Neutral tonemappers, HDR bloom prefilter, and linear-to-sRGB audit
/// within ±1/255.
void main() {
  // 1. Capability-driven RGBA16F vs RGBA8 target selection
  const hdrCaps = RenderCapabilities(
    maxTextureSize: 4096,
    maxTextureArrayLayers: 256,
    maxSamples: 4,
    maxVertexAttributes: 16,
    maxColorAttachments: 4,
    floatRenderTarget: true,
    halfFloatRenderTarget: true,
  );
  const ldrCaps = RenderCapabilities.safeMinimum;

  assert(
    HdrColorPipeline.selectColorTargetFormat(
          hdrCaps,
          RenderPipelineSettings.high,
        ) ==
        GpuColorTargetFormat.rgba16f,
  );
  assert(
    HdrColorPipeline.selectColorTargetFormat(
          ldrCaps,
          RenderPipelineSettings.high,
        ) ==
        GpuColorTargetFormat.rgba8,
  );
  assert(
    HdrColorPipeline.selectColorTargetFormat(
          hdrCaps,
          RenderPipelineSettings.low,
        ) ==
        GpuColorTargetFormat.rgba8,
  );

  // 2. Physical EV100 & auto-exposure adaptation
  final pipeline = HdrColorPipeline(
    settings: const ExposureSettings(
      manualEv100: 0.0,
      autoExposureEnabled: true,
      adaptationSpeedUp: 4.0,
      adaptationSpeedDown: 2.0,
    ),
  );
  final initialExp = pipeline.currentExposure;
  assert((initialExp - (1.0 / 1.2)).abs() < 1e-6);

  // Bright scene should increase EV100 (lower exposure multiplier)
  for (var i = 0; i < 60; i++) {
    pipeline.stepAutoExposure(8.0, 1.0 / 60.0);
  }
  assert(pipeline.currentEv100 > 3.0);
  assert(pipeline.currentExposure < initialExp);

  // 3. Tonemapper monotonicity & boundedness across ACES, AgX, Khronos Neutral
  for (final op in VrpTonemapper.values) {
    double prev = -1.0;
    for (final v in [0.0, 0.1, 0.5, 1.0, 2.0, 8.0, 32.0]) {
      final (sr, sg, sb) = HdrColorPipeline.applyTonemapAndSrgb(v, v, v, op);
      assert(sr >= 0.0 && sr <= 1.0);
      assert((sr - sg).abs() < 1e-3 && (sg - sb).abs() < 1e-3);
      assert(
        sr >= prev - 1e-4,
        'Non-monotonic tonemapper $op at $v: $sr < $prev',
      );
      prev = sr;
    }
  }

  // 4. Linear-to-sRGB audit: 0.5 linear -> ~0.735357 sRGB (within ±1/255)
  final srgbMid = HdrColorPipeline.linearToSrgb(0.5);
  assert((srgbMid - 0.735357).abs() < (1.0 / 255.0));

  // 5. Bloom soft-knee threshold
  assert(HdrColorPipeline.bloomPrefilterGain(0.2, 1.0, 0.5) == 0.0);
  assert(HdrColorPipeline.bloomPrefilterGain(2.0, 1.0, 0.5) > 0.45);

  // 6. Verify generated tonemap HDR shader contains all 3 operators
  assert(tonemapHdrFragSrc.contains('tonemapAces'));
  assert(tonemapHdrFragSrc.contains('tonemapAgX'));
  assert(tonemapHdrFragSrc.contains('tonemapKhronosNeutral'));

  print(
    'HdrColorPipeline passed (RGBA16F/RGBA8 tiers, EV100 auto-exposure, ACES/AgX/KhronosNeutral, sRGB audit).',
  );
}
