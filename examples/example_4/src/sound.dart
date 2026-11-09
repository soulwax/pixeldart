import 'dart:js_interop';

import 'package:web/web.dart' as web;

/// A round-robin voice pool per effect, rate-limited so a swarm dying at
/// once is one crunch and not a hundred.
final class Sound {
  final Map<String, List<web.HTMLAudioElement>> _voices = {};
  final Map<String, int> _next = {};
  final Map<String, double> _last = {};
  bool muted = false;

  void register(String id, String file, {double volume = 0.5, int voices = 3}) {
    _voices[id] = [
      for (var i = 0; i < voices; i += 1)
        web.HTMLAudioElement()
          ..src = 'res/audio/$file.ogg'
          ..preload = 'auto'
          ..volume = volume,
    ];
    _next[id] = 0;
    _last[id] = -1;
  }

  void play(String id, {double minGap = 0.05}) {
    if (muted) return;
    final pool = _voices[id];
    if (pool == null) return;
    final now = web.window.performance.now() / 1000;
    if (now - _last[id]! < minGap) return;
    _last[id] = now;
    final i = _next[id]!;
    _next[id] = (i + 1) % pool.length;
    final voice = pool[i]..currentTime = 0;
    // play() rejects until the page has had a user gesture.
    voice.play().toDart.then((_) {}, onError: (Object _) {});
  }
}
