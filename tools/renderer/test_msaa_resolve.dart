import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void main() {
  _resolvesFromMultisampleToSingleSample();
  _rejectsNonMultisampledSource();
  _rejectsMultisampledDestination();
  _rejectsMismatchedDimensions();
  print('Renderer MSAA resolve fixtures passed.');
}

void _resolvesFromMultisampleToSingleSample() {
  final device = FakeGpuDevice();
  final msaaTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, samples: 4, hasDepth: true),
  );
  final resolvedTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, hasDepth: true),
  );

  device.resolveTarget(msaaTarget, resolvedTarget);

  if (device.resolveTargetCalls != 1) {
    throw StateError(
      'expected exactly 1 resolveTarget call, got ${device.resolveTargetCalls}',
    );
  }
}

void _rejectsNonMultisampledSource() {
  final device = FakeGpuDevice();
  final a = device.createTarget(const GpuTargetDescriptor(width: 384, height: 216));
  final b = device.createTarget(const GpuTargetDescriptor(width: 384, height: 216));

  bool threw = false;
  try {
    device.resolveTarget(a, b);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('expected resolveTarget to reject a single-sample source');
  }
}

void _rejectsMultisampledDestination() {
  final device = FakeGpuDevice();
  final source = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, samples: 4),
  );
  final destination = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, samples: 4),
  );

  bool threw = false;
  try {
    device.resolveTarget(source, destination);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('expected resolveTarget to reject a multisampled destination');
  }
}

void _rejectsMismatchedDimensions() {
  final device = FakeGpuDevice();
  final source = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, samples: 4),
  );
  final destination = device.createTarget(
    const GpuTargetDescriptor(width: 192, height: 108),
  );

  bool threw = false;
  try {
    device.resolveTarget(source, destination);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('expected resolveTarget to reject mismatched dimensions');
  }
}
