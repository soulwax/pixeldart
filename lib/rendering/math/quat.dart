import 'dart:math' as math;

import 'mat4.dart';
import 'vec.dart';

/// Unit quaternion, x/y/z/w with w the scalar part. Rotates using the
/// right-handed, +Y-up, canonical-forward-+Z convention frozen for
/// `lib/rendering/**` (plan RENDERER-ELEVATION-PLAN.md §5.7).
final class Quat {
  final double x, y, z, w;
  const Quat(this.x, this.y, this.z, this.w);

  static const Quat identity = Quat(0, 0, 0, 1);

  factory Quat.axisAngle(Vec3 axis, double radians) {
    final a = axis.normalized;
    final half = radians / 2;
    final s = math.sin(half);
    return Quat(a.x * s, a.y * s, a.z * s, math.cos(half));
  }

  /// Creates a quaternion that rotates vector [v1] into vector [v2].
  factory Quat.fromTo(Vec3 v1, Vec3 v2) {
    final a = v1.normalized;
    final b = v2.normalized;
    final d = a.dot(b);
    if (d >= 0.999999) return identity;
    if (d <= -0.999999) {
      var axis = Vec3.unitX.cross(a);
      if (axis.lengthSquared < 0.001) axis = Vec3.unitY.cross(a);
      return Quat.axisAngle(axis.normalized, math.pi);
    }
    final axis = a.cross(b);
    return Quat(axis.x, axis.y, axis.z, 1.0 + d).normalized;
  }

  Quat operator *(Quat o) => Quat(
    w * o.x + x * o.w + y * o.z - z * o.y,
    w * o.y - x * o.z + y * o.w + z * o.x,
    w * o.z + x * o.y - y * o.x + z * o.w,
    w * o.w - x * o.x - y * o.y - z * o.z,
  );

  double get lengthSquared => x * x + y * y + z * z + w * w;

  Quat get normalized {
    final len = math.sqrt(lengthSquared);
    return len < 1e-9 ? identity : Quat(x / len, y / len, z / len, w / len);
  }

  Vec3 rotate(Vec3 v) {
    final qv = Vec3(x, y, z);
    final uv = qv.cross(v);
    final uuv = qv.cross(uv);
    return v + (uv * (2 * w)) + (uuv * 2);
  }

  Mat4 toMat4() {
    final xx = x * x, yy = y * y, zz = z * z;
    final xy = x * y, xz = x * z, yz = y * z;
    final wx = w * x, wy = w * y, wz = w * z;
    return Mat4.fromColumnMajor([
      1 - 2 * (yy + zz),
      2 * (xy + wz),
      2 * (xz - wy),
      0,
      2 * (xy - wz),
      1 - 2 * (xx + zz),
      2 * (yz + wx),
      0,
      2 * (xz + wy),
      2 * (yz - wx),
      1 - 2 * (xx + yy),
      0,
      0,
      0,
      0,
      1,
    ]);
  }

  bool get isFinite => x.isFinite && y.isFinite && z.isFinite && w.isFinite;

  @override
  String toString() => 'Quat($x, $y, $z, $w)';
}
