import '../api/handles.dart';
import '../api/scene.dart';
import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';

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

  /// Alias for [localTransform] for natural ergonomic code.
  Transform get transform => _localTransform;
  set transform(Transform value) => localTransform = value;

  /// Local translation vector.
  Vec3 get position => _localTransform.translation;
  set position(Vec3 value) {
    localTransform = Transform(
      translation: value,
      rotation: _localTransform.rotation,
      scale: _localTransform.scale,
    );
  }

  /// Local rotation quaternion.
  Quat get rotation => _localTransform.rotation;
  set rotation(Quat value) {
    localTransform = Transform(
      translation: _localTransform.translation,
      rotation: value,
      scale: _localTransform.scale,
    );
  }

  /// Local uniform scale.
  double get scale => _localTransform.scale;
  set scale(double value) {
    localTransform = Transform(
      translation: _localTransform.translation,
      rotation: _localTransform.rotation,
      scale: value,
    );
  }

  /// Translates node by [delta].
  void translate(Vec3 delta) {
    position = _localTransform.translation + delta;
  }

  /// Rotates node around a normalized [axis] by [radians].
  void rotateAxis(Vec3 axis, double radians) {
    final q = Quat.axisAngle(axis, radians);
    rotation = _localTransform.rotation * q;
  }

  /// Rotates node around the X axis by [radians].
  void rotateX(double radians) => rotateAxis(const Vec3(1, 0, 0), radians);

  /// Rotates node around the Y axis by [radians].
  void rotateY(double radians) => rotateAxis(const Vec3(0, 1, 0), radians);

  /// Rotates node around the Z axis by [radians].
  void rotateZ(double radians) => rotateAxis(const Vec3(0, 0, 1), radians);

  /// Uniformly scales the node by [factor].
  void scaleBy(double factor) {
    scale = _localTransform.scale * factor;
  }

  /// Orients the node so its [forward] vector faces toward [target].
  void lookAt(Vec3 target, {Vec3 forward = const Vec3(0, 0, 1)}) {
    final dir = target - _localTransform.translation;
    if (dir.lengthSquared > 1e-8) {
      rotation = Quat.fromTo(forward, dir.normalized);
    }
  }

  /// Recursively searches this subtree for a node with the given [queryName].
  SceneNode? findByName(String queryName) {
    if (name == queryName) return this;
    for (final child in _children) {
      final found = child.findByName(queryName);
      if (found != null) return found;
    }
    return null;
  }

  /// Traverses this node and all its descendants in depth-first order.
  void traverse(void Function(SceneNode node) callback) {
    callback(this);
    for (final child in _children) {
      child.traverse(callback);
    }
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

  /// Creates a child node and attaches it to this node.
  SceneNode add({
    String? name,
    Transform transform = Transform.identity,
    MeshHandle? mesh,
    MaterialHandle? material,
    int visibilityMask = -1,
    DrawMode drawMode = DrawMode.opaque,
    BlendMode blendMode = BlendMode.alpha,
    bool castsShadow = true,
    bool receivesShadow = true,
    int sortTiebreaker = 0,
    int? instanceFamilyKey,
  }) {
    final child = SceneNode(
      name: name,
      transform: transform,
      mesh: mesh,
      material: material,
      visibilityMask: visibilityMask,
      drawMode: drawMode,
      blendMode: blendMode,
      castsShadow: castsShadow,
      receivesShadow: receivesShadow,
      sortTiebreaker: sortTiebreaker,
      instanceFamilyKey: instanceFamilyKey,
    );
    addChild(child);
    return child;
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
