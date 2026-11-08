import 'dart:convert';
import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

Uint8List makeGlb(Map<String, dynamic> document, Uint8List binary) {
  final json = utf8.encode(jsonEncode(document));
  final jsonLength = (json.length + 3) & ~3;
  final binLength = (binary.length + 3) & ~3;
  final total = 12 + 8 + jsonLength + 8 + binLength;
  final bytes = ByteData(total);
  final raw = bytes.buffer.asUint8List();
  bytes.setUint32(0, 0x46546c67, Endian.little);
  bytes.setUint32(4, 2, Endian.little);
  bytes.setUint32(8, total, Endian.little);
  var offset = 12;
  bytes.setUint32(offset, jsonLength, Endian.little);
  bytes.setUint32(offset + 4, 0x4e4f534a, Endian.little);
  raw.setRange(offset + 8, offset + 8 + json.length, json);
  for (var i = offset + 8 + json.length; i < offset + 8 + jsonLength; i++) {
    raw[i] = 0x20;
  }
  offset += 8 + jsonLength;
  bytes.setUint32(offset, binLength, Endian.little);
  bytes.setUint32(offset + 4, 0x004e4942, Endian.little);
  raw.setRange(offset + 8, offset + 8 + binary.length, binary);
  return raw;
}

void main() {
  final document = <String, dynamic>{
    'asset': {'version': '2.0'},
    'buffers': [{'byteLength': 8}],
    'bufferViews': [{'buffer': 0, 'byteLength': 8}],
    'accessors': [
      {'bufferView': 0, 'componentType': 5123, 'count': 4, 'type': 'SCALAR'},
    ],
    'meshes': [
      {
        'primitives': [
          {'attributes': {'POSITION': 0}, 'indices': 0},
        ],
      },
    ],
    'nodes': [{'mesh': 0, 'name': 'quad'}],
  };
  final binary = Uint8List.fromList([1, 0, 2, 0, 3, 0, 4, 0]);
  final jsonScene = normalizeValidatedGltfScene(document, binaryLength: 8);
  final glb = GlbContainer.parse(makeGlb(document, binary));
  final glbScene = normalizeValidatedGltfScene(
    glb.json,
    binaryLength: glb.binary!.length,
  );
  check(
    jsonScene.canonicalJson() == glbScene.canonicalJson(),
    'JSON and GLB normalize identically',
  );

  var rejected = false;
  try {
    normalizeValidatedGltfScene({
      ...document,
      'buffers': [{'byteLength': 8, 'uri': '../escape.bin'}],
    }, binaryLength: 8);
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'path traversal URI rejects');
  rejected = false;
  try {
    normalizeValidatedGltfScene({
      ...document,
      'buffers': [{'byteLength': 9}],
    }, binaryLength: 8);
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'declared buffer larger than binary rejects');
  rejected = false;
  try {
    normalizeValidatedGltfScene({
      ...document,
      'images': [{'uri': 'https://example.invalid/texture.png'}],
    }, binaryLength: 8);
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'remote image URI rejects');
  print('RPA-01 glTF/GLB equivalence tests passed.');
}
