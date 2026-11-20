import 'dart:typed_data';

import '../api/capabilities.dart';
import '../api/render_pass_decl.dart';
import '../api/scene.dart';
import '../core/instance_transforms.dart';
import '../math/mat4.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import 'device_api.dart';

/// Per-instance vertex-attribute buffer stream (divisor 1) replacing the
/// legacy 16-element uniform array cap (`[S1-B]`).
final class InstancedAttributeStream {
  final GpuDevice device;
  final InstanceBufferStream bufferStream;
  GpuObject? _modelBuffer;
  GpuObject? _normalBuffer;
  int _allocatedCapacity = 0;
  int _lastContextGeneration = -1;

  InstancedAttributeStream(this.device, {int initialCapacity = 64})
    : bufferStream = InstanceBufferStream(initialCapacity: initialCapacity);

  int get capacity => bufferStream.capacity;
  int get activeCount => bufferStream.activeCount;

  int get _currentGeneration => device is GpuContextGeneration
      ? (device as GpuContextGeneration).contextGeneration
      : 0;

  void ensureBuffers(int count) {
    final gen = _currentGeneration;
    if (_lastContextGeneration != gen) {
      // Context was lost/restored; discard stale handles without deleting them.
      _modelBuffer = null;
      _normalBuffer = null;
      _allocatedCapacity = 0;
      _lastContextGeneration = gen;
    }
    bufferStream.ensureCapacity(count);
    if (_modelBuffer == null || _allocatedCapacity < bufferStream.capacity) {
      if (_modelBuffer != null) device.deleteBuffer(_modelBuffer!);
      if (_normalBuffer != null) device.deleteBuffer(_normalBuffer!);
      _allocatedCapacity = bufferStream.capacity;
      _modelBuffer = device.createBuffer(
        GpuBufferDescriptor(
          byteLength: _allocatedCapacity * 16 * 4,
          usage: GpuBufferUsage.dynamicDraw,
        ),
      );
      _normalBuffer = device.createBuffer(
        GpuBufferDescriptor(
          byteLength: _allocatedCapacity * 16 * 4,
          usage: GpuBufferUsage.dynamicDraw,
        ),
      );
    }
  }

  void streamViews(
    List<RetainedItemView> items, {
    bool computeNormals = true,
  }) {
    ensureBuffers(items.length);
    bufferStream.packViews(items, computeNormals: computeNormals);
    if (_modelBuffer != null) {
      bufferStream.uploadModelsToGpu(device, _modelBuffer!);
    }
    if (computeNormals && _normalBuffer != null) {
      bufferStream.uploadNormalsToGpu(device, _normalBuffer!);
    }
  }

  void streamTransforms(
    List<Transform> transforms, {
    bool computeNormals = true,
  }) {
    ensureBuffers(transforms.length);
    bufferStream.packTransforms(transforms, computeNormals: computeNormals);
    if (_modelBuffer != null) {
      bufferStream.uploadModelsToGpu(device, _modelBuffer!);
    }
    if (computeNormals && _normalBuffer != null) {
      bufferStream.uploadNormalsToGpu(device, _normalBuffer!);
    }
  }

  void bindInstancedAttributes({
    int modelAttribLocation = 7,
    int normalAttribLocation = 11,
    bool includeNormals = true,
  }) {
    if (_modelBuffer != null) {
      device.bindArrayBuffer(_modelBuffer!);
      for (var i = 0; i < 4; i++) {
        final loc = modelAttribLocation + i;
        device.enableVertexAttribArray(loc);
        device.vertexAttribPointer(
          location: loc,
          componentCount: 4,
          strideBytes: 16 * 4,
          offsetBytes: i * 4 * 4,
        );
        device.vertexAttribDivisor(loc, 1);
      }
    }
    if (includeNormals && _normalBuffer != null) {
      device.bindArrayBuffer(_normalBuffer!);
      for (var i = 0; i < 4; i++) {
        final loc = normalAttribLocation + i;
        device.enableVertexAttribArray(loc);
        device.vertexAttribPointer(
          location: loc,
          componentCount: 4,
          strideBytes: 16 * 4,
          offsetBytes: i * 4 * 4,
        );
        device.vertexAttribDivisor(loc, 1);
      }
    }
  }

  void dispose() {
    if (_modelBuffer != null) {
      device.deleteBuffer(_modelBuffer!);
      _modelBuffer = null;
    }
    if (_normalBuffer != null) {
      device.deleteBuffer(_normalBuffer!);
      _normalBuffer = null;
    }
    _allocatedCapacity = 0;
  }
}

/// std140 `FrameBlock` UBO layout helper shared across world & depth passes
/// (`[S1-B]`):
/// - offset   0..63:  `mat4 uFrameViewProjection`
/// - offset  64..127: `mat4 uFrameView`
/// - offset 128..143: `vec4 uFrameCameraPosTime` (xyz = camera pos, w = time)
/// - offset 144..159: `vec4 uFrameExposureParams` (x = exposure, yzw = reserved)
final class FrameBlockUbo {
  static const int bindingPoint = 0;
  static const int byteLength = 160;
  static const String blockName = 'FrameBlock';

  static ByteData pack({
    required Mat4 viewProjection,
    required Mat4 view,
    required Vec3 cameraPosition,
    double timeSeconds = 0.0,
    double exposure = 1.0,
  }) {
    final floats = Float32List(40);
    for (var i = 0; i < 16; i++) {
      floats[i] = viewProjection.m[i];
      floats[16 + i] = view.m[i];
    }
    floats[32] = cameraPosition.x;
    floats[33] = cameraPosition.y;
    floats[34] = cameraPosition.z;
    floats[35] = timeSeconds;
    floats[36] = exposure;
    return floats.buffer.asByteData();
  }
}

/// std140 256-joint `SkinBlock` UBO helper (`[S1-B]`) with automatic
/// RGBA32F texture fallback detection when `MAX_UNIFORM_BLOCK_SIZE < 16384`.
final class SkinBlockUbo {
  static const int bindingPoint = 1;
  static const int maxJoints = RenderingShaderContracts.maxSkinJoints;
  static const int byteLength = maxJoints * 16 * 4; // 16384 bytes
  static const String blockName = 'SkinBlock';

  static bool supportsUboPalette(RenderCapabilities caps) =>
      caps.maxUniformBlockSize >= byteLength;

  static ByteData pack(Float32List jointMatrices) {
    final out = Float32List(maxJoints * 16);
    final copyLen = jointMatrices.length < out.length
        ? jointMatrices.length
        : out.length;
    out.setRange(0, copyLen, jointMatrices);
    return out.buffer.asByteData();
  }
}
