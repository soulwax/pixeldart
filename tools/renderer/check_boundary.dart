import 'dart:io';

const String _rendererRoot = 'lib/rendering';
const Set<String> _webglAllowedPaths = {'lib/rendering/webgl'};
const String _generatedShaderFile =
    'lib/rendering/webgl/generated_shaders.dart';

final RegExp _importPattern = RegExp(
  r'''^\s*(?:import|export)\s+['"]([^'"]+)['"]''',
  multiLine: true,
);

final RegExp _glslMarkerPattern = RegExp(
  r'#version\s+\d+\s+es|void\s+main\s*\(\s*\)\s*\{',
);

void main() {
  final dir = Directory(_rendererRoot);
  if (!dir.existsSync()) {
    stderr.writeln('$_rendererRoot does not exist; nothing to check.');
    exit(0);
  }

  final violations = <String>[];
  for (final entity in dir.listSync(recursive: true)) {
    if (entity is! File || !entity.path.endsWith('.dart')) continue;
    final path = _slash(entity.path);
    final isWebglFile = _webglAllowedPaths.any(path.startsWith);
    final isGenerated = path == _generatedShaderFile;
    final source = entity.readAsStringSync();

    for (final match in _importPattern.allMatches(source)) {
      final target = match.group(1)!;
      violations.addAll(_checkImport(path, target, isWebglFile));
    }

    if (!isGenerated && _glslMarkerPattern.hasMatch(source)) {
      violations.add(
        '$path appears to embed raw shader source outside the generated file',
      );
    }
  }

  if (violations.isEmpty) {
    stdout.writeln('lib/rendering boundary check passed: no violations.');
    return;
  }

  stderr.writeln('lib/rendering boundary check failed:');
  for (final v in violations) {
    stderr.writeln('  $v');
  }
  exit(1);
}

List<String> _checkImport(String path, String target, bool isWebglFile) {
  final violations = <String>[];

  if (target.startsWith('package:pixeldart/') &&
      !target.startsWith('package:pixeldart/rendering/')) {
    violations.add('$path imports non-renderer package path "$target"');
  }

  if (target.startsWith('package:web/') && !isWebglFile) {
    violations.add('$path imports "$target" outside lib/rendering/webgl/**');
  }

  if (target.startsWith('dart:js_interop') && !isWebglFile) {
    violations.add('$path imports "$target" outside lib/rendering/webgl/**');
  }

  if (target.startsWith('package:pixeldart/rendering/webgl/') &&
      !isWebglFile) {
    violations.add(
      '$path imports backend path "$target" from outside webgl/**',
    );
  }

  return violations;
}

String _slash(String path) => path.replaceAll('\\', '/');
