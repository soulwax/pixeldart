import 'dart:typed_data';
import '../api/capabilities.dart';
import '../api/configuration_coordinator.dart';
import '../api/frame.dart';
import '../api/handles.dart';
import '../api/materials.dart';
import '../api/mesh.dart';
import '../api/renderer.dart';
import '../api/scene.dart';
import '../api/settings.dart';
import '../api/stats.dart';
import '../assets/material_store.dart';
import '../assets/mesh_store.dart';
import '../assets/texture_store.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/resource_plan_adapter.dart';
import '../passes/pass_context_impl.dart';
import '../passes/safe_graph.dart';
import '../passes/shadow_graph.dart';
import '../passes/world.dart';
import 'batching.dart';
import 'feature_graph.dart';
import 'frame_queue.dart';
import 'program_library.dart';
import 'render_feature.dart';
import 'render_world_impl.dart';
import 'sort_key.dart';
import 'visibility.dart';
part 'scene_renderer_graph.dart';

final class ResourceLibraryImpl implements ResourceLibrary {
  final MeshStore _meshes;
  final MaterialStore _materials = MaterialStore();
  final TextureStore _textures;
  final Set<MeshHandle> _meshHandles = {};
  final Set<MaterialHandle> _materialHandles = {};
  final Set<TextureHandle> _textureHandles = {};
  bool _disposed = false;
  ResourceLibraryImpl(GpuDevice device)
    : _meshes = MeshStore(device),
      _textures = TextureStore(device);
  MeshStore get meshes => _meshes;
  MaterialStore get materials => _materials;
  TextureStore get textures => _textures;

  int get estimatedGpuBytes => _meshes.liveGpuBytes + _textures.liveGpuBytes;

  int get resourceCreateCount =>
      _meshes.registry.createCount +
      _materials.createCount +
      _textures.createCount;

  int get resourceDeleteCount =>
      _meshes.registry.deleteCount +
      _materials.deleteCount +
      _textures.deleteCount;
  @override
  MeshHandle registerMesh(MeshData data, {String? debugLabel}) {
    _ensureActive();
    final handle = _meshes.upload(data, debugLabel: debugLabel);
    _meshHandles.add(handle);
    return handle;
  }

  @override
  void releaseMesh(MeshHandle handle) {
    _ensureActive();
    _meshes.release(handle);
    _meshHandles.remove(handle);
  }

  @override
  MaterialHandle registerMaterial(MaterialDefinition definition) {
    _ensureActive();
    final handle = _materials.register(definition);
    _materialHandles.add(handle);
    return handle;
  }

  @override
  void releaseMaterial(MaterialHandle handle) {
    _ensureActive();
    _materials.release(handle);
    _materialHandles.remove(handle);
  }

  @override
  TextureHandle registerTexture({
    required int width,
    required int height,
    int layers = 1,
    Uint8List? pixels,
    String? debugLabel,
  }) {
    _ensureActive();
    final handle = _textures.declare(
      width: width,
      height: height,
      layers: layers,
      pixels: pixels,
      debugLabel: debugLabel,
    );
    _textureHandles.add(handle);
    return handle;
  }

  @override
  void updateTexturePixels(TextureHandle handle, Uint8List pixels) {
    _ensureActive();
    _textures.updatePixels(handle, pixels);
  }

  @override
  void releaseTexture(TextureHandle handle) {
    _ensureActive();
    _textures.release(handle);
    _textureHandles.remove(handle);
  }

  void rehydrateAfterContextRestore() {
    _ensureActive();
    _meshes.rehydrateAfterContextRestore();
    _textures.rehydrateAfterContextRestore();
  }

  @override
  void dispose() {
    if (_disposed) return;
    for (final handle in _textureHandles.toList()) {
      _textures.release(handle);
    }
    for (final handle in _materialHandles.toList()) {
      _materials.release(handle);
    }
    for (final handle in _meshHandles.toList()) {
      _meshes.release(handle);
    }
    _textureHandles.clear();
    _materialHandles.clear();
    _meshHandles.clear();
    _disposed = true;
  }

  void _ensureActive() {
    if (_disposed) throw StateError('resource library is disposed');
  }
}

