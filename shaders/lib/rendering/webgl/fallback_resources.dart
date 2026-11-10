import 'dart:typed_data';

final class FallbackPixels {
  static final Uint8List whiteAlbedo = Uint8List.fromList([255, 255, 255, 255]);
  static final Uint8List flatNormal = Uint8List.fromList([128, 128, 255, 255]);
  static final Uint8List neutralEmissive = Uint8List.fromList([255, 255, 255, 255]);
  static final Uint8List whiteAo = Uint8List.fromList([255, 255, 255, 255]);

  static final Uint8List identityOrm = Uint8List.fromList([255, 255, 255, 255]);
  static final Uint8List neutralLightmap = Uint8List.fromList([
    255,
    255,
    255,
    255,
  ]);
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
