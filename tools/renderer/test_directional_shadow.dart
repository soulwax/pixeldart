import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/math/bounds.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/passes/shadow.dart';
import 'package:pixeldart/rendering/webgl/state_cache.dart';

void main() {
  _testDirectionalShadowLightView();
  _testMultiCasterViews();
  _testShadowResolutionPolicy();
  _testFrontFaceCullingState();
  print('Directional shadow light view tests passed.');
}

void _testDirectionalShadowLightView() {
  const light = DirectionalLight(
    direction: Vec3(1, -2, 1),
    color: LinearColor.white,
    intensity: 1.5,
  );

  const bounds = Aabb(Vec3(-10, 0, -10), Vec3(10, 4, 10));
  final lightView = ShadowLightView.fromDirectionalLight(
    light: light,
    bounds: bounds,
  );

  final vp = lightView.viewProjection;
  assert(vp.m.every((v) => v.isFinite), 'viewProjection must be finite');

  // Center of the bounding box should project near the center of light clip space
  final centerClip = vp.transformPoint(bounds.center);
  assert(centerClip.x.abs() < 1.0, 'center within X clip');
  assert(centerClip.y.abs() < 1.0, 'center within Y clip');
  assert(centerClip.z.abs() <= 1.0, 'center within Z clip');

  // Extremities should project within or close to normalized device coordinates
  final minClip = vp.transformPoint(bounds.min);
  final maxClip = vp.transformPoint(bounds.max);
  assert(minClip.x.abs() <= 1.05 && minClip.y.abs() <= 1.05);
  assert(maxClip.x.abs() <= 1.05 && maxClip.y.abs() <= 1.05);
}

void _testMultiCasterViews() {
  const dirLight = DirectionalLight(
    direction: Vec3(0, -1, 0),
    color: LinearColor.white,
    intensity: 1.0,
  );
  const spot1 = SpotLight(
    id: 1,
    position: Vec3(0, 5, 0),
    direction: Vec3(0, -1, 0),
    color: LinearColor.white,
    castsShadow: true,
  );
  const spot2 = SpotLight(
    id: 2,
    position: Vec3(2, 5, 2),
    direction: Vec3(-1, -1, 0),
    color: LinearColor.white,
    castsShadow: true,
  );
  const spotNoShadow = SpotLight(
    id: 3,
    position: Vec3(0, 5, 0),
    direction: Vec3(0, -1, 0),
    color: LinearColor.white,
    castsShadow: false,
  );

  const bounds = Aabb(Vec3(-5, 0, -5), Vec3(5, 5, 5));
  final multi = ShadowLightView.computeMultiCasterViews(
    directionalLight: dirLight,
    spotLights: [spot1, spot2, spotNoShadow],
    sceneBounds: bounds,
    maxCasters: 3,
  );

  assert(multi.length == 3, 'directional + 2 shadow-casting spots');
  for (final v in multi) {
    assert(v.viewProjection.m.every((x) => x.isFinite));
  }
}

void _testShadowResolutionPolicy() {
  final resHigh = ShadowLightView.resolveShadowResolution(
    maxTextureSize: 4096,
    requestedSize: 1024,
    highQuality: true,
  );
  assert(resHigh == 1024);

  final resLow = ShadowLightView.resolveShadowResolution(
    maxTextureSize: 4096,
    requestedSize: 1024,
    highQuality: false,
  );
  assert(resLow == 512);

  final resClamped = ShadowLightView.resolveShadowResolution(
    maxTextureSize: 256,
    requestedSize: 1024,
    highQuality: true,
  );
  assert(resClamped == 256);
}

void _testFrontFaceCullingState() {
  const defaultState = DrawStateDescriptor();
  assert(defaultState.cullFace == CullFace.back);

  final frontCullState = defaultState.withCullFace(CullFace.front);
  assert(frontCullState.cullFace == CullFace.front);
  assert(frontCullState.cullEnable == true);
}
