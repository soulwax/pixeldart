import 'dart:js_interop';
import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';
import 'package:web/web.dart' as web;

import 'chase_camera.dart';
import 'sound.dart';

// Play volume. The ship lives near z = 0 and flies down -Z (the standard
// right-handed view direction); the world streams past toward +Z.
const _shipMinX = -7.0, _shipMaxX = 7.0;
const _shipMinY = -3.2, _shipMaxY = 3.8;
const _fieldHalfX = 11.0, _fieldHalfY = 6.0;
const _spawnFar = -170.0, _despawnZ = 9.0;

const _meteorCount = 48;
const _crystalCount = 10;
const _fuelCount = 3;

const _cruiseSpeed = 24.0, _maxCruise = 58.0, _boostFactor = 1.65;
const _fuelDrain = 3.2, _boostDrain = 11.0;
const _shipScale = 0.75, _shipRadius = 0.62;

// Kenney crafts are authored nose toward +Z; the ship flies down -Z.
final _shipYaw = Quat.axisAngle(Vec3.unitY, math.pi);
// Primitives.cone points up +Y; the flame trails back toward +Z.
final _flameAlong = Quat.axisAngle(Vec3.unitX, math.pi / 2);
const _flameLength = 1.4;

enum Kind { meteor, crystal, fuel }

enum Phase { title, playing, over }

final class Body {
  final Kind kind;
  final SceneNode node;
  final double baseRadius;
  Vec3 pos = Vec3.zero;
  Vec3 spinAxis = Vec3.unitY;
  double spinRate = 0;
  double scale = 1;
  bool active = true;

  Body(this.kind, this.node, this.baseRadius);

  double get radius => baseRadius * scale;
}

/// A copy of [model] re-centred on its bounds, so it spins and collides
/// about its visual middle rather than the asset's authoring origin.
SceneNode centred(ModelAsset model, {String? name}) {
  final c = (model.bounds.min + model.bounds.max) * 0.5;
  return SceneNode.group(name: name)..addChild(model.instantiate(transform: Transform.at(-c)));
}

/// Bounding-sphere radius of [model] at scale 1.
double radiusOf(ModelAsset model) => (model.bounds.max - model.bounds.min).length * 0.5;

/// Kenney's kits are authored unlit; the decoder turns that into a matte
/// dielectric. Give metal parts some sheen and make crystals glow.
MaterialDefinition kenneySurface(String name, MaterialDefinition m) => switch (name.toLowerCase()) {
  'crystal' => m.copyWith(roughness: 0.2, emissiveStrength: 2.2),
  'metal' || 'metaldark' => m.copyWith(metallic: 0.55, roughness: 0.38),
  'metalred' => m.copyWith(metallic: 0.35, roughness: 0.42),
  'dark' => m.copyWith(metallic: 0.15, roughness: 0.55),
  _ => m,
};

void main() async {
  final canvas = web.document.querySelector('#game');
  if (canvas is! web.HTMLCanvasElement) return;
  final hud = Hud();

  final app = await PixeldartApp.mount(
    canvas,
    requestedProfile: QualityProfile.clean,
    enableOrbitControls: false,
  );
  if (app == null) {
    hud.message('WebGL2 unavailable', 'This browser cannot run Pixel Rocket.');
    return;
  }

  hud.message('PIXEL ROCKET', 'loading assets…');
  final Game game;
  try {
    game = await Game.create(app, hud);
  } catch (e, s) {
    print('Pixel Rocket failed to load: $e\n$s');
    hud.message('LOAD FAILED', '$e');
    return;
  }
  game.toTitle();
  // ?autostart skips the title card (handy for screenshots and quick tests).
  if (Uri.base.queryParameters.containsKey('autostart')) game.start();
  // A thrown frame is aborted and reported by the app; the loop goes on.
  app.onFrame = game.frame;
  app.start();
}

final class Game {
  final PixeldartApp app;
  final Hud hud;
  final Sound sound;
  final ChaseCamera camera = ChaseCamera();
  final math.Random rng = math.Random();

