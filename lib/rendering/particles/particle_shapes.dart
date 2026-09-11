import 'dart:math' as math;

import '../api/mesh.dart';
import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';

/// One sampled spawn point and initial launch direction in world space.
final class EmitterSpawnSample {
  final Vec3 position;
  final Vec3 direction;

  const EmitterSpawnSample({
    required this.position,
    required this.direction,
  });

  void validate() {
    if (!position.isFinite || !direction.isFinite) {
      throw ArgumentError('EmitterSpawnSample must be finite');
    }
  }
}

/// Abstract contract for spatial emitter geometry.
abstract interface class EmitterShape {
  /// Validates configuration parameters.
  void validate();

  /// Samples one world-space position and launch direction relative to [emitterTransform].
  EmitterSpawnSample sampleSpawn(
    math.Random random,
    Transform emitterTransform,
  );
}

// ---------------------------------------------------------------------------
// Point Shape
// ---------------------------------------------------------------------------

/// Emits particles from a single point (with optional local offset) into a
/// full sphere, hemisphere, or directional cone.
final class PointShape implements EmitterShape {
  final Vec3 offset;
  final Vec3? direction;
  final double spreadAngleRadians;

  const PointShape({
    this.offset = Vec3.zero,
    this.direction,
    this.spreadAngleRadians = 0.0,
  });

  @override
  void validate() {
    if (!offset.isFinite) {
      throw ArgumentError('PointShape.offset must be finite');
    }
    if (direction != null && (!direction!.isFinite || direction!.lengthSquared < 1e-6)) {
      throw ArgumentError('PointShape.direction must be finite and non-zero');
    }
    if (!spreadAngleRadians.isFinite || spreadAngleRadians < 0 || spreadAngleRadians > math.pi) {
      throw ArgumentError('PointShape.spreadAngleRadians must be in [0, pi]');
    }
  }

  @override
  EmitterSpawnSample sampleSpawn(math.Random random, Transform emitterTransform) {
    validate();
    final localPos = offset;
    final worldPos = emitterTransform.transformPoint(localPos);

    Vec3 localDir;
    final authoredDir = direction;
    if (authoredDir == null) {
      localDir = _randomUnitSphere(random);
    } else if (spreadAngleRadians <= 1e-6) {
      localDir = authoredDir.normalized;
    } else {
      localDir = _disperseDirection(authoredDir.normalized, spreadAngleRadians, random);
    }

    final worldDir = emitterTransform.transformDir(localDir).normalized;
    final sample = EmitterSpawnSample(position: worldPos, direction: worldDir);
    sample.validate();
    return sample;
  }
}

// ---------------------------------------------------------------------------
// Box Shape
// ---------------------------------------------------------------------------

enum BoxEmissionMode { volume, surface, edges }

/// Emits particles from an axis-aligned bounding volume, surface, or wire edges.
final class BoxShape implements EmitterShape {
  final Vec3 halfExtents;
  final BoxEmissionMode mode;
  final bool emitAlongNormal;
  final Vec3? fixedDirection;

  const BoxShape({
    required this.halfExtents,
    this.mode = BoxEmissionMode.volume,
    this.emitAlongNormal = false,
    this.fixedDirection,
  });

  @override
  void validate() {
    if (!halfExtents.isFinite || halfExtents.x < 0 || halfExtents.y < 0 || halfExtents.z < 0) {
      throw ArgumentError('BoxShape.halfExtents must be finite and >= 0');
    }
    if (fixedDirection != null && (!fixedDirection!.isFinite || fixedDirection!.lengthSquared < 1e-6)) {
      throw ArgumentError('BoxShape.fixedDirection must be finite and non-zero');
    }
  }

