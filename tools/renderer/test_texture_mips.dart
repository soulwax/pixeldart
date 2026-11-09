import 'dart:typed_data';

import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/assets/texture_store.dart';

import 'fake_gpu_device.dart';

void main() {
  _nonMippedTextureNeverFlaggedUnfinalized();
  _mippedTextureRequiresFinalizeMips();
  _finalizeMipsIsNoOpOnNonMippedTexture();
  _nonPowerOfTwoMipCounts();
  _invalidFilterCombinationsAreRejectedBeforeAllocation();
  print('Renderer texture mip fixtures passed.');
}

void _nonPowerOfTwoMipCounts() {
  const sizes = <(int, int, int)>[
    (1, 1, 1),
    (3, 3, 2),
    (5, 3, 3),
    (257, 1, 9),
    (512, 7, 10),
  ];
  for (final (width, height, expected) in sizes) {
    final descriptor = GpuTextureDescriptor(
      width: width,
      height: height,
      hasMips: true,
    );
    if (descriptor.mipLevelCount != expected) {
      throw StateError(
        '${width}x$height needs $expected mip levels, got ${descriptor.mipLevelCount}',
      );
    }
  }
  if (const GpuTextureDescriptor(width: 257, height: 1).mipLevelCount != 1) {
    throw StateError('unmipped textures must allocate only the base level');
  }
}

void _invalidFilterCombinationsAreRejectedBeforeAllocation() {
  final device = FakeGpuDevice();
  final store = TextureStore(device);
  final creates = device.textureCreateCalls;
  final live = store.liveCount;

  final invalid = <GpuTextureDescriptor>[
    const GpuTextureDescriptor(
      width: 4,
      height: 4,
      magFilter: GpuTextureFilter.linearMipmapLinear,
    ),
    const GpuTextureDescriptor(
      width: 4,
      height: 4,
      minFilter: GpuTextureFilter.linearMipmapLinear,
    ),
  ];
  for (final descriptor in invalid) {
    var rejected = false;
    try {
      store.declare(
        width: descriptor.width,
        height: descriptor.height,
        hasMips: descriptor.hasMips,
        minFilter: descriptor.minFilter,
        magFilter: descriptor.magFilter,
      );
    } catch (error) {
      if (error is! ArgumentError) rethrow;
      rejected = true;
    }
    if (!rejected ||
        store.liveCount != live ||
        device.textureCreateCalls != creates) {
      throw StateError('invalid sampling allocated a texture or handle');
    }
    rejected = false;
    try {
      device.createTexture(descriptor);
    } catch (error) {
      if (error is! ArgumentError) rethrow;
      rejected = true;
    }
    if (!rejected || device.textureCreateCalls != creates) {
      throw StateError('direct device accepted invalid sampling');
    }
  }

  // The extension permits anisotropy independently of filter choice and
  // mips. Nearest filtering remains a valid opt-in for pixel-art textures.
  const valid = GpuTextureDescriptor(
    width: 3,
    height: 5,
    minFilter: GpuTextureFilter.nearest,
    magFilter: GpuTextureFilter.nearest,
    anisotropy: 4,
  );
  valid.validate();
  store.dispose();
}

void _nonMippedTextureNeverFlaggedUnfinalized() {
  final device = FakeGpuDevice();
  final texture = device.createTextureMipped(
    const GpuTextureDescriptor(width: 4, height: 4, hasMips: false),
  );
  if (device.hasUnfinalizedMips(texture)) {
    throw StateError(
      'a texture created with hasMips:false must never be flagged unfinalized',
    );
  }
}

void _mippedTextureRequiresFinalizeMips() {
  final device = FakeGpuDevice();
  final texture = device.createTextureMipped(
    const GpuTextureDescriptor(width: 4, height: 4, hasMips: true),
  );
  if (!device.hasUnfinalizedMips(texture)) {
    throw StateError(
      'a freshly created mipped texture must be flagged unfinalized until finalizeMips runs',
    );
  }

  device.uploadTextureLayer(texture, 0, Uint8List(4 * 4 * 4));
  if (!device.hasUnfinalizedMips(texture)) {
    throw StateError(
      'uploading the base layer alone must not clear the unfinalized-mips flag',
    );
  }

  device.finalizeMips(texture);
  if (device.hasUnfinalizedMips(texture)) {
    throw StateError('finalizeMips must clear the unfinalized-mips flag');
  }
  if (device.textureMipsFinalizedCalls != 1) {
    throw StateError(
      'expected exactly 1 finalizeMips call recorded, got ${device.textureMipsFinalizedCalls}',
    );
  }
}

void _finalizeMipsIsNoOpOnNonMippedTexture() {
  final device = FakeGpuDevice();
  final texture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  device.finalizeMips(texture);
  if (device.textureMipsFinalizedCalls != 1) {
    throw StateError(
      'finalizeMips must still record the call even for a non-mipped texture',
    );
  }
}
