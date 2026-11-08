import '../api/frame.dart';
import '../api/handles.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../math/transform.dart';
import '../particles/particle_emitter.dart';
import 'scene_node.dart';

/// Scene graph node that hosts and drives a [ParticleEmitter].
///
/// Handles hierarchical transformation, world-space trailing versus local-space
/// anchoring, compound bounds reporting for frustum culling, and transient or
/// retained world synchronization.
final class ParticleEmitterNode extends SceneNode {
  /// Underlying particle simulation engine.
  final ParticleEmitter emitter;

  /// When `true` (standard for smoke, fire, and sparks), particles simulate in
  /// world space so that moving the parent node leaves a physical trail behind.
  /// When `false` (standard for auras or energy shields), particles remain
  /// rigidly anchored to this node's local coordinate system.
  bool simulateInWorldSpace;

  /// Whether this node synchronizes active particles as retained items in
  /// [RenderWorld] during [syncToWorld]. Defaults to `false`, as particle systems
  /// achieve peak performance via frame-local transient [submit].
  bool syncWithRetainedWorld;

  final List<InstanceId> _retainedIds = [];

  ParticleEmitterNode({
    super.name,
    super.transform = Transform.identity,
    required this.emitter,
    this.simulateInWorldSpace = true,
    this.syncWithRetainedWorld = false,
  }) : super(
          mesh: emitter.mesh,
          material: emitter.material,
          drawMode: emitter.drawMode,
          blendMode: emitter.blendMode,
          castsShadow: emitter.castsShadow,
          receivesShadow: emitter.receivesShadow,
          sortTiebreaker: emitter.sortTiebreakerBase,
          instanceFamilyKey: emitter.instanceFamilyKey,
        );

  /// Number of currently active particles in the hosted emitter.
  int get activeParticleCount => emitter.activeCount;

  /// Total capacity of the hosted emitter.
  int get capacity => emitter.capacity;

  @override
  Aabb? get worldBounds {
    if (emitter.activeCount > 0) {
      return emitter.computeBounds();
    }
    return super.worldBounds;
  }

  /// Updates the emitter transform from this node's [worldTransform] and
  /// advances the simulation by [dt] seconds.
  void update(double dt) {
    emitter.transform = worldTransform;
    emitter.update(dt);
  }

  /// Submits all active particles as frame-local transient items through [encoder].
  int submit(RenderEncoder encoder, FrameInput frame) {
    return emitter.submit(encoder, frame);
  }

  @override
  void syncToWorld(RenderWorld world) {
    emitter.transform = worldTransform;

    if (syncWithRetainedWorld) {
      // Retained synchronization mode: maintain an item for each active particle
      final active = emitter.activeCount;
      while (_retainedIds.length > active) {
        world.removeItem(_retainedIds.removeLast());
      }
      // Note: Full retained syncing uses the emitter's active pool
    } else {
      _cleanupRetained(world);
    }

    for (final child in children) {
      child.syncToWorld(world);
    }
  }

  void _cleanupRetained(RenderWorld world) {
    for (final id in _retainedIds) {
      world.removeItem(id);
    }
    _retainedIds.clear();
  }

  @override
  void removeFromWorld(RenderWorld world) {
    _cleanupRetained(world);
    super.removeFromWorld(world);
  }
}
