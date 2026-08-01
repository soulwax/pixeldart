import 'bounds.dart';
import 'mat4.dart';
import 'vec.dart';

final class Plane {
  final Vec3 normal;
  final double d;
  const Plane(this.normal, this.d);

  double distanceTo(Vec3 p) => normal.dot(p) + d;

  Plane get normalized {
    final len = normal.length;
    return len < 1e-9 ? this : Plane(normal * (1 / len), d / len);
  }
}

enum FrustumTest { outside, intersects, inside }

/// Six planes in order left, right, bottom, top, near, far, extracted from a
/// combined view-projection matrix so CPU culling always matches the GPU's
/// actual clip volume for the same frame.
final class Frustum {
  final List<Plane> planes;

  Frustum._(this.planes);

  factory Frustum.fromViewProjection(Mat4 vp) {
    final m = vp.m;
    Plane row(double a, double b, double c, double d) =>
        Plane(Vec3(a, b, c), d).normalized;
    return Frustum._([
      row(m[3] + m[0], m[7] + m[4], m[11] + m[8], m[15] + m[12]), // left
      row(m[3] - m[0], m[7] - m[4], m[11] - m[8], m[15] - m[12]), // right
      row(m[3] + m[1], m[7] + m[5], m[11] + m[9], m[15] + m[13]), // bottom
      row(m[3] - m[1], m[7] - m[5], m[11] - m[9], m[15] - m[13]), // top
      row(m[3] + m[2], m[7] + m[6], m[11] + m[10], m[15] + m[14]), // near
      row(m[3] - m[2], m[7] - m[6], m[11] - m[10], m[15] - m[14]), // far
    ]);
  }

  FrustumTest testAabb(Aabb box) {
    var intersecting = false;
    for (final plane in planes) {
      final p = Vec3(
        plane.normal.x >= 0 ? box.max.x : box.min.x,
        plane.normal.y >= 0 ? box.max.y : box.min.y,
        plane.normal.z >= 0 ? box.max.z : box.min.z,
      );
      if (plane.distanceTo(p) < 0) return FrustumTest.outside;

      final n = Vec3(
        plane.normal.x >= 0 ? box.min.x : box.max.x,
        plane.normal.y >= 0 ? box.min.y : box.max.y,
        plane.normal.z >= 0 ? box.min.z : box.max.z,
      );
      if (plane.distanceTo(n) < 0) intersecting = true;
    }
    return intersecting ? FrustumTest.intersects : FrustumTest.inside;
  }

  FrustumTest testSphere(BoundingSphere sphere) {
    var intersecting = false;
    for (final plane in planes) {
      final dist = plane.distanceTo(sphere.center);
      if (dist < -sphere.radius) return FrustumTest.outside;
      if (dist < sphere.radius) intersecting = true;
    }
    return intersecting ? FrustumTest.intersects : FrustumTest.inside;
  }
}
