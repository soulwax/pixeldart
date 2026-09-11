import 'dart:convert';
import 'dart:typed_data';

import '../api/materials.dart';
import '../api/mesh.dart';
import '../math/bounds.dart';
import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import '../scene/scene_node.dart';

/// A primitive decoded from a glTF 2.0 binary asset.
final class GlbPrimitive {
  final MeshData mesh;
  final int materialIndex;
  const GlbPrimitive({required this.mesh, required this.materialIndex});
}

/// A decoded glTF mesh containing one or more primitives.
final class GlbMesh {
  final String name;
  final List<GlbPrimitive> primitives;
  const GlbMesh({required this.name, required this.primitives});
}

/// Result of decoding a GLB asset, containing CPU meshes, materials, and a scene hierarchy.
final class GlbResult {
  final SceneNode rootNode;
  final List<MeshData> meshes;
  final List<MaterialDefinition> materials;

  const GlbResult({
    required this.rootNode,
    required this.meshes,
    required this.materials,
  });
}

/// Pure Dart GLB 2.0 decoder converting glTF buffers into Pixeldart `MeshData`,
/// `MaterialDefinition`, and `SceneNode` hierarchies.
final class GlbDecoder {
  final Map<String, dynamic> _json;
  final ByteData _bin;

  GlbDecoder._(this._json, Uint8List binary) : _bin = ByteData.sublistView(binary);

  /// Decodes GLB bytes into a complete [GlbResult].
  static GlbResult decode(Uint8List bytes) {
    if (bytes.length < 12) {
      throw const FormatException('GLB header is truncated');
    }
    final header = ByteData.sublistView(bytes);
    if (header.getUint32(0, Endian.little) != 0x46546c67) {
      throw const FormatException('GLB magic is invalid');
    }
    if (header.getUint32(4, Endian.little) != 2) {
      throw FormatException('Unsupported GLB version: ${header.getUint32(4, Endian.little)}');
    }

    Map<String, dynamic>? json;
    Uint8List? binary;
    var offset = 12;

    while (offset < bytes.length) {
      if (bytes.length - offset < 8) break;
      final chunkLength = header.getUint32(offset, Endian.little);
      final chunkType = header.getUint32(offset + 4, Endian.little);
      final start = offset + 8;
      final end = start + chunkLength;
      if (end > bytes.length) {
        throw const FormatException('GLB chunk exceeds container bounds');
      }

      final payload = Uint8List.sublistView(bytes, start, end);
      if (chunkType == 0x4e4f534a) {
        // JSON chunk
        final decoded = jsonDecode(utf8.decode(payload).trimRight());
        if (decoded is Map<String, dynamic>) {
          json = decoded;
        } else if (decoded is Map) {
          json = decoded.cast<String, dynamic>();
        }
      } else if (chunkType == 0x004e4942) {
        // BIN chunk
        binary = payload;
      }
      offset = end;
    }

    if (json == null) throw const FormatException('GLB is missing JSON chunk');
    binary ??= Uint8List(0);

    return GlbDecoder._(json, binary)._decodeAll();
  }

  GlbResult _decodeAll() {
    final materials = _decodeMaterials();
    final meshes = _decodeMeshes();
    final allMeshDatas = <MeshData>[];
    for (final m in meshes) {
      for (final p in m.primitives) {
        allMeshDatas.add(p.mesh);
      }
    }

    final rootNode = _decodeSceneHierarchy(meshes, materials);
    return GlbResult(rootNode: rootNode, meshes: allMeshDatas, materials: materials);
  }

  List<MaterialDefinition> _decodeMaterials() {
    final rawMaterials = _json['materials'] as List<dynamic>?;
    if (rawMaterials == null || rawMaterials.isEmpty) {
      return [const MaterialDefinition(key: 'default_glb_mat')];
    }

    final materials = <MaterialDefinition>[];
    for (var i = 0; i < rawMaterials.length; i++) {
      final mat = rawMaterials[i] as Map<String, dynamic>;
      final name = mat['name'] as String? ?? 'material_$i';
      final pbr = mat['pbrMetallicRoughness'] as Map<String, dynamic>?;

      var r = 1.0, g = 1.0, b = 1.0;
      var metallic = 1.0;
      var roughness = 1.0;

      if (pbr != null) {
        final baseColor = pbr['baseColorFactor'] as List<dynamic>?;
        if (baseColor != null && baseColor.length >= 3) {
          r = (baseColor[0] as num).toDouble();
          g = (baseColor[1] as num).toDouble();
          b = (baseColor[2] as num).toDouble();
        }
        metallic = (pbr['metallicFactor'] as num?)?.toDouble() ?? 1.0;
        roughness = (pbr['roughnessFactor'] as num?)?.toDouble() ?? 1.0;
      }

      materials.add(
        MaterialDefinition(
          key: name,
          tintR: r,
          tintG: g,
          tintB: b,
          metallic: metallic.clamp(0.0, 1.0),
          roughness: roughness.clamp(0.0, 1.0),
        ),
      );
    }
    return materials;
  }