  final SceneNode ship;
  final List<Body> bodies;
  final SceneNode flame;
  final ParticleEmitter blast;
  final ParticleEmitter sparkle;
  final ParticleEmitter stars;

  final Set<String> keys = {};
  Phase phase = Phase.title;

  Vec3 shipPos = Vec3.zero;
  Vec3 shipVel = Vec3.zero;
  double speed = _cruiseSpeed;
  double elapsed = 0;
  double distance = 0;
  int score = 0;
  double fuel = 100;
  int shields = 3;
  double invulnerable = 0;
  bool boosting = false;
  bool retro = false;
  double _overTimer = 0;
  bool engineLit = true;
  double _scoreDebt = 0;

  Game._(
    this.app,
    this.hud,
    this.sound,
    this.ship,
    this.bodies,
    this.flame,
    this.blast,
    this.sparkle,
    this.stars,
  );

  static Future<Game> create(PixeldartApp app, Hud hud) async {
    _setupLook(app);

    Future<ModelAsset> model(String name, {MaterialOverride tweak = kenneySurface}) =>
        app.loadModel('res/models/$name.glb', materialOverride: tweak);

    final loaded = await Future.wait([
      model('craft_speederA'),
      model('meteor'),
      model('meteor_detailed'),
      model('meteor_half'),
      model('rock_largeA'),
      model('rock_crystals'),
      // Fuel canisters glow so they read as pickups against the rocks.
      model(
        'rocket_fuelA',
        tweak: (name, m) {
          final base = kenneySurface(name, m);
          return base.copyWith(tintR: base.tintR * 0.3, tintB: base.tintB * 0.55, emissiveStrength: 0.9);
        },
      ),
    ]);
    final shipPrefab = loaded[0];
    final meteorPrefabs = loaded.sublist(1, 5);
    final crystalPrefab = loaded[5];
    final fuelPrefab = loaded[6];

    final ship = centred(shipPrefab, name: 'ship')..scale = _shipScale;
    app.scene.addChild(ship);

    final bodies = <Body>[];
    for (var i = 0; i < _meteorCount; i++) {
      final prefab = meteorPrefabs[i % meteorPrefabs.length];
      // Shrink the hitbox a little: a near-miss should feel like a near-miss.
      bodies.add(Body(Kind.meteor, centred(prefab), radiusOf(prefab) * 0.72));
    }
    for (var i = 0; i < _crystalCount; i++) {
      bodies.add(Body(Kind.crystal, centred(crystalPrefab), radiusOf(crystalPrefab) * 1.4));
    }
    for (var i = 0; i < _fuelCount; i++) {
      bodies.add(Body(Kind.fuel, centred(fuelPrefab), radiusOf(fuelPrefab) * 1.4));
    }
    for (final b in bodies) {
      app.scene.addChild(b.node);
    }

    final (blast, sparkle, stars) = _setupParticles(app);
    final flame = _buildFlame(app);

    final sound = Sound()
      ..register('crystal', 'res/audio/forceField_000.ogg', volume: 0.5)
      ..register('fuel', 'res/audio/laserSmall_000.ogg', volume: 0.55)
      ..register('hit', 'res/audio/impactMetal_002.ogg', volume: 0.7)
      ..register('explode', 'res/audio/lowFrequency_explosion_000.ogg', volume: 0.8, voices: 1)
      ..register('crunch', 'res/audio/explosionCrunch_000.ogg', volume: 0.6)
      ..register('boost', 'res/audio/thrusterFire_000.ogg', volume: 0.4, voices: 2)
      ..registerEngine('res/audio/spaceEngineLow_000.ogg');

    final game = Game._(app, hud, sound, ship, bodies, flame, blast, sparkle, stars);
    app.cameraController = game.camera;
    game._installInput();
    try {
      best = int.parse(web.window.localStorage.getItem('pixelrocket.best') ?? '0');
    } catch (_) {}
    return game;
  }

