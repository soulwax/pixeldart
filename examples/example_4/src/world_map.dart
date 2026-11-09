import 'dart:math' as math;
import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';

import 'art.dart';

const double tileSize = 16;
const int mapColumns = 140;
const int mapRows = 100;
const int mapCells = mapColumns * mapRows;

const int _keepHalf = 4;
const int _hamletCount = 9;

// Grass that trampling may wear down.
const int _grass = town + 0, _grassTuft = town + 1, _grassFlower = town + 2;
const List<int> _treeTiles = [town + 3, town + 4, town + 5, town + 15, town + 16, town + 27, town + 28];

/// The landscape: ground tiles, what blocks movement, and where things are.
///
/// Trees are kept out of the tile layers because walkers pass in front of
/// and behind them; the world batch y-sorts them with everyone else.
final class WorldMap {
  final Art art;
  final math.Random rng;

  late final TileLayer ground;
  late final TileLayer deco;

  /// 1 where nothing on foot may stand.
  final Uint8List solid = Uint8List(mapCells);

  /// 1 inside the keep, which monsters may not enter.
  final Uint8List keep = Uint8List(mapCells);

  /// [solid] or [keep]: everywhere walking monsters are stopped.
  final Uint8List monsterBlock = Uint8List(mapCells);

  /// Tree tile id + 1 per cell, or 0.
  final Uint8List trees = Uint8List(mapCells);

  /// Cell indices safe to scatter villagers and spawn monsters on.
  final List<int> hamlets = [];
  final List<(double, double)> torches = [];

  final int keepColumn = mapColumns ~/ 2;
  final int keepRow = mapRows ~/ 2;

  WorldMap(this.art, this.rng) {
    ground = TileLayer(
      columns: mapColumns,
      rows: mapRows,
      tileWidth: tileSize,
      tileHeight: tileSize,
      tileset: art.tileset,
    );
    deco = TileLayer(
      columns: mapColumns,
      rows: mapRows,
      tileWidth: tileSize,
      tileHeight: tileSize,
      tileset: art.tileset,
    );
    regenerate();
  }

  double get keepX => (keepColumn + 0.5) * tileSize;
  double get keepY => (keepRow + 0.5) * tileSize;
  double get width => mapColumns * tileSize;
  double get height => mapRows * tileSize;

  static int cellOf(int column, int row) => row * mapColumns + column;
  static int columnAt(double x) => (x / tileSize).floor().clamp(0, mapColumns - 1);
  static int rowAt(double y) => (y / tileSize).floor().clamp(0, mapRows - 1);
  int cellAt(double x, double y) => cellOf(columnAt(x), rowAt(y));

  bool blockedAt(double x, double y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return true;
    return solid[cellAt(x, y)] == 1;
  }

  bool inKeep(double x, double y) => keep[cellAt(x, y)] == 1;