  @override
  EmitterSpawnSample sampleSpawn(math.Random random, Transform emitterTransform) {
    validate();
    Vec3 localPos;
    Vec3 localDir;

    switch (mode) {
      case BoxEmissionMode.volume:
        localPos = Vec3(
          (random.nextDouble() * 2 - 1) * halfExtents.x,
          (random.nextDouble() * 2 - 1) * halfExtents.y,
          (random.nextDouble() * 2 - 1) * halfExtents.z,
        );
        localDir = fixedDirection?.normalized ?? _randomUnitSphere(random);

      case BoxEmissionMode.surface:
        final face = random.nextInt(6);
        final u = random.nextDouble() * 2 - 1;
        final v = random.nextDouble() * 2 - 1;
        Vec3 normal;
        switch (face) {
          case 0:
            localPos = Vec3(halfExtents.x, u * halfExtents.y, v * halfExtents.z);
            normal = Vec3.unitX;
          case 1:
            localPos = Vec3(-halfExtents.x, u * halfExtents.y, v * halfExtents.z);
            normal = -Vec3.unitX;
          case 2:
            localPos = Vec3(u * halfExtents.x, halfExtents.y, v * halfExtents.z);
            normal = Vec3.unitY;
          case 3:
            localPos = Vec3(u * halfExtents.x, -halfExtents.y, v * halfExtents.z);
            normal = -Vec3.unitY;
          case 4:
            localPos = Vec3(u * halfExtents.x, v * halfExtents.y, halfExtents.z);
            normal = Vec3.unitZ;
          default:
            localPos = Vec3(u * halfExtents.x, v * halfExtents.y, -halfExtents.z);
            normal = -Vec3.unitZ;
        }
        localDir = emitAlongNormal
            ? normal
            : (fixedDirection?.normalized ?? _randomUnitSphere(random));

      case BoxEmissionMode.edges:
        final axis = random.nextInt(3);
        final s1 = random.nextBool() ? 1.0 : -1.0;
        final s2 = random.nextBool() ? 1.0 : -1.0;
        final t = random.nextDouble() * 2 - 1;
        switch (axis) {
          case 0:
            localPos = Vec3(t * halfExtents.x, s1 * halfExtents.y, s2 * halfExtents.z);
          case 1:
            localPos = Vec3(s1 * halfExtents.x, t * halfExtents.y, s2 * halfExtents.z);
          default:
            localPos = Vec3(s1 * halfExtents.x, s2 * halfExtents.y, t * halfExtents.z);
        }
        localDir = fixedDirection?.normalized ?? _randomUnitSphere(random);
    }

    final worldPos = emitterTransform.transformPoint(localPos);
    final worldDir = emitterTransform.transformDir(localDir).normalized;
    return EmitterSpawnSample(position: worldPos, direction: worldDir);
  }
}

// ---------------------------------------------------------------------------
// Sphere Shape
// ---------------------------------------------------------------------------

enum SphereEmissionMode { volume, surface }
enum SphereDirectionMode { outward, inward, random, fixed }

/// Emits particles from a solid or hollow sphere, with optional hemisphere masking.
final class SphereShape implements EmitterShape {
  final double radius;
  final double innerRadius;
  final SphereEmissionMode mode;
  final SphereDirectionMode directionMode;
  final bool hemisphereOnly;
  final Vec3? fixedDirection;

  const SphereShape({
    required this.radius,
    this.innerRadius = 0.0,
    this.mode = SphereEmissionMode.volume,
    this.directionMode = SphereDirectionMode.outward,
    this.hemisphereOnly = false,
    this.fixedDirection,
  });

  @override
  void validate() {
    if (!radius.isFinite || radius <= 0) {
      throw ArgumentError('SphereShape.radius must be finite and > 0');
    }
    if (!innerRadius.isFinite || innerRadius < 0 || innerRadius > radius) {
      throw ArgumentError('SphereShape.innerRadius must be in [0, radius]');
    }
    if (fixedDirection != null && (!fixedDirection!.isFinite || fixedDirection!.lengthSquared < 1e-6)) {
      throw ArgumentError('SphereShape.fixedDirection must be finite and non-zero');
    }
  }

  @override
  EmitterSpawnSample sampleSpawn(math.Random random, Transform emitterTransform) {
    validate();
    var dir = _randomUnitSphere(random);
    if (hemisphereOnly && dir.y < 0) {
      dir = Vec3(dir.x, -dir.y, dir.z);
    }

    double r;
    if (mode == SphereEmissionMode.surface) {
      r = radius;
    } else {
      final u = random.nextDouble();
      final minR3 = innerRadius * innerRadius * innerRadius;
      final maxR3 = radius * radius * radius;
      r = math.pow(minR3 + u * (maxR3 - minR3), 1.0 / 3.0).toDouble();
    }

    final localPos = dir * r;
    Vec3 localDir;
    switch (directionMode) {
      case SphereDirectionMode.outward:
        localDir = dir;
      case SphereDirectionMode.inward:
        localDir = -dir;
      case SphereDirectionMode.random:
        localDir = _randomUnitSphere(random);
      case SphereDirectionMode.fixed:
        localDir = fixedDirection?.normalized ?? dir;
    }

    final worldPos = emitterTransform.transformPoint(localPos);
    final worldDir = emitterTransform.transformDir(localDir).normalized;
    return EmitterSpawnSample(position: worldPos, direction: worldDir);
  }
}

