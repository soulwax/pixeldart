import 'dart:convert';

/// Stable, source-neutral snapshot for tooling and browser automation.
final class ModelPackageDiagnostics {
  final String assetId;
  final String activeLod;
  final bool attached;
  final int itemCount;
  final int meshCount;
  final int cacheReferenceCount;

  const ModelPackageDiagnostics({
    required this.assetId,
    required this.activeLod,
    required this.attached,
    required this.itemCount,
    required this.meshCount,
    required this.cacheReferenceCount,
  });

  Map<String, Object> toJson() => {
    'schema': 'pixeldart-model-package-diagnostic-v1',
    'assetId': assetId,
    'activeLod': activeLod,
    'attached': attached,
    'itemCount': itemCount,
    'meshCount': meshCount,
    'cacheReferenceCount': cacheReferenceCount,
  };

  String encode() => jsonEncode(toJson());
}
