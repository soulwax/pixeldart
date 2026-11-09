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

CullResult cullItems({
  required Iterable<RetainedItemView> items,
  required Frustum frustum,
  required int visibilityMask,
}) {
  final visible = <RetainedItemView>[];
  var culled = 0;
  final list = items is List<RetainedItemView> ? items : items.toList();
  final candidates = list.length;

  for (var i = 0; i < candidates; i += 1) {
    final item = list[i];
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
