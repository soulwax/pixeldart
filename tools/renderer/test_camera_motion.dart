import 'package:pixeldart/pixeldart.dart';

void main() {
  _testScreenVelocity();
  _testVelocityReconstruction();
  _testMotionBlurAccumulation();
  print('Camera motion tests passed.');
}

void _testScreenVelocity() {
  const v0 = ScreenVelocity(0, 0);
  assert(v0.length == 0.0);

  const v1 = ScreenVelocity(3, 4);
  assert((v1.length - 5.0).abs() < 1e-6);
}

void _testVelocityReconstruction() {
  final viewProj = Mat4.perspective(
    fovYRadians: 1.0,
    aspect: 16 / 9,
    near: 0.1,
    far: 100.0,
  );

  final worldPos = const Vec3(0, 0, -5);

  // Static camera -> velocity is zero
  final staticVel = CameraMotionEngine.reconstructScreenVelocity(
    worldPosition: worldPos,
    currentViewProj: viewProj,
    previousViewProj: viewProj,
  );
  assert(staticVel.length < 1e-6, 'Static camera must have zero screen velocity');

  // Camera moved horizontally -> non-zero horizontal velocity
  final movedView = Mat4.lookAt(
    eye: const Vec3(2, 0, 0),
    forward: const Vec3(0, 0, -1),
    up: const Vec3(0, 1, 0),
  );
  final movedViewProj = viewProj * movedView;

  final movingVel = CameraMotionEngine.reconstructScreenVelocity(
    worldPosition: worldPos,
    currentViewProj: movedViewProj,
    previousViewProj: viewProj,
  );
  assert(movingVel.length > 1e-4, 'Moving camera must reconstruct non-zero screen velocity');
  assert(movingVel.vx.isFinite);
  assert(movingVel.vy.isFinite);
}

void _testMotionBlurAccumulation() {
  final current = const Vec3(0.5, 0.5, 0.5);

  // Zero velocity returns original color
  final untouched = CameraMotionEngine.accumulateDirectionalMotionBlur(
    currentPixelColor: current,
    currentDepth: 0.5,
    velocity: const ScreenVelocity(0, 0),
    sampleColors: [const Vec3(1, 1, 1)],
    sampleDepths: [0.5],
  );
  assert(untouched == current);

  // Active motion blends matching depth
  final blurred = CameraMotionEngine.accumulateDirectionalMotionBlur(
    currentPixelColor: current,
    currentDepth: 0.5,
    velocity: const ScreenVelocity(0.02, 0.01),
    sampleColors: [const Vec3(1.0, 0.0, 0.0), const Vec3(0.0, 1.0, 0.0)],
    sampleDepths: [0.501, 0.499],
  );
  assert(blurred != current, 'Blur should accumulate adjacent samples');
  assert(blurred.x.isFinite && blurred.y.isFinite && blurred.z.isFinite);

  // Occlusion depth rejection: samples far behind or in front should not bleed
  final occluded = CameraMotionEngine.accumulateDirectionalMotionBlur(
    currentPixelColor: current,
    currentDepth: 0.2,
    velocity: const ScreenVelocity(0.02, 0.01),
    sampleColors: [const Vec3(1.0, 0.0, 0.0)],
    sampleDepths: [0.95], // large depth disparity
    depthThreshold: 0.05,
  );
  assert((occluded.x - current.x).abs() < 1e-3, 'Occluded depth samples must be rejected');
}
