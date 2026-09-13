import 'dart:js_interop';
import 'dart:typed_data';

import 'package:web/web.dart' as web;

import '../assets/glb_decoder.dart';

import '../api/capabilities.dart';
import '../api/effects.dart';
import '../api/frame.dart';
import '../api/frame_sequencer.dart';
import '../api/handles.dart';
import '../api/host_bootstrap.dart';
import '../api/lights.dart';
import '../api/materials.dart';
import '../api/mesh.dart';
import '../api/renderer.dart';
import '../api/scene.dart';
import '../api/settings.dart';
import '../api/stats.dart';
import '../atmosphere/solar_cycle.dart';
import '../camera/camera_controller.dart';
import '../camera/camera_shake.dart';
import '../camera/cinematic_tour_camera.dart';
import '../camera/fly_camera.dart';
import '../camera/orbit_camera.dart';
import '../camera/smooth_follow_camera.dart';
import '../math/ray.dart';
import '../math/vec.dart';
import '../particles/atmospheric_particles.dart';
import '../particles/particle_emitter.dart';
import '../scene/animation.dart';
import '../scene/scene_node.dart';
import 'webgl2_renderer_factory.dart';
export 'device_api.dart' show GpuTextureWrap, GpuTextureFilter;

/// Per-frame callback context passed to host update listeners.
final class FrameContext {
  final double timeSeconds;
  final double deltaTime;
  final int frameIndex;
  final RenderWorld world;
  final ResourceLibrary resources;
  final RenderEncoder encoder;
  CameraView camera;
  FrameEnvironment environment;
  PostProcessState post;

  FrameContext({
    required this.timeSeconds,
    required this.deltaTime,
    required this.frameIndex,
    required this.world,
    required this.resources,
    required this.encoder,
    required this.camera,
    this.environment = const FrameEnvironment(
      clearColor: LinearColor(0.03, 0.03, 0.04),
    ),
    this.post = PostProcessState.off,
  });
}

/// High-level declarative application harness for browser 3D rendering.
final class PixeldartApp {
  final web.HTMLCanvasElement canvas;
  final SceneRenderer renderer;
  final RenderWorld world;
  final FrameSequencer sequencer;
  final SceneNode root = SceneNode.group(name: 'root');

  SceneNode get scene => root;

  FrameEnvironment environment = const FrameEnvironment(
    clearColor: LinearColor(0.03, 0.03, 0.04),
  );
  PostProcessState post = const PostProcessState();
  bool showStats = false;

  SurfaceMetrics _surface;
  CameraController? cameraController;
  OrbitCameraController? get orbitCamera =>
      cameraController is OrbitCameraController
          ? cameraController as OrbitCameraController
          : null;
  FlyCameraController? get flyCamera =>
      cameraController is FlyCameraController
          ? cameraController as FlyCameraController
          : null;
  SmoothFollowCameraController? get followCamera =>
      cameraController is SmoothFollowCameraController
          ? cameraController as SmoothFollowCameraController
          : null;

  /// Active procedural camera shake engine.
  final CameraShakeEngine shakeEngine = CameraShakeEngine();

  /// Current evaluated astronomical solar state, if solar time is active.
  SolarLightingState? currentSolarState;
  final Set<String> _pressedKeys = {};

  /// Active animation player for scene timelines and tweens.
  final AnimationPlayer animations = AnimationPlayer();

  /// Plays [clip] using the internal [animations] player.
  void playAnimation(AnimationClip clip, {double speed = 1.0}) {
    animations.play(clip, speed: speed);
  }

  final List<AtmosphericParticleField> _particleFields = [];

  /// Unmodifiable view of registered atmospheric particle fields.
  List<AtmosphericParticleField> get particleFields =>
      List.unmodifiable(_particleFields);

  /// Registers an atmospheric particle field for automatic per-frame rendering.
  void addParticleField(AtmosphericParticleField field) {
    _particleFields.add(field);
  }

  /// Removes an atmospheric particle field.
  void removeParticleField(AtmosphericParticleField field) {
    _particleFields.remove(field);
  }

