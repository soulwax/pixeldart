import 'dart:math' as math;
import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';

import 'art.dart';
import 'effects.dart';
import 'sound.dart';
import 'swarm.dart';
import 'world_map.dart';

enum Role { lamplighter, peasant, archer, knight, mage, priest }

const double _leaderSpeed = 88;
const double _spacing = 12;
const double _pathStep = 2;
const int _pathSize = 4096;
const int _maxBolts = 1024;
const int _maxSeeds = 512;

const int _boltStone = 0, _boltArrow = 1, _boltMagic = 2;

final class Villager {
  final Role role;
  final SpriteRegion region;
  double x, y, px, py;
  double vx = 0, vy = 0;

  double safe = 0;
  double cooldown;
  double wander = 0;
  bool faceLeft = false;

  bool bitten = false;

  Villager(this.role, this.region, this.x, this.y, this.cooldown) : px = x, py = y;
}

final class Procession {
  final Art art;
  final WorldMap map;
  final Swarm swarm;
  final Particles fx;
  final Sound sound;
  final math.Random rng;

  late Villager leader;
  final List<Villager> line = [];
  final List<Villager> strays = [];
  final List<(double, double)> graves = [];

  int banked = 0;
  int lost = 0;
  int leaderHits = 0;

  double moveX = 0, moveY = 0;

  // The leader's trail. Followers stand at fixed distances back along it,
  // so the line bends exactly where the leader did.
  final Float32List _pathX = Float32List(_pathSize);
  final Float32List _pathY = Float32List(_pathSize);
  int _pathHead = 0;
  int _pathCount = 0;
  double _sincePoint = 0;

  // Flow-field sources. Monsters remember a seed index between solves, so
  // positions are refreshed in place every step and identities only change
  // when the field is rebuilt.
  final List<Villager> _seeded = [];
  final Float32List seedX = Float32List(_maxSeeds);
  final Float32List seedY = Float32List(_maxSeeds);

  final Float32List _boltX = Float32List(_maxBolts), _boltY = Float32List(_maxBolts);
  final Float32List _boltVx = Float32List(_maxBolts), _boltVy = Float32List(_maxBolts);
  final Float32List _boltLife = Float32List(_maxBolts), _boltDamage = Float32List(_maxBolts);
  final Uint8List _boltKind = Uint8List(_maxBolts), _boltPierce = Uint8List(_maxBolts);
  int _boltCount = 0;

  late final SpriteRegion _arrow = art.tile(town + 119);
  late final SpriteRegion _grave = art.tile(dungeon + 65);
  late final SpriteRegion _lamp = art.tile(town + 93);

  Procession({
    required this.art,
    required this.map,
    required this.swarm,
    required this.fx,
    required this.sound,
    required this.rng,
  }) {
    resetForNight();
  }

  int get people => 1 + line.length + strays.length;

  void resetForNight() {
    leader = Villager(Role.lamplighter, art.tile(dungeon + 85), map.keepX, map.keepY, 0);
    line.clear();
    strays.clear();
    graves.clear();
    _boltCount = 0;
    _pathCount = 0;
    _pathHead = 0;
    _sincePoint = 0;
    _pushPathPoint(leader.x, leader.y);
  }

  void _pushPathPoint(double x, double y) {
    _pathHead = (_pathHead + 1) & (_pathSize - 1);
    _pathX[_pathHead] = x;
    _pathY[_pathHead] = y;
    if (_pathCount < _pathSize) _pathCount += 1;
  }

  void spawnStrays(int count, int night) {
    final roles = <Role>[
      Role.peasant,
      Role.peasant,
      Role.archer,
      Role.knight,
      if (night >= 2) Role.mage,
      if (night >= 3) Role.priest,
      if (night >= 3) Role.archer,
    ];
    final offset = rng.nextInt(map.hamlets.length);
    for (var i = 0; i < count; i += 1) {
      final hamlet = map.hamlets[(offset + i) % map.hamlets.length];
      final column = hamlet % mapColumns, row = hamlet ~/ mapColumns;
      for (var attempt = 0; attempt < 40; attempt += 1) {
        final x = (column + rng.nextInt(9) - 4 + 0.5) * tileSize;
        final y = (row + rng.nextInt(9) - 4 + 0.5) * tileSize;
        if (map.blockedAt(x, y) || map.inKeep(x, y)) continue;
        final role = roles[rng.nextInt(roles.length)];
        strays.add(Villager(role, art.tile(_tileFor(role)), x, y, rng.nextDouble()));
        break;
      }
    }
  }

