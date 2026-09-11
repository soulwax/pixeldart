import 'package:pixeldart/rendering/core/instance_transforms.dart';
import 'package:pixeldart/rendering/math/transform.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void main() {
  _testInstanceBufferStream();
  _testVertexAttribDivisor();
  print('Instanced buffer streaming tests passed.');
}

void _testInstanceBufferStream() {
  final stream = InstanceBufferStream(initialCapacity: 4);
  assert(stream.capacity == 4);
  assert(stream.activeCount == 0);

  final t1 = Transform.at(const Vec3(1, 2, 3));
  final t2 = Transform.at(const Vec3(4, 5, 6));
  final t3 = Transform.at(const Vec3(7, 8, 9));

  stream.packTransforms([t1, t2, t3]);
  assert(stream.activeCount == 3);
  assert(stream.activeModels.length == 3 * 16);
  assert(stream.activeNormals.length == 3 * 16);

  // Check translation components in model matrices
  assert(stream.activeModels[12] == 1.0 && stream.activeModels[13] == 2.0 && stream.activeModels[14] == 3.0);
  assert(stream.activeModels[28] == 4.0 && stream.activeModels[29] == 5.0 && stream.activeModels[30] == 6.0);
  assert(stream.activeModels[44] == 7.0 && stream.activeModels[45] == 8.0 && stream.activeModels[46] == 9.0);

  // Growth test
  final manyTransforms = List.generate(100, (i) => Transform.at(Vec3(i.toDouble(), 0, 0)));
  stream.packTransforms(manyTransforms);
  assert(stream.activeCount == 100);
  assert(stream.capacity >= 100);
  assert(stream.activeModels.length == 100 * 16);
  assert(stream.activeModels[99 * 16 + 12] == 99.0);

  // GPU upload simulation using FakeGpuDevice
  final fakeDevice = FakeGpuDevice();
  final fakeBuf = fakeDevice.createBuffer(
    const GpuBufferDescriptor(
      byteLength: 100 * 16 * 4,
      usage: GpuBufferUsage.dynamicDraw,
    ),
  );
  stream.uploadModelsToGpu(fakeDevice, fakeBuf);
  assert(fakeDevice.bufferUploadCalls == 1);
  assert(fakeDevice.uploadedBufferData.values.first.length == 100 * 16);
}

void _testVertexAttribDivisor() {
  final device = FakeGpuDevice();
  final vao = device.createVertexArray();
  device.bindVertexArray(vao);
  device.enableVertexAttribArray(5);
  device.vertexAttribDivisor(5, 1);
  device.vertexAttribDivisor(6, 1);
  device.vertexAttribDivisor(7, 1);
  device.vertexAttribDivisor(8, 1);

  assert(device.drawLog.contains('vertexAttribDivisor(5, 1)'));
  assert(device.drawLog.contains('vertexAttribDivisor(6, 1)'));
  assert(device.drawLog.contains('vertexAttribDivisor(7, 1)'));
  assert(device.drawLog.contains('vertexAttribDivisor(8, 1)'));
}
