import 'dart:convert';
import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

Uint8List glb({required List<int> jsonBytes, List<int> bin = const []}) {
  final jsonPadded = [...jsonBytes];
  while (jsonPadded.length % 4 != 0) {
    jsonPadded.add(0x20);
  }
  final binPadded = [...bin];
  while (binPadded.length % 4 != 0) {
    binPadded.add(0);
  }
  final total =
      12 +
      8 +
      jsonPadded.length +
      (binPadded.isEmpty ? 0 : 8 + binPadded.length);
  final out = ByteData(total);
  out.setUint32(0, 0x46546c67, Endian.little);
  out.setUint32(4, 2, Endian.little);
  out.setUint32(8, total, Endian.little);
  var offset = 12;
  out.setUint32(offset, jsonPadded.length, Endian.little);
  out.setUint32(offset + 4, 0x4e4f534a, Endian.little);
  out.buffer.asUint8List().setRange(
    offset + 8,
    offset + 8 + jsonPadded.length,
    jsonPadded,
  );
  offset += 8 + jsonPadded.length;
  if (binPadded.isNotEmpty) {
    out.setUint32(offset, binPadded.length, Endian.little);
    out.setUint32(offset + 4, 0x004e4942, Endian.little);
    out.buffer.asUint8List().setRange(
      offset + 8,
      offset + 8 + binPadded.length,
      binPadded,
    );
  }
  return out.buffer.asUint8List();
}

void main() {
  final parsed = GlbContainer.parse(
    glb(jsonBytes: utf8.encode('{"asset":{"version":"2.0"}}'), bin: [1, 2, 3]),
  );
  check(parsed.json['asset'] is Map, 'JSON chunk parses');
  check(parsed.binary?.length == 4, 'BIN chunk is padded and retained');

  final malformed = glb(jsonBytes: utf8.encode('{}'))..[0] = 0;
  var rejected = false;
  try {
    GlbContainer.parse(malformed);
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'invalid magic is rejected');
  print('RF-03 GLB container tests passed.');
}