  /// Clears all registered atmospheric particle fields.
  void clearParticleFields() {
    _particleFields.clear();
  }

  final List<ParticleEmitter> _emitters = [];

  /// Unmodifiable view of registered dynamic particle emitters.
  List<ParticleEmitter> get emitters => List.unmodifiable(_emitters);

  /// Registers a dynamic particle emitter for automatic simulation and rendering.
  void addEmitter(ParticleEmitter emitter) {
    _emitters.add(emitter);
  }

  /// Removes a registered dynamic particle emitter.
  void removeEmitter(ParticleEmitter emitter) {
    _emitters.remove(emitter);
  }

  /// Clears all registered particle emitters.
  void clearEmitters() {
    _emitters.clear();
  }

  void Function(FrameContext ctx)? onFrame;
  bool _running = false;
  double _lastTimeSeconds = 0.0;
  bool _contextLost = false;
  int? _rafHandle;

  bool _isPointerDown = false;
  int _activeButton = 0;
  double _lastPointerX = 0.0;
  double _lastPointerY = 0.0;
  web.HTMLDivElement? _statsElement;
  double _fpsAccumTime = 0.0;
  int _fpsAccumFrames = 0;
  double _currentFps = 0.0;

  PixeldartApp._({
    required this.canvas,
    required this.renderer,
    required this.world,
    required this.sequencer,
    required this._surface,
  });

  /// Mounts Pixeldart onto [canvas], performing bootstrap and sizing.
  static Future<PixeldartApp?> mount(
    web.HTMLCanvasElement canvas, {
    QualityProfile requestedProfile = QualityProfile.clean,
    double maxDevicePixelRatio = 2.0,
    RendererConfiguration Function(QualityProfile)? configBuilder,
    bool showStats = false,
    bool enableOrbitControls = true,
  }) async {
    final renderer = const WebGl2RendererFactory().create(canvas);
    if (renderer == null) return null;

    final cssW = canvas.clientWidth > 0 ? canvas.clientWidth : canvas.width;
    final cssH = canvas.clientHeight > 0 ? canvas.clientHeight : canvas.height;
    final surface = SurfaceMetrics.forCanvas(
      cssWidth: cssW,
      cssHeight: cssH,
      devicePixelRatio: web.window.devicePixelRatio.toDouble(),
      maxDevicePixelRatio: maxDevicePixelRatio,
    );
    canvas.width = surface.pixelWidth;
    canvas.height = surface.pixelHeight;

    await bootstrapRenderer(
      renderer: renderer,
      surface: surface,
      ladder: defaultProfileLadder(requestedProfile),
      configurationFor:
          configBuilder ??
          (p) => RendererConfiguration(
            profile: p,
            internalWidth: surface.pixelWidth,
            internalHeight: surface.pixelHeight,
            sampleCount: p.kind == QualityProfileKind.high ? 2 : 1,
            shadowMapCount: p == QualityProfile.safe ? 0 : 1,
          ),
    );

    final world = renderer.createWorld();
    final sequencer = FrameSequencer();

    final app = PixeldartApp._(
      canvas: canvas,
      renderer: renderer,
      world: world,
      sequencer: sequencer,
      surface: surface,
    );

    if (enableOrbitControls) {
      app.cameraController = OrbitCameraController();
    }
    app.showStats = showStats;

    app._installListeners();
    return app;
  }

  ResourceLibrary get resources => renderer.resources;
  SurfaceMetrics get surface => _surface;

  MeshHandle createMesh(MeshData data, {String? debugLabel}) =>
      renderer.resources.registerMesh(data, debugLabel: debugLabel);
  MaterialHandle createMaterial(MaterialDefinition def) =>
      renderer.resources.registerMaterial(def);
  TextureHandle createTexture({
    required int width,
    required int height,
    int layers = 1,
    bool hasMips = false,
    GpuTextureFilter minFilter = GpuTextureFilter.linear,
    GpuTextureFilter magFilter = GpuTextureFilter.linear,
    GpuTextureWrap wrap = GpuTextureWrap.clampToEdge,
    double anisotropy = 1,
    Uint8List? pixels,
    String? debugLabel,
  }) =>
      renderer.resources.registerTexture(
        width: width,
        height: height,
        layers: layers,
        hasMips: hasMips,
        minFilter: minFilter,
        magFilter: magFilter,
        wrap: wrap,
        anisotropy: anisotropy,
        pixels: pixels,
        debugLabel: debugLabel,
      );

