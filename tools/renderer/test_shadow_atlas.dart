import 'package:pixeldart/rendering/core/shadow_atlas.dart';

/// S3-C test: Verifies shadow atlas packing for directional CSM (4 cascades),
/// 8 shadowed spot lights, and 2 shadowed 6-face point lights — asserting zero
/// overlap, priority resolution selection, and deterministic stable packing.
void main() {
  final allocator = ShadowAtlasAllocator(
    atlasSize: 2048,
    resolutionTiers: const [256, 512, 1024, 2048],
  );

  // 1. Priority resolution selection
  assert(allocator.selectResolutionForCoverage(0.05) == 256);
  assert(allocator.selectResolutionForCoverage(0.35) == 512);
  assert(allocator.selectResolutionForCoverage(0.75) == 1024);
  assert(allocator.selectResolutionForCoverage(1.0) == 2048);
  assert(allocator.selectResolutionForCoverage(1.0, maxTier: 1024) == 1024);

  // 2. Pack 4 CSM cascades (512) + 8 spot lights (256) + 2 6-face point lights (256)
  // Total area: 4*(512^2) + (8 + 12)*(256^2) = 1,048,576 + 1,310,720 = 2,359,296 <= 2048^2 (4,194,304)
  final requests = <ShadowAtlasRequest>[
    for (var c = 0; c < 4; c++)
      ShadowAtlasRequest(
        key: 'csm_$c',
        kind: ShadowAtlasEntryKind.directionalCascade,
        desiredSize: 512,
        priority: 10.0 - c,
      ),
    for (var s = 0; s < 8; s++)
      ShadowAtlasRequest(
        key: 'spot_$s',
        kind: ShadowAtlasEntryKind.spot,
        desiredSize: 256,
        priority: 5.0 - s * 0.1,
      ),
    ...ShadowAtlasAllocator.pointLightRequests(
      lightId: 0,
      faceSize: 256,
      priority: 4.0,
    ),
    ...ShadowAtlasAllocator.pointLightRequests(
      lightId: 1,
      faceSize: 256,
      priority: 3.5,
    ),
  ];

  final tiles1 = allocator.pack(requests);
  assert(tiles1.length == 24, 'Expected 24 tiles, got ${tiles1.length}');
  assert(allocator.droppedCount == 0);

  // Verify zero overlap & valid normalized UV rects
  for (var i = 0; i < tiles1.length; i++) {
    final a = tiles1[i];
    assert(a.x >= 0 && a.y >= 0);
    assert(a.x + a.size <= allocator.atlasSize);
    assert(a.y + a.size <= allocator.atlasSize);
    assert(a.u >= 0.0 && a.u + a.w <= 1.0001);
    assert(a.v >= 0.0 && a.v + a.h <= 1.0001);
    for (var j = i + 1; j < tiles1.length; j++) {
      assert(
        !a.overlaps(tiles1[j]),
        'Overlap between ${a.key} and ${tiles1[j].key}',
      );
    }
  }

  // 3. Verify stable reassignments on repeated pack
  final tiles2 = allocator.pack(requests);
  assert(tiles2.length == tiles1.length);
  for (var i = 0; i < tiles1.length; i++) {
    assert(tiles1[i].key == tiles2[i].key);
    assert(tiles1[i].x == tiles2[i].x && tiles1[i].y == tiles2[i].y);
    assert(tiles1[i].size == tiles2[i].size);
  }

  print(
    'ShadowAtlasAllocator passed (24 tiles: 4 CSM + 8 spots + 2x6 points, 0 overlaps, stable).',
  );
}
