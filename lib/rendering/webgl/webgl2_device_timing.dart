part of 'webgl2_device.dart';

mixin _WebGlTimerSupport {
  static const int _timeElapsedExt = 35007;
  static const int _gpuDisjointExt = 36795;

  WebGL2RenderingContext get gl;
  bool get _timerExtensionAvailable;
  void _requireReady();

  GpuObject? beginGpuTimer() {
    _requireReady();
    final query = _timerExtensionAvailable ? gl.createQuery() : null;
    if (query == null) return null;
    gl.beginQuery(_timeElapsedExt, query);
    return _WebGpuObject(_WebGlTimerQuery(query));
  }

  void endGpuTimer(GpuObject query) {
    _requireReady();
    final timer = _timerQuery(query);
    if (timer.ended) throw StateError('WebGl2Device: timer already ended');
    gl.endQuery(_timeElapsedExt);
    timer.ended = true;
  }

  GpuTimerPoll pollGpuTimer(GpuObject query) {
    if (!_timerExtensionAvailable) {
      return const GpuTimerPoll(GpuTimerStatus.unsupported);
    }
    final timer = _timerQuery(query);
    final disjoint = gl.getParameter(_gpuDisjointExt).dartify();
    if (disjoint == true) return const GpuTimerPoll(GpuTimerStatus.disjoint);
    if (!timer.ended) return const GpuTimerPoll(GpuTimerStatus.pending);
    final available = gl
        .getQueryParameter(timer.query, _G.QUERY_RESULT_AVAILABLE)
        .dartify();
    if (available != true) return const GpuTimerPoll(GpuTimerStatus.pending);
    final elapsed = gl
        .getQueryParameter(timer.query, _G.QUERY_RESULT)
        .dartify();
    return elapsed is num
        ? GpuTimerPoll(GpuTimerStatus.ready, elapsed.toInt())
        : const GpuTimerPoll(GpuTimerStatus.disjoint);
  }

  void deleteGpuTimer(GpuObject query) {
    gl.deleteQuery(_timerQuery(query).query);
  }

  _WebGlTimerQuery _timerQuery(GpuObject query) {
    final object = query is _WebGpuObject ? query.handle : null;
    if (object is! _WebGlTimerQuery) {
      throw ArgumentError.value(query, 'query', 'is not a GPU timer query');
    }
    return object;
  }
}
