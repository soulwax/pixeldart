library;

import 'asset_import_diagnostic.dart';

/// The bounded result of inspecting an FBX source before conversion.
final class FbxPreflightResult {
  final String sourcePath;
  final int sourceBytes;
  final String? sourceSha256;
  final int? fbxVersion;
  final bool binaryHeader;
  final bool asciiHeader;
  final List<AssetImportDiagnostic> diagnostics;

  const FbxPreflightResult({
    required this.sourcePath,
    required this.sourceBytes,
    this.sourceSha256,
    this.fbxVersion,
    required this.binaryHeader,
    this.asciiHeader = false,
    this.diagnostics = const [],
  });

  bool get passed => !diagnostics.any(
    (diagnostic) => diagnostic.severity == DiagnosticSeverity.error,
  );

  Map<String, dynamic> toJson() => {
    'schema': 'pixeldart-fbx-preflight-v1',
    'sourcePath': sourcePath,
    'sourceBytes': sourceBytes,
    'sourceSha256': sourceSha256,
    'fbxVersion': fbxVersion,
    'binaryHeader': binaryHeader,
    'asciiHeader': asciiHeader,
    'passed': passed,
    'diagnostics': diagnostics
        .map((diagnostic) => diagnostic.toJson())
        .toList(),
    'next': 'converter invocation and scene inspection are required',
  };
}

/// Immutable source-file provenance used by offline import reports.
final class SourceProvenance {
  final String sourceFormat;
  final String? licenseId;
  final List<({String path, String sha256})> sourceFiles;

  const SourceProvenance({
    required this.sourceFormat,
    this.licenseId,
    this.sourceFiles = const [],
  });

  Map<String, dynamic> toJson() => {
    'sourceFormat': sourceFormat,
    'licenseId': licenseId,
    'sourceFiles': [
      for (final file in sourceFiles)
        {'path': file.path, 'sha256': file.sha256},
    ],
  };
}