  /// Registers raw RGBA8 pixel data (from [ProceduralTextures] or custom source)
  /// as a GPU texture handle with optional mipmaps and anisotropic filtering.
  TextureHandle createProceduralTexture(
    Uint8List pixels, {
    required int width,
    required int height,
    bool hasMips = true,
    double anisotropy = 16,
    GpuTextureWrap wrap = GpuTextureWrap.repeat,
    GpuTextureFilter minFilter = GpuTextureFilter.linearMipmapLinear,
    GpuTextureFilter magFilter = GpuTextureFilter.linear,
    String? debugLabel,
  }) {
    final handle = createTexture(
      width: width,
      height: height,
      pixels: pixels,
      hasMips: hasMips,
      anisotropy: anisotropy,
      wrap: wrap,
      minFilter: minFilter,
      magFilter: magFilter,
      debugLabel: debugLabel,
    );
    if (hasMips) {
      resources.finalizeTextureMips(handle);
    }
    return handle;
  }

  /// Current skybox declaration configured on [environment].
  SkyboxDeclaration? get skybox => environment.skybox;

  /// Sets or clears the skybox declaration on [environment].
  set skybox(SkyboxDeclaration? value) {
    environment = environment.copyWith(skybox: value);
  }

  /// Sets the skybox declaration on [environment].
  void setSkybox(SkyboxDeclaration? skybox) {
    this.skybox = skybox;
  }

  /// Raycasts against the scene hierarchy using client window coordinates [clientX], [clientY].
  /// Returns the closest [RaycastHit], or `null` if nothing was hit.
  RaycastHit? pick(double clientX, double clientY) {
    final rect = canvas.getBoundingClientRect();
    final x = clientX - rect.left;
    final y = clientY - rect.top;
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return null;

    final camCtrl = cameraController;
    final aspect = _surface.pixelWidth / _surface.pixelHeight;
    final camera = camCtrl != null
        ? camCtrl.toCameraView(aspect)
        : CameraView.look(
            eye: const Vec3(0, 2, 5),
            forward: const Vec3(0, -0.2, -1),
            fovYRadians: 1.0,
            aspect: aspect,
            near: 0.1,
            far: 200,
          );

    final ray = camera.screenPointToRay(
      x,
      y,
      rect.width.toInt(),
      rect.height.toInt(),
    );

    return scene.raycast(ray);
  }

  /// Sets the active camera controller to orbit controls around [target].
  OrbitCameraController useOrbitCamera({
    Vec3 target = const Vec3(0, 0, 0),
    double distance = 5.0,
  }) {
    final ctrl = OrbitCameraController(target: target, distance: distance);
    cameraController = ctrl;
    return ctrl;
  }

  /// Sets the active camera controller to first-person fly controls at [position].
  FlyCameraController useFlyCamera({
    Vec3 position = const Vec3(0, 1.8, 5),
    double moveSpeed = 8.0,
  }) {
    final ctrl = FlyCameraController(position: position, moveSpeed: moveSpeed);
    cameraController = ctrl;
    return ctrl;
  }

  /// Sets the active camera controller to third-person smooth follow controls tracking [target].
  SmoothFollowCameraController useFollowCamera({
    SceneNode? target,
    Vec3 targetPosition = Vec3.zero,
    Vec3 targetOffset = const Vec3(0, 0.8, 0),
    double distance = 5.5,
    double height = 1.8,
    double damping = 6.0,
  }) {
    final ctrl = SmoothFollowCameraController(
      targetNode: target,
      targetPosition: targetPosition,
      targetOffset: targetOffset,
      distance: distance,
      height: height,
      positionDamping: damping,
    );
    cameraController = ctrl;
    return ctrl;
  }

