import 'dart:typed_data';

import '../api/capabilities.dart';
import 'state_cache.dart';

enum GpuBufferUsage { staticDraw, dynamicDraw, streamDraw }

/// A WebGL buffer object's binding-point family is fixed by its *first*
/// `bindBuffer` call and cannot change afterward — binding a buffer first
/// created against `ARRAY_BUFFER` to `ELEMENT_ARRAY_BUFFER` later produces
/// a driver warning and an unbound index buffer (silently broken indexed
/// draws), not an exception. [GpuBufferDescriptor.kind] exists so
/// [GpuDevice.createBuffer] allocates storage against the correct target
/// from the very first call, never needing a later rebind to a different
/// family.
enum GpuBufferKind { vertex, indices }

enum GpuTextureFilter { nearest, linear, linearMipmapLinear }

enum GpuTextureWrap { clampToEdge, repeat }

final class GpuBufferDescriptor {
  final int byteLength;
  final GpuBufferUsage usage;
  final GpuBufferKind kind;
  const GpuBufferDescriptor({
    required this.byteLength,
    required this.usage,
    this.kind = GpuBufferKind.vertex,
  });
}

final class GpuTextureDescriptor {
  final int width;
  final int height;
  final int layers;
  final bool hasMips;
  final GpuTextureFilter minFilter;
  final GpuTextureFilter magFilter;
  final GpuTextureWrap wrap;

  const GpuTextureDescriptor({
    required this.width,
    required this.height,
    this.layers = 1,
    this.hasMips = false,
    this.minFilter = GpuTextureFilter.linear,
    this.magFilter = GpuTextureFilter.linear,
    this.wrap = GpuTextureWrap.clampToEdge,
  });
}

/// [depthOnly] has no color attachment at all — a shadow map's render
/// target, which only ever needs the depth buffer a caster's depth-only
/// pass writes and a later world pass samples. [GpuTargetDescriptor.hasDepth]
/// is still required alongside it (§8.4: shadow maps are `depth24`/
/// `depth32f`, never a renderbuffer, since the whole point is sampling them
/// back as a texture in the world shader).
enum GpuTargetAttachment { color, colorAndGlow, colorDepthGlow, depthOnly }

final class GpuTargetDescriptor {
  final int width;
  final int height;
  final int samples;
  final GpuTargetAttachment attachments;
  final bool hasDepth;

  const GpuTargetDescriptor({
    required this.width,
    required this.height,
    this.samples = 1,
    this.attachments = GpuTargetAttachment.color,
    this.hasDepth = false,
  });
}

/// Opaque backend-owned object identity. Never compared across a device
/// epoch change; `GpuDevice` implementations mint a fresh one after
/// `restore()`.
abstract interface class GpuObject {}

enum GpuDeviceStatus { ready, lost }

enum ShaderCompileStage { vertex, fragment, link, validation }

final class ShaderCompileException implements Exception {
  final ShaderCompileStage stage;
  final String message;
  const ShaderCompileException(this.stage, this.message);

  @override
  String toString() => 'ShaderCompileException(${stage.name}: $message)';
}

/// The seam between renderer-neutral logic and a real backend (§4.1, §7.1,
/// §7.4). `lib/rendering/webgl/**`'s real implementation wraps
/// `package:web`'s `WebGL2RenderingContext`; a fake implementation proves
/// the same lifecycle state machine without a browser, which plan §7.4
/// requires explicitly rather than treats as a stopgap: "a fake device
/// lifecycle always covers the same state machine."
abstract interface class GpuDevice {
  GpuDeviceStatus get status;
  RenderCapabilities queryCapabilities();

  GpuObject createBuffer(GpuBufferDescriptor descriptor);
  void uploadBuffer(
    GpuObject buffer,
    Float32List data, {
    int dstByteOffset = 0,
  });
  void deleteBuffer(GpuObject buffer);

  GpuObject createTexture(GpuTextureDescriptor descriptor);
  void uploadTextureLayer(GpuObject texture, int layer, Uint8List pixels);

  /// Generates mip levels 1..N from the base level for a texture created
  /// with `hasMips: true`. Callers upload every layer's base level first,
  /// then call this exactly once. A no-op for a non-mipped texture.
  void finalizeMips(GpuObject texture);
  void deleteTexture(GpuObject texture);

  GpuObject createTarget(GpuTargetDescriptor descriptor);
  void deleteTarget(GpuObject target);

  /// §8.4 rung 2's explicit MSAA resolve: blits [source]'s multisampled
  /// color and depth attachments into [destination]'s single-sample
  /// textures, so a later pass can sample [destination] directly —
  /// [bindTexture] already refuses to sample a multisampled target's
  /// attachment at all, precisely because there is no such thing as
  /// "sample a multisample renderbuffer" outside a resolve. Both targets
  /// must share the same width/height; [destination] must be single-sample
  /// (`samples: 1`) with the same attachments [source] has (color, and
  /// depth if [source] has depth) — anything else is a caller error, not a
  /// silent partial resolve.
  void resolveTarget(GpuObject source, GpuObject destination);

