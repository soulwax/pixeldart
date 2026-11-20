import 'dart:typed_data';

import '../api/scene.dart';
import '../math/transform.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/instanced_stream.dart';
import 'batching.dart';

final Expando<InstancedAttributeStream> _deviceInstanceStreams =
    Expando<InstancedAttributeStream>('pixeldart.instanceStreams');

/// Streams an uncapped [InstanceBatch] into per-instance vertex attributes
/// (locations 7..10 for model matrices and 11..14 for normal matrices, divisor 1)
/// so any instance count (e.g. 4,096+) executes in a single instanced draw call
/// (`[S1-B]`).
void bindInstanceAttributes(
  DrawCommandEncoder encoder,
  InstanceBatch batch, {
  bool includeNormalMatrices = true,
}) {
  if (encoder is DeviceDrawCommandEncoder) {
    final device = encoder.device;
    final stream = _deviceInstanceStreams[device] ??= InstancedAttributeStream(
      device,
      initialCapacity: batch.instanceCount < 64 ? 64 : batch.instanceCount,
    );
    stream.streamViews(
      batch.members,
      computeNormals: includeNormalMatrices,
    );
    stream.bindInstancedAttributes(includeNormals: includeNormalMatrices);
  }
  encoder.setUniform('uUseInstances', const UniformValue.float1(1));
}

/// Disposes any cached [InstancedAttributeStream] GPU buffers associated with
/// [device] so renderer shutdown leaves zero live GPU objects (`[S1-B]`).
void disposeDeviceInstanceStream(GpuDevice device) {
  final stream = _deviceInstanceStreams[device];
  if (stream != null) {
    stream.dispose();
    _deviceInstanceStreams[device] = null;
  }
}

void setInstanceTransformUniforms(
  DrawCommandEncoder encoder,
  InstanceBatch batch, {
  bool includeNormalMatrices = true,
}) {
  if (batch.instanceCount > InstanceBatch.maxInstanceCount) {
    throw ArgumentError.value(
      batch.instanceCount,
      'batch.instanceCount',
      'exceeds the WebGL2-safe instance uniform bound of '
          '${InstanceBatch.maxInstanceCount}',
    );
  }
  final models = Float32List(batch.instanceCount * 16);
  final normals = includeNormalMatrices
      ? Float32List(batch.instanceCount * 16)
      : null;
  for (var i = 0; i < batch.members.length; i += 1) {
    final transform = batch.members[i].descriptor.transform;
    final model = transform.toMat4();
    _copyMatrix(models, i, model.m);
    if (normals != null) {
      _copyMatrix(normals, i, model.normalMatrix().m);
    }
  }
  encoder.setUniform('uInstanceModels', UniformValue.mat4Array(models));
  if (normals != null) {
    encoder.setUniform(
      'uInstanceNormalMatrices',
      UniformValue.mat4Array(normals),
    );
  }
  encoder.setUniform('uUseInstances', const UniformValue.float1(1));
}

void disableInstanceTransformUniforms(DrawCommandEncoder encoder) {
  encoder.setUniform('uUseInstances', const UniformValue.float1(0));
}

void _copyMatrix(Float32List target, int matrixIndex, List<double> values) {
  target.setRange(matrixIndex * 16, matrixIndex * 16 + 16, values);
}

final class InstanceBufferStream {
  int _capacity;
  Float32List _modelFloats;
  Float32List _normalFloats;
  int _activeCount = 0;

  InstanceBufferStream({int initialCapacity = 64})
      : _capacity = initialCapacity,
        _modelFloats = Float32List(initialCapacity * 16),
        _normalFloats = Float32List(initialCapacity * 16);

  int get capacity => _capacity;
  int get activeCount => _activeCount;

  Float32List get activeModels =>
      Float32List.sublistView(_modelFloats, 0, _activeCount * 16);

  Float32List get activeNormals =>
      Float32List.sublistView(_normalFloats, 0, _activeCount * 16);

  void ensureCapacity(int requiredCount) {
    if (requiredCount <= _capacity) return;
    var newCapacity = _capacity * 2;
    if (newCapacity < requiredCount) newCapacity = requiredCount;
    _capacity = newCapacity;
    _modelFloats = Float32List(newCapacity * 16);
    _normalFloats = Float32List(newCapacity * 16);
  }

  void packViews(List<RetainedItemView> items, {bool computeNormals = true}) {
    ensureCapacity(items.length);
    _activeCount = items.length;
    for (var i = 0; i < items.length; i++) {
      final transform = items[i].descriptor.transform;
      final model = transform.toMat4();
      _copyMatrix(_modelFloats, i, model.m);
      if (computeNormals) {
        _copyMatrix(_normalFloats, i, model.normalMatrix().m);
      }
    }
  }

  void packTransforms(List<Transform> transforms, {bool computeNormals = true}) {
    ensureCapacity(transforms.length);
    _activeCount = transforms.length;
    for (var i = 0; i < transforms.length; i++) {
      final model = transforms[i].toMat4();
      _copyMatrix(_modelFloats, i, model.m);
      if (computeNormals) {
        _copyMatrix(_normalFloats, i, model.normalMatrix().m);
      }
    }
  }

  void uploadModelsToGpu(GpuDevice device, GpuObject buffer) {
    if (_activeCount == 0) return;
    device.uploadBuffer(buffer, activeModels);
  }

  void uploadNormalsToGpu(GpuDevice device, GpuObject buffer) {
    if (_activeCount == 0) return;
    device.uploadBuffer(buffer, activeNormals);
  }
}
