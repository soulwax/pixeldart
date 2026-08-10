import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/assets/material_store.dart';
import 'package:pixeldart/rendering/assets/mesh_store.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

const _bounds = Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1));
const _mesh = MeshHandle(10, 1, 'lod-mesh');
const _material = MaterialHandle(11, 1, 'lod-material');

void main() {
  _hysteresisIsDeterministicAndBounded();
  _invalidInputsAreRejected();
  _oneHundredTransitionsDoNotChangeOwnership();
  print('Renderer LOD selection fixtures passed.');
}

ModelPart _part({List<ModelLod>? lods}) => ModelPart(
  key: 'body',
  mesh: _mesh,
  material: _material,
  localBounds: _bounds,
  lods:
      lods ??
      const [
        ModelLod(key: 'near', minDistance: 0, maxDistance: 10),
        ModelLod(key: 'far', minDistance: 10, maxDistance: 30),
      ],
);

void _hysteresisIsDeterministicAndBounded() {
  final part = _part(
    lods: const [
      ModelLod(key: 'near', minDistance: 0, maxDistance: 10),
      ModelLod(key: 'far', minDistance: 12, maxDistance: 30),
    ],
  );
  final selector = const LodSelector(hysteresisDistance: 1);
  final near = selector.select(part, 9);
  require(
    near?.lod.key == 'near' && near?.index == 0,
    'near LOD was not selected',
  );
  require(
    selector.select(part, 10.5, previous: near)?.lod.key == 'near',
    'selection did not remain stable inside hysteresis band',
  );
  require(
    selector.select(part, 11.1, previous: near) == null,
    'a gap outside the hysteresis band must not select an implicit LOD',
  );
  final far = selector.select(part, 12);
  require(far?.lod.key == 'far' && far?.index == 1, 'far LOD was not selected');
  require(
    selector.select(part, 11.5, previous: far)?.lod.key == 'far',
    'far selection did not retain its lower hysteresis edge',
  );
  require(
    selector.select(part, 8.9, previous: far)?.lod.key == 'near',
    'selection did not switch after crossing the lower hysteresis edge',
  );
}

void _invalidInputsAreRejected() {
  final part = _part();
  for (final distance in <double>[-1, double.nan, double.infinity]) {
    var rejected = false;
    try {
      const LodSelector().select(part, distance);
    } catch (error) {
      if (error is! ArgumentError) rethrow;
      rejected = true;
    }
    require(rejected, 'invalid LOD distance was accepted: $distance');
  }

  var rejectedHysteresis = false;
  try {
    const LodSelector(hysteresisDistance: -0.01).select(part, 1);
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    rejectedHysteresis = true;
  }
  require(rejectedHysteresis, 'negative hysteresis was accepted');

  var rejectedInstance = false;
  try {
    InstanceLodSelector().select(InstanceId.invalid, part, 1);
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    rejectedInstance = true;
  }
  require(rejectedInstance, 'invalid instance identity was accepted');
}

void _oneHundredTransitionsDoNotChangeOwnership() {
  final device = FakeGpuDevice();
  final meshes = MeshStore(device);
  final materials = MaterialStore();
  final mesh = meshes.upload(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(
        VertexLayoutDescriptor.compatibility14.strideFloats * 3,
      ),
      localBounds: _bounds,
    ),
  );
  final material = materials.register(const MaterialDefinition(key: 'lod'));
  final part = ModelPart(
    key: 'body',
    mesh: mesh,
    material: material,
    localBounds: _bounds,
    lods: const [
      ModelLod(key: 'near', minDistance: 0, maxDistance: 10),
      ModelLod(key: 'far', minDistance: 10, maxDistance: 30),
    ],
  );
  final model = ModelDefinition(
    key: 'lod-model',
    parts: [part],
    combinedBounds: _bounds,
  );
  model.validate();

  final selector = InstanceLodSelector(
    selector: const LodSelector(hysteresisDistance: 1),
  );
  final first = const InstanceId(100, 1, 'first');
  final second = const InstanceId(101, 1, 'second');
  require(
    selector.select(first, part, 0)?.lod.key == 'near',
    'first instance did not start at near LOD',
  );
  require(
    selector.select(second, part, 12)?.lod.key == 'far',
    'second instance did not start at far LOD',
  );

  final initialLiveObjects = device.liveObjectCount;
  final initialMeshCount = meshes.liveCount;
  final initialMaterialCount = materials.liveCount;
  final initialBufferCreates = device.bufferCreateCalls;
  final initialVaoCreates = device.vaoCreateCalls;
  var transitions = 0;
  String? previousKey = 'near';

  for (var frame = 0; frame < 100; frame++) {
    final distance = frame.isEven
        ? 11.5 // crosses outward: near -> far
        : 8.5; // crosses inward: far -> near
    final selected = selector.select(first, part, distance);
    final key = selected?.lod.key;
    require(
      key != null,
      'authored LOD disappeared during soak at frame $frame',
    );
    if (key != previousKey) transitions++;
    previousKey = key;

    // A second instance has independent state: its far selection remains far
    // at 11.5 even while the first instance repeatedly changes LOD.
    require(
      selector.select(second, part, 11.5)?.lod.key == 'far',
      'per-instance hysteresis state leaked between instances at frame $frame',
    );
    require(
      device.liveObjectCount == initialLiveObjects &&
          meshes.liveCount == initialMeshCount &&
          materials.liveCount == initialMaterialCount &&
          device.bufferCreateCalls == initialBufferCreates &&
          device.vaoCreateCalls == initialVaoCreates,
      'LOD transition changed retained resource or GPU ownership at frame $frame',
    );
  }

  require(
    transitions == 100,
    'expected 100 deterministic transitions, got $transitions',
  );
  require(
    selector.trackedInstanceCount == 2 && selector.trackedSelectionCount == 2,
    'LOD state did not remain owned by exactly two instances',
  );
  selector.remove(first);
  require(
    selector.trackedInstanceCount == 1 && selector.trackedSelectionCount == 1,
    'removing one instance did not release only its presentation state',
  );
  selector.clear();
  require(
    selector.trackedInstanceCount == 0 && selector.trackedSelectionCount == 0,
    'clearing LOD state did not empty the presentation map',
  );

  meshes.release(mesh);
  materials.release(material);
  require(
    device.liveObjectCount == 0,
    'test resources were not released at teardown',
  );
}
