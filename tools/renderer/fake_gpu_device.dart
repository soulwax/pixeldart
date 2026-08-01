import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/state_cache.dart';

final class _FakeGpuObject implements GpuObject {
  final int id;
  const _FakeGpuObject(this.id);
}

/// A deterministic in-memory `GpuDevice` proving the same lifecycle state
/// machine a real WebGL2 backend would drive, per plan §7.4's explicit
/// requirement that a fake device cover context loss/restore without a
/// browser. Every create/delete call is counted so tests can assert
/// resource-count behavior across warm-up and loss/restore cycles.
final class FakeGpuDevice implements GpuDevice {
  GpuDeviceStatus _status = GpuDeviceStatus.ready;
  int _nextId = 1;

  int bufferCreateCalls = 0;
  int bufferDeleteCalls = 0;
  int textureCreateCalls = 0;
  int textureDeleteCalls = 0;
  int targetCreateCalls = 0;
  int targetDeleteCalls = 0;
  int resolveTargetCalls = 0;
  final Map<int, GpuTargetDescriptor> _targetDescriptors = {};
  int vaoCreateCalls = 0;
  int vaoDeleteCalls = 0;
  int programCompileCalls = 0;
  int programDeleteCalls = 0;

  final Set<int> _liveObjects = {};
  final List<String> drawLog = [];
  final List<({String name, UniformValue value})> uniformLog = [];

  @override
  GpuDeviceStatus get status => _status;

  bool isLive(GpuObject obj) =>
      _liveObjects.contains((obj as _FakeGpuObject).id);

  @override
  RenderCapabilities queryCapabilities() => const RenderCapabilities(
    webglVersion: 'fake-2.0',
    rendererString: 'FakeGpuDevice',
    maxTextureSize: 4096,
    maxTextureArrayLayers: 8,
    maxSamples: 4,
    maxVertexAttributes: 16,
    maxColorAttachments: 4,
    floatRenderTarget: true,
    contextLossExtension: true,
  );

  GpuObject _create() {
    final obj = _FakeGpuObject(_nextId++);
    _liveObjects.add(obj.id);
    return obj;
  }

  void _delete(GpuObject obj) {
    final id = (obj as _FakeGpuObject).id;
    if (!_liveObjects.remove(id)) {
      throw StateError('FakeGpuDevice: double delete of object $id');
    }
  }

  void _requireReady() {
    if (_status != GpuDeviceStatus.ready) {
      throw StateError('FakeGpuDevice: operation attempted while not ready');
    }
  }

  @override
  GpuObject createBuffer(GpuBufferDescriptor descriptor) {
    _requireReady();
    bufferCreateCalls += 1;
    return _create();
  }

  @override
  void uploadBuffer(
    GpuObject buffer,
    Float32List data, {
    int dstByteOffset = 0,
  }) {
    _requireReady();
  }

  @override
  void deleteBuffer(GpuObject buffer) {
    bufferDeleteCalls += 1;
    _delete(buffer);
  }

  @override
  GpuObject createTexture(GpuTextureDescriptor descriptor) {
    _requireReady();
    textureCreateCalls += 1;
    return _create();
  }

  int textureMipsFinalizedCalls = 0;
  final Set<int> _texturesMissingFinalizedMips = {};

  @override
  void uploadTextureLayer(GpuObject texture, int layer, Uint8List pixels) {
    _requireReady();
  }

  @override
  void finalizeMips(GpuObject texture) {
    _requireReady();
    _requireLive(texture);
    textureMipsFinalizedCalls += 1;
    _texturesMissingFinalizedMips.remove((texture as _FakeGpuObject).id);
  }

  /// True once [createTextureMipped] has run but [finalizeMips] has not —
  /// lets a test catch "allocated mip storage, never populated it," the
  /// exact real bug this pair of methods was added to close.
  bool hasUnfinalizedMips(GpuObject texture) =>
      _texturesMissingFinalizedMips.contains((texture as _FakeGpuObject).id);

  GpuObject createTextureMipped(GpuTextureDescriptor descriptor) {
    final obj = createTexture(descriptor);
    if (descriptor.hasMips) {
      _texturesMissingFinalizedMips.add((obj as _FakeGpuObject).id);
    }
    return obj;
  }

  @override
  void deleteTexture(GpuObject texture) {
    textureDeleteCalls += 1;
    _texturesMissingFinalizedMips.remove((texture as _FakeGpuObject).id);
    _delete(texture);
  }

  @override
  GpuObject createTarget(GpuTargetDescriptor descriptor) {
    _requireReady();
    if (descriptor.width <= 0 || descriptor.height <= 0) {
      throw ArgumentError(
        'FakeGpuDevice.createTarget requires positive dimensions, '
        'got ${descriptor.width}x${descriptor.height}',
      );
    }
    targetCreateCalls += 1;
    final target = _create();
    _targetDescriptors[(target as _FakeGpuObject).id] = descriptor;
    return target;
  }

