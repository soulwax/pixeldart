import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/core/scene_renderer_impl.dart' show ResourceLibraryImpl;

import 'fake_gpu_device.dart';

// GLB decoding metadata and the reusable ModelAsset: per-node materials
// without overloading sortTiebreaker, texture -> image resolution, external
// and data-URI images, unlit/alpha/double-sided materials, non-uniform
// scale, and many independent instances of one registered model.

void check(bool condition, String message) {
  if (!condition) throw StateError('model asset: $message');
}

/// Packs a glTF JSON document and binary chunk into GLB bytes.
Uint8List _glb(Map<String, dynamic> json, Uint8List bin) {
  var jsonBytes = utf8.encode(jsonEncode(json));
  while (jsonBytes.length % 4 != 0) {
    jsonBytes = Uint8List.fromList([...jsonBytes, 0x20]);
  }
  final binPadded = Uint8List((bin.length + 3) & ~3)..setAll(0, bin);
  final total = 12 + 8 + jsonBytes.length + 8 + binPadded.length;
  final out = ByteData(total);
  out.setUint32(0, 0x46546c67, Endian.little);
  out.setUint32(4, 2, Endian.little);
  out.setUint32(8, total, Endian.little);
  out.setUint32(12, jsonBytes.length, Endian.little);
  out.setUint32(16, 0x4e4f534a, Endian.little);
  final bytes = out.buffer.asUint8List();
  bytes.setAll(20, jsonBytes);
  final binHeader = 20 + jsonBytes.length;
  out.setUint32(binHeader, binPadded.length, Endian.little);
  out.setUint32(binHeader + 4, 0x004e4942, Endian.little);
  bytes.setAll(binHeader + 8, binPadded);
  return bytes;
}

/// A one-triangle GLB whose nodes, materials and images are given.
Uint8List _triangleGlb({
  required List<Map<String, dynamic>> nodes,
  required List<Map<String, dynamic>> materials,
  List<Map<String, dynamic>> images = const [],
  List<Map<String, dynamic>> textures = const [],
}) {
  final bin = ByteData(36 + 36 + 6);
  const positions = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0];
  for (var i = 0; i < 9; i++) {
    bin.setFloat32(i * 4, positions[i], Endian.little);
    bin.setFloat32(36 + i * 4, i % 3 == 2 ? 1.0 : 0.0, Endian.little);
  }
  for (var i = 0; i < 3; i++) {
    bin.setUint16(72 + i * 2, i, Endian.little);
  }
  return _glb({
    'asset': {'version': '2.0'},
    'buffers': [
      {'byteLength': 78},
    ],
    'bufferViews': [
      {'buffer': 0, 'byteOffset': 0, 'byteLength': 36},
      {'buffer': 0, 'byteOffset': 36, 'byteLength': 36},
      {'buffer': 0, 'byteOffset': 72, 'byteLength': 6},
    ],
    'accessors': [
      {'bufferView': 0, 'componentType': 5126, 'count': 3, 'type': 'VEC3', 'min': [0, 0, 0], 'max': [1, 1, 0]},
      {'bufferView': 1, 'componentType': 5126, 'count': 3, 'type': 'VEC3'},
      {'bufferView': 2, 'componentType': 5123, 'count': 3, 'type': 'SCALAR'},
    ],
    'meshes': [
      {
        'primitives': [
          {
            'attributes': {'POSITION': 0, 'NORMAL': 1},
            'indices': 2,
            'material': materials.length - 1,
          },
        ],
      },
    ],
    'materials': materials,
    'images': images,
    'textures': textures,
    'nodes': nodes,
    'scenes': [
      {'nodes': [0]},
    ],
  }, bin.buffer.asUint8List());
}

void main() {
  final resources = ResourceLibraryImpl(FakeGpuDevice());

  _pirateShip(resources);
  _textureResolutionAndUris(resources);
  _materialFlags();
  _nonUniformScale();
  stdout.writeln('Model asset fixtures passed.');
}

void _pirateShip(ResourceLibraryImpl resources) {
  final file = File('examples/example_3/res/models/ship-small.glb');
  if (!file.existsSync()) {
    stdout.writeln('  (skipping ship fixture: ${file.path} not found)');
    return;
  }
  final result = GlbDecoder.decode(file.readAsBytesSync());
  var meshNodes = 0;
  result.rootNode.traverse((n) {
    if (n.meshData != null) meshNodes++;
    check(n.sortTiebreaker == 0, 'the decoder must no longer overload sortTiebreaker');
  });
  check(meshNodes > 1, 'ship-small is a multi-mesh model');
  check(result.nodeMaterials.length == meshNodes, 'every mesh node has a recorded material');
  check(result.images.length == 1 && result.images.single.isExternal, 'the palette image is external');
  check(result.images.single.uri == 'Textures/colormap.png', 'the palette keeps its relative uri');
  check(result.imageForTexture(result.materialTextures.first.albedoTextureIndex) == 0, 'albedo resolves to image 0');

  final palette = resources.registerTexture(width: 1, height: 1);
  final asset = ModelAsset.fromGlb(result, resources, name: 'ship', images: [palette]);
  check(asset.bounds.max.y > 9, 'bounds cover the mast');

  // Instances are independent trees sharing handles.
  final a = asset.instantiate(), b = asset.instantiate(name: 'second');
  var nodesA = 0, meshesA = 0;
  a.traverse((n) {
    nodesA++;
    if (n.mesh != null) meshesA++;
  });
  check(meshesA == meshNodes, 'an instance carries every mesh, got $meshesA of $meshNodes');
  check(!identical(a, b) && b.name == 'second', 'instances are distinct and nameable');
  b.position = const Vec3(5, 0, 0);
  check(a.position == Vec3.zero, 'moving one instance must not move another');
  check(nodesA > meshesA, 'the hierarchy (group nodes) is preserved');

  // Every material binds the palette through the texture -> image table.
  a.traverse((n) {
    final m = n.material;
    if (m != null) {
      check(resources.materials.resolve(m).albedoTexture == palette, 'materials must bind the supplied palette');
    }
  });

  // Overrides see the authored name and can replace the definition.
  final names = <String>{};
  final overridden = ModelAsset.fromGlb(
    result,
    resources,
    name: 'ship2',
    images: [palette],
    materialOverride: (name, def) {
      names.add(name);
      return def.copyWith(roughness: 0.25);
    },
  );
  check(names.contains('colormap'), 'override receives the authored material name');
  overridden.instantiate().traverse((n) {
    if (n.material != null) check(resources.materials.resolve(n.material!).roughness == 0.25, 'override applies');
  });
}

