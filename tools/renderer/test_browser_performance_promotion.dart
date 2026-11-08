import 'package:pixeldart/rendering/rendering.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

BrowserPerformanceEvidence sample(String profile, {int finalResources = 4}) =>
    BrowserPerformanceEvidence(
      profile: profile,
      parseMicros: 10,
      decodeMicros: 20,
      uploadMicros: 30,
      firstDrawMicros: 40,
      cycleCount: 100,
      initialResourceCount: 4,
      finalResourceCount: finalResources,
    );

void main() {
  const gate = BrowserPerformanceGate();
  final passed = gate.evaluate(
    evidence: [sample('high'), sample('standard'), sample('safe')],
    requiredProfiles: {'high', 'standard', 'safe'},
  );
  require(passed.passed, 'complete performance matrix passes');

  final leaked = gate.evaluate(
    evidence: [sample('high', finalResources: 5)],
    requiredProfiles: {'high'},
  );
  require(
    !leaked.passed && leaked.failures.single.contains('resource count grew'),
    'resource growth is rejected',
  );

  final incomplete = gate.evaluate(
    evidence: [
      const BrowserPerformanceEvidence(
        profile: 'safe',
        parseMicros: 1,
        decodeMicros: 1,
        uploadMicros: 1,
        firstDrawMicros: 1,
        cycleCount: 2,
        initialResourceCount: 0,
        finalResourceCount: 0,
      ),
    ],
    requiredProfiles: {'high', 'standard', 'safe'},
  );
  require(
    !incomplete.passed && incomplete.failures.length == 3,
    'missing profiles and short cycle are reported',
  );
  print('RF-10 browser performance promotion tests passed.');
}
