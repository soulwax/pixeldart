import 'dart:js_interop';
import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';
import 'package:web/web.dart' as web;

import 'sound.dart';

// TIDEWATCH — tower defense turned inside out.
//
// You keep a lighthouse on a procedural island. Ships sail spline lanes
// through a reef toward your harbour. By day they navigate on their own; at
// dusk, at night and in storms they drift unless your beam is on them, and a
// drifting ship finds the rocks. Nothing is shot. Everything is guided.
//
// Renderer features used here (and in neither earlier example): terrain
// generator + biome texture, Gerstner water with a deforming surface mesh,
// buoyant hull physics, the solar cycle with sky and clouds, volumetric fog lit
// by point lights, directional shadows, an atmospheric rain field, Catmull-Rom
// splines, keyframe animation clips, raycast picking, material presets and
// depth of field.

const _hoursPerSecond = 1 / 15; // one game hour every 15 s
const _shipScale = 0.42;
const _maxShips = 7;
const _wrecksAllowed = 3;
const _beamRadius = 8.5;
const _beamRange = 85.0;
const _flareRadius = 15.0;

void main() async {
  final canvas = web.document.querySelector('#game');
  if (canvas is! web.HTMLCanvasElement) return;
  final hud = Hud();
  final app = await PixeldartApp.mount(canvas, requestedProfile: QualityProfile.clean, enableOrbitControls: false);
  if (app == null) {
    hud.card('NO WEBGL2', 'This browser cannot run Tidewatch.');
    return;
  }
  hud.card('TIDEWATCH', 'raising the island…');
  final Tidewatch game;
  try {
    game = await Tidewatch.create(app, hud);
  } catch (e, s) {
    print('Tidewatch failed to load: $e\n$s');
    hud.card('FAILED TO LOAD', '$e');
    return;
  }
  if (Uri.base.queryParameters.containsKey('autostart')) game.start();
  // A thrown frame is aborted and reported by the app; the loop goes on.
  app.onFrame = game.frame;
  app.start();
}

double _wrapAngle(double a) {
  while (a > math.pi) {
    a -= 2 * math.pi;
  }
  while (a <= -math.pi) {
    a += 2 * math.pi;
  }
  return a;
}

/// A shipping lane: a spline walked by arc length, so ships move at a
/// steady speed and drift is measured in world units.
final class Lane {
  final CatmullRomSpline3D spline;
  Lane(this.spline);

  double get length => spline.totalLength;

  Vec3 pointAt(double s) => spline.sampleAtDistance(s);

  /// Heading along the sea surface (the lanes lie at y = 0).
  Vec3 tangentAt(double s) {
    final t = spline.tangentAtDistance(s);
    final flat = Vec3(t.x, 0, t.z);
    return flat.lengthSquared > 1e-9 ? flat.normalized : Vec3.unitZ;
  }

  /// Points every two metres, for clearance checks.
  Iterable<Vec3> get samples sync* {
    for (var s = 0.0; s <= length; s += 2) {
      yield pointAt(s);
    }
  }
}

final class Rock {
  final double x, z, radius;
  const Rock(this.x, this.z, this.radius);
}

final class Ship {
  final int id;
  final SceneNode root;
  final SceneNode lamp;
  final BuoyantVesselBody body;
  Lane? lane;
  double s = 0, d = 0, vd = 0, wander = 0, lost = 0;
  bool active = false, sinking = false;
  double sinkTime = 0;
  Ship(this.id, this.root, this.lamp, this.body);
}

final class Flare {
  final SceneNode node;
  Ship? ship;
  Vec3 pos = Vec3.zero;
  double age = 0;
  bool active = false;
  Flare(this.node);
}

final class Tidewatch {
  final PixeldartApp app;
  final Hud hud;
  final Sound sound = Sound();
  final math.Random rng = math.Random();

  late final TerrainGenerator terrain;
  late final WaterSurfaceMesh water;
  late final OrbitCameraController camera;
  late final Vec3 lampPos;
  late final Vec3 harbour;
  final List<Lane> lanes = [];
  final List<Rock> rocks = [];
  final List<(SceneNode, double, double)> buoys = [];
  final List<Ship> ships = [];
  final List<Flare> flares = [];
  final Map<SceneNode, Ship> _shipOf = {};
  late final SceneNode beam;
  late final SceneNode lens;
  late final MaterialHandle lampSafe, lampLost;
  late final ParticleEmitter spray, sparks, gold;
  late final AtmosphericParticleField rain;

  // Base ocean, rescaled every frame by the storm.
  final List<GerstnerWaveComponent> _calm = GerstnerWaveEvaluator.ocean().waves;
  late GerstnerWaveEvaluator waves = GerstnerWaveEvaluator.ocean();

  bool playing = false;
  double hours = 17.0, time = 0, elapsed = 0;
  int nights = 0, home = 0, wrecks = 0, flaresLeft = 3;
  double storm = 0, stormTarget = 0, stormTimer = 30;
  double spawnTimer = 3;
  double visibility = 1;
  double flash = 0, lightningTimer = 6, thunderAt = -1;
  Vec3 lightningPos = Vec3.zero;
  bool raining = false, spyglass = false;
  double mouseX = -1, mouseY = -1;
  Vec3 aim = Vec3.zero;

  Tidewatch._(this.app, this.hud);

  static Future<Tidewatch> create(PixeldartApp app, Hud hud) async {
    final g = Tidewatch._(app, hud);
    await g._build();
    return g;
  }

  // ── World ───────────────────────────────────────────────────────────────

