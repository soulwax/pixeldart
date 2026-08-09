part of 'scene_renderer_impl.dart';

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
  ModelBinding bindModel(ModelDefinition definition) {
    _ensureActive();
    return definition.bind(meshes: _meshes, materials: _materials);
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
    _textures.dispose();
    _disposed = true;
  }

  void _ensureActive() {
    if (_disposed) throw StateError('resource library is disposed');
  }
}
