import 'dart:typed_data';

/// Built-in fallback pixel data (§5.3): missing optional art cannot make
/// geometry disappear. Each is a single-texel RGBA8 payload; the backend
/// uploads it as a 1x1 texture and samplers read it until a real asset
/// publishes.
final class FallbackPixels {
  static final Uint8List whiteAlbedo = Uint8List.fromList([255, 255, 255, 255]);
  static final Uint8List flatNormal = Uint8List.fromList([128, 128, 255, 255]);
  static final Uint8List blackEmissive = Uint8List.fromList([0, 0, 0, 255]);
  static final Uint8List whiteAo = Uint8List.fromList([255, 255, 255, 255]);
  static final Uint8List identityLutMarker = Uint8List.fromList([
    255,
    255,
    255,
    255,
  ]);
  static final Uint8List neutralNoise = Uint8List.fromList([
    128,
    128,
    128,
    255,
  ]);
}
