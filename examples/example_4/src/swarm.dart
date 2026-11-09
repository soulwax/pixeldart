import 'dart:math' as math;
import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';

import 'art.dart';
import 'world_map.dart';

const int maxMonsters = 16000;

final class MonsterKind {
  final int tile;
  final double speed;
  final double health;
  final double scale;
  final bool flies;
  const MonsterKind(this.tile, this.speed, this.health, {this.scale = 1, this.flies = false});
}

const List<MonsterKind> monsterKinds = [
  MonsterKind(dungeon + 108, 24, 2), // slime
  MonsterKind(dungeon + 123, 44, 1), // rat
  MonsterKind(dungeon + 120, 60, 1, flies: true), // bat
  MonsterKind(dungeon + 122, 40, 3), // spider
  MonsterKind(dungeon + 121, 30, 4, flies: true), // ghost
  MonsterKind(dungeon + 110, 34, 8), // crab demon
  MonsterKind(dungeon + 109, 22, 16, scale: 1.5), // cyclops
];

const double _separationRadius = 11;
const int _neighbourLimit = 10;

final class Swarm {
  final Art art;
  final math.Random rng;

  final Float32List x = Float32List(maxMonsters), y = Float32List(maxMonsters);
  final Float32List px = Float32List(maxMonsters), py = Float32List(maxMonsters);
  final Float32List vx = Float32List(maxMonsters), vy = Float32List(maxMonsters);
  final Float32List sepX = Float32List(maxMonsters), sepY = Float32List(maxMonsters);
  final Float32List health = Float32List(maxMonsters);
  final Float32List flash = Float32List(maxMonsters);
  final Float32List stun = Float32List(maxMonsters);
  final Float32List phase = Float32List(maxMonsters);
  final Uint8List kind = Uint8List(maxMonsters);
  int count = 0;

  final Int32List _head = Int32List(mapCells);
  // setRange from a blank copy is a native bulk copy; fillRange is a loop.
  final Int32List _blankHead = Int32List(mapCells)..fillRange(0, mapCells, -1);
  final Int32List _next = Int32List(maxMonsters);

  final Float32List _speeds = Float32List(monsterKinds.length);
  final Uint8List _flies = Uint8List(monsterKinds.length);
  final Float32List _scales = Float32List(monsterKinds.length);
  late final List<SpriteRegion> _regions = [
    for (final k in monsterKinds) art.tile(k.tile),
  ];

  void Function(int kind, double x, double y) onKill = _noKill;
  static void _noKill(int k, double x, double y) {}

  Swarm(this.art, this.rng) {
    _head.setRange(0, mapCells, _blankHead);
    for (var i = 0; i < monsterKinds.length; i += 1) {
      _speeds[i] = monsterKinds[i].speed;
      _flies[i] = monsterKinds[i].flies ? 1 : 0;
      _scales[i] = monsterKinds[i].scale;
    }
  }

  void clear() => count = 0;

  void spawn(int kindIndex, double atX, double atY) {
    if (count >= maxMonsters) return;
    final i = count++;
    x[i] = px[i] = atX;
    y[i] = py[i] = atY;
    vx[i] = vy[i] = sepX[i] = sepY[i] = 0;
    flash[i] = stun[i] = 0;
    health[i] = monsterKinds[kindIndex].health;
    phase[i] = rng.nextDouble() * 6.28;
    kind[i] = kindIndex;
  }

  void rebuildGrid(WorldMap map) {
    _head.setRange(0, mapCells, _blankHead);
    for (var i = 0; i < count; i += 1) {
      // Movement keeps everyone on the map, so no clamping here.
      final cell = (y[i] / tileSize).toInt() * mapColumns + (x[i] / tileSize).toInt();
      _next[i] = _head[cell];
      _head[cell] = i;
    }
  }