  @override
  void deleteTarget(GpuObject target) {
    targetDeleteCalls += 1;
    _targetDescriptors.remove((target as _FakeGpuObject).id);
    _delete(target);
  }

  @override
  void resolveTarget(GpuObject source, GpuObject destination) {
    _requireReady();
    _requireLive(source);
    _requireLive(destination);
    final src = _targetDescriptors[(source as _FakeGpuObject).id];
    final dst = _targetDescriptors[(destination as _FakeGpuObject).id];
    if (src == null || dst == null) {
      throw ArgumentError(
        'FakeGpuDevice.resolveTarget: both source and destination must be '
        'targets created via createTarget',
      );
    }
    if (src.samples <= 1) {
      throw ArgumentError(
        'FakeGpuDevice.resolveTarget: source must be multisampled '
        '(samples > 1), got ${src.samples}',
      );
    }
    if (dst.samples > 1) {
      throw ArgumentError(
        'FakeGpuDevice.resolveTarget: destination must be single-sample, '
        'got samples=${dst.samples}',
      );
    }
    if (src.width != dst.width || src.height != dst.height) {
      throw ArgumentError(
        'FakeGpuDevice.resolveTarget: source (${src.width}x${src.height}) '
        'and destination (${dst.width}x${dst.height}) must match',
      );
    }
    resolveTargetCalls += 1;
    drawLog.add('resolveTarget(${source.id}, ${destination.id})');
  }

  @override
  GpuObject createVertexArray() {
    _requireReady();
    vaoCreateCalls += 1;
    return _create();
  }

  @override
  void deleteVertexArray(GpuObject vao) {
    vaoDeleteCalls += 1;
    _delete(vao);
  }

