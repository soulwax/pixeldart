enum RendererState { constructed, initializing, ready, contextLost, disposed }

/// One optional-feature failure record (§7.6). Mandatory failures are
/// terminal for the renderer and are not represented here; only optional
/// failures degrade and get recorded.
final class FeatureHealth {
  final String featureId;
  final String stageOrResource;
  final String message;
  final String fallback;
  final int firstFrameAffected;

  const FeatureHealth({
    required this.featureId,
    required this.stageOrResource,
    required this.message,
    required this.fallback,
    required this.firstFrameAffected,
  });

  @override
  String toString() =>
      'FeatureHealth($featureId @ $stageOrResource: $message -> $fallback, '
      'frame $firstFrameAffected)';
}

final class RendererHealth {
  final bool mandatoryPathHealthy;
  final List<FeatureHealth> degradedFeatures;

  const RendererHealth({
    this.mandatoryPathHealthy = true,
    this.degradedFeatures = const [],
  });

  static const RendererHealth healthy = RendererHealth();
}

/// Immediate CPU/counter statistics returned by `endFrame()` (§5.1).
/// Asynchronous GPU query results are not part of this type; they surface
/// later in diagnostics keyed to [frameIndex].
final class FrameStats {
  final int frameIndex;
  final int drawCalls;
  final int trianglesSubmitted;
  final int trianglesCulled;
  final int instancesSubmitted;
  final int instancesCulled;
  final int liveGpuBytes;
  final int peakGpuBytes;
  final int resourceCreateCount;
  final int resourceDeleteCount;

  const FrameStats({
    required this.frameIndex,
    this.drawCalls = 0,
    this.trianglesSubmitted = 0,
    this.trianglesCulled = 0,
    this.instancesSubmitted = 0,
    this.instancesCulled = 0,
    this.liveGpuBytes = 0,
    this.peakGpuBytes = 0,
    this.resourceCreateCount = 0,
    this.resourceDeleteCount = 0,
  });

  @override
  String toString() =>
      'FrameStats(#$frameIndex draws=$drawCalls tris=$trianglesSubmitted '
      'culled=$trianglesCulled gpu=${liveGpuBytes}B)';
}
