import 'dart:math' as math;
import 'dart:typed_data';

import '../api/lights.dart';
import '../math/mat4.dart';
import '../math/vec.dart';

/// Frame statistics for a clustered Forward+ light assignment pass (`[S3-B]`).
final class LightClusterStats {
  int totalPunctualLights = 0;
  int totalAssignments = 0;
  int maxLightsPerCluster = 0;
  int nonEmptyClusters = 0;
  int overflowedClusters = 0;

  void reset() {
    totalPunctualLights = 0;
    totalAssignments = 0;
    maxLightsPerCluster = 0;
    nonEmptyClusters = 0;
    overflowedClusters = 0;
  }
}

/// Zero-allocation CPU froxel light clustering engine (`[S3-B]`).
///
/// Divides the view frustum into `dimX × dimY × dimZ` froxels (default
/// `16×9×24 = 3,456`) with logarithmic depth slicing and tests each point and
/// spot light's view-space bounding sphere against froxel AABBs. All backing
/// typed arrays are pre-allocated once and reused every frame.
final class LightClusterGrid {
  final int dimX;
  final int dimY;
  final int dimZ;
  final int maxLightsPerCluster;
  final int maxPunctualLights;

  final int totalClusters;

  /// Pre-allocated view-space froxel AABBs: 6 floats per cluster
  /// `[minX, minY, minZ, maxX, maxY, maxZ]` (where view-space Z is positive
  /// distance in front of the camera).
  final Float32List froxelAabbs;

  /// Per-cluster `(offset, count)` pairs (`totalClusters * 2` uint32s).
  final Uint32List clusterGrid;

  /// Flat light index list (`totalClusters * maxLightsPerCluster` uint16s).
  final Uint16List lightIndexList;

  /// Packed `GpuPunctualLightLayout` buffer (`maxPunctualLights * 16` floats).
  final Float32List packedLightData;

  /// Scratch per-cluster counts used during two-pass prefix-sum packing.
  final Uint16List _counts;

  /// Scratch per-light view-space bounding spheres: `[vx, vy, vz, radius]`.
  final Float32List _lightViewSpheres;

  /// Cached frustum parameters to skip rebuilding AABBs when camera projection
  /// hasn't changed.
  double _cachedNear = -1;
  double _cachedFar = -1;
  double _cachedTanHalfFov = -1;
  double _cachedAspect = -1;

  final LightClusterStats stats = LightClusterStats();

  LightClusterGrid({
    this.dimX = 16,
    this.dimY = 9,
    this.dimZ = 24,
    this.maxLightsPerCluster = 64,
    this.maxPunctualLights = 512,
  }) : totalClusters = dimX * dimY * dimZ,
       froxelAabbs = Float32List(dimX * dimY * dimZ * 6),
       clusterGrid = Uint32List(dimX * dimY * dimZ * 2),
       lightIndexList = Uint16List(dimX * dimY * dimZ * maxLightsPerCluster),
       packedLightData = Float32List(
         maxPunctualLights * GpuPunctualLightLayout.floatCount,
       ),
       _counts = Uint16List(dimX * dimY * dimZ),
       _lightViewSpheres = Float32List(maxPunctualLights * 4);

  int clusterIndex(int x, int y, int z) => (z * dimY + y) * dimX + x;

  /// Logarithmic depth slice distance for slice boundary `slice` in `0..dimZ`.
  double sliceDepth(int slice, double nearZ, double farZ) {
    if (slice <= 0) return nearZ;
    if (slice >= dimZ) return farZ;
    return nearZ * math.pow(farZ / nearZ, slice / dimZ);
  }

