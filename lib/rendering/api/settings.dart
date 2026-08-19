import 'capabilities.dart';

/// Distinguishes CSS logical size, drawing-buffer pixel size, DPR, and
/// surface visibility (§7.3). `resize()` accepts 1x1 and defers a
/// zero-sized hidden surface rather than creating a zero-sized target.
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

  /// Builds metrics from a CSS-pixel size and a device pixel ratio.
  ///
  /// The backing-store size is derived rather than supplied, which is the
  /// point: the four-field constructor invites `pixelWidth: cssWidth`, and
  /// that renders at 1x on every HiDPI display while reporting success. Pass
  /// the canvas's CSS size and `window.devicePixelRatio` and the backing store
  /// follows automatically.
  ///
  /// [maxDevicePixelRatio] caps the backing store on very high-density
  /// displays, where a literal 3x buffer costs 9x the fill for little visible
  /// gain. The cap applies to allocation only; the reported
  /// [devicePixelRatio] is the capped value actually used, so a host reading
  /// it back sees what was allocated.
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

  /// A 1:1 surface where CSS pixels and backing-store pixels coincide.
  ///
  /// The right choice for offscreen rendering, tests, and capture harnesses
  /// that have a pixel budget and no display to match.
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

  /// This surface at a new CSS size, keeping the ratio and visibility.
  ///
  /// The shape a resize handler wants: one call, no chance of updating the CSS
  /// size and forgetting the backing store.
  SurfaceMetrics resized({required int cssWidth, required int cssHeight}) =>
      SurfaceMetrics.forCanvas(
        cssWidth: cssWidth,
        cssHeight: cssHeight,
        devicePixelRatio: devicePixelRatio,
        maxDevicePixelRatio: devicePixelRatio,
        visible: visible,
      );

  /// This surface with a new visibility, for hosts pausing on tab blur.
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

/// Values that may require programs or targets (§5.1). Changing this is an
/// explicit asynchronous transition outside a frame via `configure()`;
/// per-frame weights in [PostProcessState] never trigger a graph rebuild.
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
  };

  /// The mandatory safe graph configuration (§6.1): `world opaque -> world
  /// transparent -> present`, no optional targets, no temporal history.
  static const RendererConfiguration safe = RendererConfiguration(
    profile: QualityProfile.safe,
    internalWidth: 384,
    internalHeight: 216,
    shadowMapCount: 0,
  );

  void validate() {
    profile.validate();
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
