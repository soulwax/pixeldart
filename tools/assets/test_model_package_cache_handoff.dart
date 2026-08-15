import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';
import 'package:pixeldart/rendering/assets/model_cache.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

Uint8List qmesh({int seed = 0}) {
  const stride = 14;
  final bytes = Uint8List(36 + 3 * stride * 4);
  final view = ByteData.sublistView(bytes);
  bytes.setAll(0, const [0x51, 0x4D, 0x53, 0x48]);
  view.setUint16(4, 1, Endian.little);
  view.setUint16(6, stride, Endian.little);
  view.setUint32(8, 3, Endian.little);
  for (var i = 0; i < 6; i++) {
    view.setFloat32(12 + i * 4, i < 3 ? 0 : 1, Endian.little);
  }
  for (var vertex = 0; vertex < 3; vertex++) {
    final base = 36 + vertex * stride * 4;
    view.setFloat32(
      base,
      ((vertex == 1 ? 1 : 0) + seed).toDouble(),
      Endian.little,
    );
    view.setFloat32(base + 4, vertex == 2 ? 1 : 0, Endian.little);
    view.setFloat32(base + 8, 0, Endian.little);
    view.setFloat32(base + 12, 0, Endian.little);
    view.setFloat32(base + 16, 0, Endian.little);
    view.setFloat32(base + 20, 1, Endian.little);
  }
  return bytes;
}

void main() {
  final cache = ModelCache();
  final package = ValidatedModelPackage(
    manifest: ModelPackageManifest(
      assetId: 'room',
      packageHash: '0' * 64,
      sourceFormat: 'gltf',
      materials: ['default'],
      parts: [
        const ModelPackagePart(
          id: 'a',
          materialSlot: 0,
          lodFiles: {'LOD0': 'a.qmesh'},
        ),
        const ModelPackagePart(
          id: 'b',
          materialSlot: 0,
          lodFiles: {'LOD0': 'b.qmesh'},
        ),
      ],
    ),
    payloads: {'a.qmesh': qmesh(), 'b.qmesh': qmesh(seed: 2)},
  );
  final handoff = ModelPackageCacheHandoff.acquire(
    package: package,
    cache: cache,
    lod: 'LOD0',
  );
  check(handoff.meshes.length == 2, 'all package parts are resident');
  check(cache.cachedCount == 2, 'cache contains both parts');
  handoff.release();
  handoff.release();
  check(cache.cachedCount == 0, 'release is idempotent and clears references');

  final broken = ValidatedModelPackage(
    manifest: package.manifest,
    payloads: {'a.qmesh': qmesh()},
  );
  var failed = false;
  try {
    ModelPackageCacheHandoff.acquire(
      package: broken,
      cache: cache,
      lod: 'LOD0',
    );
  } catch (error) {
    failed = error is StateError;
  }
  check(
    failed && cache.cachedCount == 0,
    'halfway failure rolls back cache refs',
  );
  print('RF-05 model package cache handoff tests passed.');
}