  void regenerate() {
    solid.fillRange(0, mapCells, 0);
    keep.fillRange(0, mapCells, 0);
    trees.fillRange(0, mapCells, 0);
    hamlets.clear();
    torches.clear();

    final forest = _Noise(rng, 14);
    final lakes = _Noise(rng, 9);
    final tiles = Int32List(mapCells);
    for (var row = 0; row < mapRows; row += 1) {
      for (var column = 0; column < mapColumns; column += 1) {
        final cell = cellOf(column, row);
        final roll = rng.nextDouble();
        tiles[cell] = roll < 0.78 ? _grass : (roll < 0.95 ? _grassTuft : _grassFlower);
        final u = column / mapColumns, v = row / mapRows;
        if (lakes.at(u, v) > 0.7) {
          tiles[cell] = waterTile;
          solid[cell] = 1;
        } else if (forest.at(u, v) > 0.55 && rng.nextDouble() < 0.55) {
          trees[cell] = _treeTiles[rng.nextInt(_treeTiles.length)] + 1;
          solid[cell] = 1;
        }
      }
    }

    // The edge of the map is a treeline, so the view never shows a hard stop.
    for (var row = 0; row < mapRows; row += 1) {
      for (var column = 0; column < mapColumns; column += 1) {
        if (column > 1 && row > 1 && column < mapColumns - 2 && row < mapRows - 2) continue;
        final cell = cellOf(column, row);
        tiles[cell] = _grass;
        trees[cell] = _treeTiles[rng.nextInt(_treeTiles.length)] + 1;
        solid[cell] = 1;
      }
    }

    _clearDisc(tiles, keepColumn, keepRow, _keepHalf + 6);
    _layHamlets(tiles);
    _layKeep(tiles);
    _closeUnreachable(tiles);

    for (var i = 0; i < mapCells; i += 1) {
      monsterBlock[i] = solid[i] | keep[i];
    }
    ground.fill((column, row) => tiles[cellOf(column, row)]);
    deco.fill((column, row) {
      if (tiles[cellOf(column, row)] != _grass || trees[cellOf(column, row)] != 0) return -1;
      final roll = rng.nextDouble();
      if (roll < 0.004) return town + 29; // toadstools
      if (roll < 0.012) return town + 17; // sprouts
      return -1;
    });
  }

  void _clearDisc(Int32List tiles, int cx, int cy, int radius) {
    for (var row = cy - radius; row <= cy + radius; row += 1) {
      for (var column = cx - radius; column <= cx + radius; column += 1) {
        if (column < 2 || row < 2 || column >= mapColumns - 2 || row >= mapRows - 2) continue;
        final dx = column - cx, dy = row - cy;
        if (dx * dx + dy * dy > radius * radius) continue;
        final cell = cellOf(column, row);
        if (tiles[cell] == waterTile) tiles[cell] = _grass;
        trees[cell] = 0;
        solid[cell] = 0;
      }
    }
  }

  void _layHamlets(Int32List tiles) {
    final spin = rng.nextDouble() * math.pi * 2;
    for (var i = 0; i < _hamletCount; i += 1) {
      final angle = spin + i / _hamletCount * math.pi * 2 + rng.nextDouble() * 0.3;
      final reach = 26 + rng.nextDouble() * 16;
      final column = (keepColumn + math.cos(angle) * reach * 1.25).round().clamp(9, mapColumns - 10);
      final row = (keepRow + math.sin(angle) * reach * 0.9).round().clamp(9, mapRows - 10);
      _clearDisc(tiles, column, row, 6);
      _layTrack(tiles, column, row);
      _layHouse(tiles, column - 4, row - 3, stone: i.isEven);
      if (rng.nextBool()) _layHouse(tiles, column + 2, row - 1, stone: i.isOdd);
      hamlets.add(cellOf(column, row));
      torches.add(((column + 0.5) * tileSize, (row + 1.5) * tileSize));
    }
  }

  /// A worn dirt track home, cut through whatever is in the way.
  void _layTrack(Int32List tiles, int fromColumn, int fromRow) {
    final dx = keepColumn - fromColumn, dy = keepRow - fromRow;
    final steps = math.max(dx.abs(), dy.abs());
    for (var s = 0; s <= steps; s += 1) {
      final column = fromColumn + dx * s ~/ steps;
      final row = fromRow + dy * s ~/ steps;
      for (var w = 0; w <= 1; w += 1) {
        final cell = cellOf(column, row + w);
        tiles[cell] = _wornTile();
        trees[cell] = 0;
        solid[cell] = 0;
      }
    }
  }

  int _wornTile() => town + 39 + rng.nextInt(4);

  void _layHouse(Int32List tiles, int column, int row, {required bool stone}) {
    final top = stone ? const [48, 49, 50] : const [52, 53, 54];
    final mid = stone ? const [60, 61, 62] : const [64, 65, 66];
    final wall = stone ? const [76, 90, 79] : const [72, 86, 75];
    for (var c = 0; c < 3; c += 1) {
      _putSolid(tiles, column + c, row, town + top[c]);
      _putSolid(tiles, column + c, row + 1, town + mid[c]);
      _putSolid(tiles, column + c, row + 2, town + wall[c]);
    }
  }