  List<GlbMesh> _decodeMeshes() {
    final rawMeshes = _json['meshes'] as List<dynamic>?;
    if (rawMeshes == null) return [];

    final meshes = <GlbMesh>[];
    for (var i = 0; i < rawMeshes.length; i++) {
      final meshJson = rawMeshes[i] as Map<String, dynamic>;
      final name = meshJson['name'] as String? ?? 'mesh_$i';
      final rawPrimitives = meshJson['primitives'] as List<dynamic>? ?? [];
      final primitives = <GlbPrimitive>[];

      for (final primJson in rawPrimitives) {
        if (primJson is! Map<String, dynamic>) continue;
        final attrs = primJson['attributes'] as Map<String, dynamic>? ?? {};
        final posAccessorIdx = attrs['POSITION'] as int?;
        if (posAccessorIdx == null) continue;

        final positions = _readFloatAccessor(posAccessorIdx, 3);
        final vertexCount = positions.length ~/ 3;

        final normAccessorIdx = attrs['NORMAL'] as int?;
        final normals = normAccessorIdx != null
            ? _readFloatAccessor(normAccessorIdx, 3)
            : List<double>.generate(vertexCount * 3, (idx) => idx % 3 == 1 ? 1.0 : 0.0);

        final uvAccessorIdx = attrs['TEXCOORD_0'] as int?;
        final uvs = uvAccessorIdx != null
            ? _readFloatAccessor(uvAccessorIdx, 2)
            : List<double>.filled(vertexCount * 2, 0.0);

        final tanAccessorIdx = attrs['TANGENT'] as int?;
        final tangents = tanAccessorIdx != null
            ? _readFloatAccessor(tanAccessorIdx, 4)
            : List<double>.generate(vertexCount * 4, (idx) => idx % 4 == 0 || idx % 4 == 3 ? 1.0 : 0.0);

        final indexAccessorIdx = primJson['indices'] as int?;
        final indices = indexAccessorIdx != null
            ? _readIndexAccessor(indexAccessorIdx)
            : List<int>.generate(vertexCount, (i) => i);

        final bounds = _calculateBounds(positions);
        final surfaceFloats = Float32List(vertexCount * 18);

        for (var v = 0; v < vertexCount; v++) {
          final o = v * 18;
          surfaceFloats[o] = positions[v * 3];
          surfaceFloats[o + 1] = positions[v * 3 + 1];
          surfaceFloats[o + 2] = positions[v * 3 + 2];

          surfaceFloats[o + 3] = normals[v * 3];
          surfaceFloats[o + 4] = normals[v * 3 + 1];
          surfaceFloats[o + 5] = normals[v * 3 + 2];

          surfaceFloats[o + 6] = tangents[v * 4];
          surfaceFloats[o + 7] = tangents[v * 4 + 1];
          surfaceFloats[o + 8] = tangents[v * 4 + 2];
          surfaceFloats[o + 9] = tangents[v * 4 + 3];

          surfaceFloats[o + 10] = 1.0;
          surfaceFloats[o + 11] = 1.0;
          surfaceFloats[o + 12] = 1.0;
          surfaceFloats[o + 13] = 1.0;
          surfaceFloats[o + 14] = 1.0;

          surfaceFloats[o + 15] = uvs[v * 2];
          surfaceFloats[o + 16] = uvs[v * 2 + 1];
          surfaceFloats[o + 17] = 0.0;
        }

        final meshData = MeshData(
          layout: VertexLayoutDescriptor.surfaceV2,
          vertices: surfaceFloats,
          indices: Uint16List.fromList(indices),
          localBounds: bounds,
        );
        meshData.validate();

        final matIdx = primJson['material'] as int? ?? 0;
        primitives.add(GlbPrimitive(mesh: meshData, materialIndex: matIdx));
      }
      meshes.add(GlbMesh(name: name, primitives: primitives));
    }
    return meshes;
  }

