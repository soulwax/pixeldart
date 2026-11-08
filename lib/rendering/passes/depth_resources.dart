import '../core/graph_resource.dart';

/// §8.4's "sampleable single-sample scene-depth prepass" — "required when
/// SSAO or depth-aware transparency is installed." Sized to match
/// `SafeGraphResources.sceneColor` so a later SSAO pass can sample it 1:1
/// against the same fragment grid the world pass will shade, per §8.5's
/// "half the internal world resolution" (half of *this* resolution, not a
/// second independent one).
final class DepthPrepassResources {
  const DepthPrepassResources._();

  static const ResourceRef sceneDepth = ResourceRef(
    name: 'sceneDepth',
    format: ResourceFormat.depth24,
    width: 384,
    height: 216,
  );
}
