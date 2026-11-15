import 'dart:typed_data';

import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';

final class TextureArrayGroup {
  final String id;
  final int width;
  final int height;
  final int maxLayers;
  final GpuDevice device;
  GpuObject? _texture;
  final Map<int, int> _layerByTextureId = {};
  int _nextLayer = 0;

  TextureArrayGroup({
    required this.id,
    required this.width,
    required this.height,
    required this.maxLayers,
    required this.device,
  });

  int get layerCount => _nextLayer;
  bool get isFull => _nextLayer >= maxLayers;

  GpuObject get gpuTexture => _texture ??= device.createTexture(
    GpuTextureDescriptor(
      width: width,
      height: height,
      layers: maxLayers,
      hasMips: true,
      minFilter: GpuTextureFilter.linearMipmapLinear,
      magFilter: GpuTextureFilter.linear,
    ),
  );

  int allocateLayer(int textureId, Uint8List pixels) {
    if (_layerByTextureId.containsKey(textureId)) {
      return _layerByTextureId[textureId]!;
    }
    if (_nextLayer >= maxLayers) {
      throw StateError('TextureArrayGroup $id exceeded maxLayers ($maxLayers)');
    }
    final layer = _nextLayer++;
    _layerByTextureId[textureId] = layer;
    device.uploadTextureLayer(gpuTexture, layer, pixels);
    return layer;
  }

  int? layerOf(int textureId) => _layerByTextureId[textureId];

  void finalize() {
    if (_texture != null) {
      device.finalizeMips(_texture!);
    }
  }

  void bind(DrawCommandEncoder encoder, int unit) {
    encoder.bindTexture(unit, gpuTexture);
  }

  void dispose() {
    if (_texture != null) {
      device.deleteTexture(_texture!);
      _texture = null;
    }
    _layerByTextureId.clear();
    _nextLayer = 0;
  }
}