  static int best = 0;

  static void _setupLook(PixeldartApp app) {
    app.skybox = const SkyboxDeclaration(
      assetId: 'deep_space',
      horizon: LinearColor(0.05, 0.03, 0.09),
      zenith: LinearColor(0.006, 0.008, 0.02),
      ground: LinearColor(0.01, 0.005, 0.02),
      horizonGlow: 0.25,
      starDensity: 0.03,
      cloudCoverage: 0.0,
      cloudDensity: 0.0,
    );
    app.environment = app.environment.copyWith(
      clearColor: const LinearColor(0.005, 0.006, 0.015),
      ambientColor: const LinearColor(0.16, 0.13, 0.22),
      ambientIntensity: 1.0,
      reflectionColor: const LinearColor(0.35, 0.3, 0.5),
      reflectionIntensity: 0.5,
      reflectionConfidence: 0.7,
      directionalLight: const DirectionalLight(
        direction: Vec3(-0.45, -0.8, -0.35),
        color: LinearColor(1.0, 0.9, 0.78),
        intensity: 2.6,
      ),
    );
    app.post = PostProcessState.cinematic(bloomStrength: 0.42, vignette: 0.3);
    // Fog hides the far spawn plane so meteors fade in instead of popping.
    app.enableFog(
      color: const LinearColor(0.012, 0.01, 0.03),
      start: 70,
      end: 165,
    );
  }

  /// Engine flame: an emissive cone behind the ship. Base at the pivot, apex
  /// trailing toward the camera; bloom turns it into a glow.
  static SceneNode _buildFlame(PixeldartApp app) {
    const length = _flameLength;
    final data = Primitives.cone(radius: 0.15, height: length, radialSegments: 14);
    final mesh = app.createMesh(data, debugLabel: 'engine_flame');
    final material = app.createMaterial(
      const MaterialDefinition(
        key: 'engine_flame',
        tintR: 1.0,
        tintG: 0.38,
        tintB: 0.08,
        emissiveStrength: 1.6,
        roughness: 1,
        metallic: 0,
      ),
    );
    final flame = SceneNode.group(name: 'flame');
    flame.add(
      mesh: mesh,
      meshData: data,
      material: material,
      // The cone is centred on its origin; shift it so the base sits here.
      transform: Transform.at(const Vec3(0, length / 2, 0)),
      castsShadow: false,
    );
    app.scene.addChild(flame);
    return flame;
  }

  static (ParticleEmitter, ParticleEmitter, ParticleEmitter) _setupParticles(
    PixeldartApp app,
  ) {
    final quad = app.createMesh(Primitives.quad(width: 1, height: 1), debugLabel: 'particle_quad');
    MaterialHandle glow(String key, double r, double g, double b, double e) =>
        app.createParticleMaterial(key: key, color: LinearColor(r, g, b), glow: e);

    final blast = ParticleEmitter(
      mesh: quad,
      material: glow('fx_blast', 1.0, 0.42, 0.1, 2.4),
      shape: const SphereShape(radius: 0.4, directionMode: SphereDirectionMode.outward),
      minLifetime: 0.5,
      maxLifetime: 1.1,
      minSpeed: 6,
      maxSpeed: 18,
      minStartSize: 0.35,
      maxStartSize: 0.7,
      minEndSize: 0.02,
      maxEndSize: 0.05,
      dragCoefficient: 2.2,
      fadeOutFraction: 0.4,
      alignment: ParticleAlignment.velocityStretched,
      stretchFactor: 0.12,
      blendMode: BlendMode.additive,
      maxParticles: 400,
    );

    final sparkle = ParticleEmitter(
      mesh: quad,
      material: glow('fx_sparkle', 0.3, 1.0, 0.6, 6.0),
      shape: const SphereShape(radius: 0.3, directionMode: SphereDirectionMode.outward),
      minLifetime: 0.35,
      maxLifetime: 0.7,
      minSpeed: 3,
      maxSpeed: 8,
      minStartSize: 0.25,
      maxStartSize: 0.4,
      minEndSize: 0.0,
      maxEndSize: 0.02,
      dragCoefficient: 3.0,
      blendMode: BlendMode.additive,
      maxParticles: 200,
    );

    // Space dust rushing past sells forward speed. Billboards, not
    // velocity-stretched quads: those lie edge-on to a camera looking along
    // the flight axis and read as flat slabs.
    final stars = ParticleEmitter(
      mesh: quad,
      material: glow('fx_dust', 0.75, 0.82, 1.0, 2.5),
      shape: const BoxShape(halfExtents: Vec3(22, 13, 4), fixedDirection: Vec3.unitZ),
      transform: Transform.at(const Vec3(0, 0, -95)),
      rate: 90,
      minLifetime: 1.6,
      maxLifetime: 1.8,
      minSpeed: 60,
      maxSpeed: 70,
      minStartSize: 0.08,
      maxStartSize: 0.16,
      minEndSize: 0.12,
      maxEndSize: 0.2,
      fadeInFraction: 0.3,
      blendMode: BlendMode.additive,
      maxParticles: 400,
    );

    app
      ..addEmitter(stars)
      ..addEmitter(blast)
      ..addEmitter(sparkle);
    return (blast, sparkle, stars);
  }

