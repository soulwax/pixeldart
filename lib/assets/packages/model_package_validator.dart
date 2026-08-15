import '../importers/asset_import_diagnostic.dart';

/// Validates the current generated-package manifest before it is copied into
/// runtime assets. The manifest is still the legacy source packet shape; RF-04
/// will replace it with `pixeldart-model-package-v1` records.
List<AssetImportDiagnostic> validateGeneratedPackageManifest(
  Map<String, dynamic> manifest,
) {
  final diagnostics = <AssetImportDiagnostic>[];
  void error(String code, String message) {
    diagnostics.add(
      AssetImportDiagnostic(
        code: code,
        severity: DiagnosticSeverity.error,
        stage: 'package',
        message: message,
        remediation: 'repair the generated package and rerun validation',
      ),
    );
  }

  void requiredString(String key) {
    if (manifest[key] is! String || (manifest[key] as String).isEmpty) {
      error('PACKAGE_REQUIRED_STRING', '$key must be a non-empty string');
    }
  }

  requiredString('assetId');
  requiredString('packageHash');
  requiredString('converterId');
  requiredString('converterVersion');
  requiredString('settingsHash');
  requiredString('licenseId');
  for (final key in [
    'packageFiles',
    'sourceFiles',
    'sourceHashes',
    'units',
    'upAxis',
    'pivot',
    'materialSlots',
    'runtimeProfile',
  ]) {
    if (!manifest.containsKey(key)) {
      error('PACKAGE_MISSING_FIELD', '$key is required');
    }
  }
  final packageFiles = manifest['packageFiles'];
  if (packageFiles is List &&
      packageFiles.any((file) => file is! String || file.isEmpty)) {
    error('PACKAGE_FILE_PATH', 'packageFiles must contain non-empty paths');
  }
  if (packageFiles is List &&
      packageFiles.any(
        (file) =>
            file is String &&
            (file.toLowerCase().endsWith('.fbx') ||
                file.toLowerCase().endsWith('.glb') ||
                file.toLowerCase().endsWith('.gltf')),
      )) {
    error(
      'PACKAGE_SOURCE_LEAK',
      'runtime package must not contain FBX or glTF source/intermediates',
    );
  }
  if (manifest['sourceFormat'] != 'fbx') {
    error('PACKAGE_SOURCE_FORMAT', 'sourceFormat must be fbx');
  }
  for (final key in ['packageHash', 'settingsHash']) {
    final value = manifest[key];
    if (value is String && !RegExp(r'^[0-9a-f]{64}$').hasMatch(value)) {
      error('PACKAGE_HASH', '$key must be lowercase SHA-256');
    }
  }
  final parts = manifest['parts'];
  if (parts is! List || parts.isEmpty) {
    error('PACKAGE_PARTS', 'parts must be non-empty');
  }
  if (parts is List) {
    for (final raw in parts) {
      if (raw is! Map || !raw.containsKey('materialSlot')) {
        error('PACKAGE_MATERIAL_SLOT', 'each part must declare materialSlot');
      }
    }
  }
  if (manifest['materials'] is! List) {
    error('PACKAGE_MATERIALS', 'materials must be a list');
  }
  if (manifest['textures'] is! List) {
    error('PACKAGE_TEXTURES', 'textures must be a list');
  }
  final mediaStatus = manifest['mediaStatus'];
  if (mediaStatus != 'complete' && mediaStatus != 'incomplete') {
    error('PACKAGE_MEDIA_STATUS', 'mediaStatus must be complete or incomplete');
  }
  if (manifest['runtimeProfile'] == 'runtime' && mediaStatus != 'complete') {
    error(
      'PACKAGE_RUNTIME_MEDIA',
      'runtime packages cannot contain incomplete texture media',
    );
  }
  final lods = manifest['lods'];
  if (lods is! List || lods.length < 3) {
    error('PACKAGE_LODS', 'lods must contain LOD-S, LOD0, LOD1, and LOD2');
  }
  final bounds = manifest['combinedBounds'];
  if (bounds is! Map || bounds['min'] is! List || bounds['max'] is! List) {
    error('PACKAGE_BOUNDS', 'combinedBounds must contain min and max arrays');
  }
  return diagnostics;
}