  SceneNode _decodeSceneHierarchy(List<GlbMesh> meshes, List<MaterialDefinition> materials) {
    final rawNodes = _json['nodes'] as List<dynamic>? ?? [];
    final root = SceneNode.group(name: 'glb_root');
    final sceneNodes = <SceneNode>[];

    for (var i = 0; i < rawNodes.length; i++) {
      final nodeJson = rawNodes[i] as Map<String, dynamic>;
      final name = nodeJson['name'] as String? ?? 'node_$i';

      var translation = Vec3.zero;
      final t = nodeJson['translation'] as List<dynamic>?;
      if (t != null && t.length >= 3) {
        translation = Vec3((t[0] as num).toDouble(), (t[1] as num).toDouble(), (t[2] as num).toDouble());
      }

      var rotation = Quat.identity;
      final r = nodeJson['rotation'] as List<dynamic>?;
      if (r != null && r.length >= 4) {
        rotation = Quat(
          (r[0] as num).toDouble(),
          (r[1] as num).toDouble(),
          (r[2] as num).toDouble(),
          (r[3] as num).toDouble(),
        );
      }

      var scale = 1.0;
      final s = nodeJson['scale'] as List<dynamic>?;
      if (s != null && s.isNotEmpty) {
        scale = (s[0] as num).toDouble();
      }

      final sNode = SceneNode(
        name: name,
        transform: Transform(translation: translation, rotation: rotation, scale: scale > 0 ? scale : 1.0),
      );
      sceneNodes.add(sNode);
    }

    // Link children and attach meshes
    final isChild = List<bool>.filled(sceneNodes.length, false);
    for (var i = 0; i < rawNodes.length; i++) {
      final nodeJson = rawNodes[i] as Map<String, dynamic>;
      final parentNode = sceneNodes[i];
      final childIndices = nodeJson['children'] as List<dynamic>?;
      if (childIndices != null) {
        for (final cIdx in childIndices) {
          if (cIdx is int && cIdx >= 0 && cIdx < sceneNodes.length) {
            parentNode.addChild(sceneNodes[cIdx]);
            isChild[cIdx] = true;
          }
        }
      }

      final meshIdx = nodeJson['mesh'] as int?;
      if (meshIdx != null && meshIdx >= 0 && meshIdx < meshes.length) {
        final glbMesh = meshes[meshIdx];
        for (var p = 0; p < glbMesh.primitives.length; p++) {
          final prim = glbMesh.primitives[p];
          final primNode = p == 0 ? parentNode : parentNode.add(name: '${parentNode.name}_prim_$p');
          // In CPU GlbResult, mesh and material references are identified by index
          // MeshHandles and MaterialHandles are assigned by PixeldartApp upon scene attachment
          primNode.sortTiebreaker = prim.materialIndex;
        }
      }
    }

    for (var i = 0; i < sceneNodes.length; i++) {
      if (!isChild[i]) {
        root.addChild(sceneNodes[i]);
      }
    }

    return root;
  }

  List<double> _readFloatAccessor(int accessorIndex, int componentsPerElement) {
    final accessors = _json['accessors'] as List<dynamic>;
    final bufferViews = _json['bufferViews'] as List<dynamic>;

    final acc = accessors[accessorIndex] as Map<String, dynamic>;
    final viewIdx = acc['bufferView'] as int;
    final view = bufferViews[viewIdx] as Map<String, dynamic>;

    final baseOffset = (view['byteOffset'] as int? ?? 0) + (acc['byteOffset'] as int? ?? 0);
    final count = acc['count'] as int;
    final stride = view['byteStride'] as int? ?? (componentsPerElement * 4);

    final out = List<double>.filled(count * componentsPerElement, 0.0);
    for (var i = 0; i < count; i++) {
      final elemOffset = baseOffset + (i * stride);
      for (var c = 0; c < componentsPerElement; c++) {
        out[i * componentsPerElement + c] = _bin.getFloat32(elemOffset + c * 4, Endian.little);
      }
    }
    return out;
  }

  List<int> _readIndexAccessor(int accessorIndex) {
    final accessors = _json['accessors'] as List<dynamic>;
    final bufferViews = _json['bufferViews'] as List<dynamic>;

    final acc = accessors[accessorIndex] as Map<String, dynamic>;
    final viewIdx = acc['bufferView'] as int;
    final view = bufferViews[viewIdx] as Map<String, dynamic>;

    final baseOffset = (view['byteOffset'] as int? ?? 0) + (acc['byteOffset'] as int? ?? 0);
    final count = acc['count'] as int;
    final compType = acc['componentType'] as int;

    final out = List<int>.filled(count, 0);
    for (var i = 0; i < count; i++) {
      if (compType == 5123) {
        // UNSIGNED_SHORT
        out[i] = _bin.getUint16(baseOffset + i * 2, Endian.little);
      } else if (compType == 5125) {
        // UNSIGNED_INT
        out[i] = _bin.getUint32(baseOffset + i * 4, Endian.little);
      } else if (compType == 5121) {
        // UNSIGNED_BYTE
        out[i] = _bin.getUint8(baseOffset + i);
      }
    }
    return out;
  }

  Aabb _calculateBounds(List<double> positions) {
    var minX = double.infinity, minY = double.infinity, minZ = double.infinity;
    var maxX = -double.infinity, maxY = -double.infinity, maxZ = -double.infinity;

    for (var i = 0; i < positions.length; i += 3) {
      final x = positions[i], y = positions[i + 1], z = positions[i + 2];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    }
    return Aabb(Vec3(minX, minY, minZ), Vec3(maxX, maxY, maxZ));
  }
}
