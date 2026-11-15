import 'package:pixeldart/rendering/api/handles.dart';
import 'package:pixeldart/rendering/api/scene.dart';
import 'package:pixeldart/rendering/core/batching.dart';
import 'package:pixeldart/rendering/math/bounds.dart';
import 'package:pixeldart/rendering/math/transform.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/webgl/instanced_stream.dart';

import 'fake_gpu_device.dart';

void main() {
  _testLargeBatchStreaming();
  _testInstancedAttributeStream();
  print('Instanced streaming past 16 cap tests passed.');
}

RetainedItemView _view(int slot, Vec3 translation) => _View(
  InstanceId(slot, 1),
  RetainedItemDescriptor(
    mesh: const MeshHandle(0, 1),
    material: const MaterialHandle(0, 1),
    transform: Transform.at(translation),
    instanceFamilyKey: 1,
  ),
  const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
);

final class _View implements RetainedItemView {
  @override
  final InstanceId id;
  @override
  final RetainedItemDescriptor descriptor;
  @override
  final Aabb worldBounds;
  const _View(this.id, this.descriptor, this.worldBounds);
}

void _testLargeBatchStreaming() {
  // Construct a batch of 1024 instances
  const count = 1024;
  final items = List.generate(count, (i) => _view(i, Vec3(i.toDouble(), 0, 0)));
  final batch = InstanceBatch(items.first, items);
  assert(batch.instanceCount == 1024);

  // Verify that chunking into maxInstanceCount chunks covers all 1024 instances
  var streamedTotal = 0;
  for (
    var offset = 0;
    offset < batch.instanceCount;
    offset += InstanceBatch.maxInstanceCount
  ) {
    final chunkSize = (batch.instanceCount - offset).clamp(
      0,
      InstanceBatch.maxInstanceCount,
    );
    final chunkMembers = batch.members.sublist(offset, offset + chunkSize);
    assert(chunkMembers.length == chunkSize);
    assert(chunkSize <= InstanceBatch.maxInstanceCount);
    streamedTotal += chunkSize;
  }
  assert(streamedTotal == 1024, 'All 1024 instances streamed without dropping');
}

void _testInstancedAttributeStream() {
  final device = FakeGpuDevice();
  final stream = InstancedAttributeStream(device, initialCapacity: 16);
  assert(stream.capacity == 16);

  // Stream 1024 transforms
  final transforms = List.generate(
    1024,
    (i) => Transform.at(Vec3(i.toDouble(), 1.0, 2.0)),
  );
  stream.streamTransforms(transforms, computeNormals: true);
  assert(stream.activeCount == 1024);
  assert(stream.capacity >= 1024);

  final vao = device.createVertexArray();
  device.bindVertexArray(vao);
  stream.bindInstancedAttributes(
    modelAttribLocation: 7,
    normalAttribLocation: 11,
    includeNormals: true,
  );

  // Check that divisors were set on attribute locations 7..10 and 11..14
  for (var loc = 7; loc <= 14; loc++) {
    assert(
      device.drawLog.contains('vertexAttribDivisor($loc, 1)'),
      'attrib $loc must have divisor 1',
    );
  }

  stream.dispose();
}