  /// Sets the active camera controller to an automated cinematic tour along [waypoints].
  CinematicTourCameraController useCinematicTour({
    required List<CameraWaypoint> waypoints,
    double duration = 20.0,
    bool loop = true,
    double breathingAmplitude = 0.04,
    double breathingSpeed = 1.2,
  }) {
    final ctrl = CinematicTourCameraController(
      waypoints: waypoints,
      duration: duration,
      loop: loop,
      breathingAmplitude: breathingAmplitude,
      breathingSpeed: breathingSpeed,
    );
    cameraController = ctrl;
    return ctrl;
  }

  /// Triggers a procedural trauma-based camera shake with [trauma] in [0, 1].
  void shakeCamera({double trauma = 0.5}) {
    shakeEngine.addTrauma(trauma);
  }

  /// Evaluates and applies astronomical solar lighting and skybox colors for [timeHours] (0 to 24).
  void setSolarTime(
    double timeHours, {
    double latitudeRadians = 0.65,
    double cloudCover01 = 0.0,
    double turbidity = 2.0,
    double solarIntensity = 2.5,
  }) {
    final input = SolarCycleInput(
      timeHours: timeHours,
      latitudeRadians: latitudeRadians,
      solarDeclinationRadians: 0.35,
      cloudCover01: cloudCover01,
      aerosolTurbidity: turbidity,
      solarIntensity: solarIntensity,
    );
    final state = SolarCycleEngine.evaluate(input);
    currentSolarState = state;

    // Update directional light, ambient light, and sky reflection
    final sky = environment.skybox;
    final zenithColor = LinearColor(
      (state.fogColor.r * 0.4 + 0.02).clamp(0.0, 1.0),
      (state.fogColor.g * 0.5 + 0.04).clamp(0.0, 1.0),
      (state.fogColor.b * 0.8 + 0.08).clamp(0.0, 1.0),
    );
    final reflection = LinearColor(
      (zenithColor.r * 0.5 + state.fogColor.r * 0.5).clamp(0.0, 1.0),
      (zenithColor.g * 0.5 + state.fogColor.g * 0.5).clamp(0.0, 1.0),
      (zenithColor.b * 0.5 + state.fogColor.b * 0.5).clamp(0.0, 1.0),
    );

    environment = environment.copyWith(
      directionalLight: state.directionalLight,
      ambientColor: state.ambientColor,
      ambientIntensity: state.ambientIntensity,
      fogColor: state.fogColor,
      reflectionColor: reflection,
    );

    // Update skybox declaration colors to match solar phase
    if (sky != null) {
      final horizonColor = state.fogColor;
      environment = environment.copyWith(
        skybox: SkyboxDeclaration(
          assetId: sky.assetId,
          texture: sky.texture,
          zenith: zenithColor,
          horizon: horizonColor,
          ground: LinearColor(
            (state.fogColor.r * 0.2).clamp(0.0, 1.0),
            (state.fogColor.g * 0.2).clamp(0.0, 1.0),
            (state.fogColor.b * 0.2).clamp(0.0, 1.0),
          ),
          horizonGlow: (state.horizonVisibility01 * 0.25).clamp(0.0, 1.0),
          starDensity: ((1.0 - state.twilightFactor01) * 0.008).clamp(0.0, 0.1),
          rotationRadians: sky.rotationRadians,
          exposure: sky.exposure,
          textureIsSrgb: sky.textureIsSrgb,
          cloudCoverage: sky.cloudCoverage,
          cloudDensity: sky.cloudDensity,
          cloudBaseHeight: sky.cloudBaseHeight,
          cloudThickness: sky.cloudThickness,
          cloudScale: sky.cloudScale,
          cloudWindX: sky.cloudWindX,
          cloudWindZ: sky.cloudWindZ,
          cloudPhase: sky.cloudPhase,
          cloudDetail: sky.cloudDetail,
          cloudSilverLining: sky.cloudSilverLining,
          cloudSampleCount: sky.cloudSampleCount,
        ),
      );
    }
  }

  /// Convenience helper to adjust exposure.
  void setExposure(double value) {
    post = post.copyWith(exposure: value);
  }

