import '../api/frame.dart';
import '../api/handles.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../math/transform.dart';
import '../particles/particle_emitter.dart';
import 'scene_node.dart';

final class ParticleEmitterNode extends SceneNode {
  final ParticleEmitter emitter;

  bool simulateInWorldSpace;

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

  int get activeParticleCount => emitter.activeCount;

  int get capacity => emitter.capacity;

  @override
  Aabb? get worldBounds {
    if (emitter.activeCount > 0) {
      return emitter.computeBounds();
    }
    return super.worldBounds;
  }

  void update(double dt) {
    emitter.transform = worldTransform;
    emitter.update(dt);
  }

  int submit(RenderEncoder encoder, FrameInput frame) {
    return emitter.submit(encoder, frame);
  }

  @override
  void syncToWorld(RenderWorld world) {
    flushDetached(world);
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
