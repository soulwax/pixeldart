import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void require(bool value, String message) {
  if (!value) throw StateError(message);
}

void main() {
  const part = ModelPackagePart(
    id: 'shell',
    materialSlot: 0,
    lodFiles: {'LOD0': 'shell.qmesh'},
  );
  final base = ModelPackageManifest(
    assetId: 'room',
    packageHash: 'a'.padRight(64, 'a'),
    sourceFormat: 'gltf',
    materials: ['default'],
    parts: [part],
  );
  final complete = ModelPackageManifest(
    assetId: base.assetId,
    packageHash: base.packageHash,
    sourceFormat: base.sourceFormat,
    materials: base.materials,
    parts: base.parts,
    provenance: {'licenseId': 'cc-by-4.0', 'sourceHash': 'b'.padRight(64, 'b')},
  );
  const gate = ModelPackageAuditGate();
  require(
    gate
        .evaluate(manifest: complete, payloads: {'shell.qmesh': Uint8List(3)})
        .passed,
    'complete evidence passes audit',
  );
  final missing = gate.evaluate(manifest: base, payloads: const {});
  require(
    !missing.passed &&
        missing.diagnostics.any(
          (item) => item.code == 'MODEL_PACKAGE_LICENSE',
        ) &&
        missing.diagnostics.any(
          (item) => item.code == 'MODEL_PACKAGE_MISSING_PAYLOAD',
        ),
    'missing evidence is rejected',
  );
  final extra = gate.evaluate(
    manifest: complete,
    payloads: {'shell.qmesh': Uint8List(3), 'unused.bin': Uint8List(1)},
  );
  require(
    extra.diagnostics.any((item) => item.code == 'MODEL_PACKAGE_EXTRA_PAYLOAD'),
    'undeclared payload is rejected',
  );
  print('RF-09 model package audit tests passed.');
}
