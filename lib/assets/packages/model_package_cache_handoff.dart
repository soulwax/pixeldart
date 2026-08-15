import 'dart:typed_data';

import '../../rendering/assets/model_cache.dart';
import 'model_package.dart';

/// CPU residency acquired for one logical package owner.
///
/// Each part owns one cache reference. If acquisition fails halfway through,
/// references already acquired by this handoff are released before rethrowing.
final class ModelPackageCacheHandoff {
  final ModelCache cache;
  final List<CachedMesh> meshes;
  bool _released = false;

  ModelPackageCacheHandoff._(this.cache, this.meshes);

  static ModelPackageCacheHandoff acquire({
    required ValidatedModelPackage package,
    required ModelCache cache,
    required String lod,
  }) {
    if (!package.manifest.lods.contains(lod)) {
      throw ArgumentError.value(
        lod,
        'lod',
        'package does not declare this LOD',
      );
    }
    final acquired = <CachedMesh>[];
    try {
      for (final part in package.manifest.parts) {
        final path = part.lodFiles[lod];
        if (path == null) {
          throw StateError('part ${part.id} has no $lod payload');
        }
        final bytes = package.payload(path);
        acquired.add(cache.decodeAndCache(Uint8List.fromList(bytes)));
      }
      return ModelPackageCacheHandoff._(cache, acquired);
    } catch (_) {
      for (final mesh in acquired.reversed) {
        cache.release(mesh);
      }
      rethrow;
    }
  }

  void release() {
    if (_released) return;
    _released = true;
    for (final mesh in meshes.reversed) {
      cache.release(mesh);
    }
  }
}
