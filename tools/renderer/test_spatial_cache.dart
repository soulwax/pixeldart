import 'dart:typed_data';
import 'package:pixeldart/rendering/api/handles.dart';
import 'package:pixeldart/rendering/api/materials.dart';
import 'package:pixeldart/rendering/api/mesh.dart';
import 'package:pixeldart/rendering/api/scene.dart';
import 'package:pixeldart/rendering/core/render_world_impl.dart';
import 'package:pixeldart/rendering/math/bounds.dart';
import 'package:pixeldart/rendering/math/transform.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/scene/scene_node.dart';
import 'package:pixeldart/rendering/webgl/resource_registry.dart';

void main() {
  _testRenderWorldCaching();
  _testSceneNodeDirtySync();
  print('Spatial caching and dirty sync tests passed.');
}

void _testRenderWorldCaching() {
  final meshRegistry = ResourceRegistry<MeshHandle, MeshData>(
    (slot, gen, label) => MeshHandle(slot, gen, label),
  );

  final mesh = MeshData(
    layout: VertexLayoutDescriptor.surfaceV2,
    vertices: Float32List(VertexLayoutDescriptor.surfaceV2.strideFloats * 3),
    localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
  );
  final meshHandle = meshRegistry.declare(mesh);

  final world = RenderWorldImpl(meshRegistry);
  final desc = RetainedItemDescriptor(
    mesh: meshHandle,
    material: const MaterialHandle(1, 1, 'mat'),
    transform: Transform.at(const Vec3(10, 20, 30)),
  );

  final id = world.addItem(desc);
  assert(world.liveItemCount == 1);

  // Retrieve items twice; the returned RetainedItemViews should have identical cached worldBounds
  final items1 = world.items.toList();
  final items2 = world.items.toList();
  assert(items1.length == 1 && items2.length == 1);
  assert(identical(items1.first, items2.first), 'Should yield identical cached _ItemView instance');
  assert(items1.first.worldBounds.min.x == 9.0);
  assert(items1.first.worldBounds.max.x == 11.0);

  // Update item
  final updatedDesc = RetainedItemDescriptor(
    mesh: meshHandle,
    material: const MaterialHandle(1, 1, 'mat'),
    transform: Transform.at(const Vec3(50, 0, 0)),
  );
  world.updateItem(id, updatedDesc);
  final items3 = world.items.toList();
  assert(items3.first.worldBounds.min.x == 49.0);
  assert(items3.first.worldBounds.max.x == 51.0);

  world.removeItem(id);
  assert(world.liveItemCount == 0);
  assert(world.items.isEmpty);
}

final class _TrackingWorld implements RenderWorld {
  int addCalls = 0;
  int updateCalls = 0;
  int removeCalls = 0;
  int _counter = 1;

  @override
  InstanceId addItem(RetainedItemDescriptor descriptor) {
    addCalls++;
    return InstanceId(_counter++, 1, 'inst');
  }

  @override
  void updateItem(InstanceId id, RetainedItemDescriptor descriptor) {
    updateCalls++;
  }

  @override
  void removeItem(InstanceId id) {
    removeCalls++;
  }

  @override
  RetainedItemView itemView(InstanceId id) => throw UnimplementedError();

  @override
  Iterable<RetainedItemView> get items => const [];

  @override
  void dispose() {}
}

void _testSceneNodeDirtySync() {
  final world = _TrackingWorld();
  final node = SceneNode(
    mesh: const MeshHandle(1, 1, 'm'),
    material: const MaterialHandle(1, 1, 'mat'),
  );

  // Frame 1: Initial sync (should call addItem once)
  node.syncToWorld(world);
  assert(world.addCalls == 1);
  assert(world.updateCalls == 0);

  // Frame 2: Steady state (node did NOT move, should call neither addItem nor updateItem)
  node.syncToWorld(world);
  assert(world.addCalls == 1);
  assert(world.updateCalls == 0, 'Static node should not issue redundant updateItem');

  // Frame 3: Move node
  node.translate(const Vec3(1, 0, 0));
  node.syncToWorld(world);
  assert(world.updateCalls == 1, 'Moved node should issue updateItem');

  // Frame 4: Steady state again
  node.syncToWorld(world);
  assert(world.updateCalls == 1, 'Subsequent frame with no movement should not issue updateItem');
}
