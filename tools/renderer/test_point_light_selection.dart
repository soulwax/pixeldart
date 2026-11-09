import 'dart:io';

import 'package:pixeldart/pixeldart.dart';

// More point lights than shader slots: the most influential at the camera
// win, deterministically, instead of the first four submitted.

void check(bool condition, String message) {
  if (!condition) throw StateError('point light selection: $message');
}

PointLight _light(int id, Vec3 at, {double intensity = 1, double radius = 5}) =>
    PointLight(id: id, position: at, color: const LinearColor(1, 1, 1), intensity: intensity, radius: radius);

void main() {
  const eye = Vec3(0, 0, 0);

  // Within budget: untouched, in submission order.
  final few = [for (var i = 0; i < 3; i++) _light(i, Vec3(i * 10.0, 0, 0))];
  final keptFew = selectPointLights(lights: few, referencePosition: eye);
  check(keptFew.map((l) => l.id).join(',') == '0,1,2', 'lights within budget are kept as submitted');

  // Over budget: far, weak lights submitted first must lose to near ones.
  final many = [
    for (var i = 0; i < 4; i++) _light(i, Vec3(100.0 + i, 0, 0)),
    for (var i = 4; i < 8; i++) _light(i, Vec3(1.0 + i, 0, 0)),
  ];
  final kept = selectPointLights(lights: many, referencePosition: eye);
  check(kept.length == RuntimeLightBudget.pointLights, 'exactly the budget is kept');
  check(kept.every((l) => l.id >= 4), 'the near lights win over earlier far ones, got ${kept.map((l) => l.id)}');

  // A bright distant light can still outrank a dim close one.
  final mixed = [
    _light(0, const Vec3(30, 0, 0), intensity: 5000),
    for (var i = 1; i < 6; i++) _light(i, Vec3(2.0 * i, 0, 0), intensity: 0.01),
  ];
  check(selectPointLights(lights: mixed, referencePosition: eye).any((l) => l.id == 0), 'a very bright light survives');

  // Ties resolve by id, independent of submission order.
  final tied = [for (var i = 9; i >= 0; i--) _light(i, const Vec3(3, 0, 0))];
  final keptTied = selectPointLights(lights: tied, referencePosition: eye);
  check(keptTied.map((l) => l.id).join(',') == '0,1,2,3', 'ties pick the lowest ids, got ${keptTied.map((l) => l.id)}');

  stdout.writeln('Point light selection fixtures passed.');
}
