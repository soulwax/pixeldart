import 'dart:js_interop';
import 'dart:math' as math;
import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';
import 'package:web/web.dart' as web;

import 'ortho_camera.dart';
import 'sound.dart';
import 'textures.dart';

// LANTERN — a 2D dungeon crawl lit only by pixeldart's four point lights.
//
// The world is the XY plane at z = 0, seen through an orthographic camera
// looking down -Z. Everything "2D" is a flat disc, ring or slab facing the
// camera, so the renderer's per-pixel lighting, normal maps, emissive bloom
// and post stack all still apply to it.
//
// The shader takes exactly four point lights. The game makes that a rule:
// you are one light, and at most three braziers can burn. Lighting a fourth
// snuffs the oldest.

const _halfW = 15.0, _halfH = 8.5; // arena interior
const _lightZ = 2.2; // lights float between camera and floor
const _maxFlames = 3; // + the player = the renderer's 4 point lights
const _flameRadius = 3.4; // shades will not enter a lit brazier's reach
const _motesPerRoom = 5;
const _pillarSizes = [1.4, 2.2, 1.6, 2.6, 1.2, 1.8];

// Primitives build around +Y; tipping them 90° about X makes +Y face the
// camera (+Z), turning cylinders into discs and tori into rings.
final _faceCamera = Quat.axisAngle(Vec3.unitX, math.pi / 2);

enum Phase { title, playing, fading, over }

final class Brazier {
  final SceneNode node;
  final SceneNode flame;
  final int id;
  double x = 0, y = 0;
  bool lit = false;
  Brazier(this.node, this.flame, this.id);
}

final class Mote {
  final SceneNode node;
  double x = 0, y = 0;
  bool taken = false;
  Mote(this.node);
}

final class Shade {
  final SceneNode node;
  final SceneNode eyes;
  double x = 0, y = 0, vx = 0, vy = 0;
  double respawn = 0; // > 0 while dissolved
  final double phase;
  Shade(this.node, this.eyes, this.phase);
}

final class Pillar {
  final SceneNode node;
  final double half;
  double x = 0, y = 0;
  bool active = false;
  Pillar(this.node, this.half);
}

void setVisible(SceneNode node, bool visible) {
  node.traverse((n) {
    if (n.mesh == null) return;
    n.visibilityMask = visible ? -1 : 0;
    n.markDirty();
  });
}

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
    hud.card('NO WEBGL2', 'This browser cannot run Lantern.');
    return;
  }
  final Game game;
  try {
    game = Game(app, hud);
  } catch (e, s) {
    print('Lantern failed to start: $e\n$s');
    hud.card('FAILED TO START', '$e');
    return;
  }
  if (Uri.base.queryParameters.containsKey('autostart')) game.start();
  var reported = false;
  app.onFrame = (ctx) {
    try {
      game.frame(ctx);
    } catch (e, s) {
      if (!reported) print('Lantern frame error: $e\n$s');
      reported = true;
    }
  };
  app.start();
}

final class Game {
  final PixeldartApp app;
  final Hud hud;
  final OrthoCamera camera = OrthoCamera();
  final Sound sound = Sound();
  final math.Random rng = math.Random();
  final Set<String> keys = {};

  late final SceneNode player;
  final List<Brazier> braziers = [];
  final List<Mote> motes = [];
  final List<Shade> shades = [];
  final List<Pillar> pillars = [];
  late final SceneNode portal;
  late final ParticleEmitter fire, gold, violet, smoke;

  /// Lit braziers, oldest first. Its length never exceeds [_maxFlames].
  final List<Brazier> flames = [];

  Phase phase = Phase.title;
  int room = 1;
  int hearts = 3;
  int motesLeft = _motesPerRoom;
  bool portalOpen = false;
  double px = 0, py = 0, vx = 0, vy = 0;
  double faceX = 1, faceY = 0;
  double dashTime = 0, dashCooldown = 0, invulnerable = 0;
  double glitch = 0, fade = 0, hintTimer = 0, time = 0;
  bool _roomBuilt = false;
  final Map<ParticleEmitter, double> _debt = {};

  final bool _debug = Uri.base.queryParameters.containsKey('debug');

  int postMode = 0;
  static const _postNames = ['CLEAN', 'PS1', 'VHS'];

  Game(this.app, this.hud) {
    _setupLook();
    _buildWorld();
    _setupSound();
    _installInput();
    app.cameraController = camera;
    camera
      ..boundsHalfX = _halfW + 1.2
      ..boundsHalfY = _halfH + 1.2;
    _buildRoom();
    _title();
  }

  // ── Look ─────────────────────────────────────────────────────────────────

