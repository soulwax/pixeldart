import '../api/handles.dart';
import '../api/lights.dart';
import '../api/scene.dart';
import '../math/vec.dart';

/// Presentation tier for one retained shadow caster.
///
/// The policy does not select a mesh or own a GPU resource. A host chooses
/// the authored geometry for [full] or [reduced], and skips [culled]. Keeping
/// that mapping outside the policy preserves the renderer's retained mesh,
/// material, and instance ownership rules.
enum ShadowCasterLod { full, reduced, culled }

/// Resolves the presentation tier for one retained caster at the selected
/// shadow light. The shadow pass uses only [ShadowCasterLod.culled] as a
/// draw-skip decision; [full] and [reduced] remain available to a host that
/// owns alternate authored meshes.
typedef ShadowCasterLodResolver =
    ShadowCasterLod Function(RetainedItemView item, SpotLight light);

/// Optional host-owned mesh mapping for a selected shadow tier. Returning
/// `null` keeps the descriptor's authored mesh. The resolver never transfers
/// ownership; returned handles must already belong to the renderer's library.
typedef ShadowCasterMeshResolver =
    MeshHandle? Function(
      RetainedItemView item,
      SpotLight light,
      ShadowCasterLod lod,
    );

/// Distance thresholds for shadow-caster detail.
///
/// The authored bands are `[0, fullToReduced)`,
/// `[fullToReduced, reducedToCulled)`, and
/// `[reducedToCulled, infinity)`. When a previous tier is supplied, each
/// boundary is expanded by [hysteresisDistance] for that tier. This makes a
/// caster moving around a light boundary retain its detail instead of
/// alternating every frame.
final class ShadowCasterLodPolicy {
  final double fullToReduced;
  final double reducedToCulled;
  final double hysteresisDistance;

  const ShadowCasterLodPolicy({
    this.fullToReduced = 8,
    this.reducedToCulled = 20,
    this.hysteresisDistance = 1,
  });

  /// Selects a tier from a light-space distance without retaining state.
  ShadowCasterLod select(double distance, {ShadowCasterLod? previous}) {
    _validate();
    _validateDistance(distance);
    final retained = _retain(distance, previous);
    if (retained != null) return retained;
    if (distance < fullToReduced) return ShadowCasterLod.full;
    if (distance < reducedToCulled) return ShadowCasterLod.reduced;
    return ShadowCasterLod.culled;
  }

  /// Selects a tier using the existing spot-light seam. The host supplies a
  /// stable world-space caster center (usually an item's bounds center).
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

/// Retains independent shadow tiers for each scene instance.
///
/// This is deliberately parallel to [InstanceLodSelector], but keyed only by
/// instance because shadow detail is measured from the selected caster light,
/// not from the camera. State changes never register, release, or replace a
/// mesh, material, texture, or instance resource.
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

  /// Explicitly forgets presentation state for a removed retained instance.
  void remove(InstanceId instance) {
    _selected.remove(instance);
  }

  /// Clears all presentation state; it does not touch renderer resources.
  void clear() {
    _selected.clear();
  }

  int get trackedInstanceCount => _selected.length;
}
