import 'dart:typed_data';

import 'package:pixeldart/rendering/passes/texture_array_group.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';

import 'fake_gpu_device.dart';

void main() {
  _testTextureArrayGroup();
  print('Texture array group tests passed.');
}

void _testTextureArrayGroup() {
  final device = FakeGpuDevice();
  final group = TextureArrayGroup(
    id: 'materials',
    width: 16,
    height: 16,
    maxLayers: 4,
    device: device,
  );

  assert(group.layerCount == 0);
  assert(!group.isFull);

  final pixels = Uint8List(16 * 16 * 4);

  final layer0 = group.allocateLayer(101, pixels);
  assert(layer0 == 0);
  assert(group.layerCount == 1);
  assert(group.layerOf(101) == 0);

  // Allocating same texture ID again returns existing layer
  final layer0Again = group.allocateLayer(101, pixels);
  assert(layer0Again == 0);
  assert(group.layerCount == 1);

  final layer1 = group.allocateLayer(102, pixels);
  final layer2 = group.allocateLayer(103, pixels);
  final layer3 = group.allocateLayer(104, pixels);

  assert(layer1 == 1);
  assert(layer2 == 2);
  assert(layer3 == 3);
  assert(group.isFull);

  // Exceeding capacity throws StateError
  var threw = false;
  try {
    group.allocateLayer(105, pixels);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'exceeding maxLayers must throw');

  group.finalize();
  final encoder = DeviceDrawCommandEncoder(device);
  group.bind(encoder, 2);

  group.dispose();
  assert(group.layerCount == 0);
}
