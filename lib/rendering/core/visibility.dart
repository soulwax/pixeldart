import '../api/scene.dart';
import '../math/frustum.dart';

final class CullStats {
  final int candidates;
  final int culled;
  final int passed;

  const CullStats({
    required this.candidates,
    required this.culled,
    required this.passed,
  });
}

final class CullResult {
  final List<RetainedItemView> visible;
  final CullStats stats;
  const CullResult(this.visible, this.stats);
}

/// Frustum-culls transformed world bounds and applies the caller-provided
/// visibility mask (§5.5). Rejects non-finite bounds rather than passing
/// them through, since a NaN/inf AABB can neither be culled correctly nor
/// safely rendered.
CullResult cullItems({
  required Iterable<RetainedItemView> items,
  required Frustum frustum,
  required int visibilityMask,
}) {
  final visible = <RetainedItemView>[];
  var candidates = 0;
  var culled = 0;

  for (final item in items) {
    candidates += 1;
    if ((item.descriptor.visibilityMask & visibilityMask) == 0) {
      culled += 1;
      continue;
    }
    if (!item.worldBounds.isFinite) {
      throw ArgumentError(
        'cullItems: non-finite world bounds for instance ${item.id}',
      );
    }
    if (frustum.testAabb(item.worldBounds) == FrustumTest.outside) {
      culled += 1;
      continue;
    }
    visible.add(item);
  }

  return CullResult(
    visible,
    CullStats(candidates: candidates, culled: culled, passed: visible.length),
  );
}
