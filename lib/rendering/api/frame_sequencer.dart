import 'effects.dart';
import 'frame.dart';

final class FrameSequencer {
  int _frameIndex;
  int _historyEpoch;
  String? _lastInvalidationReason;

  final int salt;

  FrameSequencer({this.salt = 0, int firstFrameIndex = 0, int historyEpoch = 0})
    : _frameIndex = firstFrameIndex,
      _historyEpoch = historyEpoch {
    if (firstFrameIndex < 0) {
      throw ArgumentError(
        'FrameSequencer.firstFrameIndex must be >= 0: $firstFrameIndex',
      );
    }
    if (historyEpoch < 0) {
      throw ArgumentError(
        'FrameSequencer.historyEpoch must be >= 0: $historyEpoch',
      );
    }
  }

  int get frameIndex => _frameIndex;

  int get historyEpoch => _historyEpoch;

  String? get lastInvalidationReason => _lastInvalidationReason;

  void invalidateHistory(String reason) {
    _historyEpoch++;
    _lastInvalidationReason = reason;
  }

  FrameInput next({
    required CameraView camera,
    required FrameEnvironment environment,
    required PostProcessState post,
    required double timeSeconds,
    int visibilityMask = -1,
    int? noiseSeed,
  }) {
    final input = FrameInput(
      camera: camera,
      environment: environment,
      post: post,
      visibilityMask: visibilityMask,
      frameIndex: _frameIndex,
      historyEpoch: _historyEpoch,
      noiseSeed: noiseSeed ?? _deriveSeed(_frameIndex, salt),
      timeSeconds: timeSeconds,
    );
    _frameIndex++;
    return input;
  }

  void reset({int frameIndex = 0, int historyEpoch = 0}) {
    if (frameIndex < 0 || historyEpoch < 0) {
      throw ArgumentError('FrameSequencer.reset requires non-negative values');
    }
    _frameIndex = frameIndex;
    _historyEpoch = historyEpoch;
    _lastInvalidationReason = null;
  }

  Map<String, Object?> toMap() => {
    'frameIndex': _frameIndex,
    'historyEpoch': _historyEpoch,
    if (_lastInvalidationReason != null)
      'lastInvalidationReason': _lastInvalidationReason,
  };

  static int _deriveSeed(int frameIndex, int salt) {
    var h = (frameIndex ^ (salt * 0x9E3779B1)) & 0x7FFFFFFF;
    h ^= (h >> 15);
    h = (h * 0x2C1B3C6D) & 0x7FFFFFFF;
    h ^= (h >> 12);
    h = (h * 0x297A2D39) & 0x7FFFFFFF;
    h ^= (h >> 15);
    return h;
  }
}
