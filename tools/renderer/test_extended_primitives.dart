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
}
