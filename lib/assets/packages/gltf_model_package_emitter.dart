import 'dart:math' as math;
import 'dart:typed_data';

import '../importers/gltf_normalizer.dart';
import '../importers/gltf_validator.dart';
import '../importers/obj_importer.dart';
import 'model_package_manifest.dart';
import 'obj_model_package_emitter.dart';

/// Converts bounded glTF/GLB accessors into the same QMSH package path as OBJ.
/// It is an offline adapter; runtime code receives only the package contract.
final class GltfModelPackageEmitter {
  static ({ModelPackageManifest manifest, Map<String, Uint8List> payloads}) emit({
    required String assetId,
    required Map<String, dynamic> document,
    required Uint8List binary,
    String sourceFormat = 'gltf',
  }) {
    validateGltfDocument(document, binaryLength: binary.length);
    final normalized = normalizeGltfScene(document);
    final decoder = GltfAccessorDecoder(document: document, binary: binary);
    final positions = <List<double>>[];
    final texcoords = <List<double>>[];
    final normals = <List<double>>[];
    final triangles = <ObjTriangle>[];
    final materials = <String, ObjMaterialRecord>{};
    for (var index = 0; index < normalized.materials.length; index++) {
      final material = normalized.materials[index];
      materials[material.name] = ObjMaterialRecord(
        name: material.name,
        diffuse: material.baseColorFactor.take(3).toList(growable: false),
      );
    }
    for (final rawMesh in (document['meshes'] as List).cast<Map>()) {
      for (final rawPrimitive in (rawMesh['primitives'] as List).cast<Map>()) {
        final primitive = GltfPrimitiveDescriptor.fromJson(rawPrimitive.cast<String, dynamic>());
        final attributes = (rawPrimitive['attributes'] as Map).cast<String, dynamic>();
        final positionValues = decoder.decode(primitive.positionAccessor);
        final positionBase = positions.length;
        for (var i = 0; i < positionValues.length; i += 3) {
          positions.add(positionValues.sublist(i, i + 3));
        }
        final normalBase = normals.length;
        if (primitive.normalAccessor != null) {
          final values = decoder.decode(primitive.normalAccessor!);
          for (var i = 0; i < values.length; i += 3) {
            normals.add(values.sublist(i, i + 3));
          }
        }
        final texcoordBase = texcoords.length;
        if (primitive.texcoord0Accessor != null) {
          final values = decoder.decode(primitive.texcoord0Accessor!);
          for (var i = 0; i < values.length; i += 2) {
            texcoords.add(values.sublist(i, i + 2));
          }
        }
        final indices = primitive.indexAccessor == null
            ? List<int>.generate(positionValues.length ~/ 3, (i) => i)
            : decoder.decode(primitive.indexAccessor!).map((value) => value.toInt()).toList();
        if (indices.length % 3 != 0) throw const FormatException('glTF primitive indices are not triangles');
        final materialName = normalized.materials.isEmpty
            ? ''
            : normalized.materials[primitive.materialIndex].name;
        for (var i = 0; i < indices.length; i += 3) {
          final p = [positionBase + indices[i], positionBase + indices[i + 1], positionBase + indices[i + 2]];
          final n = primitive.normalAccessor == null ? [null, null, null] : [normalBase + indices[i], normalBase + indices[i + 1], normalBase + indices[i + 2]];
          final uv = primitive.texcoord0Accessor == null ? [null, null, null] : [texcoordBase + indices[i], texcoordBase + indices[i + 1], texcoordBase + indices[i + 2]];
          triangles.add(ObjTriangle(position: p, texcoord: uv, normal: n, material: materialName));
        }
        // Keep the accessors referenced so malformed attribute declarations do
        // not silently become an alternate package shape.
        if (attributes['POSITION'] is! int) throw const FormatException('glTF POSITION attribute is required');
      }
    }
    final min = [double.infinity, double.infinity, double.infinity];
    final max = [-double.infinity, -double.infinity, -double.infinity];
    for (final position in positions) {
      for (var i = 0; i < 3; i++) { min[i] = math.min(min[i], position[i]); max[i] = math.max(max[i], position[i]); }
    }
    final scene = ObjNormalizedScene(
      positions: positions,
      texcoords: texcoords,
      normals: normals,
      triangles: triangles,
      materials: materials.keys.toList()..sort(),
      bounds: [...min, ...max],
    );
    return ObjModelPackageEmitter.emit(
      assetId: assetId,
      scene: scene,
      materials: materials,
      sourceFormat: sourceFormat,
    );
  }
}
