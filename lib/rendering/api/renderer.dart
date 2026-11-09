import 'dart:typed_data';

import 'capabilities.dart';
import 'frame.dart';
import 'handles.dart';
import 'materials.dart';
import 'mesh.dart';
import 'msaa.dart';
import 'scene.dart';
import 'settings.dart';
import 'shaders.dart';
import 'stats.dart';
import '../assets/model_binding.dart';
import '../assets/model_definition.dart';
import '../assets/material_residency.dart';
import '../assets/texture_residency.dart';
import '../webgl/device_api.dart';

abstract interface class ResourceLibrary {
  MeshHandle registerMesh(MeshData data, {String? debugLabel});
  void releaseMesh(MeshHandle handle);

  MaterialHandle registerMaterial(MaterialDefinition definition);
  void releaseMaterial(MaterialHandle handle);

  ModelBinding bindModel(ModelDefinition definition);

  TextureHandle registerTexture({
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
  });
  void updateTexturePixels(TextureHandle handle, Uint8List pixels);
  void finalizeTextureMips(TextureHandle handle);
  void releaseTexture(TextureHandle handle);

  TextureResidencyManager get textureResidency;

  MaterialResidencyManager get materialResidency;

  void dispose();
}

abstract interface class SceneRenderer {
  RendererState get state;
  RenderCapabilities get capabilities;
  RendererHealth get health;

  /// The configuration as requested; [msaa] reports the sample count that
  /// was actually allocated for it.
  RendererConfiguration get configuration;

  MsaaStatus get msaa;

  Map<ShaderSlot, String> get shaderErrors;
  ResourceLibrary get resources;

  Future<void> initialize(
    RendererConfiguration configuration,
    SurfaceMetrics surface,
  );

  Future<void> configure(RendererConfiguration configuration);

  void resize(SurfaceMetrics surface);

  RenderWorld createWorld();

  RenderEncoder beginFrame(RenderWorld world, FrameInput frame);

  FrameStats endFrame();

  GpuTimingResult pollGpuTiming();

  void abortFrame();

  void dispose();
}
