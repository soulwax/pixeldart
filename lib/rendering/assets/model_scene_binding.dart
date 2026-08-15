/// RF-06 transactional binding of a validated ModelPackage to a retained scene.
library;

import '../../assets/packages/model_package.dart';
import '../../assets/packages/model_package_cache_handoff.dart';
import 'model_cache.dart';
import '../api/handles.dart';
import '../api/renderer.dart';
import '../api/scene.dart';

/// Binds one validated CPU package to retained world items. Material slots are
/// resolved by the host; unresolved slots are errors, never fallbacks.
final class ModelPackageSceneBinding {
  final ValidatedModelPackage package;
  final ModelCache cache;
  final ResourceLibrary resources;
  final RenderWorld world;
  final MaterialHandle Function(int slot) materialForSlot;
  String _activeLod;
  ModelPackageCacheHandoff? _handoff;
  final List<MeshHandle> _meshes = [];
  final List<InstanceId> _items = [];
  bool _disposed = false;

  ModelPackageSceneBinding({
    required this.package,
    required this.cache,
    required this.resources,
    required this.world,
    required this.materialForSlot,
    String initialLod = 'LOD0',
  }) : _activeLod = initialLod;

  String get activeLod => _activeLod;
  int get itemCount => _items.length;

  void attach() {
    _ensureUsable();
    if (_handoff != null) throw StateError('model package is already attached');
    final next = _build(_activeLod);
    _handoff = next.handoff;
    _meshes.addAll(next.meshes);
    _items.addAll(next.items);
  }

  void switchLod(String lod) {
    _ensureUsable();
    if (_handoff == null) throw StateError('model package is not attached');
    if (lod == _activeLod) return;
    final next = _build(lod);
    final oldHandoff = _handoff!;
    final oldMeshes = List<MeshHandle>.from(_meshes);
    final oldItems = List<InstanceId>.from(_items);
    _handoff = next.handoff;
    _meshes
      ..clear()
      ..addAll(next.meshes);
    _items
      ..clear()
      ..addAll(next.items);
    _activeLod = lod;
    _remove(oldItems, oldMeshes, oldHandoff);
  }

  void dispose() {
    if (_disposed) return;
    _disposed = true;
    _remove(_items, _meshes, _handoff);
    _items.clear();
    _meshes.clear();
    _handoff = null;
  }

  ({
    ModelPackageCacheHandoff handoff,
    List<MeshHandle> meshes,
    List<InstanceId> items,
  })
  _build(String lod) {
    final handoff = ModelPackageCacheHandoff.acquire(
      package: package,
      cache: cache,
      lod: lod,
    );
    final meshes = <MeshHandle>[];
    final items = <InstanceId>[];
    try {
      for (var index = 0; index < package.manifest.parts.length; index++) {
        final part = package.manifest.parts[index];
        final material = materialForSlot(part.materialSlot);
        if (!material.isValid) {
          throw StateError(
            'invalid material for package slot ${part.materialSlot}',
          );
        }
        final mesh = resources.registerMesh(
          handoff.meshes[index].deduplicated,
          debugLabel: '${package.manifest.assetId}:${part.id}:$lod',
        );
        meshes.add(mesh);
        items.add(
          world.addItem(RetainedItemDescriptor(mesh: mesh, material: material)),
        );
      }
      return (handoff: handoff, meshes: meshes, items: items);
    } catch (_) {
      _remove(items, meshes, handoff);
      rethrow;
    }
  }

  void _remove(
    List<InstanceId> items,
    List<MeshHandle> meshes,
    ModelPackageCacheHandoff? handoff,
  ) {
    for (final item in items.reversed) {
      world.removeItem(item);
    }
    for (final mesh in meshes.reversed) {
      resources.releaseMesh(mesh);
    }
    handoff?.release();
  }

  void _ensureUsable() {
    if (_disposed) throw StateError('model package binding is disposed');
  }
}
