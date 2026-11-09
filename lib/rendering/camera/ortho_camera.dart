import 'dart:math' as math;

import '../api/frame.dart';
import '../math/bounds.dart';
import '../math/vec.dart';
import '../scene/scene_node.dart';
import 'camera_controller.dart';

final class OrthoCameraController implements CameraController {
  SceneNode? targetNode;

  Vec3 target;

  double halfHeight;

  Aabb? fitBounds;

  double fitMargin;

  Aabb? clampBounds;

  double damping;

  Vec3 viewForward;
  Vec3 up;

  double distance;
  double near;
  double far;

  Vec3 _center;
  double _aspect = 16 / 9;

  OrthoCameraController({
    this.targetNode,
    this.target = Vec3.zero,
    this.halfHeight = 10,
    this.fitBounds,
    this.fitMargin = 0.05,
    this.clampBounds,
    this.damping = 4,
    this.viewForward = const Vec3(0, 0, -1),
    this.up = const Vec3(0, 1, 0),
    this.distance = 50,
    this.near = 0.1,
    this.far = 200,
  }) : _center = targetNode?.worldTransform.translation ?? target;

  Vec3 get center => _center;

  @override
  Vec3 get eye => _center - viewForward.normalized * distance;

  @override
  Vec3 get forward => viewForward.normalized;

  Vec3 get _right => viewForward.cross(up).normalized;
  Vec3 get _upAxis => _right.cross(viewForward).normalized;

  static double _extentAlong(Aabb box, Vec3 axis) {
    final h = (box.max - box.min) * 0.5;
    return axis.x.abs() * h.x + axis.y.abs() * h.y + axis.z.abs() * h.z;
  }

  double effectiveHalfHeight(double aspect) {
    final fit = fitBounds;
    if (fit == null) return halfHeight;
    final scale = 1 + fitMargin;
    return math.max(_extentAlong(fit, _upAxis), _extentAlong(fit, _right) / aspect) * scale;
  }

  Vec3 _clamped(Vec3 p) {
    final bounds = clampBounds;
    if (bounds == null) return p;
    final halfH = effectiveHalfHeight(_aspect);
    final halfW = halfH * _aspect;
    final right = _right, upAxis = _upAxis;
    // Visible half extent along each world axis, then clamp per axis; an
    // axis the view is too large for centres on the bounds instead.
    double axis(double value, double lo, double hi, double rightComp, double upComp) {
      final half = rightComp.abs() * halfW + upComp.abs() * halfH;
      if (hi - lo <= 2 * half) return (lo + hi) / 2;
      return value.clamp(lo + half, hi - half);
    }

    // Depth along the view direction is not clamped.
    final f = viewForward.normalized;
    return Vec3(
      f.x.abs() > 0.999 ? p.x : axis(p.x, bounds.min.x, bounds.max.x, right.x, upAxis.x),
      f.y.abs() > 0.999 ? p.y : axis(p.y, bounds.min.y, bounds.max.y, right.y, upAxis.y),
      f.z.abs() > 0.999 ? p.z : axis(p.z, bounds.min.z, bounds.max.z, right.z, upAxis.z),
    );
  }

  Vec3 get _goal => _clamped(targetNode?.worldTransform.translation ?? target);

  void snap() => _center = _goal;

  @override
  void update(double deltaTime) {
    if (damping <= 0) {
      _center = _goal;
      return;
    }
    final k = 1 - math.exp(-deltaTime * damping);
    _center = Vec3.lerp(_center, _goal, k);
  }

  @override
  CameraView toCameraView(double aspect) {
    _aspect = aspect;
    final halfH = effectiveHalfHeight(aspect);
    return CameraView.orthographic(
      eye: eye,
      forward: viewForward,
      up: up,
      halfWidth: halfH * aspect,
      halfHeight: halfH,
      near: near,
      far: far,
    );
  }
}
