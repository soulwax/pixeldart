import '../math/curves.dart';
import '../math/quat.dart';
import '../math/vec.dart';
import 'scene_node.dart';

/// Playback repetition mode for animation clips.
enum LoopMode { once, loop, pingPong }

/// Keyframe with timestamp [time], target [value], and optional easing [curve].
final class Keyframe<T> {
  final double time;
  final T value;
  final Curve? curve;

  const Keyframe(this.time, this.value, [this.curve]);
}

/// Abstract track that animates a property on a [target] node over time.
abstract class KeyframeTrack<T> {
  final SceneNode target;
  final List<Keyframe<T>> keyframes;

  KeyframeTrack(this.target, List<Keyframe<T>> keyframes)
      : keyframes = List<Keyframe<T>>.unmodifiable(
          List<Keyframe<T>>.from(keyframes)
            ..sort((a, b) => a.time.compareTo(b.time)),
        ) {
    if (this.keyframes.isEmpty) {
      throw ArgumentError('KeyframeTrack requires at least one keyframe');
    }
  }

  void evaluate(double time);

  (Keyframe<T>, Keyframe<T>, double) _findBracket(double time) {
    if (time <= keyframes.first.time) {
      return (keyframes.first, keyframes.first, 0.0);
    }
    if (time >= keyframes.last.time) {
      return (keyframes.last, keyframes.last, 1.0);
    }

    var i = 0;
    while (i < keyframes.length - 1 && keyframes[i + 1].time <= time) {
      i++;
    }

    final k0 = keyframes[i];
    final k1 = keyframes[i + 1];
    final dt = k1.time - k0.time;
    final tNorm = dt > 1e-6 ? (time - k0.time) / dt : 0.0;
    final curve = k0.curve ?? Curves.linear;
    return (k0, k1, curve.transform(tNorm));
  }
}

/// Which vector property on [SceneNode] is targeted by [Vector3Track].
enum Vector3Property { position, scale }

/// Tracks and interpolates 3D vector properties on a [SceneNode].
final class Vector3Track extends KeyframeTrack<Vec3> {
  final Vector3Property property;

  Vector3Track({
    required SceneNode target,
    required List<Keyframe<Vec3>> keyframes,
    this.property = Vector3Property.position,
  }) : super(target, keyframes);

  @override
  void evaluate(double time) {
    final (k0, k1, t) = _findBracket(time);
    final val = k0.value + ((k1.value - k0.value) * t);
    switch (property) {
      case Vector3Property.position:
        target.position = val;
      case Vector3Property.scale:
        target.scale = val.x;
    }
  }
}

/// Tracks and interpolates rotation quaternions using spherical slerp.
final class RotationTrack extends KeyframeTrack<Quat> {
  RotationTrack({
    required SceneNode target,
    required List<Keyframe<Quat>> keyframes,
  }) : super(target, keyframes);

  @override
  void evaluate(double time) {
    final (k0, k1, t) = _findBracket(time);
    final q = Quat.slerp(k0.value, k1.value, t);
    target.rotation = q;
  }
}

/// Named collection of animation tracks running on a synchronized timeline.
final class AnimationClip {
  final String name;
  final double duration;
  final LoopMode loopMode;
  final List<KeyframeTrack> tracks;

  AnimationClip({
    required this.name,
    required this.duration,
    this.loopMode = LoopMode.loop,
    List<KeyframeTrack> tracks = const [],
  }) : tracks = List.unmodifiable(tracks) {
    if (duration <= 0) {
      throw ArgumentError('AnimationClip duration must be > 0: ');
    }
  }

  /// Evaluates all tracks at timestamp [time].
  void sample(double time) {
    var t = time;
    switch (loopMode) {
      case LoopMode.once:
        t = t.clamp(0.0, duration);
      case LoopMode.loop:
        t = t % duration;
        if (t < 0) t += duration;
      case LoopMode.pingPong:
        final cycle = (t / duration).floor();
        final rem = t % duration;
        final normRem = rem < 0 ? rem + duration : rem;
        t = cycle.isEven ? normRem : duration - normRem;
    }

    for (var i = 0; i < tracks.length; i++) {
      tracks[i].evaluate(t);
    }
  }
}

final class _ActiveClipInstance {
  final AnimationClip clip;
  double currentTime = 0.0;
  double speed = 1.0;
  bool isPaused = false;

  _ActiveClipInstance(this.clip, {this.speed = 1.0});

  bool update(double dt) {
    if (isPaused) return true;
    currentTime += dt * speed;
    clip.sample(currentTime);
    if (clip.loopMode == LoopMode.once && currentTime >= clip.duration) {
      return false;
    }
    return true;
  }
}

/// Manages and steps concurrent animation clip instances.
final class AnimationPlayer {
  final Map<String, _ActiveClipInstance> _active = {};

  /// Plays [clip] with optional [speed].
  void play(AnimationClip clip, {double speed = 1.0}) {
    _active[clip.name] = _ActiveClipInstance(clip, speed: speed);
  }

  /// Pauses playback of [clipName].
  void pause(String clipName) {
    _active[clipName]?.isPaused = true;
  }

  /// Resumes playback of [clipName].
  void resume(String clipName) {
    _active[clipName]?.isPaused = false;
  }

  /// Stops and removes [clipName].
  void stop(String clipName) {
    _active.remove(clipName);
  }

  /// Checks if [clipName] is currently active.
  bool isPlaying(String clipName) => _active.containsKey(clipName);

  /// Steps all active animation clips by [dt] seconds.
  void update(double dt) {
    _active.removeWhere((_, instance) => !instance.update(dt));
  }

  /// Clears all active animations.
  void clear() {
    _active.clear();
  }
}
