import '../core/graph_resource.dart';

/// §8.5's SSAO pipeline resources — both at half the internal world
/// resolution (§8.5: "runs at half the internal world resolution"), half of
/// `SafeGraphResources.sceneColor`'s 384x216. [ssaoRaw] is the kernel
/// occlusion pass's direct output; [ssaoBlurred] is the depth-aware
/// bilateral blur's output, the only one a world pass may ever sample —
/// §8.5 requires the blur specifically "rather than smearing across
/// silhouettes," so nothing should read the noisy raw pass directly.
final class SsaoResources {
  const SsaoResources._();

  static const ResourceRef ssaoRaw = ResourceRef(
    name: 'ssaoRaw',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef ssaoBlurred = ResourceRef(
    name: 'ssaoBlurred',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );
}
