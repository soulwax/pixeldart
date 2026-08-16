import 'dart:math' as math;
import 'dart:typed_data';

import '../importers/obj_importer.dart';
import '../../rendering/assets/qmesh.dart';
import 'model_package_emitter.dart';
import 'model_package_manifest.dart';

/// Emits the source-neutral package shape from a validated OBJ/MTL scene.
///
/// The payload is deterministic QMSH v2, not an OBJ runtime type. This lets
/// the existing source-neutral cache decode the package without format
/// branches.
final class ObjModelPackageEmitter {
  static ({ModelPackageManifest manifest, Map<String, Uint8List> payloads}) emit({
    required String assetId,
    required ObjNormalizedScene scene,
    required Map<String, ObjMaterialRecord> materials,
    String sourceFormat = 'obj',
  }) {
    validateObjMaterialBindings(scene, materials);
    final usedNames = scene.triangles
        .map((triangle) => triangle.material)
        .where((name) => name.isNotEmpty)
        .toSet()
        .toList()
      ..sort();
    final names = usedNames.isEmpty ? const ['default'] : usedNames;
    final payloads = <String, Uint8List>{};
    final parts = <ModelPackagePart>[];
    for (var index = 0; index < names.length; index++) {
      final name = names[index];
      final triangles = scene.triangles
          .where((triangle) => triangle.material == (name == 'default' ? '' : name))
          .toList(growable: false);
      final path = 'mesh-${index.toString().padLeft(3, '0')}.qmesh';
      payloads[path] = _encodeQmesh(scene, triangles, materials[name]);
      parts.add(
        ModelPackagePart(
          id: 'mesh-${index.toString().padLeft(3, '0')}',
          materialSlot: index,
          lodFiles: {'LOD0': path},
        ),
      );
    }
    final texturePaths = <String>{
      for (final material in materials.values)
        if (material.diffuseTexture != null) material.diffuseTexture!,
      for (final material in materials.values)
        if (material.normalTexture != null) material.normalTexture!,
    }.toList()..sort();
    final base = ModelPackageManifest(
      assetId: assetId,
      packageHash: '0' * 64,
      sourceFormat: sourceFormat,
      parts: parts,
      materials: names,
      textures: texturePaths,
      combinedBounds: scene.bounds,
      provenance: {
        'sourceFormat': sourceFormat,
        'normalization': 'pixeldart-normalized-mesh-v1',
      },
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
        combinedBounds: scene.bounds,
        provenance: {
          'sourceFormat': sourceFormat,
          'normalization': 'pixeldart-normalized-mesh-v1',
        },
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
  const stride = 18;
  final bytes = Uint8List(36 + triangles.length * 3 * stride * 4);
  final view = ByteData.sublistView(bytes);
  bytes.setAll(0, const [0x51, 0x4D, 0x53, 0x48]);
  view.setUint16(4, 2, Endian.little);
  view.setUint16(6, stride, Endian.little);
  view.setUint32(8, triangles.length * 3, Endian.little);
  for (var i = 0; i < 6; i++) {
    view.setFloat32(12 + i * 4, scene.bounds[i], Endian.little);
  }
  final color = material?.diffuse ?? const [0.8, 0.8, 0.8];
  var vertex = 0;
  for (final triangle in triangles) {
    for (var corner = 0; corner < 3; corner++) {
      final position = scene.positions[triangle.position[corner]];
      final normal = triangle.normal[corner] == null
          ? const [0.0, 0.0, 1.0]
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