  void step(
    double dt,
    int tick,
    FlowField flow,
    Float32List seedX,
    Float32List seedY,
    WorldMap map,
  ) {
    final response = math.min(1.0, dt * 9);
    final block = map.monsterBlock;
    final keep = map.keep;
    for (var i = 0; i < count; i += 1) {
      px[i] = x[i];
      py[i] = y[i];
      if (flash[i] > 0) flash[i] -= dt;

      final col = (x[i] / tileSize).toInt();
      final row = (y[i] / tileSize).toInt();
      final cell = row * mapColumns + col;
      final k = kind[i];

      if ((i + tick) & 1 == 0) _updateSeparation(i, col, row);

      if (stun[i] > 0) {
        stun[i] -= dt;
        vx[i] *= 0.92;
        vy[i] *= 0.92;
      } else {
        var wantX = 0.0, wantY = 0.0;
        final seed = flow.seedOf[cell];
        final flies = _flies[k] == 1;
        if (seed >= 0 && (flies || flow.dist[cell] <= 2)) {
          final dx = seedX[seed] - x[i], dy = seedY[seed] - y[i];
          final d = math.sqrt(dx * dx + dy * dy) + 0.001;
          wantX = dx / d;
          wantY = dy / d;
        } else {
          final direction = flow.dir[cell];
          wantX = FlowField.unitX(direction);
          wantY = FlowField.unitY(direction);
        }
        final speed = _speeds[k];
        wantX = wantX * speed + sepX[i] * speed * 1.7;
        wantY = wantY * speed + sepY[i] * speed * 1.7;
        vx[i] += (wantX - vx[i]) * response;
        vy[i] += (wantY - vy[i]) * response;
      }

      final nx = x[i] + vx[i] * dt, ny = y[i] + vy[i] * dt;
      final flies = _flies[k] == 1;
      if (_free(nx, y[i], flies, block, keep)) {
        x[i] = nx;
      } else {
        vx[i] = 0;
      }
      if (_free(x[i], ny, flies, block, keep)) {
        y[i] = ny;
      } else {
        vy[i] = 0;
      }
    }
  }

  static bool _free(double wx, double wy, bool flies, Uint8List block, Uint8List keep) {
    if (wx < 0 || wy < 0) return false;
    final col = wx ~/ tileSize, row = wy ~/ tileSize;
    if (col >= mapColumns || row >= mapRows) return false;
    final cell = row * mapColumns + col;
    return flies ? keep[cell] == 0 : block[cell] == 0;
  }

  void _updateSeparation(int i, int col, int row) {
    var pushX = 0.0, pushY = 0.0;
    var seen = 0;
    final selfX = x[i], selfY = y[i];
    for (var r = row - 1; r <= row + 1 && seen < _neighbourLimit; r += 1) {
      if (r < 0 || r >= mapRows) continue;
      for (var c = col - 1; c <= col + 1 && seen < _neighbourLimit; c += 1) {
        if (c < 0 || c >= mapColumns) continue;
        for (var j = _head[r * mapColumns + c]; j >= 0 && seen < _neighbourLimit; j = _next[j]) {
          if (j == i) continue;
          final dx = selfX - x[j], dy = selfY - y[j];
          final d2 = dx * dx + dy * dy;
          if (d2 >= _separationRadius * _separationRadius || d2 < 0.0001) continue;
          final d = math.sqrt(d2);
          final push = (1 - d / _separationRadius) / d;
          pushX += dx * push;
          pushY += dy * push;
          seen += 1;
        }
      }
    }
    sepX[i] = pushX;
    sepY[i] = pushY;
  }

  int nearest(double atX, double atY, double range) {
    final reach = (range / tileSize).ceil();
    final col = WorldMap.columnAt(atX), row = WorldMap.rowAt(atY);
    var best = -1;
    var bestD2 = range * range;
    // Rings outward: the first hit bounds how far there is left to look.
    for (var ring = 0; ring <= reach; ring += 1) {
      if (best >= 0 && (ring - 1) * tileSize > math.sqrt(bestD2)) break;
      for (var r = row - ring; r <= row + ring; r += 1) {
        if (r < 0 || r >= mapRows) continue;
        final edge = r == row - ring || r == row + ring;
        final step = edge || ring == 0 ? 1 : 2 * ring;
        for (var c = col - ring; c <= col + ring; c += step) {
          if (c < 0 || c >= mapColumns) continue;
          for (var i = _head[r * mapColumns + c]; i >= 0; i = _next[i]) {
            final dx = x[i] - atX, dy = y[i] - atY;
            final d2 = dx * dx + dy * dy;
            if (d2 < bestD2 && health[i] > 0) {
              bestD2 = d2;
              best = i;
            }
          }
        }
      }
    }
    return best;
  }

