import '../math/frustum.dart';
import '../math/mat4.dart';
import '../math/vec.dart';
import 'effects.dart';
import 'lights.dart';

/// Authoritative per-frame camera snapshot. Built by the caller's adapter
/// from its live camera's actual projection; the renderer never guesses a
/// FOV or reconstructs a different one (§5.2). Culling, depth
/// reconstruction, SSAO, fog, and the world shader all read this same
/// snapshot so they cannot disagree within one frame.
final class CameraView {
  final Mat4 view;
  final Mat4 projection;
  final Mat4 viewProjection;
  final Vec3 eye;
  final Vec3 forward;
  final double near;
  final double far;
  final double aspect;

  CameraView({
    required this.view,
    required this.projection,
    required this.viewProjection,
    required this.eye,
    required this.forward,
    required this.near,
    required this.far,
    required this.aspect,
  });

  Frustum buildFrustum() => Frustum.fromViewProjection(viewProjection);

  void validate() {
    if (!eye.isFinite) {
      throw ArgumentError('CameraView.eye must be finite: $eye');
    }
    if (!forward.isFinite || forward.lengthSquared < 1e-12) {
      throw ArgumentError(
        'CameraView.forward must be finite and nonzero: $forward',
      );
    }
    if (!near.isFinite || !far.isFinite || near <= 0 || far <= near) {
      throw ArgumentError('CameraView requires 0 < near < far, got $near/$far');
    }
    if (!aspect.isFinite || aspect <= 0) {
      throw ArgumentError('CameraView.aspect must be finite and > 0: $aspect');
    }
    if (!view.isFinite || !projection.isFinite || !viewProjection.isFinite) {
      throw ArgumentError('CameraView matrices must be finite');
    }
  }
}

/// Neutral scene environment values only — no room, no house, no story
/// state (§5.2).
final class FrameEnvironment {
  final LinearColor clearColor;
  final LinearColor fogColor;
  final double fogStart;
  final double fogEnd;
  final double? fogHeightFalloff;
  final double? fogDensity;
  final LinearColor ambientColor;
  final double ambientIntensity;
  final DirectionalLight? directionalLight;
  final List<PointLight> pointLights;
  final List<SpotLight> spotLights;

  const FrameEnvironment({
    this.clearColor = LinearColor.black,
    this.fogColor = LinearColor.black,
    this.fogStart = 0,
    this.fogEnd = 1,
    this.fogHeightFalloff,
    this.fogDensity,
    this.ambientColor = LinearColor.white,
    this.ambientIntensity = 0,
    this.directionalLight,
    this.pointLights = const [],
    this.spotLights = const [],
  });

  void validate() {
    if (!clearColor.isFinite || !fogColor.isFinite || !ambientColor.isFinite) {
      throw ArgumentError('FrameEnvironment colors must be finite');
    }
    if (!fogStart.isFinite || !fogEnd.isFinite || fogEnd < fogStart) {
      throw ArgumentError(
        'FrameEnvironment requires fogEnd >= fogStart, got $fogStart/$fogEnd',
      );
    }
    if (!ambientIntensity.isFinite || ambientIntensity < 0) {
      throw ArgumentError(
        'FrameEnvironment.ambientIntensity must be >= 0: $ambientIntensity',
      );
    }
    directionalLight?.validate();
    for (final light in pointLights) {
      light.validate();
    }
    for (final light in spotLights) {
      light.validate();
    }
  }
}

/// Everything a renderer needs for exactly one frame. [historyEpoch] is the
/// caller's sole public history-invalidation authority (§5.2); there is no
/// second reset method.
final class FrameInput {
  final CameraView camera;
  final FrameEnvironment environment;
  final PostProcessState post;
  final int visibilityMask;
  final int frameIndex;
  final int historyEpoch;
  final int noiseSeed;
  final double timeSeconds;

  const FrameInput({
    required this.camera,
    required this.environment,
    required this.post,
    this.visibilityMask = -1,
    required this.frameIndex,
    required this.historyEpoch,
    required this.noiseSeed,
    required this.timeSeconds,
  });

  void validate() {
    camera.validate();
    environment.validate();
    post.validate();
    if (frameIndex < 0) {
      throw ArgumentError('FrameInput.frameIndex must be >= 0: $frameIndex');
    }
    if (!timeSeconds.isFinite) {
      throw ArgumentError(
        'FrameInput.timeSeconds must be finite: $timeSeconds',
      );
    }
  }
}
