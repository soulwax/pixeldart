import 'package:pixeldart/rendering/api/settings.dart';
import 'package:pixeldart/rendering/passes/present.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  final linear = PresentOutputPolicy.encodeLinearColor(
    const [0, 1, 4],
    exposure: 2,
    encoding: ColorEncoding.linear,
  );
  require(
    linear[0] == 0 &&
        (linear[1] - 2 / 3).abs() < 1e-12 &&
        (linear[2] - 8 / 9).abs() < 1e-12,
    'linear tone-map ramp is not deterministic: $linear',
  );

  final srgb = PresentOutputPolicy.encodeLinearColor(const [
    0,
    1,
    4,
  ], exposure: 2);
  require(
    srgb[0] == 0 &&
        (srgb[1] - 0.8360069706715786).abs() < 1e-12 &&
        (srgb[2] - 0.9494744828080542).abs() < 1e-12,
    'sRGB tone-map ramp is not deterministic: $srgb',
  );
  require(
    PresentOutputPolicy.encodingUniform(ColorEncoding.linear) == 0 &&
        PresentOutputPolicy.encodingUniform(ColorEncoding.srgb) == 1,
    'encoding uniform mapping changed',
  );
  require(
    PresentOutputPolicy.encodeLinearColor(const [
          -1,
        ], encoding: ColorEncoding.linear).single ==
        0,
    'negative HDR input must clamp before tone mapping',
  );
  print('Renderer output-encoding/color-ramp fixtures passed.');
}
