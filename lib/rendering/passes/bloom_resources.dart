import '../core/graph_resource.dart';
import 'safe_graph_resources.dart';

/// §8.7's bloom pipeline resources, both at half `SafeGraphResources
/// .sceneColor`'s 384x216 — same resolution choice as SSAO (§8.5's own
/// "half the internal world resolution," reused here since there is no
/// separate resolution guidance for bloom specifically). [bloomBlurH] is
/// the horizontal blur pass's output, sampling the resolved sceneColor
/// target's glow attachment directly; [bloomBlurV] is the vertical pass's
/// output, sampling [bloomBlurH] — the only one the composite pass reads.
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

  /// The version of `sceneColor` that exists *after* bloom's composite
  /// pass additively blends onto it — a distinct declared version from
  /// `SafeGraphResources.sceneColor` (which `shadowedWorld` already
  /// writes), since two passes declaring a write to the exact same
  /// name+version is a duplicate-writer collision under this graph's
  /// validation model. Real GPU binding is unaffected by this — `viewOf`
  /// keys off the resource's name only, and both versions share the name
  /// `"sceneColor"` — this exists purely so the declared graph honestly
  /// records "shadowedWorld's output gets superseded by a second write,"
  /// which `present` must then read instead of the pre-bloom version.
  static final ResourceRef sceneColorPostBloom =
      SafeGraphResources.sceneColor.nextVersion();
}
