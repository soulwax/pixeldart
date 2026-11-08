import 'dart:convert';

import 'gltf_validator.dart';

/// Source-neutral primitive descriptor emitted by glTF normalization.
final class GltfPrimitiveDescriptor {
  final int positionAccessor;
  final int? normalAccessor;
  final int? texcoord0Accessor;
  final int? indexAccessor;
  final int materialIndex;

  const GltfPrimitiveDescriptor({
    required this.positionAccessor,
    this.normalAccessor,
    this.texcoord0Accessor,
    this.indexAccessor,
    this.materialIndex = 0,
  });

  factory GltfPrimitiveDescriptor.fromJson(Map<String, dynamic> json) {
    if ((json['mode'] as int? ?? 4) != 4) {
      throw const FormatException('only triangle primitives are supported');
    }
    final attributes = json['attributes'];
    if (attributes is! Map || attributes['POSITION'] is! int) {
      throw const FormatException('primitive POSITION accessor is required');
    }
    return GltfPrimitiveDescriptor(
      positionAccessor: attributes['POSITION'] as int,
      normalAccessor: attributes['NORMAL'] as int?,
      texcoord0Accessor: attributes['TEXCOORD_0'] as int?,
      indexAccessor: json['indices'] as int?,
      materialIndex: json['material'] as int? ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
    'positionAccessor': positionAccessor,
    'normalAccessor': normalAccessor,
    'texcoord0Accessor': texcoord0Accessor,
    'indexAccessor': indexAccessor,
    'materialIndex': materialIndex,
  };
}

final class GltfMaterialDescriptor {
  final String name;
  final List<double> baseColorFactor;
  final double metallicFactor;
  final double roughnessFactor;

  const GltfMaterialDescriptor({
    required this.name,
    this.baseColorFactor = const [1, 1, 1, 1],
    this.metallicFactor = 1,
    this.roughnessFactor = 1,
  });

  factory GltfMaterialDescriptor.fromJson(Map<String, dynamic> json) {
    final pbr = json['pbrMetallicRoughness'] as Map?;
    final factor =
        (pbr?['baseColorFactor'] as List?)
            ?.map((v) => (v as num).toDouble())
            .toList() ??
        [1, 1, 1, 1];
    if (factor.length != 4) {
      throw const FormatException('baseColorFactor must have four components');
    }
    final metallic = (pbr?['metallicFactor'] as num?)?.toDouble() ?? 1;
    final roughness = (pbr?['roughnessFactor'] as num?)?.toDouble() ?? 1;
    if (!metallic.isFinite ||
        !roughness.isFinite ||
        metallic < 0 ||
        metallic > 1 ||
        roughness < 0 ||
        roughness > 1) {
      throw const FormatException('material factors are outside [0,1]');
    }
    return GltfMaterialDescriptor(
      name: json['name'] as String? ?? 'material',
      baseColorFactor: factor,
      metallicFactor: metallic,
      roughnessFactor: roughness,
    );
  }

  Map<String, dynamic> toJson() => {
    'name': name,
    'baseColorFactor': baseColorFactor,
    'metallicFactor': metallicFactor,
    'roughnessFactor': roughnessFactor,
  };
}

final class GltfNodeDescriptor {
  final String name;
  final int? meshIndex;
  final List<double> translation;
  final List<double> rotation;
  final List<double> scale;

  const GltfNodeDescriptor({
    required this.name,
    this.meshIndex,
    this.translation = const [0, 0, 0],
    this.rotation = const [0, 0, 0, 1],
    this.scale = const [1, 1, 1],
  });

  factory GltfNodeDescriptor.fromJson(Map<String, dynamic> json) {
    List<double> vector(String key, int length, List<double> fallback) {
      final raw = json[key] as List?;
      if (raw == null) return fallback;
      if (raw.length != length) {
        throw FormatException('$key must have $length components');
      }
      return raw
          .map((value) => (value as num).toDouble())
          .toList(growable: false);
    }

    final node = GltfNodeDescriptor(
      name: json['name'] as String? ?? 'node',
      meshIndex: json['mesh'] as int?,
      translation: vector('translation', 3, const [0, 0, 0]),
      rotation: vector('rotation', 4, const [0, 0, 0, 1]),
      scale: vector('scale', 3, const [1, 1, 1]),
    );
    if ([
      ...node.translation,
      ...node.rotation,
      ...node.scale,
    ].any((value) => !value.isFinite)) {
      throw const FormatException('node transform contains non-finite values');
    }
    return node;
  }

  Map<String, dynamic> toJson() => {
    'name': name,
    'meshIndex': meshIndex,
    'translation': translation,
    'rotation': rotation,
    'scale': scale,
  };
}

final class GltfNormalizedScene {
  final List<GltfPrimitiveDescriptor> primitives;
  final List<GltfMaterialDescriptor> materials;
  final List<GltfNodeDescriptor> nodes;

  const GltfNormalizedScene({
    required this.primitives,
    required this.materials,
    this.nodes = const [],
  });

  Map<String, dynamic> toJson() => {
    'materials': materials.map((material) => material.toJson()).toList(),
    'primitives': primitives.map((primitive) => primitive.toJson()).toList(),
    'nodes': nodes.map((node) => node.toJson()).toList(),
  };

  String canonicalJson() => jsonEncode(toJson());
}

GltfNormalizedScene normalizeGltfScene(Map<String, dynamic> document) {
  final materials = [
    for (final raw in (document['materials'] as List? ?? const []))
      GltfMaterialDescriptor.fromJson(raw as Map<String, dynamic>),
  ];
  final primitives = <GltfPrimitiveDescriptor>[];
  for (final rawMesh in (document['meshes'] as List? ?? const [])) {
    final mesh = rawMesh as Map<String, dynamic>;
    for (final rawPrimitive in (mesh['primitives'] as List? ?? const [])) {
      final primitive = GltfPrimitiveDescriptor.fromJson(
        rawPrimitive as Map<String, dynamic>,
      );
      if (primitive.materialIndex >= materials.length && materials.isNotEmpty) {
        throw const FormatException('primitive material index is out of range');
      }
      primitives.add(primitive);
    }
  }
  if (primitives.isEmpty) {
    throw const FormatException('glTF document has no primitives');
  }
  final nodes = <GltfNodeDescriptor>[];
  final meshes = document['meshes'] as List? ?? const [];
  for (final raw in (document['nodes'] as List? ?? const [])) {
    final node = GltfNodeDescriptor.fromJson(raw as Map<String, dynamic>);
    if (node.meshIndex != null &&
        (node.meshIndex! < 0 || node.meshIndex! >= meshes.length)) {
      throw const FormatException('node mesh index is out of range');
    }
    nodes.add(node);
  }
  return GltfNormalizedScene(
    primitives: primitives,
    materials: materials,
    nodes: nodes,
  );
}

/// Production entry point: reject malformed source structure before emitting
/// a normalized scene record. The legacy normalizer remains available for
/// already-trusted in-memory fixtures and migration callers.
GltfNormalizedScene normalizeValidatedGltfScene(
  Map<String, dynamic> document, {
  int? binaryLength,
}) {
  validateGltfDocument(document, binaryLength: binaryLength);
  return normalizeGltfScene(document);
}
