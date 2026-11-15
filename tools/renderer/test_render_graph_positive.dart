import 'package:pixeldart/rendering/core/graph_pass.dart';
import 'package:pixeldart/rendering/core/graph_resource.dart';
import 'package:pixeldart/rendering/core/render_graph.dart';
import 'package:pixeldart/rendering/rendering.dart';

import 'fake_gpu_device.dart';

const _sceneColor = ResourceRef(
  name: 'sceneColor',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
);
const _presentTarget = ResourceRef(
  name: 'present',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
);

Future<void> main() async {
  _validSafeGraphAccepted();
  _mandatoryGraphIndependentOfOptionalEffects();
  _declaredPassReconciliationAndTopologicalOrder();
  _declaredPassCycleDetection();
  _renderGraphTopologicalSort();
  await _sceneRendererDeclaredPassExecutionAndDiagnostics();
  print('Renderer graph positive-control fixtures passed.');
}

void _validSafeGraphAccepted() {
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'worldOpaque',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'worldTransparent',
      stage: GraphStage.afterWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.read)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'present',
      stage: GraphStage.beforePresent,
      uses: [
        const ResourceUse(_sceneColor, ResourceAccess.read),
        const ResourceUse(_presentTarget, ResourceAccess.write),
      ],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  if (!graph.isValid) {
    throw StateError(
      'the mandatory safe graph must validate cleanly: ${graph.failures}',
    );
  }
  if (graph.orderedPasses.length != 3) {
    throw StateError('expected exactly 3 passes in the safe graph');
  }
}

void _mandatoryGraphIndependentOfOptionalEffects() {
  var bloomInstalled = false;
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'worldOpaque',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'present',
      stage: GraphStage.beforePresent,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.read)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'bloom',
      stage: GraphStage.afterResolve,
      uses: const [],
      enabledPredicate: () => bloomInstalled,
    ),
  );

  final withoutBloom = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  if (!withoutBloom.isValid) {
    throw StateError(
      'mandatory world/present must build independent of optional bloom: ${withoutBloom.failures}',
    );
  }
  if (withoutBloom.orderedPasses.any((p) => p.id == 'bloom')) {
    throw StateError(
      'disabled optional pass must be absent from orderedPasses',
    );
  }

  bloomInstalled = true;
  final withBloom = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  if (!withBloom.orderedPasses.any((p) => p.id == 'bloom')) {
    throw StateError('enabled optional pass must appear in orderedPasses');
  }
}

void _declaredPassReconciliationAndTopologicalOrder() {
  final registry = DeclaredPassRegistry();

  registry.declare(
    const RenderPassDecl(
      id: 'custom_overlay',
      anchor: RenderPassAnchor.beforePresent,
      priority: 5,
    ),
  );
  registry.declare(
    const RenderPassDecl(
      id: 'lighting2d',
      anchor: RenderPassAnchor.afterWorld,
      priority: 10,
    ),
  );
  registry.declare(
    const RenderPassDecl(
      id: 'shadow_prep',
      anchor: RenderPassAnchor.beforeShadow,
      priority: 0,
    ),
  );

  final ordered = registry.orderedPasses();
  final ids = ordered.map((p) => p.id).toList();
  if (ids.length != 3 ||
      ids[0] != 'shadow_prep' ||
      ids[1] != 'lighting2d' ||
      ids[2] != 'custom_overlay') {
    throw StateError('declared passes must order by anchor stage, got: $ids');
  }

  // Adding dependency within stage
  registry.declare(
    const RenderPassDecl(
      id: 'lighting2d_blur',
      anchor: RenderPassAnchor.afterWorld,
      dependsOn: ['lighting2d'],
      priority: 0,
    ),
  );
  final withDep = registry.orderedPasses().map((p) => p.id).toList();
  final idx2d = withDep.indexOf('lighting2d');
  final idxBlur = withDep.indexOf('lighting2d_blur');
  if (idx2d < 0 || idxBlur < 0 || idx2d >= idxBlur) {
    throw StateError('dependency lighting2d must precede lighting2d_blur, got $withDep');
  }

  // Remove declared pass
  registry.remove('lighting2d_blur');
  if (registry.declaredPassIds.contains('lighting2d_blur')) {
    throw StateError('remove must remove pass from registry');
  }
}

