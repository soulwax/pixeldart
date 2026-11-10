import '../api/scene.dart';

final class InstanceBatch {
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
