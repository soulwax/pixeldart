import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/capability_selection.dart';
import 'package:pixeldart/rendering/webgl/device.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/resource_diagnostics.dart';
import 'package:pixeldart/rendering/webgl/resource_registry.dart';
import 'package:pixeldart/rendering/webgl/state_cache.dart';

import 'fake_gpu_device.dart';

void main() {
  _staleHandlesRejected();
  _resourceCountStableAfterWarmup();
  _tenLossRestoreCycles();
  _retainedHandlesDrawAfterRestoration();
  _hundredResizeCycles();
  _stateCacheDiffMinimal();
  _capabilitySelection();
  _optionalTargetFailureDoesNotDestroySafeTarget();
  print('Renderer WebGL device fixtures passed.');
}

void _staleHandlesRejected() {
  final registry = ResourceRegistry<MeshHandle, String>(
    (slot, generation, label) => MeshHandle(slot, generation, label),
  );

  final a = registry.declare('mesh-a');
  registry.release(a);
  _expectThrows(
    () => registry.descriptorOf(a),
    HandleRejection.releasedResource,
  );
  _expectThrows(() => registry.release(a), HandleRejection.doubleRelease);

  final b = registry.declare('mesh-b');
  if (b.slot != a.slot) {
    throw StateError(
      'expected slot reuse in this fixture, got ${a.slot} vs ${b.slot}',
    );
  }
  if (b.generation == a.generation) {
    throw StateError('reused slot must bump generation');
  }
  _expectThrows(
    () => registry.descriptorOf(a),
    HandleRejection.staleGeneration,
  );
  if (registry.descriptorOf(b) != 'mesh-b') {
    throw StateError('rehydrated slot must read the new descriptor');
  }

  final outOfRange = MeshHandle(999, 0);
  _expectThrows(
    () => registry.descriptorOf(outOfRange),
    HandleRejection.wrongKind,
  );
}

void _resourceCountStableAfterWarmup() {
  final device = FakeGpuDevice();
  final registry = ResourceRegistry<MeshHandle, int>(
    (slot, generation, label) => MeshHandle(slot, generation, label),
  );

  for (var frame = 0; frame < 50; frame++) {
    final handle = registry.declare(frame);
    final obj = device.createBuffer(
      const GpuBufferDescriptor(
        byteLength: 64,
        usage: GpuBufferUsage.staticDraw,
      ),
    );
    registry.attachGpuObject(handle, obj, 0);
    registry.release(handle);
    device.deleteBuffer(obj);
  }

  if (registry.liveCount != 0) {
    throw StateError('registry must return to zero live after warm-up churn');
  }
  if (device.bufferCreateCalls != 50 || device.bufferDeleteCalls != 50) {
    throw StateError(
      'expected matched create/delete calls, got '
      '${device.bufferCreateCalls}/${device.bufferDeleteCalls}',
    );
  }

  final diagnostics = ResourceDiagnostics();
  for (var frame = 0; frame < 200; frame++) {
    diagnostics.recordCreate(GpuResourceKind.buffer, 1024);
    diagnostics.recordDelete(GpuResourceKind.buffer, 1024);
  }
  if (!diagnostics.isEmpty) {
    throw StateError(
      'diagnostics must return exactly to baseline after warm-up',
    );
  }
  if (diagnostics.peakBytes(GpuResourceKind.buffer) != 1024) {
    throw StateError(
      'peak must reflect the high-water mark, not the final value',
    );
  }
}

void _tenLossRestoreCycles() {
  final device = FakeGpuDevice();
  final renderDevice = RenderDevice(device);
  var rebuildCount = 0;
  renderDevice.onRestore(() => rebuildCount += 1);

  for (var i = 0; i < 10; i++) {
    renderDevice.runLossRestoreCycle();
  }

  if (rebuildCount != 10) {
    throw StateError('expected 10 restore callbacks, got $rebuildCount');
  }
  if (renderDevice.epoch != 10) {
    throw StateError(
      'expected device epoch to reach 10, got ${renderDevice.epoch}',
    );
  }
  if (renderDevice.state != DeviceLifecycleState.ready) {
    throw StateError(
      'device must end ready after a full cycle, got ${renderDevice.state}',
    );
  }
}

void _retainedHandlesDrawAfterRestoration() {
  final device = FakeGpuDevice();
  final renderDevice = RenderDevice(device);
  final registry = ResourceRegistry<MeshHandle, String>(
    (slot, generation, label) => MeshHandle(slot, generation, label),
  );

  final handle = registry.declare('room-shell');
  var obj = device.createBuffer(
    const GpuBufferDescriptor(
      byteLength: 256,
      usage: GpuBufferUsage.staticDraw,
    ),
  );
  registry.attachGpuObject(handle, obj, renderDevice.epoch);

  renderDevice.onRestore(() {
    registry.invalidateGpuObjects();
    for (final (liveHandle, _) in registry.liveDescriptors()) {
      final rebuilt = device.createBuffer(
        const GpuBufferDescriptor(
          byteLength: 256,
          usage: GpuBufferUsage.staticDraw,
        ),
      );
      registry.attachGpuObject(liveHandle, rebuilt, renderDevice.epoch);
    }
  });

  final beforeEpoch = renderDevice.epoch;
  final staleLookup = registry.liveGpuObject(handle, beforeEpoch);
  if (staleLookup == null) {
    throw StateError('handle must resolve before context loss');
  }

  renderDevice.runLossRestoreCycle();

  if (registry.descriptorOf(handle) != 'room-shell') {
    throw StateError(
      'logical handle must still resolve its descriptor after restore',
    );
  }
  final rehydrated = registry.liveGpuObject(handle, renderDevice.epoch);
  if (rehydrated == null) {
    throw StateError('retained handle must draw again after restoration');
  }
  final oldEpochLookup = registry.liveGpuObject(handle, beforeEpoch);
  if (oldEpochLookup != null) {
    throw StateError(
      'a GPU object from the old device epoch must never be returned',
    );
  }
  obj = rehydrated;
}

