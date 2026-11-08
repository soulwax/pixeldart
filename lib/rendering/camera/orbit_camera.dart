import 'dart:math' as math;

import '../api/frame.dart';
import '../math/vec.dart';
import 'camera_controller.dart';

/// Interactive orbit camera controller for inspecting 3D scenes.
final class OrbitCameraController implements CameraController {
  Vec3 target;
  double distance;
  double azimuthRadians;
  double elevationRadians;

  double minDistance;
  double maxDistance;
  double minElevation;
  double maxElevation;

  double fovYRadians;
  double near;
  double far;
  double damping;
  bool autoRotate;
  double autoRotateSpeed;

  double _targetAzimuth;
  double _targetElevation;
  double _targetDistance;
  Vec3 _targetPos;

  OrbitCameraController({
    this.target = const Vec3(0, 0, 0),
    this.distance = 5.0,
    this.azimuthRadians = 0.0,
    this.elevationRadians = 0.3,
    this.minDistance = 0.5,
    this.maxDistance = 100.0,
    this.minElevation = -math.pi * 0.48,
    this.maxElevation = math.pi * 0.48,
    this.fovYRadians = 1.0,
    this.near = 0.1,
    this.far = 200.0,
    this.damping = 10.0,
    this.autoRotate = false,
    this.autoRotateSpeed = 0.5,
  })  : _targetAzimuth = azimuthRadians,
        _targetElevation = elevationRadians,
        _targetDistance = distance,
        _targetPos = target;

  /// Eye position derived from current spherical coordinates.
  @override
  Vec3 get eye {
    final cosEl = math.cos(elevationRadians);
    final sinEl = math.sin(elevationRadians);
    final sinAz = math.sin(azimuthRadians);
    final cosAz = math.cos(azimuthRadians);

    return target +
        Vec3(
          cosEl * sinAz * distance,
          sinEl * distance,
          cosEl * cosAz * distance,
        );
  }

  /// Forward unit vector pointing from camera eye to target.
  @override
  Vec3 get forward => (target - eye).normalized;

  /// Right unit vector in the camera's horizontal view plane.
  Vec3 get right {
    final f = forward;
    return f.cross(const Vec3(0, 1, 0)).normalized;
  }

  /// Up unit vector perpendicular to forward and right.
  Vec3 get up => right.cross(forward).normalized;

  /// Rotates the orbit camera by angular deltas.
  void rotate(double deltaAzimuth, double deltaElevation) {
    _targetAzimuth += deltaAzimuth;
    _targetElevation = (_targetElevation + deltaElevation).clamp(
      minElevation,
      maxElevation,
    );
  }

  /// Adjusts camera distance from target.
  void zoom(double deltaDistance) {
    _targetDistance = (_targetDistance + deltaDistance).clamp(
      minDistance,
      maxDistance,
    );
  }

  /// Pans target in view-plane coordinates.
  void pan(double deltaRight, double deltaUp) {
    final r = right;
    final u = up;
    final shift = (r * deltaRight) + (u * deltaUp);
    _targetPos = _targetPos + shift;
  }

  /// Smoothly tracks or immediately snaps camera target to [newTarget].
  void trackTarget(Vec3 newTarget, {bool snap = false}) {
    _targetPos = newTarget;
    if (snap) target = newTarget;
  }

  /// Advances camera state towards targets using smooth exponential decay.
  @override
  void update(double dt) {
    if (dt <= 0) return;
    if (autoRotate) {
      _targetAzimuth += autoRotateSpeed * dt;
    }
    final t = (1.0 - math.exp(-damping * dt)).clamp(0.0, 1.0);

    azimuthRadians += (_targetAzimuth - azimuthRadians) * t;
    elevationRadians += (_targetElevation - elevationRadians) * t;
    distance += (_targetDistance - distance) * t;

    final diffPos = _targetPos - target;
    target = target + (diffPos * t);
  }

  /// Builds an authoritative [CameraView] for the given viewport aspect ratio.
  @override
  CameraView toCameraView(double aspect) {
    return CameraView.lookAt(
      eye: eye,
      target: target,
      fovYRadians: fovYRadians,
      aspect: aspect,
      near: near,
      far: far,
      up: const Vec3(0, 1, 0),
    );
  }
}
