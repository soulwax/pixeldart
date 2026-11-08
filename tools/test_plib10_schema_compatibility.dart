import 'dart:convert';

import 'package:pixeldart/assets/packages/model_package_manifest.dart';

void main() {
  final manifest = ModelPackageManifest(
    assetId: 'neutral-demo',
    packageHash: '0' * 64,
    sourceFormat: 'generated',
    parts: const [
      ModelPackagePart(
        id: 'part-0',
        materialSlot: 0,
        lodFiles: {'LOD0': 'meshes/part-0.qmesh'},
      ),
    ],
    materials: const ['default'],
    combinedBounds: const [-1, -1, -1, 1, 1, 1],
  );
  final decoded = ModelPackageManifest.fromJson(
    jsonDecode(manifest.canonicalJson()) as Map<String, dynamic>,
  );
  if (decoded.canonicalJson() != manifest.canonicalJson()) {
    throw StateError('model-package schema round-trip is not canonical');
  }
  try {
    ModelPackageManifest.fromJson({
      ...manifest.toJson(),
      'schema': 'pixeldart-model-package-v999',
    });
    throw StateError('unknown model-package schema was accepted');
  } on FormatException {
    // Expected compatibility rejection.
  }
  print('PLIB-10 schema compatibility fixture passed.');
}
