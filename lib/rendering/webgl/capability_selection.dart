import '../api/capabilities.dart';

/// Substrings of the unmasked `WEBGL_debug_renderer_info` renderer/vendor
/// strings that identify a software rasterizer. These report full WebGL2
/// feature support -- capability bits, not a speed guarantee -- so they pass
/// every threshold below yet cannot drive the multi-pass shadow/SSAO/DOF/
/// volumetric/bloom stack or an MSAA resolve at real-time rates.
const _softwareRendererMarkers = [
  'swiftshader',
  'llvmpipe',
  'software rasterizer',
  'softpipe',
  'microsoft basic render driver',
  'apple software renderer',
];

bool _isSoftwareRenderer(RenderCapabilities caps) {
  final renderer = caps.rendererString?.toLowerCase();
  final vendor = caps.vendorString?.toLowerCase();
  return _softwareRendererMarkers.any(
    (marker) =>
        (renderer?.contains(marker) ?? false) ||
        (vendor?.contains(marker) ?? false),
  );
}

/// Builds a [QualityProfile] from queried [RenderCapabilities] (§7.1: "Build
/// a QualityProfile from capabilities. Do not scatter capability checks
/// through passes.") This is the single place that reasons about capability
/// thresholds; passes only ever ask `profile.installs(featureId)`.
final class CapabilityProfileSelector {
  const CapabilityProfileSelector();

  static const String featureShadows = PipelineFeatures.shadows;
  static const String featureSsao = PipelineFeatures.ssao;
  static const String featureBloom = PipelineFeatures.bloom;
  static const String featureDof = PipelineFeatures.dof;
  static const String featureMsaa = PipelineFeatures.msaa;
  static const String featureMaterialArray = PipelineFeatures.materialArray;

  QualityProfile select(
    RenderCapabilities caps, {
    QualityProfileKind? forceKind,
  }) {
    caps.validate();
    if (forceKind == QualityProfileKind.safe) {
      return QualityProfile.safe;
    }

    final features = <String>{};
    if (caps.maxColorAttachments >= 2) {
      features.add(featureBloom);
    }
    if (caps.maxTextureSize >= 1024 && caps.maxColorAttachments >= 2) {
      features.add(featureShadows);
    }
    if (caps.maxSamples >= 2) {
      features.add(featureMsaa);
    }
    if (caps.floatRenderTarget || caps.halfFloatRenderTarget) {
      features.add(featureSsao);
      features.add(featureDof);
    }
    if (caps.maxTextureArrayLayers >= 3) {
      features.add(featureMaterialArray);
    }

    if (forceKind != null) {
      return QualityProfile(forceKind, features);
    }

    final kind = features.length >= 5
        ? QualityProfileKind.high
        : (features.isEmpty
              ? QualityProfileKind.safe
              : QualityProfileKind.standard);
    return QualityProfile(kind, features);
  }

  /// Maps queried capabilities to the concrete profiles currently executable
  /// by [SceneRendererImpl]. The raw [select] result preserves every
  /// capability bit for diagnostics; this method deliberately returns only
  /// graph profiles that have complete resource/pass wiring today -- and, for
  /// the same reason, is where a software rasterizer gets capped below
  /// `high`: [select] keeps reporting the raw feature bits for diagnostics,
  /// but nothing SwiftShader/llvmpipe/WARP reports is actually executable at
  /// a playable rate. An explicit [forceKind] still wins over the cap.
  QualityProfile selectRuntimeProfile(
    RenderCapabilities caps, {
    QualityProfileKind? forceKind,
  }) {
    final negotiated = select(caps, forceKind: forceKind);
    var kind = negotiated.kind;
    if (forceKind == null &&
        kind == QualityProfileKind.high &&
        _isSoftwareRenderer(caps)) {
      kind = QualityProfileKind.standard;
    }
    return switch (kind) {
      QualityProfileKind.high => QualityProfile.clean,
      QualityProfileKind.standard => QualityProfile.minimal,
      _ => QualityProfile.safe,
    };
  }
}
