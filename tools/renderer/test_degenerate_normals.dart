import 'dart:io';
import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';

// A node scaled toward zero (to hide or pop it) once made normalMatrix()
// throw inside syncToWorld, which stopped the host's frame loop. The
// fallback must give the same normal directions without throwing.

void check(bool condition, String message) {
  if (!condition) throw StateError('degenerate normals: $message');
}

Vec3 _apply3(Mat4 m, Vec3 v) => Vec3(
  m.at(0, 0) * v.x + m.at(1, 0) * v.y + m.at(2, 0) * v.z,
  m.at(0, 1) * v.x + m.at(1, 1) * v.y + m.at(2, 1) * v.z,
  m.at(0, 2) * v.x + m.at(1, 2) * v.y + m.at(2, 2) * v.z,
);

void main() {
  final rng = math.Random(11);
  const probes = [Vec3(1, 0, 0), Vec3(0, 1, 0), Vec3(0, 0, 1), Vec3(0.3, -0.7, 0.6)];

  // 1. A rotated, uniformly scaled transform shrunk to 1e-4 lights exactly
  //    like the same transform at scale 1.
  for (var i = 0; i < 32; i++) {
    final axis = Vec3(rng.nextDouble() - 0.5, rng.nextDouble() - 0.5, rng.nextDouble() - 0.5).normalized;
    final rotation = Quat.axisAngle(axis, rng.nextDouble() * 6.28);
    final rigid = Transform(rotation: rotation).toMat4().normalMatrix();
    final tiny = Transform(rotation: rotation, scale: 1e-4).toMat4().normalMatrix();
    for (final n in probes) {
      final a = _apply3(rigid, n).normalized;
      final b = _apply3(tiny, n).normalized;
      check((a - b).length < 1e-4, 'scale 1e-4 must keep normal directions ($a vs $b)');
    }
  }

  // 2. Exactly as thin as the strict path rejects: still no throw, finite.
  final crushed = Mat4.fromColumnMajor([1e-5, 0, 0, 0, 0, 1e-5, 0, 0, 0, 0, 1e-5, 0, 0, 0, 0, 1]);
  final crushedNormals = crushed.normalMatrix();
  check(crushedNormals.isFinite, 'crushed block must yield a finite normal matrix');
  check((_apply3(crushedNormals, const Vec3(0, 1, 0)).normalized - const Vec3(0, 1, 0)).length < 1e-5,
      'crushed uniform block must keep normals unchanged');

  // 3. A flattened (rank-2) block keeps the direction it can still define:
  //    squashing Y to zero turns every surface's normal toward ±Y.
  final flat = Mat4.fromColumnMajor([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  final flatNormal = _apply3(flat.normalMatrix(), const Vec3(0.4, 0.6, 0.2));
  check(flatNormal.isFinite && flatNormal.x.abs() < 1e-9 && flatNormal.z.abs() < 1e-9,
      'a Y-flattened block must point normals along Y, got $flatNormal');

  // 4. The strict inverse keeps its contract.
  var threw = false;
  try {
    crushed.inverse3x3();
  } catch (e) {
    threw = e is StateError;
  }
  check(threw, 'inverse3x3 must still reject singular blocks');

  stdout.writeln('Degenerate normal fixtures passed.');
}
