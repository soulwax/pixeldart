import 'package:pixeldart/rendering/rendering.dart';

void main() {
  final frame = FrameInput(
    camera: CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: const Vec3(10, 2, -4),
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 16 / 9,
    ),
    environment: const FrameEnvironment(),
    post: PostProcessState.off,
    frameIndex: 7,
    historyEpoch: 0,
    noiseSeed: 99,
    timeSeconds: 1.25,
  );
  const field = AtmosphericParticleField(
    mesh: MeshHandle(1, 1, 'drop'),
    material: MaterialHandle(2, 1, 'rain'),
    anchor: AtmosphericParticleAnchor.camera,
    origin: Vec3(0, 3, 0),
    halfExtents: Vec3(2, 1, 2),
    initialVelocity: Vec3(0.5, -4, 0),
    acceleration: Vec3(0, -9.81, 0),
    lifetimeSeconds: 0.75,
    particleCount: 3,
    seed: 42,
    particleScale: 0.5,
    instanceFamilyKey: 77,
  );

  final first = field.sampleTransform(frame, 0);
  final again = field.sampleTransform(frame, 0);
  _require(first.translation == again.translation, 'sampling must be stable');
  _require(first.scale == 0.5, 'particle scale was not retained');
  _require(first.translation.x > 8, 'camera anchor was not applied');

  final encoder = _RecordingEncoder();
  final submitted = field.submit(encoder, frame);
  _require(submitted == 3, 'unexpected submitted count: $submitted');
  _require(encoder.items.length == 3, 'encoder did not receive all particles');
  _require(
    encoder.items.every(
      (item) =>
          item.drawMode == DrawMode.blended &&
          item.instanceFamilyKey == 77 &&
          !item.castsShadow,
    ),
    'particle draw contract was not retained',
  );
  _throws(
    () => const AtmosphericParticleField(
      mesh: MeshHandle.invalid,
      material: MaterialHandle.invalid,
      lifetimeSeconds: 1,
      particleCount: 1,
      seed: 0,
    ).validate(),
    'invalid resources must be rejected',
  );
  _throws(() => field.sampleTransform(frame, 3), 'out-of-range particle index');
  print('Atmospheric particle field fixtures passed.');
}

final class _RecordingEncoder implements RenderEncoder {
  final List<RetainedItemDescriptor> items = [];

  @override
  void submit(RetainedItemDescriptor transientItem) => items.add(transientItem);
}

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void _throws(void Function() action, String message) {
  try {
    action();
  } catch (_) {
    return;
  }
  throw StateError(message);
}
