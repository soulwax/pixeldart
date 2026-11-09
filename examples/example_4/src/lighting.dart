import 'dart:math' as math;
import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';

import 'art.dart';

const double _cell = 4;
const int _levels = 9;
const List<int> _bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/// The night: a grid of multiply rectangles over the whole view.
///
/// Multiply can only darken, so a soft light sprite can't cut a hole in a
/// darkness already drawn. Each cell's brightness is summed on the CPU
/// instead, and quantized and dithered, which suits the art; equal
/// neighbours merge into one rectangle.
final class NightLight {
  final Art art;
  Float32List _grid = Float32List(0);
  Float32List _blank = Float32List(0);
  int _columns = 0, _rows = 0;
  double _originX = 0, _originY = 0;
  final List<int> _ramp = List.filled(_levels, 0);

  NightLight(this.art);

  /// Starts a frame over [camera]'s view. [darkness] 0 is dusk, 1 midnight.
  void begin(Camera2D camera, double darkness) {
    _originX = (camera.left / _cell).floorToDouble() * _cell;
    _originY = (camera.top / _cell).floorToDouble() * _cell;
    _columns = ((camera.right - _originX) / _cell).ceil() + 1;
    _rows = ((camera.bottom - _originY) / _cell).ceil() + 1;
    final cells = _columns * _rows;
    if (_grid.length < cells) {
      _grid = Float32List(cells);
      _blank = Float32List(cells);
    } else {
      _grid.setRange(0, cells, _blank);
    }

    final r0 = 50 - 26 * darkness, g0 = 58 - 28 * darkness, b0 = 112 - 40 * darkness;
    for (var i = 0; i < _levels; i += 1) {
      final t = i / (_levels - 1);
      _ramp[i] = rgba(
        (r0 + (255 - r0) * t).round(),
        (g0 + (242 - g0) * t).round(),
        (b0 + (214 - b0) * t).round(),
      );
    }
  }

  /// Adds a pool of light; [strength] 1 is full brightness at its centre.
  void add(double x, double y, double radius, double strength) {
    final firstColumn = math.max(0, ((x - radius - _originX) / _cell).floor());
    final lastColumn = math.min(_columns - 1, ((x + radius - _originX) / _cell).ceil());
    final firstRow = math.max(0, ((y - radius - _originY) / _cell).floor());
    final lastRow = math.min(_rows - 1, ((y + radius - _originY) / _cell).ceil());
    final r2 = radius * radius;
    for (var row = firstRow; row <= lastRow; row += 1) {
      final dy = _originY + (row + 0.5) * _cell - y;
      for (var column = firstColumn; column <= lastColumn; column += 1) {
        final dx = _originX + (column + 0.5) * _cell - x;
        final d2 = dx * dx + dy * dy;
        if (d2 >= r2) continue;
        final falloff = 1 - d2 / r2;
        _grid[row * _columns + column] += falloff * falloff * strength;
      }
    }
  }

  /// Emits the rectangles.
  void draw(SpriteBatch batch) {
    final solid = art.solid;
    // The dither follows world cells so it doesn't crawl as the view moves.
    final worldRow = (_originY / _cell).floor(), worldColumn = (_originX / _cell).floor();
    for (var row = 0; row < _rows; row += 1) {
      var runStart = 0;
      var runLevel = -1;
      final y = _originY + row * _cell;
      for (var column = 0; column <= _columns; column += 1) {
        var level = -2;
        if (column < _columns) {
          final value = _grid[row * _columns + column].clamp(0.0, 1.0) * (_levels - 1);
          final whole = value.floor();
          final threshold = (_bayer[((worldRow + row) & 3) * 4 + ((worldColumn + column) & 3)] + 0.5) / 16;
          level = math.min(_levels - 1, value - whole > threshold ? whole + 1 : whole);
        }
        if (level == runLevel) continue;
        if (runLevel >= 0) {
          batch.drawRect(
            _originX + runStart * _cell,
            y,
            (column - runStart) * _cell,
            _cell,
            region: solid,
            color: _ramp[runLevel],
            blend: SpriteBlend.multiply,
          );
        }
        runStart = column;
        runLevel = level;
      }
    }
  }
}
