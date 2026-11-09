import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/passes/depth_prepass.dart';
import 'package:pixeldart/rendering/passes/depth_resources.dart';
import 'package:pixeldart/rendering/passes/pass_context_impl.dart';
import 'package:pixeldart/rendering/passes/safe_graph_resources.dart';
import 'package:pixeldart/rendering/passes/shadow.dart';
import 'package:pixeldart/rendering/passes/shadow_resources.dart';
import 'package:pixeldart/rendering/passes/shadowed_world.dart';
import 'package:pixeldart/rendering/passes/ssao_resources.dart';
import 'package:pixeldart/rendering/passes/world.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

part 'test_alpha_mask_tail.dart';

void main() {
  _everyPassAgreesOnTheCutoffOfEveryDraw();
  _onlyMaskedMaterialsCutOut();
  _prepassAffineWeightMatchesTheWorldPass();
  _albedoIsResolvedPerMaterialNotOncePerPass();
  _blendedMaterialsNeverCutOut();
  _everyPassAgreesOnWhichFacesExist();
  _onlyBlendedDrawsWriteRealTransparency();
  _heroLightingUniformsAndReceiversArePerFrameAndPerDraw();
  print('Renderer alpha-mask fixtures passed.');
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

const _maskTexture = TextureHandle(7, 1, 'lattice');

const _maskedMaterial = MaterialDefinition(
  key: 'masked',
  albedoTexture: _maskTexture,
  alphaMode: AlphaMode.masked,
  alphaCutoff: 0.25,
);
const _maskedAffineMaterial = MaterialDefinition(
  key: 'masked-affine',
  albedoTexture: _maskTexture,
  alphaMode: AlphaMode.masked,
  alphaCutoff: 0.75,
  affineSampling: true,
);
const _plainMaterial = MaterialDefinition(key: 'plain');
const _doubleSidedMaterial = MaterialDefinition(
  key: 'masked-double-sided',
  albedoTexture: _maskTexture,
  alphaMode: AlphaMode.masked,
  alphaCutoff: 0.25,
  doubleSided: true,
);
const _blendedMaterial = MaterialDefinition(
  key: 'blended-glass',
  albedoTexture: _maskTexture,
  alphaMode: AlphaMode.blended,
  alphaCutoff: 0.9,
);

const _maskedHandle = MaterialHandle(0, 1);
const _maskedAffineHandle = MaterialHandle(1, 1);
const _plainHandle = MaterialHandle(2, 1);
const _blendedHandle = MaterialHandle(3, 1);
const _doubleSidedHandle = MaterialHandle(4, 1);

MaterialDefinition _resolveMaterial(MaterialHandle handle) => switch (handle) {
  _maskedHandle => _maskedMaterial,
  _maskedAffineHandle => _maskedAffineMaterial,
  _blendedHandle => _blendedMaterial,
  _doubleSidedHandle => _doubleSidedMaterial,
  _ => _plainMaterial,
};

final class _FakeFrameScene implements FrameSceneData {
  final List<Object> opaque;
  final List<Object> blended;
  final PostProcessState postState;
  final FrameEnvironment lighting;
  const _FakeFrameScene(
    this.opaque,
    this.blended,
    this.postState, {
    this.lighting = const FrameEnvironment(),
  });

  @override
  Iterable<Object> get opaqueBatches => opaque;
  @override
  Iterable<Object> get blendedItemsBackToFront => blended;
  @override
  Object get camera => _fakeCamera;
  @override
  Object get environment => lighting;
  @override
  Object get post => postState;
  @override
  double get timeSeconds => 0;
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

int _nextSlot = 0;

RetainedItemView _item(
  MaterialHandle material, {
  DrawMode drawMode = DrawMode.opaque,
  bool receivesShadow = true,
}) {
  final slot = _nextSlot++;
  return _FakeItemView(
    InstanceId(slot, 1),
    RetainedItemDescriptor(
      mesh: MeshHandle(0, 1),
      material: material,
      drawMode: drawMode,
      receivesShadow: receivesShadow,
      instanceFamilyKey: 1,
    ),
    const Aabb(Vec3(-0.5, -0.5, -0.5), Vec3(0.5, 0.5, 0.5)),
  );
}

final class _AlwaysAvailableResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

final class _Run {
  final FakeGpuDevice device;
  const _Run(this.device);

  List<double> float1s(String name) => device.float1Sequence(name);

  List<String> unitZeroBinds() => [
    for (final line in device.drawLog)
      if (line.startsWith('bindTexture(0, ')) line,
  ];

  List<bool> perDrawCullEnable() {
    final all = [
      for (final line in device.drawLog)
        if (line.startsWith('applyDrawState('))
          line.contains('cullEnable=true'),
    ];
    return all.isEmpty ? all : all.sublist(1);
  }
}

_Run _runWorldPass(
  List<RetainedItemView> opaque,
  List<RetainedItemView> blended,
  double affineWarpStrength, [
  FrameEnvironment lighting = const FrameEnvironment(),
  List<SpotLight> directSpotLights = const [],
  int shadowMapSize = 512,
]) {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final fallbackTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final maskTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final feature = ShadowedWorldFeature(
    programLibrary: library,
    vertexSource: shadowedWorldVertSrc,
    fragmentSource: shadowedWorldFragSrc,
    resolveMesh: (mesh) => ResolvedMesh(
      vao: device.createVertexArray(),
      isIndexed: false,
      drawCount: 3,
    ),
    resolveMaterial: _resolveMaterial,
    resolveAlbedo: (handle) =>
        handle == _maskTexture ? maskTexture : fallbackTexture,
    resolveShadowMap: () =>
        device.createTexture(const GpuTextureDescriptor(width: 4, height: 4)),
    resolveLightView: () => ShadowLightView(Mat4.identity()),
    resolveCasterLight: () => null,
    resolveDirectSpotLights: () => directSpotLights,
    shadowMapWidth: shadowMapSize,
    shadowMapHeight: shadowMapSize,
    resolveSsaoBlurred: () =>
        device.createTexture(const GpuTextureDescriptor(width: 4, height: 4)),
    sceneColorWidth: 384,
    sceneColorHeight: 216,
  );
  final pass = feature.createPasses(_AlwaysAvailableResources()).single;
  final target = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );
  pass.execute(
    BoundPassContext(
      views: {
        SafeGraphResources.sceneColor.name: BoundResourceView(
          SafeGraphResources.sceneColor,
          target,
        ),
        ShadowResources.shadowMap.name: BoundResourceView(
          ShadowResources.shadowMap,
          target,
        ),
        SsaoResources.ssaoBlurred.name: BoundResourceView(
          SsaoResources.ssaoBlurred,
          target,
        ),
      },
      encoder: DeviceDrawCommandEncoder(device),
      frameScene: _FakeFrameScene(
        opaque,
        blended,
        PostProcessState(affineWarpStrength: affineWarpStrength),
        lighting: lighting,
      ),
    ),
  );
  return _Run(device);
}

_Run _runPrepass(List<RetainedItemView> opaque, double affineWarpStrength) {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final fallbackTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final maskTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final feature = DepthPrepassFeature(
    programLibrary: library,
    vertexSource: depthPrepassVertSrc,
    fragmentSource: depthPrepassFragSrc,
    resolveMesh: (mesh) => ResolvedMesh(
      vao: device.createVertexArray(),
      isIndexed: false,
      drawCount: 3,
    ),
    resolveMaterial: _resolveMaterial,
    resolveAlbedo: (handle) =>
        handle == _maskTexture ? maskTexture : fallbackTexture,
  );
  final pass = feature.createPasses(_AlwaysAvailableResources()).single;
  final target = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, hasDepth: true),
  );
  pass.execute(
    BoundPassContext(
      views: {
        DepthPrepassResources.sceneDepth.name: BoundResourceView(
          DepthPrepassResources.sceneDepth,
          target,
        ),
      },
      encoder: DeviceDrawCommandEncoder(device),
      frameScene: _FakeFrameScene(
        opaque,
        const [],
        PostProcessState(affineWarpStrength: affineWarpStrength),
      ),
    ),
  );
  return _Run(device);
}

