import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';

/// A 2D camera: orthographic, looking down -Z at the XY play plane.
///
/// Looking straight down -Z with +Y up needs no rotation at all, so the view
/// is a plain translation: right-handed, +X right, +Y up. There is no
/// orthographic convenience constructor, so this assembles the raw
/// [CameraView]; its `validate()` still checks viewProjection = proj × view.
///
/// It shakes itself rather than using the app's shake engine, which also
/// rotates the view; in 2D a shake should only translate.
final class OrthoCamera implements CameraController {
  /// World units visible from screen centre to the top edge.
  double halfHeight;

  /// Where the camera wants to be; it eases toward this.
  Vec3 target = Vec3.zero;

  /// The visible region is clamped to stay inside these bounds.
  double boundsHalfX = 1e9, boundsHalfY = 1e9;

  Vec3 _center = Vec3.zero;
  double _aspect = 16 / 9;
  double _trauma = 0, _time = 0;

  static const _forward = Vec3(0, 0, -1);
  static const _distance = 30.0;

  OrthoCamera({this.halfHeight = 9});

  @override
  Vec3 get eye => _center + _shakeOffset + const Vec3(0, 0, _distance);

  @override
  Vec3 get forward => _forward;

  void snap() => _center = _clamped(target);

  /// Adds screen shake; [amount] in [0, 1], decays on its own.
  void shake(double amount) => _trauma = math.min(1, _trauma + amount);

  Vec3 get _shakeOffset {
    if (_trauma <= 0) return Vec3.zero;
    final k = _trauma * _trauma * 0.6;
    return Vec3(
      math.sin(_time * 71) * math.sin(_time * 13) * k,
      math.sin(_time * 59 + 1.3) * math.sin(_time * 17) * k,
      0,
    );
  }

  Vec3 _clamped(Vec3 p) {
    final halfW = halfHeight * _aspect;
    final x = boundsHalfX > halfW ? p.x.clamp(-(boundsHalfX - halfW), boundsHalfX - halfW) : 0.0;
    final y = boundsHalfY > halfHeight
        ? p.y.clamp(-(boundsHalfY - halfHeight), boundsHalfY - halfHeight)
        : 0.0;
    return Vec3(x, y, 0);
  }

  @override
  void update(double deltaTime) {
    _time += deltaTime;
    _trauma = math.max(0, _trauma - deltaTime * 1.8);
    final k = 1 - math.exp(-deltaTime * 4.0);
    _center = Vec3.lerp(_center, _clamped(target), k);
  }

  @override
  CameraView toCameraView(double aspect) {
    _aspect = aspect;
    final halfW = halfHeight * aspect;
    final e = eye;
    final view = Mat4.translation(Vec3(-e.x, -e.y, -e.z));
    final projection = Mat4.orthographic(
      left: -halfW,
      right: halfW,
      bottom: -halfHeight,
      top: halfHeight,
      near: 1,
      far: _distance + 10,
    );
    return CameraView(
      view: view,
      projection: projection,
      viewProjection: projection * view,
      eye: e,
      forward: _forward,
      near: 1,
      far: _distance + 10,
      aspect: aspect,
    )..validate();
  }
}