  /// Convenience helper to adjust vignette strength.
  void setVignette(double strength) {
    post = post.copyWith(vignette: strength);
  }

  /// Convenience helper to adjust film grain strength.
  void setGrain(double strength) {
    post = post.copyWith(grain: strength);
  }

  /// Convenience helper to adjust or enable bloom post-processing.
  void enableBloom({double strength = 0.30}) {
    post = post.copyWith(bloomStrength: strength);
  }

  /// Convenience helper to adjust or enable screen-space ambient occlusion.
  void enableSsao({double strength = 0.75}) {
    post = post.copyWith(ssaoStrength: strength);
  }

  /// Convenience helper to set bloom strength.
  void setBloom(double strength) => enableBloom(strength: strength);

  /// Convenience helper to set SSAO strength.
  void setSsao(double strength) => enableSsao(strength: strength);

  /// Configures Depth of Field post-processing blur.
  void setDepthOfField({double strength = 0.70}) {
    post = post.copyWith(depthOfFieldStrength: strength);
  }

  /// Disables Depth of Field post-processing.
  void disableDepthOfField() {
    post = post.copyWith(depthOfFieldStrength: 0.0);
  }

  /// Convenience helper to change tone mapping mode.
  void setToneMapping(ToneMappingMode mode) {
    post = post.copyWith(toneMapping: mode);
  }

  /// Configures linear distance fog with optional exponential height falloff.
  void enableFog({
    LinearColor color = const LinearColor(0.04, 0.05, 0.07),
    double start = 5.0,
    double end = 60.0,
    double? density,
    double? heightFalloff,
  }) {
    environment = environment.copyWith(
      fogColor: color,
      fogStart: start,
      fogEnd: end,
      fogDensity: density,
      fogHeightFalloff: heightFalloff,
    );
  }

  /// Disables distance and height fog.
  void disableFog() {
    environment = environment.copyWith(
      fogStart: 10000.0,
      fogEnd: 10001.0,
      fogDensity: null,
      fogHeightFalloff: null,
    );
  }

  /// Configures volumetric participating medium and light shafts.
  void enableVolumetricFog({
    LinearColor albedo = LinearColor.white,
    double intensity = 1.0,
    double heightFalloff = 0.02,
    double dustDensity = 0.05,
    double anisotropy = 0.70,
    int sampleCount = 16,
  }) {
    environment = environment.copyWith(
      volumetricAlbedo: albedo,
      volumetricIntensity: intensity,
      volumetricHeightFalloff: heightFalloff,
      volumetricDustDensity: dustDensity,
      volumetricAnisotropy: anisotropy,
      volumetricSampleCount: sampleCount,
    );
  }

  /// Decodes GLB bytes synchronously (geometry and basic material parameters),
  /// attaches them to the scene hierarchy, and returns the root [SceneNode].
  SceneNode loadGlb(Uint8List bytes) {
    final result = GlbDecoder.decode(bytes);
    final meshHandles = <MeshHandle>[];
    for (final meshData in result.meshes) {
      meshHandles.add(createMesh(meshData));
    }
    final materialHandles = <MaterialHandle>[];
    for (final matDef in result.materials) {
      materialHandles.add(createMaterial(matDef));
    }

    var meshCursor = 0;
    result.rootNode.traverse((node) {
      if (node.sortTiebreaker >= 0 && meshCursor < meshHandles.length) {
        node.mesh = meshHandles[meshCursor];
        final matIdx = node.sortTiebreaker;
        node.material = matIdx < materialHandles.length
            ? materialHandles[matIdx]
            : materialHandles.first;
        meshCursor++;
      }
    });

    scene.addChild(result.rootNode);
    return result.rootNode;
  }

