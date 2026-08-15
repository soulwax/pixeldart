import 'dart:convert';
import 'dart:io';

/// PLIB-00 is deliberately an audit, not a migration. It freezes the current
/// package boundary so later facade work can be reviewed against facts.
void main() {
  final root = Directory.current.path.endsWith('/external/pixeldart')
      ? Directory.current.absolute
      : Directory('external/pixeldart').absolute;
  if (!root.existsSync()) {
    throw StateError('Pixeldart package root was not found');
  }
  final packageFiles = _dartFiles(Directory('${root.path}/lib'));
  final packageText = <String, String>{
    for (final file in packageFiles)
      _relative(root, file.path): file.readAsStringSync(),
  };
  final gameRoot = Directory(root.parent.parent.path);
  final gameFiles = <File>[
    ..._dartFiles(Directory('${gameRoot.path}/lib')),
    ..._dartFiles(Directory('${gameRoot.path}/web')),
  ];

  final deepImports = <String>[];
  final gameImportFiles = <String>[];
  for (final file in gameFiles) {
    final text = file.readAsStringSync();
    final imports = RegExp(
      '''package:pixeldart/([^'"]+)''',
    ).allMatches(text).map((match) => match.group(1)!).toSet();
    if (imports.isEmpty) continue;
    gameImportFiles.add(_relative(gameRoot, file.path));
    deepImports.addAll(
      imports.where(
        (path) => !{
          'pixeldart.dart',
          'pixeldart_advanced.dart',
          'pixeldart_testing.dart',
          'rendering/webgl/webgl2_renderer_factory.dart',
        }.contains(path),
      ),
    );
  }

  final publicExports = <String, List<String>>{
    'assets.dart': _exports(packageText['lib/assets.dart'] ?? ''),
    'rendering.dart': _exports(packageText['lib/rendering/rendering.dart'] ?? ''),
  };
  final dependencyNames = _dependencies(File('${root.path}/pubspec.yaml'));
  final packageWide = packageText.values.join('\n');
  final missingGovernance = [
    'CHANGELOG.md',
    'CONTRIBUTING.md',
    'CODE_OF_CONDUCT.md',
    'SECURITY.md',
  ].where((name) => !File('${root.path}/$name').existsSync()).toList();
  final findings = <Map<String, Object?>>[];
  void finding(String id, String kind, String detail, {String? path}) {
    findings.add({
      'id': id,
      'kind': kind,
      'detail': detail,
      if (path != null) 'path': path,
    });
  }

  if (packageWide.contains('package:quarantine/')) {
    finding('boundary.game-import', 'error', 'Pixeldart imports game code');
  }
  for (final path in deepImports.toSet().toList()..sort()) {
    if (!path.startsWith('rendering/')) continue;
    finding('host.deep-import', 'host-adapter', 'Game imports internal Pixeldart path', path: path);
  }
  for (final file in packageFiles) {
    final relative = _relative(root, file.path);
    final text = packageText[relative]!;
    if (text.contains("import 'dart:io'")) {
      finding('package.dart-io', 'implementation', 'Filesystem/process API in package library', path: relative);
    }
    if (text.contains("import 'package:web/web.dart'")) {
      finding('package.dom', 'advanced-api', 'Browser DOM/WebGL adapter', path: relative);
    }
    if (RegExp(r'\b(HttpClient|WebSocket|fetch\s*\()').hasMatch(text)) {
      finding('package.network', 'implementation', 'Network call token in package library', path: relative);
    }
  }
  for (final noun in ['quarantine', 'house', 'story', 'visitor', 'save']) {
    if (packageWide.toLowerCase().contains(noun)) {
      finding('package.game-vocabulary', 'documentation', 'Game-specific noun appears in package source', path: noun);
    }
  }
  for (final file in missingGovernance) {
    finding('governance.missing', 'governance', 'Expected governance file is absent', path: file);
  }

  final result = <String, Object?>{
    'schema': 'pixeldart-plib00-audit-v1',
    'package': {
      'path': _relative(gameRoot, root.path),
      'version': _pubspecVersion(File('${root.path}/pubspec.yaml')),
      'publishTo': _pubspecValue(File('${root.path}/pubspec.yaml'), 'publish_to'),
      'licenseFile': File('${root.path}/LICENSE').existsSync(),
      'dependencies': dependencyNames,
      'publicExports': publicExports,
      'libraryCount': packageFiles.length,
    },
    'host': {
      'gameImportFiles': gameImportFiles..sort(),
      'deepImports': deepImports.toSet().toList()..sort(),
    },
    'missingGovernance': missingGovernance,
    'findings': findings..sort((a, b) => (a['id'] as String).compareTo(b['id'] as String)),
    'boundary': {
      'importsGameCode': packageWide.contains('package:quarantine/'),
      'hasNetworkCalls': findings.any((item) => item['id'] == 'package.network'),
      'hasFilesystemLibraries': findings.any((item) => item['id'] == 'package.dart-io'),
    },
  };
  stdout.writeln(const JsonEncoder.withIndent('  ').convert(result));
  stdout.writeln('\n# PLIB-00 audit\n');
  stdout.writeln('- Pixeldart libraries: ${packageFiles.length}');
  stdout.writeln('- Host files importing Pixeldart: ${gameImportFiles.length}');
  stdout.writeln('- Host deep imports: ${deepImports.toSet().length}');
  stdout.writeln('- Dependencies: ${dependencyNames.join(', ')}');
  stdout.writeln('- Findings: ${findings.length}');
  if (packageWide.contains('package:quarantine/')) {
    throw StateError('PLIB-00 failed: Pixeldart imports package:quarantine');
  }
  stdout.writeln('PLIB-00 package neutrality audit passed.');
}

List<File> _dartFiles(Directory directory) => directory.existsSync()
    ? (directory.listSync(recursive: true).whereType<File>()
        .where((file) => file.path.endsWith('.dart')).toList()
      ..sort((a, b) => a.path.compareTo(b.path)))
    : <File>[];

String _relative(Directory root, String path) {
  final prefix = '${root.path}/';
  return path.startsWith(prefix) ? path.substring(prefix.length) : path;
}

List<String> _exports(String text) => (RegExp(r"export '([^']+)'"))
    .allMatches(text).map((match) => match.group(1)!).toList()..sort();

List<String> _dependencies(File pubspec) {
  if (!pubspec.existsSync()) return const [];
  final lines = pubspec.readAsLinesSync();
  final names = <String>[];
  var inDependencies = false;
  for (final line in lines) {
    if (line == 'dependencies:') {
      inDependencies = true;
      continue;
    }
    if (inDependencies && line.isNotEmpty && !line.startsWith(' ')) break;
    if (inDependencies) {
      final match = RegExp(r'^  ([a-zA-Z0-9_]+):').firstMatch(line);
      if (match != null) names.add(match.group(1)!);
    }
  }
  return names..sort();
}

String? _pubspecValue(File file, String key) {
  if (!file.existsSync()) return null;
  for (final line in file.readAsLinesSync()) {
    final match = RegExp(r'^' + key + r': (.+)$').firstMatch(line);
    if (match != null) return match.group(1);
  }
  return null;
}

String? _pubspecVersion(File file) => _pubspecValue(file, 'version');