  void _setupLook() {
    app.environment = app.environment.copyWith(
      clearColor: const LinearColor(0.0, 0.0, 0.0),
      ambientColor: const LinearColor(0.35, 0.4, 0.7),
      ambientIntensity: 0.03,
      reflectionIntensity: 0.0,
      // A trace of cold moonlight so the dark reads as navy, not void.
      directionalLight: const DirectionalLight(
        direction: Vec3(0.35, -0.45, -1.0),
        color: LinearColor(0.35, 0.45, 0.9),
        intensity: 0.025,
      ),
    );
    _applyPost();
  }

  PostProcessState get _basePost => switch (postMode) {
    1 => PostProcessState.stylizedPs1(quantizationBits: 4, ditherStrength: 0.8)
        .copyWith(bloomStrength: 0.5),
    2 => PostProcessState.retroVhs(trackingWeight: 0.2, chromaWeight: 0.35, noiseWeight: 0.25)
        .copyWith(bloomStrength: 0.55),
    // SSAO stays off: an orthographic floor has no occlusion worth sampling.
    _ => PostProcessState.cinematic(ssaoStrength: 0, bloomStrength: 0.6, vignette: 0.5, grain: 0.05),
  };

  void _applyPost() {
    var post = _basePost;
    if (glitch > 0) {
      // Taking a hit tears the picture: a burst of VHS damage that decays.
      final g = glitch.clamp(0.0, 1.0);
      post = post.copyWith(
        vhsTrackingWeight: g,
        vhsChromaWeight: g,
        vhsNoiseWeight: g * 0.8,
        vhsHeadSwitchWeight: g * 0.6,
      );
    }
    // Room transitions fade through exposure rather than a DOM overlay.
    final exposure = post.exposure * (1 - fade);
    app.post = post.copyWith(exposure: math.max(0.001, exposure));
  }

  // ── World construction ──────────────────────────────────────────────────

  MaterialHandle _mat(
    String key, {
    double r = 1,
    double g = 1,
    double b = 1,
    double rough = 0.6,
    double metal = 0,
    double emissive = 0,
    TextureHandle? albedo,
    TextureHandle? normal,
    double uvU = 1,
    double uvV = 1,
  }) => app.createMaterial(
    MaterialDefinition(
      key: key,
      tintR: r,
      tintG: g,
      tintB: b,
      roughness: rough,
      metallic: metal,
      emissiveStrength: emissive,
      albedoTexture: albedo,
      normalTexture: normal,
      // The emissive term samples a map; without one it contributes nothing.
      emissiveTexture: emissive > 0 ? _white : null,
      normalStrength: normal == null ? 1 : 1.6,
      uvScaleU: uvU,
      uvScaleV: uvV,
    ),
  );

  late final TextureHandle _white = app.createTexture(
    width: 2,
    height: 2,
    pixels: Uint8List(16)..fillRange(0, 16, 255),
    debugLabel: 'white',
  );

  final Map<String, (MeshHandle, MeshData)> _meshes = {};

  (MeshHandle, MeshData) _mesh(String key, MeshData Function() build) =>
      _meshes.putIfAbsent(key, () {
        final data = build();
        return (app.createMesh(data, debugLabel: key), data);
      });

  /// A flat disc facing the camera at depth [z].
  SceneNode _disc(SceneNode parent, double radius, MaterialHandle material, {double z = 0, Vec3 at = Vec3.zero}) {
    final (mesh, data) = _mesh(
      'disc$radius',
      () => Primitives.cylinder(radius: radius, height: 0.08, radialSegments: 28),
    );
    return parent.add(
      mesh: mesh,
      meshData: data,
      material: material,
      transform: Transform(translation: Vec3(at.x, at.y, z), rotation: _faceCamera),
    )..castsShadow = false;
  }

  SceneNode _ring(SceneNode parent, double radius, double tube, MaterialHandle material, {double z = 0}) {
    final (mesh, data) = _mesh(
      'ring$radius/$tube',
      () => Primitives.torus(radius: radius, tubeRadius: tube, radialSegments: 10, tubularSegments: 40),
    );
    return parent.add(
      mesh: mesh,
      meshData: data,
      material: material,
      transform: Transform(translation: Vec3(0, 0, z), rotation: _faceCamera),
    )..castsShadow = false;
  }

  TextureHandle _tex(Uint8List pixels, int size, String label) => app.createProceduralTexture(
    pixels,
    width: size,
    height: size,
    debugLabel: label,
  );

