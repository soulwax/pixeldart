import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';
import 'package:web/web.dart' as web;

import 'art.dart';
import 'effects.dart';
import 'hud.dart';
import 'lighting.dart';
import 'procession.dart';
import 'sound.dart';
import 'swarm.dart';
import 'world_map.dart';

enum Phase { title, playing, dawn, over, won }

const int nightsToSurvive = 5;
const double _step = 1 / 60;
const int _flowEvery = 12; // steps between flow-field solves

const double _flareCooldown = 7;
const double _flareRadius = 120;

// Per night: how many wait to be saved, the size of the swarm, and how much
// each person brought home swells it.
const List<int> _strays = [7, 10, 13, 16, 20];
const List<int> _swarmBase = [40, 110, 320, 900, 2400];
const List<int> _surgePerSoul = [5, 12, 30, 70, 180];

const List<List<int>> _kindsByNight = [
  [0, 0, 0, 1],
  [0, 0, 1, 1, 2],
  [0, 1, 1, 2, 2, 3],
  [0, 1, 2, 2, 3, 3, 4, 5],
  [0, 1, 2, 3, 3, 4, 4, 5, 5, 6],
];

final class Game {
  final PixeldartApp app;
  final Art art;
  final Sound sound;
  final math.Random rng = math.Random();

  final bool bot;
  final int stress;
  final bool debug;

  late final WorldMap map = WorldMap(art, rng);
  late final Swarm swarm = Swarm(art, rng)..onKill = _onKill;
  late final Particles fx = Particles(art, rng);
  late final Procession procession = Procession(
    art: art,
    map: map,
    swarm: swarm,
    fx: fx,
    sound: sound,
    rng: rng,
  );
  late final NightLight night = NightLight(art);
  late final Hud hud = Hud(this);
  final FlowField flow = FlowField();
  final FlowField _botPath = FlowField();

  final Camera2D camera = Camera2D(designWidth: 400, designHeight: 225);
  final SpriteBatch _world = SpriteBatch(
    initialCapacity: 8192,
    sort: SpriteSort.layerThenY,
    debugLabel: 'world',
  );
  final SpriteBatch _dark = SpriteBatch(
    initialCapacity: 4096,
    debugLabel: 'night',
  );
  final SpriteBatch _glow = SpriteBatch(
    initialCapacity: 256,
    debugLabel: 'glow',
  );
  final SpriteBatch _hud = SpriteBatch(
    initialCapacity: 1024,
    debugLabel: 'hud',
  );

  Phase phase = Phase.title;
  int nightNumber = 1;
  int hearts = 3;
  int score = 0;
  int kills = 0;
  int savedTotal = 0;
  int savedTonight = 0;
  int lostTotal = 0;
  double flareReady = 0;
  double phaseTime = 0;
  double time = 0;

  String toast = '';
  double toastTime = 0;

  bool showStats = false;
  double simMs = 0, buildMs = 0, fps = 0;
  int spritesDrawn = 0;
  double _statTime = 0;
  int _statFrames = 0;

  double _accumulator = 0;
  double _alpha = 0;
  int _tick = 0;
  double _spawnDebt = 0;
  double _grace = 0;
  double _shake = 0;
  double _flareFlash = 0;
  double _botMoveX = 0, _botMoveY = 0;

  Game(
    this.app,
    this.art,
    this.sound, {
    this.bot = false,
    this.stress = 0,
    this.debug = false,
  }) {
    camera
      ..x = map.keepX
      ..y = map.keepY;
    if (stress > 0) _startStress();
  }

  double get flareCharge => 1 - (flareReady / _flareCooldown).clamp(0.0, 1.0);

  void start() {
    map.regenerate();
    nightNumber = 1;
    hearts = 3;
    score = kills = savedTotal = lostTotal = 0;
    _beginNight();
  }