  int touching(double atX, double atY, double radius) {
    final col = WorldMap.columnAt(atX), row = WorldMap.rowAt(atY);
    final r2 = radius * radius;
    for (var r = math.max(0, row - 1); r <= math.min(mapRows - 1, row + 1); r += 1) {
      for (var c = math.max(0, col - 1); c <= math.min(mapColumns - 1, col + 1); c += 1) {
        for (var i = _head[r * mapColumns + c]; i >= 0; i = _next[i]) {
          final dx = x[i] - atX, dy = y[i] - atY;
          if (dx * dx + dy * dy < r2 && health[i] > 0) return i;
        }
      }
    }
    return -1;
  }

  void hurt(int i, double damage) {
    if (health[i] <= 0) return;
    health[i] -= damage;
    flash[i] = 0.12;
    if (health[i] <= 0) onKill(kind[i], x[i], y[i]);
  }

  void blast(double atX, double atY, double radius, double damage, {double shove = 0, double stunFor = 0}) {
    final reach = (radius / tileSize).ceil();
    final col = WorldMap.columnAt(atX), row = WorldMap.rowAt(atY);
    final r2 = radius * radius;
    for (var r = math.max(0, row - reach); r <= math.min(mapRows - 1, row + reach); r += 1) {
      for (var c = math.max(0, col - reach); c <= math.min(mapColumns - 1, col + reach); c += 1) {
        for (var i = _head[r * mapColumns + c]; i >= 0; i = _next[i]) {
          final dx = x[i] - atX, dy = y[i] - atY;
          final d2 = dx * dx + dy * dy;
          if (d2 >= r2 || health[i] <= 0) continue;
          hurt(i, damage);
          if (shove > 0) {
            final d = math.sqrt(d2) + 0.5;
            vx[i] = dx / d * shove;
            vy[i] = dy / d * shove;
            stun[i] = stunFor;
          }
        }
      }
    }
  }

  void compact() {
    var i = 0;
    while (i < count) {
      if (health[i] > 0) {
        i += 1;
        continue;
      }
      final last = --count;
      if (i != last) {
        x[i] = x[last];
        y[i] = y[last];
        px[i] = px[last];
        py[i] = py[last];
        vx[i] = vx[last];
        vy[i] = vy[last];
        sepX[i] = sepX[last];
        sepY[i] = sepY[last];
        health[i] = health[last];
        flash[i] = flash[last];
        stun[i] = stun[last];
        phase[i] = phase[last];
        kind[i] = kind[last];
      }
    }
  }

  void draw(SpriteBatch batch, double alpha, double time, Camera2D camera) {
    final left = camera.left - 24, right = camera.right + 24;
    final top = camera.top - 24, bottom = camera.bottom + 32;
    final dot = art.dot;
    for (var i = 0; i < count; i += 1) {
      final wx = px[i] + (x[i] - px[i]) * alpha;
      final wy = py[i] + (y[i] - py[i]) * alpha;
      if (wx < left || wx > right || wy < top || wy > bottom) continue;
      final k = kind[i];
      final scale = _scales[k];
      final hop = math.sin(time * 11 + phase[i]).abs() * (_flies[k] == 1 ? 3.2 : 1.6);
      final lift = _flies[k] == 1 ? 6.0 : 0.0;
      batch.draw(dot, wx, wy, width: 12 * scale, height: 5 * scale, color: 0x00000066);
      batch.draw(
        _regions[k],
        wx,
        wy - hop - lift,
        originY: 1,
        scaleX: scale,
        scaleY: scale,
        flipX: vx[i] < 0,
        flash: flash[i] > 0 ? 1 : 0,
        layer: 1,
      );
    }
  }
}
