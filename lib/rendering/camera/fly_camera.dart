import 'dart:math' as math;

import '../api/frame.dart';
import '../math/vec.dart';
import 'camera_controller.dart';

/// First-person / free-flight camera controller with WASD movement and mouse-look.
final class FlyCameraController implements CameraController {
  Vec3 position;
  double yawRadians;
  double pitchRadians;

  double moveSpeed;
  double lookSpeed;
  double fovYRadians;
  double near;
  double far;
  double damping;

  Vec3 _velocity = Vec3.zero;
  Vec3 _moveIntent = Vec3.zero;

  FlyCameraController({
    this.position = const Vec3(0, 1.8, 5),
    this.yawRadians = 0.0,
    this.pitchRadians = 0.0,
    this.moveSpeed = 8.0,
    this.lookSpeed = 0.003,
    this.fovYRadians = 1.0,
    this.near = 0.1,
    this.far = 200.0,
    this.damping = 10.0,
  });

  @override
  Vec3 get eye => position;

  /// Forward unit vector derived from pitch and yaw.
  @override
  Vec3 get forward {
    final cosP = math.cos(pitchRadians);
    final sinP = math.sin(pitchRadians);
    final sinY = math.sin(yawRadians);
    final cosY = math.cos(yawRadians);
    return Vec3(sinY * cosP, sinP, -cosY * cosP).normalized;
  }

  /// Right unit vector perpendicular to forward and world Up.
  Vec3 get right => forward.cross(const Vec3(0, 1, 0)).normalized;

  /// Up unit vector perpendicular to right and forward.
  Vec3 get up => right.cross(forward).normalized;

  /// Adds rotational look delta in radians.
  void look(double deltaYaw, double deltaPitch) {
    yawRadians += deltaYaw;
    pitchRadians = (pitchRadians - deltaPitch).clamp(-math.pi * 0.49, math.pi * 0.49);
  }

  /// Sets continuous movement intent: [forward], [right], [up] in range [-1, 1].
  void setMovementIntent({double forward = 0, double right = 0, double up = 0}) {
    _moveIntent = Vec3(right, up, forward);
  }

  void moveForward(double dt) {
    position += forward * (moveSpeed * dt);
  }

  void moveBackward(double dt) {
    position -= forward * (moveSpeed * dt);
  }

  void strafeLeft(double dt) {
    position -= right * (moveSpeed * dt);
  }

  void strafeRight(double dt) {
    position += right * (moveSpeed * dt);
  }

  void moveUp(double dt) {
    position += const Vec3(0, 1, 0) * (moveSpeed * dt);
  }

  void moveDown(double dt) {
    position -= const Vec3(0, 1, 0) * (moveSpeed * dt);
  }

  @override
  void update(double deltaTime) {
    if (deltaTime <= 0) return;

    if (_moveIntent.lengthSquared > 1e-6) {
      final fwd = Vec3(forward.x, 0, forward.z).normalized;
      final rgt = Vec3(right.x, 0, right.z).normalized;
      final targetVel = (fwd * _moveIntent.z + rgt * _moveIntent.x + const Vec3(0, 1, 0) * _moveIntent.y).normalized * moveSpeed;
      final t = (damping * deltaTime).clamp(0.0, 1.0);
      _velocity = _velocity * (1.0 - t) + targetVel * t;
      position += _velocity * deltaTime;
    } else {
      final t = (damping * deltaTime).clamp(0.0, 1.0);
      _velocity = _velocity * (1.0 - t);
      if (_velocity.lengthSquared > 1e-6) {
        position += _velocity * deltaTime;
      }
    }
  }

  @override
  CameraView toCameraView(double aspect) {
    return CameraView.look(
      eye: position,
      forward: forward,
      fovYRadians: fovYRadians,
      aspect: aspect,
      near: near,
      far: far,
    );
  }
}
