import '../api/handles.dart';
import '../math/bounds.dart';
import '../math/transform.dart';

final class ModelPart {
  final String key;
  final MeshHandle mesh;
  final MaterialHandle material;
  final Transform localTransform;

  const ModelPart({
    required this.key,
    required this.mesh,
    required this.material,
    this.localTransform = Transform.identity,
  });
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
  }

  ModelSocket? socket(String name) {
    for (final s in sockets) {
      if (s.name == name) return s;
    }
    return null;
  }
}
