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

  // Set initial camera view
  app.cameraController?.distance = 7.0;
  app.cameraController?.elevationRadians = 0.4;
  app.cameraController?.target = const Vec3(0, 0.5, 0);

  // Set initial environment and post processing
  app.environment = const FrameEnvironment(
    clearColor: LinearColor(0.02, 0.025, 0.035),
    ambientColor: LinearColor(0.04, 0.05, 0.07),
    ambientIntensity: 1.0,
    directionalLight: DirectionalLight(
      direction: Vec3(0.6, -1.0, 0.4),
      color: LinearColor(1.0, 0.95, 0.88),
      intensity: 2.2,
    ),
  );

  app.post = const PostProcessState(
    exposure: 1.1,
    toneMapping: ToneMappingMode.agx,
    vignette: 0.25,
    grain: 0.15,
  );

  // Wire tone mapping selector from DOM
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
    Primitives.plane(width: 24, depth: 24),
    debugLabel: 'ground',
  );
  final sphereMesh = app.createMesh(
    Primitives.sphere(radius: 1.0, rings: 40, sectors: 40),
    debugLabel: 'center_sphere',
  );
  final cubeMesh = app.createMesh(
    Primitives.cube(size: 0.75),
    debugLabel: 'satellite_cube',
  );

  // Create materials
  final groundMat = app.createMaterial(
    const MaterialDefinition(
      key: 'ground',
      tintR: 0.12,
      tintG: 0.14,
      tintB: 0.18,
      roughness: 0.7,
      metallic: 0.1,
    ),
  );
  final goldSphereMat = app.createMaterial(
    const MaterialDefinition(
      key: 'gold_sphere',
      tintR: 1.0,
      tintG: 0.76,
      tintB: 0.33,
      roughness: 0.15,
      metallic: 0.95,
      clearcoatStrength: 0.8,
      clearcoatRoughness: 0.1,
    ),
  );
  final emeraldMat = app.createMaterial(
    const MaterialDefinition(
      key: 'emerald',
      tintR: 0.15,
      tintG: 0.85,
      tintB: 0.45,
      roughness: 0.35,
      metallic: 0.3,
    ),
  );
  final rubyMat = app.createMaterial(
    const MaterialDefinition(
      key: 'ruby',
      tintR: 0.95,
      tintG: 0.15,
      tintB: 0.25,
      roughness: 0.25,
      metallic: 0.5,
    ),
  );
  final sapphireMat = app.createMaterial(
    const MaterialDefinition(
      key: 'sapphire',
      tintR: 0.20,
      tintG: 0.45,
      tintB: 0.95,
      roughness: 0.30,
      metallic: 0.4,
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

  final orbitRing = SceneNode.group(name: 'orbit_ring');
  centerNode.addChild(orbitRing);

  final satelliteMaterials = [emeraldMat, rubyMat, sapphireMat];
  final satelliteNodes = <SceneNode>[];
  for (var i = 0; i < 3; i++) {
    final angle = i * (math.pi * 2.0 / 3.0);
    final sat = orbitRing.add(
      mesh: cubeMesh,
      material: satelliteMaterials[i],
      transform: Transform.at(
        Vec3(math.cos(angle) * 2.5, 0.0, math.sin(angle) * 2.5),
      ),
      name: 'satellite_$i',
    );
    satelliteNodes.add(sat);
  }

  // Render animation loop
  app.onFrame = (ctx) {
    final t = ctx.timeSeconds;

    centerNode.transform = Transform(
      translation: Vec3(0, 0.5 + math.sin(t * 1.5) * 0.15, 0),
      rotation: Quat.axisAngle(const Vec3(0, 1, 0), t * 0.4),
    );
    orbitRing.transform = Transform(
      rotation: Quat.axisAngle(const Vec3(0, 1, 0), t * 0.8),
    );

    for (var i = 0; i < satelliteNodes.length; i++) {
      satelliteNodes[i].transform = Transform(
        translation: satelliteNodes[i].transform.translation,
        rotation: Quat.axisAngle(
          const Vec3(1, 1, 0).normalized,
          t * 2.0 + i,
        ),
      );
    }

    final p0 = Vec3(
      math.cos(t * 1.2) * 3.5,
      1.2 + math.sin(t * 2.0) * 0.5,
      math.sin(t * 1.2) * 3.5,
    );
    final p1 = Vec3(
      math.cos(t * 1.0 + 2.0) * 4.0,
      1.5,
      math.sin(t * 1.0 + 2.0) * 4.0,
    );
    final p2 = Vec3(
      math.cos(t * 0.8 + 4.0) * 3.0,
      1.0,
      math.sin(t * 0.8 + 4.0) * 3.0,
    );
    final p3 = Vec3(0, 3.5 + math.sin(t * 2.5) * 0.8, 0);

    app.environment = FrameEnvironment(
      clearColor: const LinearColor(0.02, 0.025, 0.035),
      ambientColor: const LinearColor(0.03, 0.04, 0.06),
      ambientIntensity: 1.0,
      directionalLight: const DirectionalLight(
        direction: Vec3(0.5, -1.0, 0.3),
        color: LinearColor(1.0, 0.95, 0.85),
        intensity: 2.0,
      ),
      pointLights: [
        PointLight(
          id: 0,
          position: p0,
          color: const LinearColor(1.0, 0.2, 0.2),
          intensity: 3.5,
          radius: 8.0,
        ),
        PointLight(
          id: 1,
          position: p1,
          color: const LinearColor(0.2, 0.4, 1.0),
          intensity: 3.5,
          radius: 8.0,
        ),
        PointLight(
          id: 2,
          position: p2,
          color: const LinearColor(0.2, 1.0, 0.4),
          intensity: 3.0,
          radius: 7.0,
        ),
        PointLight(
          id: 3,
          position: p3,
          color: const LinearColor(1.0, 0.8, 0.3),
          intensity: 4.0,
          radius: 9.0,
        ),
      ],
    );
  };

  app.start();
}