  Future<void> _build() async {

    // Island: fractal terrain with its own biome colouring.
    terrain = TerrainGenerator(
      width: 70,
      depth: 70,
      subdivisionsX: 70,
      subdivisionsZ: 70,
      maxHeight: 7.5,
      baseHeight: -2.2,
      islandRadius: 21,
    );
    final terrainData = terrain.generateMesh();
    final biome = app.createProceduralTexture(
      terrain.generateBiomeTexture(width: 256, height: 256),
      width: 256,
      height: 256,
      wrap: GpuTextureWrap.clampToEdge,
      debugLabel: 'biome',
    );
    app.scene.add(
      mesh: app.createMesh(terrainData, debugLabel: 'island'),
      meshData: terrainData,
      material: app.createMaterial(MaterialDefinition(key: 'island', albedoTexture: biome, roughness: 0.92, metallic: 0)),
      name: 'island',
    );

    // Ocean: a CPU-deformed Gerstner surface, re-evaluated every frame.
    // Wide enough that distance fog closes before the edge does.
    water = WaterSurfaceMesh(width: 520, depth: 520, subdivisionsX: 112, subdivisionsZ: 112, baseHeight: 0);
    app.scene.add(
      mesh: app.createMesh(water.mesh, debugLabel: 'ocean'),
      meshData: water.mesh,
      material: app.createMaterial(
        const MaterialDefinition(
          key: 'ocean',
          tintR: 0.05,
          tintG: 0.22,
          tintB: 0.36,
          roughness: 0.1,
          metallic: 0.35,
          clearcoatStrength: 0.9,
          clearcoatRoughness: 0.06,
        ),
      ),
      name: 'ocean',
      receivesShadow: true,
    );

    _buildLighthouse();
    _layOutSea();

    // The kit shares one external palette image (Textures/colormap.png);
    // loadModel resolves it per model URL and loads it once. Nearest
    // filtering keeps neighbouring swatches from bleeding together.
    Future<ModelAsset> model(String n) => app.loadModel(
      'res/models/$n.glb',
      textureFilter: GpuTextureFilter.nearest,
      // Authored as unlit palette art; a matte dielectric reads right under
      // the sun, the lighthouse beam and the flares.
      materialOverride: (_, m) => m.copyWith(roughness: 0.78, metallic: 0),
    );
    final models = await Future.wait([
      model('ship-small'),
      model('ship-medium'),
      model('rocks-a'),
      model('rocks-b'),
      model('rocks-c'),
      model('structure-platform-dock'),
      model('palm-straight'),
      model('palm-bend'),
    ]);
    _placeProps(models);
    _buildShips(models[0], models[1]);
    _buildEffects();
    _setupSound();
    _setupCamera();
    _installInput();
    _title();
  }

  MaterialHandle _glow(String key, double r, double g, double b, double e) => app.createMaterial(
    MaterialDefinition(key: key, tintR: r, tintG: g, tintB: b, emissiveStrength: e, roughness: 0.4, metallic: 0),
  );

  void _buildLighthouse() {
    // Stand it on the highest ground near the middle.
    var best = Vec3.zero;
    var bestH = -1e9;
    for (var x = -8.0; x <= 8; x += 1) {
      for (var z = -8.0; z <= 8; z += 1) {
        final h = terrain.sampleHeight(x, z);
        if (h > bestH) {
          bestH = h;
          best = Vec3(x, h, z);
        }
      }
    }
    final base = best - const Vec3(0, 0.3, 0);
    final tower = app.scene.add(name: 'lighthouse', transform: Transform.at(base));

    final whitePaint = app.createMaterial(
      MaterialDefinition.ceramic(key: 'lh_white', color: const LinearColor(0.92, 0.9, 0.86), roughness: 0.3, clearcoat: 0.6),
    );
    final redPaint = app.createMaterial(
      MaterialDefinition.ceramic(key: 'lh_red', color: const LinearColor(0.75, 0.08, 0.06), roughness: 0.3, clearcoat: 0.6),
    );
    final chrome = app.createMaterial(MaterialDefinition.chrome(key: 'lh_chrome', roughness: 0.15));
    final copper = app.createMaterial(MaterialDefinition.copper(key: 'lh_copper', roughness: 0.35));

    var y = 0.0;
    for (var i = 0; i < 6; i++) {
      final r = 1.45 - i * 0.1;
      final data = Primitives.cylinder(radius: r, height: 1.4, radialSegments: 28);
      tower.add(
        mesh: app.createMesh(data, debugLabel: 'lh_band$i'),
        meshData: data,
        material: i.isEven ? whitePaint : redPaint,
        transform: Transform.at(Vec3(0, y + 0.7, 0)),
      );
      y += 1.4;
    }
    final galleryData = Primitives.torus(radius: 1.1, tubeRadius: 0.07, radialSegments: 8, tubularSegments: 36);
    tower.add(
      mesh: app.createMesh(galleryData, debugLabel: 'lh_gallery'),
      meshData: galleryData,
      material: chrome,
      transform: Transform.at(Vec3(0, y + 0.05, 0)),
    );
    final lampData = Primitives.sphere(radius: 0.5, rings: 14, sectors: 20);
    tower.add(
      mesh: app.createMesh(lampData, debugLabel: 'lh_lamp'),
      meshData: lampData,
      material: _glow('lh_lamp', 1.0, 0.9, 0.65, 6),
      transform: Transform.at(Vec3(0, y + 0.55, 0)),
      castsShadow: false,
    );
    // A rotating chrome shutter around the lamp.
    lens = tower.add(name: 'lens', transform: Transform.at(Vec3(0, y + 0.55, 0)));
    final shutter = Primitives.roundedBox(width: 0.18, height: 0.9, depth: 1.25, bevelRadius: 0.04, bevelSegments: 1);
    final shutterMesh = app.createMesh(shutter, debugLabel: 'lh_shutter');
    for (final side in [-0.62, 0.62]) {
      lens.add(mesh: shutterMesh, meshData: shutter, material: chrome, transform: Transform.at(Vec3(side, 0, 0)));
    }
    final roofData = Primitives.cone(radius: 1.0, height: 1.1, radialSegments: 24);
    tower.add(
      mesh: app.createMesh(roofData, debugLabel: 'lh_roof'),
      meshData: roofData,
      material: copper,
      transform: Transform.at(Vec3(0, y + 1.6, 0)),
    );
    lampPos = base + Vec3(0, y + 0.55, 0);

    // The beam: an additive cone from the lamp, rescaled to reach the aim.
    final coneData = Primitives.cone(radius: 0.075, height: 1, radialSegments: 24, capped: false);
    beam = app.scene.add(name: 'beam', transform: Transform.at(lampPos));
    beam.add(
      mesh: app.createMesh(coneData, debugLabel: 'beam'),
      meshData: coneData,
      material: app.createMaterial(
        MaterialDefinition(
          key: 'beam',
          tintR: 0.09,
          tintG: 0.08,
          tintB: 0.06,
          emissiveStrength: 0.25,
          roughness: 1,
          metallic: 0,
          alphaMode: AlphaMode.blended,
          doubleSided: true,
        ),
      ),
      // Apex at the lamp, opening along -Y (the group turns -Y toward aim).
      transform: Transform.at(const Vec3(0, -0.5, 0)),
    )
      ..drawMode = DrawMode.blended
      ..blendMode = BlendMode.additive
      ..castsShadow = false
      ..receivesShadow = false;
  }

