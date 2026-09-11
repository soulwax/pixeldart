import 'dart:math' as math;
import 'package:pixeldart/pixeldart.dart';

void main() {
  _testIcosphere();
  _testOctahedron();
  _testDodecahedron();
  _testRoundedBox();
  print('Extended primitives tests passed.');
}

void _testIcosphere() {
  final ico = Primitives.icosphere(radius: 1.5, subdivisions: 2);
  ico.validate();

  assert(ico.localBounds.min.x == -1.5);
  assert(ico.localBounds.max.x == 1.5);
  assert(ico.indices != null && ico.indices!.isNotEmpty);

  // Check that all vertices have radius ~ 1.5
  final floats = ico.vertices;
  final stride = 18;
  for (var i = 0; i < ico.vertexCount; i++) {
    final x = floats[i * stride];
    final y = floats[i * stride + 1];
    final z = floats[i * stride + 2];
    final len = math.sqrt(x * x + y * y + z * z);
    assert((len - 1.5).abs() < 1e-3, 'Vertex must lie on sphere surface');

    // Check normal is normalized
    final nx = floats[i * stride + 3];
    final ny = floats[i * stride + 4];
    final nz = floats[i * stride + 5];
    final nLen = math.sqrt(nx * nx + ny * ny + nz * nz);
    assert((nLen - 1.0).abs() < 1e-3, 'Normal must be normalized');
  }
}

void _testOctahedron() {
  final oct = Primitives.octahedron(radius: 2.0);
  oct.validate();

  assert(oct.localBounds.min.x == -2.0);
  assert(oct.localBounds.max.x == 2.0);
  assert(oct.vertexCount == 24, 'Octahedron should have 24 vertices (8 faces * 3)');
  assert(oct.indices != null && oct.indices!.length == 24, 'Octahedron should have 24 indices');
}

void _testDodecahedron() {
  final dodec = Primitives.dodecahedron(radius: 1.0);
  dodec.validate();

  assert((dodec.localBounds.min.x - (-1.0)).abs() < 1e-4);
  assert((dodec.localBounds.max.x - 1.0).abs() < 1e-4);
  assert(dodec.vertexCount == 60, '12 pentagons * 5 vertices = 60 vertices');
  assert(dodec.indices != null && dodec.indices!.length == 108, '12 pentagons * 9 indices = 108 indices');

  final floats = dodec.vertices;
  final indices = dodec.indices!;
  const stride = 18;

  // Verify that all 36 triangles in the dodecahedron have outward-facing normals
  for (var i = 0; i < indices.length; i += 3) {
    final i0 = indices[i];
    final i1 = indices[i + 1];
    final i2 = indices[i + 2];

    final p0 = Vec3(floats[i0 * stride], floats[i0 * stride + 1], floats[i0 * stride + 2]);
    final p1 = Vec3(floats[i1 * stride], floats[i1 * stride + 1], floats[i1 * stride + 2]);
    final p2 = Vec3(floats[i2 * stride], floats[i2 * stride + 1], floats[i2 * stride + 2]);

    final triNormal = (p1 - p0).cross(p2 - p0);
    assert(triNormal.lengthSquared > 1e-6, 'Degenerate triangle in dodecahedron');

    final centroid = (p0 + p1 + p2) * (1.0 / 3.0);
    assert(triNormal.dot(centroid) > 0, 'Dodecahedron triangle normal must point outward');

    // Also check vertex normal points outward
    final n0 = Vec3(floats[i0 * stride + 3], floats[i0 * stride + 4], floats[i0 * stride + 5]);
    assert(n0.dot(p0) > 0.5, 'Vertex normal must point outward along radial position');
  }

  // Verify that each of the 12 pentagonal faces has 5 equal side lengths (regularity)
  for (var f = 0; f < 12; f++) {
    final faceBase = f * 5;
    final edgeLengths = <double>[];
    for (var v = 0; v < 5; v++) {
      final cur = faceBase + v;
      final nxt = faceBase + ((v + 1) % 5);
      final pCur = Vec3(floats[cur * stride], floats[cur * stride + 1], floats[cur * stride + 2]);
      final pNxt = Vec3(floats[nxt * stride], floats[nxt * stride + 1], floats[nxt * stride + 2]);
      edgeLengths.add((pNxt - pCur).length);
    }
    final expectedEdge = edgeLengths[0];
    for (final el in edgeLengths) {
      assert((el - expectedEdge).abs() < 1e-4, 'Dodecahedron pentagon face must be regular');
    }
  }
}

void _testRoundedBox() {
  final box = Primitives.roundedBox(
    width: 2.0,
    height: 4.0,
    depth: 6.0,
    bevelRadius: 0.2,
    bevelSegments: 2,
  );
  box.validate();

  assert(box.localBounds.min.x == -1.0 && box.localBounds.max.x == 1.0);
  assert(box.localBounds.min.y == -2.0 && box.localBounds.max.y == 2.0);
  assert(box.localBounds.min.z == -3.0 && box.localBounds.max.z == 3.0);
  assert(box.indices != null && box.indices!.isNotEmpty);

  final floats = box.vertices;
  final indices = box.indices!;
  const stride = 18;

  // Verify that ALL triangles in the rounded box have winding consistent with vertex normals
  for (var i = 0; i < indices.length; i += 3) {
    final i0 = indices[i];
    final i1 = indices[i + 1];
    final i2 = indices[i + 2];

    final p0 = Vec3(floats[i0 * stride], floats[i0 * stride + 1], floats[i0 * stride + 2]);
    final p1 = Vec3(floats[i1 * stride], floats[i1 * stride + 1], floats[i1 * stride + 2]);
    final p2 = Vec3(floats[i2 * stride], floats[i2 * stride + 1], floats[i2 * stride + 2]);

    final triNormal = (p1 - p0).cross(p2 - p0);
    assert(triNormal.lengthSquared > 1e-8, 'Degenerate triangle in roundedBox');

    final n0 = Vec3(floats[i0 * stride + 3], floats[i0 * stride + 4], floats[i0 * stride + 5]);
    final n1 = Vec3(floats[i1 * stride + 3], floats[i1 * stride + 4], floats[i1 * stride + 5]);
    final n2 = Vec3(floats[i2 * stride + 3], floats[i2 * stride + 4], floats[i2 * stride + 5]);
    final avgNormal = (n0 + n1 + n2) * (1.0 / 3.0);

    // Triangle winding normal must align with the vertex normal (dot product positive)
    assert(
      triNormal.dot(avgNormal) > 0,
      'RoundedBox triangle normal must face outward matching vertex normals (no inverted winding)',
    );
  }
}
