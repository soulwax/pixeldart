import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
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

  var rejected = false;
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