  /// Rebuilds view-space froxel AABBs if projection parameters changed.
  void ensureFroxelBounds({
    required double nearZ,
    required double farZ,
    required double fovYRadians,
    required double aspect,
  }) {
    final tanHalfFov = math.tan(fovYRadians * 0.5);
    if (_cachedNear == nearZ &&
        _cachedFar == farZ &&
        _cachedTanHalfFov == tanHalfFov &&
        _cachedAspect == aspect) {
      return;
    }
    _cachedNear = nearZ;
    _cachedFar = farZ;
    _cachedTanHalfFov = tanHalfFov;
    _cachedAspect = aspect;

    final invX = 1.0 / dimX;
    final invY = 1.0 / dimY;

    for (var z = 0; z < dimZ; z++) {
      final z0 = sliceDepth(z, nearZ, farZ);
      final z1 = sliceDepth(z + 1, nearZ, farZ);
      for (var y = 0; y < dimY; y++) {
        // NDC y in [-1, 1]
        final ndcY0 = (y * invY) * 2.0 - 1.0;
        final ndcY1 = ((y + 1) * invY) * 2.0 - 1.0;
        for (var x = 0; x < dimX; x++) {
          final ndcX0 = (x * invX) * 2.0 - 1.0;
          final ndcX1 = ((x + 1) * invX) * 2.0 - 1.0;

          final x00 = ndcX0 * aspect * tanHalfFov * z0;
          final x10 = ndcX1 * aspect * tanHalfFov * z0;
          final x01 = ndcX0 * aspect * tanHalfFov * z1;
          final x11 = ndcX1 * aspect * tanHalfFov * z1;

          final y00 = ndcY0 * tanHalfFov * z0;
          final y10 = ndcY1 * tanHalfFov * z0;
          final y01 = ndcY0 * tanHalfFov * z1;
          final y11 = ndcY1 * tanHalfFov * z1;

          final minX = math.min(math.min(x00, x10), math.min(x01, x11));
          final maxX = math.max(math.max(x00, x10), math.max(x01, x11));
          final minY = math.min(math.min(y00, y10), math.min(y01, y11));
          final maxY = math.max(math.max(y00, y10), math.max(y01, y11));

          final o = clusterIndex(x, y, z) * 6;
          froxelAabbs[o + 0] = minX;
          froxelAabbs[o + 1] = minY;
          froxelAabbs[o + 2] = z0;
          froxelAabbs[o + 3] = maxX;
          froxelAabbs[o + 4] = maxY;
          froxelAabbs[o + 5] = z1;
        }
      }
    }
  }

