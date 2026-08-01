import 'dart:typed_data';

import 'capabilities.dart';
import 'frame.dart';
import 'handles.dart';
import 'materials.dart';
import 'mesh.dart';
import 'scene.dart';
import 'settings.dart';
import 'stats.dart';

/// Declares, loads, and releases shared GPU-backed resources. Owned by one
/// [SceneRenderer]; every [MeshHandle]/[TextureHandle]/[MaterialHandle] it
/// hands out is valid only for that renderer's lifetime (§5.3).
abstract interface class ResourceLibrary {
  MeshHandle registerMesh(MeshData data, {String? debugLabel});
  void releaseMesh(MeshHandle handle);

  MaterialHandle registerMaterial(MaterialDefinition definition);
  void releaseMaterial(MaterialHandle handle);

  /// [pixels] is `null` for a declared-but-not-yet-loaded texture; a
  /// renderer substitutes a built-in fallback (§5.3) until it is set via
  /// [updateTexturePixels].
  TextureHandle registerTexture({
    required int width,
    required int height,
    int layers = 1,
    Uint8List? pixels,
    String? debugLabel,
  });
  void updateTexturePixels(TextureHandle handle, Uint8List pixels);
  void releaseTexture(TextureHandle handle);

  void dispose();
}

/// The reusable renderer API's lifecycle contract (§5.1). Construction
/// stores dependencies but performs no fallible GPU work; [initialize] does
/// that, and callers await it before starting their render loop.
abstract interface class SceneRenderer {
  RendererState get state;
  RenderCapabilities get capabilities;
  RendererHealth get health;
  ResourceLibrary get resources;

  Future<void> initialize(
    RendererConfiguration configuration,
    SurfaceMetrics surface,
  );

  /// Atomically prepares a replacement feature graph between frames; never
  /// compiles or allocates from within [beginFrame]/[endFrame].
  Future<void> configure(RendererConfiguration configuration);

  void resize(SurfaceMetrics surface);

  RenderWorld createWorld();

  /// Illegal before readiness, during context loss, or twice without a
  /// matching [endFrame]/[abortFrame].
  RenderEncoder beginFrame(RenderWorld world, FrameInput frame);

  /// Closes or discards every submitted list even after an optional pass
  /// failure, and returns immediate CPU/counter statistics.
  FrameStats endFrame();

  /// Releases every borrowed encoder/list without rendering.
  void abortFrame();

  /// Idempotent.
  void dispose();
}
