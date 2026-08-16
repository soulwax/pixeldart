import 'dart:io';

/// Runs the package/product boundary checks that sit outside renderer fixtures.
void main() {
  final package = _packageDirectory();
  const scripts = [
    'tools/test_plib10_api_snapshot.dart',
    'tools/test_plib10_schema_compatibility.dart',
    'tools/test_plib10_versioning.dart',
    'tools/test_plib01_facade_surface.dart',
    'tools/test_plib00_package_audit.dart',
    'tools/test_plib04_boundary.dart',
    'tools/test_plib05_vocabulary.dart',
    'tools/test_plib05_docs_links.dart',
    'tools/test_plib05_sample_assets.dart',
    'tools/test_plib09_package_content.dart',
    'tools/test_plib07_minimal_host.dart',
    'tools/test_plib11_archive_manifest.dart',
    'tools/renderer/test_rf11_runtime_reference_audit.dart',
  ];
  var failures = 0;
  for (final script in scripts) {
    stdout.writeln('--- $script ---');
    final result = Process.runSync(
      Platform.resolvedExecutable,
      ['--suppress-analytics', 'run', script],
      workingDirectory: package.path,
    );
    stdout.write(result.stdout);
    if (result.exitCode != 0) {
      failures++;
      stderr.write(result.stderr);
      stderr.writeln('FAILED: $script (exit ${result.exitCode})');
    }
  }
  if (failures != 0) exit(1);
  stdout.writeln('All ${scripts.length} package boundary checks passed.');
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
