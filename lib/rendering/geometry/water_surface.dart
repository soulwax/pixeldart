import 'dart:math' as math;
import 'dart:typed_data';

import '../api/mesh.dart';
import '../math/bounds.dart';
import '../math/vec.dart';
import '../optics/gerstner_waves.dart';

/// Deforming dynamic water surface plane driven by [GerstnerWaveEvaluator].
final class WaterSurfaceMesh {
  final double width;
  final double depth;
  final int subdivisionsX;
  final int subdivisionsZ;
  final double baseHeight;

  late final MeshData mesh;
  late final Float32List _restX;
  late final Float32List _restZ;
  late final int _vertexCount;

  WaterSurfaceMesh({
    this.width = 40.0,
    this.depth = 40.0,
    this.subdivisionsX = 30,
    this.subdivisionsZ = 30,
    this.baseHeight = 0.0,
  }) {
    if (width <= 0) throw ArgumentError.value(width, 'width', 'must be > 0');
    if (depth <= 0) throw ArgumentError.value(depth, 'depth', 'must be > 0');
    if (subdivisionsX < 2) throw ArgumentError.value(subdivisionsX, 'subdivisionsX', 'must be >= 2');
    if (subdivisionsZ < 2) throw ArgumentError.value(subdivisionsZ, 'subdivisionsZ', 'must be >= 2');

    _buildInitialMesh();
  }

  int get vertexCount => _vertexCount;

  void _buildInitialMesh() {
    _vertexCount = (subdivisionsX + 1) * (subdivisionsZ + 1);
    _restX = Float32List(_vertexCount);
    _restZ = Float32List(_vertexCount);

    final vertexFloats = Float32List(_vertexCount * 18);
    final indices = Uint16List(subdivisionsX * subdivisionsZ * 6);

    final dx = width / subdivisionsX;
    final dz = depth / subdivisionsZ;
    final halfW = width * 0.5;
    final halfD = depth * 0.5;

    var vIdx = 0;
    var floatIdx = 0;

    for (var j = 0; j <= subdivisionsZ; j++) {
      final z = -halfD + j * dz;
      final vCoord = j / subdivisionsZ;

      for (var i = 0; i <= subdivisionsX; i++) {
        final x = -halfW + i * dx;
        final uCoord = i / subdivisionsX;

        _restX[vIdx] = x;
        _restZ[vIdx] = z;
        vIdx++;

        // surface-v2 layout: pos(3), norm(3), tan(3), handedness(1), color(4), alpha(1), uv0(2), effect(1)
        vertexFloats[floatIdx + 0] = x;
        vertexFloats[floatIdx + 1] = baseHeight;
        vertexFloats[floatIdx + 2] = z;

        vertexFloats[floatIdx + 3] = 0.0;
        vertexFloats[floatIdx + 4] = 1.0;
        vertexFloats[floatIdx + 5] = 0.0;

        vertexFloats[floatIdx + 6] = 1.0;
        vertexFloats[floatIdx + 7] = 0.0;
        vertexFloats[floatIdx + 8] = 0.0;
        vertexFloats[floatIdx + 9] = 1.0;

        vertexFloats[floatIdx + 10] = 1.0;
        vertexFloats[floatIdx + 11] = 1.0;
        vertexFloats[floatIdx + 12] = 1.0;
        vertexFloats[floatIdx + 13] = 1.0;

        vertexFloats[floatIdx + 14] = 0.0;

        vertexFloats[floatIdx + 15] = uCoord;
        vertexFloats[floatIdx + 16] = vCoord;

        vertexFloats[floatIdx + 17] = 0.0;

        floatIdx += 18;
      }
    }

    var iIdx = 0;
    final stride = subdivisionsX + 1;
    for (var j = 0; j < subdivisionsZ; j++) {
      final baseCurr = j * stride;
      final baseNext = (j + 1) * stride;

      for (var i = 0; i < subdivisionsX; i++) {
        final i0 = baseCurr + i;
        final i1 = baseNext + i;
        final i2 = baseNext + i + 1;
        final i3 = baseCurr + i + 1;

        indices[iIdx++] = i0;
        indices[iIdx++] = i1;
        indices[iIdx++] = i2;
        indices[iIdx++] = i0;
        indices[iIdx++] = i2;
        indices[iIdx++] = i3;
      }
    }

    mesh = MeshData(
      layout: VertexLayoutDescriptor.surfaceV2,
      vertices: vertexFloats,
      indices: indices,
      localBounds: Aabb(
        Vec3(-halfW - 2.0, baseHeight - 4.0, -halfD - 2.0),
        Vec3(halfW + 2.0, baseHeight + 4.0, halfD + 2.0),
      ),
    );
    mesh.validate();
  }

  /// Updates vertex buffer in-place with trochoidal wave displacement and analytical normals.
  ///
  /// Zero heap allocations during steady-state frame calls.
  void updateWaves(double time, GerstnerWaveEvaluator waves) {
    final verts = mesh.vertices;
    var floatIdx = 0;

    var minY = baseHeight;
    var maxY = baseHeight;

    for (var k = 0; k < _vertexCount; k++) {
      final rx = _restX[k];
      final rz = _restZ[k];

      final disp = waves.sampleDisplacement(rx, rz, time);
      final px = rx + disp.x;
      final py = baseHeight + disp.y;
      final pz = rz + disp.z;

      if (py < minY) minY = py;
      if (py > maxY) maxY = py;

      final norm = waves.sampleNormal(rx, rz, time);

      // Gram-Schmidt orthogonalized tangent
      var tx = 1.0;
      var ty = 0.0;
      var tz = 0.0;
      if (norm.x.abs() > 0.85) {
        tx = 0.0;
        tz = 1.0;
      }
      final dot = tx * norm.x + ty * norm.y + tz * norm.z;
      var orthoX = tx - norm.x * dot;
      var orthoY = ty - norm.y * dot;
      var orthoZ = tz - norm.z * dot;
      final len = math.sqrt(orthoX * orthoX + orthoY * orthoY + orthoZ * orthoZ);
      if (len > 1e-6) {
        orthoX /= len;
        orthoY /= len;
        orthoZ /= len;
      } else {
        orthoX = 1.0;
        orthoY = 0.0;
        orthoZ = 0.0;
      }

      verts[floatIdx + 0] = px;
      verts[floatIdx + 1] = py;
      verts[floatIdx + 2] = pz;

      verts[floatIdx + 3] = norm.x;
      verts[floatIdx + 4] = norm.y;
      verts[floatIdx + 5] = norm.z;

      verts[floatIdx + 6] = orthoX;
      verts[floatIdx + 7] = orthoY;
      verts[floatIdx + 8] = orthoZ;

      floatIdx += 18;
    }
  }
}
