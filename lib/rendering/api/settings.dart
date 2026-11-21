import 'capabilities.dart';
import 'shaders.dart';

final class SurfaceMetrics {
  final int cssWidth;
  final int cssHeight;
  final int pixelWidth;
  final int pixelHeight;
  final double devicePixelRatio;
  final bool visible;

  const SurfaceMetrics({
    required this.cssWidth,
    required this.cssHeight,
    required this.pixelWidth,
    required this.pixelHeight,
    this.devicePixelRatio = 1,
    this.visible = true,
  });

  factory SurfaceMetrics.forCanvas({
    required int cssWidth,
    required int cssHeight,
    double devicePixelRatio = 1,
    double maxDevicePixelRatio = 2,
    bool visible = true,
  }) {
    if (!devicePixelRatio.isFinite || devicePixelRatio <= 0) {
      throw ArgumentError(
        'SurfaceMetrics.forCanvas devicePixelRatio must be finite and > 0: '
        '$devicePixelRatio',
      );
    }
    if (!maxDevicePixelRatio.isFinite || maxDevicePixelRatio <= 0) {
      throw ArgumentError(
        'SurfaceMetrics.forCanvas maxDevicePixelRatio must be finite and > 0: '
        '$maxDevicePixelRatio',
      );
    }
    final ratio = devicePixelRatio > maxDevicePixelRatio
        ? maxDevicePixelRatio
        : devicePixelRatio;
    return SurfaceMetrics(
      cssWidth: cssWidth,
      cssHeight: cssHeight,
      pixelWidth: (cssWidth * ratio).round(),
      pixelHeight: (cssHeight * ratio).round(),
      devicePixelRatio: ratio,
      visible: visible,
    )..validate();
  }

  factory SurfaceMetrics.pixels({
    required int width,
    required int height,
    bool visible = true,
  }) => SurfaceMetrics(
    cssWidth: width,
    cssHeight: height,
    pixelWidth: width,
    pixelHeight: height,
    visible: visible,
  )..validate();

  SurfaceMetrics resized({
    required int cssWidth,
    required int cssHeight,
    double? devicePixelRatio,
    double maxDevicePixelRatio = 2,
  }) => SurfaceMetrics.forCanvas(
    cssWidth: cssWidth,
    cssHeight: cssHeight,
    devicePixelRatio: devicePixelRatio ?? this.devicePixelRatio,
    maxDevicePixelRatio: devicePixelRatio == null
        ? this.devicePixelRatio
        : maxDevicePixelRatio,
    visible: visible,
  );

  SurfaceMetrics withVisibility(bool nextVisible) => SurfaceMetrics(
    cssWidth: cssWidth,
    cssHeight: cssHeight,
    pixelWidth: pixelWidth,
    pixelHeight: pixelHeight,
    devicePixelRatio: devicePixelRatio,
    visible: nextVisible,
  );

  @override
  String toString() =>
      'SurfaceMetrics(css ${cssWidth}x$cssHeight, '
      'pixels ${pixelWidth}x$pixelHeight, dpr $devicePixelRatio, '
      'visible: $visible)';

  bool get isZeroSized => pixelWidth <= 0 || pixelHeight <= 0;

  void validate() {
    if (cssWidth < 0 || cssHeight < 0) {
      throw ArgumentError('SurfaceMetrics css size must be >= 0');
    }
    if (pixelWidth < 0 || pixelHeight < 0) {
      throw ArgumentError('SurfaceMetrics pixel size must be >= 0');
    }
    if (!devicePixelRatio.isFinite || devicePixelRatio <= 0) {
      throw ArgumentError(
        'SurfaceMetrics.devicePixelRatio must be finite and > 0: $devicePixelRatio',
      );
    }
  }
}

enum ColorEncoding { linear, srgb }

enum DiagnosticLevel { off, errorsOnly, full }

final class RendererConfiguration {
  final QualityProfile profile;
  final int internalWidth;
  final int internalHeight;
  final int sampleCount;
  final ColorEncoding outputEncoding;
  final int shadowMapCount;
  final int shadowMapSize;
  final int materialTableCapacity;
  final int lightTableCapacity;
  final int textureArrayLayerCapacity;
  final DiagnosticLevel diagnosticLevel;

