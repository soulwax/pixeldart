import '../api/handles.dart';
import 'device_api.dart';

enum _SlotState { empty, cpuReady, gpuReady, failedOptional, released }

/// One logical resource slot. Its [generation] is bumped every time the
/// slot is reused after release, so a stale handle referencing an earlier
/// generation is rejected forever, even if the slot index is recycled
/// (§5.3). [gpuObject] and [gpuEpoch] track the backend object created for
/// the current device epoch; after context restoration [gpuObject] is
/// rebuilt while [generation] and the slot index stay stable, so retained
/// scene references keep working (§7.4).
final class _Slot<D> {
  int generation = 0;
  _SlotState state = _SlotState.empty;
  D? cpuDescriptor;
  GpuObject? gpuObject;
  int gpuEpoch = -1;
  String? debugLabel;
}

/// A stable logical resource store for one resource kind, keyed by
/// [ResourceHandle] subtype [H]. Construction/rehydration and
/// GPU-object lifetime are separated: CPU descriptors survive context loss
/// and drive rebuild; only [gpuObject] is invalidated per-epoch (§5.3,
/// §7.4). This class holds no `package:web` dependency — it is exercised in
/// pure tests via a fake `GpuObject`.
final class ResourceRegistry<H extends ResourceHandle, D> {
  final H Function(int slot, int generation, String? label) _makeHandle;
  final List<_Slot<D>> _slots = [];
  final List<int> _freeSlots = [];

  int _createCount = 0;
  int _deleteCount = 0;

  ResourceRegistry(this._makeHandle);

  int get liveCount => _slots
      .where(
        (s) => s.state != _SlotState.released && s.state != _SlotState.empty,
      )
      .length;
  int get createCount => _createCount;
  int get deleteCount => _deleteCount;

  H declare(D descriptor, {String? debugLabel}) {
    final int index;
    if (_freeSlots.isNotEmpty) {
      index = _freeSlots.removeLast();
    } else {
      _slots.add(_Slot<D>());
      index = _slots.length - 1;
    }
    final slot = _slots[index];
    slot.generation += 1;
    slot.state = _SlotState.cpuReady;
    slot.cpuDescriptor = descriptor;
    slot.gpuObject = null;
    slot.gpuEpoch = -1;
    slot.debugLabel = debugLabel;
    _createCount += 1;
    return _makeHandle(index, slot.generation, debugLabel);
  }

  void _checkLive(H handle) {
    if (handle.slot < 0 || handle.slot >= _slots.length) {
      throw HandleException(HandleRejection.wrongKind, handle);
    }
    final slot = _slots[handle.slot];
    if (slot.generation != handle.generation) {
      throw HandleException(HandleRejection.staleGeneration, handle);
    }
    if (slot.state == _SlotState.released || slot.state == _SlotState.empty) {
      throw HandleException(HandleRejection.releasedResource, handle);
    }
  }

  D descriptorOf(H handle) {
    _checkLive(handle);
    return _slots[handle.slot].cpuDescriptor as D;
  }

  /// Replaces the CPU descriptor in place without bumping generation or
  /// touching GPU attachment state — the correct primitive for "update this
  /// still-live logical resource," as distinct from release-then-declare
  /// (which mints a new identity and would invalidate every existing
  /// reference to [handle]).
  void updateDescriptor(H handle, D descriptor) {
    _checkLive(handle);
    _slots[handle.slot].cpuDescriptor = descriptor;
  }

  /// Attaches (or reattaches after restoration) the backend object for the
  /// current device epoch. Marks the slot GPU-ready.
  void attachGpuObject(H handle, GpuObject gpuObject, int deviceEpoch) {
    _checkLive(handle);
    final slot = _slots[handle.slot];
    slot.gpuObject = gpuObject;
    slot.gpuEpoch = deviceEpoch;
    slot.state = _SlotState.gpuReady;
  }

  void markFailedOptional(H handle) {
    _checkLive(handle);
    _slots[handle.slot].state = _SlotState.failedOptional;
  }

  /// Returns the live backend object only if it was attached for
  /// [currentDeviceEpoch]; a stale pre-restoration object is never handed
  /// back, matching §7.4 ("only private raw GPU handles from the old device
  /// epoch are rejected").
  GpuObject? liveGpuObject(H handle, int currentDeviceEpoch) {
    _checkLive(handle);
    final slot = _slots[handle.slot];
    if (slot.gpuEpoch != currentDeviceEpoch) return null;
    return slot.gpuObject;
  }

  void release(H handle) {
    if (handle.slot < 0 || handle.slot >= _slots.length) {
      throw HandleException(HandleRejection.wrongKind, handle);
    }
    final slot = _slots[handle.slot];
    if (slot.generation != handle.generation) {
      throw HandleException(HandleRejection.staleGeneration, handle);
    }
    if (slot.state == _SlotState.released || slot.state == _SlotState.empty) {
      throw HandleException(HandleRejection.doubleRelease, handle);
    }
    slot.state = _SlotState.released;
    slot.cpuDescriptor = null;
    slot.gpuObject = null;
    slot.gpuEpoch = -1;
    _freeSlots.add(handle.slot);
    _deleteCount += 1;
  }

  /// Every live handle's CPU descriptor, for restoration rebuild (§7.4 step
  /// 5: "rebuild registered meshes/materials/textures").
  Iterable<(H, D)> liveDescriptors() sync* {
    for (var i = 0; i < _slots.length; i++) {
      final slot = _slots[i];
      if (slot.state == _SlotState.released || slot.state == _SlotState.empty) {
        continue;
      }
      yield (
        _makeHandle(i, slot.generation, slot.debugLabel),
        slot.cpuDescriptor as D,
      );
    }
  }

  /// Invalidates every attached GPU object without releasing logical slots,
  /// called on context loss so subsequent `liveGpuObject` calls correctly
  /// return null until restoration reattaches them.
  void invalidateGpuObjects() {
    for (final slot in _slots) {
      slot.gpuObject = null;
      slot.gpuEpoch = -1;
      if (slot.state == _SlotState.gpuReady) {
        slot.state = _SlotState.cpuReady;
      }
    }
  }
}
