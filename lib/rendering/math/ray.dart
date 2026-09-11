import 'dart:math' as math;

import '../scene/scene_node.dart';
import 'bounds.dart';
import 'vec.dart';

/// A 3D ray defined by a world-space origin and a normalized direction.
final class Ray {
  final Vec3 origin;
  final Vec3 direction;

  const Ray({required this.origin, required this.direction});

  /// Evaluates the point along the ray at distance [t].
  Vec3 at(double t) => origin + direction * t;

  /// Tests intersection against an axis-aligned bounding box [box] using the slab method.
  /// Returns the closest positive distance [t] to the box, or `null` if the ray misses.
  double? intersectAabb(Aabb box) {
    var tMin = 0.0;
    var tMax = double.infinity;

    // X slab
    if (direction.x.abs() < 1e-9) {
      if (origin.x < box.min.x || origin.x > box.max.x) return null;
    } else {
      final invD = 1.0 / direction.x;
      var t1 = (box.min.x - origin.x) * invD;
      var t2 = (box.max.x - origin.x) * invD;
      if (t1 > t2) {
        final tmp = t1;
        t1 = t2;
        t2 = tmp;
      }
      tMin = math.max(tMin, t1);
      tMax = math.min(tMax, t2);
      if (tMin > tMax) return null;
    }

    // Y slab
    if (direction.y.abs() < 1e-9) {
      if (origin.y < box.min.y || origin.y > box.max.y) return null;
    } else {
      final invD = 1.0 / direction.y;
      var t1 = (box.min.y - origin.y) * invD;
      var t2 = (box.max.y - origin.y) * invD;
      if (t1 > t2) {
        final tmp = t1;
        t1 = t2;
        t2 = tmp;
      }
      tMin = math.max(tMin, t1);
      tMax = math.min(tMax, t2);
      if (tMin > tMax) return null;
    }

    // Z slab
    if (direction.z.abs() < 1e-9) {
      if (origin.z < box.min.z || origin.z > box.max.z) return null;
    } else {
      final invD = 1.0 / direction.z;
      var t1 = (box.min.z - origin.z) * invD;
      var t2 = (box.max.z - origin.z) * invD;
      if (t1 > t2) {
        final tmp = t1;
        t1 = t2;
        t2 = tmp;
      }
      tMin = math.max(tMin, t1);
      tMax = math.min(tMax, t2);
      if (tMin > tMax) return null;
    }

    return tMin;
  }

  /// Tests intersection against a [sphere].
  /// Returns the closest positive distance [t] to the sphere surface, or `null` if the ray misses.
  double? intersectSphere(BoundingSphere sphere) {
    final oc = origin - sphere.center;
    final b = oc.dot(direction);
    final c = oc.dot(oc) - sphere.radius * sphere.radius;
    final discriminant = b * b - c;
    if (discriminant < 0) return null;
    final sqrtD = math.sqrt(discriminant);
    var t = -b - sqrtD;
    if (t < 0) {
      t = -b + sqrtD;
      if (t < 0) return null;
    }
    return t;
  }

  /// Tests intersection with a plane defined by [planeNormal] and [planeDistance]
  /// where `planeNormal.dot(p) + planeDistance = 0`.
  double? intersectPlane(Vec3 planeNormal, double planeDistance) {
    final denom = planeNormal.dot(direction);
    if (denom.abs() < 1e-7) return null;
    final t = -(planeNormal.dot(origin) + planeDistance) / denom;
    return t >= 0 ? t : null;
  }

  /// Tests intersection with a triangle defined by vertices [v0], [v1], [v2]
  /// using the Möller–Trumbore algorithm. Returns positive distance [t] or `null`.
  double? intersectTriangle(Vec3 v0, Vec3 v1, Vec3 v2) {
    final edge1 = v1 - v0;
    final edge2 = v2 - v0;
    final h = direction.cross(edge2);
    final a = edge1.dot(h);
    if (a.abs() < 1e-7) return null;
    final f = 1.0 / a;
    final s = origin - v0;
    final u = f * s.dot(h);
    if (u < 0.0 || u > 1.0) return null;
    final q = s.cross(edge1);
    final v = f * direction.dot(q);
    if (v < 0.0 || u + v > 1.0) return null;
    final t = f * edge2.dot(q);
    return t >= 0 ? t : null;
  }

  @override
  String toString() => 'Ray(origin: $origin, direction: $direction)';
}

/// The result of a 3D raycast intersection with a [SceneNode].
final class RaycastHit {
  final SceneNode node;
  final Vec3 point;
  final Vec3 normal;
  final double distance;
  final int? triangleIndex;
  final int? instanceIndex;

  const RaycastHit({
    required this.node,
    required this.point,
    required this.normal,
    required this.distance,
    this.triangleIndex,
    this.instanceIndex,
  });

  @override
  String toString() {
    final inst = instanceIndex != null ? ', instance: #$instanceIndex' : '';
    return 'RaycastHit(node: "${node.name}"$inst, distance: ${distance.toStringAsFixed(2)}, point: $point)';
  }
}
