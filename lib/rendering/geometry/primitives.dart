import 'dart:math' as math;
import 'dart:typed_data';

import '../api/mesh.dart';
import '../math/bounds.dart';
import '../math/vec.dart';

/// Procedural geometry generators producing validated surface-v2 [MeshData].
abstract final class Primitives {
  /// Generates an axis-aligned cube centered at origin with side length [size].
  static MeshData cube({double size = 1.0, double uvScale = 1.0}) {
    if (size <= 0) throw ArgumentError.value(size, 'size', 'must be > 0');
    final h = size * 0.5;
    final b = _PrimitiveMeshBuilder();

    void face(Vec3 p0, Vec3 p1, Vec3 p2, Vec3 p3, Vec3 n, Vec3 t) {
      final base = b.vertexCount;
      b.addVertex(p0, n, t, Vec2(0, 0) * uvScale);
      b.addVertex(p1, n, t, Vec2(1, 0) * uvScale);
      b.addVertex(p2, n, t, Vec2(1, 1) * uvScale);
      b.addVertex(p3, n, t, Vec2(0, 1) * uvScale);
      b.addQuadIndices(base, base + 1, base + 2, base + 3);
    }

    face(Vec3(-h, -h, h), Vec3(h, -h, h), Vec3(h, h, h), Vec3(-h, h, h), const Vec3(0, 0, 1), const Vec3(1, 0, 0)); // +Z
    face(Vec3(h, -h, -h), Vec3(-h, -h, -h), Vec3(-h, h, -h), Vec3(h, h, -h), const Vec3(0, 0, -1), const Vec3(-1, 0, 0)); // -Z
    face(Vec3(-h, h, h), Vec3(h, h, h), Vec3(h, h, -h), Vec3(-h, h, -h), const Vec3(0, 1, 0), const Vec3(1, 0, 0)); // +Y
    face(Vec3(-h, -h, -h), Vec3(h, -h, -h), Vec3(h, -h, h), Vec3(-h, -h, h), const Vec3(0, -1, 0), const Vec3(-1, 0, 0)); // -Y
    face(Vec3(h, -h, h), Vec3(h, -h, -h), Vec3(h, h, -h), Vec3(h, h, h), const Vec3(1, 0, 0), const Vec3(0, 0, -1)); // +X
    face(Vec3(-h, -h, -h), Vec3(-h, -h, h), Vec3(-h, h, h), Vec3(-h, h, -h), const Vec3(-1, 0, 0), const Vec3(0, 0, 1)); // -X

    return b.build(Aabb(Vec3(-h, -h, -h), Vec3(h, h, h)));
  }

  /// Generates a subdivided plane in the XZ plane centered at origin.
  static MeshData plane({
    double width = 1.0,
    double depth = 1.0,
    int subdivisionsX = 1,
    int subdivisionsZ = 1,
    double uvScale = 1.0,
  }) {
    if (width <= 0 || depth <= 0) throw ArgumentError('dimensions must be > 0');
    if (subdivisionsX < 1 || subdivisionsZ < 1) throw ArgumentError('subdivisions must be >= 1');

    final b = _PrimitiveMeshBuilder();
    final halfW = width * 0.5;
    final halfD = depth * 0.5;
    const n = Vec3(0, 1, 0);
    const t = Vec3(1, 0, 0);

    for (var z = 0; z <= subdivisionsZ; z++) {
      final fz = z / subdivisionsZ;
      final pz = -halfD + fz * depth;
      for (var x = 0; x <= subdivisionsX; x++) {
        final fx = x / subdivisionsX;
        b.addVertex(Vec3(-halfW + fx * width, 0, pz), n, t, Vec2(fx * uvScale, fz * uvScale));
      }
    }

    final rowStride = subdivisionsX + 1;
    for (var z = 0; z < subdivisionsZ; z++) {
      for (var x = 0; x < subdivisionsX; x++) {
        final i0 = z * rowStride + x;
        b.addQuadIndices(i0, (z + 1) * rowStride + x, (z + 1) * rowStride + x + 1, i0 + 1);
      }
    }

    return b.build(Aabb(Vec3(-halfW, 0, -halfD), Vec3(halfW, 0, halfD)));
  }

