import '../core/graph_resource.dart';

/// Pipeline resource references for Screen-Space Subsurface Scattering (SSSS) in PixelDart.
final class SsssResources {
  const SsssResources._();

  static const ResourceRef ssssPing = ResourceRef(
    name: 'ssssPing',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );

  static const ResourceRef ssssPong = ResourceRef(
    name: 'ssssPong',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
