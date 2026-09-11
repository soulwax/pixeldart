import 'dart:js_interop';
import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';
import 'package:web/web.dart' as web;

void main() async {
  final canvas = web.document.querySelector('#showcase-canvas');
  if (canvas is! web.HTMLCanvasElement) return;

  final app = await PixeldartApp.mount(
    canvas,
    requestedProfile: QualityProfile.clean,
    showStats: true,
    enableOrbitControls: true,
  );
  if (app == null) return;

  // Initial camera view with turntable auto-rotation
  app.cameraController?.distance = 8.5;
  app.cameraController?.elevationRadians = 0.45;
  app.cameraController?.target = const Vec3(0, 0.5, 0);
  app.cameraController?.autoRotate = true;
  app.cameraController?.autoRotateSpeed = 0.18;

  // Atmospheric Skybox declaration
  app.skybox = const SkyboxDeclaration(
    assetId: 'showcase_sky',
    horizon: LinearColor(0.12, 0.16, 0.24),
    zenith: LinearColor(0.03, 0.06, 0.14),
    ground: LinearColor(0.015, 0.02, 0.03),
    horizonGlow: 0.12,
    starDensity: 0.005,
    cloudCoverage: 0.32,
    cloudDensity: 0.40,
    cloudSampleCount: 12,
  );

  // Environment with Split-Sum IBL and AgX tone mapping
  app.environment = app.environment.copyWith(
    clearColor: const LinearColor(0.015, 0.02, 0.03),
    ambientColor: const LinearColor(0.04, 0.05, 0.07),
    ambientIntensity: 1.0,
    reflectionColor: const LinearColor(0.7, 0.8, 1.0),
    reflectionIntensity: 1.2,
    reflectionConfidence: 0.85,
    directionalLight: const DirectionalLight(
      direction: Vec3(0.6, -1.0, 0.4),
      color: LinearColor(1.0, 0.95, 0.88),
      intensity: 2.4,
    ),
  );

  app.post = const PostProcessState(
    exposure: 1.15,
    toneMapping: ToneMappingMode.agx,
    vignette: 0.22,
    grain: 0.12,
  );

  // Wire tone mapping selector
  final toneSelect = web.document.querySelector('#tone-map-select');
  if (toneSelect is web.HTMLSelectElement) {
    toneSelect.addEventListener(
      'change',
      ((web.Event _) {
        final mode = switch (toneSelect.value) {
          'aces' => ToneMappingMode.aces,
          'reinhard' => ToneMappingMode.reinhard,
          'off' => ToneMappingMode.off,
          _ => ToneMappingMode.agx,
        };
        app.post = PostProcessState(
          exposure: app.post.exposure,
          toneMapping: mode,
          vignette: app.post.vignette,
          grain: app.post.grain,
        );
      }).toJS,
    );
  }

  // Wire turntable auto-rotate toggle
  final turntableToggle = web.document.querySelector('#turntable-toggle');
  if (turntableToggle is web.HTMLInputElement) {
    turntableToggle.checked = true;
    turntableToggle.addEventListener(
      'change',
      ((web.Event _) {
        app.cameraController?.autoRotate = turntableToggle.checked;
      }).toJS,
    );
  }

  // Create procedural meshes using Primitives
  final groundMesh = app.createMesh(
    Primitives.plane(width: 30, depth: 30, subdivisionsX: 4, subdivisionsZ: 4),
    debugLabel: 'ground',
  );
  final sphereMesh = app.createMesh(
    Primitives.sphere(radius: 1.0, rings: 40, sectors: 40),
    debugLabel: 'center_sphere',
  );
  final torusMesh = app.createMesh(
    Primitives.torus(radius: 1.8, tubeRadius: 0.08, radialSegments: 20, tubularSegments: 48),
    debugLabel: 'orbit_torus',
  );
  final capsuleMesh = app.createMesh(
    Primitives.capsule(radius: 0.3, cylinderHeight: 0.6, rings: 12, sectors: 24),
    debugLabel: 'satellite_capsule',
  );
  final cylinderMesh = app.createMesh(
    Primitives.cylinder(radius: 0.35, height: 0.9, radialSegments: 24),
    debugLabel: 'satellite_cylinder',
  );
  final coneMesh = app.createMesh(
    Primitives.cone(radius: 0.4, height: 0.9, radialSegments: 24),
    debugLabel: 'satellite_cone',
  );
  final cubeMesh = app.createMesh(
    Primitives.cube(size: 0.65),
    debugLabel: 'satellite_cube',
  );

  // Create high-fidelity PBR materials using new presets
  final groundMat = app.createMaterial(
    MaterialDefinition.matte(
      key: 'ground',
      color: const LinearColor(0.10, 0.12, 0.16),
      roughness: 0.70,
    ),
  );

  final heroMaterials = <String, MaterialHandle>{
    'gold': app.createMaterial(
      MaterialDefinition.gold(
        key: 'hero_gold',
        roughness: 0.12,
      ),
    ),
    'chrome': app.createMaterial(
      MaterialDefinition.chrome(
        key: 'hero_chrome',
        roughness: 0.05,
      ),
    ),
    'copper': app.createMaterial(
      MaterialDefinition.copper(
        key: 'hero_copper',
        roughness: 0.15,
      ),
    ),
    'silver': app.createMaterial(
      MaterialDefinition.silver(
        key: 'hero_silver',
        roughness: 0.08,
      ),
    ),
    'ceramic': app.createMaterial(
      MaterialDefinition.ceramic(
        key: 'hero_ceramic',
        color: const LinearColor(0.95, 0.12, 0.22),
        roughness: 0.18,
        clearcoat: 0.9,
      ),
    ),
    'plastic': app.createMaterial(
      MaterialDefinition.plastic(
        key: 'hero_plastic',
        color: const LinearColor(0.10, 0.85, 0.45),
        roughness: 0.22,
      ),
    ),
    'iron': app.createMaterial(
      MaterialDefinition.iron(
        key: 'hero_iron',
        roughness: 0.28,
      ),
    ),
  };

  final chromeTorusMat = app.createMaterial(
    MaterialDefinition.chrome(key: 'torus_chrome', roughness: 0.06),
  );

  final satelliteMaterials = [
    app.createMaterial(
      MaterialDefinition.plastic(
        key: 'sat_emerald',
        color: const LinearColor(0.10, 0.88, 0.42),
        roughness: 0.22,
      ),
    ),
    app.createMaterial(
      MaterialDefinition.ceramic(
        key: 'sat_ruby',
        color: const LinearColor(0.98, 0.12, 0.22),
        roughness: 0.18,
        clearcoat: 0.8,
      ),
    ),
    app.createMaterial(
      MaterialDefinition.plastic(
        key: 'sat_sapphire',
        color: const LinearColor(0.18, 0.42, 0.98),
        roughness: 0.20,
      ),
    ),
    app.createMaterial(
      MaterialDefinition.copper(
        key: 'sat_copper',
        roughness: 0.20,
      ),
    ),
  ];

  // Build Scene Graph
  app.scene.add(
    mesh: groundMesh,
    material: groundMat,
    transform: Transform.at(const Vec3(0, -1.0, 0)),
    name: 'ground_node',
  );

  final centerNode = app.scene.add(
    mesh: sphereMesh,
    material: heroMaterials['gold']!,
    transform: Transform.at(const Vec3(0, 0.5, 0)),
    name: 'center_sphere_node',
  );

  // Wire hero material selector
  final matSelect = web.document.querySelector('#material-select');
  if (matSelect is web.HTMLSelectElement) {
    matSelect.addEventListener(
      'change',
      ((web.Event _) {
        final mat = heroMaterials[matSelect.value];
        if (mat != null) {
          centerNode.material = mat;
        }
      }).toJS,
    );
  }

  final torusNode = app.scene.add(
    mesh: torusMesh,
    material: chromeTorusMat,
    transform: Transform.at(const Vec3(0, 0.5, 0)),
    name: 'torus_ring_node',
  );

  final orbitRing = SceneNode.group(name: 'orbit_ring');
  centerNode.addChild(orbitRing);

  final satelliteMeshes = [capsuleMesh, cylinderMesh, coneMesh, cubeMesh];
  final satelliteNodes = <SceneNode>[];
  const count = 4;
  for (var i = 0; i < count; i++) {
    final angle = i * (math.pi * 2.0 / count);
    final sat = orbitRing.add(
      mesh: satelliteMeshes[i],
      material: satelliteMaterials[i],
      transform: Transform.at(
        Vec3(math.cos(angle) * 3.2, 0.0, math.sin(angle) * 3.2),
      ),
      name: 'satellite_$i',
    );
    satelliteNodes.add(sat);
  }

  // Animation frame loop using ergonomic SceneNode methods
  app.onFrame = (ctx) {
    final t = ctx.timeSeconds;
    final dt = ctx.deltaTime;

    // Use SceneNode position setter and rotate methods
    centerNode.position = Vec3(0, 0.5 + math.sin(t * 1.4) * 0.15, 0);
    centerNode.rotateY(0.35 * dt);

    torusNode.position = Vec3(0, 0.5 + math.sin(t * 1.4) * 0.15, 0);
    torusNode.rotateAxis(const Vec3(1, 0.3, 0.2).normalized, 0.7 * dt);

    orbitRing.rotateY(0.65 * dt);

    for (var i = 0; i < satelliteNodes.length; i++) {
      final axis = switch (i % 3) {
        0 => const Vec3(1, 1, 0).normalized,
        1 => const Vec3(0, 1, 1).normalized,
        _ => const Vec3(1, 0, 1).normalized,
      };
      satelliteNodes[i].rotateAxis(axis, (2.2 + i * 1.2) * dt);
    }

    final p0 = Vec3(
      math.cos(t * 1.2) * 4.2,
      1.5 + math.sin(t * 2.0) * 0.6,
      math.sin(t * 1.2) * 4.2,
    );
    final p1 = Vec3(
      math.cos(t * 1.0 + 2.0) * 4.5,
      1.8,
      math.sin(t * 1.0 + 2.0) * 4.5,
    );
    final p2 = Vec3(
      math.cos(t * 0.8 + 4.0) * 3.8,
      1.2,
      math.sin(t * 0.8 + 4.0) * 3.8,
    );
    final p3 = Vec3(0, 3.8 + math.sin(t * 2.2) * 0.9, 0);

    // Update point lights on environment using copyWith
    app.environment = app.environment.copyWith(
      pointLights: [
        PointLight(
          id: 0,
          position: p0,
          color: const LinearColor(1.0, 0.25, 0.25),
          intensity: 4.0,
          radius: 9.0,
        ),
        PointLight(
          id: 1,
          position: p1,
          color: const LinearColor(0.25, 0.5, 1.0),
          intensity: 4.0,
          radius: 9.0,
        ),
        PointLight(
          id: 2,
          position: p2,
          color: const LinearColor(0.2, 1.0, 0.45),
          intensity: 3.5,
          radius: 8.0,
        ),
        PointLight(
          id: 3,
          position: p3,
          color: const LinearColor(1.0, 0.85, 0.35),
          intensity: 4.5,
          radius: 10.0,
        ),
      ],
    );
  };

  app.start();
}
