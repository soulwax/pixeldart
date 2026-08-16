import '../math/transform.dart';

/// Immutable host-owned placement facts. It carries no domain, input, or
/// persistence semantics and is safe to rebuild from a frame snapshot.
final class ModelPlacementDescriptor {
  final String placementId;
  final String packageAssetId;
  final Transform transform;
  final int visibilityMask;

  const ModelPlacementDescriptor({
    required this.placementId,
    required this.packageAssetId,
    this.transform = Transform.identity,
    this.visibilityMask = -1,
  });

  void validate() {
    if (placementId.isEmpty || packageAssetId.isEmpty) {
      throw ArgumentError('placement and package ids must be non-empty');
    }
    transform.validate();
    if (visibilityMask == 0) {
      throw ArgumentError('visibilityMask must expose at least one layer');
    }
  }
}

abstract interface class PlacementBinding {
  void attach();
  void dispose();
}

/// Maps stable host placement IDs to renderer bindings. Replacement is
/// prepare-first: an existing placement remains alive if the new binding
/// cannot attach.
final class ModelPlacementAdapter {
  final PlacementBinding Function(ModelPlacementDescriptor placement) create;
  final Map<String, PlacementBinding> _bindings = {};

  ModelPlacementAdapter(this.create);

  int get count => _bindings.length;

  void attach(ModelPlacementDescriptor placement) {
    placement.validate();
    if (_bindings.containsKey(placement.placementId)) {
      throw StateError('placement already attached: ${placement.placementId}');
    }
    final binding = create(placement);
    try {
      binding.attach();
      _bindings[placement.placementId] = binding;
    } catch (_) {
      binding.dispose();
      rethrow;
    }
  }

  void replace(ModelPlacementDescriptor placement) {
    placement.validate();
    final old = _bindings[placement.placementId];
    if (old == null) {
      attach(placement);
      return;
    }
    final next = create(placement);
    try {
      next.attach();
      _bindings[placement.placementId] = next;
      old.dispose();
    } catch (_) {
      next.dispose();
      rethrow;
    }
  }

  void remove(String placementId) {
    _bindings.remove(placementId)?.dispose();
  }

  void dispose() {
    for (final binding in _bindings.values) {
      binding.dispose();
    }
    _bindings.clear();
  }
}
