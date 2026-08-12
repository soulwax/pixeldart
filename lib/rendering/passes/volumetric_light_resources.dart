import '../core/graph_resource.dart';

/// Pipeline resource references for volumetric light shaft raymarching pass in PixelDart.
final class VolumetricLightResources {
  const VolumetricLightResources._();

  static const ResourceRef volumetricLight = ResourceRef(
    name: 'volumetricLight',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );
}