  int _tileFor(Role role) => switch (role) {
    Role.lamplighter => dungeon + 85,
    Role.peasant => dungeon + (rng.nextBool() ? 86 : 98),
    Role.archer => dungeon + 112,
    Role.knight => dungeon + (rng.nextBool() ? 96 : 97),
    Role.mage => dungeon + 84,
    Role.priest => dungeon + (rng.nextBool() ? 99 : 100),
  };

  void seedFlow(FlowField flow) {
    _seeded.clear();
    flow.begin();
    void add(Villager v) {
      if (_seeded.length >= _maxSeeds) return;
      final id = _seeded.length;
      _seeded.add(v);
      flow.seed(map.cellAt(v.x, v.y), id, map.monsterBlock);
    }

    add(leader);
    line.forEach(add);
    strays.forEach(add);
    flow.solve(map.monsterBlock);
    _refreshSeeds();
  }

  void _refreshSeeds() {
    for (var i = 0; i < _seeded.length; i += 1) {
      seedX[i] = _seeded[i].x;
      seedY[i] = _seeded[i].y;
    }
  }

  void stepMovement(double dt) {
    _moveLeader(dt);
    _moveLine(dt);
    _moveStrays(dt);
    _refreshSeeds();
  }

  void _moveLeader(double dt) {
    final v = leader;
    v.px = v.x;
    v.py = v.y;
    if (v.safe > 0) v.safe -= dt;
    if (moveX == 0 && moveY == 0) return;
    if (moveX != 0) v.faceLeft = moveX < 0;
    final nx = v.x + moveX * _leaderSpeed * dt;
    final ny = v.y + moveY * _leaderSpeed * dt;
    final before = (v.x, v.y);
    if (!map.blockedAt(nx, v.y)) v.x = nx;
    if (!map.blockedAt(v.x, ny)) v.y = ny;
    final dx = v.x - before.$1, dy = v.y - before.$2;
    _sincePoint += math.sqrt(dx * dx + dy * dy);
    while (_sincePoint >= _pathStep) {
      _sincePoint -= _pathStep;
      _pushPathPoint(v.x, v.y);
    }
    map.trample(v.x, v.y);
  }

  void _moveLine(double dt) {
    final catchUp = 1 - math.exp(-dt * 15);
    final stepsBack = (_spacing / _pathStep).round();
    for (var i = 0; i < line.length; i += 1) {
      final v = line[i];
      v.px = v.x;
      v.py = v.y;
      if (v.safe > 0) v.safe -= dt;
      final back = math.min((i + 1) * stepsBack, _pathCount - 1);
      final at = (_pathHead - back) & (_pathSize - 1);
      final dx = _pathX[at] - v.x, dy = _pathY[at] - v.y;
      v.x += dx * catchUp;
      v.y += dy * catchUp;
      if (dx.abs() > 0.3) v.faceLeft = dx < 0;
      if (i.isEven) map.trample(v.x, v.y);
    }
  }