  void _layOutSea() {
    // Harbour: the first water south of the lighthouse.
    var shore = 6.0;
    while (shore < 34 && terrain.sampleHeight(0, shore) > -0.6) {
      shore += 0.5;
    }
    harbour = Vec3(0, 0, shore + 3);

    // Four lanes from the open sea, curving around the island to the harbour.
    const harbourAngle = math.pi / 2; // +Z
    final approach = Vec3(0, 0, shore + 18);
    for (final start in [-2.5, -0.65, 0.35, 2.75]) {
      final diff = _wrapAngle(harbourAngle - start);
      final pts = <Vec3>[];
      const radii = [96.0, 76.0, 57.0, 42.0];
      const along = [0.0, 0.3, 0.6, 0.86];
      for (var i = 0; i < radii.length; i++) {
        final a = start + diff * along[i];
        pts.add(Vec3(math.cos(a) * radii[i], 0, math.sin(a) * radii[i]));
      }
      pts
        ..add(approach)
        ..add(harbour);
      lanes.add(Lane(CatmullRomSpline3D(points: pts)));
    }

    // Reefs crowd the lanes without blocking them: a guided ship is safe, a
    // drifting one is not.
    bool clearOfLanes(double x, double z, double clearance) {
      for (final lane in lanes) {
        for (final p in lane.samples) {
          final dx = p.x - x, dz = p.z - z;
          if (dx * dx + dz * dz < clearance * clearance) return false;
        }
      }
      return true;
    }

    var attempts = 0;
    while (rocks.length < 34 && attempts++ < 4000) {
      final lane = lanes[rng.nextInt(lanes.length)];
      final s = lane.length * (0.22 + rng.nextDouble() * 0.6);
      final p = lane.pointAt(s), t = lane.tangentAt(s);
      final side = rng.nextBool() ? 1.0 : -1.0;
      final off = 5.5 + rng.nextDouble() * 8;
      final x = p.x - t.z * off * side, z = p.z + t.x * off * side;
      final r = 1.6 + rng.nextDouble() * 1.6;
      if (math.sqrt(x * x + z * z) < 28) continue;
      if (!clearOfLanes(x, z, r + 3.2)) continue;
      if (rocks.any((o) => (o.x - x) * (o.x - x) + (o.z - z) * (o.z - z) < (o.radius + r + 2) * (o.radius + r + 2))) continue;
      rocks.add(Rock(x, z, r));
    }
  }

