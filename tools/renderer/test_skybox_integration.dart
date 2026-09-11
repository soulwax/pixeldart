import 'package:pixeldart/pixeldart.dart';

void fail(String msg) => throw StateError('skybox integration: $msg');

void main() {
  const env1 = FrameEnvironment(
    clearColor: LinearColor(0.1, 0.1, 0.1),
    ambientIntensity: 0.5,
    directLightScale: 1.2,
  );

  // Test copyWith overrides
  final env2 = env1.copyWith(
    ambientIntensity: 0.8,
    reflectionIntensity: 1.5,
  );
  if (env2.ambientIntensity != 0.8) {
    fail('ambientIntensity was not updated in copyWith');
  }
  if (env2.reflectionIntensity != 1.5) {
    fail('reflectionIntensity was not updated in copyWith');
  }
  if (env2.directLightScale != 1.2) {
    fail('directLightScale should have been preserved');
  }
  if (env2.clearColor != const LinearColor(0.1, 0.1, 0.1)) {
    fail('clearColor should have been preserved');
  }

  // Test copyWith skybox
  const skybox = SkyboxDeclaration(
    assetId: 'sunset_sky',
    horizon: LinearColor(0.8, 0.4, 0.2),
    zenith: LinearColor(0.1, 0.2, 0.6),
    ground: LinearColor(0.05, 0.05, 0.05),
    horizonGlow: 0.2,
    starDensity: 0.01,
  );

  final envWithSky = env2.copyWith(skybox: skybox);
  if (envWithSky.skybox == null) {
    fail('skybox was not set in copyWith');
  }
  if (envWithSky.skybox!.assetId != 'sunset_sky') {
    fail('skybox assetId mismatch');
  }
  if (envWithSky.skybox!.horizonGlow != 0.2) {
    fail('skybox horizonGlow mismatch');
  }

  // Test clearing skybox with copyWith
  final envClearedSky = envWithSky.copyWith(skybox: null);
  if (envClearedSky.skybox != null) {
    fail('skybox was not cleared when passing null');
  }

  // Test directionalLight setting and clearing
  const dirLight = DirectionalLight(
    direction: Vec3(0, -1, 0),
    color: LinearColor.white,
    intensity: 2.0,
  );
  final envWithLight = env1.copyWith(directionalLight: dirLight);
  if (envWithLight.directionalLight == null) {
    fail('directionalLight was not set');
  }
  final envClearedLight = envWithLight.copyWith(directionalLight: null);
  if (envClearedLight.directionalLight != null) {
    fail('directionalLight was not cleared when passing null');
  }

  print('Skybox and FrameEnvironment integration tests passed.');
}
