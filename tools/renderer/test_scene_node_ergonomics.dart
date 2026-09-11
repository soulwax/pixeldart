import 'dart:math' as math;

import 'package:pixeldart/rendering/camera/orbit_camera.dart';
import 'package:pixeldart/rendering/math/quat.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/scene/scene_node.dart';

void main() {
  _testQuatFromTo();
  _testSceneNodeErgonomics();
  _testOrbitCameraEnhancements();
  print('Scene node ergonomics tests passed.');
}

void _testQuatFromTo() {
  final qIdentity = Quat.fromTo(const Vec3(1, 0, 0), const Vec3(1, 0, 0));
  assert((qIdentity.w - 1.0).abs() < 1e-5);

  final q90 = Quat.fromTo(const Vec3(1, 0, 0), const Vec3(0, 1, 0));
  final rotated = q90.rotate(const Vec3(1, 0, 0));
  assert((rotated.x - 0.0).abs() < 1e-5);
  assert((rotated.y - 1.0).abs() < 1e-5);

  final qOpposite = Quat.fromTo(const Vec3(0, 0, 1), const Vec3(0, 0, -1));
  final rotOpp = qOpposite.rotate(const Vec3(0, 0, 1));
  assert((rotOpp.z - -1.0).abs() < 1e-5);
}

void _testSceneNodeErgonomics() {
  final root = SceneNode.group(name: 'root');
  final body = root.add(name: 'body');
  final head = body.add(name: 'head');
  final leftArm = body.add(name: 'arm_left');
  final rightArm = body.add(name: 'arm_right');

  // Fluent translation
  body.translate(const Vec3(0, 2, 0));
  assert(body.position == const Vec3(0, 2, 0));

  // Fluent rotation
  body.rotateY(math.pi * 0.5);
  final fwd = body.rotation.rotate(const Vec3(0, 0, 1));
  assert((fwd.x - 1.0).abs() < 1e-5);

  // Fluent scale
  body.scaleBy(2.0);
  assert(body.scale == 2.0);

  // lookAt
  head.lookAt(const Vec3(0, 2, 10));
  assert(head.rotation != Quat.identity);

  // findByName
  final foundHead = root.findByName('head');
  assert(identical(foundHead, head));
  final foundArm = root.findByName('arm_right');
  assert(identical(foundArm, rightArm));
  assert(root.findByName('missing') == null);

  // traverse
  final visitedNames = <String>[];
  root.traverse((node) {
    if (node.name != null) visitedNames.add(node.name!);
  });
  assert(visitedNames.length == 5);
  assert(visitedNames.contains('root'));
  assert(visitedNames.contains('head'));
  assert(visitedNames.contains('arm_left'));
}

void _testOrbitCameraEnhancements() {
  final cam = OrbitCameraController(
    target: const Vec3(0, 0, 0),
    distance: 10.0,
    autoRotate: true,
    autoRotateSpeed: 1.0,
  );

  final initialAzimuth = cam.azimuthRadians;
  cam.update(0.1);
  assert(cam.azimuthRadians > initialAzimuth, 'autoRotate must advance azimuth');

  cam.trackTarget(const Vec3(5, 5, 5), snap: true);
  assert(cam.target == const Vec3(5, 5, 5));
}