  void _installInput() {
    web.window.addEventListener(
      'keydown',
      ((web.KeyboardEvent e) {
        final code = e.code;
        if (code.startsWith('Arrow') || code == 'Space') e.preventDefault();
        if (e.repeat) return;
        keys.add(code);
        switch (code) {
          case 'Enter' || 'Space' when phase == Phase.title:
            start();
          case 'Enter' || 'Space' when phase == Phase.over && _overTimer > 0.8:
            start();
          case 'KeyP':
            retro = !retro;
            app.post = retro
                ? PostProcessState.stylizedPs1()
                : PostProcessState.cinematic(bloomStrength: 0.42, vignette: 0.3);
          case 'KeyM':
            sound.muted = !sound.muted;
            if (sound.muted) sound.engine(running: false);
        }
      }).toJS,
    );
    web.window.addEventListener(
      'keyup',
      ((web.KeyboardEvent e) => keys.remove(e.code)).toJS,
    );
    web.window.addEventListener('blur', ((web.Event _) => keys.clear()).toJS);
  }

  bool _down(String a, String b) => keys.contains(a) || keys.contains(b);

  // ── Lifecycle ────────────────────────────────────────────────────────────

  void toTitle() {
    phase = Phase.title;
    _reset();
    hud.message(
      'PIXEL ROCKET',
      'Thread the meteor field. Grab crystals for points,\n'
          'green canisters for fuel.\n\n'
          'WASD / arrows — steer     Shift — boost (2× score)\n'
          'P — retro mode     M — mute\n\n'
          'Press SPACE to launch',
      best: best,
    );
  }

  void start() {
    _reset();
    phase = Phase.playing;
    hud.hideMessage();
    sound.play('boost');
  }

  void _reset() {
    shipPos = Vec3.zero;
    shipVel = Vec3.zero;
    speed = _cruiseSpeed;
    elapsed = 0;
    distance = 0;
    score = 0;
    _scoreDebt = 0;
    fuel = 100;
    shields = 3;
    invulnerable = 0;
    boosting = false;
    ship.visible = true;
    engineLit = true;
    for (final b in bodies) {
      _spawn(b, initial: true);
    }
    camera
      ..target = shipPos
      ..snap();
  }

  void _gameOver(String why) {
    phase = Phase.over;
    _overTimer = 0;
    final isBest = score > best;
    if (isBest) {
      best = score;
      try {
        web.window.localStorage.setItem('pixelrocket.best', '$best');
      } catch (_) {}
    }
    hud.message(
      why,
      'Score  $score\nDistance  ${(distance / 10).round()} km\n\n'
          '${isBest ? 'NEW BEST!\n\n' : ''}Press SPACE to fly again',
      best: best,
    );
  }

