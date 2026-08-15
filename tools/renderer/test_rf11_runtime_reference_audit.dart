import 'dart:io';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

List<File> dartFiles(String path) => Directory(path)
    .listSync(recursive: true)
    .whereType<File>()
    .where((file) => file.path.endsWith('.dart'))
    .toList();

void main() {
  final pixeldartFiles = dartFiles('external/pixeldart/lib');
  final forbidden = <String>[];
  for (final file in pixeldartFiles) {
    final text = file.readAsStringSync();
    for (final symbol in [
      'FbxRuntimePackage',
      'FbxSceneBinding',
      'FbxDiagnosticController',
    ]) {
      if (text.contains(symbol)) forbidden.add('${file.path}: $symbol');
    }
    require(
      !text.contains('package:quarantine/'),
      '${file.path} imports the game',
    );
  }
  require(
    forbidden.isEmpty,
    'Pixeldart runtime contains source-specific symbols: $forbidden',
  );

  final rootFiles = [...dartFiles('lib'), ...dartFiles('web')];
  final sourceRefs = <String>[];
  for (final file in rootFiles) {
    final text = file.readAsStringSync();
    if (text.contains('FbxRuntimePackage') ||
        text.contains('FbxSceneBinding')) {
      sourceRefs.add(file.path);
    }
  }
  const expectedRefs = {
    'web/main.dart',
    'lib/engine/fbx_diagnostic_controller.dart',
    'lib/engine/fbx_scene_binding.dart',
    'lib/engine/fbx_runtime_package.dart',
  };
  require(
    sourceRefs.toSet().containsAll(expectedRefs) &&
        expectedRefs.containsAll(sourceRefs),
    'source-specific runtime references are spreading or disappearing unexpectedly',
  );

  final compatibility = File('lib/engine/fbx_runtime_package.dart');
  require(
    compatibility.existsSync(),
    'compatibility wrapper inventory changed unexpectedly',
  );
  print('RF-11 runtime reference audit passed.');
}
