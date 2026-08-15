import 'package:pixeldart/rendering/rendering.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

BrowserLifecycleEvidence evidence(
  String scenario, {
  int items = 0,
  int meshes = 0,
  int refs = 0,
}) => BrowserLifecycleEvidence(
  scenario: scenario,
  liveWorldItems: items,
  liveMeshResources: meshes,
  liveCacheReferences: refs,
  collisionPreserved: true,
  focusPreserved: true,
  savePreserved: true,
);

void main() {
  final complete = [
    evidence('disabled'),
    evidence('lod0', items: 1, meshes: 1, refs: 1),
    evidence('lod1', items: 1, meshes: 1, refs: 1),
    evidence('missing-package'),
    evidence('corrupt-package'),
    evidence('context-loss'),
    evidence('rollback'),
  ];
  const gate = BrowserLifecycleGate();
  require(gate.evaluate(complete).passed, 'complete lifecycle evidence passes');

  final leaked = [...complete]
    ..[0] = evidence('disabled', items: 1, meshes: 1, refs: 1);
  final leakReport = gate.evaluate(leaked);
  require(
    !leakReport.passed &&
        leakReport.failures.any((item) => item.contains('resources remain')),
    'disabled leak is rejected',
  );

  final incomplete = complete.sublist(0, 3);
  final incompleteReport = gate.evaluate(incomplete);
  require(
    !incompleteReport.passed && incompleteReport.failures.length == 4,
    'missing scenarios are reported',
  );
  print('RF-10 browser lifecycle promotion tests passed.');
}
