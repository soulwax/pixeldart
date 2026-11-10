import 'dart:math' as math;

import '../math/vec.dart';

final class ThermalSource {
  final String id;
  final Vec3 position;
  final double radiusMeters;
  final double dissolution01;

  const ThermalSource({
    required this.id,
    required this.position,
    required this.radiusMeters,
    required this.dissolution01,
  });

  void validate() {
    if (id.trim().isEmpty ||
        !position.isFinite ||
        !radiusMeters.isFinite ||
        !dissolution01.isFinite ||
        radiusMeters <= 0 ||
        dissolution01 < 0 ||
        dissolution01 > 1) {
      throw ArgumentError('thermal source is invalid');
    }
  }
}

final class ThermalFieldEngine {
  const ThermalFieldEngine._();

  static double dissolutionAt({
    required Vec3 position,
    required Iterable<ThermalSource> sources,
    double lingeringMemory01 = 0,
  }) {
    if (!position.isFinite ||
        !lingeringMemory01.isFinite ||
        lingeringMemory01 < 0 ||
        lingeringMemory01 > 1) {
      throw ArgumentError('thermal field inputs are invalid');
    }
    var local = lingeringMemory01;
    final ids = <String>{};
    for (final source in sources) {
      source.validate();
      if (!ids.add(source.id)) {
        throw ArgumentError('thermal source ids must be unique');
      }
      final distance = (position - source.position).length;
      // Steady spherical conduction produces a 1/r temperature field. Clamp
      // at the authored source radius so the near field remains bounded and
      // agrees with the shadowed-world fragment path.
      final falloff =
          source.radiusMeters / math.max(distance, source.radiusMeters);
      local = math.max(local, source.dissolution01 * falloff);
    }
    return local.clamp(0.0, 1.0).toDouble();
  }
}
