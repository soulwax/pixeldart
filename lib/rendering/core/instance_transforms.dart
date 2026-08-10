import 'dart:typed_data';

import 'batching.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/device_api.dart';

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
