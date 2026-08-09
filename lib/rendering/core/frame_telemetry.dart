import '../api/stats.dart';

/// Mutable, frame-local draw accounting. A pass records only after the
/// backend draw call succeeds, so diagnostics describe work actually handed
/// to the device rather than work that was merely planned.
final class FrameDrawTelemetry {
  final Map<String, _MutablePassStats> _passes = {};
  String? _activePass;

  void beginPass(String passId) {
    if (passId.isEmpty) throw ArgumentError.value(passId, 'passId');
    _activePass = passId;
    _passes.putIfAbsent(passId, _MutablePassStats.new);
  }

  void recordArrays(int count, {int instanceCount = 1}) =>
      _record(count, instanceCount);

  void recordElements(int count, {int instanceCount = 1}) =>
      _record(count, instanceCount);

  void recordCull({required int triangles, required int instances}) {
    final passId = _activePass;
    if (passId == null) {
      throw StateError('cull recorded outside an active frame');
    }
    if (triangles < 0 || instances < 0) {
      throw ArgumentError('cull totals must be non-negative');
    }
    final stats = _passes[passId]!;
    stats.trianglesCulled += triangles;
    stats.instancesCulled += instances;
  }

  Map<String, FramePassStats> snapshot() => Map.unmodifiable({
    for (final entry in _passes.entries) entry.key: entry.value.freeze(),
  });

  void _record(int count, int instanceCount) {
    final passId = _activePass;
    if (passId == null) {
      throw StateError('draw recorded outside an active render pass');
    }
    if (count < 0 || instanceCount < 1) {
      throw ArgumentError('draw count and instance count must be positive');
    }
    final stats = _passes[passId]!;
    stats.drawCalls += 1;
    stats.instancesSubmitted += instanceCount;
    stats.trianglesSubmitted += (count ~/ 3) * instanceCount;
  }
}

final class _MutablePassStats {
  int drawCalls = 0;
  int trianglesSubmitted = 0;
  int trianglesCulled = 0;
  int instancesSubmitted = 0;
  int instancesCulled = 0;

  FramePassStats freeze() => FramePassStats(
    drawCalls: drawCalls,
    trianglesSubmitted: trianglesSubmitted,
    trianglesCulled: trianglesCulled,
    instancesSubmitted: instancesSubmitted,
    instancesCulled: instancesCulled,
  );
}
