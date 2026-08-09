part of 'scene_renderer_impl.dart';

final class _PendingGpuTiming {
  final int frameIndex;
  final GpuObject query;
  const _PendingGpuTiming(this.frameIndex, this.query);
}

mixin _GpuTimingSupport {
  final List<_PendingGpuTiming> _pendingGpuTimings = [];
  GpuObject? _activeGpuTimer;

  GpuDevice get device;
  RendererState get state;
  RenderCapabilities get capabilities;

  void _beginGpuTiming(int frameIndex) {
    if (capabilities.disjointTimerQuery) {
      _activeGpuTimer = device.beginGpuTimer();
    }
  }

  GpuTimingResult pollGpuTiming() {
    if (state == RendererState.disposed) {
      throw StateError('renderer is disposed');
    }
    if (!capabilities.disjointTimerQuery) {
      return const GpuTimingResult(
        frameIndex: -1,
        status: GpuTimingStatus.unsupported,
      );
    }
    if (device.status == GpuDeviceStatus.lost) {
      final frame = _pendingGpuTimings.isEmpty
          ? -1
          : _pendingGpuTimings.first.frameIndex;
      _discardGpuTimings();
      return GpuTimingResult(
        frameIndex: frame,
        status: GpuTimingStatus.disjoint,
      );
    }
    if (_pendingGpuTimings.isEmpty) {
      return const GpuTimingResult(
        frameIndex: -1,
        status: GpuTimingStatus.pending,
      );
    }
    final pending = _pendingGpuTimings.first;
    final poll = device.pollGpuTimer(pending.query);
    if (poll.status == GpuTimerStatus.pending) {
      return GpuTimingResult(
        frameIndex: pending.frameIndex,
        status: GpuTimingStatus.pending,
      );
    }
    _pendingGpuTimings.removeAt(0);
    device.deleteGpuTimer(pending.query);
    return GpuTimingResult(
      frameIndex: pending.frameIndex,
      status: switch (poll.status) {
        GpuTimerStatus.ready => GpuTimingStatus.ready,
        GpuTimerStatus.disjoint => GpuTimingStatus.disjoint,
        GpuTimerStatus.unsupported => GpuTimingStatus.unsupported,
        GpuTimerStatus.pending => GpuTimingStatus.pending,
      },
      elapsedNanoseconds: poll.elapsedNanoseconds,
    );
  }

  void _finishGpuTiming(int frameIndex) {
    final timer = _activeGpuTimer;
    _activeGpuTimer = null;
    if (timer == null) return;
    try {
      device.endGpuTimer(timer);
      _pendingGpuTimings.add(_PendingGpuTiming(frameIndex, timer));
    } catch (_) {
      _deleteGpuTimerSafely(timer);
    }
  }

  void _abortGpuTiming() {
    final timer = _activeGpuTimer;
    _activeGpuTimer = null;
    if (timer != null) _deleteGpuTimerSafely(timer);
  }

  void _discardGpuTimings() {
    _abortGpuTiming();
    final pending = _pendingGpuTimings.toList(growable: false);
    _pendingGpuTimings.clear();
    for (final sample in pending) {
      _deleteGpuTimerSafely(sample.query);
    }
  }

  void _disposeGpuTimings() => _discardGpuTimings();

  void _deleteGpuTimerSafely(GpuObject query) {
    try {
      device.deleteGpuTimer(query);
    } catch (_) {
      // Context loss invalidates backend query handles; the logical queue is
      // already cleared, so disposal remains idempotent.
    }
  }
}