  void _buildWorld() {
    final scene = app.scene;

    // Floor: normal-mapped flagstones, invisible until a light reaches them.
    final stone = flagstones();
    final stoneAlbedo = _tex(stone.albedo, stone.size, 'flag_albedo');
    final stoneNormal = _tex(stone.normals(strength: 4), stone.size, 'flag_normal');
    final floorData = Primitives.plane(width: _halfW * 2, depth: _halfH * 2);
    scene.add(
      mesh: app.createMesh(floorData, debugLabel: 'floor'),
      meshData: floorData,
      material: _mat(
        'floor',
        rough: 0.82,
        albedo: stoneAlbedo,
        normal: stoneNormal,
        uvU: _halfW * 2 / 5,
        uvV: _halfH * 2 / 5,
      ),
      transform: Transform(rotation: _faceCamera),
    );

    // Brick walls around the arena and a pool of pillars.
    final brick = bricks();
    final brickAlbedo = _tex(brick.albedo, brick.size, 'brick_albedo');
    final brickNormal = _tex(brick.normals(strength: 3), brick.size, 'brick_normal');
    void slab(String key, double w, double h, double x, double y) {
      final data = Primitives.roundedBox(width: w, height: h, depth: 1.2, bevelRadius: 0.12, bevelSegments: 2);
      scene.add(
        mesh: app.createMesh(data, debugLabel: key),
        meshData: data,
        material: _mat(key, rough: 0.75, albedo: brickAlbedo, normal: brickNormal, uvU: w / 2, uvV: h / 2),
        transform: Transform.at(Vec3(x, y, 0.6)),
      );
    }

    const t = 1.2;
    slab('wall_n', _halfW * 2 + t * 2, t, 0, _halfH + t / 2);
    slab('wall_s', _halfW * 2 + t * 2, t, 0, -_halfH - t / 2);
    slab('wall_w', t, _halfH * 2, -_halfW - t / 2, 0);
    slab('wall_e', t, _halfH * 2, _halfW + t / 2, 0);

    for (var i = 0; i < _pillarSizes.length; i++) {
      final s = _pillarSizes[i];
      final data = Primitives.roundedBox(width: s, height: s, depth: 1.2, bevelRadius: 0.14, bevelSegments: 2);
      final node = scene.add(
        mesh: app.createMesh(data, debugLabel: 'pillar$i'),
        meshData: data,
        material: _mat('pillar$i', rough: 0.75, albedo: brickAlbedo, normal: brickNormal, uvU: s / 2, uvV: s / 2),
      );
      pillars.add(Pillar(node, s / 2));
    }

    // Player: a warm emissive core inside a faint halo ring.
    player = SceneNode.group(name: 'player');
    scene.addChild(player);
    _disc(player, 0.3, _mat('wisp_core', r: 1, g: 0.85, b: 0.55, emissive: 5), z: 0.5);
    _ring(player, 0.48, 0.04, _mat('wisp_halo', r: 1, g: 0.6, b: 0.25, emissive: 2.2), z: 0.45);

    // Braziers: a stone plinth and iron bowl, with a flame disc when lit.
    final plinth = _mat('plinth', r: 0.55, g: 0.52, b: 0.5, rough: 0.9);
    final iron = _mat('iron', r: 0.35, g: 0.33, b: 0.32, rough: 0.35, metal: 0.8);
    final flameMat = _mat('flame', r: 1, g: 0.4, b: 0.08, emissive: 2.6);
    for (var i = 0; i < 6; i++) {
      final node = SceneNode.group(name: 'brazier$i');
      scene.addChild(node);
      _disc(node, 0.6, plinth, z: 0.2);
      _ring(node, 0.42, 0.1, iron, z: 0.3);
      final flame = _disc(node, 0.28, flameMat, z: 0.35);
      braziers.add(Brazier(node, flame, i + 1));
    }

    // Motes: faceted gold that only exists when light glints off it.
    final (octMesh, octData) = _mesh('octa', () => Primitives.octahedron(radius: 0.32));
    final goldMat = _mat('mote_gold', r: 1, g: 0.78, b: 0.32, rough: 0.22, metal: 0.9);
    for (var i = 0; i < _motesPerRoom; i++) {
      final node = scene.add(mesh: octMesh, meshData: octData, material: goldMat);
      motes.add(Mote(node));
    }

    // Shades: near-black discs. In the dark only their eyes show.
    final shadeMat = _mat('shade', r: 0.06, g: 0.03, b: 0.09, rough: 0.3, metal: 0.4);
    final eyeMat = _mat('shade_eye', r: 1, g: 0.08, b: 0.05, emissive: 3);
    for (var i = 0; i < 7; i++) {
      final node = SceneNode.group(name: 'shade$i');
      scene.addChild(node);
      _disc(node, 0.5, shadeMat, z: 0.4);
      final eyes = node.add(name: 'eyes');
      _disc(eyes, 0.085, eyeMat, z: 0.48, at: const Vec3(-0.16, 0.06, 0));
      _disc(eyes, 0.085, eyeMat, z: 0.48, at: const Vec3(0.16, 0.06, 0));
      shades.add(Shade(node, eyes, rng.nextDouble() * 6));
    }

    // Portal: a cold ring that opens once every mote is found.
    portal = SceneNode.group(name: 'portal');
    scene.addChild(portal);
    _ring(portal, 0.95, 0.13, _mat('portal_ring', r: 0.3, g: 0.85, b: 1, emissive: 4), z: 0.3);
    _disc(portal, 0.75, _mat('portal_core', r: 0.02, g: 0.05, b: 0.1, rough: 0.1, metal: 0.6), z: 0.25);

    _setupParticles();
  }

