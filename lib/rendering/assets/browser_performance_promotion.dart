final class BrowserPerformanceEvidence {
  final String profile;
  final int parseMicros;
  final int decodeMicros;
  final int uploadMicros;
  final int firstDrawMicros;
  final int cycleCount;
  final int initialResourceCount;
  final int finalResourceCount;

  const BrowserPerformanceEvidence({
    required this.profile,
    required this.parseMicros,
    required this.decodeMicros,
    required this.uploadMicros,
    required this.firstDrawMicros,
    required this.cycleCount,
    required this.initialResourceCount,
    required this.finalResourceCount,
  });
}

final class BrowserPerformanceReport {
  final List<String> failures;
  const BrowserPerformanceReport(this.failures);
  bool get passed => failures.isEmpty;
}

final class BrowserPerformanceGate {
  const BrowserPerformanceGate();

  BrowserPerformanceReport evaluate({
    required List<BrowserPerformanceEvidence> evidence,
    required Set<String> requiredProfiles,
    int minimumCycles = 100,
  }) {
    final failures = <String>[];
    final seen = <String>{};
    for (final item in evidence) {
      if (!seen.add(item.profile)) {
        failures.add('duplicate profile: ${item.profile}');
      }
      if (item.parseMicros < 0 ||
          item.decodeMicros < 0 ||
          item.uploadMicros < 0 ||
          item.firstDrawMicros < 0) {
        failures.add('${item.profile}: negative timing');
      }
      if (item.cycleCount < minimumCycles) {
        failures.add('${item.profile}: insufficient lifecycle cycles');
      }
      if (item.finalResourceCount != item.initialResourceCount) {
        failures.add('${item.profile}: resource count grew across cycles');
      }
    }
    for (final profile in requiredProfiles) {
      if (!seen.contains(profile)) failures.add('missing profile: $profile');
    }
    return BrowserPerformanceReport(List.unmodifiable(failures));
  }
}
