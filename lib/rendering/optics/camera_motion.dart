import 'dart:math' as math;

import '../math/mat4.dart';
import '../math/vec.dart';

/// 2D Screen-space motion velocity vector in normalized device coordinates (NDC).
final class ScreenVelocity {
  final double vx;
  final double vy;

  const ScreenVelocity(this.vx, this.vy);

  double get length => math.sqrt(vx * vx + vy * vy);
}

/// Screen-space camera motion velocity reconstruction and directional path accumulation.
final class CameraMotionEngine {
  /// Reconstructs 2D screen-space velocity vector from world position and projection matrices.
  static ScreenVelocity reconstructScreenVelocity({
    required Vec3 worldPosition,
    required Mat4 currentViewProj,
    required Mat4 previousViewProj,
  }) {
    final curClip = currentViewProj.transformPoint(worldPosition);
    final prevClip = previousViewProj.transformPoint(worldPosition);

    final curNdcX = curClip.x / math.max(1e-4, curClip.z);
    final curNdcY = curClip.y / math.max(1e-4, curClip.z);

    final prevNdcX = prevClip.x / math.max(1e-4, prevClip.z);
    final prevNdcY = prevClip.y / math.max(1e-4, prevClip.z);

    return ScreenVelocity(curNdcX - prevNdcX, curNdcY - prevNdcY);
  }

  /// Evaluates directional path blur accumulation with depth-aware occlusion weighting.
  static Vec3 accumulateDirectionalMotionBlur({
    required Vec3 currentPixelColor,
    required double currentDepth,
    required ScreenVelocity velocity,
    required List<Vec3> sampleColors,
    required List<double> sampleDepths,
    double maxBlurRadius = 0.05,
    double depthThreshold = 0.05,
  }) {
    final speed = velocity.length;
    if (speed <= 1e-4 || sampleColors.isEmpty) {
      return currentPixelColor;
    }

    var totalWeight = 1.0;
    var accR = currentPixelColor.x;
    var accG = currentPixelColor.y;
    var accB = currentPixelColor.z;

    for (var i = 0; i < sampleColors.length; i++) {
      final sampleDepth = sampleDepths[i];
      final color = sampleColors[i];

      final depthDiff = (sampleDepth - currentDepth).abs();
      final weight = (1.0 - (depthDiff / depthThreshold)).clamp(0.0, 1.0);

      accR += color.x * weight;
      accG += color.y * weight;
      accB += color.z * weight;
      totalWeight += weight;
    }

    final invWeight = 1.0 / totalWeight;
    return Vec3(accR * invWeight, accG * invWeight, accB * invWeight);
  }
}
