import 'dart:math' as math;
import 'package:pixeldart/rendering/math/curves.dart';
import 'package:pixeldart/rendering/math/quat.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/scene/animation.dart';
import 'package:pixeldart/rendering/scene/scene_node.dart';

void main() {
  _testCurves();
  _testVectorTrack();
  _testRotationTrack();
  _testLoopModes();
  _testAnimationPlayer();
  print('Animation engine tests passed.');
}

void _testCurves() {
  // Test linear
  assert(Curves.linear.transform(0.5) == 0.5);

  // Test easeInQuad
  assert(Curves.easeInQuad.transform(0.5) == 0.25);

  // Test bounceOut boundaries
  assert(Curves.bounceOut.transform(0.0) == 0.0);
  assert((Curves.bounceOut.transform(1.0) - 1.0).abs() < 1e-4);

  // Test CubicBezier
  final ease = const CubicBezier(0.25, 0.1, 0.25, 1.0);
  assert(ease.transform(0.0) == 0.0);
  assert(ease.transform(1.0) == 1.0);
  final mid = ease.transform(0.5);
  assert(mid > 0.0 && mid < 1.0);
}

void _testVectorTrack() {
  final node = SceneNode(name: 'test_node');
  final track = Vector3Track(
    target: node,
    keyframes: [
      const Keyframe(0.0, Vec3(0, 0, 0)),
      const Keyframe(1.0, Vec3(10, 20, 30), Curves.linear),
      const Keyframe(2.0, Vec3(10, 0, 10)),
    ],
  );

  track.evaluate(0.0);
  assert(node.position.x == 0 && node.position.y == 0 && node.position.z == 0);

  track.evaluate(0.5);
  assert(node.position.x == 5 && node.position.y == 10 && node.position.z == 15);

  track.evaluate(1.0);
  assert(node.position.x == 10 && node.position.y == 20 && node.position.z == 30);

  track.evaluate(1.5);
  assert(node.position.x == 10 && node.position.y == 10 && node.position.z == 20);
}

void _testRotationTrack() {
  final node = SceneNode(name: 'rot_node');
  final q0 = Quat.identity;
  final q1 = Quat.axisAngle(const Vec3(0, 1, 0), math.pi); // 180 deg around Y

  final track = RotationTrack(
    target: node,
    keyframes: [
      Keyframe(0.0, q0),
      Keyframe(1.0, q1, Curves.linear),
    ],
  );

  track.evaluate(0.0);
  assert((node.rotation.w - 1.0).abs() < 1e-4);

  track.evaluate(0.5); // Should be ~90 deg around Y (sin(45) ~ 0.707)
  assert((node.rotation.y - math.sin(math.pi / 4.0)).abs() < 1e-3);
}

void _testLoopModes() {
  final node = SceneNode();
  final track = Vector3Track(
    target: node,
    keyframes: const [
      Keyframe(0.0, Vec3(0, 0, 0)),
      Keyframe(1.0, Vec3(10, 0, 0)),
    ],
  );

  // Loop mode: loop
  final loopClip = AnimationClip(
    name: 'loop_clip',
    duration: 1.0,
    loopMode: LoopMode.loop,
    tracks: [track],
  );
  loopClip.sample(1.5); // 1.5 % 1.0 = 0.5 -> x = 5.0
  assert((node.position.x - 5.0).abs() < 1e-4);

  // Loop mode: pingPong
  final pingPongClip = AnimationClip(
    name: 'ping_clip',
    duration: 1.0,
    loopMode: LoopMode.pingPong,
    tracks: [track],
  );
  pingPongClip.sample(1.25); // cycle 1 (odd) -> 1.0 - 0.25 = 0.75 -> x = 7.5
  assert((node.position.x - 7.5).abs() < 1e-4);

  // Loop mode: once
  final onceClip = AnimationClip(
    name: 'once_clip',
    duration: 1.0,
    loopMode: LoopMode.once,
    tracks: [track],
  );
  onceClip.sample(2.5); // clamped to 1.0 -> x = 10.0
  assert((node.position.x - 10.0).abs() < 1e-4);
}

void _testAnimationPlayer() {
  final node = SceneNode();
  final track = Vector3Track(
    target: node,
    keyframes: const [
      Keyframe(0.0, Vec3(0, 0, 0)),
      Keyframe(1.0, Vec3(10, 0, 0)),
    ],
  );
  final clip = AnimationClip(
    name: 'move',
    duration: 1.0,
    loopMode: LoopMode.once,
    tracks: [track],
  );

  final player = AnimationPlayer();
  player.play(clip);
  assert(player.isPlaying('move'));

  player.update(0.5);
  assert((node.position.x - 5.0).abs() < 1e-4);

  player.update(0.6); // Total 1.1 > 1.0 duration, clip finished
  assert(!player.isPlaying('move'));
  assert((node.position.x - 10.0).abs() < 1e-4);
}
