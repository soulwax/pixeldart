import '../api/handles.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../math/ray.dart';
import '../math/transform.dart';
import 'scene_node.dart';

/// A specialized scene graph node representing multiple instances of a shared mesh and material.
///
/// Automatically provisions and manages an [instanceFamilyKey] so the rendering pipeline
/// groups all instances into batched GPU instanced draws. Provides compound bounding
/// calculations, instance-specific raycast picking ([RaycastHit.instanceIndex]), and
/// zero-allocation updates during steady-state warm frames.
final class InstancedMeshNode extends SceneNode {
  static int _nextFamilyKey = 2000;

  final List<Transform> _instanceTransforms = [];
  final List<InstanceId> _instanceIds = [];
  bool _instancesDirty = true;
  Transform? _lastWorldTransform;
  Aabb? _cachedCompoundBounds;

  InstancedMeshNode({
    super.name,
    super.transform = Transform.identity,
    super.mesh,
    super.material,
    super.bounds,
    super.meshData,
    super.visibilityMask = -1,
    super.drawMode = DrawMode.opaque,
    super.blendMode = BlendMode.alpha,
    super.castsShadow = true,
    super.receivesShadow = true,
    super.sortTiebreaker = 0,
    int? instanceFamilyKey,
    Iterable<Transform>? transforms,
  }) : super(
          instanceFamilyKey: instanceFamilyKey ?? (_nextFamilyKey++),
        ) {
    if (transforms != null) {
      _instanceTransforms.addAll(transforms);
    }
  }

  /// Number of active instances.
  int get instanceCount => _instanceTransforms.length;

  /// Unmodifiable view of local instance transforms relative to this node.
  List<Transform> get instanceTransforms =>
      List.unmodifiable(_instanceTransforms);

  /// Local transform of the instance at [index].
  Transform getInstanceTransform(int index) => _instanceTransforms[index];

  /// Appends a new instance with the given local [transform].
  void addInstance(Transform transform) {
    _instanceTransforms.add(transform);
    _instancesDirty = true;
    markDirty();
  }

  /// Updates the local transform of the instance at [index].
  void setInstanceTransform(int index, Transform transform) {
    _instanceTransforms[index] = transform;
    _instancesDirty = true;
    markDirty();
  }

  /// Replaces all instance transforms with [transforms].
  void setTransforms(Iterable<Transform> transforms) {
    _instanceTransforms.clear();
    _instanceTransforms.addAll(transforms);
    _instancesDirty = true;
    markDirty();
  }

  /// Clears all instances from this node.
  void clearInstances() {
    _instanceTransforms.clear();
    _instancesDirty = true;
    markDirty();
  }

  @override
  void markDirty() {
    _cachedCompoundBounds = null;
    super.markDirty();
  }

  /// Returns the world-space axis-aligned bounding box encompassing all active instances.
  @override
  Aabb? get worldBounds {
    final b = bounds ?? meshData?.bounds;
    if (b == null || _instanceTransforms.isEmpty) return null;

    if (_cachedCompoundBounds == null) {
      final wt = worldTransform;
      var compound = b.transformed((wt * _instanceTransforms[0]).toMat4());
      for (var i = 1; i < _instanceTransforms.length; i++) {
        final ib = b.transformed((wt * _instanceTransforms[i]).toMat4());
        compound = compound.union(ib);
      }
      _cachedCompoundBounds = compound;
    }
    return _cachedCompoundBounds;
  }

  /// Raycasts against all instances of this node and child nodes.
  /// Returns the closest [RaycastHit] with [RaycastHit.instanceIndex] set to the hit instance index.
  @override
  RaycastHit? raycast(Ray ray) {
    final b = bounds ?? meshData?.bounds;
    RaycastHit? closest;

    if (b != null && _instanceTransforms.isNotEmpty) {
      final compound = worldBounds;
      if (compound == null || ray.intersectAabb(compound) != null) {
        final wt = worldTransform;
        for (var i = 0; i < _instanceTransforms.length; i++) {
          final instWorldTransform = wt * _instanceTransforms[i];
          final instBounds = b.transformed(instWorldTransform.toMat4());
          final dist = ray.intersectAabb(instBounds);
          if (dist != null) {
            if (closest == null || dist < closest.distance) {
              final hitPoint = ray.at(dist);
              final normal = (hitPoint - instBounds.center).normalized;
              closest = RaycastHit(
                node: this,
                point: hitPoint,
                normal: normal,
                distance: dist,
                instanceIndex: i,
              );
            }
          }
        }
      }
    }

    // Also test any children
    for (final child in children) {
      final hit = child.raycast(ray);
      if (hit != null && (closest == null || hit.distance < closest.distance)) {
        closest = hit;
      }
    }

    return closest;
  }

  @override
  void syncToWorld(RenderWorld world) {
    final m = mesh;
    final mat = material;

    if (m == null || mat == null || _instanceTransforms.isEmpty) {
      _cleanupRetainedItems(world);
    } else {
      final currentWt = worldTransform;
      final wtChanged = _lastWorldTransform != currentWt;

      if (_instancesDirty || wtChanged) {
        final key = instanceFamilyKey;

        // Prune excess retained items if instance count decreased
        while (_instanceIds.length > _instanceTransforms.length) {
          world.removeItem(_instanceIds.removeLast());
        }

        // Update or add retained items for each instance
        for (var i = 0; i < _instanceTransforms.length; i++) {
          final effTransform = currentWt * _instanceTransforms[i];
          final desc = RetainedItemDescriptor(
            mesh: m,
            material: mat,
            transform: effTransform,
            visibilityMask: visibilityMask,
            drawMode: drawMode,
            blendMode: blendMode,
            castsShadow: castsShadow,
            receivesShadow: receivesShadow,
            sortTiebreaker: sortTiebreaker + i,
            instanceFamilyKey: key,
          );

          if (i < _instanceIds.length) {
            world.updateItem(_instanceIds[i], desc);
          } else {
            _instanceIds.add(world.addItem(desc));
          }
        }

        _lastWorldTransform = currentWt;
        _instancesDirty = false;
      }
    }

    for (final child in children) {
      child.syncToWorld(world);
    }
  }

  void _cleanupRetainedItems(RenderWorld world) {
    for (final id in _instanceIds) {
      world.removeItem(id);
    }
    _instanceIds.clear();
  }

  @override
  void removeFromWorld(RenderWorld world) {
    _cleanupRetainedItems(world);
    _lastWorldTransform = null;
    _instancesDirty = true;
    for (final child in children) {
      child.removeFromWorld(world);
    }
  }
}
