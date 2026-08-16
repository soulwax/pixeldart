import 'dart:io';

/// Checks the file set that a publication candidate would contain.
void main() {
  final package = _packageDirectory();
  final forbidden = <String>[];
  for (final file in package.listSync(recursive: true).whereType<File>()) {
    final relative = file.path.substring(package.path.length + 1);
    if (relative.startsWith('.dart_tool/') ||
        (relative.startsWith('web/') && relative.endsWith('.js.map'))) {
      continue; // excluded by the candidate archive manifest
    }
    if (relative.startsWith('.dart_tool/') ||
        (relative.startsWith('web/') && relative.endsWith('.js.map')) ||
        relative.startsWith('build/') ||
        relative.startsWith('dist/') ||
        relative.endsWith('.wasm') ||
        relative.endsWith('.js.map')) {
      forbidden.add(relative);
    }
  }
  if (forbidden.isNotEmpty) {
    throw StateError('PLIB-11 archive contains generated output: ${forbidden.join(', ')}');
  }
  for (final required in ['LICENSE', 'README.md', 'pubspec.yaml', 'lib/pixeldart.dart']) {
    if (!File('${package.path}/$required').existsSync()) {
      throw StateError('PLIB-11 archive is missing $required');
    }
  }
  print('PLIB-11 archive manifest guard passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/lib/pixeldart.dart').existsSync()) return cwd;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/lib/pixeldart.dart').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
