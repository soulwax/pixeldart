import 'dart:math' as math;

import '../api/frame.dart';
import '../api/lights.dart';
import '../math/bounds.dart';
import '../math/mat4.dart';
import '../math/vec.dart';
import '../passes/shadow.dart';

/// Single cascade slice representing one level of detail for directional shadows.
final class ShadowCascade {
  final int index;
  final double nearDistance;
  final double farDistance;
  final ShadowLightView lightView;
  final Aabb worldBounds;

  const ShadowCascade({
    required this.index,
    required this.nearDistance,
    required this.farDistance,
    required this.lightView,
    required this.worldBounds,
  });
}

/// Computes Cascaded Shadow Map (CSM) split distances and light-space projections.
///
/// Uses the Practical Split Scheme (Zhang et al.) blending logarithmic and uniform
/// distributions to achieve high resolution near the camera while maintaining
/// continuous coverage into the distance.
final class CascadeSplitCalculator {
  const CascadeSplitCalculator._();

  /// Calculates cascade split distances between [near] and [far].
  ///
  /// [lambda] balances logarithmic (1.0) and uniform (0.0) spacing.
  static List<double> computeDistances({
    required double near,
    required double far,
    required int cascadeCount,
    double lambda = 0.75,
  }) {
    if (cascadeCount < 1) throw ArgumentError('cascadeCount must be >= 1');
    if (near <= 0 || far <= near) throw ArgumentError('invalid near/far range');

    final distances = <double>[near];
    final ratio = far / near;
    final range = far - near;

    for (var i = 1; i <= cascadeCount; i++) {
      final p = i / cascadeCount;
      final logDist = near * math.pow(ratio, p);
      final uniformDist = near + range * p;
      final dist = (logDist * lambda) + (uniformDist * (1.0 - lambda));
      distances.add(dist);
    }
    return distances;
  }

  /// Builds [ShadowCascade] slices for a [camera] and [directionalLight].
  static List<ShadowCascade> buildCascades({
    required CameraView camera,
    required DirectionalLight directionalLight,
    int cascadeCount = 3,
    double lambda = 0.75,
    int shadowMapSize = 1024,
  }) {
    final distances = computeDistances(
      near: camera.near,
      far: math.min(camera.far, 150.0),
      cascadeCount: cascadeCount,
      lambda: lambda,
    );

    final dir = directionalLight.direction.normalized;
    final up = dir.x.abs() < 0.99 ? const Vec3(1, 0, 0) : const Vec3(0, 1, 0);
    final cascades = <ShadowCascade>[];

    for (var i = 0; i < cascadeCount; i++) {
      final nearDist = distances[i];
      final farDist = distances[i + 1];

      // Approximate camera slice frustum bounds in world space
      final centerDist = (nearDist + farDist) * 0.5;
      final sliceCenter = camera.eye + (camera.forward * centerDist);
      final halfDepth = (farDist - nearDist) * 0.5;
      final tanFov = math.tan(1.0 * 0.5); // standard ~60 deg fov
      final halfWidth = farDist * tanFov * camera.aspect;
      final halfHeight = farDist * tanFov;

      final radius = math.sqrt(
        halfWidth * halfWidth +
            halfHeight * halfHeight +
            halfDepth * halfDepth,
      );

      final eye = sliceCenter - (dir * radius);
      final view = Mat4.lookAt(eye: eye, forward: dir, up: up);

      // Texel snapping to prevent sub-pixel shadow shimmer
      final worldUnitsPerTexel = (radius * 2.0) / shadowMapSize;
      final snappedRadius = (radius / worldUnitsPerTexel).ceil() * worldUnitsPerTexel;

      final proj = Mat4.orthographic(
        left: -snappedRadius,
        right: snappedRadius,
        bottom: -snappedRadius,
        top: snappedRadius,
        near: 0.1,
        far: radius * 2.5,
      );

      final lightView = ShadowLightView(proj * view);
      final rVec = Vec3(radius, radius, radius);
      final bounds = Aabb(sliceCenter - rVec, sliceCenter + rVec);

      cascades.add(
        ShadowCascade(
          index: i,
          nearDistance: nearDist,
          farDistance: farDist,
          lightView: lightView,
          worldBounds: bounds,
        ),
      );
    }

    return cascades;
  }
}
