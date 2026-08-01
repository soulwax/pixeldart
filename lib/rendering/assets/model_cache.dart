import 'dart:typed_data';

import '../api/mesh.dart';
import 'mesh_dedup.dart';
import 'qmesh.dart';

/// Deterministic content hash over raw source bytes, used as a cache key so
/// re-decoding identical QMSH bytes is skippable and re-uploading identical
/// content is detectable across a context restore (§5.4: "content-hash
/// cache"). Not cryptographic — collision resistance sufficient for a
/// same-session cache is the only requirement, not tamper resistance.
String contentHashOf(Uint8List bytes) {
  var h1 = 0xcbf29ce4, h2 = 0x84222325;
  for (final b in bytes) {
    h1 = (h1 ^ b) & 0xffffffff;
    h1 = (h1 * 0x01000193) & 0xffffffff;
    h2 = (h2 ^ b) & 0xffffffff;
    h2 = (h2 * 0x01000197) & 0xffffffff;
  }
  return '${h1.toRadixString(16).padLeft(8, '0')}${h2.toRadixString(16).padLeft(8, '0')}';
}

final class CachedMesh {
  final String contentHash;
  final MeshData deduplicated;
  const CachedMesh(this.contentHash, this.deduplicated);
}

/// Decodes and deduplicates QMSH bytes exactly once per distinct content
/// hash; a repeated decode of identical bytes returns the cached result
/// instead of re-running the decoder, which matters for context-restore
/// rehydration (§7.4) where the same CPU descriptor is rebuilt every time.
final class ModelCache {
  final Map<String, CachedMesh> _byHash = {};

  int get cachedCount => _byHash.length;

  CachedMesh decodeAndCache(Uint8List qmeshBytes) {
    final hash = contentHashOf(qmeshBytes);
    final existing = _byHash[hash];
    if (existing != null) return existing;

    final decoded = decodeQmesh(qmeshBytes);
    final deduped = deduplicateMesh(decoded);
    final cached = CachedMesh(hash, deduped);
    _byHash[hash] = cached;
    return cached;
  }

  void clear() {
    _byHash.clear();
  }
}
