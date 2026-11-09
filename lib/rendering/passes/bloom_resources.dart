import '../core/graph_resource.dart';
import 'safe_graph_resources.dart';

final class BloomResources {
  const BloomResources._();

  static const ResourceRef bloomBlurH = ResourceRef(
    name: 'bloomBlurH',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef bloomBlurV = ResourceRef(
    name: 'bloomBlurV',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static final ResourceRef sceneColorPostBloom = SafeGraphResources.sceneColor
      .nextVersion();
}
