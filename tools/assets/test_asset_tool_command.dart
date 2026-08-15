import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
  final package = AssetToolCommand.parse([
    'package',
    'assets-src/fbx/living-room',
    '--out',
    '/tmp/review',
  ]);
  check(package?.subcommand == AssetToolSubcommand.package, 'package parses');
  check(package?.arguments.last == '/tmp/review', 'output path is retained');

  final init = AssetToolCommand.parse([
    'init',
    'living-room',
    'assimp-cli',
    '6.0.0',
    'import.json',
  ]);
  check(init?.subcommand == AssetToolSubcommand.init, 'init parses');
  check(
    AssetToolCommand.parse(['package', 'room']) == null,
    'bad shape rejects',
  );
  check(AssetToolCommand.usage.contains('preflight'), 'usage is complete');
  const invocation = ConverterInvocationResult(
    converterId: 'assimp-cli',
    requestedVersion: '6.0.0',
    observedVersion: '6.0.0',
    exitCode: 0,
  );
  check(invocation.passed, 'successful converter evidence passes');
  check(
    invocation.toJson()['diagnostics'] is List,
    'converter evidence is machine-readable',
  );
  final spec = ConverterCommandSpec.forConfig(
    FbxImportConfig.recommended(
      assetId: 'living-room',
      converterId: 'assimp-cli',
      converterVersion: '6.0.0',
    ),
  );
  check(spec?.executable == 'assimp', 'assimp identity resolves');
  check(
    spec
            ?.arguments(
              sourcePath: 'room.fbx',
              outputPath: 'room.glb',
              animationPolicy: 'reject-skinned-input',
            )
            .join(' ') ==
        'export room.fbx room.glb',
    'assimp arguments are deterministic',
  );
  check(
    spec?.versionMatches('6.0.0', 'Assimp version 6.0.0') == true,
    'version probe matches configured major/minor',
  );
  print('RF-02 asset command contract passed.');
}