  void _placeProps(List<ModelAsset> models) {
    final rockModels = models.sublist(2, 5);
    for (final r in rocks) {
      final m = rockModels[rng.nextInt(rockModels.length)];
      final span = math.max(m.bounds.max.x - m.bounds.min.x, m.bounds.max.z - m.bounds.min.z);
      final node = m.instantiate()
        ..scale = r.radius * 2 / span
        ..position = Vec3(r.x, -0.7, r.z)
        ..rotation = Quat.axisAngle(Vec3.unitY, rng.nextDouble() * math.pi * 2);
      app.scene.addChild(node);
    }

    // Channel buoys along each lane, red to port and green to starboard.
    final buoyData = Primitives.cylinder(radius: 0.24, height: 0.9, radialSegments: 12);
    final buoyMesh = app.createMesh(buoyData, debugLabel: 'buoy');
    final red = app.createMaterial(MaterialDefinition.plastic(key: 'buoy_red', color: const LinearColor(0.8, 0.08, 0.05)));
    final green = app.createMaterial(MaterialDefinition.plastic(key: 'buoy_green', color: const LinearColor(0.05, 0.55, 0.15)));
    for (final lane in lanes) {
      for (var s = 18.0; s < lane.length - 14; s += 26) {
        final p = lane.pointAt(s), t = lane.tangentAt(s);
        for (final side in [-1.0, 1.0]) {
          final x = p.x - t.z * 3.4 * side, z = p.z + t.x * 3.4 * side;
          final node = app.scene.add(mesh: buoyMesh, meshData: buoyData, material: side < 0 ? red : green);
          buoys.add((node, x, z));
        }
      }
    }

    // A dock at the harbour mouth.
    final dock = models[5];
    for (final dx in [-1.4, 1.4]) {
      app.scene.addChild(
        dock.instantiate()
          ..scale = 1.1
          ..position = Vec3(dx, -0.35, harbour.z - 2.2),
      );
    }

    // Palms where the island is low and not too steep.
    var placed = 0;
    for (var i = 0; i < 400 && placed < 14; i++) {
      final x = (rng.nextDouble() * 2 - 1) * 18, z = (rng.nextDouble() * 2 - 1) * 18;
      final h = terrain.sampleHeight(x, z);
      if (h < 0.4 || h > 3.8 || terrain.sampleSlope(x, z) > 0.5) continue;
      if ((Vec3(x, h, z) - lampPos).length < 5 || (x.abs() < 4 && z > harbour.z - 9)) continue;
      final palm = models[6 + rng.nextInt(2)];
      app.scene.addChild(
        palm.instantiate()
          ..scale = 0.6 + rng.nextDouble() * 0.4
          ..position = Vec3(x, h - 0.1, z)
          ..rotation = Quat.axisAngle(Vec3.unitY, rng.nextDouble() * math.pi * 2),
      );
      placed++;
    }
  }

  void _buildShips(ModelAsset small, ModelAsset medium) {
    lampSafe = _glow('ship_lamp_safe', 1.0, 0.85, 0.5, 4);
    lampLost = _glow('ship_lamp_lost', 1.0, 0.1, 0.05, 6);
    final lampData = Primitives.sphere(radius: 0.22, rings: 8, sectors: 12);
    final lampMesh = app.createMesh(lampData, debugLabel: 'ship_lamp');
    for (var i = 0; i < _maxShips; i++) {
      final m = i.isEven ? small : medium;
      final root = app.scene.add(name: 'ship$i');
      root.addChild(m.instantiate()..scale = _shipScale);
      final lamp = root.add(
        mesh: lampMesh,
        meshData: lampData,
        material: lampSafe,
        transform: Transform.at(Vec3(0, m.bounds.max.y * _shipScale + 0.15, 0)),
      )..castsShadow = false;
      final width = (m.bounds.max.x - m.bounds.min.x) * _shipScale;
      final length = (m.bounds.max.z - m.bounds.min.z) * _shipScale;
      final ship = Ship(i, root, lamp, BuoyantVesselBody(position: Vec3.zero, width: width, length: length));
      ships.add(ship);
      _shipOf[root] = ship;
      root.visible = false;
    }

    final flareData = Primitives.sphere(radius: 0.35, rings: 8, sectors: 12);
    final flareMesh = app.createMesh(flareData, debugLabel: 'flare');
    final flareMat = _glow('flare', 1.0, 0.3, 0.15, 9);
    for (var i = 0; i < 2; i++) {
      final node = app.scene.add(mesh: flareMesh, meshData: flareData, material: flareMat)..castsShadow = false;
      node.visible = false;
      flares.add(Flare(node));
    }
  }

  void _buildEffects() {
    final quad = app.createMesh(Primitives.quad(width: 1, height: 1), debugLabel: 'pquad');
    MaterialHandle mat(String key, double r, double g, double b, double e) =>
        app.createParticleMaterial(key: key, color: LinearColor(r, g, b), glow: e);
    ParticleEmitter emitter(MaterialHandle m, {double speed = 4, double size = 0.6, double life = 1.0, Vec3 gravity = Vec3.zero}) {
      final e = ParticleEmitter(
        mesh: quad,
        material: m,
        shape: const SphereShape(radius: 0.4, directionMode: SphereDirectionMode.outward),
        minLifetime: life * 0.6,
        maxLifetime: life,
        minSpeed: speed * 0.4,
        maxSpeed: speed,
        minStartSize: size * 0.6,
        maxStartSize: size,
        minEndSize: 0.05,
        maxEndSize: 0.15,
        gravity: gravity,
        dragCoefficient: 1.2,
        blendMode: BlendMode.additive,
        maxParticles: 600,
      );
      app.addEmitter(e);
      return e;
    }

    spray = emitter(mat('fx_spray', 0.75, 0.85, 0.95, 1.2), speed: 7, size: 1.1, life: 1.4, gravity: const Vec3(0, -9, 0));
    sparks = emitter(mat('fx_sparks', 1, 0.35, 0.15, 6), speed: 2.5, size: 0.35, life: 0.9, gravity: const Vec3(0, -3, 0));
    gold = emitter(mat('fx_gold', 1, 0.8, 0.35, 5), speed: 5, size: 0.5, life: 1.2, gravity: const Vec3(0, 1.5, 0));

    rain = AtmosphericPresets.rain(
      mesh: quad,
      material: app.createMaterial(
        MaterialDefinition(
          key: 'rain',
          albedoTexture: ParticleMaterials.softTexture(app.resources),
          tintR: 0.6,
          tintG: 0.68,
          tintB: 0.8,
          roughness: 0.4,
          metallic: 0,
          alphaMode: AlphaMode.blended,
          doubleSided: true,
        ),
      ),
      particleCount: 128,
      particleScale: 0.12,
    );
  }

