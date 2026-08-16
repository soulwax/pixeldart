import 'dart:io';

void main() {
  final package = _packageDirectory();
  final expected = <String, Set<String>>{
    'pixeldart.dart': {
      'rendering/api/renderer.dart',
      'rendering/assets/model_scene_binding.dart',
      'assets/packages/model_package_loader.dart',
    },
    'pixeldart_advanced.dart': {
      'rendering/rendering.dart',
      'rendering/api/renderer_factory.dart',
      'rendering/core/feature_installation_planner.dart',
      'rendering/assets/browser_promotion.dart',
    },
    'pixeldart_testing.dart': {
      'rendering/api/renderer.dart',
      'rendering/api/scene.dart',
      'rendering/assets/model_cache.dart',
    },
  };
  for (final entry in expected.entries) {
    final text = File('${package.path}/lib/${entry.key}').readAsStringSync();
    final actual = RegExp(r"export '([^']+)'")
        .allMatches(text)
        .map((match) => match.group(1)!)
        .toSet();
    if (!actual.containsAll(entry.value)) {
      throw StateError('${entry.key} is missing expected exports: ${entry.value.difference(actual)}');
    }
  }
  print('PLIB-10 facade API snapshot passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/lib/pixeldart.dart').existsSync()) return cwd;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/lib/pixeldart.dart').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
