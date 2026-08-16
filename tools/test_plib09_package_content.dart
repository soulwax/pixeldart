import 'dart:io';

/// Lightweight package-content hygiene gate. It runs without network access
/// and catches accidental host/private material before a release dry-run.
void main() {
  final package = _packageDirectory();
  final violations = <String>[];
  final files = package
      .listSync(recursive: true)
      .whereType<File>()
      .where((file) => !file.path.contains('/.dart_tool/'));
  final secret = RegExp(
    r'(api[_-]?key|secret[_-]?key|password\s*[=:]|access[_-]?token)',
    caseSensitive: false,
  );
  for (final file in files) {
    final relative = file.path.substring(package.path.length + 1);
    if (relative.startsWith('build/') || relative.startsWith('dist/')) {
      violations.add('$relative: generated output');
      continue;
    }
    // Tool fixtures and checked-in browser evidence may mention the parent
    // application or host paths as part of their test contract. Release
    // hygiene for this gate covers shipped library/configuration content.
    if (!(relative.startsWith('lib/') || relative == 'pubspec.yaml')) {
      continue;
    }
    final text = file.readAsStringSync();
    if (text.contains('package:quarantine/')) {
      violations.add('$relative: imports host package');
    }
    if (secret.hasMatch(text)) {
      violations.add('$relative: credential-like token');
    }
    if (RegExp(r'(?<![A-Za-z])/(home|tmp|workspace)/').hasMatch(text)) {
      violations.add('$relative: absolute local path');
    }
  }
  if (violations.isNotEmpty) {
    throw StateError('PLIB-09 package-content violations: ${violations.join(', ')}');
  }
  print('PLIB-09 package-content guard passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/pubspec.yaml').existsSync() &&
      File('${cwd.path}/lib/pixeldart.dart').existsSync()) {
    return cwd;
  }
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/pubspec.yaml').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
