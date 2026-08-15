import 'dart:convert';

import 'package:pixeldart/rendering/rendering.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  final hashA = 'a' * 64;
  final capture = BrowserPromotionCapture(
    packageHash: hashA,
    lod: 'LOD0',
    width: 1920,
    height: 1080,
    nonEmptyPixels: 120,
    bounds: [-1, -1, -1, 1, 1, 1],
  );
  final encoded = jsonDecode(capture.encode()) as Map<String, dynamic>;
  require(
    encoded['schema'] == 'pixeldart-browser-promotion-capture-v1',
    'capture schema is stable',
  );
  const gate = BrowserPromotionGate();
  final passed = gate.evaluate(
    capture: capture,
    expectedPackageHash: hashA,
    expectedWidth: 1920,
    expectedHeight: 1080,
    expectedBounds: [-1, -1, -1, 1, 1, 1],
  );
  require(passed.passed, 'valid browser capture passes');

  final blank = gate.evaluate(
    capture: BrowserPromotionCapture(
      packageHash: hashA,
      lod: 'LOD1',
      width: 1920,
      height: 1080,
      nonEmptyPixels: 0,
      bounds: [-1, -1, -1, 1, 1, 1],
    ),
    expectedPackageHash: hashA,
    expectedWidth: 1920,
    expectedHeight: 1080,
    expectedBounds: [-1, -1, -1, 1, 1, 1],
  );
  require(
    !blank.passed && blank.failures.contains('capture has no non-empty pixels'),
    'blank capture is rejected',
  );

  final drift = gate.evaluate(
    capture: BrowserPromotionCapture(
      packageHash: 'b' * 64,
      lod: 'LOD1',
      width: 1280,
      height: 720,
      nonEmptyPixels: 10,
      bounds: [-2, -1, -1, 1, 1, 1],
    ),
    expectedPackageHash: hashA,
    expectedWidth: 1920,
    expectedHeight: 1080,
    expectedBounds: [-1, -1, -1, 1, 1, 1],
  );
  require(
    drift.failures.length == 3,
    'hash, viewport and bounds drift are reported',
  );
  final set = gate.evaluateSet(
    captures: [
      capture,
      BrowserPromotionCapture(
        packageHash: hashA,
        lod: 'LOD1',
        width: 1280,
        height: 720,
        nonEmptyPixels: 40,
        bounds: const [-1, -1, -1, 1, 1, 1],
      ),
    ],
    expectedPackageHash: hashA,
    requiredViewports: const [(1920, 1080), (1280, 720)],
    requiredLods: const ['LOD0', 'LOD1'],
    expectedBounds: const [-1, -1, -1, 1, 1, 1],
  );
  require(set.passed, 'desktop/mobile LOD evidence set passes');

  final incomplete = gate.evaluateSet(
    captures: [capture],
    expectedPackageHash: hashA,
    requiredViewports: const [(1920, 1080), (1280, 720)],
    requiredLods: const ['LOD0', 'LOD1'],
    expectedBounds: const [-1, -1, -1, 1, 1, 1],
  );
  require(
    !incomplete.passed && incomplete.failures.length == 2,
    'incomplete evidence is rejected',
  );
  print('Browser promotion tests passed.');
}
