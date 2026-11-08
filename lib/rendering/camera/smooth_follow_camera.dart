import 'dart:math' as math;

import '../api/frame.dart';
import '../math/vec.dart';
import '../scene/scene_node.dart';
import 'camera_controller.dart';

/// Smooth third-person chase camera controller tracking a target [SceneNode] or world position.
///
/// Features critically damped movement interpolation, look-ahead focus,
/// and mouse orbit adjustment around the tracked target.
final class SmoothFollowCameraController implements CameraController {
  /// The scene node to track. When null, tracks [targetPosition].
  SceneNode? targetNode;

  /// Fallback target position when [targetNode] is null.
  Vec3 targetPosition;

  /// Local offset added to the target position (e.g. eye level above feet).
  Vec3 targetOffset;

  /// Trailing distance behind the target in metres.
  double distance;

  /// Vertical camera elevation above the target in metres.
  double height;

  /// Damping factor for camera movement. Higher values track more tightly.
  double positionDamping;

  /// Damping factor for camera look orientation.
  double rotationDamping;

  /// Vertical field of view in radians.
  double fovYRadians;

  /// Near clipping plane distance.
  double near;

  /// Far clipping plane distance.
  double far;

  /// User azimuth rotation offset in radians around target.
  double azimuthOffset = 0.0;

  /// User elevation angle in radians (-pi/3 to +pi/3).
  double elevationOffset = 0.25;

  Vec3 _currentEye;
  Vec3 _currentLookTarget;
  bool _initialized = false;

  SmoothFollowCameraController({
    this.targetNode,
    this.targetPosition = Vec3.zero,
    this.targetOffset = const Vec3(0, 0.8, 0),
    this.distance = 5.5,
    this.height = 1.8,
    this.positionDamping = 6.0,
    this.rotationDamping = 8.0,
    this.fovYRadians = 1.0,
    this.near = 0.1,
    this.far = 250.0,
    Vec3? initialEye,
  })  : _currentEye = initialEye ?? const Vec3(0, 3, 8),
        _currentLookTarget = targetPosition + targetOffset;

  @override
  Vec3 get eye => _currentEye;

  @override
  Vec3 get forward {
    final diff = _currentLookTarget - _currentEye;
    return diff.lengthSquared > 1e-8 ? diff.normalized : const Vec3(0, 0, -1);
  }

  /// Adjusts camera orbit around the target via mouse drag delta.
  void orbit(double deltaAzimuth, double deltaElevation) {
    azimuthOffset += deltaAzimuth;
    elevationOffset = (elevationOffset + deltaElevation).clamp(
      -math.pi * 0.35,
      math.pi * 0.40,
    );
  }

  /// Adjusts trailing distance via wheel delta.
  void zoom(double deltaDistance) {
    distance = (distance + deltaDistance).clamp(1.5, 40.0);
  }

  @override
  void update(double deltaTime) {
    final targetPos = (targetNode?.worldTransform.translation ?? targetPosition);
    final desiredTarget = targetPos + targetOffset;

    final cosEl = math.cos(elevationOffset);
    final sinEl = math.sin(elevationOffset);
    final offsetDir = Vec3(
      math.sin(azimuthOffset) * cosEl,
      sinEl,
      math.cos(azimuthOffset) * cosEl,
    );

    final desiredEye = desiredTarget + offsetDir * distance + Vec3(0, height, 0);

    if (!_initialized) {
      _currentEye = desiredEye;
      _currentLookTarget = desiredTarget;
      _initialized = true;
      return;
    }

    final tPos = (deltaTime * positionDamping).clamp(0.0, 1.0);
    final tRot = (deltaTime * rotationDamping).clamp(0.0, 1.0);

    _currentEye = Vec3.lerp(_currentEye, desiredEye, tPos);
    _currentLookTarget = Vec3.lerp(_currentLookTarget, desiredTarget, tRot);
  }

  @override
  CameraView toCameraView(double aspect) {
    return CameraView.look(
      eye: _currentEye,
      forward: forward,
      fovYRadians: fovYRadians,
      aspect: aspect,
      near: near,
      far: far,
    );
  }
}
