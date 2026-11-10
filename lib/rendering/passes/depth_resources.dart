import '../core/graph_resource.dart';

final class DepthPrepassResources {
  const DepthPrepassResources._();

  static const ResourceRef sceneDepth = ResourceRef(
    name: 'sceneDepth',
    format: ResourceFormat.depth24,
    width: 384,
    height: 216,
  );
}
