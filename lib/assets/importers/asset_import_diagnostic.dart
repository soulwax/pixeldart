/// Stable machine-readable diagnostic severity for offline asset work.
enum DiagnosticSeverity { info, warning, error }

/// A bounded diagnostic that can be shown by a CLI or an editor integration.
/// It intentionally contains no process output, absolute path, or exception
/// object, so reports remain deterministic and safe to publish.
final class AssetImportDiagnostic {
  final String code;
  final DiagnosticSeverity severity;
  final String stage;
  final String? relativePath;
  final String? nodePath;
  final String message;
  final String remediation;

  const AssetImportDiagnostic({
    required this.code,
    required this.severity,
    required this.stage,
    required this.message,
    required this.remediation,
    this.relativePath,
    this.nodePath,
  });

  Map<String, dynamic> toJson() => {
    'code': code,
    'severity': severity.name,
    'stage': stage,
    'relativePath': relativePath,
    'nodePath': nodePath,
    'message': message,
    'remediation': remediation,
  };
}