  void _putSolid(Int32List tiles, int column, int row, int id) {
    final cell = cellOf(column, row);
    tiles[cell] = id;
    trees[cell] = 0;
    solid[cell] = 1;
  }

  void _layKeep(Int32List tiles) {
    for (var row = -_keepHalf; row <= _keepHalf; row += 1) {
      for (var column = -_keepHalf; column <= _keepHalf; column += 1) {
        final cell = cellOf(keepColumn + column, keepRow + row);
        final x = column == -_keepHalf ? 0 : (column == _keepHalf ? 2 : 1);
        final y = row == -_keepHalf ? 0 : (row == _keepHalf ? 2 : 1);
        tiles[cell] = town + 96 + x + y * 12;
        keep[cell] = 1;
        solid[cell] = 0;
        trees[cell] = 0;
      }
    }
    for (final (dx, dy) in const [(-1, -1), (1, -1), (-1, 1), (1, 1)]) {
      torches.add((
        keepX + dx * (_keepHalf + 1) * tileSize,
        keepY + dy * (_keepHalf + 1) * tileSize,
      ));
    }
  }

  /// Turns walkable pockets cut off from the keep into woods, so nothing
  /// can spawn where the procession can't reach it.
  void _closeUnreachable(Int32List tiles) {
    final seen = Uint8List(mapCells);
    final queue = Int32List(mapCells);
    var tail = 0;
    queue[tail++] = cellOf(keepColumn, keepRow);
    seen[queue[0]] = 1;
    for (var head = 0; head < tail; head += 1) {
      final cell = queue[head];
      final column = cell % mapColumns, row = cell ~/ mapColumns;
      for (var d = 0; d < 4; d += 1) {
        final nc = column + _stepX[d], nr = row + _stepY[d];
        if (nc < 0 || nr < 0 || nc >= mapColumns || nr >= mapRows) continue;
        final next = cellOf(nc, nr);
        if (seen[next] == 1 || solid[next] == 1) continue;
        seen[next] = 1;
        queue[tail++] = next;
      }
    }
    for (var cell = 0; cell < mapCells; cell += 1) {
      if (seen[cell] == 0 && solid[cell] == 0) {
        tiles[cell] = _grass;
        trees[cell] = _treeTiles[rng.nextInt(_treeTiles.length)] + 1;
        solid[cell] = 1;
      }
    }
  }

  /// Wears grass to dirt under a foot. Only the touched chunk is rebuilt.
  void trample(double x, double y) {
    final column = columnAt(x), row = rowAt(y);
    final id = ground.tileAt(column, row);
    if (id == _grass || id == _grassTuft || id == _grassFlower) {
      ground.setTile(column, row, _wornTile());
    }
  }

  /// Burns the ground in a disc, for the flare's scar.
  void scorch(double x, double y, double radius) {
    final cx = columnAt(x), cy = rowAt(y);
    final cells = (radius / tileSize).ceil();
    for (var row = cy - cells; row <= cy + cells; row += 1) {
      for (var column = cx - cells; column <= cx + cells; column += 1) {
        if (column < 0 || row < 0 || column >= mapColumns || row >= mapRows) continue;
        final dx = (column - cx) * tileSize, dy = (row - cy) * tileSize;
        if (dx * dx + dy * dy > radius * radius) continue;
        final id = ground.tileAt(column, row);
        final isSoil = id == _grass || id == _grassTuft || id == _grassFlower || (id >= town + 39 && id <= town + 42);
        if (isSoil && rng.nextDouble() < 0.7) {
          ground.setTile(column, row, dungeon + (rng.nextBool() ? 12 : 24));
        }
      }
    }
  }
}