_Run _runShadowCaster(List<RetainedItemView> opaque) {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final fallbackTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final maskTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final feature = ShadowFeature(
    programLibrary: library,
    vertexSource: shadowCasterVertSrc,
    fragmentSource: shadowCasterFragSrc,
    resolveMesh: (mesh) => ResolvedMesh(
      vao: device.createVertexArray(),
      isIndexed: false,
      drawCount: 3,
    ),
    resolveMaterial: _resolveMaterial,
    resolveAlbedo: (handle) =>
        handle == _maskTexture ? maskTexture : fallbackTexture,
    // A real caster light, unlike the world-pass fixture's null: the pass
    // clears and returns early without one, and would record no draws at
    // all to assert against.
    resolveCasterLight: () => const SpotLight(
      id: 1,
      position: Vec3(0, 3, 0),
      direction: Vec3(0, -1, 0),
      color: LinearColor.white,
      intensity: 1,
      range: 8,
      innerConeRadians: 0.5,
      outerConeRadians: 0.75,
      castsShadow: true,
    ),
    onLightViewComputed: (_) {},
  );
  final pass = feature.createPasses(_AlwaysAvailableResources()).single;
  final target = device.createTarget(
    const GpuTargetDescriptor(width: 512, height: 512, hasDepth: true),
  );
  pass.execute(
    BoundPassContext(
      views: {
        ShadowResources.shadowMap.name: BoundResourceView(
          ShadowResources.shadowMap,
          target,
        ),
      },
      encoder: DeviceDrawCommandEncoder(device),
      frameScene: _FakeFrameScene(opaque, const [], PostProcessState.off),
    ),
  );
  return _Run(device);
}

