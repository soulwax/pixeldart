import 'package:pixeldart/rendering/geometry/primitives.dart';
import 'package:pixeldart/rendering/math/spline.dart';
import 'package:pixeldart/rendering/math/vec.dart';

void main() {
  _testLinearTube();
  _testSplineTube();
  _testClosedLoopTube();
  _testInvalidArguments();
  print('Tube path geometry tests passed.');
}

void _testLinearTube() {
  final points = [
    const Vec3(0, 0, 0),
    const Vec3(0, 5, 0),
    const Vec3(0, 10, 0),
    const Vec3(0, 15, 0),
  ];
  const radius = 0.5;
  const radialSegments = 8;

  final tube = Primitives.tubePath(
    spine: points,
    radius: radius,
    radialSegments: radialSegments,
  );
  tube.validate();

  final expectedVertices = points.length * (radialSegments + 1);
  final expectedIndices = (points.length - 1) * radialSegments * 6;

  assert(tube.vertexCount == expectedVertices, 'vertex count mismatch');
  assert(tube.indices?.length == expectedIndices, 'index count mismatch');

  // Bounds along Y should be roughly [0, 15], and X, Z within [-0.5, 0.5]
  assert(tube.localBounds.min.y <= 0.0);
  assert(tube.localBounds.max.y >= 15.0);
  assert(tube.localBounds.min.x <= -radius + 1e-4);
  assert(tube.localBounds.max.x >= radius - 1e-4);
}

void _testSplineTube() {
  final spline = CatmullRomSpline3D(
    points: const [
      Vec3(0, 0, 0),
      Vec3(5, 2, 5),
      Vec3(10, 0, 10),
      Vec3(15, -2, 5),
      Vec3(20, 0, 0),
    ],
    closed: false,
  );

  const sampleCount = 30;
  final samples = <Vec3>[];
  for (var i = 0; i <= sampleCount; i++) {
    samples.add(spline.sample(i / sampleCount));
  }

  const radius = 0.4;
  const segments = 12;
  final tube = Primitives.tubePath(
    spine: samples,
    radius: radius,
    radialSegments: segments,
  );
  tube.validate();

  assert(tube.vertexCount == (sampleCount + 1) * (segments + 1));
  assert(tube.indices?.length == sampleCount * segments * 6);
  assert(tube.localBounds.min.x >= -radius - 1e-3);
  assert(tube.localBounds.max.x <= 20.0 + radius + 1e-3);
}

void _testClosedLoopTube() {
  final spline = CatmullRomSpline3D(
    points: const [
      Vec3(0, 0, 0),
      Vec3(10, 0, 0),
      Vec3(10, 0, 10),
      Vec3(0, 0, 10),
    ],
    closed: true,
  );

  const sampleCount = 20;
  final samples = <Vec3>[];
  for (var i = 0; i <= sampleCount; i++) {
    samples.add(spline.sample(i / sampleCount));
  }

  final tube = Primitives.tubePath(
    spine: samples,
    radius: 0.25,
    radialSegments: 6,
    closed: true,
  );
  tube.validate();
  assert(tube.vertexCount > 0);
}

void _testInvalidArguments() {
  var threw = false;
  try {
    Primitives.tubePath(spine: [const Vec3(0, 0, 0)], radius: 1.0);
  } catch (_) {
    threw = true;
  }
  assert(threw, 'points < 2 must throw');

  threw = false;
  try {
    Primitives.tubePath(
      spine: [const Vec3(0, 0, 0), const Vec3(1, 0, 0)],
      radius: 0.0,
    );
  } catch (_) {
    threw = true;
  }
  assert(threw, 'radius <= 0 must throw');

  threw = false;
  try {
    Primitives.tubePath(
      spine: [const Vec3(0, 0, 0), const Vec3(1, 0, 0)],
      radius: 0.5,
      radialSegments: 2,
    );
  } catch (_) {
    threw = true;
  }
  assert(threw, 'radialSegments < 3 must throw');
}
