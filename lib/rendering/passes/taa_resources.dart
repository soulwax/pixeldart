import '../core/graph_resource.dart';

/// Pipeline resource references for Temporal Anti-Aliasing (TAA) in PixelDart.
final class TaaResources {
  const TaaResources._();

  static const ResourceRef taaHistory = ResourceRef(
    name: 'taaHistory',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );

  static const ResourceRef taaResolved = ResourceRef(
    name: 'taaResolved',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