  void _setupParticles() {
    final quad = app.createMesh(Primitives.quad(width: 1, height: 1), debugLabel: 'pquad');
    // Black edges let the texture double as the emissive map, so glow fades
    // with the sprite instead of blooming as a hard square.
    final soft = app.createProceduralTexture(
      ProceduralTextures.radialParticle(
        width: 64,
        height: 64,
        innerRadius: 0.05,
        falloffExponent: 2.0,
        edgeColor: const LinearColor(0, 0, 0),
      ),
      width: 64,
      height: 64,
      wrap: GpuTextureWrap.clampToEdge,
      debugLabel: 'psoft',
    );
    ParticleEmitter emitter(
      String key,
      double r,
      double g,
      double b,
      double glow, {
      double minSpeed = 0.5,
      double maxSpeed = 2.0,
      double minLife = 0.4,
      double maxLife = 0.9,
      double size = 0.35,
      Vec3 accel = Vec3.zero,
      double drag = 1.5,
    }) {
      final e = ParticleEmitter(
        mesh: quad,
        material: app.createMaterial(
          MaterialDefinition(
            key: key,
            albedoTexture: soft,
            emissiveTexture: soft,
            tintR: r,
            tintG: g,
            tintB: b,
            emissiveStrength: glow,
            roughness: 1,
            metallic: 0,
            alphaMode: AlphaMode.blended,
            doubleSided: true,
          ),
        ),
        shape: const SphereShape(radius: 0.15, directionMode: SphereDirectionMode.outward),
        minLifetime: minLife,
        maxLifetime: maxLife,
        minSpeed: minSpeed,
        maxSpeed: maxSpeed,
        minStartSize: size * 0.7,
        maxStartSize: size,
        minEndSize: 0.02,
        maxEndSize: 0.06,
        acceleration: accel,
        dragCoefficient: drag,
        blendMode: BlendMode.additive,
        maxParticles: 700,
      );
      app.addEmitter(e);
      return e;
    }

    // Top-down, "up the screen" doubles as rising heat; it reads well.
    fire = emitter('fx_fire', 1, 0.42, 0.1, 5, accel: const Vec3(0, 1.6, 0), size: 0.42);
    gold = emitter('fx_gold', 1, 0.8, 0.3, 4, minSpeed: 1, maxSpeed: 4, size: 0.3);
    violet = emitter('fx_violet', 0.6, 0.2, 1, 4, minSpeed: 1.5, maxSpeed: 5, size: 0.45);
    smoke = emitter('fx_smoke', 0.4, 0.4, 0.45, 0.5,
        accel: const Vec3(0, 1.0, 0), minLife: 0.8, maxLife: 1.6, size: 0.7, drag: 2.5);
  }

  void _setupSound() {
    sound
      ..register('mote', 'res/audio/forceField_001.ogg', volume: 0.5)
      ..register('ignite', 'res/audio/thrusterFire_002.ogg', volume: 0.45)
      ..register('snuff', 'res/audio/slime_000.ogg', volume: 0.5)
      ..register('hit', 'res/audio/impactMetal_000.ogg', volume: 0.7)
      ..register('glitch', 'res/audio/computerNoise_001.ogg', volume: 0.35, voices: 1)
      ..register('portal', 'res/audio/doorOpen_001.ogg', volume: 0.6, voices: 1)
      ..register('dash', 'res/audio/laserRetro_001.ogg', volume: 0.3)
      ..register('die', 'res/audio/lowFrequency_explosion_001.ogg', volume: 0.8, voices: 1)
      ..registerEngine('res/audio/spaceEngineLow_002.ogg', volume: 0.12);
  }

  // ── Rooms ───────────────────────────────────────────────────────────────

  /// Finds a free spot at least [clear] from everything already placed.
  (double, double) _freeSpot(List<(double, double, double)> taken, double clear) {
    for (var attempt = 0; attempt < 200; attempt++) {
      final x = (rng.nextDouble() * 2 - 1) * (_halfW - 1.5);
      final y = (rng.nextDouble() * 2 - 1) * (_halfH - 1.5);
      var ok = true;
      for (final (tx, ty, tr) in taken) {
        final dx = x - tx, dy = y - ty;
        if (dx * dx + dy * dy < (clear + tr) * (clear + tr)) {
          ok = false;
          break;
        }
      }
      if (ok) {
        taken.add((x, y, clear));
        return (x, y);
      }
    }
    final p = (rng.nextDouble() * 2 - 1) * _halfW * 0.8;
    taken.add((p, 0, clear));
    return (p, 0);
  }

