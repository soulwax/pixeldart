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

  /// Generates a seamless Voronoi / Worley cellular distance texture (F1 Euclidean metric).
  static Uint8List voronoi({
    int width = 256,
    int height = 256,
    int cellCount = 8,
    bool inverted = false,
    LinearColor cellColor = const LinearColor(0.85, 0.85, 0.88),
    LinearColor edgeColor = const LinearColor(0.10, 0.12, 0.15),
  }) {
    final buffer = Uint8List(width * height * 4);
    var offset = 0;

    for (var y = 0; y < height; y++) {
      final ny = (y / height) * cellCount;
      final iy = ny.floor();

      for (var x = 0; x < width; x++) {
        final nx = (x / width) * cellCount;
        final ix = nx.floor();

        var minDist = 1e9;
        for (var oy = -1; oy <= 1; oy++) {
          for (var ox = -1; ox <= 1; ox++) {
            final cx = ix + ox;
            final cy = iy + oy;

            // Periodic toroidal wrap for seamless tiling
            final wx = (cx % cellCount + cellCount) % cellCount;
            final wy = (cy % cellCount + cellCount) % cellCount;

            final hx = _hash2d(wx, wy);
            final hy = _hash2d(wx + 107, wy + 233);

            final px = cx + hx;
            final py = cy + hy;

            final dx = nx - px;
            final dy = ny - py;
            final dist = math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
              minDist = dist;
            }
          }
        }

        final t = minDist.clamp(0.0, 1.0);
        final factor = inverted ? 1.0 - t : t;

        final r = ((cellColor.r * (1.0 - factor) + edgeColor.r * factor).clamp(0.0, 1.0) * 255.0).round();
        final g = ((cellColor.g * (1.0 - factor) + edgeColor.g * factor).clamp(0.0, 1.0) * 255.0).round();
        final b = ((cellColor.b * (1.0 - factor) + edgeColor.b * factor).clamp(0.0, 1.0) * 255.0).round();

        buffer[offset] = r;
        buffer[offset + 1] = g;
        buffer[offset + 2] = b;
        buffer[offset + 3] = 255;
        offset += 4;
      }
    }
    return buffer;
  }

  /// Generates a seamless hexagonal honeycomb grid texture.
  static Uint8List hexGrid({
    int width = 256,
    int height = 256,
    double hexRadius = 24.0,
    double lineWidth = 2.5,
    LinearColor lineColor = const LinearColor(0.25, 0.75, 1.0),
    LinearColor fillColor = const LinearColor(0.05, 0.07, 0.10),
  }) {
    final buffer = Uint8List(width * height * 4);
    final rL = (lineColor.r.clamp(0.0, 1.0) * 255.0).round();
    final gL = (lineColor.g.clamp(0.0, 1.0) * 255.0).round();
    final bL = (lineColor.b.clamp(0.0, 1.0) * 255.0).round();

    final rF = (fillColor.r.clamp(0.0, 1.0) * 255.0).round();
    final gF = (fillColor.g.clamp(0.0, 1.0) * 255.0).round();
    final bF = (fillColor.b.clamp(0.0, 1.0) * 255.0).round();

    final sqrt3 = math.sqrt(3.0);
    final halfSqrt3 = sqrt3 * 0.5;
    final rowPitch = hexRadius * 1.5;
    final colPitch = hexRadius * sqrt3;
    final apothem = hexRadius * halfSqrt3;
    const piOver3 = math.pi / 3.0;
    const piOver6 = math.pi / 6.0;

    var offset = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        // Approximate hex row
        final row = (y / rowPitch).round();
        final isOddRow = (row & 1) != 0;
        final xOffset = isOddRow ? colPitch * 0.5 : 0.0;
        final col = ((x - xOffset) / colPitch).round();

        // Hex center candidate 1
        final cx1 = col * colPitch + xOffset;
        final cy1 = row * rowPitch;

        // Try adjacent candidate 2 for clean boundary snapping
        final dx1 = x - cx1;
        final dy1 = y - cy1;
        final d1Sq = dx1 * dx1 + dy1 * dy1;

        final row2 = (dy1 > 0) ? row + 1 : row - 1;
        final isOddRow2 = (row2 & 1) != 0;
        final xOffset2 = isOddRow2 ? colPitch * 0.5 : 0.0;
        final col2 = ((x - xOffset2) / colPitch).round();
        final cx2 = col2 * colPitch + xOffset2;
        final cy2 = row2 * rowPitch;

        final dx2 = x - cx2;
        final dy2 = y - cy2;
        final d2Sq = dx2 * dx2 + dy2 * dy2;

        final dx = d1Sq < d2Sq ? dx1 : dx2;
        final dy = d1Sq < d2Sq ? dy1 : dy2;

        final angle = math.atan2(dy, dx);
        final modAngle = ((angle % piOver3) + piOver3) % piOver3 - piOver6;
        final distToEdge = apothem / math.cos(modAngle);
        final dist = math.sqrt(dx * dx + dy * dy);

        final isLine = (distToEdge - dist).abs() <= (lineWidth * 0.5);

        buffer[offset] = isLine ? rL : rF;
        buffer[offset + 1] = isLine ? gL : gF;
        buffer[offset + 2] = isLine ? bL : bF;
        buffer[offset + 3] = 255;
        offset += 4;
      }
    }
    return buffer;
  }

  /// Generates a packed PBR ORM map for a 2x2 twill carbon fiber weave.
  /// R: Ambient Occlusion, G: Roughness, B: Metallic.
  static Uint8List carbonFiberOrm({
    int width = 256,
    int height = 256,
    int cellSize = 8,
    double baseRoughness = 0.22,
    double metallic = 0.35,
  }) {
    final buffer = Uint8List(width * height * 4);
    final metByte = (metallic.clamp(0.0, 1.0) * 255.0).round();

    var offset = 0;
    for (var y = 0; y < height; y++) {
      final cellY = y ~/ cellSize;
      final localY = (y % cellSize) / cellSize;

      for (var x = 0; x < width; x++) {
        final cellX = x ~/ cellSize;
        final localX = (x % cellSize) / cellSize;

        // 2x2 twill weave pattern
        final pattern = (cellX + cellY) % 4;
        final isHorizontal = pattern == 0 || pattern == 1;

        // Groove depth at thread boundary
        final borderDist = isHorizontal
            ? math.min(localY, 1.0 - localY)
            : math.min(localX, 1.0 - localX);
        final grooveAo = (borderDist * 8.0).clamp(0.65, 1.0);

        // Thread curvature roughness variation
        final threadPhase = isHorizontal ? localX : localY;
        final roughMod = math.sin(threadPhase * math.pi) * 0.12;
        final rough = (baseRoughness + roughMod).clamp(0.05, 0.95);

        buffer[offset] = (grooveAo * 255.0).round();
        buffer[offset + 1] = (rough * 255.0).round();
        buffer[offset + 2] = metByte;
        buffer[offset + 3] = 255;
        offset += 4;
      }
    }
    return buffer;
  }

  /// Generates a procedural marble diffuse texture with turbulent mineral veining.
  static Uint8List marble({
    int width = 256,
    int height = 256,
    double scale = 4.0,
    double turbulence = 5.0,
    LinearColor veinColor = const LinearColor(0.12, 0.14, 0.18),
    LinearColor baseColor = const LinearColor(0.92, 0.94, 0.96),
  }) {
    if (width <= 0 || height <= 0) throw ArgumentError('dimensions must be > 0');
    final buffer = Uint8List(width * height * 4);
    var offset = 0;

    for (var y = 0; y < height; y++) {
      final ny = y / height;
      for (var x = 0; x < width; x++) {
        final nx = x / width;

        // Fractional Brownian Motion turbulence
        var turb = 0.0;
        var amp = 1.0;
        var freq = 1.0;
        for (var oct = 0; oct < 4; oct++) {
          turb += _sample2d(nx * scale * freq, ny * scale * freq) * amp;
          freq *= 2.02;
          amp *= 0.5;
        }

        // Sine vein displacement
        final veinPhase = (nx * scale + turb * turbulence) * math.pi * 2.0;
        final vein = (math.sin(veinPhase) * 0.5 + 0.5);
        final veinSharpened = math.pow(vein, 4.0).toDouble();

        final r = (baseColor.r + (veinColor.r - baseColor.r) * veinSharpened).clamp(0.0, 1.0);
        final g = (baseColor.g + (veinColor.g - baseColor.g) * veinSharpened).clamp(0.0, 1.0);
        final b = (baseColor.b + (veinColor.b - baseColor.b) * veinSharpened).clamp(0.0, 1.0);

        buffer[offset] = (r * 255.0).round();
        buffer[offset + 1] = (g * 255.0).round();
        buffer[offset + 2] = (b * 255.0).round();
        buffer[offset + 3] = 255;
        offset += 4;
      }
    }
    return buffer;
  }

  /// Generates a packed PBR ORM map for folded pattern-welded Damascus steel.
  /// R: Ambient Occlusion, G: Roughness, B: Metallic.
  static Uint8List damascusSteelOrm({
    int width = 256,
    int height = 256,
    double layerFrequency = 16.0,
    double foldDistortion = 3.5,
    double baseRoughness = 0.18,
    double metallic = 0.95,
  }) {
    if (width <= 0 || height <= 0) throw ArgumentError('dimensions must be > 0');
    final buffer = Uint8List(width * height * 4);
    final metByte = (metallic.clamp(0.0, 1.0) * 255.0).round();
    var offset = 0;

    for (var y = 0; y < height; y++) {
      final ny = y / height;
      for (var x = 0; x < width; x++) {
        final nx = x / width;

        final warp = _sample2d(nx * 4.0, ny * 4.0) * foldDistortion;
        final wave = math.sin((nx + warp) * layerFrequency * math.pi * 2.0) * 0.5 + 0.5;

        // Alternating hard/soft steel layers in Damascus forging
        final roughness = (baseRoughness + wave * 0.12).clamp(0.05, 0.95);
        final ao = (0.85 + (1.0 - wave) * 0.15).clamp(0.0, 1.0);

        buffer[offset] = (ao * 255.0).round();
        buffer[offset + 1] = (roughness * 255.0).round();
        buffer[offset + 2] = metByte;
        buffer[offset + 3] = 255;
        offset += 4;
      }
    }
    return buffer;
  }

  /// Generates an emissive energy plasma texture with multi-frequency radial ripples.
  static Uint8List energyPlasma({
    int width = 256,
    int height = 256,
    double time = 0.0,
    LinearColor coreColor = const LinearColor(0.2, 0.85, 1.0),
    LinearColor edgeColor = const LinearColor(0.02, 0.10, 0.35),
  }) {
    if (width <= 0 || height <= 0) throw ArgumentError('dimensions must be > 0');
    final buffer = Uint8List(width * height * 4);
    final halfW = width * 0.5;
    final halfH = height * 0.5;
    var offset = 0;

    for (var y = 0; y < height; y++) {
      final dy = (y - halfH) / halfH;
      for (var x = 0; x < width; x++) {
        final dx = (x - halfW) / halfW;
        final dist = math.sqrt(dx * dx + dy * dy);
        final angle = math.atan2(dy, dx);

        // Multi-arm swirling energy pattern
        final armPhase = angle * 3.0 + dist * 8.0 - time * 2.5;
        final ripple = math.sin(armPhase) * 0.5 + 0.5;
        final intensity = ((1.0 - dist) * ripple).clamp(0.0, 1.0);

        final r = (edgeColor.r + (coreColor.r - edgeColor.r) * intensity).clamp(0.0, 1.0);
        final g = (edgeColor.g + (coreColor.g - edgeColor.g) * intensity).clamp(0.0, 1.0);
        final b = (edgeColor.b + (coreColor.b - edgeColor.b) * intensity).clamp(0.0, 1.0);

        buffer[offset] = (r * 255.0).round();
        buffer[offset + 1] = (g * 255.0).round();
        buffer[offset + 2] = (b * 255.0).round();
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
