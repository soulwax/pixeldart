import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/assets/material_store.dart';
import 'package:pixeldart/rendering/assets/mesh_store.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

const _light = SpotLight(
  id: 7,
  position: Vec3.zero,
  direction: Vec3(0, -1, 0),
  color: LinearColor.white,
  range: 32,
);

void main() {
  _boundariesAndHysteresis();
  _lightSpaceDistanceIsUsed();
  _invalidInputsAreRejected();
  _oneHundredFrameOwnershipSoak();
  print('Renderer shadow-caster LOD fixtures passed.');
}

void _boundariesAndHysteresis() {
  const policy = ShadowCasterLodPolicy(
    fullToReduced: 8,
    reducedToCulled: 20,
    hysteresisDistance: 1,
  );
  require(
    policy.select(7.9) == ShadowCasterLod.full,
    'near caster did not select full detail',
  );
  require(
    policy.select(8.5, previous: ShadowCasterLod.full) == ShadowCasterLod.full,
    'full detail did not retain its upper hysteresis edge',
  );
  require(
    policy.select(9.1, previous: ShadowCasterLod.full) ==
        ShadowCasterLod.reduced,
    'full detail did not switch after its hysteresis edge',
  );
  require(
    policy.select(20.5, previous: ShadowCasterLod.reduced) ==
        ShadowCasterLod.reduced,
    'reduced detail did not retain its upper hysteresis edge',
  );
  require(
    policy.select(21.1, previous: ShadowCasterLod.reduced) ==
        ShadowCasterLod.culled,
    'reduced detail did not switch to culling',
  );
  require(
    policy.select(19.1, previous: ShadowCasterLod.culled) ==
        ShadowCasterLod.culled,
    'culled detail did not retain its lower hysteresis edge',
  );
  require(
    policy.select(18.8, previous: ShadowCasterLod.culled) ==
        ShadowCasterLod.reduced,
    'culled detail did not switch back after its hysteresis edge',
  );
}

void _lightSpaceDistanceIsUsed() {
  const policy = ShadowCasterLodPolicy(
    fullToReduced: 8,
    reducedToCulled: 20,
    hysteresisDistance: 1,
  );
  require(
    policy.selectForLight(_light, const Vec3(0, 0, 6)) == ShadowCasterLod.full,
    'light-space distance did not select full detail',
  );
  require(
    policy.selectForLight(_light, const Vec3(0, 0, 12)) ==
        ShadowCasterLod.reduced,
    'light-space distance did not select reduced detail',
  );
  require(
    policy.selectForLight(_light, const Vec3(0, 0, 24)) ==
        ShadowCasterLod.culled,
    'light-space distance did not select culling',
  );
}

void _invalidInputsAreRejected() {
  for (final policy in <ShadowCasterLodPolicy>[
    const ShadowCasterLodPolicy(fullToReduced: 0),
    const ShadowCasterLodPolicy(fullToReduced: 8, reducedToCulled: 8),
    const ShadowCasterLodPolicy(hysteresisDistance: -1),
  ]) {
    var rejected = false;
    try {
      policy.select(1);
    } catch (error) {
      if (error is! ArgumentError) rethrow;
      rejected = true;
    }
    require(rejected, 'invalid shadow-caster policy was accepted');
  }
  for (final distance in <double>[-1, double.nan, double.infinity]) {
    var rejected = false;
    try {
      const ShadowCasterLodPolicy().select(distance);
    } catch (error) {
      if (error is! ArgumentError) rethrow;
      rejected = true;
    }
    require(rejected, 'invalid caster distance was accepted: $distance');
  }
  var rejectedInstance = false;
  try {
    InstanceShadowCasterLodSelector().select(
      InstanceId.invalid,
      _light,
      Vec3.zero,
    );
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    rejectedInstance = true;
  }
  require(rejectedInstance, 'invalid shadow-caster instance was accepted');
  var rejectedCenter = false;
  try {
    const ShadowCasterLodPolicy().selectForLight(
      _light,
      Vec3(double.nan, 0, 0),
    );
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    rejectedCenter = true;
  }
  require(rejectedCenter, 'non-finite caster center was accepted');
}

void _oneHundredFrameOwnershipSoak() {
  final device = FakeGpuDevice();
  final meshes = MeshStore(device);
  final materials = MaterialStore();
  final mesh = meshes.upload(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(
        VertexLayoutDescriptor.compatibility14.strideFloats * 3,
      ),
      localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
    ),
  );
  final material = materials.register(const MaterialDefinition(key: 'caster'));
  final selector = InstanceShadowCasterLodSelector(
    policy: const ShadowCasterLodPolicy(
      fullToReduced: 8,
      reducedToCulled: 20,
      hysteresisDistance: 1,
    ),
  );
  final first = const InstanceId(100, 1, 'first-caster');
  final second = const InstanceId(101, 1, 'second-caster');
  final initialLiveObjects = device.liveObjectCount;
  final initialMeshCount = meshes.liveCount;
  final initialMaterialCount = materials.liveCount;
  final initialBufferCreates = device.bufferCreateCalls;
  final initialVaoCreates = device.vaoCreateCalls;
  var firstTransitions = 0;
  ShadowCasterLod? previousFirst;
  for (var frame = 0; frame < 100; frame++) {
    final firstDistance = frame.isEven ? 6.5 : 9.5;
    final secondDistance = frame.isEven ? 18.5 : 21.5;
    final firstLod = selector.select(first, _light, Vec3(firstDistance, 0, 0));
    final secondLod = selector.select(
      second,
      _light,
      Vec3(secondDistance, 0, 0),
    );
    final expectedFirst = frame.isEven
        ? ShadowCasterLod.full
        : ShadowCasterLod.reduced;
    final expectedSecond = frame.isEven
        ? ShadowCasterLod.reduced
        : ShadowCasterLod.culled;
    require(
      firstLod == expectedFirst,
      'first caster LOD was nondeterministic at frame $frame: $firstLod',
    );
    require(
      secondLod == expectedSecond,
      'second caster LOD leaked state at frame $frame: $secondLod',
    );
    if (previousFirst != null && previousFirst != firstLod) {
      firstTransitions++;
    }
    previousFirst = firstLod;
    require(
      device.liveObjectCount == initialLiveObjects &&
          meshes.liveCount == initialMeshCount &&
          materials.liveCount == initialMaterialCount &&
          device.bufferCreateCalls == initialBufferCreates &&
          device.vaoCreateCalls == initialVaoCreates,
      'shadow-caster LOD changed retained ownership at frame $frame',
    );
  }
  require(
    firstTransitions == 99,
    'expected one deterministic first-caster transition per boundary, got $firstTransitions',
  );
  require(
    selector.trackedInstanceCount == 2,
    'shadow-caster state did not remain owned by exactly two instances',
  );
  selector.remove(first);
  require(
    selector.trackedInstanceCount == 1,
    'removing one caster did not release only its presentation state',
  );
  selector.clear();
  require(
    selector.trackedInstanceCount == 0,
    'clearing caster state did not empty the presentation map',
  );
  meshes.release(mesh);
  materials.release(material);
  require(device.liveObjectCount == 0, 'test resources leaked at teardown');
}