void _declaredPassCycleDetection() {
  final registry = DeclaredPassRegistry();
  registry.declare(
    const RenderPassDecl(
      id: 'passX',
      anchor: RenderPassAnchor.afterWorld,
      dependsOn: ['passY'],
    ),
  );

  var caught = false;
  try {
    registry.declare(
      const RenderPassDecl(
        id: 'passY',
        anchor: RenderPassAnchor.afterWorld,
        dependsOn: ['passX'],
      ),
    );
  } catch (error) {
    caught = error is StateError &&
        error.message.toString().contains('Dependency cycle');
  }
  if (!caught) {
    throw StateError('dependency cycle between declared passes must throw StateError');
  }
}

void _renderGraphTopologicalSort() {
  const res = ResourceRef(
    name: 'targetA',
    format: ResourceFormat.rgba8,
    width: 64,
    height: 64,
  );

  final passWriter = PassDeclaration(
    id: 'writer',
    stage: GraphStage.afterWorld,
    uses: [const ResourceUse(res, ResourceAccess.write)],
  );
  final passReader = PassDeclaration(
    id: 'reader',
    stage: GraphStage.afterWorld,
    uses: [const ResourceUse(res, ResourceAccess.read)],
  );

  // Reader passed before writer
  final sorted = RenderGraph.topologicalSort([passReader, passWriter]);
  if (sorted[0].id != 'writer' || sorted[1].id != 'reader') {
    throw StateError('topologicalSort must order writer before reader');
  }
}

Future<void> _sceneRendererDeclaredPassExecutionAndDiagnostics() async {
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  await renderer.initialize(
    RendererConfiguration.safe,
    const SurfaceMetrics(
      cssWidth: 64,
      cssHeight: 64,
      pixelWidth: 64,
      pixelHeight: 64,
    ),
  );

  const customPass = RenderPassDecl(
    id: 'custom_pass_alpha',
    anchor: RenderPassAnchor.afterWorld,
  );
  renderer.declareRenderPass(customPass);
  if (!renderer.declaredPassIds.contains('custom_pass_alpha')) {
    throw StateError('declared pass must be registered');
  }

  renderer.debugView = 'normals';
  final world = renderer.createWorld();
  renderer.beginFrame(
    world,
    FrameInput(
      camera: CameraView(
        view: Mat4.identity(),
        projection: Mat4.identity(),
        viewProjection: Mat4.identity(),
        eye: Vec3.zero,
        forward: const Vec3(0, 0, -1),
        near: 0.1,
        far: 100,
        aspect: 1,
      ),
      environment: const FrameEnvironment(
        pointLights: [
          PointLight(
            id: 1,
            position: Vec3.zero,
            color: LinearColor.white,
            intensity: 1,
            radius: 5,
          ),
          PointLight(
            id: 2,
            position: Vec3.zero,
            color: LinearColor.white,
            intensity: 1,
            radius: 5,
          ),
          PointLight(
            id: 3,
            position: Vec3.zero,
            color: LinearColor.white,
            intensity: 1,
            radius: 5,
          ),
          PointLight(
            id: 4,
            position: Vec3.zero,
            color: LinearColor.white,
            intensity: 1,
            radius: 5,
          ),
          PointLight(
            id: 5,
            position: Vec3.zero,
            color: LinearColor.white,
            intensity: 1,
            radius: 5,
          ),
        ],
      ),
      post: const PostProcessState(),
      frameIndex: 1,
      historyEpoch: 0,
      noiseSeed: 1,
      timeSeconds: 0,
    ),
  );
  final stats = renderer.endFrame();

  // Verify custom pass executed and recorded telemetry
  if (!stats.passStats.containsKey('custom_pass_alpha')) {
    throw StateError('telemetry must record custom declared pass');
  }

  // Verify light selection stats
  if (stats.lightSelection.totalLights != 5 ||
      stats.lightSelection.activeLights != 4 ||
      stats.lightSelection.droppedLights != 1) {
    throw StateError(
      'lightSelection stats mismatch: ${stats.lightSelection.toJson()}',
    );
  }

  // Verify snapshot export
  final snapshot = renderer.diagnosticsSnapshot();
  if (!snapshot.declaredPassIds.contains('custom_pass_alpha') ||
      snapshot.debugView != 'normals') {
    throw StateError('diagnosticsSnapshot mismatch');
  }

  renderer.removeDeclaredRenderPass('custom_pass_alpha');
  if (renderer.declaredPassIds.contains('custom_pass_alpha')) {
    throw StateError('pass must be removed');
  }

  renderer.dispose();
}
