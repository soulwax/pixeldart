import 'package:pixeldart/rendering/geometry/primitives.dart';

void main() {
  _testCube();
  _testPlane();
  _testSphere();
  _testQuad();
  _testInvalidArguments();
  print('Primitives geometry tests passed.');
}

void _testCube() {
  final cube = Primitives.cube(size: 2.0);
  cube.validate();
  assert(cube.vertexCount == 24, 'cube should have 24 vertices (4 per face)');
  assert(cube.indices?.length == 36, 'cube should have 36 indices (6 per face)');
  assert(cube.localBounds.min.x == -1.0 && cube.localBounds.max.x == 1.0);
  assert(cube.localBounds.min.y == -1.0 && cube.localBounds.max.y == 1.0);
  assert(cube.localBounds.min.z == -1.0 && cube.localBounds.max.z == 1.0);
}

void _testPlane() {
  final plane = Primitives.plane(
    width: 10.0,
    depth: 20.0,
    subdivisionsX: 2,
    subdivisionsZ: 4,
  );
  plane.validate();
  assert(plane.vertexCount == (2 + 1) * (4 + 1), 'vertex count should match grid');
  assert(plane.indices?.length == 2 * 4 * 6, 'index count should match quads');
  assert(plane.localBounds.min.x == -5.0 && plane.localBounds.max.x == 5.0);
  assert(plane.localBounds.min.z == -10.0 && plane.localBounds.max.z == 10.0);
}

void _testSphere() {
  final sphere = Primitives.sphere(radius: 1.5, rings: 12, sectors: 24);
  sphere.validate();
  assert(sphere.vertexCount == (12 + 1) * (24 + 1));
  assert(sphere.indices?.length == 12 * 24 * 6);
  assert((sphere.localBounds.min.x - -1.5).abs() < 1e-5);
  assert((sphere.localBounds.max.x - 1.5).abs() < 1e-5);
}

void _testQuad() {
  final quad = Primitives.quad(width: 4.0, height: 3.0);
  quad.validate();
  assert(quad.vertexCount == 4);
  assert(quad.indices?.length == 6);
  assert(quad.localBounds.min.x == -2.0 && quad.localBounds.max.x == 2.0);
  assert(quad.localBounds.min.y == -1.5 && quad.localBounds.max.y == 1.5);
}

void _testInvalidArguments() {
  var threw = false;
  try {
    Primitives.cube(size: 0);
  } catch (e) {
    threw = true;
  }
  assert(threw, 'size <= 0 should throw');

  threw = false;
  try {
    Primitives.sphere(radius: -1);
  } catch (e) {
    threw = true;
  }
  assert(threw, 'radius <= 0 should throw');

  threw = false;
  try {
    Primitives.plane(width: 0, depth: 1);
  } catch (e) {
    threw = true;
  }
  assert(threw, 'width <= 0 should throw');
}
