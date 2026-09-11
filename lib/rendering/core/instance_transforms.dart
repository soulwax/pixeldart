import 'dart:typed_data';

import '../api/scene.dart';
import '../math/transform.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'batching.dart';

/// Packs the retained transforms for an instanced draw into stable matrix
/// uniforms. The shader selects `gl_InstanceID`; the representative model is
/// still supplied as a deterministic fallback for non-instanced paths.
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

/// Reusable, zero-allocation buffer streaming manager for large-scale GPU instancing.
/// Retains preallocated Float32List buffers for model matrices and normal matrices,
/// allowing hundreds or thousands of instances to be packed without runtime allocations
/// during warm frames.
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

  /// Sub-view of the active instance model matrices (activeCount * 16 floats).
  Float32List get activeModels =>
      Float32List.sublistView(_modelFloats, 0, _activeCount * 16);

  /// Sub-view of the active instance normal matrices (activeCount * 16 floats).
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

  /// Packs a collection of scene item views into the instance stream.
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

  /// Packs transforms directly.
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

  /// Uploads the active instance model matrices to a GPU buffer.
  void uploadModelsToGpu(GpuDevice device, GpuObject buffer) {
    if (_activeCount == 0) return;
    device.uploadBuffer(buffer, activeModels);
  }

  /// Uploads the active instance normal matrices to a GPU buffer.
  void uploadNormalsToGpu(GpuDevice device, GpuObject buffer) {
    if (_activeCount == 0) return;
    device.uploadBuffer(buffer, activeNormals);
  }
}
