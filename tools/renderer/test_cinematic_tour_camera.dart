import 'package:pixeldart/rendering/camera/cinematic_tour_camera.dart';
import 'package:pixeldart/rendering/math/vec.dart';

void main() {
  _testInitialization();
  _testPlaybackAndLooping();
  _testNonLoopingClamp();
  _testFovInterpolation();
  _testToCameraView();
  _testInvalidArguments();
  _testFocusDistanceAndBreathing();
  print('Cinematic tour camera tests passed.');
}

void _testInitialization() {
  final waypoints = [
    const CameraWaypoint(eye: Vec3(0, 5, 10), target: Vec3(0, 0, 0), fovYRadians: 1.0),
    const CameraWaypoint(eye: Vec3(10, 5, 0), target: Vec3(0, 0, 0), fovYRadians: 0.8),
    const CameraWaypoint(eye: Vec3(0, 5, -10), target: Vec3(0, 0, 0), fovYRadians: 1.2),
  ];

  final controller = CinematicTourCameraController(
    waypoints: waypoints,
    duration: 10.0,
    loop: true,
  );

  assert(controller.progress == 0.0);
  assert((controller.eye - const Vec3(0, 5, 10)).length < 1e-4);
  assert((controller.target - const Vec3(0, 0, 0)).length < 1e-4);
  assert((controller.fovYRadians - 1.0).abs() < 1e-4);
  assert(controller.isPlaying);
}

void _testPlaybackAndLooping() {
  final waypoints = [
    const CameraWaypoint(eye: Vec3(0, 0, 10), target: Vec3(0, 0, 0)),
    const CameraWaypoint(eye: Vec3(10, 0, 0), target: Vec3(0, 0, 0)),
    const CameraWaypoint(eye: Vec3(0, 0, -10), target: Vec3(0, 0, 0)),
  ];

  final controller = CinematicTourCameraController(
    waypoints: waypoints,
    duration: 10.0,
    loop: true,
  );

  // Advance 5 seconds (halfway)
  controller.update(5.0);
  assert((controller.progress - 0.5).abs() < 1e-4);

  // Advance another 6 seconds (11 seconds total -> wrapped to 1s / 10s = 0.1)
  controller.update(6.0);
  assert((controller.progress - 0.1).abs() < 1e-4);

  // Test seek
  controller.seek(0.75);
  assert((controller.progress - 0.75).abs() < 1e-4);
}

void _testNonLoopingClamp() {
  final waypoints = [
    const CameraWaypoint(eye: Vec3(0, 0, 0), target: Vec3(1, 0, 0)),
    const CameraWaypoint(eye: Vec3(0, 10, 0), target: Vec3(1, 10, 0)),
  ];

  final controller = CinematicTourCameraController(
    waypoints: waypoints,
    duration: 5.0,
    loop: false,
  );

  controller.update(10.0);
  assert((controller.progress - 1.0).abs() < 1e-4);
  assert(!controller.isPlaying, 'controller should halt at end of non-looping path');
}

void _testFovInterpolation() {
  final waypoints = [
    const CameraWaypoint(eye: Vec3(0, 0, 0), target: Vec3(1, 0, 0), fovYRadians: 1.0),
    const CameraWaypoint(eye: Vec3(10, 0, 0), target: Vec3(11, 0, 0), fovYRadians: 0.5),
  ];

  final controller = CinematicTourCameraController(
    waypoints: waypoints,
    duration: 10.0,
    loop: false,
  );

  controller.seek(0.5);
  assert((controller.fovYRadians - 0.75).abs() < 1e-4);
}

void _testToCameraView() {
  final waypoints = [
    const CameraWaypoint(eye: Vec3(0, 2, 5), target: Vec3(0, 0, 0)),
    const CameraWaypoint(eye: Vec3(5, 2, 0), target: Vec3(0, 0, 0)),
  ];

  final controller = CinematicTourCameraController(
    waypoints: waypoints,
    duration: 5.0,
  );

  final view = controller.toCameraView(16.0 / 9.0);
  assert(view.view.m.every((v) => v.isFinite));
  assert(view.projection.m.every((v) => v.isFinite));
  assert(view.viewProjection.m.every((v) => v.isFinite));
}

void _testInvalidArguments() {
  var threw = false;
  try {
    CinematicTourCameraController(
      waypoints: [const CameraWaypoint(eye: Vec3(0, 0, 0), target: Vec3(1, 0, 0))],
    );
  } catch (_) {
    threw = true;
  }
  assert(threw, 'less than 2 waypoints must throw');

  threw = false;
  try {
    CinematicTourCameraController(
      waypoints: [
        const CameraWaypoint(eye: Vec3(0, 0, 0), target: Vec3(1, 0, 0)),
        const CameraWaypoint(eye: Vec3(1, 0, 0), target: Vec3(2, 0, 0)),
      ],
      duration: 0,
    );
  } catch (_) {
    threw = true;
  }
  assert(threw, 'non-positive duration must throw');
}

void _testFocusDistanceAndBreathing() {
  final waypoints = [
    const CameraWaypoint(eye: Vec3(0, 0, 10), target: Vec3(0, 0, 0)),
    const CameraWaypoint(eye: Vec3(0, 0, 20), target: Vec3(0, 0, 0)),
  ];

  final controller = CinematicTourCameraController(
    waypoints: waypoints,
    duration: 10.0,
    breathingAmplitude: 0.1,
    breathingSpeed: 2.0,
  );

  assert((controller.focusDistance - 10.0).abs() < 0.2);
  controller.update(5.0);
  assert((controller.focusDistance - 15.0).abs() < 0.3);
}
