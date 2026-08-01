import 'mat4.dart';
import 'quat.dart';
import 'vec.dart';

/// Translation, rotation, and uniform scale. Non-uniform scale is rejected
/// here rather than accepted and silently mis-lit: RENDERER-ELEVATION-PLAN.md
/// §5.7 defers non-uniform scale until inverse-transpose normal support and
/// individual-versus-instanced equivalence gates land.
final class Transform {
  final Vec3 translation;
  final Quat rotation;
  final double scale;

  const Transform({
    this.translation = Vec3.zero,
    this.rotation = Quat.identity,
    this.scale = 1,
  });

  static const Transform identity = Transform();

  factory Transform.at(Vec3 translation) => Transform(translation: translation);

  void validate() {
    if (!translation.isFinite) {
      throw ArgumentError('Transform.translation must be finite: $translation');
    }
    if (!rotation.isFinite) {
      throw ArgumentError('Transform.rotation must be finite: $rotation');
    }
    if (!scale.isFinite || scale <= 0) {
      throw ArgumentError(
        'Transform.scale must be finite and positive: $scale',
      );
    }
  }

  Mat4 toMat4() {
    final r = rotation.toMat4();
    final m = Mat4.fromColumnMajor([
      r.m[0] * scale,
      r.m[1] * scale,
      r.m[2] * scale,
      0,
      r.m[4] * scale,
      r.m[5] * scale,
      r.m[6] * scale,
      0,
      r.m[8] * scale,
      r.m[9] * scale,
      r.m[10] * scale,
      0,
      translation.x,
      translation.y,
      translation.z,
      1,
    ]);
    return m;
  }

  Vec3 transformPoint(Vec3 p) => translation + rotation.rotate(p * scale);

  Vec3 transformDir(Vec3 d) => rotation.rotate(d * scale);

  @override
  String toString() => 'Transform($translation, $rotation, scale=$scale)';
}
