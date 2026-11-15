import 'dart:math' as math;
import 'dart:typed_data';

import '../importers/obj_importer.dart';
import '../../rendering/assets/qmesh.dart';
import 'model_package_emitter.dart';
import 'model_package_manifest.dart';

final class ObjModelPackageEmitter {
  static ({ModelPackageManifest manifest, Map<String, Uint8List> payloads}) emit({
    required String assetId,
    required ObjNormalizedScene scene,
    required Map<String, ObjMaterialRecord> materials,
    String sourceFormat = 'obj',
    List<String> lods = const ['LOD-S', 'LOD0', 'LOD1', 'LOD2'],
    Map<String, String> provenance = const {},
  }) {
    validateObjMaterialBindings(scene, materials);
    final assigned = scene.triangles
        .map((triangle) => triangle.material)
        .where((name) => name.isNotEmpty)
        .toSet()
        .toList()
      ..sort();
    final hasUnassigned = scene.triangles.any(
      (triangle) => triangle.material.isEmpty,
    );
    final slots = <({String materialKey, String slotName})>[
      if (hasUnassigned)
        (
          materialKey: '',
          slotName: assigned.contains('default') ? 'unassigned' : 'default',
        ),
      for (final name in assigned) (materialKey: name, slotName: name),
    ];
    final names = [for (final slot in slots) slot.slotName];
    final payloads = <String, Uint8List>{};
    final parts = <ModelPackagePart>[];
    final usedRecords = <ObjMaterialRecord>[];
    for (var index = 0; index < slots.length; index++) {
      final slot = slots[index];
      final triangles = scene.triangles
          .where((triangle) => triangle.material == slot.materialKey)
          .toList(growable: false);
      final material =
          materials[slot.materialKey] ??
          (slot.materialKey.isEmpty ? materials['default'] : null);
      if (material != null) {
        usedRecords.add(material);
      }
      final path = 'mesh-${index.toString().padLeft(3, '0')}.qmesh';
      payloads[path] = _encodeQmesh(scene, triangles, material);
      parts.add(
        ModelPackagePart(
          id: 'mesh-${index.toString().padLeft(3, '0')}',
          materialSlot: index,
          lodFiles: {'LOD0': path},
        ),
      );
    }
    final texturePaths = <String>{
      for (final material in usedRecords) ...[
        if (material.diffuseTexture != null) material.diffuseTexture!,
        if (material.normalTexture != null) material.normalTexture!,
      ],
    }.toList()..sort();
    final mergedProvenance = <String, String>{
      'sourceFormat': sourceFormat,
      'normalization': 'pixeldart-normalized-mesh-v1',
      ...provenance,
    };
    final base = ModelPackageManifest(
      assetId: assetId,
      packageHash: '0' * 64,
      sourceFormat: sourceFormat,
      parts: parts,
      materials: names,
      textures: texturePaths,
      lods: lods,
      combinedBounds: scene.bounds,
      provenance: mergedProvenance,
    );
    final hash = ModelPackageEmitter.computePackageHash(base, payloads);
    return (
      manifest: ModelPackageManifest(
        assetId: assetId,
        packageHash: hash,
        sourceFormat: sourceFormat,
        parts: parts,
        materials: names,
        textures: texturePaths,
        lods: lods,
        combinedBounds: scene.bounds,
        provenance: mergedProvenance,
      ),
      payloads: payloads,
    );
  }
}

Uint8List _encodeQmesh(
  ObjNormalizedScene scene,
  List<ObjTriangle> triangles,
  ObjMaterialRecord? material,
) {
  if (triangles.isEmpty) {
    throw const FormatException('OBJ part contains no triangles');
  }
  const stride = 18;
  final bytes = Uint8List(36 + triangles.length * 3 * stride * 4);
  final view = ByteData.sublistView(bytes);
  bytes.setAll(0, const [0x51, 0x4D, 0x53, 0x48]);
  view.setUint16(4, 2, Endian.little);
  view.setUint16(6, stride, Endian.little);
  view.setUint32(8, triangles.length * 3, Endian.little);

  final min = [double.infinity, double.infinity, double.infinity];
  final max = [-double.infinity, -double.infinity, -double.infinity];
  for (final triangle in triangles) {
    for (final posIdx in triangle.position) {
      final p = scene.positions[posIdx];
      for (var i = 0; i < 3; i++) {
        min[i] = math.min(min[i], p[i]);
        max[i] = math.max(max[i], p[i]);
      }
    }
  }
  final bounds = [...min, ...max];
  for (var i = 0; i < 6; i++) {
    view.setFloat32(12 + i * 4, bounds[i], Endian.little);
  }
  final color = material?.diffuse ?? const [0.8, 0.8, 0.8];
  var vertex = 0;
  for (final triangle in triangles) {
    final p0 = scene.positions[triangle.position[0]];
    final p1 = scene.positions[triangle.position[1]];
    final p2 = scene.positions[triangle.position[2]];
    final fallbackNormal = _faceNormal(p0, p1, p2);
    for (var corner = 0; corner < 3; corner++) {
      final position = scene.positions[triangle.position[corner]];
      final normal = triangle.normal[corner] == null
          ? fallbackNormal
          : _unit(scene.normals[triangle.normal[corner]!]);
      final tangent = _tangent(normal);
      final uv = triangle.texcoord[corner] == null
          ? const [0.0, 0.0]
          : scene.texcoords[triangle.texcoord[corner]!];
      final values = [
        ...position,
        ...normal,
        ...tangent,
        color[0], color[1], color[2], 1.0,
        1.0,
        uv[0], uv[1],
        0.0,
      ];
      final base = 36 + vertex * stride * 4;
      for (var i = 0; i < values.length; i++) {
        view.setFloat32(base + i * 4, values[i], Endian.little);
      }
      vertex++;
    }
  }
  // Decode once here so an encoder bug cannot emit an invalid runtime mesh.
  decodeQmesh(bytes);
  return bytes;
}

List<double> _faceNormal(List<double> p0, List<double> p1, List<double> p2) {
  final ax = p1[0] - p0[0], ay = p1[1] - p0[1], az = p1[2] - p0[2];
  final bx = p2[0] - p0[0], by = p2[1] - p0[1], bz = p2[2] - p0[2];
  final cx = ay * bz - az * by;
  final cy = az * bx - ax * bz;
  final cz = ax * by - ay * bx;
  final length = math.sqrt(cx * cx + cy * cy + cz * cz);
  if (!length.isFinite || length < 1e-8) return const [0.0, 0.0, 1.0];
  return [cx / length, cy / length, cz / length];
}

List<double> _unit(List<double> value) {
  final length = math.sqrt(value[0] * value[0] + value[1] * value[1] + value[2] * value[2]);
  if (!length.isFinite || length < 1e-8) throw const FormatException('OBJ normal is zero');
  return [value[0] / length, value[1] / length, value[2] / length];
}

List<double> _tangent(List<double> normal) {
  final candidate = normal[0].abs() < 0.9
      ? [0.0, normal[2], -normal[1]]
      : [-normal[2], 0.0, normal[0]];
  return [..._unit(candidate), 1.0];
}
