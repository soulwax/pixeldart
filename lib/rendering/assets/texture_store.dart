import 'dart:typed_data';

import '../api/handles.dart';
import '../webgl/device_api.dart';
import '../webgl/fallback_resources.dart';
import '../webgl/resource_registry.dart';

final class _TextureRecord {
  final GpuTextureDescriptor descriptor;
  final List<Uint8List?> layerPixels;
  final bool mipsFinalized;

  const _TextureRecord({
    required this.descriptor,
    required this.layerPixels,
    this.mipsFinalized = false,
  });

  _TextureRecord withLayerPixels(int layer, Uint8List pixels) {
    final next = List<Uint8List?>.of(layerPixels);
    next[layer] = pixels;
    return _TextureRecord(
      descriptor: descriptor,
      layerPixels: next,
      mipsFinalized: mipsFinalized,
    );
  }

  _TextureRecord withMipsFinalized() => _TextureRecord(
    descriptor: descriptor,
    layerPixels: layerPixels,
    mipsFinalized: true,
  );
}

/// Uploads renderer-neutral pixel data to real GPU textures and tracks them
/// under the same slot+generation `ResourceRegistry` discipline `MeshStore`
/// and `MaterialStore` already use — RP-2's answer to `TODO.md`'s "no
/// TextureStore" gap, which is why `MaterialDefinition.albedoTexture` has
/// been declared since RV-08 with nothing to resolve it against.
///
/// Two-phase by design, not just eager upload like `MeshStore`: [declare]
/// alone reserves a handle with no pixels yet (the async-load shape a real
/// asset pipeline needs — fetch, then arrive), and [resolve] returns the
/// store-owned white fallback for a still-unloaded handle rather than an
/// undefined or garbage texture. §5.3's "missing optional art cannot make
/// geometry disappear" governs textures the same way `FallbackPixels`
/// already governs the backend's own built-ins; passing `pixels:` to
/// [declare] is the synchronous convenience every caller in this codebase
/// currently wants, layered on top of the same two-phase path.
final class TextureStore {
  final GpuDevice _device;
  final ResourceRegistry<TextureHandle, _TextureRecord> _registry;
  final Map<int, GpuObject> _texturesBySlot = {};
  late GpuObject _fallbackAlbedo;

  TextureStore(this._device)
    : _registry = ResourceRegistry<TextureHandle, _TextureRecord>(
        (slot, generation, label) => TextureHandle(slot, generation, label),
      ) {
    _fallbackAlbedo = _createFallbackAlbedo();
  }

  GpuObject _createFallbackAlbedo() {
    final texture = _device.createTexture(
      const GpuTextureDescriptor(width: 1, height: 1),
    );
    _device.uploadTextureLayer(texture, 0, FallbackPixels.whiteAlbedo);
    return texture;
  }

  /// Reserves a texture handle. With [pixels] supplied, uploads layer 0
  /// immediately (the synchronous path every current caller wants); without
  /// it, the handle resolves to the fallback until [updatePixels] arrives.
  /// [hasMips] declares intent only — [finalizeMips] must still be called
  /// once every layer's base level is uploaded, mirroring
  /// `GpuDevice.finalizeMips`'s own "callers upload every layer's base
  /// level first, then call this exactly once" contract.
  TextureHandle declare({
    required int width,
    required int height,
    int layers = 1,
    bool hasMips = false,
    GpuTextureWrap wrap = GpuTextureWrap.clampToEdge,
    GpuTextureFilter minFilter = GpuTextureFilter.linear,
    GpuTextureFilter magFilter = GpuTextureFilter.linear,
    Uint8List? pixels,
    String? debugLabel,
  }) {
    final descriptor = GpuTextureDescriptor(
      width: width,
      height: height,
      layers: layers,
      hasMips: hasMips,
      wrap: wrap,
      minFilter: minFilter,
      magFilter: magFilter,
    );
    final handle = _registry.declare(
      _TextureRecord(
        descriptor: descriptor,
        layerPixels: List<Uint8List?>.filled(layers, null),
      ),
      debugLabel: debugLabel,
    );
    if (pixels != null) {
      updatePixels(handle, pixels);
    }
    return handle;
  }

