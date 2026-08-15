import 'package:pixeldart/assets/importers/converter_command.dart';
import 'package:pixeldart/assets/importers/fbx_import_config.dart';

import 'converter_process.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

Future<void> main() async {
  final config = FbxImportConfig.recommended(
    assetId: 'room',
    converterId: 'missing-converter',
    converterVersion: '1.0.0',
  );
  final report = await runConverterProcess(
      spec: const ConverterCommandSpec.testOnly(
      converterId: 'missing-converter',
      executable: 'pixeldart-command-that-does-not-exist',
      versionArguments: ['--version'],
    ),
    config: config,
    sourcePath: 'room.fbx',
    outputPath: 'room.glb',
  );
  check(!report.evidence.passed, 'unavailable converter fails safely');
  check(
    report.evidence.diagnostics.single.code == 'CONVERTER_UNAVAILABLE',
    'unavailable converter has stable code',
  );
  print('RF-02 converter process contract passed.');
}
