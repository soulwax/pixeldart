import 'dart:typed_data';

import 'package:pixeldart/rendering/core/batching.dart';
import 'package:pixeldart/rendering/core/instance_transforms.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';
import 'package:pixeldart/rendering/webgl/state_cache.dart';

void main() {
  final first = _view(1, const Vec3(2, 0, -3));
  final second = _view(2, const Vec3(-4, 1, -7));
  final third = _view(3, const Vec3(6, -2, -11));
  final encoder = _RecordingEncoder();
  setInstanceTransformUniforms(
    encoder,
    InstanceBatch(first, [first, second, third]),
  );
  final models = encoder.uniforms['uInstanceModels']!.value as Float32List;
  if (models.length != 48 ||
      models[12] != 2 ||
      models[13] != 0 ||
      models[14] != -3 ||
      models[28] != -4 ||
      models[29] != 1 ||
      models[30] != -7 ||
      models[44] != 6 ||
      models[45] != -2 ||
      models[46] != -11) {
    throw StateError('instance transform stream lost distinct translations');
  }
  if (encoder.uniforms['uInstanceNormalMatrices']!.type !=
      UniformType.mat4Array) {
    throw StateError('instance normal-matrix stream was not emitted');
  }
  disableInstanceTransformUniforms(encoder);
  if (encoder.uniforms['uUseInstances']!.value != 0) {
    throw StateError('instance stream disable marker was not emitted');
  }
  var oversizedRejected = false;
  try {
    setInstanceTransformUniforms(
      encoder,
      InstanceBatch(
        first,
        List<RetainedItemView>.filled(
          InstanceBatch.maxInstanceCount + 1,
          first,
        ),
      ),
    );
  } catch (_) {
    oversizedRejected = true;
  }
  if (!oversizedRejected) {
    throw StateError('instance stream accepted an unsafe uniform-array size');
  }
  print('Instance transform stream fixture passed.');
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

final class _RecordingEncoder implements DrawCommandEncoder {
  final Map<String, UniformValue> uniforms = {};
  @override
  void setUniform(String name, UniformValue value) => uniforms[name] = value;
  @override
  void bindTarget(GpuObject? target) {}
  @override
  void setColorAttachmentCount(int count) {}
  @override
  void applyDrawState(DrawStateDescriptor state) {}
  @override
  void clear(
    ClearMask mask, {
    double r = 0,
    double g = 0,
    double b = 0,
    double a = 1,
  }) {}
  @override
  void useProgram(GpuObject program) {}
  @override
  void bindVertexArray(GpuObject vao) {}
  @override
  void bindTexture(int unit, GpuObject texture) {}
  @override
  void bindGlowTexture(int unit, GpuObject target) {}
  @override
  void drawArrays({required int first, required int count}) {}
  @override
  void drawArraysInstanced({
    required int first,
    required int count,
    required int instanceCount,
  }) {}
  @override
  void drawElements({
    required int count,
    required int offsetBytes,
    bool index32 = false,
  }) {}
  @override
  void drawElementsInstanced({
    required int count,
    required int offsetBytes,
    required int instanceCount,
    bool index32 = false,
  }) {}
}
