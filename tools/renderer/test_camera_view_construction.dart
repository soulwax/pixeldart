import 'dart:io';
import 'dart:math' as math;

import 'package:pixeldart/rendering/rendering.dart';

void check(bool condition, String message) {
  if (!condition) throw StateError('camera view construction: $message');
}

void expectThrows(void Function() body, String what) {
  try {
    body();
  } on ArgumentError {
    return;
  }
  throw StateError('camera view construction: $what should have thrown');
}

bool _closeEnough(Mat4 a, Mat4 b, [double tolerance = 1e-5]) {
  for (var i = 0; i < 16; i++) {
    if ((a.m[i] - b.m[i]).abs() > tolerance * (1 + b.m[i].abs())) return false;
  }
  return true;
}

void main() {
  // A camera built from eye/forward derives a self-consistent snapshot.
  final look = CameraView.look(
    eye: const Vec3(1, 2, 3),
    forward: const Vec3(0, 0, -1),
    fovYRadians: 1.0,
    aspect: 16 / 9,
    near: 0.1,
    far: 100,
  );
  check(
    _closeEnough(look.viewProjection, look.projection * look.view),
    'look() must derive viewProjection as projection * view',
  );
  check(
    (look.eye - const Vec3(1, 2, 3)).length < 1e-5,
    'look() must preserve the authored eye',
  );

  // lookAt agrees with look for the same geometry.
  final at = CameraView.lookAt(
    eye: const Vec3(1, 2, 3),
    target: const Vec3(1, 2, -7),
    fovYRadians: 1.0,
    aspect: 16 / 9,
    near: 0.1,
    far: 100,
  );
  check(
    _closeEnough(at.view, look.view),
    'lookAt() and look() must agree when they describe the same camera',
  );

  // fromMatrices recovers eye, forward and aspect rather than trusting a host.
  final recovered = CameraView.fromMatrices(
    view: look.view,
    projection: look.projection,
    near: 0.1,
    far: 100,
  );
  check(
    (recovered.eye - look.eye).length < 1e-4,
    'fromMatrices must recover the eye from the inverse view, '
    'got ${recovered.eye} want ${look.eye}',
  );
  check(
    (recovered.forward - look.forward).length < 1e-4,
    'fromMatrices must recover forward, '
    'got ${recovered.forward} want ${look.forward}',
  );
  check(
    (recovered.aspect - 16 / 9).abs() < 1e-4,
    'fromMatrices must read aspect off the projection, got ${recovered.aspect}',
  );

  // The regression this API exists to prevent: a hand-built camera whose
  // viewProjection does not match its own view and projection used to pass
  // validate(), leaving culling and shading disagreeing about where the
  // camera is. It must now be rejected.
  final projection = Mat4.perspective(
    fovYRadians: 1.0,
    aspect: 1.0,
    near: 0.1,
    far: 100,
  );
  final view = Mat4.lookAt(
    eye: const Vec3(0, 0, 5),
    forward: const Vec3(0, 0, -1),
    up: const Vec3(0, 1, 0),
  );
  expectThrows(
    () => CameraView(
      view: view,
      projection: projection,
      // The classic slip: passing the projection alone, which is only correct
      // when the view happens to be identity.
      viewProjection: projection,
      eye: const Vec3(0, 0, 5),
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 1.0,
    ).validate(),
    'an inconsistent viewProjection',
  );

  // The equally classic slip: multiplying in the wrong order.
  expectThrows(
    () => CameraView(
      view: view,
      projection: projection,
      viewProjection: view * projection,
      eye: const Vec3(0, 0, 5),
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 1.0,
    ).validate(),
    'a reversed-order viewProjection',
  );

  // A correctly built raw camera still validates: the check must not be so
  // tight that honest Float32 rounding trips it.
  CameraView(
    view: view,
    projection: projection,
    viewProjection: projection * view,
    eye: const Vec3(0, 0, 5),
    forward: const Vec3(0, 0, -1),
    near: 0.1,
    far: 100,
    aspect: 1.0,
  ).validate();

  // An identity view is the one case where viewProjection == projection is
  // right, and it must keep working.
  CameraView(
    view: Mat4.identity(),
    projection: projection,
    viewProjection: projection,
    eye: Vec3.zero,
    forward: const Vec3(0, 0, -1),
    near: 0.1,
    far: 100,
    aspect: 1.0,
  ).validate();

  // Degenerate inputs are rejected at construction, not at draw time.
  expectThrows(
    () => CameraView.look(
      eye: Vec3.zero,
      forward: Vec3.zero,
      fovYRadians: 1.0,
      aspect: 1.0,
      near: 0.1,
      far: 100,
    ),
    'a zero-length forward',
  );
  expectThrows(
    () => CameraView.look(
      eye: Vec3.zero,
      forward: const Vec3(0, 1, 0),
      fovYRadians: 1.0,
      aspect: 1.0,
      near: 0.1,
      far: 100,
    ),
    'an up parallel to forward',
  );
  expectThrows(
    () => CameraView.look(
      eye: Vec3.zero,
      forward: const Vec3(0, 0, -1),
      fovYRadians: math.pi,
      aspect: 1.0,
      near: 0.1,
      far: 100,
    ),
    'a degenerate field of view',
  );
  expectThrows(
    () => CameraView.lookAt(
      eye: const Vec3(1, 1, 1),
      target: const Vec3(1, 1, 1),
      fovYRadians: 1.0,
      aspect: 1.0,
      near: 0.1,
      far: 100,
    ),
    'a target coincident with the eye',
  );

  // The frustum a camera culls with must come from the same snapshot.
  final frustum = look.buildFrustum();
  check(
    frustum == frustum,
    'buildFrustum must remain derivable from the validated snapshot',
  );

  stdout.writeln('Camera view construction fixtures passed.');
}