  final Map<ShaderSlot, ShaderOverride> shaderOverrides;

  /// Host post-process stages, in order, after every built-in stage and
  /// before present. Each one is a [ShaderOverride.effect] or a full fragment
  /// stage. Works on every profile, and costs nothing when empty.
  final Map<String, ShaderOverride> postEffects;

  const RendererConfiguration({
    required this.profile,
    required this.internalWidth,
    required this.internalHeight,
    this.sampleCount = 1,
    this.outputEncoding = ColorEncoding.srgb,
    this.shadowMapCount = 0,
    this.shadowMapSize = 512,
    this.materialTableCapacity = 32,
    this.lightTableCapacity = 4,
    this.textureArrayLayerCapacity = 1,
    this.diagnosticLevel = DiagnosticLevel.errorsOnly,
    this.shaderOverrides = const {},
    this.postEffects = const {},
  });

  Map<String, Object> toMap() => {
    'profile': profile.toMap(),
    'internalWidth': internalWidth,
    'internalHeight': internalHeight,
    'sampleCount': sampleCount,
    'outputEncoding': outputEncoding.name,
    'shadowMapCount': shadowMapCount,
    'shadowMapSize': shadowMapSize,
    'materialTableCapacity': materialTableCapacity,
    'lightTableCapacity': lightTableCapacity,
    'textureArrayLayerCapacity': textureArrayLayerCapacity,
    'diagnosticLevel': diagnosticLevel.name,
    'shaderOverrides': [for (final slot in shaderOverrides.keys) slot.name],
    'postEffects': postEffects.keys.toList(),
  };

  RendererConfiguration copyWith({
    QualityProfile? profile,
    int? internalWidth,
    int? internalHeight,
    int? sampleCount,
    ColorEncoding? outputEncoding,
    int? shadowMapCount,
    int? shadowMapSize,
    int? materialTableCapacity,
    int? lightTableCapacity,
    int? textureArrayLayerCapacity,
    DiagnosticLevel? diagnosticLevel,
    Map<ShaderSlot, ShaderOverride>? shaderOverrides,
    Map<String, ShaderOverride>? postEffects,
  }) => RendererConfiguration(
    profile: profile ?? this.profile,
    internalWidth: internalWidth ?? this.internalWidth,
    internalHeight: internalHeight ?? this.internalHeight,
    sampleCount: sampleCount ?? this.sampleCount,
    outputEncoding: outputEncoding ?? this.outputEncoding,
    shadowMapCount: shadowMapCount ?? this.shadowMapCount,
    shadowMapSize: shadowMapSize ?? this.shadowMapSize,
    materialTableCapacity: materialTableCapacity ?? this.materialTableCapacity,
    lightTableCapacity: lightTableCapacity ?? this.lightTableCapacity,
    textureArrayLayerCapacity:
        textureArrayLayerCapacity ?? this.textureArrayLayerCapacity,
    diagnosticLevel: diagnosticLevel ?? this.diagnosticLevel,
    shaderOverrides: shaderOverrides ?? this.shaderOverrides,
    postEffects: postEffects ?? this.postEffects,
  );

  RendererConfiguration withShaderOverrides(
    Map<ShaderSlot, ShaderOverride> overrides,
  ) => copyWith(shaderOverrides: Map.unmodifiable(overrides));

  RendererConfiguration withSampleCount(int samples) =>
      copyWith(sampleCount: samples);

  static const RendererConfiguration safe = RendererConfiguration(
    profile: QualityProfile.safe,
    internalWidth: 384,
    internalHeight: 216,
    shadowMapCount: 0,
  );

