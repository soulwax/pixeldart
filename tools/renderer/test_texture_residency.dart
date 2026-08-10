import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/assets/texture_store.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

Uint8List _onePixel() => Uint8List.fromList([40, 50, 60, 255]);

void main() {
  _deterministicOrderingAndDeduplication();
  _oneHundredProbesKeepOwnershipStable();
  _invalidRequestsAreRejected();
  print('Renderer texture-residency fixtures passed.');
}

void _deterministicOrderingAndDeduplication() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final loaded = store.declare(width: 4, height: 4, pixels: _onePixel());
  final pending = store.declare(width: 4, height: 4);
  final manager = TextureResidencyManager(store);
  final report = manager.prewarm([
    TextureResidencyRequest(key: 'pending', handle: pending),
    TextureResidencyRequest(key: 'loaded-z', handle: loaded, priority: 3),
    TextureResidencyRequest(key: 'loaded-a', handle: loaded, priority: 3),
  ]);
  require(
    report.results.map((result) => result.request.key).join(',') ==
        'loaded-a,loaded-z,pending',
    'residency requests were not ordered by priority then stable key',
  );
  require(
    report.uniqueHandleCount == 2 &&
        report.residentCount == 2 &&
        report.pendingCount == 1 &&
        report.missingCount == 0,
    'residency report did not deduplicate or classify loaded/pending handles',
  );
  store.release(loaded);
  final evicted = manager.prewarm([
    TextureResidencyRequest(key: 'loaded-a', handle: loaded),
    TextureResidencyRequest(key: 'pending', handle: pending),
  ]);
  require(
    evicted.results.first.status == TextureResidencyStatus.evicted &&
        evicted.results.last.status == TextureResidencyStatus.pending,
    'released resident texture was not diagnosed as evicted',
  );
  store.release(pending);
  store.dispose();
  require(device.liveObjectCount == 0, 'residency fixture leaked GPU objects');
}

void _oneHundredProbesKeepOwnershipStable() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final loaded = store.declare(width: 8, height: 8, pixels: _onePixel());
  final pending = store.declare(width: 8, height: 8);
  final manager = TextureResidencyManager(store);
  final requests = [
    TextureResidencyRequest(key: 'hero', handle: loaded, priority: 2),
    TextureResidencyRequest(key: 'hero-alias', handle: loaded, priority: 1),
    TextureResidencyRequest(key: 'ambient', handle: pending),
  ];
  final initialCreates = device.textureCreateCalls;
  final initialDeletes = device.textureDeleteCalls;
  final initialLive = store.liveCount;
  for (var iteration = 0; iteration < 100; iteration++) {
    final report = manager.prewarm(requests);
    require(
      report.uniqueHandleCount == 2 &&
          report.residentCount == 2 &&
          report.pendingCount == 1 &&
          report.results.first.request.key == 'hero',
      'prewarm report changed at iteration $iteration',
    );
    require(
      device.textureCreateCalls == initialCreates &&
          device.textureDeleteCalls == initialDeletes &&
          device.liveObjectCount == 6 &&
          store.liveCount == initialLive,
      'prewarm changed GPU/logical ownership at iteration $iteration',
    );
  }
  store.release(loaded);
  store.release(pending);
  store.dispose();
  require(device.liveObjectCount == 0, '100-probe fixture leaked GPU objects');
}

void _invalidRequestsAreRejected() {
  final store = TextureStore(FakeGpuDevice());
  final loaded = store.declare(width: 2, height: 2, pixels: _onePixel());
  final manager = TextureResidencyManager(store);

  var duplicateRejected = false;
  try {
    manager.prewarm([
      TextureResidencyRequest(key: 'same', handle: loaded),
      TextureResidencyRequest(key: 'same', handle: loaded),
    ]);
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    duplicateRejected = true;
  }
  require(duplicateRejected, 'duplicate residency keys were accepted');

  var invalidRejected = false;
  try {
    manager.prewarm([
      const TextureResidencyRequest(
        key: 'invalid',
        handle: TextureHandle.invalid,
      ),
    ]);
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    invalidRejected = true;
  }
  require(invalidRejected, 'invalid residency handles were accepted');

  final missing = manager.prewarm([
    const TextureResidencyRequest(key: 'missing', handle: TextureHandle(99, 1)),
  ]);
  require(
    missing.results.single.status == TextureResidencyStatus.missing,
    'unknown live-looking handle was not diagnosed as missing',
  );
  store.release(loaded);
  store.dispose();
}
