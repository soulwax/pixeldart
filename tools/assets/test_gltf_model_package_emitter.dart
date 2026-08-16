import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

Map<String, dynamic> fixtureDocument() => {
  'asset': {'version': '2.0'},
  'buffers': [{'byteLength': 102}],
  'bufferViews': [
    {'buffer': 0, 'byteOffset': 0, 'byteLength': 36},
    {'buffer': 0, 'byteOffset': 36, 'byteLength': 36},
    {'buffer': 0, 'byteOffset': 72, 'byteLength': 24},
    {'buffer': 0, 'byteOffset': 96, 'byteLength': 6},
  ],
  'accessors': [
    {'bufferView': 0, 'componentType': 5126, 'count': 3, 'type': 'VEC3'},
    {'bufferView': 1, 'componentType': 5126, 'count': 3, 'type': 'VEC3'},
    {'bufferView': 2, 'componentType': 5126, 'count': 3, 'type': 'VEC2'},
    {'bufferView': 3, 'componentType': 5123, 'count': 3, 'type': 'SCALAR'},
  ],
  'materials': [
    {
      'name': 'ceramic',
      'pbrMetallicRoughness': {'baseColorFactor': [0.8, 0.7, 0.6, 1]},
    },
  ],
  'meshes': [
    {
      'primitives': [
        {
          'attributes': {'POSITION': 0, 'NORMAL': 1, 'TEXCOORD_0': 2},
          'indices': 3,
          'material': 0,
        },
      ],
    },
  ],
};

Uint8List fixtureBinary() {
  final bytes = Uint8List(102);
  final view = ByteData.sublistView(bytes);
  const positions = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0];
  const normals = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0];
  const uvs = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0];
  var offset = 0;
  for (final value in [...positions, ...normals, ...uvs]) {
    view.setFloat32(offset, value, Endian.little);
    offset += 4;
  }
  for (final value in [0, 1, 2]) {
    view.setUint16(offset, value, Endian.little);
    offset += 2;
  }
  return bytes;
}

Future<void> main() async {
  final document = fixtureDocument();
  final binary = fixtureBinary();
  final gltf = GltfModelPackageEmitter.emit(
    assetId: 'gltf-fixture',
    document: document,
    binary: binary,
    sourceFormat: 'gltf',
  );
  final glb = GltfModelPackageEmitter.emit(
    assetId: 'gltf-fixture',
    document: document,
    binary: binary,
    sourceFormat: 'glb',
  );
  check(gltf.manifest.schema == glb.manifest.schema, 'glTF and GLB schema matches');
  check(gltf.manifest.parts.length == 1 && glb.manifest.parts.length == 1, 'one part emitted');
  check(gltf.manifest.packageHash != glb.manifest.packageHash, 'provenance affects hash');
  for (final package in [gltf, glb]) {
    final loaded = await const ModelPackageLoader().load(
      ModelPackageSource(
        manifest: package.manifest,
        load: (path) async => package.payloads[path]!,
      ),
      limits: const ModelPackageLimits(requireQmeshPayloads: true),
    );
    check(loaded.payloads.length == 1, 'strict package load succeeds');
  }
  print('glTF/GLB model package emitter tests passed.');
}
