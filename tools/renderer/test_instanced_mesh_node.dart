import 'dart:typed_data';
import 'package:pixeldart/rendering/api/handles.dart';
import 'package:pixeldart/rendering/api/mesh.dart';
import 'package:pixeldart/rendering/core/render_world_impl.dart';
import 'package:pixeldart/rendering/math/bounds.dart';
import 'package:pixeldart/rendering/math/ray.dart';
import 'package:pixeldart/rendering/math/transform.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/scene/instanced_mesh_node.dart';
import 'package:pixeldart/rendering/webgl/resource_registry.dart';

void main() {
  _testInstancedMeshNodeBounds();
  _testInstancedMeshNodeRaycast();
  _testInstancedMeshNodeWorldSync();
  print('InstancedMeshNode tests passed.');
}

void _testInstancedMeshNodeBounds() {
  final node = InstancedMeshNode(
    name: 'asteroids',
    bounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
    transforms: [
      Transform.at(const Vec3(-5, 0, 0)),
      Transform.at(const Vec3(5, 0, 0)),
    ],
  );

  assert(node.instanceCount == 2);
  final b = node.worldBounds;
  assert(b != null, 'worldBounds should not be null');
  assert((b!.min.x - (-6.0)).abs() < 1e-4, 'min x should be -6');
  assert((b!.max.x - 6.0).abs() < 1e-4, 'max x should be 6');

  // Add a third instance further out
  node.addInstance(Transform.at(const Vec3(10, 0, 0)));
  assert(node.instanceCount == 3);
  final b2 = node.worldBounds;
  assert(b2 != null);
  assert((b2!.max.x - 11.0).abs() < 1e-4, 'max x should now be 11');

  // Move root node
  node.position = const Vec3(0, 10, 0);
  final b3 = node.worldBounds;
  assert(b3 != null);
  assert((b3!.min.y - 9.0).abs() < 1e-4, 'min y should be 9');
  assert((b3!.max.y - 11.0).abs() < 1e-4, 'max y should be 11');
}

void _testInstancedMeshNodeRaycast() {
  final node = InstancedMeshNode(
    name: 'targets',
    bounds: const Aabb(Vec3(-0.5, -0.5, -0.5), Vec3(0.5, 0.5, 0.5)),
    transforms: [
      Transform.at(const Vec3(-3, 0, -5)),
      Transform.at(const Vec3(3, 0, -5)),
    ],
  );

  // Ray directed at instance 0
  final ray0 = Ray(
    origin: const Vec3(-3, 0, 0),
    direction: const Vec3(0, 0, -1),
  );
  final hit0 = node.raycast(ray0);
  assert(hit0 != null, 'Should hit instance 0');
  assert(hit0!.instanceIndex == 0, 'Hit should identify instance 0');
  assert((hit0!.distance - 4.5).abs() < 1e-4, 'Distance should be 4.5');

  // Ray directed at instance 1
  final ray1 = Ray(
    origin: const Vec3(3, 0, 0),
    direction: const Vec3(0, 0, -1),
  );
  final hit1 = node.raycast(ray1);
  assert(hit1 != null, 'Should hit instance 1');
  assert(hit1!.instanceIndex == 1, 'Hit should identify instance 1');

  // Ray shooting away
  final rayMiss = Ray(
    origin: const Vec3(0, 5, 0),
    direction: const Vec3(0, 1, 0),
  );
  final hitMiss = node.raycast(rayMiss);
  assert(hitMiss == null, 'Should miss completely');
}

void _testInstancedMeshNodeWorldSync() {
  final meshRegistry = ResourceRegistry<MeshHandle, MeshData>(
    (slot, gen, label) => MeshHandle(slot, gen, label),
  );
  final meshData = MeshData(
    layout: VertexLayoutDescriptor.surfaceV2,
    vertices: Float32List(VertexLayoutDescriptor.surfaceV2.strideFloats * 3),
    localBounds: const Aabb(Vec3(-0.5, -0.5, -0.5), Vec3(0.5, 0.5, 0.5)),
  );
  final meshHandle = meshRegistry.declare(meshData);
  final matHandle = const MaterialHandle(1, 1, 'mat');

  final world = RenderWorldImpl(meshRegistry);
  final node = InstancedMeshNode(
    mesh: meshHandle,
    material: matHandle,
    transforms: [
      Transform.at(const Vec3(1, 0, 0)),
      Transform.at(const Vec3(2, 0, 0)),
      Transform.at(const Vec3(3, 0, 0)),
    ],
  );

  node.syncToWorld(world);
  assert(world.liveItemCount == 3, 'Should have 3 retained items in world');

  final items = world.items.toList();
  assert(items.length == 3);
  final familyKey = items[0].descriptor.instanceFamilyKey;
  assert(familyKey != null, 'Should have non-null instanceFamilyKey');
  assert(items[1].descriptor.instanceFamilyKey == familyKey);
  assert(items[2].descriptor.instanceFamilyKey == familyKey);

  // Update an instance transform and re-sync
  node.setInstanceTransform(1, Transform.at(const Vec3(20, 0, 0)));
  node.syncToWorld(world);
  assert(world.liveItemCount == 3);
  final itemsUpdated = world.items.toList();
  assert((itemsUpdated[1].worldBounds.center.x - 20.0).abs() < 1e-4);

  // Remove node from world
  node.removeFromWorld(world);
  assert(world.liveItemCount == 0, 'Should remove all instances from world');
}
