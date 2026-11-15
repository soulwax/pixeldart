import '../core/instance_transforms.dart';
import '../math/transform.dart';
import 'device_api.dart';

final class InstancedAttributeStream {
  final GpuDevice device;
  final InstanceBufferStream bufferStream;
  GpuObject? _modelBuffer;
  GpuObject? _normalBuffer;

  InstancedAttributeStream(this.device, {int initialCapacity = 64})
    : bufferStream = InstanceBufferStream(initialCapacity: initialCapacity);

  int get capacity => bufferStream.capacity;
  int get activeCount => bufferStream.activeCount;

  void ensureBuffers(int count) {
    bufferStream.ensureCapacity(count);
    _modelBuffer ??= device.createBuffer(
      GpuBufferDescriptor(
        byteLength: bufferStream.capacity * 16 * 4,
        usage: GpuBufferUsage.dynamicDraw,
      ),
    );
    _normalBuffer ??= device.createBuffer(
      GpuBufferDescriptor(
        byteLength: bufferStream.capacity * 16 * 4,
        usage: GpuBufferUsage.dynamicDraw,
      ),
    );
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
  }
}
