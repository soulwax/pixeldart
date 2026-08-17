import 'dart:math' as math;

import 'package:pixeldart/rendering/rendering.dart';

void main() {
  final level = VolumetricMediaEngine.evaluateHeightFogOpticalDepth(
    startY: 2,
    endY: 2,
    distance: 10,
    baseDensity: 0.01,
    heightFalloff: 1.5,
  );
  _require(level > 0, 'level medium should have optical depth');
  _require(
    (level - 0.01 * 10 * math.exp(-3)).abs() < 1e-12,
    'constant-height optical depth is incorrect',
  );

  final ascending = VolumetricMediaEngine.evaluateHeightFogOpticalDepth(
    startY: 0,
    endY: 4,
    distance: 8,
    baseDensity: 0.02,
    heightFalloff: 1,
  );
  final descending = VolumetricMediaEngine.evaluateHeightFogOpticalDepth(
    startY: 4,
    endY: 0,
    distance: 8,
    baseDensity: 0.02,
    heightFalloff: 1,
  );
  _require(
    (ascending - descending).abs() < 1e-12,
    'height-medium integration must be direction-independent',
  );
  final transmission = VolumetricMediaEngine.evaluateHeightFogTransmittance(
    startY: 0,
    endY: 4,
    distance: 8,
    baseDensity: 0.02,
    heightFalloff: 1,
  );
  _require(
    transmission > 0 && transmission < 1,
    'transmittance must be bounded',
  );

  final scatter = VolumetricMediaEngine.evaluatePointInScattering(
    rayOrigin: Vec3.zero,
    rayDirection: const Vec3(0, 0, 2),
    rayLength: 10,
    lightPos: const Vec3(0, 2, 3),
    lightIntensity: 4,
    scatteringCoeff: 0.2,
  );
  _require(scatter.isFinite && scatter >= 0, 'scattering must be finite');

  _throws(
    () => VolumetricMediaEngine.evaluatePointInScattering(
      rayOrigin: Vec3.zero,
      rayDirection: Vec3.zero,
      rayLength: 1,
      lightPos: Vec3.unitY,
      lightIntensity: 1,
      scatteringCoeff: 1,
    ),
    'zero ray direction must be rejected',
  );
  _throws(
    () => VolumetricMediaEngine.evaluateHeightFogOpticalDepth(
      startY: 0,
      endY: 1,
      distance: -1,
    ),
    'negative medium distance must be rejected',
  );
  print('Volumetric media fixtures passed.');
}

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void _throws(void Function() action, String message) {
  try {
    action();
  } catch (_) {
    return;
  }
  throw StateError(message);
}
