import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
  final objScene = parseObj('''
v 0 0 0
v 1 0 0
v 0 1 0
usemtl ceramic
f 1 2 3
''');
  final objMaterial = parseMtl('newmtl ceramic\nKd 0.8 0.7 0.6');
  final obj = ObjModelPackageEmitter.emit(
    assetId: 'cross-source-fixture',
    scene: objScene,
    materials: objMaterial,
  );
  final gltfScene = normalizeGltfScene({
    'materials': [
      {
        'name': 'ceramic',
        'pbrMetallicRoughness': {
          'baseColorFactor': [0.8, 0.7, 0.6, 1],
        },
      },
    ],
    'meshes': [
      {
        'primitives': [
          {
            'attributes': {'POSITION': 0},
            'material': 0,
          },
        ],
      },
    ],
  });
  final payload = obj.payloads.values.single;
  final packages = [
    for (final format in ['gltf', 'glb', 'fbx'])
      ModelPackageEmitter.emit(
        assetId: 'cross-source-fixture',
        sourceFormat: format,
        scene: gltfScene,
        payloads: {'mesh-000.qmesh': Uint8List.fromList(payload)},
      ),
  ];
  for (final package in packages) {
    check(package.manifest.schema == obj.manifest.schema, 'schema is stable');
    check(package.manifest.parts.length == obj.manifest.parts.length, 'parts shape is stable');
    check(package.manifest.materials.join('|') == obj.manifest.materials.join('|'), 'material slots are stable');
    check(package.manifest.lods.join('|') == obj.manifest.lods.join('|'), 'LOD shape is stable');
    check(package.manifest.combinedBounds.isEmpty, 'generic fixture has no guessed bounds');
    check(package.manifest.sourceFormat != 'obj', 'source format remains provenance only');
  }
  print('Model package cross-source equivalence tests passed.');
}
