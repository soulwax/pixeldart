import '../api/handles.dart';
import '../assets/model_definition.dart';

final class LodSelection {
  final int index;
  final ModelLod lod;

  const LodSelection({required this.index, required this.lod});

  @override
  String toString() => 'LodSelection(${lod.key}#$index)';
}

final class LodSelector {
  final double hysteresisDistance;

  const LodSelector({this.hysteresisDistance = 0});

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

final class InstanceLodSelector {
  final LodSelector selector;
  final Map<InstanceId, Map<ModelPart, LodSelection>> _selected = {};
  int _selectionChanges = 0;
  int _cullEvents = 0;

  InstanceLodSelector({this.selector = const LodSelector()});

  LodSelection? select(InstanceId instance, ModelPart part, double distance) {
    if (!instance.isValid) {
      throw ArgumentError.value(instance, 'instance', 'must be valid');
    }
    final byPart = _selected[instance];
    final previous = byPart?[part];
    final next = selector.select(part, distance, previous: previous);
    if (next == null) {
      if (previous != null) _cullEvents++;
      byPart?.remove(part);
      if (byPart != null && byPart.isEmpty) _selected.remove(instance);
      return null;
    }
    if (previous == null || previous.lod.key != next.lod.key) {
      _selectionChanges++;
    }
    (_selected[instance] ??= <ModelPart, LodSelection>{})[part] = next;
    return next;
  }

  void remove(InstanceId instance) {
    _selected.remove(instance);
  }

  void clear() {
    _selected.clear();
  }

  int get trackedInstanceCount => _selected.length;

  int get trackedSelectionCount =>
      _selected.values.fold<int>(0, (total, byPart) => total + byPart.length);

  int get selectionChanges => _selectionChanges;
  int get cullEvents => _cullEvents;
}
