import 'dart:io';

/// Ensures the neutral browser example does not drift into game/bootstrap code.
void main() {
  final package = _packageDirectory();
  final source = File('${package.path}/web/minimal/main.dart').readAsStringSync();
  for (final forbidden in ['package:quarantine/', 'fbx_', 'story', 'house']) {
    final matches = forbidden == 'story' || forbidden == 'house'
        ? RegExp(r'\b' + forbidden + r'\b', caseSensitive: false).hasMatch(source)
        : source.toLowerCase().contains(forbidden);
    if (matches) {
      throw StateError('minimal host contains forbidden dependency: $forbidden');
    }
  }
  for (final required in [
    'pixeldart_advanced.dart',
    'webgl2_renderer_factory.dart',
    'data-renderer-first-frame',
    'webglcontextrestored',
  ]) {
    if (!source.contains(required)) {
      throw StateError('minimal host is missing lifecycle contract: $required');
    }
  }
  print('PLIB-07 minimal-host guard passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/web/minimal/main.dart').existsSync()) return cwd;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/web/minimal/main.dart').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
