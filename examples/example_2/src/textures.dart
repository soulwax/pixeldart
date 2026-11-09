import 'dart:math' as math;
import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';

final class SurfaceMaps {
  final int size;
  final Uint8List albedo;
  final Uint8List heights;
  const SurfaceMaps(this.size, this.albedo, this.heights);

  Uint8List normals({double strength = 3.0}) =>
      ProceduralTextures.normalFromHeight(heights, width: size, height: size, strength: strength);
}

SurfaceMaps flagstones({int size = 256, int cells = 11, int seed = 7}) {
  final rng = math.Random(seed);
  final px = List.generate(cells, (_) => rng.nextDouble());
  final py = List.generate(cells, (_) => rng.nextDouble());
  final tint = List.generate(cells, (_) => 0.7 + rng.nextDouble() * 0.45);
  final grain = math.Random(seed + 1);

  final albedo = Uint8List(size * size * 4);
  final heights = Uint8List(size * size);
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      final u = x / size, v = y / size;
      var d1 = 9.0, d2 = 9.0;
      var nearest = 0;
      for (var i = 0; i < cells; i++) {
        // Test the 3×3 neighbouring tiles so cells wrap across the edges.
        for (var oy = -1; oy <= 1; oy++) {
          for (var ox = -1; ox <= 1; ox++) {
            final dx = u - (px[i] + ox), dy = v - (py[i] + oy);
            final d = math.sqrt(dx * dx + dy * dy);
            if (d < d1) {
              d2 = d1;
              d1 = d;
              nearest = i;
            } else if (d < d2) {
              d2 = d;
            }
          }
        }
      }
      final edge = d2 - d1;
      final noise = grain.nextDouble();
      final o = (y * size + x) * 4;
      if (edge < 0.018) {
        heights[y * size + x] = 20;
        albedo[o] = 22;
        albedo[o + 1] = 20;
        albedo[o + 2] = 24;
      } else {
        final bevel = (edge / 0.06).clamp(0.0, 1.0);
        heights[y * size + x] = (120 + bevel * 100 + noise * 25).round().clamp(0, 255);
        final t = tint[nearest] * (0.9 + noise * 0.12);
        albedo[o] = (118 * t).round().clamp(0, 255);
        albedo[o + 1] = (108 * t).round().clamp(0, 255);
        albedo[o + 2] = (104 * t).round().clamp(0, 255);
      }
      albedo[o + 3] = 255;
    }
  }
  return SurfaceMaps(size, albedo, heights);
}

SurfaceMaps bricks({int size = 128, int rows = 8, int cols = 4, int seed = 3}) {
  final rng = math.Random(seed);
  final tints = List.generate(rows * cols * 2, (_) => 0.75 + rng.nextDouble() * 0.4);
  final grain = math.Random(seed + 1);
  final albedo = Uint8List(size * size * 4);
  final heights = Uint8List(size * size);
  final rowH = size / rows, colW = size / cols;
  for (var y = 0; y < size; y++) {
    final row = (y / rowH).floor();
    final shift = row.isOdd ? colW / 2 : 0.0;
    for (var x = 0; x < size; x++) {
      final sx = (x + shift) % size;
      final col = (sx / colW).floor();
      final inX = sx - col * colW, inY = y - row * rowH;
      final mortar = inX < 2 || inY < 2;
      final o = (y * size + x) * 4;
      final n = grain.nextDouble();
      if (mortar) {
        heights[y * size + x] = 30;
        albedo[o] = 30;
        albedo[o + 1] = 26;
        albedo[o + 2] = 28;
      } else {
        heights[y * size + x] = (190 + n * 40).round();
        final t = tints[(row * cols + col) % tints.length] * (0.92 + n * 0.1);
        albedo[o] = (112 * t).round().clamp(0, 255);
        albedo[o + 1] = (70 * t).round().clamp(0, 255);
        albedo[o + 2] = (62 * t).round().clamp(0, 255);
      }
      albedo[o + 3] = 255;
    }
  }
  return SurfaceMaps(size, albedo, heights);
}
