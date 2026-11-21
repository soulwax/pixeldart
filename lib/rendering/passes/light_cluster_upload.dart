import 'dart:typed_data';

import '../core/light_clusters.dart';
import '../webgl/device_api.dart';

/// Uploads [LightClusterGrid] buffers to the GPU via `GpuDeviceV2` UBOs
/// (`[S3-B]`), with a clean no-op fallback on v1 devices.
final class LightClusterUploader {
  final GpuDevice _device;
  GpuObject? _clusterGridUbo;
  GpuObject? _lightIndexUbo;
  GpuObject? _lightDataUbo;
  int uploadCount = 0;

  LightClusterUploader(this._device);

  bool get supportsV2Upload => _device is GpuDeviceV2;

  void upload(
    LightClusterGrid grid, {
    int clusterGridBinding = 2,
    int lightIndexBinding = 3,
    int lightDataBinding = 4,
  }) {
    final dev = _device;
    if (dev is! GpuDeviceV2) return;

    _clusterGridUbo ??= dev.createUniformBuffer(
      GpuUniformBufferDescriptor(byteLength: grid.clusterGrid.lengthInBytes),
    );
    _lightIndexUbo ??= dev.createUniformBuffer(
      GpuUniformBufferDescriptor(byteLength: grid.lightIndexList.lengthInBytes),
    );
    _lightDataUbo ??= dev.createUniformBuffer(
      GpuUniformBufferDescriptor(
        byteLength: grid.packedLightData.lengthInBytes,
      ),
    );

    dev.updateUniformBuffer(
      _clusterGridUbo!,
      ByteData.view(grid.clusterGrid.buffer),
    );
    dev.bindUniformBufferBase(clusterGridBinding, _clusterGridUbo!);

    dev.updateUniformBuffer(
      _lightIndexUbo!,
      ByteData.view(grid.lightIndexList.buffer),
    );
    dev.bindUniformBufferBase(lightIndexBinding, _lightIndexUbo!);

    final activeBytes = grid.stats.totalPunctualLights * 64;
    dev.updateUniformBuffer(
      _lightDataUbo!,
      activeBytes > 0
          ? ByteData.view(grid.packedLightData.buffer, 0, activeBytes)
          : ByteData(64),
    );
    dev.bindUniformBufferBase(lightDataBinding, _lightDataUbo!);
    uploadCount++;
  }

  void dispose() {
    if (_clusterGridUbo != null) {
      _device.deleteBuffer(_clusterGridUbo!);
      _clusterGridUbo = null;
    }
    if (_lightIndexUbo != null) {
      _device.deleteBuffer(_lightIndexUbo!);
      _lightIndexUbo = null;
    }
    if (_lightDataUbo != null) {
      _device.deleteBuffer(_lightDataUbo!);
      _lightDataUbo = null;
    }
  }
}
