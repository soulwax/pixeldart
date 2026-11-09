import 'mat4.dart';
import 'quat.dart';
import 'vec.dart';

/// Translation, rotation, uniform scale, and an optional geometry-local
/// [stretch].
///
/// [stretch] is a per-axis scale applied to this node's own geometry before
/// rotation and uniform [scale]. It is deliberately *not* inherited: when a
/// parent is composed with a child the result carries the child's stretch
/// and only the parent's rotation and uniform scale. That keeps composition
/// closed over translation/rotation/scale (a stretched parent would
/// otherwise shear rotated children) while still letting any leaf be a box,
/// a beam or a slab of arbitrary proportions. Normals stay correct because
/// both the per-item and the instanced paths transform them with
/// `Mat4.normalMatrix()` (the inverse transpose).
final class Transform {
  final Vec3 translation;
  final Quat rotation;
  final double scale;

  /// Geometry-local per-axis scale; (1, 1, 1) when unused.
  final Vec3 stretch;

  const Transform({
    this.translation = Vec3.zero,
    this.rotation = Quat.identity,
    this.scale = 1,
    this.stretch = const Vec3(1, 1, 1),
  });

  static const Transform identity = Transform();

  factory Transform.at(Vec3 translation) => Transform(translation: translation);

  bool get isStretched => stretch.x != 1 || stretch.y != 1 || stretch.z != 1;

  Transform copyWith({
    Vec3? translation,
    Quat? rotation,
    double? scale,
    Vec3? stretch,
  }) => Transform(
    translation: translation ?? this.translation,
    rotation: rotation ?? this.rotation,
    scale: scale ?? this.scale,
    stretch: stretch ?? this.stretch,
  );

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
    if (!stretch.isFinite || stretch.x <= 0 || stretch.y <= 0 || stretch.z <= 0) {
      throw ArgumentError(
        'Transform.stretch components must be finite and positive: $stretch',
      );
    }
  }

  Mat4 toMat4() {
    final r = rotation.toMat4();
    final sx = scale * stretch.x, sy = scale * stretch.y, sz = scale * stretch.z;
    final m = Mat4.fromColumnMajor([
      r.m[0] * sx,
      r.m[1] * sx,
      r.m[2] * sx,
      0,
      r.m[4] * sy,
      r.m[5] * sy,
      r.m[6] * sy,
      0,
      r.m[8] * sz,
      r.m[9] * sz,
      r.m[10] * sz,
      0,
      translation.x,
      translation.y,
      translation.z,
      1,
    ]);
    return m;
  }

  Vec3 _stretched(Vec3 v) => Vec3(v.x * stretch.x, v.y * stretch.y, v.z * stretch.z);

  Vec3 transformPoint(Vec3 p) => translation + rotation.rotate(_stretched(p) * scale);

  Vec3 transformDir(Vec3 d) => rotation.rotate(_stretched(d) * scale);

  /// Composes this parent transform with a [child] transform. The parent's
  /// [stretch] is not inherited; the result keeps the child's.
  Transform operator *(Transform child) => Transform(
    translation: translation + rotation.rotate(child.translation * scale),
    rotation: (rotation * child.rotation).normalized,
    scale: scale * child.scale,
    stretch: child.stretch,
  );

  @override
  String toString() => isStretched
      ? 'Transform($translation, $rotation, scale=$scale, stretch=$stretch)'
      : 'Transform($translation, $rotation, scale=$scale)';
}