  void _beginNight() {
    phase = Phase.playing;
    phaseTime = 0;
    swarm.clear();
    fx.clear();
    procession.resetForNight();
    procession.spawnStrays(_strays[nightNumber - 1], nightNumber);
    savedTonight = 0;
    flareReady = 0;
    _spawnDebt = 0;
    _grace = 4;
    procession.seedFlow(flow);
    say('NIGHT $nightNumber OF $nightsToSurvive');
    sound.play('gate');
  }

  void _startStress() {
    phase = Phase.playing;
    nightNumber = nightsToSurvive;
    camera.zoom = 0.5;
    procession.seedFlow(flow);
    for (var i = 0; i < math.min(stress, maxMonsters); i += 1) {
      final angle = rng.nextDouble() * 6.28;
      final reach = 110 + rng.nextDouble() * 330;
      final x = map.keepX + math.cos(angle) * reach * 1.6;
      final y = map.keepY + math.sin(angle) * reach;
      if (map.monsterBlock[map.cellAt(x, y)] == 0) {
        swarm.spawn(_kindsByNight[4][rng.nextInt(10)], x, y);
      }
    }
    // Monsters pile up on the keep walls with the leader inside, so the
    // whole crowd stays alive, moving and in view.
    procession.leader.y = map.keepY - tileSize * 7;
    procession.leader.safe = double.maxFinite;
  }

  void say(String message) {
    toast = message;
    toastTime = 2.6;
  }

  void _onKill(int kind, double x, double y) {
    kills += 1;
    score += 1 + kind;
    fx.burst(
      art.smoke,
      x,
      y - 6,
      2,
      speed: 30,
      size: 11,
      color: 0x9A8AB0A0,
      additive: 0,
      life: 0.5,
    );
    fx.burst(
      art.spark,
      x,
      y - 6,
      3,
      speed: 90,
      size: 6,
      color: 0xFFC070FF,
      glow: 0.4,
    );
    sound.play('crunch', minGap: 0.09);
  }

  void update(double dt) {
    final clock = web.window.performance.now();
    final input = app.input;
    if (input.wasPressed('KeyM')) sound.muted = !sound.muted;
    if (input.wasPressed('KeyF')) showStats = !showStats;
    final begin =
        input.wasPressed('Space') ||
        input.wasPressed('Enter') ||
        input.pointerPressed;

    switch (phase) {
      case Phase.title:
        if (begin) start();
      case Phase.over || Phase.won:
        if (begin && phaseTime > 0.8) start();
      case Phase.playing:
        if (stress == 0 &&
            (input.wasPressed('Space') ||
                (input.pointerPressed &&
                    hud.flareButtonHit(input.pointerX, input.pointerY)))) {
          _flare();
        }
        if (debug && input.wasPressed('KeyK')) _finishNight();
      case Phase.dawn:
        break;
    }

    _accumulator += math.min(dt, 0.1);
    var steps = 0;
    while (_accumulator >= _step && steps < 4) {
      _accumulator -= _step;
      steps += 1;
      _stepAll(_step);
    }
    // Too far behind to ever catch up: drop the debt and run slower.
    if (_accumulator >= _step) _accumulator = 0;
    _alpha = _accumulator / _step;

    simMs += (web.window.performance.now() - clock - simMs) * 0.05;
    _accountFrame(dt);
  }

  void _accountFrame(double dt) {
    _statFrames += 1;
    _statTime += dt;
    if (_statTime < 0.5) return;
    fps = _statFrames / _statTime;
    _statFrames = 0;
    _statTime = 0;
    if (stress > 0) {
      web.document.title =
          'fps=${fps.toStringAsFixed(1)} sim=${simMs.toStringAsFixed(2)} '
          'build=${buildMs.toStringAsFixed(2)} monsters=${swarm.count} sprites=$spritesDrawn';
    }
  }

