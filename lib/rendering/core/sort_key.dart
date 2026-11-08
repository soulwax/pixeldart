import '../api/handles.dart';
import '../api/scene.dart';

/// Deterministic ordering for one submitted draw item (§5.5). Opaque items
/// sort by pipeline/material/mesh to maximize state-change-free batching,
/// with [instanceId] as a stable tie-breaker so equal-key items never
/// depend on submission or hash order. Blended items instead carry
/// [viewSpaceDepth] and sort back-to-front — material identity never wins
/// over depth correctness for transparency (§5.5: "never sorts transparency
/// by material at the cost of depth correctness").
final class OpaqueSortKey implements Comparable<OpaqueSortKey> {
  final PipelineHandle pipeline;
  final MaterialHandle material;
  final MeshHandle mesh;
  final int instanceId;

  const OpaqueSortKey({
    required this.pipeline,
    required this.material,
    required this.mesh,
    required this.instanceId,
  });

  @override
  int compareTo(OpaqueSortKey other) {
    var c = pipeline.slot.compareTo(other.pipeline.slot);
    if (c != 0) return c;
    c = material.slot.compareTo(other.material.slot);
    if (c != 0) return c;
    c = mesh.slot.compareTo(other.mesh.slot);
    if (c != 0) return c;
    return instanceId.compareTo(other.instanceId);
  }
}

final class BlendedSortKey implements Comparable<BlendedSortKey> {
  final double viewSpaceDepth;
  final int instanceId;

  const BlendedSortKey({
    required this.viewSpaceDepth,
    required this.instanceId,
  });

  @override
  int compareTo(BlendedSortKey other) {
    final c = other.viewSpaceDepth.compareTo(viewSpaceDepth);
    if (c != 0) return c;
    return instanceId.compareTo(other.instanceId);
  }
}

final class SortableItem<K extends Comparable<K>> {
  final K key;
  final RetainedItemView view;
  const SortableItem(this.key, this.view);
}

List<RetainedItemView> sortOpaque(List<SortableItem<OpaqueSortKey>> items) {
  final sorted = List<SortableItem<OpaqueSortKey>>.of(items)
    ..sort((a, b) => a.key.compareTo(b.key));
  return sorted.map((e) => e.view).toList(growable: false);
}

List<RetainedItemView> sortBlended(List<SortableItem<BlendedSortKey>> items) {
  final sorted = List<SortableItem<BlendedSortKey>>.of(items)
    ..sort((a, b) => a.key.compareTo(b.key));
  return sorted.map((e) => e.view).toList(growable: false);
}
