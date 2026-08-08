import '../api/capabilities.dart';
import 'render_feature.dart';

/// Pure profile-to-feature installation planning. Feature construction is
/// supplied by the caller; this class only enforces deterministic membership.
final class FeatureInstallationPlanner {
  const FeatureInstallationPlanner();

  List<RenderFeature> plan({
    required QualityProfile profile,
    required RenderFeature base,
    required Map<String, RenderFeature> optional,
  }) {
    profile.validate();
    final result = <RenderFeature>[base];
    final ids = {base.id};
    final features = profile.installedFeatures.toList()..sort();
    for (final featureId in features) {
      final feature = optional[featureId];
      if (feature == null) {
        throw StateError('profile feature has no render feature: $featureId');
      }
      if (!ids.add(feature.id)) {
        throw StateError('duplicate installed render feature: ${feature.id}');
      }
      result.add(feature);
    }
    return List.unmodifiable(result);
  }
}
