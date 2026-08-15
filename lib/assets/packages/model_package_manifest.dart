import 'dart:convert';

import '../importers/fbx_import_config.dart';

/// Source-neutral package manifest. Source format is provenance only; runtime
/// loaders consume this schema rather than FBX/glTF-specific records.
final class ModelPackageManifest {
  final String schema;
  final String assetId;
  final String packageHash;
  final String sourceFormat;
  final List<ModelPackagePart> parts;
  final List<String> materials;
  final List<String> textures;
  final List<String> lods;
  final List<double> combinedBounds;
  final Map<String, List<double>> sockets;
  final Map<String, String> provenance;

  const ModelPackageManifest({
    this.schema = 'pixeldart-model-package-v1',
    required this.assetId,
    required this.packageHash,
    required this.sourceFormat,
    required this.parts,
    this.materials = const [],
    this.textures = const [],
    this.lods = const ['LOD-S', 'LOD0', 'LOD1', 'LOD2'],
    this.combinedBounds = const [],
    this.sockets = const {},
    this.provenance = const {},
  });

  factory ModelPackageManifest.fromJson(Map<String, dynamic> json) {
    if (json['schema'] != 'pixeldart-model-package-v1') {
      throw const FormatException('unsupported model package schema');
    }
    final rawParts = json['parts'];
    if (rawParts is! List || rawParts.isEmpty) {
      throw const FormatException('model package parts must be non-empty');
    }
    return ModelPackageManifest(
      assetId: _required(json, 'assetId'),
      packageHash: _required(json, 'packageHash'),
      sourceFormat: _required(json, 'sourceFormat'),
      parts: [
        for (final raw in rawParts)
          ModelPackagePart.fromJson(raw as Map<String, dynamic>),
      ],
      materials: _strings(json['materials']),
      textures: _strings(json['textures']),
      lods: _strings(json['lods']),
      combinedBounds: _numbers(json['combinedBounds']),
      sockets: _socketMap(json['sockets']),
      provenance:
          (json['provenance'] as Map?)?.map(
            (key, value) => MapEntry(key.toString(), value.toString()),
          ) ??
          const {},
    );
  }

  List<String> validate() {
    final errors = <String>[];
    if (!RegExp(r'^[a-z0-9]+(?:-[a-z0-9]+)*$').hasMatch(assetId)) {
      errors.add('assetId must be kebab-case');
    }
    if (!RegExp(r'^[0-9a-f]{64}$').hasMatch(packageHash)) {
      errors.add('packageHash must be lowercase SHA-256');
    }
    if (sourceFormat.isEmpty) errors.add('sourceFormat is required');
    if (parts.isEmpty) errors.add('parts must be non-empty');
    if (lods.toSet().length != lods.length) errors.add('lods must be unique');
    if (!lods.contains('LOD0')) errors.add('LOD0 is required');
    if (combinedBounds.isNotEmpty &&
        (combinedBounds.length != 6 ||
            combinedBounds.any((value) => !value.isFinite))) {
      errors.add('combinedBounds must contain six finite values');
    }
    for (final entry in sockets.entries) {
      if (entry.key.isEmpty ||
          entry.value.length != 16 ||
          entry.value.any((value) => !value.isFinite)) {
        errors.add(
          'socket ${entry.key} must contain sixteen finite transform values',
        );
      }
    }
    for (final part in parts) {
      if (part.materialSlot < 0 || part.materialSlot >= materials.length) {
        errors.add('part material slot is outside materials');
      }
      if (part.lodFiles.isEmpty) {
        errors.add('part ${part.id} must declare payload files');
      }
      for (final path in part.lodFiles.values) {
        if (!_isSafeRelativePath(path)) {
          errors.add('part ${part.id} contains unsafe payload path');
        }
      }
    }
    return errors;
  }

  Map<String, dynamic> toJson({bool includeHash = true}) => {
    'schema': schema,
    'assetId': assetId,
    if (includeHash) 'packageHash': packageHash,
    'sourceFormat': sourceFormat,
    'parts': parts.map((part) => part.toJson()).toList(),
    'materials': materials,
    'textures': textures,
    'lods': lods,
    'combinedBounds': combinedBounds,
    'sockets': sockets,
    'provenance': provenance,
  };

  String canonicalJson({bool includeHash = true}) =>
      jsonEncode(toJson(includeHash: includeHash));

  String computedPackageHash() =>
      Sha256.compute(utf8.encode(canonicalJson(includeHash: false)));
}

final class ModelPackagePart {
  final String id;
  final int materialSlot;
  final Map<String, String> lodFiles;

  const ModelPackagePart({
    required this.id,
    required this.materialSlot,
    required this.lodFiles,
  });

  factory ModelPackagePart.fromJson(Map<String, dynamic> json) =>
      ModelPackagePart(
        id: _required(json, 'id'),
        materialSlot:
            json['materialSlot'] as int? ??
            (throw const FormatException('materialSlot is required')),
        lodFiles:
            (json['lodFiles'] as Map?)?.map(
              (key, value) => MapEntry(key.toString(), value.toString()),
            ) ??
            const {},
      );

  Map<String, dynamic> toJson() => {
    'id': id,
    'materialSlot': materialSlot,
    'lodFiles': lodFiles,
  };
}

String _required(Map<String, dynamic> json, String key) {
  final value = json[key];
  if (value is! String || value.isEmpty) {
    throw FormatException('$key is required');
  }
  return value;
}

bool _isSafeRelativePath(String path) {
  if (path.isEmpty || path.startsWith('/') || path.contains('\\')) {
    return false;
  }
  final segments = path.split('/');
  return segments.every(
    (segment) => segment.isNotEmpty && segment != '.' && segment != '..',
  );
}

List<String> _strings(Object? value) {
  if (value == null) return const [];
  if (value is! List || value.any((item) => item is! String)) {
    throw const FormatException('manifest string array is malformed');
  }
  return [for (final item in value) item as String];
}

List<double> _numbers(Object? value) {
  if (value == null) return const [];
  if (value is! List || value.any((item) => item is! num)) {
    throw const FormatException('manifest numeric array is malformed');
  }
  return [for (final item in value) (item as num).toDouble()];
}

Map<String, List<double>> _socketMap(Object? value) {
  if (value == null) return const {};
  if (value is! Map) {
    throw const FormatException('manifest socket map is malformed');
  }
  if (value.keys.any((key) => key is! String)) {
    throw const FormatException('manifest socket names are malformed');
  }
  return {
    for (final entry in value.entries)
      if (entry.key is String) entry.key as String: _numbers(entry.value),
  };
}
