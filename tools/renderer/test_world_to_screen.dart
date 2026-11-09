import 'package:pixeldart/pixeldart.dart';

/// `worldToScreenPoint` must invert `screenPointToRay`: the ray through the
/// projected pixel passes through the original point, for perspective and
/// orthographic cameras alike.
void main() {
  const width = 1280, height = 720;
  final cameras = {
    'perspective': CameraView.look(
      eye: const Vec3(3, 40, 70),
      forward: const Vec3(-0.1, -0.6, -1),
      fovYRadians: 0.9,
      aspect: width / height,
      near: 0.1,
      far: 600,
    ),
    'orthographic': CameraView.orthographic(
      eye: const Vec3(0, 20, 0),
      forward: const Vec3(0, -1, -0.2),
      halfWidth: 16,
      halfHeight: 9,
      near: 0.1,
      far: 100,
    ),
  };
  const points = [Vec3(0, 0, 0), Vec3(5, 1, -3), Vec3(-7, 0.5, 4), Vec3(2, -1, 8)];

  for (final MapEntry(key: name, value: camera) in cameras.entries) {
    for (final point in points) {
      final screen = camera.worldToScreenPoint(point, width, height);
      assert(screen != null, '$name: $point should be in front of the camera');
      final ray = camera.screenPointToRay(screen!.x, screen.y, width, height);
      // Distance from the point to the ray's line; matrices are Float32, so
      // allow error in proportion to the distance.
      final toPoint = point - ray.origin;
      final along = toPoint.dot(ray.direction);
      final miss = (toPoint - ray.direction * along).length;
      assert(miss < 1e-4 * (1 + toPoint.length), '$name: ray through $screen misses $point by $miss');
    }
  }

  // The view centre projects to the viewport centre.
  final perspective = cameras['perspective']!;
  final ahead = perspective.eye + perspective.forward * 50;
  final centre = perspective.worldToScreenPoint(ahead, width, height)!;
  assert((centre.x - width / 2).abs() < 1e-2 && (centre.y - height / 2).abs() < 1e-2, 'centre maps to $centre');

  // Up in the world is up on the screen (smaller y), right is right.
  final above = perspective.worldToScreenPoint(ahead + const Vec3(0, 5, 0), width, height)!;
  assert(above.y < centre.y, 'world up must be screen up');
  final right = perspective.forward.cross(const Vec3(0, 1, 0)).normalized;
  final toRight = perspective.worldToScreenPoint(ahead + right * 5, width, height)!;
  assert(toRight.x > centre.x, 'camera right must be screen right');

  // Behind the camera there is no screen position.
  final behind = perspective.eye - perspective.forward * 10;
  assert(perspective.worldToScreenPoint(behind, width, height) == null, 'points behind the camera return null');

  print('World-to-screen fixtures passed.');
}
