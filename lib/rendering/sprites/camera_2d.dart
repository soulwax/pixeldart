import 'dart:math' as math;
import 'dart:typed_data';

import '../math/vec.dart';

/// How a [Camera2D] maps its design size onto a viewport.
enum ViewFit {
  /// One world unit is one device pixel and the design size is ignored,
  /// for tools and UI laid out in pixels.
  pixels,

  /// The whole design area stays visible; the axis with spare room shows
  /// more world. Pixels-per-unit may be fractional.
  contain,

  /// Like [contain], but pixels-per-unit is a whole number, so pixel art
  /// stays crisp at every window size.
  integer,
}

/// A 2D view: position, zoom and rotation over a design-sized area.
///
/// Plain data with no renderer, canvas or frame-loop dependency. World +Y is
/// down, matching images, tilemaps and pointer coordinates. Call [setViewport]
/// when the drawing surface changes size, then read [viewProjection].
final class Camera2D {
  /// World point at the centre of the view.
  double x;
  double y;

  /// Magnification; 2 shows half as much world.
  double zoom;

  /// Clockwise rotation of the view, in radians.
  double rotation;

  final double designWidth;
  final double designHeight;
  final ViewFit fit;

  /// Rounds the view origin to whole device pixels when building the matrix,
  /// so tiles never shimmer. [x] and [y] keep their precise values.
  bool snapToPixels;

  int _viewportWidth = 1;
  int _viewportHeight = 1;
  double _basePixelsPerUnit = 1;
  final Float32List _matrix = Float32List(16);

  Camera2D({
    required this.designWidth,
    required this.designHeight,
    this.fit = ViewFit.integer,
    this.x = 0,
    this.y = 0,
    this.zoom = 1,
    this.rotation = 0,
    this.snapToPixels = true,
  }) {
    if (designWidth <= 0 || designHeight <= 0) {
      throw ArgumentError('Camera2D design size must be > 0');
    }
  }

  int get viewportWidth => _viewportWidth;
  int get viewportHeight => _viewportHeight;

  /// Device pixels covered by one world unit at the current zoom.
  double get pixelsPerUnit => _basePixelsPerUnit * zoom;

  /// World units visible across the viewport, ignoring rotation.
  double get viewWidth => _viewportWidth / pixelsPerUnit;
  double get viewHeight => _viewportHeight / pixelsPerUnit;

  /// Sets the drawing-surface size in device pixels.
  void setViewport(int width, int height) {
    _viewportWidth = math.max(1, width);
    _viewportHeight = math.max(1, height);
    final contain = math.min(
      _viewportWidth / designWidth,
      _viewportHeight / designHeight,
    );
    _basePixelsPerUnit = switch (fit) {
      ViewFit.pixels => 1,
      ViewFit.contain => contain,
      ViewFit.integer => math.max(1, contain.floorToDouble()),
    };
  }

  /// Half extents of the world-aligned box that contains the rotated view.
  double get _halfBoundsX {
    final c = math.cos(rotation).abs(), s = math.sin(rotation).abs();
    return (viewWidth * c + viewHeight * s) / 2;
  }

  double get _halfBoundsY {
    final c = math.cos(rotation).abs(), s = math.sin(rotation).abs();
    return (viewWidth * s + viewHeight * c) / 2;
  }

  /// World-aligned bounds of everything the view can show.
  double get left => x - _halfBoundsX;
  double get right => x + _halfBoundsX;
  double get top => y - _halfBoundsY;
  double get bottom => y + _halfBoundsY;

  /// Column-major world-to-clip matrix. The returned list is reused, so
  /// copy it to keep a value across changes to the camera.
  Float32List get viewProjection {
    var cx = x, cy = y;
    final ppu = pixelsPerUnit;
    if (snapToPixels) {
      cx = (cx * ppu).roundToDouble() / ppu;
      cy = (cy * ppu).roundToDouble() / ppu;
    }
    final c = math.cos(rotation), s = math.sin(rotation);
    final sx = 2 * ppu / _viewportWidth;
    // Clip-space Y is up and world Y is down.
    final sy = -2 * ppu / _viewportHeight;
    final m = _matrix;
    m[0] = c * sx;
    m[1] = -s * sy;
    m[4] = s * sx;
    m[5] = c * sy;
    m[10] = 1;
    m[12] = -(c * cx + s * cy) * sx;
    m[13] = -(-s * cx + c * cy) * sy;
    m[15] = 1;
    return m;
  }

  /// World position under a viewport point given in device pixels.
  Vec2 screenToWorld(double screenX, double screenY) {
    final ppu = pixelsPerUnit;
    final dx = (screenX - _viewportWidth / 2) / ppu;
    final dy = (screenY - _viewportHeight / 2) / ppu;
    final c = math.cos(rotation), s = math.sin(rotation);
    return Vec2(x + c * dx - s * dy, y + s * dx + c * dy);
  }

  /// Viewport position, in device pixels, of a world point.
  Vec2 worldToScreen(double worldX, double worldY) {
    final ppu = pixelsPerUnit;
    final dx = worldX - x, dy = worldY - y;
    final c = math.cos(rotation), s = math.sin(rotation);
    return Vec2(
      (c * dx + s * dy) * ppu + _viewportWidth / 2,
      (-s * dx + c * dy) * ppu + _viewportHeight / 2,
    );
  }
}
