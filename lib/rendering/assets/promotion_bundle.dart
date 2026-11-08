import 'dart:typed_data';

import '../../assets/packages/model_package_audit.dart';
import '../../assets/packages/model_package_manifest.dart';
import '../../assets/packages/model_package_promotion.dart';
import 'browser_lifecycle_promotion.dart';
import 'browser_performance_promotion.dart';
import 'browser_promotion.dart';

final class PromotionBundleReport {
  final List<String> failures;
  const PromotionBundleReport(this.failures);
  bool get passed => failures.isEmpty;
}

/// Final host-facing promotion decision. It composes independent gates and
/// never hides which lane failed.
final class PromotionBundleGate {
  const PromotionBundleGate();

  PromotionBundleReport evaluate({
    required ModelPackageManifest manifest,
    required Map<String, Uint8List> payloads,
    required List<BrowserPromotionCapture> captures,
    required List<BrowserLifecycleEvidence> lifecycle,
    required List<BrowserPerformanceEvidence> performance,
  }) {
    final failures = <String>[];
    final audit = const ModelPackageAuditGate().evaluate(
      manifest: manifest,
      payloads: payloads,
    );
    failures.addAll(audit.diagnostics.map((item) => 'audit:${item.code}'));
    final promotion = const ModelPackagePromotionGate().evaluate(
      manifest: manifest,
      payloads: payloads,
    );
    failures.addAll(
      promotion.diagnostics.map((item) => 'package:${item.code}'),
    );
    final browser = const BrowserPromotionGate().evaluateSet(
      captures: captures,
      expectedPackageHash: manifest.packageHash,
      requiredViewports: const [(1920, 1080), (1280, 720)],
      requiredLods: const ['LOD0', 'LOD1'],
      expectedBounds: const [-1, -1, -1, 1, 1, 1],
    );
    failures.addAll(browser.failures.map((item) => 'pixels:$item'));
    failures.addAll(
      const BrowserLifecycleGate()
          .evaluate(lifecycle)
          .failures
          .map((item) => 'lifecycle:$item'),
    );
    failures.addAll(
      const BrowserPerformanceGate()
          .evaluate(
            evidence: performance,
            requiredProfiles: {'high', 'standard', 'safe'},
          )
          .failures
          .map((item) => 'performance:$item'),
    );
    return PromotionBundleReport(List.unmodifiable(failures));
  }
}
