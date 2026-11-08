import 'dart:math' as math;

/// Evaluates a normalized progression in [0, 1] through an easing transfer function.
abstract interface class Curve {
  double transform(double t);
}

final class _FuncCurve implements Curve {
  final double Function(double t) _eval;
  const _FuncCurve(this._eval);

  @override
  double transform(double t) => _eval(t.clamp(0.0, 1.0));
}

/// Common animation easing curves.
abstract final class Curves {
  static const Curve linear = _FuncCurve(_linear);
  static const Curve easeInQuad = _FuncCurve(_easeInQuad);
  static const Curve easeOutQuad = _FuncCurve(_easeOutQuad);
  static const Curve easeInOutQuad = _FuncCurve(_easeInOutQuad);
  static const Curve easeInCubic = _FuncCurve(_easeInCubic);
  static const Curve easeOutCubic = _FuncCurve(_easeOutCubic);
  static const Curve easeInOutCubic = _FuncCurve(_easeInOutCubic);
  static const Curve bounceOut = _FuncCurve(_bounceOut);
  static const Curve bounceIn = _FuncCurve(_bounceIn);
  static const Curve bounceInOut = _FuncCurve(_bounceInOut);
  static const Curve elasticOut = _FuncCurve(_elasticOut);

  static double _linear(double t) => t;
  static double _easeInQuad(double t) => t * t;
  static double _easeOutQuad(double t) => t * (2.0 - t);
  static double _easeInOutQuad(double t) =>
      t < 0.5 ? 2.0 * t * t : -1.0 + (4.0 - 2.0 * t) * t;

  static double _easeInCubic(double t) => t * t * t;
  static double _easeOutCubic(double t) {
    final t1 = t - 1.0;
    return t1 * t1 * t1 + 1.0;
  }

  static double _easeInOutCubic(double t) {
    if (t < 0.5) return 4.0 * t * t * t;
    final t1 = 2.0 * t - 2.0;
    return 0.5 * t1 * t1 * t1 + 1.0;
  }

  static double _bounceOut(double t) {
    if (t < (1.0 / 2.75)) {
      return 7.5625 * t * t;
    } else if (t < (2.0 / 2.75)) {
      final t2 = t - (1.5 / 2.75);
      return 7.5625 * t2 * t2 + 0.75;
    } else if (t < (2.5 / 2.75)) {
      final t2 = t - (2.25 / 2.75);
      return 7.5625 * t2 * t2 + 0.9375;
    } else {
      final t2 = t - (2.625 / 2.75);
      return 7.5625 * t2 * t2 + 0.984375;
    }
  }

  static double _bounceIn(double t) => 1.0 - _bounceOut(1.0 - t);

  static double _bounceInOut(double t) => t < 0.5
      ? 0.5 * (1.0 - _bounceOut(1.0 - t * 2.0))
      : 0.5 * _bounceOut(t * 2.0 - 1.0) + 0.5;

  static double _elasticOut(double t) {
    if (t <= 0.0) return 0.0;
    if (t >= 1.0) return 1.0;
    return math.pow(2.0, -10.0 * t) *
            math.sin((t - 0.075) * (2.0 * math.pi) / 0.3) +
        1.0;
  }
}

/// Parametric cubic Bézier curve defined by control points (x1, y1) and (x2, y2).
final class CubicBezier implements Curve {
  final double x1, y1, x2, y2;
  const CubicBezier(this.x1, this.y1, this.x2, this.y2);

  @override
  double transform(double t) {
    if (t <= 0.0) return 0.0;
    if (t >= 1.0) return 1.0;

    // Approximate parameter u where B_x(u) == t using bisection
    var low = 0.0;
    var high = 1.0;
    var u = t;

    for (var i = 0; i < 10; i++) {
      final currentX = _sample(x1, x2, u);
      if ((currentX - t).abs() < 1e-4) break;
      if (currentX < t) {
        low = u;
      } else {
        high = u;
      }
      u = (low + high) * 0.5;
    }

    return _sample(y1, y2, u);
  }

  static double _sample(double p1, double p2, double u) {
    final inv = 1.0 - u;
    return 3.0 * inv * inv * u * p1 +
        3.0 * inv * u * u * p2 +
        u * u * u;
  }
}
