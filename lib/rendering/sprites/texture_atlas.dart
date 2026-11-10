import 'dart:typed_data';

import '../api/handles.dart';
import '../api/renderer.dart';
import '../webgl/device_api.dart' show GpuTextureFilter, GpuTextureWrap;
import 'sprite_batch.dart';

final class TextureAtlas {
  final Map<String, SpriteRegion> regions;

  final SpriteRegion? solid;

  const TextureAtlas(this.regions, {this.solid});

  SpriteRegion operator [](String name) =>
      regions[name] ??
      (throw ArgumentError.value(
        name,
        'name',
        'no such region (${regions.length} regions in atlas)',
      ));

  List<SpriteRegion> sequence(String prefix) {
    final out = <SpriteRegion>[];
    while (true) {
      final region = regions['$prefix/${out.length}'];
      if (region == null) return out;
      out.add(region);
    }
  }

  factory TextureAtlas.grid({
    required TextureHandle texture,
    required int textureWidth,
    required int textureHeight,
    required int cellWidth,
    required int cellHeight,
    int spacing = 0,
    int margin = 0,
    double inset = 0.01,
  }) {
    if (cellWidth <= 0 || cellHeight <= 0) {
      throw ArgumentError('TextureAtlas.grid cell size must be > 0');
    }
    final regions = <String, SpriteRegion>{};
    var index = 0;
    for (
      var y = margin;
      y + cellHeight <= textureHeight;
      y += cellHeight + spacing
    ) {
      for (
        var x = margin;
        x + cellWidth <= textureWidth;
        x += cellWidth + spacing
      ) {
        regions['${index++}'] = SpriteRegion(
          texture: texture,
          width: cellWidth.toDouble(),
          height: cellHeight.toDouble(),
          u0: (x + inset) / textureWidth,
          v0: (y + inset) / textureHeight,
          u1: (x + cellWidth - inset) / textureWidth,
          v1: (y + cellHeight - inset) / textureHeight,
        );
      }
    }
    return TextureAtlas(regions);
  }
}

final class SpriteImage {
  final int width;
  final int height;
  final Uint8List pixels;

  SpriteImage(this.width, this.height, this.pixels) {
    if (width <= 0 || height <= 0 || pixels.length != width * height * 4) {
      throw ArgumentError(
        'SpriteImage: ${pixels.length} bytes does not fit ${width}x$height',
      );
    }
  }

  SpriteImage crop(int x, int y, int w, int h) {
    final out = Uint8List(w * h * 4);
    for (var row = 0; row < h; row += 1) {
      final from = (y + row) * width * 4 + x * 4;
      out.setRange(row * w * 4, (row + 1) * w * 4, pixels, from);
    }
    return SpriteImage(w, h, out);
  }
}

final class AtlasBuilder {
  static const int _border = 1;

  final List<(String, SpriteImage)> _images = [];
  final Set<String> _names = {};

  void add(String name, SpriteImage image) {
    if (!_names.add(name)) {
      throw ArgumentError.value(name, 'name', 'already added');
    }
    _images.add((name, image));
  }

  void addGrid(
    String prefix,
    SpriteImage sheet, {
    required int cellWidth,
    required int cellHeight,
    int spacing = 0,
    int margin = 0,
  }) {
    var index = 0;
    for (
      var y = margin;
      y + cellHeight <= sheet.height;
      y += cellHeight + spacing
    ) {
      for (
        var x = margin;
        x + cellWidth <= sheet.width;
        x += cellWidth + spacing
      ) {
        add('$prefix/${index++}', sheet.crop(x, y, cellWidth, cellHeight));
      }
    }
  }

  TextureAtlas build(
    ResourceLibrary resources, {
    GpuTextureFilter filter = GpuTextureFilter.nearest,
    int maxSize = 4096,
    String debugLabel = 'sprite-atlas',
  }) {
    final page = pack(maxSize: maxSize);
    if (filter != GpuTextureFilter.nearest) _bleedColor(page);
    final handle = resources.registerTexture(
      width: page.size,
      height: page.size,
      minFilter: filter,
      magFilter: filter,
      wrap: GpuTextureWrap.clampToEdge,
      pixels: page.pixels,
      debugLabel: debugLabel,
    );
    final size = page.size.toDouble();
    SpriteRegion region(AtlasPlacement p) => SpriteRegion(
      texture: handle,
      width: p.width.toDouble(),
      height: p.height.toDouble(),
      u0: p.x / size,
      v0: p.y / size,
      u1: (p.x + p.width) / size,
      v1: (p.y + p.height) / size,
    );
    return TextureAtlas({
      for (final entry in page.placements.entries)
        entry.key: region(entry.value),
    }, solid: region(page.solid));
  }

