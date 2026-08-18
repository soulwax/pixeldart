import 'dart:math' as math;

import '../api/scene.dart';
import '../api/handles.dart';
import '../api/frame.dart';
import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';

/// Generic world-space stream segment. Pixeldart does not know whether this
/// is rain runoff, a drain, a leak, a cable spark, or a magical ribbon.
final class FlowPath {
  final Vec3 start;
  final Vec3 end;
  final double speedMps;
  final double widthM;
  final int particleCount;
  final int seed;

  const FlowPath({
    required this.start,
    required this.end,
    required this.speedMps,
    required this.widthM,
    required this.particleCount,
    required this.seed,
  });

  void validate() {
    if (!start.isFinite ||
        !end.isFinite ||
        !speedMps.isFinite ||
        speedMps <= 0 ||
        !widthM.isFinite ||
        widthM <= 0 ||
        particleCount < 0 ||
        (end - start).length < 1e-5) {
      throw ArgumentError('invalid flow path');
    }
  }
}

/// Frame-local deterministic particles constrained to authored paths. This
/// keeps path physics in the host while giving every stream the same culling,
/// blending, lifecycle, and resource path as ordinary transient geometry.
final class FlowParticleField {
  final MeshHandle mesh;
  final MaterialHandle material;
  final List<FlowPath> paths;
  final double lifetimeSeconds;
  final double particleScale;
  final DrawMode drawMode;
  final BlendMode blendMode;

  const FlowParticleField({
    required this.mesh,
    required this.material,
    required this.paths,
    this.lifetimeSeconds = 1,
    this.particleScale = 1,
    this.drawMode = DrawMode.blended,
    this.blendMode = BlendMode.alpha,
  });

  void validate() {
    if (!mesh.isValid ||
        !material.isValid ||
        !lifetimeSeconds.isFinite ||
        lifetimeSeconds <= 0 ||
        !particleScale.isFinite ||
        particleScale <= 0) {
      throw ArgumentError('invalid flow particle field');
    }
    for (final path in paths) {
      path.validate();
    }
  }

  int submit(RenderEncoder encoder, FrameInput frame) {
    validate();
    var submitted = 0;
    for (var pathIndex = 0; pathIndex < paths.length; pathIndex++) {
      final path = paths[pathIndex];
      final delta = path.end - path.start;
      final direction = delta.normalized;
      final side = direction
          .cross(direction.y.abs() > 0.9 ? Vec3.unitX : Vec3.unitY)
          .normalized;
      final length = delta.length;
      for (var index = 0; index < path.particleCount; index++) {
        final age =
            (frame.timeSeconds + _unit(path.seed, index)) % lifetimeSeconds;
        final travelled = (age * path.speedMps) % length;
        final t = travelled / length;
        final lateral =
            (_unit(path.seed ^ 0x4f1bbcdc, index) * 2 - 1) * path.widthM;
        final position = Vec3.lerp(path.start, path.end, t) + side * lateral;
        final rotation = _rotationForVelocity(direction * path.speedMps);
        encoder.submit(
          RetainedItemDescriptor(
            mesh: mesh,
            material: material,
            transform: Transform(
              translation: position,
              rotation: rotation,
              scale: particleScale,
            ),
            drawMode: drawMode,
            blendMode: blendMode,
            castsShadow: false,
            receivesShadow: false,
            sortTiebreaker: pathIndex * 10000 + index,
            instanceFamilyKey: 0x666c6f77,
          ),
        );
        submitted++;
      }
    }
    return submitted;
  }

  double _unit(int seed, int index) {
    var value = (seed ^ (index * 0x45d9f3b)) & 0x7fffffff;
    value = (value * 1103515245 + 12345) & 0x7fffffff;
    return value / 0x7fffffff;
  }

  Quat _rotationForVelocity(Vec3 velocity) {
    final direction = velocity.normalized;
    if (direction == Vec3.zero) return Quat.identity;
    const source = Vec3(0, -1, 0);
    final dot = source.dot(direction).clamp(-1.0, 1.0);
    if (dot > 0.999999) return Quat.identity;
    if (dot < -0.999999) return Quat.axisAngle(Vec3.unitX, math.pi);
    return Quat.axisAngle(source.cross(direction), math.acos(dot));
  }
}
