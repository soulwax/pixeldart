import 'dart:io';
import 'dart:typed_data';

import 'package:pixeldart/rendering/api/handles.dart';
import 'package:pixeldart/rendering/api/mesh.dart';
import 'package:pixeldart/rendering/api/scene.dart';
import 'package:pixeldart/rendering/core/render_world_impl.dart';
import 'package:pixeldart/rendering/math/bounds.dart';
import 'package:pixeldart/rendering/math/transform.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/scene/instanced_mesh_node.dart';
import 'package:pixeldart/rendering/scene/scene_node.dart';
import 'package:pixeldart/rendering/webgl/resource_registry.dart';

// Scene-graph to retained-world synchronisation: detach cleanup, inherited
// visibility, dirty-tracked draw state, and geometry-local stretch.

void check(bool condition, String message) {
  if (!condition) throw StateError('scene world sync: $message');
}

late final MeshHandle _mesh;
const _matA = MaterialHandle(1, 1, 'a');
const _matB = MaterialHandle(2, 1, 'b');
late final MeshData _data;

RetainedItemView _itemOf(RenderWorldImpl world, SceneNode node) => world.itemView(node.instanceId!);

void main() {
  final registry = ResourceRegistry<MeshHandle, MeshData>(
    (slot, gen, label) => MeshHandle(slot, gen, label),
  );
  _data = MeshData(
    layout: VertexLayoutDescriptor.surfaceV2,
    vertices: Float32List(VertexLayoutDescriptor.surfaceV2.strideFloats * 3),
    localBounds: const Aabb(Vec3(-0.5, -0.5, -0.5), Vec3(0.5, 0.5, 0.5)),
  );
  _mesh = registry.declare(_data);

  _detachRemovesItems(registry);
  _reparentKeepsItems(registry);
  _inheritedVisibility(registry);
  _drawStateIsDirtyTracked(registry);
  _stretchReachesTheWorld(registry);
  _instancedNodeHonoursVisibility(registry);
  stdout.writeln('Scene world sync fixtures passed.');
}

SceneNode _leaf(SceneNode parent) => parent.add(mesh: _mesh, meshData: _data, material: _matA);

void _detachRemovesItems(ResourceRegistry<MeshHandle, MeshData> registry) {
  final world = RenderWorldImpl(registry);
  final root = SceneNode.group(name: 'root');
  final group = root.add(name: 'group');
  _leaf(group);
  _leaf(group);
  root.syncToWorld(world);
  check(world.liveItemCount == 2, 'two leaves should be live, got ${world.liveItemCount}');

  // Detaching a subtree used to leave its items drawing forever.
  root.removeChild(group);
  root.syncToWorld(world);
  check(world.liveItemCount == 0, 'detached subtree items must be removed, got ${world.liveItemCount}');

  // A deeper detach is queued on the tree root, not the immediate parent.
  final again = root.add(name: 'again');
  final inner = again.add(name: 'inner');
  _leaf(inner);
  root.syncToWorld(world);
  check(world.liveItemCount == 1, 'leaf under a nested group should be live');
  inner.removeFromParent();
  root.syncToWorld(world);
  check(world.liveItemCount == 0, 'nested detach must be cleaned up by the root');
}

void _reparentKeepsItems(ResourceRegistry<MeshHandle, MeshData> registry) {
  final world = RenderWorldImpl(registry);
  final root = SceneNode.group();
  final a = root.add(name: 'a');
  final b = root.add(name: 'b', transform: Transform.at(const Vec3(10, 0, 0)));
  final leaf = _leaf(a);
  root.syncToWorld(world);
  final id = leaf.instanceId;

  a.removeChild(leaf);
  b.addChild(leaf);
  root.syncToWorld(world);
  check(world.liveItemCount == 1, 're-parenting must not drop the item');
  check(leaf.instanceId == id, 're-parenting must keep the same retained item');
  check((_itemOf(world, leaf).worldBounds.center.x - 10).abs() < 1e-6, 're-parented item must move with its new parent');
}

