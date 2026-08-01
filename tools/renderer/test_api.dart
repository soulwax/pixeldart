import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';

void main() {
  _handleEquality();
  _handleInvalidationAndRehydration();
  _settingsValidation();
  _frameValidation();
  _meshValidation();
  print('Renderer API fixtures passed.');
}

void _handleEquality() {
  const a = MeshHandle(3, 1, 'wall');
  const b = MeshHandle(3, 1, 'different-label-does-not-affect-equality');
  const c = MeshHandle(3, 2, 'wall');
  const d = TextureHandle(3, 1, 'wall');

  if (a != b) {
    throw StateError('handles with equal slot/generation must be ==');
  }
  if (a.hashCode != b.hashCode) {
    throw StateError('equal handles must share hashCode');
  }
  if (a == c) {
    throw StateError('handles with different generation must not be ==');
  }
  if (identical(a, d) || a == (d as Object)) {
    throw StateError('handles of different kinds must never compare equal');
  }
}

/// Exercises the handle semantics RV-01 defines (§5.3) against a minimal
/// pure in-memory reference store. The real GPU-backed registry belongs to
/// RV-02; this proves the vocabulary — wrong kind, stale generation, double
/// release, draw-after-release — is enforceable without a GPU context.
void _handleInvalidationAndRehydration() {
  final store = _FakeMeshStore();

  final handle = store.register('a');
  if (!store.isLive(handle)) {
    throw StateError('freshly registered handle must be live');
  }

  store.release(handle);
  if (store.isLive(handle)) {
    throw StateError('released handle must not be live');
  }

  bool threw = false;
  try {
    store.release(handle);
  } on HandleException catch (e) {
    threw = e.reason == HandleRejection.doubleRelease;
  }
  if (!threw) {
    throw StateError('double release must throw HandleRejection.doubleRelease');
  }

  threw = false;
  try {
    store.draw(handle);
  } on HandleException catch (e) {
    threw = e.reason == HandleRejection.releasedResource;
  }
  if (!threw) {
    throw StateError(
      'draw after release must throw HandleRejection.releasedResource',
    );
  }

  final rehydrated = store.register('a-again');
  if (rehydrated.slot != handle.slot) {
    throw StateError('slot reuse expected in this fixture store');
  }
  if (rehydrated.generation == handle.generation) {
    throw StateError(
      'reused slot must bump generation so the old handle stays invalid',
    );
  }
  if (store.isLive(handle)) {
    throw StateError('old handle must remain invalid even after slot reuse');
  }
  store.draw(rehydrated);
}

void _settingsValidation() {
  RendererConfiguration.safe.validate();

  _expectThrows(
    () => const RendererConfiguration(
      profile: QualityProfile.safe,
      internalWidth: 0,
      internalHeight: 216,
    ).validate(),
  );

  _expectThrows(
    () => const RendererConfiguration(
      profile: QualityProfile.safe,
      internalWidth: 384,
      internalHeight: 216,
      shadowMapCount: 2,
      shadowMapSize: 0,
    ).validate(),
  );

  const surface = SurfaceMetrics(
    cssWidth: 1,
    cssHeight: 1,
    pixelWidth: 1,
    pixelHeight: 1,
  );
  surface.validate();
  if (surface.isZeroSized) {
    throw StateError('1x1 surface must not be zero-sized');
  }

  const zero = SurfaceMetrics(
    cssWidth: 0,
    cssHeight: 0,
    pixelWidth: 0,
    pixelHeight: 0,
  );
  zero.validate();
  if (!zero.isZeroSized) throw StateError('0x0 surface must be zero-sized');

  _expectThrows(
    () => const SurfaceMetrics(
      cssWidth: 100,
      cssHeight: 100,
      pixelWidth: 100,
      pixelHeight: 100,
      devicePixelRatio: 0,
    ).validate(),
  );
}

void _frameValidation() {
  final camera = CameraView(
    view: Mat4.identity(),
    projection: Mat4.identity(),
    viewProjection: Mat4.identity(),
    eye: Vec3.zero,
    forward: const Vec3(0, 0, -1),
    near: 0.1,
    far: 100,
    aspect: 16 / 9,
  );
  camera.validate();

  _expectThrows(
    () => CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: Vec3.zero,
      forward: const Vec3(0, 0, -1),
      near: 10,
      far: 5,
      aspect: 1,
    ).validate(),
  );

  const env = FrameEnvironment();
  env.validate();

  _expectThrows(
    () => const DirectionalLight(
      direction: Vec3.zero,
      color: LinearColor.white,
    ).validate(),
  );

  final negativeFrameIndex = FrameInput(
    camera: camera,
    environment: env,
    post: PostProcessState.off,
    frameIndex: -1,
    historyEpoch: 0,
    noiseSeed: 0,
    timeSeconds: 0,
  );
  _expectThrows(negativeFrameIndex.validate);

  final nonFiniteTime = FrameInput(
    camera: camera,
    environment: env,
    post: PostProcessState.off,
    frameIndex: 0,
    historyEpoch: 0,
    noiseSeed: 0,
    timeSeconds: double.nan,
  );
  _expectThrows(nonFiniteTime.validate);
}

void _meshValidation() {
  const layout = VertexLayoutDescriptor.compatibility14;
  final mesh = MeshData(
    layout: layout,
    vertices: Float32List(layout.strideFloats * 3),
    localBounds: const Aabb(Vec3.zero, Vec3.zero),
  );
  mesh.validate();

  final misaligned = MeshData(
    layout: layout,
    vertices: Float32List(layout.strideFloats * 3 + 1),
    localBounds: const Aabb(Vec3.zero, Vec3.zero),
  );
  _expectThrows(misaligned.validate);

  final outOfRangeIndex = MeshData(
    layout: layout,
    vertices: Float32List(layout.strideFloats * 2),
    indices: Uint16List.fromList([0, 1, 5]),
    localBounds: const Aabb(Vec3.zero, Vec3.zero),
  );
  _expectThrows(outOfRangeIndex.validate);
}

void _expectThrows(void Function() body) {
  try {
    body();
  } catch (_) {
    return;
  }
  throw StateError('Expected an exception, none was thrown.');
}

final class _FakeMeshStore {
  final List<String?> _labels = [];
  final List<int> _generations = [];
  final List<bool> _live = [];

  MeshHandle register(String label) {
    for (var i = 0; i < _live.length; i++) {
      if (!_live[i]) {
        _live[i] = true;
        _generations[i] += 1;
        _labels[i] = label;
        return MeshHandle(i, _generations[i], label);
      }
    }
    _labels.add(label);
    _generations.add(0);
    _live.add(true);
    return MeshHandle(_labels.length - 1, 0, label);
  }

  bool isLive(MeshHandle h) =>
      h.slot < _live.length &&
      _live[h.slot] &&
      _generations[h.slot] == h.generation;

  void release(MeshHandle h) {
    if (!isLive(h)) throw HandleException(HandleRejection.doubleRelease, h);
    _live[h.slot] = false;
  }

  void draw(MeshHandle h) {
    if (!isLive(h)) throw HandleException(HandleRejection.releasedResource, h);
  }
}
