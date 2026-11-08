import 'dart:typed_data';

import 'vec.dart';

/// Column-major 3x3, index `m[column * 3 + row]`.
final class Mat3 {
  final Float32List m;

  Mat3._(this.m);

  factory Mat3.identity() => Mat3._(
    Float32List(9)
      ..[0] = 1
      ..[4] = 1
      ..[8] = 1,
  );

  factory Mat3.fromColumnMajor(List<double> values) {
    if (values.length != 9) {
      throw ArgumentError('Mat3.fromColumnMajor requires 9 values');
    }
    return Mat3._(Float32List.fromList(values));
  }

  Vec3 transformDir(Vec3 d) => Vec3(
    d.x * m[0] + d.y * m[3] + d.z * m[6],
    d.x * m[1] + d.y * m[4] + d.z * m[7],
    d.x * m[2] + d.y * m[5] + d.z * m[8],
  );

  bool get isFinite => m.every((v) => v.isFinite);

  @override
  String toString() => 'Mat3($m)';
}
