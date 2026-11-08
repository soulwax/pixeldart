import 'dart:typed_data';
import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/geometry/procedural_textures.dart';

void main() {
  _testCheckerboard();
  _testGrid();
  _testNoise();
  _testNormalFromHeight();
  _testBrushedMetalOrm();
  _testRadialParticle();
  _testSparkStreak();
  print('Procedural textures tests passed.');
}

void _testCheckerboard() {
  final tex = ProceduralTextures.checkerboard(
    width: 64,
    height: 64,
    checkSize: 16,
    colorA: const LinearColor(1, 0, 0),
    colorB: const LinearColor(0, 1, 0),
  );
  assert(tex.length == 64 * 64 * 4);

  // Pixel (0, 0) should be check (0, 0) -> isA (colorA: Red)
  assert(tex[0] == 255 && tex[1] == 0 && tex[2] == 0 && tex[3] == 255);

  // Pixel (16, 0) should be check (1, 0) -> isB (colorB: Green)
  final idx16 = (0 * 64 + 16) * 4;
  assert(tex[idx16] == 0 && tex[idx16 + 1] == 255 && tex[idx16 + 2] == 0 && tex[idx16 + 3] == 255);

  // Pixel (16, 16) should be check (1, 1) -> isA (colorA: Red)
  final idx16_16 = (16 * 64 + 16) * 4;
  assert(tex[idx16_16] == 255 && tex[idx16_16 + 1] == 0 && tex[idx16_16 + 2] == 0);
}

void _testGrid() {
  final tex = ProceduralTextures.grid(
    width: 32,
    height: 32,
    cellSize: 8,
    lineWidth: 1,
    lineColor: const LinearColor(1, 1, 1),
    cellColor: const LinearColor(0, 0, 0),
  );
  assert(tex.length == 32 * 32 * 4);

  // Line at x=0
  assert(tex[0] == 255 && tex[1] == 255 && tex[2] == 255);

  // Cell interior at x=2, y=2
  final cellIdx = (2 * 32 + 2) * 4;
  assert(tex[cellIdx] == 0 && tex[cellIdx + 1] == 0 && tex[cellIdx + 2] == 0);
}

void _testNoise() {
  final tex = ProceduralTextures.noise(width: 32, height: 32, octaves: 2);
  assert(tex.length == 32 * 32 * 4);

  var hasVariation = false;
  final first = tex[0];
  for (var i = 0; i < tex.length; i += 4) {
    assert(tex[i + 3] == 255); // Alpha is 255
    if (tex[i] != first) hasVariation = true;
  }
  assert(hasVariation, 'Noise should have spatial variation');
}

void _testNormalFromHeight() {
  final heights = Uint8List(32 * 32);
  // Create a slope in X
  for (var y = 0; y < 32; y++) {
    for (var x = 0; x < 32; x++) {
      heights[y * 32 + x] = (x * 8).clamp(0, 255);
    }
  }

  final normalMap = ProceduralTextures.normalFromHeight(heights, width: 32, height: 32);
  assert(normalMap.length == 32 * 32 * 4);

  // Check center pixel normal
  final idx = (16 * 32 + 16) * 4;
  final r = normalMap[idx];
  final g = normalMap[idx + 1];
  final b = normalMap[idx + 2];
  final a = normalMap[idx + 3];

  assert(a == 255);
  // Since slope is increasing to the right (+X), normal points to the left (-X), so r < 128
  assert(r < 128, 'Normal X should point left for rising slope');
  assert(g == 128, 'Normal Y is flat across horizontal slope');
  assert(b > 128, 'Normal Z should point outwards (> 0.5)');
}

void _testBrushedMetalOrm() {
  final orm = ProceduralTextures.brushedMetalOrm(
    width: 32,
    height: 32,
    baseRoughness: 0.3,
    metallic: 0.9,
    horizontal: true,
  );
  assert(orm.length == 32 * 32 * 4);

  for (var i = 0; i < orm.length; i += 4) {
    // R = Occlusion (255)
    assert(orm[i] == 255);
    // G = Roughness in reasonable range around 0.3
    assert(orm[i + 1] > 20 && orm[i + 1] < 200);
    // B = Metallic (0.9 * 255 = 230)
    assert(orm[i + 2] == 230);
    // A = 255
    assert(orm[i + 3] == 255);
  }
}

void _testRadialParticle() {
  final tex = ProceduralTextures.radialParticle(
    width: 64,
    height: 64,
    innerRadius: 0.2,
    falloffExponent: 2.0,
    centerColor: const LinearColor(1, 1, 1),
    edgeColor: const LinearColor(1, 0, 0),
  );
  assert(tex.length == 64 * 64 * 4);

  // Center pixel (32, 32) should be inner radius -> alpha 255 and center color (white)
  final centerIdx = (32 * 64 + 32) * 4;
  assert(tex[centerIdx] == 255);
  assert(tex[centerIdx + 1] == 255);
  assert(tex[centerIdx + 2] == 255);
  assert(tex[centerIdx + 3] == 255, 'Center alpha should be 255');

  // Corner pixel (0, 0) is outside unit circle -> alpha 0
  assert(tex[3] == 0, 'Corner alpha should be 0');

  // Mid-radius pixel should have intermediate alpha
  final midIdx = (32 * 64 + 48) * 4; // dist = 16 / 32 = 0.5
  assert(tex[midIdx + 3] > 0 && tex[midIdx + 3] < 255, 'Intermediate radius should have partial alpha');
}

void _testSparkStreak() {
  final tex = ProceduralTextures.sparkStreak(
    width: 32,
    height: 64,
  );
  assert(tex.length == 32 * 64 * 4);

  // Head at y=0, center x=16 should be hot and bright
  final headIdx = (0 * 32 + 16) * 4;
  assert(tex[headIdx + 3] > 200, 'Head alpha should be high');

  // Tail at y=63, center x=16 should have decayed alpha
  final tailIdx = (63 * 32 + 16) * 4;
  assert(tex[tailIdx + 3] < tex[headIdx + 3], 'Tail alpha should be lower than head');

  // Far lateral edge should be zero alpha
  final edgeIdx = (32 * 32 + 0) * 4;
  assert(tex[edgeIdx + 3] == 0, 'Lateral edge should have zero alpha');
}
