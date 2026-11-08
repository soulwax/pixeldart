import 'dart:math' as math;
import 'dart:typed_data';

import '../api/mesh.dart';
import '../math/bounds.dart';
import '../math/vec.dart';

/// Coherent gradient noise generator for procedural terrain synthesis.
final class TerrainNoise {
  final int seed;
  late final Uint8List _p;

  TerrainNoise({this.seed = 1337}) {
    _p = Uint8List(512);
    final base = List<int>.generate(256, (i) => i);
    final rng = math.Random(seed);
    for (var i = 255; i > 0; i--) {
      final j = rng.nextInt(i + 1);
      final tmp = base[i];
      base[i] = base[j];
      base[j] = tmp;
    }
    for (var i = 0; i < 512; i++) {
      _p[i] = base[i & 255];
    }
  }

  static double _fade(double t) => t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  static double _lerp(double a, double b, double t) => a + t * (b - a);

  static double _grad(int hash, double x, double y) {
    final h = hash & 7;
    final u = h < 4 ? x : y;
    final v = h < 4 ? y : x;
    return ((h & 1) != 0 ? -u : u) + ((h & 2) != 0 ? -2.0 * v : 2.0 * v);
  }

  /// Evaluates 2D Perlin gradient noise in [-1, 1].
  double eval2D(double x, double y) {
    final xi = x.floor() & 255;
    final yi = y.floor() & 255;
    final xf = x - x.floor();
    final yf = y - y.floor();

    final u = _fade(xf);
    final v = _fade(yf);

    final aa = _p[_p[xi] + yi];
    final ab = _p[_p[xi] + yi + 1];
    final ba = _p[_p[xi + 1] + yi];
    final bb = _p[_p[xi + 1] + yi + 1];

    final x1 = _lerp(_grad(aa, xf, yf), _grad(ba, xf - 1, yf), u);
    final x2 = _lerp(_grad(ab, xf, yf - 1), _grad(bb, xf - 1, yf - 1), u);

    return (_lerp(x1, x2, v) * 0.45).clamp(-1.0, 1.0);
  }

  /// Multi-octave fractional Brownian motion (fBm) in [0, 1].
  double fbm(
    double x,
    double y, {
    int octaves = 4,
    double frequency = 1.0,
    double persistence = 0.5,
    double lacunarity = 2.0,
  }) {
    var total = 0.0;
    var amp = 1.0;
    var freq = frequency;
    var maxAmp = 0.0;

    for (var i = 0; i < octaves; i++) {
      total += (eval2D(x * freq, y * freq) * 0.5 + 0.5) * amp;
      maxAmp += amp;
      amp *= persistence;
      freq *= lacunarity;
    }

    return maxAmp > 0.0 ? total / maxAmp : 0.0;
  }

  /// Ridged multifractal noise producing sharp mountain peaks and ravines.
  double ridged(
    double x,
    double y, {
    int octaves = 4,
    double frequency = 1.0,
    double persistence = 0.5,
    double lacunarity = 2.0,
  }) {
    var total = 0.0;
    var amp = 1.0;
    var freq = frequency;
    var maxAmp = 0.0;

    for (var i = 0; i < octaves; i++) {
      var n = eval2D(x * freq, y * freq);
      n = 1.0 - n.abs();
      n = n * n;
      total += n * amp;
      maxAmp += amp;
      amp *= persistence;
      freq *= lacunarity;
    }

    return maxAmp > 0.0 ? total / maxAmp : 0.0;
  }
}

/// Procedural fractal terrain mesh and elevation querying engine.
final class TerrainGenerator {
  final double width;
  final double depth;
  final int subdivisionsX;
  final int subdivisionsZ;
  final double maxHeight;
  final double baseHeight;
  final double islandRadius;
  final TerrainNoise noise;

  TerrainGenerator({
    this.width = 32.0,
    this.depth = 32.0,
    this.subdivisionsX = 32,
    this.subdivisionsZ = 32,
    this.maxHeight = 3.5,
    this.baseHeight = -0.4,
    this.islandRadius = 14.0,
    int seed = 42,
  }) : noise = TerrainNoise(seed: seed) {
    if (width <= 0) throw ArgumentError.value(width, 'width', 'must be > 0');
    if (depth <= 0) throw ArgumentError.value(depth, 'depth', 'must be > 0');
    if (subdivisionsX < 2) throw ArgumentError.value(subdivisionsX, 'subdivisionsX', 'must be >= 2');
    if (subdivisionsZ < 2) throw ArgumentError.value(subdivisionsZ, 'subdivisionsZ', 'must be >= 2');
    if (islandRadius <= 0) throw ArgumentError.value(islandRadius, 'islandRadius', 'must be > 0');
  }

  /// Evaluates continuous terrain elevation at world coordinates ([x], [z]).
  double sampleHeight(double x, double z) {
    final r = math.sqrt(x * x + z * z);
    final radialRatio = (r / islandRadius).clamp(0.0, 1.0);
    final mask = 1.0 - radialRatio;
    final falloff = mask * mask * (3.0 - 2.0 * mask); // Smoothstep falloff

    final rolling = noise.fbm(x * 0.08, z * 0.08, octaves: 4, frequency: 1.0);
    final ridge = noise.ridged(x * 0.12, z * 0.12, octaves: 4, frequency: 1.0);

    final rawElevation = rolling * 0.65 + ridge * 0.35;
    return baseHeight + rawElevation * maxHeight * falloff;
  }

