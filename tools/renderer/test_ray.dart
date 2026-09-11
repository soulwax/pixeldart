import 'package:pixeldart/pixeldart.dart';

void fail(String msg) => throw StateError('test_ray: $msg');

void main() {
  _testAabbIntersection();
  _testSphereIntersection();
  _testPlaneIntersection();
  _testTriangleIntersection();
  _testCameraScreenPointToRay();
  _testSceneNodeRaycast();
  print('Raycasting and object picking tests passed.');
}

void _testAabbIntersection() {
  const box = Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1));

  // Frontal hit
  const ray1 = Ray(origin: Vec3(0, 0, 5), direction: Vec3(0, 0, -1));
  final d1 = ray1.intersectAabb(box);
  if (d1 == null || (d1 - 4.0).abs() > 1e-4) {
    fail('ray1 should hit front face at distance 4.0, got $d1');
  }

  // Hit from angle
  const ray2 = Ray(origin: Vec3(5, 5, 5), direction: Vec3(-0.57735, -0.57735, -0.57735));
  final d2 = ray2.intersectAabb(box);
  if (d2 == null) {
    fail('ray2 diagonal should hit box');
  }

  // Miss
  const rayMiss = Ray(origin: Vec3(0, 5, 5), direction: Vec3(0, 0, -1));
  final dMiss = rayMiss.intersectAabb(box);
  if (dMiss != null) {
    fail('rayMiss should not hit box, got $dMiss');
  }
}

void _testSphereIntersection() {
  const sphere = BoundingSphere(Vec3(0, 0, 0), 2.0);

  const ray = Ray(origin: Vec3(0, 0, 10), direction: Vec3(0, 0, -1));
  final d = ray.intersectSphere(sphere);
  if (d == null || (d - 8.0).abs() > 1e-4) {
    fail('ray should hit sphere at distance 8.0, got $d');
  }

  const rayMiss = Ray(origin: Vec3(3, 0, 10), direction: Vec3(0, 0, -1));
  if (rayMiss.intersectSphere(sphere) != null) {
    fail('rayMiss should not hit sphere');
  }
}

void _testPlaneIntersection() {
  // Plane Y = 0 (normal: (0, 1, 0), d = 0)
  const ray = Ray(origin: Vec3(0, 10, 0), direction: Vec3(0, -1, 0));
  final d = ray.intersectPlane(const Vec3(0, 1, 0), 0.0);
  if (d == null || (d - 10.0).abs() > 1e-4) {
    fail('ray should hit ground plane at distance 10.0, got $d');
  }
}

void _testTriangleIntersection() {
  const v0 = Vec3(-1, 0, 0);
  const v1 = Vec3(1, 0, 0);
  const v2 = Vec3(0, 2, 0);

  // Ray pointing at center (0, 0.5, 0) from (0, 0.5, 5)
  const rayHit = Ray(origin: Vec3(0, 0.5, 5), direction: Vec3(0, 0, -1));
  final dHit = rayHit.intersectTriangle(v0, v1, v2);
  if (dHit == null || (dHit - 5.0).abs() > 1e-4) {
    fail('rayHit should intersect triangle at distance 5.0, got $dHit');
  }

  // Ray pointing outside triangle
  const rayMiss = Ray(origin: Vec3(2, 0.5, 5), direction: Vec3(0, 0, -1));
  if (rayMiss.intersectTriangle(v0, v1, v2) != null) {
    fail('rayMiss should not intersect triangle');
  }
}

void _testCameraScreenPointToRay() {
  final cam = CameraView.look(
    eye: const Vec3(0, 0, 10),
    forward: const Vec3(0, 0, -1),
    fovYRadians: 1.0,
    aspect: 1.0,
    near: 0.1,
    far: 100.0,
  );

  // Center of 800x800 screen should produce a ray along forward direction (0, 0, -1)
  final centerRay = cam.screenPointToRay(400, 400, 800, 800);
  if ((centerRay.direction.z - (-1.0)).abs() > 1e-3) {
    fail('center screen ray should point along -Z, got ${centerRay.direction}');
  }
  if (centerRay.direction.x.abs() > 1e-3 || centerRay.direction.y.abs() > 1e-3) {
    fail('center screen ray should have near zero X/Y, got ${centerRay.direction}');
  }
}

void _testSceneNodeRaycast() {
  final root = SceneNode.group(name: 'root');
  root.add(
    name: 'box1',
    transform: Transform.at(const Vec3(0, 0, 0)),
    bounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
  );
  root.add(
    name: 'box2',
    transform: Transform.at(const Vec3(5, 0, 0)),
    bounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
  );

  // Ray hitting box1
  const ray1 = Ray(origin: Vec3(0, 0, 10), direction: Vec3(0, 0, -1));
  final hit1 = root.raycast(ray1);
  if (hit1 == null) {
    fail('root.raycast should hit box1');
    return;
  }
  if (hit1.node.name != 'box1') {
    fail('hit node should be box1, got ${hit1.node.name}');
  }
  if ((hit1.distance - 9.0).abs() > 1e-3) {
    fail('hit distance should be 9.0, got ${hit1.distance}');
  }

  // Ray hitting box2
  const ray2 = Ray(origin: Vec3(5, 0, 10), direction: Vec3(0, 0, -1));
  final hit2 = root.raycast(ray2);
  if (hit2 == null || hit2.node.name != 'box2') {
    fail('hit node should be box2, got ${hit2?.node.name}');
  }
}
