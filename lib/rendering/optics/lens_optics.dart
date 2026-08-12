import 'dart:math' as math;

import '../math/vec.dart';

/// Single optical ghost element in the multi-lens barrel train.
final class LensElement {
  final double axisPosition;
  final double scale;
  final Vec3 colorTint;
  final double intensity;

  const LensElement({
    required this.axisPosition,
    required this.scale,
    required this.colorTint,
    required this.intensity,
  });
}

/// Cinematic lens flare, anamorphic bloom streak, and bokeh aperture evaluator in PixelDart.
final class CinematicLensOpticsEngine {
  /// Default 6-element internal lens barrel prescription.
  static const List<LensElement> barrelPrescription = [
    LensElement(
      axisPosition: -0.8,
      scale: 0.6,
      colorTint: Vec3(0.4, 0.6, 1.0),
      intensity: 0.35,
    ),
    LensElement(
      axisPosition: -0.4,
      scale: 0.25,
      colorTint: Vec3(0.9, 0.4, 0.2),
      intensity: 0.50,
    ),
    LensElement(
      axisPosition: -0.1,
      scale: 0.15,
      colorTint: Vec3(0.3, 0.8, 0.4),
      intensity: 0.40,
    ),
    LensElement(
      axisPosition: 0.3,
      scale: 0.45,
      colorTint: Vec3(0.8, 0.3, 0.9),
      intensity: 0.45,
    ),
    LensElement(
      axisPosition: 0.7,
      scale: 0.8,
      colorTint: Vec3(0.5, 0.7, 1.0),
      intensity: 0.30,
    ),
    LensElement(
      axisPosition: 1.2,
      scale: 1.4,
      colorTint: Vec3(1.0, 0.8, 0.4),
      intensity: 0.25,
    ),
  ];

  /// Evaluates 1D anamorphic streak kernel weight at normalized coordinate x.
  static double evaluateAnamorphicStreakWeight(double x, [double streakWidth = 0.35]) {
    final dist = x.abs();
    if (dist > streakWidth) return 0.0;
    final norm = dist / streakWidth;
    return math.exp(-4.0 * norm * norm);
  }

  /// Evaluates regular n-gon polygonal bokeh aperture mask at radius r and angle theta.
  static double evaluatePolygonalBokehWeight({
    required double r,
    required double theta,
    int bladeCount = 6,
    double roundness = 0.2,
  }) {
    if (r > 1.0) return 0.0;
    final segmentAngle = (2.0 * math.pi) / bladeCount;
    final localTheta = (theta % segmentAngle) - (segmentAngle * 0.5);
    final maxR = math.cos(segmentAngle * 0.5) / math.cos(localTheta);
    final blendR = maxR * (1.0 - roundness) + 1.0 * roundness;
    return r <= blendR ? 1.0 : 0.0;
  }
}
