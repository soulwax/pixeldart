/// Structured resource accounting (§7.5, §7.6). Tracks live/peak GPU bytes
/// by kind separately from retained CPU-side bytes, and records optional
/// feature failures without making them terminal. Pure bookkeeping — no GL
/// calls — so growth-after-warmup and exact-return-to-baseline assertions
/// (§11.2) can be unit tested against synthetic create/delete sequences.
enum GpuResourceKind { buffer, texture, target, vertexArray }

final class ResourceDiagnostics {
  final Map<GpuResourceKind, int> _liveBytes = {
    for (final kind in GpuResourceKind.values) kind: 0,
  };
  final Map<GpuResourceKind, int> _peakBytes = {
    for (final kind in GpuResourceKind.values) kind: 0,
  };
  final Map<GpuResourceKind, int> _liveCount = {
    for (final kind in GpuResourceKind.values) kind: 0,
  };

  int retainedCpuBytes = 0;

  void recordCreate(GpuResourceKind kind, int bytes) {
    if (bytes < 0) {
      throw ArgumentError(
        'ResourceDiagnostics.recordCreate bytes must be >= 0: $bytes',
      );
    }
    _liveBytes[kind] = _liveBytes[kind]! + bytes;
    _liveCount[kind] = _liveCount[kind]! + 1;
    if (_liveBytes[kind]! > _peakBytes[kind]!) {
      _peakBytes[kind] = _liveBytes[kind]!;
    }
  }

  void recordDelete(GpuResourceKind kind, int bytes) {
    if (bytes < 0) {
      throw ArgumentError(
        'ResourceDiagnostics.recordDelete bytes must be >= 0: $bytes',
      );
    }
    final remaining = _liveBytes[kind]! - bytes;
    if (remaining < 0) {
      throw StateError(
        'ResourceDiagnostics: deleted more $kind bytes than were live',
      );
    }
    _liveBytes[kind] = remaining;
    final remainingCount = _liveCount[kind]! - 1;
    if (remainingCount < 0) {
      throw StateError(
        'ResourceDiagnostics: deleted more $kind objects than were live',
      );
    }
    _liveCount[kind] = remainingCount;
  }

  int liveBytes(GpuResourceKind kind) => _liveBytes[kind]!;
  int peakBytes(GpuResourceKind kind) => _peakBytes[kind]!;
  int liveCount(GpuResourceKind kind) => _liveCount[kind]!;

  int get totalLiveBytes => _liveBytes.values.fold(0, (a, b) => a + b);
  int get totalLiveCount => _liveCount.values.fold(0, (a, b) => a + b);

  bool get isEmpty => totalLiveBytes == 0 && totalLiveCount == 0;
}