  void _moveStrays(double dt) {
    for (var i = 0; i < strays.length; i += 1) {
      final v = strays[i];
      v.px = v.x;
      v.py = v.y;
      if (v.safe > 0) v.safe -= dt;
      final threat = swarm.nearest(v.x, v.y, 72);
      if (threat >= 0) {
        final dx = v.x - swarm.x[threat], dy = v.y - swarm.y[threat];
        final d = math.sqrt(dx * dx + dy * dy) + 0.01;
        v.vx = dx / d * 46;
        v.vy = dy / d * 46;
      } else if (v.safe > 0) {
        v.vx *= 0.97;
        v.vy *= 0.97;
      } else {
        v.wander -= dt;
        if (v.wander <= 0) {
          v.wander = 0.8 + rng.nextDouble() * 2;
          final idle = rng.nextDouble() < 0.5;
          final angle = rng.nextDouble() * 6.28;
          v.vx = idle ? 0 : math.cos(angle) * 14;
          v.vy = idle ? 0 : math.sin(angle) * 14;
        }
      }
      final nx = v.x + v.vx * dt, ny = v.y + v.vy * dt;
      if (!map.blockedAt(nx, v.y) && !map.inKeep(nx, v.y)) v.x = nx;
      if (!map.blockedAt(v.x, ny) && !map.inKeep(v.x, ny)) v.y = ny;
      if (v.vx.abs() > 1) v.faceLeft = v.vx < 0;
    }
  }

  void stepCombat(double dt, {bool leaderFights = true}) {
    if (leaderFights) _attack(leader, dt);
    for (var i = 0; i < line.length; i += 1) {
      _attack(line[i], dt);
    }
    _stepBolts(dt);
    _gather();
    _deliver();
    _contacts();
  }

  void _attack(Villager v, double dt) {
    v.cooldown -= dt;
    if (v.cooldown > 0) return;
    switch (v.role) {
      case Role.lamplighter:
        if (swarm.nearest(v.x, v.y, 30) < 0) return;
        v.cooldown = 0.55;
        swarm.blast(v.x, v.y, 30, 1);
        fx.add(art.slash, v.x, v.y - 6, life: 0.16, size: 44, color: 0xFFD98CFF, glow: 0.4);
        sound.play('swing', minGap: 0.2);
      case Role.knight:
        if (swarm.nearest(v.x, v.y, 34) < 0) return;
        v.cooldown = 0.6;
        swarm.blast(v.x, v.y, 34, 2, shove: 90, stunFor: 0.12);
        fx.add(art.slash, v.x, v.y - 6, life: 0.18, size: 50, color: 0xDDE6FFFF, glow: 0.3);
        sound.play('swing', minGap: 0.12);
      case Role.priest:
        if (swarm.nearest(v.x, v.y, 70) < 0) return;
        v.cooldown = 2.4;
        swarm.blast(v.x, v.y, 74, 1, shove: 170, stunFor: 0.4);
        fx.add(art.ring, v.x, v.y - 6, life: 0.4, size: 150, color: 0xFFF3A8C0, glow: 0.7);
        sound.play('pulse', minGap: 0.3);
      case Role.peasant:
        _shoot(v, 96, _boltStone, 190, 1, 0.75);
      case Role.archer:
        _shoot(v, 190, _boltArrow, 330, 2, 0.5);
      case Role.mage:
        _shoot(v, 160, _boltMagic, 150, 3, 1.05);
    }
  }

  void _shoot(Villager v, double range, int kind, double speed, double damage, double cooldown) {
    final target = swarm.nearest(v.x, v.y, range);
    if (target < 0) {
      v.cooldown = 0.08; // nothing in range; look again soon
      return;
    }
    v.cooldown = cooldown;
    if (_boltCount >= _maxBolts) return;
    final dx = swarm.x[target] - v.x, dy = swarm.y[target] - v.y;
    final d = math.sqrt(dx * dx + dy * dy) + 0.01;
    final i = _boltCount++;
    _boltX[i] = v.x;
    _boltY[i] = v.y - 8;
    _boltVx[i] = dx / d * speed;
    _boltVy[i] = dy / d * speed;
    _boltLife[i] = range / speed + 0.1;
    _boltDamage[i] = damage;
    _boltKind[i] = kind;
    _boltPierce[i] = kind == _boltArrow ? 2 : 0;
    sound.play(kind == _boltMagic ? 'zap' : 'shot', minGap: 0.1);
  }