  void _buildRoom() {
    final taken = <(double, double, double)>[(0, 0, 2.5)]; // spawn stays clear
    px = 0;
    py = 0;
    vx = vy = 0;

    final pillarCount = math.min(_pillarSizes.length, 2 + room ~/ 2);
    for (var i = 0; i < pillars.length; i++) {
      final p = pillars[i];
      p.active = i < pillarCount;
      if (p.active) {
        final (nx, ny) = _freeSpot(taken, p.half + 1.4);
        p.x = nx;
        p.y = ny;
        p.node.position = Vec3(p.x, p.y, 0.6);
      }
      setVisible(p.node, p.active);
      p.node.markDirty();
    }

    flames.clear();
    for (final b in braziers) {
      final (nx, ny) = _freeSpot(taken, 2.2);
      b.x = nx;
      b.y = ny;
      b.lit = false;
      b.node.position = Vec3(b.x, b.y, 0);
      setVisible(b.flame, false);
    }

    // Motes hide in the gaps between braziers, where it is darkest.
    for (final m in motes) {
      final (nx, ny) = _freeSpot(taken, 1.6);
      m.x = nx;
      m.y = ny;
      m.taken = false;
      m.node.position = Vec3(m.x, m.y, 0.5);
      setVisible(m.node, true);
    }
    motesLeft = motes.length;

    final shadeCount = math.min(shades.length, room + 1);
    for (var i = 0; i < shades.length; i++) {
      final s = shades[i];
      if (i < shadeCount) {
        _respawnShade(s);
      } else {
        s.respawn = double.infinity; // unused this room
        setVisible(s.node, false);
      }
    }

    portalOpen = false;
    setVisible(portal, false);
    camera
      ..target = Vec3.zero
      ..snap();
    _roomBuilt = true;
  }

  void _respawnShade(Shade s) {
    // Re-enter from a dark corner away from the player.
    var best = (0.0, 0.0);
    var bestD = -1.0;
    for (var i = 0; i < 8; i++) {
      final x = (rng.nextDouble() * 2 - 1) * (_halfW - 1);
      final y = (rng.nextDouble() * 2 - 1) * (_halfH - 1);
      final d = (x - px) * (x - px) + (y - py) * (y - py);
      if (d > bestD && !_inFlameReach(x, y)) {
        bestD = d;
        best = (x, y);
      }
    }
    final (nx, ny) = best;
    s.x = nx;
    s.y = ny;
    s.vx = s.vy = 0;
    s.respawn = 0;
    s.node.position = Vec3(s.x, s.y, 0);
    setVisible(s.node, true);
  }

  // ── Lifecycle ───────────────────────────────────────────────────────────

  void _title() {
    phase = Phase.title;
    hud.card(
      'LANTERN',
      'The dark hides five golden motes. Find them all to open the way on.\n\n'
          'Only four lights may burn: yours, and three braziers.\n'
          'Lighting a fourth snuffs the oldest. Shades fear the flame.\n\n'
          'WASD / arrows — move     SPACE — dash\n'
          '1 / 2 / 3 — clean · PS1 · VHS     M — mute\n\n'
          'Press SPACE to begin',
    );
  }

  void start() {
    room = 1;
    hearts = 3;
    _buildRoom();
    phase = Phase.playing;
    hud.hideCard();
    hud.toast('ROOM 1');
  }

  // ── Input ───────────────────────────────────────────────────────────────

  void _installInput() {
    web.window.addEventListener(
      'keydown',
      ((web.KeyboardEvent e) {
        final code = e.code;
        if (code.startsWith('Arrow') || code == 'Space') e.preventDefault();
        if (e.repeat) return;
        keys.add(code);
        switch (code) {
          case 'Space' || 'Enter' when phase == Phase.title || phase == Phase.over:
            start();
          case 'Space' when phase == Phase.playing:
            _dash();
          case 'Digit1' || 'Digit2' || 'Digit3':
            postMode = int.parse(code.substring(5)) - 1;
            hud.toast('${_postNames[postMode]} LOOK');
          // ?debug: K gathers every mote; pressed again, steps onto the portal.
          case 'KeyK' when _debug && phase == Phase.playing:
            if (portalOpen) {
              px = portal.position.x;
              py = portal.position.y;
            } else {
              for (final m in motes.where((m) => !m.taken)) {
                m.x = px;
                m.y = py;
              }
            }
          case 'KeyM':
            sound.muted = !sound.muted;
            if (sound.muted) sound.engine(running: false);
        }
      }).toJS,
    );
    web.window.addEventListener('keyup', ((web.KeyboardEvent e) => keys.remove(e.code)).toJS);
    web.window.addEventListener('blur', ((web.Event _) => keys.clear()).toJS);
  }

  bool _down(String a, String b) => keys.contains(a) || keys.contains(b);

  void _dash() {
    if (dashCooldown > 0) return;
    dashTime = 0.16;
    dashCooldown = 0.9;
    vx = faceX * 22;
    vy = faceY * 22;
    sound.play('dash');
  }

  // ── Frame ───────────────────────────────────────────────────────────────

