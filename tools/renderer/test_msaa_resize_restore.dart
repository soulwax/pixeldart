import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void main() {
  _testMsaaTargetAllocation();
  _testMsaaResizeLifecycle();
  _testMsaaContextLossAndRestore();
  _testMsaaResolveCorrectness();
  print('MSAA resize and restore correctness tests passed.');
}

void _testMsaaTargetAllocation() {
  final device = FakeGpuDevice();
  const desc = GpuTargetDescriptor(
    width: 800,
    height: 600,
    samples: 4,
    hasDepth: true,
    attachments: GpuTargetAttachment.colorAndGlow,
  );

  final target = device.createTarget(desc);
  assert(device.liveTargetDescriptors.contains(desc));
  device.deleteTarget(target);
  assert(!device.liveTargetDescriptors.contains(desc));
}

void _testMsaaResizeLifecycle() {
  final device = FakeGpuDevice();

  // Initial resolution
  var desc = const GpuTargetDescriptor(
    width: 1920,
    height: 1080,
    samples: 4,
    hasDepth: true,
    attachments: GpuTargetAttachment.colorAndGlow,
  );
  var target = device.createTarget(desc);
  assert(device.liveTargetDescriptors.single.width == 1920);

  // Resize to 1280x720
  device.deleteTarget(target);
  desc = const GpuTargetDescriptor(
    width: 1280,
    height: 720,
    samples: 4,
    hasDepth: true,
    attachments: GpuTargetAttachment.colorAndGlow,
  );
  target = device.createTarget(desc);
  assert(device.liveTargetDescriptors.single.width == 1280);
  assert(device.liveTargetDescriptors.single.samples == 4);

  device.deleteTarget(target);
}

void _testMsaaContextLossAndRestore() {
  final device = FakeGpuDevice();
  const desc = GpuTargetDescriptor(
    width: 640,
    height: 360,
    samples: 4,
    hasDepth: true,
  );
  device.createTarget(desc);

  // Simulate context loss
  device.simulateContextLoss();
  assert(device.status == GpuDeviceStatus.lost);

  // Calls during loss throw StateError
  var threw = false;
  try {
    device.createTarget(desc);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'createTarget during context loss must throw');

  // Restore context
  device.simulateContextRestore();
  assert(device.status == GpuDeviceStatus.ready);

  final restoredTarget = device.createTarget(desc);
  assert(device.liveTargetDescriptors.contains(desc));
  device.deleteTarget(restoredTarget);
}

void _testMsaaResolveCorrectness() {
  final device = FakeGpuDevice();

  final msaaSource = device.createTarget(
    const GpuTargetDescriptor(
      width: 640,
      height: 360,
      samples: 4,
      hasDepth: true,
      attachments: GpuTargetAttachment.colorAndGlow,
    ),
  );

  final singleSampleDst = device.createTarget(
    const GpuTargetDescriptor(
      width: 640,
      height: 360,
      samples: 1,
      hasDepth: true,
      attachments: GpuTargetAttachment.colorAndGlow,
    ),
  );

  device.resolveTarget(msaaSource, singleSampleDst);
  assert(device.resolveTargetCalls == 1);

  // Fallback negotiation when maxSamples < requested
  const lowCaps = RenderCapabilities(
    webglVersion: 'webgl2',
    maxTextureSize: 2048,
    maxTextureArrayLayers: 8,
    maxSamples: 1,
    maxVertexAttributes: 16,
    maxColorAttachments: 4,
  );

  final negotiated = MsaaStatus.negotiate(4, lowCaps);
  assert(negotiated.effective == 1);
  assert(negotiated.fellBack);
}
