import 'dart:js_interop';
import 'dart:typed_data';

import 'package:web/web.dart' hide Float32List;
import 'package:web/web.dart' as web;

import '../api/capabilities.dart';
import 'device_api.dart';
import 'state_cache.dart';

part 'webgl2_device_draw.dart';
part 'webgl2_device_resources.dart';
part 'webgl2_device_targets.dart';
part 'webgl2_device_timing.dart';

typedef _G = WebGL2RenderingContext;

// EXT_texture_filter_anisotropic constants are extension-owned values. The
// package:web 0.5 bindings expose them as external static getters, but those
// getters are not present on every browser's global object. Keep the numeric
// WebGL constants local so capability probing remains safe when the extension
// is absent or only partially exposed.
const _textureMaxAnisotropyExt = 34046;
const _maxTextureMaxAnisotropyExt = 34047;

/// Wraps either a raw JS interop handle (buffer/texture/VAO/program) or a
/// composite Dart-side record (the multi-attachment framebuffer bundle
/// backing a render target). [handle] is deliberately `Object`, not
/// `JSObject`, since a target has no single JS object identity of its own —
/// it is several JS objects plus Dart-side width/height/sample-count
/// bookkeeping.
final class _WebGpuObject implements GpuObject {
  final Object handle;
  const _WebGpuObject(this.handle);
}

final class _WebGlTexture {
  final web.WebGLTexture handle;
  final int width, height, layers;
  final bool hasMips;
  final AnisotropyDecision anisotropy;
  const _WebGlTexture({
    required this.handle,
    required this.width,
    required this.height,
    required this.layers,
    required this.hasMips,
    required this.anisotropy,
  });
}

final class _WebGlFramebuffer {
  final WebGLFramebuffer fbo;
  final web.WebGLTexture? colorTex;
  final web.WebGLRenderbuffer? colorRb;
  final web.WebGLRenderbuffer? depthRb;
  final web.WebGLTexture? depthTex;
  final web.WebGLTexture? glowTex;
  final web.WebGLRenderbuffer? glowRb;
  final int width, height, samples;

  const _WebGlFramebuffer({
    required this.fbo,
    this.colorTex,
    this.colorRb,
    this.depthRb,
    this.depthTex,
    this.glowTex,
    this.glowRb,
    required this.width,
    required this.height,
    required this.samples,
  });
}

final class _WebGlTimerQuery {
  final WebGLQuery query;
  bool ended = false;
  _WebGlTimerQuery(this.query);
}

/// Real WebGL2 implementation of `GpuDevice` (§4.1, §7.1-7.2, §7.4), split
/// across three files by responsibility (this coordinator, `_resources` for
/// create/upload/delete, `_draw` for the per-frame command surface) to stay
/// under the 350-line WebGL-device-file cap. This is the only code under
/// `lib/rendering/webgl/**` whose calls have never run against an actual
/// context — `tools/renderer/check_boundary.dart` confirms it is the
/// correct place for `package:web`/`dart:js_interop`, but that only proves
/// the import boundary, not correctness. Every method mirrors a pattern
/// already proven in the legacy `lib/engine/gl.dart`; nothing here is
/// speculative GL usage, but it is unexecuted GL usage until a browser
/// session confirms it.
final class WebGl2Device with _WebGlTimerSupport implements GpuDevice {
  @override
  final WebGL2RenderingContext gl;
  GpuDeviceStatus _status = GpuDeviceStatus.ready;
  EventListener? _lostListener;
  EventListener? _restoredListener;
  WebGLProgram? _boundProgram;
  final WebGlStateCache _stateCache = WebGlStateCache();
  final Set<String> _supportedExtensions;
  @override
  bool _timerExtensionAvailable = false;

  WebGLProgram? get boundProgram => _boundProgram;
  void setBoundProgram(WebGLProgram? program) => _boundProgram = program;

  /// Attaches real `webglcontextlost`/`webglcontextrestored` listeners
  /// (§7.4) on construction. `preventDefault()` on the loss event is what
  /// stops the browser's default *permanent* context loss and allows
  /// `webglcontextrestored` to fire at all — omitting it means a lost
  /// context never comes back regardless of anything else this class does.
  WebGl2Device(this.gl) : _supportedExtensions = _readSupportedExtensions(gl) {
    final canvasTarget = gl.canvas as EventTarget;
    _lostListener =
        ((JSAny? e) {
          final event = e as web.Event;
          event.preventDefault();
          _status = GpuDeviceStatus.lost;
        }).toJS as EventListener;
    _restoredListener =
        ((JSAny? e) {
          _status = GpuDeviceStatus.ready;
        }).toJS as EventListener;
    canvasTarget.addEventListener('webglcontextlost', _lostListener);
    canvasTarget.addEventListener('webglcontextrestored', _restoredListener);
  }

