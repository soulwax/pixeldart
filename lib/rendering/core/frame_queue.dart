import 'dart:typed_data';

import '../api/scene.dart';
import '../api/shaders.dart';
import '../sprites/sprite_batch.dart';
import '../sprites/sprite_encoder.dart';

final class DrawStatistics {
  final int drawCalls;
  final int trianglesSubmitted;
  final int trianglesCulled;
  final int instancesSubmitted;
  final int instancesCulled;

  const DrawStatistics({
    this.drawCalls = 0,
    this.trianglesSubmitted = 0,
    this.trianglesCulled = 0,
    this.instancesSubmitted = 0,
    this.instancesCulled = 0,
  });
}

enum FrameQueueState { idle, active, ended, aborted }

final class SpriteSubmission {
  late SpriteBatch batch;
  final Float32List viewProjection = Float32List(16);
  SpriteStage stage = SpriteStage.world;
  bool depthTest = false;
  ShaderHandle? shader;
}

abstract interface class SpriteSubmissions {
  int get spriteCount;
  SpriteSubmission spriteAt(int index);
}

final class FrameQueue
    implements RenderEncoder, SpriteEncoder, SpriteSubmissions {
  final List<RetainedItemDescriptor> _transientItems = [];
  final List<SpriteSubmission> _sprites = [];
  int _spriteCount = 0;
  FrameQueueState _state = FrameQueueState.idle;
  int _submittedThisFrame = 0;

  FrameQueueState get state => _state;
  int get submittedThisFrame => _submittedThisFrame;

  RenderEncoder beginFrame() {
    if (_state == FrameQueueState.active) {
      throw StateError('FrameQueue.beginFrame called twice without end/abort');
    }
    _state = FrameQueueState.active;
    _submittedThisFrame = 0;
    _transientItems.clear();
    _spriteCount = 0;
    return this;
  }

  @override
  void submit(RetainedItemDescriptor transientItem) {
    if (_state != FrameQueueState.active) {
      throw StateError('FrameQueue.submit called outside an active frame');
    }
    transientItem.validate();
    if (_submittedThisFrame < _transientItems.length) {
      _transientItems[_submittedThisFrame] = transientItem;
    } else {
      _transientItems.add(transientItem);
    }
    _submittedThisFrame += 1;
  }

  @override
  void submitSprites(
    SpriteBatch batch, {
    required Float32List viewProjection,
    SpriteStage stage = SpriteStage.world,
    bool depthTest = false,
    ShaderHandle? shader,
  }) {
    if (_state != FrameQueueState.active) {
      throw StateError(
        'FrameQueue.submitSprites called outside an active frame',
      );
    }
    if (viewProjection.length != 16) {
      throw ArgumentError('viewProjection must have 16 elements');
    }
    if (batch.isEmpty) return;
    if (_spriteCount == _sprites.length) _sprites.add(SpriteSubmission());
    final submission = _sprites[_spriteCount++]
      ..batch = batch
      ..stage = stage
      ..depthTest = depthTest
      ..shader = shader;
    submission.viewProjection.setAll(0, viewProjection);
  }

  @override
  int get spriteCount => _spriteCount;

  @override
  SpriteSubmission spriteAt(int index) => _sprites[index];

  List<RetainedItemDescriptor> endFrame() {
    if (_state != FrameQueueState.active) {
      throw StateError('FrameQueue.endFrame called without an active frame');
    }
    final submitted = _transientItems
        .take(_submittedThisFrame)
        .toList(growable: false);
    _state = FrameQueueState.ended;
    return submitted;
  }

  void abortFrame() {
    if (_state != FrameQueueState.active) {
      throw StateError('FrameQueue.abortFrame called without an active frame');
    }
    _submittedThisFrame = 0;
    _spriteCount = 0;
    _state = FrameQueueState.aborted;
  }
}
