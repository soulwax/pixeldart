import 'fbx_import_config.dart';

/// Pure description of a pinned converter invocation.
final class ConverterCommandSpec {
  final String converterId;
  final String executable;
  final List<String> versionArguments;

  const ConverterCommandSpec._({
    required this.converterId,
    required this.executable,
    required this.versionArguments,
  });

  /// Test-only construction for process failure fixtures.
  const ConverterCommandSpec.testOnly({
    required String converterId,
    required String executable,
    required List<String> versionArguments,
  }) : this._(
         converterId: converterId,
         executable: executable,
         versionArguments: versionArguments,
       );

  static ConverterCommandSpec? forConfig(FbxImportConfig config) {
    return switch (config.converterId) {
      'assimp-cli' => const ConverterCommandSpec._(
        converterId: 'assimp-cli',
        executable: 'assimp',
        versionArguments: ['version'],
      ),
      'blender-headless' => const ConverterCommandSpec._(
        converterId: 'blender-headless',
        executable: 'blender',
        versionArguments: ['--version'],
      ),
      _ => null,
    };
  }

  List<String> arguments({
    required String sourcePath,
    required String outputPath,
    required String animationPolicy,
  }) {
    if (converterId == 'assimp-cli') {
      return ['export', sourcePath, outputPath];
    }
    return [
      '-b',
      '--python',
      'tools/assets/fbx_blender_export.py',
      '--',
      '--source',
      sourcePath,
      '--out',
      outputPath,
      '--export-animations',
      animationPolicy == 'bake-glb-clips' ? 'true' : 'false',
    ];
  }

  String expectedVersion(String configuredVersion) =>
      configuredVersion.split('.').take(2).join('.');

  bool versionMatches(String configuredVersion, String observedOutput) =>
      observedOutput.contains(expectedVersion(configuredVersion));
}
