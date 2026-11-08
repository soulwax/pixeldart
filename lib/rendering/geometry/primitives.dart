import 'dart:math' as math;
import 'dart:typed_data';

import '../api/mesh.dart';
import '../math/bounds.dart';
import '../math/quat.dart';
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

  /// Generates a geodesic sphere (icosphere) by recursively subdividing an icosahedron.
  /// Provides mathematically uniform vertex and triangle distribution across the sphere.
  static MeshData icosphere({double radius = 0.5, int subdivisions = 2}) {
    if (radius <= 0) throw ArgumentError.value(radius, 'radius', 'must be > 0');
    if (subdivisions < 0 || subdivisions > 5) {
      throw ArgumentError.value(subdivisions, 'subdivisions', 'must be between 0 and 5');
    }

    final phi = (1.0 + math.sqrt(5.0)) / 2.0;

    final baseVerts = [
      Vec3(-1, phi, 0), Vec3(1, phi, 0), Vec3(-1, -phi, 0), Vec3(1, -phi, 0),
      Vec3(0, -1, phi), Vec3(0, 1, phi), Vec3(0, -1, -phi), Vec3(0, 1, -phi),
      Vec3(phi, 0, -1), Vec3(phi, 0, 1), Vec3(-phi, 0, -1), Vec3(-phi, 0, 1),
    ].map((v) => v.normalized).toList();

    var faces = <List<int>>[
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
    ];

    var vertices = List<Vec3>.from(baseVerts);
    final midpointCache = <int, int>{};

    int getMidpoint(int p1, int p2) {
      final smaller = math.min(p1, p2);
      final greater = math.max(p1, p2);
      final key = (smaller << 16) | greater;

      final cached = midpointCache[key];
      if (cached != null) return cached;

      final mid = ((vertices[p1] + vertices[p2]) * 0.5).normalized;
      final index = vertices.length;
      vertices.add(mid);
      midpointCache[key] = index;
      return index;
    }

    for (var sub = 0; sub < subdivisions; sub++) {
      final newFaces = <List<int>>[];
      for (final tri in faces) {
        final a = tri[0];
        final b = tri[1];
        final c = tri[2];

        final ab = getMidpoint(a, b);
        final bc = getMidpoint(b, c);
        final ca = getMidpoint(c, a);

        newFaces.add([a, ab, ca]);
        newFaces.add([b, bc, ab]);
        newFaces.add([c, ca, bc]);
        newFaces.add([ab, bc, ca]);
      }
      faces = newFaces;
    }

    final b = _PrimitiveMeshBuilder();
    for (final v in vertices) {
      final pos = v * radius;
      final n = v;
      var tx = -v.z;
      var tz = v.x;
      final tLen = math.sqrt(tx * tx + tz * tz);
      final t = tLen > 1e-6 ? Vec3(tx / tLen, 0, tz / tLen) : const Vec3(1, 0, 0);

      final u = 0.5 + math.atan2(v.z, v.x) / (2.0 * math.pi);
      final vCoord = 0.5 - math.asin(v.y.clamp(-1.0, 1.0)) / math.pi;
      b.addVertex(pos, n, t, Vec2(u, vCoord));
    }

    for (final tri in faces) {
      b.addTriangleIndices(tri[0], tri[1], tri[2]);
    }

    final rVec = Vec3(radius, radius, radius);
    return b.build(Aabb(rVec * -1, rVec));
  }

  /// Generates a faceted 3D octahedron crystal centered at the origin.
  static MeshData octahedron({double radius = 0.5}) {
    if (radius <= 0) throw ArgumentError.value(radius, 'radius', 'must be > 0');

    final b = _PrimitiveMeshBuilder();
    final pTop = Vec3(0, radius, 0);
    final pBot = Vec3(0, -radius, 0);
    final p0 = Vec3(radius, 0, 0);
    final p1 = Vec3(0, 0, radius);
    final p2 = Vec3(-radius, 0, 0);
    final p3 = Vec3(0, 0, -radius);

    final triangles = [
      [pTop, p0, p1], [pTop, p1, p2], [pTop, p2, p3], [pTop, p3, p0],
      [pBot, p1, p0], [pBot, p2, p1], [pBot, p3, p2], [pBot, p0, p3],
    ];

    for (final tri in triangles) {
      final v0 = tri[0];
      final v1 = tri[1];
      final v2 = tri[2];

      final normal = (v1 - v0).cross(v2 - v0).normalized;
      var tangent = (v1 - v0).normalized;
      if (tangent.lengthSquared < 1e-6) tangent = const Vec3(1, 0, 0);

      final base = b.vertexCount;
      b.addVertex(v0, normal, tangent, const Vec2(0.5, 1.0));
      b.addVertex(v1, normal, tangent, const Vec2(0.0, 0.0));
      b.addVertex(v2, normal, tangent, const Vec2(1.0, 0.0));
      b.addTriangleIndices(base, base + 1, base + 2);
    }

    final rVec = Vec3(radius, radius, radius);
    return b.build(Aabb(rVec * -1, rVec));
  }

  /// Generates a faceted 3D regular dodecahedron with 12 pentagonal faces.
  static MeshData dodecahedron({double radius = 0.5}) {
    if (radius <= 0) throw ArgumentError.value(radius, 'radius', 'must be > 0');

    final phi = (1.0 + math.sqrt(5.0)) / 2.0;
    final invPhi = 1.0 / phi;

    final rawVertices = [
      // 0..7: (+-1, +-1, +-1)
      const Vec3(-1, -1, -1), const Vec3(-1, -1, 1),
      const Vec3(-1, 1, -1), const Vec3(-1, 1, 1),
      const Vec3(1, -1, -1), const Vec3(1, -1, 1),
      const Vec3(1, 1, -1), const Vec3(1, 1, 1),
      // 8..11: (0, +-invPhi, +-phi)
      Vec3(0, -invPhi, -phi), Vec3(0, -invPhi, phi),
      Vec3(0, invPhi, -phi), Vec3(0, invPhi, phi),
      // 12..15: (+-invPhi, +-phi, 0)
      Vec3(-invPhi, -phi, 0), Vec3(-invPhi, phi, 0),
      Vec3(invPhi, -phi, 0), Vec3(invPhi, phi, 0),
      // 16..19: (+-phi, 0, +-invPhi)
      Vec3(-phi, 0, -invPhi), Vec3(-phi, 0, invPhi),
      Vec3(phi, 0, -invPhi), Vec3(phi, 0, invPhi),
    ].map((v) => v.normalized * radius).toList();

    const pentagons = [
      [0, 8, 4, 14, 12],
      [0, 16, 2, 10, 8],
      [0, 12, 1, 17, 16],
      [1, 12, 14, 5, 9],
      [1, 9, 11, 3, 17],
      [2, 13, 15, 6, 10],
      [2, 16, 17, 3, 13],
      [3, 11, 7, 15, 13],
      [4, 8, 10, 6, 18],
      [4, 18, 19, 5, 14],
      [5, 19, 7, 11, 9],
      [6, 15, 7, 19, 18],
    ];

    final b = _PrimitiveMeshBuilder();

    for (final p in pentagons) {
      final v0 = rawVertices[p[0]];
      final v1 = rawVertices[p[1]];
      final v2 = rawVertices[p[2]];
      final normal = (v1 - v0).cross(v2 - v0).normalized;
      var tangent = (v1 - v0).normalized;
      if (tangent.lengthSquared < 1e-6) tangent = const Vec3(1, 0, 0);

      final base = b.vertexCount;
      for (var i = 0; i < 5; i++) {
        final v = rawVertices[p[i]];
        final uvAngle = i * (2.0 * math.pi / 5.0);
        final uv = Vec2(0.5 + 0.5 * math.cos(uvAngle), 0.5 + 0.5 * math.sin(uvAngle));
        b.addVertex(v, normal, tangent, uv);
      }
      b.addTriangleIndices(base, base + 1, base + 2);
      b.addTriangleIndices(base, base + 2, base + 3);
      b.addTriangleIndices(base, base + 3, base + 4);
    }

    final rVec = Vec3(radius, radius, radius);
    return b.build(Aabb(rVec * -1, rVec));
  }

  /// Generates a box with smooth chamfered/rounded edges and corners.
  /// Rounded bevels catch specular edge glints for heightened realism in PBR lighting.
  static MeshData roundedBox({
    double width = 1.0,
    double height = 1.0,
    double depth = 1.0,
    double bevelRadius = 0.08,
    int bevelSegments = 3,
  }) {
    if (width <= 0 || height <= 0 || depth <= 0) {
      throw ArgumentError('dimensions must be > 0');
    }
    if (bevelSegments < 1) throw ArgumentError('bevelSegments must be >= 1');

    final maxBevel = math.min(width, math.min(height, depth)) * 0.45;
    final r = bevelRadius.clamp(0.001, maxBevel);

    final hw = width * 0.5 - r;
    final hh = height * 0.5 - r;
    final hd = depth * 0.5 - r;

    final b = _PrimitiveMeshBuilder();

    // 6 Flat faces
    void face(Vec3 p0, Vec3 p1, Vec3 p2, Vec3 p3, Vec3 n, Vec3 t) {
      final base = b.vertexCount;
      b.addVertex(p0, n, t, const Vec2(0, 0));
      b.addVertex(p1, n, t, const Vec2(1, 0));
      b.addVertex(p2, n, t, const Vec2(1, 1));
      b.addVertex(p3, n, t, const Vec2(0, 1));
      b.addQuadIndices(base, base + 1, base + 2, base + 3);
    }

    // Front / Back
    face(Vec3(-hw, -hh, hd + r), Vec3(hw, -hh, hd + r), Vec3(hw, hh, hd + r), Vec3(-hw, hh, hd + r), const Vec3(0, 0, 1), const Vec3(1, 0, 0));
    face(Vec3(hw, -hh, -hd - r), Vec3(-hw, -hh, -hd - r), Vec3(-hw, hh, -hd - r), Vec3(hw, hh, -hd - r), const Vec3(0, 0, -1), const Vec3(-1, 0, 0));
    // Top / Bottom
    face(Vec3(-hw, hh + r, hd), Vec3(hw, hh + r, hd), Vec3(hw, hh + r, -hd), Vec3(-hw, hh + r, -hd), const Vec3(0, 1, 0), const Vec3(1, 0, 0));
    face(Vec3(-hw, -hh - r, -hd), Vec3(hw, -hh - r, -hd), Vec3(hw, -hh - r, hd), Vec3(-hw, -hh - r, hd), const Vec3(0, -1, 0), const Vec3(1, 0, 0));
    // Right / Left
    face(Vec3(hw + r, -hh, hd), Vec3(hw + r, -hh, -hd), Vec3(hw + r, hh, -hd), Vec3(hw + r, hh, hd), const Vec3(1, 0, 0), const Vec3(0, 0, -1));
    face(Vec3(-hw - r, -hh, -hd), Vec3(-hw - r, -hh, hd), Vec3(-hw - r, hh, hd), Vec3(-hw - r, hh, -hd), const Vec3(-1, 0, 0), const Vec3(0, 0, 1));

    // 12 Beveled Edges
    void edgeStrip(Vec3 aStart, Vec3 aEnd, Vec3 nA, Vec3 nB, Vec3 tangent) {
      final edgeDir = aEnd - aStart;
      final deltaN = nB - nA;
      final cross = edgeDir.cross(deltaN);
      final outward = (nA + nB).normalized;
      final reversed = cross.dot(outward) < 0;

      for (var seg = 0; seg < bevelSegments; seg++) {
        final t0 = seg / bevelSegments;
        final t1 = (seg + 1) / bevelSegments;
        final angle0 = t0 * (math.pi * 0.5);
        final angle1 = t1 * (math.pi * 0.5);

        final norm0 = (nA * math.cos(angle0) + nB * math.sin(angle0)).normalized;
        final norm1 = (nA * math.cos(angle1) + nB * math.sin(angle1)).normalized;

        final p0 = aStart + norm0 * r;
        final p1 = aEnd + norm0 * r;
        final p2 = aEnd + norm1 * r;
        final p3 = aStart + norm1 * r;

        final base = b.vertexCount;
        b.addVertex(p0, norm0, tangent, Vec2(0, t0));
        b.addVertex(p1, norm0, tangent, Vec2(1, t0));
        b.addVertex(p2, norm1, tangent, Vec2(1, t1));
        b.addVertex(p3, norm1, tangent, Vec2(0, t1));
        if (reversed) {
          b.addQuadIndices(base, base + 3, base + 2, base + 1);
        } else {
          b.addQuadIndices(base, base + 1, base + 2, base + 3);
        }
      }
    }

    // 4 X-aligned edges
    edgeStrip(Vec3(-hw, hh, hd), Vec3(hw, hh, hd), const Vec3(0, 0, 1), const Vec3(0, 1, 0), const Vec3(1, 0, 0));
    edgeStrip(Vec3(-hw, -hh, hd), Vec3(hw, -hh, hd), const Vec3(0, -1, 0), const Vec3(0, 0, 1), const Vec3(1, 0, 0));
    edgeStrip(Vec3(-hw, hh, -hd), Vec3(hw, hh, -hd), const Vec3(0, 1, 0), const Vec3(0, 0, -1), const Vec3(1, 0, 0));
    edgeStrip(Vec3(-hw, -hh, -hd), Vec3(hw, -hh, -hd), const Vec3(0, 0, -1), const Vec3(0, -1, 0), const Vec3(1, 0, 0));

    // 4 Y-aligned edges
    edgeStrip(Vec3(hw, -hh, hd), Vec3(hw, hh, hd), const Vec3(0, 0, 1), const Vec3(1, 0, 0), const Vec3(0, 1, 0));
    edgeStrip(Vec3(-hw, -hh, hd), Vec3(-hw, hh, hd), const Vec3(-1, 0, 0), const Vec3(0, 0, 1), const Vec3(0, 1, 0));
    edgeStrip(Vec3(hw, -hh, -hd), Vec3(hw, hh, -hd), const Vec3(1, 0, 0), const Vec3(0, 0, -1), const Vec3(0, 1, 0));
    edgeStrip(Vec3(-hw, -hh, -hd), Vec3(-hw, hh, -hd), const Vec3(0, 0, -1), const Vec3(-1, 0, 0), const Vec3(0, 1, 0));

    // 4 Z-aligned edges
    edgeStrip(Vec3(hw, hh, -hd), Vec3(hw, hh, hd), const Vec3(0, 1, 0), const Vec3(1, 0, 0), const Vec3(0, 0, 1));
    edgeStrip(Vec3(-hw, hh, -hd), Vec3(-hw, hh, hd), const Vec3(-1, 0, 0), const Vec3(0, 1, 0), const Vec3(0, 0, 1));
    edgeStrip(Vec3(hw, -hh, -hd), Vec3(hw, -hh, hd), const Vec3(1, 0, 0), const Vec3(0, -1, 0), const Vec3(0, 0, 1));
    edgeStrip(Vec3(-hw, -hh, -hd), Vec3(-hw, -hh, hd), const Vec3(0, -1, 0), const Vec3(-1, 0, 0), const Vec3(0, 0, 1));

    // 8 Corner spherical patches
    for (final sx in [-1.0, 1.0]) {
      for (final sy in [-1.0, 1.0]) {
        for (final sz in [-1.0, 1.0]) {
          final center = Vec3(hw * sx, hh * sy, hd * sz);
          final cornerBase = b.vertexCount;
          for (var i = 0; i <= bevelSegments; i++) {
            final theta = (i / bevelSegments) * (math.pi * 0.5);
            for (var j = 0; j <= bevelSegments; j++) {
              final phi = (j / bevelSegments) * (math.pi * 0.5);
              final nx = sx * math.sin(theta) * math.cos(phi);
              final ny = sy * math.cos(theta);
              final nz = sz * math.sin(theta) * math.sin(phi);
              final norm = Vec3(nx, ny, nz).normalized;
              final pos = center + norm * r;
              var ref = const Vec3(0, 1, 0);
              if (norm.y.abs() > 0.85) {
                ref = const Vec3(1, 0, 0);
              }
              final tangent = (ref - norm * norm.dot(ref)).normalized;
              b.addVertex(pos, norm, tangent, Vec2(i / bevelSegments, j / bevelSegments));
            }
          }
          final stride = bevelSegments + 1;
          for (var i = 0; i < bevelSegments; i++) {
            for (var j = 0; j < bevelSegments; j++) {
              final i0 = cornerBase + i * stride + j;
              final i1 = cornerBase + (i + 1) * stride + j;
              final i2 = cornerBase + (i + 1) * stride + (j + 1);
              final i3 = cornerBase + i * stride + (j + 1);
              if (sx * sy * sz < 0) {
                b.addQuadIndices(i0, i1, i2, i3);
              } else {
                b.addQuadIndices(i0, i3, i2, i1);
              }
            }
          }
        }
      }
    }

    final halfSize = Vec3(width * 0.5, height * 0.5, depth * 0.5);
    return b.build(Aabb(halfSize * -1, halfSize));
  }

  /// Generates a continuous 3D tubular conduit or cable extruded along an arbitrary [spine] curve.
  ///
  /// Employs a Parallel Transport Frame (Bishop Frame) along the spine to eliminate twists
  /// and abrupt 180-degree Frenet flips across inflection points.
  static MeshData tubePath({
    required List<Vec3> spine,
    double radius = 0.15,
    int radialSegments = 12,
    bool closed = false,
  }) {
    if (spine.length < 2) {
      throw ArgumentError('tubePath requires at least 2 spine points');
    }
    if (radius <= 0) throw ArgumentError.value(radius, 'radius', 'must be > 0');
    if (radialSegments < 3) {
      throw ArgumentError.value(radialSegments, 'radialSegments', 'must be >= 3');
    }

    final points = List<Vec3>.from(spine);
    if (closed && (points.last - points.first).length > 1e-4) {
      points.add(points.first);
    }

    final ringCount = points.length;

    // Compute tangents along spine
    final tangents = <Vec3>[];
    for (var i = 0; i < ringCount; i++) {
      Vec3 t;
      if (i == 0) {
        t = (points[1] - points[0]).normalized;
      } else if (i == ringCount - 1) {
        t = (points[ringCount - 1] - points[ringCount - 2]).normalized;
      } else {
        t = (points[i + 1] - points[i - 1]).normalized;
      }
      if (t.lengthSquared < 1e-8) t = const Vec3(0, 0, 1);
      tangents.add(t);
    }

    // Build Parallel Transport Frames
    final normals = <Vec3>[];
    final binormals = <Vec3>[];

    var upRef = const Vec3(0, 1, 0);
    if (tangents[0].y.abs() > 0.85) {
      upRef = const Vec3(1, 0, 0);
    }
    var n0 = (upRef - tangents[0] * tangents[0].dot(upRef)).normalized;
    var b0 = tangents[0].cross(n0).normalized;
    normals.add(n0);
    binormals.add(b0);

    for (var i = 0; i < ringCount - 1; i++) {
      final tCurr = tangents[i];
      final tNext = tangents[i + 1];
      final axis = tCurr.cross(tNext);
      final axisLen = axis.length;

      Vec3 nNext;
      if (axisLen > 1e-6) {
        final axisNorm = axis * (1.0 / axisLen);
        final dot = tCurr.dot(tNext).clamp(-1.0, 1.0);
        final angle = math.acos(dot);
        final rot = Quat.axisAngle(axisNorm, angle);
        nNext = rot.rotate(normals[i]).normalized;
      } else {
        nNext = normals[i];
      }
      final bNext = tNext.cross(nNext).normalized;
      normals.add(nNext);
      binormals.add(bNext);
    }

    final b = _PrimitiveMeshBuilder();
    const twoPi = math.pi * 2.0;

    var minP = Vec3(double.infinity, double.infinity, double.infinity);
    var maxP = Vec3(-double.infinity, -double.infinity, -double.infinity);

    // Generate rings
    for (var i = 0; i < ringCount; i++) {
      final center = points[i];
      final nRing = normals[i];
      final bRing = binormals[i];
      final tRing = tangents[i];
      final vCoord = i / (ringCount - 1);

      for (var j = 0; j <= radialSegments; j++) {
        final uCoord = j / radialSegments;
        final theta = uCoord * twoPi;
        final cosTh = math.cos(theta);
        final sinTh = math.sin(theta);

        final norm = (nRing * cosTh + bRing * sinTh).normalized;
        final pos = center + norm * radius;

        if (pos.x < minP.x) minP = Vec3(pos.x, minP.y, minP.z);
        if (pos.y < minP.y) minP = Vec3(minP.x, pos.y, minP.z);
        if (pos.z < minP.z) minP = Vec3(minP.x, minP.y, pos.z);

        if (pos.x > maxP.x) maxP = Vec3(pos.x, maxP.y, maxP.z);
        if (pos.y > maxP.y) maxP = Vec3(maxP.x, pos.y, maxP.z);
        if (pos.z > maxP.z) maxP = Vec3(maxP.x, maxP.y, pos.z);

        b.addVertex(pos, norm, tRing, Vec2(uCoord, vCoord));
      }
    }

    // Connect quads
    final stride = radialSegments + 1;
    for (var i = 0; i < ringCount - 1; i++) {
      final baseCurr = i * stride;
      final baseNext = (i + 1) * stride;
      for (var j = 0; j < radialSegments; j++) {
        final i0 = baseCurr + j;
        final i1 = baseNext + j;
        final i2 = baseNext + j + 1;
        final i3 = baseCurr + j + 1;
        b.addQuadIndices(i0, i1, i2, i3);
      }
    }

    return b.build(Aabb(minP, maxP));
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
