import 'dart:io';

/// Regression guard for public Pixeldart vocabulary. Renderer implementation
/// may use domain-neutral terms such as `history`; game nouns must not appear
/// as standalone words in public library source.
void main() {
  final package = _packageDirectory();
  final files = Directory('${package.path}/lib')
      .listSync(recursive: true)
      .whereType<File>()
      .where((file) => file.path.endsWith('.dart'));
  const forbidden = ['quarantine', 'house', 'story', 'visitor', 'mantle', 'shutter'];
  final violations = <String>[];
  for (final file in files) {
    final text = file.readAsStringSync();
    for (final noun in forbidden) {
      if (RegExp(r'\b' + noun + r'\b', caseSensitive: false).hasMatch(text)) {
        violations.add('${file.path}:$noun');
      }
    }
  }
  if (violations.isNotEmpty) {
    throw StateError('PLIB-05 vocabulary violations: ${violations.join(', ')}');
  }
  print('PLIB-05 vocabulary guard passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/lib/pixeldart.dart').existsSync()) return cwd;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/lib/pixeldart.dart').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
