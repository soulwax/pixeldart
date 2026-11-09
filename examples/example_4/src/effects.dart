import 'dart:math' as math;
import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';

import 'art.dart';

const int _maxParticles = 6000;

final class Particles {
  final Art art;
  final math.Random rng;

  final Float32List _x = Float32List(_maxParticles), _y = Float32List(_maxParticles);
  final Float32List _vx = Float32List(_maxParticles), _vy = Float32List(_maxParticles);
  final Float32List _life = Float32List(_maxParticles), _span = Float32List(_maxParticles);
  final Float32List _size = Float32List(_maxParticles), _spin = Float32List(_maxParticles);
  final Float32List _additive = Float32List(_maxParticles), _glow = Float32List(_maxParticles);
  final Uint32List _color = Uint32List(_maxParticles);
  final List<SpriteRegion?> _region = List.filled(_maxParticles, null);
  int _count = 0;

  Particles(this.art, this.rng);

  void clear() => _count = 0;

  void add(
    SpriteRegion region,
    double x,
    double y, {
    double vx = 0,
    double vy = 0,
    double life = 0.5,
    double size = 8,
    int color = 0xFFFFFFFF,
    double additive = 1,
    double glow = 0,
  }) {
    if (_count >= _maxParticles) return;
    final i = _count++;
    _region[i] = region;
    _x[i] = x;
    _y[i] = y;
    _vx[i] = vx;
    _vy[i] = vy;
    _life[i] = _span[i] = life;
    _size[i] = size;
    _spin[i] = rng.nextDouble() * 6.28;
    _color[i] = color;
    _additive[i] = additive;
    _glow[i] = glow;
  }

  void burst(
    SpriteRegion region,
    double x,
    double y,
    int count, {
    double speed = 60,
    double life = 0.45,
    double size = 7,
    int color = 0xFFFFFFFF,
    double additive = 1,
    double glow = 0,
  }) {
    for (var i = 0; i < count; i += 1) {
      final angle = rng.nextDouble() * 6.28;
      final pace = speed * (0.35 + rng.nextDouble() * 0.65);
      add(
        region,
        x,
        y,
        vx: math.cos(angle) * pace,
        vy: math.sin(angle) * pace,
        life: life * (0.6 + rng.nextDouble() * 0.5),
        size: size * (0.7 + rng.nextDouble() * 0.6),
        color: color,
        additive: additive,
        glow: glow,
      );
    }
  }

  void step(double dt) {
    var i = 0;
    while (i < _count) {
      _life[i] -= dt;
      if (_life[i] <= 0) {
        final last = --_count;
        if (i != last) _move(last, i);
        continue;
      }
      _x[i] += _vx[i] * dt;
      _y[i] += _vy[i] * dt;
      _vx[i] *= 0.96;
      _vy[i] *= 0.96;
      i += 1;
    }
  }

  void _move(int from, int to) {
    _region[to] = _region[from];
    _x[to] = _x[from];
    _y[to] = _y[from];
    _vx[to] = _vx[from];
    _vy[to] = _vy[from];
    _life[to] = _life[from];
    _span[to] = _span[from];
    _size[to] = _size[from];
    _spin[to] = _spin[from];
    _color[to] = _color[from];
    _additive[to] = _additive[from];
    _glow[to] = _glow[from];
  }

  void draw(SpriteBatch batch) {
    for (var i = 0; i < _count; i += 1) {
      final t = _life[i] / _span[i];
      final alpha = ((_color[i] & 0xFF) * t).toInt();
      batch.draw(
        _region[i]!,
        _x[i],
        _y[i],
        width: _size[i],
        height: _size[i],
        rotation: _spin[i],
        color: (_color[i] & 0xFFFFFF00) | alpha,
        additive: _additive[i],
        glow: _glow[i],
        layer: 2,
      );
    }
  }
}
