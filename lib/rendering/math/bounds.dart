import 'mat4.dart';
import 'vec.dart';

final class Aabb {
  final Vec3 min, max;
  const Aabb(this.min, this.max);

  factory Aabb.fromPoints(Iterable<Vec3> points) {
    var lo = const Vec3(double.infinity, double.infinity, double.infinity);
    var hi = const Vec3(
      double.negativeInfinity,
      double.negativeInfinity,
      double.negativeInfinity,
    );
    var any = false;
    for (final p in points) {
      any = true;
      lo = Vec3.min(lo, p);
      hi = Vec3.max(hi, p);
    }
    if (!any) {
      throw ArgumentError('Aabb.fromPoints requires at least one point');
    }
    return Aabb(lo, hi);
  }

  Vec3 get center => (min + max) * 0.5;
  Vec3 get extent => (max - min) * 0.5;

  bool get isFinite => min.isFinite && max.isFinite;

  bool get isValid =>
      isFinite && min.x <= max.x && min.y <= max.y && min.z <= max.z;

  List<Vec3> get corners => [
    Vec3(min.x, min.y, min.z),
    Vec3(max.x, min.y, min.z),
    Vec3(min.x, max.y, min.z),
    Vec3(max.x, max.y, min.z),
    Vec3(min.x, min.y, max.z),
    Vec3(max.x, min.y, max.z),
    Vec3(min.x, max.y, max.z),
    Vec3(max.x, max.y, max.z),
  ];

  /// Transforms all eight corners and rebuilds a world-space AABB. Correct
  /// for any affine `model` including rotation, unlike transforming only
  /// `min`/`max`, which RENDERER-ELEVATION-PLAN.md §2.4 flags as a live
  /// culling-space defect in the legacy renderer.
  Aabb transformed(Mat4 model) =>
      Aabb.fromPoints(corners.map(model.transformPoint));

  Aabb union(Aabb other) =>
      Aabb(Vec3.min(min, other.min), Vec3.max(max, other.max));

  @override
  String toString() => 'Aabb($min, $max)';
}

final class BoundingSphere {
  final Vec3 center;
  final double radius;
  const BoundingSphere(this.center, this.radius);

  factory BoundingSphere.fromAabb(Aabb box) =>
      BoundingSphere(box.center, box.extent.length);

  bool get isFinite => center.isFinite && radius.isFinite && radius >= 0;

  @override
  String toString() => 'BoundingSphere($center, r=$radius)';
}
