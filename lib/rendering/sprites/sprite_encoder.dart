import 'dart:typed_data';

import '../api/scene.dart';
import 'camera_2d.dart';
import 'sprite_batch.dart';

enum SpriteStage {
  world,

  overlay,
}

abstract interface class SpriteEncoder {
  void submitSprites(
    SpriteBatch batch, {
    required Float32List viewProjection,
    SpriteStage stage = SpriteStage.world,
    bool depthTest = false,
  });
}

extension SpriteDrawing on RenderEncoder {
  void drawSprites(
    SpriteBatch batch,
    Camera2D camera, {
    SpriteStage stage = SpriteStage.world,
  }) => _sprites.submitSprites(
    batch,
    viewProjection: camera.viewProjection,
    stage: stage,
  );

  void drawSpritesWith(
    SpriteBatch batch,
    Float32List viewProjection, {
    SpriteStage stage = SpriteStage.world,
    bool depthTest = false,
  }) => _sprites.submitSprites(
    batch,
    viewProjection: viewProjection,
    stage: stage,
    depthTest: depthTest,
  );

  SpriteEncoder get _sprites {
    final self = this;
    if (self is SpriteEncoder) return self as SpriteEncoder;
    throw UnsupportedError('$runtimeType cannot draw sprites');
  }
}
