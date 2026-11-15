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

final class LightSelectionStats {
  final int totalLights;
  final int activeLights;
  final int droppedLights;

  const LightSelectionStats({
    this.totalLights = 0,
    this.activeLights = 0,
    this.droppedLights = 0,
  });

  Map<String, Object?> toJson() => {
    'totalLights': totalLights,
    'activeLights': activeLights,
    'droppedLights': droppedLights,
  };
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
  final LightSelectionStats lightSelection;

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
    this.lightSelection = const LightSelectionStats(),
  });

  FramePassStats pass(String id) => passStats[id] ?? const FramePassStats();

  RendererDiagnosticsSnapshot toSnapshot({
    RendererHealth health = RendererHealth.healthy,
    List<String> declaredPassIds = const [],
    String? debugView,
  }) => RendererDiagnosticsSnapshot(
    frameIndex: frameIndex,
    drawCalls: drawCalls,
    trianglesSubmitted: trianglesSubmitted,
    trianglesCulled: trianglesCulled,
    instancesSubmitted: instancesSubmitted,
    instancesCulled: instancesCulled,
    liveGpuBytes: liveGpuBytes,
    peakGpuBytes: peakGpuBytes,
    resourceCreateCount: resourceCreateCount,
    resourceDeleteCount: resourceDeleteCount,
    lightSelection: lightSelection,
    passStats: passStats,
    degradedFeatures: health.degradedFeatures,
    declaredPassIds: declaredPassIds,
    debugView: debugView,
  );

  @override
  String toString() =>
      'FrameStats(#$frameIndex draws=$drawCalls tris=$trianglesSubmitted '
      'culled=$trianglesCulled gpu=${liveGpuBytes}B)';
}

/// Exportable renderer diagnostic counters snapshot contract.
final class RendererDiagnosticsSnapshot {
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
  final LightSelectionStats lightSelection;
  final Map<String, FramePassStats> passStats;
  final List<FeatureHealth> degradedFeatures;
  final List<String> declaredPassIds;
  final String? debugView;

  const RendererDiagnosticsSnapshot({
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
    this.lightSelection = const LightSelectionStats(),
    this.passStats = const {},
    this.degradedFeatures = const [],
    this.declaredPassIds = const [],
    this.debugView,
  });

  Map<String, Object?> toJson() => {
    'frameIndex': frameIndex,
    'drawCalls': drawCalls,
    'trianglesSubmitted': trianglesSubmitted,
    'trianglesCulled': trianglesCulled,
    'instancesSubmitted': instancesSubmitted,
    'instancesCulled': instancesCulled,
    'liveGpuBytes': liveGpuBytes,
    'peakGpuBytes': peakGpuBytes,
    'resourceCreateCount': resourceCreateCount,
    'resourceDeleteCount': resourceDeleteCount,
    'lightSelection': lightSelection.toJson(),
    'passStats': {
      for (final e in passStats.entries)
        e.key: {
          'drawCalls': e.value.drawCalls,
          'trianglesSubmitted': e.value.trianglesSubmitted,
          'trianglesCulled': e.value.trianglesCulled,
          'instancesSubmitted': e.value.instancesSubmitted,
          'instancesCulled': e.value.instancesCulled,
        },
    },
    'degradedFeatures': degradedFeatures
        .map(
          (f) => {
            'featureId': f.featureId,
            'stageOrResource': f.stageOrResource,
            'message': f.message,
            'fallback': f.fallback,
            'firstFrameAffected': f.firstFrameAffected,
          },
        )
        .toList(),
    'declaredPassIds': declaredPassIds,
    if (debugView != null) 'debugView': debugView,
  };
}
