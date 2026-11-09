import 'dart:typed_data';

import '../api/scene.dart';
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

/// One queued sprite batch. Instances are pooled across frames.
final class SpriteSubmission {
  late SpriteBatch batch;
  final Float32List viewProjection = Float32List(16);
  SpriteStage stage = SpriteStage.world;
  bool depthTest = false;
}

/// This frame's queued sprite batches, in submission order.
abstract interface class SpriteSubmissions {
  int get spriteCount;
  SpriteSubmission spriteAt(int index);
}

/// Owns one frame's transient submission list as a persistent grow-only
/// buffer (§7.5: reused storage, no per-frame allocation after warm-up) and
/// implements `RenderEncoder`. `beginFrame`/`endFrame`/`abortFrame` enforce
/// §5.1's lifecycle: a borrowed encoder is invalid after end/abort, and an
/// abandoned (aborted) frame's submissions are discarded rather than
/// replayed by the next frame.
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
  }) {
    if (_state != FrameQueueState.active) {
      throw StateError('FrameQueue.submitSprites called outside an active frame');
    }
    if (viewProjection.length != 16) {
      throw ArgumentError('viewProjection must have 16 elements');
    }
    if (batch.isEmpty) return;
    if (_spriteCount == _sprites.length) _sprites.add(SpriteSubmission());
    final submission = _sprites[_spriteCount++]
      ..batch = batch
      ..stage = stage
      ..depthTest = depthTest;
    submission.viewProjection.setAll(0, viewProjection);
  }

  @override
  int get spriteCount => _spriteCount;

  @override
  SpriteSubmission spriteAt(int index) => _sprites[index];

  /// Returns exactly the items submitted this frame, ignoring any stale
  /// entries beyond [submittedThisFrame] left over from a larger prior
  /// frame's grow-only buffer.
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

  /// Discards this frame's submissions entirely; a subsequent `endFrame`
  /// read is not possible, and the next `beginFrame` starts clean.
  void abortFrame() {
    if (_state != FrameQueueState.active) {
      throw StateError('FrameQueue.abortFrame called without an active frame');
    }
    _submittedThisFrame = 0;
    _spriteCount = 0;
    _state = FrameQueueState.aborted;
  }
}