  /// Asynchronously decodes GLB bytes, registers meshes, embedded textures, and materials,
  /// attaches them to the scene hierarchy, and returns the root [SceneNode].
  Future<SceneNode> loadGlbAsync(Uint8List bytes) async {
    final result = GlbDecoder.decode(bytes);
    final meshHandles = <MeshHandle>[];
    for (final meshData in result.meshes) {
      meshHandles.add(createMesh(meshData));
    }

    // Register embedded textures
    final textureHandles = <TextureHandle>[];
    for (final img in result.images) {
      final tex = await TextureLoader.loadFromBytes(
        resources: resources,
        bytes: img.bytes,
        mimeType: img.mimeType,
        debugLabel: img.name,
      );
      textureHandles.add(tex);
    }

    // Build materials with texture bindings
    final materialHandles = <MaterialHandle>[];
    for (var i = 0; i < result.materials.length; i++) {
      var matDef = result.materials[i];
      if (i < result.materialTextures.length) {
        final texIndices = result.materialTextures[i];
        TextureHandle? albedo;
        TextureHandle? normal;
        TextureHandle? orm;
        TextureHandle? emissive;

        final aIdx = texIndices.albedoTextureIndex;
        if (aIdx != null && aIdx < textureHandles.length) {
          albedo = textureHandles[aIdx];
        }
        final nIdx = texIndices.normalTextureIndex;
        if (nIdx != null && nIdx < textureHandles.length) {
          normal = textureHandles[nIdx];
        }
        final oIdx = texIndices.ormTextureIndex;
        if (oIdx != null && oIdx < textureHandles.length) {
          orm = textureHandles[oIdx];
        }
        final eIdx = texIndices.emissiveTextureIndex;
        if (eIdx != null && eIdx < textureHandles.length) {
          emissive = textureHandles[eIdx];
        }

        matDef = MaterialDefinition(
          key: matDef.key,
          albedoTexture: albedo,
          normalTexture: normal,
          ormTexture: orm,
          emissiveTexture: emissive,
          tintR: matDef.tintR,
          tintG: matDef.tintG,
          tintB: matDef.tintB,
          roughness: matDef.roughness,
          metallic: matDef.metallic,
          emissiveStrength: matDef.emissiveStrength,
          normalStrength: matDef.normalStrength,
          occlusionStrength: matDef.occlusionStrength,
          clearcoatStrength: matDef.clearcoatStrength,
          clearcoatRoughness: matDef.clearcoatRoughness,
          alphaMode: matDef.alphaMode,
          alphaCutoff: matDef.alphaCutoff,
          doubleSided: matDef.doubleSided,
        );
      }
      materialHandles.add(createMaterial(matDef));
    }

    var meshCursor = 0;
    result.rootNode.traverse((node) {
      if (node.sortTiebreaker >= 0 && meshCursor < meshHandles.length) {
        node.mesh = meshHandles[meshCursor];
        final matIdx = node.sortTiebreaker;
        node.material = matIdx < materialHandles.length
            ? materialHandles[matIdx]
            : materialHandles.first;
        meshCursor++;
      }
    });

    scene.addChild(result.rootNode);
    return result.rootNode;
  }

  /// Asynchronously fetches a GLB file from [url], decodes meshes and embedded textures,
  /// and attaches the textured hierarchy to the scene.
  Future<SceneNode> loadGlbFromUrl(String url) async {
    final response = await web.window.fetch(url.toJS).toDart;
    final buffer = await response.arrayBuffer().toDart;
    final bytes = buffer.toDart.asUint8List();
    return loadGlbAsync(bytes);
  }

