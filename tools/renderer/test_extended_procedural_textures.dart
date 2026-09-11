import 'package:pixeldart/pixeldart.dart';

void main() {
  _testVoronoi();
  _testHexGrid();
  _testCarbonFiberOrm();
  _testMarble();
  _testDamascusSteelOrm();
  _testEnergyPlasma();
  print('Extended procedural textures tests passed.');
}

void _testVoronoi() {
  const width = 64;
  const height = 64;
  final tex = ProceduralTextures.voronoi(
    width: width,
    height: height,
    cellCount: 4,
    cellColor: const LinearColor(1, 1, 1),
    edgeColor: const LinearColor(0, 0, 0),
  );

  assert(tex.length == width * height * 4);

  var minVal = 255;
  var maxVal = 0;
  for (var i = 0; i < tex.length; i += 4) {
    final r = tex[i];
    final g = tex[i + 1];
    final b = tex[i + 2];
    final a = tex[i + 3];

    assert(a == 255, 'Alpha must be 255');
    assert(r == g && g == b, 'Grayscale cell/edge colors should match across channels');

    if (r < minVal) minVal = r;
    if (r > maxVal) maxVal = r;
  }

  assert(minVal < 100, 'Edges should have low values');
  assert(maxVal > 180, 'Cell centers should have high values');

  // Inverted mode
  final invTex = ProceduralTextures.voronoi(
    width: 32,
    height: 32,
    cellCount: 4,
    inverted: true,
  );
  assert(invTex.length == 32 * 32 * 4);
}

void _testHexGrid() {
  const width = 128;
  const height = 128;
  final tex = ProceduralTextures.hexGrid(
    width: width,
    height: height,
    hexRadius: 16.0,
    lineWidth: 2.0,
    lineColor: const LinearColor(1, 1, 1),
    fillColor: const LinearColor(0, 0, 0),
  );

  assert(tex.length == width * height * 4);

  var linePixels = 0;
  var fillPixels = 0;

  for (var i = 0; i < tex.length; i += 4) {
    final r = tex[i];
    final a = tex[i + 3];
    assert(a == 255);

    if (r > 200) {
      linePixels++;
    } else if (r < 50) {
      fillPixels++;
    }
  }

  assert(linePixels > 0, 'Must have hexagonal border line pixels');
  assert(fillPixels > 0, 'Must have hexagonal interior fill pixels');
  assert(fillPixels > linePixels, 'Hex interior area should exceed border line area');
}

void _testCarbonFiberOrm() {
  const width = 64;
  const height = 64;
  final orm = ProceduralTextures.carbonFiberOrm(
    width: width,
    height: height,
    cellSize: 4,
    baseRoughness: 0.25,
    metallic: 0.80,
  );

  assert(orm.length == width * height * 4);
  final expectedMet = (0.80 * 255.0).round();

  for (var i = 0; i < orm.length; i += 4) {
    final ao = orm[i];
    final rough = orm[i + 1];
    final met = orm[i + 2];
    final a = orm[i + 3];

    assert(a == 255);
    assert(met == expectedMet, 'Metallic channel must match configured metallic level');
    assert(ao >= 150 && ao <= 255, 'Ambient occlusion should be in [0.6, 1.0]');
    assert(rough >= 25 && rough <= 120, 'Roughness should vary around base roughness');
  }
}

void _testMarble() {
  const width = 64;
  const height = 64;
  final tex = ProceduralTextures.marble(
    width: width,
    height: height,
    scale: 3.0,
    turbulence: 4.0,
  );

  assert(tex.length == width * height * 4);
  var hasDarkVein = false;
  var hasBrightBase = false;

  for (var i = 0; i < tex.length; i += 4) {
    final r = tex[i];
    final a = tex[i + 3];
    assert(a == 255);
    if (r < 100) hasDarkVein = true;
    if (r > 200) hasBrightBase = true;
  }
  assert(hasDarkVein, 'Marble must contain mineral vein pixels');
  assert(hasBrightBase, 'Marble must contain bright base rock pixels');
}

void _testDamascusSteelOrm() {
  const width = 64;
  const height = 64;
  final orm = ProceduralTextures.damascusSteelOrm(
    width: width,
    height: height,
    baseRoughness: 0.2,
    metallic: 0.95,
  );

  assert(orm.length == width * height * 4);
  final expectedMet = (0.95 * 255.0).round();

  for (var i = 0; i < orm.length; i += 4) {
    final ao = orm[i];
    final rough = orm[i + 1];
    final met = orm[i + 2];
    final a = orm[i + 3];

    assert(a == 255);
    assert(met == expectedMet);
    assert(ao >= 200 && ao <= 255);
    assert(rough >= 20 && rough <= 100);
  }
}

void _testEnergyPlasma() {
  const width = 64;
  const height = 64;
  final plasma = ProceduralTextures.energyPlasma(
    width: width,
    height: height,
    time: 1.5,
  );

  assert(plasma.length == width * height * 4);
  var hasGlowingCore = false;
  for (var i = 0; i < plasma.length; i += 4) {
    final g = plasma[i + 1];
    final a = plasma[i + 3];
    assert(a == 255);
    if (g > 150) hasGlowingCore = true;
  }
  assert(hasGlowingCore, 'Energy plasma must have bright core emission');
}
