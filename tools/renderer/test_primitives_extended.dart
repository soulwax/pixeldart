import 'package:pixeldart/rendering/geometry/primitives.dart';

void main() {
  _testCylinder();
  _testCone();
  _testTorus();
  _testCapsule();
  _testInvalidArguments();
  print('Extended primitives geometry tests passed.');
}

void _testCylinder() {
  final cyl = Primitives.cylinder(radius: 1.0, height: 2.0, radialSegments: 16, capped: true);
  cyl.validate();
  assert(cyl.vertexCount > 0);
  assert(cyl.indices != null && cyl.indices!.isNotEmpty);
  assert((cyl.localBounds.min.x - -1.0).abs() < 1e-5);
  assert((cyl.localBounds.max.x - 1.0).abs() < 1e-5);
  assert((cyl.localBounds.min.y - -1.0).abs() < 1e-5);
  assert((cyl.localBounds.max.y - 1.0).abs() < 1e-5);

  final uncapped = Primitives.cylinder(radius: 0.5, height: 1.0, radialSegments: 12, capped: false);
  uncapped.validate();
  assert(uncapped.vertexCount < cyl.vertexCount);
}

void _testCone() {
  final cone = Primitives.cone(radius: 1.5, height: 3.0, radialSegments: 12, capped: true);
  cone.validate();
  assert(cone.vertexCount > 0);
  assert(cone.indices != null && cone.indices!.isNotEmpty);
  assert((cone.localBounds.min.x - -1.5).abs() < 1e-5);
  assert((cone.localBounds.max.x - 1.5).abs() < 1e-5);
  assert((cone.localBounds.min.y - -1.5).abs() < 1e-5);
  assert((cone.localBounds.max.y - 1.5).abs() < 1e-5);

  final uncapped = Primitives.cone(radius: 1.0, height: 2.0, radialSegments: 8, capped: false);
  uncapped.validate();
  assert(uncapped.vertexCount < cone.vertexCount);
}

void _testTorus() {
  final torus = Primitives.torus(radius: 1.0, tubeRadius: 0.25, radialSegments: 16, tubularSegments: 32);
  torus.validate();
  assert(torus.vertexCount == (16 + 1) * (32 + 1));
  assert(torus.indices != null && torus.indices!.length == 16 * 32 * 6);
  assert((torus.localBounds.min.x - -1.25).abs() < 1e-5);
  assert((torus.localBounds.max.x - 1.25).abs() < 1e-5);
  assert((torus.localBounds.min.y - -0.25).abs() < 1e-5);
  assert((torus.localBounds.max.y - 0.25).abs() < 1e-5);
}

void _testCapsule() {
  final capsule = Primitives.capsule(radius: 0.5, cylinderHeight: 1.0, rings: 6, sectors: 12);
  capsule.validate();
  assert(capsule.vertexCount > 0);
  assert(capsule.indices != null && capsule.indices!.isNotEmpty);
  final expectedTotalH = 1.0 * 0.5 + 0.5; // halfH + radius = 1.0
  assert((capsule.localBounds.min.y - -expectedTotalH).abs() < 1e-5);
  assert((capsule.localBounds.max.y - expectedTotalH).abs() < 1e-5);
}

void _testInvalidArguments() {
  bool threw = false;
  try {
    Primitives.cylinder(radius: -1);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'cylinder invalid radius');

  threw = false;
  try {
    Primitives.cone(radialSegments: 2);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'cone invalid segments');

  threw = false;
  try {
    Primitives.torus(radius: 0);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'torus invalid radius');

  threw = false;
  try {
    Primitives.capsule(rings: 1);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'capsule invalid rings');
}
