import '../core/graph_resource.dart';

final class VolumetricLightResources {
  const VolumetricLightResources._();

  static const ResourceRef volumetricLight = ResourceRef(
    name: 'volumetricLight',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef sceneColorPostVolumetric = ResourceRef(
    name: 'sceneColor',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
    version: 1,
  );
}
