import '../api/handles.dart';
import '../api/materials.dart';
import '../webgl/resource_registry.dart';

/// Owns registered [MaterialDefinition]s under the same slot+generation
/// [ResourceRegistry] discipline as [MeshStore] (RV-08 rung 1: "stable
/// material keys/table"). Unlike a mesh or texture, a material has no GPU
/// object of its own to create/delete — it is pure CPU-side data a draw
/// pass resolves once per draw into tint/alpha-mode/texture-handle
/// decisions, so this store never touches a `GpuDevice` at all.
final class MaterialStore {
  final ResourceRegistry<MaterialHandle, MaterialDefinition> _registry =
      ResourceRegistry<MaterialHandle, MaterialDefinition>(
        (slot, generation, label) => MaterialHandle(slot, generation, label),
      );

  MaterialHandle register(MaterialDefinition definition, {String? debugLabel}) {
    definition.validate();
    return _registry.declare(definition, debugLabel: debugLabel);
  }

  MaterialDefinition resolve(MaterialHandle handle) =>
      _registry.descriptorOf(handle);

  void release(MaterialHandle handle) => _registry.release(handle);

  int get liveCount => _registry.liveCount;
}