  void _stepAll(double dt) {
    time += dt;
    phaseTime += dt;
    _tick += 1;
    if (toastTime > 0) toastTime -= dt;
    if (_shake > 0) _shake = math.max(0, _shake - dt * 3);
    if (_flareFlash > 0) _flareFlash -= dt;

    fx.step(dt);
    if (phase == Phase.dawn) {
      _stepDawn(dt);
      return;
    }
    if (phase != Phase.playing) return;

    if (flareReady > 0) flareReady -= dt;
    // First: everything below queries the grid, and compact() outdates it.
    swarm.rebuildGrid(map);
    _steer();
    final p = procession;
    p.stepMovement(dt);
    if (_tick % _flowEvery == 0) p.seedFlow(flow);
    swarm.step(dt, _tick, flow, p.seedX, p.seedY, map);
    if (stress == 0) {
      p.stepCombat(dt);
      _spawn(dt);
      _settle();
    }
    swarm.compact();
  }

  void _settle() {
    final p = procession;
    if (p.banked > 0) {
      savedTonight += p.banked;
      savedTotal += p.banked;
      score += p.banked * 25 * nightNumber;
      p.banked = 0;
    }
    if (p.lost > 0) {
      lostTotal += p.lost;
      p.lost = 0;
    }
    if (p.leaderHits > 0) {
      hearts -= p.leaderHits;
      p.leaderHits = 0;
      _shake = 1;
      if (hearts <= 0) {
        hearts = 0;
        phase = Phase.over;
        phaseTime = 0;
        sound.play('die');
        return;
      }
    }
    if (p.strays.isEmpty && p.line.isEmpty && phaseTime > 1) _finishNight();
  }

  void _finishNight() {
    if (nightNumber >= nightsToSurvive) {
      phase = Phase.won;
      phaseTime = 0;
      sound.play('gate');
      return;
    }
    phase = Phase.dawn;
    phaseTime = 0;
    hearts = math.min(5, hearts + 1);
    say('DAWN  -  $savedTonight BROUGHT HOME');
    sound.play('bank');
  }

  void _stepDawn(double dt) {
    // The swarm burns off in the first light, a slice per step.
    swarm.rebuildGrid(map);
    final burn = math.min(swarm.count, 2 + swarm.count ~/ 40);
    for (var i = 0; i < burn; i += 1) {
      swarm.health[rng.nextInt(swarm.count)] = 0;
    }
    for (var i = 0; i < swarm.count; i += 1) {
      if (swarm.health[i] <= 0) {
        fx.burst(
          art.smoke,
          swarm.x[i],
          swarm.y[i] - 6,
          1,
          size: 12,
          color: 0xFFD0A080,
          additive: 0.3,
        );
      }
    }
    swarm.compact();
    if (phaseTime > 3.2) {
      nightNumber += 1;
      _beginNight();
    }
  }

  void _flare() {
    if (flareReady > 0) return;
    flareReady = _flareCooldown;
    _flareFlash = 0.35;
    _shake = 0.7;
    final v = procession.leader;
    swarm.blast(v.x, v.y, _flareRadius, 3, shove: 320, stunFor: 0.9);
    map.scorch(v.x, v.y, 40);
    fx.add(
      art.ring,
      v.x,
      v.y,
      life: 0.5,
      size: _flareRadius * 2.4,
      color: 0xFFD070FF,
      glow: 1,
    );
    fx.burst(
      art.flame,
      v.x,
      v.y,
      60,
      speed: 260,
      life: 0.6,
      size: 12,
      color: 0xFFA850FF,
      glow: 1,
    );
    sound.play('boom');
  }

  void _steer() {
    final p = procession;
    if (bot) {
      _runBot();
      p.moveX = _botMoveX;
      p.moveY = _botMoveY;
      return;
    }
    final input = app.input;
    var dx = 0.0, dy = 0.0;
    if (input.isDown('KeyA') || input.isDown('ArrowLeft')) dx -= 1;
    if (input.isDown('KeyD') || input.isDown('ArrowRight')) dx += 1;
    if (input.isDown('KeyW') || input.isDown('ArrowUp')) dy -= 1;
    if (input.isDown('KeyS') || input.isDown('ArrowDown')) dy += 1;
    if (dx == 0 &&
        dy == 0 &&
        input.pointerDown &&
        !hud.flareButtonHit(input.pointerX, input.pointerY)) {
      final at = camera.screenToWorld(input.pointerX, input.pointerY);
      dx = at.x - p.leader.x;
      dy = at.y - (p.leader.y - 8);
      if (dx * dx + dy * dy < 36) dx = dy = 0;
    }
    final length = math.sqrt(dx * dx + dy * dy);
    p.moveX = length > 0 ? dx / length : 0;
    p.moveY = length > 0 ? dy / length : 0;
  }

