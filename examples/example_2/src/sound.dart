import 'dart:js_interop';

import 'package:web/web.dart' as web;

final class Sound {
  final Map<String, List<web.HTMLAudioElement>> _voices = {};
  final Map<String, int> _next = {};
  web.HTMLAudioElement? _engine;
  bool muted = false;

  void register(String id, String url, {double volume = 0.6, int voices = 3}) {
    _voices[id] = [
      for (var i = 0; i < voices; i++)
        web.HTMLAudioElement()
          ..src = url
          ..preload = 'auto'
          ..volume = volume,
    ];
    _next[id] = 0;
  }

  void registerEngine(String url, {double volume = 0.25}) {
    _engine = web.HTMLAudioElement()
      ..src = url
      ..loop = true
      ..preload = 'auto'
      ..volume = volume;
  }

  void play(String id) {
    if (muted) return;
    final pool = _voices[id];
    if (pool == null || pool.isEmpty) return;
    final i = _next[id]!;
    _next[id] = (i + 1) % pool.length;
    final voice = pool[i]..currentTime = 0;
    _start(voice);
  }

  // play() rejects until the page has had a user gesture; swallow that
  // instead of surfacing an unhandled promise rejection.
  static void _start(web.HTMLAudioElement voice) {
    voice.play().toDart.then((_) {}, onError: (Object _) {});
  }

  void engine({required bool running, double rate = 1.0}) {
    final e = _engine;
    if (e == null) return;
    if (running && !muted) {
      e.playbackRate = rate.clamp(0.5, 2.5);
      if (e.paused) _start(e);
    } else if (!e.paused) {
      e.pause();
    }
  }
}
