import 'dart:convert';
import 'dart:typed_data';

import '../api/mesh.dart';
import '../math/bounds.dart';
import '../math/vec.dart';

enum QmeshRejection {
  tooShortForHeader,
  badMagic,
  unsupportedVersion,
  unsupportedStride,
  truncatedVertexData,
  nonFiniteBounds,
  nonFiniteVertex,
  vertexCountNotMultipleOfThree,
}

final class QmeshDecodeException implements Exception {
  final QmeshRejection reason;
  final String detail;
  const QmeshDecodeException(this.reason, this.detail);

  @override
  String toString() => 'QmeshDecodeException(${reason.name}: $detail)';
}

const int _headerBytes = 36;
const List<int> _magic = [0x51, 0x4D, 0x53, 0x48]; // "QMSH"
const int _supportedVersion = 1;
const int _supportedStride = 14;

/// Strict QMSH v1 decoder (RENDERER-ELEVATION-PLAN.md §5.4, RV-06 Phase A).
/// Validates magic, version, stride, exact byte length, finite bounds, and
/// `vertexCount % 3 == 0` before interpreting a single vertex — a malformed
/// file is rejected wholesale, never partially decoded. Performs no
/// geometry interpretation beyond what the format itself declares (Q18's
/// TODO.md contract: "It performs no geometry interpretation").
MeshData decodeQmesh(Uint8List bytes) {
  if (bytes.length < _headerBytes) {
    throw QmeshDecodeException(
      QmeshRejection.tooShortForHeader,
      '${bytes.length} bytes, need at least $_headerBytes',
    );
  }
  for (var i = 0; i < 4; i++) {
    if (bytes[i] != _magic[i]) {
      throw QmeshDecodeException(
        QmeshRejection.badMagic,
        'expected "QMSH", got ${ascii.decode(bytes.sublist(0, 4), allowInvalid: true)}',
      );
    }
  }

  final view = ByteData.sublistView(bytes);
  final version = view.getUint16(4, Endian.little);
  if (version != _supportedVersion) {
    throw QmeshDecodeException(
      QmeshRejection.unsupportedVersion,
      'got version $version, expected $_supportedVersion',
    );
  }

  final stride = view.getUint16(6, Endian.little);
  if (stride != _supportedStride) {
    throw QmeshDecodeException(
      QmeshRejection.unsupportedStride,
      'got stride $stride, expected $_supportedStride',
    );
  }

  final vertexCount = view.getUint32(8, Endian.little);
  final expectedBytes = _headerBytes + vertexCount * stride * 4;
  if (bytes.length != expectedBytes) {
    throw QmeshDecodeException(
      QmeshRejection.truncatedVertexData,
      'expected exactly $expectedBytes bytes for $vertexCount vertices, got ${bytes.length}',
    );
  }
  if (vertexCount % 3 != 0) {
    throw QmeshDecodeException(
      QmeshRejection.vertexCountNotMultipleOfThree,
      'vertexCount $vertexCount is not a multiple of 3',
    );
  }

  final bounds = List.generate(
    6,
    (i) => view.getFloat32(12 + i * 4, Endian.little),
  );
  if (bounds.any((v) => !v.isFinite)) {
    throw QmeshDecodeException(
      QmeshRejection.nonFiniteBounds,
      'bounds contain a non-finite value: $bounds',
    );
  }

  final floatCount = vertexCount * stride;
  final vertices = Float32List(floatCount);
  for (var i = 0; i < floatCount; i++) {
    final value = view.getFloat32(_headerBytes + i * 4, Endian.little);
    if (!value.isFinite) {
      throw QmeshDecodeException(
        QmeshRejection.nonFiniteVertex,
        'vertex float at index $i is non-finite',
      );
    }
    vertices[i] = value;
  }

  return MeshData(
    layout: VertexLayoutDescriptor.compatibility14,
    vertices: vertices,
    localBounds: Aabb(
      Vec3(bounds[0], bounds[1], bounds[2]),
      Vec3(bounds[3], bounds[4], bounds[5]),
    ),
  );
}
