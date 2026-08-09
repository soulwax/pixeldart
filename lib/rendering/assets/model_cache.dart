import 'dart:typed_data';

import '../api/mesh.dart';
import 'mesh_dedup.dart';
import 'qmesh.dart';

const int currentModelDecodeVersion = 1;

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
  final int decodeVersion;
  final MeshData deduplicated;
  const CachedMesh(
    this.contentHash,
    this.deduplicated, {
    this.decodeVersion = currentModelDecodeVersion,
  });

  String get cacheKey => '$decodeVersion:$contentHash';
}

/// Decodes and deduplicates QMSH bytes exactly once per distinct content
/// hash; a repeated decode of identical bytes returns the cached result
/// instead of re-running the decoder, which matters for context-restore
/// rehydration (§7.4) where the same CPU descriptor is rebuilt every time.
final class ModelCache {
  final int decodeVersion;
  final Map<String, CachedMesh> _byKey = {};
  final Map<String, int> _references = {};

  ModelCache({this.decodeVersion = currentModelDecodeVersion}) {
    if (decodeVersion <= 0) {
      throw ArgumentError.value(
        decodeVersion,
        'decodeVersion',
        'must be positive',
      );
    }
  }

  int get cachedCount => _byKey.length;

  CachedMesh decodeAndCache(Uint8List qmeshBytes) {
    final hash = contentHashOf(qmeshBytes);
    final cacheKey = '$decodeVersion:$hash';
    final existing = _byKey[cacheKey];
    if (existing != null) {
      return acquire(existing);
    }

    final decoded = decodeQmesh(qmeshBytes);
    final deduped = deduplicateMesh(decoded);
    final cached = CachedMesh(hash, deduped, decodeVersion: decodeVersion);
    _byKey[cacheKey] = cached;
    _references[cacheKey] = 1;
    return cached;
  }

  /// Retains one additional logical owner of an already decoded entry.
  /// Identity checking prevents an entry from one cache/version epoch from
  /// accidentally extending the lifetime of a different cache record.
  CachedMesh acquire(CachedMesh cached) {
    final current = _byKey[cached.cacheKey];
    if (!identical(current, cached)) {
      throw StateError('ModelCache.acquire received a stale entry');
    }
    _references[cached.cacheKey] = _references[cached.cacheKey]! + 1;
    return current!;
  }

  int referencesFor(CachedMesh cached) {
    final current = _byKey[cached.cacheKey];
    if (!identical(current, cached)) {
      throw StateError('ModelCache.referencesFor received a stale entry');
    }
    return _references[cached.cacheKey]!;
  }

  /// Releases one logical owner. The decoded mesh remains cached until the
  /// final duplicate owner releases it, preventing re-decode churn when two
  /// model instances share one source asset.
  void release(CachedMesh cached) {
    final current = _byKey[cached.cacheKey];
    if (!identical(current, cached)) {
      throw StateError('ModelCache.release received a stale entry');
    }
    final references = _references[cached.cacheKey]!;
    if (references <= 1) {
      _references.remove(cached.cacheKey);
      _byKey.remove(cached.cacheKey);
    } else {
      _references[cached.cacheKey] = references - 1;
    }
  }

  void clear() {
    _byKey.clear();
    _references.clear();
  }
}
