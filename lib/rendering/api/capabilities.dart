import 'capability_serialization.dart';

final class RenderCapabilities {
  final String? webglVersion;
  final String? rendererString;
  final String? vendorString;
  final int maxTextureSize, maxTextureArrayLayers, maxSamples;
  final int maxVertexAttributes;
  final int maxColorAttachments;
  final bool anisotropicFiltering;
  final double maxAnisotropy;
  final bool disjointTimerQuery,
      floatRenderTarget,
      halfFloatRenderTarget,
      contextLossExtension;
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
    this.maxAnisotropy = 1,
    this.disjointTimerQuery = false,
    this.floatRenderTarget = false,
    this.halfFloatRenderTarget = false,
    this.contextLossExtension = false,
  });

  /// Capability floor for the mandatory safe graph and pure fallback tests.
  static const RenderCapabilities safeMinimum = RenderCapabilities(
    maxTextureSize: 2048,
    maxTextureArrayLayers: 1,
    maxSamples: 1,
    maxVertexAttributes: 16,
    maxColorAttachments: 1,
  );
  void validate() {
    if ([
      maxTextureSize,
      maxTextureArrayLayers,
      maxSamples,
      maxVertexAttributes,
      maxColorAttachments,
    ].any((value) => value <= 0)) {
      throw const FormatException('render capabilities contain invalid limits');
    }
    if (!maxAnisotropy.isFinite || maxAnisotropy < 1) {
      throw const FormatException('invalid anisotropy limit');
    }
  }
  Map<String, Object?> toMap() => capabilityToMap(this);

  factory RenderCapabilities.fromMap(Map<String, Object?> value) =>
      capabilityFromMap(value);
}

/// Effect groups installed by the pipeline assembler.
/// three passes (blur H/V + composite), `ssao` covers two, `dof` covers
/// the internal pass count implementing it.
final class PipelineFeatures {
  const PipelineFeatures._();

  static const String shadows = 'shadows';
  static const String ssao = 'ssao';
  static const String bloom = 'bloom';
  static const String dof = 'dof';
  static const String grade = 'grade';
  static const String ps1 = 'ps1';
  static const String vhs = 'vhs';
  static const String msaa = 'msaa';
  static const String materialArray = 'material-array';
  static const String volumetric = 'volumetric';

  static const Set<String> all = {
    shadows,
    ssao,
    bloom,
    dof,
    grade,
    ps1,
    vhs,
    msaa,
    materialArray,
    volumetric,
  };
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

  void validate() {
    final unknown = installedFeatures.difference(PipelineFeatures.all);
    if (unknown.isNotEmpty) {
      throw ArgumentError.value(
        unknown,
        'installedFeatures',
        'contains unknown pipeline features',
      );
    }
    if (kind == QualityProfileKind.safe && installedFeatures.isNotEmpty) {
      throw ArgumentError.value(
        installedFeatures,
        'installedFeatures',
        'safe profiles cannot install optional features',
      );
    }
  }

  Map<String, Object> toMap() {
    validate();
    final features = installedFeatures.toList()..sort();
    return <String, Object>{'kind': kind.name, 'features': features};
  }

  static QualityProfile fromMap(Map<String, Object?> value) {
    final kindName = value['kind'];
    final featureValues = value['features'];
    if (kindName is! String || featureValues is! List) {
      throw const FormatException('profile requires kind and features');
    }
    final kind = QualityProfileKind.values.firstWhere(
      (candidate) => candidate.name == kindName,
      orElse: () => throw FormatException('unknown profile kind: $kindName'),
    );
    if (featureValues.any((feature) => feature is! String)) {
      throw const FormatException('profile features must be strings');
    }
    final profile = QualityProfile(kind, featureValues.cast<String>().toSet());
    final unknown = profile.installedFeatures.difference(PipelineFeatures.all);
    if (unknown.isNotEmpty) {
      throw FormatException('unknown pipeline features: $unknown');
    }
    if (kind == QualityProfileKind.safe &&
        profile.installedFeatures.isNotEmpty) {
      throw const FormatException(
        'safe profiles cannot install optional features',
      );
    }
    profile.validate();
    return profile;
  }

  static const QualityProfile safe = QualityProfile(
    QualityProfileKind.safe,
    {},
  );

  /// Shadows only — the cheapest profile `buildMainPipeline` can build
  /// (distinct from `safe`, which is `buildSafeGraph`'s own separate,
  /// shadow-free assembly). `shadows` is installed by every
  /// `buildMainPipeline` profile regardless of what a caller's own set
  /// contains: `ShadowedWorldFeature` hard-requires the caster to have run
  /// (`resolveLightView` throws otherwise), so the two are one unit in
  /// this assembler, not two independently excludable groups.
  static const QualityProfile minimal = QualityProfile(
    QualityProfileKind.standard,
    {PipelineFeatures.shadows},
  );

  /// Every effect group except PS1's own quantize/dither and VHS — the
  /// established clean look. Participating media is exposed separately by
  /// [cinematic] so hosts can opt into its extra ray-march cost.
  static const QualityProfile clean = QualityProfile(QualityProfileKind.high, {
    PipelineFeatures.shadows,
    PipelineFeatures.ssao,
    PipelineFeatures.bloom,
    PipelineFeatures.dof,
    PipelineFeatures.grade,
  });

  /// Clean cinematic lighting plus the bounded, depth-aware participating
  /// media path. Kept separate from [clean] so hosts can opt into the extra
  /// ray-march cost without changing the established runtime default.
  static const QualityProfile cinematic = QualityProfile(
    QualityProfileKind.high,
    {
      PipelineFeatures.shadows,
      PipelineFeatures.ssao,
      PipelineFeatures.bloom,
      PipelineFeatures.dof,
      PipelineFeatures.grade,
      PipelineFeatures.volumetric,
    },
  );

  /// The established stylized pipeline — every post effect, but without the
  /// optional cinematic media feature. `test_shadow_graph.dart` pins its
  /// exact 15-pass order.
  static const QualityProfile ps1Full =
      QualityProfile(QualityProfileKind.shipping, {
        PipelineFeatures.shadows,
        PipelineFeatures.ssao,
        PipelineFeatures.bloom,
        PipelineFeatures.dof,
        PipelineFeatures.grade,
        PipelineFeatures.ps1,
        PipelineFeatures.vhs,
      });
}
