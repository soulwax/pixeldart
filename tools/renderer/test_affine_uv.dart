import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
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

/// Pins the affine-UV gate: `uAffineWarpStrength` is the product of the
/// frame's `PostProcessState.affineWarpStrength` and the drawn material's
/// own `MaterialDefinition.affineSampling`, resolved per draw rather than
/// once per pass. Browser evidence can show the ground's texture warping,
/// but it cannot cheaply show that a *second* material in the same frame
/// stayed perspective-correct — every item in the demo scene that could
/// serve as a still control is animated. This fixture is that control.
///
/// The two "neither field alone turns it on" cases are the ones worth
/// pinning: an opted-in material in a zero-weight frame, and a default
/// material in a full-weight frame, must both come out at exactly 0.
void main() {
  _perDrawStrengthMultipliesFrameWeightByMaterialOptIn();
  _zeroFrameWeightSuppressesEvenAnOptedInMaterial();
  _defaultMaterialsNeverWarpAtAnyFrameWeight();
  print('Renderer affine-UV fixtures passed.');
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

const _affineMaterial = MaterialDefinition(
  key: 'affine-opted-in',
  affineSampling: true,
);
const _plainMaterial = MaterialDefinition(key: 'perspective-correct');

const _affineHandle = MaterialHandle(0, 1);
const _plainHandle = MaterialHandle(1, 1);

final class _FakeFrameScene implements FrameSceneData {
  final List<Object> opaque;
  final PostProcessState postState;
  const _FakeFrameScene(this.opaque, this.postState);

  @override
  Iterable<Object> get opaqueBatches => opaque;
  @override
  Iterable<Object> get blendedItemsBackToFront => const [];
  @override
  Object get camera => _fakeCamera;
  @override
  Object get environment => const FrameEnvironment();
  @override
  Object get post => postState;
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

RetainedItemView _item(MaterialHandle material) {
  final slot = _nextSlot++;
  return _FakeItemView(
    InstanceId(slot, 1),
    RetainedItemDescriptor(
      mesh: MeshHandle(0, 1),
      material: material,
      instanceFamilyKey: 1,
    ),
    const Aabb(Vec3(-0.5, -0.5, -0.5), Vec3(0.5, 0.5, 0.5)),
  );
}

/// The recorded `uAffineWarpStrength` values, in draw order, produced by
/// running the real `ShadowedWorldFeature` pass over [items] at
/// [frameWarpStrength]. The pass sets one such uniform per draw, so the
/// returned list is one entry per item.
List<double> _warpStrengthsFor(
  List<MaterialHandle> items,
  double frameWarpStrength,
) {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final feature = ShadowedWorldFeature(
    programLibrary: library,
    vertexSource: shadowedWorldVertSrc,
    fragmentSource: shadowedWorldFragSrc,
    resolveMesh: (mesh) => ResolvedMesh(
      vao: device.createVertexArray(),
      isIndexed: false,
      drawCount: 3,
    ),
    resolveMaterial: (handle) =>
        handle == _affineHandle ? _affineMaterial : _plainMaterial,
    resolveAlbedo: (handle) => device.createTexture(
      const GpuTextureDescriptor(width: 4, height: 4),
    ),
    resolveShadowMap: () => device.createTexture(
      const GpuTextureDescriptor(width: 4, height: 4),
    ),
    resolveLightView: () => ShadowLightView(Mat4.identity()),
    resolveCasterLight: () => null,
    resolveSsaoBlurred: () => device.createTexture(
      const GpuTextureDescriptor(width: 4, height: 4),
    ),
    sceneColorWidth: 384,
    sceneColorHeight: 216,
  );
  final pass = feature
      .createPasses(_AlwaysAvailableResources())
      .single;

  final sceneColorTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );
  final context = BoundPassContext(
    views: {
      SafeGraphResources.sceneColor.name: BoundResourceView(
        SafeGraphResources.sceneColor,
        sceneColorTarget,
      ),
      ShadowResources.shadowMap.name: BoundResourceView(
        ShadowResources.shadowMap,
        sceneColorTarget,
      ),
      SsaoResources.ssaoBlurred.name: BoundResourceView(
        SsaoResources.ssaoBlurred,
        sceneColorTarget,
      ),
    },
    encoder: DeviceDrawCommandEncoder(device),
    frameScene: _FakeFrameScene(
      [for (final handle in items) _item(handle)],
      PostProcessState(affineWarpStrength: frameWarpStrength),
    ),
  );

  pass.execute(context);
  return device.float1Sequence('uAffineWarpStrength');
}

final class _AlwaysAvailableResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

void _expect(List<double> actual, List<double> expected, String what) {
  if (actual.length != expected.length) {
    throw StateError('$what: expected ${expected.length} values, got $actual');
  }
  for (var i = 0; i < expected.length; i++) {
    if (actual[i] != expected[i]) {
      throw StateError('$what: expected $expected, got $actual');
    }
  }
}

void _perDrawStrengthMultipliesFrameWeightByMaterialOptIn() {
  _expect(
    _warpStrengthsFor([_affineHandle, _plainHandle, _affineHandle], 1),
    [1, 0, 1],
    'two materials in one frame must resolve independently',
  );
}

void _zeroFrameWeightSuppressesEvenAnOptedInMaterial() {
  _expect(
    _warpStrengthsFor([_affineHandle, _affineHandle], 0),
    [0, 0],
    'affineSampling alone must not warp when the frame weight is 0',
  );
}

void _defaultMaterialsNeverWarpAtAnyFrameWeight() {
  _expect(
    _warpStrengthsFor([_plainHandle, _plainHandle], 1),
    [0, 0],
    'a default material must stay perspective-correct at full frame weight',
  );
}
