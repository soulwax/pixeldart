import 'dart:async';
import 'dart:js_interop';
import 'dart:typed_data';

import 'package:web/web.dart' as web;

import '../sprites/bitmap_font.dart';
import '../sprites/sprite_batch.dart';
import '../sprites/texture_atlas.dart';

/// A font rasterized into an [AtlasBuilder], waiting for the atlas to be
/// built so its glyphs can point at real regions.
final class FontRaster {
  final String _prefix;
  final Map<int, double> _advances;
  final double _lineHeight;
  final double _fallbackAdvance;

  FontRaster._(
    this._prefix,
    this._advances,
    this._lineHeight,
    this._fallbackAdvance,
  );

  /// The usable font, once [atlas] has been built from the same builder.
  BitmapFont bind(TextureAtlas atlas) {
    final glyphs = <int, BitmapGlyph>{};
    _advances.forEach((code, advance) {
      final SpriteRegion region = atlas['$_prefix/$code'];
      glyphs[code] = BitmapGlyph(region, advance: advance);
    });
    return BitmapFont(
      glyphs: glyphs,
      lineHeight: _lineHeight,
      fallbackAdvance: _fallbackAdvance,
    );
  }
}

/// Browser helpers that turn images and fonts into sprite data.
abstract final class SpriteLoader {
  static const String _printableAscii =
      ' !"#\$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`'
      'abcdefghijklmnopqrstuvwxyz{|}~';

  /// Fetches and decodes an image to RGBA8 pixels.
  static Future<SpriteImage> loadImage(String url) async {
    final done = Completer<void>();
    final img = web.HTMLImageElement();
    img.crossOrigin = 'anonymous';
    img.onload = ((web.Event _) => done.complete()).toJS;
    img.onerror = ((web.Event _) => done.completeError(
      StateError('SpriteLoader: failed to load image "$url"'),
    )).toJS;
    img.src = url;
    await done.future;

    final width = img.naturalWidth, height = img.naturalHeight;
    final ctx = _context(width, height);
    ctx.drawImage(img, 0, 0);
    return SpriteImage(width, height, _pixels(ctx, width, height));
  }

  /// Loads a font file and makes [family] available to [rasterizeFont].
  static Future<void> loadFontFace(String family, String url) async {
    final face = web.FontFace(family, 'url("$url")'.toJS);
    await face.load().toDart;
    web.document.fonts.add(face);
  }

  /// Draws each of [chars] (printable ASCII by default) into [builder].
  ///
  /// [family] must already be available; see [loadFontFace]. [size] is in
  /// pixels and is also the size glyphs draw at scale 1. [pixelated] cuts
  /// antialiasing to on/off coverage and rounds advances to whole pixels,
  /// for bitmap-style fonts. Call [FontRaster.bind] after building the atlas.
  static FontRaster rasterizeFont(
    AtlasBuilder builder, {
    required String family,
    required double size,
    String prefix = 'font',
    String? chars,
    bool pixelated = true,
  }) {
    final text = chars ?? _printableAscii;
    final font = '${size}px "$family"';
    final probe = _context(1, 1)..font = font;
    final metrics = probe.measureText('Mg');
    final ascent = metrics.fontBoundingBoxAscent.toDouble();
    final descent = metrics.fontBoundingBoxDescent.toDouble();
    final height = (ascent + descent).ceil() + 1;
    final baseline = ascent.ceilToDouble();

    final advances = <int, double>{};
    final seen = <int>{};
    for (final code in text.codeUnits) {
      if (!seen.add(code)) continue;
      final glyph = String.fromCharCode(code);
      var advance = probe.measureText(glyph).width.toDouble();
      if (pixelated) advance = advance.roundToDouble();
      advances[code] = advance;

      final width = advance.ceil() + 2;
      final ctx = _context(width, height)
        ..font = font
        ..textBaseline = 'alphabetic'
        ..fillStyle = 'white'.toJS;
      ctx.fillText(glyph, 0, baseline);
      final pixels = _pixels(ctx, width, height);
      for (var i = 0; i < pixels.length; i += 4) {
        final coverage = pixels[i + 3];
        pixels[i] = pixels[i + 1] = pixels[i + 2] = 255;
        if (pixelated) pixels[i + 3] = coverage >= 128 ? 255 : 0;
      }
      builder.add('$prefix/$code', SpriteImage(width, height, pixels));
    }
    return FontRaster._(
      prefix,
      advances,
      height.toDouble(),
      advances[32] ?? size / 2,
    );
  }

  static web.CanvasRenderingContext2D _context(int width, int height) {
    final canvas = web.document.createElement('canvas') as web.HTMLCanvasElement
      ..width = width
      ..height = height;
    return canvas.getContext('2d') as web.CanvasRenderingContext2D;
  }

  static Uint8List _pixels(
    web.CanvasRenderingContext2D ctx,
    int width,
    int height,
  ) {
    final data = ctx.getImageData(0, 0, width, height).data.toDart;
    return Uint8List.view(data.buffer, data.offsetInBytes, data.lengthInBytes);
  }
}
