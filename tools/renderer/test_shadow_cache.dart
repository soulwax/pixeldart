import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError('shadow cache: $message');
}

const _light = SpotLight(
  id: 1,
  position: Vec3(0, 6, 0),
  direction: Vec3(0, -1, 0),
  color: LinearColor.white,
  range: 20,
  castsShadow: true,
);

final class _Scene {
  final FakeGpuDevice device;
  final SceneRendererImpl renderer;
  final RenderWorld world;
  final MeshHandle mesh;
  final MaterialHandle material;
  final TextureHandle texture;
  late final InstanceId crate;
  var _index = 0;
  SpotLight? light = _light;

  _Scene(
    this.device,
    this.renderer,
    this.world,
    this.mesh,
    this.material,
    this.texture,
  ) {
    crate = world.addItem(
      RetainedItemDescriptor(mesh: mesh, material: material),
    );
  }

  static Future<_Scene> start() async {
    final device = FakeGpuDevice();
    final renderer = SceneRendererImpl(device);
    await renderer.initialize(
      const RendererConfiguration(
        profile: QualityProfile.minimal,
        internalWidth: 64,
        internalHeight: 64,
        shadowMapCount: 1,
      ),
      SurfaceMetrics.pixels(width: 64, height: 64),
    );
    final resources = renderer.resources;
    final texture = resources.registerTexture(
      width: 1,
      height: 1,
      pixels: Uint8List.fromList(const [255, 255, 255, 255]),
    );
    final mesh = resources.registerMesh(
      MeshData(
        layout: VertexLayoutDescriptor.compatibility14,
        vertices: Float32List(42),
        localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
      ),
    );
    final material = resources.registerMaterial(
      MaterialDefinition(
        key: 'crate',
        albedoTexture: texture,
        alphaMode: AlphaMode.masked,
      ),
    );
    return _Scene(
      device,
      renderer,
      renderer.createWorld(),
      mesh,
      material,
      texture,
    );
  }

  /// Draw calls the shadow pass issued, and whether it touched the map.
  ({int draws, bool touched}) frame({
    Vec3 eye = const Vec3(0, 2, 8),
    List<RetainedItemDescriptor> transient = const [],
  }) {
    final before = device.clearLog.length;
    final encoder = renderer.beginFrame(
      world,
      FrameInput(
        camera: CameraView.look(
          eye: eye,
          forward: const Vec3(0, -0.2, -1),
          fovYRadians: 1,
          aspect: 1,
          near: 0.1,
          far: 100,
        ),
        environment: FrameEnvironment(spotLights: [if (light != null) light!]),
        post: const PostProcessState(),
        frameIndex: ++_index,
        historyEpoch: 0,
        noiseSeed: 1,
        timeSeconds: _index / 60,
      ),
    );
    transient.forEach(encoder.submit);
    final stats = renderer.endFrame();
    final depthClears = device.clearLog
        .skip(before)
        .where((entry) => entry.mask == ClearMask.depthOnly)
        .length;
    return (
      draws: stats.passStats['shadowCaster']?.drawCalls ?? 0,
      // The depth prepass clears depth every frame too; the shadow pass adds
      // a second clear only when it redraws.
      touched: depthClears > 1,
    );
  }

  void move(Vec3 to) => world.updateItem(
    crate,
    RetainedItemDescriptor(
      mesh: mesh,
      material: material,
      transform: Transform.at(to),
    ),
  );
}

Future<void> main() async {
  final scene = await _Scene.start();
  final first = scene.frame();
  require(first.draws == 1 && first.touched, 'the first frame must draw');

  for (var i = 0; i < 3; i += 1) {
    final still = scene.frame();
    require(
      still.draws == 0 && !still.touched,
      'an unchanged scene must reuse the shadow map (frame $i: $still)',
    );
  }

  // Moving the camera changes nothing the light sees.
  require(
    scene.frame(eye: const Vec3(0.5, 2, 8)).draws == 0,
    'a camera move alone must not redraw the shadow map',
  );

  scene.move(const Vec3(0, 0, 0.25));
  require(scene.frame().draws == 1, 'a moved caster must redraw');
  require(scene.frame().draws == 0, 'and then settle again');

  scene.light = const SpotLight(
    id: 1,
    position: Vec3(0.5, 6, 0),
    direction: Vec3(0, -1, 0),
    color: LinearColor.white,
    range: 20,
    castsShadow: true,
  );
  require(scene.frame().draws == 1, 'a moved light must redraw');
  require(scene.frame().draws == 0, 'a light change settles');

  // Colour and intensity do not affect depth.
  scene.light = const SpotLight(
    id: 1,
    position: Vec3(0.5, 6, 0),
    direction: Vec3(0, -1, 0),
    color: LinearColor(1, 0.5, 0.2),
    intensity: 3,
    range: 20,
    castsShadow: true,
  );
  require(scene.frame().draws == 0, 'a recoloured light must not redraw');

  scene.renderer.resources.updateTexturePixels(
    scene.texture,
    Uint8List.fromList(const [255, 255, 255, 0]),
  );
  require(
    scene.frame().draws == 1,
    'a masked caster whose texture changed in place must redraw',
  );

  // A transient caster resubmitted unchanged every frame is still cached.
  final mote = RetainedItemDescriptor(
    mesh: scene.mesh,
    material: scene.material,
    transform: Transform.at(const Vec3(1, 1, 0)),
  );
  require(scene.frame(transient: [mote]).draws == 2, 'a new transient draws');
  require(
    scene.frame(transient: [mote]).draws == 0,
    'an unchanged transient must be cached',
  );
  require(scene.frame().draws == 1, 'a transient that disappeared must redraw');

  scene.device.simulateContextLoss();
  scene.device.simulateContextRestore();
  require(
    scene.frame().draws == 1,
    'a restored context has a new, empty shadow map',
  );

  await scene.renderer.configure(
    const RendererConfiguration(
      profile: QualityProfile.minimal,
      internalWidth: 128,
      internalHeight: 64,
      shadowMapCount: 1,
    ),
  );
  require(scene.frame().draws == 1, 'a rebuilt graph must redraw');

  scene.light = null;
  final dark = scene.frame();
  require(dark.draws == 0 && dark.touched, 'removing the light clears once');
  require(!scene.frame().touched, 'and then leaves the cleared map alone');
  scene.light = _light;
  require(scene.frame().draws == 1, 'the light coming back redraws');

  scene.renderer.dispose();
  print('Renderer shadow cache fixtures passed.');
}
