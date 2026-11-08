import 'dart:convert';
import 'dart:math' as math;

final class ObjImportLimits {
  final int maxLines;
  final int maxVertices;
  final int maxFaces;
  final int maxMaterials;

  const ObjImportLimits({
    this.maxLines = 1 << 20,
    this.maxVertices = 1 << 20,
    this.maxFaces = 1 << 20,
    this.maxMaterials = 4096,
  });
}

final class ObjMaterialRecord {
  final String name;
  final List<double> diffuse;
  final List<double> specular;
  final double shininess;
  final String? diffuseTexture;
  final String? normalTexture;

  const ObjMaterialRecord({
    required this.name,
    this.diffuse = const [0.8, 0.8, 0.8],
    this.specular = const [0, 0, 0],
    this.shininess = 1,
    this.diffuseTexture,
    this.normalTexture,
  });

  Map<String, dynamic> toJson() => {
    'name': name,
    'diffuse': diffuse,
    'specular': specular,
    'shininess': shininess,
    'diffuseTexture': diffuseTexture,
    'normalTexture': normalTexture,
  };
}

/// Parses the bounded MTL subset used by the normalized asset contract.
Map<String, ObjMaterialRecord> parseMtl(
  String source, {
  Set<String>? availableFiles,
  ObjImportLimits limits = const ObjImportLimits(),
}) {
  final records = <String, ObjMaterialRecord>{};
  String? name;
  var diffuse = const [0.8, 0.8, 0.8];
  var specular = const [0.0, 0.0, 0.0];
  var shininess = 1.0;
  String? diffuseTexture;
  String? normalTexture;

  void finish() {
    if (name == null) return;
    final String materialName = name;
    if (records.containsKey(materialName)) throw FormatException('duplicate MTL material: $materialName');
    records[materialName] = ObjMaterialRecord(
      name: name,
      diffuse: diffuse,
      specular: specular,
      shininess: shininess,
      diffuseTexture: diffuseTexture,
      normalTexture: normalTexture,
    );
  }
  double colorValue(String raw) {
    final value = double.tryParse(raw);
    if (value == null || !value.isFinite || value < 0 || value > 1) {
      throw const FormatException('MTL color component is invalid');
    }
    return value;
  }
  String texture(String raw) {
    if (!_isSafeRelativePath(raw)) throw const FormatException('MTL texture path is unsafe');
    if (availableFiles != null && !availableFiles.contains(raw)) {
      throw FormatException('MTL texture media is missing: $raw');
    }
    return raw;
  }

  var lines = 0;
  for (final rawLine in source.split('\n')) {
    if (++lines > limits.maxLines) throw const FormatException('MTL line limit exceeded');
    final line = rawLine.trim();
    if (line.isEmpty || line.startsWith('#')) continue;
    final fields = line.split(RegExp(r'\s+'));
    switch (fields.first) {
      case 'newmtl':
        if (fields.length != 2 || fields[1].isEmpty) throw const FormatException('MTL material name is invalid');
        finish();
        name = fields[1];
        diffuse = const [0.8, 0.8, 0.8];
        specular = const [0.0, 0.0, 0.0];
        shininess = 1;
        diffuseTexture = null;
        normalTexture = null;
      case 'Kd':
        if (fields.length != 4) throw const FormatException('MTL Kd requires three components');
        diffuse = [colorValue(fields[1]), colorValue(fields[2]), colorValue(fields[3])];
      case 'Ks':
        if (fields.length != 4) throw const FormatException('MTL Ks requires three components');
        specular = [colorValue(fields[1]), colorValue(fields[2]), colorValue(fields[3])];
      case 'Ns':
        if (fields.length != 2) throw const FormatException('MTL Ns requires one component');
        shininess = double.tryParse(fields[1]) ?? double.nan;
        if (!shininess.isFinite || shininess < 0) throw const FormatException('MTL shininess is invalid');
      case 'map_Kd':
        if (fields.length != 2) throw const FormatException('MTL map_Kd requires one path');
        diffuseTexture = texture(fields[1]);
      case 'map_Bump' || 'bump':
        if (fields.length != 2) throw const FormatException('MTL normal map requires one path');
        normalTexture = texture(fields[1]);
      default:
        // Illumination and optical hints do not change the v1 PBR record.
        break;
    }
  }
  finish();
  if (records.isEmpty) throw const FormatException('MTL has no materials');
  return Map.unmodifiable(records);
}

final class ObjTriangle {
  final List<int> position;
  final List<int?> texcoord;
  final List<int?> normal;
  final String material;

  const ObjTriangle({
    required this.position,
    required this.texcoord,
    required this.normal,
    required this.material,
  });

  Map<String, dynamic> toJson() => {
    'position': position,
    'texcoord': texcoord,
    'normal': normal,
    'material': material,
  };
}

final class ObjNormalizedScene {
  final List<List<double>> positions;
  final List<List<double>> texcoords;
  final List<List<double>> normals;
  final List<ObjTriangle> triangles;
  final List<String> materials;
  final List<double> bounds;

  const ObjNormalizedScene({
    required this.positions,
    required this.texcoords,
    required this.normals,
    required this.triangles,
    required this.materials,
    required this.bounds,
  });

