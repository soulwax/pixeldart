import 'dart:typed_data';

/// Decodes one glTF accessor from the already bounded GLB BIN chunk.
/// No GPU types or browser APIs are involved.
final class GltfAccessorDecoder {
  final Map<String, dynamic> document;
  final Uint8List binary;

  const GltfAccessorDecoder({required this.document, required this.binary});

  List<double> decode(int accessorIndex) {
    final accessors = document['accessors'];
    final views = document['bufferViews'];
    if (accessors is! List ||
        views is! List ||
        accessorIndex < 0 ||
        accessorIndex >= accessors.length) {
      throw const FormatException('accessor index is invalid');
    }
    final accessor = accessors[accessorIndex];
    if (accessor is! Map) {
      throw const FormatException('accessor must be an object');
    }
    final viewIndex = accessor['bufferView'] as int?;
    if (viewIndex == null || viewIndex < 0 || viewIndex >= views.length) {
      throw const FormatException('accessor bufferView is invalid');
    }
    final view = views[viewIndex];
    if (view is! Map) {
      throw const FormatException('bufferView must be an object');
    }
    final componentType = accessor['componentType'] as int?;
    final componentBytes = _componentBytes(componentType);
    final components = _componentCount(accessor['type']);
    final count = accessor['count'] as int? ?? 0;
    if (count <= 0) {
      throw const FormatException('accessor count must be positive');
    }
    final stride = view['byteStride'] as int? ?? componentBytes * components;
    if (stride < componentBytes * components) {
      throw const FormatException('accessor byteStride is too small');
    }
    final viewOffset = view['byteOffset'] as int? ?? 0;
    final accessorOffset = accessor['byteOffset'] as int? ?? 0;
    if (viewOffset < 0 || accessorOffset < 0 || viewOffset > binary.length) {
      throw const FormatException('accessor byte offset is invalid');
    }
    final start = viewOffset + accessorOffset;
    final required = (count - 1) * stride + componentBytes * components;
    if (start > binary.length || required > binary.length - start) {
      throw const FormatException('accessor exceeds BIN bounds');
    }
    final data = ByteData.sublistView(binary);
    final values = <double>[];
    for (var row = 0; row < count; row++) {
      final rowOffset = start + row * stride;
      for (var component = 0; component < components; component++) {
        values.add(
          _read(data, rowOffset + component * componentBytes, componentType!),
        );
      }
    }
    return values;
  }
}

int _componentBytes(int? componentType) => switch (componentType) {
  5121 => 1,
  5123 => 2,
  5125 || 5126 => 4,
  _ => throw FormatException(
    'unsupported accessor componentType: $componentType',
  ),
};

int _componentCount(Object? type) => switch (type) {
  'SCALAR' => 1,
  'VEC2' => 2,
  'VEC3' => 3,
  'VEC4' => 4,
  _ => throw FormatException('unsupported accessor type: $type'),
};

double _read(ByteData data, int offset, int componentType) =>
    switch (componentType) {
      5121 => data.getUint8(offset).toDouble(),
      5123 => data.getUint16(offset, Endian.little).toDouble(),
      5125 => data.getUint32(offset, Endian.little).toDouble(),
      5126 => data.getFloat32(offset, Endian.little),
      _ => throw FormatException(
        'unsupported accessor componentType: $componentType',
      ),
    };
