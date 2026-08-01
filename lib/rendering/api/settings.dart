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

  /// The mandatory safe graph configuration (§6.1): `world opaque -> world
  /// transparent -> present`, no optional targets, no temporal history.
  static const RendererConfiguration safe = RendererConfiguration(
    profile: QualityProfile.safe,
    internalWidth: 384,
    internalHeight: 216,
    shadowMapCount: 0,
  );

  void validate() {
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
