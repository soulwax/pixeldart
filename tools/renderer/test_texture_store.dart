import 'dart:typed_data';

import 'package:pixeldart/rendering/api/handles.dart';
import 'package:pixeldart/rendering/assets/texture_store.dart';

import 'fake_gpu_device.dart';

void main() {
  _declareWithPixelsUploadsImmediately();
  _declareWithoutPixelsResolvesToFallbackUntilLoaded();
  _resolveAlbedoNullReturnsTheSameFallback();
  _mipsFinalizedOnlyWhenDeclaredMipped();
  _releaseDeletesTextureAndInvalidatesHandle();
  _rehydrateReuploadsLoadedTexturesAndSkipsUnloadedOnes();
  _handleRejectionVocabulary();
  print('Renderer texture store fixtures passed.');
}

Uint8List _onePixel() => Uint8List.fromList([10, 20, 30, 255]);

void _declareWithPixelsUploadsImmediately() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final beforeCreates = device.textureCreateCalls;

  final handle = store.declare(width: 4, height: 4, pixels: _onePixel());
  final resolved = store.resolve(handle);

  if (device.textureCreateCalls != beforeCreates + 1) {
    throw StateError(
      'expected exactly one new texture created for an eager declare, got '
      '${device.textureCreateCalls - beforeCreates}',
    );
  }
  if (!device.isLive(resolved)) {
    throw StateError('resolved texture must be a live GPU object');
  }
}

/// The two-phase path: a handle declared without pixels must resolve to the
/// exact same fallback object `resolveAlbedo(null)` gives — a still-loading
/// asset and "no asset at all" are meant to be observably identical — and
/// only after `updatePixels` does it resolve to a distinct, real texture.
void _declareWithoutPixelsResolvesToFallbackUntilLoaded() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final fallback = store.resolveAlbedo(null);

  final handle = store.declare(width: 4, height: 4);
  final beforeLoad = store.resolve(handle);
  if (!identical(beforeLoad, fallback)) {
    throw StateError(
      'an unloaded handle must resolve to the exact same fallback object '
      'as resolveAlbedo(null), not a separate white texture of its own',
    );
  }

  store.updatePixels(handle, _onePixel());
  final afterLoad = store.resolve(handle);
  if (identical(afterLoad, fallback)) {
    throw StateError(
      'a handle must resolve to its own real texture once pixels arrive, '
      'not continue returning the fallback',
    );
  }
}

void _resolveAlbedoNullReturnsTheSameFallback() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final a = store.resolveAlbedo(null);
  final b = store.resolveAlbedo(null);
  if (!identical(a, b)) {
    throw StateError(
      'resolveAlbedo(null) must always return the one store-owned fallback '
      'object, not mint a new texture per call',
    );
  }
}

/// `finalizeMips` mirrors `GpuDevice.finalizeMips`'s own contract: a real
/// call for a texture declared `hasMips: true`, an explicit no-op for one
/// that was not — never a StateError either way, so a caller need not
/// branch on `hasMips` before calling it.
void _mipsFinalizedOnlyWhenDeclaredMipped() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);

  final mipped = store.declare(
    width: 4,
    height: 4,
    hasMips: true,
    pixels: _onePixel(),
  );
  final beforeMipped = device.textureMipsFinalizedCalls;
  store.finalizeMips(mipped);
  if (device.textureMipsFinalizedCalls != beforeMipped + 1) {
    throw StateError(
      'finalizeMips on a hasMips:true texture must call the device exactly '
      'once, got ${device.textureMipsFinalizedCalls - beforeMipped}',
    );
  }

  final unmipped = store.declare(width: 4, height: 4, pixels: _onePixel());
  final beforeUnmipped = device.textureMipsFinalizedCalls;
  store.finalizeMips(unmipped);
  if (device.textureMipsFinalizedCalls != beforeUnmipped) {
    throw StateError(
      'finalizeMips on a hasMips:false texture must be a no-op, got '
      '${device.textureMipsFinalizedCalls - beforeUnmipped} device calls',
    );
  }
}

void _releaseDeletesTextureAndInvalidatesHandle() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final handle = store.declare(width: 4, height: 4, pixels: _onePixel());

  final beforeDeletes = device.textureDeleteCalls;
  store.release(handle);
  if (device.textureDeleteCalls != beforeDeletes + 1) {
    throw StateError(
      'release must delete the one uploaded texture, got '
      '${device.textureDeleteCalls - beforeDeletes} deletes',
    );
  }

  var threw = false;
  try {
    store.resolve(handle);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('resolving a released TextureHandle must throw');
  }
}

void _rehydrateReuploadsLoadedTexturesAndSkipsUnloadedOnes() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final loaded = store.declare(
    width: 4,
    height: 4,
    pixels: _onePixel(),
    debugLabel: 'loaded',
  );
  final unloaded = store.declare(width: 4, height: 4, debugLabel: 'unloaded');

  final beforeCreates = device.textureCreateCalls;
  store.rehydrateAfterContextRestore();

  // Exactly two new textures: the loaded handle's real one, plus the
  // fallback itself (also a real GPU object invalidated by the same
  // context loss) — the unloaded handle has no pixel data to replay and
  // must not cost a create call of its own.
  if (device.textureCreateCalls != beforeCreates + 2) {
    throw StateError(
      'rehydrate must create exactly 2 textures (the loaded handle + the '
      'fallback), got ${device.textureCreateCalls - beforeCreates}',
    );
  }

  final loadedResolved = store.resolve(loaded);
  if (!device.isLive(loadedResolved)) {
    throw StateError('the rehydrated loaded texture must be a live object');
  }
  final unloadedResolved = store.resolve(unloaded);
  if (!identical(unloadedResolved, store.resolveAlbedo(null))) {
    throw StateError(
      'the still-unloaded handle must keep resolving to the fallback after '
      'rehydration, not a stale or missing object',
    );
  }
  if (store.liveCount != 2) {
    throw StateError('rehydration must not change the logical live count');
  }
}

void _handleRejectionVocabulary() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final handle = store.declare(width: 4, height: 4, pixels: _onePixel());
  store.release(handle);

  var doubleReleaseThrew = false;
  try {
    store.release(handle);
  } catch (_) {
    doubleReleaseThrew = true;
  }
  if (!doubleReleaseThrew) {
    throw StateError('releasing an already-released TextureHandle must throw');
  }

  var staleGenerationThrew = false;
  try {
    store.resolve(TextureHandle(handle.slot, handle.generation + 5));
  } catch (_) {
    staleGenerationThrew = true;
  }
  if (!staleGenerationThrew) {
    throw StateError('resolving a stale-generation TextureHandle must throw');
  }

  var wrongKindThrew = false;
  try {
    store.resolve(const TextureHandle(9999, 1));
  } catch (_) {
    wrongKindThrew = true;
  }
  if (!wrongKindThrew) {
    throw StateError('resolving an out-of-range TextureHandle must throw');
  }
}
