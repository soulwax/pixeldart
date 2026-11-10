import '../api/handles.dart';
import '../api/materials.dart';
import '../webgl/resource_registry.dart';

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

  MaterialDefinition resolveForPass(MaterialHandle handle) =>
      _registry.descriptorOf(handle);

  void release(MaterialHandle handle) => _registry.release(handle);

  int get liveCount => _registry.liveCount;
  int get createCount => _registry.createCount;
  int get deleteCount => _registry.deleteCount;
}
