import 'dart:typed_data';

import '../api/mesh.dart';

/// Deterministically deduplicates expanded (non-indexed) vertices by their
/// exact packed float tuple, producing a real `Uint16` index buffer without
/// interpreting or approximating any value (§5.4). Two vertices are the
/// same only if every one of their `layout.strideFloats` values is
/// bit-identical — this is deliberately stricter than an epsilon
/// comparison, so it never silently merges two vertices an author meant to
/// keep distinct (e.g. a hard edge with a duplicated position but a
/// different normal).
MeshData deduplicateMesh(MeshData source) {
  if (source.indices != null) {
    return source;
  }
  if (source.vertexCount > 65536) {
    throw ArgumentError(
      'deduplicateMesh: ${source.vertexCount} vertices exceeds Uint16 index range',
    );
  }

  final stride = source.layout.strideFloats;
  final keyToIndex = <String, int>{};
  final uniqueVertices = <double>[];
  final indices = Uint16List(source.vertexCount);

  for (var v = 0; v < source.vertexCount; v++) {
    final start = v * stride;
    final key = source.vertices.buffer
        .asUint8List(source.vertices.offsetInBytes + start * 4, stride * 4)
        .join(',');

    final existing = keyToIndex[key];
    if (existing != null) {
      indices[v] = existing;
      continue;
    }
    final newIndex = keyToIndex.length;
    keyToIndex[key] = newIndex;
    indices[v] = newIndex;
    for (var f = 0; f < stride; f++) {
      uniqueVertices.add(source.vertices[start + f]);
    }
  }

  return MeshData(
    layout: source.layout,
    vertices: Float32List.fromList(uniqueVertices),
    indices: indices,
    localBounds: source.localBounds,
  );
}
