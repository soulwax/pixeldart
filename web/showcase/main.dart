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
    reflectionColor: const LinearColor(0.5, 0.6, 0.75),
    reflectionIntensity: 0.65,
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

  final satelliteNodes = <SceneNode>[];

  // Wire camera mode selector (Orbit turntable vs Free fly vs Smooth follow)
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
        } else if (cameraSelect.value == 'follow') {
          if (satelliteNodes.isNotEmpty) {
            app.useFollowCamera(
              target: satelliteNodes[0],
              distance: 3.8,
              height: 1.2,
              damping: 7.0,
            );
          }
          if (turntableGroup is web.HTMLElement) {
            turntableGroup.style.display = 'none';
          }
        } else if (cameraSelect.value == 'tour') {
          final tourWaypoints = [
            const CameraWaypoint(eye: Vec3(0, 4.5, 11.0), target: Vec3(0, 0.5, 0), fovYRadians: 1.05),
            const CameraWaypoint(eye: Vec3(8.0, 3.2, 5.5), target: Vec3(1.0, 0.8, 0), fovYRadians: 0.95),
            const CameraWaypoint(eye: Vec3(7.0, 2.2, -4.5), target: Vec3(5.5, 0.2, -5.5), fovYRadians: 1.05),
            const CameraWaypoint(eye: Vec3(3.5, 4.2, -7.5), target: Vec3(0, 0.5, 0), fovYRadians: 1.15),
            const CameraWaypoint(eye: Vec3(-6.5, 2.8, -5.0), target: Vec3(-0.5, 0.5, 0), fovYRadians: 0.90),
            const CameraWaypoint(eye: Vec3(-8.5, 4.0, 2.0), target: Vec3(0, 0.5, 0.5), fovYRadians: 1.00),
            const CameraWaypoint(eye: Vec3(-3.5, 2.0, 8.5), target: Vec3(0.5, 0.5, 0), fovYRadians: 1.10),
          ];
          app.useCinematicTour(
            waypoints: tourWaypoints,
            duration: 22.0,
            loop: true,
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

  // Wire camera shake button
  final shakeBtn = web.document.querySelector('#shake-button');
  if (shakeBtn is web.HTMLButtonElement) {
    shakeBtn.addEventListener(
      'click',
      ((web.Event _) {
        app.shakeCamera(trauma: 0.65);
      }).toJS,
    );
  }

  // Wire smart topic tabs
  final tabButtons = web.document.querySelectorAll('.tab-btn');
  final topicPanels = web.document.querySelectorAll('.topic-panel');

  void switchTopic(String topicName) {
    for (var i = 0; i < tabButtons.length; i++) {
      final btn = tabButtons.item(i);
      if (btn is web.HTMLElement) {
        if (btn.getAttribute('data-topic') == topicName) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    }
    for (var i = 0; i < topicPanels.length; i++) {
      final panel = topicPanels.item(i);
      if (panel is web.HTMLElement) {
        if (panel.id == 'panel-$topicName') {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      }
    }
  }

  for (var i = 0; i < tabButtons.length; i++) {
    final btn = tabButtons.item(i);
    if (btn is web.HTMLElement) {
      final topic = btn.getAttribute('data-topic') ?? '';
      btn.addEventListener(
        'click',
        ((web.Event _) => switchTopic(topic)).toJS,
      );
    }
  }

  // Continuous dynamic solar time progression state
  var solarTimeHours = 14.0;
  var solarRunning = true;
  var solarSpeed = 1.0;
  var isUserDraggingSolar = false;

  final solarSlider = web.document.querySelector('#solar-time-slider');
  final solarLabel = web.document.querySelector('#solar-time-label');
  final solarPhaseBadge = web.document.querySelector('#solar-phase-badge');
  final solarPlayPauseBtn = web.document.querySelector('#solar-play-pause-btn');
  final solarSpeedSelect = web.document.querySelector('#solar-speed-select');

  void updateSolarDisplay() {
    final h = solarTimeHours.floor();
    final m = ((solarTimeHours - h) * 60).round();
    final hStr = h.toString().padLeft(2, '0');
    final mStr = m.toString().padLeft(2, '0');
    final timeStr = '$hStr:$mStr';
    if (solarLabel is web.HTMLElement) {
      solarLabel.innerText = timeStr;
    }
    if (solarPhaseBadge is web.HTMLElement) {
      final String icon;
      final String phase;
      if (solarTimeHours >= 5.0 && solarTimeHours < 8.0) {
        icon = '🌅';
        phase = 'Sunrise';
      } else if (solarTimeHours >= 8.0 && solarTimeHours < 17.5) {
        icon = '☀️';
        phase = 'Day';
      } else if (solarTimeHours >= 17.5 && solarTimeHours < 20.5) {
        icon = '🌇';
        phase = 'Sunset';
      } else {
        icon = '🌙';
        phase = 'Night';
      }
      solarPhaseBadge.innerText = '$icon $timeStr $phase';
    }
  }

  void applySolarTime() {
    app.setSolarTime(solarTimeHours, cloudCover01: 0.25);
    updateSolarDisplay();
  }

  if (solarSlider is web.HTMLInputElement) {
    solarSlider.addEventListener(
      'input',
      ((web.Event _) {
        solarTimeHours = double.tryParse(solarSlider.value) ?? 14.0;
        applySolarTime();
      }).toJS,
    );
    solarSlider.addEventListener('mousedown', ((web.Event _) => isUserDraggingSolar = true).toJS);
    solarSlider.addEventListener('mouseup', ((web.Event _) => isUserDraggingSolar = false).toJS);
    solarSlider.addEventListener('touchstart', ((web.Event _) => isUserDraggingSolar = true).toJS);
    solarSlider.addEventListener('touchend', ((web.Event _) => isUserDraggingSolar = false).toJS);
  }

  if (solarPlayPauseBtn is web.HTMLButtonElement) {
    solarPlayPauseBtn.addEventListener(
      'click',
      ((web.Event _) {
        solarRunning = !solarRunning;
        solarPlayPauseBtn.innerText = solarRunning ? '⏸ Pause Time' : '▶ Play Time';
      }).toJS,
    );
  }

  if (solarSpeedSelect is web.HTMLSelectElement) {
    solarSpeedSelect.addEventListener(
      'change',
      ((web.Event _) {
        solarSpeed = double.tryParse(solarSpeedSelect.value) ?? 1.0;
      }).toJS,
    );
  }

  applySolarTime();

  // Wire Depth of Field slider
  final dofSlider = web.document.querySelector('#dof-slider');
  final dofLabel = web.document.querySelector('#dof-label');
  if (dofSlider is web.HTMLInputElement) {
    dofSlider.addEventListener(
      'input',
      ((web.Event _) {
        final val = double.tryParse(dofSlider.value) ?? 0.0;
        if (dofLabel is web.HTMLElement) {
          dofLabel.innerText = val <= 0 ? 'Off' : val.toStringAsFixed(2);
        }
        app.setDepthOfField(strength: val);
      }).toJS,
    );
  }

  // Wire Bloom slider
  final bloomSlider = web.document.querySelector('#bloom-slider');
  final bloomLabel = web.document.querySelector('#bloom-label');
  if (bloomSlider is web.HTMLInputElement) {
    bloomSlider.addEventListener(
      'input',
      ((web.Event _) {
        final val = double.tryParse(bloomSlider.value) ?? 0.30;
        if (bloomLabel is web.HTMLElement) {
          bloomLabel.innerText = val.toStringAsFixed(2);
        }
        app.setBloom(val);
      }).toJS,
    );
  }

  // Wire SSAO slider
  final ssaoSlider = web.document.querySelector('#ssao-slider');
  final ssaoLabel = web.document.querySelector('#ssao-label');
  if (ssaoSlider is web.HTMLInputElement) {
    ssaoSlider.addEventListener(
      'input',
      ((web.Event _) {
        final val = double.tryParse(ssaoSlider.value) ?? 0.75;
        if (ssaoLabel is web.HTMLElement) {
          ssaoLabel.innerText = val.toStringAsFixed(2);
        }
        app.setSsao(val);
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

  final icosphereData = Primitives.icosphere(radius: 0.35, subdivisions: 2);
  final octahedronData = Primitives.octahedron(radius: 0.38);
  final dodecahedronData = Primitives.dodecahedron(radius: 0.35);
  final roundedBoxData = Primitives.roundedBox(
    width: 0.55,
    height: 0.55,
    depth: 0.55,
    bevelRadius: 0.08,
    bevelSegments: 2,
  );

  final satelliteDatas = [
    capsuleData,
    cylinderData,
    coneData,
    cubeData,
    icosphereData,
    octahedronData,
    dodecahedronData,
    roundedBoxData,
  ];
  final satelliteMeshes = [
    app.createMesh(capsuleData, debugLabel: 'satellite_capsule'),
    app.createMesh(cylinderData, debugLabel: 'satellite_cylinder'),
    app.createMesh(coneData, debugLabel: 'satellite_cone'),
    app.createMesh(cubeData, debugLabel: 'satellite_cube'),
    app.createMesh(icosphereData, debugLabel: 'satellite_icosphere'),
    app.createMesh(octahedronData, debugLabel: 'satellite_octahedron'),
    app.createMesh(dodecahedronData, debugLabel: 'satellite_dodecahedron'),
    app.createMesh(roundedBoxData, debugLabel: 'satellite_rounded_box'),
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

  final carbonOrmPixels = ProceduralTextures.carbonFiberOrm(
    width: 256,
    height: 256,
    cellSize: 8,
    baseRoughness: 0.22,
    metallic: 0.40,
  );
  final carbonOrmTex = app.createProceduralTexture(
    carbonOrmPixels,
    width: 256,
    height: 256,
    debugLabel: 'carbon_fiber_orm',
  );

  final hexPixels = ProceduralTextures.hexGrid(
    width: 256,
    height: 256,
    hexRadius: 20.0,
    lineWidth: 2.0,
    lineColor: const LinearColor(0.20, 0.85, 1.0),
    fillColor: const LinearColor(0.04, 0.08, 0.16),
  );
  final hexAlbedoTex = app.createProceduralTexture(
    hexPixels,
    width: 256,
    height: 256,
    debugLabel: 'hex_shield_albedo',
  );

  final voronoiPixels = ProceduralTextures.voronoi(
    width: 256,
    height: 256,
    cellCount: 6,
    cellColor: const LinearColor(0.92, 0.35, 0.25),
    edgeColor: const LinearColor(0.08, 0.02, 0.04),
  );
  final voronoiAlbedoTex = app.createProceduralTexture(
    voronoiPixels,
    width: 256,
    height: 256,
    debugLabel: 'voronoi_cell_albedo',
  );

  final marblePixels = ProceduralTextures.marble(
    width: 256,
    height: 256,
    scale: 3.5,
    turbulence: 4.5,
    veinColor: const LinearColor(0.12, 0.15, 0.20),
    baseColor: const LinearColor(0.92, 0.94, 0.97),
  );
  final marbleAlbedoTex = app.createProceduralTexture(
    marblePixels,
    width: 256,
    height: 256,
    debugLabel: 'marble_albedo',
  );

  final damascusOrmPixels = ProceduralTextures.damascusSteelOrm(
    width: 256,
    height: 256,
    layerFrequency: 18.0,
    foldDistortion: 4.0,
    baseRoughness: 0.18,
    metallic: 0.95,
  );
  final damascusOrmTex = app.createProceduralTexture(
    damascusOrmPixels,
    width: 256,
    height: 256,
    debugLabel: 'damascus_steel_orm',
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
    'carbon': app.createMaterial(
      MaterialDefinition(
        key: 'hero_carbon',
        ormTexture: carbonOrmTex,
        roughness: 0.25,
        metallic: 0.35,
        tintR: 0.15,
        tintG: 0.15,
        tintB: 0.18,
      ),
    ),
    'damascus': app.createMaterial(
      MaterialDefinition(
        key: 'hero_damascus',
        ormTexture: damascusOrmTex,
        roughness: 0.18,
        metallic: 0.95,
        tintR: 0.88,
        tintG: 0.90,
        tintB: 0.94,
        clearcoatStrength: 0.6,
      ),
    ),
    'marble': app.createMaterial(
      MaterialDefinition(
        key: 'hero_marble',
        albedoTexture: marbleAlbedoTex,
        roughness: 0.15,
        metallic: 0.05,
        clearcoatStrength: 0.85,
        clearcoatRoughness: 0.08,
      ),
    ),
    'hex': app.createMaterial(
      MaterialDefinition(
        key: 'hero_hex',
        albedoTexture: hexAlbedoTex,
        roughness: 0.15,
        metallic: 0.70,
        clearcoatStrength: 0.8,
      ),
    ),
    'voronoi': app.createMaterial(
      MaterialDefinition(
        key: 'hero_voronoi',
        albedoTexture: voronoiAlbedoTex,
        roughness: 0.30,
        metallic: 0.10,
        clearcoatStrength: 0.85,
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
    app.createMaterial(
      MaterialDefinition.gold(key: 'sat_gold', roughness: 0.14),
    ),
    app.createMaterial(
      MaterialDefinition.chrome(key: 'sat_chrome', roughness: 0.05),
    ),
    app.createMaterial(
      MaterialDefinition(
        key: 'sat_marble',
        albedoTexture: marbleAlbedoTex,
        roughness: 0.16,
        metallic: 0.05,
        clearcoatStrength: 0.8,
      ),
    ),
    app.createMaterial(
      MaterialDefinition(
        key: 'sat_damascus',
        ormTexture: damascusOrmTex,
        roughness: 0.20,
        metallic: 0.95,
        tintR: 0.90,
        tintG: 0.92,
        tintB: 0.96,
      ),
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

  satelliteNodes.clear();
  const count = 8;
  for (var i = 0; i < count; i++) {
    final angle = i * (math.pi * 2.0 / count);
    final sat = orbitRing.add(
      mesh: satelliteMeshes[i],
      meshData: satelliteDatas[i],
      material: satelliteMaterials[i],
      transform: Transform.at(
        Vec3(math.cos(angle) * 3.4, 0.0, math.sin(angle) * 3.4),
      ),
      name: 'satellite_$i',
    );
    satelliteNodes.add(sat);
  }

  // Create an instanced asteroid belt surrounding the orbit
  final asteroidData = Primitives.cube(size: 0.35);
  final asteroidMesh = app.createMesh(asteroidData, debugLabel: 'asteroid_mesh');
  final asteroidMat = app.createMaterial(
    const MaterialDefinition(
      key: 'asteroid_pbr',
      tintR: 0.28,
      tintG: 0.32,
      tintB: 0.42,
      roughness: 0.65,
      metallic: 0.40,
    ),
  );

  final asteroidTransforms = <Transform>[];
  const asteroidCount = 48;
  final rng = math.Random(1337);
  for (var i = 0; i < asteroidCount; i++) {
    final angle = (i / asteroidCount) * math.pi * 2.0 + (rng.nextDouble() * 0.1);
    final dist = 5.2 + rng.nextDouble() * 1.8;
    final y = (rng.nextDouble() - 0.5) * 0.8;
    final scale = 0.5 + rng.nextDouble() * 0.9;
    final axis = Vec3(
      rng.nextDouble() * 2 - 1,
      rng.nextDouble() * 2 - 1,
      rng.nextDouble() * 2 - 1,
    ).normalized;
    final rot = Quat.axisAngle(axis, rng.nextDouble() * math.pi * 2);
    asteroidTransforms.add(
      Transform(
        translation: Vec3(math.cos(angle) * dist, y + 0.5, math.sin(angle) * dist),
        rotation: rot,
        scale: scale,
      ),
    );
  }

  final asteroidBelt = InstancedMeshNode(
    name: 'asteroid_belt',
    mesh: asteroidMesh,
    meshData: asteroidData,
    material: asteroidMat,
    transforms: asteroidTransforms,
  );
  app.scene.addChild(asteroidBelt);

  // 3D Procedural Conduit Rail extruded along a centripetal Catmull-Rom spline
  final railSpline = CatmullRomSpline3D(
    points: const [
      Vec3(0, 3.2, -6.5),
      Vec3(6.5, 1.8, -3.5),
      Vec3(7.5, 4.0, 3.5),
      Vec3(2.5, 2.2, 7.0),
      Vec3(-4.5, 3.5, 6.0),
      Vec3(-7.5, 1.5, -1.0),
      Vec3(-5.0, 4.2, -5.5),
    ],
    closed: true,
  );
  const railSamples = 120;
  final railPoints = <Vec3>[];
  for (var i = 0; i <= railSamples; i++) {
    railPoints.add(railSpline.sample(i / railSamples));
  }
  final conduitData = Primitives.tubePath(
    spine: railPoints,
    radius: 0.12,
    radialSegments: 10,
    closed: true,
  );
  final conduitMesh = app.createMesh(conduitData, debugLabel: 'conduit_rail');
  final conduitMat = app.createMaterial(
    const MaterialDefinition(
      key: 'conduit_emissive_rail',
      tintR: 0.1,
      tintG: 0.85,
      tintB: 1.0,
      emissiveStrength: 1.8,
      roughness: 0.25,
      metallic: 0.85,
    ),
  );
  app.scene.add(
    mesh: conduitMesh,
    meshData: conduitData,
    material: conduitMat,
    name: 'conduit_rail_node',
  );

  // Dynamic ocean wave simulation and physical buoyant beacon
  final oceanEvaluator = GerstnerWaveEvaluator.ocean(baseHeight: 0.0);
  final buoyData = Primitives.icosphere(radius: 0.45, subdivisions: 2);
  final buoyMesh = app.createMesh(buoyData, debugLabel: 'ocean_buoy');
  final buoyMat = app.createMaterial(
    const MaterialDefinition(
      key: 'buoy_beacon',
      tintR: 1.0,
      tintG: 0.45,
      tintB: 0.1,
      emissiveStrength: 1.2,
      roughness: 0.35,
      metallic: 0.5,
    ),
  );
  final buoyNode = app.scene.add(
    mesh: buoyMesh,
    meshData: buoyData,
    material: buoyMat,
    transform: Transform.at(const Vec3(5.2, 0.0, 5.2)),
    name: 'buoy_beacon_node',
  );

  // Procedural fractal island terrain
  final terrainGen = TerrainGenerator(
    width: 32.0,
    depth: 32.0,
    subdivisionsX: 36,
    subdivisionsZ: 36,
    maxHeight: 3.2,
    baseHeight: -0.6,
    islandRadius: 13.5,
  );
  final terrainData = terrainGen.generateMesh();
  final terrainMesh = app.createMesh(terrainData, debugLabel: 'island_terrain');
  final biomePixels = terrainGen.generateBiomeTexture(width: 256, height: 256);
  final biomeTex = app.createProceduralTexture(
    biomePixels,
    width: 256,
    height: 256,
    debugLabel: 'terrain_biome_albedo',
  );
  final terrainMat = app.createMaterial(
    MaterialDefinition(
      key: 'terrain_biome_pbr',
      albedoTexture: biomeTex,
      roughness: 0.85,
      metallic: 0.05,
    ),
  );
  final terrainNode = app.scene.add(
    mesh: terrainMesh,
    meshData: terrainData,
    material: terrainMat,
    name: 'terrain_node',
  );

  // Deforming dynamic water surface plane
  final waterSurface = WaterSurfaceMesh(
    width: 38.0,
    depth: 38.0,
    subdivisionsX: 32,
    subdivisionsZ: 32,
    baseHeight: 0.0,
  );
  final waterMesh = app.createMesh(waterSurface.mesh, debugLabel: 'water_surface');
  final waterMat = app.createMaterial(
    const MaterialDefinition(
      key: 'water_pbr',
      tintR: 0.08,
      tintG: 0.35,
      tintB: 0.65,
      roughness: 0.08,
      metallic: 0.45,
      clearcoatStrength: 0.9,
      clearcoatRoughness: 0.05,
    ),
  );
  final waterNode = app.scene.add(
    mesh: waterMesh,
    meshData: waterSurface.mesh,
    material: waterMat,
    name: 'water_node',
  );

  // 4-probe buoyant research vessel
  final vesselBody = BuoyantVesselBody(
    position: const Vec3(5.5, 0.0, -5.5),
    width: 2.0,
    length: 3.5,
  );
  final vesselHullData = Primitives.roundedBox(
    width: 1.8,
    height: 0.45,
    depth: 3.2,
    bevelRadius: 0.08,
  );
  final vesselMesh = app.createMesh(vesselHullData, debugLabel: 'vessel_hull');
  final vesselMat = app.createMaterial(
    const MaterialDefinition(
      key: 'vessel_hull_pbr',
      tintR: 0.95,
      tintG: 0.95,
      tintB: 0.98,
      roughness: 0.25,
      metallic: 0.85,
    ),
  );
  final vesselNode = app.scene.add(
    mesh: vesselMesh,
    meshData: vesselHullData,
    material: vesselMat,
    name: 'buoyant_vessel_node',
  );

  // Wire terrain & ocean toggle
  final terrainToggle = web.document.querySelector('#terrain-toggle');
  if (terrainToggle is web.HTMLInputElement) {
    terrainToggle.addEventListener(
      'change',
      ((web.Event _) {
        final show = terrainToggle.checked;
        terrainNode.visibilityMask = show ? -1 : 0;
        waterNode.visibilityMask = show ? -1 : 0;
        vesselNode.visibilityMask = show ? -1 : 0;
      }).toJS,
    );
  }

  // Particle geometry meshes: billboard quad for soft volumetric sprites, cube for tumbling debris
  final particleQuadMesh = app.createMesh(
    Primitives.quad(width: 1.0, height: 1.0),
    debugLabel: 'particle_quad_mesh',
  );
  final particleCubeMesh = app.createMesh(
    Primitives.cube(size: 0.15),
    debugLabel: 'particle_cube_mesh',
  );

  // Procedural soft particle textures
  final particleSoftPixels = ProceduralTextures.radialParticle(
    width: 128,
    height: 128,
    innerRadius: 0.05,
    falloffExponent: 2.0,
  );
  final particleSoftTex = app.createProceduralTexture(
    particleSoftPixels,
    width: 128,
    height: 128,
    wrap: GpuTextureWrap.clampToEdge,
    debugLabel: 'particle_soft_radial_tex',
  );

  final particleSparkPixels = ProceduralTextures.sparkStreak(
    width: 64,
    height: 128,
  );
  final particleSparkTex = app.createProceduralTexture(
    particleSparkPixels,
    width: 64,
    height: 128,
    wrap: GpuTextureWrap.clampToEdge,
    debugLabel: 'particle_spark_streak_tex',
  );

  // Atmospheric particle materials with soft alpha falloff
  final emberMat = app.createMaterial(
    MaterialDefinition(
      key: 'ember_mat',
      albedoTexture: particleSoftTex,
      tintR: 1.0,
      tintG: 0.55,
      tintB: 0.12,
      emissiveStrength: 3.5,
      roughness: 0.2,
      metallic: 0.0,
      alphaMode: AlphaMode.blended,
    ),
  );

  final dustMat = app.createMaterial(
    MaterialDefinition(
      key: 'dust_mat',
      albedoTexture: particleSoftTex,
      tintR: 0.75,
      tintG: 0.88,
      tintB: 1.0,
      emissiveStrength: 0.8,
      roughness: 0.4,
      metallic: 0.1,
      alphaMode: AlphaMode.blended,
    ),
  );

  final snowMat = app.createMaterial(
    MaterialDefinition(
      key: 'snow_mat',
      albedoTexture: particleSoftTex,
      tintR: 0.95,
      tintG: 0.98,
      tintB: 1.0,
      roughness: 0.8,
      metallic: 0.1,
      alphaMode: AlphaMode.blended,
    ),
  );

  final emberField = AtmosphericPresets.floatingEmbers(
    mesh: particleQuadMesh,
    material: emberMat,
    particleCount: 48,
  );
  final dustField = AtmosphericPresets.dustMotes(
    mesh: particleQuadMesh,
    material: dustMat,
    particleCount: 64,
  );
  final snowField = AtmosphericPresets.snow(
    mesh: particleQuadMesh,
    material: snowMat,
    particleCount: 80,
  );

  // Enable floating embers by default
  app.addParticleField(emberField);

  // Wire particle selector
  final particleSelect = web.document.querySelector('#particles-select');
  if (particleSelect is web.HTMLSelectElement) {
    particleSelect.addEventListener(
      'change',
      ((web.Event _) {
        app.clearParticleFields();
        switch (particleSelect.value) {
          case 'embers':
            app.addParticleField(emberField);
          case 'dust':
            app.addParticleField(dustField);
          case 'snow':
            app.addParticleField(snowField);
          case 'off':
            break;
        }
      }).toJS,
    );
  }

  // Specialized materials for dynamic VFX particle systems
  final vfxFireMat = app.createMaterial(
    MaterialDefinition(
      key: 'vfx_fire_mat',
      albedoTexture: particleSoftTex,
      tintR: 1.0,
      tintG: 0.45,
      tintB: 0.08,
      emissiveStrength: 5.5,
      roughness: 0.2,
      metallic: 0.0,
      alphaMode: AlphaMode.blended,
    ),
  );

  final vfxSparkMat = app.createMaterial(
    MaterialDefinition(
      key: 'vfx_spark_mat',
      albedoTexture: particleSparkTex,
      tintR: 1.0,
      tintG: 0.9,
      tintB: 0.45,
      emissiveStrength: 7.0,
      roughness: 0.1,
      metallic: 0.0,
      alphaMode: AlphaMode.blended,
    ),
  );

  final vfxRocketMat = app.createMaterial(
    MaterialDefinition(
      key: 'vfx_rocket_mat',
      albedoTexture: particleSparkTex,
      tintR: 1.0,
      tintG: 0.35,
      tintB: 0.08,
      emissiveStrength: 6.0,
      roughness: 0.1,
      metallic: 0.0,
      alphaMode: AlphaMode.blended,
    ),
  );

  final vfxWaterMat = app.createMaterial(
    MaterialDefinition(
      key: 'vfx_water_mat',
      albedoTexture: particleSoftTex,
      tintR: 0.45,
      tintG: 0.82,
      tintB: 1.0,
      emissiveStrength: 1.0,
      roughness: 0.1,
      metallic: 0.1,
      alphaMode: AlphaMode.blended,
    ),
  );

  final vfxSplashMat = app.createMaterial(
    MaterialDefinition(
      key: 'vfx_splash_mat',
      albedoTexture: particleSoftTex,
      tintR: 0.9,
      tintG: 0.96,
      tintB: 1.0,
      emissiveStrength: 2.0,
      roughness: 0.3,
      metallic: 0.0,
      alphaMode: AlphaMode.blended,
    ),
  );

  final vfxVortexMat = app.createMaterial(
    MaterialDefinition(
      key: 'vfx_vortex_mat',
      albedoTexture: particleSoftTex,
      tintR: 0.85,
      tintG: 0.25,
      tintB: 1.0,
      emissiveStrength: 5.5,
      roughness: 0.2,
      metallic: 0.0,
      alphaMode: AlphaMode.blended,
    ),
  );

  final vfxConfettiMat = app.createMaterial(
    const MaterialDefinition(
      key: 'vfx_confetti_mat',
      tintR: 1.0,
      tintG: 0.85,
      tintB: 0.2,
      emissiveStrength: 1.0,
      roughness: 0.3,
      metallic: 0.2,
    ),
  );

  // Wire VFX dynamic particle emitter selector
  final vfxSelect = web.document.querySelector('#vfx-particles-select');
  if (vfxSelect is web.HTMLSelectElement) {
    void updateVfxEmitter(String value) {
      app.clearEmitters();
      switch (value) {
        case 'campfire':
          app.addEmitter(
            ParticlePresets.campfire(
              mesh: particleQuadMesh,
              material: vfxFireMat,
              origin: const Vec3(0, -0.9, 0),
            ),
          );
        case 'fireworks':
          app.addEmitter(
            ParticlePresets.fireworkRocket(
              mesh: particleQuadMesh,
              rocketMaterial: vfxRocketMat,
              sparkMaterial: vfxSparkMat,
              explosionMaterial: vfxFireMat,
              origin: const Vec3(0, -0.9, 0),
            ),
          );
        case 'sparks':
          app.addEmitter(
            ParticlePresets.bouncingSparks(
              mesh: particleQuadMesh,
              material: vfxSparkMat,
              origin: const Vec3(0, 0.6, 0),
              groundHeight: -1.0,
            ),
          );
        case 'vortex':
          app.addEmitter(
            ParticlePresets.swirlingVortex(
              mesh: particleQuadMesh,
              material: vfxVortexMat,
              origin: const Vec3(0, 0.5, 0),
            ),
          );
        case 'fountain':
          app.addEmitter(
            ParticlePresets.waterFountain(
              mesh: particleQuadMesh,
              material: vfxWaterMat,
              origin: const Vec3(0, -0.9, 0),
            ),
          );
        case 'rain':
          app.addEmitter(
            ParticlePresets.rainWithSplashes(
              mesh: particleQuadMesh,
              rainMaterial: vfxWaterMat,
              splashMaterial: vfxSplashMat,
              origin: const Vec3(0, 10, 0),
              groundHeight: -1.0,
            ),
          );
        case 'blizzard':
          app.addEmitter(
            ParticlePresets.blizzard(
              mesh: particleQuadMesh,
              material: snowMat,
              origin: const Vec3(0, 5, 0),
            ),
          );
        case 'warp':
          app.addEmitter(
            ParticlePresets.warpSpeed(
              mesh: particleQuadMesh,
              material: vfxSparkMat,
              origin: const Vec3(0, 2, 0),
            ),
          );
        case 'confetti':
          app.addEmitter(
            ParticlePresets.confetti(
              mesh: particleCubeMesh,
              material: vfxConfettiMat,
              origin: const Vec3(0, 6, 0),
            ),
          );
        case 'none':
        default:
          break;
      }
    }

    vfxSelect.addEventListener(
      'change',
      ((web.Event _) => updateVfxEmitter(vfxSelect.value)).toJS,
    );
  }

  // Enable atmospheric depth fog by default
  app.enableFog(
    color: const LinearColor(0.02, 0.03, 0.05),
    start: 20.0,
    end: 120.0,
    heightFalloff: 0.04,
  );

  // Wire fog selector
  final fogSelect = web.document.querySelector('#fog-select');
  if (fogSelect is web.HTMLSelectElement) {
    fogSelect.addEventListener(
      'change',
      ((web.Event _) {
        switch (fogSelect.value) {
          case 'on':
            app.enableFog(
              color: const LinearColor(0.02, 0.03, 0.05),
              start: 20.0,
              end: 120.0,
              heightFalloff: 0.04,
            );
          case 'volumetric':
            app.enableFog(
              color: const LinearColor(0.03, 0.04, 0.06),
              start: 20.0,
              end: 120.0,
            );
            app.enableVolumetricFog(
              intensity: 1.2,
              dustDensity: 0.04,
              sampleCount: 16,
            );
          case 'off':
            app.disableFog();
        }
      }).toJS,
    );
  }

  // Wire asteroid toggle
  final asteroidToggle = web.document.querySelector('#asteroid-toggle');
  if (asteroidToggle is web.HTMLInputElement) {
    asteroidToggle.addEventListener(
      'change',
      ((web.Event _) {
        asteroidBelt.visibilityMask = asteroidToggle.checked ? -1 : 0;
      }).toJS,
    );
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
        final instStr = hit.instanceIndex != null
            ? ' (Instance #${hit.instanceIndex})'
            : '';
        pickingStatus?.textContent =
            'Selected: $nodeName$instStr | Dist: $distStr | Pt: $pointStr';
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

    // Instanced asteroid belt rotation
    asteroidBelt.rotateY(0.12 * dt);

    // Animate buoyant beacon responding to dynamic Gerstner ocean waves
    final buoyPos = oceanEvaluator.samplePosition(5.2, 5.2, t);
    final buoyNorm = oceanEvaluator.sampleNormal(5.2, 5.2, t);
    buoyNode.position = buoyPos + const Vec3(0, 0.4, 0);
    final buoyTiltAxis = const Vec3(0, 1, 0).cross(buoyNorm);
    if (buoyTiltAxis.lengthSquared > 1e-6) {
      final tiltAngle = math.acos(buoyNorm.y.clamp(-1.0, 1.0));
      buoyNode.rotation = Quat.axisAngle(buoyTiltAxis.normalized, tiltAngle * 0.75);
    }

    // Animate deforming dynamic ocean water surface mesh
    waterSurface.updateWaves(t, oceanEvaluator);

    // Animate 4-probe buoyant vessel physics
    vesselNode.transform = vesselBody.update(dt, t, oceanEvaluator);

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

    // Dynamic autofocus tracking in cinematic tour mode
    if (cameraSelect is web.HTMLSelectElement && cameraSelect.value == 'tour') {
      final rawDof = (dofSlider is web.HTMLInputElement) ? (double.tryParse(dofSlider.value) ?? 0.0) : 0.0;
      final dofStrength = rawDof > 0.0 ? rawDof : 0.40;
      app.setDepthOfField(strength: dofStrength);
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
          intensity: 1.5,
          radius: 8.0,
        ),
        PointLight(
          id: 1,
          position: p1,
          color: const LinearColor(0.25, 0.5, 1.0),
          intensity: 1.5,
          radius: 8.0,
        ),
        PointLight(
          id: 2,
          position: p2,
          color: const LinearColor(0.2, 1.0, 0.45),
          intensity: 1.2,
          radius: 7.5,
        ),
        PointLight(
          id: 3,
          position: p3,
          color: const LinearColor(1.0, 0.85, 0.35),
          intensity: 1.6,
          radius: 9.0,
        ),
      ],
    );

    // Continuous dynamic solar time progression
    if (solarRunning && !isUserDraggingSolar) {
      // 1x speed: 1 full 24h cycle every 90 seconds (0.2667 hr/sec)
      solarTimeHours = (solarTimeHours + dt * 0.2667 * solarSpeed) % 24.0;
      app.setSolarTime(solarTimeHours, cloudCover01: 0.25);
      if (solarSlider is web.HTMLInputElement) {
        solarSlider.value = solarTimeHours.toStringAsFixed(2);
      }
      updateSolarDisplay();
    }
  };

  // Global Keyboard Shortcuts
  web.window.addEventListener(
    'keydown',
    ((web.KeyboardEvent e) {
      final activeTag = web.document.activeElement?.tagName.toLowerCase();
      if (activeTag == 'input' || activeTag == 'select') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          solarRunning = !solarRunning;
          if (solarPlayPauseBtn is web.HTMLButtonElement) {
            solarPlayPauseBtn.innerText = solarRunning ? '⏸ Pause Time' : '▶ Play Time';
          }
        case '1':
          switchTopic('time');
        case '2':
          switchTopic('camera');
        case '3':
          switchTopic('materials');
        case '4':
          switchTopic('vfx');
        case 't':
        case 'T':
          solarTimeHours = (solarTimeHours + 3.0) % 24.0;
          if (solarSlider is web.HTMLInputElement) {
            solarSlider.value = solarTimeHours.toStringAsFixed(2);
          }
          applySolarTime();
        case 'c':
        case 'C':
          if (cameraSelect is web.HTMLSelectElement) {
            final nextIdx = (cameraSelect.selectedIndex + 1) % cameraSelect.options.length;
            cameraSelect.selectedIndex = nextIdx;
            cameraSelect.dispatchEvent(web.Event('change'));
          }
        case 'm':
        case 'M':
          final matSelect = web.document.querySelector('#material-select');
          if (matSelect is web.HTMLSelectElement) {
            final nextIdx = (matSelect.selectedIndex + 1) % matSelect.options.length;
            matSelect.selectedIndex = nextIdx;
            matSelect.dispatchEvent(web.Event('change'));
          }
      }
    }).toJS,
  );

  app.start();
}
