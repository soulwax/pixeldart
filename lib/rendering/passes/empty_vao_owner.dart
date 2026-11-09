import '../webgl/device_api.dart';

/// Owns the empty vertex arrays full-screen passes draw from. They are
/// rebuilt with the graph, so each feature must free its own on dispose.
mixin EmptyVaoOwner {
  GpuDevice get device;

  final List<GpuObject> _emptyVaos = [];

  GpuObject createEmptyVao() {
    final vao = device.createVertexArray();
    _emptyVaos.add(vao);
    return vao;
  }

  void releaseEmptyVaos() {
    for (final vao in _emptyVaos) {
      device.deleteVertexArray(vao);
    }
    _emptyVaos.clear();
  }
}
