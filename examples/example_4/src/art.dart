import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';

/// Tile id in [Art.tileset] of a Tiny Town cell. Plain ids are town ids.
const int town = 0;

/// Offset of Tiny Dungeon cells in [Art.tileset].
const int dungeon = 132;

/// The generated water tile's id in [Art.tileset].
const int waterTile = 264;

const String _fontChars =
    ' !"#%&\'()*+,-./0123456789:;<=>?'
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/// Everything drawn, packed into two textures: one nearest-filtered for the
/// pixel art, one linear for the large soft glows.
final class Art {
  final TextureAtlas pixels;
  final TextureAtlas soft;
  final BitmapFont font;
  final List<SpriteRegion> tileset;
  final List<SpriteRegion> trees;

  final SpriteRegion solid;
  final SpriteRegion chevron;
  final SpriteRegion dot;
  final SpriteRegion spark;
  final SpriteRegion star;
  final SpriteRegion smoke;
  final SpriteRegion magic;
  final SpriteRegion slash;
  final SpriteRegion flame;
  final SpriteRegion dirt;
  final SpriteRegion ring;
  final SpriteRegion glow;
  final SpriteRegion halo;

  Art._({
    required this.pixels,
    required this.soft,
    required this.font,
    required this.tileset,
  }) : solid = pixels.solid!,
       trees = [pixels['tree/amber'], pixels['tree/green']],
       chevron = pixels['chevron'],
       dot = pixels['fx/circle_05'],
       spark = pixels['fx/spark_01'],
       star = pixels['fx/star_01'],
       smoke = pixels['fx/smoke_02'],
       magic = pixels['fx/magic_02'],
       slash = pixels['fx/slash_01'],
       flame = pixels['fx/flame_02'],
       dirt = pixels['fx/dirt_02'],
       ring = pixels['fx/twirl_01'],
       glow = soft['soft/light_01'],
       halo = soft['soft/circle_05'];

  SpriteRegion tile(int id) => tileset[id];

  static Future<Art> load(PixeldartApp app) async {
    const fx = [
      'circle_05',
      'spark_01',
      'spark_04',
      'star_01',
      'star_06',
      'smoke_02',
      'smoke_07',
      'magic_02',
      'magic_04',
      'slash_01',
      'flame_02',
      'flame_05',
      'dirt_02',
      'twirl_01',
    ];
    const glows = ['light_01', 'light_03', 'circle_05', 'flare_01'];

    // One at a time: simple static servers refuse connections when a page
    // opens many at once, and these files are small.
    final results = <SpriteImage>[];
    for (final url in [
      'res/town.png',
      'res/dungeon.png',
      for (final name in fx) 'res/fx/$name.png',
      for (final name in glows) 'res/soft/$name.png',
    ]) {
      results.add(await SpriteLoader.loadImage(url));
    }
    await SpriteLoader.loadFontFace(
      'KenneyPixel',
      'res/fonts/kenney_pixel.ttf',
    );

    final builder = AtlasBuilder()
      ..addGrid('town', results[0], cellWidth: 16, cellHeight: 16)
      ..addGrid('dungeon', results[1], cellWidth: 16, cellHeight: 16)
      // These two trees use the top and middle cells of their sheet columns.
      // The third row holds separate bushes, not another tree segment.
      ..add('tree/amber', results[0].crop(3 * 16, 0, 16, 32))
      ..add('tree/green', results[0].crop(4 * 16, 0, 16, 32))
      ..add('water', _waterImage())
      ..add('chevron', _chevronImage());
    for (var i = 0; i < fx.length; i += 1) {
      builder.add('fx/${fx[i]}', results[2 + i]);
    }
    final raster = SpriteLoader.rasterizeFont(
      builder,
      family: 'KenneyPixel',
      size: 16,
      prefix: 'font',
      chars: _fontChars,
      pixelated: true,
    );
    final pixels = builder.build(
      app.resources,
      debugLabel: 'procession-pixels',
    );

    final softBuilder = AtlasBuilder();
    for (var i = 0; i < glows.length; i += 1) {
      softBuilder.add('soft/${glows[i]}', results[2 + fx.length + i]);
    }
    final soft = softBuilder.build(
      app.resources,
      filter: GpuTextureFilter.linear,
      debugLabel: 'procession-soft',
    );

    return Art._(
      pixels: pixels,
      soft: soft,
      font: raster.bind(pixels),
      tileset: [
        ...pixels.sequence('town'),
        ...pixels.sequence('dungeon'),
        pixels['water'],
      ],
    );
  }

  /// A right-pointing triangle for the HUD's off-screen markers.
  static SpriteImage _chevronImage() {
    const size = 11;
    final pixels = Uint8List(size * size * 4);
    for (var y = 0; y < size; y += 1) {
      for (var x = 0; x < size; x += 1) {
        if ((y - size ~/ 2).abs() * 2 > size - 1 - x) continue;
        pixels.fillRange((y * size + x) * 4, (y * size + x) * 4 + 4, 255);
      }
    }
    return SpriteImage(size, size, pixels);
  }

  /// Neither Tiny pack has water, so this tile is painted in their palette.
  static SpriteImage _waterImage() {
    final pixels = Uint8List(16 * 16 * 4);
    for (var y = 0; y < 16; y += 1) {
      for (var x = 0; x < 16; x += 1) {
        final at = (y * 16 + x) * 4;
        final ripple =
            (y == 4 && x >= 2 && x < 7) || (y == 11 && x >= 8 && x < 14);
        pixels[at] = ripple ? 86 : 44;
        pixels[at + 1] = ripple ? 132 : 92;
        pixels[at + 2] = ripple ? 170 : 128;
        pixels[at + 3] = 255;
      }
    }
    return SpriteImage(16, 16, pixels);
  }
}
