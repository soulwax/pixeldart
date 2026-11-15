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
  check(
    validateModelPackagePayloads(
      first.manifest,
      first.payloads,
      verifyQmesh: true,
      verifyPackageHash: true,
      verifyBounds: true,
    ).isEmpty,
    'extended payload/QMSH/bounds/hash validation passes',
  );

  // Verify explicit 'default' material name and mixed unassigned+assigned faces.
  final mixedScene = parseObj('''
v 0 0 0
v 1 0 0
v 0 0 1
v 0 1 0
f 1 2 3
usemtl default
f 1 2 4
''');
  final mixedMaterials = parseMtl('newmtl default\nKd 0.5 0.6 0.7\nmap_Kd textures/a.png');
  final mixedPkg = ObjModelPackageEmitter.emit(
    assetId: 'mixed-cube',
    scene: mixedScene,
    materials: mixedMaterials,
  );
  check(mixedPkg.manifest.parts.length == 2, 'unassigned and explicit default material both emit');
  check(mixedPkg.payloads.length == 2, 'both QMSH parts emitted');
  check(
    validateModelPackagePayloads(
      mixedPkg.manifest,
      mixedPkg.payloads,
      verifyQmesh: true,
      verifyPackageHash: true,
      verifyBounds: true,
      availableSidecars: const {'textures/a.png'},
    ).isEmpty,
    'mixed OBJ package + sidecars validate cleanly',
  );
  check(
    validateModelPackagePayloads(
      mixedPkg.manifest,
      mixedPkg.payloads,
      availableSidecars: const {},
    ).any((d) => d.code == 'MODEL_PACKAGE_TEXTURE_MISSING'),
    'missing texture sidecar is diagnosed',
  );

  final invertedBounds = ModelPackageManifest(
    assetId: 'bad-bounds',
    packageHash: '0' * 64,
    sourceFormat: 'obj',
    materials: const ['default'],
    parts: first.manifest.parts,
    combinedBounds: const [2, 0, 0, 1, 1, 1],
  );
  check(
    invertedBounds.validate().any((e) => e.contains('min must not exceed max')),
    'inverted combinedBounds rejected',
  );

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