// ---------------------------------------------------------------------------
// Cone Shape
// ---------------------------------------------------------------------------

enum ConeEmissionMode { apex, base, volume }

/// Emits particles in a truncated or full conical volume / nozzle.
/// The cone axis extends along the local +Y vector.
final class ConeShape implements EmitterShape {
  final double radius;
  final double angleRadians;
  final double length;
  final ConeEmissionMode mode;
  final bool emitAlongDivergence;

  const ConeShape({
    required this.radius,
    required this.angleRadians,
    required this.length,
    this.mode = ConeEmissionMode.base,
    this.emitAlongDivergence = true,
  });

  @override
  void validate() {
    if (!radius.isFinite || radius < 0) {
      throw ArgumentError('ConeShape.radius must be finite and >= 0');
    }
    if (!angleRadians.isFinite || angleRadians < 0 || angleRadians >= math.pi * 0.5) {
      throw ArgumentError('ConeShape.angleRadians must be in [0, pi/2)');
    }
    if (!length.isFinite || length <= 0) {
      throw ArgumentError('ConeShape.length must be finite and > 0');
    }
  }

  @override
  EmitterSpawnSample sampleSpawn(math.Random random, Transform emitterTransform) {
    validate();
    double h;
    switch (mode) {
      case ConeEmissionMode.apex:
        h = 0.0;
      case ConeEmissionMode.base:
        h = length;
      case ConeEmissionMode.volume:
        h = random.nextDouble() * length;
    }

    final maxR = radius + h * math.tan(angleRadians);
    final u = random.nextDouble();
    final r = math.sqrt(u) * maxR;
    final theta = random.nextDouble() * 2.0 * math.pi;
    final x = r * math.cos(theta);
    final z = r * math.sin(theta);
    final localPos = Vec3(x, h, z);

    Vec3 localDir;
    if (emitAlongDivergence) {
      if (r < 1e-6) {
        localDir = Vec3.unitY;
      } else {
        final sinA = math.sin(angleRadians);
        final cosA = math.cos(angleRadians);
        final radialDir = Vec3(x / r, 0, z / r);
        localDir = Vec3(radialDir.x * sinA, cosA, radialDir.z * sinA).normalized;
      }
    } else {
      localDir = Vec3.unitY;
    }

    final worldPos = emitterTransform.transformPoint(localPos);
    final worldDir = emitterTransform.transformDir(localDir).normalized;
    return EmitterSpawnSample(position: worldPos, direction: worldDir);
  }
}

// ---------------------------------------------------------------------------
// Circle / Disc Shape
// ---------------------------------------------------------------------------

enum CircleEmissionMode { volume, edge }
enum CircleDirectionMode { normal, radialOutward, radialInward, tangent, random }

/// Emits particles from a planar 2D disc or circular ring.
/// Default orientation lies in the local XZ plane with normal +Y.
final class CircleShape implements EmitterShape {
  final double radius;
  final double innerRadius;
  final Vec3 normal;
  final CircleEmissionMode mode;
  final CircleDirectionMode directionMode;

  const CircleShape({
    required this.radius,
    this.innerRadius = 0.0,
    this.normal = Vec3.unitY,
    this.mode = CircleEmissionMode.volume,
    this.directionMode = CircleDirectionMode.normal,
  });

  @override
  void validate() {
    if (!radius.isFinite || radius <= 0) {
      throw ArgumentError('CircleShape.radius must be finite and > 0');
    }
    if (!innerRadius.isFinite || innerRadius < 0 || innerRadius > radius) {
      throw ArgumentError('CircleShape.innerRadius must be in [0, radius]');
    }
    if (!normal.isFinite || normal.lengthSquared < 1e-6) {
      throw ArgumentError('CircleShape.normal must be finite and non-zero');
    }
  }

