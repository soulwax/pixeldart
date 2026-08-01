import '../core/graph_resource.dart';

/// §8.4's default shadow map size — 512x512, single caster for this first
/// proof. The measured 256x256/3-caster fallback is a future capability
/// selection concern, not modeled yet.
final class ShadowResources {
  const ShadowResources._();

  static const ResourceRef shadowMap = ResourceRef(
    name: 'shadowMap',
    format: ResourceFormat.depth24,
    width: 512,
    height: 512,
  );
}
