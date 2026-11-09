import 'dart:convert';
import 'dart:math' as math;
import 'dart:typed_data';

import '../api/materials.dart';
import '../api/mesh.dart';
import '../math/bounds.dart';
import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import '../scene/scene_node.dart';

final class GlbPrimitive {
  final MeshData mesh;
  final int materialIndex;
  const GlbPrimitive({required this.mesh, required this.materialIndex});
}

final class GlbMesh {
  final String name;
  final List<GlbPrimitive> primitives;
  const GlbMesh({required this.name, required this.primitives});
}

final class GlbImage {
  final String name;
  final String mimeType;
  final Uint8List bytes;

  final String? uri;

  const GlbImage({
    required this.name,
    required this.mimeType,
    required this.bytes,
    this.uri,
  });

  bool get isExternal => uri != null;
}

final class GlbMaterialTextures {
  final int? albedoTextureIndex;
  final int? normalTextureIndex;
  final int? ormTextureIndex;
  final int? emissiveTextureIndex;
  const GlbMaterialTextures({
    this.albedoTextureIndex,
    this.normalTextureIndex,
    this.ormTextureIndex,
    this.emissiveTextureIndex,
  });
}

final class GlbResult {
  final SceneNode rootNode;
  final List<MeshData> meshes;
  final List<MaterialDefinition> materials;

  final List<GlbImage> images;
  final List<GlbMaterialTextures> materialTextures;

  final List<int?> textureImages;

  final Map<SceneNode, int> nodeMaterials;

  final List<String> warnings;

  const GlbResult({
    required this.rootNode,
    required this.meshes,
    required this.materials,
    this.images = const [],
    this.materialTextures = const [],
    this.textureImages = const [],
    this.nodeMaterials = const {},
    this.warnings = const [],
  });

  int? imageForTexture(int? textureIndex) {
    if (textureIndex == null || textureIndex < 0 || textureIndex >= textureImages.length) {
      return null;
    }
    return textureImages[textureIndex];
  }

  int materialOf(SceneNode node) => nodeMaterials[node] ?? 0;
}

final class GlbDecoder {
  final Map<String, dynamic> _json;
  final ByteData _bin;

  GlbDecoder._(this._json, Uint8List binary) : _bin = ByteData.sublistView(binary);

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

  final List<String> _warnings = [];
  final Map<SceneNode, int> _nodeMaterials = {};

  GlbResult _decodeAll() {
    final (materials, materialTextures) = _decodeMaterials();
    final images = _decodeImages();
    final textureImages = [
      for (final t in (_json['textures'] as List<dynamic>? ?? const []))
        (t as Map<String, dynamic>)['source'] as int?,
    ];
    final meshes = _decodeMeshes();
    final allMeshDatas = <MeshData>[];
    for (final m in meshes) {
      for (final p in m.primitives) {
        allMeshDatas.add(p.mesh);
      }
    }

    final rootNode = _decodeSceneHierarchy(meshes, materials);
    return GlbResult(
      rootNode: rootNode,
      meshes: allMeshDatas,
      materials: materials,
      images: images,
      materialTextures: materialTextures,
      textureImages: textureImages,
      nodeMaterials: Map.unmodifiable(_nodeMaterials),
      warnings: List.unmodifiable(_warnings),
    );
  }

  List<GlbImage> _decodeImages() {
    final rawImages = _json['images'] as List<dynamic>?;
    if (rawImages == null || rawImages.isEmpty) return const [];
    final bufferViews = _json['bufferViews'] as List<dynamic>? ?? const [];

    final images = <GlbImage>[];
    for (var i = 0; i < rawImages.length; i++) {
      final img = rawImages[i] as Map<String, dynamic>;
      final name = img['name'] as String? ?? 'image_$i';
      final mime = img['mimeType'] as String? ?? 'image/png';
      final viewIdx = img['bufferView'] as int?;
      final uri = img['uri'] as String?;
      if (viewIdx != null && viewIdx >= 0 && viewIdx < bufferViews.length) {
        final view = bufferViews[viewIdx] as Map<String, dynamic>;
        final offset = (view['byteOffset'] as int? ?? 0);
        final length = (view['byteLength'] as int? ?? 0);
        final bytes = Uint8List.sublistView(_bin, offset, offset + length);
        images.add(GlbImage(name: name, mimeType: mime, bytes: bytes));
      } else if (uri != null && uri.startsWith('data:')) {
        // Embedded as a data URI: data:<mime>;base64,<payload>
        final comma = uri.indexOf(',');
        final header = comma > 5 ? uri.substring(5, comma) : '';
        final dataMime = header.split(';').first;
        final bytes = header.endsWith(';base64') && comma >= 0
            ? base64Decode(uri.substring(comma + 1))
            : Uint8List(0);
        images.add(GlbImage(name: name, mimeType: dataMime.isEmpty ? mime : dataMime, bytes: bytes));
      } else if (uri != null) {
        images.add(GlbImage(name: name, mimeType: mime, bytes: Uint8List(0), uri: uri));
      } else {
        // Keep the list index-aligned with the asset's images array.
        _warnings.add('image $i ("$name") has neither bufferView nor uri');
        images.add(GlbImage(name: name, mimeType: mime, bytes: Uint8List(0)));
      }
    }
    return images;
  }

