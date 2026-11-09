import '../api/capabilities.dart';
import 'device_api.dart';

enum DeviceLifecycleState { ready, lost, restoring }

typedef RestoreCallback = void Function();

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

  void onRestore(RestoreCallback callback) {
    _restoreCallbacks.add(callback);
  }

  void handleContextLost() {
    if (_state == DeviceLifecycleState.lost) return;
    _state = DeviceLifecycleState.lost;
    _capabilities = null;
  }

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

  void runLossRestoreCycle() {
    _backend.simulateContextLoss();
    handleContextLost();
    _backend.simulateContextRestore();
    handleContextRestored();
  }
}
