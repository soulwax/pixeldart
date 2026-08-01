import 'dart:math' as math;
import 'dart:typed_data';

import 'vec.dart';

/// Column-major 4x4, index `m[column * 4 + row]`. Matches WebGL's
/// `mat4 * vec4` column-vector convention: `(a * b).transformPoint(p) ==
/// a.transformPoint(b.transformPoint(p))`.
final class Mat4 {
  final Float32List m;

  Mat4._(this.m);

  factory Mat4.zero() => Mat4._(Float32List(16));

  factory Mat4.identity() => Mat4._(
    Float32List(16)
      ..[0] = 1
      ..[5] = 1
      ..[10] = 1
      ..[15] = 1,
  );

  factory Mat4.fromColumnMajor(List<double> values) {
    if (values.length != 16) {
      throw ArgumentError('Mat4.fromColumnMajor requires 16 values');
    }
    return Mat4._(Float32List.fromList(values));
  }

  factory Mat4.translation(Vec3 t) => Mat4._(
    Float32List(16)
      ..[0] = 1
      ..[5] = 1
      ..[10] = 1
      ..[15] = 1
      ..[12] = t.x
      ..[13] = t.y
      ..[14] = t.z,
  );

  factory Mat4.uniformScale(double s) => Mat4._(
    Float32List(16)
      ..[0] = s
      ..[5] = s
      ..[10] = s
      ..[15] = 1,
  );

  factory Mat4.rotationX(double radians) {
    final c = math.cos(radians), s = math.sin(radians);
    return Mat4._(
      Float32List(16)
        ..[0] = 1
        ..[5] = c
        ..[6] = s
        ..[9] = -s
        ..[10] = c
        ..[15] = 1,
    );
  }

  factory Mat4.rotationY(double radians) {
    final c = math.cos(radians), s = math.sin(radians);
    return Mat4._(
      Float32List(16)
        ..[0] = c
        ..[2] = -s
        ..[5] = 1
        ..[8] = s
        ..[10] = c
        ..[15] = 1,
    );
  }

  factory Mat4.rotationZ(double radians) {
    final c = math.cos(radians), s = math.sin(radians);
    return Mat4._(
      Float32List(16)
        ..[0] = c
        ..[1] = s
        ..[4] = -s
        ..[5] = c
        ..[10] = 1
        ..[15] = 1,
    );
  }

  /// Right-handed perspective matching WebGL's [-1, 1] clip-space depth
  /// convention. `fovYRadians` is the full vertical field of view.
  factory Mat4.perspective({
    required double fovYRadians,
    required double aspect,
    required double near,
    required double far,
  }) {
    final f = 1.0 / math.tan(fovYRadians / 2);
    final nf = 1.0 / (near - far);
    return Mat4._(
      Float32List(16)
        ..[0] = f / aspect
        ..[5] = f
        ..[10] = (far + near) * nf
        ..[11] = -1
        ..[14] = 2 * far * near * nf,
    );
  }

  /// Right-handed look-at. `forward` need not be normalized; `up` must not
  /// be parallel to `forward`.
  factory Mat4.lookAt({
    required Vec3 eye,
    required Vec3 forward,
    required Vec3 up,
  }) {
    final f = forward.normalized;
    final r = f.cross(up).normalized;
    final u = r.cross(f);
    return Mat4._(
      Float32List(16)
        ..[0] = r.x
        ..[1] = u.x
        ..[2] = -f.x
        ..[3] = 0
        ..[4] = r.y
        ..[5] = u.y
        ..[6] = -f.y
        ..[7] = 0
        ..[8] = r.z
        ..[9] = u.z
        ..[10] = -f.z
        ..[11] = 0
        ..[12] = -r.dot(eye)
        ..[13] = -u.dot(eye)
        ..[14] = f.dot(eye)
        ..[15] = 1,
    );
  }

  double at(int column, int row) => m[column * 4 + row];

  /// `this * other`: column-vector application order, so
  /// `(a * b).transformPoint(p) == a.transformPoint(b.transformPoint(p))`.
  Mat4 operator *(Mat4 other) {
    final result = Float32List(16);
    for (var column = 0; column < 4; column++) {
      for (var row = 0; row < 4; row++) {
        var sum = 0.0;
        for (var k = 0; k < 4; k++) {
          sum += m[k * 4 + row] * other.m[column * 4 + k];
        }
        result[column * 4 + row] = sum;
      }
    }
    return Mat4._(result);
  }

  Vec3 transformPoint(Vec3 p) {
    final x = p.x * m[0] + p.y * m[4] + p.z * m[8] + m[12];
    final y = p.x * m[1] + p.y * m[5] + p.z * m[9] + m[13];
    final z = p.x * m[2] + p.y * m[6] + p.z * m[10] + m[14];
    final w = p.x * m[3] + p.y * m[7] + p.z * m[11] + m[15];
    return w == 0 || w == 1 ? Vec3(x, y, z) : Vec3(x / w, y / w, z / w);
  }

  Vec3 transformDir(Vec3 d) => Vec3(
    d.x * m[0] + d.y * m[4] + d.z * m[8],
    d.x * m[1] + d.y * m[5] + d.z * m[9],
    d.x * m[2] + d.y * m[6] + d.z * m[10],
  );

  double get determinant3x3 =>
      m[0] * (m[5] * m[10] - m[9] * m[6]) -
      m[4] * (m[1] * m[10] - m[9] * m[2]) +
      m[8] * (m[1] * m[6] - m[5] * m[2]);

  /// Inverse of the upper-left 3x3, for building the normal matrix. Throws
  /// if the block is singular (non-finite or near-zero determinant) rather
  /// than silently returning identity, since a silent fallback would light
  /// a degenerate transform as if it were rigid.
  Mat4 inverse3x3() {
    final det = determinant3x3;
    if (!det.isFinite || det.abs() < 1e-12) {
      throw StateError('Mat4.inverse3x3: singular upper-left 3x3 (det=$det)');
    }
    final invDet = 1.0 / det;
    final r = Float32List(16);
    r[0] = (m[5] * m[10] - m[9] * m[6]) * invDet;
    r[1] = (m[8] * m[6] - m[4] * m[10]) * invDet;
    r[2] = (m[4] * m[9] - m[8] * m[5]) * invDet;
    r[4] = (m[9] * m[2] - m[1] * m[10]) * invDet;
    r[5] = (m[0] * m[10] - m[8] * m[2]) * invDet;
    r[6] = (m[8] * m[1] - m[0] * m[9]) * invDet;
    r[8] = (m[1] * m[6] - m[5] * m[2]) * invDet;
    r[9] = (m[4] * m[2] - m[0] * m[6]) * invDet;
    r[10] = (m[0] * m[5] - m[4] * m[1]) * invDet;
    r[15] = 1;
    return Mat4._(r);
  }

  /// Transpose of `inverse3x3`, the correct matrix for transforming normals
  /// under non-rigid transforms. Rigid transforms (rotation + uniform
  /// scale) make this equal `inverse3x3` up to a scalar, but callers must
  /// not special-case that; always route normals through this method.
  Mat4 normalMatrix() {
    final inv = inverse3x3();
    final r = Float32List(16);
    for (var c = 0; c < 3; c++) {
      for (var row = 0; row < 3; row++) {
        r[c * 4 + row] = inv.m[row * 4 + c];
      }
    }
    r[15] = 1;
    return Mat4._(r);
  }

  bool get isFinite => m.every((v) => v.isFinite);

  @override
  String toString() => 'Mat4($m)';
}
