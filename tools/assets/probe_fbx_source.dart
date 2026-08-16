import 'dart:io';
import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

import 'converter_process.dart';

/// Runs one explicit, offline FBX conversion and validates the resulting GLB
/// through the same bounded path used by all other source formats.
Future<void> main(List<String> arguments) async {
  if (arguments.length != 2) {
    stderr.writeln('usage: probe_fbx_source.dart SOURCE.FBX OUTPUT.GLB');
    exitCode = 64;
    return;
  }
  final config = FbxImportConfig.recommended(
    assetId: 'living-room',
    converterId: 'assimp-cli',
    converterVersion: '6.0.0',
  );
  final spec = ConverterCommandSpec.forConfig(config)!;
  final report = await runConverterProcess(
    spec: spec,
    config: config,
    sourcePath: arguments[0],
    outputPath: arguments[1],
  );
  if (!report.evidence.passed) {
    stderr.writeln(report.evidence.toJson());
    stderr.writeln(report.stderr);
    exitCode = 1;
    return;
  }
  final glb = GlbContainer.parse(Uint8List.fromList(File(arguments[1]).readAsBytesSync()));
  final scene = normalizeValidatedGltfScene(glb.json, binaryLength: glb.binary?.length);
  final package = GltfModelPackageEmitter.emit(
    assetId: 'living-room',
    document: glb.json,
    binary: glb.binary ?? (throw const FormatException('FBX bridge GLB has no BIN chunk')),
    sourceFormat: 'fbx',
  );
  stdout.writeln(
    'FBX evidence: converter=${report.evidence.converterId} '
    'version=${report.evidence.observedVersion} '
    'primitives=${scene.primitives.length} materials=${scene.materials.length} '
    'nodes=${scene.nodes.length} outputBytes=${File(arguments[1]).lengthSync()} '
    'packageHash=${package.manifest.packageHash} parts=${package.manifest.parts.length}',
  );
}
