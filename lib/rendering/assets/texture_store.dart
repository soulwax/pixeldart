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
  late GpuObject _fallbackNormal;
  late GpuObject _fallbackOrm;
  late GpuObject _fallbackEmissive;
  late GpuObject _fallbackLightmap;

  TextureStore(this._device)
    : _registry = ResourceRegistry<TextureHandle, _TextureRecord>(
        (slot, generation, label) => TextureHandle(slot, generation, label),
      ) {
    _fallbackAlbedo = _createFallbackAlbedo();
    _fallbackNormal = _createFallback(FallbackPixels.flatNormal);
    _fallbackOrm = _createFallback(FallbackPixels.identityOrm);
    _fallbackEmissive = _createFallback(FallbackPixels.blackEmissive);
    _fallbackLightmap = _createFallback(FallbackPixels.neutralLightmap);
  }

  GpuObject _createFallbackAlbedo() {
    return _createFallback(FallbackPixels.whiteAlbedo);
  }

  GpuObject _createFallback(Uint8List pixels) {
    final texture = _device.createTexture(
      const GpuTextureDescriptor(width: 1, height: 1),
    );
    _device.uploadTextureLayer(texture, 0, pixels);
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
    double anisotropy = 1,
    Uint8List? pixels,
    String? debugLabel,
  }) {
    if (width <= 0 || height <= 0 || layers <= 0) {
      throw ArgumentError('TextureStore.declare dimensions/layers must be > 0');
    }
    if (!anisotropy.isFinite || anisotropy < 1 || anisotropy > 16) {
      throw ArgumentError(
        'TextureStore.declare anisotropy must be in [1, 16]: $anisotropy',
      );
    }
    if (minFilter == GpuTextureFilter.linearMipmapLinear && !hasMips) {
      throw ArgumentError(
        'TextureStore.declare linearMipmapLinear requires hasMips: true',
      );
    }
    final descriptor = GpuTextureDescriptor(
      width: width,
      height: height,
      layers: layers,
      hasMips: hasMips,
      wrap: wrap,
      minFilter: minFilter,
      magFilter: magFilter,
      anisotropy: anisotropy,
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
    return _resolve(handle, _fallbackAlbedo);
  }

  /// Reports whether every declared layer has source pixels. A declared
  /// handle is intentionally not considered resident merely because its
  /// fallback texture can be resolved; presentation features use this to
  /// preserve their authored fallback while an async image is loading.
  bool isResident(TextureHandle handle) {
    final record = _registry.descriptorOf(handle);
    return record.layerPixels.every((pixels) => pixels != null);
  }

  GpuObject _resolve(TextureHandle handle, GpuObject fallback) {
    _registry.descriptorOf(handle);
    return _texturesBySlot[handle.slot] ?? fallback;
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

  GpuObject resolveNormal(TextureHandle? handle) {
    if (handle == null) return _fallbackNormal;
    return _resolve(handle, _fallbackNormal);
  }

  GpuObject resolveOrm(TextureHandle? handle) {
    if (handle == null) return _fallbackOrm;
    return _resolve(handle, _fallbackOrm);
  }

  GpuObject resolveEmissive(TextureHandle? handle) {
    if (handle == null) return _fallbackEmissive;
    return _resolve(handle, _fallbackEmissive);
  }

  GpuObject resolveLightmap(TextureHandle? handle) {
    if (handle == null) return _fallbackLightmap;
    return _resolve(handle, _fallbackLightmap);
  }

  /// Built-in white texture used by passes when a material has no albedo or
  /// its declared texture has not received pixels yet.
  GpuObject get fallbackAlbedo => _fallbackAlbedo;
  GpuObject get fallbackNormal => _fallbackNormal;
  GpuObject get fallbackOrm => _fallbackOrm;
  GpuObject get fallbackEmissive => _fallbackEmissive;
  GpuObject get fallbackLightmap => _fallbackLightmap;

  void release(TextureHandle handle) {
    final texture = _texturesBySlot.remove(handle.slot);
    if (texture != null) {
      _device.deleteTexture(texture);
    }
    _registry.release(handle);
  }

  /// Releases device-owned textures that are not represented by public
  /// handles. The fallback set is created with the store and therefore must
  /// be torn down with it; otherwise every renderer disposal leaks five
  /// 1x1 textures even when the application registered no textures.
  void dispose() {
    for (final texture in _texturesBySlot.values) {
      _device.deleteTexture(texture);
    }
    _texturesBySlot.clear();
    _device.deleteTexture(_fallbackAlbedo);
    _device.deleteTexture(_fallbackNormal);
    _device.deleteTexture(_fallbackOrm);
    _device.deleteTexture(_fallbackEmissive);
    _device.deleteTexture(_fallbackLightmap);
  }

  /// Rebuilds every live, already-loaded texture from its retained pixel
  /// data after a context restore (mirrors `MeshStore`'s own rehydration).
  /// A handle that was declared but never loaded stays unloaded — there is
  /// no pixel data to replay, and it will keep resolving to the fallback
  /// exactly as it did before the loss, which is the correct outcome rather
  /// than a gap.
  void rehydrateAfterContextRestore() {
    _fallbackAlbedo = _createFallbackAlbedo();
    _fallbackNormal = _createFallback(FallbackPixels.flatNormal);
    _fallbackOrm = _createFallback(FallbackPixels.identityOrm);
    _fallbackEmissive = _createFallback(FallbackPixels.blackEmissive);
    _fallbackLightmap = _createFallback(FallbackPixels.neutralLightmap);
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
  int get createCount => _registry.createCount;
  int get deleteCount => _registry.deleteCount;

  /// Estimated retained pixel payload for frame-budget diagnostics. It
  /// excludes driver allocation overhead and the built-in 1x1 fallback.
  int get liveGpuBytes => _registry.liveDescriptors().fold<int>(0, (
    total,
    entry,
  ) {
    final descriptor = entry.$2.descriptor;
    return total + descriptor.width * descriptor.height * descriptor.layers * 4;
  });
}
