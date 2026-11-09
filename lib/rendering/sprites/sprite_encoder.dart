import 'dart:typed_data';

import '../api/scene.dart';
import '../api/shaders.dart';
import 'camera_2d.dart';
import 'sprite_batch.dart';

enum SpriteStage { world, overlay }

abstract interface class SpriteEncoder {
  void submitSprites(
    SpriteBatch batch, {
    required Float32List viewProjection,
    SpriteStage stage = SpriteStage.world,
    bool depthTest = false,
    ShaderHandle? shader,
  });
}

extension SpriteDrawing on RenderEncoder {
  /// Draws [batch]. A registered [shader] applies to this draw only; the same
  /// batch can be submitted again with another.
  void drawSprites(
    SpriteBatch batch,
    Camera2D camera, {
    SpriteStage stage = SpriteStage.world,
    ShaderHandle? shader,
  }) => _sprites.submitSprites(
    batch,
    viewProjection: camera.viewProjection,
    stage: stage,
    shader: shader,
  );

  void drawSpritesWith(
    SpriteBatch batch,
    Float32List viewProjection, {
    SpriteStage stage = SpriteStage.world,
    bool depthTest = false,
    ShaderHandle? shader,
  }) => _sprites.submitSprites(
    batch,
    viewProjection: viewProjection,
    stage: stage,
    depthTest: depthTest,
    shader: shader,
  );

  SpriteEncoder get _sprites {
    final self = this;
    if (self is SpriteEncoder) return self as SpriteEncoder;
    throw UnsupportedError('$runtimeType cannot draw sprites');
  }
}