const List<int> _stepX = [1, -1, 0, 0, 1, 1, -1, -1];
const List<int> _stepY = [0, 0, 1, -1, 1, -1, 1, -1];
const List<double> _dirX = [1, -1, 0, 0, 0.7071, 0.7071, -0.7071, -0.7071, 0];
const List<double> _dirY = [0, 0, 1, -1, 0.7071, -0.7071, 0.7071, -0.7071, 0];
const List<int> _reverse = [1, 0, 3, 2, 7, 6, 5, 4];

/// Multi-source breadth-first field: every open cell points one step toward
/// its nearest seed, and remembers which seed that was.
///
/// Seeding it with every villager is what makes a swarm of thousands split
/// up and go for whoever is closest, at a fixed cost per solve.
final class FlowField {
  final Uint8List dir = Uint8List(mapCells);
  final Uint16List dist = Uint16List(mapCells);
  final Int16List seedOf = Int16List(mapCells);
  final Int32List _queue = Int32List(mapCells);
  // A native bulk copy from these beats fillRange's per-element loop.
  final Uint8List _blankDir = Uint8List(mapCells)..fillRange(0, mapCells, 8);
  final Uint16List _blankDist = Uint16List(mapCells)..fillRange(0, mapCells, 0xFFFF);
  final Int16List _blankSeed = Int16List(mapCells)..fillRange(0, mapCells, -1);
  int _tail = 0;
  bool _dirty = false;

  void begin() {
    dir.setRange(0, mapCells, _blankDir);
    dist.setRange(0, mapCells, _blankDist);
    seedOf.setRange(0, mapCells, _blankSeed);
    _tail = 0;
    _dirty = true;
  }

  /// Adds a source; ignored on a [blocked] cell.
  void seed(int cell, int id, Uint8List blocked) {
    if (blocked[cell] == 1 || seedOf[cell] != -1) return;
    seedOf[cell] = id;
    dist[cell] = 0;
    _queue[_tail++] = cell;
  }

  void solve(Uint8List blocked) {
    if (!_dirty) return;
    _dirty = false;
    for (var head = 0; head < _tail; head += 1) {
      final cell = _queue[head];
      final column = cell % mapColumns, row = cell ~/ mapColumns;
      final next = dist[cell] + 1;
      for (var d = 0; d < 8; d += 1) {
        final nc = column + _stepX[d], nr = row + _stepY[d];
        if (nc < 0 || nr < 0 || nc >= mapColumns || nr >= mapRows) continue;
        final neighbour = nr * mapColumns + nc;
        if (blocked[neighbour] == 1 || seedOf[neighbour] != -1) continue;
        // No cutting a corner between two blocked cells.
        if (d >= 4 &&
            (blocked[row * mapColumns + nc] == 1 ||
                blocked[nr * mapColumns + column] == 1)) {
          continue;
        }
        seedOf[neighbour] = seedOf[cell];
        dist[neighbour] = next;
        dir[neighbour] = _reverse[d];
        _queue[_tail++] = neighbour;
      }
    }
  }

  static double unitX(int direction) => _dirX[direction];
  static double unitY(int direction) => _dirY[direction];
}

/// Smooth value noise on a [cells]-square lattice, sampled in 0..1.
final class _Noise {
  final int cells;
  final Float32List _values;

  _Noise(math.Random rng, this.cells)
    : _values = Float32List.fromList([
        for (var i = 0; i < (cells + 1) * (cells + 1); i += 1) rng.nextDouble(),
      ]);

  double at(double u, double v) {
    final x = u * cells, y = v * cells;
    final ix = x.floor().clamp(0, cells - 1), iy = y.floor().clamp(0, cells - 1);
    final fx = x - ix, fy = y - iy;
    final sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    double value(int cx, int cy) => _values[cy * (cells + 1) + cx];
    final top = value(ix, iy) + (value(ix + 1, iy) - value(ix, iy)) * sx;
    final bottom = value(ix, iy + 1) + (value(ix + 1, iy + 1) - value(ix, iy + 1)) * sx;
    return top + (bottom - top) * sy;
  }
}
