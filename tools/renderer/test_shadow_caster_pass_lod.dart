import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/passes/pass_context_impl.dart';
import 'package:pixeldart/rendering/passes/shadow.dart';
import 'package:pixeldart/rendering/passes/shadow_resources.dart';
import 'package:pixeldart/rendering/passes/world.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

const _light = SpotLight(
  id: 11,
  position: Vec3.zero,
  direction: Vec3(0, -1, 0),
  color: LinearColor.white,
  range: 32,
);

final _camera = CameraView(
  view: Mat4.identity(),
  projection: Mat4.identity(),
  viewProjection: Mat4.identity(),
  eye: Vec3.zero,
  forward: const Vec3(0, 0, -1),
  near: 0.1,
  far: 100,
  aspect: 16 / 9,
);

void main() {
  _passSkipsOnlyCulledItems();
  _oneHundredFramesKeepOwnershipStable();
  print('Renderer shadow-caster pass LOD fixtures passed.');
}

void _passSkipsOnlyCulledItems() {
  final run = _PassRun();
  final first = _item(100, const Vec3(6, 0, 0));
  final second = _item(101, const Vec3(24, 0, 0));
  run.execute([first, second]);
  require(
    run.drawCount == 1,
    'shadow pass must skip the distant culled item, got ${run.drawCount} draws',
  );
  require(
    run.selector.trackedInstanceCount == 2,
    'pass callback did not retain both caster identities',
  );
  run.dispose();
}

void _oneHundredFramesKeepOwnershipStable() {
  final run = _PassRun();
  final initialLiveObjects = run.device.liveObjectCount;
  final initialBufferCreates = run.device.bufferCreateCalls;
  final initialTextureCreates = run.device.textureCreateCalls;
  final initialTargetCreates = run.device.targetCreateCalls;
  final initialVaoCreates = run.device.vaoCreateCalls;
  var previousDrawCount = 0;
  for (var frame = 0; frame < 100; frame++) {
    final firstDistance = frame.isEven ? 6.5 : 9.5;
    final secondDistance = frame.isEven ? 18.5 : 21.5;
    run.execute([
      _item(100, Vec3(firstDistance, 0, 0)),
      _item(101, Vec3(secondDistance, 0, 0)),
    ]);
    final expectedDraws = frame.isEven ? 2 : 1;
    final frameDraws = run.drawCount - previousDrawCount;
    require(
      frameDraws == expectedDraws,
      'shadow pass LOD produced $frameDraws draws at frame $frame, '
      'expected $expectedDraws',
    );
    previousDrawCount = run.drawCount;
    require(
      run.device.liveObjectCount == initialLiveObjects &&
          run.device.bufferCreateCalls == initialBufferCreates &&
          run.device.textureCreateCalls == initialTextureCreates &&
          run.device.targetCreateCalls == initialTargetCreates &&
          run.device.vaoCreateCalls == initialVaoCreates,
      'shadow LOD pass changed GPU ownership at frame $frame',
    );
  }
  require(run.drawCount == 150, '100-frame draw trace was not 150 calls');
  run.dispose();
}

RetainedItemView _item(int slot, Vec3 center) => _ItemView(
  InstanceId(slot, 1, 'caster-$slot'),
  RetainedItemDescriptor(
    mesh: const MeshHandle(0, 1, 'caster-mesh'),
    material: const MaterialHandle(0, 1, 'caster-material'),
    castsShadow: true,
  ),
  Aabb(center - const Vec3(0.5, 0.5, 0.5), center + const Vec3(0.5, 0.5, 0.5)),
);

final class _ItemView implements RetainedItemView {
  @override
  final InstanceId id;
  @override
  final RetainedItemDescriptor descriptor;
  @override
  final Aabb worldBounds;

  const _ItemView(this.id, this.descriptor, this.worldBounds);
}

final class _FrameScene implements FrameSceneData {
  final List<Object> items;
  const _FrameScene(this.items);

  @override
  Iterable<Object> get opaqueBatches => items;
  @override
  Iterable<Object> get blendedItemsBackToFront => const [];
  @override
  Object get camera => _camera;
  @override
  Object get environment => const FrameEnvironment();
  @override
  Object get post => PostProcessState.off;
  @override
  double get timeSeconds => 0;
}

final class _AlwaysAvailableResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

final class _PassRun {
  final FakeGpuDevice device;
  late final ProgramLibrary library;
  late final GpuObject _target;
  late final GpuObject _texture;
  late final GpuObject _vao;
  final InstanceShadowCasterLodSelector selector =
      InstanceShadowCasterLodSelector(
        policy: const ShadowCasterLodPolicy(
          fullToReduced: 8,
          reducedToCulled: 20,
          hysteresisDistance: 1,
        ),
      );
  late final RenderPass pass;

  _PassRun() : device = FakeGpuDevice() {
    library = ProgramLibrary(device);
    _target = device.createTarget(
      const GpuTargetDescriptor(width: 512, height: 512, hasDepth: true),
    );
    _texture = device.createTexture(
      const GpuTextureDescriptor(width: 4, height: 4),
    );
    _vao = device.createVertexArray();
    final feature = ShadowFeature(
      programLibrary: library,
      vertexSource: shadowCasterVertSrc,
      fragmentSource: shadowCasterFragSrc,
      resolveMesh: (mesh) =>
          ResolvedMesh(vao: _vao, isIndexed: false, drawCount: 3),
      resolveMaterial: (material) => const MaterialDefinition(key: 'caster'),
      resolveAlbedo: (texture) => _texture,
      resolveCasterLight: () => _light,
      resolveCasterLod: (item, light) =>
          selector.select(item.id, light, item.worldBounds.center),
      onLightViewComputed: (_) {},
    );
    pass = feature.createPasses(_AlwaysAvailableResources()).single;
  }

  int get drawCount =>
      device.drawLog.where((entry) => entry.startsWith('drawArrays(')).length;

  void execute(List<RetainedItemView> items) {
    final context = BoundPassContext(
      views: {
        ShadowResources.shadowMap.name: BoundResourceView(
          ShadowResources.shadowMap,
          _target,
        ),
      },
      encoder: DeviceDrawCommandEncoder(device),
      frameScene: _FrameScene(items),
    );
    pass.execute(context);
  }

  void dispose() {
    selector.clear();
    library.disposeAll();
    device.deleteTarget(_target);
    device.deleteTexture(_texture);
    device.deleteVertexArray(_vao);
    require(
      device.liveObjectCount == 0,
      'shadow pass fixture leaked GPU objects',
    );
  }
}
