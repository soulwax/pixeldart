import '../core/graph_resource.dart';

final class SafeGraphResources {
  const SafeGraphResources._();

  static const ResourceRef sceneColor = ResourceRef(
    name: 'sceneColor',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );

  static const ResourceRef presentTarget = ResourceRef(
    name: 'present',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
