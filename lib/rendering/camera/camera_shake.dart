import 'dart:math' as math;

import '../api/frame.dart';
import '../math/mat4.dart';
import '../math/quat.dart';
import '../math/vec.dart';

/// Trauma-based procedural camera shake engine for cinematic impacts, vibrations, and rumbles.
///
/// Implements nonlinear trauma decay where perceived shake intensity = trauma^2,
/// producing energetic initial impacts followed by natural, smooth settling.
final class CameraShakeEngine {
  double _trauma = 0.0;
  double _time = 0.0;

  /// Rate at which trauma decays per second.
  double decayRate;

  /// Oscillation frequency in Hertz.
  double frequency;

  /// Maximum rotational shake angles in radians.
  double maxPitchRadians;
  double maxYawRadians;
  double maxRollRadians;

  /// Maximum translational kick in metres.
  double maxTranslation;

  CameraShakeEngine({
    this.decayRate = 1.25,
    this.frequency = 22.0,
    this.maxPitchRadians = 0.05,
    this.maxYawRadians = 0.05,
    this.maxRollRadians = 0.035,
    this.maxTranslation = 0.20,
  });

  /// Current trauma level in [0, 1].
  double get trauma => _trauma;

  /// Effective shake power applied to offsets, following a quadratic power curve.
  double get shakePower => _trauma * _trauma;

  /// Adds trauma to the engine, clamped to maximum 1.0.
  void addTrauma(double amount) {
    if (amount <= 0.0) return;
    _trauma = (_trauma + amount).clamp(0.0, 1.0);
  }

  /// Sets absolute trauma level in [0, 1].
  void setTrauma(double value) {
    _trauma = value.clamp(0.0, 1.0);
  }

  /// Clears all active trauma immediately.
  void reset() {
    _trauma = 0.0;
  }

  /// Advances the simulation time and decays trauma.
  void update(double dt) {
    if (dt <= 0.0) return;
    _time += dt;
    if (_trauma > 0.0) {
      _trauma = math.max(0.0, _trauma - dt * decayRate);
    }
  }

  /// Evaluates the current translational and rotational shake offsets.
  ({Vec3 translation, Quat rotation}) evaluate() {
    final p = shakePower;
    if (p <= 1e-6) {
      return (translation: Vec3.zero, rotation: Quat.identity);
    }

    final t = _time * frequency;

    // Harmonic pseudo-noise sampling
    final nx = math.sin(t * 1.0) + 0.5 * math.sin(t * 2.37 + 1.2);
    final ny = math.sin(t * 1.13 + 2.1) + 0.5 * math.sin(t * 2.71 + 0.4);
    final nz = math.sin(t * 0.89 + 4.3) + 0.5 * math.sin(t * 1.93 + 3.1);

    final npitch = math.sin(t * 1.21 + 0.8) + 0.4 * math.sin(t * 3.11);
    final nyaw = math.sin(t * 0.97 + 2.7) + 0.4 * math.sin(t * 2.49 + 1.8);
    final nroll = math.sin(t * 1.45 + 5.1) + 0.4 * math.sin(t * 2.83 + 2.2);

    final trans = Vec3(
      nx * 0.67 * maxTranslation * p,
      ny * 0.67 * maxTranslation * p,
      nz * 0.67 * maxTranslation * p,
    );

    final pitchQ = Quat.axisAngle(const Vec3(1, 0, 0), npitch * 0.71 * maxPitchRadians * p);
    final yawQ = Quat.axisAngle(const Vec3(0, 1, 0), nyaw * 0.71 * maxYawRadians * p);
    final rollQ = Quat.axisAngle(const Vec3(0, 0, 1), nroll * 0.71 * maxRollRadians * p);

    final rot = yawQ * pitchQ * rollQ;
    return (translation: trans, rotation: rot);
  }

  /// Perturbs [baseCamera] with the current shake state.
  CameraView applyTo(CameraView baseCamera) {
    if (_trauma <= 1e-6) return baseCamera;
    final (:translation, :rotation) = evaluate();

    final perturbedEye = baseCamera.eye + translation;
    final perturbedForward = rotation.rotate(baseCamera.forward);
    final perturbedUp = rotation.rotate(const Vec3(0, 1, 0));

    final perturbedView = Mat4.lookAt(
      eye: perturbedEye,
      forward: perturbedForward,
      up: perturbedUp,
    );
    final perturbedViewProj = baseCamera.projection * perturbedView;

    return CameraView(
      view: perturbedView,
      projection: baseCamera.projection,
      viewProjection: perturbedViewProj,
      eye: perturbedEye,
      forward: perturbedForward,
      near: baseCamera.near,
      far: baseCamera.far,
      aspect: baseCamera.aspect,
    );
  }
}
