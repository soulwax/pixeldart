import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

Future<void> main() async {
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  require(
    renderer.state == RendererState.constructed,
    'renderer must start constructed',
  );
  await renderer.initialize(
    RendererConfiguration.safe,
    const SurfaceMetrics(
      cssWidth: 640,
      cssHeight: 360,
      pixelWidth: 640,
      pixelHeight: 360,
    ),
  );
  require(
    renderer.state == RendererState.ready,
    'renderer did not become ready',
  );
  require(
    renderer.capabilities.webglVersion == 'fake-2.0',
    'capabilities not queried',
  );

  final library = renderer.resources as ResourceLibraryImpl;
  final mesh = library.registerMesh(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(42),
      localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
    ),
  );
  final material = library.registerMaterial(
    const MaterialDefinition(key: 'unit'),
  );
  final world = renderer.createWorld();
  world.addItem(RetainedItemDescriptor(mesh: mesh, material: material));

  final frame = FrameInput(
    camera: CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: Vec3.zero,
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 16 / 9,
    ),
    environment: const FrameEnvironment(
      clearColor: LinearColor(0.03, 0.02, 0.01),
    ),
    post: const PostProcessState(exposure: 1.25, vignette: 0.4, grain: 0.2),
    frameIndex: 1,
    historyEpoch: 0,
    noiseSeed: 7,
    timeSeconds: 0,
  );
  final encoder = renderer.beginFrame(world, frame);
  encoder.submit(RetainedItemDescriptor(mesh: mesh, material: material));
  var configureRejected = false;
  try {
    await renderer.configure(RendererConfiguration.safe);
  } catch (_) {
    configureRejected = true;
  }
  require(configureRejected, 'configuration must not overlap an active frame');
  final stats = renderer.endFrame();
  require(
    stats.drawCalls == 2,
    'persistent and transient draws were not counted',
  );
  require(stats.trianglesSubmitted == 2, 'triangle count is not deterministic');
  require(stats.liveGpuBytes == 168, 'mesh upload bytes were not reported');
  require(
    stats.resourceCreateCount == 2 && stats.resourceDeleteCount == 0,
    'resource lifecycle counters were not reported',
  );
  require(
    device.drawLog.any((entry) => entry.startsWith('draw')),
    'safe graph did not execute a world draw',
  );
  require(
    device.drawLog.any((entry) => entry.startsWith('drawArrays')),
    'safe graph did not execute present',
  );
  require(
    device.lastFloat1('uExposure') == 1.25 &&
        device.lastFloat1('uVignette') == 0.4 &&
        device.lastFloat1('uGrain') == 0.2 &&
        device.lastFloat1('uOutputEncoding') == 1 &&
        device.lastFloat1('uToneMap') == 1,
    'present did not consume live exposure/vignette/grain controls',
  );
  final clear = device.clearLog.first;
  require(
    clear.r == 0.03 && clear.g == 0.02 && clear.b == 0.01 && clear.a == 1,
    'world pass did not consume the authored clear color',
  );

  final targetsBeforeTransition = device.targetCreateCalls;
  final deletesBeforeTransition = device.targetDeleteCalls;
  await renderer.configure(
    const RendererConfiguration(
      profile: QualityProfile.safe,
      internalWidth: 320,
      internalHeight: 180,
    ),
  );
  require(
    device.targetCreateCalls > targetsBeforeTransition &&
        device.targetDeleteCalls > deletesBeforeTransition,
    'configuration transition did not replace GPU targets',
  );
  final targetsBeforeNoop = device.targetCreateCalls;
  await renderer.configure(
    const RendererConfiguration(
      profile: QualityProfile.safe,
      internalWidth: 320,
      internalHeight: 180,
    ),
  );
  require(
    device.targetCreateCalls == targetsBeforeNoop,
    'identical configuration was not a no-op',
  );
  await renderer.configure(
    const RendererConfiguration(
      profile: QualityProfile.clean,
      internalWidth: 320,
      internalHeight: 180,
      shadowMapCount: 1,
    ),
  );
  final profileFrame = renderer.beginFrame(world, frame);
  profileFrame.submit(RetainedItemDescriptor(mesh: mesh, material: material));
  final profileStats = renderer.endFrame();
  require(
    profileStats.drawCalls == 2,
    'capability-selected minimal graph changed draw accounting',
  );
  require(
    device.drawLog.any((entry) => entry == 'clear(depthOnly)'),
    'minimal profile did not execute its shadow depth stage',
  );
  await renderer.configure(
    const RendererConfiguration(
      profile: QualityProfile.safe,
      internalWidth: 320,
      internalHeight: 180,
    ),
  );
  final targetsBeforeInvalid = device.targetCreateCalls;
  var invalidRejected = false;
  try {
    await renderer.configure(
      const RendererConfiguration(
        profile: QualityProfile.safe,
        internalWidth: 0,
        internalHeight: 180,
      ),
    );
  } catch (_) {
    invalidRejected = true;
  }
  require(invalidRejected, 'invalid configuration was accepted');
  require(
    device.targetCreateCalls == targetsBeforeInvalid &&
        renderer.state == RendererState.ready,
    'invalid configuration disturbed the live renderer',
  );
  renderer.resize(
    const SurfaceMetrics(
      cssWidth: 800,
      cssHeight: 450,
      pixelWidth: 1600,
      pixelHeight: 900,
      devicePixelRatio: 2,
    ),
  );

  await renderer.configure(
    const RendererConfiguration(
      profile: QualityProfile.safe,
      internalWidth: 321,
      internalHeight: 181,
      sampleCount: 4,
      outputEncoding: ColorEncoding.linear,
    ),
  );
  final resolvesBeforeMsaaFrame = device.resolveTargetCalls;
  final msaaFrame = renderer.beginFrame(world, frame);
  msaaFrame.submit(RetainedItemDescriptor(mesh: mesh, material: material));
  renderer.endFrame();
  require(
    device.resolveTargetCalls == resolvesBeforeMsaaFrame + 1,
    'sample-count reconfigure did not execute the graph-owned MSAA resolve',
  );
  require(
    device.lastFloat1('uOutputEncoding') == 0 &&
        device.lastFloat1('uToneMap') == 1,
    'linear output policy was not threaded through the rebuilt present pass',
  );

  device.simulateContextLoss();
  var rejectedDuringLoss = false;
  try {
    renderer.beginFrame(world, frame);
  } catch (_) {
    rejectedDuringLoss = true;
  }
  require(rejectedDuringLoss, 'context loss must stop frame submission');
  require(
    renderer.state == RendererState.contextLost,
    'loss state not observable',
  );

  device.simulateContextRestore();
  final recovered = renderer.beginFrame(world, frame);
  recovered.submit(RetainedItemDescriptor(mesh: mesh, material: material));
  renderer.endFrame();
  require(renderer.state == RendererState.ready, 'restore did not rehydrate');

  renderer.dispose();
  renderer.dispose();
  require(
    renderer.state == RendererState.disposed,
    'dispose is not idempotent',
  );
  print('Renderer concrete lifecycle/context-restore fixture passed.');
}
