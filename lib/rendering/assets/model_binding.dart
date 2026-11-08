import '../api/materials.dart';
import 'material_store.dart';
import 'mesh_store.dart';
import 'model_definition.dart';

/// A validated model part with its existing retained mesh/material resources
/// resolved. This is a binding view, not a second ownership container.
final class BoundModelPart {
  final ModelPart definition;
  final UploadedMesh mesh;
  final MaterialDefinition material;
  final Map<String, MaterialDefinition> materialVariants;

  BoundModelPart({
    required this.definition,
    required this.mesh,
    required this.material,
    required Map<String, MaterialDefinition> materialVariants,
  }) : materialVariants = Map.unmodifiable(materialVariants);

  MaterialDefinition materialForVariant([String? name]) {
    if (name == null || name.isEmpty) return material;
    final selected = materialVariants[name];
    if (selected == null) {
      throw ArgumentError(
        'BoundModelPart "${definition.key}" has no material variant "$name"',
      );
    }
    return selected;
  }
}

/// A model definition bound against the existing retained mesh/material
/// stores. Rebinding after context restore creates a fresh view while all
/// logical handles and model identity remain unchanged.
final class ModelBinding {
  final ModelDefinition definition;
  final List<BoundModelPart> parts;

  ModelBinding(this.definition, Iterable<BoundModelPart> parts)
    : parts = List.unmodifiable(parts);

  BoundModelPart? part(String key) {
    for (final candidate in parts) {
      if (candidate.definition.key == key) return candidate;
    }
    return null;
  }
}

extension ModelDefinitionBinding on ModelDefinition {
  /// Resolves every referenced handle through the existing stores. A stale or
  /// released resource fails the bind before any draw can observe a proxy or
  /// partially bound model.
  ModelBinding bind({
    required MeshStore meshes,
    required MaterialStore materials,
  }) {
    validate();
    final bound = <BoundModelPart>[];
    for (final part in parts) {
      final variants = <String, MaterialDefinition>{};
      for (final variant in part.materialVariants) {
        variants[variant.key] = materials.resolve(variant.material);
      }
      bound.add(
        BoundModelPart(
          definition: part,
          mesh: meshes.resolve(part.mesh),
          material: materials.resolve(part.material),
          materialVariants: variants,
        ),
      );
    }
    return ModelBinding(this, bound);
  }
}
