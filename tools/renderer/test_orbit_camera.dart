import 'dart:math' as math;

import 'package:pixeldart/rendering/camera/orbit_camera.dart';
import 'package:pixeldart/rendering/math/vec.dart';

void main() {
  _testOrbitCameraConstruction();
  _testRotationAndClamping();
  _testZoomClamping();
  _testPan();
  _testCameraViewGeneration();
  print('Orbit camera tests passed.');
}

void _testOrbitCameraConstruction() {
  final cam = OrbitCameraController(
    target: const Vec3(0, 1, 0),
    distance: 10.0,
    azimuthRadians: 0.0,
    elevationRadians: 0.0,
  );

  final eye = cam.eye;
  assert((eye.x - 0.0).abs() < 1e-5);
  assert((eye.y - 1.0).abs() < 1e-5);
  assert((eye.z - 10.0).abs() < 1e-5);

  final fwd = cam.forward;
  assert((fwd.x - 0.0).abs() < 1e-5);
  assert((fwd.y - 0.0).abs() < 1e-5);
  assert((fwd.z - -1.0).abs() < 1e-5);
}

void _testRotationAndClamping() {
  final cam = OrbitCameraController(
    elevationRadians: 0.0,
    minElevation: -math.pi * 0.4,
    maxElevation: math.pi * 0.4,
  );

  cam.rotate(0.5, 2.0); // elevation should clamp to maxElevation
  cam.update(1.0); // apply damping instantly

  assert(cam.elevationRadians <= math.pi * 0.4 + 1e-5);
}

void _testZoomClamping() {
  final cam = OrbitCameraController(
    distance: 5.0,
    minDistance: 1.0,
    maxDistance: 10.0,
  );

  cam.zoom(-10.0); // should clamp to minDistance
  cam.update(1.0);
  assert(cam.distance >= 1.0 - 1e-5);

  cam.zoom(50.0); // should clamp to maxDistance
  cam.update(1.0);
  assert(cam.distance <= 10.0 + 1e-5);
}

void _testPan() {
  final cam = OrbitCameraController(
    target: const Vec3(0, 0, 0),
    distance: 5.0,
    azimuthRadians: 0.0,
    elevationRadians: 0.0,
  );

  cam.pan(2.0, 3.0);
  cam.update(1.0);

  // When azimuth=0 and elevation=0, forward is (0, 0, -1), right is (1, 0, 0), up is (0, 1, 0)
  assert((cam.target.x - 2.0).abs() < 0.1);
  assert((cam.target.y - 3.0).abs() < 0.1);
}

void _testCameraViewGeneration() {
  final cam = OrbitCameraController(
    target: const Vec3(0, 0, 0),
    distance: 4.0,
  );
  final view = cam.toCameraView(16.0 / 9.0);
  view.validate();
  assert(view.aspect == 16.0 / 9.0);
  assert(view.near == 0.1);
  assert(view.far == 200.0);
}
