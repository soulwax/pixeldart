import '../api/handles.dart';
import '../math/bounds.dart';
import '../math/transform.dart';

/// One authored geometry range. Ranges are ordered from near to far and use
/// half-open distance semantics: [minDistance, maxDistance).
final class ModelLod {
  final String key;
  final double minDistance;
  final double maxDistance;

  const ModelLod({
    required this.key,
    required this.minDistance,
    required this.maxDistance,
  });

  void validate({required int index}) {
    if (key.isEmpty) {
      throw ArgumentError('ModelLod[$index].key must not be empty');
    }
    if (!minDistance.isFinite ||
        !maxDistance.isFinite ||
        minDistance < 0 ||
        maxDistance <= minDistance) {
      throw ArgumentError(
        'ModelLod[$index] must have finite 0 <= minDistance < maxDistance',
      );
    }
  }
}

/// A named material replacement for a part. The handles remain shared GPU
/// resources; the model definition owns only the stable slot/variant mapping.
final class ModelMaterialVariant {
  final String key;
  final MaterialHandle material;

  const ModelMaterialVariant({required this.key, required this.material});
}

final class ModelPart {
  final String key;
  final MeshHandle mesh;
  final MaterialHandle material;
  final Transform localTransform;
  final Aabb localBounds;
  final String materialSlot;
  final List<ModelLod> lods;
  final List<ModelMaterialVariant> materialVariants;

  const ModelPart({
    required this.key,
    required this.mesh,
    required this.material,
    required this.localBounds,
    this.localTransform = Transform.identity,
    this.materialSlot = 'default',
    this.lods = const [],
    this.materialVariants = const [],
  });

  ModelMaterialVariant? variant(String name) {
    for (final candidate in materialVariants) {
      if (candidate.key == name) return candidate;
    }
    return null;
  }

  /// Resolves the default material or a named shared variant. Unknown names
  /// are rejected rather than silently falling back to the wrong surface.
  MaterialHandle materialForVariant([String? name]) {
    if (name == null || name.isEmpty) return material;
    final selected = variant(name);
    if (selected == null) {
      throw ArgumentError('ModelPart "$key" has no material variant "$name"');
    }
    return selected.material;
  }

  /// Returns the authored LOD containing [distance], using half-open ranges.
  /// A distance outside every authored range returns null so the caller must
  /// choose an explicit policy instead of silently drawing the wrong detail.
  ModelLod? lodForDistance(double distance) {
    if (!distance.isFinite || distance < 0) {
      throw ArgumentError.value(
        distance,
        'distance',
        'must be finite and >= 0',
      );
    }
    for (final lod in lods) {
      if (distance >= lod.minDistance && distance < lod.maxDistance) {
        return lod;
      }
    }
    return null;
  }

  void validate({required int index}) {
    if (key.isEmpty) {
      throw ArgumentError('ModelPart[$index].key must not be empty');
    }
    if (!mesh.isValid || !material.isValid) {
      throw ArgumentError(
        'ModelPart[$index] has an invalid mesh/material handle',
      );
    }
    if (!localBounds.isValid) {
      throw ArgumentError('ModelPart[$index].localBounds must be valid');
    }
    localTransform.validate();
    if (materialSlot.isEmpty) {
      throw ArgumentError('ModelPart[$index].materialSlot must not be empty');
    }
    var previousMax = 0.0;
    for (var lodIndex = 0; lodIndex < lods.length; lodIndex++) {
      final lod = lods[lodIndex];
      lod.validate(index: lodIndex);
      if (lodIndex == 0 && lod.minDistance != 0) {
        throw ArgumentError('ModelPart[$index] LODs must start at distance 0');
      }
      if (lod.minDistance < previousMax) {
        throw ArgumentError('ModelPart[$index] LOD ranges must not overlap');
      }
      previousMax = lod.maxDistance;
    }
    final variantKeys = <String>{};
    for (final variant in materialVariants) {
      if (variant.key.isEmpty || !variant.material.isValid) {
        throw ArgumentError(
          'ModelPart[$index] has an invalid material variant',
        );
      }
      if (!variantKeys.add(variant.key) || variant.key == materialSlot) {
        throw ArgumentError(
          'ModelPart[$index] material variant keys must be unique and distinct '
          'from the slot',
        );
      }
    }
  }
}

final class ModelSocket {
  final String name;
  final Transform transform;
  const ModelSocket(this.name, this.transform);
}

/// Composes reusable mesh/material parts into one authored model (§5.4).
/// Carries no room, examine tag, or collision rule — only geometry
/// identity, so the same definition can back both a static prop and an
/// instanced batch member.
final class ModelDefinition {
  final String key;
  final List<ModelPart> parts;
  final Aabb combinedBounds;
  final List<ModelSocket> sockets;

  const ModelDefinition({
    required this.key,
    required this.parts,
    required this.combinedBounds,
    this.sockets = const [],
  });

  void validate() {
    if (key.isEmpty) {
      throw ArgumentError('ModelDefinition.key must not be empty');
    }
    if (parts.isEmpty) {
      throw ArgumentError('ModelDefinition "$key" must have at least one part');
    }
    if (!combinedBounds.isValid) {
      throw ArgumentError(
        'ModelDefinition "$key" has an invalid combinedBounds',
      );
    }
    final partKeys = <String>{};
    for (var index = 0; index < parts.length; index++) {
      final part = parts[index];
      part.validate(index: index);
      if (!partKeys.add(part.key)) {
        throw ArgumentError(
          'ModelDefinition "$key" has duplicate part ${part.key}',
        );
      }
    }
    final socketNames = <String>{};
    for (final socket in sockets) {
      if (socket.name.isEmpty || !socketNames.add(socket.name)) {
        throw ArgumentError('ModelDefinition "$key" has invalid socket names');
      }
      socket.transform.validate();
    }
  }

  ModelPart? part(String name) {
    for (final candidate in parts) {
      if (candidate.key == name) return candidate;
    }
    return null;
  }

  ModelSocket? socket(String name) {
    for (final s in sockets) {
      if (s.name == name) return s;
    }
    return null;
  }
}
