import 'package:pixeldart/pixeldart.dart';

final class _CollectingEncoder implements RenderEncoder {
  final items = <RetainedItemDescriptor>[];

  @override
  void submit(RetainedItemDescriptor item) => items.add(item);
}

void main() {
  final field = FlowParticleField(
    mesh: MeshHandle(1, 1),
    material: MaterialHandle(1, 1),
    paths: const [
      FlowPath(
        start: Vec3(0, 4, 0),
        end: Vec3(0, 0, 0),
        speedMps: 2,
        widthM: 0.04,
        particleCount: 3,
        seed: 17,
      ),
    ],
  );
  field.validate();
  final frame = FrameInput(
    camera: CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: const Vec3(0, 2, 5),
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 1,
    ),
    environment: const FrameEnvironment(),
    post: PostProcessState.off,
    frameIndex: 0,
    historyEpoch: 0,
    noiseSeed: 0,
    timeSeconds: 0.5,
  );
  final encoder = _CollectingEncoder();
  final submitted = field.submit(encoder, frame);
  _require(submitted == 3, 'flow field must submit every path particle');
  _require(
    encoder.items.every((item) => item.transform.translation.y <= 4),
    'flow particles must stay on the authored path',
  );
  print('flow particles: deterministic world-path submission pass');
}

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}
