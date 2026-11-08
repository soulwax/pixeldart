import 'dart:typed_data';

import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

/// Proves the mip-generation contract: `createTexture(hasMips: true)` alone
/// does not populate mip levels — the real bug found and fixed this pass —
/// and `finalizeMips` is required after every layer's base level upload.
void main() {
  _nonMippedTextureNeverFlaggedUnfinalized();
  _mippedTextureRequiresFinalizeMips();
  _finalizeMipsIsNoOpOnNonMippedTexture();
  print('Renderer texture mip fixtures passed.');
}

void _nonMippedTextureNeverFlaggedUnfinalized() {
  final device = FakeGpuDevice();
  final texture = device.createTextureMipped(
    const GpuTextureDescriptor(width: 4, height: 4, hasMips: false),
  );
  if (device.hasUnfinalizedMips(texture)) {
    throw StateError('a texture created with hasMips:false must never be flagged unfinalized');
  }
}

void _mippedTextureRequiresFinalizeMips() {
  final device = FakeGpuDevice();
  final texture = device.createTextureMipped(
    const GpuTextureDescriptor(width: 4, height: 4, hasMips: true),
  );
  if (!device.hasUnfinalizedMips(texture)) {
    throw StateError('a freshly created mipped texture must be flagged unfinalized until finalizeMips runs');
  }

  device.uploadTextureLayer(texture, 0, Uint8List(4 * 4 * 4));
  if (!device.hasUnfinalizedMips(texture)) {
    throw StateError('uploading the base layer alone must not clear the unfinalized-mips flag');
  }

  device.finalizeMips(texture);
  if (device.hasUnfinalizedMips(texture)) {
    throw StateError('finalizeMips must clear the unfinalized-mips flag');
  }
  if (device.textureMipsFinalizedCalls != 1) {
    throw StateError('expected exactly 1 finalizeMips call recorded, got ${device.textureMipsFinalizedCalls}');
  }
}

void _finalizeMipsIsNoOpOnNonMippedTexture() {
  final device = FakeGpuDevice();
  final texture = device.createTexture(const GpuTextureDescriptor(width: 4, height: 4));
  device.finalizeMips(texture);
  if (device.textureMipsFinalizedCalls != 1) {
    throw StateError('finalizeMips must still record the call even for a non-mipped texture');
  }
}
