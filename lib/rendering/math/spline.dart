import 'dart:math' as math;

import 'vec.dart';

/// Centripetal Catmull-Rom 3D Spline (\alpha = 0.5).
///
/// Guarantees that the curve is free of cusps and self-intersections,
/// producing smooth, natural motion trajectories for camera flight paths and
/// tubular geometric extrusions.
final class CatmullRomSpline3D {
  final List<Vec3> controlPoints;
  final bool closed;
  final List<double> _chordLengths = [];
  double _totalLength = 0.0;

  CatmullRomSpline3D({
    required List<Vec3> points,
    this.closed = false,
  }) : controlPoints = List.unmodifiable(points) {
    if (controlPoints.length < 2) {
      throw ArgumentError('CatmullRomSpline3D requires at least 2 control points');
    }
    _computeArcLengths();
  }

  /// Total approximate arc-length of the spline in world units.
  double get totalLength => _totalLength;

  /// Samples the 3D position along the spline at normalized progress [t] in [0, 1].
  Vec3 sample(double t) {
    final clampedT = closed ? (t % 1.0 + 1.0) % 1.0 : t.clamp(0.0, 1.0);
    final count = controlPoints.length;

    if (count == 2) {
      return Vec3.lerp(controlPoints[0], controlPoints[1], clampedT);
    }

    final segments = closed ? count : count - 1;
    final scaledT = clampedT * segments;
    final segIndex = math.min(scaledT.floor(), segments - 1);
    final localT = scaledT - segIndex;

    final p0 = _getPoint(segIndex - 1);
    final p1 = _getPoint(segIndex);
    final p2 = _getPoint(segIndex + 1);
    final p3 = _getPoint(segIndex + 2);

    return _evaluateSegment(p0, p1, p2, p3, localT);
  }

  /// Samples the normalized tangent direction along the spline at [t] in [0, 1].
  Vec3 sampleTangent(double t) {
    const dt = 1e-4;
    final t0 = math.max(0.0, t - dt);
    final t1 = math.min(1.0, t + dt);
    final p0 = sample(t0);
    final p1 = sample(t1);
    final delta = p1 - p0;
    return delta.lengthSquared > 1e-10 ? delta.normalized : const Vec3(0, 0, 1);
  }

  /// Samples position along the spline at a specific arc distance [distance] in metres.
  Vec3 sampleAtDistance(double distance) {
    if (_totalLength <= 1e-6) return controlPoints.first;
    final targetDist = closed
        ? (distance % _totalLength + _totalLength) % _totalLength
        : distance.clamp(0.0, _totalLength);

    // Binary search chord length table
    var low = 0;
    var high = _chordLengths.length - 1;
    while (low < high) {
      final mid = (low + high) >> 1;
      if (_chordLengths[mid] < targetDist) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    final i = math.max(1, low);
    final d0 = _chordLengths[i - 1];
    final d1 = _chordLengths[i];
    final segFraction = (d1 - d0) > 1e-6 ? (targetDist - d0) / (d1 - d0) : 0.0;
    final samples = _chordLengths.length - 1;
    final t = ((i - 1) + segFraction) / samples;

    return sample(t);
  }

  Vec3 _getPoint(int index) {
    final count = controlPoints.length;
    if (closed) {
      return controlPoints[(index % count + count) % count];
    } else {
      if (index < 0) {
        // Linear extrapolation before start
        return controlPoints[0] * 2.0 - controlPoints[1];
      }
      if (index >= count) {
        // Linear extrapolation after end
        return controlPoints[count - 1] * 2.0 - controlPoints[count - 2];
      }
      return controlPoints[index];
    }
  }

  /// Barry and Goldman's pyramidal centripetal Catmull-Rom formulation (\alpha = 0.5)
  Vec3 _evaluateSegment(Vec3 p0, Vec3 p1, Vec3 p2, Vec3 p3, double t) {
    const alpha = 0.5;

    double knot(Vec3 a, Vec3 b) {
      final dist = (b - a).length;
      return math.pow(math.max(1e-4, dist), alpha).toDouble();
    }

    final t0 = 0.0;
    final t1 = t0 + knot(p0, p1);
    final t2 = t1 + knot(p1, p2);
    final t3 = t2 + knot(p2, p3);

    final param = t1 + t * (t2 - t1);

    final a1 = p0 * ((t1 - param) / (t1 - t0)) + p1 * ((param - t0) / (t1 - t0));
    final a2 = p1 * ((t2 - param) / (t2 - t1)) + p2 * ((param - t1) / (t2 - t1));
    final a3 = p2 * ((t3 - param) / (t3 - t2)) + p3 * ((param - t2) / (t3 - t2));

    final b1 = a1 * ((t2 - param) / (t2 - t0)) + a2 * ((param - t0) / (t2 - t0));
    final b2 = a2 * ((t3 - param) / (t3 - t1)) + a3 * ((param - t1) / (t3 - t1));

    return b1 * ((t2 - param) / (t2 - t1)) + b2 * ((param - t1) / (t2 - t1));
  }

  void _computeArcLengths() {
    _chordLengths.clear();
    _chordLengths.add(0.0);
    const steps = 200;
    var accumulated = 0.0;
    var prev = sample(0.0);

    for (var i = 1; i <= steps; i++) {
      final curr = sample(i / steps);
      accumulated += (curr - prev).length;
      _chordLengths.add(accumulated);
      prev = curr;
    }
    _totalLength = accumulated;
  }
}
