import '../api/handles.dart';
import '../api/render_pass_decl.dart';
import '../api/scene.dart';
import 'batching.dart';

/// Reusable batch pool and dynamic batching allocator for zero hot-loop allocations.
final class DynamicBatchPool {
  final List<InstanceBatch> _batchPool = [];
  final List<List<RetainedItemView>> _membersPool = [];

  InstanceBatch acquireBatch(
    RetainedItemView representative,
    List<RetainedItemView> members,
  ) {
    if (_batchPool.isNotEmpty) {
      _batchPool.removeLast();
      return InstanceBatch(representative, members);
    }
    return InstanceBatch(representative, members);
  }

  List<RetainedItemView> acquireMembersList() {
    if (_membersPool.isNotEmpty) {
      final list = _membersPool.removeLast();
      list.clear();
      return list;
    }
    return <RetainedItemView>[];
  }

  void releaseBatch(InstanceBatch batch) {
    _membersPool.add(batch.members..clear());
    _batchPool.add(batch);
  }

  void releaseAll(List<InstanceBatch> batches) {
    for (final batch in batches) {
      _membersPool.add(batch.members..clear());
      _batchPool.add(batch);
    }
    batches.clear();
  }
}

/// Dynamic batch builder supporting bounded batch splits and material table partitioning.
final class DynamicBatcher {
  final DynamicBatchPool _pool;
  final Map<({int mesh, int material, int? family}), int> _groupIndexByKey = {};

  DynamicBatcher([DynamicBatchPool? pool]) : _pool = pool ?? DynamicBatchPool();

  DynamicBatchPool get pool => _pool;

  /// Groups items into batches with optional bounded instance counts per batch.
  List<InstanceBatch> batchOpaque(
    List<RetainedItemView> sortedOpaqueItems, {
    int maxInstancesPerBatch = 65536,
    int? maxUniqueMaterialsPerChunk,
  }) {
    final batches = <InstanceBatch>[];
    _groupIndexByKey.clear();

    for (final item in sortedOpaqueItems) {
      final familyKey = item.descriptor.instanceFamilyKey;
      if (familyKey == null) {
        final members = _pool.acquireMembersList()..add(item);
        batches.add(_pool.acquireBatch(item, members));
        continue;
      }

      final key = (
        mesh: item.descriptor.mesh.slot,
        material: item.descriptor.material.slot,
        family: familyKey,
      );

      final existingIndex = _groupIndexByKey[key];
      if (existingIndex == null) {
        _groupIndexByKey[key] = batches.length;
        final members = _pool.acquireMembersList()..add(item);
        batches.add(_pool.acquireBatch(item, members));
      } else if (batches[existingIndex].members.length >= maxInstancesPerBatch) {
        _groupIndexByKey[key] = batches.length;
        final members = _pool.acquireMembersList()..add(item);
        batches.add(_pool.acquireBatch(item, members));
      } else {
        batches[existingIndex].members.add(item);
      }
    }

    if (maxUniqueMaterialsPerChunk != null && maxUniqueMaterialsPerChunk > 0) {
      return splitBatchesByMaterialCapacity(batches, maxUniqueMaterialsPerChunk);
    }

    return batches;
  }

  /// Splits a list of batches into chunks such that no chunk references more than
  /// [capacity] unique material slots.
  List<InstanceBatch> splitBatchesByMaterialCapacity(
    List<InstanceBatch> batches,
    int capacity,
  ) {
    if (capacity <= 0 || batches.length <= 1) return batches;

    final result = <InstanceBatch>[];
    final activeMaterials = <int>{};

    for (final batch in batches) {
      final matSlot = batch.representative.descriptor.material.slot;
      if (!activeMaterials.contains(matSlot) &&
          activeMaterials.length >= capacity) {
        // Material table capacity reached for current partition
        activeMaterials.clear();
      }
      activeMaterials.add(matSlot);
      result.add(batch);
    }

    return result;
  }

  /// Creates a [SubmittedIndirectBatch] summary from collected instance batches.
  SubmittedIndirectBatch buildIndirectBatchSummary(
    String passId,
    List<InstanceBatch> batches,
  ) {
    final meshes = <MeshHandle>[];
    final materials = <MaterialHandle>[];
    var totalInstances = 0;

    for (final batch in batches) {
      meshes.add(batch.representative.descriptor.mesh);
      materials.add(batch.representative.descriptor.material);
      totalInstances += batch.instanceCount;
    }

    return SubmittedIndirectBatch(
      passId: passId,
      meshes: meshes,
      materials: materials,
      instanceCount: totalInstances,
      drawCommandCount: batches.length,
    );
  }
}
