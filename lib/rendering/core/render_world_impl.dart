import '../api/handles.dart';
import '../api/mesh.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../webgl/resource_registry.dart';

final class _ItemView implements RetainedItemView {
  @override
  final InstanceId id;
  @override
  final RetainedItemDescriptor descriptor;
  @override
  final Aabb worldBounds;

  const _ItemView(this.id, this.descriptor, this.worldBounds);
}

/// Concrete `RenderWorld` (§5.5). Owns persistent instances through the same
/// slot+generation discipline RV-02's `ResourceRegistry` proved for GPU
/// resources — an `InstanceId` from a removed item is rejected forever, even
/// if its slot is reused by a later `addItem`.
final class RenderWorldImpl implements RenderWorld {
  final ResourceRegistry<MeshHandle, MeshData> _meshRegistry;
  final ResourceRegistry<InstanceId, RetainedItemDescriptor> _instances =
      ResourceRegistry<InstanceId, RetainedItemDescriptor>(
        (slot, generation, label) => InstanceId(slot, generation, label),
      );

  RenderWorldImpl(this._meshRegistry);

  Aabb _worldBoundsFor(RetainedItemDescriptor descriptor) {
    descriptor.validate();
    final mesh = _meshRegistry.descriptorOf(descriptor.mesh);
    return mesh.localBounds.transformed(descriptor.transform.toMat4());
  }

  @override
  InstanceId addItem(RetainedItemDescriptor descriptor) {
    _worldBoundsFor(descriptor);
    return _instances.declare(descriptor);
  }

  @override
  void updateItem(InstanceId id, RetainedItemDescriptor descriptor) {
    _worldBoundsFor(descriptor);
    _instances.updateDescriptor(id, descriptor);
  }

  @override
  void removeItem(InstanceId id) {
    _instances.release(id);
  }

  @override
  RetainedItemView itemView(InstanceId id) {
    final descriptor = _instances.descriptorOf(id);
    return _ItemView(id, descriptor, _worldBoundsFor(descriptor));
  }

  @override
  Iterable<RetainedItemView> get items sync* {
    for (final (id, descriptor) in _instances.liveDescriptors()) {
      yield _ItemView(id, descriptor, _worldBoundsFor(descriptor));
    }
  }

  int get liveItemCount => _instances.liveCount;

  @override
  void dispose() {
    for (final (id, _) in _instances.liveDescriptors().toList()) {
      _instances.release(id);
    }
  }
}
