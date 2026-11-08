import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  final scene = normalizeGltfScene({
    'meshes': [
      {
        'primitives': [
          {
            'attributes': {'POSITION': 0},
          },
        ],
      },
    ],
  });
  final payloads = {
    'primitive-000.qmesh': Uint8List.fromList([1, 2, 3]),
  };
  final emitted = ModelPackageEmitter.emit(
    assetId: 'room',
    sourceFormat: 'gltf',
    scene: scene,
    payloads: payloads,
  );
  final approvedBase = ModelPackageManifest(
    assetId: emitted.manifest.assetId,
    packageHash: '0' * 64,
    sourceFormat: emitted.manifest.sourceFormat,
    parts: emitted.manifest.parts,
    materials: emitted.manifest.materials,
    provenance: const {'promotion': 'approved', 'runtimeProfile': 'runtime'},
  );
  final approved = ModelPackageManifest(
    assetId: approvedBase.assetId,
    packageHash: ModelPackageEmitter.computePackageHash(
      approvedBase,
      emitted.payloads,
    ),
    sourceFormat: approvedBase.sourceFormat,
    parts: approvedBase.parts,
    materials: approvedBase.materials,
    provenance: approvedBase.provenance,
  );
  final gate = const ModelPackagePromotionGate();
  final passed = gate.evaluate(manifest: approved, payloads: emitted.payloads);
  require(
    passed.passed && passed.payloadCount == 1,
    'approved package passes promotion',
  );

  final inspection = ModelPackageManifest(
    assetId: approved.assetId,
    packageHash: approved.packageHash,
    sourceFormat: approved.sourceFormat,
    parts: approved.parts,
    materials: approved.materials,
    provenance: const {
      'promotion': 'approved',
      'runtimeProfile': 'inspection-only',
    },
  );
  final rejectedInspection = gate.evaluate(
    manifest: inspection,
    payloads: emitted.payloads,
  );
  require(!rejectedInspection.passed, 'inspection-only package is rejected');

  final leaked = gate.evaluate(
    manifest: approved,
    payloads: {...emitted.payloads, 'source.glb': Uint8List(0)},
  );
  require(
    leaked.diagnostics.any(
      (diagnostic) => diagnostic.code == 'MODEL_PACKAGE_SOURCE_LEAK',
    ),
    'source payload leak is diagnosed',
  );
  for (final sourcePath in ['source.obj', 'materials.mtl']) {
    final sourceLeak = gate.evaluate(
      manifest: approved,
      payloads: {...emitted.payloads, sourcePath: Uint8List(0)},
    );
    require(
      sourceLeak.diagnostics.any(
        (diagnostic) => diagnostic.code == 'MODEL_PACKAGE_SOURCE_LEAK',
      ),
      '$sourcePath source payload leak is diagnosed',
    );
  }
  final missing = gate.evaluate(manifest: approved, payloads: const {});
  require(
    missing.diagnostics.any(
      (diagnostic) => diagnostic.code == 'MODEL_PACKAGE_PAYLOAD_MISSING',
    ),
    'missing declared payload is diagnosed',
  );
  final extra = gate.evaluate(
    manifest: approved,
    payloads: {...emitted.payloads, 'unlisted.qmesh': Uint8List(0)},
  );
  require(
    extra.diagnostics.any(
      (diagnostic) => diagnostic.code == 'MODEL_PACKAGE_PAYLOAD_UNDECLARED',
    ),
    'undeclared payload is diagnosed',
  );

  final changed = Uint8List.fromList(emitted.payloads['primitive-000.qmesh']!);
  changed[0] = 9;
  final tampered = gate.evaluate(
    manifest: approved,
    payloads: {'primitive-000.qmesh': changed},
  );
  require(
    tampered.diagnostics.any(
      (diagnostic) => diagnostic.code == 'MODEL_PACKAGE_PAYLOAD_HASH',
    ),
    'tampered payload is rejected',
  );
  print('RF-08 model package promotion tests passed.');
}
