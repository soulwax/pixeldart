import 'dart:math' as math;

import '../api/frame.dart';
import '../math/spline.dart';
import '../math/vec.dart';
import 'camera_controller.dart';

/// Single control waypoint along a cinematic camera drone flight path.
final class CameraWaypoint {
  final Vec3 eye;
  final Vec3 target;
  final double fovYRadians;

  const CameraWaypoint({
    required this.eye,
    required this.target,
    this.fovYRadians = 1.0,
  });
}

/// Cinematic automated drone tour camera controller navigating along centripetal 3D splines.
final class CinematicTourCameraController implements CameraController {
  final List<CameraWaypoint> waypoints;
  final bool loop;
  final double duration;
  final double near;
  final double far;

  late final CatmullRomSpline3D _eyeSpline;
  late final CatmullRomSpline3D _targetSpline;

  double _progress = 0.0;
  bool isPlaying = true;
  double playbackSpeed = 1.0;

  Vec3 _currentEye = const Vec3(0, 0, 0);
  Vec3 _currentTarget = const Vec3(0, 0, 0);
  double _currentFov = 1.0;

  CinematicTourCameraController({
    required List<CameraWaypoint> waypoints,
    this.duration = 20.0,
    this.loop = true,
    this.near = 0.1,
    this.far = 300.0,
  }) : waypoints = List.unmodifiable(waypoints) {
    if (this.waypoints.length < 2) {
      throw ArgumentError('CinematicTourCameraController requires at least 2 waypoints');
    }
    if (duration <= 0) {
      throw ArgumentError.value(duration, 'duration', 'must be > 0');
    }

    _eyeSpline = CatmullRomSpline3D(
      points: this.waypoints.map((w) => w.eye).toList(),
      closed: loop,
    );
    _targetSpline = CatmullRomSpline3D(
      points: this.waypoints.map((w) => w.target).toList(),
      closed: loop,
    );

    _evaluateAtProgress(0.0);
  }

  /// Current normalized flight tour progress in [0, 1].
  double get progress => _progress;

  /// Current eye position in world space.
  @override
  Vec3 get eye => _currentEye;

  /// Current look target focus point in world space.
  Vec3 get target => _currentTarget;

  /// Current field of view in radians.
  double get fovYRadians => _currentFov;

  /// Normalized camera forward viewing direction.
  @override
  Vec3 get forward {
    final diff = _currentTarget - _currentEye;
    return diff.lengthSquared > 1e-6 ? diff.normalized : const Vec3(0, 0, -1);
  }

  /// Pauses automated flight animation.
  void pause() => isPlaying = false;

  /// Resumes automated flight animation.
  void play() => isPlaying = true;

  /// Resets flight progress to the beginning.
  void reset() => seek(0.0);

  /// Seeks to an explicit normalized progress [t] in [0, 1].
  void seek(double t) {
    if (loop) {
      _progress = (t % 1.0 + 1.0) % 1.0;
    } else {
      _progress = t.clamp(0.0, 1.0);
    }
    _evaluateAtProgress(_progress);
  }

  void _evaluateAtProgress(double t) {
    _currentEye = _eyeSpline.sample(t);
    _currentTarget = _targetSpline.sample(t);

    // Interpolate FOV smoothly between waypoints
    final count = waypoints.length;
    final segments = loop ? count : count - 1;
    final scaledT = t * segments;
    final idx0 = math.min(scaledT.floor(), segments - 1);
    final idx1 = loop ? (idx0 + 1) % count : math.min(idx0 + 1, count - 1);
    final frac = scaledT - idx0;

    final fov0 = waypoints[idx0].fovYRadians;
    final fov1 = waypoints[idx1].fovYRadians;
    _currentFov = fov0 + (fov1 - fov0) * frac;
  }

  /// Advances flight progress by [dt] seconds.
  @override
  void update(double dt) {
    if (!isPlaying || dt <= 0) return;

    final deltaProgress = (dt / duration) * playbackSpeed;
    var newProgress = _progress + deltaProgress;

    if (loop) {
      newProgress = (newProgress % 1.0 + 1.0) % 1.0;
    } else {
      if (newProgress >= 1.0) {
        newProgress = 1.0;
        isPlaying = false;
      }
    }

    _progress = newProgress;
    _evaluateAtProgress(_progress);
  }

  /// Constructs an authoritative [CameraView] for the active flight pose.
  @override
  CameraView toCameraView(double aspect) {
    return CameraView.lookAt(
      eye: _currentEye,
      target: _currentTarget,
      fovYRadians: _currentFov,
      aspect: aspect,
      near: near,
      far: far,
      up: const Vec3(0, 1, 0),
    );
  }
}