  void validate() {
    profile.validate();
    for (final override in shaderOverrides.values) {
      override.validate();
    }
    for (final entry in postEffects.entries) {
      entry.value.validate();
      if (entry.value.vertex != null) {
        throw ArgumentError(
          'post effect "${entry.key}" must not replace the vertex stage',
        );
      }
    }
    if (internalWidth <= 0 || internalHeight <= 0) {
      throw ArgumentError(
        'RendererConfiguration internal resolution must be > 0: '
        '${internalWidth}x$internalHeight',
      );
    }
    if (sampleCount <= 0) {
      throw ArgumentError(
        'RendererConfiguration.sampleCount must be > 0: $sampleCount',
      );
    }
    if (shadowMapCount < 0) {
      throw ArgumentError(
        'RendererConfiguration.shadowMapCount must be >= 0: $shadowMapCount',
      );
    }
    if (shadowMapCount > 0 && shadowMapSize <= 0) {
      throw ArgumentError(
        'RendererConfiguration.shadowMapSize must be > 0 when casting: $shadowMapSize',
      );
    }
    if (materialTableCapacity <= 0) {
      throw ArgumentError(
        'RendererConfiguration.materialTableCapacity must be > 0: $materialTableCapacity',
      );
    }
    if (lightTableCapacity < 0) {
      throw ArgumentError(
        'RendererConfiguration.lightTableCapacity must be >= 0: $lightTableCapacity',
      );
    }
  }
}

/// Quality tier selector for [RenderPipelineSettings] (`[S3-0]`).
enum VrpQualityTier { low, medium, high, ultra }

/// Scene color buffer format for HDR / LDR rendering (`[S3-0]`).
enum VrpHdrFormat { rgba8, rgba16f, rgba32f }

/// Serializable Volition Render Pipeline (VRP) settings asset (`[S3-0]`).
final class RenderPipelineSettings {
  final VrpQualityTier tier;
  final bool hdrEnabled;
  final VrpHdrFormat hdrFormat;
  final int msaaSamples;
  final double renderScale;
  final int maxVisibleLights;
  final int clusterDimX;
  final int clusterDimY;
  final int clusterDimZ;
  final double shadowDistance;
  final int shadowCascadeCount;
  final double shadowSplitLambda;
  final int shadowAtlasSize;
  final List<int> shadowResolutionTiers;

  const RenderPipelineSettings({
    this.tier = VrpQualityTier.high,
    this.hdrEnabled = true,
    this.hdrFormat = VrpHdrFormat.rgba16f,
    this.msaaSamples = 1,
    this.renderScale = 1.0,
    this.maxVisibleLights = 256,
    this.clusterDimX = 16,
    this.clusterDimY = 9,
    this.clusterDimZ = 24,
    this.shadowDistance = 120.0,
    this.shadowCascadeCount = 4,
    this.shadowSplitLambda = 0.65,
    this.shadowAtlasSize = 2048,
    this.shadowResolutionTiers = const [256, 512, 1024, 2048],
  });

  static const RenderPipelineSettings low = RenderPipelineSettings(
    tier: VrpQualityTier.low,
    hdrEnabled: false,
    hdrFormat: VrpHdrFormat.rgba8,
    msaaSamples: 1,
    renderScale: 0.75,
    maxVisibleLights: 32,
    clusterDimX: 8,
    clusterDimY: 4,
    clusterDimZ: 12,
    shadowDistance: 40.0,
    shadowCascadeCount: 1,
    shadowAtlasSize: 1024,
    shadowResolutionTiers: [128, 256, 512],
  );

  static const RenderPipelineSettings medium = RenderPipelineSettings(
    tier: VrpQualityTier.medium,
    hdrEnabled: true,
    hdrFormat: VrpHdrFormat.rgba16f,
    msaaSamples: 2,
    renderScale: 1.0,
    maxVisibleLights: 128,
    clusterDimX: 12,
    clusterDimY: 6,
    clusterDimZ: 16,
    shadowDistance: 80.0,
    shadowCascadeCount: 2,
    shadowAtlasSize: 2048,
    shadowResolutionTiers: [256, 512, 1024],
  );

  static const RenderPipelineSettings high = RenderPipelineSettings();

  static const RenderPipelineSettings ultra = RenderPipelineSettings(
    tier: VrpQualityTier.ultra,
    hdrEnabled: true,
    hdrFormat: VrpHdrFormat.rgba16f,
    msaaSamples: 4,
    renderScale: 1.0,
    maxVisibleLights: 512,
    clusterDimX: 16,
    clusterDimY: 9,
    clusterDimZ: 24,
    shadowDistance: 200.0,
    shadowCascadeCount: 4,
    shadowAtlasSize: 4096,
    shadowResolutionTiers: [512, 1024, 2048],
  );

