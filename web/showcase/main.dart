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

  // Initial camera view
  app.cameraController?.distance = 8.5;
  app.cameraController?.elevationRadians = 0.45;
  app.cameraController?.target = const Vec3(0, 0.5, 0);

  // Environment with Split-Sum IBL and AgX tone mapping
  app.environment = const FrameEnvironment(
    clearColor: LinearColor(0.015, 0.02, 0.03),
    ambientColor: LinearColor(0.04, 0.05, 0.07),
    ambientIntensity: 1.0,
    reflectionColor: LinearColor(0.7, 0.8, 1.0),
    reflectionIntensity: 1.2,
    reflectionConfidence: 0.85,
    directionalLight: DirectionalLight(
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

  // Create high-fidelity PBR materials
  final groundMat = app.createMaterial(
    const MaterialDefinition(
      key: 'ground',
      tintR: 0.10,
      tintG: 0.12,
      tintB: 0.16,
      roughness: 0.65,
      metallic: 0.2,
    ),
  );
  final goldSphereMat = app.createMaterial(
    const MaterialDefinition(
      key: 'gold_sphere',
      tintR: 1.0,
      tintG: 0.78,
      tintB: 0.35,
      roughness: 0.12,
      metallic: 0.95,
      clearcoatStrength: 0.85,
      clearcoatRoughness: 0.08,
    ),
  );
  final chromeTorusMat = app.createMaterial(
    const MaterialDefinition(
      key: 'chrome_torus',
      tintR: 0.92,
      tintG: 0.94,
      tintB: 0.98,
      roughness: 0.06,
      metallic: 0.98,
    ),
  );
  final emeraldMat = app.createMaterial(
    const MaterialDefinition(
      key: 'emerald',
      tintR: 0.10,
      tintG: 0.88,
      tintB: 0.42,
      roughness: 0.25,
      metallic: 0.4,
      clearcoatStrength: 0.6,
    ),
  );
  final rubyMat = app.createMaterial(
    const MaterialDefinition(
      key: 'ruby',
      tintR: 0.98,
      tintG: 0.12,
      tintB: 0.22,
      roughness: 0.20,
      metallic: 0.5,
      clearcoatStrength: 0.7,
    ),
  );
  final sapphireMat = app.createMaterial(
    const MaterialDefinition(
      key: 'sapphire',
      tintR: 0.18,
      tintG: 0.42,
      tintB: 0.98,
      roughness: 0.22,
      metallic: 0.45,
      clearcoatStrength: 0.6,
    ),
  );
  final amethystMat = app.createMaterial(
    const MaterialDefinition(
      key: 'amethyst',
      tintR: 0.72,
      tintG: 0.25,
      tintB: 0.95,
      roughness: 0.30,
      metallic: 0.35,
    ),
  );

  // Build Scene Graph
  app.scene.add(
    mesh: groundMesh,
    material: groundMat,
    transform: Transform.at(const Vec3(0, -1.0, 0)),
    name: 'ground_node',
  );

  final centerNode = app.scene.add(
    mesh: sphereMesh,
    material: goldSphereMat,
    transform: Transform.at(const Vec3(0, 0.5, 0)),
    name: 'center_sphere_node',
  );

  final torusNode = app.scene.add(
    mesh: torusMesh,
    material: chromeTorusMat,
    transform: Transform.at(const Vec3(0, 0.5, 0)),
    name: 'torus_ring_node',
  );

  final orbitRing = SceneNode.group(name: 'orbit_ring');
  centerNode.addChild(orbitRing);

  final satellites = [
    (mesh: capsuleMesh, mat: emeraldMat),
    (mesh: cylinderMesh, mat: rubyMat),
    (mesh: coneMesh, mat: sapphireMat),
    (mesh: cubeMesh, mat: amethystMat),
  ];

  final satelliteNodes = <SceneNode>[];
  const count = 4;
  for (var i = 0; i < count; i++) {
    final angle = i * (math.pi * 2.0 / count);
    final sat = orbitRing.add(
      mesh: satellites[i].mesh,
      material: satellites[i].mat,
      transform: Transform.at(
        Vec3(math.cos(angle) * 3.2, 0.0, math.sin(angle) * 3.2),
      ),
      name: 'satellite_$i',
    );
    satelliteNodes.add(sat);
  }

  // Animation frame loop
  app.onFrame = (ctx) {
    final t = ctx.timeSeconds;

    centerNode.transform = Transform(
      translation: Vec3(0, 0.5 + math.sin(t * 1.4) * 0.15, 0),
      rotation: Quat.axisAngle(const Vec3(0, 1, 0), t * 0.35),
    );

    torusNode.transform = Transform(
      translation: Vec3(0, 0.5 + math.sin(t * 1.4) * 0.15, 0),
      rotation: Quat.axisAngle(const Vec3(1, 0.3, 0.2).normalized, t * 0.7),
    );

    orbitRing.transform = Transform(
      rotation: Quat.axisAngle(const Vec3(0, 1, 0), t * 0.65),
    );

    for (var i = 0; i < satelliteNodes.length; i++) {
      final axis = switch (i % 3) {
        0 => const Vec3(1, 1, 0).normalized,
        1 => const Vec3(0, 1, 1).normalized,
        _ => const Vec3(1, 0, 1).normalized,
      };
      satelliteNodes[i].transform = Transform(
        translation: satelliteNodes[i].transform.translation,
        rotation: Quat.axisAngle(axis, t * 2.2 + i * 1.2),
      );
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

    app.environment = FrameEnvironment(
      clearColor: const LinearColor(0.015, 0.02, 0.03),
      ambientColor: const LinearColor(0.04, 0.05, 0.07),
      ambientIntensity: 1.0,
      reflectionColor: const LinearColor(0.7, 0.8, 1.0),
      reflectionIntensity: 1.2,
      reflectionConfidence: 0.85,
      directionalLight: const DirectionalLight(
        direction: Vec3(0.5, -1.0, 0.3),
        color: LinearColor(1.0, 0.95, 0.85),
        intensity: 2.2,
      ),
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
