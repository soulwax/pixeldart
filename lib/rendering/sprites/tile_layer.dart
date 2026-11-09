import 'dart:typed_data';

import '../api/scene.dart';
import 'camera_2d.dart';
import 'sprite_batch.dart';
import 'sprite_encoder.dart';

final class TileLayer {
  final int columns;
  final int rows;
  final double tileWidth;
  final double tileHeight;

  final double originX;
  final double originY;
  final int chunkSize;

  final List<SpriteRegion> tileset;

  final Int32List _tiles;
  final List<SpriteBatch?> _chunks;
  final Uint8List _dirty;
  final int _chunkColumns;
  final int _chunkRows;

  TileLayer({
    required this.columns,
    required this.rows,
    required this.tileWidth,
    required this.tileHeight,
    required this.tileset,
    this.originX = 0,
    this.originY = 0,
    this.chunkSize = 32,
  }) : _tiles = Int32List(columns * rows)..fillRange(0, columns * rows, -1),
       _chunkColumns = (columns + chunkSize - 1) ~/ chunkSize,
       _chunkRows = (rows + chunkSize - 1) ~/ chunkSize,
       _chunks = List.filled(
         ((columns + chunkSize - 1) ~/ chunkSize) *
             ((rows + chunkSize - 1) ~/ chunkSize),
         null,
       ),
       _dirty = Uint8List(
         ((columns + chunkSize - 1) ~/ chunkSize) *
             ((rows + chunkSize - 1) ~/ chunkSize),
       ) {
    if (columns <= 0 ||
        rows <= 0 ||
        chunkSize <= 0 ||
        tileWidth <= 0 ||
        tileHeight <= 0) {
      throw ArgumentError('TileLayer dimensions must be > 0');
    }
    _dirty.fillRange(0, _dirty.length, 1);
  }

  double get width => columns * tileWidth;
  double get height => rows * tileHeight;

  int tileAt(int column, int row) {
    if (column < 0 || row < 0 || column >= columns || row >= rows) return -1;
    return _tiles[row * columns + column];
  }

  void setTile(int column, int row, int id) {
    if (column < 0 || row < 0 || column >= columns || row >= rows) {
      throw RangeError('TileLayer.setTile($column, $row) is out of range');
    }
    final at = row * columns + column;
    if (_tiles[at] == id) return;
    _tiles[at] = id;
    _dirty[(row ~/ chunkSize) * _chunkColumns + column ~/ chunkSize] = 1;
  }

  void fill(int Function(int column, int row) tile) {
    for (var row = 0; row < rows; row += 1) {
      for (var column = 0; column < columns; column += 1) {
        setTile(column, row, tile(column, row));
      }
    }
  }

  int drawTo(
    RenderEncoder encoder,
    Camera2D camera, {
    SpriteStage stage = SpriteStage.world,
  }) {
    if (camera.right <= originX ||
        camera.left >= originX + width ||
        camera.bottom <= originY ||
        camera.top >= originY + height) {
      return 0;
    }
    final chunkW = chunkSize * tileWidth, chunkH = chunkSize * tileHeight;
    final firstColumn = _clamp(
      ((camera.left - originX) / chunkW).floor(),
      _chunkColumns,
    );
    final lastColumn = _clamp(
      ((camera.right - originX) / chunkW).floor(),
      _chunkColumns,
    );
    final firstRow = _clamp(
      ((camera.top - originY) / chunkH).floor(),
      _chunkRows,
    );
    final lastRow = _clamp(
      ((camera.bottom - originY) / chunkH).floor(),
      _chunkRows,
    );

    var submitted = 0;
    for (var cy = firstRow; cy <= lastRow; cy += 1) {
      for (var cx = firstColumn; cx <= lastColumn; cx += 1) {
        final index = cy * _chunkColumns + cx;
        if (_dirty[index] == 1) _rebuild(cx, cy, index);
        final chunk = _chunks[index];
        if (chunk == null || chunk.isEmpty) continue;
        encoder.drawSprites(chunk, camera, stage: stage);
        submitted += 1;
      }
    }
    return submitted;
  }

  static int _clamp(int value, int count) =>
      value < 0 ? 0 : (value >= count ? count - 1 : value);

  void _rebuild(int cx, int cy, int index) {
    _dirty[index] = 0;
    final chunk = _chunks[index] ??= SpriteBatch(
      initialCapacity: chunkSize * chunkSize,
      debugLabel: 'tile-chunk',
    );
    chunk.clear();
    final endRow = (cy + 1) * chunkSize, endColumn = (cx + 1) * chunkSize;
    for (var row = cy * chunkSize; row < endRow && row < rows; row += 1) {
      for (
        var column = cx * chunkSize;
        column < endColumn && column < columns;
        column += 1
      ) {
        final id = _tiles[row * columns + column];
        if (id < 0 || id >= tileset.length) continue;
        chunk.draw(
          tileset[id],
          originX + column * tileWidth,
          originY + row * tileHeight,
          width: tileWidth,
          height: tileHeight,
          originX: 0,
          originY: 0,
        );
      }
    }
  }
}
