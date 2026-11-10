import 'asset_import_diagnostic.dart';

final class ConverterInvocationResult {
  final String converterId;
  final String requestedVersion;
  final String? observedVersion;
  final int exitCode;
  final List<AssetImportDiagnostic> diagnostics;

  const ConverterInvocationResult({
    required this.converterId,
    required this.requestedVersion,
    this.observedVersion,
    required this.exitCode,
    this.diagnostics = const [],
  });

  bool get passed =>
      exitCode == 0 &&
      !diagnostics.any(
        (diagnostic) => diagnostic.severity == DiagnosticSeverity.error,
      );

  Map<String, dynamic> toJson() => {
    'converterId': converterId,
    'requestedVersion': requestedVersion,
    'observedVersion': observedVersion,
    'exitCode': exitCode,
    'passed': passed,
    'diagnostics': diagnostics
        .map((diagnostic) => diagnostic.toJson())
        .toList(),
  };
}
