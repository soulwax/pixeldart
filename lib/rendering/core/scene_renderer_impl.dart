import 'dart:typed_data';
import '../api/capabilities.dart';
import '../api/configuration_coordinator.dart';
import '../api/frame.dart';
import '../api/handles.dart';
import '../api/lights.dart';
import '../api/materials.dart';
import '../api/mesh.dart';
import '../api/renderer.dart';
import '../api/scene.dart';
import '../api/settings.dart';
import '../api/stats.dart';
import '../math/bounds.dart';
import '../assets/material_store.dart';
import '../assets/material_residency.dart';
import '../assets/mesh_store.dart';
import '../assets/model_binding.dart';
import '../assets/model_definition.dart';
import '../assets/texture_store.dart';
import '../assets/texture_residency.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/resource_plan_adapter.dart';
import '../passes/pass_context_impl.dart';
import '../passes/safe_graph.dart';
import '../passes/shadow_graph.dart';
import '../passes/world.dart';
import 'batching.dart';
import 'feature_graph.dart';
import 'frame_telemetry.dart';
import 'frame_queue.dart';
import 'program_library.dart';
import 'render_feature.dart';
import 'render_world_impl.dart';
import 'sort_key.dart';
import 'visibility.dart';
part 'scene_renderer_graph.dart';
part 'scene_renderer_timing.dart';
part 'resource_library_impl.dart';

final class SceneRendererImpl with _GpuTimingSupport implements SceneRenderer {
  @override
  final GpuDevice device;
  final ConfigurationCoordinator _configurations = ConfigurationCoordinator();
  final FrameQueue _frames = FrameQueue();
  final List<RenderWorldImpl> _worlds = [];
  RendererState _state = RendererState.constructed;
  final RendererHealth _health = RendererHealth.healthy;
  RenderCapabilities? _capabilities;
  ResourceLibraryImpl? _resources;
  GpuResourcePlanAdapter? _gpuResources;
  ProgramLibrary? _programs;
  FeatureGraph? _featureGraph;
  FeatureGraphResult? _graph;
  RendererConfiguration? _configuration;
  FrameInput? _activeFrame;
  RenderWorldImpl? _activeWorld;
  SceneRendererImpl(this.device);

  @override
  RendererState get state => _state;
  @override
  RenderCapabilities get capabilities =>
      _capabilities ?? (throw StateError('renderer is not initialized'));
  @override
  RendererHealth get health => _health;
  @override
  RendererConfiguration get configuration =>
      _configuration ?? (throw StateError('renderer is not initialized'));
  @override
  ResourceLibrary get resources =>
      _resources ?? (throw StateError('renderer is not initialized'));
  @override
  Future<void> initialize(
    RendererConfiguration configuration,
    SurfaceMetrics surface,
  ) {
    if (_state != RendererState.constructed) {
      throw StateError('renderer can only be initialized once');
    }
    configuration.validate();
    surface.validate();
    if (device.status == GpuDeviceStatus.lost) {
      throw StateError('renderer device is context lost');
    }
    _state = RendererState.initializing;
    try {
      _capabilities = device.queryCapabilities();
      _configurations.initialize(configuration);
      _resources = ResourceLibraryImpl(device);
      _gpuResources = GpuResourcePlanAdapter(device)..initialize(configuration);
      _programs = ProgramLibrary(device);
      _configuration = configuration;
      _buildSafeGraph();
      _state = RendererState.ready;
    } catch (_) {
      _programs?.disposeAll();
      _gpuResources?.dispose();
      _resources?.dispose();
      _resources = null;
      _state = RendererState.constructed;
      rethrow;
    }
    return Future<void>.value();
  }

  @override
  Future<void> configure(RendererConfiguration configuration) =>
      _configure(configuration);

  @override
  void resize(SurfaceMetrics surface) => _resize(surface);

  @override
  RenderWorld createWorld() {
    _ensureReady();
    final world = RenderWorldImpl(_resources!.meshes.registry);
    _worlds.add(world);
    return world;
  }

