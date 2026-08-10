import '../api/handles.dart';
import 'texture_store.dart';

/// Stable request identity for a texture that should be present for a
/// working-set transition. The request does not own [handle] and never
/// releases it; ownership remains with [TextureStore]/[ResourceLibrary].
final class TextureResidencyRequest {
  final String key;
  final TextureHandle handle;
  final int priority;

  const TextureResidencyRequest({
    required this.key,
    required this.handle,
    this.priority = 0,
  });

  void validate() {
    if (key.isEmpty) {
      throw ArgumentError('TextureResidencyRequest.key must not be empty');
    }
    if (!handle.isValid) {
      throw ArgumentError.value(handle, 'handle', 'must be valid');
    }
  }
}

enum TextureResidencyStatus { resident, pending, missing, evicted }

/// One deterministic result from [TextureResidencyManager.prewarm].
final class TextureResidencyResult {
  final TextureResidencyRequest request;
  final TextureResidencyStatus status;

  const TextureResidencyResult({required this.request, required this.status});

  bool get isUsable => status == TextureResidencyStatus.resident;
}

/// Immutable report for one prewarm/probe pass.
final class TextureResidencyReport {
  final List<TextureResidencyResult> results;
  final int uniqueHandleCount;

  TextureResidencyReport({
    required Iterable<TextureResidencyResult> results,
    required this.uniqueHandleCount,
  }) : results = List.unmodifiable(results);

  int get residentCount => _count(TextureResidencyStatus.resident);
  int get pendingCount => _count(TextureResidencyStatus.pending);
  int get missingCount => _count(TextureResidencyStatus.missing);
  int get evictedCount => _count(TextureResidencyStatus.evicted);

  int _count(TextureResidencyStatus status) =>
      results.where((result) => result.status == status).length;
}

/// Deterministic, ownership-neutral prewarm/residency planner.
///
/// A prewarm pass only probes existing [TextureStore] handles. It never
/// allocates a duplicate texture, performs I/O, or releases an asset. A
/// declared handle that resolves to the store's fallback is
/// [TextureResidencyStatus.pending];
/// an invalid handle is [missing], unless this planner observed it resident in
/// an earlier pass, in which case its later failure is diagnosed as [evicted].
final class TextureResidencyManager {
  final TextureStore store;
  final Map<TextureHandle, bool> _wasResident = {};

  TextureResidencyManager(this.store);

  TextureResidencyReport prewarm(Iterable<TextureResidencyRequest> requests) {
    final byKey = <String, TextureResidencyRequest>{};
    for (final request in requests) {
      request.validate();
      if (byKey.containsKey(request.key)) {
        throw ArgumentError(
          'TextureResidencyRequest keys must be unique: ${request.key}',
        );
      }
      byKey[request.key] = request;
    }
    final ordered = byKey.values.toList()
      ..sort((a, b) {
        final priority = b.priority.compareTo(a.priority);
        return priority == 0 ? a.key.compareTo(b.key) : priority;
      });
    final probedHandles = <TextureHandle>{};
    final statusByHandle = <TextureHandle, TextureResidencyStatus>{};
    final results = <TextureResidencyResult>[];
    for (final request in ordered) {
      final firstProbe = probedHandles.add(request.handle);
      final TextureResidencyStatus status;
      if (firstProbe) {
        status = _probe(request.handle);
        statusByHandle[request.handle] = status;
      } else {
        status = statusByHandle[request.handle]!;
      }
      results.add(TextureResidencyResult(request: request, status: status));
    }
    return TextureResidencyReport(
      results: results,
      uniqueHandleCount: probedHandles.length,
    );
  }

  TextureResidencyStatus _probe(TextureHandle handle) {
    try {
      if (identical(store.resolve(handle), store.fallbackAlbedo)) {
        return TextureResidencyStatus.pending;
      }
      _wasResident[handle] = true;
      return TextureResidencyStatus.resident;
    } on HandleException {
      return _wasResident[handle] == true
          ? TextureResidencyStatus.evicted
          : TextureResidencyStatus.missing;
    }
  }
}
