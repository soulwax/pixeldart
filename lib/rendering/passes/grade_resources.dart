import '../core/graph_resource.dart';

/// RV-09 rung 2's LUT grade output — full `sceneColor` resolution, written
/// once by `GradeFeature` reading [DofResources.dofOutput] (never a
/// `nextVersion()` of an upstream name, matching DOF's own reasoning: a
/// distinct physical target keeps every stage's "read this, write that"
/// contract honest without relying on any two stages happening to share a
/// resource name).
final class GradeResources {
  const GradeResources._();

  static const ResourceRef gradeOutput = ResourceRef(
    name: 'gradeOutput',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
