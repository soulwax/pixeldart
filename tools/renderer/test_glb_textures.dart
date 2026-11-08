import 'dart:convert';
import 'dart:typed_data';

import 'package:pixeldart/rendering/assets/glb_decoder.dart';

void fail(String msg) => throw StateError('test_glb_textures: $msg');

void main() {
  final glbBytes = _createSampleGlbWithTextures();
  final result = GlbDecoder.decode(glbBytes);

  if (result.images.isEmpty) {
    fail('should decode embedded image');
  }
  final img = result.images.first;
  if (img.mimeType != 'image/png') {
    fail('expected mimeType image/png, got ${img.mimeType}');
  }
  if (img.bytes.length != 8) {
    fail('expected 8 image bytes, got ${img.bytes.length}');
  }

  if (result.materialTextures.isEmpty) {
    fail('should decode material textures');
  }
  final matTex = result.materialTextures.first;
  if (matTex.albedoTextureIndex != 0) {
    fail('expected albedoTextureIndex 0, got ${matTex.albedoTextureIndex}');
  }
  if (matTex.normalTextureIndex != 1) {
    fail('expected normalTextureIndex 1, got ${matTex.normalTextureIndex}');
  }

  print('GLB embedded texture decoding tests passed.');
}

Uint8List _createSampleGlbWithTextures() {
  final binData = BytesBuilder();

  // Positions: 3 vertices
  final posFloats = Float32List.fromList([0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0]);
  binData.add(Uint8List.sublistView(posFloats)); // 36 bytes

  // Indices: 0, 1, 2, 0
  final indices = Uint16List.fromList([0, 1, 2, 0]);
  binData.add(Uint8List.sublistView(indices)); // 8 bytes -> total 44 bytes

  // Fake embedded PNG image bytes: 8 bytes
  final imageBytes = Uint8List.fromList([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  binData.add(imageBytes); // 8 bytes -> total 52 bytes

  final binBytes = binData.toBytes();

  final gltfJson = {
    'asset': {'version': '2.0'},
    'images': [
      {
        'name': 'BaseColorImage',
        'bufferView': 2,
        'mimeType': 'image/png',
      }
    ],
    'textures': [
      {'source': 0},
      {'source': 0},
    ],
    'materials': [
      {
        'name': 'PbrTexturedMaterial',
        'pbrMetallicRoughness': {
          'baseColorFactor': [1.0, 1.0, 1.0, 1.0],
          'baseColorTexture': {'index': 0},
          'metallicRoughnessTexture': {'index': 0},
        },
        'normalTexture': {'index': 1},
      }
    ],
    'meshes': [
      {
        'name': 'TexturedMesh',
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
      {'name': 'MeshNode', 'mesh': 0}
    ],
    'scenes': [
      {
        'nodes': [0]
      }
    ],
    'scene': 0,
    'bufferViews': [
      {'buffer': 0, 'byteOffset': 0, 'byteLength': 36},
      {'buffer': 0, 'byteOffset': 36, 'byteLength': 8},
      {'buffer': 0, 'byteOffset': 44, 'byteLength': 8},
    ],
    'accessors': [
      {'bufferView': 0, 'byteOffset': 0, 'componentType': 5126, 'count': 3, 'type': 'VEC3'},
      {'bufferView': 1, 'byteOffset': 0, 'componentType': 5123, 'count': 3, 'type': 'SCALAR'},
    ],
    'buffers': [
      {'byteLength': binBytes.length}
    ],
  };

  final jsonString = jsonEncode(gltfJson);
  final jsonUtf8 = utf8.encode(jsonString);
  final jsonPaddedLength = (jsonUtf8.length + 3) & ~3;
  final jsonBytes = Uint8List(jsonPaddedLength);
  jsonBytes.setRange(0, jsonUtf8.length, jsonUtf8);
  for (var i = jsonUtf8.length; i < jsonPaddedLength; i++) {
    jsonBytes[i] = 0x20; // Space padding per glTF 2.0 spec
  }

  final binPaddedLength = (binBytes.length + 3) & ~3;
  final binPaddedBytes = Uint8List(binPaddedLength);
  binPaddedBytes.setRange(0, binBytes.length, binBytes);

  final totalLength = 12 + 8 + jsonPaddedLength + 8 + binPaddedLength;
  final out = ByteData(totalLength);

  out.setUint32(0, 0x46546c67, Endian.little); // 'glTF'
  out.setUint32(4, 2, Endian.little); // version 2
  out.setUint32(8, totalLength, Endian.little);

  // JSON chunk
  out.setUint32(12, jsonPaddedLength, Endian.little);
  out.setUint32(16, 0x4e4f534a, Endian.little); // 'JSON'
  final outBytes = out.buffer.asUint8List();
  outBytes.setRange(20, 20 + jsonPaddedLength, jsonBytes);

  // BIN chunk
  final binHeaderOffset = 20 + jsonPaddedLength;
  out.setUint32(binHeaderOffset, binPaddedLength, Endian.little);
  out.setUint32(binHeaderOffset + 4, 0x004e4942, Endian.little); // 'BIN\0'
  outBytes.setRange(binHeaderOffset + 8, binHeaderOffset + 8 + binPaddedLength, binPaddedBytes);

  return outBytes;
}
