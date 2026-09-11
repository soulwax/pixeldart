import 'dart:typed_data';

import 'package:pixeldart/rendering/core/render_world_impl.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/scene/scene_node.dart';
import 'package:pixeldart/rendering/webgl/resource_registry.dart';

void main() {
  _testHierarchyAndTransforms();
  _testSyncToRenderWorld();
  print('SceneNode tests passed.');
}

ResourceRegistry<MeshHandle, MeshData> _meshRegistry() {
  final registry = ResourceRegistry<MeshHandle, MeshData>(
    (slot, generation, label) => MeshHandle(slot, generation, label),
  );
  registry.declare(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(14 * 3),
      localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
    ),
  );
  return registry;
}

void _testHierarchyAndTransforms() {
  final root = SceneNode.group(
    transform: Transform.at(const Vec3(10, 0, 0)),
  );
  final child = SceneNode.group(
    transform: Transform.at(const Vec3(0, 5, 0)),
  );
  final grandchild = SceneNode.group(
    transform: Transform.at(const Vec3(0, 0, 2)),
  );

  root.addChild(child);
  child.addChild(grandchild);

  assert(child.parent == root);
  assert(grandchild.parent == child);
  assert(root.children.length == 1);
  assert(child.children.length == 1);

  // Initial combined transform: 10 + 0 + 0 = 10, 0 + 5 + 0 = 5, 0 + 0 + 2 = 2
  final wt = grandchild.worldTransform;
  assert((wt.translation.x - 10.0).abs() < 1e-5);
  assert((wt.translation.y - 5.0).abs() < 1e-5);
  assert((wt.translation.z - 2.0).abs() < 1e-5);

  // Changing root transform marks descendants dirty
  root.localTransform = Transform.at(const Vec3(20, 0, 0));
  final wtUpdated = grandchild.worldTransform;
  assert((wtUpdated.translation.x - 20.0).abs() < 1e-5);
  assert((wtUpdated.translation.y - 5.0).abs() < 1e-5);
  assert((wtUpdated.translation.z - 2.0).abs() < 1e-5);

  // Reparenting
  child.removeFromParent();
  assert(child.parent == null);
  final wtDetached = grandchild.worldTransform;
  assert((wtDetached.translation.x - 0.0).abs() < 1e-5);
  assert((wtDetached.translation.y - 5.0).abs() < 1e-5);
}

void _testSyncToRenderWorld() {
  final meshes = _meshRegistry();
  final mesh = meshes.liveDescriptors().first.$1;
  final material = const MaterialHandle(0, 1, 'test-mat');
  final world = RenderWorldImpl(meshes);

  final root = SceneNode.group(transform: Transform.at(const Vec3(10, 0, 0)));
  final leaf1 = SceneNode(
    mesh: mesh,
    material: material,
    transform: Transform.at(const Vec3(1, 0, 0)),
  );
  final leaf2 = SceneNode(
    mesh: mesh,
    material: material,
    transform: Transform.at(const Vec3(2, 0, 0)),
  );

  root.addChild(leaf1);
  root.addChild(leaf2);

  // Sync creates 2 items in world (root has no mesh)
  root.syncToWorld(world);
  assert(leaf1.instanceId != null);
  assert(leaf2.instanceId != null);
  assert(world.items.length == 2);

  // Verify world positions
  final v1 = world.itemView(leaf1.instanceId!);
  assert((v1.descriptor.transform.translation.x - 11.0).abs() < 1e-5);

  // Move root and re-sync
  root.localTransform = Transform.at(const Vec3(50, 0, 0));
  root.syncToWorld(world);
  final v1Updated = world.itemView(leaf1.instanceId!);
  assert((v1Updated.descriptor.transform.translation.x - 51.0).abs() < 1e-5);

  // Remove leaf1 and sync
  leaf1.removeFromParent();
  leaf1.removeFromWorld(world);
  assert(leaf1.instanceId == null);
  assert(world.items.length == 1);

  root.removeFromWorld(world);
  assert(world.items.isEmpty);
}
