import 'effects.dart';
import 'frame.dart';

/// Owns the per-frame bookkeeping [FrameInput] requires.
///
/// `frameIndex`, `historyEpoch` and `noiseSeed` are three required fields that
/// have nothing to do with what a host is drawing, and getting `historyEpoch`
/// wrong is silent: temporal effects keep reprojecting against history that no
/// longer describes the scene. Hosts have reliably remembered to bump it on
/// context restore and reliably forgotten to bump it on resize and on
/// [configure], both of which rebuild the graph its history lived in.
///
/// Drive one of these instead:
///
/// ```dart
/// final frames = FrameSequencer();
/// // ...on resize, reconfigure, or context restore:
/// frames.invalidateHistory('surface resized');
/// // ...each frame:
/// renderer.beginFrame(world, frames.next(
///   camera: camera,
///   environment: environment,
///   post: post,
///   timeSeconds: elapsed,
/// ));
/// ```
final class FrameSequencer {
  int _frameIndex;
  int _historyEpoch;
  String? _lastInvalidationReason;

  /// Mixed into the derived noise seed so two sequencers in one process — a
  /// main view and a reflection probe, say — do not draw identical noise.
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

  /// The index the next [next] call will use.
  int get frameIndex => _frameIndex;

  /// The current temporal-history generation.
  int get historyEpoch => _historyEpoch;

  /// Why history was last invalidated, or null if it never has been.
  ///
  /// Surface this in diagnostics: a history epoch that climbs every frame is a
  /// host invalidating in its render loop by mistake, and it disables every
  /// temporal effect without erroring.
  String? get lastInvalidationReason => _lastInvalidationReason;

  /// Discards temporal history from the next frame onward.
  ///
  /// Call after anything that makes the previous frame an invalid reprojection
  /// source: a resize, a [SceneRenderer.configure], a context restore, or a
  /// camera cut. [reason] is kept for diagnostics, not interpreted.
  void invalidateHistory(String reason) {
    _historyEpoch++;
    _lastInvalidationReason = reason;
  }

  /// Builds the next [FrameInput], advancing the frame index.
  ///
  /// [noiseSeed] defaults to a value derived from the frame index and [salt],
  /// which is what a host wants unless it is reproducing a specific frame.
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

  /// Rewinds to a deterministic starting point, for capture harnesses and
  /// golden-image runs that must produce the same frame twice.
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

  /// A cheap integer hash. Deterministic across runs and platforms, which
  /// golden-image comparison depends on, and decorrelated enough that
  /// consecutive frames do not share a dither pattern.
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
