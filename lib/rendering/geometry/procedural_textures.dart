import 'dart:math' as math;
import 'dart:typed_data';

import '../api/lights.dart';
import '../math/vec.dart';

/// Pure-Dart generator for procedural PBR textures and normal maps.
///
/// Produces raw RGBA8 [Uint8List] pixel buffers directly usable with
/// GPU texture registration without third-party asset loading.
abstract final class ProceduralTextures {
  /// Generates a standard alternating checkerboard pattern.
  static Uint8List checkerboard({
    int width = 256,
    int height = 256,
    int checkSize = 32,
    LinearColor colorA = const LinearColor(0.9, 0.9, 0.9),
    LinearColor colorB = const LinearColor(0.12, 0.12, 0.14),
  }) {
    final buffer = Uint8List(width * height * 4);
    final rA = (colorA.r.clamp(0.0, 1.0) * 255.0).round();
    final gA = (colorA.g.clamp(0.0, 1.0) * 255.0).round();
    final bA = (colorA.b.clamp(0.0, 1.0) * 255.0).round();
    const aA = 255;

    final rB = (colorB.r.clamp(0.0, 1.0) * 255.0).round();
    final gB = (colorB.g.clamp(0.0, 1.0) * 255.0).round();
    final bB = (colorB.b.clamp(0.0, 1.0) * 255.0).round();
    const aB = 255;

    var offset = 0;
    for (var y = 0; y < height; y++) {
      final checkY = (y ~/ checkSize) % 2;
      for (var x = 0; x < width; x++) {
        final checkX = (x ~/ checkSize) % 2;
        final isA = (checkX ^ checkY) == 0;
        buffer[offset] = isA ? rA : rB;
        buffer[offset + 1] = isA ? gA : gB;
        buffer[offset + 2] = isA ? bA : bB;
        buffer[offset + 3] = isA ? aA : aB;
        offset += 4;
      }
    }
    return buffer;
  }

  /// Generates an architectural grid pattern with line borders and cells.
  static Uint8List grid({
    int width = 256,
    int height = 256,
    int cellSize = 32,
    int lineWidth = 2,
    LinearColor lineColor = const LinearColor(0.25, 0.55, 1.0),
    LinearColor cellColor = const LinearColor(0.06, 0.08, 0.11),
  }) {
    final buffer = Uint8List(width * height * 4);
    final rL = (lineColor.r.clamp(0.0, 1.0) * 255.0).round();
    final gL = (lineColor.g.clamp(0.0, 1.0) * 255.0).round();
    final bL = (lineColor.b.clamp(0.0, 1.0) * 255.0).round();
    const aL = 255;

    final rC = (cellColor.r.clamp(0.0, 1.0) * 255.0).round();
    final gC = (cellColor.g.clamp(0.0, 1.0) * 255.0).round();
    final bC = (cellColor.b.clamp(0.0, 1.0) * 255.0).round();
    const aC = 255;

    var offset = 0;
    for (var y = 0; y < height; y++) {
      final isLineY = (y % cellSize) < lineWidth;
      for (var x = 0; x < width; x++) {
        final isLine = isLineY || ((x % cellSize) < lineWidth);
        buffer[offset] = isLine ? rL : rC;
        buffer[offset + 1] = isLine ? gL : gC;
        buffer[offset + 2] = isLine ? bL : bC;
        buffer[offset + 3] = isLine ? aL : aC;
        offset += 4;
      }
    }
    return buffer;
  }

  /// Generates multi-octave coherent Value/Perlin-style 2D noise in [0, 255].
  static Uint8List noise({
    int width = 256,
    int height = 256,
    double frequency = 4.0,
    int octaves = 4,
    double persistence = 0.5,
  }) {
    final buffer = Uint8List(width * height * 4);
    final rawNoise = Float32List(width * height);
    var maxVal = 0.0;
    var minVal = double.infinity;

    for (var y = 0; y < height; y++) {
      final ny = y / height;
      for (var x = 0; x < width; x++) {
        final nx = x / width;
        var sum = 0.0;
        var amp = 1.0;
        var freq = frequency;
        var ampSum = 0.0;

        for (var o = 0; o < octaves; o++) {
          sum += _sample2d(nx * freq, ny * freq) * amp;
          ampSum += amp;
          amp *= persistence;
          freq *= 2.0;
        }

        final val = sum / ampSum;
        rawNoise[y * width + x] = val;
        if (val > maxVal) maxVal = val;
        if (val < minVal) minVal = val;
      }
    }

    final range = (maxVal - minVal) > 1e-6 ? maxVal - minVal : 1.0;
    var offset = 0;
    for (var i = 0; i < rawNoise.length; i++) {
      final norm = ((rawNoise[i] - minVal) / range).clamp(0.0, 1.0);
      final byte = (norm * 255.0).round();
      buffer[offset] = byte;
      buffer[offset + 1] = byte;
      buffer[offset + 2] = byte;
      buffer[offset + 3] = 255;
      offset += 4;
    }
    return buffer;
  }

