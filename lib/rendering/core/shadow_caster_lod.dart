import '../api/handles.dart';
import '../api/lights.dart';
import '../api/scene.dart';
import '../math/vec.dart';

enum ShadowCasterLod { full, reduced, culled }

typedef ShadowCasterLodResolver =
    ShadowCasterLod Function(RetainedItemView item, SpotLight light);

typedef ShadowCasterMeshResolver =
    MeshHandle? Function(
      RetainedItemView item,
      SpotLight light,
      ShadowCasterLod lod,
    );

final class ShadowCasterLodPolicy {
  final double fullToReduced;
  final double reducedToCulled;
  final double hysteresisDistance;

  const ShadowCasterLodPolicy({
    this.fullToReduced = 8,
    this.reducedToCulled = 20,
    this.hysteresisDistance = 1,
  });

  ShadowCasterLod select(double distance, {ShadowCasterLod? previous}) {
    _validate();
    _validateDistance(distance);
    final retained = _retain(distance, previous);
    if (retained != null) return retained;
    if (distance < fullToReduced) return ShadowCasterLod.full;
    if (distance < reducedToCulled) return ShadowCasterLod.reduced;
    return ShadowCasterLod.culled;
  }

  ShadowCasterLod selectForLight(
    SpotLight light,
    Vec3 casterCenter, {
    ShadowCasterLod? previous,
  }) {
    light.validate();
    if (!casterCenter.isFinite) {
      throw ArgumentError.value(
        casterCenter,
        'casterCenter',
        'must contain finite coordinates',
      );
    }
    return select((casterCenter - light.position).length, previous: previous);
  }

  ShadowCasterLod? _retain(double distance, ShadowCasterLod? previous) {
    if (previous == null) return null;
    return switch (previous) {
      ShadowCasterLod.full =>
        distance < fullToReduced + hysteresisDistance ? previous : null,
      ShadowCasterLod.reduced =>
        distance >= fullToReduced - hysteresisDistance &&
                distance < reducedToCulled + hysteresisDistance
            ? previous
            : null,
      ShadowCasterLod.culled =>
        distance >= reducedToCulled - hysteresisDistance ? previous : null,
    };
  }

  void _validate() {
    if (!fullToReduced.isFinite || fullToReduced <= 0) {
      throw ArgumentError.value(
        fullToReduced,
        'fullToReduced',
        'must be finite and > 0',
      );
    }
    if (!reducedToCulled.isFinite || reducedToCulled <= fullToReduced) {
      throw ArgumentError.value(
        reducedToCulled,
        'reducedToCulled',
        'must be finite and greater than fullToReduced',
      );
    }
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

final class InstanceShadowCasterLodSelector {
  final ShadowCasterLodPolicy policy;
  final Map<InstanceId, ShadowCasterLod> _selected = {};

  InstanceShadowCasterLodSelector({
    this.policy = const ShadowCasterLodPolicy(),
  });

  ShadowCasterLod select(
    InstanceId instance,
    SpotLight light,
    Vec3 casterCenter,
  ) {
    if (!instance.isValid) {
      throw ArgumentError.value(instance, 'instance', 'must be valid');
    }
    final next = policy.selectForLight(
      light,
      casterCenter,
      previous: _selected[instance],
    );
    _selected[instance] = next;
    return next;
  }

  void remove(InstanceId instance) {
    _selected.remove(instance);
  }

  void clear() {
    _selected.clear();
  }

  int get trackedInstanceCount => _selected.length;
}
