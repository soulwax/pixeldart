import '../api/handles.dart';
import 'device_api.dart';

enum _SlotState { empty, cpuReady, gpuReady, failedOptional, released }

final class _Slot<D> {
  int generation = 0;
  _SlotState state = _SlotState.empty;
  D? cpuDescriptor;
  GpuObject? gpuObject;
  int gpuEpoch = -1;
  String? debugLabel;
}

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

  void updateDescriptor(H handle, D descriptor) {
    _checkLive(handle);
    _slots[handle.slot].cpuDescriptor = descriptor;
  }

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
