import 'package:pixeldart/rendering/geometry/water_surface.dart';
import 'package:pixeldart/rendering/optics/gerstner_waves.dart';

void main() {
  _testGridConstruction();
  _testWaveUpdate();
  _testInvalidArguments();
  print('Water surface mesh tests passed.');
}

void _testGridConstruction() {
  const subX = 6;
  const subZ = 6;
  final water = WaterSurfaceMesh(
    width: 20.0,
    depth: 20.0,
    subdivisionsX: subX,
    subdivisionsZ: subZ,
    baseHeight: 0.5,
  );

  final expectedVerts = (subX + 1) * (subZ + 1);
  final expectedIndices = subX * subZ * 6;

  assert(water.vertexCount == expectedVerts);
  assert(water.mesh.vertexCount == expectedVerts);
  assert(water.mesh.indices?.length == expectedIndices);
  water.mesh.validate();
}

void _testWaveUpdate() {
  final water = WaterSurfaceMesh(
    width: 15.0,
    depth: 15.0,
    subdivisionsX: 8,
    subdivisionsZ: 8,
    baseHeight: 0.0,
  );

  final ocean = GerstnerWaveEvaluator.ocean();

  // Snapshot rest height of center vertex
  final initialY = water.mesh.vertices[1];

  // Update with waves at t = 2.0
  water.updateWaves(2.0, ocean);
  water.mesh.validate();

  // Ensure heights were displaced
  var anyDisplaced = false;
  final verts = water.mesh.vertices;
  for (var i = 0; i < water.vertexCount; i++) {
    final y = verts[i * 18 + 1];
    if ((y - initialY).abs() > 1e-3) {
      anyDisplaced = true;
      break;
    }
  }
  assert(anyDisplaced, 'ocean waves should displace surface vertices');

  // Verify normal unit length and upward orientation
  for (var i = 0; i < water.vertexCount; i++) {
    final nx = verts[i * 18 + 3];
    final ny = verts[i * 18 + 4];
    final nz = verts[i * 18 + 5];
    final len = (nx * nx + ny * ny + nz * nz);
    assert((len - 1.0).abs() < 1e-3);
    assert(ny > 0.0);
  }
}

void _testInvalidArguments() {
  var threw = false;
  try {
    WaterSurfaceMesh(width: 0);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'width <= 0 must throw');

  threw = false;
  try {
    WaterSurfaceMesh(subdivisionsX: 1);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'subdivisionsX < 2 must throw');
}
