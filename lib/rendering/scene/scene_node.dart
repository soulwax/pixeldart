import '../api/handles.dart';
import '../api/scene.dart';
import '../math/transform.dart';

/// Hierarchical scene node representing an entity, group, or visual item.
final class SceneNode {
  final String? name;
  Transform _localTransform;
  Transform _worldTransform = Transform.identity;
  bool _isDirty = true;

  SceneNode? _parent;
  final List<SceneNode> _children = [];

  MeshHandle? mesh;
  MaterialHandle? material;
  int visibilityMask;
  DrawMode drawMode;
  BlendMode blendMode;
  bool castsShadow;
  bool receivesShadow;
  int sortTiebreaker;
  int? instanceFamilyKey;

  InstanceId? _instanceId;

  SceneNode({
    this.name,
    Transform transform = Transform.identity,
    this.mesh,
    this.material,
    this.visibilityMask = -1,
    this.drawMode = DrawMode.opaque,
    this.blendMode = BlendMode.alpha,
    this.castsShadow = true,
    this.receivesShadow = true,
    this.sortTiebreaker = 0,
    this.instanceFamilyKey,
  }) : _localTransform = transform;

  /// Creates a grouping node with no visual mesh.
  factory SceneNode.group({String? name, Transform transform = Transform.identity}) =>
      SceneNode(name: name, transform: transform);

  SceneNode? get parent => _parent;
  List<SceneNode> get children => List.unmodifiable(_children);
  InstanceId? get instanceId => _instanceId;

  Transform get localTransform => _localTransform;
  set localTransform(Transform value) {
    _localTransform = value;
    _markDirty();
  }

  /// The computed world transform, resolving parent hierarchy on demand.
  Transform get worldTransform {
    if (_isDirty) {
      final p = _parent;
      _worldTransform = p != null
          ? p.worldTransform * _localTransform
          : _localTransform;
      _isDirty = false;
    }
    return _worldTransform;
  }

  void _markDirty() {
    if (_isDirty) return;
    _isDirty = true;
    for (final child in _children) {
      child._markDirty();
    }
  }

  /// Adds [child] to this node. Detaches from any prior parent first.
  void addChild(SceneNode child) {
    if (child._parent == this) return;
    child.removeFromParent();
    child._parent = this;
    child._markDirty();
    _children.add(child);
  }

  /// Removes [child] from this node.
  void removeChild(SceneNode child) {
    if (_children.remove(child)) {
      child._parent = null;
      child._markDirty();
    }
  }

  /// Detaches this node from its parent, if attached.
  void removeFromParent() {
    _parent?.removeChild(this);
  }

  /// Synchronizes this node and all descendants to the given [world].
  void syncToWorld(RenderWorld world) {
    final m = mesh;
    final mat = material;

    if (m != null && mat != null) {
      final desc = RetainedItemDescriptor(
        mesh: m,
        material: mat,
        transform: worldTransform,
        visibilityMask: visibilityMask,
        drawMode: drawMode,
        blendMode: blendMode,
        castsShadow: castsShadow,
        receivesShadow: receivesShadow,
        sortTiebreaker: sortTiebreaker,
        instanceFamilyKey: instanceFamilyKey,
      );

      final currentId = _instanceId;
      if (currentId == null) {
        _instanceId = world.addItem(desc);
      } else {
        world.updateItem(currentId, desc);
      }
    } else if (_instanceId != null) {
      world.removeItem(_instanceId!);
      _instanceId = null;
    }

    for (final child in _children) {
      child.syncToWorld(world);
    }
  }

  /// Removes this node and its descendants from [world].
  void removeFromWorld(RenderWorld world) {
    final currentId = _instanceId;
    if (currentId != null) {
      world.removeItem(currentId);
      _instanceId = null;
    }
    for (final child in _children) {
      child.removeFromWorld(world);
    }
  }
}
