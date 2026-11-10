import 'dart:typed_data';

import '../api/handles.dart';
import '../api/mesh.dart';
import '../webgl/device_api.dart';
import '../webgl/resource_registry.dart';

int _shaderLocationFor(VertexAttributeKind kind) => switch (kind) {
  VertexAttributeKind.position => 0,
  VertexAttributeKind.normal => 1,
  VertexAttributeKind.color => 2,
  VertexAttributeKind.alpha => 3,
  VertexAttributeKind.uv0 => 4,
  VertexAttributeKind.tangent4 => 5,
  VertexAttributeKind.uv1 => 6,
  VertexAttributeKind.legacyMaterialEffect => 4,
  VertexAttributeKind.emissive => throw UnsupportedError(
    'MeshStore: no shader location reserved for VertexAttributeKind.emissive yet '
    '— safe_world.vert has no emissive input',
  ),
};

int _componentCountAtLocation(
  VertexLayoutDescriptor layout,
  int location,
  VertexAttributeSlot firstSlot,
) {
  var total = 0;
  for (final attr in layout.attributes) {
    if (_shaderLocationFor(attr.kind) == location) {
      total += attr.floatCount;
    }
  }
  return total;
}

final class UploadedMesh {
  final GpuObject vertexBuffer;
  final GpuObject? indexBuffer;
  final GpuObject vao;
  final int indexCount;
  final int vertexCount;
  final bool usesUint32Indices;

  const UploadedMesh({
    required this.vertexBuffer,
    required this.indexBuffer,
    required this.vao,
    required this.indexCount,
    required this.vertexCount,
    required this.usesUint32Indices,
  });

  bool get isIndexed => indexBuffer != null;
}

final class MeshStore {
  final GpuDevice _device;
  final ResourceRegistry<MeshHandle, MeshData> _registry;
  final Map<int, UploadedMesh> _uploadsBySlot = {};

  MeshStore(this._device)
    : _registry = ResourceRegistry<MeshHandle, MeshData>(
        (slot, generation, label) => MeshHandle(slot, generation, label),
      );

  MeshHandle upload(MeshData mesh, {String? debugLabel}) {
    mesh.validate();
    final handle = _registry.declare(mesh, debugLabel: debugLabel);
    _uploadsBySlot[handle.slot] = _uploadToGpu(mesh);
    return handle;
  }

  UploadedMesh _uploadToGpu(MeshData mesh) {
    final vertexBuffer = _device.createBuffer(
      GpuBufferDescriptor(
        byteLength: mesh.vertices.lengthInBytes,
        usage: GpuBufferUsage.staticDraw,
      ),
    );
    _device.uploadBuffer(vertexBuffer, mesh.vertices);

    final vao = _device.createVertexArray();
    _device.bindVertexArray(vao);
    _device.bindArrayBuffer(vertexBuffer);
    final strideBytes = mesh.layout.strideFloats * 4;
    final boundLocations = <int>{};
    for (final attr in mesh.layout.attributes) {
      final location = _shaderLocationFor(attr.kind);
      // uv0 and legacyMaterialEffect share location 4 (one packed vec3
      // aUvMat, not two attributes) — the first slot to claim a location
      // wins and spans every float kept at that location by
      // `_uvMatComponentCount`; a second slot mapped to the same location
      // must not issue its own `vertexAttribPointer`, or it silently
      // overwrites the first with the wrong offset/component count. This
      // is exactly the bug that made every sampled UV read the constant
      // `mat` field instead of the real (u, v) pair.
      if (!boundLocations.add(location)) {
        continue;
      }
      final componentCount = _componentCountAtLocation(
        mesh.layout,
        location,
        attr,
      );
      _device.vertexAttribPointer(
        location: location,
        componentCount: componentCount,
        strideBytes: strideBytes,
        offsetBytes: attr.floatOffset * 4,
      );
      _device.enableVertexAttribArray(location);
    }

    GpuObject? indexBuffer;
    final indices = mesh.indices;
    if (indices != null) {
      indexBuffer = _device.createBuffer(
        GpuBufferDescriptor(
          byteLength: _indexByteLength(indices),
          usage: GpuBufferUsage.staticDraw,
          kind: GpuBufferKind.indices,
        ),
      );
      _device.bindElementArrayBuffer(indexBuffer);
      _device.uploadIndices(indexBuffer, indices);
    }

    return UploadedMesh(
      vertexBuffer: vertexBuffer,
      indexBuffer: indexBuffer,
      vao: vao,
      indexCount: indices?.length ?? 0,
      vertexCount: mesh.vertexCount,
      usesUint32Indices: indices is Uint32List,
    );
  }

  UploadedMesh resolve(MeshHandle handle) {
    final upload = _uploadsBySlot[handle.slot];
    if (upload == null) {
      throw HandleException(HandleRejection.releasedResource, handle);
    }
    // Confirms the handle's generation is still current, matching every
    // other resolve path in this codebase (throws on stale/released).
    _registry.descriptorOf(handle);
    return upload;
  }

  void release(MeshHandle handle) {
    final upload = _uploadsBySlot.remove(handle.slot);
    if (upload != null) {
      _device.deleteVertexArray(upload.vao);
      _device.deleteBuffer(upload.vertexBuffer);
      final indexBuffer = upload.indexBuffer;
      if (indexBuffer != null) {
        _device.deleteBuffer(indexBuffer);
      }
    }
    _registry.release(handle);
  }

  void rehydrateAfterContextRestore() {
    for (final (handle, mesh) in _registry.liveDescriptors()) {
      _uploadsBySlot[handle.slot] = _uploadToGpu(mesh);
    }
  }

  int get liveCount => _registry.liveCount;

  int get liveGpuBytes => _registry.liveDescriptors().fold<int>(
    0,
    (total, entry) =>
        total +
        entry.$2.vertices.lengthInBytes +
        _indexByteLengthOrZero(entry.$2.indices),
  );

  static int _indexByteLength(List<int> indices) => switch (indices) {
    Uint16List values => values.lengthInBytes,
    Uint32List values => values.lengthInBytes,
    _ => throw ArgumentError(
      'MeshStore indices must be Uint16List or Uint32List',
    ),
  };

  static int _indexByteLengthOrZero(List<int>? indices) =>
      indices == null ? 0 : _indexByteLength(indices);

  ResourceRegistry<MeshHandle, MeshData> get registry => _registry;
}
