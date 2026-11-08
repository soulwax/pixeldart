import 'dart:typed_data';

import '../importers/asset_import_diagnostic.dart';
import 'model_package_emitter.dart';
import 'model_package_manifest.dart';
import 'model_package_validator.dart';

final class ModelPackagePromotionReport {
  final List<AssetImportDiagnostic> diagnostics;
  final String packageHash;
  final int payloadCount;

  ModelPackagePromotionReport({
    required Iterable<AssetImportDiagnostic> diagnostics,
    required this.packageHash,
    required this.payloadCount,
  }) : diagnostics = List.unmodifiable(diagnostics);

  bool get passed => diagnostics.every(
    (diagnostic) => diagnostic.severity != DiagnosticSeverity.error,
  );
}

/// Runtime promotion gate. It never copies files or allocates GPU resources.
final class ModelPackagePromotionGate {
  const ModelPackagePromotionGate();

  ModelPackagePromotionReport evaluate({
    required ModelPackageManifest manifest,
    required Map<String, Uint8List> payloads,
    bool requireApproval = true,
  }) {
    final diagnostics = <AssetImportDiagnostic>[
      ...validateModelPackageManifest(manifest),
      ...validateModelPackagePayloads(manifest, payloads),
    ];
    void error(String code, String message) {
      diagnostics.add(
        AssetImportDiagnostic(
          code: code,
          severity: DiagnosticSeverity.error,
          stage: 'promotion',
          message: message,
          remediation: 'rebuild and re-review the runtime package',
        ),
      );
    }

    if (requireApproval && manifest.provenance['promotion'] != 'approved') {
      error(
        'MODEL_PACKAGE_NOT_APPROVED',
        'package lacks approved promotion provenance',
      );
    }
    if (manifest.provenance['runtimeProfile'] == 'inspection-only') {
      error(
        'MODEL_PACKAGE_INSPECTION_ONLY',
        'inspection-only package cannot enter runtime',
      );
    }
    final hash = ModelPackageEmitter.computePackageHash(manifest, payloads);
    if (hash != manifest.packageHash) {
      error(
        'MODEL_PACKAGE_PAYLOAD_HASH',
        'payload-inclusive package hash does not match manifest',
      );
    }
    return ModelPackagePromotionReport(
      diagnostics: diagnostics,
      packageHash: hash,
      payloadCount: payloads.length,
    );
  }
}
