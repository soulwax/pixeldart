import 'dart:js_interop';
import 'dart:math' as math;
import 'dart:typed_data';

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
  final orbit = app.orbitCamera;
  if (orbit != null) {
    orbit.distance = 8.5;
    orbit.elevationRadians = 0.45;
    orbit.target = const Vec3(0, 0.5, 0);
    orbit.autoRotate = true;
    orbit.autoRotateSpeed = 0.18;
  }

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

  // Start with high-fidelity cinematic post-processing
  app.post = PostProcessState.cinematic();

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
        app.setToneMapping(mode);
      }).toJS,
    );
  }

  // Wire post-processing preset selector
  final postPresetSelect = web.document.querySelector('#post-preset-select');
  if (postPresetSelect is web.HTMLSelectElement) {
    postPresetSelect.addEventListener(
      'change',
      ((web.Event _) {
        final preset = switch (postPresetSelect.value) {
          'clean' => PostProcessState.clean(),
          'ps1' => PostProcessState.stylizedPs1(),
          'vhs' => PostProcessState.retroVhs(),
          _ => PostProcessState.cinematic(),
        };
        app.post = preset;
        if (toneSelect is web.HTMLSelectElement) {
          toneSelect.value = switch (preset.toneMapping) {
            ToneMappingMode.aces => 'aces',
            ToneMappingMode.reinhard => 'reinhard',
            ToneMappingMode.off => 'off',
            ToneMappingMode.agx => 'agx',
          };
        }
      }).toJS,
    );
  }

  // Wire turntable auto-rotate toggle
  final turntableToggle = web.document.querySelector('#turntable-toggle');
  final turntableGroup = web.document.querySelector('#turntable-group');
  if (turntableToggle is web.HTMLInputElement) {
    turntableToggle.checked = true;
    turntableToggle.addEventListener(
      'change',
      ((web.Event _) {
        app.orbitCamera?.autoRotate = turntableToggle.checked;
      }).toJS,
    );
  }

  // Wire camera mode selector (Orbit turntable vs Free fly)
  final cameraSelect = web.document.querySelector('#camera-mode-select');
  if (cameraSelect is web.HTMLSelectElement) {
    cameraSelect.addEventListener(
      'change',
      ((web.Event _) {
        if (cameraSelect.value == 'fly') {
          app.useFlyCamera(
            position: const Vec3(0, 2.0, 7.0),
            moveSpeed: 6.0,
          );
          if (turntableGroup is web.HTMLElement) {
            turntableGroup.style.display = 'none';
          }
        } else {
          final newOrbit = app.useOrbitCamera(
            target: const Vec3(0, 0.5, 0),
            distance: 8.5,
          );
          newOrbit.elevationRadians = 0.45;
          if (turntableToggle is web.HTMLInputElement) {
            newOrbit.autoRotate = turntableToggle.checked;
            newOrbit.autoRotateSpeed = 0.18;
          }
          if (turntableGroup is web.HTMLElement) {
            turntableGroup.style.display = 'flex';
          }
        }
      }).toJS,
    );
  }

  // Create procedural meshes with geometry data retained for raycast picking
  final groundData = Primitives.plane(
    width: 30,
    depth: 30,
    subdivisionsX: 4,
    subdivisionsZ: 4,
  );
  final groundMesh = app.createMesh(groundData, debugLabel: 'ground');

  final sphereData = Primitives.sphere(radius: 1.0, rings: 40, sectors: 40);
  final sphereMesh = app.createMesh(sphereData, debugLabel: 'center_sphere');

  final torusData = Primitives.torus(
    radius: 1.8,
    tubeRadius: 0.08,
    radialSegments: 20,
    tubularSegments: 48,
  );
  final torusMesh = app.createMesh(torusData, debugLabel: 'orbit_torus');

  final capsuleData = Primitives.capsule(
    radius: 0.3,
    cylinderHeight: 0.6,
    rings: 12,
    sectors: 24,
  );
  final cylinderData = Primitives.cylinder(
    radius: 0.35,
    height: 0.9,
    radialSegments: 24,
  );
  final coneData = Primitives.cone(
    radius: 0.4,
    height: 0.9,
    radialSegments: 24,
  );
  final cubeData = Primitives.cube(size: 0.65);

  final satelliteDatas = [capsuleData, cylinderData, coneData, cubeData];
  final satelliteMeshes = [
    app.createMesh(capsuleData, debugLabel: 'satellite_capsule'),
    app.createMesh(cylinderData, debugLabel: 'satellite_cylinder'),
    app.createMesh(coneData, debugLabel: 'satellite_cone'),
    app.createMesh(cubeData, debugLabel: 'satellite_cube'),
  ];

  // Generate procedural PBR textures
  final groundGridPixels = ProceduralTextures.grid(
    width: 256,
    height: 256,
    cellSize: 32,
    lineWidth: 2,
    lineColor: const LinearColor(0.22, 0.48, 0.95),
    cellColor: const LinearColor(0.06, 0.08, 0.12),
  );
  final groundAlbedoTex = app.createProceduralTexture(
    groundGridPixels,
    width: 256,
    height: 256,
    debugLabel: 'ground_grid_albedo',
  );

  final gridHeights = Uint8List(256 * 256);
  for (var y = 0; y < 256; y++) {
    final isLineY = (y % 32) < 2;
    for (var x = 0; x < 256; x++) {
      final isLine = isLineY || ((x % 32) < 2);
      gridHeights[y * 256 + x] = isLine ? 220 : 50;
    }
  }
  final groundNormalPixels = ProceduralTextures.normalFromHeight(
    gridHeights,
    width: 256,
    height: 256,
    strength: 3.0,
  );
  final groundNormalTex = app.createProceduralTexture(
    groundNormalPixels,
    width: 256,
    height: 256,
    debugLabel: 'ground_grid_normal',
  );

  final brushedOrmPixels = ProceduralTextures.brushedMetalOrm(
    width: 256,
    height: 256,
    baseRoughness: 0.22,
    metallic: 0.95,
  );
  final brushedOrmTex = app.createProceduralTexture(
    brushedOrmPixels,
    width: 256,
    height: 256,
    debugLabel: 'brushed_metal_orm',
  );

  // Create high-fidelity PBR materials with procedural textures
  final groundMat = app.createMaterial(
    MaterialDefinition(
      key: 'ground_pbr',
      albedoTexture: groundAlbedoTex,
      normalTexture: groundNormalTex,
      normalStrength: 1.5,
      uvScaleU: 8.0,
      uvScaleV: 8.0,
      roughness: 0.50,
      metallic: 0.10,
    ),
  );

  final heroMaterials = <String, MaterialHandle>{
    'gold': app.createMaterial(
      MaterialDefinition.gold(key: 'hero_gold', roughness: 0.12),
    ),
    'chrome': app.createMaterial(
      MaterialDefinition.chrome(key: 'hero_chrome', roughness: 0.05),
    ),
    'copper': app.createMaterial(
      MaterialDefinition.copper(key: 'hero_copper', roughness: 0.15),
    ),
    'silver': app.createMaterial(
      MaterialDefinition.silver(key: 'hero_silver', roughness: 0.08),
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
      MaterialDefinition.iron(key: 'hero_iron', roughness: 0.28),
    ),
    'brushed': app.createMaterial(
      MaterialDefinition(
        key: 'hero_brushed',
        ormTexture: brushedOrmTex,
        roughness: 0.22,
        metallic: 0.95,
        tintR: 0.95,
        tintG: 0.95,
        tintB: 1.0,
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
      MaterialDefinition.copper(key: 'sat_copper', roughness: 0.20),
    ),
  ];

  // Build Scene Graph with bounds and meshData for precise raycasting
  app.scene.add(
    mesh: groundMesh,
    meshData: groundData,
    material: groundMat,
    transform: Transform.at(const Vec3(0, -1.0, 0)),
    name: 'ground_node',
  );

  final centerNode = app.scene.add(
    mesh: sphereMesh,
    meshData: sphereData,
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
    meshData: torusData,
    material: chromeTorusMat,
    transform: Transform.at(const Vec3(0, 0.5, 0)),
    name: 'torus_ring_node',
  );

  final orbitRing = SceneNode.group(name: 'orbit_ring');
  centerNode.addChild(orbitRing);

  final satelliteNodes = <SceneNode>[];
  const count = 4;
  for (var i = 0; i < count; i++) {
    final angle = i * (math.pi * 2.0 / count);
    final sat = orbitRing.add(
      mesh: satelliteMeshes[i],
      meshData: satelliteDatas[i],
      material: satelliteMaterials[i],
      transform: Transform.at(
        Vec3(math.cos(angle) * 3.2, 0.0, math.sin(angle) * 3.2),
      ),
      name: 'satellite_$i',
    );
    satelliteNodes.add(sat);
  }

  // Interactive 3D Raycasting & Object Picking
  SceneNode? selectedNode;
  var selectionPulse = 0.0;
  final pickingStatus = web.document.querySelector('#picking-status');

  canvas.addEventListener(
    'click',
    ((web.Event e) {
      if (e is! web.MouseEvent) return;
      final hit = app.pick(e.clientX.toDouble(), e.clientY.toDouble());
      if (hit != null) {
        selectedNode = hit.node;
        selectionPulse = 1.0;
        final distStr = hit.distance.toStringAsFixed(2);
        final pt = hit.point;
        final pointStr =
            '(${pt.x.toStringAsFixed(1)}, ${pt.y.toStringAsFixed(1)}, ${pt.z.toStringAsFixed(1)})';
        final nodeName = hit.node.name ?? 'unnamed';
        pickingStatus?.textContent =
            'Selected: $nodeName | Dist: $distStr | Pt: $pointStr';
      } else {
        selectedNode = null;
        pickingStatus?.textContent = 'Click any 3D object to inspect';
      }
    }).toJS,
  );

  // Drive smooth floating bob animation using the pure-Dart AnimationClip engine
  final centerBobTrack = Vector3Track(
    target: centerNode,
    keyframes: const [
      Keyframe(0.0, Vec3(0, 0.35, 0), Curves.easeInOutCubic),
      Keyframe(2.0, Vec3(0, 0.65, 0), Curves.easeInOutCubic),
      Keyframe(4.0, Vec3(0, 0.35, 0), Curves.easeInOutCubic),
    ],
  );
  final torusBobTrack = Vector3Track(
    target: torusNode,
    keyframes: const [
      Keyframe(0.0, Vec3(0, 0.35, 0), Curves.easeInOutCubic),
      Keyframe(2.0, Vec3(0, 0.65, 0), Curves.easeInOutCubic),
      Keyframe(4.0, Vec3(0, 0.35, 0), Curves.easeInOutCubic),
    ],
  );
  final bobClip = AnimationClip(
    name: 'hero_bob',
    duration: 4.0,
    loopMode: LoopMode.loop,
    tracks: [centerBobTrack, torusBobTrack],
  );
  app.playAnimation(bobClip);

  // Animation frame loop using ergonomic SceneNode methods
  app.onFrame = (ctx) {
    final t = ctx.timeSeconds;
    final dt = ctx.deltaTime;

    // Decay selection pulse for visual feedback
    if (selectionPulse > 0.0) {
      selectionPulse = math.max(0.0, selectionPulse - dt * 2.5);
    }

    final heroScale = (selectedNode == centerNode)
        ? 1.0 + math.sin(selectionPulse * math.pi) * 0.20
        : 1.0;
    centerNode.scale = heroScale;

    final torusScale = (selectedNode == torusNode)
        ? 1.0 + math.sin(selectionPulse * math.pi) * 0.18
        : 1.0;
    torusNode.scale = torusScale;

    // Center sphere & torus rotation (vertical bob is driven by AnimationClip)
    centerNode.rotateY(0.35 * dt);
    torusNode.rotateAxis(const Vec3(1, 0.3, 0.2).normalized, 0.7 * dt);

    // Orbit ring rotation
    orbitRing.rotateY(0.65 * dt);

    // Satellite rotation and selection pulse
    for (var i = 0; i < satelliteNodes.length; i++) {
      final sat = satelliteNodes[i];
      final satScale = (sat == selectedNode)
          ? 1.0 + math.sin(selectionPulse * math.pi) * 0.25
          : 1.0;
      sat.scale = satScale;

      final axis = switch (i % 3) {
        0 => const Vec3(1, 1, 0).normalized,
        1 => const Vec3(0, 1, 1).normalized,
        _ => const Vec3(1, 0, 1).normalized,
      };
      sat.rotateAxis(axis, (2.2 + i * 1.2) * dt);
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
