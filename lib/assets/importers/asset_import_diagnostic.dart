enum DiagnosticSeverity { info, warning, error }

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
