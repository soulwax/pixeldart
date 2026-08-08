import '../api/capabilities.dart';
import 'program_source.dart';

/// Deterministically maps an installed profile to the exact shader sources a
/// renderer candidate must compile. It performs no GPU work.
final class ProgramSetPlanner {
  const ProgramSetPlanner();

  List<ProgramSource> plan({
    required QualityProfile profile,
    required ProgramSource base,
    required Map<String, ProgramSource> featureSources,
  }) {
    profile.validate();
    base.validate();
    final result = <ProgramSource>[base];
    final features = profile.installedFeatures.toList()..sort();
    final seen = {base.id};
    for (final feature in features) {
      final source = featureSources[feature];
      if (source == null) {
        throw StateError('profile feature has no program source: $feature');
      }
      source.validate();
      if (!seen.add(source.id)) {
        throw StateError('profile program ID is duplicated: ${source.id}');
      }
      result.add(source);
    }
    return List.unmodifiable(result);
  }
}
