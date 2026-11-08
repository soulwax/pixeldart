import 'dart:convert';
import 'dart:typed_data';

/// A bounded GLB 2.0 container. Parsing produces CPU bytes only.
final class GlbContainer {
  final Map<String, dynamic> json;
  final Uint8List? binary;

  const GlbContainer({required this.json, this.binary});

  factory GlbContainer.parse(Uint8List bytes, {int maxJsonBytes = 16 << 20}) {
    if (bytes.length < 12) {
      throw const FormatException('GLB header is truncated');
    }
    if (_u32(bytes, 0) != 0x46546c67) {
      throw const FormatException('GLB magic is invalid');
    }
    if (_u32(bytes, 4) != 2) {
      throw FormatException('unsupported GLB version: ${_u32(bytes, 4)}');
    }
    final declaredLength = _u32(bytes, 8);
    if (declaredLength != bytes.length) {
      throw const FormatException('GLB length does not match input bytes');
    }
    Map<String, dynamic>? json;
    Uint8List? binary;
    var offset = 12;
    while (offset < bytes.length) {
      if (bytes.length - offset < 8) {
        throw const FormatException('GLB chunk header is truncated');
      }
      final chunkLength = _u32(bytes, offset);
      final chunkType = _u32(bytes, offset + 4);
      final start = offset + 8;
      final end = start + chunkLength;
      if (chunkLength > bytes.length - start || end > bytes.length) {
        throw const FormatException('GLB chunk exceeds container bounds');
      }
      final payload = Uint8List.sublistView(bytes, start, end);
      if (chunkType == 0x4e4f534a) {
        if (json != null) {
          throw const FormatException('GLB contains duplicate JSON chunks');
        }
        if (chunkLength > maxJsonBytes) {
          throw const FormatException(
            'GLB JSON chunk exceeds configured limit',
          );
        }
        final decoded = jsonDecode(
          utf8.decode(payload, allowMalformed: false).trimRight(),
        );
        if (decoded is! Map) {
          throw const FormatException('GLB JSON root must be an object');
        }
        json = decoded.cast<String, dynamic>();
      } else if (chunkType == 0x004e4942) {
        if (binary != null) {
          throw const FormatException('GLB contains duplicate BIN chunks');
        }
        binary = Uint8List.fromList(payload);
      }
      offset = end;
    }
    if (json == null) throw const FormatException('GLB JSON chunk is required');
    return GlbContainer(json: json, binary: binary);
  }
}

int _u32(Uint8List bytes, int offset) =>
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24);
