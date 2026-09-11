import 'dart:math' as math;
import 'package:pixeldart/pixeldart.dart';

void main() {
  _testInitialPlacement();
  _testTrackingConvergence();
  _testOrbitAndZoom();
  _testNodeTracking();
  print('Smooth follow camera tests passed.');
}

void _testInitialPlacement() {
  final target = const Vec3(10, 0, 5);
  final ctrl = SmoothFollowCameraController(
    targetPosition: target,
    distance: 6.0,
    height: 2.0,
    positionDamping: 5.0,
  );

  // Before first update, eye should be default or initial
  assert(ctrl.eye.isFinite);

  // First update snaps directly to initial desired location without damping lag
  ctrl.update(0.016);
  assert(ctrl.eye.isFinite);
  assert(ctrl.forward.isFinite);
  assert((ctrl.forward.length - 1.0).abs() < 1e-3);

  final view = ctrl.toCameraView(16 / 9);
  assert(view.eye == ctrl.eye);
  assert(view.aspect == 16 / 9);
  assert(view.view.isFinite);
  assert(view.projection.isFinite);
  assert(view.viewProjection.isFinite);
}

void _testTrackingConvergence() {
  final ctrl = SmoothFollowCameraController(
    targetPosition: Vec3.zero,
    distance: 5.0,
    height: 0.0,
    positionDamping: 4.0,
  );
  ctrl.update(0.016); // initialize

  // Target jumps far away
  ctrl.targetPosition = const Vec3(100, 0, 0);

  final initialEyeX = ctrl.eye.x;
  // Step simulation 0.1s
  ctrl.update(0.1);
  final steppedEyeX = ctrl.eye.x;

  // Damping should move eye towards target (increasing X) smoothly
  assert(steppedEyeX > initialEyeX, 'Eye should move towards target');
  assert(steppedEyeX < 100, 'Damping prevents teleportation in a single frame');

  // After many frames, it converges
  for (var i = 0; i < 100; i++) {
    ctrl.update(0.1);
  }
  assert((ctrl.eye.x - 100.0).abs() < 5.5, 'Eye should converge to follow distance');
}

void _testOrbitAndZoom() {
  final ctrl = SmoothFollowCameraController(
    targetPosition: Vec3.zero,
    distance: 10.0,
  );
  ctrl.update(0.016);

  final initialDistance = ctrl.distance;
  ctrl.zoom(-3.0);
  assert(ctrl.distance == initialDistance - 3.0);

  // Test zoom clamping
  ctrl.zoom(-50.0);
  assert(ctrl.distance == 1.5, 'Distance should clamp to minimum');

  ctrl.zoom(100.0);
  assert(ctrl.distance == 40.0, 'Distance should clamp to maximum');

  // Test orbit azimuth & elevation clamping
  ctrl.orbit(0.5, 0.2);
  assert(ctrl.azimuthOffset == 0.5);

  ctrl.orbit(0.0, 5.0);
  assert(ctrl.elevationOffset <= math.pi * 0.40, 'Elevation clamped to upper bound');

  ctrl.orbit(0.0, -10.0);
  assert(ctrl.elevationOffset >= -math.pi * 0.35, 'Elevation clamped to lower bound');
}

void _testNodeTracking() {
  final node = SceneNode(name: 'target_entity');
  node.position = const Vec3(5, 10, -15);

  final ctrl = SmoothFollowCameraController(
    targetNode: node,
    distance: 4.0,
  );
  ctrl.update(0.016);

  // Move node
  node.position = const Vec3(20, 10, -15);

  ctrl.update(0.05);
  // Forward vector should point in the direction of the node
  final forward = ctrl.forward;
  assert(forward.isFinite);
  assert((forward.length - 1.0).abs() < 1e-3);
}
