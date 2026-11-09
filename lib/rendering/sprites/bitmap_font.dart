import 'sprite_batch.dart';

/// One character of a [BitmapFont].
final class BitmapGlyph {
  final SpriteRegion region;

  /// Pen movement after this glyph, in font pixels.
  final double advance;

  /// Offset of the region's top-left from the pen, in font pixels.
  final double offsetX;
  final double offsetY;

  const BitmapGlyph(
    this.region, {
    required this.advance,
    this.offsetX = 0,
    this.offsetY = 0,
  });
}

/// Text drawn from atlas regions, so it shares a batch with sprites.
///
/// Plain data: build one from any sheet, or rasterize a browser font with
/// `SpriteLoader.rasterizeFont`.
final class BitmapFont {
  final Map<int, BitmapGlyph> glyphs;
  final double lineHeight;

  /// Advance for characters the font lacks.
  final double fallbackAdvance;

  const BitmapFont({
    required this.glyphs,
    required this.lineHeight,
    this.fallbackAdvance = 0,
  });

  /// Width of the longest line of [text] at [scale].
  double measure(String text, {double scale = 1}) {
    var longest = 0.0, line = 0.0;
    for (var i = 0; i < text.length; i += 1) {
      final code = text.codeUnitAt(i);
      if (code == 10) {
        if (line > longest) longest = line;
        line = 0;
        continue;
      }
      line += glyphs[code]?.advance ?? fallbackAdvance;
    }
    return (line > longest ? line : longest) * scale;
  }

  /// Adds [text] with its first line's top at [y].
  ///
  /// [alignX] positions each line about [x]: 0 is left-aligned, 0.5 centred,
  /// 1 right-aligned.
  void draw(
    SpriteBatch batch,
    String text,
    double x,
    double y, {
    double scale = 1,
    double alignX = 0,
    int color = 0xFFFFFFFF,
    double additive = 0,
    double glow = 0,
    double z = 0,
    int layer = 0,
  }) {
    var lineStart = 0;
    var penY = y;
    for (var i = 0; i <= text.length; i += 1) {
      if (i < text.length && text.codeUnitAt(i) != 10) continue;
      var penX = x;
      if (alignX != 0) {
        var width = 0.0;
        for (var c = lineStart; c < i; c += 1) {
          width += glyphs[text.codeUnitAt(c)]?.advance ?? fallbackAdvance;
        }
        penX -= width * scale * alignX;
      }
      for (var c = lineStart; c < i; c += 1) {
        final glyph = glyphs[text.codeUnitAt(c)];
        if (glyph == null) {
          penX += fallbackAdvance * scale;
          continue;
        }
        batch.draw(
          glyph.region,
          penX + glyph.offsetX * scale,
          penY + glyph.offsetY * scale,
          scaleX: scale,
          scaleY: scale,
          originX: 0,
          originY: 0,
          color: color,
          additive: additive,
          glow: glow,
          z: z,
          layer: layer,
        );
        penX += glyph.advance * scale;
      }
      penY += lineHeight * scale;
      lineStart = i + 1;
    }
  }
}
