import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/state_cache.dart';

/// Captures a pass's frame uniforms once so each selected program can receive
/// the same values. The world passes defer uploads until the first draw, so an
/// unused default program incurs no uniform calls.
final class FrameUniformCapture implements DrawCommandEncoder {
  final DrawCommandEncoder _encoder;
  final List<({String name, UniformValue value})> _uniforms = [];
  bool _capturing = true;

  FrameUniformCapture(this._encoder);

  void finish() => _capturing = false;

  void replay() {
    for (final uniform in _uniforms) {
      _encoder.setUniform(uniform.name, uniform.value);
    }
  }

  @override
  void setUniform(String name, UniformValue value) {
    if (_capturing) {
      _uniforms.add((name: name, value: value));
      return;
    }
    _encoder.setUniform(name, value);
  }

  @override
  void bindTarget(GpuObject? target) => _encoder.bindTarget(target);

  @override
  void setColorAttachmentCount(int count) =>
      _encoder.setColorAttachmentCount(count);

  @override
  void applyDrawState(DrawStateDescriptor state) =>
      _encoder.applyDrawState(state);

  @override
  void clear(
    ClearMask mask, {
    double r = 0,
    double g = 0,
    double b = 0,
    double a = 1,
  }) => _encoder.clear(mask, r: r, g: g, b: b, a: a);

  @override
  void useProgram(GpuObject program) {
    if (_capturing) return;
    _encoder.useProgram(program);
  }

  @override
  void bindVertexArray(GpuObject vao) => _encoder.bindVertexArray(vao);

  @override
  void bindTexture(int unit, GpuObject texture) =>
      _encoder.bindTexture(unit, texture);

  @override
  void bindGlowTexture(int unit, GpuObject target) =>
      _encoder.bindGlowTexture(unit, target);

  @override
  void drawArrays({required int first, required int count}) =>
      _encoder.drawArrays(first: first, count: count);

  @override
  void drawArraysInstanced({
    required int first,
    required int count,
    required int instanceCount,
  }) => _encoder.drawArraysInstanced(
    first: first,
    count: count,
    instanceCount: instanceCount,
  );

  @override
  void drawElements({
    required int count,
    required int offsetBytes,
    bool index32 = false,
  }) => _encoder.drawElements(
    count: count,
    offsetBytes: offsetBytes,
    index32: index32,
  );

  @override
  void drawElementsInstanced({
    required int count,
    required int offsetBytes,
    required int instanceCount,
    bool index32 = false,
  }) => _encoder.drawElementsInstanced(
    count: count,
    offsetBytes: offsetBytes,
    instanceCount: instanceCount,
    index32: index32,
  );
}
