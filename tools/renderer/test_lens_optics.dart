import 'dart:math' as math;
import 'package:pixeldart/pixeldart.dart';

void main() {
  _testLensBarrelPrescription();
  _testAnamorphicStreak();
  _testPolygonalBokehAperture();
  print('Lens optics tests passed.');
}

void _testLensBarrelPrescription() {
  final prescription = CinematicLensOpticsEngine.barrelPrescription;
  assert(prescription.isNotEmpty);
  assert(prescription.length >= 6);

  for (final elem in prescription) {
    assert(elem.axisPosition.isFinite);
    assert(elem.scale > 0.0 && elem.scale.isFinite);
    assert(elem.intensity > 0.0 && elem.intensity <= 1.0);
    assert(elem.colorTint.isFinite);
    assert(elem.colorTint.x >= 0 && elem.colorTint.y >= 0 && elem.colorTint.z >= 0);
  }
}

void _testAnamorphicStreak() {
  // Peak at origin
  final peak = CinematicLensOpticsEngine.evaluateAnamorphicStreakWeight(0.0, 0.4);
  assert((peak - 1.0).abs() < 1e-6, 'Peak at streak origin must be 1.0');

  // Symmetry
  final left = CinematicLensOpticsEngine.evaluateAnamorphicStreakWeight(-0.15, 0.4);
  final right = CinematicLensOpticsEngine.evaluateAnamorphicStreakWeight(0.15, 0.4);
  assert((left - right).abs() < 1e-6, 'Streak must be horizontally symmetric');

  // Monotonic decay
  assert(left < peak, 'Streak weight must decrease with distance');
  assert(left > 0.0);

  // Outside bounds clamped to 0.0
  final outside = CinematicLensOpticsEngine.evaluateAnamorphicStreakWeight(0.5, 0.4);
  assert(outside == 0.0, 'Outside streak radius must be 0.0');
}

void _testPolygonalBokehAperture() {
  // Center is always unoccluded
  assert(
    CinematicLensOpticsEngine.evaluatePolygonalBokehWeight(
          r: 0.0,
          theta: 0.0,
          bladeCount: 6,
        ) ==
        1.0,
  );

  // Beyond unit radius is always occluded
  assert(
    CinematicLensOpticsEngine.evaluatePolygonalBokehWeight(
          r: 1.05,
          theta: 0.0,
          bladeCount: 6,
        ) ==
        0.0,
  );

  // Roundness = 1.0 creates a circular aperture
  for (var angle = 0.0; angle < math.pi * 2; angle += 0.5) {
    assert(
      CinematicLensOpticsEngine.evaluatePolygonalBokehWeight(
            r: 0.95,
            theta: angle,
            bladeCount: 6,
            roundness: 1.0,
          ) ==
          1.0,
    );
  }

  // 6-blade hexagonal symmetry: test 6-fold rotational invariance
  final w0 = CinematicLensOpticsEngine.evaluatePolygonalBokehWeight(
    r: 0.85,
    theta: 0.2,
    bladeCount: 6,
    roundness: 0.0,
  );
  final w60 = CinematicLensOpticsEngine.evaluatePolygonalBokehWeight(
    r: 0.85,
    theta: 0.2 + (math.pi / 3.0),
    bladeCount: 6,
    roundness: 0.0,
  );
  assert(w0 == w60, 'Hexagonal aperture must have 6-fold rotational symmetry');
}
