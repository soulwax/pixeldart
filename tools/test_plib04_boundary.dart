import 'dart:io';

/// Static guard for the PLIB-04 runtime boundary. This intentionally checks
/// source text rather than importing browser code, so it remains runnable on
/// the Dart VM and catches accidental reintroduction of game-specific paths.
void main() {
  final package = _packageDirectory();
  final project = Directory('${package.path}/../..');
  final browserHost = File('${project.path}/web/main.dart').readAsStringSync();
  final advanced = File('${package.path}/lib/pixeldart_advanced.dart').readAsStringSync();
  final testing = File('${package.path}/lib/pixeldart_testing.dart').readAsStringSync();

  for (final token in [
    'fbx_diagnostic_controller.dart',
    'fbx_runtime_package.dart',
    'fbx_scene_binding.dart',
    'data-renderer-fbx-diagnostics',
  ]) {
    if (browserHost.contains(token)) {
      throw StateError('PLIB-04 browser boundary contains forbidden token: $token');
    }
  }
  if (advanced.contains("rendering/assets/model_cache.dart")) {
    throw StateError('PLIB-04 advanced facade must not export ModelCache');
  }
  if (!testing.contains("rendering/assets/model_cache.dart")) {
    throw StateError('PLIB-04 testing facade must retain the cache fixture seam');
  }
  print('PLIB-04 boundary guard passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/lib/pixeldart_advanced.dart').existsSync()) return cwd;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/lib/pixeldart_advanced.dart').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
