import '../api/handles.dart';
import '../api/mesh.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../math/quat.dart';
import '../math/ray.dart';
import '../math/transform.dart';
import '../math/vec.dart';

/// Hierarchical scene node representing an entity, group, or visual item.
base class SceneNode {
  final String? name;
  Transform _localTransform;
  Transform _worldTransform = Transform.identity;
  bool _isDirty = true;
  bool _worldDirty = true;

  SceneNode? _parent;
  final List<SceneNode> _children = [];

  /// Subtrees detached from this tree since its last [syncToWorld]; their
  /// retained items are removed then unless they were re-attached.
  final List<SceneNode> _detached = [];

  Aabb? bounds;
  MeshData? meshData;

  MeshHandle? _mesh;
  MaterialHandle? _material;
  int _visibilityMask;
  bool _visible = true;
  DrawMode _drawMode;
  BlendMode _blendMode;
  bool _castsShadow;
  bool _receivesShadow;
  int _sortTiebreaker;
  int? _instanceFamilyKey;

  InstanceId? _instanceId;

  SceneNode({
    this.name,
    Transform transform = Transform.identity,
    this._mesh,
    this._material,
    this.bounds,
    this.meshData,
    this._visibilityMask = -1,
    this._drawMode = DrawMode.opaque,
    this._blendMode = BlendMode.alpha,
    this._castsShadow = true,
    this._receivesShadow = true,
    this._sortTiebreaker = 0,
    this._instanceFamilyKey,
  }) : _localTransform = transform {
    bounds ??= meshData?.bounds;
  }

  // Draw state. Every setter marks the node so the change reaches the
  // retained world on the next sync, without the node having to move.

  MeshHandle? get mesh => _mesh;
  set mesh(MeshHandle? value) {
    if (value == _mesh) return;
    _mesh = value;
    _worldDirty = true;
  }

  MaterialHandle? get material => _material;
  set material(MaterialHandle? value) {
    if (value == _material) return;
    _material = value;
    _worldDirty = true;
  }

  /// Per-view visibility bits for this node's own draw item. Not inherited;
  /// use [visible] to hide a whole subtree.
  int get visibilityMask => _visibilityMask;
  set visibilityMask(int value) {
    if (value == _visibilityMask) return;
    _visibilityMask = value;
    _worldDirty = true;
  }

  DrawMode get drawMode => _drawMode;
  set drawMode(DrawMode value) {
    if (value == _drawMode) return;
    _drawMode = value;
    _worldDirty = true;
  }

  BlendMode get blendMode => _blendMode;
  set blendMode(BlendMode value) {
    if (value == _blendMode) return;
    _blendMode = value;
    _worldDirty = true;
  }

  bool get castsShadow => _castsShadow;
  set castsShadow(bool value) {
    if (value == _castsShadow) return;
    _castsShadow = value;
    _worldDirty = true;
  }

  bool get receivesShadow => _receivesShadow;
  set receivesShadow(bool value) {
    if (value == _receivesShadow) return;
    _receivesShadow = value;
    _worldDirty = true;
  }

  int get sortTiebreaker => _sortTiebreaker;
  set sortTiebreaker(int value) {
    if (value == _sortTiebreaker) return;
    _sortTiebreaker = value;
    _worldDirty = true;
  }

  int? get instanceFamilyKey => _instanceFamilyKey;
  set instanceFamilyKey(int? value) {
    if (value == _instanceFamilyKey) return;
    _instanceFamilyKey = value;
    _worldDirty = true;
  }

  /// Whether this node and its whole subtree are drawn. Inherited: a hidden
  /// parent hides every descendant regardless of their own flag.
  bool get visible => _visible;
  set visible(bool value) {
    if (value == _visible) return;
    _visible = value;
    _markWorldDirtyTree();
  }

  /// True when this node and all of its ancestors are [visible].
  bool get isVisibleInHierarchy {
    for (SceneNode? n = this; n != null; n = n._parent) {
      if (!n._visible) return false;
    }
    return true;
  }

  /// The visibility bits this node's draw items should carry: its own
  /// [visibilityMask], or 0 while hidden through [visible].
  int get effectiveVisibilityMask => isVisibleInHierarchy ? _visibilityMask : 0;

  /// Whether draw state changed since this node last synced. Subclasses that
  /// manage their own retained items read this and call [markWorldSynced].
  bool get hasPendingWorldChanges => _worldDirty || _isDirty;

  /// Marks this node's retained items as up to date (for subclasses).
  void markWorldSynced() => _worldDirty = false;

  void _markWorldDirtyTree() {
    _worldDirty = true;
    for (final child in _children) {
      child._markWorldDirtyTree();
    }
  }

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
  set position(Vec3 value) => localTransform = _localTransform.copyWith(translation: value);

  /// Local rotation quaternion.
  Quat get rotation => _localTransform.rotation;
  set rotation(Quat value) => localTransform = _localTransform.copyWith(rotation: value);

  /// Local uniform scale. Prefer [visible] over scaling toward zero to hide
  /// a node.
  double get scale => _localTransform.scale;
  set scale(double value) => localTransform = _localTransform.copyWith(scale: value);

  /// Per-axis scale of this node's own geometry (see [Transform.stretch]).
  /// Not inherited by children.
  Vec3 get stretch => _localTransform.stretch;
  set stretch(Vec3 value) => localTransform = _localTransform.copyWith(stretch: value);

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

  /// Marks this node and all descendants as needing transform recalculation.
  void markDirty() {
    if (_isDirty) return;
    _isDirty = true;
    _worldDirty = true;
    for (final child in _children) {
      child.markDirty();
    }
  }

  void _markDirty() => markDirty();

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
    Aabb? bounds,
    MeshData? meshData,
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
      bounds: bounds,
      meshData: meshData,
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

  /// The world-space axis-aligned bounding box of this node, transformed from [bounds].
  Aabb? get worldBounds => bounds?.transformed(worldTransform.toMat4());

  /// Recursively tests this node and its descendants against [ray].
  /// Returns the closest [RaycastHit] or `null` if no intersection occurs.
  ///
  /// [where] skips nodes it rejects (their descendants are still tested),
  /// so a game can pick only ships, say, and never the ocean's large box.
  /// [precise] refines a bounds hit against the node's [meshData] triangles,
  /// so a ray between a mast and a sail misses. Hidden subtrees
  /// ([visible] false) are skipped either way.
  RaycastHit? raycast(Ray ray, {bool Function(SceneNode node)? where, bool precise = false}) {
    RaycastHit? closest;

    void testNode(SceneNode node) {
      if (!node._visible) return;
      final b = node.worldBounds;
      if (b != null && (where == null || where(node))) {
        var dist = ray.intersectAabb(b);
        Vec3? normal;
        if (dist != null && precise && node.meshData != null) {
          (dist, normal) = node._intersectTriangles(ray);
        }
        if (dist != null && (closest == null || dist < closest!.distance)) {
          final hitPoint = ray.at(dist);
          closest = RaycastHit(
            node: node,
            point: hitPoint,
            normal: normal ?? (hitPoint - b.center).normalized,
            distance: dist,
          );
        }
      }

      for (final child in node._children) {
        testNode(child);
      }
    }

    testNode(this);
    return closest;
  }

  /// Nearest triangle hit of [ray] against this node's mesh in world space.
  (double?, Vec3?) _intersectTriangles(Ray ray) {
    final data = meshData!;
    final layout = data.layout;
    final stride = layout.strideFloats;
    final v = data.vertices;
    final world = worldTransform;
    Vec3 vertex(int i) => world.transformPoint(Vec3(v[i * stride], v[i * stride + 1], v[i * stride + 2]));
    final indices = data.indices ?? List<int>.generate(data.vertexCount, (i) => i);
    double? best;
    Vec3? bestNormal;
    for (var i = 0; i + 2 < indices.length; i += 3) {
      final a = vertex(indices[i]), b = vertex(indices[i + 1]), c = vertex(indices[i + 2]);
      final t = ray.intersectTriangle(a, b, c);
      if (t != null && (best == null || t < best)) {
        best = t;
        bestNormal = (b - a).cross(c - a).normalized;
      }
    }
    return (best, bestNormal);
  }

  /// Removes [child] from this node.
  ///
  /// The child's retained draw items are removed at the tree root's next
  /// [syncToWorld], unless the child has been attached somewhere by then
  /// (re-parenting keeps its items alive and simply moves them).
  void removeChild(SceneNode child) {
    if (_children.remove(child)) {
      child._parent = null;
      child._markDirty();
      var root = this;
      while (root._parent != null) {
        root = root._parent!;
      }
      root._detached.add(child);
    }
  }

  /// Removes the retained items of subtrees detached from this tree that
  /// are still unattached. Called at the start of [syncToWorld].
  void flushDetached(RenderWorld world) {
    if (_detached.isEmpty) return;
    for (final node in _detached) {
      if (node._parent == null) node.removeFromWorld(world);
    }
    _detached.clear();
  }

  /// Detaches this node from its parent, if attached.
  void removeFromParent() {
    _parent?.removeChild(this);
  }

  /// Builds the retained descriptor for this node's own draw item.
  RetainedItemDescriptor describeForWorld(MeshHandle mesh, MaterialHandle material) =>
      RetainedItemDescriptor(
        mesh: mesh,
        material: material,
        transform: worldTransform,
        visibilityMask: effectiveVisibilityMask,
        drawMode: _drawMode,
        blendMode: _blendMode,
        castsShadow: _castsShadow,
        receivesShadow: _receivesShadow,
        sortTiebreaker: _sortTiebreaker,
        instanceFamilyKey: _instanceFamilyKey,
      );

  /// Synchronizes this node and all descendants to the given [world].
  void syncToWorld(RenderWorld world) {
    flushDetached(world);
    final m = _mesh;
    final mat = _material;

    if (m != null && mat != null) {
      final currentId = _instanceId;
      if (currentId == null) {
        _instanceId = world.addItem(describeForWorld(m, mat));
        _worldDirty = false;
      } else if (_worldDirty || _isDirty) {
        world.updateItem(currentId, describeForWorld(m, mat));
        _worldDirty = false;
      }
    } else if (_instanceId != null) {
      world.removeItem(_instanceId!);
      _instanceId = null;
      _worldDirty = true;
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
      _worldDirty = true;
    }
    for (final child in _children) {
      child.removeFromWorld(world);
    }
  }
}