  (List<MaterialDefinition>, List<GlbMaterialTextures>) _decodeMaterials() {
    final rawMaterials = _json['materials'] as List<dynamic>?;
    if (rawMaterials == null || rawMaterials.isEmpty) {
      return (
        [const MaterialDefinition(key: 'default_glb_mat')],
        [const GlbMaterialTextures()],
      );
    }

    final materials = <MaterialDefinition>[];
    final textures = <GlbMaterialTextures>[];
    for (var i = 0; i < rawMaterials.length; i++) {
      final mat = rawMaterials[i] as Map<String, dynamic>;
      final name = mat['name'] as String? ?? 'material_$i';
      final pbr = mat['pbrMetallicRoughness'] as Map<String, dynamic>?;

      var r = 1.0, g = 1.0, b = 1.0;
      var metallic = 1.0;
      var roughness = 1.0;
      int? albedoTexIdx;
      int? ormTexIdx;

      if (pbr != null) {
        final baseColor = pbr['baseColorFactor'] as List<dynamic>?;
        if (baseColor != null && baseColor.length >= 3) {
          r = (baseColor[0] as num).toDouble();
          g = (baseColor[1] as num).toDouble();
          b = (baseColor[2] as num).toDouble();
        }
        metallic = (pbr['metallicFactor'] as num?)?.toDouble() ?? 1.0;
        roughness = (pbr['roughnessFactor'] as num?)?.toDouble() ?? 1.0;

        final baseTex = pbr['baseColorTexture'] as Map<String, dynamic>?;
        if (baseTex != null) {
          albedoTexIdx = baseTex['index'] as int?;
        }
        final ormTex = pbr['metallicRoughnessTexture'] as Map<String, dynamic>?;
        if (ormTex != null) {
          ormTexIdx = ormTex['index'] as int?;
        }
      }

      int? normalTexIdx;
      final normTex = mat['normalTexture'] as Map<String, dynamic>?;
      if (normTex != null) {
        normalTexIdx = normTex['index'] as int?;
      }

      int? emissiveTexIdx;
      final emissiveTex = mat['emissiveTexture'] as Map<String, dynamic>?;
      if (emissiveTex != null) {
        emissiveTexIdx = emissiveTex['index'] as int?;
      }

      // KHR_materials_unlit: authored to show its base colour as-is. There
      // is no unlit shading path, so approximate it with a matte dielectric
      // (otherwise the glTF default metallicFactor of 1 renders it near
      // black without a reflection probe).
      final extensions = mat['extensions'] as Map<String, dynamic>?;
      if (extensions != null && extensions.containsKey('KHR_materials_unlit')) {
        metallic = 0.0;
        roughness = 0.9;
      }

      final alphaMode = switch (mat['alphaMode'] as String?) {
        'MASK' => AlphaMode.masked,
        'BLEND' => AlphaMode.blended,
        _ => AlphaMode.opaque,
      };

      materials.add(
        MaterialDefinition(
          key: name,
          tintR: r,
          tintG: g,
          tintB: b,
          metallic: metallic.clamp(0.0, 1.0),
          roughness: roughness.clamp(0.0, 1.0),
          alphaMode: alphaMode,
          // Only a masked material compares against a cutoff.
          alphaCutoff: alphaMode == AlphaMode.masked ? ((mat['alphaCutoff'] as num?)?.toDouble() ?? 0.5) : 0.5,
          doubleSided: mat['doubleSided'] as bool? ?? false,
        ),
      );

      textures.add(
        GlbMaterialTextures(
          albedoTextureIndex: albedoTexIdx,
          normalTextureIndex: normalTexIdx,
          ormTextureIndex: ormTexIdx,
          emissiveTextureIndex: emissiveTexIdx,
        ),
      );
    }
    return (materials, textures);
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
        final tangents = _orthonormalTangents(
          normals,
          tanAccessorIdx != null ? _readFloatAccessor(tanAccessorIdx, 4) : null,
          vertexCount,
        );

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

      var scaleVec = const Vec3(1, 1, 1);
      final s = nodeJson['scale'] as List<dynamic>?;
      if (s != null && s.length >= 3) {
        scaleVec = Vec3((s[0] as num).toDouble(), (s[1] as num).toDouble(), (s[2] as num).toDouble());
      }

      final matrix = nodeJson['matrix'] as List<dynamic>?;
      if (matrix != null && matrix.length == 16) {
        (translation, rotation, scaleVec) = _decomposeMatrix([for (final v in matrix) (v as num).toDouble()]);
      }

      final hasChildren = (nodeJson['children'] as List<dynamic>?)?.isNotEmpty ?? false;
      final uniform = (scaleVec.x - scaleVec.y).abs() < 1e-6 && (scaleVec.x - scaleVec.z).abs() < 1e-6;
      Transform transform;
      if (uniform) {
        transform = Transform(translation: translation, rotation: rotation, scale: scaleVec.x > 0 ? scaleVec.x : 1.0);
      } else if (!hasChildren && scaleVec.x > 0 && scaleVec.y > 0 && scaleVec.z > 0) {
        // A leaf's non-uniform scale is exact as a geometry-local stretch.
        transform = Transform(translation: translation, rotation: rotation, stretch: scaleVec);
      } else {
        // Inherited non-uniform scale would shear rotated children, which
        // translation/rotation/scale cannot express: use the geometric mean.
        final mean = math.pow((scaleVec.x * scaleVec.y * scaleVec.z).abs(), 1 / 3).toDouble();
        transform = Transform(translation: translation, rotation: rotation, scale: mean > 0 ? mean : 1.0);
        _warnings.add('node $i ("$name") has non-uniform scale $scaleVec with children; approximated as uniform $mean');
      }

      final sNode = SceneNode(name: name, transform: transform);
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
          // Extra primitives become children; stretch is not inherited, so
          // they repeat the node's own.
          final primNode = p == 0
              ? parentNode
              : parentNode.add(
                  name: '${parentNode.name}_prim_$p',
                  transform: Transform(stretch: parentNode.stretch),
                );
          // Handles are assigned when a ModelAsset registers this result;
          // until then a mesh node is identified by its meshData and the
          // material index recorded here.
          _nodeMaterials[primNode] = prim.materialIndex;
          primNode.bounds = prim.mesh.bounds;
          primNode.meshData = prim.mesh;
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

  static (Vec3, Quat, Vec3) _decomposeMatrix(List<double> m) {
    final translation = Vec3(m[12], m[13], m[14]);
    var c0 = Vec3(m[0], m[1], m[2]);
    final c1 = Vec3(m[4], m[5], m[6]);
    final c2 = Vec3(m[8], m[9], m[10]);
    var sx = c0.length;
    final sy = c1.length, sz = c2.length;
    if (c0.cross(c1).dot(c2) < 0) {
      sx = -sx;
      c0 = -c0;
    }
    if (sx.abs() < 1e-12 || sy < 1e-12 || sz < 1e-12) {
      return (translation, Quat.identity, const Vec3(1, 1, 1));
    }
    final x = c0 * (1 / sx.abs()), y = c1 * (1 / sy), z = c2 * (1 / sz);
    // Rotation matrix (columns x, y, z) to quaternion.
    final trace = x.x + y.y + z.z;
    double qx, qy, qz, qw;
    if (trace > 0) {
      final k = 0.5 / math.sqrt(trace + 1);
      qw = 0.25 / k;
      qx = (y.z - z.y) * k;
      qy = (z.x - x.z) * k;
      qz = (x.y - y.x) * k;
    } else if (x.x > y.y && x.x > z.z) {
      final k = 2 * math.sqrt(1 + x.x - y.y - z.z);
      qw = (y.z - z.y) / k;
      qx = 0.25 * k;
      qy = (y.x + x.y) / k;
      qz = (z.x + x.z) / k;
    } else if (y.y > z.z) {
      final k = 2 * math.sqrt(1 + y.y - x.x - z.z);
      qw = (z.x - x.z) / k;
      qx = (y.x + x.y) / k;
      qy = 0.25 * k;
      qz = (z.y + y.z) / k;
    } else {
      final k = 2 * math.sqrt(1 + z.z - x.x - y.y);
      qw = (x.y - y.x) / k;
      qx = (z.x + x.z) / k;
      qy = (z.y + y.z) / k;
      qz = 0.25 * k;
    }
    return (translation, Quat(qx, qy, qz, qw).normalized, Vec3(sx.abs(), sy, sz));
  }

  static List<double> _orthonormalTangents(
    List<double> normals,
    List<double>? authored,
    int vertexCount,
  ) {
    final out = List<double>.filled(vertexCount * 4, 0.0);
    for (var v = 0; v < vertexCount; v++) {
      final nx = normals[v * 3], ny = normals[v * 3 + 1], nz = normals[v * 3 + 2];
      var handedness = 1.0;
      (double, double, double)? project(double tx, double ty, double tz) {
        final d = nx * tx + ny * ty + nz * tz;
        tx -= nx * d;
        ty -= ny * d;
        tz -= nz * d;
        final len = math.sqrt(tx * tx + ty * ty + tz * tz);
        return len > 1e-6 ? (tx / len, ty / len, tz / len) : null;
      }

      (double, double, double)? t;
      if (authored != null) {
        t = project(authored[v * 4], authored[v * 4 + 1], authored[v * 4 + 2]);
        handedness = authored[v * 4 + 3] < 0 ? -1.0 : 1.0;
      }
      t ??= nx.abs() > 0.9 ? project(0, 0, 1) : project(1, 0, 0);
      final (tx, ty, tz) = t ?? (1.0, 0.0, 0.0);
      out[v * 4] = tx;
      out[v * 4 + 1] = ty;
      out[v * 4 + 2] = tz;
      out[v * 4 + 3] = handedness;
    }
    return out;
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
