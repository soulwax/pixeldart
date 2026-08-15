import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

Future<void> main() async {
  final emitted = ModelPackageEmitter.emit(
    assetId: 'room',
    sourceFormat: 'gltf',
    scene: normalizeGltfScene({
      'meshes': [
        {
          'primitives': [
            {
              'attributes': {'POSITION': 0},
            },
          ],
        },
      ],
    }),
    payloads: {
      'primitive-000.qmesh': Uint8List.fromList([4, 5, 6]),
    },
  );
  final loaded = await const ModelPackageLoader().load(
    ModelPackageSource(
      manifest: emitted.manifest,
      load: (path) async => emitted.payloads[path]!,
    ),
  );
  check(
    loaded.payload('primitive-000.qmesh').first == 4,
    'loader retains payload',
  );
  final sourceBytes = emitted.payloads['primitive-000.qmesh']!;
  sourceBytes[0] = 99;
  check(
    loaded.payload('primitive-000.qmesh').first == 4,
    'loader owns a payload copy',
  );

  var rejected = false;
  try {
    await const ModelPackageLoader().load(
      ModelPackageSource(
        manifest: emitted.manifest,
        load: (path) async => Uint8List.fromList([0]),
      ),
    );
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'loader rejects payload hash mismatch');

  final unsafe = ModelPackageManifest(
    assetId: emitted.manifest.assetId,
    packageHash: emitted.manifest.packageHash,
    sourceFormat: emitted.manifest.sourceFormat,
    materials: emitted.manifest.materials,
    parts: [
      const ModelPackagePart(
        id: 'primitive-000',
        materialSlot: 0,
        lodFiles: {'LOD0': '../outside.qmesh'},
      ),
    ],
  );
  var rejectedUnsafe = false;
  try {
    await const ModelPackageLoader().load(
      ModelPackageSource(
        manifest: unsafe,
        load: (path) async => emitted.payloads[path]!,
      ),
    );
  } on FormatException {
    rejectedUnsafe = true;
  }
  check(rejectedUnsafe, 'loader rejects unsafe payload paths');

  var rejectedLimit = false;
  try {
    await const ModelPackageLoader().load(
      ModelPackageSource(
        manifest: emitted.manifest,
        load: (path) async => Uint8List.fromList([1, 2, 3]),
      ),
      limits: const ModelPackageLimits(maxPayloadBytes: 2, maxTotalBytes: 2),
    );
  } on FormatException {
    rejectedLimit = true;
  }
  check(rejectedLimit, 'loader enforces payload limits');

  var rejectedCount = false;
  try {
    final tooMany = ModelPackageManifest(
      assetId: emitted.manifest.assetId,
      packageHash: emitted.manifest.packageHash,
      sourceFormat: emitted.manifest.sourceFormat,
      materials: emitted.manifest.materials,
      parts: [
        ...emitted.manifest.parts,
        const ModelPackagePart(
          id: 'primitive-001',
          materialSlot: 0,
          lodFiles: {'LOD0': 'second.qmesh'},
        ),
      ],
    );
    await const ModelPackageLoader().load(
      ModelPackageSource(
        manifest: tooMany,
        load: (path) async => emitted.payloads[path]!,
      ),
      limits: const ModelPackageLimits(maxParts: 1, maxPayloadCount: 1),
    );
  } on FormatException {
    rejectedCount = true;
  }
  check(rejectedCount, 'loader enforces structural count limits');
  print('RF-05 model package loader tests passed.');
}
