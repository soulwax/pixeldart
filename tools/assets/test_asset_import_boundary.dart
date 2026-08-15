import 'dart:io';

/// RF-00 dependency direction gate.
///
/// Run from the repository root. Tooling is allowed to use `dart:io`; files
/// under `external/pixeldart/lib` are not. The game may invoke Pixeldart, but
/// Pixeldart must never depend on the game package.
void main() {
  final root = Directory.current;
  final pixeldart = Directory('${root.path}/external/pixeldart');
  if (!pixeldart.existsSync()) {
    stderr.writeln('run this gate from the repository root');
    exitCode = 64;
    return;
  }

  final violations = <String>[];
  for (final entity in pixeldart.listSync(recursive: true)) {
    if (entity is! File || !entity.path.endsWith('.dart')) continue;
    final relative = entity.path.substring(root.path.length + 1);
    final text = entity.readAsStringSync();
    if (RegExp(r'''import\s+['"]package:quarantine/''').hasMatch(text)) {
      violations.add('$relative imports package:quarantine');
    }
    if (relative.startsWith('external/pixeldart/lib/') &&
        text.contains("import 'dart:io'")) {
      violations.add('$relative imports dart:io from a browser library');
    }
  }

  for (final directory in ['web']) {
    final target = Directory('${root.path}/$directory');
    if (!target.existsSync()) continue;
    for (final entity in target.listSync(recursive: true)) {
      if (entity is! File || !entity.path.endsWith('.dart')) continue;
      final text = entity.readAsStringSync();
      if (text.contains('fbx_pipeline.dart') ||
          text.contains('fbx_normalize.dart') ||
          text.contains('AssetConverter')) {
        violations.add(
          '${entity.path.substring(root.path.length + 1)} imports offline conversion code',
        );
      }
    }
  }

  for (final relative in [
    'external/pixeldart/lib/assets.dart',
    'external/pixeldart/lib/assets/assets.dart',
    'external/pixeldart/lib/assets/importers/fbx_import_config.dart',
    'external/pixeldart/lib/assets/packages/model_package.dart',
    'external/pixeldart/lib/assets/packages/model_package_loader.dart',
    'external/pixeldart/lib/rendering/assets/model_scene_binding.dart',
  ]) {
    if (!File('${root.path}/$relative').existsSync()) {
      violations.add('$relative is missing');
    }
  }

  if (violations.isNotEmpty) {
    stderr.writeln('RF-00 asset boundary violations:');
    for (final violation in violations) {
      stderr.writeln('- $violation');
    }
    exitCode = 1;
    return;
  }
  stdout.writeln('RF-00 asset boundary: PASS');
}
