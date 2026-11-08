import 'dart:io';

/// Checks relative Markdown links in the package without network access.
void main() {
  final package = _packageDirectory();
  // README evidence intentionally points at the parent project's browser
  // captures; package-local documentation must be self-contained.
  final files = <File>[
    ...Directory('${package.path}/docs')
        .listSync(recursive: true)
        .whereType<File>()
        .where((file) => file.path.endsWith('.md')),
  ];
  final broken = <String>[];
  final linkPattern = RegExp(r'!?\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)');
  for (final file in files) {
    final text = file.readAsStringSync();
    for (final match in linkPattern.allMatches(text)) {
      final target = match.group(1)!;
      if (target.startsWith('#') ||
          target.startsWith('http://') ||
          target.startsWith('https://') ||
          target.startsWith('mailto:')) {
        continue;
      }
      final path = target.split('#').first;
      if (path.isEmpty) continue;
      final resolved = File.fromUri(Uri.file(file.parent.path).resolve(path));
      if (!resolved.existsSync() && !Directory(resolved.path).existsSync()) {
        broken.add('${file.path}:$target');
      }
    }
  }
  if (broken.isNotEmpty) {
    throw StateError('PLIB-05 broken documentation links: ${broken.join(', ')}');
  }
  print('PLIB-05 documentation links passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/README.md').existsSync() &&
      File('${cwd.path}/pubspec.yaml').existsSync() &&
      File('${cwd.path}/lib/pixeldart.dart').existsSync()) {
    return cwd;
  }
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/README.md').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
