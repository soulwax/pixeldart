import 'device_api.dart';
import '../core/frame_telemetry.dart';
import 'state_cache.dart';

abstract interface class DrawCommandEncoder {
  void bindTarget(GpuObject? target);
  void setColorAttachmentCount(int count);
  void applyDrawState(DrawStateDescriptor state);
  void clear(ClearMask mask, {double r, double g, double b, double a});
  void useProgram(GpuObject program);
  void setUniform(String name, UniformValue value);
  void bindVertexArray(GpuObject vao);
  void bindTexture(int unit, GpuObject texture);
  void bindGlowTexture(int unit, GpuObject target);
  void drawArrays({required int first, required int count});
  void drawArraysInstanced({
    required int first,
    required int count,
    required int instanceCount,
  });
  void drawElements({
    required int count,
    required int offsetBytes,
    bool index32 = false,
  });
  void drawElementsInstanced({
    required int count,
    required int offsetBytes,
    required int instanceCount,
    bool index32 = false,
  });
}

final class DeviceDrawCommandEncoder implements DrawCommandEncoder {
  final GpuDevice device;
  final FrameDrawTelemetry? telemetry;

  /// Runs right after a program is bound. Null, and free, unless a host
  /// shader override is active.
  final void Function(GpuObject program)? onUseProgram;
  const DeviceDrawCommandEncoder(
    this.device, {
    this.telemetry,
    this.onUseProgram,
  });

  @override
  void bindTarget(GpuObject? target) => device.bindTarget(target);

  @override
  void setColorAttachmentCount(int count) =>
      device.setColorAttachmentCount(count);

  @override
  void applyDrawState(DrawStateDescriptor state) =>
      device.applyDrawState(state);

  @override
  void clear(
    ClearMask mask, {
    double r = 0,
    double g = 0,
    double b = 0,
    double a = 1,
  }) => device.clear(mask, r: r, g: g, b: b, a: a);

  @override
  void useProgram(GpuObject program) {
    device.useProgram(program);
    onUseProgram?.call(program);
  }

  @override
  void setUniform(String name, UniformValue value) =>
      device.setUniform(name, value);

  @override
  void bindVertexArray(GpuObject vao) => device.bindVertexArray(vao);

  @override
  void bindTexture(int unit, GpuObject texture) =>
      device.bindTexture(unit, texture);

  @override
  void bindGlowTexture(int unit, GpuObject target) =>
      device.bindGlowTexture(unit, target);

  @override
  void drawArrays({required int first, required int count}) {
    device.drawArrays(first: first, count: count);
    telemetry?.recordArrays(count);
  }

  @override
  void drawArraysInstanced({
    required int first,
    required int count,
    required int instanceCount,
  }) {
    device.drawArraysInstanced(
      first: first,
      count: count,
      instanceCount: instanceCount,
    );
    telemetry?.recordArrays(count, instanceCount: instanceCount);
  }

  @override
  void drawElements({
    required int count,
    required int offsetBytes,
    bool index32 = false,
  }) {
    device.drawElements(
      count: count,
      offsetBytes: offsetBytes,
      index32: index32,
    );
    telemetry?.recordElements(count);
  }

  @override
  void drawElementsInstanced({
    required int count,
    required int offsetBytes,
    required int instanceCount,
    bool index32 = false,
  }) {
    device.drawElementsInstanced(
      count: count,
      offsetBytes: offsetBytes,
      instanceCount: instanceCount,
      index32: index32,
    );
    telemetry?.recordElements(count, instanceCount: instanceCount);
  }
}
