/// Queried device capabilities (§7.1). RV-02's WebGL backend populates
/// this; RV-01 only defines the shape so pure code can reason about
/// capability-bounded selection without a GPU context.
final class RenderCapabilities {
  final String? webglVersion;
  final String? rendererString;
  final String? vendorString;
  final int maxTextureSize;
  final int maxTextureArrayLayers;
  final int maxSamples;
  final int maxVertexAttributes;
  final int maxColorAttachments;
  final bool anisotropicFiltering;
  final bool disjointTimerQuery;
  final bool floatRenderTarget;
  final bool halfFloatRenderTarget;
  final bool contextLossExtension;

  const RenderCapabilities({
    this.webglVersion,
    this.rendererString,
    this.vendorString,
    required this.maxTextureSize,
    required this.maxTextureArrayLayers,
    required this.maxSamples,
    required this.maxVertexAttributes,
    required this.maxColorAttachments,
    this.anisotropicFiltering = false,
    this.disjointTimerQuery = false,
    this.floatRenderTarget = false,
    this.halfFloatRenderTarget = false,
    this.contextLossExtension = false,
  });

  /// A capability floor sufficient for `world opaque -> world transparent
  /// -> present` (§6.1) with no optional features. Used to synthesize a
  /// deterministic capability object in pure tests and the safe fallback
  /// path, without depending on a real WebGL context.
  static const RenderCapabilities safeMinimum = RenderCapabilities(
    maxTextureSize: 2048,
    maxTextureArrayLayers: 1,
    maxSamples: 1,
    maxVertexAttributes: 16,
    maxColorAttachments: 1,
  );
}

enum QualityProfileKind {
  safe,
  standard,
  high,
  deterministicReference,
  shipping,
  legacyComparison,
}

final class QualityProfile {
  final QualityProfileKind kind;
  final Set<String> installedFeatures;

  const QualityProfile(this.kind, this.installedFeatures);

  bool installs(String featureId) => installedFeatures.contains(featureId);

  static const QualityProfile safe = QualityProfile(
    QualityProfileKind.safe,
    {},
  );
}
