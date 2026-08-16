import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
  validateGltfDocument({
    'asset': {'version': '2.0'},
    'buffers': [{'byteLength': 8}],
    'bufferViews': [{'buffer': 0, 'byteLength': 8}],
    'accessors': [
      {'bufferView': 0, 'componentType': 5123, 'count': 4, 'type': 'SCALAR'},
    ],
    'meshes': [
      {'primitives': [{'attributes': {'POSITION': 0}}]},
    ],
  }, binaryLength: 8);
  check(true, 'valid document accepted');

  var rejected = false;
  try {
    validateGltfDocument({
      'asset': {'version': '2.0'},
      'buffers': [{'byteLength': 4}],
      'bufferViews': [{'buffer': 0, 'byteOffset': 3, 'byteLength': 2}],
    });
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'bufferView overflow rejects');
  rejected = false;
  try {
    validateGltfDocument({
      'asset': {'version': '2.0'},
      'extensionsRequired': ['VENDOR_unknown'],
    });
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'unsupported required extension rejects');

  final binary = Uint8List.fromList([1, 0, 2, 0, 3, 0, 4, 0]);
  final decoder = GltfAccessorDecoder(
    binary: binary,
    document: {
      'bufferViews': [
        {'byteOffset': 0, 'byteLength': 8, 'byteStride': 2},
      ],
      'accessors': [
        {'bufferView': 0, 'componentType': 5123, 'count': 4, 'type': 'SCALAR'},
      ],
    },
  );
  check(
    decoder.decode(0).join(',') == '1.0,2.0,3.0,4.0',
    'Uint16 accessor decodes',
  );

  rejected = false;
  try {
    GltfAccessorDecoder(
      binary: Uint8List(2),
      document: {
        'bufferViews': [{}],
        'accessors': [
          {
            'bufferView': 0,
            'componentType': 5126,
            'count': 1,
            'type': 'SCALAR',
          },
        ],
      },
    ).decode(0);
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'out-of-bounds accessor rejects');
  print('RF-03 glTF validator tests passed.');
}
