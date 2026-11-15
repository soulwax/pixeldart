import 'dart:typed_data';

import 'package:pixeldart/rendering/core/batching.dart';
import 'package:pixeldart/rendering/core/render_world_impl.dart';
import 'package:pixeldart/rendering/core/sort_key.dart';
import 'package:pixeldart/rendering/core/visibility.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/resource_registry.dart';

void main() {
  _fiftyInstancesOneDraw();
  _individualAndInstancedOutputMatch();
  _cullingSortingAbIdentical();
  _transformedAndInstancedBoundsCorrect();
  _frameArenaAllocationAndReset();
  _dynamicBatcherAndMaterialTableSplits();
  _debugViewsAndLightSelectionDiagnostics();
  print('Renderer core (world/batch/cull) fixtures passed.');
}

ResourceRegistry<MeshHandle, MeshData> _meshRegistryWithUnitCube() {
  final registry = ResourceRegistry<MeshHandle, MeshData>(
    (slot, generation, label) => MeshHandle(slot, generation, label),
  );
  registry.declare(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(
        VertexLayoutDescriptor.compatibility14.strideFloats * 3,
      ),
      localBounds: const Aabb(Vec3(-0.5, -0.5, -0.5), Vec3(0.5, 0.5, 0.5)),
    ),
  );
  return registry;
}

MaterialHandle _fakeMaterial() => const MaterialHandle(0, 1, 'fake');
PipelineHandle _fakePipeline() => const PipelineHandle(0, 1, 'fake');

void _fiftyInstancesOneDraw() {
  final meshes = _meshRegistryWithUnitCube();
  final mesh = meshes.liveDescriptors().first.$1;
  final world = RenderWorldImpl(meshes);

  for (var i = 0; i < 50; i++) {
    world.addItem(
      RetainedItemDescriptor(
        mesh: mesh,
        material: _fakeMaterial(),
        transform: Transform.at(Vec3(i.toDouble(), 0, 0)),
        instanceFamilyKey: 1,
      ),
    );
  }

  final items = List.of(world.items);
  if (items.length != 50) {
    throw StateError('expected 50 live items, got ${items.length}');
  }

  final keyed = items
      .map(
        (v) => SortableItem(
          OpaqueSortKey(
            pipeline: _fakePipeline(),
            material: v.descriptor.material,
            mesh: v.descriptor.mesh,
            instanceId: v.id.slot,
          ),
          v,
        ),
      )
      .toList();
  final sorted = sortOpaque(keyed);
  final batches = batchOpaque(sorted);

  if (batches.length != 4) {
    throw StateError(
      'expected 50 same-family items to split into 4 bounded batches, got ${batches.length}',
    );
  }
  if (batches.map((batch) => batch.instanceCount).join(',') != '16,16,16,2') {
    throw StateError('instance batch split did not preserve all transforms');
  }
}

void _individualAndInstancedOutputMatch() {
  final meshes = _meshRegistryWithUnitCube();
  final mesh = meshes.liveDescriptors().first.$1;
  final world = RenderWorldImpl(meshes);

  final positions = List.generate(10, (i) => Vec3(i.toDouble(), 1, 2));
  for (final p in positions) {
    world.addItem(
      RetainedItemDescriptor(
        mesh: mesh,
        material: _fakeMaterial(),
        transform: Transform.at(p),
      ),
    );
  }
  final individualBatches = batchOpaque(List.of(world.items));
  final individualPositions = individualBatches
      .expand((b) => b.members)
      .map((v) => v.descriptor.transform.translation)
      .toSet();

  final instancedWorld = RenderWorldImpl(meshes);
  for (final p in positions) {
    instancedWorld.addItem(
      RetainedItemDescriptor(
        mesh: mesh,
        material: _fakeMaterial(),
        transform: Transform.at(p),
        instanceFamilyKey: 7,
      ),
    );
  }
  final instancedBatches = batchOpaque(List.of(instancedWorld.items));
  final instancedPositions = instancedBatches
      .expand((b) => b.members)
      .map((v) => v.descriptor.transform.translation)
      .toSet();

  if (individualBatches.length != 10) {
    throw StateError(
      'expected 10 individual batches, got ${individualBatches.length}',
    );
  }
  if (instancedBatches.length != 1) {
    throw StateError(
      'expected 1 instanced batch, got ${instancedBatches.length}',
    );
  }
  if (!_setsEqualByValue(individualPositions, instancedPositions)) {
    throw StateError(
      'individual and instanced paths must submit the same world positions',
    );
  }
}

bool _setsEqualByValue(Set<Vec3> a, Set<Vec3> b) {
  if (a.length != b.length) return false;
  for (final v in a) {
    if (!b.any((o) => o == v)) return false;
  }
  return true;
}

