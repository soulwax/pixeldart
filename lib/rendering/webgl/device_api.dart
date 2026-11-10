import 'dart:typed_data';

import '../api/capabilities.dart';
import 'state_cache.dart';

enum GpuBufferUsage { staticDraw, dynamicDraw, streamDraw }

enum GpuBufferKind { vertex, indices }

enum GpuTextureFilter { nearest, linear, linearMipmapLinear }

enum GpuAttribFormat { float, unorm16, unorm8 }

enum GpuTextureWrap { clampToEdge, repeat }

final class AnisotropyDecision {
  final double requested;
  final double effective;
  final double maxSupported;
  final bool extensionAvailable;

  const AnisotropyDecision({
    required this.requested,
    required this.effective,
    required this.maxSupported,
    required this.extensionAvailable,
  });

  bool get usedFallback => effective < requested;

  static AnisotropyDecision resolve({
    required double requested,
    required bool extensionAvailable,
    double maxSupported = 1,
  }) {
    if (!requested.isFinite || requested < 1 || requested > 16) {
      throw ArgumentError.value(
        requested,
        'requested',
        'anisotropy must be finite and in [1, 16]',
      );
    }
    final usableMax =
        extensionAvailable && maxSupported.isFinite && maxSupported >= 1
        ? (maxSupported > 16 ? 16.0 : maxSupported)
        : 1.0;
    final effective = requested < usableMax ? requested : usableMax;
    return AnisotropyDecision(
      requested: requested,
      effective: effective,
      maxSupported: usableMax,
      extensionAvailable: extensionAvailable,
    );
  }
}

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

  final double anisotropy;

  const GpuTextureDescriptor({
    required this.width,
    required this.height,
    this.layers = 1,
    this.hasMips = false,
    this.minFilter = GpuTextureFilter.linear,
    this.magFilter = GpuTextureFilter.linear,
    this.wrap = GpuTextureWrap.clampToEdge,
    this.anisotropy = 1,
  });

  /// Immutable storage levels, including the base image. Dimensions halve
  /// with integer truncation, as required by WebGL texture storage.
  int get mipLevelCount {
    if (!hasMips) return 1;
    var size = width > height ? width : height;
    var levels = 1;
    while (size > 1) {
      size ~/= 2;
      levels += 1;
    }
    return levels;
  }

  void validate() {
    if (width <= 0 || height <= 0 || layers <= 0) {
      throw ArgumentError('texture dimensions and layers must be > 0');
    }
    if (magFilter == GpuTextureFilter.linearMipmapLinear) {
      throw ArgumentError(
        'texture magFilter must be nearest or linear; mip filters only work for minFilter',
      );
    }
    if (minFilter == GpuTextureFilter.linearMipmapLinear && !hasMips) {
      throw ArgumentError(
        'texture minFilter linearMipmapLinear requires hasMips: true',
      );
    }
    if (!anisotropy.isFinite || anisotropy < 1 || anisotropy > 16) {
      throw ArgumentError('texture anisotropy must be finite and in [1, 16]');
    }
  }
}

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

abstract interface class GpuObject {}

enum GpuDeviceStatus { ready, lost }

enum GpuTimerStatus { unsupported, pending, ready, disjoint }

final class GpuTimerPoll {
  final GpuTimerStatus status;
  final int? elapsedNanoseconds;

  const GpuTimerPoll(this.status, [this.elapsedNanoseconds]);
}

enum ShaderCompileStage { vertex, fragment, link, validation }

final class ShaderCompileException implements Exception {
  final ShaderCompileStage stage;
  final String message;
  const ShaderCompileException(this.stage, this.message);

  @override
  String toString() => 'ShaderCompileException(${stage.name}: $message)';
}

abstract interface class GpuContextGeneration {
  int get contextGeneration;
}

abstract interface class GpuDevice {
  GpuDeviceStatus get status;
  RenderCapabilities queryCapabilities();

  GpuObject? beginGpuTimer();
  void endGpuTimer(GpuObject query);
  GpuTimerPoll pollGpuTimer(GpuObject query);
  void deleteGpuTimer(GpuObject query);

  GpuObject createBuffer(GpuBufferDescriptor descriptor);
  void uploadBuffer(
    GpuObject buffer,
    Float32List data, {
    int dstByteOffset = 0,
  });
  void deleteBuffer(GpuObject buffer);

  GpuObject createTexture(GpuTextureDescriptor descriptor);
  void uploadTextureLayer(GpuObject texture, int layer, Uint8List pixels);

  void finalizeMips(GpuObject texture);
  void deleteTexture(GpuObject texture);

  GpuObject createTarget(GpuTargetDescriptor descriptor);
  void deleteTarget(GpuObject target);

  void resolveTarget(GpuObject source, GpuObject destination);

  GpuObject createVertexArray();
  void deleteVertexArray(GpuObject vao);

  GpuObject compileProgram({
    required String vertexSource,
    required String fragmentSource,
    required List<String> requiredAttributes,
    required List<String> requiredUniforms,
  });
  void deleteProgram(GpuObject program);

  void simulateContextLoss();
  void simulateContextRestore();

  void bindTarget(GpuObject? target);

  void setColorAttachmentCount(int count);

  void applyDrawState(DrawStateDescriptor state);
  void clear(ClearMask mask, {double r, double g, double b, double a});

  void clearColorAttachment(
    int index, {
    double r,
    double g,
    double b,
    double a,
  });
  void useProgram(GpuObject program);
  void setUniform(String name, UniformValue value);
  void bindVertexArray(GpuObject vao);
  void bindTexture(int unit, GpuObject texture);

  void bindGlowTexture(int unit, GpuObject target);

  void bindArrayBuffer(GpuObject buffer);
  void vertexAttribPointer({
    required int location,
    required int componentCount,
    required int strideBytes,
    required int offsetBytes,
    GpuAttribFormat format = GpuAttribFormat.float,
  });
  void enableVertexAttribArray(int location);
  void vertexAttribDivisor(int location, int divisor);

  void bindElementArrayBuffer(GpuObject buffer);
  void uploadIndices(GpuObject buffer, List<int> data);

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

enum UniformType {
  float1,
  float2,
  float3,
  float4,
  int1,
  mat4,
  mat4Array,
  sampler,
}

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
  const UniformValue.float4(Float32List v)
    : type = UniformType.float4,
      value = v;
  const UniformValue.int1(int v) : type = UniformType.int1, value = v;
  const UniformValue.mat4(Float32List v) : type = UniformType.mat4, value = v;
  const UniformValue.mat4Array(Float32List v)
    : type = UniformType.mat4Array,
      value = v;
  const UniformValue.sampler(int textureUnit)
    : type = UniformType.sampler,
      value = textureUnit;
}

enum ClearMask { colorOnly, colorAndDepth, depthOnly }
