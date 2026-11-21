import 'dart:math' as math;

import '../api/capabilities.dart';
import '../api/settings.dart';
import '../webgl/device_api.dart';

/// Filmic / neutral tonemapper operators (`[S3-D]`).
enum VrpTonemapper { acesFitted, agx, khronosNeutral }

/// Physical EV100 exposure, auto-exposure, bloom & tonemapping settings
/// (`[S3-D]`).
final class ExposureSettings {
  final double manualEv100;
  final bool autoExposureEnabled;
  final double minEv100;
  final double maxEv100;
  final double adaptationSpeedUp;
  final double adaptationSpeedDown;
  final double bloomThreshold;
  final double bloomKnee;
  final double bloomIntensity;
  final VrpTonemapper tonemapper;

  const ExposureSettings({
    this.manualEv100 = 0.0,
    this.autoExposureEnabled = false,
    this.minEv100 = -4.0,
    this.maxEv100 = 12.0,
    this.adaptationSpeedUp = 3.0,
    this.adaptationSpeedDown = 1.5,
    this.bloomThreshold = 1.0,
    this.bloomKnee = 0.5,
    this.bloomIntensity = 0.25,
    this.tonemapper = VrpTonemapper.acesFitted,
  });

  /// Converts physical EV100 into a linear scene exposure multiplier
  /// (`1 / (1.2 * 2^EV100)`, Lagarde / Frostbite convention).
  static double ev100ToExposure(double ev100) =>
      1.0 / (1.2 * math.pow(2.0, ev100));

  /// Converts average scene luminance (cd/m²) into target EV100.
  static double luminanceToEv100(double avgLuminance) {
    final l = math.max(avgLuminance, 1e-4);
    return math.log(l * 100.0 / 12.5) / math.ln2;
  }
}

/// HDR color pipeline controller managing capability-driven RGBA16F vs RGBA8
/// target selection, EV100 auto-exposure adaptation, and reference tonemapper
/// evaluation (`[S3-D]`).
final class HdrColorPipeline {
  ExposureSettings settings;
  double _currentEv100;

  HdrColorPipeline({this.settings = const ExposureSettings()})
    : _currentEv100 = settings.manualEv100;

  double get currentEv100 =>
      settings.autoExposureEnabled ? _currentEv100 : settings.manualEv100;

  double get currentExposure =>
      ExposureSettings.ev100ToExposure(currentEv100);

  /// Selects the scene color target format based on [RenderCapabilities] and
  /// [RenderPipelineSettings]. Falls back cleanly to RGBA8 with in-shader
  /// tonemapping when float color buffers are unavailable.
  static GpuColorTargetFormat selectColorTargetFormat(
    RenderCapabilities caps,
    RenderPipelineSettings pipeline,
  ) {
    if (pipeline.hdrEnabled &&
        (caps.halfFloatRenderTarget || caps.floatRenderTarget)) {
      return GpuColorTargetFormat.rgba16f;
    }
    return GpuColorTargetFormat.rgba8;
  }

  /// Advances auto-exposure toward [averageLuminance] over [dtSeconds].
  double stepAutoExposure(double averageLuminance, double dtSeconds) {
    if (!settings.autoExposureEnabled) {
      _currentEv100 = settings.manualEv100;
      return currentExposure;
    }
    final targetEv = ExposureSettings.luminanceToEv100(
      averageLuminance,
    ).clamp(settings.minEv100, settings.maxEv100);
    final speed = targetEv > _currentEv100
        ? settings.adaptationSpeedUp
        : settings.adaptationSpeedDown;
    final alpha = 1.0 - math.exp(-dtSeconds * speed);
    _currentEv100 += (targetEv - _currentEv100) * alpha;
    return currentExposure;
  }

  /// Soft-knee HDR bloom prefilter weight.
  static double bloomPrefilterGain(
    double luminance,
    double threshold,
    double knee,
  ) {
    final soft = (luminance - threshold + knee).clamp(0.0, 2.0 * knee);
    final softTerm = (soft * soft) / (4.0 * knee + 1e-5);
    final contrib = math.max(softTerm, luminance - threshold);
    return contrib / math.max(luminance, 1e-5);
  }

