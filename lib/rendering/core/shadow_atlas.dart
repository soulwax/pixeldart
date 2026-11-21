import 'dart:math' as math;

/// Kind of shadow map entry packed into [ShadowAtlasAllocator] (`[S3-C]`).
enum ShadowAtlasEntryKind { directionalCascade, spot, pointFace }

/// A requested shadow map slot with screen-space priority.
final class ShadowAtlasRequest {
  final String key;
  final ShadowAtlasEntryKind kind;
  final int desiredSize;
  final double priority;

  const ShadowAtlasRequest({
    required this.key,
    required this.kind,
    required this.desiredSize,
    this.priority = 1.0,
  });
}

/// An allocated square tile inside the shadow atlas.
final class ShadowAtlasTile {
  final String key;
  final ShadowAtlasEntryKind kind;
  final int x;
  final int y;
  final int size;
  final int atlasSize;

  const ShadowAtlasTile({
    required this.key,
    required this.kind,
    required this.x,
    required this.y,
    required this.size,
    required this.atlasSize,
  });

  /// Normalized UV rect `(u, v, width, height)` in `[0, 1]`.
  double get u => x / atlasSize;
  double get v => y / atlasSize;
  double get w => size / atlasSize;
  double get h => size / atlasSize;

  bool overlaps(ShadowAtlasTile other) {
    return x < other.x + other.size &&
        x + size > other.x &&
        y < other.y + other.size &&
        y + size > other.y;
  }
}

/// Power-of-two shelf/grid shadow atlas packer for CSM cascades, spot lights,
/// and 6-face point lights (`[S3-C]`).
final class ShadowAtlasAllocator {
  final int atlasSize;
  final List<int> resolutionTiers;

  final Map<String, ShadowAtlasTile> _tiles = <String, ShadowAtlasTile>{};
  int droppedCount = 0;

  ShadowAtlasAllocator({
    this.atlasSize = 2048,
    this.resolutionTiers = const [256, 512, 1024, 2048],
  }) {
    if (atlasSize <= 0 || (atlasSize & (atlasSize - 1)) != 0) {
      throw ArgumentError.value(
        atlasSize,
        'atlasSize',
        'must be a positive power of two',
      );
    }
  }

  Map<String, ShadowAtlasTile> get tiles => Map.unmodifiable(_tiles);

  /// Chooses a power-of-two tile size from [resolutionTiers] based on
  /// normalized screen coverage (`0..1`).
  int selectResolutionForCoverage(double screenCoverage, {int? maxTier}) {
    final sorted = [...resolutionTiers]..sort();
    if (sorted.isEmpty) return 256;
    final clamped = screenCoverage.clamp(0.0, 1.0);
    final idx = (clamped * (sorted.length - 1)).round().clamp(
      0,
      sorted.length - 1,
    );
    var size = sorted[idx];
    if (maxTier != null && size > maxTier) size = maxTier;
    if (size > atlasSize) size = atlasSize;
    return size;
  }

  /// Convenience helper expanding a point light into 6 cube-face requests.
  static List<ShadowAtlasRequest> pointLightRequests({
    required int lightId,
    required int faceSize,
    double priority = 1.0,
  }) => [
    for (var face = 0; face < 6; face++)
      ShadowAtlasRequest(
        key: 'point_${lightId}_face_$face',
        kind: ShadowAtlasEntryKind.pointFace,
        desiredSize: faceSize,
        priority: priority,
      ),
  ];

  /// Packs [requests] deterministically (largest tiles first, then priority,
  /// then key) into non-overlapping power-of-two tiles.
  ///
  /// When the atlas is full, lower-priority tiles are downgraded one tier if
  /// possible, or counted in [droppedCount].
  List<ShadowAtlasTile> pack(List<ShadowAtlasRequest> requests) {
    _tiles.clear();
    droppedCount = 0;

    final minTile = resolutionTiers.isEmpty
        ? 64
        : resolutionTiers.reduce(math.min).clamp(64, atlasSize);
    final gridDim = atlasSize ~/ minTile;
    final occupied = List<bool>.filled(gridDim * gridDim, false);

    final ordered = [...requests]
      ..sort((a, b) {
        final bySize = b.desiredSize.compareTo(a.desiredSize);
        if (bySize != 0) return bySize;
        final byPrio = b.priority.compareTo(a.priority);
        if (byPrio != 0) return byPrio;
        return a.key.compareTo(b.key);
      });

    final result = <ShadowAtlasTile>[];
    for (final req in ordered) {
      var size = _clampPow2(req.desiredSize, minTile, atlasSize);
      ShadowAtlasTile? placed;
      while (size >= minTile && placed == null) {
        final cells = size ~/ minTile;
        placed = _tryPlace(req, size, cells, gridDim, minTile, occupied);
        if (placed == null) {
          size ~/= 2;
        }
      }
      if (placed != null) {
        _tiles[placed.key] = placed;
        result.add(placed);
      } else {
        droppedCount++;
      }
    }
    return result;
  }

  ShadowAtlasTile? _tryPlace(
    ShadowAtlasRequest req,
    int size,
    int cells,
    int gridDim,
    int minTile,
    List<bool> occupied,
  ) {
    for (var gy = 0; gy <= gridDim - cells; gy += cells) {
      for (var gx = 0; gx <= gridDim - cells; gx += cells) {
        if (_isFree(gx, gy, cells, gridDim, occupied)) {
          _mark(gx, gy, cells, gridDim, occupied);
          return ShadowAtlasTile(
            key: req.key,
            kind: req.kind,
            x: gx * minTile,
            y: gy * minTile,
            size: size,
            atlasSize: atlasSize,
          );
        }
      }
    }
    return null;
  }

  bool _isFree(int gx, int gy, int cells, int gridDim, List<bool> occupied) {
    for (var y = gy; y < gy + cells; y++) {
      final row = y * gridDim;
      for (var x = gx; x < gx + cells; x++) {
        if (occupied[row + x]) return false;
      }
    }
    return true;
  }

  void _mark(int gx, int gy, int cells, int gridDim, List<bool> occupied) {
    for (var y = gy; y < gy + cells; y++) {
      final row = y * gridDim;
      for (var x = gx; x < gx + cells; x++) {
        occupied[row + x] = true;
      }
    }
  }

  int _clampPow2(int v, int minV, int maxV) {
    var p = minV;
    while (p * 2 <= v && p * 2 <= maxV) {
      p *= 2;
    }
    return p.clamp(minV, maxV);
  }
}