  @override
  EmitterSpawnSample sampleSpawn(math.Random random, Transform emitterTransform) {
    validate();
    final theta = random.nextDouble() * 2.0 * math.pi;
    double r;
    if (mode == CircleEmissionMode.edge) {
      r = radius;
    } else {
      final u = random.nextDouble();
      r = math.sqrt(innerRadius * innerRadius + u * (radius * radius - innerRadius * innerRadius));
    }

    // Construct an orthonormal basis with `normal` as up
    final n = normal.normalized;
    final tangentBasis = n.cross(n.y.abs() > 0.9 ? Vec3.unitX : Vec3.unitY).normalized;
    final bitangentBasis = n.cross(tangentBasis).normalized;

    final radialOffset = tangentBasis * (r * math.cos(theta)) + bitangentBasis * (r * math.sin(theta));
    final localPos = radialOffset;

    Vec3 localDir;
    switch (directionMode) {
      case CircleDirectionMode.normal:
        localDir = n;
      case CircleDirectionMode.radialOutward:
        localDir = r > 1e-6 ? radialOffset.normalized : n;
      case CircleDirectionMode.radialInward:
        localDir = r > 1e-6 ? -radialOffset.normalized : -n;
      case CircleDirectionMode.tangent:
        localDir = n.cross(radialOffset).normalized;
      case CircleDirectionMode.random:
        localDir = _randomUnitSphere(random);
    }

    final worldPos = emitterTransform.transformPoint(localPos);
    final worldDir = emitterTransform.transformDir(localDir).normalized;
    return EmitterSpawnSample(position: worldPos, direction: worldDir);
  }
}

// ---------------------------------------------------------------------------
// Line Shape
// ---------------------------------------------------------------------------

enum LineDirectionMode { perpendicular, alongLine, random, fixed }

/// Emits particles along a 3D line segment.
final class LineShape implements EmitterShape {
  final Vec3 start;
  final Vec3 end;
  final LineDirectionMode directionMode;
  final Vec3? fixedDirection;

  const LineShape({
    required this.start,
    required this.end,
    this.directionMode = LineDirectionMode.perpendicular,
    this.fixedDirection,
  });

  @override
  void validate() {
    if (!start.isFinite || !end.isFinite) {
      throw ArgumentError('LineShape start and end must be finite');
    }
    if ((end - start).lengthSquared < 1e-8) {
      throw ArgumentError('LineShape segment must have non-zero length');
    }
    if (fixedDirection != null && (!fixedDirection!.isFinite || fixedDirection!.lengthSquared < 1e-6)) {
      throw ArgumentError('LineShape.fixedDirection must be finite and non-zero');
    }
  }

  @override
  EmitterSpawnSample sampleSpawn(math.Random random, Transform emitterTransform) {
    validate();
    final t = random.nextDouble();
    final localPos = Vec3.lerp(start, end, t);

    final lineDir = (end - start).normalized;
    Vec3 localDir;
    switch (directionMode) {
      case LineDirectionMode.alongLine:
        localDir = lineDir;
      case LineDirectionMode.perpendicular:
        final perp = lineDir.cross(lineDir.y.abs() > 0.9 ? Vec3.unitX : Vec3.unitY).normalized;
        final angle = random.nextDouble() * 2.0 * math.pi;
        final bitangent = lineDir.cross(perp).normalized;
        localDir = (perp * math.cos(angle) + bitangent * math.sin(angle)).normalized;
      case LineDirectionMode.random:
        localDir = _randomUnitSphere(random);
      case LineDirectionMode.fixed:
        localDir = fixedDirection?.normalized ?? lineDir;
    }

    final worldPos = emitterTransform.transformPoint(localPos);
    final worldDir = emitterTransform.transformDir(localDir).normalized;
    return EmitterSpawnSample(position: worldPos, direction: worldDir);
  }
}

// ---------------------------------------------------------------------------
// Mesh Shape
// ---------------------------------------------------------------------------

enum MeshEmissionMode { vertices, surface }

/// Emits particles from authored vertex positions and surface normals of a [MeshData].
final class MeshShape implements EmitterShape {
  final MeshData meshData;
  final MeshEmissionMode mode;

  const MeshShape({
    required this.meshData,
    this.mode = MeshEmissionMode.surface,
  });

  @override
  void validate() {
    meshData.validate();
    if (meshData.vertexCount == 0) {
      throw ArgumentError('MeshShape requires non-empty MeshData');
    }
  }