  void _setupSound() {
    sound
      ..register('thunder', 'res/audio/lowFrequency_explosion_000.ogg', volume: 0.75, voices: 2)
      ..register('wreck', 'res/audio/explosionCrunch_002.ogg', volume: 0.6)
      ..register('creak', 'res/audio/impactMetal_003.ogg', volume: 0.5)
      ..register('home', 'res/audio/forceField_002.ogg', volume: 0.45)
      ..register('flare', 'res/audio/laserLarge_000.ogg', volume: 0.4)
      ..register('start', 'res/audio/doorOpen_000.ogg', volume: 0.5, voices: 1)
      ..registerEngine('res/audio/spaceEngineLow_001.ogg', volume: 0.18);
  }

  void _setupCamera() {
    camera = app.useOrbitCamera(target: const Vec3(0, 1, 10), distance: 78)
      ..elevationRadians = 0.62
      ..azimuthRadians = math.pi / 2
      ..minDistance = 30
      ..maxDistance = 160
      ..minElevation = 0.12
      ..maxElevation = 1.35
      ..fovYRadians = 0.9
      ..far = 600;
    app.skybox = _sky();
  }

  SkyboxDeclaration _sky() => SkyboxDeclaration(
    assetId: 'tidewatch_sky',
    horizon: const LinearColor(0.5, 0.45, 0.4),
    zenith: const LinearColor(0.2, 0.3, 0.5),
    ground: const LinearColor(0.05, 0.05, 0.06),
    cloudCoverage: (0.22 + storm * 0.72).clamp(0.0, 1.0),
    cloudDensity: (0.3 + storm * 0.6).clamp(0.0, 1.0),
    cloudWindX: 18 + storm * 60,
    cloudWindZ: 6,
    cloudPhase: time * 0.02,
    cloudSampleCount: 12,
  );

  // ── Input ───────────────────────────────────────────────────────────────

  void _installInput() {
    final canvas = app.canvas;
    canvas.addEventListener(
      'mousemove',
      ((web.MouseEvent e) {
        mouseX = e.clientX.toDouble();
        mouseY = e.clientY.toDouble();
      }).toJS,
    );
    // A click that did not drag fires a flare at a ship; drags still orbit.
    app.onTap = (x, y) {
      if (playing) _clickAt(x, y);
    };
    web.window.addEventListener(
      'keydown',
      ((web.KeyboardEvent e) {
        if (e.code == 'Space') e.preventDefault();
        if (e.repeat) return;
        switch (e.code) {
          case 'Space' || 'Enter' when !playing:
            start();
          case 'Space':
            spyglass = true;
          case 'KeyM':
            sound.muted = !sound.muted;
            if (sound.muted) sound.engine(running: false);
        }
      }).toJS,
    );
    web.window.addEventListener(
      'keyup',
      ((web.KeyboardEvent e) {
        if (e.code == 'Space') spyglass = false;
      }).toJS,
    );
  }

  Ship? _shipFromNode(SceneNode? node) {
    while (node != null) {
      final ship = _shipOf[node];
      if (ship != null) return ship;
      node = node.parent;
    }
    return null;
  }

  void _clickAt(double clientX, double clientY) {
    // Pick only ships, against their triangles; fall back to the ship nearest
    // the beam's aim, since a thin mast is hard to click on a dark sea.
    var ship = _shipFromNode(
      app.pick(clientX, clientY, where: (n) => _shipFromNode(n) != null, precise: true)?.node,
    );
    if (ship == null || !ship.active || ship.sinking) {
      var best = 64.0;
      for (final s in ships) {
        if (!s.active || s.sinking) continue;
        final p = s.body.position;
        final d2 = (p.x - aim.x) * (p.x - aim.x) + (p.z - aim.z) * (p.z - aim.z);
        if (d2 < best) {
          best = d2;
          ship = s;
        }
      }
    }
    if (ship == null || !ship.active || ship.sinking) return;
    _launchFlare(ship);
  }

  void _launchFlare(Ship ship) {
    if (flaresLeft <= 0) {
      hud.toast('no flares left — bring a ship home');
      return;
    }
    final flare = flares.where((f) => !f.active).firstOrNull;
    if (flare == null) return;
    flaresLeft--;
    flare
      ..active = true
      ..ship = ship
      ..age = 0
      ..pos = ship.body.position + const Vec3(0, 2, 0);
    flare.node.visible = true;
    sound.play('flare');
  }

  // ── Lifecycle ───────────────────────────────────────────────────────────

  void _title() {
    playing = false;
    hud.card(
      'TIDEWATCH',
      'Ships sail the channels to your harbour. By day they find their way.\n'
          'At dusk, at night and in storms they drift — onto the reef.\n\n'
          'Keep your beam on them. Their lamps burn red when they are lost.\n'
          'Lose three ships and the harbour closes.\n\n'
          'MOUSE — aim the beam     CLICK a ship — flare (3, +1 per ship home)\n'
          'DRAG — orbit     WHEEL — zoom     hold SPACE — spyglass     M — mute\n\n'
          'Press SPACE to light the lamp',
    );
  }

  void start() {
    for (final s in ships) {
      if (s.sinking) app.animations.stop('sink${s.id}');
      s
        ..active = false
        ..sinking = false;
      s.root.visible = false;
    }
    for (final f in flares) {
      f.active = false;
      f.node.visible = false;
    }
    // ?hour=22 and ?storm=1 jump straight to night or bad weather.
    final q = Uri.base.queryParameters;
    hours = (double.tryParse(q['hour'] ?? '') ?? 16.5) % 24;
    elapsed = 0;
    nights = home = wrecks = 0;
    flaresLeft = 3;
    storm = stormTarget = (double.tryParse(q['storm'] ?? '') ?? 0).clamp(0.0, 1.0);
    stormTimer = 100; // a first night of fair weather
    spawnTimer = 1;
    playing = true;
    hud.hideCard();
    hud.toast('the lamp is lit');
    sound.play('start');
  }