  // ── Spawning ────────────────────────────────────────────────────────────

  void _spawn(Body b, {bool initial = false}) {
    final z = initial
        ? -55 - rng.nextDouble() * (-_spawnFar - 55)
        : _spawnFar - rng.nextDouble() * 40;
    switch (b.kind) {
      case Kind.meteor:
        // Bias some meteors onto the ship's current lane so camping fails.
        final aimed = !initial && rng.nextDouble() < 0.3;
        b.pos = aimed
            ? Vec3(
                (shipPos.x + (rng.nextDouble() - 0.5) * 4).clamp(-_fieldHalfX, _fieldHalfX),
                (shipPos.y + (rng.nextDouble() - 0.5) * 3).clamp(-_fieldHalfY, _fieldHalfY),
                z,
              )
            : Vec3(
                (rng.nextDouble() * 2 - 1) * _fieldHalfX,
                (rng.nextDouble() * 2 - 1) * _fieldHalfY,
                z,
              );
        b.scale = 1.4 + math.pow(rng.nextDouble(), 2) * 3.2;
        b.spinRate = 0.4 + rng.nextDouble() * 1.8;
      case Kind.crystal || Kind.fuel:
        b.pos = Vec3(
          _shipMinX + rng.nextDouble() * (_shipMaxX - _shipMinX),
          _shipMinY + rng.nextDouble() * (_shipMaxY - _shipMinY),
          b.kind == Kind.fuel && !initial ? z - 80 : z,
        );
        b.scale = b.kind == Kind.fuel ? 1.3 : 1.6;
        b.spinRate = 1.6;
    }
    b.spinAxis = Vec3(
      rng.nextDouble() * 2 - 1,
      rng.nextDouble() * 2 - 1,
      rng.nextDouble() * 2 - 1,
    ).normalized;
    if (b.kind != Kind.meteor) b.spinAxis = Vec3.unitY;
    b.node
      ..position = b.pos
      ..scale = b.scale
      ..rotation = Quat.axisAngle(b.spinAxis, rng.nextDouble() * math.pi * 2);
    if (!b.active) {
      b.active = true;
      b.node.visible = true;
    }
  }

  // ── Frame ───────────────────────────────────────────────────────────────

  void frame(FrameContext ctx) {
    // Tab switches produce huge deltas; never simulate more than a few frames.
    final dt = ctx.deltaTime.clamp(0.0, 0.05);
    final t = ctx.timeSeconds;

    switch (phase) {
      case Phase.playing:
        _steer(dt);
        _burnFuel(dt);
      case Phase.title:
        // Attract mode: a lazy weave through the field.
        shipPos = Vec3(math.sin(t * 0.6) * 3.0, math.sin(t * 0.9) * 1.2, 0);
        shipVel = Vec3(math.cos(t * 0.6) * 1.8, math.cos(t * 0.9) * 1.1, 0);
        speed = _cruiseSpeed * 0.8;
      case Phase.over:
        _overTimer += dt;
        speed = math.max(0, speed - 30 * dt);
    }

    _advanceWorld(dt);
    if (phase == Phase.playing) _collide();
    _poseShip(t, dt);

    final speed01 = ((speed - _cruiseSpeed) / (_maxCruise * _boostFactor - _cruiseSpeed)).clamp(0.0, 1.0);
    camera
      ..target = shipPos
      ..speed01 = speed01;
    // Dust travels at a multiple of world speed and lives just long enough to
    // reach the camera from the spawn slab 95 units out.
    final dustSpeed = math.max(8.0, speed * 2.4);
    stars
      ..minSpeed = dustSpeed
      ..maxSpeed = dustSpeed * 1.15
      ..minLifetime = 100 / dustSpeed
      ..maxLifetime = 104 / dustSpeed
      ..rate = 30 + speed * 2.5;

    sound.engine(running: phase != Phase.over, rate: 0.8 + speed01 * 1.1);

    // The engine glow is a real light, so passing rocks catch it.
    final tail = shipPos + const Vec3(0, 0.05, 1.0);
    app.environment = app.environment.copyWith(
      pointLights: [
        if (phase != Phase.over || invulnerable > 0)
          PointLight(
            id: 0,
            position: tail,
            color: const LinearColor(1.0, 0.55, 0.2),
            intensity: boosting ? 3.2 : 1.8,
            radius: boosting ? 9.0 : 6.0,
          ),
      ],
    );

    hud.update(this);
  }