  void _stepBolts(double dt) {
    var i = 0;
    while (i < _boltCount) {
      _boltLife[i] -= dt;
      final x = _boltX[i] + _boltVx[i] * dt;
      final y = _boltY[i] + _boltVy[i] * dt;
      _boltX[i] = x;
      _boltY[i] = y;
      if (_boltKind[i] == _boltMagic && rng.nextDouble() < 0.5) {
        fx.add(art.spark, x, y, life: 0.25, size: 7, color: 0xB08CFFFF, glow: 1);
      }
      var alive = _boltLife[i] > 0;
      final hit = alive ? swarm.touching(x, y + 8, 9) : -1;
      if (hit >= 0) {
        if (_boltKind[i] == _boltMagic) {
          swarm.blast(x, y + 8, 34, _boltDamage[i], shove: 60, stunFor: 0.2);
          fx.burst(art.magic, x, y, 10, speed: 90, size: 13, color: 0xC59CFFFF, glow: 1);
          sound.play('boom', minGap: 0.12);
          alive = false;
        } else {
          swarm.hurt(hit, _boltDamage[i]);
          if (_boltPierce[i] == 0) {
            alive = false;
          } else {
            _boltPierce[i] -= 1;
          }
        }
      }
      if (alive) {
        i += 1;
        continue;
      }
      final last = --_boltCount;
      if (i != last) {
        _boltX[i] = _boltX[last];
        _boltY[i] = _boltY[last];
        _boltVx[i] = _boltVx[last];
        _boltVy[i] = _boltVy[last];
        _boltLife[i] = _boltLife[last];
        _boltDamage[i] = _boltDamage[last];
        _boltKind[i] = _boltKind[last];
        _boltPierce[i] = _boltPierce[last];
      }
    }
  }

  void _gather() {
    for (var i = strays.length - 1; i >= 0; i -= 1) {
      final stray = strays[i];
      if (!_nearLine(stray)) continue;
      strays.removeAt(i);
      stray
        ..safe = 1.0
        ..vx = 0
        ..vy = 0;
      stray.bitten = false;
      line.add(stray);
      fx.burst(art.star, stray.x, stray.y - 8, 8, speed: 50, color: 0xFFE27AFF, glow: 0.6);
      sound.play('join');
    }
  }

  bool _nearLine(Villager stray) {
    const reach = 15 * 15;
    bool near(Villager v) {
      final dx = v.x - stray.x, dy = v.y - stray.y;
      return dx * dx + dy * dy < reach;
    }

    if (near(leader)) return true;
    for (var i = 0; i < line.length; i += 1) {
      if (near(line[i])) return true;
    }
    return false;
  }

  void _deliver() {
    while (line.isNotEmpty && map.inKeep(line.first.x, line.first.y)) {
      final v = line.removeAt(0);
      banked += 1;
      fx.burst(art.star, v.x, v.y - 8, 14, speed: 70, color: 0xFFF2B0FF, glow: 1);
      sound.play('bank', minGap: 0.08);
    }
  }

  void _contacts() {
    final v = leader;
    if (v.safe <= 0 && swarm.touching(v.x, v.y - 2, 7.5) >= 0) {
      v.safe = 2;
      leaderHits += 1;
      swarm.blast(v.x, v.y, 64, 1, shove: 230, stunFor: 0.7);
      fx.burst(art.smoke, v.x, v.y - 6, 12, speed: 50, color: 0xFF7A5AC0, additive: 0.4);
      sound.play('hurt');
    }
    for (var i = 0; i < line.length; i += 1) {
      final member = line[i];
      if (member.safe > 0 || swarm.touching(member.x, member.y - 2, 8) < 0) continue;
      _breakLine(i);
      break;
    }
    for (var i = strays.length - 1; i >= 0; i -= 1) {
      final stray = strays[i];
      if (stray.safe > 0 || swarm.touching(stray.x, stray.y - 2, 8) < 0) continue;
      if (!stray.bitten) {
        stray
          ..bitten = true
          ..safe = 1.4;
        swarm.blast(stray.x, stray.y, 34, 0, shove: 150, stunFor: 0.5);
        continue;
      }
      strays.removeAt(i);
      lost += 1;
      graves.add((stray.x, stray.y));
      fx.burst(art.smoke, stray.x, stray.y - 6, 14, speed: 40, color: 0xB4B4CCD0, additive: 0);
      sound.play('die');
    }
  }