  @override
  RenderEncoder beginFrame(RenderWorld world, FrameInput frame) {
    _recoverIfNeeded();
    _ensureReady();
    if (world is! RenderWorldImpl || !_worlds.contains(world)) {
      throw ArgumentError('world was not created by this renderer');
    }
    if (_activeFrame != null) {
      throw StateError('renderer.beginFrame called twice without end/abort');
    }
    frame.validate();
    _activeFrame = frame;
    _activeWorld = world;
    final encoder = _frames.beginFrame();
    try {
      _beginGpuTiming(frame.frameIndex);
      return encoder;
    } catch (_) {
      _frames.abortFrame();
      _abortGpuTiming();
      _activeFrame = null;
      _activeWorld = null;
      rethrow;
    }
  }

  @override
  FrameStats endFrame() {
    _ensureReady();
    final frame = _activeFrame;
    final world = _activeWorld;
    if (frame == null || world == null) {
      throw StateError('renderer.endFrame called without an active frame');
    }
    final transient = _frames.endFrame();
    try {
      final execution = _executeGraph(world, frame, transient);
      final passStats = execution.telemetry.snapshot();
      final sceneStats = passStats.entries
          .where((entry) => entry.key.toLowerCase().contains('world'))
          .map((entry) => entry.value)
          .fold(
            const FramePassStats(),
            (total, pass) => FramePassStats(
              drawCalls: total.drawCalls + pass.drawCalls,
              trianglesSubmitted:
                  total.trianglesSubmitted + pass.trianglesSubmitted,
              instancesSubmitted:
                  total.instancesSubmitted + pass.instancesSubmitted,
            ),
          );
      return FrameStats(
        frameIndex: frame.frameIndex,
        drawCalls: sceneStats.drawCalls,
        trianglesSubmitted: sceneStats.trianglesSubmitted,
        trianglesCulled: execution.trianglesCulled,
        instancesSubmitted: sceneStats.instancesSubmitted,
        instancesCulled: execution.cull.stats.culled,
        liveGpuBytes: _resources!.estimatedGpuBytes,
        peakGpuBytes: _resources!.estimatedGpuBytes,
        resourceCreateCount: _resources!.resourceCreateCount,
        resourceDeleteCount: _resources!.resourceDeleteCount,
        passStats: passStats,
      );
    } finally {
      _finishGpuTiming(frame.frameIndex);
      _activeFrame = null;
      _activeWorld = null;
    }
  }

  @override
  void abortFrame() {
    if (_activeFrame == null) {
      throw StateError('renderer.abortFrame called without an active frame');
    }
    try {
      _frames.abortFrame();
    } finally {
      _abortGpuTiming();
      _activeFrame = null;
      _activeWorld = null;
    }
  }

  @override
  void dispose() {
    if (_state == RendererState.disposed) return;
    if (_activeFrame != null) abortFrame();
    _disposeGpuTimings();
    for (final world in _worlds) {
      world.dispose();
    }
    _worlds.clear();
    _featureGraph?.disposeAll();
    _programs?.disposeAll();
    _gpuResources?.dispose();
    _resources?.dispose();
    _resources = null;
    _featureGraph = null;
    _graph = null;
    _programs = null;
    _gpuResources = null;
    _configurations.dispose();
    _state = RendererState.disposed;
  }

  void _recoverIfNeeded() {
    if (_state != RendererState.contextLost) return;
    if (device.status == GpuDeviceStatus.lost) {
      throw StateError('renderer context remains lost');
    }
    _resources!.rehydrateAfterContextRestore();
    _gpuResources!.rehydrateAfterContextRestore(_configuration!);
    _programs!.resetAfterContextRestore();
    _buildSafeGraph();
    _state = RendererState.ready;
  }

  void _ensureReady() {
    if (_state != RendererState.ready) {
      throw StateError('renderer is not ready: ${_state.name}');
    }
    if (device.status == GpuDeviceStatus.lost) {
      _discardGpuTimings();
      _state = RendererState.contextLost;
      throw StateError('renderer context lost');
    }
  }
}