void _expectDoubles(List<double> actual, List<double> expected, String what) {
  if (actual.length != expected.length) {
    throw StateError('$what: expected ${expected.length} values, got $actual');
  }
  for (var i = 0; i < expected.length; i++) {
    if (actual[i] != expected[i]) {
      throw StateError('$what: expected $expected, got $actual');
    }
  }
}

void _expect(bool condition, String what) {
  if (!condition) throw StateError(what);
}

void _everyPassAgreesOnTheCutoffOfEveryDraw() {
  const expected = [0.25, 0.0, 0.75];
  final scene = [
    _item(_maskedHandle, drawMode: DrawMode.masked),
    _item(_plainHandle),
    _item(_maskedAffineHandle, drawMode: DrawMode.masked),
  ];
  _expectDoubles(
    _runWorldPass(scene, const [], 1).float1s('uAlphaCutoff'),
    expected,
    'shadowedWorld must cut each draw at its own material cutoff',
  );
  _expectDoubles(
    _runPrepass(scene, 1).float1s('uAlphaCutoff'),
    expected,
    'depthPrepass must cut exactly where shadowedWorld does, or SSAO '
    'occludes against geometry the world pass discarded',
  );
  _expectDoubles(
    _runShadowCaster(scene).float1s('uAlphaCutoff'),
    expected,
    'shadowCaster must cut exactly where shadowedWorld does, or a pierced '
    'surface casts the solid shadow of its bounding mesh',
  );
}

void _onlyMaskedMaterialsCutOut() {
  final scene = [_item(_plainHandle), _item(_plainHandle)];
  for (final (name, sequence) in [
    (
      'shadowedWorld',
      _runWorldPass(scene, const [], 1).float1s('uAlphaCutoff'),
    ),
    ('depthPrepass', _runPrepass(scene, 1).float1s('uAlphaCutoff')),
    ('shadowCaster', _runShadowCaster(scene).float1s('uAlphaCutoff')),
  ]) {
    _expectDoubles(sequence, [
      0,
      0,
    ], '$name must leave opaque materials with no cutout at all');
  }
}

void _prepassAffineWeightMatchesTheWorldPass() {
  final scene = [
    _item(_maskedHandle, drawMode: DrawMode.masked),
    _item(_plainHandle),
    _item(_maskedAffineHandle, drawMode: DrawMode.masked),
  ];
  final world = _runWorldPass(
    scene,
    const [],
    1,
  ).float1s('uAffineWarpStrength');
  final prepass = _runPrepass(scene, 1).float1s('uAffineWarpStrength');
  _expectDoubles(world, [0, 0, 1], 'only the affineSampling material may warp');
  _expectDoubles(
    prepass,
    world,
    'depthPrepass must warp exactly the draws shadowedWorld warps',
  );
  _expectDoubles(
    _runPrepass(scene, 0).float1s('uAffineWarpStrength'),
    [0, 0, 0],
    'a zero frame weight must suppress the prepass warp too',
  );
}

void _albedoIsResolvedPerMaterialNotOncePerPass() {
  final scene = [
    _item(_maskedHandle, drawMode: DrawMode.masked),
    _item(_plainHandle),
    _item(_maskedAffineHandle, drawMode: DrawMode.masked),
  ];
  for (final (name, binds) in [
    ('shadowedWorld', _runWorldPass(scene, const [], 1).unitZeroBinds()),
    ('depthPrepass', _runPrepass(scene, 1).unitZeroBinds()),
    ('shadowCaster', _runShadowCaster(scene).unitZeroBinds()),
  ]) {
    _expect(
      binds.length == 3,
      '$name must bind unit 0 once per draw, got ${binds.length}',
    );
    _expect(
      binds[0] == binds[2],
      '$name: two materials naming the same albedoTexture must bind the '
      'same texture',
    );
    _expect(
      binds[0] != binds[1],
      '$name: a material with no albedoTexture must not get the masked '
      "material's texture",
    );
  }
}
