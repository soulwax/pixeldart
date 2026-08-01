import '../core/graph_resource.dart';

/// RV-09 rung 4's VHS output — full `sceneColor` resolution. Unlike every
/// prior post-DOF stage's output, this one is also read back as history
/// (§8.10: "use an explicit valid history target") by the same pass that
/// writes it, one frame later — `VhsFeature` declares both a `write` and a
/// `historyRead` use against this exact ref, which the graph validator
/// explicitly permits (`_checkUnversionedReadWrite`/`_checkDependencyCycles`
/// both special-case `ResourceAccess.historyRead`). The bootstrap backs this
/// one logical name with two physical ping-ponged targets so the history
/// read and the current-frame write are never the same GPU object within a
/// single draw.
final class VhsResources {
  const VhsResources._();

  static const ResourceRef vhsOutput = ResourceRef(
    name: 'vhsOutput',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
