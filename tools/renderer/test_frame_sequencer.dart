import 'dart:io';

import 'package:pixeldart/rendering/rendering.dart';

void check(bool condition, String message) {
  if (!condition) throw StateError('frame sequencer: $message');
}

void expectThrows(void Function() body, String what) {
  try {
    body();
  } on ArgumentError {
    return;
  }
  throw StateError('frame sequencer: $what should have thrown');
}

CameraView _camera() => CameraView.look(
  eye: const Vec3(0, 1, 4),
  forward: const Vec3(0, 0, -1),
  fovYRadians: 1.0,
  aspect: 16 / 9,
  near: 0.1,
  far: 100,
);

FrameInput _next(FrameSequencer sequencer, double time) => sequencer.next(
  camera: _camera(),
  environment: const FrameEnvironment(clearColor: LinearColor(0, 0, 0)),
  post: PostProcessState.off,
  timeSeconds: time,
);

void main() {
  final frames = FrameSequencer();
  check(frames.frameIndex == 0, 'a fresh sequencer starts at frame 0');
  check(frames.historyEpoch == 0, 'a fresh sequencer starts at epoch 0');
  check(
    frames.lastInvalidationReason == null,
    'a fresh sequencer has no invalidation reason',
  );

  final first = _next(frames, 0);
  final second = _next(frames, 1 / 60);
  first.validate();
  second.validate();
  check(first.frameIndex == 0, 'first frame is index 0');
  check(second.frameIndex == 1, 'the index advances per frame');
  check(
    first.historyEpoch == second.historyEpoch,
    'the epoch must NOT advance per frame — that would disable every temporal '
    'effect while looking like it worked',
  );

  // Consecutive frames must not share a noise seed, or dithering and SSAO
  // rotation stop varying and the image stipples.
  check(
    first.noiseSeed != second.noiseSeed,
    'consecutive frames must derive different noise seeds',
  );
  check(
    first.noiseSeed >= 0 && second.noiseSeed >= 0,
    'derived seeds must be non-negative',
  );

  // Invalidation is the operation hosts forget. It bumps once, not per frame.
  frames.invalidateHistory('surface resized');
  final third = _next(frames, 2 / 60);
  check(
    third.historyEpoch == first.historyEpoch + 1,
    'invalidateHistory must advance the epoch exactly once',
  );
  check(
    frames.lastInvalidationReason == 'surface resized',
    'the reason must be retained for diagnostics',
  );
  final fourth = _next(frames, 3 / 60);
  check(
    fourth.historyEpoch == third.historyEpoch,
    'the epoch must hold steady after an invalidation until the next one',
  );

  // Determinism: golden-image capture depends on the same inputs producing the
  // same seeds on every run and platform.
  final a = FrameSequencer();
  final b = FrameSequencer();
  for (var i = 0; i < 8; i++) {
    check(
      _next(a, i / 60).noiseSeed == _next(b, i / 60).noiseSeed,
      'two sequencers with the same history must agree at frame $i',
    );
  }

  // Salt decorrelates concurrent sequencers, so a probe view and a main view
  // do not draw the same noise pattern.
  final salted = FrameSequencer(salt: 7);
  final unsalted = FrameSequencer();
  check(
    _next(salted, 0).noiseSeed != _next(unsalted, 0).noiseSeed,
    'salt must decorrelate concurrent sequencers',
  );

  // reset() makes a capture harness reproducible.
  final capture = FrameSequencer();
  final before = _next(capture, 0).noiseSeed;
  _next(capture, 1);
  _next(capture, 2);
  capture.reset();
  check(
    capture.frameIndex == 0 && capture.historyEpoch == 0,
    'reset must rewind both counters',
  );
  check(
    _next(capture, 0).noiseSeed == before,
    'reset must reproduce the original frame exactly',
  );

  // An explicit seed overrides derivation, for reproducing one specific frame.
  final pinned = FrameSequencer().next(
    camera: _camera(),
    environment: const FrameEnvironment(clearColor: LinearColor(0, 0, 0)),
    post: PostProcessState.off,
    timeSeconds: 0,
    noiseSeed: 4242,
  );
  check(pinned.noiseSeed == 4242, 'an explicit seed must win');

  // Resuming mid-stream, for a host restoring a session.
  final resumed = FrameSequencer(firstFrameIndex: 900, historyEpoch: 3);
  final resumedFrame = _next(resumed, 15);
  check(
    resumedFrame.frameIndex == 900,
    'a resumed sequencer honours its start',
  );
  check(
    resumedFrame.historyEpoch == 3,
    'a resumed sequencer honours its epoch',
  );

  expectThrows(
    () => FrameSequencer(firstFrameIndex: -1),
    'a negative starting frame index',
  );
  expectThrows(
    () => FrameSequencer(historyEpoch: -1),
    'a negative starting epoch',
  );
  expectThrows(
    () => FrameSequencer().reset(frameIndex: -1),
    'a negative reset',
  );

  stdout.writeln('Frame sequencer fixtures passed.');
}
