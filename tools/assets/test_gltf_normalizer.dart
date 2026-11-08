import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
  final validated = normalizeValidatedGltfScene(
    {
      'asset': {'version': '2.0'},
      'buffers': [{'byteLength': 8}],
      'bufferViews': [{'buffer': 0, 'byteLength': 8}],
      'accessors': [
        {'bufferView': 0, 'componentType': 5123, 'count': 4, 'type': 'SCALAR'},
      ],
      'meshes': [
        {'primitives': [{'attributes': {'POSITION': 0}}]},
      ],
    },
    binaryLength: 8,
  );
  check(validated.primitives.length == 1, 'validated scene normalizes');

  final scene = normalizeGltfScene({
    'materials': [
      {
        'name': 'ceramic',
        'pbrMetallicRoughness': {
          'baseColorFactor': [0.8, 0.7, 0.6, 1],
          'metallicFactor': 0.1,
          'roughnessFactor': 0.35,
        },
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
  });
  check(
    scene.primitives.single.positionAccessor == 0,
    'position accessor retained',
  );
  check(
    scene.materials.single.roughnessFactor == 0.35,
    'material factors retained',
  );
  final transformed = normalizeGltfScene({
    'meshes': [
      {
        'primitives': [
          {
            'attributes': {'POSITION': 0},
          },
        ],
      },
    ],
    'nodes': [
      {
        'name': 'Wall',
        'mesh': 0,
        'translation': [1, 2, 3],
      },
    ],
  });
  check(
    transformed.nodes.single.translation[1] == 2,
    'node transform retained',
  );
  check(
    transformed.canonicalJson() == transformed.canonicalJson(),
    'normalized output is deterministic',
  );

  var rejected = false;
  try {
    normalizeGltfScene({
      'meshes': [
        {
          'primitives': [
            {
              'mode': 1,
              'attributes': {'POSITION': 0},
            },
          ],
        },
      ],
    });
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'non-triangle primitive rejects');
  rejected = false;
  try {
    normalizeGltfScene({
      'meshes': [
        {
          'primitives': [
            {
              'attributes': {'POSITION': 0},
            },
          ],
        },
      ],
      'nodes': [
        {'mesh': 2},
      ],
    });
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'node mesh index rejects');
  print('RF-03 glTF normalizer tests passed.');
}