  /// Fake compilation: a source containing the literal marker `FAIL_VERTEX`
  /// or `FAIL_FRAGMENT` simulates a stage compile error; `FAIL_LINK`
  /// simulates a link error. Otherwise, every string in [requiredAttributes]
  /// and [requiredUniforms] must appear as a substring of the combined
  /// source, simulating attribute/uniform validation (§7.2 step 3).
  @override
  GpuObject compileProgram({
    required String vertexSource,
    required String fragmentSource,
    required List<String> requiredAttributes,
    required List<String> requiredUniforms,
  }) {
    _requireReady();
    if (vertexSource.contains('FAIL_VERTEX')) {
      throw const ShaderCompileException(
        ShaderCompileStage.vertex,
        'fake vertex compile failure',
      );
    }
    if (fragmentSource.contains('FAIL_FRAGMENT')) {
      throw const ShaderCompileException(
        ShaderCompileStage.fragment,
        'fake fragment compile failure',
      );
    }
    if (vertexSource.contains('FAIL_LINK') ||
        fragmentSource.contains('FAIL_LINK')) {
      throw const ShaderCompileException(
        ShaderCompileStage.link,
        'fake link failure',
      );
    }
    final combined = '$vertexSource\n$fragmentSource';
    for (final attr in requiredAttributes) {
      if (!combined.contains(attr)) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          'missing required attribute: $attr',
        );
      }
    }
    for (final uniform in requiredUniforms) {
      if (!combined.contains(uniform)) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          'missing required uniform: $uniform',
        );
      }
    }
    programCompileCalls += 1;
    return _create();
  }

  @override
  void deleteProgram(GpuObject program) {
    programDeleteCalls += 1;
    _delete(program);
  }

  @override
  void simulateContextLoss() {
    _status = GpuDeviceStatus.lost;
    _liveObjects.clear();
  }

  @override
  void simulateContextRestore() {
    _status = GpuDeviceStatus.ready;
  }

  GpuObject? _boundTarget;
  GpuObject? _boundProgram;
  GpuObject? _boundVao;

  GpuObject? get boundTarget => _boundTarget;

  @override
  void bindTarget(GpuObject? target) {
    _requireReady();
    if (target != null) {
      _requireLive(target);
    }
    _boundTarget = target;
    drawLog.add(
      'bindTarget(${target == null ? 'canvas' : (target as _FakeGpuObject).id})',
    );
  }

  @override
  void setColorAttachmentCount(int count) {
    _requireReady();
    if (count != 1 && count != 2) {
      throw ArgumentError(
        'FakeGpuDevice.setColorAttachmentCount: count must be 1 or 2, '
        'got $count',
      );
    }
    drawLog.add('setColorAttachmentCount($count)');
  }

  DrawStateDescriptor? lastAppliedDrawState;

  @override
  void applyDrawState(DrawStateDescriptor state) {
    _requireReady();
    lastAppliedDrawState = state;
    drawLog.add(
      'applyDrawState(depthTest=${state.depthTest}, cullEnable=${state.cullEnable}, cullFace=${state.cullFace.name})',
    );
  }

  @override
  void clear(
    ClearMask mask, {
    double r = 0,
    double g = 0,
    double b = 0,
    double a = 1,
  }) {
    _requireReady();
    drawLog.add('clear(${mask.name})');
  }

  @override
  void useProgram(GpuObject program) {
    _requireReady();
    _requireLive(program);
    _boundProgram = program;
    drawLog.add('useProgram(${(program as _FakeGpuObject).id})');
  }

  @override
  void setUniform(String name, UniformValue value) {
    _requireReady();
    if (_boundProgram == null) {
      throw StateError('FakeGpuDevice.setUniform called with no bound program');
    }
    drawLog.add('setUniform($name, ${value.type.name})');
    uniformLog.add((name: name, value: value));
  }

  double? lastFloat1(String name) {
    for (final entry in uniformLog.reversed) {
      if (entry.name == name && entry.value.type == UniformType.float1) {
        return entry.value.value as double;
      }
    }
    return null;
  }

  List<double> float1Sequence(String name) => [
    for (final entry in uniformLog)
      if (entry.name == name && entry.value.type == UniformType.float1)
        entry.value.value as double,
  ];

  @override
  void bindVertexArray(GpuObject vao) {
    _requireReady();
    _requireLive(vao);
    _boundVao = vao;
    drawLog.add('bindVertexArray(${(vao as _FakeGpuObject).id})');
  }

  @override
  void bindArrayBuffer(GpuObject buffer) {
    _requireReady();
    _requireLive(buffer);
    drawLog.add('bindArrayBuffer(${(buffer as _FakeGpuObject).id})');
  }

  @override
  void vertexAttribPointer({
    required int location,
    required int componentCount,
    required int strideBytes,
    required int offsetBytes,
  }) {
    _requireReady();
    drawLog.add(
      'vertexAttribPointer($location, $componentCount, $strideBytes, $offsetBytes)',
    );
  }

  @override
  void enableVertexAttribArray(int location) {
    _requireReady();
    drawLog.add('enableVertexAttribArray($location)');
  }

  @override
  void bindTexture(int unit, GpuObject texture) {
    _requireReady();
    _requireLive(texture);
    drawLog.add('bindTexture($unit, ${(texture as _FakeGpuObject).id})');
  }

  @override
  void bindGlowTexture(int unit, GpuObject target) {
    _requireReady();
    _requireLive(target);
    drawLog.add('bindGlowTexture($unit, ${(target as _FakeGpuObject).id})');
  }

  @override
  void drawArrays({required int first, required int count}) {
    _requireReady();
    _requireDrawState();
    drawLog.add('drawArrays($first, $count)');
  }

  @override
  void drawArraysInstanced({
    required int first,
    required int count,
    required int instanceCount,
  }) {
    _requireReady();
    _requireDrawState();
    drawLog.add('drawArraysInstanced($first, $count, $instanceCount)');
  }

  GpuObject? _boundElementBuffer;

  @override
  void bindElementArrayBuffer(GpuObject buffer) {
    _requireReady();
    _requireLive(buffer);
    _boundElementBuffer = buffer;
    drawLog.add('bindElementArrayBuffer(${(buffer as _FakeGpuObject).id})');
  }

  @override
  void uploadIndices(GpuObject buffer, Uint16List data) {
    _requireReady();
    _requireLive(buffer);
    drawLog.add(
      'uploadIndices(${(buffer as _FakeGpuObject).id}, ${data.length})',
    );
  }

  @override
  void drawElements({required int count, required int offsetBytes}) {
    _requireReady();
    _requireDrawState();
    if (_boundElementBuffer == null) {
      throw StateError(
        'FakeGpuDevice: drawElements with no bound element array buffer',
      );
    }
    drawLog.add('drawElements($count, $offsetBytes)');
  }

  @override
  void drawElementsInstanced({
    required int count,
    required int offsetBytes,
    required int instanceCount,
  }) {
    _requireReady();
    _requireDrawState();
    if (_boundElementBuffer == null) {
      throw StateError(
        'FakeGpuDevice: drawElementsInstanced with no bound element array buffer',
      );
    }
    drawLog.add('drawElementsInstanced($count, $offsetBytes, $instanceCount)');
  }

  void _requireLive(GpuObject obj) {
    if (!isLive(obj)) {
      throw StateError(
        'FakeGpuDevice: operation on a released or unknown object',
      );
    }
  }

  void _requireDrawState() {
    if (_boundProgram == null) {
      throw StateError('FakeGpuDevice: draw call with no bound program');
    }
    if (_boundVao == null) {
      throw StateError('FakeGpuDevice: draw call with no bound vertex array');
    }
  }
}
