import 'dart:io';

import 'package:pixeldart/pixeldart.dart';

// Orthographic CameraView and OrthoCameraController: axes, winding, parallel
// picking rays, fit-to-bounds and edge clamping.

void check(bool condition, String message) {
  if (!condition) throw StateError('ortho camera: $message');
}

(double, double) _ndc(Mat4 m, Vec3 p) {
  final x = p.x * m.at(0, 0) + p.y * m.at(1, 0) + p.z * m.at(2, 0) + m.at(3, 0);
  final y = p.x * m.at(0, 1) + p.y * m.at(1, 1) + p.z * m.at(2, 1) + m.at(3, 1);
  final w = p.x * m.at(0, 3) + p.y * m.at(1, 3) + p.z * m.at(2, 3) + m.at(3, 3);
  return (x / w, y / w);
}

void main() {
  // 1. 2D default: XY plane, +X right, +Y up, CCW toward the camera stays CCW.
  final view = CameraView.orthographic(
    eye: const Vec3(0, 0, 50),
    forward: const Vec3(0, 0, -1),
    halfWidth: 16,
    halfHeight: 9,
    near: 1,
    far: 100,
  );
  final (rx, _) = _ndc(view.viewProjection, const Vec3(8, 0, 0));
  final (_, uy) = _ndc(view.viewProjection, const Vec3(0, 4.5, 0));
  check((rx - 0.5).abs() < 1e-6, 'x=8 of half width 16 must sit at ndc 0.5, got $rx');
  check((uy - 0.5).abs() < 1e-6, 'y=4.5 of half height 9 must sit at ndc 0.5, got $uy');
  final (ax, ay) = _ndc(view.viewProjection, const Vec3(0, 0, 0));
  final (bx, by) = _ndc(view.viewProjection, const Vec3(1, 0, 0));
  final (cx, cy) = _ndc(view.viewProjection, const Vec3(0, 1, 0));
  check((bx - ax) * (cy - ay) - (cx - ax) * (by - ay) > 0, 'camera-facing CCW triangle must stay CCW');

  // 2. Picking rays are parallel and start under the pixel, not at the eye.
  final left = view.screenPointToRay(0, 360, 1280, 720);
  final right = view.screenPointToRay(1280, 360, 1280, 720);
  check((left.direction - right.direction).length < 1e-6, 'orthographic rays must be parallel');
  final hitL = left.intersectGround(0) ?? left.at(left.intersectPlane(const Vec3(0, 0, 1), 0)!);
  final hitR = right.at(right.intersectPlane(const Vec3(0, 0, 1), 0)!);
  check((hitL.x + 16).abs() < 1e-4 && (hitR.x - 16).abs() < 1e-4, 'edge rays must land on the view edges, got ${hitL.x}, ${hitR.x}');

  // 3. fitBounds keeps the whole region visible at any aspect.
  const level = Aabb(Vec3(-15, -8.5, 0), Vec3(15, 8.5, 0));
  for (final aspect in [0.5, 1.0, 16 / 9, 3.0]) {
    final ctrl = OrthoCameraController(fitBounds: level)..snap();
    final cam = ctrl.toCameraView(aspect);
    for (final corner in [level.min, level.max, const Vec3(-15, 8.5, 0), const Vec3(15, -8.5, 0)]) {
      final (x, y) = _ndc(cam.viewProjection, corner);
      check(x.abs() <= 1 && y.abs() <= 1, 'corner $corner must be visible at aspect $aspect (ndc $x, $y)');
    }
  }

  // 4. clampBounds stops the view at a level's edges.
  final follow = OrthoCameraController(
    halfHeight: 5,
    clampBounds: const Aabb(Vec3(-50, -10, -1), Vec3(50, 10, 1)),
    target: const Vec3(1000, 1000, 0),
    damping: 0,
  );
  follow.toCameraView(2); // records the aspect: half width 10
  follow.update(0.016);
  check((follow.center.x - 40).abs() < 1e-6, 'x must clamp to 50 - halfWidth 10, got ${follow.center.x}');
  check((follow.center.y - 5).abs() < 1e-6, 'y must clamp to 10 - halfHeight 5, got ${follow.center.y}');

  // 5. Top-down 3D orientation also works: looking down -Y, map X right.
  final topDown = CameraView.orthographic(
    eye: const Vec3(0, 40, 0),
    forward: const Vec3(0, -1, 0),
    up: const Vec3(0, 0, -1),
    halfWidth: 10,
    halfHeight: 10,
    near: 1,
    far: 100,
  );
  final (tx, _) = _ndc(topDown.viewProjection, const Vec3(5, 0, 0));
  final (_, tz) = _ndc(topDown.viewProjection, const Vec3(0, 0, -5));
  check(tx > 0 && tz > 0, 'top-down: +X is right and -Z is up on screen (got $tx, $tz)');

  stdout.writeln('Orthographic camera fixtures passed.');
}
