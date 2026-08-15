import 'dart:js_interop';

import 'package:pixeldart/pixeldart_advanced.dart';
import 'package:pixeldart/rendering/webgl/webgl2_renderer_factory.dart';
import 'package:web/web.dart' as web;

void main() async {
  final canvas = web.document.querySelector('#minimal-canvas');
  if (canvas is! web.HTMLCanvasElement) return;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  final renderer = const WebGl2RendererFactory().create(canvas);
  if (renderer == null) {
    canvas
      ..setAttribute('data-renderer-state', 'no-webgl2')
      ..setAttribute('data-renderer-backend', 'legacy')
      ..setAttribute('data-renderer-fallback', 'true')
      ..setAttribute('data-renderer-fallback-reason', 'webgl2 unavailable');
    return;
  }
  final requestedProfile = Uri.base.queryParameters['profile'] ?? 'safe';
  final profile = switch (requestedProfile) {
    'standard' => QualityProfile.minimal,
    'high' => QualityProfile.clean,
    _ => QualityProfile.safe,
  };
  final configuration = RendererConfiguration(
    profile: profile,
    internalWidth: 384,
    internalHeight: 216,
    // The minimal host intentionally keeps standard at single-sample until
    // its optional graph has a complete resolve path; high is the exercised
    // multisample profile in this probe.
    sampleCount: profile.kind == QualityProfileKind.safe ? 1 :
        (profile.kind == QualityProfileKind.high ? 2 : 1),
    shadowMapCount: profile == QualityProfile.safe ? 0 : 1,
  );
  final surface = SurfaceMetrics(
    cssWidth: canvas.width,
    cssHeight: canvas.height,
    pixelWidth: canvas.width,
    pixelHeight: canvas.height,
  );
  String? profileFallbackReason;
  try {
    await renderer.initialize(configuration, surface);
  } catch (error) {
    if (profile == QualityProfile.safe) rethrow;
    profileFallbackReason = '${profile.kind.name} profile failed: $error';
    await renderer.initialize(RendererConfiguration.safe, surface);
  }
  final world = renderer.createWorld();
  final projection = Mat4.perspective(
    fovYRadians: 1.0,
    aspect: canvas.width / canvas.height,
    near: 0.1,
    far: 100,
  );
  final camera = CameraView(
    view: Mat4.identity(),
    projection: projection,
    viewProjection: projection,
    eye: Vec3.zero,
    forward: const Vec3(0, 0, 1),
    near: 0.1,
    far: 100,
    aspect: canvas.width / canvas.height,
  );
  renderer.beginFrame(
    world,
    FrameInput(
      camera: camera,
      environment: const FrameEnvironment(clearColor: LinearColor(0.03, 0.03, 0.04)),
      post: PostProcessState.off,
      frameIndex: 0,
      historyEpoch: 0,
      noiseSeed: 0,
      timeSeconds: 0,
    ),
  );
  renderer.endFrame();
  canvas
    ..setAttribute('data-renderer-state', renderer.state.name)
    ..setAttribute('data-renderer-first-frame', 'true')
    ..setAttribute('data-renderer-backend', 'pixeldart')
    ..setAttribute('data-renderer-requested-profile', requestedProfile)
    ..setAttribute('data-renderer-effective-profile', renderer.configuration.profile.kind.name)
    ..setAttribute('data-renderer-profile-fallback', profileFallbackReason ?? 'false')
    ..setAttribute('data-renderer-frames', '1')
    ..setAttribute('data-renderer-surface', '${canvas.width}x${canvas.height}');

  var frameIndex = 1;
  var historyEpoch = 0;
  var contextRestoredPending = false;
  void resize() {
    final width = canvas.clientWidth > 0 ? canvas.clientWidth : canvas.width;
    final height = canvas.clientHeight > 0 ? canvas.clientHeight : canvas.height;
    if (width == canvas.width && height == canvas.height) return;
    canvas.width = width;
    canvas.height = height;
    try {
      renderer.resize(
        SurfaceMetrics(
          cssWidth: width,
          cssHeight: height,
          pixelWidth: width,
          pixelHeight: height,
        ),
      );
      canvas.setAttribute('data-renderer-surface', '${width}x$height');
    } catch (error) {
      canvas.setAttribute('data-renderer-resize-error', '$error');
    }
  }

  web.window.addEventListener('resize', ((web.Event _) => resize()).toJS);
  canvas.addEventListener(
    'webglcontextrestored',
    ((web.Event _) {
      contextRestoredPending = true;
      historyEpoch++;
    }).toJS,
  );
  void tick(num timeMs) {
    resize();
    if (renderer.state != RendererState.contextLost || contextRestoredPending) {
      try {
        final frame = FrameInput(
          camera: camera,
          environment: const FrameEnvironment(
            clearColor: LinearColor(0.03, 0.03, 0.04),
          ),
          post: PostProcessState.off,
          frameIndex: ++frameIndex,
          historyEpoch: historyEpoch,
          noiseSeed: frameIndex,
          timeSeconds: timeMs / 1000,
        );
        renderer.beginFrame(world, frame);
        renderer.endFrame();
        contextRestoredPending = false;
        canvas.removeAttribute('data-renderer-frame-error');
      } catch (error) {
        canvas.setAttribute('data-renderer-frame-error', '$error');
        // SceneRendererImpl exposes contextLost as a state transition; the
        // next frame after browser restoration rehydrates resources.
        if (renderer.state == RendererState.contextLost) historyEpoch++;
      }
    }
    canvas
      ..setAttribute('data-renderer-state', renderer.state.name)
      ..setAttribute('data-renderer-frames', '$frameIndex');
    web.window.requestAnimationFrame(tick.toJS);
  }

  web.window.requestAnimationFrame(tick.toJS);
}
