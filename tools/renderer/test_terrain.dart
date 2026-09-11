import 'package:pixeldart/rendering/geometry/terrain.dart';

void main() {
  _testTerrainNoise();
  _testTerrainHeightAndNormals();
  _testTerrainMeshGeneration();
  _testBiomeTexture();
  _testInvalidArguments();
  print('Terrain procedural geometry tests passed.');
}

void _testTerrainNoise() {
  final noise1 = TerrainNoise(seed: 1234);
  final noise2 = TerrainNoise(seed: 1234);

  // Determinism
  for (var x = 0.0; x < 5.0; x += 1.0) {
    for (var y = 0.0; y < 5.0; y += 1.0) {
      assert(noise1.eval2D(x, y) == noise2.eval2D(x, y));
      final val = noise1.eval2D(x, y);
      assert(val >= -1.0 && val <= 1.0);

      final f = noise1.fbm(x, y);
      assert(f >= 0.0 && f <= 1.0);

      final r = noise1.ridged(x, y);
      assert(r >= 0.0 && r <= 1.0);
    }
  }
}

void _testTerrainHeightAndNormals() {
  final terrain = TerrainGenerator(
    width: 20.0,
    depth: 20.0,
    islandRadius: 8.0,
    baseHeight: -0.5,
    maxHeight: 4.0,
  );

  // Outer bounds beyond islandRadius should taper to baseHeight
  final outerH = terrain.sampleHeight(9.5, 9.5);
  assert((outerH - -0.5).abs() < 1e-4);

  // Interior should be >= baseHeight
  final centerH = terrain.sampleHeight(0.0, 0.0);
  assert(centerH >= -0.5);

  // Surface normal tests
  for (var x = -8.0; x <= 8.0; x += 4.0) {
    for (var z = -8.0; z <= 8.0; z += 4.0) {
      final n = terrain.sampleNormal(x, z);
      assert((n.length - 1.0).abs() < 1e-4);
      assert(n.y > 0.0, 'terrain normal should point generally upward');

      final slope = terrain.sampleSlope(x, z);
      assert(slope >= 0.0 && slope <= 1.6);
    }
  }
}

void _testTerrainMeshGeneration() {
  const subX = 8;
  const subZ = 8;
  final terrain = TerrainGenerator(
    width: 16.0,
    depth: 16.0,
    subdivisionsX: subX,
    subdivisionsZ: subZ,
  );

  final mesh = terrain.generateMesh();
  mesh.validate();

  final expectedVertices = (subX + 1) * (subZ + 1);
  final expectedIndices = subX * subZ * 6;

  assert(mesh.vertexCount == expectedVertices);
  assert(mesh.indices?.length == expectedIndices);
  assert(mesh.localBounds.min.x <= -7.9);
  assert(mesh.localBounds.max.x >= 7.9);
  assert(mesh.localBounds.min.y >= -1.0);
}

void _testBiomeTexture() {
  final terrain = TerrainGenerator(width: 10, depth: 10);
  final tex = terrain.generateBiomeTexture(width: 16, height: 16);

  assert(tex.length == 16 * 16 * 4);
  for (var i = 3; i < tex.length; i += 4) {
    assert(tex[i] == 255, 'alpha must be 255');
  }
}

void _testInvalidArguments() {
  var threw = false;
  try {
    TerrainGenerator(width: 0);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'width <= 0 must throw');

  threw = false;
  try {
    TerrainGenerator(subdivisionsX: 1);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'subdivisionsX < 2 must throw');
}