  void _gameOver() {
    playing = false;
    hud.card(
      'THE HARBOUR CLOSES',
      'The reef took $_wrecksAllowed ships.\n\n'
          'You brought $home home through $nights night${nights == 1 ? '' : 's'}.\n\n'
          'Press SPACE to keep the light again',
    );
  }

  // ── Frame ───────────────────────────────────────────────────────────────

  void frame(FrameContext ctx) {
    final dt = ctx.deltaTime.clamp(0.0, 0.05);
    time += dt;

    _weather(dt);
    _sun(dt);
    _aimBeam();
    if (playing) {
      elapsed += dt;
      _spawn(dt);
    }
    _ships(dt);
    _flares(dt);
    _lightning(dt);
    _animateProps();
    _lights();
    _post();

    sound.engine(running: playing, rate: 0.55 + storm * 0.5);
    hud.update(this);
  }

  void _weather(double dt) {
    stormTimer -= dt;
    if (stormTimer <= 0) {
      stormTimer = 35 + rng.nextDouble() * 40;
      stormTarget = rng.nextDouble() < 0.45 ? 0.55 + rng.nextDouble() * 0.45 : 0.0;
      if (stormTarget > 0 && playing) hud.toast('a squall is coming');
    }
    storm += (stormTarget - storm).clamp(-dt * 0.05, dt * 0.05);

    // Rougher water: taller, longer-period waves with steepness held so the
    // Gerstner crests never fold over themselves.
    final grow = 1 + storm * 1.1;
    waves = GerstnerWaveEvaluator(
      baseHeight: 0,
      waves: [
        for (final w in _calm)
          GerstnerWaveComponent(
            direction: w.direction,
            amplitude: w.amplitude * grow,
            wavelength: w.wavelength * (1 + storm * 0.3),
            steepness: w.steepness / grow,
            speed: w.speed * (1 + storm * 0.25),
          ),
      ],
    );
    water.updateWaves(time, waves);

    if (storm > 0.4 && !raining) {
      app.addParticleField(rain);
      raining = true;
    } else if (storm < 0.3 && raining) {
      app.removeParticleField(rain);
      raining = false;
    }
  }

  void _sun(double dt) {
    if (playing) {
      final before = hours;
      hours = (hours + dt * _hoursPerSecond) % 24;
      if (before < 6 && hours >= 6) {
        nights++;
        hud.toast('dawn — night $nights survived');
      }
      if (before < 19 && hours >= 19) hud.toast('dusk falls');
    }
    app.skybox = _sky();
    app.setSolarTime(hours, cloudCover01: (0.1 + storm * 0.85).clamp(0.0, 1.0), solarIntensity: 2.6);
    final solar = app.currentSolarState!;

    // How well a ship's crew can see on its own: daylight, eaten by weather.
    final day = ((solar.sunElevationRadians + 0.04) / 0.2).clamp(0.0, 1.0);
    visibility = day * (1 - storm * 0.85);

    final f = solar.fogColor;
    final dim = 1 - storm * 0.55;
    final fog = LinearColor(f.r * dim, f.g * dim, f.b * dim);
    app.enableFog(color: fog, start: 80 - storm * 50, end: 245 - storm * 120);
    // Storms dim the zenith and hide the stars; then the sea's fogged far
    // edge and the sky's horizon get the same colour, so no seam shows.
    final sky = app.skybox!;
    final z = sky.zenith;
    app.skybox = sky.copyWith(
      zenith: LinearColor(z.r * dim, z.g * dim, z.b * dim),
      starDensity: sky.starDensity * (1 - storm),
    );
    app.matchHorizonToFog();
    // Participating media: barely there in fair weather, thick in a storm.
    // Point lights scatter in it, so the beam and lightning become shafts.
    app.enableVolumetricFog(
      intensity: 1.3,
      dustDensity: 0.004 + storm * 0.016 + (1 - day) * 0.004,
      heightFalloff: 0.06,
    );
  }

  void _aimBeam() {
    // Where the pointer's ray meets the sea, clamped to the beam's reach.
    var p = mouseX >= 0 ? app.screenRay(mouseX, mouseY)?.intersectGround() : null;
    if (p != null) {
      final flat = Vec3(p.x - lampPos.x, 0, p.z - lampPos.z);
      if (flat.length > _beamRange) p = lampPos + flat.normalized * _beamRange;
      aim = Vec3(p.x, waves.sampleHeight(p.x, p.z, time), p.z);
    }
    final toAim = aim - lampPos;
    final len = toAim.length;
    if (len > 1) {
      beam
        ..rotation = Quat.fromTo(const Vec3(0, -1, 0), toAim * (1 / len))
        ..scale = len;
    }
    lens.rotateY(0.016 * 2.2);
    // The visible shaft only matters once the light is needed.
    beam.visible = visibility < 0.85;
  }

