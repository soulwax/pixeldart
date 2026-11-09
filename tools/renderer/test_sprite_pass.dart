import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/core/frame_queue.dart';
import 'package:pixeldart/rendering/core/scene_renderer_impl.dart';

import 'fake_gpu_device.dart';

final CameraView _camera = CameraView.look(
  eye: const Vec3(0, 0, 5),
  forward: const Vec3(0, 0, -1),
  fovYRadians: 1,
  aspect: 16 / 9,
  near: 0.1,
  far: 100,
);

Camera2D _view() =>
    Camera2D(designWidth: 320, designHeight: 180)..setViewport(640, 360);

void _check(bool ok, String what) {
  if (!ok) throw StateError(what);
}

Future<(SceneRendererImpl, FakeGpuDevice, RenderWorld)> _renderer(
  QualityProfile profile, {
  int sampleCount = 1,
}) async {
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  await renderer.initialize(
    RendererConfiguration(
      profile: profile,
      internalWidth: 320,
      internalHeight: 180,
      sampleCount: sampleCount,
      shadowMapCount: profile.installs('shadows') ? 1 : 0,
    ),
    SurfaceMetrics.pixels(width: 320, height: 180),
  );
  return (renderer, device, renderer.createWorld());
}

var _frameIndex = 0;

FrameInput _input() => FrameInput(
  camera: _camera,
  environment: const FrameEnvironment(),
  post: const PostProcessState(),
  frameIndex: _frameIndex++,
  historyEpoch: 0,
  noiseSeed: 0,
  timeSeconds: 0,
);

int _spriteDraws(FakeGpuDevice device) => device.drawLog
    .where((e) => e.startsWith('drawArraysInstanced(0, 6,'))
    .length;

Future<FrameStats> _frame(
  SceneRendererImpl renderer,
  RenderWorld world,
  void Function(RenderEncoder encoder) submit,
) async {
  final encoder = renderer.beginFrame(world, _input());
  submit(encoder);
  return renderer.endFrame();
}

SpriteRegion _region(int slot) => SpriteRegion(
  texture: slot < 0 ? null : TextureHandle(slot, 0),
  width: 16,
  height: 16,
  u0: 0,
  v0: 0,
  u1: 1,
  v1: 1,
);

Future<void> _noSpritesNoDraws() async {
  final (renderer, device, world) = await _renderer(QualityProfile.safe);
  device.drawLog.clear();
  final stats = await _frame(renderer, world, (_) {});
  _check(_spriteDraws(device) == 0, 'empty frame drew sprites');
  _check(stats.drawCalls == 0, 'empty frame counted ${stats.drawCalls} draws');
  // An empty batch is the same as none.
  device.drawLog.clear();
  await _frame(renderer, world, (e) => e.drawSprites(SpriteBatch(), _view()));
  _check(_spriteDraws(device) == 0, 'empty batch drew sprites');
}

Future<void> _drawsOnePerRun() async {
  final (renderer, device, world) = await _renderer(QualityProfile.safe);
  final region = _region(-1);
  final batch = SpriteBatch()
    ..draw(region, 0, 0)
    ..draw(region, 1, 0)
    ..draw(region, 2, 0, blend: SpriteBlend.multiply);
  device.drawLog.clear();
  final stats = await _frame(
    renderer,
    world,
    (e) => e.drawSprites(batch, _view()),
  );
  _check(_spriteDraws(device) == 2, 'expected one draw per run');
  _check(stats.drawCalls == 2, 'stats counted ${stats.drawCalls} draws');
  _check(stats.instancesSubmitted == 3, 'stats counted instances');
}

Future<void> _unchangedBatchIsNotReuploaded() async {
  final (renderer, device, world) = await _renderer(QualityProfile.safe);
  final batch = SpriteBatch()..draw(_region(-1), 0, 0);
  final view = _view();
  await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  // The second sighting of an unchanged batch uploads its retained copy.
  await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  final settled = device.bufferUploadCalls;
  for (var i = 0; i < 5; i += 1) {
    await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  }
  _check(device.bufferUploadCalls == settled, 'retained batch re-uploaded');
  // A changed batch streams again.
  batch.draw(_region(-1), 1, 0);
  await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  _check(device.bufferUploadCalls == settled + 1, 'changed batch not uploaded');
}

Future<void> _streamingDoesNotChurnBuffers() async {
  final (renderer, device, world) = await _renderer(QualityProfile.safe);
  final batch = SpriteBatch();
  final view = _view();
  void fill() => batch
    ..clear()
    ..draw(_region(-1), 0, 0);
  for (var i = 0; i < 4; i += 1) {
    fill();
    await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  }
  final created = device.bufferCreateCalls;
  for (var i = 0; i < 30; i += 1) {
    fill();
    await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  }
  _check(device.bufferCreateCalls == created, 'stream buffers re-created');
}

