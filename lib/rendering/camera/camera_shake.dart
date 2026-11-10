import 'dart:math' as math;

import '../api/frame.dart';
import '../math/mat4.dart';
import '../math/quat.dart';
import '../math/vec.dart';

final class CameraShakeEngine {
  double _trauma = 0.0;
  double _time = 0.0;

  double decayRate;

  double frequency;

  double maxPitchRadians;
  double maxYawRadians;
  double maxRollRadians;

  double maxTranslation;

  double rotationScale;

  CameraShakeEngine({
    this.decayRate = 1.25,
    this.frequency = 22.0,
    this.maxPitchRadians = 0.05,
    this.maxYawRadians = 0.05,
    this.maxRollRadians = 0.035,
    this.maxTranslation = 0.20,
    this.rotationScale = 1.0,
  });

  double get trauma => _trauma;

  double get shakePower => _trauma * _trauma;

  void addTrauma(double amount) {
    if (amount <= 0.0) return;
    _trauma = (_trauma + amount).clamp(0.0, 1.0);
  }

  void setTrauma(double value) {
    _trauma = value.clamp(0.0, 1.0);
  }

  void reset() {
    _trauma = 0.0;
  }

  void update(double dt) {
    if (dt <= 0.0) return;
    _time += dt;
    if (_trauma > 0.0) {
      _trauma = math.max(0.0, _trauma - dt * decayRate);
    }
  }

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

    final r = p * rotationScale;
    final pitchQ = Quat.axisAngle(const Vec3(1, 0, 0), npitch * 0.71 * maxPitchRadians * r);
    final yawQ = Quat.axisAngle(const Vec3(0, 1, 0), nyaw * 0.71 * maxYawRadians * r);
    final rollQ = Quat.axisAngle(const Vec3(0, 0, 1), nroll * 0.71 * maxRollRadians * r);

    final rot = yawQ * pitchQ * rollQ;
    return (translation: trans, rotation: rot);
  }

  CameraView applyTo(CameraView baseCamera) {
    if (_trauma <= 1e-6) return baseCamera;
    final (:translation, :rotation) = evaluate();

    // shake = [R | -t] in view space; perturbed view = shake * view.
    final r = rotation.toMat4();
    final shakeMatrix = Mat4.fromColumnMajor([
      r.m[0], r.m[1], r.m[2], 0,
      r.m[4], r.m[5], r.m[6], 0,
      r.m[8], r.m[9], r.m[10], 0,
      -translation.x, -translation.y, -translation.z, 1,
    ]);
    final base = baseCamera.view;
    final perturbedView = shakeMatrix * base;

    // World-space eye and forward of the perturbed view: view space vectors
    // map back to world through the transpose of the base view's rotation.
    Vec3 viewToWorld(Vec3 v) => Vec3(
      base.at(0, 0) * v.x + base.at(0, 1) * v.y + base.at(0, 2) * v.z,
      base.at(1, 0) * v.x + base.at(1, 1) * v.y + base.at(1, 2) * v.z,
      base.at(2, 0) * v.x + base.at(2, 1) * v.y + base.at(2, 2) * v.z,
    );
    final inverseShake = Quat(-rotation.x, -rotation.y, -rotation.z, rotation.w);
    final perturbedEye = baseCamera.eye + viewToWorld(inverseShake.rotate(translation));
    final perturbedForward = viewToWorld(inverseShake.rotate(const Vec3(0, 0, -1))).normalized;

    return CameraView(
      view: perturbedView,
      projection: baseCamera.projection,
      viewProjection: baseCamera.projection * perturbedView,
      eye: perturbedEye,
      forward: perturbedForward,
      near: baseCamera.near,
      far: baseCamera.far,
      aspect: baseCamera.aspect,
    );
  }
}