  /// Generates a UV sphere centered at origin.
  static MeshData sphere({double radius = 0.5, int rings = 16, int sectors = 32}) {
    if (radius <= 0) throw ArgumentError.value(radius, 'radius', 'must be > 0');
    if (rings < 2 || sectors < 3) throw ArgumentError('invalid ring or sector count');

    final b = _PrimitiveMeshBuilder();
    for (var r = 0; r <= rings; r++) {
      final v = r / rings;
      final phi = v * math.pi;
      final sinPhi = math.sin(phi);
      final cosPhi = math.cos(phi);

      for (var s = 0; s <= sectors; s++) {
        final u = s / sectors;
        final theta = u * 2.0 * math.pi;
        final sinTheta = math.sin(theta);
        final cosTheta = math.cos(theta);

        final nx = sinPhi * cosTheta;
        final ny = cosPhi;
        final nz = sinPhi * sinTheta;

        var tx = -sinTheta;
        var tz = cosTheta;
        final tLen = math.sqrt(tx * tx + tz * tz);
        if (tLen > 1e-6) {
          tx /= tLen;
          tz /= tLen;
        } else {
          tx = 1.0;
          tz = 0.0;
        }

        b.addVertex(Vec3(nx * radius, ny * radius, nz * radius), Vec3(nx, ny, nz), Vec3(tx, 0.0, tz), Vec2(u, v));
      }
    }

    final sectorStride = sectors + 1;
    for (var r = 0; r < rings; r++) {
      for (var s = 0; s < sectors; s++) {
        final i0 = r * sectorStride + s;
        b.addQuadIndices(i0, i0 + 1, (r + 1) * sectorStride + s + 1, (r + 1) * sectorStride + s);
      }
    }

    final rVec = Vec3(radius, radius, radius);
    return b.build(Aabb(rVec * -1, rVec));
  }

  /// Generates a billboard quad in the XY plane facing +Z.
  static MeshData quad({double width = 1.0, double height = 1.0}) {
    if (width <= 0 || height <= 0) throw ArgumentError('dimensions must be > 0');
    final b = _PrimitiveMeshBuilder();
    final hw = width * 0.5;
    final hh = height * 0.5;
    const n = Vec3(0, 0, 1);
    const t = Vec3(1, 0, 0);

    b.addVertex(Vec3(-hw, -hh, 0), n, t, const Vec2(0, 0));
    b.addVertex(Vec3(hw, -hh, 0), n, t, const Vec2(1, 0));
    b.addVertex(Vec3(hw, hh, 0), n, t, const Vec2(1, 1));
    b.addVertex(Vec3(-hw, hh, 0), n, t, const Vec2(0, 1));
    b.addQuadIndices(0, 1, 2, 3);

    return b.build(Aabb(Vec3(-hw, -hh, 0), Vec3(hw, hh, 0)));
  }

  /// Generates a 3D cylinder aligned along the Y-axis.
  static MeshData cylinder({
    double radius = 0.5,
    double height = 1.0,
    int radialSegments = 24,
    bool capped = true,
  }) {
    if (radius <= 0 || height <= 0) throw ArgumentError('radius and height must be > 0');
    if (radialSegments < 3) throw ArgumentError('radialSegments must be >= 3');

    final b = _PrimitiveMeshBuilder();
    final hh = height * 0.5;

    // Body vertices
    for (var s = 0; s <= radialSegments; s++) {
      final u = s / radialSegments;
      final theta = u * 2.0 * math.pi;
      final cosT = math.cos(theta);
      final sinT = math.sin(theta);
      final n = Vec3(cosT, 0, sinT);
      final t = Vec3(-sinT, 0, cosT);

      b.addVertex(Vec3(cosT * radius, -hh, sinT * radius), n, t, Vec2(u, 0));
      b.addVertex(Vec3(cosT * radius, hh, sinT * radius), n, t, Vec2(u, 1));
    }

    for (var s = 0; s < radialSegments; s++) {
      final i0 = s * 2;
      b.addQuadIndices(i0, i0 + 2, i0 + 3, i0 + 1);
    }

    if (capped) {
      // Top cap
      final topCenterIdx = b.vertexCount;
      b.addVertex(Vec3(0, hh, 0), const Vec3(0, 1, 0), const Vec3(1, 0, 0), const Vec2(0.5, 0.5));
      for (var s = 0; s <= radialSegments; s++) {
        final theta = (s / radialSegments) * 2.0 * math.pi;
        final cosT = math.cos(theta);
        final sinT = math.sin(theta);
        b.addVertex(
          Vec3(cosT * radius, hh, sinT * radius),
          const Vec3(0, 1, 0),
          const Vec3(1, 0, 0),
          Vec2(cosT * 0.5 + 0.5, sinT * 0.5 + 0.5),
        );
      }
      for (var s = 0; s < radialSegments; s++) {
        b.addTriangleIndices(topCenterIdx, topCenterIdx + 1 + s, topCenterIdx + 2 + s);
      }

      // Bottom cap
      final botCenterIdx = b.vertexCount;
      b.addVertex(Vec3(0, -hh, 0), const Vec3(0, -1, 0), const Vec3(-1, 0, 0), const Vec2(0.5, 0.5));
      for (var s = 0; s <= radialSegments; s++) {
        final theta = (s / radialSegments) * 2.0 * math.pi;
        final cosT = math.cos(theta);
        final sinT = math.sin(theta);
        b.addVertex(
          Vec3(cosT * radius, -hh, sinT * radius),
          const Vec3(0, -1, 0),
          const Vec3(-1, 0, 0),
          Vec2(cosT * 0.5 + 0.5, sinT * 0.5 + 0.5),
        );
      }
      for (var s = 0; s < radialSegments; s++) {
        b.addTriangleIndices(botCenterIdx, botCenterIdx + 2 + s, botCenterIdx + 1 + s);
      }
    }

    return b.build(Aabb(Vec3(-radius, -hh, -radius), Vec3(radius, hh, radius)));
  }