final class SceneRendererImpl implements SceneRenderer {
  final GpuDevice device;
  final ConfigurationCoordinator _configurations = ConfigurationCoordinator();
  final FrameQueue _frames = FrameQueue();
  final List<RenderWorldImpl> _worlds = [];
  RendererState _state = RendererState.constructed;
  final RendererHealth _health = RendererHealth.healthy;
  RenderCapabilities? _capabilities;
  ResourceLibraryImpl? _resources;
  GpuResourcePlanAdapter? _gpuResources;
  ProgramLibrary? _programs;
  FeatureGraph? _featureGraph;
  FeatureGraphResult? _graph;
  RendererConfiguration? _configuration;
  FrameInput? _activeFrame;
  RenderWorldImpl? _activeWorld;
  SceneRendererImpl(this.device);
  @override
  RendererState get state => _state;
  @override
  RenderCapabilities get capabilities =>
      _capabilities ?? (throw StateError('renderer is not initialized'));
  @override
  RendererHealth get health => _health;
  @override
  ResourceLibrary get resources =>
      _resources ?? (throw StateError('renderer is not initialized'));
  @override
  Future<void> initialize(
    RendererConfiguration configuration,
    SurfaceMetrics surface,
  ) {
    if (_state != RendererState.constructed) {
      throw StateError('renderer can only be initialized once');
    }
    configuration.validate();
    surface.validate();
    if (device.status == GpuDeviceStatus.lost) {
      throw StateError('renderer device is context lost');
    }
    _state = RendererState.initializing;
    try {
      _capabilities = device.queryCapabilities();
      _configurations.initialize(configuration);
      _resources = ResourceLibraryImpl(device);
      _gpuResources = GpuResourcePlanAdapter(device)..initialize(configuration);
      _programs = ProgramLibrary(device);
      _configuration = configuration;
      _buildSafeGraph();
      _state = RendererState.ready;
    } catch (_) {
      _programs?.disposeAll();
      _gpuResources?.dispose();
      _resources?.dispose();
      _resources = null;
      _state = RendererState.constructed;
      rethrow;
    }
    return Future<void>.value();
  }

  @override
  Future<void> configure(RendererConfiguration configuration) =>
      _configure(configuration);

  @override
  void resize(SurfaceMetrics surface) => _resize(surface);

  @override
  RenderWorld createWorld() {
    _ensureReady();
    final world = RenderWorldImpl(_resources!.meshes.registry);
    _worlds.add(world);
    return world;
  }

  @override
  RenderEncoder beginFrame(RenderWorld world, FrameInput frame) {
    _recoverIfNeeded();
    _ensureReady();
    if (world is! RenderWorldImpl || !_worlds.contains(world)) {
      throw ArgumentError('world was not created by this renderer');
    }
    if (_activeFrame != null) {
      throw StateError('renderer.beginFrame called twice without end/abort');
    }
    frame.validate();
    _activeFrame = frame;
    _activeWorld = world;
    return _frames.beginFrame();
  }

  @override
  FrameStats endFrame() {
    _ensureReady();
    final frame = _activeFrame;
    final world = _activeWorld;
    if (frame == null || world == null) {
      throw StateError('renderer.endFrame called without an active frame');
    }
    final transient = _frames.endFrame();
    try {
      _executeGraph(world, frame);
      final items = [
        ...world.items.map((item) => item.descriptor),
        ...transient,
      ];
      var triangles = 0;
      for (final item in items) {
        final mesh = _resources!.meshes.resolve(item.mesh);
        triangles +=
            (mesh.indexCount > 0 ? mesh.indexCount : mesh.vertexCount) ~/ 3;
      }
      return FrameStats(
        frameIndex: frame.frameIndex,
        drawCalls: items.length,
        trianglesSubmitted: triangles,
        instancesSubmitted: items.length,
        liveGpuBytes: _resources!.estimatedGpuBytes,
        peakGpuBytes: _resources!.estimatedGpuBytes,
        resourceCreateCount: _resources!.resourceCreateCount,
        resourceDeleteCount: _resources!.resourceDeleteCount,
      );
    } finally {
      _activeFrame = null;
      _activeWorld = null;
    }
  }

  @override
  void abortFrame() {
    if (_activeFrame == null) {
      throw StateError('renderer.abortFrame called without an active frame');
    }
    _frames.abortFrame();
    _activeFrame = null;
    _activeWorld = null;
  }

  @override
  void dispose() {
    if (_state == RendererState.disposed) return;
    if (_activeFrame != null) abortFrame();
    for (final world in _worlds) {
      world.dispose();
    }
    _worlds.clear();
    _featureGraph?.disposeAll();
    _programs?.disposeAll();
    _gpuResources?.dispose();
    _resources?.dispose();
    _resources = null;
    _featureGraph = null;
    _graph = null;
    _programs = null;
    _gpuResources = null;
    _configurations.dispose();
    _state = RendererState.disposed;
  }

  void _recoverIfNeeded() {
    if (_state != RendererState.contextLost) return;
    if (device.status == GpuDeviceStatus.lost) {
      throw StateError('renderer context remains lost');
    }
    _resources!.rehydrateAfterContextRestore();
    _gpuResources!.rehydrateAfterContextRestore(_configuration!);
    _programs!.resetAfterContextRestore();
    _buildSafeGraph();
    _state = RendererState.ready;
  }

  void _ensureReady() {
    if (_state != RendererState.ready) {
      throw StateError('renderer is not ready: ${_state.name}');
    }
    if (device.status == GpuDeviceStatus.lost) {
      _state = RendererState.contextLost;
      throw StateError('renderer context lost');
    }
  }
}
