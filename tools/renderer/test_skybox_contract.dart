import '../../lib/rendering/api/frame.dart';
import '../../lib/rendering/api/lights.dart';
import '../../lib/rendering/passes/present.dart';

void fail(String message) => throw StateError('skybox contract: $message');

void main() {
  const declaration = SkyboxDeclaration(
    assetId: 'main-atmosphere-v1',
    horizon: LinearColor(0.12, 0.16, 0.22),
    zenith: LinearColor(0.20, 0.25, 0.34),
    ground: LinearColor(0.04, 0.05, 0.07),
    rotationRadians: 0.45,
    exposure: 1.1,
    textureIsSrgb: true,
  );
  declaration.validate();

  try {
    const SkyboxDeclaration(
      assetId: 'invalid',
      horizon: LinearColor.black,
      zenith: LinearColor.white,
      ground: LinearColor.black,
      exposure: 0,
    ).validate();
    fail('zero exposure was accepted');
  } on ArgumentError {
    // Expected: an image-backed sky must not silently erase its exposure.
  }

  final source = PresentProgramSource.build(
    vertexSource: 'vertex',
    fragmentSource: 'fragment',
  );
  for (final uniform in const [
    'uSkyTexture',
    'uSkyTextureEnabled',
    'uSkyRotation',
    'uSkyExposure',
    'uSkyTextureSrgb',
    'uInverseProjection',
    'uInverseView',
  ]) {
    if (!source.requiredUniforms.contains(uniform)) {
      fail('presentation contract omits $uniform');
    }
  }
  if (source.samplerUnits['uSkyTexture'] != 1) {
    fail('sky texture must use sampler unit 1');
  }
  print(
    'Renderer skybox declaration and equirectangular sampling contract passed.',
  );
}
