import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';

import 'art.dart';
import 'game.dart';

const int _ink = 0xF4E9D0FF;
const int _dim = 0xA8A08CFF;
const int _flame = 0xFFB65AFF;
const int _panel = 0x0A0812C8;

/// Everything on top of the world, drawn after all post-processing.
final class Hud {
  final Game game;

  /// Same design size as the world view, so text scales with the art.
  final Camera2D camera = Camera2D(
    designWidth: 400,
    designHeight: 225,
    fit: ViewFit.contain,
  );

  late final BitmapFont _font = game.art.font;
  late final SpriteRegion _solid = game.art.solid;
  late final SpriteRegion _heart = game.art.tile(dungeon + 115);
  late final SpriteRegion _arrow = game.art.chevron;
  final List<int> _nearest = List<int>.filled(4, -1);
  final List<double> _distances = List<double>.filled(4, double.infinity);

  Hud(this.game);

  double get _w => camera.viewWidth;
  double get _h => camera.viewHeight;

  /// The flare control accepts pointer coordinates in canvas device pixels.
  bool flareButtonHit(double screenX, double screenY) {
    final point = camera.screenToWorld(screenX, screenY);
    return point.x >= _w - 46 &&
        point.x <= _w - 6 &&
        point.y >= _h - 51 &&
        point.y <= _h - 19;
  }

  void draw(SpriteBatch batch) {
    // World origin at the top-left of the overlay.
    camera
      ..x = _w / 2
      ..y = _h / 2;
    switch (game.phase) {
      case Phase.title:
        _titleCard(batch);
      case Phase.playing || Phase.dawn:
        _playing(batch);
      case Phase.over:
        _playing(batch);
        _endCard(batch, 'THE LINE IS BROKEN', false);
      case Phase.won:
        _endCard(batch, 'MORNING AT LAST', true);
    }
    if (game.showStats) _stats(batch);
  }

  void _playing(SpriteBatch batch) {
    for (var i = 0; i < 5; i += 1) {
      batch.draw(
        _heart,
        8 + i * 13,
        7,
        originX: 0,
        originY: 0,
        color: i < game.hearts ? 0xFFFFFFFF : 0x40404080,
      );
    }
    final p = game.procession;
    _font.draw(
      batch,
      'NIGHT ${game.nightNumber}',
      _w / 2,
      4,
      alignX: 0.5,
      color: _flame,
    );
    _font.draw(batch, '${game.score}', _w - 8, 4, alignX: 1, color: _ink);
    _font.draw(
      batch,
      'line ${p.line.length}   waiting ${p.strays.length}   home ${game.savedTonight}',
      8,
      _h - 15,
      color: _ink,
    );

    // The flare's charge, as a bar.
    const barW = 60.0;
    final barX = _w - barW - 8, barY = _h - 15;
    batch.drawRect(
      barX - 1,
      barY - 1,
      barW + 2,
      5,
      region: _solid,
      color: _panel,
    );
    final charge = game.flareCharge;
    batch.drawRect(
      barX,
      barY,
      barW * charge,
      3,
      region: _solid,
      color: charge >= 1 ? _flame : _dim,
    );
    _font.draw(
      batch,
      'FLARE',
      barX - 4,
      _h - 19,
      alignX: 1,
      color: charge >= 1 ? _flame : _dim,
    );
    // A large enough target for touch, while Space remains the keyboard action.
    final buttonX = _w - 44, buttonY = _h - 50;
    batch.drawRect(buttonX, buttonY, 38, 30, region: _solid, color: _panel);
    batch.drawRect(
      buttonX + 2,
      buttonY + 2,
      34,
      26,
      region: _solid,
      color: charge >= 1 ? 0x7B3D24E0 : 0x353039D0,
    );
    _font.draw(
      batch,
      'FLARE',
      buttonX + 19,
      buttonY + 9,
      alignX: 0.5,
      color: charge >= 1 ? _ink : _dim,
    );

    if (game.toastTime > 0) {
      final alpha = (math.min(1.0, game.toastTime) * 255).toInt();
      _font.draw(
        batch,
        game.toast,
        _w / 2 + 1,
        _h * 0.22 + 1,
        alignX: 0.5,
        scale: 2,
        color: alpha,
      );
      _font.draw(
        batch,
        game.toast,
        _w / 2,
        _h * 0.22,
        alignX: 0.5,
        scale: 2,
        color: (_flame & 0xFFFFFF00) | alpha,
      );
    }

    final v = p.leader;
    _pointer(batch, game.map.keepX, game.map.keepY, 0xFFD070FF);
    // Four nearest markers without allocating and sorting a new list per frame.
    _nearest.fillRange(0, 4, -1);
    _distances.fillRange(0, 4, double.infinity);
    for (var index = 0; index < p.strays.length; index += 1) {
      final stray = p.strays[index];
      final distance = _distance2(stray.x, stray.y, v.x, v.y);
      for (var slot = 0; slot < 4; slot += 1) {
        if (distance >= _distances[slot]) continue;
        for (var shift = 3; shift > slot; shift -= 1) {
          _nearest[shift] = _nearest[shift - 1];
          _distances[shift] = _distances[shift - 1];
        }
        _nearest[slot] = index;
        _distances[slot] = distance;
        break;
      }
    }
    for (final index in _nearest) {
      if (index < 0) break;
      final stray = p.strays[index];
      _pointer(batch, stray.x, stray.y, 0xF4E9D0B0);
    }
  }

