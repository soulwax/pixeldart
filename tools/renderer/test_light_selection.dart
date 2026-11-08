import 'package:pixeldart/rendering/rendering.dart';

void main() {
  const caster = SpotLight(
    id: 99,
    position: Vec3(0, 0, 1),
    direction: Vec3(0, -1, 0),
    color: LinearColor.white,
    intensity: 5,
    range: 8,
  );
  const lights = [
    caster,
    SpotLight(
      id: 20,
      position: Vec3(0, 0, 2),
      direction: Vec3(0, -1, 0),
      color: LinearColor.white,
      intensity: 1,
      range: 3,
    ),
    SpotLight(
      id: 4,
      position: Vec3(0, 0, 2),
      direction: Vec3(0, -1, 0),
      color: LinearColor.white,
      intensity: 1,
      range: 3,
    ),
    SpotLight(
      id: 30,
      position: Vec3(10, 0, 0),
      direction: Vec3(0, -1, 0),
      color: LinearColor.white,
      intensity: 0.2,
      range: 1,
    ),
    SpotLight(
      id: 5,
      position: Vec3(0, 0, 0.5),
      direction: Vec3(0, -1, 0),
      color: LinearColor.white,
      intensity: 2,
      range: 4,
    ),
  ];
  final selected = selectSpotLights(
    lights: lights,
    referencePosition: Vec3.zero,
    shadowCaster: caster,
    limit: 3,
  );
  final ids = selected.map((light) => light.id).toList();
  if (ids.length != 3 || ids[0] != 5 || ids[1] != 4 || ids[2] != 20) {
    throw StateError('unexpected influence order: $ids');
  }
  final tied = selectSpotLights(
    lights: [lights[2], lights[1]],
    referencePosition: Vec3.zero,
    limit: 2,
  );
  if (tied.map((light) => light.id).join(',') != '4,20') {
    throw StateError('stable ID tie-break failed: ${tied.map((l) => l.id)}');
  }
  var rejected = false;
  try {
    selectSpotLights(lights: lights, referencePosition: Vec3.zero, limit: -1);
  } catch (error) {
    rejected = error is ArgumentError;
  }
  if (!rejected) throw StateError('negative selection limit was accepted');
  print('Renderer light-selection fixtures passed.');
}
