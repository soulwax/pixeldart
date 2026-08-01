import 'package:pixeldart/rendering/core/batching.dart';
import 'package:pixeldart/rendering/core/feature_graph.dart';
import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/passes/pass_context_impl.dart';
import 'package:pixeldart/rendering/passes/safe_graph.dart';
import 'package:pixeldart/rendering/passes/safe_graph_resources.dart';
import 'package:pixeldart/rendering/passes/world.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';

import 'fake_gpu_device.dart';

/// Confirms `buildSafeGraph` produces a valid two-pass §6.1 graph
/// (`world opaque -> world transparent -> present`) whose passes actually
/// execute a plausible draw-command sequence against a fake device. This
/// proves the wiring — declare/validate/createPasses/execute all agree with
/// each other — not that a real WebGL2 context accepts the shader sources
/// or produces correct pixels, which needs a browser this environment does
/// not have.
void main() {
  _graphValidatesWithBothPasses();
  _worldPassClearsAndDrawsBeforePresent();
  _presentPassBindsCanvasAndSamplesSceneColor();
  _instancedBatchIssuesOneInstancedDrawCall();
  print('Renderer safe-graph fixtures passed.');
}

final _fakeCamera = CameraView(
  view: Mat4.identity(),
  projection: Mat4.identity(),
  viewProjection: Mat4.identity(),
  eye: Vec3.zero,
  forward: const Vec3(0, 0, -1),
  near: 0.1,
  far: 100,
  aspect: 16 / 9,
);
const _fakeEnvironment = FrameEnvironment();

final class _FakeFrameScene implements FrameSceneData {
  final List<Object> opaque;
  final List<Object> blended;
  const _FakeFrameScene({this.opaque = const [], this.blended = const []});

  @override
  Iterable<Object> get opaqueBatches => opaque;
  @override
  Iterable<Object> get blendedItemsBackToFront => blended;
  @override
  Object get camera => _fakeCamera;
  @override
  Object get environment => _fakeEnvironment;
  @override
  Object get post => const PostProcessState();
}

FeatureGraphResult _buildAndValidate(FakeGpuDevice device) {
  final library = ProgramLibrary(device);
  final graph = buildSafeGraph(
    library,
    device: device,
    resolveMesh: (mesh) => ResolvedMesh(
      vao: device.createVertexArray(),
      isIndexed: false,
      drawCount: 3,
    ),
  );
  return graph.build(
    featureContext: const RenderFeatureContext(
      capabilities: RenderCapabilities.safeMinimum,
      profile: QualityProfile.safe,
    ),
    availableCapabilities: const {},
    hasValidPreviousFrame: false,
    resources: _AlwaysAvailableResources(),
  );
}

final class _AlwaysAvailableResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

void _graphValidatesWithBothPasses() {
  final device = FakeGpuDevice();
  final result = _buildAndValidate(device);
  if (!result.isValid) {
    throw StateError(
      'safe graph must validate cleanly: ${result.graph.failures}',
    );
  }
  final ids = result.passes.map((p) => p.descriptor.id).toList();
  if (ids.length != 2 ||
      ids[0] != 'worldOpaqueTransparent' ||
      ids[1] != 'present') {
    throw StateError(
      'expected [worldOpaqueTransparent, present] in that order, got $ids',
    );
  }
}