  GpuObject createVertexArray();
  void deleteVertexArray(GpuObject vao);

  /// Compiles and links a program from labeled sources (§7.2: "compile
  /// every required stage; link; validate required attributes/uniforms").
  /// Throws [ShaderCompileException] on any stage compile or link failure;
  /// never returns a partially-built program.
  GpuObject compileProgram({
    required String vertexSource,
    required String fragmentSource,
    required List<String> requiredAttributes,
    required List<String> requiredUniforms,
  });
  void deleteProgram(GpuObject program);

  /// Simulates `webglcontextlost`/`webglcontextrestored` for a fake device;
  /// a real backend drives this from the actual browser events instead of
  /// exposing it as a public call (§7.4).
  void simulateContextLoss();
  void simulateContextRestore();

  /// `null` binds the default (canvas) framebuffer. A minimal draw-command
  /// surface used by `DrawCommandEncoder` (`draw_encoder.dart`) — direct
  /// pass-through, no buffered/deferred replay.
  void bindTarget(GpuObject? target);

  /// Narrows (or restores) the currently bound target's active color draw
  /// buffers to exactly [count] (1 or 2). A `colorAndGlow` target always
  /// has 2 active draw buffers by default (set at creation, and restored
  /// after every `resolveTarget` call) — but a pass whose fragment shader
  /// writes only one output (`depth_debug.frag`, `bloom_composite.frag`;
  /// neither has any reason to also write glow) drawing into it with both
  /// buffers still active produces `GL_INVALID_OPERATION: Active draw
  /// buffers with missing fragment shader outputs` on at least one real
  /// WebGL2 implementation (found on WebKit/Safari) — the spec leaves an
  /// unwritten active buffer's contents merely undefined, but does not
  /// require every implementation to tolerate it silently. Call after
  /// `bindTarget`, before `useProgram`, whenever a pass's shader writes
  /// fewer outputs than the bound target declares attachments.
  void setColorAttachmentCount(int count);

  /// Applies every GL toggle a draw pass depends on but that has no other
  /// call site in this interface (§6.4) — depth test/func/write, face
  /// culling, blend, color mask. A pass that skips this call inherits
  /// whatever the previous pass last applied, which is exactly the bug
  /// class RV-07 found twice (`DEPTH_TEST` and `CULL_FACE` both existed
  /// only as unapplied [DrawStateDescriptor] data before this method
  /// existed). Call once per pass, after `bindTarget`.
  void applyDrawState(DrawStateDescriptor state);
  void clear(ClearMask mask, {double r, double g, double b, double a});
  void useProgram(GpuObject program);
  void setUniform(String name, UniformValue value);
  void bindVertexArray(GpuObject vao);
  void bindTexture(int unit, GpuObject texture);

  /// §8.7's "declared emissive attachment" — binds a target's *second*
  /// color attachment (created via `GpuTargetAttachment.colorAndGlow`) as a
  /// sampleable texture, distinct from [bindTexture]'s color attachment.
  /// Bloom reads only this, never inferring glow from final composited
  /// luma, per §8.7: "does not infer glow from final luma."
  void bindGlowTexture(int unit, GpuObject target);

  /// Configures one vertex attribute of the currently bound VAO to read
  /// from the currently bound array buffer. `strideBytes`/`offsetBytes`
  /// describe an interleaved layout, matching the compatibility 14-float
  /// vertex format (§5.4). Call `bindArrayBuffer` first.
  void bindArrayBuffer(GpuObject buffer);
  void vertexAttribPointer({
    required int location,
    required int componentCount,
    required int strideBytes,
    required int offsetBytes,
  });
  void enableVertexAttribArray(int location);

  /// Binds a buffer (created via [createBuffer]) as the currently bound
  /// VAO's element (index) array, for `drawElements`. Uint16 indices only,
  /// matching QMSH's deduplication output (§5.4).
  void bindElementArrayBuffer(GpuObject buffer);
  void uploadIndices(GpuObject buffer, Uint16List data);

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

enum UniformType { float1, float2, float3, mat4, sampler }

final class UniformValue {
  final UniformType type;
  final Object value;
  const UniformValue.float1(double v) : type = UniformType.float1, value = v;
  const UniformValue.float2(Float32List v)
    : type = UniformType.float2,
      value = v;
  const UniformValue.float3(Float32List v)
    : type = UniformType.float3,
      value = v;
  const UniformValue.mat4(Float32List v) : type = UniformType.mat4, value = v;
  const UniformValue.sampler(int textureUnit)
    : type = UniformType.sampler,
      value = textureUnit;
}

enum ClearMask { colorOnly, colorAndDepth, depthOnly }