  void _runBot() {
    final p = procession;
    final v = p.leader;
    if (_tick % 15 == 0) {
      var target = map.cellAt(map.keepX, map.keepY);
      if (p.strays.isNotEmpty && p.line.length < 4 + nightNumber) {
        var best = double.infinity;
        for (final s in p.strays) {
          final dx = s.x - v.x, dy = s.y - v.y;
          final d = dx * dx + dy * dy;
          if (d < best) {
            best = d;
            target = map.cellAt(s.x, s.y);
          }
        }
      }
      _botPath
        ..begin()
        ..seed(target, 0, map.solid)
        ..solve(map.solid);
    }
    if (flareReady <= 0 && swarm.nearest(v.x, v.y, 44) >= 0 && hearts <= 3) {
      _flare();
    }
    final direction = _botPath.dir[map.cellAt(v.x, v.y)];
    _botMoveX = FlowField.unitX(direction);
    _botMoveY = FlowField.unitY(direction);
  }

  void _spawn(double dt) {
    if (_grace > 0) {
      _grace -= dt;
      return;
    }
    final index = nightNumber - 1;
    final target = math.min(
      maxMonsters - 500,
      _swarmBase[index] + savedTonight * _surgePerSoul[index],
    );
    final rate = math.max(24, target / 4);
    _spawnDebt += rate * dt;
    final kinds = _kindsByNight[index];
    while (_spawnDebt >= 1) {
      _spawnDebt -= 1;
      if (swarm.count >= target) continue;
      final angle = rng.nextDouble() * 6.28;
      final reach = camera.viewWidth * 0.6 + 40 + rng.nextDouble() * 120;
      final v = procession.leader;
      final x = v.x + math.cos(angle) * reach;
      final y = v.y + math.sin(angle) * reach * 0.7;
      if (x < 0 || y < 0 || x >= map.width || y >= map.height) continue;
      final cell = map.cellAt(x, y);
      if (map.monsterBlock[cell] == 1 || flow.dist[cell] == 0xFFFF) continue;
      swarm.spawn(kinds[rng.nextInt(kinds.length)], x, y);
    }
  }

  void render(FrameContext ctx) {
    final clock = web.window.performance.now();
    final width = app.surface.pixelWidth, height = app.surface.pixelHeight;
    camera.setViewport(width, height);
    hud.camera.setViewport(width, height);
    _updateCamera(ctx.deltaTime);

    final v = procession.leader;
    final lx = v.px + (v.x - v.px) * _alpha, ly = v.py + (v.y - v.py) * _alpha;

    final world = _world..clear();
    world.setCullRect(
      camera.left - 32,
      camera.top - 32,
      camera.right + 32,
      camera.bottom + 48,
    );
    _drawTrees(world);
    _drawTorches(world);
    swarm.draw(world, _alpha, time, camera);
    procession.draw(world, _alpha, time);
    fx.draw(world);

    final dark = _dark..clear();
    final glow = _glow..clear();
    night.begin(camera, (nightNumber - 1) / (nightsToSurvive - 1));
    _addLights(lx, ly);
    night.draw(dark);
    _drawGlows(glow, lx, ly);

    final ui = _hud..clear();
    hud.draw(ui);

    final encoder = ctx.encoder;
    map.ground.drawTo(encoder, camera);
    map.deco.drawTo(encoder, camera);
    encoder.drawSprites(world, camera);
    encoder.drawSprites(dark, camera);
    encoder.drawSprites(glow, camera);
    encoder.drawSprites(ui, hud.camera, stage: SpriteStage.overlay);

    spritesDrawn = world.length + dark.length + glow.length + ui.length;
    buildMs += (web.window.performance.now() - clock - buildMs) * 0.05;
  }

