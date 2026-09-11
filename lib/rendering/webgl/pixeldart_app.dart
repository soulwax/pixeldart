import 'dart:js_interop';

import 'package:web/web.dart' as web;

import '../api/capabilities.dart';
import '../api/effects.dart';
import '../api/frame.dart';
import '../api/frame_sequencer.dart';
import '../api/host_bootstrap.dart';
import '../api/lights.dart';
import '../api/renderer.dart';
import '../api/scene.dart';
import '../api/settings.dart';
import '../api/stats.dart';
import '../camera/orbit_camera.dart';
import '../math/vec.dart';
import '../scene/scene_node.dart';
import 'webgl2_renderer_factory.dart';

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

  SurfaceMetrics _surface;
  OrbitCameraController? cameraController;

  void Function(FrameContext ctx)? onFrame;
  bool _running = false;
  double _lastTimeSeconds = 0.0;
  bool _contextLost = false;
  int? _rafHandle;

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

    app._installListeners();
    return app;
  }

  ResourceLibrary get resources => renderer.resources;
  SurfaceMetrics get surface => _surface;

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
      // Synchronize scene graph tree to retained world
      root.syncToWorld(world);

      final camCtrl = cameraController;
      if (camCtrl != null) {
        camCtrl.update(dt);
      }

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

      final frameInput = sequencer.next(
        camera: camera,
        environment: const FrameEnvironment(
          clearColor: LinearColor(0.03, 0.03, 0.04),
        ),
        post: PostProcessState.off,
        timeSeconds: timeSeconds,
      );

      final encoder = renderer.beginFrame(world, frameInput);
      final ctx = FrameContext(
        timeSeconds: timeSeconds,
        deltaTime: dt,
        frameIndex: sequencer.frameIndex,
        world: world,
        resources: resources,
        encoder: encoder,
        camera: camera,
      );

      onFrame?.call(ctx);
      renderer.endFrame();
    }

    _rafHandle = web.window.requestAnimationFrame(_tick.toJS);
  }

  void dispose() {
    stop();
    root.removeFromWorld(world);
    world.dispose();
    renderer.dispose();
  }
}