  /// An arrow at the edge of the view toward anything out of sight.
  void _pointer(SpriteBatch batch, double x, double y, int color) {
    final world = game.camera;
    if (x > world.left && x < world.right && y > world.top && y < world.bottom) {
      return;
    }
    final dx = x - world.x, dy = y - world.y;
    final angle = math.atan2(dy, dx);
    final c = math.cos(angle), s = math.sin(angle);
    final halfW = _w / 2 - 14, halfH = _h / 2 - 20;
    final reach = math.min(
      halfW / math.max(c.abs(), 0.001),
      halfH / math.max(s.abs(), 0.001),
    );
    batch.draw(
      _arrow,
      _w / 2 + c * reach,
      _h / 2 + s * reach,
      rotation: angle,
      color: color,
    );
  }

  static double _distance2(double ax, double ay, double bx, double by) =>
      (ax - bx) * (ax - bx) + (ay - by) * (ay - by);

  void _titleCard(SpriteBatch batch) {
    _shade(batch, 0xC8);
    _font.draw(
      batch,
      'PROCESSION',
      _w / 2,
      _h * 0.17,
      alignX: 0.5,
      scale: 4,
      color: _flame,
    );
    final cy = _h * 0.46;
    _font.draw(
      batch,
      'The dark has come to the hamlets.\n'
      'Walk out with your lamp, gather whoever waits,\n'
      'and lead the line home to the keep.\n'
      'If they catch one of yours, everyone behind them runs.',
      _w / 2,
      cy,
      alignX: 0.5,
      color: _ink,
    );
    _font.draw(
      batch,
      'WASD / arrows / drag to walk     SPACE / tap FLARE\n\nSPACE or tap to begin',
      _w / 2,
      _h * 0.8,
      alignX: 0.5,
      color: _dim,
    );
  }

  void _endCard(SpriteBatch batch, String headline, bool won) {
    final alpha = (math.min(1.0, game.phaseTime / 0.6) * 0xC8).toInt();
    _shade(batch, won ? alpha ~/ 2 : alpha);
    _font.draw(
      batch,
      headline,
      _w / 2,
      _h * 0.26,
      alignX: 0.5,
      scale: 3,
      color: won ? _flame : 0xFF8A7AFF,
    );
    _font.draw(
      batch,
      'Brought home ${game.savedTotal}    Lost ${game.lostTotal}\n'
      'Monsters felled ${game.kills}\n\n'
      'SCORE ${game.score}',
      _w / 2,
      _h * 0.5,
      alignX: 0.5,
      color: _ink,
    );
    if (game.phaseTime > 0.8) {
      _font.draw(
        batch,
        'SPACE or tap to walk again',
        _w / 2,
        _h * 0.82,
        alignX: 0.5,
        color: _dim,
      );
    }
  }

  void _shade(SpriteBatch batch, int alpha) {
    batch.drawRect(
      0,
      0,
      _w,
      _h,
      region: _solid,
      color: (_panel & 0xFFFFFF00) | alpha,
    );
  }

  void _stats(SpriteBatch batch) {
    final g = game;
    _font.draw(
      batch,
      '${g.fps.toStringAsFixed(0)} fps   sim ${g.simMs.toStringAsFixed(1)} ms   build ${g.buildMs.toStringAsFixed(1)} ms\n'
      '${g.swarm.count} monsters   ${g.spritesDrawn} sprites   ppu ${camera.pixelsPerUnit.toStringAsFixed(0)}',
      8,
      24,
      color: _flame,
    );
  }
}
