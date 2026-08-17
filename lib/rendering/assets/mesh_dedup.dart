import 'dart:typed_data';

import '../api/mesh.dart';

/// Deterministically deduplicates expanded (non-indexed) vertices by their
/// exact packed float tuple, producing a real `Uint16` index buffer without
/// interpreting or approximating any value (§5.4). Two vertices are the
/// same only if every one of their `layout.strideFloats` values is
/// bit-identical — this is deliberately stricter than an epsilon
/// comparison, so it never silently merges two vertices an author meant to
/// keep distinct (e.g. a hard edge with a duplicated position but a
/// different normal). The resulting index width is selected from the final
/// unique-vertex count: compact Uint16 for ordinary meshes, Uint32 when an
/// authored mesh genuinely crosses the 65,536-vertex boundary.
MeshData deduplicateMesh(MeshData source) {
  if (source.indices != null) {
    return source;
  }
  final stride = source.layout.strideFloats;
  final strideBytes = stride * 4;
  final sourceBytes = source.vertices.buffer.asUint8List(
    source.vertices.offsetInBytes,
    source.vertices.lengthInBytes,
  );
  // Hash buckets avoid allocating a comma-separated String for every vertex
  // (large scanned assets can contain hundreds of thousands of expanded
  // vertices). Exact byte comparison inside a bucket preserves the original
  // bit-identical merge contract, including hard edges and tangent signs.
  final hashToIndices = <int, List<int>>{};
  final uniqueBytes = <int>[];
  final uniqueVertices = <double>[];
  final indices = List<int>.filled(source.vertexCount, 0);

  for (var v = 0; v < source.vertexCount; v++) {
    final start = v * stride;
    final byteStart = v * strideBytes;
    final hash = _vertexHash(sourceBytes, byteStart, strideBytes);
    final bucket = hashToIndices[hash] ??= <int>[];
    var existing = -1;
    for (final candidate in bucket) {
      final candidateStart = candidate * strideBytes;
      var equal = true;
      for (var byte = 0; byte < strideBytes; byte++) {
        if (sourceBytes[byteStart + byte] !=
            uniqueBytes[candidateStart + byte]) {
          equal = false;
          break;
        }
      }
      if (equal) {
        existing = candidate;
        break;
      }
    }
    if (existing >= 0) {
      indices[v] = existing;
    } else {
      final newIndex = uniqueVertices.length ~/ stride;
      bucket.add(newIndex);
      indices[v] = newIndex;
      uniqueBytes.addAll(sourceBytes.sublist(byteStart, byteStart + strideBytes));
      for (var f = 0; f < stride; f++) {
        uniqueVertices.add(source.vertices[start + f]);
      }
    }
  }

  final uniqueCount = uniqueVertices.length ~/ stride;
  final typedIndices = uniqueCount > 65536
      ? Uint32List.fromList(indices)
      : Uint16List.fromList(indices);
  return MeshData(
    layout: source.layout,
    vertices: Float32List.fromList(uniqueVertices),
    indices: typedIndices,
    localBounds: source.localBounds,
  );
}

int _vertexHash(Uint8List bytes, int start, int length) {
  var hash = 0x811c9dc5;
  for (var i = 0; i < length; i++) {
    hash ^= bytes[start + i];
    hash = (hash * 0x01000193) & 0xffffffff;
  }
  return hash;
}