void _cullingSortingAbIdentical() {
  final meshes = _meshRegistryWithUnitCube();
  final mesh = meshes.liveDescriptors().first.$1;
  final world = RenderWorldImpl(meshes);

  for (var i = 0; i < 20; i++) {
    world.addItem(
      RetainedItemDescriptor(
        mesh: mesh,
        material: _fakeMaterial(),
        transform: Transform.at(Vec3(0, 0, -i.toDouble() * 2)),
      ),
    );
  }

  final camera = CameraView(
    view: Mat4.lookAt(
      eye: Vec3.zero,
      forward: const Vec3(0, 0, -1),
      up: const Vec3(0, 1, 0),
    ),
    projection: Mat4.perspective(
      fovYRadians: 1.2,
      aspect: 1,
      near: 0.5,
      far: 30,
    ),
    viewProjection:
        Mat4.perspective(fovYRadians: 1.2, aspect: 1, near: 0.5, far: 30) *
        Mat4.lookAt(
          eye: Vec3.zero,
          forward: const Vec3(0, 0, -1),
          up: const Vec3(0, 1, 0),
        ),
    eye: Vec3.zero,
    forward: const Vec3(0, 0, -1),
    near: 0.5,
    far: 30,
    aspect: 1,
  );
  final frustum = camera.buildFrustum();

  final runA = cullItems(
    items: world.items,
    frustum: frustum,
    visibilityMask: -1,
  );
  final runB = cullItems(
    items: world.items,
    frustum: frustum,
    visibilityMask: -1,
  );

  if (runA.stats.passed == 0 || runA.stats.culled == 0) {
    throw StateError(
      'fixture expected a mix of visible and culled instances to be meaningful',
    );
  }
  final idsA = runA.visible.map((v) => v.id).toList();
  final idsB = runB.visible.map((v) => v.id).toList();
  if (idsA.length != idsB.length ||
      !idsA.asMap().entries.every((e) => e.value == idsB[e.key])) {
    throw StateError(
      'two culling runs over identical input must produce an identical ordered result',
    );
  }

  final keyedA = runA.visible
      .map(
        (v) => SortableItem(
          OpaqueSortKey(
            pipeline: _fakePipeline(),
            material: v.descriptor.material,
            mesh: v.descriptor.mesh,
            instanceId: v.id.slot,
          ),
          v,
        ),
      )
      .toList();
  final keyedB = runB.visible
      .map(
        (v) => SortableItem(
          OpaqueSortKey(
            pipeline: _fakePipeline(),
            material: v.descriptor.material,
            mesh: v.descriptor.mesh,
            instanceId: v.id.slot,
          ),
          v,
        ),
      )
      .toList()
      .reversed
      .toList();
  final sortedA = sortOpaque(keyedA).map((v) => v.id).toList();
  final sortedB = sortOpaque(keyedB).map((v) => v.id).toList();
  if (sortedA.length != sortedB.length ||
      !sortedA.asMap().entries.every((e) => e.value == sortedB[e.key])) {
    throw StateError(
      'sorting the same visible set fed in reverse submission order must still '
      'produce an identical result — the sort must be a total order, not stable-on-input-order',
    );
  }
}

void _transformedAndInstancedBoundsCorrect() {
  final meshes = _meshRegistryWithUnitCube();
  final mesh = meshes.liveDescriptors().first.$1;
  final world = RenderWorldImpl(meshes);

  final id = world.addItem(
    RetainedItemDescriptor(
      mesh: mesh,
      material: _fakeMaterial(),
      transform: Transform(translation: const Vec3(10, 0, 0), scale: 2),
    ),
  );
  final view = world.itemView(id);
  const expectedMin = Vec3(9, -1, -1);
  const expectedMax = Vec3(11, 1, 1);
  _nearVec(view.worldBounds.min, expectedMin);
  _nearVec(view.worldBounds.max, expectedMax);

  world.updateItem(
    id,
    RetainedItemDescriptor(
      mesh: mesh,
      material: _fakeMaterial(),
      transform: Transform.at(const Vec3(0, 5, 0)),
    ),
  );
  final updated = world.itemView(id);
  if (updated.id != id) {
    throw StateError(
      'updateItem must preserve the InstanceId, not mint a new one',
    );
  }
  _nearVec(updated.worldBounds.center, const Vec3(0, 5, 0));
}

void _nearVec(Vec3 actual, Vec3 expected, {double epsilon = 1e-5}) {
  if ((actual.x - expected.x).abs() > epsilon ||
      (actual.y - expected.y).abs() > epsilon ||
      (actual.z - expected.z).abs() > epsilon) {
    throw StateError('Expected $expected, got $actual.');
  }
}

