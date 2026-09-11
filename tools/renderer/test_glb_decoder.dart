import 'dart:convert';
import 'dart:typed_data';

import 'package:pixeldart/rendering/assets/glb_decoder.dart';
import 'package:pixeldart/rendering/math/vec.dart';

void main() {
  _testGlbDecodeTriangle();
  _testGlbInvalidHeaders();
  print('GLB decoder tests passed.');
}

void _testGlbDecodeTriangle() {
  final bytes = _createSampleGlb();
  final result = GlbDecoder.decode(bytes);

  assert(result.meshes.isNotEmpty, 'should decode at least one mesh');
  assert(result.materials.isNotEmpty, 'should decode materials');
  assert(result.rootNode.children.isNotEmpty, 'should have child nodes');

  final mesh = result.meshes.first;
  assert(mesh.vertexCount == 3);
  assert(mesh.indices?.length == 3);

  final mat = result.materials.first;
  assert(mat.key == 'TestMaterial');
  assert((mat.tintR - 0.8).abs() < 1e-5);
  assert((mat.metallic - 0.5).abs() < 1e-5);
  assert((mat.roughness - 0.25).abs() < 1e-5);

  final child = result.rootNode.findByName('TriangleNode');
  assert(child != null, 'should find node by name');
  assert(child!.position == const Vec3(1, 2, 3));
}

void _testGlbInvalidHeaders() {
  bool threw = false;
  try {
    GlbDecoder.decode(Uint8List(8)); // too short
  } catch (_) {
    threw = true;
  }
  assert(threw, 'short header must throw');

  threw = false;
  try {
    final badMagic = Uint8List(12);
    GlbDecoder.decode(badMagic);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'bad magic must throw');
}

Uint8List _createSampleGlb() {
  // Binary buffer data: 3 positions (3 x 3 floats = 36 bytes), 3 indices (3 x uint16 = 6 bytes)
  final binData = BytesBuilder();

  // Positions: (0, 0, 0), (1, 0, 0), (0, 1, 0)
  final posFloats = Float32List.fromList([0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0]);
  binData.add(Uint8List.sublistView(posFloats));

  // Indices: 0, 1, 2 (6 bytes + 2 pad = 8 bytes)
  final indices = Uint16List.fromList([0, 1, 2, 0]);
  binData.add(Uint8List.sublistView(indices));

  final binBytes = binData.toBytes();

  final gltfJson = {
    'asset': {'version': '2.0'},
    'materials': [
      {
        'name': 'TestMaterial',
        'pbrMetallicRoughness': {
          'baseColorFactor': [0.8, 0.4, 0.2, 1.0],
          'metallicFactor': 0.5,
          'roughnessFactor': 0.25,
        },
      }
    ],
    'meshes': [
      {
        'name': 'TestMesh',
        'primitives': [
          {
            'attributes': {'POSITION': 0},
            'indices': 1,
            'material': 0,
          }
        ],
      }
    ],
    'nodes': [
      {
        'name': 'TriangleNode',
        'mesh': 0,
        'translation': [1.0, 2.0, 3.0],
      }
    ],
    'scenes': [
      {
        'nodes': [0],
      }
    ],
    'accessors': [
      {
        'bufferView': 0,
        'byteOffset': 0,
        'componentType': 5126, // FLOAT
        'count': 3,
        'type': 'VEC3',
      },
      {
        'bufferView': 1,
        'byteOffset': 0,
        'componentType': 5123, // UNSIGNED_SHORT
        'count': 3,
        'type': 'SCALAR',
      },
    ],
    'bufferViews': [
      {
        'buffer': 0,
        'byteOffset': 0,
        'byteLength': 36,
      },
      {
        'buffer': 0,
        'byteOffset': 36,
        'byteLength': 8,
      },
    ],
    'buffers': [
      {'byteLength': binBytes.length}
    ],
  };

  final jsonString = jsonEncode(gltfJson);
  var jsonBytes = utf8.encode(jsonString);
  // Pad JSON chunk to 4-byte boundary
  final jsonPad = (4 - (jsonBytes.length % 4)) % 4;
  if (jsonPad > 0) {
    jsonBytes = Uint8List.fromList([...jsonBytes, ...List.filled(jsonPad, 0x20)]); // pad with spaces
  }

  // Pad BIN chunk to 4-byte boundary
  var paddedBin = binBytes;
  final binPad = (4 - (binBytes.length % 4)) % 4;
  if (binPad > 0) {
    paddedBin = Uint8List.fromList([...binBytes, ...List.filled(binPad, 0)]);
  }

  final totalLength = 12 + 8 + jsonBytes.length + 8 + paddedBin.length;
  final out = ByteData(totalLength);

  // GLB Header
  out.setUint32(0, 0x46546c67, Endian.little); // "glTF"
  out.setUint32(4, 2, Endian.little); // version 2
  out.setUint32(8, totalLength, Endian.little);

  // JSON Chunk
  var offset = 12;
  out.setUint32(offset, jsonBytes.length, Endian.little);
  out.setUint32(offset + 4, 0x4e4f534a, Endian.little); // "JSON"
  Uint8List.sublistView(out).setRange(offset + 8, offset + 8 + jsonBytes.length, jsonBytes);

  // BIN Chunk
  offset += 8 + jsonBytes.length;
  out.setUint32(offset, paddedBin.length, Endian.little);
  out.setUint32(offset + 4, 0x004e4942, Endian.little); // "BIN\0"
  Uint8List.sublistView(out).setRange(offset + 8, offset + 8 + paddedBin.length, paddedBin);

  return Uint8List.sublistView(out);
}