  void _installListeners() {
    web.window.addEventListener('resize', ((web.Event _) => _resize()).toJS);
    canvas.addEventListener(
      'webglcontextlost',
      ((web.Event e) {
        _contextLost = true;
        sequencer.invalidateHistory('gl context lost');
      }).toJS,
    );
    canvas.addEventListener(
      'webglcontextrestored',
      ((web.Event _) {
        _contextLost = false;
        sequencer.invalidateHistory('gl context restored');
      }).toJS,
    );
    canvas.addEventListener(
      'contextmenu',
      ((web.Event e) {
        e.preventDefault();
      }).toJS,
    );
    canvas.addEventListener(
      'mousedown',
      ((web.Event e) {
        if (e is web.MouseEvent) {
          _isPointerDown = true;
          _activeButton = e.button;
          _lastPointerX = e.clientX.toDouble();
          _lastPointerY = e.clientY.toDouble();
        }
      }).toJS,
    );
    web.window.addEventListener(
      'mousemove',
      ((web.Event e) {
        if (_isPointerDown && e is web.MouseEvent && cameraController != null) {
          final x = e.clientX.toDouble();
          final y = e.clientY.toDouble();
          final dx = x - _lastPointerX;
          final dy = y - _lastPointerY;
          _lastPointerX = x;
          _lastPointerY = y;

          final ctrl = cameraController;
          if (ctrl is OrbitCameraController) {
            if (_activeButton == 0 && !e.shiftKey) {
              ctrl.rotate(dx * 0.006, dy * 0.006);
            } else {
              ctrl.pan(
                -dx * 0.003 * ctrl.distance,
                dy * 0.003 * ctrl.distance,
              );
            }
          } else if (ctrl is FlyCameraController) {
            ctrl.look(dx * ctrl.lookSpeed, dy * ctrl.lookSpeed);
          } else if (ctrl is SmoothFollowCameraController) {
            ctrl.orbit(dx * 0.006, -dy * 0.006);
          }
        }
      }).toJS,
    );
    web.window.addEventListener(
      'mouseup',
      ((web.Event _) {
        _isPointerDown = false;
      }).toJS,
    );
    canvas.addEventListener(
      'wheel',
      ((web.Event e) {
        if (e is web.WheelEvent && cameraController != null) {
          e.preventDefault();
          final ctrl = cameraController;
          if (ctrl is OrbitCameraController) {
            ctrl.zoom(e.deltaY * 0.003);
          } else if (ctrl is FlyCameraController) {
            ctrl.moveForward(-e.deltaY * 0.002);
          } else if (ctrl is SmoothFollowCameraController) {
            ctrl.zoom(e.deltaY * 0.003);
          }
        }
      }).toJS,
    );
    web.window.addEventListener(
      'keydown',
      ((web.Event e) {
        if (e is web.KeyboardEvent) {
          _pressedKeys.add(e.code.toLowerCase());
          _updateFlyIntent();
        }
      }).toJS,
    );
    web.window.addEventListener(
      'keyup',
      ((web.Event e) {
        if (e is web.KeyboardEvent) {
          _pressedKeys.remove(e.code.toLowerCase());
          _updateFlyIntent();
        }
      }).toJS,
    );
  }

  void _updateFlyIntent() {
    final ctrl = cameraController;
    if (ctrl is FlyCameraController) {
      var fwd = 0.0;
      var rgt = 0.0;
      var up = 0.0;
      if (_pressedKeys.contains('keyw') || _pressedKeys.contains('arrowup')) fwd += 1.0;
      if (_pressedKeys.contains('keys') || _pressedKeys.contains('arrowdown')) fwd -= 1.0;
      if (_pressedKeys.contains('keya') || _pressedKeys.contains('arrowleft')) rgt -= 1.0;
      if (_pressedKeys.contains('keyd') || _pressedKeys.contains('arrowright')) rgt += 1.0;
      if (_pressedKeys.contains('space') || _pressedKeys.contains('keye')) up += 1.0;
      if (_pressedKeys.contains('shiftleft') || _pressedKeys.contains('keyq')) up -= 1.0;
      ctrl.setMovementIntent(forward: fwd, right: rgt, up: up);
    }
  }

  void _resize() {
    final cssW = canvas.clientWidth > 0 ? canvas.clientWidth : canvas.width;
    final cssH = canvas.clientHeight > 0 ? canvas.clientHeight : canvas.height;
    if (cssW == _surface.cssWidth && cssH == _surface.cssHeight) return;

    _surface = _surface.resized(cssWidth: cssW, cssHeight: cssH);
    canvas.width = _surface.pixelWidth;
    canvas.height = _surface.pixelHeight;
    try {
      renderer.resize(_surface);
      sequencer.invalidateHistory('surface resized');
    } catch (_) {}
  }

  /// Starts the requestAnimationFrame render loop.
  void start() {
    if (_running) return;
    _running = true;
    _lastTimeSeconds = 0.0;
    _rafHandle = web.window.requestAnimationFrame(_tick.toJS);
  }

