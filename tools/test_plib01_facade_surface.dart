import 'dart:io';

/// Keeps stable/advanced/testing facade responsibilities explicit.
void main() {
  final package = _packageDirectory();
  final stable = File('${package.path}/lib/pixeldart.dart').readAsStringSync();
  final advanced = File('${package.path}/lib/pixeldart_advanced.dart').readAsStringSync();
  final testing = File('${package.path}/lib/pixeldart_testing.dart').readAsStringSync();
  if (stable.contains('package:web') || stable.contains('webgl2_device.dart')) {
    throw StateError('stable facade exposes browser implementation');
  }
  if (stable.contains('model_cache.dart')) {
    throw StateError('stable facade exposes concrete cache');
  }
  if (advanced.contains('model_cache.dart')) {
    throw StateError('advanced facade exposes concrete cache');
  }
  if (!testing.contains('model_cache.dart')) {
    throw StateError('testing facade lost cache fixture seam');
  }
  print('PLIB-01 facade surface guard passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/lib/pixeldart.dart').existsSync()) return cwd;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/lib/pixeldart.dart').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
