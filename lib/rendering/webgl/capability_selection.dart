import '../api/capabilities.dart';

/// Builds a [QualityProfile] from queried [RenderCapabilities] (§7.1: "Build
/// a QualityProfile from capabilities. Do not scatter capability checks
/// through passes.") This is the single place that reasons about capability
/// thresholds; passes only ever ask `profile.installs(featureId)`.
final class CapabilityProfileSelector {
  const CapabilityProfileSelector();

  static const String featureShadows = 'shadows';
  static const String featureSsao = 'ssao';
  static const String featureBloom = 'bloom';
  static const String featureDof = 'dof';
  static const String featureMsaa = 'msaa';
  static const String featureMaterialArray = 'material-array';

  QualityProfile select(
    RenderCapabilities caps, {
    QualityProfileKind? forceKind,
  }) {
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
}