  void _steer(double dt) {
    var ix = 0.0, iy = 0.0;
    if (_down('KeyA', 'ArrowLeft')) ix -= 1;
    if (_down('KeyD', 'ArrowRight')) ix += 1;
    if (_down('KeyW', 'ArrowUp')) iy += 1;
    if (_down('KeyS', 'ArrowDown')) iy -= 1;

    final wasBoosting = boosting;
    boosting = _down('ShiftLeft', 'ShiftRight') && fuel > 0;
    if (boosting && !wasBoosting) sound.play('boost');

    // Critically-damped-ish steering: acceleration toward input, drag back.
    const accel = 78.0, drag = 7.5;
    shipVel = Vec3(
      shipVel.x + (ix * accel - shipVel.x * drag) * dt,
      shipVel.y + (iy * accel - shipVel.y * drag) * dt,
      0,
    );
    var p = shipPos + shipVel * dt;
    // Soft walls: clamp position and kill velocity into the wall.
    if (p.x < _shipMinX || p.x > _shipMaxX) shipVel = Vec3(0, shipVel.y, 0);
    if (p.y < _shipMinY || p.y > _shipMaxY) shipVel = Vec3(shipVel.x, 0, 0);
    p = Vec3(p.x.clamp(_shipMinX, _shipMaxX), p.y.clamp(_shipMinY, _shipMaxY), 0);
    shipPos = p;

    elapsed += dt;
    final cruise = math.min(_maxCruise, _cruiseSpeed + elapsed * 0.45);
    final targetSpeed = fuel > 0 ? cruise * (boosting ? _boostFactor : 1.0) : 0.0;
    speed += (targetSpeed - speed) * (1 - math.exp(-dt * (fuel > 0 ? 3.0 : 0.9)));

    invulnerable = math.max(0, invulnerable - dt);
  }

  void _burnFuel(double dt) {
    fuel = math.max(0, fuel - (boosting ? _boostDrain : _fuelDrain) * dt);
    final step = speed * dt;
    distance += step;
    // Accumulate fractions: at 60 fps a step is under one point.
    _scoreDebt += step * (boosting ? 2 : 1);
    final whole = _scoreDebt.floor();
    _scoreDebt -= whole;
    score += whole;
    if (fuel <= 0) {
      engineLit = false;
      if (speed < 1.5) _gameOver('OUT OF FUEL');
    }
  }

  void _advanceWorld(double dt) {
    final dz = speed * dt;
    for (final b in bodies) {
      b.pos = Vec3(b.pos.x, b.pos.y, b.pos.z + dz);
      if (b.pos.z > _despawnZ) {
        _spawn(b);
        continue;
      }
      b.node
        ..position = b.pos
        ..rotateAxis(b.spinAxis, b.spinRate * dt);
    }
  }

  void _collide() {
    for (final b in bodies) {
      if (!b.active) continue;
      final reach = b.radius + _shipRadius;
      final d = b.pos - shipPos;
      if (d.lengthSquared > reach * reach) continue;

      switch (b.kind) {
        case Kind.meteor:
          if (invulnerable > 0) continue;
          _hit(b);
        case Kind.crystal:
          score += 250 * (boosting ? 2 : 1);
          sparkle.burst(28, position: b.pos);
          sound.play('crystal');
          _consume(b);
        case Kind.fuel:
          fuel = math.min(100, fuel + 35);
          engineLit = true;
          sparkle.burst(40, position: b.pos);
          sound.play('fuel');
          _consume(b);
      }
    }
  }

