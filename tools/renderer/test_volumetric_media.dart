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

  final bounded = VolumetricMediaEngine.evaluateBoundedHeightFogOpticalDepth(
    rayOrigin: const Vec3(0, 1, -5),
    rayDirection: const Vec3(0, 0, 1),
    maxDistance: 20,
    volumeMin: const Vec3(-2, 0, 0),
    volumeMax: const Vec3(2, 3, 4),
    baseDensity: 0.02,
    heightFalloff: 0.5,
  );
  _require(bounded > 0, 'bounded medium should contribute only inside volume');
  final miss = VolumetricMediaEngine.evaluateBoundedHeightFogOpticalDepth(
    rayOrigin: const Vec3(5, 1, -5),
    rayDirection: const Vec3(0, 0, 1),
    maxDistance: 20,
    volumeMin: const Vec3(-2, 0, 0),
    volumeMax: const Vec3(2, 3, 4),
  );
  _require(miss == 0, 'bounded medium miss must be transparent');
  final nearSource = VolumetricMediaEngine.evaluateTransientSourceRadiance(
    sourcePosition: Vec3.zero,
    samplePosition: const Vec3(0, 0, 2),
    sourceColor: const Vec3(1, 0.8, 0.6),
    luminousIntensity: 4,
    mediumTransmittance: 0.5,
  );
  final farSource = VolumetricMediaEngine.evaluateTransientSourceRadiance(
    sourcePosition: Vec3.zero,
    samplePosition: const Vec3(0, 0, 4),
    sourceColor: const Vec3(1, 0.8, 0.6),
    luminousIntensity: 4,
    mediumTransmittance: 0.5,
  );
  _require(
    nearSource.x > farSource.x,
    'source radiance must fall with distance',
  );
  _require(
    VolumetricMediaEngine.evaluateInverseSquareAttenuation(distance: 200) == 0,
    'source cutoff must bound distant transient light',
  );
  final sourceField = VolumetricMediaEngine.evaluateSourceField(
    rayOrigin: Vec3.zero,
    rayDirection: const Vec3(0, 0, 1),
    rayLength: 12,
    scatteringCoeff: 0.2,
    sources: const [
      VolumetricSource(
        id: 'mantle',
        position: Vec3(0, 2, 3),
        color: Vec3(1, 0.7, 0.4),
        luminousIntensity: 3,
      ),
      VolumetricSource(
        id: 'far-lightning',
        position: Vec3(20, 20, 200),
        color: Vec3(0.5, 0.7, 1),
        luminousIntensity: 100,
      ),
    ],
  );
  _require(
    sourceField.contributingSourceCount == 1 &&
        sourceField.luminance > 0 &&
        sourceField.dominantDirection.length > 0,
    'source field did not retain bounded practical contribution',
  );
  final emptyField = VolumetricMediaEngine.evaluateSourceField(
    rayOrigin: Vec3.zero,
    rayDirection: const Vec3(0, 0, 1),
    rayLength: 12,
    scatteringCoeff: 0.2,
    sources: const [],
  );
  _require(
    emptyField.luminance == 0 && emptyField.dominantDirection == Vec3.zero,
    'empty source field must not fabricate a shaft',
  );

  final selected = selectVolumetricSources(
    referencePosition: Vec3.zero,
    limit: 2,
    sources: const [
      VolumetricSource(
        id: 'z-lamp',
        position: Vec3(0, 0, 2),
        color: Vec3(1, 1, 1),
        luminousIntensity: 2,
      ),
      VolumetricSource(
        id: 'a-lightning',
        position: Vec3(0, 0, 3),
        color: Vec3(1, 1, 1),
        luminousIntensity: 10,
      ),
      VolumetricSource(
        id: 'out-of-range',
        position: Vec3(0, 0, 300),
        color: Vec3(1, 1, 1),
        luminousIntensity: 1000,
      ),
    ],
  );
  _require(
    selected.length == 2 && selected.first.id == 'a-lightning',
    'volumetric source selection must rank bounded influence, not submission order',
  );
  _require(
    VolumetricLightProgramSource.sourceUniforms.contains('uSourcePosition0') &&
        VolumetricLightProgramSource.sourceUniforms.contains(
          'uSourceCutoffDistance3',
        ),
    'volumetric pass must expose bounded source uniform slots',
  );
  _throws(
    () => selectVolumetricSources(
      referencePosition: Vec3.zero,
      sources: const [
        VolumetricSource(
          id: 'duplicate',
          position: Vec3.zero,
          color: Vec3(1, 1, 1),
          luminousIntensity: 1,
        ),
        VolumetricSource(
          id: 'duplicate',
          position: Vec3.unitY,
          color: Vec3(1, 1, 1),
          luminousIntensity: 1,
        ),
      ],
    ),
    'duplicate volumetric source ids must be rejected',
  );

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
