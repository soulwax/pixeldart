import 'package:pixeldart/rendering/geometry/water_surface.dart';
import 'package:pixeldart/rendering/optics/gerstner_waves.dart';

void main() {
  _testGridConstruction();
  _testWaveUpdate();
  _testMatchesEvaluator();
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

    // Verify foam vertex colors are populated and valid
    final cr = verts[i * 18 + 10];
    final cg = verts[i * 18 + 11];
    final cb = verts[i * 18 + 12];
    // Vertex data is Float32: 0.35 reads back as 0.3499999940.
    const eps = 1e-6;
    assert(cr >= 0.35 - eps && cr <= 1.0 + eps);
    assert(cg >= 0.65 - eps && cg <= 1.0 + eps);
    assert(cb >= 0.90 - eps && cb <= 1.0 + eps);
  }
}

void _testMatchesEvaluator() {
  final ocean = GerstnerWaveEvaluator.ocean();
  for (final (size, subdivisions) in [(30.0, 12), (520.0, 112)]) {
    for (final time in [0.0, 1.7, 42.3, 900.5]) {
      final water = WaterSurfaceMesh(
        width: size,
        depth: size * 0.8,
        subdivisionsX: subdivisions,
        subdivisionsZ: subdivisions - 2,
        baseHeight: 0.25,
      );
      final verts = water.mesh.vertices;
      final rest = [
        for (var v = 0; v < water.vertexCount; v++) (verts[v * 18], verts[v * 18 + 2]),
      ];
      water.updateWaves(time, ocean);
      for (var v = 0; v < water.vertexCount; v++) {
        final (rx, rz) = rest[v];
        final d = ocean.sampleDisplacement(rx, rz, time);
        final n = ocean.sampleNormal(rx, rz, time);
        final i = v * 18;
        final at = 'vertex $v, size $size, t=$time';
        assert((verts[i] - (rx + d.x)).abs() < 1e-3, 'x at $at');
        assert((verts[i + 1] - (0.25 + d.y)).abs() < 1e-3, 'y at $at');
        assert((verts[i + 2] - (rz + d.z)).abs() < 1e-3, 'z at $at');
        assert((verts[i + 3] - n.x).abs() < 1e-3, 'nx at $at');
        assert((verts[i + 4] - n.y).abs() < 1e-3, 'ny at $at');
        assert((verts[i + 5] - n.z).abs() < 1e-3, 'nz at $at');
      }
    }
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
