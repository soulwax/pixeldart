import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';

void fail(String msg) => throw StateError('test_fly_camera: $msg');

void main() {
  _testOrientationVectors();
  _testMovement();
  _testLookAndPitchClamp();
  _testCameraViewGeneration();
  print('Fly camera controller tests passed.');
}

void _testOrientationVectors() {
  final cam = FlyCameraController(
    position: const Vec3(0, 2, 0),
    yawRadians: 0.0,
    pitchRadians: 0.0,
  );

  // At yaw = 0, pitch = 0, forward is (0, 0, -1)
  final fwd = cam.forward;
  if ((fwd.x).abs() > 1e-5 || (fwd.y).abs() > 1e-5 || (fwd.z - (-1.0)).abs() > 1e-5) {
    fail('forward vector at yaw=0, pitch=0 should be (0, 0, -1), got $fwd');
  }

  // Right should be orthogonal to forward and world Up: (1, 0, 0)
  final rgt = cam.right;
  if ((rgt.x - 1.0).abs() > 1e-5 || (rgt.y).abs() > 1e-5 || (rgt.z).abs() > 1e-5) {
    fail('right vector should be (1, 0, 0), got $rgt');
  }

  // Up should be orthogonal to right and forward: (0, 1, 0)
  final up = cam.up;
  if ((up.x).abs() > 1e-5 || (up.y - 1.0).abs() > 1e-5 || (up.z).abs() > 1e-5) {
    fail('up vector should be (0, 1, 0), got $up');
  }
}

void _testMovement() {
  final cam = FlyCameraController(
    position: const Vec3(0, 0, 0),
    moveSpeed: 10.0,
  );

  cam.moveForward(1.0);
  if ((cam.position.z - (-10.0)).abs() > 1e-4) {
    fail('moving forward by 1s at speed 10 should translate to z=-10, got ${cam.position}');
  }

  cam.strafeRight(0.5);
  if ((cam.position.x - 5.0).abs() > 1e-4) {
    fail('strafing right by 0.5s at speed 10 should translate to x=5, got ${cam.position}');
  }

  cam.moveUp(1.0);
  if ((cam.position.y - 10.0).abs() > 1e-4) {
    fail('moving up by 1s at speed 10 should translate to y=10, got ${cam.position}');
  }

  // Test continuous intent update
  cam.position = Vec3.zero;
  cam.setMovementIntent(forward: 1.0);
  cam.update(0.1);
  if (cam.position.z >= 0) {
    fail('forward intent should move position along negative Z');
  }
}

void _testLookAndPitchClamp() {
  final cam = FlyCameraController();

  cam.look(0.5, 0.2);
  if ((cam.yawRadians - 0.5).abs() > 1e-5) {
    fail('yawRadians should be 0.5, got ${cam.yawRadians}');
  }

  // Pitch clamp test (cannot look straight up past ~88 degrees)
  cam.look(0.0, 10.0);
  if (cam.pitchRadians.abs() >= math.pi * 0.5) {
    fail('pitchRadians must not exceed pi/2');
  }
}

void _testCameraViewGeneration() {
  final cam = FlyCameraController(position: const Vec3(0, 5, 10));
  final view = cam.toCameraView(16 / 9);

  view.validate();
  if ((view.eye - const Vec3(0, 5, 10)).lengthSquared > 1e-5) {
    fail('CameraView eye must match controller position');
  }
  if ((view.aspect - (16 / 9)).abs() > 1e-5) {
    fail('CameraView aspect must match input aspect');
  }
}
