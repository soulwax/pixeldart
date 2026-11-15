import 'package:pixeldart/rendering/api/frame.dart';
import 'package:pixeldart/rendering/api/handles.dart';
import 'package:pixeldart/rendering/api/materials.dart';
import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/math/mat4.dart';
import 'package:pixeldart/rendering/math/transform.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/passes/decal.dart';
import 'package:pixeldart/rendering/passes/pass_context_impl.dart';
import 'package:pixeldart/rendering/passes/safe_graph_resources.dart';
import 'package:pixeldart/rendering/passes/world.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';
import 'package:pixeldart/rendering/webgl/state_cache.dart';

import 'fake_gpu_device.dart';

void main() {
  _testStencilStateDescriptor();
  _testTargetStencilDescriptor();
  _testDecalFeatureAndPass();
  print('WebGL stencil and decal fixtures passed.');
}

void _testStencilStateDescriptor() {
  const defaultState = DrawStateDescriptor();
  assert(!defaultState.stencilEnable);
  assert(defaultState.stencilFunc == StencilFunc.always);
  assert(defaultState.stencilRef == 0);
  assert(defaultState.stencilMask == 0xFF);
  assert(defaultState.stencilFail == StencilOp.keep);
  assert(defaultState.stencilZFail == StencilOp.keep);
  assert(defaultState.stencilZPass == StencilOp.keep);
  assert(defaultState.stencilWriteMask == 0xFF);

  final configured = defaultState.withStencil(
    enable: true,
    func: StencilFunc.equal,
    ref: 1,
    mask: 0x0F,
    fail: StencilOp.zero,
    zFail: StencilOp.replace,
    zPass: StencilOp.increment,
    writeMask: 0x0F,
  );

  assert(configured.stencilEnable);
  assert(configured.stencilFunc == StencilFunc.equal);
  assert(configured.stencilRef == 1);
  assert(configured.stencilMask == 0x0F);
  assert(configured.stencilFail == StencilOp.zero);
  assert(configured.stencilZFail == StencilOp.replace);
  assert(configured.stencilZPass == StencilOp.increment);
  assert(configured.stencilWriteMask == 0x0F);

  // WebGlStateCache diff check
  final cache = WebGlStateCache();
  final diff = cache.diff(configured);
  assert(diff.contains(StateField.stencilEnable));
  assert(diff.contains(StateField.stencilFunc));
  assert(diff.contains(StateField.stencilOp));
  assert(diff.contains(StateField.stencilMask));

  cache.markApplied(configured);
  final sameDiff = cache.diff(configured);
  assert(sameDiff.isEmpty);
}

void _testTargetStencilDescriptor() {
  const desc = GpuTargetDescriptor(
    width: 640,
    height: 480,
    hasDepth: true,
    hasStencil: true,
  );
  assert(desc.hasDepth);
  assert(desc.hasStencil);

  const clearMask1 = ClearMask.colorDepthStencil;
  const clearMask2 = ClearMask.stencilOnly;
  assert(clearMask1 != clearMask2);
}

final class _DummyFrameScene implements FrameSceneData {
  @override
  Object get camera => CameraView(
    view: Mat4.identity(),
    projection: Mat4.identity(),
    viewProjection: Mat4.identity(),
    eye: Vec3.zero,
    forward: const Vec3(0, 0, -1),
    near: 0.1,
    far: 100,
    aspect: 1,
  );

  @override
  Iterable<Object> get opaqueBatches => const [];

  @override
  Iterable<Object> get blendedItemsBackToFront => const [];

  @override
  Object get environment => Object();

  @override
  Object get post => Object();

  @override
  double get timeSeconds => 0.0;
}

final class _AlwaysAvailableResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

void _testDecalFeatureAndPass() {
  final device = FakeGpuDevice();
  final lib = ProgramLibrary(device);

  final dummyVao = device.createVertexArray();
  final dummyTex = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );

  final decal = DecalDescriptor(
    mesh: const MeshHandle(1, 1),
    material: const MaterialHandle(1, 1),
    transform: Transform.at(const Vec3(0, 0, 0)),
    opacity: 0.8,
    stencilFunc: StencilFunc.equal,
    stencilRef: 2,
  );

  final feature = DecalFeature(
    programLibrary: lib,
    device: device,
    resolveMesh: (_) =>
        ResolvedMesh(vao: dummyVao, isIndexed: false, drawCount: 6),
    resolveMaterial: (_) => const MaterialDefinition(key: 'decal_mat'),
    resolveAlbedo: (_) => dummyTex,
    resolveCamera: () => CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: Vec3.zero,
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 1,
    ),
    resolveDecals: () => [decal],
  );

  final passes = feature.createPasses(_AlwaysAvailableResources());
  assert(passes.length == 1);
  final pass = passes.first;

  final colorTarget = device.createTarget(
    const GpuTargetDescriptor(width: 64, height: 64),
  );

  final context = BoundPassContext(
    views: {
      SafeGraphResources.sceneColor.name: BoundResourceView(
        SafeGraphResources.sceneColor,
        colorTarget,
      ),
    },
    encoder: DeviceDrawCommandEncoder(device),
    frameScene: _DummyFrameScene(),
  );

  pass.execute(context);
  assert(device.lastAppliedDrawState != null);
  assert(device.lastAppliedDrawState!.stencilEnable == true);
  assert(device.lastAppliedDrawState!.stencilRef == 2);
  assert(device.lastAppliedDrawState!.stencilFunc == StencilFunc.equal);
  assert(device.drawLog.any((entry) => entry.contains('drawArrays(0, 6)')));
}
