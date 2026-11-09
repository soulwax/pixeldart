import 'dart:typed_data';

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/core/frame_queue.dart';

final TextureHandle _textureA = const TextureHandle(1, 0);
final TextureHandle _textureB = const TextureHandle(2, 0);

final SpriteRegion _a = SpriteRegion(
  texture: _textureA,
  width: 16,
  height: 8,
  u0: 0,
  v0: 0,
  u1: 0.5,
  v1: 1,
);
final SpriteRegion _b = SpriteRegion(
  texture: _textureB,
  width: 16,
  height: 16,
  u0: 0.5,
  v0: 0,
  u1: 1,
  v1: 1,
);

double _tx(SpriteBatch b, int i) => b.records[i * 11 + 4];
double _ty(SpriteBatch b, int i) => b.records[i * 11 + 5];

void _close(double a, double b, String what) {
  if ((a - b).abs() > 1e-3) throw StateError('$what: $a != $b');
}

void _check(bool ok, String what) {
  if (!ok) throw StateError(what);
}

void main() {
  // Placement: the default origin centres the sprite on the point.
  final placed = SpriteBatch()..draw(_a, 100, 50);
  _close(_tx(placed, 0), 92, 'centred x');
  _close(_ty(placed, 0), 46, 'centred y');
  _close(placed.records[0], 16, 'x edge');
  _close(placed.records[3], 8, 'y edge');

  // Rotation pivots about the origin: a quarter turn keeps the centre.
  final turned = SpriteBatch()..draw(_a, 0, 0, rotation: 1.5707963267948966);
  final f = turned.records;
  _close(f[4] + (f[0] + f[2]) / 2, 0, 'rotated centre x');
  _close(f[5] + (f[1] + f[3]) / 2, 0, 'rotated centre y');

  // Colour reaches the GPU as R, G, B, A bytes whatever the channels hold.
  final tinted = SpriteBatch()..draw(_a, 0, 0, color: rgba(255, 128, 1, 200));
  final bytes = tinted.records.buffer.asUint8List();
  _check(
    bytes[36] == 255 && bytes[37] == 128 && bytes[38] == 1 && bytes[39] == 200,
    'colour byte order: ${bytes.sublist(36, 40)}',
  );

  // flipX swaps only U.
  final flipped = SpriteBatch()..draw(_a, 0, 0, flipX: true);
  final uv = flipped.records.buffer.asUint16List();
  _check(uv[14] == 32768 && uv[16] == 0, 'flipX U: ${uv[14]}, ${uv[16]}');
  _check(uv[15] == 0 && uv[17] == 65535, 'flipX keeps V: ${uv[15]}, ${uv[17]}');

  // Runs split on texture and blend, in order, and cover every sprite.
  final runs = SpriteBatch()
    ..draw(_a, 0, 0)
    ..draw(_a, 1, 0)
    ..draw(_b, 2, 0)
    ..draw(_b, 3, 0, blend: SpriteBlend.multiply)
    ..prepare();
  _check(runs.runCount == 3, 'run count ${runs.runCount}');
  _check(runs.runTexture(0) == _textureA && runs.runLength(0) == 2, 'run 0');
  _check(runs.runFirst(1) == 2 && runs.runTexture(1) == _textureB, 'run 1');
  _check(runs.runBlend(2) == SpriteBlend.multiply, 'run 2 blend');

  // Y-sort: layer dominates, then y, and equal keys keep submission order.
  final sorted = SpriteBatch(sort: SpriteSort.layerThenY)
    ..draw(_a, 1, 30)
    ..draw(_a, 2, 10)
    ..draw(_a, 3, 10)
    ..draw(_a, 4, 0, layer: 1)
    ..prepare();
  final order = [for (var i = 0; i < 4; i += 1) _tx(sorted, i) + 8];
  _check(order.join(',') == '2.0,3.0,1.0,4.0', 'sort order $order');

  // Draws added to an already-sorted batch sort with the rest.
  sorted
    ..draw(_a, 5, -5)
    ..prepare();
  final resorted = [for (var i = 0; i < 5; i += 1) _tx(sorted, i) + 8];
  _check(resorted.join(',') == '5.0,2.0,3.0,1.0,4.0', 'resort $resorted');

  // Widely separated coordinates must not collapse nearby Y values into a
  // single sort bucket. Equal stored Y values keep submission order.
  final precise = SpriteBatch(sort: SpriteSort.layerThenY)
    ..draw(_a, 1, 100000)
    ..draw(_a, 2, 0.002)
    ..draw(_a, 3, 0.001)
    ..draw(_a, 4, -100000)
    ..prepare();
  final preciseOrder = [for (var i = 0; i < 4; i += 1) _tx(precise, i) + 8];
  _check(preciseOrder.join(',') == '4.0,3.0,2.0,1.0', 'precise Y order');

  // Sort must stay correct across growth, with far more than one radix byte.
  final big = SpriteBatch(initialCapacity: 2, sort: SpriteSort.layerThenY);
  for (var i = 0; i < 5000; i += 1) {
    big.draw(_a, i.toDouble(), ((i * 7919) % 4999).toDouble());
  }
  big.prepare();
  var lastY = double.negativeInfinity;
  for (var i = 0; i < big.length; i += 1) {
    final y = _ty(big, i) + 4;
    _check(y >= lastY - 0.1, 'big sort at $i');
    if (y > lastY) lastY = y;
  }

  // Version moves only on change, and an unchanged batch stays prepared.
  final versioned = SpriteBatch()..draw(_a, 0, 0);
  final before = versioned.version;
  versioned.prepare();
  _check(versioned.version == before, 'prepare must not bump version');
  versioned.draw(_a, 0, 0);
  _check(versioned.version != before, 'draw must bump version');

  // Culling skips only sprites that are really outside.
  final culled = SpriteBatch()
    ..setCullRect(0, 0, 100, 100)
    ..draw(_a, 50, 50)
    ..draw(_a, 500, 50);
  _check(culled.length == 1 && culled.culled == 1, 'cull');

  // A tile map entirely outside the camera must submit no edge chunk.
  final tiles = TileLayer(
    columns: 8,
    rows: 8,
    tileWidth: 16,
    tileHeight: 16,
    tileset: [_a],
  )..setTile(0, 0, 0);
  final tileCamera = Camera2D(designWidth: 32, designHeight: 32)
    ..setViewport(32, 32)
    ..x = -1000
    ..y = -1000;
  final queue = FrameQueue()..beginFrame();
  _check(tiles.drawTo(queue, tileCamera) == 0, 'off-map tile submissions');
  _check(queue.spriteCount == 0, 'off-map queued sprites');
  tileCamera
    ..x = 8
    ..y = 8;
  _check(tiles.drawTo(queue, tileCamera) == 1, 'visible tile chunk');
  queue.endFrame();

  // Camera: integer fit, and screen/world are inverses, rotated or not.
  final camera = Camera2D(designWidth: 320, designHeight: 180)
    ..setViewport(1000, 600);
  _close(camera.pixelsPerUnit, 3, 'integer fit');
  camera
    ..x = 40
    ..y = -12
    ..zoom = 2
    ..rotation = 0.6;
  final world = camera.screenToWorld(123, 456);
  final back = camera.worldToScreen(world.x, world.y);
  _close(back.x, 123, 'round trip x');
  _close(back.y, 456, 'round trip y');

  // The matrix agrees with worldToScreen; world +Y is down on screen.
  camera.snapToPixels = false;
  final m = camera.viewProjection;
  final clipX = m[0] * 90 + m[4] * 70 + m[12];
  final clipY = m[1] * 90 + m[5] * 70 + m[13];
  final screen = camera.worldToScreen(90, 70);
  _close((clipX * 0.5 + 0.5) * 1000, screen.x, 'matrix x');
  _close((0.5 - clipY * 0.5) * 600, screen.y, 'matrix y');

  // Atlas: placed images are copied, and borders repeat their edges.
  final red = SpriteImage(
    2,
    2,
    Uint8List.fromList([
      for (var i = 0; i < 4; i += 1) ...[255, 0, 0, 255],
    ]),
  );
  final page = (AtlasBuilder()..add('red', red)).pack();
  final at = page.placements['red']!;
  int alpha(int x, int y) => page.pixels[(y * page.size + x) * 4 + 3];
  int r(int x, int y) => page.pixels[(y * page.size + x) * 4];
  _check(r(at.x, at.y) == 255 && alpha(at.x, at.y) == 255, 'blit');
  _check(r(at.x - 1, at.y) == 255, 'left border extruded');
  _check(r(at.x + 2, at.y + 1) == 255, 'right border extruded');

  // Packed images never overlap, including their borders.
  final many = AtlasBuilder();
  for (var i = 0; i < 300; i += 1) {
    final side = 3 + i % 29;
    many.add('$i', SpriteImage(side, side, Uint8List(side * side * 4)));
  }
  final rects = many.pack().placements.values.toList();
  for (var i = 0; i < rects.length; i += 1) {
    for (var j = i + 1; j < rects.length; j += 1) {
      final a = rects[i], b = rects[j];
      final apart =
          a.x + a.width + 2 <= b.x ||
          b.x + b.width + 2 <= a.x ||
          a.y + a.height + 2 <= b.y ||
          b.y + b.height + 2 <= a.y;
      _check(apart, 'overlap between $i and $j');
    }
  }

  // Bitmap font: alignment and measuring.
  final font = BitmapFont(
    glyphs: {65: BitmapGlyph(_a, advance: 10)},
    lineHeight: 12,
  );
  _close(font.measure('AA\nA', scale: 2), 40, 'measure');
  final text = SpriteBatch();
  font.draw(text, 'AA', 100, 0, alignX: 1);
  _close(_tx(text, 0), 80, 'right aligned');
  _close(_tx(text, 1), 90, 'pen advance');

  print('sprite batch checks passed.');
}
