import 'dart:typed_data';

import 'package:pixeldart/rendering/assets/mesh_dedup.dart';
import 'package:pixeldart/rendering/assets/model_cache.dart';
import 'package:pixeldart/rendering/assets/qmesh.dart';

void main() {
  _validFixtureDecodesExactly();
  _corruptCasesRejected();
  _dedupIsStableAndDeterministic();
  _cacheSkipsRedecode();
  print('Renderer QMSH fixtures passed.');
}

Uint8List _buildQmesh({
  int version = 1,
  int stride = 14,
  int? vertexCountOverride,
  List<double>? boundsOverride,
  List<double>? verticesOverride,
  bool badMagic = false,
  int? truncateBy,
}) {
  const triangle = [
    // pos3, normal3, rgba4, alpha1(part of rgba slot per layout: color4=rgb+glow), uv+mat3
    0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0,
  ];
  final vertices = verticesOverride ?? triangle;
  final vertexCount = vertexCountOverride ?? (vertices.length ~/ stride);
  final bounds = boundsOverride ?? [0.0, 0.0, 0.0, 1.0, 1.0, 0.0];

  final totalBytes = 36 + vertices.length * 4;
  final buffer = ByteData(totalBytes);
  final bytes = buffer.buffer.asUint8List();
  if (badMagic) {
    bytes[0] = 0x58;
    bytes[1] = 0x58;
    bytes[2] = 0x58;
    bytes[3] = 0x58;
  } else {
    bytes[0] = 0x51;
    bytes[1] = 0x4D;
    bytes[2] = 0x53;
    bytes[3] = 0x48;
  }
  buffer.setUint16(4, version, Endian.little);
  buffer.setUint16(6, stride, Endian.little);
  buffer.setUint32(8, vertexCount, Endian.little);
  for (var i = 0; i < 6; i++) {
    buffer.setFloat32(12 + i * 4, bounds[i], Endian.little);
  }
  for (var i = 0; i < vertices.length; i++) {
    buffer.setFloat32(36 + i * 4, vertices[i], Endian.little);
  }

  if (truncateBy != null) {
    return bytes.sublist(0, bytes.length - truncateBy);
  }
  return bytes;
}

void _validFixtureDecodesExactly() {
  final bytes = _buildQmesh();
  final mesh = decodeQmesh(bytes);
  if (mesh.vertexCount != 3) {
    throw StateError('expected 3 vertices, got ${mesh.vertexCount}');
  }
  if (mesh.vertices[0] != 0.0 || mesh.vertices[14] != 1.0) {
    throw StateError('decoded vertex floats do not match the source fixture');
  }
  if (mesh.localBounds.min.x != 0.0 || mesh.localBounds.max.x != 1.0) {
    throw StateError('decoded bounds do not match the source fixture');
  }
}

void _expectRejected(Uint8List bytes, QmeshRejection reason) {
  try {
    decodeQmesh(bytes);
  } on QmeshDecodeException catch (e) {
    if (e.reason != reason) {
      throw StateError('expected $reason, got ${e.reason}');
    }
    return;
  }
  throw StateError('expected QmeshDecodeException($reason), none was thrown');
}

void _corruptCasesRejected() {
  _expectRejected(Uint8List(10), QmeshRejection.tooShortForHeader);
  _expectRejected(_buildQmesh(badMagic: true), QmeshRejection.badMagic);
  _expectRejected(_buildQmesh(version: 2), QmeshRejection.unsupportedVersion);
  _expectRejected(_buildQmesh(stride: 8), QmeshRejection.unsupportedStride);
  _expectRejected(
    _buildQmesh(truncateBy: 4),
    QmeshRejection.truncatedVertexData,
  );
  _expectRejected(
    _buildQmesh(boundsOverride: [0, 0, 0, double.nan, 1, 0]),
    QmeshRejection.nonFiniteBounds,
  );
  _expectRejected(
    _buildQmesh(vertexCountOverride: 2, verticesOverride: List.filled(28, 0.0)),
    QmeshRejection.vertexCountNotMultipleOfThree,
  );
  _expectRejected(
    _buildQmesh(verticesOverride: [double.infinity, ...List.filled(41, 0.0)]),
    QmeshRejection.nonFiniteVertex,
  );
}

void _dedupIsStableAndDeterministic() {
  final source = decodeQmesh(_buildQmesh());
  final dedupedA = deduplicateMesh(source);
  final dedupedB = deduplicateMesh(source);

  if (dedupedA.indices == null) {
    throw StateError('deduplicateMesh must produce an index buffer');
  }
  if (dedupedA.vertexCount != 3) {
    throw StateError(
      'the fixture triangle has 3 distinct vertices, got ${dedupedA.vertexCount}',
    );
  }
  if (dedupedA.indices!.length != 3) {
    throw StateError('expected 3 indices for a non-shared triangle');
  }
  for (var i = 0; i < dedupedA.indices!.length; i++) {
    if (dedupedA.indices![i] != dedupedB.indices![i]) {
      throw StateError(
        'deduplication must be deterministic across repeated runs',
      );
    }
  }

  final sharedVertexTriangle = decodeQmesh(
    _buildQmesh(
      verticesOverride: [
        for (var i = 0; i < 14; i++) 0.5,
        for (var i = 0; i < 14; i++) 0.5,
        1.0,
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
        1.0,
        1.0,
        1.0,
        0.0,
        1.0,
        0.0,
        1.0,
        0.0,
      ],
    ),
  );
  final dedupedShared = deduplicateMesh(sharedVertexTriangle);
  if (dedupedShared.vertexCount != 2) {
    throw StateError(
      'two bit-identical vertices must collapse to one unique entry, '
      'expected 2 unique vertices total, got ${dedupedShared.vertexCount}',
    );
  }
  if (dedupedShared.indices![0] != dedupedShared.indices![1]) {
    throw StateError('the two identical source vertices must share one index');
  }
}

void _cacheSkipsRedecode() {
  final cache = ModelCache();
  final bytes = _buildQmesh();
  final first = cache.decodeAndCache(bytes);
  final second = cache.decodeAndCache(bytes);
  if (!identical(first, second)) {
    throw StateError(
      're-decoding identical bytes must return the cached result',
    );
  }
  if (cache.cachedCount != 1) {
    throw StateError(
      'cache must hold exactly one entry for one distinct content hash',
    );
  }

  final differentBytes = _buildQmesh(boundsOverride: [0, 0, 0, 2, 2, 0]);
  final third = cache.decodeAndCache(differentBytes);
  if (identical(first, third)) {
    throw StateError('different content must not share a cache entry');
  }
  if (cache.cachedCount != 2) {
    throw StateError(
      'a second distinct content hash must add a second cache entry',
    );
  }
}