  AtlasPage pack({int maxSize = 4096}) {
    const solidName = '\u0000solid';
    final solidPixels = Uint8List(4 * 4 * 4)..fillRange(0, 64, 255);
    final items = [
      (solidName, SpriteImage(4, 4, solidPixels)),
      ..._images,
    ]..sort((a, b) => b.$2.height.compareTo(a.$2.height));

    for (var size = 64; size <= maxSize; size *= 2) {
      final placements = _shelfPack(items, size);
      if (placements == null) continue;
      final pixels = Uint8List(size * size * 4);
      for (final item in items) {
        _blit(pixels, size, item.$2, placements[item.$1]!);
      }
      // The solid block is inset so filtering stays inside the white.
      final block = placements.remove(solidName)!;
      return AtlasPage._(
        size,
        pixels,
        placements,
        AtlasPlacement(block.x + 1, block.y + 1, 2, 2),
      );
    }
    throw StateError(
      'AtlasBuilder: ${_images.length} images do not fit a '
      '${maxSize}x$maxSize page',
    );
  }

  static Map<String, AtlasPlacement>? _shelfPack(
    List<(String, SpriteImage)> items,
    int size,
  ) {
    final placements = <String, AtlasPlacement>{};
    var x = 0, y = 0, shelf = 0;
    for (final (name, image) in items) {
      final w = image.width + _border * 2, h = image.height + _border * 2;
      if (w > size) return null;
      if (x + w > size) {
        x = 0;
        y += shelf;
        shelf = 0;
      }
      if (y + h > size) return null;
      placements[name] = AtlasPlacement(
        x + _border,
        y + _border,
        image.width,
        image.height,
      );
      x += w;
      if (h > shelf) shelf = h;
    }
    return placements;
  }

  static void _blit(
    Uint8List page,
    int size,
    SpriteImage image,
    AtlasPlacement at,
  ) {
    for (var row = -_border; row < image.height + _border; row += 1) {
      final sourceRow = row.clamp(0, image.height - 1);
      for (var col = -_border; col < image.width + _border; col += 1) {
        final sourceCol = col.clamp(0, image.width - 1);
        final from = (sourceRow * image.width + sourceCol) * 4;
        final to = ((at.y + row) * size + at.x + col) * 4;
        page[to] = image.pixels[from];
        page[to + 1] = image.pixels[from + 1];
        page[to + 2] = image.pixels[from + 2];
        page[to + 3] = image.pixels[from + 3];
      }
    }
  }

  static void _bleedColor(AtlasPage page) {
    final size = page.size;
    final pixels = page.pixels;
    for (var pass = 0; pass < 2; pass += 1) {
      final source = Uint8List.fromList(pixels);
      for (var y = 0; y < size; y += 1) {
        for (var x = 0; x < size; x += 1) {
          final at = (y * size + x) * 4;
          if (source[at + 3] != 0) continue;
          var r = 0, g = 0, b = 0, n = 0;
          for (var dy = -1; dy <= 1; dy += 1) {
            for (var dx = -1; dx <= 1; dx += 1) {
              final nx = x + dx, ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
              final other = (ny * size + nx) * 4;
              if (source[other + 3] == 0 &&
                  source[other] + source[other + 1] + source[other + 2] == 0) {
                continue;
              }
              r += source[other];
              g += source[other + 1];
              b += source[other + 2];
              n += 1;
            }
          }
          if (n == 0) continue;
          pixels[at] = r ~/ n;
          pixels[at + 1] = g ~/ n;
          pixels[at + 2] = b ~/ n;
        }
      }
    }
  }
}

final class AtlasPlacement {
  final int x, y, width, height;
  const AtlasPlacement(this.x, this.y, this.width, this.height);
}

final class AtlasPage {
  final int size;
  final Uint8List pixels;
  final Map<String, AtlasPlacement> placements;
  final AtlasPlacement solid;

  AtlasPage._(this.size, this.pixels, this.placements, this.solid);
}
