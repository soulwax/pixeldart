import '../api/scene.dart';

/// One group of opaque items sharing an `instanceFamilyKey`, mesh, and
/// material — the unit RV-04's instanced draw path submits as a single call
/// (§5.5: "groups opaque compatible items into persistent instance
/// batches"). Items without a family key each form their own
/// single-member batch, matching individual (non-instanced) draw output —
/// this is what makes "individual and instanced output match" provable:
/// both paths run through the same grouping function, just with different
/// keys.
final class InstanceBatch {
  /// Two mat4 arrays consume eight uniform vectors per instance; 16 keeps
  /// the stream within WebGL2's minimum vertex-uniform budget alongside the
  /// world matrices and lighting uniforms.
  static const int maxInstanceCount = 16;
  final RetainedItemView representative;
  final List<RetainedItemView> members;

  const InstanceBatch(this.representative, this.members);

  int get instanceCount => members.length;
}

List<InstanceBatch> batchOpaque(List<RetainedItemView> sortedOpaqueItems) {
  final batches = <InstanceBatch>[];
  final groupIndexByKey = <String, int>{};

  for (final item in sortedOpaqueItems) {
    final familyKey = item.descriptor.instanceFamilyKey;
    if (familyKey == null) {
      batches.add(InstanceBatch(item, [item]));
      continue;
    }
    final key =
        '${item.descriptor.mesh.slot}:${item.descriptor.material.slot}:$familyKey';
    final existingIndex = groupIndexByKey[key];
    if (existingIndex == null) {
      groupIndexByKey[key] = batches.length;
      batches.add(InstanceBatch(item, [item]));
    } else if (batches[existingIndex].members.length >=
        InstanceBatch.maxInstanceCount) {
      groupIndexByKey[key] = batches.length;
      batches.add(InstanceBatch(item, [item]));
    } else {
      batches[existingIndex].members.add(item);
    }
  }

  return batches;
}
