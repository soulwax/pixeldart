part of 'fake_gpu_device.dart';

final class _FakeTimerQuery implements GpuObject {
  final int id;
  bool ended = false;
  bool returnedPending = false;
  bool disjoint = false;
  _FakeTimerQuery(this.id);
}

mixin _FakeGpuTimerSupport {
  bool get timerQueries;
  bool get disjointTimer;
  GpuDeviceStatus get status;

  int timerBeginCalls = 0;
  int timerEndCalls = 0;
  int timerDeleteCalls = 0;
  int _nextTimerId = 1;
  final Set<int> _timerIds = {};

  GpuObject? beginGpuTimer() {
    if (status != GpuDeviceStatus.ready) {
      throw StateError('FakeGpuDevice: operation attempted while not ready');
    }
    if (!timerQueries) return null;
    timerBeginCalls += 1;
    final query = _FakeTimerQuery(_nextTimerId++);
    query.disjoint = disjointTimer;
    _timerIds.add(query.id);
    return query;
  }

  void endGpuTimer(GpuObject query) {
    final timer = _timer(query);
    if (timer.ended) throw StateError('FakeGpuDevice: timer already ended');
    timer.ended = true;
    timerEndCalls += 1;
  }

  GpuTimerPoll pollGpuTimer(GpuObject query) {
    final timer = _timer(query);
    if (!timer.ended) return const GpuTimerPoll(GpuTimerStatus.pending);
    if (!timer.returnedPending) {
      timer.returnedPending = true;
      return const GpuTimerPoll(GpuTimerStatus.pending);
    }
    if (timer.disjoint) return const GpuTimerPoll(GpuTimerStatus.disjoint);
    return const GpuTimerPoll(GpuTimerStatus.ready, 1250000);
  }

  void deleteGpuTimer(GpuObject query) {
    final timer = _timer(query);
    if (!_timerIds.remove(timer.id)) {
      throw StateError('FakeGpuDevice: double delete of timer');
    }
    timerDeleteCalls += 1;
  }

  _FakeTimerQuery _timer(GpuObject query) {
    if (query is! _FakeTimerQuery || !_timerIds.contains(query.id)) {
      throw StateError('FakeGpuDevice: unknown timer query');
    }
    return query;
  }
}
