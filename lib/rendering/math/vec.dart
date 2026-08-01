import 'dart:math' as math;

final class Vec2 {
  final double x, y;
  const Vec2(this.x, this.y);

  static const Vec2 zero = Vec2(0, 0);

  Vec2 operator +(Vec2 o) => Vec2(x + o.x, y + o.y);
  Vec2 operator -(Vec2 o) => Vec2(x - o.x, y - o.y);
  Vec2 operator *(double s) => Vec2(x * s, y * s);

  double dot(Vec2 o) => x * o.x + y * o.y;
  double get length => math.sqrt(x * x + y * y);

  @override
  bool operator ==(Object other) =>
      other is Vec2 && x == other.x && y == other.y;

  @override
  int get hashCode => Object.hash(x, y);

  @override
  String toString() => 'Vec2($x, $y)';
}

final class Vec3 {
  final double x, y, z;
  const Vec3(this.x, this.y, this.z);

  static const Vec3 zero = Vec3(0, 0, 0);
  static const Vec3 unitX = Vec3(1, 0, 0);
  static const Vec3 unitY = Vec3(0, 1, 0);
  static const Vec3 unitZ = Vec3(0, 0, 1);

  Vec3 operator +(Vec3 o) => Vec3(x + o.x, y + o.y, z + o.z);
  Vec3 operator -(Vec3 o) => Vec3(x - o.x, y - o.y, z - o.z);
  Vec3 operator -() => Vec3(-x, -y, -z);
  Vec3 operator *(double s) => Vec3(x * s, y * s, z * s);

  double dot(Vec3 o) => x * o.x + y * o.y + z * o.z;

  Vec3 cross(Vec3 o) =>
      Vec3(y * o.z - z * o.y, z * o.x - x * o.z, x * o.y - y * o.x);

  double get lengthSquared => x * x + y * y + z * z;
  double get length => math.sqrt(lengthSquared);

  bool get isFinite => x.isFinite && y.isFinite && z.isFinite;

  Vec3 get normalized {
    final len = length;
    return len < 1e-9 ? zero : Vec3(x / len, y / len, z / len);
  }

  static Vec3 lerp(Vec3 a, Vec3 b, double t) =>
      Vec3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);

  static Vec3 min(Vec3 a, Vec3 b) =>
      Vec3(math.min(a.x, b.x), math.min(a.y, b.y), math.min(a.z, b.z));

  static Vec3 max(Vec3 a, Vec3 b) =>
      Vec3(math.max(a.x, b.x), math.max(a.y, b.y), math.max(a.z, b.z));

  @override
  bool operator ==(Object other) =>
      other is Vec3 && x == other.x && y == other.y && z == other.z;

  @override
  int get hashCode => Object.hash(x, y, z);

  @override
  String toString() => 'Vec3($x, $y, $z)';
}

final class Vec4 {
  final double x, y, z, w;
  const Vec4(this.x, this.y, this.z, this.w);

  static const Vec4 zero = Vec4(0, 0, 0, 0);

  Vec3 get xyz => Vec3(x, y, z);

  Vec4 operator +(Vec4 o) => Vec4(x + o.x, y + o.y, z + o.z, w + o.w);
  Vec4 operator *(double s) => Vec4(x * s, y * s, z * s, w * s);

  double dot(Vec4 o) => x * o.x + y * o.y + z * o.z + w * o.w;

  bool get isFinite => x.isFinite && y.isFinite && z.isFinite && w.isFinite;

  @override
  bool operator ==(Object other) =>
      other is Vec4 &&
      x == other.x &&
      y == other.y &&
      z == other.z &&
      w == other.w;

  @override
  int get hashCode => Object.hash(x, y, z, w);

  @override
  String toString() => 'Vec4($x, $y, $z, $w)';
}