  Map<String, dynamic> toJson() => {
    'positions': positions,
    'texcoords': texcoords,
    'normals': normals,
    'triangles': triangles.map((triangle) => triangle.toJson()).toList(),
    'materials': materials,
    'bounds': bounds,
  };

  /// Stable machine-readable representation for hashing and equivalence tests.
  String canonicalJson() => jsonEncode(toJson());
}

/// Verifies that every explicit OBJ material slot has a corresponding MTL
/// record.  An empty slot is the format's implicit default material and is
/// intentionally allowed.
ObjNormalizedScene validateObjMaterialBindings(
  ObjNormalizedScene scene,
  Map<String, ObjMaterialRecord> records,
) {
  for (final triangle in scene.triangles) {
    if (triangle.material.isNotEmpty && !records.containsKey(triangle.material)) {
      throw FormatException('OBJ material is missing from MTL: ${triangle.material}');
    }
  }
  return scene;
}

ObjNormalizedScene parseObj(String source, {ObjImportLimits limits = const ObjImportLimits()}) {
  final positions = <List<double>>[];
  final texcoords = <List<double>>[];
  final normals = <List<double>>[];
  final triangles = <ObjTriangle>[];
  final materials = <String>{};
  var material = '';
  var lineCount = 0;

  int resolveIndex(String raw, int length, String label) {
    final value = int.tryParse(raw);
    if (value == null || value == 0) throw FormatException('$label index is invalid');
    final resolved = value < 0 ? length + value : value - 1;
    if (resolved < 0 || resolved >= length) throw FormatException('$label index is out of range');
    return resolved;
  }

  for (final rawLine in source.split('\n')) {
    if (++lineCount > limits.maxLines) throw const FormatException('OBJ line limit exceeded');
    final line = rawLine.trim();
    if (line.isEmpty || line.startsWith('#')) continue;
    final fields = line.split(RegExp(r'\s+'));
    final tag = fields.first;
    double number(String value) {
      final parsed = double.tryParse(value);
      if (parsed == null || !parsed.isFinite) throw FormatException('OBJ numeric value is invalid');
      return parsed;
    }
    if (tag == 'v' || tag == 'vn') {
      if (fields.length != 4) throw FormatException('OBJ $tag requires three components');
      final target = [number(fields[1]), number(fields[2]), number(fields[3])];
      (tag == 'v' ? positions : normals).add(target);
      if (positions.length > limits.maxVertices) throw const FormatException('OBJ vertex limit exceeded');
    } else if (tag == 'vt') {
      if (fields.length < 2 || fields.length > 4) throw const FormatException('OBJ vt is malformed');
      texcoords.add([number(fields[1]), fields.length > 2 ? number(fields[2]) : 0]);
    } else if (tag == 'usemtl' || tag == 'g' || tag == 'o') {
      if (fields.length < 2) throw FormatException('OBJ $tag requires a name');
      if (tag == 'usemtl') {
        material = fields[1];
        materials.add(material);
        if (materials.length > limits.maxMaterials) throw const FormatException('OBJ material limit exceeded');
      }
    } else if (tag == 'mtllib') {
      if (fields.length != 2 || !_isSafeRelativePath(fields[1])) {
        throw const FormatException('OBJ MTL reference is not a safe local path');
      }
    } else if (tag == 'f') {
      if (fields.length < 4) throw const FormatException('OBJ face has fewer than three corners');
      final corners = fields.skip(1).map((field) {
        final parts = field.split('/');
        return (
          resolveIndex(parts[0], positions.length, 'position'),
          parts.length > 1 && parts[1].isNotEmpty ? resolveIndex(parts[1], texcoords.length, 'texcoord') : null,
          parts.length > 2 && parts[2].isNotEmpty ? resolveIndex(parts[2], normals.length, 'normal') : null,
        );
      }).toList();
      for (var i = 1; i < corners.length - 1; i++) {
        final a = corners[0], b = corners[i], c = corners[i + 1];
        triangles.add(ObjTriangle(
          position: [a.$1, b.$1, c.$1],
          texcoord: [a.$2, b.$2, c.$2],
          normal: [a.$3, b.$3, c.$3],
          material: material,
        ));
        if (triangles.length > limits.maxFaces) throw const FormatException('OBJ face limit exceeded');
      }
    } else if (const {'vp', 'l', 'curv', 'surf', 'parm', 'trim', 'hole', 'scrv', 'sp', 'end'}.contains(tag)) {
      throw FormatException('unsupported OBJ free-form or line element: $tag');
    }
  }
  if (positions.isEmpty || triangles.isEmpty) throw const FormatException('OBJ has no renderable triangles');
  final min = [double.infinity, double.infinity, double.infinity];
  final max = [-double.infinity, -double.infinity, -double.infinity];
  for (final vertex in positions) {
    for (var i = 0; i < 3; i++) {
      min[i] = math.min(min[i], vertex[i]);
      max[i] = math.max(max[i], vertex[i]);
    }
  }
  return ObjNormalizedScene(
    positions: List.unmodifiable(positions),
    texcoords: List.unmodifiable(texcoords),
    normals: List.unmodifiable(normals),
    triangles: List.unmodifiable(triangles),
    materials: List.unmodifiable(materials.toList()..sort()),
    bounds: [...min, ...max],
  );
}

bool _isSafeRelativePath(String value) =>
    value.isNotEmpty && !value.contains('://') && !value.startsWith('/') && !value.split('/').contains('..');
