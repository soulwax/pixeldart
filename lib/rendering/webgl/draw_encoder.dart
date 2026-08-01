import 'device_api.dart';
import 'state_cache.dart';

/// The concrete type behind `RenderPassContext.commandEncoder` (§5.6). One
/// encoder is bound to exactly one target for its lifetime; every call is a
/// direct pass-through to the owning `GpuDevice`, so this type carries no
/// GL state of its own and cannot be replayed outside the frame that
/// created it.
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
  void drawElements({required int count, required int offsetBytes});
  void drawElementsInstanced({
    required int count,
    required int offsetBytes,
    required int instanceCount,
  });
}

/// Direct pass-through implementation over one `GpuDevice`. Contains no
/// buffering or deferred replay — every call issues immediately, matching
/// the "no allocation in the frame loop" requirement for steady-state
/// submission (§7.5). `FakeGpuDevice` records these calls for pure tests;
/// a real backend would translate them 1:1 into WebGL2 calls.
final class DeviceDrawCommandEncoder implements DrawCommandEncoder {
  final GpuDevice device;
  const DeviceDrawCommandEncoder(this.device);

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
  void useProgram(GpuObject program) => device.useProgram(program);

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
  void drawArrays({required int first, required int count}) =>
      device.drawArrays(first: first, count: count);

  @override
  void drawArraysInstanced({
    required int first,
    required int count,
    required int instanceCount,
  }) => device.drawArraysInstanced(
    first: first,
    count: count,
    instanceCount: instanceCount,
  );

  @override
  void drawElements({required int count, required int offsetBytes}) =>
      device.drawElements(count: count, offsetBytes: offsetBytes);

  @override
  void drawElementsInstanced({
    required int count,
    required int offsetBytes,
    required int instanceCount,
  }) => device.drawElementsInstanced(
    count: count,
    offsetBytes: offsetBytes,
    instanceCount: instanceCount,
  );
}