  void frame(FrameContext ctx) {
    final dt = ctx.deltaTime.clamp(0.0, 0.05);
    time += dt;

    // Keep the whole arena in view whatever the window's shape.
    final aspect = app.surface.pixelWidth / app.surface.pixelHeight;
    camera.halfHeight = math.max(_halfH + 1.3, (_halfW + 1.3) / aspect);

    switch (phase) {
      case Phase.playing:
        _movePlayer(dt);
        _updateBraziers();
        _updateMotes(dt);
        _updateShades(dt);
        _updatePortal();
      case Phase.fading:
        fade = math.min(1, fade + dt * 1.8);
        if (fade >= 1 && !_roomBuilt) {
          room++;
          _buildRoom();
          hud.toast('ROOM $room');
        }
        if (_roomBuilt && fade >= 1) phase = Phase.playing;
      case Phase.title || Phase.over:
        // Attract mode: the wisp drifts in lazy loops.
        px = math.sin(time * 0.5) * 5;
        py = math.sin(time * 0.8) * 2.5;
    }
    if (phase == Phase.playing && fade > 0) fade = math.max(0, fade - dt * 1.8);

    _animate(dt);
    _emit(dt);
    _lights();
    glitch = math.max(0, glitch - dt * 1.6);
    _applyPost();
    camera.target = Vec3(px, py, 0);
    sound.engine(running: phase != Phase.title, rate: 0.6 + flames.length * 0.08);
    hud.update(this);
  }

  void _movePlayer(double dt) {
    var ix = 0.0, iy = 0.0;
    if (_down('KeyA', 'ArrowLeft')) ix -= 1;
    if (_down('KeyD', 'ArrowRight')) ix += 1;
    if (_down('KeyW', 'ArrowUp')) iy += 1;
    if (_down('KeyS', 'ArrowDown')) iy -= 1;
    final len = math.sqrt(ix * ix + iy * iy);
    if (len > 0) {
      ix /= len;
      iy /= len;
      faceX = ix;
      faceY = iy;
    }

    dashTime = math.max(0, dashTime - dt);
    dashCooldown = math.max(0, dashCooldown - dt);
    invulnerable = math.max(0, invulnerable - dt);
    if (dashTime <= 0) {
      const accel = 60.0, drag = 9.0;
      vx += (ix * accel - vx * drag) * dt;
      vy += (iy * accel - vy * drag) * dt;
    }
    final (nx, ny) = _collide(px + vx * dt, py + vy * dt, 0.35);
    px = nx;
    py = ny;
  }

  /// Pushes a circle out of the arena walls and active pillars.
  (double, double) _collide(double x, double y, double r) {
    x = x.clamp(-_halfW + r, _halfW - r);
    y = y.clamp(-_halfH + r, _halfH - r);
    for (final p in pillars) {
      if (!p.active) continue;
      final cx = x.clamp(p.x - p.half, p.x + p.half);
      final cy = y.clamp(p.y - p.half, p.y + p.half);
      final dx = x - cx, dy = y - cy;
      final d2 = dx * dx + dy * dy;
      if (d2 < r * r) {
        if (d2 > 1e-9) {
          final d = math.sqrt(d2);
          x = cx + dx / d * r;
          y = cy + dy / d * r;
        } else {
          // Centre inside the box: leave by the nearest face.
          final ox = p.half - (x - p.x).abs(), oy = p.half - (y - p.y).abs();
          if (ox < oy) {
            x = p.x + (x >= p.x ? 1 : -1) * (p.half + r);
          } else {
            y = p.y + (y >= p.y ? 1 : -1) * (p.half + r);
          }
        }
      }
    }
    return (x, y);
  }

  bool _inFlameReach(double x, double y) {
    for (final b in flames) {
      final dx = x - b.x, dy = y - b.y;
      if (dx * dx + dy * dy < _flameRadius * _flameRadius) return true;
    }
    return false;
  }

  void _updateBraziers() {
    for (final b in braziers) {
      if (b.lit) continue;
      final dx = px - b.x, dy = py - b.y;
      if (dx * dx + dy * dy > 1.1 * 1.1) continue;
      _ignite(b);
    }
  }

  void _ignite(Brazier b) {
    b.lit = true;
    flames.add(b);
    setVisible(b.flame, true);
    fire.burst(40, position: Vec3(b.x, b.y, 0.8));
    sound.play('ignite');
    if (flames.length > _maxFlames) {
      final old = flames.removeAt(0);
      old.lit = false;
      setVisible(old.flame, false);
      smoke.burst(30, position: Vec3(old.x, old.y, 0.8));
      sound.play('snuff');
      hud.toast('only four lights may burn');
    }
    // New light burns away any shade caught inside it.
    for (final s in shades) {
      if (s.respawn != 0) continue;
      final dx = s.x - b.x, dy = s.y - b.y;
      if (dx * dx + dy * dy < _flameRadius * _flameRadius) _dissolve(s);
    }
  }

