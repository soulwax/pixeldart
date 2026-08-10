import '../api/handles.dart';
import '../assets/model_definition.dart';

/// The authored LOD selected for one model part at one camera distance.
///
/// [index] is the stable position in the validated [ModelPart.lods] list;
/// [lod] is kept alongside it so callers do not need to search the list again.
/// Selection is presentation state only: it never acquires or releases a
/// mesh, material, texture, or instance resource.
final class LodSelection {
  final int index;
  final ModelLod lod;

  const LodSelection({required this.index, required this.lod});

  @override
  String toString() => 'LodSelection(${lod.key}#$index)';
}

/// Chooses an authored LOD deterministically, with distance hysteresis.
///
/// Authored ranges remain half-open (`[minDistance, maxDistance)`). When a
/// previous selection is supplied, it is retained while the distance remains
/// within that LOD's range expanded by [hysteresisDistance] on both sides.
/// This makes a camera hovering around a boundary keep one result instead of
/// repeatedly changing LOD. Gaps and distances outside the authored ranges
/// return `null`; the caller must decide whether that means culling or another
/// explicit fallback policy.
final class LodSelector {
  final double hysteresisDistance;

  const LodSelector({this.hysteresisDistance = 0});

  /// Returns the LOD for [part] at [distance], optionally retaining [previous]
  /// while the distance is inside its hysteresis band.
  LodSelection? select(
    ModelPart part,
    double distance, {
    LodSelection? previous,
  }) {
    _validateDistance(distance);
    _validateHysteresis();

    if (previous != null && _belongsTo(part, previous)) {
      final current = previous.lod;
      final lower = (current.minDistance - hysteresisDistance).clamp(
        0.0,
        double.infinity,
      );
      final upper = current.maxDistance + hysteresisDistance;
      if (distance >= lower && distance < upper) {
        return previous;
      }
    }

    for (var index = 0; index < part.lods.length; index++) {
      final lod = part.lods[index];
      if (distance >= lod.minDistance && distance < lod.maxDistance) {
        return LodSelection(index: index, lod: lod);
      }
    }
    return null;
  }

  bool _belongsTo(ModelPart part, LodSelection selection) {
    final index = selection.index;
    if (index < 0 || index >= part.lods.length) return false;
    final authored = part.lods[index];
    return authored.key == selection.lod.key &&
        authored.minDistance == selection.lod.minDistance &&
        authored.maxDistance == selection.lod.maxDistance;
  }

  void _validateHysteresis() {
    if (!hysteresisDistance.isFinite || hysteresisDistance < 0) {
      throw ArgumentError.value(
        hysteresisDistance,
        'hysteresisDistance',
        'must be finite and >= 0',
      );
    }
  }

  static void _validateDistance(double distance) {
    if (!distance.isFinite || distance < 0) {
      throw ArgumentError.value(
        distance,
        'distance',
        'must be finite and >= 0',
      );
    }
  }
}

/// Maintains independent hysteresis state for each instance and model part.
///
/// The map contains only the selected authored LOD. It deliberately does not
/// own GPU resources, so changing a selection cannot change mesh/material
/// ownership or instance allocation. [remove] and [clear] are explicit scene
/// lifecycle hooks for instances that leave the retained world.
final class InstanceLodSelector {
  final LodSelector selector;
  final Map<InstanceId, Map<ModelPart, LodSelection>> _selected = {};

  InstanceLodSelector({this.selector = const LodSelector()});

  LodSelection? select(InstanceId instance, ModelPart part, double distance) {
    if (!instance.isValid) {
      throw ArgumentError.value(instance, 'instance', 'must be valid');
    }
    final byPart = _selected[instance];
    final previous = byPart?[part];
    final next = selector.select(part, distance, previous: previous);
    if (next == null) {
      byPart?.remove(part);
      if (byPart != null && byPart.isEmpty) _selected.remove(instance);
      return null;
    }
    (_selected[instance] ??= <ModelPart, LodSelection>{})[part] = next;
    return next;
  }

  /// Drops all LOD state for one retained instance without touching its
  /// resources. Calling this for an unknown instance is a no-op.
  void remove(InstanceId instance) {
    _selected.remove(instance);
  }

  /// Drops all per-instance presentation state.
  void clear() {
    _selected.clear();
  }

  int get trackedInstanceCount => _selected.length;

  int get trackedSelectionCount =>
      _selected.values.fold<int>(0, (total, byPart) => total + byPart.length);
}