  void _breakLine(int index) {
    final broken = line.sublist(index);
    line.length = index;
    for (final v in broken) {
      final angle = rng.nextDouble() * 6.28;
      v
        ..safe = 1.8
        ..vx = math.cos(angle) * 70
        ..vy = math.sin(angle) * 70
        ..wander = 0;
      strays.add(v);
      fx.burst(art.dirt, v.x, v.y, 3, speed: 40, color: 0xD8B080FF, additive: 0);
    }
    swarm.blast(line.isEmpty ? leader.x : broken.first.x, broken.first.y, 40, 0, shove: 130, stunFor: 0.5);
    sound.play('break');
  }

  void draw(SpriteBatch batch, double alpha, double time) {
    final dot = art.dot;
    void person(Villager v, {required bool bob}) {
      final x = v.px + (v.x - v.px) * alpha;
      final y = v.py + (v.y - v.py) * alpha;
      final moving = (v.x - v.px).abs() + (v.y - v.py).abs() > 0.01;
      final hop = bob && moving ? math.sin(time * 16 + x * 0.1).abs() * 2 : 0.0;
      final blink = v.safe > 0 && (time * 14).floor().isEven;
      batch.draw(dot, x, y, width: 12, height: 5, color: 0x00000070);
      batch.draw(
        v.region,
        x,
        y - hop,
        originY: 1,
        flipX: v.faceLeft,
        color: blink ? 0xFFFFFF90 : 0xFFFFFFFF,
        layer: 1,
      );
    }

    for (final (x, y) in graves) {
      batch.draw(_grave, x, y, originY: 1, color: 0xC0C0D0FF, layer: 1);
    }
    person(leader, bob: true);
    final lampX = leader.px + (leader.x - leader.px) * alpha;
    final lampY = leader.py + (leader.y - leader.py) * alpha;
    batch.draw(
      _lamp,
      lampX + (leader.faceLeft ? -6 : 6),
      lampY - 8,
      scaleX: 0.6,
      scaleY: 0.6,
      additive: 0.5,
      glow: 1,
      layer: 2,
    );
    for (final v in line) {
      person(v, bob: true);
    }
    for (var i = 0; i < strays.length; i += 1) {
      final v = strays[i];
      person(v, bob: false);
      // A beacon over everyone waiting, or nobody finds them in the dark.
      final x = v.px + (v.x - v.px) * alpha;
      final y = v.py + (v.y - v.py) * alpha;
      batch.draw(
        art.star,
        x,
        y - 24 + math.sin(time * 4 + i) * 2,
        width: 11,
        height: 11,
        color: 0xFFE27AFF,
        additive: 1,
        glow: 0.8,
        layer: 2,
      );
    }
    for (var i = 0; i < _boltCount; i += 1) {
      final kind = _boltKind[i];
      if (kind == _boltArrow) {
        batch.draw(
          _arrow,
          _boltX[i],
          _boltY[i],
          scaleX: 0.75,
          scaleY: 0.75,
          rotation: math.atan2(_boltVy[i], _boltVx[i]) + math.pi / 4,
          layer: 2,
        );
      } else if (kind == _boltMagic) {
        batch.draw(art.magic, _boltX[i], _boltY[i], width: 16, height: 16, color: 0xC59CFFFF, additive: 1, glow: 1, layer: 2);
      } else {
        batch.draw(dot, _boltX[i], _boltY[i], width: 4, height: 4, color: 0xD8D2C0FF, layer: 2);
      }
    }
  }

  void addLights(void Function(double x, double y, double radius, double strength) add) {
    add(leader.x, leader.y - 6, 118, 1.15);
    for (var i = 0; i < line.length; i += 2) {
      add(line[i].x, line[i].y - 6, 66, 0.55);
    }
    for (var i = 0; i < strays.length; i += 1) {
      add(strays[i].x, strays[i].y - 6, 34, 0.55);
    }
    for (var i = 0; i < _boltCount; i += 1) {
      if (_boltKind[i] == _boltMagic) add(_boltX[i], _boltY[i], 44, 0.7);
    }
  }
}
