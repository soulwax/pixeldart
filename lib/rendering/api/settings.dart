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
  };

  RendererConfiguration withShaderOverrides(
    Map<ShaderSlot, ShaderOverride> overrides,
  ) => RendererConfiguration(
    profile: profile,
    internalWidth: internalWidth,
    internalHeight: internalHeight,
    sampleCount: sampleCount,
    outputEncoding: outputEncoding,
    shadowMapCount: shadowMapCount,
    shadowMapSize: shadowMapSize,
    materialTableCapacity: materialTableCapacity,
    lightTableCapacity: lightTableCapacity,
    textureArrayLayerCapacity: textureArrayLayerCapacity,
    diagnosticLevel: diagnosticLevel,
    shaderOverrides: Map.unmodifiable(overrides),
  );

  RendererConfiguration withSampleCount(int samples) => RendererConfiguration(
    profile: profile,
    internalWidth: internalWidth,
    internalHeight: internalHeight,
    sampleCount: samples,
    outputEncoding: outputEncoding,
    shadowMapCount: shadowMapCount,
    shadowMapSize: shadowMapSize,
    materialTableCapacity: materialTableCapacity,
    lightTableCapacity: lightTableCapacity,
    textureArrayLayerCapacity: textureArrayLayerCapacity,
    diagnosticLevel: diagnosticLevel,
    shaderOverrides: shaderOverrides,
  );

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
