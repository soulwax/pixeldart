import '../api/handles.dart';
import '../api/mesh.dart';
import '../webgl/device_api.dart';
import '../webgl/resource_registry.dart';

/// Maps a [VertexAttributeKind] to the shader attribute location it must
/// bind to. Fixed by the compatibility vertex contract (§5.4/§5.7), not
/// derived per-mesh — every compatibility-layout mesh in the safe graph
/// uses the same five locations `safe_world.vert`/`textured_world.vert`
/// declare. `uv0` and `legacyMaterialEffect` both map to location 4
/// deliberately: the shaders declare one `vec3 aUvMat` there (u, v, mat
/// packed together), not two separate attributes — see
/// `_skipRedundantUvMatBind`, which is what actually enforces that only one
/// `vertexAttribPointer` call happens for this shared location.
int _shaderLocationFor(VertexAttributeKind kind) => switch (kind) {
  VertexAttributeKind.position => 0,
  VertexAttributeKind.normal => 1,
  VertexAttributeKind.color => 2,
  VertexAttributeKind.alpha => 3,
  VertexAttributeKind.uv0 => 4,
  VertexAttributeKind.legacyMaterialEffect => 4,
  VertexAttributeKind.emissive => throw UnsupportedError(
    'MeshStore: no shader location reserved for VertexAttributeKind.emissive yet '
    '— safe_world.vert has no emissive input',
  ),
};

/// The real component count a shader attribute at [location] must read,
/// which can span more floats than [firstSlot] alone declares when a later
/// slot shares the same location (today: `uv0`'s 2 floats plus
/// `legacyMaterialEffect`'s 1 float = the shader's `vec3 aUvMat`). Sums
/// every slot in [layout] mapped to [location], not just [firstSlot], so
/// this stays correct if the layout gains a third co-located slot later.
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

  const UploadedMesh({
    required this.vertexBuffer,
    required this.indexBuffer,
    required this.vao,
    required this.indexCount,
    required this.vertexCount,
  });

  bool get isIndexed => indexBuffer != null;
}

/// Uploads renderer-neutral [MeshData] to real GPU buffers/VAO and tracks
/// them under RV-02's slot+generation `ResourceRegistry` discipline (RV-06
/// Phase B: "upload the decoded model through MeshStore"). One CPU
/// [MeshData] descriptor is kept per live handle so a context-restore
/// rehydration path can rebuild every GPU object without re-decoding the
/// source QMSH bytes.
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
      final componentCount = _componentCountAtLocation(mesh.layout, location, attr);
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
          byteLength: indices.lengthInBytes,
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

  /// Rebuilds every live upload from its retained CPU descriptor after a
  /// context restore (§7.4 step 5). Logical `MeshHandle`s remain stable;
  /// only the GPU-side objects change.
  void rehydrateAfterContextRestore() {
    for (final (handle, mesh) in _registry.liveDescriptors()) {
      _uploadsBySlot[handle.slot] = _uploadToGpu(mesh);
    }
  }

  int get liveCount => _registry.liveCount;
}
