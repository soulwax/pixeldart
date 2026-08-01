import '../core/graph_resource.dart';

/// RV-09 rung 3's PS1 quantize+dither output — full `sceneColor`
/// resolution, distinct from `gradeOutput` for the same reason every prior
/// post-DOF stage's output is distinct from its own input: this pass reads
/// the pre-quantize scene as one input texture while writing a different
/// one in the same draw call.
final class Ps1Resources {
  const Ps1Resources._();

  static const ResourceRef ps1Output = ResourceRef(
    name: 'ps1Output',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