  void _dissolve(Shade s) {
    violet.burst(45, position: Vec3(s.x, s.y, 0.8));
    s.respawn = 4.0;
    setVisible(s.node, false);
    sound.play('snuff');
  }

  void _updateMotes(double dt) {
    for (final m in motes) {
      if (m.taken) continue;
      final dx = px - m.x, dy = py - m.y;
      if (dx * dx + dy * dy > 0.8 * 0.8) continue;
      m.taken = true;
      setVisible(m.node, false);
      gold.burst(36, position: Vec3(m.x, m.y, 0.8));
      sound.play('mote');
      motesLeft--;
      if (motesLeft == 0) _openPortal();
    }
    // A faint glint now and then so the dark is searchable, not hopeless.
    hintTimer -= dt;
    if (hintTimer <= 0) {
      hintTimer = 1.4 + rng.nextDouble();
      final left = motes.where((m) => !m.taken).toList();
      if (left.isNotEmpty) {
        final m = left[rng.nextInt(left.length)];
        gold.burst(3, position: Vec3(m.x, m.y, 0.8));
      }
    }
  }

  void _openPortal() {
    // Open it as far from the player as the room allows.
    var best = (0.0, 0.0);
    var bestD = -1.0;
    for (var i = 0; i < 24; i++) {
      final (x, y) = (
        (rng.nextDouble() * 2 - 1) * (_halfW - 1.5),
        (rng.nextDouble() * 2 - 1) * (_halfH - 1.5),
      );
      final (cx, cy) = _collide(x, y, 1.0);
      final d = (cx - px) * (cx - px) + (cy - py) * (cy - py);
      if (d > bestD) {
        bestD = d;
        best = (cx, cy);
      }
    }
    portal.position = Vec3(best.$1, best.$2, 0);
    portalOpen = true;
    setVisible(portal, true);
    sound.play('portal');
    hud.toast('the way is open');
  }

  void _updatePortal() {
    if (!portalOpen) return;
    final p = portal.position;
    final dx = px - p.x, dy = py - p.y;
    if (dx * dx + dy * dy < 1.0) {
      phase = Phase.fading;
      _roomBuilt = false;
      fade = 0;
      sound.play('portal');
    }
  }

  void _updateShades(double dt) {
    final speed = math.min(4.2, 2.0 + room * 0.3);
    for (final s in shades) {
      if (s.respawn == double.infinity) continue;
      if (s.respawn > 0) {
        s.respawn -= dt;
        if (s.respawn <= 0) _respawnShade(s);
        continue;
      }
      var dx = px - s.x, dy = py - s.y;
      final dist = math.max(1e-3, math.sqrt(dx * dx + dy * dy));
      var tx = dx / dist * speed, ty = dy / dist * speed;
      // Flee any burning brazier's reach.
      for (final b in flames) {
        final fx = s.x - b.x, fy = s.y - b.y;
        final fd = math.sqrt(fx * fx + fy * fy);
        if (fd < _flameRadius + 0.4 && fd > 1e-3) {
          final push = (1 - fd / (_flameRadius + 0.4)) * 3 + 1;
          tx += fx / fd * speed * push;
          ty += fy / fd * speed * push;
        }
      }
      s.vx += (tx - s.vx) * (1 - math.exp(-dt * 3));
      s.vy += (ty - s.vy) * (1 - math.exp(-dt * 3));
      final (nx, ny) = _collide(s.x + s.vx * dt, s.y + s.vy * dt, 0.45);
      s.x = nx;
      s.y = ny;

      if (dist < 0.75 && invulnerable <= 0 && dashTime <= 0) _hurt(s, dx / dist, dy / dist);
    }
  }

  void _hurt(Shade s, double nx, double ny) {
    hearts--;
    invulnerable = 1.4;
    glitch = 1.0;
    vx = nx * 16;
    vy = ny * 16;
    camera.shake(0.55);
    violet.burst(30, position: Vec3(px, py, 0.8));
    sound
      ..play('hit')
      ..play('glitch');
    if (hearts <= 0) {
      phase = Phase.over;
      fire.burst(80, position: Vec3(px, py, 0.8));
      sound.play('die');
      hud.card('THE LIGHT GOES OUT', 'You reached room $room.\n\nPress SPACE to try again');
    }
  }

  // ── Presentation ────────────────────────────────────────────────────────