  void _updateCamera(double dt) {
    final v = procession.leader;
    final damp = 1 - math.exp(-math.min(dt, 0.1) * 6);
    if (stress == 0) {
      camera.x += (v.x - camera.x) * damp;
      camera.y += (v.y - 6 - camera.y) * damp;
    } else {
      camera.x = map.keepX;
      camera.y = map.keepY;
    }
    final halfW = camera.viewWidth / 2, halfH = camera.viewHeight / 2;
    camera.x = camera.x.clamp(halfW, math.max(halfW, map.width - halfW));
    camera.y = camera.y.clamp(halfH, math.max(halfH, map.height - halfH));
    if (_shake > 0) {
      final amount = _shake * _shake * 6;
      camera.x += (rng.nextDouble() - 0.5) * amount;
      camera.y += (rng.nextDouble() - 0.5) * amount;
    }
  }

  void _drawTrees(SpriteBatch batch) {
    final trees = map.trees;
    final firstColumn = WorldMap.columnAt(camera.left - tileSize * 2);
    final lastColumn = WorldMap.columnAt(camera.right + tileSize * 2);
    final firstRow = WorldMap.rowAt(camera.top - tileSize);
    final lastRow = WorldMap.rowAt(camera.bottom + tileSize * 3);
    final dot = art.dot;
    for (var row = firstRow; row <= lastRow; row += 1) {
      for (var column = firstColumn; column <= lastColumn; column += 1) {
        final id = trees[WorldMap.cellOf(column, row)];
        if (id == 0) continue;
        final x = (column + 0.5) * tileSize, y = (row + 0.9) * tileSize;
        final tree = id <= art.trees.length
            ? art.trees[id - 1]
            : art.bushes[id - art.trees.length - 1];
        batch.draw(dot, x, y, width: 14, height: 6, color: 0x00000060);
        batch.draw(tree, x, y, originY: 1, layer: 1);
      }
    }
  }

  void _drawTorches(SpriteBatch batch) {
    final pole = art.tile(dungeon + 130);
    for (final (x, y) in map.torches) {
      if (x < camera.left - 24 ||
          x > camera.right + 24 ||
          y < camera.top - 24 ||
          y > camera.bottom + 40) {
        continue;
      }
      final flicker = math.sin(time * 13 + x) * 2;
      batch.draw(pole, x, y, originY: 1, layer: 1);
      batch.draw(
        art.flame,
        x,
        y - 15,
        width: 13 + flicker,
        height: 15 - flicker,
        color: 0xFFB050FF,
        additive: 1,
        glow: 1,
        layer: 2,
      );
    }
  }

  void _addLights(double lx, double ly) {
    procession.addLights(night.add);
    for (final (x, y) in map.torches) {
      night.add(x, y - 12, 80, 0.7);
    }
    night.add(map.keepX, map.keepY, 120, 0.9);
    if (_flareFlash > 0) night.add(lx, ly, 260, _flareFlash * 3);
    final dawn = phase == Phase.dawn
        ? (phaseTime / 2).clamp(0.0, 1.0)
        : (phase == Phase.won ? (phaseTime / 2).clamp(0.0, 1.0) : 0.0);
    if (dawn > 0) {
      night.add(camera.x, camera.y, camera.viewWidth * 3, dawn * 1.2);
    }
  }

  void _drawGlows(SpriteBatch batch, double lx, double ly) {
    batch.draw(
      art.halo,
      lx,
      ly - 8,
      width: 170,
      height: 170,
      color: 0xFFB05A38,
      additive: 1,
    );
    for (final (x, y) in map.torches) {
      if (x < camera.left - 60 ||
          x > camera.right + 60 ||
          y < camera.top - 60 ||
          y > camera.bottom + 60) {
        continue;
      }
      batch.draw(
        art.halo,
        x,
        y - 14,
        width: 96,
        height: 96,
        color: 0xFF8A3A58,
        additive: 1,
        glow: 0.3,
      );
    }
  }
}
