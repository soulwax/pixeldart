import 'dart:typed_data';

import 'package:pixeldart/rendering/assets/mesh_store.dart';
import 'package:pixeldart/rendering/passes/shadowed_world.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  _surfaceV2DescriptorsValidate();
  _surfaceV2RejectsInvalidTangentBases();
  _surfaceV2UploadsDedicatedTangentAndUv1Locations();
  _shadowedWorldConsumesAuthoredTangentContract();
  print('Renderer surface-v2 tangent fixtures passed.');
}

MeshData _surfaceMesh({
  VertexLayoutDescriptor layout = VertexLayoutDescriptor.surfaceV2,
  double tangentX = 1,
  double tangentY = 0,
  double tangentZ = 0,
  double handedness = 1,
}) {
  final values = Float32List(layout.strideFloats);
  values[3] = 0;
  values[4] = 1;
  values[5] = 0;
  values[6] = tangentX;
  values[7] = tangentY;
  values[8] = tangentZ;
  values[9] = handedness;
  values[10] = 1;
  values[11] = 1;
  values[12] = 1;
  values[13] = 1;
  values[14] = 1;
  values[15] = 0;
  values[16] = 0;
  return MeshData(
    layout: layout,
    vertices: values,
    localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
  );
}

void _surfaceV2DescriptorsValidate() {
  final plain = _surfaceMesh();
  plain.validate();
  final withUv1 = _surfaceMesh(layout: VertexLayoutDescriptor.surfaceV2WithUv1);
  withUv1.validate();
  require(
    VertexLayoutDescriptor.surfaceV2.strideFloats == 18 &&
        VertexLayoutDescriptor.surfaceV2WithUv1.strideFloats == 20,
    'surface-v2 descriptor strides drifted',
  );
}

void _surfaceV2RejectsInvalidTangentBases() {
  for (final invalid in [
    _surfaceMesh(tangentX: 0, tangentY: 1),
    _surfaceMesh(tangentX: double.nan),
    _surfaceMesh(handedness: 0),
  ]) {
    var rejected = false;
    try {
      invalid.validate();
    } catch (_) {
      rejected = true;
    }
    require(rejected, 'invalid surface-v2 tangent basis was accepted');
  }
}

void _surfaceV2UploadsDedicatedTangentAndUv1Locations() {
  final device = FakeGpuDevice();
  final store = MeshStore(device);
  store.upload(_surfaceMesh(layout: VertexLayoutDescriptor.surfaceV2WithUv1));
  final calls = device.drawLog
      .where((entry) => entry.startsWith('vertexAttribPointer'))
      .toList();
  require(
    calls.length == 7,
    'surface-v2 should bind seven attribute locations',
  );
  require(
    calls.any((entry) => entry.startsWith('vertexAttribPointer(5, 4')),
    'tangent4 must bind location 5',
  );
  require(
    calls.any((entry) => entry.startsWith('vertexAttribPointer(6, 2')),
    'UV1 must bind location 6',
  );
}

void _shadowedWorldConsumesAuthoredTangentContract() {
  final source = ShadowedWorldProgramSource.build(
    vertexSource: shadowedWorldVertSrc,
    fragmentSource: shadowedWorldFragSrc,
  );
  require(
    source.attributeLocations['aTangent'] == 5,
    'tangent location drifted',
  );
  require(source.attributeLocations['aUv1'] == 6, 'UV1 location drifted');
  require(
    source.vertexSource.contains('aTangent'),
    'vertex shader lost tangent input',
  );
  require(
    source.fragmentSource.contains('vTangent.w'),
    'fragment shader lost tangent handedness',
  );
}