  void _spawn(double dt) {
    spawnTimer -= dt;
    if (spawnTimer > 0) return;
    spawnTimer = math.max(9, 18 - elapsed / 45) * (0.8 + rng.nextDouble() * 0.4);
    // More ships at sea each night you survive; one beam can only do so much.
    final cap = math.min(_maxShips, 3 + nights);
    if (ships.where((s) => s.active && !s.sinking).length >= cap) return;
    final ship = ships.where((s) => !s.active).firstOrNull;
    if (ship == null) return;
    final lane = lanes[rng.nextInt(lanes.length)];
    final p = lane.pointAt(0);
    ship
      ..lane = lane
      ..s = 0
      ..d = 0
      ..vd = 0
      ..wander = 0
      ..lost = 0
      ..active = true
      ..sinking = false;
    ship.body
      ..position = Vec3(p.x, 0, p.z)
      ..velocityY = 0
      ..roll = 0
      ..pitch = 0;
    ship.root.visible = true;
  }

  bool _guided(Vec3 p) {
    final dx = p.x - aim.x, dz = p.z - aim.z;
    if (dx * dx + dz * dz < _beamRadius * _beamRadius) return true;
    for (final f in flares) {
      if (!f.active) continue;
      final fx = p.x - f.pos.x, fz = p.z - f.pos.z;
      if (fx * fx + fz * fz < _flareRadius * _flareRadius) return true;
    }
    // Lightning shows everyone the way, for an instant.
    return flash > 0;
  }

  double _gauss() {
    final u = math.max(1e-9, rng.nextDouble());
    return math.sqrt(-2 * math.log(u)) * math.cos(2 * math.pi * rng.nextDouble());
  }

  void _ships(double dt) {
    for (final ship in ships) {
      if (!ship.active) continue;
      if (ship.sinking) {
        ship.sinkTime += dt;
        if (ship.sinkTime > 7.2) {
          ship.active = false;
          ship.root.visible = false;
        }
        continue;
      }
      final lane = ship.lane!;
      final here = ship.body.position;
      final guided = _guided(here);
      final lost = (1 - math.max(visibility, guided ? 1.0 : 0.0)).clamp(0.0, 1.0);
      ship.lost += (lost - ship.lost) * (1 - math.exp(-dt * 2));

      // Drift: an Ornstein-Uhlenbeck wander takes over as sight fails; with
      // sight, the helm steers back onto the lane.
      ship.wander += -ship.wander * 0.5 * dt + _gauss() * math.sqrt(dt) * 1.1;
      final target = -ship.d * 0.9 * (1 - ship.lost) + ship.wander * 0.65 * ship.lost;
      ship.vd += (target - ship.vd) * (1 - math.exp(-dt * 1.5));
      ship.d = (ship.d + ship.vd * dt).clamp(-18.0, 18.0);
      // Lost crews slow down, which buys the keeper time.
      final speed = 3.4 * (1 - 0.45 * ship.lost);
      ship.s += speed * dt;

      if (ship.s >= lane.length) {
        _arrive(ship);
        continue;
      }

      final p = lane.pointAt(ship.s), t = lane.tangentAt(ship.s);
      final x = p.x - t.z * ship.d, z = p.z + t.x * ship.d;
      final hx = t.x * speed - t.z * ship.vd, hz = t.z * speed + t.x * ship.vd;
      ship.body
        ..position = Vec3(x, ship.body.position.y, z)
        ..yaw = math.atan2(hx, hz);
      ship.root.transform = ship.body.update(dt, time, waves);

      // Running light: warm when guided, flashing red when lost.
      final showLost = ship.lost > 0.5 && (time * 3).floor().isEven;
      final mat = showLost ? lampLost : lampSafe;
      if (ship.lamp.material != mat) {
        ship.lamp
          ..material = mat
          ..markDirty();
      }

      for (final r in rocks) {
        final dx = x - r.x, dz = z - r.z;
        if (dx * dx + dz * dz < (r.radius + 0.9) * (r.radius + 0.9)) {
          _wreck(ship);
          break;
        }
      }
      if (!ship.sinking && terrain.sampleHeight(x, z) > -0.5) _wreck(ship);
    }
  }

  void _arrive(Ship ship) {
    ship.active = false;
    ship.root.visible = false;
    gold.burst(60, position: ship.body.position + const Vec3(0, 1.5, 0));
    sound.play('home');
    if (!playing) return;
    home++;
    flaresLeft = math.min(3, flaresLeft + 1);
    hud.toast('ship home · $home');
  }

  void _wreck(Ship ship) {
    ship
      ..sinking = true
      ..sinkTime = 0;
    final from = ship.root.position;
    final rot = ship.root.rotation;
    // Keyframed sinking: lurch onto the reef, list, then go down by the bow.
    final list = Quat.axisAngle(Vec3.unitZ, (rng.nextBool() ? 1 : -1) * 0.5);
    final dive = Quat.axisAngle(Vec3.unitX, 0.9);
    app.playAnimation(
      AnimationClip(
        name: 'sink${ship.id}',
        duration: 7,
        loopMode: LoopMode.once,
        tracks: [
          Vector3Track(
            target: ship.root,
            keyframes: [
              Keyframe(0, from),
              Keyframe(1.2, from - const Vec3(0, 0.6, 0), Curves.easeOutCubic),
              Keyframe(7, from - const Vec3(0, 6.5, 0), Curves.easeInCubic),
            ],
          ),
          RotationTrack(
            target: ship.root,
            keyframes: [
              Keyframe(0, rot),
              Keyframe(1.5, rot * list, Curves.easeOutCubic),
              Keyframe(7, rot * list * dive, Curves.easeInCubic),
            ],
          ),
        ],
      ),
    );
    spray.burst(90, position: from + const Vec3(0, 0.5, 0));
    app.shakeCamera(trauma: 0.35);
    sound
      ..play('wreck')
      ..play('creak');
    if (!playing) return;
    wrecks++;
    hud.toast('a ship is lost on the reef');
    if (wrecks >= _wrecksAllowed) _gameOver();
  }