void _inheritedVisibility(ResourceRegistry<MeshHandle, MeshData> registry) {
  final world = RenderWorldImpl(registry);
  final root = SceneNode.group();
  final group = root.add(name: 'group');
  final leaf = _leaf(group);
  root.syncToWorld(world);
  check(_itemOf(world, leaf).descriptor.visibilityMask == -1, 'leaf starts visible');

  // Hiding the parent hides the child without touching the child or moving.
  group.visible = false;
  root.syncToWorld(world);
  check(_itemOf(world, leaf).descriptor.visibilityMask == 0, 'hidden parent must hide its descendants');
  check(!leaf.isVisibleInHierarchy, 'leaf reports hidden through its parent');

  group.visible = true;
  root.syncToWorld(world);
  check(_itemOf(world, leaf).descriptor.visibilityMask == -1, 'showing the parent restores the child');

  // A child hidden on its own stays hidden when the parent is shown.
  leaf.visible = false;
  group.visible = false;
  group.visible = true;
  root.syncToWorld(world);
  check(_itemOf(world, leaf).descriptor.visibilityMask == 0, 'an own-hidden child stays hidden');
}

void _drawStateIsDirtyTracked(ResourceRegistry<MeshHandle, MeshData> registry) {
  final world = RenderWorldImpl(registry);
  final root = SceneNode.group();
  final leaf = _leaf(root);
  root.syncToWorld(world);

  // None of these used to reach the world unless the node also moved.
  leaf.material = _matB;
  root.syncToWorld(world);
  check(_itemOf(world, leaf).descriptor.material == _matB, 'material swap must reach the world');

  leaf.visibilityMask = 2;
  root.syncToWorld(world);
  check(_itemOf(world, leaf).descriptor.visibilityMask == 2, 'visibilityMask change must reach the world');

  leaf.castsShadow = false;
  root.syncToWorld(world);
  check(!_itemOf(world, leaf).descriptor.castsShadow, 'castsShadow change must reach the world');

  leaf.drawMode = DrawMode.blended;
  root.syncToWorld(world);
  check(_itemOf(world, leaf).descriptor.drawMode == DrawMode.blended, 'drawMode change must reach the world');
}

void _stretchReachesTheWorld(ResourceRegistry<MeshHandle, MeshData> registry) {
  final world = RenderWorldImpl(registry);
  final root = SceneNode.group(transform: const Transform(scale: 2));
  final leaf = _leaf(root)..stretch = const Vec3(4, 1, 0.5);
  root.syncToWorld(world);
  final b = _itemOf(world, leaf).worldBounds;
  // Unit cube × stretch (4, 1, 0.5) × parent scale 2.
  check((b.max.x - b.min.x - 8).abs() < 1e-5, 'stretch x must scale bounds, got ${b.max.x - b.min.x}');
  check((b.max.y - b.min.y - 2).abs() < 1e-5, 'stretch y must scale bounds');
  check((b.max.z - b.min.z - 1).abs() < 1e-5, 'stretch z must scale bounds');

  // Position/rotation/scale setters keep the stretch.
  leaf
    ..position = const Vec3(1, 0, 0)
    ..scale = 1.5;
  check(leaf.stretch == const Vec3(4, 1, 0.5), 'transform setters must preserve stretch');

  // Stretch is local: a child of a stretched node is not stretched.
  final child = _leaf(leaf);
  root.syncToWorld(world);
  final cb = _itemOf(world, child).worldBounds;
  check((cb.max.x - cb.min.x - 3).abs() < 1e-5, 'children must not inherit stretch (got ${cb.max.x - cb.min.x})');

  var threw = false;
  try {
    const Transform(stretch: Vec3(1, 0, 1)).validate();
  } catch (e) {
    threw = e is ArgumentError;
  }
  check(threw, 'zero stretch must be rejected');
}

void _instancedNodeHonoursVisibility(ResourceRegistry<MeshHandle, MeshData> registry) {
  final world = RenderWorldImpl(registry);
  final root = SceneNode.group();
  final group = root.add(name: 'group');
  final instanced = InstancedMeshNode(
    mesh: _mesh,
    material: _matA,
    meshData: _data,
    transforms: [Transform.at(const Vec3(1, 0, 0)), Transform.at(const Vec3(2, 0, 0))],
  );
  group.addChild(instanced);
  root.syncToWorld(world);
  check(world.items.every((i) => i.descriptor.visibilityMask == -1), 'instances start visible');

  group.visible = false;
  root.syncToWorld(world);
  check(world.items.every((i) => i.descriptor.visibilityMask == 0), 'instances must inherit a hidden parent');

  instanced.material = _matB;
  group.visible = true;
  root.syncToWorld(world);
  check(world.items.every((i) => i.descriptor.material == _matB), 'instanced material swap must reach the world');
}