void _frameArenaAllocationAndReset() {
  final arena = FrameArena(initialFloats: 64, initialInts: 32);
  final floatsA = arena.requestFloats(16);
  if (floatsA.length != 16) throw StateError('expected 16 floats');
  floatsA[0] = 42.0;

  final intsA = arena.requestInts(8);
  if (intsA.length != 8) throw StateError('expected 8 ints');
  intsA[0] = 7;

  if (arena.allocatedFloats != 16 || arena.allocatedInts != 8) {
    throw StateError('arena allocation cursors incorrect');
  }

  // Growth beyond initial capacity
  final largeFloats = arena.requestFloats(128);
  if (largeFloats.length != 128) throw StateError('expected 128 floats');
  if (arena.floatCapacity < 144) throw StateError('arena did not grow capacity');

  // List pooling
  final borrowedList = arena.requestList<int>();
  borrowedList.addAll([1, 2, 3]);
  arena.releaseList(borrowedList);
  final recycledList = arena.requestList<int>();
  if (recycledList.isNotEmpty) throw StateError('recycled list was not cleared');

  // Reset
  arena.reset();
  if (arena.allocatedFloats != 0 || arena.allocatedInts != 0) {
    throw StateError('arena reset did not reset cursors');
  }
}

void _dynamicBatcherAndMaterialTableSplits() {
  final batcher = DynamicBatcher();
  final meshes = _meshRegistryWithUnitCube();
  final mesh = meshes.liveDescriptors().first.$1;

  final items = <RetainedItemView>[];
  for (var m = 0; m < 5; m++) {
    final mat = MaterialHandle(m, 1, 'mat$m');
    for (var i = 0; i < 4; i++) {
      items.add(
        _FakeRetainedItemView(
          InstanceId(m * 10 + i, 0, 'item'),
          RetainedItemDescriptor(
            mesh: mesh,
            material: mat,
            instanceFamilyKey: 1,
          ),
          const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
        ),
      );
    }
  }

  // Batching with material table capacity limit of 2 unique materials per chunk
  final batches = batcher.batchOpaque(items, maxUniqueMaterialsPerChunk: 2);
  if (batches.isEmpty) throw StateError('batches should not be empty');

  // MaterialTable deduplication
  final matTable = MaterialTable(capacity: 4);
  const defA = MaterialDefinition(key: 'shared', roughness: 0.5, metallic: 0.1);
  const defB = MaterialDefinition(key: 'shared', roughness: 0.5, metallic: 0.1);
  const defC = MaterialDefinition(key: 'unique', roughness: 0.8, metallic: 0.0);

  final slotA = matTable.allocateOrDeduplicate(defA);
  final slotB = matTable.allocateOrDeduplicate(defB);
  final slotC = matTable.allocateOrDeduplicate(defC);

  if (slotA != slotB) {
    throw StateError('identical material definitions must deduplicate to same slot');
  }
  if (slotA == slotC) {
    throw StateError('different material definitions must allocate different slots');
  }

  // Dirty tracking
  if (!matTable.hasDirty || !matTable.isDirty(slotA) || !matTable.isDirty(slotC)) {
    throw StateError('newly allocated slots must be marked dirty');
  }
  matTable.clearDirty();
  if (matTable.hasDirty) throw StateError('clearDirty must clear dirty slots');

  matTable.markDirty(slotA);
  if (!matTable.isDirty(slotA)) throw StateError('markDirty failed');

  // Batch splitting by capacity
  final chunks = matTable.splitBatches(batches, maxCapacity: 2);
  if (chunks.length < 2) {
    throw StateError('expected batches spanning 5 materials to split into multiple chunks');
  }
}

void _debugViewsAndLightSelectionDiagnostics() {
  // DebugViewMode
  if (DebugViewMode.fromString('albedo') != DebugViewMode.albedo ||
      DebugViewMode.fromString('normals') != DebugViewMode.normals ||
      DebugViewMode.fromString('normal') != DebugViewMode.normals ||
      DebugViewMode.fromString('roughness') != DebugViewMode.roughness ||
      DebugViewMode.fromString('light-heatmap') != DebugViewMode.lightHeatmap ||
      DebugViewMode.fromString('overdraw') != DebugViewMode.overdraw) {
    throw StateError('DebugViewMode.fromString parsing failed');
  }

  // LightSelectionStats
  const stats = LightSelectionStats(
    totalLights: 10,
    activeLights: 8,
    droppedLights: 2,
  );
  if (stats.totalLights != 10 || stats.activeLights != 8 || stats.droppedLights != 2) {
    throw StateError('LightSelectionStats values incorrect');
  }
}

final class _FakeRetainedItemView implements RetainedItemView {
  @override
  final InstanceId id;
  @override
  final RetainedItemDescriptor descriptor;
  @override
  final Aabb worldBounds;

  const _FakeRetainedItemView(this.id, this.descriptor, this.worldBounds);
}