  void _flares(double dt) {
    for (final f in flares) {
      if (!f.active) continue;
      f.age += dt;
      final ship = f.ship;
      // Shoot up for 1.4 s, then hang and drift down while trailing the ship.
      final rise = (f.age / 1.4).clamp(0.0, 1.0);
      final height = 2 + 11 * (1 - math.pow(1 - rise, 3)) - math.max(0, f.age - 1.4) * 0.6;
      final follow = ship != null && ship.active && !ship.sinking ? ship.body.position : f.pos;
      f.pos = Vec3(f.pos.x + (follow.x - f.pos.x) * dt, height, f.pos.z + (follow.z - f.pos.z) * dt);
      f.node.position = f.pos;
      sparks.emitAt(f.pos, 40, dt, source: f);
      if (f.age > 10) {
        f.active = false;
        f.node.visible = false;
      }
    }
  }

  void _lightning(double dt) {
    flash = math.max(0, flash - dt);
    if (thunderAt > 0 && time >= thunderAt) {
      thunderAt = -1;
      sound.play('thunder');
    }
    if (storm < 0.55) return;
    lightningTimer -= dt;
    if (lightningTimer > 0) return;
    lightningTimer = 3 + rng.nextDouble() * 7 * (1.6 - storm);
    flash = 0.4;
    final a = rng.nextDouble() * math.pi * 2;
    lightningPos = Vec3(math.cos(a) * 70, 45, math.sin(a) * 70);
    thunderAt = time + 0.5 + rng.nextDouble() * 1.4;
  }

  bool get _flashOn => flash > 0.32 || (flash > 0.12 && flash < 0.22);

  void _animateProps() {
    for (final (node, x, z) in buoys) {
      final y = waves.sampleHeight(x, z, time);
      node
        ..position = Vec3(x, y + 0.2, z)
        ..rotation = Quat.axisAngle(Vec3.unitX, math.sin(time * 1.3 + x) * 0.15);
    }
  }

  void _lights() {
    final night = 1 - visibility.clamp(0.0, 1.0);
    app.environment = app.environment.copyWith(
      pointLights: [
        PointLight(
          id: 1,
          position: aim + const Vec3(0, 3.5, 0),
          color: const LinearColor(1.0, 0.92, 0.72),
          intensity: 1.5 + night * 6,
          radius: 18,
        ),
        for (final (i, f) in flares.indexed)
          if (f.active)
            PointLight(
              id: 10 + i,
              position: f.pos,
              color: const LinearColor(1.0, 0.32, 0.18),
              intensity: 7 * (1 - ((f.age - 8) / 2).clamp(0.0, 1.0)),
              radius: 28,
            ),
        if (_flashOn)
          PointLight(
            id: 20,
            position: lightningPos,
            color: const LinearColor(0.75, 0.82, 1.0),
            intensity: 60,
            radius: 220,
          ),
      ],
    );
  }

  void _post() {
    var post = PostProcessState.cinematic(bloomStrength: 0.4, ssaoStrength: 0.45, vignette: 0.32, grain: 0.05);
    if (_flashOn) post = post.copyWith(exposure: post.exposure * 1.8);
    // The spyglass narrows focus: depth of field plus a dolly in.
    if (spyglass) post = post.copyWith(depthOfFieldStrength: 0.75);
    app.post = post;
    final want = spyglass ? 0.55 : 0.9;
    camera.fovYRadians += (want - camera.fovYRadians) * 0.12;
  }
}

/// DOM overlay: clock, weather, tallies, toast line and card.
final class Hud {
  final web.Element? _clock = web.document.querySelector('#clock');
  final web.Element? _weather = web.document.querySelector('#weather');
  final web.Element? _home = web.document.querySelector('#home');
  final web.Element? _wrecks = web.document.querySelector('#wrecks');
  final web.Element? _flares = web.document.querySelector('#flares');
  final web.HTMLElement? _toast = web.document.querySelector('#toast') as web.HTMLElement?;
  final web.HTMLElement? _card = web.document.querySelector('#card') as web.HTMLElement?;
  final web.Element? _title = web.document.querySelector('#card-title');
  final web.Element? _body = web.document.querySelector('#card-body');
  String _last = '';
  int _serial = 0;

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
    final serial = ++_serial;
    web.window.setTimeout(
      (() {
        if (serial == _serial) el.classList.remove('show');
      }).toJS,
      2200.toJS,
    );
  }

  void update(Tidewatch g) {
    final h = g.hours.floor(), m = ((g.hours - h) * 60).floor();
    final phase = switch (g.hours) {
      >= 5 && < 7.5 => 'dawn',
      >= 7.5 && < 17.5 => 'day',
      >= 17.5 && < 20 => 'dusk',
      _ => 'night',
    };
    final weather = g.storm > 0.7 ? 'storm' : (g.storm > 0.35 ? 'squall' : (g.storm > 0.1 ? 'clouding' : 'fair'));
    final key = '$h:$m|$weather|${g.home}|${g.wrecks}|${g.flaresLeft}';
    if (key == _last) return;
    _last = key;
    _clock?.textContent = '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')} $phase';
    _weather?.textContent = weather;
    _home?.textContent = '⚓ ${g.home} home';
    _wrecks?.textContent = '✕' * g.wrecks + '·' * (_wrecksAllowed - g.wrecks).clamp(0, _wrecksAllowed);
    _flares?.textContent = 'flares ${'✹' * g.flaresLeft}${'·' * (3 - g.flaresLeft)}';
  }
}