  void _consume(Body b) {
    b.active = false;
    b.node.visible = false;
  }

  void _hit(Body meteor) {
    shields -= 1;
    blast.burst(70, position: (meteor.pos + shipPos) * 0.5);
    _consume(meteor);
    if (shields <= 0) {
      blast.burst(220, position: shipPos);
      ship.visible = false;
      engineLit = false;
      app.shakeCamera(trauma: 1.0);
      sound.play('explode');
      _gameOver('SHIP DESTROYED');
      return;
    }
    invulnerable = 1.6;
    app.shakeCamera(trauma: 0.6);
    sound
      ..play('hit')
      ..play('crunch');
  }

  void _poseShip(double t, double dt) {
    final roll = Quat.axisAngle(Vec3.unitZ, (-shipVel.x * 0.06).clamp(-0.65, 0.65));
    final pitch = Quat.axisAngle(Vec3.unitX, (shipVel.y * 0.05).clamp(-0.5, 0.5));
    final bob = math.sin(t * 3.1) * 0.04;
    final tilt = roll * pitch;
    ship
      ..position = shipPos + Vec3(0, bob, 0)
      ..rotation = tilt * _shipYaw;

    if (phase != Phase.over) {
      // Blink while invulnerable.
      final shown = invulnerable <= 0 || (invulnerable * 12).floor().isEven;
      ship.visible = shown;
    }

    // Flicker the flame and lengthen it on boost. Stretch scales the cone
    // along its own axis only, so a boosted flame gets longer, not fatter;
    // its centre moves out with it so the base stays at the nozzle.
    final flicker = 0.85 + 0.15 * math.sin(t * 53) * math.sin(t * 31);
    final length = (boosting ? 1.9 : 1.0) * flicker;
    flame
      ..position = ship.position + tilt.rotate(const Vec3(0, 0.02, 0.78))
      ..rotation = tilt * _flameAlong;
    flame.children.first.transform = Transform(
      translation: Vec3(0, _flameLength / 2 * length, 0),
      stretch: Vec3(1, length, 1),
    );
    flame.visible = engineLit && phase != Phase.over;
  }
}

/// DOM overlay: stats bar plus a centred message card.
final class Hud {
  final web.Element? _score = web.document.querySelector('#score');
  final web.Element? _best = web.document.querySelector('#best');
  final web.Element? _speed = web.document.querySelector('#speed');
  final web.Element? _shields = web.document.querySelector('#shields');
  final web.HTMLElement? _fuel = web.document.querySelector('#fuel-fill') as web.HTMLElement?;
  final web.HTMLElement? _card = web.document.querySelector('#card') as web.HTMLElement?;
  final web.Element? _title = web.document.querySelector('#card-title');
  final web.Element? _body = web.document.querySelector('#card-body');
  final web.HTMLElement? _boost = web.document.querySelector('#boost') as web.HTMLElement?;

  String _last = '';

  void message(String title, String body, {int? best}) {
    _title?.textContent = title;
    _body?.textContent = body;
    if (best != null) _best?.textContent = 'BEST $best';
    _card?.classList.remove('hidden');
  }

  void hideMessage() => _card?.classList.add('hidden');

  void update(Game g) {
    // Only touch the DOM when something visible changed.
    final key = '${g.score}|${g.speed.round()}|${g.shields}|${g.fuel.round()}|${g.boosting}';
    if (key == _last) return;
    _last = key;
    _score?.textContent = '${g.score}';
    _speed?.textContent = '${(g.speed * 36).round()} km/h';
    _shields?.textContent = '◆' * g.shields + '◇' * (3 - g.shields).clamp(0, 3);
    _fuel?.style.width = '${g.fuel.clamp(0, 100)}%';
    _fuel?.classList.toggle('low', g.fuel < 25);
    _boost?.classList.toggle('on', g.boosting);
  }
}
