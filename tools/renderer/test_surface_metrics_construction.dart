import 'dart:io';

import 'package:pixeldart/rendering/rendering.dart';

void check(bool condition, String message) {
  if (!condition) throw StateError('surface metrics: $message');
}

void expectThrows(void Function() body, String what) {
  try {
    body();
  } on ArgumentError {
    return;
  }
  throw StateError('surface metrics: $what should have thrown');
}

void main() {
  // The bug this constructor exists to prevent: a HiDPI canvas rendered at 1x
  // because the host passed its CSS size as the backing-store size.
  final hidpi = SurfaceMetrics.forCanvas(
    cssWidth: 800,
    cssHeight: 600,
    devicePixelRatio: 2,
  );
  check(hidpi.pixelWidth == 1600, 'backing store must scale by dpr');
  check(hidpi.pixelHeight == 1200, 'backing store must scale by dpr');
  check(hidpi.cssWidth == 800, 'css size must be preserved');
  check(hidpi.devicePixelRatio == 2, 'dpr must be reported');

  // The cap protects fill rate on 3x displays and is reported honestly, so a
  // host reading dpr back sees what was allocated rather than what was asked.
  final capped = SurfaceMetrics.forCanvas(
    cssWidth: 800,
    cssHeight: 600,
    devicePixelRatio: 3,
    maxDevicePixelRatio: 2,
  );
  check(capped.pixelWidth == 1600, 'dpr above the cap must clamp allocation');
  check(
    capped.devicePixelRatio == 2,
    'a capped surface must report the ratio it actually used, not the request',
  );

  // A fractional ratio, which real browsers report on scaled displays.
  final fractional = SurfaceMetrics.forCanvas(
    cssWidth: 1280,
    cssHeight: 720,
    devicePixelRatio: 1.5,
  );
  check(fractional.pixelWidth == 1920, 'fractional dpr must round');
  check(fractional.pixelHeight == 1080, 'fractional dpr must round');

  // The offscreen form is exactly 1:1.
  final offscreen = SurfaceMetrics.pixels(width: 384, height: 216);
  check(
    offscreen.pixelWidth == 384 && offscreen.cssWidth == 384,
    'pixels() must be 1:1',
  );
  check(offscreen.devicePixelRatio == 1, 'pixels() must not scale');

  // resized() keeps the ratio, which is the whole point: a resize handler that
  // updates the CSS size and forgets the backing store renders blurry.
  final resized = hidpi.resized(cssWidth: 1024, cssHeight: 768);
  check(resized.pixelWidth == 2048, 'resized must keep the device pixel ratio');
  check(resized.cssWidth == 1024, 'resized must take the new css width');
  check(resized.devicePixelRatio == 2, 'resized must keep the dpr');

  // Visibility toggling preserves allocation, for hosts pausing on tab blur.
  final hidden = hidpi.withVisibility(false);
  check(!hidden.visible, 'withVisibility must set visibility');
  check(
    hidden.pixelWidth == hidpi.pixelWidth,
    'withVisibility must not disturb allocation',
  );

  // Zero-sized surfaces are legal (a collapsed container) and detectable.
  final collapsed = SurfaceMetrics.pixels(width: 0, height: 0);
  check(collapsed.isZeroSized, 'a zero surface must report isZeroSized');

  expectThrows(
    () => SurfaceMetrics.forCanvas(
      cssWidth: 100,
      cssHeight: 100,
      devicePixelRatio: 0,
    ),
    'a zero device pixel ratio',
  );
  expectThrows(
    () => SurfaceMetrics.forCanvas(
      cssWidth: 100,
      cssHeight: 100,
      devicePixelRatio: double.nan,
    ),
    'a non-finite device pixel ratio',
  );
  expectThrows(
    () => SurfaceMetrics.pixels(width: -1, height: 10),
    'a negative size',
  );

  stdout.writeln('Surface metrics construction fixtures passed.');
}