  @override
  EmitterSpawnSample sampleSpawn(math.Random random, Transform emitterTransform) {
    validate();
    Vec3 localPos;
    Vec3 localDir;

    final indices = meshData.indices;
    if (mode == MeshEmissionMode.vertices ||
        (indices != null && indices.length < 3) ||
        (indices == null && meshData.vertexCount < 3)) {
      final vertexIndex = random.nextInt(meshData.vertexCount);
      localPos = _positionAt(vertexIndex);
      localDir = _normalAt(vertexIndex);
      if (localDir.lengthSquared < 1e-6) localDir = Vec3.unitY;
    } else {
      int i0, i1, i2;
      if (indices != null) {
        final triIndex = random.nextInt(indices.length ~/ 3) * 3;
        i0 = indices[triIndex];
        i1 = indices[triIndex + 1];
        i2 = indices[triIndex + 2];
      } else {
        final triIndex = random.nextInt(meshData.vertexCount ~/ 3) * 3;
        i0 = triIndex;
        i1 = triIndex + 1;
        i2 = triIndex + 2;
      }

      final p0 = _positionAt(i0);
      final p1 = _positionAt(i1);
      final p2 = _positionAt(i2);

      final n0 = _normalAt(i0);
      final n1 = _normalAt(i1);
      final n2 = _normalAt(i2);

      var r1 = random.nextDouble();
      var r2 = random.nextDouble();
      if (r1 + r2 > 1.0) {
        r1 = 1.0 - r1;
        r2 = 1.0 - r2;
      }
      final r0 = 1.0 - r1 - r2;

      localPos = p0 * r0 + p1 * r1 + p2 * r2;
      localDir = (n0 * r0 + n1 * r1 + n2 * r2).normalized;
      if (localDir.lengthSquared < 1e-6) {
        final faceNormal = (p1 - p0).cross(p2 - p0).normalized;
        localDir = faceNormal.lengthSquared > 1e-6 ? faceNormal : Vec3.unitY;
      }
    }

    final worldPos = emitterTransform.transformPoint(localPos);
    final worldDir = emitterTransform.transformDir(localDir).normalized;
    return EmitterSpawnSample(position: worldPos, direction: worldDir);
  }

  Vec3 _positionAt(int vertexIndex) {
    final posSlot = meshData.layout.attributes.firstWhere(
      (a) => a.kind == VertexAttributeKind.position,
    );
    final offset = vertexIndex * meshData.layout.strideFloats + posSlot.floatOffset;
    return Vec3(
      meshData.vertices[offset],
      meshData.vertices[offset + 1],
      meshData.vertices[offset + 2],
    );
  }

  Vec3 _normalAt(int vertexIndex) {
    final normalSlot = meshData.layout.attributes.where(
      (a) => a.kind == VertexAttributeKind.normal,
    ).firstOrNull;
    if (normalSlot == null) return Vec3.unitY;
    final offset = vertexIndex * meshData.layout.strideFloats + normalSlot.floatOffset;
    return Vec3(
      meshData.vertices[offset],
      meshData.vertices[offset + 1],
      meshData.vertices[offset + 2],
    );
  }
}

// ---------------------------------------------------------------------------
// Math Helpers
// ---------------------------------------------------------------------------

Vec3 _randomUnitSphere(math.Random random) {
  final u = random.nextDouble();
  final v = random.nextDouble();
  final z = 2.0 * u - 1.0;
  final phi = 2.0 * math.pi * v;
  final r = math.sqrt(math.max(0.0, 1.0 - z * z));
  return Vec3(r * math.cos(phi), z, r * math.sin(phi));
}

Vec3 _disperseDirection(Vec3 dir, double angleRadians, math.Random random) {
  final coneSample = _randomUnitCone(angleRadians, random);
  final rot = Quat.fromTo(Vec3.unitY, dir);
  return rot.rotate(coneSample).normalized;
}

Vec3 _randomUnitCone(double angleRadians, math.Random random) {
  final cosMax = math.cos(angleRadians);
  final u = random.nextDouble();
  final z = cosMax + u * (1.0 - cosMax);
  final r = math.sqrt(math.max(0.0, 1.0 - z * z));
  final phi = random.nextDouble() * 2.0 * math.pi;
  return Vec3(r * math.cos(phi), z, r * math.sin(phi));
}
