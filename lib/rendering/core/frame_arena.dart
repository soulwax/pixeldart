import 'dart:typed_data';

/// Reusable per-frame scratch memory arena to eliminate hot-loop heap allocations.
final class FrameArena {
  Float32List _floatBuffer;
  int _floatOffset = 0;

  Int32List _intBuffer;
  int _intOffset = 0;

  final List<List<dynamic>> _listPool = [];

  FrameArena({int initialFloats = 4096, int initialInts = 1024})
      : _floatBuffer = Float32List(initialFloats),
        _intBuffer = Int32List(initialInts);

  int get allocatedFloats => _floatOffset;
  int get allocatedInts => _intOffset;
  int get floatCapacity => _floatBuffer.length;
  int get intCapacity => _intBuffer.length;

  /// Requests a contiguous [Float32List] view of [count] floats from the arena.
  Float32List requestFloats(int count) {
    if (count <= 0) return _emptyFloats;
    if (_floatOffset + count > _floatBuffer.length) {
      final newCapacity = (_floatOffset + count) * 2;
      final newBuffer = Float32List(newCapacity);
      newBuffer.setRange(0, _floatOffset, _floatBuffer);
      _floatBuffer = newBuffer;
    }
    final view = Float32List.sublistView(
      _floatBuffer,
      _floatOffset,
      _floatOffset + count,
    );
    _floatOffset += count;
    return view;
  }

  /// Requests a contiguous [Int32List] view of [count] ints from the arena.
  Int32List requestInts(int count) {
    if (count <= 0) return _emptyInts;
    if (_intOffset + count > _intBuffer.length) {
      final newCapacity = (_intOffset + count) * 2;
      final newBuffer = Int32List(newCapacity);
      newBuffer.setRange(0, _intOffset, _intBuffer);
      _intBuffer = newBuffer;
    }
    final view = Int32List.sublistView(
      _intBuffer,
      _intOffset,
      _intOffset + count,
    );
    _intOffset += count;
    return view;
  }

  /// Borrows a cleared [List<T>] from the arena list pool.
  List<T> requestList<T>() {
    if (_listPool.isNotEmpty) {
      final list = _listPool.removeLast();
      list.clear();
      return list.cast<T>();
    }
    return <T>[];
  }

  /// Returns a borrowed list to the pool.
  void releaseList(List<dynamic> list) {
    list.clear();
    _listPool.add(list);
  }

  /// Resets arena allocation offsets at the start or end of a frame.
  void reset() {
    _floatOffset = 0;
    _intOffset = 0;
  }

  static final Float32List _emptyFloats = Float32List(0);
  static final Int32List _emptyInts = Int32List(0);
}
