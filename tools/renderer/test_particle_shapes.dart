import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void _throws(void Function() fn, String message) {
  try {
    fn();
  } catch (_) {
    return;
  }
  throw StateError('Expected failure: $message');
}

void main() {
  final random = math.Random(12345);
  final transform = Transform(
    translation: const Vec3(10, 20, 30),
    rotation: Quat.axisAngle(Vec3.unitY, math.pi * 0.5),
    scale: 2.0,
  );

  // 1. PointShape tests
  {
    const point = PointShape(
      offset: Vec3(1, 0, 0),
      direction: Vec3.unitY,
      spreadAngleRadians: 0.2,
    );
    point.validate();

    final sample = point.sampleSpawn(random, transform);
    _require(sample.position.isFinite, 'PointShape position must be finite');
    _require(sample.direction.isFinite, 'PointShape direction must be finite');
    _require((sample.direction.length - 1.0).abs() < 1e-4, 'PointShape direction must be unit length');

    _throws(
      () => const PointShape(spreadAngleRadians: -0.1).validate(),
      'PointShape rejects negative spread angle',
    );
  }

  // 2. BoxShape tests
  {
    const boxVol = BoxShape(halfExtents: Vec3(2, 3, 4), mode: BoxEmissionMode.volume);
    boxVol.validate();
    for (var i = 0; i < 20; i++) {
      final s = boxVol.sampleSpawn(random, Transform.identity);
      _require(s.position.x.abs() <= 2.001, 'Box volume X within bounds');
      _require(s.position.y.abs() <= 3.001, 'Box volume Y within bounds');
      _require(s.position.z.abs() <= 4.001, 'Box volume Z within bounds');
    }

    const boxSurf = BoxShape(
      halfExtents: Vec3(1, 1, 1),
      mode: BoxEmissionMode.surface,
      emitAlongNormal: true,
    );
    boxSurf.validate();
    final surfSample = boxSurf.sampleSpawn(random, Transform.identity);
    _require(surfSample.direction.lengthSquared > 0.99, 'Box surface normal valid');

    _throws(
      () => const BoxShape(halfExtents: Vec3(-1, 2, 2)).validate(),
      'BoxShape rejects negative halfExtents',
    );
  }

  // 3. SphereShape tests
  {
    const sphere = SphereShape(
      radius: 5.0,
      innerRadius: 3.0,
      mode: SphereEmissionMode.volume,
      hemisphereOnly: true,
      directionMode: SphereDirectionMode.outward,
    );
    sphere.validate();

    for (var i = 0; i < 30; i++) {
      final s = sphere.sampleSpawn(random, Transform.identity);
      final dist = s.position.length;
      _require(dist >= 2.99 && dist <= 5.01, 'Sphere inner/outer radius respected: $dist');
      _require(s.position.y >= -1e-5, 'Sphere hemisphereOnly respected: ${s.position.y}');
      _require((s.direction - s.position.normalized).length < 1e-4, 'Outward direction aligns with radius');
    }

    _throws(
      () => const SphereShape(radius: 2, innerRadius: 3).validate(),
      'SphereShape rejects innerRadius > radius',
    );
  }

  // 4. ConeShape tests
  {
    const cone = ConeShape(
      radius: 1.0,
      angleRadians: math.pi / 6,
      length: 4.0,
      mode: ConeEmissionMode.volume,
      emitAlongDivergence: true,
    );
    cone.validate();

    for (var i = 0; i < 20; i++) {
      final s = cone.sampleSpawn(random, Transform.identity);
      _require(s.position.y >= 0 && s.position.y <= 4.001, 'Cone height within bounds');
      _require(s.direction.y > 0, 'Cone divergence points forward along +Y');
    }

    _throws(
      () => const ConeShape(radius: 1, angleRadians: math.pi, length: 2).validate(),
      'ConeShape rejects angle >= pi/2',
    );
  }

  // 5. CircleShape tests
  {
    const circle = CircleShape(
      radius: 4.0,
      innerRadius: 2.0,
      normal: Vec3.unitY,
      mode: CircleEmissionMode.volume,
      directionMode: CircleDirectionMode.tangent,
    );
    circle.validate();

    for (var i = 0; i < 20; i++) {
      final s = circle.sampleSpawn(random, Transform.identity);
      _require(s.position.y.abs() < 1e-5, 'Circle lies on normal plane');
      final dist = s.position.length;
      _require(dist >= 1.99 && dist <= 4.01, 'Circle annulus radius respected: $dist');
      _require(s.direction.dot(s.position).abs() < 1e-4, 'Tangent direction perpendicular to radius');
    }

    _throws(
      () => const CircleShape(radius: -1).validate(),
      'CircleShape rejects negative radius',
    );
  }

  // 6. LineShape tests
  {
    const line = LineShape(
      start: Vec3(-5, 0, 0),
      end: Vec3(5, 0, 0),
      directionMode: LineDirectionMode.perpendicular,
    );
    line.validate();

    for (var i = 0; i < 20; i++) {
      final s = line.sampleSpawn(random, Transform.identity);
      _require(s.position.x >= -5.001 && s.position.x <= 5.001, 'Line position X within segment');
      _require(s.position.y.abs() < 1e-5 && s.position.z.abs() < 1e-5, 'Line position YZ zero');
      _require(s.direction.dot(Vec3.unitX).abs() < 1e-4, 'Perpendicular direction orthogonal to line');
    }

    _throws(
      () => const LineShape(start: Vec3.zero, end: Vec3.zero).validate(),
      'LineShape rejects zero-length segment',
    );
  }

  // 7. MeshShape tests
  {
    final cubeMesh = Primitives.cube(size: 2.0);
    final meshShape = MeshShape(meshData: cubeMesh, mode: MeshEmissionMode.surface);
    meshShape.validate();

    for (var i = 0; i < 20; i++) {
      final s = meshShape.sampleSpawn(random, Transform.identity);
      _require(s.position.x.abs() <= 1.001, 'Mesh surface X within bounds');
      _require(s.position.y.abs() <= 1.001, 'Mesh surface Y within bounds');
      _require(s.position.z.abs() <= 1.001, 'Mesh surface Z within bounds');
      _require((s.direction.length - 1.0).abs() < 1e-4, 'Mesh normal unit length');
    }
  }

  print('Particle shapes fixtures passed.');
}
