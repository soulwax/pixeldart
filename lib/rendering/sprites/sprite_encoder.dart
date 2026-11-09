import 'dart:typed_data';

import '../api/scene.dart';
import 'camera_2d.dart';
import 'sprite_batch.dart';

/// Where in the frame a batch draws.
enum SpriteStage {
  /// Into the scene, before post-processing: bloom and grading apply.
  world,

  /// Onto the finished frame after every effect, for HUDs and menus.
  overlay,
}

/// Implemented by a [RenderEncoder] that can draw sprites. Hosts normally
/// call `encoder.drawSprites` instead.
abstract interface class SpriteEncoder {
  /// Queues [batch] for this frame. [viewProjection] is copied, so a camera
  /// can move on and draw again. [batch] must not change until the frame
  /// ends. With [depthTest], sprites at their record's `z` are hidden behind
  /// nearer 3D geometry; it only applies at [SpriteStage.world].
  void submitSprites(
    SpriteBatch batch, {
    required Float32List viewProjection,
    SpriteStage stage = SpriteStage.world,
    bool depthTest = false,
  });
}

extension SpriteDrawing on RenderEncoder {
  /// Queues [batch] for this frame, seen through [camera].
  void drawSprites(
    SpriteBatch batch,
    Camera2D camera, {
    SpriteStage stage = SpriteStage.world,
  }) => _sprites.submitSprites(
    batch,
    viewProjection: camera.viewProjection,
    stage: stage,
  );

  /// Queues [batch] through any world-to-clip matrix, such as a 3D
  /// `CameraView.viewProjection.m` for sprites placed in a 3D scene.
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
