import '../core/graph_resource.dart';

/// Pipeline resource references for Cinematic Lens Flare in PixelDart.
final class LensFlareResources {
  const LensFlareResources._();

  static const ResourceRef lensFlareHighlights = ResourceRef(
    name: 'lensFlareHighlights',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef lensFlareComposite = ResourceRef(
    name: 'lensFlareComposite',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