  /// Stops the render loop.
  void stop() {
    _running = false;
    final handle = _rafHandle;
    if (handle != null) {
      web.window.cancelAnimationFrame(handle);
      _rafHandle = null;
    }
  }

  void _tick(num timeMs) {
    if (!_running) return;
    final timeSeconds = timeMs / 1000.0;
    final dt = _lastTimeSeconds > 0 ? timeSeconds - _lastTimeSeconds : 1.0 / 60.0;
    _lastTimeSeconds = timeSeconds;

    _resize();

    if (!_contextLost && renderer.state != RendererState.contextLost) {
      // Step active animation clips and timelines
      animations.update(dt);

      // Synchronize scene graph tree to retained world
      root.syncToWorld(world);

      final camCtrl = cameraController;
      if (camCtrl != null) {
        camCtrl.update(dt);
      }

      shakeEngine.update(dt);

      final aspect = _surface.pixelWidth / _surface.pixelHeight;
      var camera = camCtrl != null
          ? camCtrl.toCameraView(aspect)
          : CameraView.look(
              eye: const Vec3(0, 2, 5),
              forward: const Vec3(0, -0.2, -1),
              fovYRadians: 1.0,
              aspect: aspect,
              near: 0.1,
              far: 200,
            );
      camera = shakeEngine.applyTo(camera);

      final frameInput = sequencer.next(
        camera: camera,
        environment: environment,
        post: post,
        timeSeconds: timeSeconds,
      );

      final encoder = renderer.beginFrame(world, frameInput);

      // Submit registered atmospheric particle fields
      for (var i = 0; i < _particleFields.length; i++) {
        _particleFields[i].submit(encoder, frameInput);
      }

      // Update and submit registered dynamic particle emitters
      for (var i = 0; i < _emitters.length; i++) {
        _emitters[i].update(dt);
        _emitters[i].submit(encoder, frameInput);
      }
      final ctx = FrameContext(
        timeSeconds: timeSeconds,
        deltaTime: dt,
        frameIndex: sequencer.frameIndex,
        world: world,
        resources: resources,
        encoder: encoder,
        camera: camera,
        environment: environment,
        post: post,
      );

      onFrame?.call(ctx);
      final stats = renderer.endFrame();
      if (showStats) {
        _updateStats(stats, dt);
      }
    }

    _rafHandle = web.window.requestAnimationFrame(_tick.toJS);
  }

  void _updateStats(FrameStats stats, double dt) {
    _fpsAccumTime += dt;
    _fpsAccumFrames += 1;
    if (_fpsAccumTime >= 0.5) {
      _currentFps = _fpsAccumFrames / _fpsAccumTime;
      _fpsAccumTime = 0.0;
      _fpsAccumFrames = 0;

      var el = _statsElement;
      if (el == null) {
        el = web.document.createElement('div') as web.HTMLDivElement;
        el.style.position = 'absolute';
        el.style.left = '12px';
        el.style.top = '12px';
        el.style.padding = '8px 12px';
        el.style.backgroundColor = 'rgba(10, 12, 16, 0.85)';
        el.style.color = '#00ffaa';
        el.style.fontFamily = 'monospace';
        el.style.fontSize = '12px';
        el.style.lineHeight = '1.4';
        el.style.borderRadius = '4px';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '9999';
        final parent = canvas.parentElement ?? web.document.body;
        parent?.appendChild(el);
        _statsElement = el;
      }

      final ms = (dt * 1000).toStringAsFixed(1);
      final fps = _currentFps.toStringAsFixed(0);
      final kb = (stats.liveGpuBytes / 1024).toStringAsFixed(0);
      el.innerText =
          'FPS: $fps ($ms ms)\n'
          'Draws: ${stats.drawCalls} | Tris: ${stats.trianglesSubmitted}\n'
          'Instances: ${stats.instancesSubmitted} | VRAM: $kb KB';
    }
  }

  void dispose() {
    stop();
    _statsElement?.remove();
    _statsElement = null;
    root.removeFromWorld(world);
    world.dispose();
    renderer.dispose();
  }
}
