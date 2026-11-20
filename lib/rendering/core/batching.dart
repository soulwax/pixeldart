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
  final groupIndexByKey = <({int mesh, int material, int? family}), int>{};

  for (final item in sortedOpaqueItems) {
    final familyKey = item.descriptor.instanceFamilyKey;
    if (familyKey == null) {
      batches.add(InstanceBatch(item, [item]));
      continue;
    }
    final key = (
      mesh: item.descriptor.mesh.slot,
      material: item.descriptor.material.slot,
      family: familyKey,
    );
    final existingIndex = groupIndexByKey[key];
    if (existingIndex == null) {
      groupIndexByKey[key] = batches.length;
      batches.add(InstanceBatch(item, [item]));
    } else {
      batches[existingIndex].members.add(item);
    }
  }

  return batches;
}
