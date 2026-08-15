/// Required browser lifecycle scenarios for RF-10.
const requiredBrowserScenarios = <String>{
  'disabled',
  'lod0',
  'lod1',
  'missing-package',
  'corrupt-package',
  'context-loss',
  'rollback',
};

final class BrowserLifecycleEvidence {
  final String scenario;
  final int liveWorldItems;
  final int liveMeshResources;
  final int liveCacheReferences;
  final bool collisionPreserved;
  final bool focusPreserved;
  final bool savePreserved;

  const BrowserLifecycleEvidence({
    required this.scenario,
    required this.liveWorldItems,
    required this.liveMeshResources,
    required this.liveCacheReferences,
    required this.collisionPreserved,
    required this.focusPreserved,
    required this.savePreserved,
  });
}

final class BrowserLifecycleReport {
  final List<String> failures;
  const BrowserLifecycleReport(this.failures);
  bool get passed => failures.isEmpty;
}

final class BrowserLifecycleGate {
  const BrowserLifecycleGate();

  BrowserLifecycleReport evaluate(List<BrowserLifecycleEvidence> evidence) {
    final failures = <String>[];
    final seen = <String>{};
    for (final item in evidence) {
      if (!requiredBrowserScenarios.contains(item.scenario)) {
        failures.add('unknown scenario: ${item.scenario}');
      }
      if (!seen.add(item.scenario)) {
        failures.add('duplicate scenario: ${item.scenario}');
      }
      if (item.liveWorldItems < 0 ||
          item.liveMeshResources < 0 ||
          item.liveCacheReferences < 0) {
        failures.add('${item.scenario}: negative resource count');
      }
      if (!item.collisionPreserved ||
          !item.focusPreserved ||
          !item.savePreserved) {
        failures.add('${item.scenario}: gameplay state was not preserved');
      }
      if (item.scenario == 'disabled' &&
          (item.liveWorldItems != 0 ||
              item.liveMeshResources != 0 ||
              item.liveCacheReferences != 0)) {
        failures.add('disabled: resources remain resident');
      }
    }
    for (final scenario in requiredBrowserScenarios) {
      if (!seen.contains(scenario)) failures.add('missing scenario: $scenario');
    }
    return BrowserLifecycleReport(List.unmodifiable(failures));
  }
}
