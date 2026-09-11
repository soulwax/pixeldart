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
