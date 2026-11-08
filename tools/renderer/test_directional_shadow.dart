import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/math/bounds.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/passes/shadow.dart';

void main() {
  _testDirectionalShadowLightView();
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
