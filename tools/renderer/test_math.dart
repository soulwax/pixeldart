import 'dart:math' as math;

import 'package:pixeldart/rendering/rendering.dart';

void main() {
  _transformOrder();
  _inverseTransposeNormals();
  _projectionDepthReconstruction();
  _transformedAabb();
  _frustumEdgeCases();
  _quatTransform();
  print('Renderer math fixtures passed.');
}

void _transformOrder() {
  final t = Mat4.translation(const Vec3(3, 0, 0));
  final r = Mat4.rotationZ(math.pi / 2);
  final combined = t * r;

  final direct = combined.transformPoint(const Vec3(2, 0, 0));
  final stepwise = t.transformPoint(r.transformPoint(const Vec3(2, 0, 0)));
  _nearVec(direct, stepwise);
  _nearVec(direct, const Vec3(3, 2, 0));

  final shaderFixture = _shaderMultiply(combined.m, 2, 0, 0, 1);
  _nearVec(direct, shaderFixture);
}

void _inverseTransposeNormals() {
  final rigid =
      Mat4.rotationY(math.pi / 3) * Mat4.translation(const Vec3(1, 2, 3));
  final rigidNormalMatrix = rigid.normalMatrix();
  final n = const Vec3(0, 1, 0);
  _nearVec(rigidNormalMatrix.transformDir(n), rigid.transformDir(n).normalized);

  final nonUniform = Mat4.fromColumnMajor([
    2,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    4,
    0,
    0,
    0,
    0,
    1,
  ]);
  final tangent = const Vec3(1, 0, 1).normalized;
  final scaledTangent = nonUniform.transformDir(tangent);
  final surfaceNormal = const Vec3(1, 0, -1).normalized;
  if (tangent.dot(surfaceNormal).abs() > 1e-9) {
    throw StateError('fixture tangent/normal must start orthogonal');
  }
  final wrongNormal = nonUniform.transformDir(surfaceNormal).normalized;
  if (scaledTangent.normalized.dot(wrongNormal).abs() < 1e-6) {
    throw StateError(
      'fixture expected non-orthogonality under a naive transform',
    );
  }
  final correctNormal = nonUniform
      .normalMatrix()
      .transformDir(surfaceNormal)
      .normalized;
  final cosAngle = scaledTangent.normalized.dot(correctNormal).abs();
  if (cosAngle > 1e-5) {
    throw StateError(
      'normalMatrix must keep transformed tangent/normal orthogonal, got cos=$cosAngle',
    );
  }
}

void _projectionDepthReconstruction() {
  const near = 0.5;
  const far = 40.0;
  final proj = Mat4.perspective(
    fovYRadians: math.pi / 3,
    aspect: 16 / 9,
    near: near,
    far: far,
  );

  for (final viewZ in [-near, -5.0, -20.0, -far]) {
    final clip = proj.transformPoint(Vec3(0, 0, viewZ));
    final ndcZUnprojected = _ndcZFromViewZ(proj, viewZ);
    _nearDouble(clip.z, ndcZUnprojected, label: 'ndc z at viewZ=$viewZ');

    final recoveredViewZ = _linearizeDepth(ndcZUnprojected, near, far);
    _nearDouble(
      recoveredViewZ,
      -viewZ,
      epsilon: 1e-3,
      label: 'linearized depth at viewZ=$viewZ',
    );
  }
}

double _ndcZFromViewZ(Mat4 proj, double viewZ) {
  final clipZ = proj.m[10] * viewZ + proj.m[14];
  final clipW = proj.m[11] * viewZ + proj.m[15];
  return clipZ / clipW;
}

/// WebGL clip-space convention: NDC z in [-1, 1]. Returns positive view-space
/// distance from the eye.
double _linearizeDepth(double ndcZ, double near, double far) {
  return (2 * near * far) / (far + near - ndcZ * (far - near));
}

void _transformedAabb() {
  final box = const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1));
  final rotated = box.transformed(Mat4.rotationY(math.pi / 4));
  if (!rotated.isValid) throw StateError('rotated AABB must remain valid');

  final expectedHalfExtent = math.sqrt(2);
  _nearDouble(
    rotated.max.x,
    expectedHalfExtent,
    label: 'rotated AABB x extent',
  );
  _nearDouble(
    rotated.max.z,
    expectedHalfExtent,
    label: 'rotated AABB z extent',
  );
  _nearDouble(
    rotated.max.y,
    1,
    label: 'rotated AABB y extent (unaffected by Y rotation)',
  );

  final translated = box.transformed(Mat4.translation(const Vec3(5, 0, 0)));
  _nearVec(translated.min, const Vec3(4, -1, -1));
  _nearVec(translated.max, const Vec3(6, 1, 1));

  final union = box.union(translated);
  _nearVec(union.min, const Vec3(-1, -1, -1));
  _nearVec(union.max, const Vec3(6, 1, 1));
}