  /// Uploads (or replaces) one layer's pixels for an already-declared
  /// handle. The retained CPU descriptor is updated in place — not
  /// released-and-redeclared, which would mint a new identity and
  /// invalidate every existing reference — so the same [handle] keeps
  /// resolving before and after, and context-restore rehydration replays
  /// exactly what was uploaded.
  void updatePixels(TextureHandle handle, Uint8List pixels, {int layer = 0}) {
    final record = _registry.descriptorOf(handle);
    _registry.updateDescriptor(handle, record.withLayerPixels(layer, pixels));
    final texture = _texturesBySlot[handle.slot] ??= _device.createTexture(
      record.descriptor,
    );
    _device.uploadTextureLayer(texture, layer, pixels);
  }

  /// Generates mip levels for a texture declared with `hasMips: true`. A
  /// no-op if the handle was never declared mipped — matching
  /// `GpuDevice.finalizeMips`'s own no-op contract for a non-mipped
  /// texture, rather than requiring every caller to branch on it first.
  void finalizeMips(TextureHandle handle) {
    final record = _registry.descriptorOf(handle);
    if (!record.descriptor.hasMips) {
      return;
    }
    final texture = _texturesBySlot[handle.slot];
    if (texture == null) {
      throw StateError(
        'TextureStore.finalizeMips: no pixels uploaded yet for $handle',
      );
    }
    _device.finalizeMips(texture);
    _registry.updateDescriptor(handle, record.withMipsFinalized());
  }

  /// Validates [handle] (throwing `HandleException` for a wrong-kind,
  /// stale-generation, or released handle, exactly like `MeshStore`) and
  /// returns its real texture, or the fallback if nothing has been uploaded
  /// to it yet.
  GpuObject resolve(TextureHandle handle) {
    _registry.descriptorOf(handle);
    return _texturesBySlot[handle.slot] ?? _fallbackAlbedo;
  }

  /// The `AlbedoResolver` shape (`world.dart`): `null` — a material that
  /// declared no albedo texture of its own — resolves to the fallback
  /// exactly like an unloaded handle does, so a default material and a
  /// still-loading one are observably identical until real pixels arrive.
  GpuObject resolveAlbedo(TextureHandle? handle) {
    if (handle == null) {
      return _fallbackAlbedo;
    }
    return resolve(handle);
  }

  void release(TextureHandle handle) {
    final texture = _texturesBySlot.remove(handle.slot);
    if (texture != null) {
      _device.deleteTexture(texture);
    }
    _registry.release(handle);
  }

  /// Rebuilds every live, already-loaded texture from its retained pixel
  /// data after a context restore (mirrors `MeshStore`'s own rehydration).
  /// A handle that was declared but never loaded stays unloaded — there is
  /// no pixel data to replay, and it will keep resolving to the fallback
  /// exactly as it did before the loss, which is the correct outcome rather
  /// than a gap.
  void rehydrateAfterContextRestore() {
    _fallbackAlbedo = _createFallbackAlbedo();
    for (final (handle, record) in _registry.liveDescriptors()) {
      if (record.layerPixels.every((pixels) => pixels == null)) {
        continue;
      }
      final texture = _device.createTexture(record.descriptor);
      for (var layer = 0; layer < record.layerPixels.length; layer++) {
        final pixels = record.layerPixels[layer];
        if (pixels != null) {
          _device.uploadTextureLayer(texture, layer, pixels);
        }
      }
      if (record.mipsFinalized) {
        _device.finalizeMips(texture);
      }
      _texturesBySlot[handle.slot] = texture;
    }
  }

  int get liveCount => _registry.liveCount;
}
