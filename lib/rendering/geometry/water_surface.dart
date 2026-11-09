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
  /// One pass over the wave components per vertex yields both displacement
  /// and normal from the same sin/cos pair, with no per-vertex allocation.
  /// Along a grid row each wave's phase advances by a constant step, so the
  /// pair is rotated forward by that step instead of re-evaluated; only row
  /// starts call sin/cos. Results match [GerstnerWaveEvaluator.sampleDisplacement]
  /// and [GerstnerWaveEvaluator.sampleNormal] to float precision.
  void updateWaves(double time, GerstnerWaveEvaluator waves) {
    final verts = mesh.vertices;
    final components = waves.waves;
    final count = components.length;
    // Unpack the components once per call rather than once per vertex.
    final dirX = Float64List(count), dirZ = Float64List(count);
    final k = Float64List(count), phase = Float64List(count);
    final amp = Float64List(count), qa = Float64List(count);
    final ka = Float64List(count), qka = Float64List(count);
    // Per-wave phase step between neighbouring columns, as a rotation.
    final stepCos = Float64List(count), stepSin = Float64List(count);
    final cosT = Float64List(count), sinT = Float64List(count);
    final columnStep = width / subdivisionsX;
    for (var i = 0; i < count; i++) {
      final w = components[i];
      dirX[i] = w.dirX;
      dirZ[i] = w.dirZ;
      k[i] = w.wavenumber;
      phase[i] = time * w.phaseSpeed;
      amp[i] = w.amplitude;
      qa[i] = w.steepness * w.amplitude;
      ka[i] = w.wavenumber * w.amplitude;
      qka[i] = w.steepness * w.wavenumber * w.amplitude;
      final step = w.dirX * w.wavenumber * columnStep;
      stepCos[i] = math.cos(step);
      stepSin[i] = math.sin(step);
    }

    final columns = subdivisionsX + 1;
    var floatIdx = 0;
    var column = columns;
    for (var v = 0; v < _vertexCount; v++) {
      final rx = _restX[v];
      final rz = _restZ[v];

      if (column++ == columns) {
        column = 1;
        for (var i = 0; i < count; i++) {
          final theta = (dirX[i] * rx + dirZ[i] * rz) * k[i] + phase[i];
          cosT[i] = math.cos(theta);
          sinT[i] = math.sin(theta);
        }
      }

      var dx = 0.0, dy = 0.0, dz = 0.0;
      var nx = 0.0, ny = 1.0, nz = 0.0;
      for (var i = 0; i < count; i++) {
        final c = cosT[i];
        final sn = sinT[i];
        cosT[i] = c * stepCos[i] - sn * stepSin[i];
        sinT[i] = sn * stepCos[i] + c * stepSin[i];
        dx += dirX[i] * qa[i] * c;
        dy += amp[i] * sn;
        dz += dirZ[i] * qa[i] * c;
        nx -= dirX[i] * ka[i] * c;
        ny -= qka[i] * sn;
        nz -= dirZ[i] * ka[i] * c;
      }
      final nLen = math.sqrt(nx * nx + ny * ny + nz * nz);
      if (nLen < 1e-6) {
        nx = 0;
        ny = 1;
        nz = 0;
      } else {
        nx /= nLen;
        ny /= nLen;
        nz /= nLen;
      }

      // Gram-Schmidt orthogonalized tangent
      var tx = 1.0, tz = 0.0;
      if (nx.abs() > 0.85) {
        tx = 0.0;
        tz = 1.0;
      }
      final dot = tx * nx + tz * nz;
      var orthoX = tx - nx * dot;
      var orthoY = -ny * dot;
      var orthoZ = tz - nz * dot;
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

      verts[floatIdx + 0] = rx + dx;
      verts[floatIdx + 1] = baseHeight + dy;
      verts[floatIdx + 2] = rz + dz;

      verts[floatIdx + 3] = nx;
      verts[floatIdx + 4] = ny;
      verts[floatIdx + 5] = nz;

      verts[floatIdx + 6] = orthoX;
      verts[floatIdx + 7] = orthoY;
      verts[floatIdx + 8] = orthoZ;

      // Analytical wave crest foam & ocean spray synthesis
      var crestRatio = (dy - 0.15) * 1.8;
      if (crestRatio < 0) crestRatio = 0;
      if (crestRatio > 1) crestRatio = 1;
      final foam = crestRatio * crestRatio;
      verts[floatIdx + 10] = 0.35 + 0.65 * foam;
      verts[floatIdx + 11] = 0.65 + 0.35 * foam;
      verts[floatIdx + 12] = 0.90 + 0.10 * foam;
      verts[floatIdx + 13] = 1.0;

      floatIdx += 18;
    }
  }
}
