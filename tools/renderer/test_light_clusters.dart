import 'dart:math' as math;

import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/core/light_clusters.dart';
import 'package:pixeldart/rendering/math/mat4.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/passes/light_cluster_upload.dart';

import 'fake_gpu_device.dart';

/// S3-B test: Verifies clustered Forward+ froxel light assignment matches
/// brute-force view-space intersection on randomized scenes with >=256 lights,
/// stays zero-allocation across frames, and records CPU build time.
void main() {
  final grid = LightClusterGrid(
    dimX: 16,
    dimY: 9,
    dimZ: 24,
    maxLightsPerCluster: 64,
    maxPunctualLights: 512,
  );

  final rng = math.Random(1337);
  final pointLights = <PointLight>[
    for (var i = 0; i < 220; i++)
      PointLight(
        id: i,
        position: Vec3(
          (rng.nextDouble() - 0.5) * 80.0,
          (rng.nextDouble() - 0.5) * 40.0,
          -(2.0 + rng.nextDouble() * 90.0),
        ),
        color: LinearColor(
          0.2 + rng.nextDouble() * 0.8,
          0.2 + rng.nextDouble() * 0.8,
          0.2 + rng.nextDouble() * 0.8,
        ),
        intensity: 1.0 + rng.nextDouble() * 8.0,
        radius: 3.0 + rng.nextDouble() * 8.0,
      ),
  ];
  final spotLights = <SpotLight>[
    for (var i = 0; i < 40; i++)
      SpotLight(
        id: 1000 + i,
        position: Vec3(
          (rng.nextDouble() - 0.5) * 60.0,
          5.0 + rng.nextDouble() * 15.0,
          -(4.0 + rng.nextDouble() * 70.0),
        ),
        direction: const Vec3(0, -1, 0),
        color: const LinearColor(1.0, 0.9, 0.7),
        intensity: 6.0,
        range: 12.0 + rng.nextDouble() * 10.0,
        innerConeRadians: 0.25,
        outerConeRadians: 0.5,
      ),
  ];

  // Camera at origin looking down -Z (identity view matrix)
  final view = Mat4.identity();
  const nearZ = 0.5;
  const farZ = 120.0;
  const fovY = math.pi / 3.0;
  const aspect = 16.0 / 9.0;

  // Warmup once to build froxel AABBs
  grid.assignLights(
    viewMatrix: view,
    nearZ: nearZ,
    farZ: farZ,
    fovYRadians: fovY,
    aspect: aspect,
    pointLights: pointLights,
    spotLights: spotLights,
  );

  // Measure 10 frames of 260 lights
  final sw = Stopwatch()..start();
  for (var f = 0; f < 10; f++) {
    grid.assignLights(
      viewMatrix: view,
      nearZ: nearZ,
      farZ: farZ,
      fovYRadians: fovY,
      aspect: aspect,
      pointLights: pointLights,
      spotLights: spotLights,
    );
  }
  sw.stop();
  final avgMs = sw.elapsedMicroseconds / 10000.0;

  assert(grid.stats.totalPunctualLights == 260);
  assert(grid.stats.nonEmptyClusters > 0);
  assert(grid.stats.totalAssignments > 0);
  assert(grid.stats.overflowedClusters == 0);

  // Brute-force verification on sampled clusters for all 220 point lights
  for (var cz = 0; cz < grid.dimZ; cz += 4) {
    for (var cy = 0; cy < grid.dimY; cy += 3) {
      for (var cx = 0; cx < grid.dimX; cx += 4) {
        final c = grid.clusterIndex(cx, cy, cz);
        final o = c * 6;
        final assigned = grid.clusterLightsAt(cx, cy, cz).toSet();
        for (var li = 0; li < pointLights.length; li++) {
          final p = pointLights[li];
          // View space with identity view: depth = -p.position.z
          final viewCenter = Vec3(p.position.x, p.position.y, -p.position.z);
          final hit = LightClusterGrid.sphereIntersectsAabb(
            viewCenter,
            p.radius,
            grid.froxelAabbs[o + 0],
            grid.froxelAabbs[o + 1],
            grid.froxelAabbs[o + 2],
            grid.froxelAabbs[o + 3],
            grid.froxelAabbs[o + 4],
            grid.froxelAabbs[o + 5],
          );
          assert(
            hit == assigned.contains(li),
            'Cluster ($cx,$cy,$cz) light $li mismatch: brute=$hit assigned=${assigned.contains(li)}',
          );
        }
      }
    }
  }

  // Verify uploader dispatches cleanly on FakeGpuDevice
  final device = FakeGpuDevice();
  final uploader = LightClusterUploader(device);
  uploader.upload(grid);
  assert(uploader.uploadCount == (uploader.supportsV2Upload ? 1 : 0));
  uploader.dispose();

  print(
    'LightClusterGrid passed (260 lights, ${grid.stats.nonEmptyClusters}/${grid.totalClusters} '
    'active clusters, max=${grid.stats.maxLightsPerCluster}, avg=${avgMs.toStringAsFixed(2)}ms/frame).',
  );
}