void _textureResolutionAndUris(ResourceLibraryImpl resources) {
  // Two textures, swapped relative to two images, plus a data URI image.
  final png = base64Encode([137, 80, 78, 71]);
  final bytes = _triangleGlb(
    nodes: [
      {'mesh': 0},
    ],
    images: [
      {'uri': 'far/away.png'},
      {'uri': 'data:image/png;base64,$png'},
    ],
    textures: [
      {'source': 1},
      {'source': 0},
    ],
    materials: [
      {
        'name': 'm',
        'pbrMetallicRoughness': {
          'baseColorTexture': {'index': 0},
        },
        'normalTexture': {'index': 1},
      },
    ],
  );
  final result = GlbDecoder.decode(bytes);
  check(result.images.length == 2, 'images stay index-aligned, got ${result.images.length}');
  check(result.images[0].isExternal && result.images[0].uri == 'far/away.png', 'external image keeps its uri');
  check(!result.images[1].isExternal && result.images[1].bytes.length == 4, 'data URI image is decoded');
  check(result.imageForTexture(0) == 1 && result.imageForTexture(1) == 0, 'texture indices resolve through sources');

  final far = resources.registerTexture(width: 1, height: 1);
  final near = resources.registerTexture(width: 1, height: 1);
  final asset = ModelAsset.fromGlb(result, resources, name: 'tri', images: [far, near]);
  MaterialHandle? handle;
  asset.instantiate().traverse((n) => handle ??= n.material);
  final material = resources.materials.resolve(handle!);
  check(material.albedoTexture == near, 'albedo must use texture 0 -> image 1');
  check(material.normalTexture == far, 'normal must use texture 1 -> image 0');
}

void _materialFlags() {
  final result = GlbDecoder.decode(
    _triangleGlb(
      nodes: [
        {'mesh': 0},
      ],
      materials: [
        {
          'name': 'unlit',
          'extensions': {'KHR_materials_unlit': {}},
          'alphaMode': 'MASK',
          'alphaCutoff': 0.3,
          'doubleSided': true,
        },
      ],
    ),
  );
  final m = result.materials.single;
  check(m.metallic == 0, 'unlit materials decode as dielectric, got metallic ${m.metallic}');
  check(m.alphaMode == AlphaMode.masked && (m.alphaCutoff - 0.3).abs() < 1e-9, 'alpha mask and cutoff decode');
  check(m.doubleSided, 'doubleSided decodes');
}

void _nonUniformScale() {
  // A leaf scales exactly through stretch.
  final leaf = GlbDecoder.decode(
    _triangleGlb(
      nodes: [
        {
          'mesh': 0,
          'scale': [2, 3, 4],
        },
      ],
      materials: [
        {'name': 'm'},
      ],
    ),
  );
  SceneNode? meshNode;
  leaf.rootNode.traverse((n) => n.meshData != null ? meshNode = n : null);
  check(meshNode!.stretch == const Vec3(2, 3, 4) && meshNode!.scale == 1, 'leaf non-uniform scale becomes stretch');
  check(leaf.warnings.isEmpty, 'an exact leaf stretch is not a warning');

  // A parent with children cannot pass non-uniform scale on: approximated.
  final parent = GlbDecoder.decode(
    _triangleGlb(
      nodes: [
        {
          'children': [1],
          'scale': [1, 8, 1],
        },
        {'mesh': 0},
      ],
      materials: [
        {'name': 'm'},
      ],
    ),
  );
  check(parent.warnings.any((w) => w.contains('non-uniform')), 'inherited non-uniform scale is reported');

  // A matrix node decomposes into translation, rotation and scale.
  final matrix = GlbDecoder.decode(
    _triangleGlb(
      nodes: [
        {
          'mesh': 0,
          // 90° about Y, uniform scale 2, translation (1, 2, 3).
          'matrix': [0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 2, 3, 1],
        },
      ],
      materials: [
        {'name': 'm'},
      ],
    ),
  );
  SceneNode? m;
  matrix.rootNode.traverse((n) => n.meshData != null ? m = n : null);
  final t = m!.localTransform;
  check(t.translation == const Vec3(1, 2, 3), 'matrix translation decodes');
  check((t.scale - 2).abs() < 1e-6, 'matrix scale decodes, got ${t.scale}');
  final x = t.rotation.rotate(const Vec3(1, 0, 0));
  check((x - const Vec3(0, 0, -1)).length < 1e-6, 'matrix rotation decodes, +X maps to $x');
}
