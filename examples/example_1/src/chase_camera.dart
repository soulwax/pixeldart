import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';

/// Third-person chase camera for a ship flying down -Z.
///
/// Sits behind and above [target], trails it with exponential smoothing so
/// sharp dodges read as motion, and widens its field of view with [speed01]
/// for a sense of velocity.
final class ChaseCamera implements CameraController {
  Vec3 target = Vec3.zero;

  /// 0 at cruise, 1 at full boost.
  double speed01 = 0;

  Vec3 _eye = const Vec3(0, 2, 8);
  Vec3 _look = const Vec3(0, 0, -12);
  double _fov = 1.0;

  static const _offset = Vec3(0, 1.7, 6.8);
  static const _lookAhead = Vec3(0, 0.2, -14);

  @override
  Vec3 get eye => _eye;

  @override
  Vec3 get forward => (_look - _eye).normalized;

  /// Jumps straight to the resting pose, e.g. on restart.
  void snap() {
    _eye = _desiredEye;
    _look = target + _lookAhead;
  }

  // Follows the ship at 60% laterally so the ship visibly moves on screen.
  Vec3 get _desiredEye => Vec3(target.x * 0.6, target.y * 0.6, target.z) + _offset;

  @override
  void update(double deltaTime) {
    final follow = 1 - math.exp(-deltaTime * 5.5);
    final aim = 1 - math.exp(-deltaTime * 9.0);
    _eye = Vec3.lerp(_eye, _desiredEye, follow);
    _look = Vec3.lerp(_look, target + _lookAhead, aim);
    final fov = 1.05 + speed01 * 0.28;
    _fov += (fov - _fov) * follow;
  }

  @override
  CameraView toCameraView(double aspect) => CameraView.look(
    eye: _eye,
    forward: forward,
    fovYRadians: _fov,
    aspect: aspect,
    near: 0.1,
    far: 260,
  );
}
