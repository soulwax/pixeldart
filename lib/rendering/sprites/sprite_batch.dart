import 'dart:math' as math;
import 'dart:typed_data';

import '../api/handles.dart';

final class SpriteRegion {
  final TextureHandle? texture;

  final double width;
  final double height;

  final int uv0;
  final int uv1;

  SpriteRegion({
    required this.texture,
    required this.width,
    required this.height,
    required double u0,
    required double v0,
    required double u1,
    required double v1,
  }) : uv0 = _packUv(u0, v0),
       uv1 = _packUv(u1, v1);

  static final SpriteRegion white = SpriteRegion(
    texture: null,
    width: 1,
    height: 1,
    u0: 0,
    v0: 0,
    u1: 1,
    v1: 1,
  );

  static int _packUv(double u, double v) =>
      (u.clamp(0.0, 1.0) * 65535).round() |
      (v.clamp(0.0, 1.0) * 65535).round() << 16;
}

enum SpriteSort {
  none,

  layer,

  layerThenY,
}

enum SpriteBlend {
  alpha,

  multiply,
}

int rgba(int r, int g, int b, [int a = 255]) =>
    (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | (a & 255);

final class SpriteBatch {
  static const int recordBytes = 44;
  static const int _words = recordBytes ~/ 4;

  final SpriteSort sort;
  final String? debugLabel;

  Float32List _floats;
  Uint32List _uints;
  Float32List _sortY;
  Uint8List _layers;
  Uint16List _runKeys;
  int _length = 0;

  final List<TextureHandle?> _textures = [];
  int _version = 0;
  bool _prepared = true;

  Int32List _runs = Int32List(64);
  int _runCount = 0;

  // Sort scratch, allocated on the first sort that needs it.
  Uint32List? _keys, _order, _orderScratch;
  Uint32List? _recordScratch;
  Float32List? _sortYScratch;
  Uint8List? _layerScratch;
  Uint16List? _runKeyScratch;
  final Uint32List _counts = Uint32List(256);

  bool _cullEnabled = false;
  double _cullLeft = 0, _cullTop = 0, _cullRight = 0, _cullBottom = 0;

  int culled = 0;

  SpriteBatch({
    int initialCapacity = 1024,
    this.sort = SpriteSort.none,
    this.debugLabel,
  }) : _floats = Float32List(math.max(1, initialCapacity) * _words),
       _uints = Uint32List(0),
       _sortY = Float32List(math.max(1, initialCapacity)),
       _layers = Uint8List(math.max(1, initialCapacity)),
       _runKeys = Uint16List(math.max(1, initialCapacity)) {
    _uints = _floats.buffer.asUint32List();
  }

  int get length => _length;
  bool get isEmpty => _length == 0;

  int get version => _version;

  void clear() {
    if (_length == 0 && _textures.isEmpty) return;
    _length = 0;
    culled = 0;
    _textures.clear();
    _touch();
  }

  void setCullRect(double left, double top, double right, double bottom) {
    _cullEnabled = true;
    _cullLeft = left;
    _cullTop = top;
    _cullRight = right;
    _cullBottom = bottom;
  }

  void clearCullRect() => _cullEnabled = false;

  void _touch() {
    _version += 1;
    _prepared = false;
  }

  void _grow() {
    final capacity = _floats.length ~/ _words * 2;
    final floats = Float32List(capacity * _words)..setAll(0, _floats);
    _floats = floats;
    _uints = floats.buffer.asUint32List();
    _sortY = Float32List(capacity)..setAll(0, _sortY);
    _layers = Uint8List(capacity)..setAll(0, _layers);
    _runKeys = Uint16List(capacity)..setAll(0, _runKeys);
    _keys = _order = _orderScratch = _recordScratch = null;
    _sortYScratch = null;
    _layerScratch = null;
    _runKeyScratch = null;
  }

  int _textureIndex(TextureHandle? texture) {
    final textures = _textures;
    // Almost every sprite repeats the previous texture, and a batch rarely
    // holds more than a few.
    for (var i = textures.length - 1; i >= 0; i -= 1) {
      if (identical(textures[i], texture) || textures[i] == texture) return i;
    }
    if (textures.length >= 32767) {
      throw StateError('SpriteBatch: too many distinct textures');
    }
    textures.add(texture);
    return textures.length - 1;
  }

  void draw(
    SpriteRegion region,
    double x,
    double y, {
    double? width,
    double? height,
    double scaleX = 1,
    double scaleY = 1,
    double originX = 0.5,
    double originY = 0.5,
    double rotation = 0,
    bool flipX = false,
    bool flipY = false,
    int color = 0xFFFFFFFF,
    double additive = 0,
    double glow = 0,
    double flash = 0,
    double z = 0,
    int layer = 0,
    SpriteBlend blend = SpriteBlend.alpha,
  }) {
    final w = (width ?? region.width) * scaleX;
    final h = (height ?? region.height) * scaleY;
    if (_cullEnabled) {
      final reach = w.abs() + h.abs();
      if (x + reach < _cullLeft ||
          x - reach > _cullRight ||
          y + reach < _cullTop ||
          y - reach > _cullBottom) {
        culled += 1;
        return;
      }
    }
    if ((_length + 1) * _words > _floats.length) _grow();

    final localX = -originX * w, localY = -originY * h;
    double ax = w, ay = 0, bx = 0, by = h, tx = x + localX, ty = y + localY;
    if (rotation != 0) {
      final c = math.cos(rotation), s = math.sin(rotation);
      ax = c * w;
      ay = s * w;
      bx = -s * h;
      by = c * h;
      tx = x + c * localX - s * localY;
      ty = y + s * localX + c * localY;
    }

    var uv0 = region.uv0, uv1 = region.uv1;
    if (flipX) {
      final a = uv0, b = uv1;
      uv0 = (a & 0xFFFF0000) | (b & 0xFFFF);
      uv1 = (b & 0xFFFF0000) | (a & 0xFFFF);
    }
    if (flipY) {
      final a = uv0, b = uv1;
      uv0 = (b & 0xFFFF0000) | (a & 0xFFFF);
      uv1 = (a & 0xFFFF0000) | (b & 0xFFFF);
    }

    final o = _length * _words;
    final f = _floats, u = _uints;
    f[o] = ax;
    f[o + 1] = ay;
    f[o + 2] = bx;
    f[o + 3] = by;
    f[o + 4] = tx;
    f[o + 5] = ty;
    f[o + 6] = z;
    u[o + 7] = uv0;
    u[o + 8] = uv1;
    // 0xRRGGBBAA to little-endian byte order R, G, B, A.
    u[o + 9] =
        (color >>> 24) & 0xFF |
        (color >>> 8) & 0xFF00 |
        (color & 0xFF00) << 8 |
        (color & 0xFF) << 24;
    u[o + 10] = additive == 0 && glow == 0 && flash == 0
        ? 0
        : _unit8(additive) | _unit8(glow) << 8 | _unit8(flash) << 16;

    _sortY[_length] = y;
    _layers[_length] = layer;
    _runKeys[_length] =
        _textureIndex(region.texture) << 1 |
        (blend == SpriteBlend.multiply ? 1 : 0);
    _length += 1;
    _touch();
  }

  static int _unit8(double v) => (v.clamp(0.0, 1.0) * 255).round();

  void drawRect(
    double x,
    double y,
    double width,
    double height, {
    SpriteRegion? region,
    int color = 0xFFFFFFFF,
    double additive = 0,
    double glow = 0,
    double z = 0,
    int layer = 0,
    SpriteBlend blend = SpriteBlend.alpha,
  }) => draw(
    region ?? SpriteRegion.white,
    x,
    y,
    width: width,
    height: height,
    originX: 0,
    originY: 0,
    color: color,
    additive: additive,
    glow: glow,
    z: z,
    layer: layer,
    blend: blend,
  );

  void drawLine(
    double x0,
    double y0,
    double x1,
    double y1, {
    double thickness = 1,
    SpriteRegion? region,
    int color = 0xFFFFFFFF,
    double additive = 0,
    double glow = 0,
    double z = 0,
    int layer = 0,
  }) {
    final dx = x1 - x0, dy = y1 - y0;
    draw(
      region ?? SpriteRegion.white,
      x0,
      y0,
      width: math.sqrt(dx * dx + dy * dy),
      height: thickness,
      originX: 0,
      originY: 0.5,
      rotation: math.atan2(dy, dx),
      color: color,
      additive: additive,
      glow: glow,
      z: z,
      layer: layer,
    );
  }

  void prepare() {
    if (_prepared) return;
    _prepared = true;
    if (sort != SpriteSort.none && _length > 1) _sortRecords();
    _buildRuns();
  }

  Float32List get records => _floats;

  int get runCount => _runCount;

  TextureHandle? runTexture(int i) => _textures[_runs[i * 3] >> 1];
  SpriteBlend runBlend(int i) =>
      _runs[i * 3] & 1 == 1 ? SpriteBlend.multiply : SpriteBlend.alpha;
  int runFirst(int i) => _runs[i * 3 + 1];
  int runLength(int i) => _runs[i * 3 + 2];

  void _buildRuns() {
    _runCount = 0;
    if (_length == 0) return;
    var first = 0;
    for (var i = 1; i <= _length; i += 1) {
      if (i < _length && _runKeys[i] == _runKeys[first]) continue;
      final at = _runCount * 3;
      if (at + 3 > _runs.length) {
        _runs = Int32List(_runs.length * 2)..setAll(0, _runs);
      }
      _runs[at] = _runKeys[first];
      _runs[at + 1] = first;
      _runs[at + 2] = i - first;
      _runCount += 1;
      first = i;
    }
  }

  void _sortRecords() {
    final n = _length;
    final capacity = _sortY.length;
    final keys = _keys ??= Uint32List(capacity);
    var order = _order ??= Uint32List(capacity);
    var scratch = _orderScratch ??= Uint32List(capacity);
    final sortByY = sort == SpriteSort.layerThenY;
    final yBits = _sortY.buffer.asUint32List();
    var ordered = true;
    var previousLayer = -1;
    var previousY = 0;
    for (var i = 0; i < n; i += 1) {
      final bits = yBits[i];
      final yKey = sortByY
          ? (bits & 0x80000000 != 0 ? (~bits & 0xFFFFFFFF) : bits ^ 0x80000000)
          : 0;
      keys[i] = yKey;
      order[i] = i;
      final layer = _layers[i];
      if (layer < previousLayer ||
          (sortByY && layer == previousLayer && yKey < previousY)) {
        ordered = false;
      }
      previousLayer = layer;
      previousY = yKey;
    }
    if (ordered) return;

    final counts = _counts;
    for (var pass = 0; pass < (sortByY ? 5 : 1); pass += 1) {
      final shift = pass * 8;
      counts.fillRange(0, 256, 0);
      for (var i = 0; i < n; i += 1) {
        final key = pass == 4 || !sortByY
            ? _layers[i]
            : (keys[i] >>> shift) & 255;
        counts[key] += 1;
      }
      final firstKey = pass == 4 || !sortByY
          ? _layers[0]
          : (keys[0] >>> shift) & 255;
      if (counts[firstKey] == n) continue;
      var total = 0;
      for (var b = 0; b < 256; b += 1) {
        final c = counts[b];
        counts[b] = total;
        total += c;
      }
      for (var i = 0; i < n; i += 1) {
        final index = order[i];
        final byte = pass == 4 || !sortByY
            ? _layers[index]
            : (keys[index] >>> shift) & 255;
        scratch[counts[byte]] = index;
        counts[byte] += 1;
      }
      final swap = order;
      order = scratch;
      scratch = swap;
    }

    final words = _recordScratch ??= Uint32List(_floats.length);
    final u = _uints;
    words.setRange(0, n * _words, u);
    final sortY = (_sortYScratch ??= Float32List(capacity))
      ..setRange(0, n, _sortY);
    final layers = (_layerScratch ??= Uint8List(capacity))
      ..setRange(0, n, _layers);
    final runKeys = (_runKeyScratch ??= Uint16List(capacity))
      ..setRange(0, n, _runKeys);
    for (var i = 0; i < n; i += 1) {
      final from = order[i];
      _sortY[i] = sortY[from];
      _layers[i] = layers[from];
      _runKeys[i] = runKeys[from];
      u.setRange(i * _words, (i + 1) * _words, words, from * _words);
    }
    _order = order;
    _orderScratch = scratch;
  }
}