  /// Reference ACES fitted filmic tonemapper (Narkowicz 2015).
  static (double, double, double) tonemapAcesFitted(
    double r,
    double g,
    double b,
  ) {
    double f(double x) {
      final v = math.max(x, 0.0);
      return ((v * (2.51 * v + 0.03)) / (v * (2.43 * v + 0.59) + 0.14)).clamp(
        0.0,
        1.0,
      );
    }

    return (f(r), f(g), f(b));
  }

  /// Reference AgX tonemapper (inset + sigmoid curve + outset).
  static (double, double, double) tonemapAgX(double r, double g, double b) {
    final x = math.max(r, 0.0);
    final y = math.max(g, 0.0);
    final z = math.max(b, 0.0);
    // Inset matrix (Troy Sobotka AgX)
    var ir = 0.842479062253094 * x + 0.0784335999999992 * y + 0.0792237451477643 * z;
    var ig = 0.0423282422610123 * x + 0.878468636469772 * y + 0.0791661274605434 * z;
    var ib = 0.0423756549057051 * x + 0.0784336 * y + 0.879142973793104 * z;
    double curve(double v) {
      final lv = (math.log(math.max(v, 1e-10)) / math.ln2 + 12.47393) / 16.5;
      final t = lv.clamp(0.0, 1.0);
      final t2 = t * t;
      final t4 = t2 * t2;
      return (15.5 * t4 * t2 - 40.14 * t4 * t + 31.96 * t4 - 6.868 * t2 * t + 0.4298 * t2 + 0.1191 * t - 0.00232)
          .clamp(0.0, 1.0);
    }

    ir = curve(ir);
    ig = curve(ig);
    ib = curve(ib);
    return (ir, ig, ib);
  }

  /// Reference Khronos PBR Neutral tonemapper.
  static (double, double, double) tonemapKhronosNeutral(
    double r,
    double g,
    double b,
  ) {
    var cr = math.max(r, 0.0);
    var cg = math.max(g, 0.0);
    var cb = math.max(b, 0.0);
    const startCompression = 0.8 - 0.04;
    const desaturation = 0.15;

    final x = math.min(cr, math.min(cg, cb));
    final offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
    cr -= offset;
    cg -= offset;
    cb -= offset;

    final peak = math.max(cr, math.max(cg, cb));
    if (peak < startCompression) {
      return (cr.clamp(0.0, 1.0), cg.clamp(0.0, 1.0), cb.clamp(0.0, 1.0));
    }
    const d = 1.0 - startCompression;
    final newPeak = 1.0 - d * d / (peak + d - startCompression);
    final scale = newPeak / peak;
    cr *= scale;
    cg *= scale;
    cb *= scale;

    final gVal = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0);
    return (
      (cr + (newPeak - cr) * gVal).clamp(0.0, 1.0),
      (cg + (newPeak - cg) * gVal).clamp(0.0, 1.0),
      (cb + (newPeak - cb) * gVal).clamp(0.0, 1.0),
    );
  }

  /// Dispatches the active [VrpTonemapper] and encodes linear → sRGB.
  static (double, double, double) applyTonemapAndSrgb(
    double r,
    double g,
    double b,
    VrpTonemapper op,
  ) {
    final (tr, tg, tb) = switch (op) {
      VrpTonemapper.acesFitted => tonemapAcesFitted(r, g, b),
      VrpTonemapper.agx => tonemapAgX(r, g, b),
      VrpTonemapper.khronosNeutral => tonemapKhronosNeutral(r, g, b),
    };
    return (linearToSrgb(tr), linearToSrgb(tg), linearToSrgb(tb));
  }

  static double linearToSrgb(double c) {
    final v = c.clamp(0.0, 1.0);
    if (v <= 0.0031308) return v * 12.92;
    return 1.055 * math.pow(v, 1.0 / 2.4) - 0.055;
  }
}