  /// Evaluates continuous 3D surface normal at world coordinates ([x], [z]).
  Vec3 sampleNormal(double x, double z) {
    const eps = 0.05;
    final hL = sampleHeight(x - eps, z);
    final hR = sampleHeight(x + eps, z);
    final hD = sampleHeight(x, z - eps);
    final hU = sampleHeight(x, z + eps);

    final nx = -(hR - hL);
    final ny = 2.0 * eps;
    final nz = -(hU - hD);

    final len = math.sqrt(nx * nx + ny * ny + nz * nz);
    return len > 1e-6 ? Vec3(nx / len, ny / len, nz / len) : const Vec3(0, 1, 0);
  }

  /// Evaluates surface slope angle in radians [0, pi/2] at world coordinates ([x], [z]).
  double sampleSlope(double x, double z) {
    final n = sampleNormal(x, z);
    return math.acos(n.y.clamp(0.0, 1.0));
  }

  /// Generates a validated surface-v2 [MeshData] representation of the terrain.
  MeshData generateMesh() {
    final vertexFloats = <double>[];
    final indices = <int>[];

    final dx = width / subdivisionsX;
    final dz = depth / subdivisionsZ;
    final halfW = width * 0.5;
    final halfD = depth * 0.5;

    var minP = Vec3(double.infinity, double.infinity, double.infinity);
    var maxP = Vec3(-double.infinity, -double.infinity, -double.infinity);

    // Build vertices
    for (var j = 0; j <= subdivisionsZ; j++) {
      final z = -halfD + j * dz;
      final vCoord = j / subdivisionsZ;

      for (var i = 0; i <= subdivisionsX; i++) {
        final x = -halfW + i * dx;
        final uCoord = i / subdivisionsX;

        final y = sampleHeight(x, z);
        final norm = sampleNormal(x, z);

        // Compute tangent orthogonal to normal via Gram-Schmidt
        var tRaw = const Vec3(1, 0, 0);
        if (norm.x.abs() > 0.85) tRaw = const Vec3(0, 0, 1);
        final tangent = (tRaw - norm * tRaw.dot(norm)).normalized;

        if (x < minP.x) minP = Vec3(x, minP.y, minP.z);
        if (y < minP.y) minP = Vec3(minP.x, y, minP.z);
        if (z < minP.z) minP = Vec3(minP.x, minP.y, z);

        if (x > maxP.x) maxP = Vec3(x, maxP.y, maxP.z);
        if (y > maxP.y) maxP = Vec3(maxP.x, y, maxP.z);
        if (z > maxP.z) maxP = Vec3(maxP.x, maxP.y, z);

        // surface-v2 layout: pos(3), norm(3), tan(3), handedness(1), color(4), alpha(1), uv0(2), effect(1)
        vertexFloats.addAll([
          x, y, z,
          norm.x, norm.y, norm.z,
          tangent.x, tangent.y, tangent.z, 1.0,
          1.0, 1.0, 1.0, 1.0,
          0.0,
          uCoord, vCoord,
          0.0,
        ]);
      }
    }

    // Build quad indices
    final stride = subdivisionsX + 1;
    for (var j = 0; j < subdivisionsZ; j++) {
      final baseCurr = j * stride;
      final baseNext = (j + 1) * stride;

      for (var i = 0; i < subdivisionsX; i++) {
        final i0 = baseCurr + i;
        final i1 = baseNext + i;
        final i2 = baseNext + i + 1;
        final i3 = baseCurr + i + 1;

        indices.addAll([i0, i1, i2, i0, i2, i3]);
      }
    }

    final mesh = MeshData(
      layout: VertexLayoutDescriptor.surfaceV2,
      vertices: Float32List.fromList(vertexFloats),
      indices: Uint16List.fromList(indices),
      localBounds: Aabb(minP, maxP),
    );
    mesh.validate();
    return mesh;
  }

  /// Synthesizes an RGBA biome texture based on terrain elevation and slope angle.
  Uint8List generateBiomeTexture({int width = 256, int height = 256}) {
    final bytes = Uint8List(width * height * 4);
    final terrainW = this.width;
    final halfW = terrainW * 0.5;
    final halfD = depth * 0.5;

    var idx = 0;
    for (var j = 0; j < height; j++) {
      final z = -halfD + (j / height) * depth;
      for (var i = 0; i < width; i++) {
        final x = -halfW + (i / width) * terrainW;

        final h = sampleHeight(x, z);
        final slope = sampleSlope(x, z);

        double r, g, b;

        if (h < 0.05) {
          // Coastal sand / beach
          r = 0.76;
          g = 0.69;
          b = 0.50;
        } else if (slope > 0.42) {
          // Steep cliff rock
          r = 0.38;
          g = 0.36;
          b = 0.35;
        } else if (h > maxHeight * 0.70) {
          // Snow-capped peak
          r = 0.92;
          g = 0.94;
          b = 0.96;
        } else {
          // Lush grassland / moss plateau
          final blend = (h / (maxHeight * 0.70)).clamp(0.0, 1.0);
          r = 0.20 + blend * 0.12;
          g = 0.46 - blend * 0.06;
          b = 0.18 + blend * 0.08;
        }

        bytes[idx] = (r * 255).round().clamp(0, 255);
        bytes[idx + 1] = (g * 255).round().clamp(0, 255);
        bytes[idx + 2] = (b * 255).round().clamp(0, 255);
        bytes[idx + 3] = 255;
        idx += 4;
      }
    }

    return bytes;
  }
}
