import 'dart:io';

/// Verifies that the standalone example is self-contained and does not bundle
/// unreviewed media. Its geometry/material samples are generated in Dart.
void main() {
  final package = _packageDirectory();
  if (!File('${package.path}/LICENSE').existsSync()) {
    throw StateError('Pixeldart LICENSE is missing');
  }
  final demo = Directory('${package.path}/web/renderer_test');
  if (!demo.existsSync()) throw StateError('standalone renderer demo is missing');
  final media = demo
      .listSync(recursive: true)
      .whereType<File>()
      .where((file) => RegExp(r'\.(png|jpg|jpeg|webp|gif|ogg|wav|glb|gltf|fbx)$', caseSensitive: false).hasMatch(file.path));
  final paths = media.map((file) => file.path).toList();
  if (paths.isNotEmpty) {
    throw StateError('standalone demo contains unreviewed media: ${paths.join(', ')}');
  }
  print('PLIB-05 standalone sample-asset audit passed.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/lib/pixeldart.dart').existsSync()) return cwd;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/lib/pixeldart.dart').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