Future<void> _abortDiscards() async {
  final (renderer, device, world) = await _renderer(QualityProfile.safe);
  final batch = SpriteBatch()..draw(_region(-1), 0, 0);
  final encoder = renderer.beginFrame(world, _input());
  encoder.drawSprites(batch, _view());
  renderer.abortFrame();
  device.drawLog.clear();
  await _frame(renderer, world, (_) {});
  _check(_spriteDraws(device) == 0, 'aborted sprites drew next frame');
}

Future<void> _queueCopiesTheMatrix() async {
  final queue = FrameQueue()..beginFrame();
  final matrix = Float32List(16)..[0] = 3;
  queue.submitSprites(
    SpriteBatch()..draw(_region(-1), 0, 0),
    viewProjection: matrix,
  );
  matrix[0] = 9;
  _check(queue.spriteAt(0).viewProjection[0] == 3, 'matrix was not copied');
  queue.endFrame();
}

Future<void> _contextRestoreRebuilds() async {
  final (renderer, device, world) = await _renderer(QualityProfile.safe);
  final batch = SpriteBatch()..draw(_region(-1), 0, 0);
  final view = _view();
  await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  device.simulateContextLoss();
  device.simulateContextRestore();
  device.drawLog.clear();
  final uploads = device.bufferUploadCalls;
  await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  _check(_spriteDraws(device) == 1, 'no draw after restore');
  _check(device.bufferUploadCalls > uploads, 'no re-upload after restore');
}

Future<void> _disposeFreesEverything() async {
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  final baseline = device.liveObjectCount;
  await renderer.initialize(
    const RendererConfiguration(
      profile: QualityProfile.safe,
      internalWidth: 64,
      internalHeight: 64,
    ),
    SurfaceMetrics.pixels(width: 64, height: 64),
  );
  final world = renderer.createWorld();
  final batch = SpriteBatch()..draw(_region(-1), 0, 0);
  final view = _view();
  for (var i = 0; i < 3; i += 1) {
    await _frame(renderer, world, (e) => e.drawSprites(batch, view));
  }
  renderer.dispose();
  _check(
    device.liveObjectCount == baseline,
    'leaked ${device.liveObjectCount - baseline} GPU objects',
  );
}

Future<void> _graphsValidate() async {
  final batch = SpriteBatch()..draw(_region(-1), 0, 0);
  for (final (profile, samples) in [
    (QualityProfile.safe, 1),
    (QualityProfile.safe, 2),
    (QualityProfile.flat2d, 1),
    (QualityProfile.flat2d, 2),
    (QualityProfile.clean, 1),
    (QualityProfile.clean, 2),
  ]) {
    final (renderer, device, world) = await _renderer(
      profile,
      sampleCount: samples,
    );
    device.drawLog.clear();
    await _frame(renderer, world, (e) {
      e.drawSprites(batch, _view());
      e.drawSprites(batch, _view(), stage: SpriteStage.overlay);
    });
    _check(_spriteDraws(device) == 2, '${profile.kind.name}/$samples draws');
    // Overlay draws on the canvas, after present's full-screen triangle.
    final log = device.drawLog;
    final present = log.lastIndexOf('bindTarget(canvas)');
    _check(present >= 0, 'overlay never bound the canvas');
    final lastDraw = log.lastIndexWhere(
      (e) => e.startsWith('drawArraysInstanced'),
    );
    _check(lastDraw > present, '${profile.kind.name}: overlay before canvas');
    renderer.dispose();
  }
}

Future<void> _flat2dClearsGlowAndBlooms() async {
  final (renderer, device, world) = await _renderer(QualityProfile.flat2d);
  device.drawLog.clear();
  final encoder = renderer.beginFrame(
    world,
    FrameInput(
      camera: _camera,
      environment: const FrameEnvironment(),
      post: const PostProcessState(bloomStrength: 0.5),
      frameIndex: _frameIndex++,
      historyEpoch: 0,
      noiseSeed: 0,
      timeSeconds: 0,
    ),
  );
  expectEncoder(encoder);
  renderer.endFrame();
  _check(
    device.drawLog.contains('clearColorAttachment(1)'),
    'flat2d must clear the glow attachment',
  );
  _check(
    device.drawLog.any((e) => e.startsWith('bindGlowTexture')),
    'flat2d must run bloom',
  );
}

void expectEncoder(RenderEncoder encoder) =>
    _check(encoder is SpriteEncoder, 'frame encoder must draw sprites');

void main() async {
  await _noSpritesNoDraws();
  await _drawsOnePerRun();
  await _unchangedBatchIsNotReuploaded();
  await _streamingDoesNotChurnBuffers();
  await _abortDiscards();
  await _queueCopiesTheMatrix();
  await _contextRestoreRebuilds();
  await _disposeFreesEverything();
  await _graphsValidate();
  await _flat2dClearsGlowAndBlooms();
  print('sprite pass checks passed.');
}
