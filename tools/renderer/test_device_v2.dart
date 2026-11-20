import 'dart:typed_data';

import 'package:pixeldart/rendering/api/capabilities.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/state_cache.dart';

void _assert(bool condition, String message) {
  if (!condition) throw StateError('test_device_v2 failed: $message');
}

void main() {
  // 1. State cache UBO & texture binding deduplication
  final cache = WebGlStateCache();
  final uboA = Object();
  final uboB = Object();
  _assert(cache.shouldBindUbo(0, uboA), 'first UBO bind should pass');
  cache.markUboBound(0, uboA);
  _assert(!cache.shouldBindUbo(0, uboA), 'duplicate UBO bind should skip');
  _assert(cache.shouldBindUbo(0, uboB), 'different UBO bind should pass');
  _assert(cache.shouldBindUbo(1, uboA), 'different binding point should pass');

  final texA = Object();
  _assert(cache.shouldBindTexture(0, 0x8513, texA), 'first cube bind passes');
  cache.markTextureBound(0, 0x8513, texA);
  _assert(!cache.shouldBindTexture(0, 0x8513, texA), 'same cube bind skips');
  _assert(cache.shouldBindTexture(0, 0x8C1A, texA), 'target change passes');

  cache.invalidate();
  _assert(cache.shouldBindUbo(0, uboA), 'invalidate clears UBO cache');
  _assert(
    cache.shouldBindTexture(0, 0x8513, texA),
    'invalidate clears texture cache',
  );

  // 2. Descriptors & capability round-trip
  const caps = RenderCapabilities(
    maxTextureSize: 4096,
    maxTextureArrayLayers: 256,
    maxSamples: 4,
    maxVertexAttributes: 16,
    maxColorAttachments: 4,
    floatRenderTarget: true,
    halfFloatRenderTarget: true,
    occlusionQueryConservative: true,
    maxUniformBlockSize: 65536,
    maxUniformBufferBindings: 36,
    maxDrawBuffers: 4,
    maxCubeMapTextureSize: 4096,
  );
  final roundTrip = RenderCapabilities.fromMap(caps.toMap());
  _assert(roundTrip.maxUniformBlockSize == 65536, 'UBO block size round-trip');
  _assert(roundTrip.maxDrawBuffers == 4, 'maxDrawBuffers round-trip');
  _assert(roundTrip.occlusionQueryConservative, 'occlusion query capability');

  const uboDesc = GpuUniformBufferDescriptor(byteLength: 256);
  uboDesc.validate();

  const cubeDesc = GpuCubeTextureDescriptor(
    size: 256,
    format: GpuTextureFormat.rgba16f,
    hasMips: true,
    minFilter: GpuTextureFilter.linearMipmapLinear,
  );
  cubeDesc.validate();
  _assert(cubeDesc.mipLevelCount == 9, '256 cubemap has 9 mip levels');

  const arrayDesc = GpuTextureArrayDescriptor(
    width: 128,
    height: 128,
    layers: 8,
    format: GpuTextureFormat.rgba8,
    hasMips: true,
  );
  arrayDesc.validate();
  _assert(arrayDesc.mipLevelCount == 8, '128 array has 8 mip levels');

  const mrtDesc = GpuMrtTargetDescriptor(
    width: 640,
    height: 360,
    colorFormats: [GpuColorTargetFormat.rgba16f, GpuColorTargetFormat.rgba8],
  );
  mrtDesc.validate();

  // Ensure Float32List/ByteData imports are exercised cleanly.
  final uboBytes = ByteData(64)..setFloat32(0, 1.0, Endian.little);
  _assert(uboBytes.lengthInBytes == 64, 'UBO ByteData length');

  print('Device API v2 tests passed.');
}