void _worldPassClearsAndDrawsBeforePresent() {
  final device = FakeGpuDevice();
  final result = _buildAndValidate(device);
  final worldPass = result.passes.first;

  final sceneColorTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );
  final context = BoundPassContext(
    views: {
      SafeGraphResources.sceneColor.name: BoundResourceView(
        SafeGraphResources.sceneColor,
        sceneColorTarget,
      ),
    },
    encoder: DeviceDrawCommandEncoder(device),
    frameScene: _FakeFrameScene(
      opaque: [_fakeItemView(), _fakeItemView()],
      blended: [_fakeItemView()],
    ),
  );

  worldPass.execute(context);

  final log = device.drawLog;
  final bindIndex = log.indexWhere((e) => e.startsWith('bindTarget'));
  final stateIndex = log.indexWhere((e) => e.startsWith('applyDrawState'));
  final clearIndex = log.indexWhere((e) => e.startsWith('clear'));
  final useProgramIndex = log.indexWhere((e) => e.startsWith('useProgram'));
  final firstDrawIndex = log.indexWhere((e) => e.startsWith('drawArrays'));

  if (bindIndex == -1 ||
      stateIndex == -1 ||
      clearIndex == -1 ||
      useProgramIndex == -1 ||
      firstDrawIndex == -1) {
    throw StateError(
      'expected bind/applyDrawState/clear/useProgram/draw all present in the '
      'log: $log',
    );
  }
  // A pass that binds a target but never calls applyDrawState inherits
  // whatever GL state the previous pass last applied — the exact "modeled
  // as PassDescriptor data but never actually issued" bug class RV-07 found
  // twice (DEPTH_TEST, then CULL_FACE). This ordering assertion is what
  // would have caught it in the pure suite instead of only in the browser.
  if (!(bindIndex < stateIndex &&
      stateIndex < clearIndex &&
      clearIndex < useProgramIndex &&
      useProgramIndex < firstDrawIndex)) {
    throw StateError(
      'expected bindTarget -> applyDrawState -> clear -> useProgram -> draw '
      'order, got: $log',
    );
  }
  final drawCount = log.where((e) => e.startsWith('drawArrays(')).length;
  if (drawCount != 3) {
    throw StateError(
      'expected exactly 3 draw calls for 2 opaque + 1 blended entry, got $drawCount',
    );
  }
}

void _presentPassBindsCanvasAndSamplesSceneColor() {
  final device = FakeGpuDevice();
  final result = _buildAndValidate(device);
  final presentPass = result.passes.last;

  final sceneColorTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );
  final context = BoundPassContext(
    views: {
      SafeGraphResources.sceneColor.name: BoundResourceView(
        SafeGraphResources.sceneColor,
        sceneColorTarget,
      ),
    },
    encoder: DeviceDrawCommandEncoder(device),
    frameScene: const _FakeFrameScene(),
  );

  presentPass.execute(context);

  final log = device.drawLog;
  if (!log.any((e) => e.startsWith('bindTarget(canvas)'))) {
    throw StateError('present pass must bind the canvas (null target): $log');
  }
  if (!log.any((e) => e.contains('bindTexture(0,'))) {
    throw StateError(
      'present pass must sample sceneColor via texture unit 0: $log',
    );
  }
  if (device.boundTarget != null) {
    throw StateError(
      'present pass must leave the canvas (null) as the bound target',
    );
  }
}

void _instancedBatchIssuesOneInstancedDrawCall() {
  final device = FakeGpuDevice();
  final result = _buildAndValidate(device);
  final worldPass = result.passes.first;

  final sceneColorTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );
  final item = _fakeItemView();
  final batch = InstanceBatch(item, List.generate(12, (_) => _fakeItemView()));
  final context = BoundPassContext(
    views: {
      SafeGraphResources.sceneColor.name: BoundResourceView(
        SafeGraphResources.sceneColor,
        sceneColorTarget,
      ),
    },
    encoder: DeviceDrawCommandEncoder(device),
    frameScene: _FakeFrameScene(opaque: [batch]),
  );

  worldPass.execute(context);

  final instancedCalls = device.drawLog
      .where((e) => e.startsWith('drawArraysInstanced'))
      .toList();
  if (instancedCalls.length != 1) {
    throw StateError(
      'expected exactly 1 instanced draw call for 1 batch, got ${instancedCalls.length}',
    );
  }
  if (!instancedCalls.first.contains(', 12)')) {
    throw StateError(
      'expected the instanced draw to carry instanceCount=12: ${instancedCalls.first}',
    );
  }
}

final class _FakeItemView implements RetainedItemView {
  @override
  final InstanceId id;
  @override
  final RetainedItemDescriptor descriptor;
  @override
  final Aabb worldBounds;

  const _FakeItemView(this.id, this.descriptor, this.worldBounds);
}

int _nextFakeSlot = 0;

RetainedItemView _fakeItemView() {
  final slot = _nextFakeSlot++;
  return _FakeItemView(
    InstanceId(slot, 1),
    RetainedItemDescriptor(
      mesh: MeshHandle(0, 1),
      material: const MaterialHandle(0, 1),
      instanceFamilyKey: 1,
    ),
    const Aabb(Vec3(-0.5, -0.5, -0.5), Vec3(0.5, 0.5, 0.5)),
  );
}
