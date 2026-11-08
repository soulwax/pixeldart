import 'dart:convert';

/// Evidence returned by a host browser capture. Pixel readback stays outside
/// Pixeldart; this record makes the promotion decision deterministic.
final class BrowserPromotionCapture {
  final String packageHash;
  final String lod;
  final int width;
  final int height;
  final int nonEmptyPixels;
  final List<double> bounds;

  const BrowserPromotionCapture({
    required this.packageHash,
    required this.lod,
    required this.width,
    required this.height,
    required this.nonEmptyPixels,
    required this.bounds,
  });

  Map<String, Object> toJson() => {
    'schema': 'pixeldart-browser-promotion-capture-v1',
    'packageHash': packageHash,
    'lod': lod,
    'width': width,
    'height': height,
    'nonEmptyPixels': nonEmptyPixels,
    'bounds': bounds,
  };

  String encode() => jsonEncode(toJson());
}

final class BrowserPromotionResult {
  final List<String> failures;
  const BrowserPromotionResult(this.failures);
  bool get passed => failures.isEmpty;
}

final class BrowserPromotionGate {
  const BrowserPromotionGate();

  BrowserPromotionResult evaluate({
    required BrowserPromotionCapture capture,
    required String expectedPackageHash,
    required int expectedWidth,
    required int expectedHeight,
    required List<double> expectedBounds,
  }) {
    final failures = <String>[];
    if (capture.packageHash != expectedPackageHash) {
      failures.add('package hash mismatch');
    }
    if (capture.width != expectedWidth || capture.height != expectedHeight) {
      failures.add('viewport dimensions mismatch');
    }
    if (capture.width <= 0 || capture.height <= 0) {
      failures.add('viewport is empty');
    }
    if (capture.nonEmptyPixels <= 0) {
      failures.add('capture has no non-empty pixels');
    }
    if (capture.bounds.length != expectedBounds.length ||
        !_close(capture.bounds, expectedBounds)) {
      failures.add('world bounds mismatch');
    }
    return BrowserPromotionResult(List.unmodifiable(failures));
  }

  BrowserPromotionResult evaluateSet({
    required List<BrowserPromotionCapture> captures,
    required String expectedPackageHash,
    required List<(int, int)> requiredViewports,
    required List<String> requiredLods,
    required List<double> expectedBounds,
  }) {
    if (captures.isEmpty) {
      return const BrowserPromotionResult(['no browser captures supplied']);
    }
    final failures = <String>[];
    final seenViewports = <(int, int)>{};
    final seenLods = <String>{};
    for (final capture in captures) {
      final result = evaluate(
        capture: capture,
        expectedPackageHash: expectedPackageHash,
        expectedWidth: capture.width,
        expectedHeight: capture.height,
        expectedBounds: expectedBounds,
      );
      failures.addAll(
        result.failures.map((failure) => '${capture.lod}: $failure'),
      );
      seenViewports.add((capture.width, capture.height));
      seenLods.add(capture.lod);
    }
    for (final viewport in requiredViewports) {
      if (!seenViewports.contains(viewport)) {
        failures.add('missing viewport ${viewport.$1}x${viewport.$2}');
      }
    }
    for (final lod in requiredLods) {
      if (!seenLods.contains(lod)) failures.add('missing LOD capture: $lod');
    }
    return BrowserPromotionResult(List.unmodifiable(failures));
  }
}

bool _close(List<double> a, List<double> b) {
  for (var i = 0; i < a.length; i++) {
    if (!a[i].isFinite || !b[i].isFinite || (a[i] - b[i]).abs() > 0.0001) {
      return false;
    }
  }
  return true;
}
