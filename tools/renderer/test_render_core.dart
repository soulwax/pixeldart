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

  if (batches.length != 1) {
    throw StateError(
      'expected 50 same-family items to collapse to 1 batch, got ${batches.length}',
    );
  }
  if (batches.single.instanceCount != 50) {
    throw StateError(
      'expected the single batch to carry all 50 instances, got ${batches.single.instanceCount}',
    );
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
