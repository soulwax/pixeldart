enum RendererState { constructed, initializing, ready, contextLost, disposed }

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

final class FramePassStats {
  final int drawCalls;
  final int trianglesSubmitted;
  final int trianglesCulled;
  final int instancesSubmitted;
  final int instancesCulled;

  const FramePassStats({
    this.drawCalls = 0,
    this.trianglesSubmitted = 0,
    this.trianglesCulled = 0,
    this.instancesSubmitted = 0,
    this.instancesCulled = 0,
  });
}

enum GpuTimingStatus { unsupported, pending, ready, disjoint }

final class GpuTimingResult {
  final int frameIndex;
  final GpuTimingStatus status;
  final int? elapsedNanoseconds;

  const GpuTimingResult({
    required this.frameIndex,
    required this.status,
    this.elapsedNanoseconds,
  });
}

final class FrameStats {
  final int frameIndex;

  final int pointLightsDropped;
  final int drawCalls;
  final int trianglesSubmitted;
  final int trianglesCulled;
  final int instancesSubmitted;
  final int instancesCulled;
  final int liveGpuBytes;
  final int peakGpuBytes;
  final int resourceCreateCount;
  final int resourceDeleteCount;
  final Map<String, FramePassStats> passStats;

  const FrameStats({
    required this.frameIndex,
    this.pointLightsDropped = 0,
    this.drawCalls = 0,
    this.trianglesSubmitted = 0,
    this.trianglesCulled = 0,
    this.instancesSubmitted = 0,
    this.instancesCulled = 0,
    this.liveGpuBytes = 0,
    this.peakGpuBytes = 0,
    this.resourceCreateCount = 0,
    this.resourceDeleteCount = 0,
    this.passStats = const {},
  });

  FramePassStats pass(String id) => passStats[id] ?? const FramePassStats();

  @override
  String toString() =>
      'FrameStats(#$frameIndex draws=$drawCalls tris=$trianglesSubmitted '
      'culled=$trianglesCulled gpu=${liveGpuBytes}B)';
}
