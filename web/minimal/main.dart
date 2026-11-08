import 'dart:js_interop';

import 'package:pixeldart/pixeldart_advanced.dart';
import 'package:pixeldart/rendering/webgl/webgl2_renderer_factory.dart';
import 'package:web/web.dart' as web;

/// The smallest host that renders with Pixeldart, and the reference for what a
/// correct integration looks like.
///
/// Everything fiddly here is delegated to the package rather than reimplemented:
/// [bootstrapRenderer] owns the profile fallback ladder, [SurfaceMetrics.forCanvas]
/// owns device-pixel-ratio arithmetic, [CameraView.look] derives its own
/// matrices, and [FrameSequencer] owns frame and history bookkeeping. A host
/// that copies this file gets those four right by construction.
void main() async {
  final canvas = web.document.querySelector('#minimal-canvas');
  if (canvas is! web.HTMLCanvasElement) return;

  final renderer = const WebGl2RendererFactory().create(canvas);
  if (renderer == null) {
    canvas
      ..setAttribute('data-renderer-state', 'renderer-unavailable')
      ..setAttribute('data-renderer-backend', 'pixeldart')
      ..setAttribute('data-renderer-fallback', 'false')
      ..setAttribute('data-renderer-failure-reason', 'webgl2 unavailable');
    return;
  }

  final requestedProfile = Uri.base.queryParameters['profile'] ?? 'safe';
  final requested = switch (requestedProfile) {
    'standard' => QualityProfile.minimal,
    'high' => QualityProfile.clean,
    _ => QualityProfile.safe,
  };

  // One call for the CSS size, the backing-store size, and the ratio between
  // them. Sizing the canvas from its own metrics keeps the two in step.
  var surface = SurfaceMetrics.forCanvas(
    cssWidth: canvas.clientWidth > 0 ? canvas.clientWidth : canvas.width,
    cssHeight: canvas.clientHeight > 0 ? canvas.clientHeight : canvas.height,
    devicePixelRatio: web.window.devicePixelRatio.toDouble(),
  );
  canvas.width = surface.pixelWidth;
  canvas.height = surface.pixelHeight;

  // The ladder tries the requested profile and descends to safe, reporting
  // which rung landed and why the ones above it did not.
  final boot = await bootstrapRenderer(
    renderer: renderer,
    surface: surface,
    ladder: defaultProfileLadder(requested),
    configurationFor: (profile) => RendererConfiguration(
      profile: profile,
      internalWidth: 384,
      internalHeight: 216,
      // The minimal host keeps standard at single-sample until its optional
      // graph has a complete resolve path; high is the exercised multisample
      // profile in this probe.
      sampleCount: profile.kind == QualityProfileKind.high ? 2 : 1,
      shadowMapCount: profile == QualityProfile.safe ? 0 : 1,
    ),
  );

  final world = renderer.createWorld();
  final frames = FrameSequencer();

  // Derived end to end: no hand-multiplied viewProjection to get backwards,
  // and the aspect follows the surface it is actually drawn into.
  CameraView cameraFor(SurfaceMetrics metrics) => CameraView.look(
    eye: const Vec3(0, 0, 0),
    forward: const Vec3(0, 0, 1),
    fovYRadians: 1.0,
    aspect: metrics.pixelWidth / metrics.pixelHeight,
    near: 0.1,
    far: 100,
  );

  const environment = FrameEnvironment(
    clearColor: LinearColor(0.03, 0.03, 0.04),
  );

  void publishState() {
    canvas
      ..setAttribute('data-renderer-state', renderer.state.name)
      ..setAttribute('data-renderer-backend', 'pixeldart')
      ..setAttribute('data-renderer-requested-profile', requestedProfile)
      ..setAttribute(
        'data-renderer-effective-profile',
        renderer.configuration.profile.kind.name,
      )
      ..setAttribute(
        'data-renderer-profile-fallback',
        boot.fallbackReason ?? 'false',
      )
      ..setAttribute('data-renderer-frames', '${frames.frameIndex}')
      ..setAttribute('data-renderer-history-epoch', '${frames.historyEpoch}')
      ..setAttribute(
        'data-renderer-surface',
        '${surface.pixelWidth}x${surface.pixelHeight}',
      );
  }

  renderer.beginFrame(
    world,
    frames.next(
      camera: cameraFor(surface),
      environment: environment,
      post: PostProcessState.off,
      timeSeconds: 0,
    ),
  );
  renderer.endFrame();
  canvas.setAttribute('data-renderer-first-frame', 'true');
  publishState();

  var contextRestoredPending = false;

  void resize() {
    final cssWidth = canvas.clientWidth > 0 ? canvas.clientWidth : canvas.width;
    final cssHeight = canvas.clientHeight > 0
        ? canvas.clientHeight
        : canvas.height;
    if (cssWidth == surface.cssWidth && cssHeight == surface.cssHeight) return;
    surface = surface.resized(cssWidth: cssWidth, cssHeight: cssHeight);
    canvas.width = surface.pixelWidth;
    canvas.height = surface.pixelHeight;
    try {
      renderer.resize(surface);
      // A resize rebuilds the targets temporal effects reproject against, so
      // the previous frame is no longer a valid history source. Hosts that
      // only invalidate on context restore leave stale history in place here.
      frames.invalidateHistory('surface resized');
      canvas.removeAttribute('data-renderer-resize-error');
    } catch (error) {
      canvas.setAttribute('data-renderer-resize-error', '$error');
    }
  }

  web.window.addEventListener('resize', ((web.Event _) => resize()).toJS);
  canvas.addEventListener(
    'webglcontextrestored',
    ((web.Event _) {
      contextRestoredPending = true;
      frames.invalidateHistory('gl context restored');
    }).toJS,
  );

  void tick(num timeMs) {
    resize();
    if (renderer.state != RendererState.contextLost || contextRestoredPending) {
      try {
        renderer.beginFrame(
          world,
          frames.next(
            camera: cameraFor(surface),
            environment: environment,
            post: PostProcessState.off,
            timeSeconds: timeMs / 1000,
          ),
        );
        renderer.endFrame();
        contextRestoredPending = false;
        canvas.removeAttribute('data-renderer-frame-error');
      } catch (error) {
        canvas.setAttribute('data-renderer-frame-error', '$error');
        // SceneRendererImpl exposes contextLost as a state transition; the
        // next frame after browser restoration rehydrates resources.
        if (renderer.state == RendererState.contextLost) {
          frames.invalidateHistory('gl context lost');
        }
      }
    }
    publishState();
    web.window.requestAnimationFrame(tick.toJS);
  }

  web.window.requestAnimationFrame(tick.toJS);
}
