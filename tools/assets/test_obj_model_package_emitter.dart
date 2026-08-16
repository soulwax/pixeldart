import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

Future<void> main() async {
  final scene = parseObj('''
v 0 0 0
v 1 0 0
v 0 1 0
usemtl ceramic
f 1 2 3
''');
  final materials = parseMtl('newmtl ceramic\nKd 0.8 0.7 0.6');
  final first = ObjModelPackageEmitter.emit(
    assetId: 'porcelain-mermaid',
    scene: scene,
    materials: materials,
  );
  final second = ObjModelPackageEmitter.emit(
    assetId: 'porcelain-mermaid',
    scene: scene,
    materials: materials,
  );
  check(first.manifest.validate().isEmpty, 'manifest validates');
  check(first.manifest.packageHash == second.manifest.packageHash, 'hash stable');
  check(first.payloads.keys.join() == 'mesh-000.qmesh', 'payload path is neutral');
  final loaded = await const ModelPackageLoader().load(
    ModelPackageSource(
      manifest: first.manifest,
      load: (path) async => Uint8List.fromList(first.payloads[path]!),
    ),
    limits: const ModelPackageLimits(requireQmeshPayloads: true),
  );
  check(loaded.payloads.length == 1, 'package loader validates payload');
  var rejected = false;
  try {
    await const ModelPackageLoader().load(
      ModelPackageSource(
        manifest: first.manifest,
        load: (_) async => Uint8List.fromList([1, 2, 3]),
      ),
      limits: const ModelPackageLimits(requireQmeshPayloads: true),
    );
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'strict runtime loader rejects malformed geometry');
  print('OBJ model package emitter tests passed.');
}
