import '../api/capabilities.dart';
import 'device_api.dart';

enum DeviceLifecycleState { ready, lost, restoring }

typedef RestoreCallback = void Function();

/// Owns the private device epoch (§7.3, §7.4, §7.5) and the context-loss
/// state machine. Increments its epoch on every restoration so backend-only
/// GPU handles from the old epoch are rejected, while logical resource
/// slots (owned by `ResourceRegistry`, not here) remain stable across the
/// transition.
final class RenderDevice {
  final GpuDevice _backend;
  final List<RestoreCallback> _restoreCallbacks = [];

  int _epoch = 0;
  DeviceLifecycleState _state = DeviceLifecycleState.ready;
  RenderCapabilities? _capabilities;

  RenderDevice(this._backend) {
    _capabilities = _backend.queryCapabilities();
  }

  int get epoch => _epoch;
  DeviceLifecycleState get state => _state;
  RenderCapabilities get capabilities {
    final caps = _capabilities;
    if (caps == null) {
      throw StateError('RenderDevice.capabilities read while context is lost');
    }
    return caps;
  }

  GpuDevice get backend {
    if (_state != DeviceLifecycleState.ready) {
      throw StateError(
        'RenderDevice.backend accessed while not ready (state=$_state)',
      );
    }
    return _backend;
  }

  /// Registers a callback invoked, in registration order, after a
  /// restoration re-queries capabilities and bumps the epoch. Callers use
  /// this to rebuild fallback resources, mandatory programs, and registered
  /// meshes/materials/textures per the exact order in §7.4.
  void onRestore(RestoreCallback callback) {
    _restoreCallbacks.add(callback);
  }

  void handleContextLost() {
    if (_state == DeviceLifecycleState.lost) return;
    _state = DeviceLifecycleState.lost;
    _capabilities = null;
  }

  /// Drives §7.4's restoration sequence: bump epoch, re-query capabilities,
  /// then run every registered rebuild callback before returning to ready.
  void handleContextRestored() {
    if (_state != DeviceLifecycleState.lost) {
      throw StateError(
        'RenderDevice.handleContextRestored called from state $_state, '
        'expected lost',
      );
    }
    _state = DeviceLifecycleState.restoring;
    _epoch += 1;
    _capabilities = _backend.queryCapabilities();
    for (final callback in _restoreCallbacks) {
      callback();
    }
    _state = DeviceLifecycleState.ready;
  }

  /// Drives a full loss/restore cycle against a fake or forced-loss backend,
  /// satisfying plan §12's "10 loss/restore cycles" gate and §7.6/§11.2's
  /// forced-loss requirement.
  void runLossRestoreCycle() {
    _backend.simulateContextLoss();
    handleContextLost();
    _backend.simulateContextRestore();
    handleContextRestored();
  }
}