  static Set<String> _readSupportedExtensions(WebGL2RenderingContext gl) {
    final extensions = gl.getSupportedExtensions();
    if (extensions == null) return <String>{};
    return {for (final extension in extensions.toDart) extension.toDart};
  }

  bool _hasExtension(String name) => _supportedExtensions.contains(name);

  /// Detaches the listeners installed in the constructor. Callers must
  /// invoke this before dropping their last reference to a `WebGl2Device`,
  /// matching `SceneRenderer.dispose()`'s idempotent-cleanup contract
  /// (§5.1) once a concrete `SceneRenderer` wraps this class.
  void disposeListeners() {
    final canvasTarget = gl.canvas as EventTarget;
    final lost = _lostListener;
    final restored = _restoredListener;
    if (lost != null) {
      canvasTarget.removeEventListener('webglcontextlost', lost);
    }
    if (restored != null) {
      canvasTarget.removeEventListener('webglcontextrestored', restored);
    }
    _lostListener = null;
    _restoredListener = null;
  }

  @override
  GpuDeviceStatus get status => _status;

  @override
  RenderCapabilities queryCapabilities() {
    final maxTextureSize = _paramInt(_G.MAX_TEXTURE_SIZE);
    final maxArrayLayers = _paramInt(_G.MAX_ARRAY_TEXTURE_LAYERS);
    final maxSamples = _paramInt(_G.MAX_SAMPLES);
    final maxAttribs = _paramInt(_G.MAX_VERTEX_ATTRIBS);
    final maxColorAttachments = _paramInt(_G.MAX_COLOR_ATTACHMENTS);

    final aniso = _hasExtension('EXT_texture_filter_anisotropic');
    final maxAnisotropy = aniso
        ? _validAnisotropyLimit(_paramDouble(_maxTextureMaxAnisotropyExt))
        : 1.0;
    _timerExtensionAvailable = _hasExtension('EXT_disjoint_timer_query_webgl2');
    final timerQuery = _timerExtensionAvailable;
    final floatBlend = _hasExtension('EXT_color_buffer_float');
    final halfFloatBlend = _hasExtension('EXT_color_buffer_half_float');
    final contextLoss = _hasExtension('WEBGL_lose_context');

    final renderer = gl.getParameter(_G.RENDERER).dartify();
    final vendor = gl.getParameter(_G.VENDOR).dartify();

    return RenderCapabilities(
      webglVersion: 'WebGL2',
      rendererString: renderer is String ? renderer : null,
      vendorString: vendor is String ? vendor : null,
      maxTextureSize: maxTextureSize,
      maxTextureArrayLayers: maxArrayLayers,
      maxSamples: maxSamples,
      maxVertexAttributes: maxAttribs,
      maxColorAttachments: maxColorAttachments,
      anisotropicFiltering: aniso,
      maxAnisotropy: maxAnisotropy,
      disjointTimerQuery: timerQuery,
      floatRenderTarget: floatBlend,
      halfFloatRenderTarget: halfFloatBlend,
      contextLossExtension: contextLoss,
    );
  }

  int _paramInt(int pname) {
    final v = gl.getParameter(pname).dartify();
    return v is num ? v.toInt() : 0;
  }

  double _paramDouble(int pname) {
    final v = gl.getParameter(pname).dartify();
    return v is num ? v.toDouble() : double.nan;
  }

  double _validAnisotropyLimit(double value) =>
      value.isFinite && value >= 1 ? value : 1.0;

  /// Reports the sampler negotiation retained on a texture created by this
  /// device.  Keeping this on the backend object makes diagnostics honest:
  /// the descriptor is only a request, whereas this is what WebGL accepted.
  AnisotropyDecision anisotropyDecisionOf(GpuObject texture) {
    final value = (texture as _WebGpuObject).handle;
    if (value is! _WebGlTexture) {
      throw ArgumentError.value(texture, 'texture', 'is not a WebGL texture');
    }
    return value.anisotropy;
  }

  @override
  void _requireReady() {
    if (_status != GpuDeviceStatus.ready) {
      throw StateError(
        'WebGl2Device: operation attempted while context is not ready',
      );
    }
  }

  @override
  GpuObject createBuffer(GpuBufferDescriptor descriptor) =>
      createBufferImpl(descriptor);