  /// Generates a 3D cone pointing along the +Y axis.
  static MeshData cone({
    double radius = 0.5,
    double height = 1.0,
    int radialSegments = 24,
    bool capped = true,
  }) {
    if (radius <= 0 || height <= 0) throw ArgumentError('radius and height must be > 0');
    if (radialSegments < 3) throw ArgumentError('radialSegments must be >= 3');

    final b = _PrimitiveMeshBuilder();
    final hh = height * 0.5;
    final slope = radius / height;
    final nY = slope / math.sqrt(1.0 + slope * slope);
    final nXZ = 1.0 / math.sqrt(1.0 + slope * slope);

    for (var s = 0; s < radialSegments; s++) {
      final u0 = s / radialSegments;
      final u1 = (s + 1) / radialSegments;
      final t0 = u0 * 2.0 * math.pi;
      final t1 = u1 * 2.0 * math.pi;
      final midT = (t0 + t1) * 0.5;

      final n = Vec3(math.cos(midT) * nXZ, nY, math.sin(midT) * nXZ);
      final t = Vec3(-math.sin(midT), 0, math.cos(midT));

      final baseIdx = b.vertexCount;
      b.addVertex(Vec3(0, hh, 0), n, t, Vec2((u0 + u1) * 0.5, 1));
      b.addVertex(Vec3(math.cos(t0) * radius, -hh, math.sin(t0) * radius), n, t, Vec2(u0, 0));
      b.addVertex(Vec3(math.cos(t1) * radius, -hh, math.sin(t1) * radius), n, t, Vec2(u1, 0));
      b.addTriangleIndices(baseIdx, baseIdx + 1, baseIdx + 2);
    }

    if (capped) {
      final botCenterIdx = b.vertexCount;
      b.addVertex(Vec3(0, -hh, 0), const Vec3(0, -1, 0), const Vec3(-1, 0, 0), const Vec2(0.5, 0.5));
      for (var s = 0; s <= radialSegments; s++) {
        final theta = (s / radialSegments) * 2.0 * math.pi;
        final cosT = math.cos(theta);
        final sinT = math.sin(theta);
        b.addVertex(
          Vec3(cosT * radius, -hh, sinT * radius),
          const Vec3(0, -1, 0),
          const Vec3(-1, 0, 0),
          Vec2(cosT * 0.5 + 0.5, sinT * 0.5 + 0.5),
        );
      }
      for (var s = 0; s < radialSegments; s++) {
        b.addTriangleIndices(botCenterIdx, botCenterIdx + 2 + s, botCenterIdx + 1 + s);
      }
    }

    return b.build(Aabb(Vec3(-radius, -hh, -radius), Vec3(radius, hh, radius)));
  }

  /// Generates a 3D torus in the XZ plane with hole along the Y-axis.
  static MeshData torus({
    double radius = 0.8,
    double tubeRadius = 0.2,
    int radialSegments = 16,
    int tubularSegments = 32,
  }) {
    if (radius <= 0 || tubeRadius <= 0) throw ArgumentError('radii must be > 0');
    if (radialSegments < 3 || tubularSegments < 3) throw ArgumentError('segments must be >= 3');

    final b = _PrimitiveMeshBuilder();

    for (var j = 0; j <= radialSegments; j++) {
      final v = (j / radialSegments) * 2.0 * math.pi;
      final cosV = math.cos(v);
      final sinV = math.sin(v);

      for (var i = 0; i <= tubularSegments; i++) {
        final u = (i / tubularSegments) * 2.0 * math.pi;
        final cosU = math.cos(u);
        final sinU = math.sin(u);

        final x = (radius + tubeRadius * cosV) * cosU;
        final y = tubeRadius * sinV;
        final z = (radius + tubeRadius * cosV) * sinU;

        final n = Vec3(cosV * cosU, sinV, cosV * sinU);
        final t = Vec3(-sinU, 0, cosU);
        final uv = Vec2(i / tubularSegments, j / radialSegments);

        b.addVertex(Vec3(x, y, z), n, t, uv);
      }
    }

    final stride = tubularSegments + 1;
    for (var j = 0; j < radialSegments; j++) {
      for (var i = 0; i < tubularSegments; i++) {
        final a = j * stride + i;
        final c = (j + 1) * stride + i + 1;
        b.addQuadIndices(a, a + 1, c, (j + 1) * stride + i);
      }
    }

    final maxR = radius + tubeRadius;
    return b.build(Aabb(Vec3(-maxR, -tubeRadius, -maxR), Vec3(maxR, tubeRadius, maxR)));
  }