  static RenderPipelineSettings forTier(VrpQualityTier tier) => switch (tier) {
    VrpQualityTier.low => low,
    VrpQualityTier.medium => medium,
    VrpQualityTier.high => high,
    VrpQualityTier.ultra => ultra,
  };

  int get totalClusters => clusterDimX * clusterDimY * clusterDimZ;

  void validate() {
    if (msaaSamples <= 0) {
      throw ArgumentError.value(msaaSamples, 'msaaSamples', 'must be > 0');
    }
    if (!renderScale.isFinite || renderScale <= 0 || renderScale > 2.0) {
      throw ArgumentError.value(
        renderScale,
        'renderScale',
        'must be in (0, 2.0]',
      );
    }
    if (maxVisibleLights <= 0) {
      throw ArgumentError.value(
        maxVisibleLights,
        'maxVisibleLights',
        'must be > 0',
      );
    }
    if (clusterDimX <= 0 || clusterDimY <= 0 || clusterDimZ <= 0) {
      throw ArgumentError('cluster dimensions must be > 0');
    }
    if (shadowCascadeCount < 1 || shadowCascadeCount > 4) {
      throw ArgumentError.value(
        shadowCascadeCount,
        'shadowCascadeCount',
        'must be in 1..4',
      );
    }
    if (shadowAtlasSize <= 0) {
      throw ArgumentError.value(
        shadowAtlasSize,
        'shadowAtlasSize',
        'must be > 0',
      );
    }
  }

  Map<String, Object?> toJson() => {
    'tier': tier.name,
    'hdrEnabled': hdrEnabled,
    'hdrFormat': hdrFormat.name,
    'msaaSamples': msaaSamples,
    'renderScale': renderScale,
    'maxVisibleLights': maxVisibleLights,
    'clusterDims': [clusterDimX, clusterDimY, clusterDimZ],
    'shadowDistance': shadowDistance,
    'shadowCascadeCount': shadowCascadeCount,
    'shadowSplitLambda': shadowSplitLambda,
    'shadowAtlasSize': shadowAtlasSize,
    'shadowResolutionTiers': shadowResolutionTiers,
  };

  factory RenderPipelineSettings.fromJson(Map<String, Object?> json) {
    final tierName = json['tier'] as String? ?? 'high';
    final tier = VrpQualityTier.values.firstWhere(
      (t) => t.name == tierName,
      orElse: () => VrpQualityTier.high,
    );
    final fmtName = json['hdrFormat'] as String? ?? 'rgba16f';
    final hdrFormat = VrpHdrFormat.values.firstWhere(
      (f) => f.name == fmtName,
      orElse: () => VrpHdrFormat.rgba16f,
    );
    final dims = json['clusterDims'] as List?;
    final resTiers = json['shadowResolutionTiers'] as List?;
    return RenderPipelineSettings(
      tier: tier,
      hdrEnabled: json['hdrEnabled'] as bool? ?? true,
      hdrFormat: hdrFormat,
      msaaSamples: (json['msaaSamples'] as num?)?.toInt() ?? 1,
      renderScale: (json['renderScale'] as num?)?.toDouble() ?? 1.0,
      maxVisibleLights: (json['maxVisibleLights'] as num?)?.toInt() ?? 256,
      clusterDimX: dims != null && dims.isNotEmpty
          ? (dims[0] as num).toInt()
          : 16,
      clusterDimY: dims != null && dims.length > 1
          ? (dims[1] as num).toInt()
          : 9,
      clusterDimZ: dims != null && dims.length > 2
          ? (dims[2] as num).toInt()
          : 24,
      shadowDistance: (json['shadowDistance'] as num?)?.toDouble() ?? 120.0,
      shadowCascadeCount: (json['shadowCascadeCount'] as num?)?.toInt() ?? 4,
      shadowSplitLambda:
          (json['shadowSplitLambda'] as num?)?.toDouble() ?? 0.65,
      shadowAtlasSize: (json['shadowAtlasSize'] as num?)?.toInt() ?? 2048,
      shadowResolutionTiers: resTiers != null
          ? [for (final v in resTiers) (v as num).toInt()]
          : const [256, 512, 1024, 2048],
    )..validate();
  }
}
