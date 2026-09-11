import 'package:pixeldart/rendering/math/spline.dart';
import 'package:pixeldart/rendering/math/vec.dart';

void main() {
  _testTwoPointsLinear();
  _testCentripetalSplineThroughPoints();
  _testTangentUnitLength();
  _testArcLengthParameterization();
  _testClosedSplineContinuity();
  print('Spline tests passed.');
}

void _testTwoPointsLinear() {
  final spline = CatmullRomSpline3D(
    points: [const Vec3(0, 0, 0), const Vec3(10, 20, 30)],
  );

  final mid = spline.sample(0.5);
  assert((mid.x - 5.0).abs() < 1e-5);
  assert((mid.y - 10.0).abs() < 1e-5);
  assert((mid.z - 15.0).abs() < 1e-5);
  assert(spline.totalLength > 0);
}

void _testCentripetalSplineThroughPoints() {
  final pts = [
    const Vec3(0, 0, 0),
    const Vec3(5, 10, 0),
    const Vec3(10, 5, 5),
    const Vec3(15, 0, 10),
  ];
  final spline = CatmullRomSpline3D(points: pts);

  // Spline should pass through all control points at normalized knot steps
  final pStart = spline.sample(0.0);
  assert((pStart - pts[0]).length < 1e-4, 'Spline should start at point 0');

  final pEnd = spline.sample(1.0);
  assert((pEnd - pts.last).length < 1e-4, 'Spline should end at last point');

  final p1 = spline.sample(1.0 / 3.0);
  assert((p1 - pts[1]).length < 1e-4, 'Spline should pass through point 1');

  final p2 = spline.sample(2.0 / 3.0);
  assert((p2 - pts[2]).length < 1e-4, 'Spline should pass through point 2');
}

void _testTangentUnitLength() {
  final spline = CatmullRomSpline3D(points: [
    const Vec3(0, 0, 0),
    const Vec3(10, 5, 2),
    const Vec3(20, -5, 8),
    const Vec3(30, 0, 0),
  ]);

  for (var step = 0; step <= 20; step++) {
    final t = step / 20.0;
    final tangent = spline.sampleTangent(t);
    assert(tangent.isFinite);
    assert((tangent.length - 1.0).abs() < 1e-3, 'Tangent must be normalized');
  }
}

void _testArcLengthParameterization() {
  final spline = CatmullRomSpline3D(points: [
    const Vec3(0, 0, 0),
    const Vec3(10, 0, 0),
    const Vec3(20, 0, 0),
  ]);

  final expectedLen = 20.0;
  assert((spline.totalLength - expectedLen).abs() < 0.2);

  final atMid = spline.sampleAtDistance(10.0);
  assert((atMid.x - 10.0).abs() < 0.2);
}

void _testClosedSplineContinuity() {
  final loopPts = [
    const Vec3(0, 0, 0),
    const Vec3(10, 0, 0),
    const Vec3(10, 10, 0),
    const Vec3(0, 10, 0),
  ];
  final closedSpline = CatmullRomSpline3D(points: loopPts, closed: true);

  final start = closedSpline.sample(0.0);
  final end = closedSpline.sample(1.0);
  assert((start - end).length < 1e-4, 'Closed spline must wrap around continuously');

  final tanStart = closedSpline.sampleTangent(0.0);
  final tanEnd = closedSpline.sampleTangent(1.0);
  assert((tanStart - tanEnd).length < 1e-2, 'Closed spline tangents must align at seam');
}