  /// Generates a capsule aligned along the Y-axis.
  static MeshData capsule({
    double radius = 0.3,
    double cylinderHeight = 0.6,
    int rings = 8,
    int sectors = 24,
  }) {
    if (radius <= 0 || cylinderHeight <= 0) throw ArgumentError('radius and height must be > 0');
    if (rings < 2 || sectors < 3) throw ArgumentError('invalid ring or sector count');

    final b = _PrimitiveMeshBuilder();
    final halfH = cylinderHeight * 0.5;

    // Top hemisphere
    for (var r = 0; r <= rings; r++) {
      final phi = (r / rings) * (math.pi * 0.5);
      final sinP = math.sin(phi);
      final cosP = math.cos(phi);

      for (var s = 0; s <= sectors; s++) {
        final theta = (s / sectors) * 2.0 * math.pi;
        final cosT = math.cos(theta);
        final sinT = math.sin(theta);

        final nx = cosP * cosT;
        final ny = sinP;
        final nz = cosP * sinT;
        final pos = Vec3(nx * radius, halfH + ny * radius, nz * radius);
        final t = Vec3(-sinT, 0, cosT);

        b.addVertex(pos, Vec3(nx, ny, nz), t, Vec2(s / sectors, 0.5 + 0.5 * (r / rings)));
      }
    }

    // Bottom hemisphere
    for (var r = 0; r <= rings; r++) {
      final phi = (r / rings) * (math.pi * 0.5);
      final sinP = math.sin(phi);
      final cosP = math.cos(phi);

      for (var s = 0; s <= sectors; s++) {
        final theta = (s / sectors) * 2.0 * math.pi;
        final cosT = math.cos(theta);
        final sinT = math.sin(theta);

        final nx = cosP * cosT;
        final ny = -sinP;
        final nz = cosP * sinT;
        final pos = Vec3(nx * radius, -halfH + ny * radius, nz * radius);
        final t = Vec3(-sinT, 0, cosT);

        b.addVertex(pos, Vec3(nx, ny, nz), t, Vec2(s / sectors, 0.5 - 0.5 * (r / rings)));
      }
    }

    final sectorStride = sectors + 1;
    // Top hemisphere indices
    for (var r = 0; r < rings; r++) {
      for (var s = 0; s < sectors; s++) {
        final i0 = r * sectorStride + s;
        b.addQuadIndices(i0, (r + 1) * sectorStride + s, (r + 1) * sectorStride + s + 1, i0 + 1);
      }
    }

    // Bottom hemisphere indices
    final botOffset = (rings + 1) * sectorStride;
    for (var r = 0; r < rings; r++) {
      for (var s = 0; s < sectors; s++) {
        final i0 = botOffset + r * sectorStride + s;
        b.addQuadIndices(i0, i0 + 1, (r + 1) * sectorStride + s + 1 + botOffset, (r + 1) * sectorStride + s + botOffset);
      }
    }

    // Cylinder seam connecting the two hemisphere equator rings
    final topEquatorOffset = 0;
    final botEquatorOffset = botOffset;
    for (var s = 0; s < sectors; s++) {
      b.addQuadIndices(
        topEquatorOffset + s,
        topEquatorOffset + s + 1,
        botEquatorOffset + s + 1,
        botEquatorOffset + s,
      );
    }

    final totalH = halfH + radius;
    return b.build(Aabb(Vec3(-radius, -totalH, -radius), Vec3(radius, totalH, radius)));
  }
}

final class _PrimitiveMeshBuilder {
  final List<double> _vertexFloats = [];
  final List<int> _indices = [];

  int get vertexCount => _vertexFloats.length ~/ 18;

  void addVertex(Vec3 pos, Vec3 n, Vec3 t, Vec2 uv) {
    _vertexFloats.addAll([pos.x, pos.y, pos.z, n.x, n.y, n.z, t.x, t.y, t.z, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, uv.x, uv.y, 0.0]);
  }

  void addQuadIndices(int i0, int i1, int i2, int i3) {
    _indices.addAll([i0, i1, i2, i0, i2, i3]);
  }

  void addTriangleIndices(int i0, int i1, int i2) {
    _indices.addAll([i0, i1, i2]);
  }

  MeshData build(Aabb bounds) {
    final mesh = MeshData(
      layout: VertexLayoutDescriptor.surfaceV2,
      vertices: Float32List.fromList(_vertexFloats),
      indices: Uint16List.fromList(_indices),
      localBounds: bounds,
    );
    mesh.validate();
    return mesh;
  }
}
