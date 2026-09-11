import 'package:pixeldart/pixeldart.dart';

void main() {
  _testTraumaAccumulationAndClamping();
  _testTraumaDecay();
  _testNonlinearPowerCurve();
  _testOffsetEvaluation();
  _testCameraViewPerturbation();
  print('Camera shake tests passed.');
}

void _testTraumaAccumulationAndClamping() {
  final engine = CameraShakeEngine();
  assert(engine.trauma == 0.0);

  engine.addTrauma(0.4);
  assert((engine.trauma - 0.4).abs() < 1e-6);

  engine.addTrauma(0.8);
  assert(engine.trauma == 1.0, 'Trauma must clamp to 1.0');

  engine.reset();
  assert(engine.trauma == 0.0);

  engine.setTrauma(0.75);
  assert((engine.trauma - 0.75).abs() < 1e-6);

  engine.setTrauma(5.0);
  assert(engine.trauma == 1.0);

  engine.setTrauma(-2.0);
  assert(engine.trauma == 0.0);
}

void _testTraumaDecay() {
  final engine = CameraShakeEngine(decayRate: 2.0);
  engine.setTrauma(1.0);

  // Step 0.25 seconds -> decay 0.5
  engine.update(0.25);
  assert((engine.trauma - 0.5).abs() < 1e-6);

  // Step 0.5 seconds -> decays past 0 to exactly 0.0
  engine.update(0.5);
  assert(engine.trauma == 0.0);
}

void _testNonlinearPowerCurve() {
  final engine = CameraShakeEngine();
  engine.setTrauma(0.5);
  // Quadratic falloff: perceived intensity = trauma^2
  assert((engine.shakePower - 0.25).abs() < 1e-6);

  engine.setTrauma(1.0);
  assert((engine.shakePower - 1.0).abs() < 1e-6);

  engine.setTrauma(0.0);
  assert(engine.shakePower == 0.0);
}

void _testOffsetEvaluation() {
  final engine = CameraShakeEngine();
  // Zero trauma -> zero offset
  final (:translation, :rotation) = engine.evaluate();
  assert(translation == Vec3.zero);
  assert(rotation == Quat.identity);

  // With trauma -> non-zero offsets
  engine.setTrauma(0.8);
  engine.update(0.05);
  final active = engine.evaluate();
  assert(active.translation.isFinite);
  assert(active.rotation.isFinite);
  assert(active.translation != Vec3.zero);
}

void _testCameraViewPerturbation() {
  final engine = CameraShakeEngine();
  final baseCamera = CameraView.look(
    eye: const Vec3(0, 5, 10),
    forward: const Vec3(0, 0, -1),
    fovYRadians: 1.0,
    aspect: 16 / 9,
    near: 0.1,
    far: 200.0,
  );

  // Zero trauma -> baseCamera unchanged
  final untouched = engine.applyTo(baseCamera);
  assert(untouched.eye == baseCamera.eye);
  assert(untouched.view == baseCamera.view);

  // Add trauma
  engine.setTrauma(0.8);
  engine.update(0.02);

  final shaken = engine.applyTo(baseCamera);
  assert(shaken.eye != baseCamera.eye, 'Eye should be shaken');
  assert(shaken.eye.isFinite);
  assert(shaken.forward.isFinite);
  assert(shaken.view.isFinite);
  assert(shaken.projection.isFinite);
  assert(shaken.viewProjection.isFinite);
  assert(shaken.aspect == baseCamera.aspect);
  assert(shaken.near == baseCamera.near);
  assert(shaken.far == baseCamera.far);
}