  /// Assigns [pointLights] and [spotLights] into the froxel grid with zero
  /// heap allocations.
  void assignLights({
    required Mat4 viewMatrix,
    required double nearZ,
    required double farZ,
    required double fovYRadians,
    required double aspect,
    required List<PointLight> pointLights,
    required List<SpotLight> spotLights,
  }) {
    ensureFroxelBounds(
      nearZ: nearZ,
      farZ: farZ,
      fovYRadians: fovYRadians,
      aspect: aspect,
    );
    stats.reset();

    // 1. Pack punctual lights into std140 buffer & compute view-space spheres.
    final m = viewMatrix.m;
    var lightCount = 0;

    for (var i = 0; i < pointLights.length && lightCount < maxPunctualLights; i++) {
      final l = pointLights[i];
      GpuPunctualLightLayout.writePoint(packedLightData, lightCount, l);
      final p = l.position;
      final vx = m[0] * p.x + m[4] * p.y + m[8] * p.z + m[12];
      final vy = m[1] * p.x + m[5] * p.y + m[9] * p.z + m[13];
      // Right-handed view space looks down -Z, so positive depth = -vz.
      final vz = -(m[2] * p.x + m[6] * p.y + m[10] * p.z + m[14]);
      final so = lightCount * 4;
      _lightViewSpheres[so + 0] = vx;
      _lightViewSpheres[so + 1] = vy;
      _lightViewSpheres[so + 2] = vz;
      _lightViewSpheres[so + 3] = l.radius;
      lightCount++;
    }

    for (var i = 0; i < spotLights.length && lightCount < maxPunctualLights; i++) {
      final l = spotLights[i];
      GpuPunctualLightLayout.writeSpot(packedLightData, lightCount, l);
      // Tight bounding sphere for a spot cone of length `range` and half-angle `outerConeRadians`.
      final dir = l.direction.normalized;
      final cosOuter = math.cos(l.outerConeRadians);
      final double sphereOffset;
      final double sphereRadius;
      if (l.outerConeRadians > math.pi * 0.25) {
        sphereOffset = cosOuter * l.range;
        sphereRadius = math.sin(l.outerConeRadians) * l.range;
      } else {
        sphereOffset = l.range / (2.0 * math.max(cosOuter * cosOuter, 1e-4));
        sphereRadius = sphereOffset;
      }
      final cx = l.position.x + dir.x * sphereOffset;
      final cy = l.position.y + dir.y * sphereOffset;
      final cz = l.position.z + dir.z * sphereOffset;
      final vx = m[0] * cx + m[4] * cy + m[8] * cz + m[12];
      final vy = m[1] * cx + m[5] * cy + m[9] * cz + m[13];
      final vz = -(m[2] * cx + m[6] * cy + m[10] * cz + m[14]);
      final so = lightCount * 4;
      _lightViewSpheres[so + 0] = vx;
      _lightViewSpheres[so + 1] = vy;
      _lightViewSpheres[so + 2] = vz;
      _lightViewSpheres[so + 3] = sphereRadius;
      lightCount++;
    }

    stats.totalPunctualLights = lightCount;

    // 2. Test every cluster against all packed lights (flat-offset layout:
    // cluster c owns indices [c * maxLightsPerCluster, ...]).
    var writeCursor = 0;
    for (var c = 0; c < totalClusters; c++) {
      final aabbO = c * 6;
      final minX = froxelAabbs[aabbO + 0];
      final minY = froxelAabbs[aabbO + 1];
      final minZ = froxelAabbs[aabbO + 2];
      final maxX = froxelAabbs[aabbO + 3];
      final maxY = froxelAabbs[aabbO + 4];
      final maxZ = froxelAabbs[aabbO + 5];

      final startOffset = writeCursor;
      var count = 0;
      var overflowed = false;

      for (var li = 0; li < lightCount; li++) {
        final so = li * 4;
        final sx = _lightViewSpheres[so + 0];
        final sy = _lightViewSpheres[so + 1];
        final sz = _lightViewSpheres[so + 2];
        final sr = _lightViewSpheres[so + 3];

        // Quick Z reject
        if (sz + sr < minZ || sz - sr > maxZ) continue;

        // Sphere-vs-AABB squared distance test
        final dx = sx < minX ? (minX - sx) : (sx > maxX ? (sx - maxX) : 0.0);
        final dy = sy < minY ? (minY - sy) : (sy > maxY ? (sy - maxY) : 0.0);
        final dz = sz < minZ ? (minZ - sz) : (sz > maxZ ? (sz - maxZ) : 0.0);
        if (dx * dx + dy * dy + dz * dz <= sr * sr) {
          if (count < maxLightsPerCluster && writeCursor < lightIndexList.length) {
            lightIndexList[writeCursor++] = li;
            count++;
          } else {
            overflowed = true;
          }
        }
      }

      clusterGrid[c * 2 + 0] = startOffset;
      clusterGrid[c * 2 + 1] = count;
      _counts[c] = count;
      if (count > 0) {
        stats.nonEmptyClusters++;
        stats.totalAssignments += count;
        if (count > stats.maxLightsPerCluster) {
          stats.maxLightsPerCluster = count;
        }
      }
      if (overflowed) {
        stats.overflowedClusters++;
      }
    }
  }

  /// Returns the assigned light indices for cluster `(x, y, z)` (testing /
  /// debug helper).
  List<int> clusterLightsAt(int x, int y, int z) {
    final c = clusterIndex(x, y, z);
    final offset = clusterGrid[c * 2 + 0];
    final count = clusterGrid[c * 2 + 1];
    return [for (var i = 0; i < count; i++) lightIndexList[offset + i]];
  }

  /// Evaluates the view-space bounding sphere of a point light for brute-force
  /// test verification.
  static bool sphereIntersectsAabb(
    Vec3 center,
    double radius,
    double minX,
    double minY,
    double minZ,
    double maxX,
    double maxY,
    double maxZ,
  ) {
    final dx = center.x < minX
        ? (minX - center.x)
        : (center.x > maxX ? (center.x - maxX) : 0.0);
    final dy = center.y < minY
        ? (minY - center.y)
        : (center.y > maxY ? (center.y - maxY) : 0.0);
    final dz = center.z < minZ
        ? (minZ - center.z)
        : (center.z > maxZ ? (center.z - maxZ) : 0.0);
    return dx * dx + dy * dy + dz * dz <= radius * radius;
  }
}
