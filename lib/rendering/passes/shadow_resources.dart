import '../core/graph_resource.dart';

final class ShadowResources {
  const ShadowResources._();

  static const ResourceRef shadowMap = ResourceRef(
    name: 'shadowMap',
    format: ResourceFormat.depth24,
    width: 512,
    height: 512,
  );
}