  void _animate(double dt) {
    final pulse = 1 + math.sin(time * 6) * 0.06;
    final blink = invulnerable > 0 && (invulnerable * 14).floor().isEven;
    // Hide rather than shrink to ~0: the renderer inverts each node's 3×3
    // for normals, and a near-zero scale makes that matrix singular.
    player
      ..position = Vec3(px, py, 0)
      ..scale = pulse * (blink ? 0.6 : 1.0);
    setVisible(player, phase != Phase.over);

    for (final b in flames) {
      b.flame.scale = 0.85 + 0.25 * math.sin(time * 17 + b.id) * math.sin(time * 9.3 + b.id * 2);
    }
    for (final m in motes) {
      if (m.taken) continue;
      // Spinning about Y sweeps the facets through the light: it glints.
      m.node
        ..rotation = Quat.axisAngle(Vec3.unitY, time * 2.2 + m.x) * Quat.axisAngle(Vec3.unitX, 0.5)
        ..position = Vec3(m.x, m.y + math.sin(time * 2 + m.y) * 0.08, 0.5);
    }
    for (final s in shades) {
      if (s.respawn != 0) continue;
      final dx = px - s.x, dy = py - s.y;
      final d = math.max(1e-3, math.sqrt(dx * dx + dy * dy));
      s.node
        ..position = Vec3(s.x, s.y, 0)
        ..scale = 1 + math.sin(time * 4 + s.phase) * 0.07;
      // Eyes track the player.
      s.eyes.position = Vec3(dx / d * 0.12, dy / d * 0.12, 0);
    }
    if (portalOpen) {
      portal
        ..scale = 1 + math.sin(time * 3) * 0.08
        ..rotateZ(dt * 1.5);
    }
  }

  /// Particle streams are spawned as per-frame bursts, so one emitter per
  /// colour can feed any number of sources at different positions.
  void _stream(ParticleEmitter e, double perSecond, double dt, Vec3 at) {
    final debt = (_debt[e] ?? 0) + perSecond * dt;
    final n = debt.floor();
    _debt[e] = debt - n;
    if (n > 0) e.burst(n, position: at);
  }

  void _emit(double dt) {
    for (final b in flames) {
      _stream(fire, 16, dt, Vec3(b.x, b.y + 0.1, 0.8));
    }
    if (phase != Phase.over) {
      final moving = vx * vx + vy * vy > 4;
      _stream(fire, dashTime > 0 ? 160 : (moving ? 14 : 5), dt, Vec3(px, py, 0.8));
    }
    if (portalOpen) {
      final p = portal.position;
      final a = time * 5;
      _stream(gold, 20, dt, Vec3(p.x + math.cos(a) * 0.95, p.y + math.sin(a) * 0.95, 0.8));
    }
  }

  void _lights() {
    final flicker = 0.92 + 0.08 * math.sin(time * 23) * math.sin(time * 7.1);
    final lights = <PointLight>[
      if (phase != Phase.over)
        PointLight(
          id: 0,
          position: Vec3(px, py, _lightZ),
          color: const LinearColor(1.0, 0.78, 0.5),
          intensity: (1.6 + hearts * 0.35) * flicker,
          // Each lost heart shrinks your circle of sight.
          radius: 3.6 + hearts * 1.3,
        ),
      for (final b in flames)
        PointLight(
          id: b.id,
          position: Vec3(b.x, b.y, _lightZ),
          color: const LinearColor(1.0, 0.5, 0.18),
          intensity: 2.6 * (0.88 + 0.12 * math.sin(time * 13 + b.id * 3)),
          radius: 7.5,
        ),
    ];
    app.environment = app.environment.copyWith(pointLights: lights);
  }
}

/// DOM overlay: room / hearts / motes / flames, a toast line, and a card.
final class Hud {
  final web.Element? _room = web.document.querySelector('#room');
  final web.Element? _hearts = web.document.querySelector('#hearts');
  final web.Element? _motes = web.document.querySelector('#motes');
  final web.Element? _flames = web.document.querySelector('#flames');
  final web.HTMLElement? _toast = web.document.querySelector('#toast') as web.HTMLElement?;
  final web.HTMLElement? _card = web.document.querySelector('#card') as web.HTMLElement?;
  final web.Element? _title = web.document.querySelector('#card-title');
  final web.Element? _body = web.document.querySelector('#card-body');
  String _last = '';
  int _toastSerial = 0;

  void card(String title, String body) {
    _title?.textContent = title;
    _body?.textContent = body;
    _card?.classList.remove('hidden');
  }

  void hideCard() => _card?.classList.add('hidden');

  void toast(String text) {
    final el = _toast;
    if (el == null) return;
    el.textContent = text;
    el.classList.add('show');
    final serial = ++_toastSerial;
    web.window.setTimeout(
      (() {
        if (serial == _toastSerial) el.classList.remove('show');
      }).toJS,
      1600.toJS,
    );
  }

  void update(Game g) {
    final key = '${g.room}|${g.hearts}|${g.motesLeft}|${g.flames.length}';
    if (key == _last) return;
    _last = key;
    _room?.textContent = 'ROOM ${g.room}';
    _hearts?.textContent = '♥' * g.hearts.clamp(0, 3) + '♡' * (3 - g.hearts).clamp(0, 3);
    _motes?.textContent = '◆ ${_motesPerRoom - g.motesLeft}/$_motesPerRoom';
    _flames?.textContent = '🔥' * g.flames.length + '·' * (_maxFlames - g.flames.length);
  }
}