void _frustumEdgeCases() {
  final proj = Mat4.perspective(
    fovYRadians: math.pi / 2,
    aspect: 1,
    near: 1,
    far: 100,
  );
  final view = Mat4.lookAt(
    eye: Vec3.zero,
    forward: const Vec3(0, 0, -1),
    up: const Vec3(0, 1, 0),
  );
  final frustum = Frustum.fromViewProjection(proj * view);

  final centerNear = const Aabb(Vec3(-0.1, -0.1, -2.1), Vec3(0.1, 0.1, -1.9));
  if (frustum.testAabb(centerNear) == FrustumTest.outside) {
    throw StateError('box in front of camera must not test outside');
  }

  final behindCamera = const Aabb(Vec3(-0.1, -0.1, 1.9), Vec3(0.1, 0.1, 2.1));
  if (frustum.testAabb(behindCamera) != FrustumTest.outside) {
    throw StateError('box behind camera must test outside');
  }

  final beyondFar = const Aabb(
    Vec3(-0.1, -0.1, -200.1),
    Vec3(0.1, 0.1, -199.9),
  );
  if (frustum.testAabb(beyondFar) != FrustumTest.outside) {
    throw StateError('box beyond far plane must test outside');
  }

  final straddlingNear = const Aabb(
    Vec3(-0.1, -0.1, -1.5),
    Vec3(0.1, 0.1, -0.5),
  );
  if (frustum.testAabb(straddlingNear) != FrustumTest.intersects) {
    throw StateError(
      'box straddling near plane must intersect, not be fully in/out',
    );
  }

  final farAway = const Aabb(Vec3(-0.1, -0.1, -10.1), Vec3(0.1, 0.1, -9.9));
  if (frustum.testSphere(BoundingSphere.fromAabb(farAway)) ==
      FrustumTest.outside) {
    throw StateError('sphere along view axis must not test outside');
  }
  final sideways = const Aabb(
    Vec3(999.9, -0.1, -10.1),
    Vec3(1000.1, 0.1, -9.9),
  );
  if (frustum.testSphere(BoundingSphere.fromAabb(sideways)) !=
      FrustumTest.outside) {
    throw StateError('sphere far outside the side planes must test outside');
  }
}

void _quatTransform() {
  final q = Quat.axisAngle(const Vec3(0, 1, 0), math.pi / 2);
  _nearVec(q.rotate(const Vec3(1, 0, 0)), const Vec3(0, 0, -1));
  _nearVec(q.toMat4().transformDir(const Vec3(1, 0, 0)), const Vec3(0, 0, -1));

  final t = Transform(rotation: q, translation: const Vec3(5, 0, 0), scale: 2);
  _nearVec(t.transformPoint(const Vec3(1, 0, 0)), const Vec3(5, 0, -2));
  _nearVec(
    t.toMat4().transformPoint(const Vec3(1, 0, 0)),
    const Vec3(5, 0, -2),
  );
}

Vec3 _shaderMultiply(List<double> m, double x, double y, double z, double w) =>
    Vec3(
      m[0] * x + m[4] * y + m[8] * z + m[12] * w,
      m[1] * x + m[5] * y + m[9] * z + m[13] * w,
      m[2] * x + m[6] * y + m[10] * z + m[14] * w,
    );

void _nearVec(Vec3 actual, Vec3 expected, {double epsilon = 1e-5}) {
  if ((actual.x - expected.x).abs() > epsilon ||
      (actual.y - expected.y).abs() > epsilon ||
      (actual.z - expected.z).abs() > epsilon) {
    throw StateError('Expected $expected, got $actual.');
  }
}

void _nearDouble(
  double actual,
  double expected, {
  double epsilon = 1e-5,
  String? label,
}) {
  if ((actual - expected).abs() > epsilon) {
    throw StateError(
      '${label == null ? '' : '$label: '}Expected $expected, got $actual.',
    );
  }
}
