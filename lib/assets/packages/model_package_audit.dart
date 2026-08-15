import 'dart:typed_data';

import '../importers/asset_import_diagnostic.dart';
import 'model_package_manifest.dart';

final class ModelPackageAuditReport {
  final List<AssetImportDiagnostic> diagnostics;
  const ModelPackageAuditReport(this.diagnostics);
  bool get passed =>
      diagnostics.every((item) => item.severity != DiagnosticSeverity.error);
}

/// Strict runtime-package audit. It checks evidence and closure, not pixels or
/// GPU state, and therefore runs identically in tools and browser boot code.
final class ModelPackageAuditGate {
  const ModelPackageAuditGate();

  ModelPackageAuditReport evaluate({
    required ModelPackageManifest manifest,
    required Map<String, Uint8List> payloads,
  }) {
    final diagnostics = <AssetImportDiagnostic>[];
    void error(String code, String message) {
      diagnostics.add(
        AssetImportDiagnostic(
          code: code,
          severity: DiagnosticSeverity.error,
          stage: 'audit',
          message: message,
          remediation: 'repair the package evidence and rebuild',
        ),
      );
    }

    final licenseId = manifest.provenance['licenseId'];
    if (licenseId == null || licenseId.isEmpty) {
      error('MODEL_PACKAGE_LICENSE', 'licenseId provenance is required');
    }
    final sourceHash = manifest.provenance['sourceHash'];
    if (sourceHash == null || !RegExp(r'^[0-9a-f]{64}$').hasMatch(sourceHash)) {
      error(
        'MODEL_PACKAGE_SOURCE_HASH',
        'sourceHash provenance must be lowercase SHA-256',
      );
    }
    final declared = <String>{
      for (final part in manifest.parts) ...part.lodFiles.values,
    };
    for (final path in declared) {
      if (!payloads.containsKey(path)) {
        error(
          'MODEL_PACKAGE_MISSING_PAYLOAD',
          'declared payload is missing: $path',
        );
      }
    }
    for (final path in payloads.keys) {
      if (!declared.contains(path)) {
        error(
          'MODEL_PACKAGE_EXTRA_PAYLOAD',
          'undeclared payload is present: $path',
        );
      }
    }
    return ModelPackageAuditReport(List.unmodifiable(diagnostics));
  }
}
