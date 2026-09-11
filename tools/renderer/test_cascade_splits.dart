import 'package:pixeldart/rendering/api/frame.dart';
import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/optics/cascade_splits.dart';

void main() {
  _testSplitDistances();
  _testCascadeBuilding();
  print('Cascade splits tests passed.');
}

void _testSplitDistances() {
  final distances = CascadeSplitCalculator.computeDistances(
    near: 0.1,
    far: 100.0,
    cascadeCount: 3,
    lambda: 0.8,
  );

  assert(distances.length == 4, '3 cascades requires 4 split boundary distances');
  assert((distances[0] - 0.1).abs() < 1e-5, 'first distance is near');
  assert((distances[3] - 100.0).abs() < 1e-5, 'last distance is far');

  // Verify strictly monotonic ordering
  for (var i = 0; i < distances.length - 1; i++) {
    assert(distances[i] < distances[i + 1], 'distances must be strictly increasing');
  }
}

void _testCascadeBuilding() {
  final camera = CameraView.look(
    eye: const Vec3(0, 2, 5),
    forward: const Vec3(0, 0, -1),
    fovYRadians: 1.0,
    aspect: 16.0 / 9.0,
    near: 0.1,
    far: 100.0,
  );

  const light = DirectionalLight(
    direction: Vec3(1, -2, 1),
    color: LinearColor.white,
  );

  final cascades = CascadeSplitCalculator.buildCascades(
    camera: camera,
    directionalLight: light,
    cascadeCount: 3,
  );

  assert(cascades.length == 3, 'generates 3 cascades');
  for (var i = 0; i < 3; i++) {
    final c = cascades[i];
    assert(c.index == i);
    assert(c.nearDistance < c.farDistance);
    assert(c.worldBounds.isValid);
    assert(c.lightView.viewProjection.m.every((v) => v.isFinite));
  }
}
