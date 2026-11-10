import 'mat4.dart';
import 'quat.dart';
import 'vec.dart';

final class Transform {
  final Vec3 translation;
  final Quat rotation;
  final double scale;

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

  Mat4 toMat4() => Mat4.compose(
    tx: translation.x,
    ty: translation.y,
    tz: translation.z,
    qx: rotation.x,
    qy: rotation.y,
    qz: rotation.z,
    qw: rotation.w,
    sx: scale * stretch.x,
    sy: scale * stretch.y,
    sz: scale * stretch.z,
  );

  Vec3 _stretched(Vec3 v) => Vec3(v.x * stretch.x, v.y * stretch.y, v.z * stretch.z);

  Vec3 transformPoint(Vec3 p) => translation + rotation.rotate(_stretched(p) * scale);

  Vec3 transformDir(Vec3 d) => rotation.rotate(_stretched(d) * scale);

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
