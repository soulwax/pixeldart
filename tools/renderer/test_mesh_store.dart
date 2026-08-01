import 'dart:typed_data';

import 'package:pixeldart/rendering/assets/mesh_store.dart';
import 'package:pixeldart/rendering/rendering.dart';

import 'fake_gpu_device.dart';

void main() {
  _uploadCreatesRealBuffersAndVao();
  _indexedMeshResolvesWithCorrectDrawCount();
  _nonIndexedMeshResolvesWithVertexCount();
  _releaseDeletesGpuObjectsAndInvalidatesHandle();
  _rehydrateAfterContextRestoreRebuildsFromCpuDescriptor();
  print('Renderer mesh store fixtures passed.');
}

MeshData _triangleMesh({bool indexed = false}) {
  final vertices = Float32List(
    VertexLayoutDescriptor.compatibility14.strideFloats * 3,
  );
  return MeshData(
    layout: VertexLayoutDescriptor.compatibility14,
    vertices: vertices,
    indices: indexed ? Uint16List.fromList([0, 1, 2]) : null,
    localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
  );
}

void _uploadCreatesRealBuffersAndVao() {
  final device = FakeGpuDevice();
  final store = MeshStore(device);
  store.upload(_triangleMesh());

  if (device.bufferCreateCalls != 1) {
    throw StateError(
      'expected exactly 1 buffer created for a non-indexed mesh, got ${device.bufferCreateCalls}',
    );
  }
  if (device.vaoCreateCalls != 1) {
    throw StateError(
      'expected exactly 1 VAO created, got ${device.vaoCreateCalls}',
    );
  }
  final attribPointerCalls = device.drawLog
      .where((e) => e.startsWith('vertexAttribPointer'))
      .length;
  // One call per *shader location* (5: position, normal, color, alpha,
  // uv+mat), not one per layout attribute slot (6) — compatibility14's
  // uv0 and legacyMaterialEffect slots share shader location 4 (one packed
  // vec3 aUvMat), so they must collapse into a single vertexAttribPointer
  // call. A second call to the same location would silently overwrite the
  // first with the wrong offset/component count — the real bug this
  // assertion exists to catch.
  const expectedLocationCount = 5;
  if (attribPointerCalls != expectedLocationCount) {
    throw StateError(
      'expected exactly $expectedLocationCount vertexAttribPointer calls '
      '(one per shader location, with uv0+legacyMaterialEffect sharing '
      'location 4), got $attribPointerCalls',
    );
  }

  // location 4 must read 3 floats (u, v, mat) starting at float offset 11
  // (byte 44) — the exact packed vec3 aUvMat span. A regression back to two
  // separate calls, or a wrong componentCount/offset on the surviving call,
  // is what produced the real browser bug this fixture exists to catch: a
  // sampled UV that silently read the constant `mat` field instead.
  final location4Call = device.drawLog.firstWhere(
    (e) => e.startsWith('vertexAttribPointer(4,'),
    orElse: () => throw StateError('expected a vertexAttribPointer call for location 4'),
  );
  if (location4Call != 'vertexAttribPointer(4, 3, 56, 44)') {
    throw StateError(
      'expected vertexAttribPointer(4, 3, 56, 44) for the packed uv+mat '
      'attribute, got: $location4Call',
    );
  }
}

void _indexedMeshResolvesWithCorrectDrawCount() {
  final device = FakeGpuDevice();
  final store = MeshStore(device);
  final handle = store.upload(_triangleMesh(indexed: true));

  if (device.bufferCreateCalls != 2) {
    throw StateError(
      'expected 2 buffers (vertex + index) for an indexed mesh, got ${device.bufferCreateCalls}',
    );
  }
  final resolved = store.resolve(handle);
  if (!resolved.isIndexed) {
    throw StateError('expected the resolved mesh to report isIndexed=true');
  }
  if (resolved.indexCount != 3) {
    throw StateError('expected indexCount=3, got ${resolved.indexCount}');
  }
}

void _nonIndexedMeshResolvesWithVertexCount() {
  final device = FakeGpuDevice();
  final store = MeshStore(device);
  final handle = store.upload(_triangleMesh());
  final resolved = store.resolve(handle);
  if (resolved.isIndexed) {
    throw StateError('expected the resolved mesh to report isIndexed=false');
  }
  if (resolved.vertexCount != 3) {
    throw StateError('expected vertexCount=3, got ${resolved.vertexCount}');
  }
}

void _releaseDeletesGpuObjectsAndInvalidatesHandle() {
  final device = FakeGpuDevice();
  final store = MeshStore(device);
  final handle = store.upload(_triangleMesh(indexed: true));

  store.release(handle);

  if (device.bufferDeleteCalls != 2) {
    throw StateError(
      'expected both vertex and index buffers deleted, got ${device.bufferDeleteCalls} deletes',
    );
  }
  if (device.vaoDeleteCalls != 1) {
    throw StateError(
      'expected the VAO deleted, got ${device.vaoDeleteCalls} deletes',
    );
  }

  bool threw = false;
  try {
    store.resolve(handle);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('resolving a released MeshHandle must throw');
  }
}

void _rehydrateAfterContextRestoreRebuildsFromCpuDescriptor() {
  final device = FakeGpuDevice();
  final store = MeshStore(device);
  final handle = store.upload(
    _triangleMesh(indexed: true),
    debugLabel: 'survives-restore',
  );

  final beforeCreates = device.vaoCreateCalls;
  store.rehydrateAfterContextRestore();

  if (device.vaoCreateCalls != beforeCreates + 1) {
    throw StateError(
      'rehydrate must create exactly one new VAO for the one live mesh',
    );
  }
  final resolved = store.resolve(handle);
  if (!device.isLive(resolved.vao)) {
    throw StateError(
      'the resolved VAO after rehydration must be a live GPU object',
    );
  }
  if (store.liveCount != 1) {
    throw StateError('rehydration must not change the logical live count');
  }
}
