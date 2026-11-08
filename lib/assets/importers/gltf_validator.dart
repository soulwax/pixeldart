import 'dart:typed_data';

/// Hard limits used before any accessor or material work is attempted.
final class GltfValidationLimits {
  final int maxBuffers;
  final int maxBufferViews;
  final int maxAccessors;
  final int maxMeshes;
  final int maxNodes;

  const GltfValidationLimits({
    this.maxBuffers = 256,
    this.maxBufferViews = 4096,
    this.maxAccessors = 4096,
    this.maxMeshes = 2048,
    this.maxNodes = 8192,
  });
}

/// Validates the structural glTF subset before normalization.
///
/// This is deliberately document-only: URI fetching, filesystem access, and
/// GPU allocation belong to the host/tool boundary, never this library.
void validateGltfDocument(
  Map<String, dynamic> document, {
  int? binaryLength,
  GltfValidationLimits limits = const GltfValidationLimits(),
}) {
  final asset = document['asset'];
  if (asset is! Map || asset['version'] != '2.0') {
    throw const FormatException('glTF asset version 2.0 is required');
  }
  final required = document['extensionsRequired'];
  const supportedExtensions = {'KHR_materials_unlit', 'KHR_texture_transform'};
  if (required is List && required.any((value) =>
      value is! String || !supportedExtensions.contains(value))) {
    throw const FormatException('glTF requires an unsupported extension');
  }

  List<Map<String, dynamic>> maps(String key, int max) {
    final raw = document[key];
    if (raw == null) return const [];
    if (raw is! List || raw.length > max || raw.any((item) => item is! Map)) {
      throw FormatException('glTF $key is malformed or exceeds its limit');
    }
    return [for (final item in raw) (item as Map).cast<String, dynamic>()];
  }

  final buffers = maps('buffers', limits.maxBuffers);
  final views = maps('bufferViews', limits.maxBufferViews);
  final accessors = maps('accessors', limits.maxAccessors);
  final meshes = maps('meshes', limits.maxMeshes);
  maps('nodes', limits.maxNodes);
  final images = maps('images', limits.maxAccessors);

  void checkRelativeUri(Object? raw, String label) {
    if (raw == null) return;
    if (raw is! String || raw.isEmpty || raw.contains('://') ||
        raw.startsWith('/') || raw.split('/').contains('..')) {
      throw FormatException('glTF $label URI is not a bounded local reference');
    }
  }
  for (var i = 0; i < buffers.length; i++) {
    checkRelativeUri(buffers[i]['uri'], 'buffer $i');
  }
  for (var i = 0; i < images.length; i++) {
    checkRelativeUri(images[i]['uri'], 'image $i');
  }

  for (var i = 0; i < buffers.length; i++) {
    final length = buffers[i]['byteLength'];
    if (length is! int || length < 0 || (binaryLength != null && i == 0 && length > binaryLength)) {
      throw FormatException('glTF buffer $i length is invalid');
    }
  }
  for (var i = 0; i < views.length; i++) {
    final view = views[i];
    final buffer = view['buffer'];
    final offset = view['byteOffset'] as int? ?? 0;
    final length = view['byteLength'];
    if (buffer is! int || buffer < 0 || buffer >= buffers.length ||
        offset < 0 || length is! int || length < 0) {
      throw FormatException('glTF bufferView $i is invalid');
    }
    final declared = buffers[buffer]['byteLength'] as int;
    if (offset > declared || length > declared - offset) {
      throw FormatException('glTF bufferView $i exceeds its buffer');
    }
  }
  for (var i = 0; i < accessors.length; i++) {
    final accessor = accessors[i];
    final view = accessor['bufferView'];
    final count = accessor['count'];
    if (view is! int || view < 0 || view >= views.length ||
        count is! int || count <= 0) {
      throw FormatException('glTF accessor $i is invalid');
    }
  }
  for (var i = 0; i < meshes.length; i++) {
    final primitives = meshes[i]['primitives'];
    if (primitives is! List || primitives.isEmpty ||
        primitives.any((item) => item is! Map)) {
      throw FormatException('glTF mesh $i has no valid primitives');
    }
  }
}

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