void _hundredResizeCycles() {
  final sizes = <SurfaceMetrics>[
    for (var i = 0; i < 25; i++) ...[
      SurfaceMetrics(
        cssWidth: 320 + i,
        cssHeight: 180,
        pixelWidth: 320 + i,
        pixelHeight: 180,
      ),
      const SurfaceMetrics(
        cssWidth: 1,
        cssHeight: 1,
        pixelWidth: 1,
        pixelHeight: 1,
      ),
      const SurfaceMetrics(
        cssWidth: 0,
        cssHeight: 0,
        pixelWidth: 0,
        pixelHeight: 0,
      ),
      SurfaceMetrics(
        cssWidth: 1920,
        cssHeight: 1080,
        pixelWidth: 1920 * 2,
        pixelHeight: 1080 * 2,
        devicePixelRatio: 2,
      ),
    ],
  ];
  if (sizes.length != 100) {
    throw StateError(
      'fixture must produce exactly 100 resize cycles, got ${sizes.length}',
    );
  }

  final device = FakeGpuDevice();
  var targetsCreated = 0;
  for (final size in sizes) {
    size.validate();
    if (size.isZeroSized) continue;
    final target = device.createTarget(
      GpuTargetDescriptor(width: size.pixelWidth, height: size.pixelHeight),
    );
    device.deleteTarget(target);
    targetsCreated += 1;
  }
  if (targetsCreated == 0) {
    throw StateError(
      'expected at least one non-zero-sized resize to allocate a target',
    );
  }
}

void _stateCacheDiffMinimal() {
  final cache = WebGlStateCache();
  final first = cache.diff(DrawStateDescriptor.opaqueDefault);
  if (first.length != StateField.values.length) {
    throw StateError(
      'first diff against no prior state must report every field',
    );
  }
  cache.markApplied(DrawStateDescriptor.opaqueDefault);

  final same = cache.diff(DrawStateDescriptor.opaqueDefault);
  if (same.isNotEmpty) {
    throw StateError(
      'diffing an identical descriptor must report zero changes',
    );
  }

  final toBlended = cache.diff(DrawStateDescriptor.blendedDefault);
  const expected = {
    StateField.depthWrite,
    StateField.blendEnable,
    StateField.blendFunc,
  };
  if (toBlended.length != expected.length || !toBlended.containsAll(expected)) {
    throw StateError('unexpected diff set moving to blended: $toBlended');
  }

  cache.invalidate();
  final afterInvalidate = cache.diff(DrawStateDescriptor.opaqueDefault);
  if (afterInvalidate.length != StateField.values.length) {
    throw StateError('diff after invalidate() must report every field again');
  }
}

void _capabilitySelection() {
  const selector = CapabilityProfileSelector();
  final safeProfile = selector.select(RenderCapabilities.safeMinimum);
  if (safeProfile.kind != QualityProfileKind.safe) {
    throw StateError('minimum capabilities must select the safe profile');
  }

  final device = FakeGpuDevice();
  final richProfile = selector.select(device.queryCapabilities());
  if (!richProfile.installs(CapabilityProfileSelector.featureShadows)) {
    throw StateError('a rich capability set must install shadows');
  }
  if (!richProfile.installs(CapabilityProfileSelector.featureMaterialArray)) {
    throw StateError('a rich capability set must install the material array');
  }

  final forcedSafe = selector.select(
    device.queryCapabilities(),
    forceKind: QualityProfileKind.safe,
  );
  if (forcedSafe.installedFeatures.isNotEmpty) {
    throw StateError('forced safe profile must install zero optional features');
  }
}

void _optionalTargetFailureDoesNotDestroySafeTarget() {
  final device = FakeGpuDevice();
  final safeTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );

  var optionalFailed = false;
  try {
    device.createTarget(const GpuTargetDescriptor(width: 0, height: 0));
  } catch (_) {
    optionalFailed = true;
  }
  if (!optionalFailed) {
    throw StateError('fixture expected the zero-sized optional target to fail');
  }

  if (!device.isLive(safeTarget)) {
    throw StateError(
      'an optional target failure must not destroy the safe target',
    );
  }
  device.deleteTarget(safeTarget);
}

void _expectThrows(void Function() body, HandleRejection expectedReason) {
  try {
    body();
  } on HandleException catch (e) {
    if (e.reason != expectedReason) {
      throw StateError('expected $expectedReason, got ${e.reason}');
    }
    return;
  }
  throw StateError(
    'expected HandleException($expectedReason), none was thrown.',
  );
}
