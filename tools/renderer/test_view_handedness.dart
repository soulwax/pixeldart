import 'dart:io';
import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';

// Guards the camera basis. Mat4.lookAt once built right = up × forward: a
// mirrored, determinant -1 view that flipped every triangle's on-screen
// winding, so CCW back-face culling removed the camera-facing side of
// single-sided surfaces. Nothing else in the suite noticed.

void check(bool condition, String message) {
  if (!condition) throw StateError('view handedness: $message');
}

double _det3(Mat4 m) {
  double a(int c, int r) => m.at(c, r);
  return a(0, 0) * (a(1, 1) * a(2, 2) - a(2, 1) * a(1, 2)) -
      a(1, 0) * (a(0, 1) * a(2, 2) - a(2, 1) * a(0, 2)) +
      a(2, 0) * (a(0, 1) * a(1, 2) - a(1, 1) * a(0, 2));
}

(double, double) _ndc(Mat4 viewProjection, Vec3 p) {
  final m = viewProjection;
  final x = p.x * m.at(0, 0) + p.y * m.at(1, 0) + p.z * m.at(2, 0) + m.at(3, 0);
  final y = p.x * m.at(0, 1) + p.y * m.at(1, 1) + p.z * m.at(2, 1) + m.at(3, 1);
  final w = p.x * m.at(0, 3) + p.y * m.at(1, 3) + p.z * m.at(2, 3) + m.at(3, 3);
  return (x / w, y / w);
}

double _screenArea(Mat4 viewProjection, Vec3 a, Vec3 b, Vec3 c) {
  final (ax, ay) = _ndc(viewProjection, a);
  final (bx, by) = _ndc(viewProjection, b);
  final (cx, cy) = _ndc(viewProjection, c);
  return (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
}

CameraView _camera(Vec3 eye, Vec3 forward, {Vec3 up = const Vec3(0, 1, 0)}) => CameraView.look(
  eye: eye,
  forward: forward,
  fovYRadians: 1.0,
  aspect: 1.5,
  near: 0.1,
  far: 100,
  up: up,
);

(Vec3, Vec3, Vec3) _facing(Vec3 center, Vec3 toward) {
  final n = toward.normalized;
  final helper = n.y.abs() > 0.9 ? const Vec3(1, 0, 0) : const Vec3(0, 1, 0);
  final u = helper.cross(n).normalized;
  final v = n.cross(u);
  return (center + u, center + v, center - u - v * 0.5);
}

void main() {
  // 1. lookAt is a proper rotation for several orientations.
  final directions = [
    const Vec3(0, 0, -1),
    const Vec3(0, 0, 1),
    const Vec3(1, 0, 0),
    const Vec3(0.3, -0.8, 0.5),
  ];
  for (final f in directions) {
    final view = Mat4.lookAt(eye: const Vec3(1, 2, 3), forward: f, up: const Vec3(0, 1, 0));
    final det = _det3(view);
    check((det - 1).abs() < 1e-5, 'lookAt(forward: $f) determinant must be +1, got $det');
  }

  // 2. Looking down -Z with +Y up: world +X is screen-right, +Y is screen-up.
  final cam = _camera(Vec3.zero, const Vec3(0, 0, -1));
  final (rx, ry) = _ndc(cam.viewProjection, const Vec3(1, 0, -5));
  check(rx > 0 && ry.abs() < 1e-6, 'world +X must project to screen-right (got $rx, $ry)');
  final (ux, uy) = _ndc(cam.viewProjection, const Vec3(0, 1, -5));
  check(uy > 0 && ux.abs() < 1e-6, 'world +Y must project to screen-up (got $ux, $uy)');

  // 3. A CCW triangle facing the camera stays CCW on screen (front-facing
  //    under the renderer's CCW/cull-back state), from any view direction.
  final rng = math.Random(7);
  for (var i = 0; i < 64; i++) {
    final forward = Vec3(rng.nextDouble() * 2 - 1, rng.nextDouble() * 2 - 1, rng.nextDouble() * 2 - 1);
    if (forward.lengthSquared < 0.05 || forward.normalized.y.abs() > 0.97) continue;
    final eye = Vec3(rng.nextDouble() * 10, rng.nextDouble() * 10, rng.nextDouble() * 10);
    final camera = _camera(eye, forward);
    final center = eye + forward.normalized * 8;
    final (a, b, c) = _facing(center, eye - center);
    final area = _screenArea(camera.viewProjection, a, b, c);
    check(area > 0, 'camera-facing CCW triangle must stay CCW on screen (forward $forward, area $area)');
  }

  // 4. Camera shake must not mirror or flip the view.
  final shake = CameraShakeEngine()..setTrauma(1);
  for (var i = 0; i < 20; i++) {
    shake.update(0.013);
    final base = _camera(const Vec3(0, 5, 10), const Vec3(0, -0.3, -1));
    final shaken = shake.applyTo(base);
    final det = _det3(shaken.view);
    check((det - 1).abs() < 1e-4, 'shaken view determinant must stay +1, got $det');
    final center = base.eye + base.forward * 8;
    final (a, b, c) = _facing(center, base.eye - center);
    check(_screenArea(shaken.viewProjection, a, b, c) > 0, 'shake must keep camera-facing triangles front-facing');
    // The reported eye and forward must describe the perturbed view.
    final eyeInView = shaken.view.transformPoint(shaken.eye);
    check(eyeInView.length < 1e-4, 'shaken eye must map to the view origin, got $eyeInView');
    final ahead = shaken.view.transformPoint(shaken.eye + shaken.forward);
    check((ahead - const Vec3(0, 0, -1)).length < 1e-4, 'shaken forward must map to view -Z, got $ahead');
  }

  // 5. Straight-down cameras (top-down games) shake without degenerating.
  final topDown = _camera(const Vec3(0, 30, 0), const Vec3(0, -1, 0), up: const Vec3(0, 0, -1));
  shake.setTrauma(1);
  shake.update(0.02);
  final shakenTopDown = shake.applyTo(topDown);
  check(shakenTopDown.view.isFinite, 'shaking a top-down camera must stay finite');
  check((_det3(shakenTopDown.view) - 1).abs() < 1e-4, 'shaking a top-down camera must stay a rotation');

  stdout.writeln('View handedness fixtures passed.');
}