  @override
  void uploadBuffer(
    GpuObject buffer,
    Float32List data, {
    int dstByteOffset = 0,
  }) => uploadBufferImpl(buffer, data, dstByteOffset: dstByteOffset);

  @override
  void deleteBuffer(GpuObject buffer) => deleteBufferImpl(buffer);

  @override
  GpuObject createTexture(GpuTextureDescriptor descriptor) =>
      createTextureImpl(descriptor);

  @override
  void uploadTextureLayer(GpuObject texture, int layer, Uint8List pixels) =>
      uploadTextureLayerImpl(texture, layer, pixels);

  @override
  void finalizeMips(GpuObject texture) => finalizeMipsImpl(texture);

  @override
  void deleteTexture(GpuObject texture) => deleteTextureImpl(texture);

  @override
  GpuObject createTarget(GpuTargetDescriptor descriptor) =>
      createTargetImpl(descriptor);

  @override
  void deleteTarget(GpuObject target) => deleteTargetImpl(target);

  @override
  void resolveTarget(GpuObject source, GpuObject destination) =>
      resolveTargetImpl(source, destination);

  @override
  GpuObject createVertexArray() => createVertexArrayImpl();

  @override
  void deleteVertexArray(GpuObject vao) => deleteVertexArrayImpl(vao);

  @override
  GpuObject compileProgram({
    required String vertexSource,
    required String fragmentSource,
    required List<String> requiredAttributes,
    required List<String> requiredUniforms,
  }) => compileProgramImpl(
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    requiredAttributes: requiredAttributes,
    requiredUniforms: requiredUniforms,
  );

  @override
  void deleteProgram(GpuObject program) => deleteProgramImpl(program);

  @override
  void simulateContextLoss() {
    throw UnsupportedError(
      'WebGl2Device.simulateContextLoss: use the browser WEBGL_lose_context '
      'extension directly, or FakeGpuDevice for a pure test double — this '
      'method exists on GpuDevice for the fake implementation, not this one',
    );
  }

  @override
  void simulateContextRestore() {
    throw UnsupportedError(
      'WebGl2Device.simulateContextRestore: see simulateContextLoss',
    );
  }

  @override
  void bindTarget(GpuObject? target) => bindTargetImpl(target);

  @override
  void setColorAttachmentCount(int count) => setColorAttachmentCountImpl(count);

  @override
  void applyDrawState(DrawStateDescriptor state) => applyDrawStateImpl(state);

  @override
  void clear(
    ClearMask mask, {
    double r = 0,
    double g = 0,
    double b = 0,
    double a = 1,
  }) => clearImpl(mask, r: r, g: g, b: b, a: a);

  @override
  void useProgram(GpuObject program) => useProgramImpl(program);

  @override
  void setUniform(String name, UniformValue value) =>
      setUniformImpl(name, value);

  @override
  void bindVertexArray(GpuObject vao) => bindVertexArrayImpl(vao);

  @override
  void bindArrayBuffer(GpuObject buffer) => bindArrayBufferImpl(buffer);

  @override
  void vertexAttribPointer({
    required int location,
    required int componentCount,
    required int strideBytes,
    required int offsetBytes,
  }) => vertexAttribPointerImpl(
    location: location,
    componentCount: componentCount,
    strideBytes: strideBytes,
    offsetBytes: offsetBytes,
  );

  @override
  void enableVertexAttribArray(int location) =>
      enableVertexAttribArrayImpl(location);

  @override
  void bindTexture(int unit, GpuObject texture) =>
      bindTextureImpl(unit, texture);

  @override
  void bindGlowTexture(int unit, GpuObject target) =>
      bindGlowTextureImpl(unit, target);

  @override
  void drawArrays({required int first, required int count}) =>
      drawArraysImpl(first: first, count: count);

  @override
  void drawArraysInstanced({
    required int first,
    required int count,
    required int instanceCount,
  }) => drawArraysInstancedImpl(
    first: first,
    count: count,
    instanceCount: instanceCount,
  );

  @override
  void bindElementArrayBuffer(GpuObject buffer) =>
      bindElementArrayBufferImpl(buffer);

  @override
  void uploadIndices(GpuObject buffer, List<int> data) =>
      uploadIndicesImpl(buffer, data);

  @override
  void drawElements({
    required int count,
    required int offsetBytes,
    bool index32 = false,
  }) => drawElementsImpl(
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
  }) => drawElementsInstancedImpl(
    count: count,
    offsetBytes: offsetBytes,
    instanceCount: instanceCount,
    index32: index32,
  );
}
