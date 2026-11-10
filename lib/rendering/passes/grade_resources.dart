import '../core/graph_resource.dart';

final class GradeResources {
  const GradeResources._();

  static const ResourceRef gradeOutput = ResourceRef(
    name: 'gradeOutput',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