  /// Derives a tangent-space normal map from a grayscale height buffer using a 3x3 Sobel filter.
  static Uint8List normalFromHeight(
    Uint8List heights, {
    required int width,
    required int height,
    double strength = 2.0,
  }) {
    final buffer = Uint8List(width * height * 4);

    double h(int x, int y) {
      final cx = (x + width) % width;
      final cy = (y + height) % height;
      return heights[cy * width + cx] / 255.0;
    }

    var offset = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        // Sobel X kernel:
        // [-1  0  1]
        // [-2  0  2]
        // [-1  0  1]
        final dx =
            (h(x + 1, y - 1) + 2.0 * h(x + 1, y) + h(x + 1, y + 1)) -
            (h(x - 1, y - 1) + 2.0 * h(x - 1, y) + h(x - 1, y + 1));

        // Sobel Y kernel:
        // [-1 -2 -1]
        // [ 0  0  0]
        // [ 1  2  1]
        final dy =
            (h(x - 1, y + 1) + 2.0 * h(x, y + 1) + h(x + 1, y + 1)) -
            (h(x - 1, y - 1) + 2.0 * h(x, y - 1) + h(x + 1, y - 1));

        final n = Vec3(-dx * strength, -dy * strength, 1.0).normalized;
        buffer[offset] = ((n.x * 0.5 + 0.5) * 255.0).round().clamp(0, 255);
        buffer[offset + 1] = ((n.y * 0.5 + 0.5) * 255.0).round().clamp(0, 255);
        buffer[offset + 2] = ((n.z * 0.5 + 0.5) * 255.0).round().clamp(0, 255);
        buffer[offset + 3] = 255;
        offset += 4;
      }
    }
    return buffer;
  }

  /// Generates a packed PBR ORM map (R: Occlusion, G: Roughness, B: Metallic).
  static Uint8List brushedMetalOrm({
    int width = 256,
    int height = 256,
    double baseRoughness = 0.25,
    double metallic = 0.95,
    double scratchStrength = 0.18,
    bool horizontal = true,
  }) {
    final buffer = Uint8List(width * height * 4);
    final rng = math.Random(1337);
    final streaks = Float32List(horizontal ? height : width);
    for (var i = 0; i < streaks.length; i++) {
      streaks[i] = (rng.nextDouble() * 2.0 - 1.0) * scratchStrength;
    }

    final metByte = (metallic.clamp(0.0, 1.0) * 255.0).round();
    var offset = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        final streakIndex = horizontal ? y : x;
        final localRough = (baseRoughness + streaks[streakIndex]).clamp(0.04, 1.0);

        // R = Ambient Occlusion (1.0 = fully unoccluded)
        buffer[offset] = 255;
        // G = Roughness
        buffer[offset + 1] = (localRough * 255.0).round();
        // B = Metallic
        buffer[offset + 2] = metByte;
        // A = 255
        buffer[offset + 3] = 255;
        offset += 4;
      }
    }
    return buffer;
  }

  static double _sample2d(double x, double y) {
    final ix = x.floor();
    final iy = y.floor();
    final fx = x - ix;
    final fy = y - iy;

    // Quintic Hermite interpolant for smooth derivatives
    final u = fx * fx * fx * (fx * (fx * 6.0 - 15.0) + 10.0);
    final v = fy * fy * fy * (fy * (fy * 6.0 - 15.0) + 10.0);

    final a = _hash2d(ix, iy);
    final b = _hash2d(ix + 1, iy);
    final c = _hash2d(ix, iy + 1);
    final d = _hash2d(ix + 1, iy + 1);

    return a * (1.0 - u) * (1.0 - v) +
        b * u * (1.0 - v) +
        c * (1.0 - u) * v +
        d * u * v;
  }

  static double _hash2d(int x, int y) {
    var h = (x * 374761393 + y * 668265263) & 0x7fffffff;
    h = (h ^ (h >> 13)) * 1274126177;
    return (h & 0x7fffffff) / 2147483647.0;
  }
}
