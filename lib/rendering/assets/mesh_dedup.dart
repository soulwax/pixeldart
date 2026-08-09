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
  final keyToIndex = <String, int>{};
  final uniqueVertices = <double>[];
  final indices = List<int>.filled(source.vertexCount, 0);

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
