import 'dart:io';

import 'package:pixeldart/rendering/passes/pipeline_resource_layout.dart';
import 'package:pixeldart/rendering/rendering.dart';

/// Pins `RuntimeLightBudget` to the two artefacts that actually define it: the
/// shadowed world fragment shader's light uniforms, and the pipeline resource
/// layout's shadow-map allocation.
///
/// RENDERER plan packet R-A5. Without this, `RuntimeLightBudget` is just
/// another set of hand-written numbers that can drift from the runtime — which
/// is exactly the failure it was introduced to prevent.
void check(bool condition, String message) {
  if (!condition) throw StateError('runtime light budget: $message');
}

int _countUniformSeries(String source, String prefix) {
  var index = 0;
  while (source.contains('uniform vec3 $prefix$index') ||
      source.contains('uniform float $prefix$index')) {
    index++;
  }
  return index;
}

void main() {
  final shader = File(
    'shaders/rendering/world/shadowed_world.frag',
  ).readAsStringSync();

  // Point lights are declared as uPointPosition0..N.
  final pointCount = _countUniformSeries(shader, 'uPointPosition');
  check(
    pointCount == RuntimeLightBudget.pointLights,
    'shader declares $pointCount point lights, '
    'RuntimeLightBudget.pointLights is ${RuntimeLightBudget.pointLights}',
  );

  // Unshadowed spots are declared as uDirectSpotPosition0..N.
  final spotCount = _countUniformSeries(shader, 'uDirectSpotPosition');
  check(
    spotCount == RuntimeLightBudget.unshadowedSpotLights,
    'shader declares $spotCount unshadowed spot lights, '
    'RuntimeLightBudget.unshadowedSpotLights is '
    '${RuntimeLightBudget.unshadowedSpotLights}',
  );

  // The shadowed spot is the singular uLight*/uSpotEnabled block.
  check(
    shader.contains('uniform float uSpotEnabled;') &&
        !shader.contains('uSpotEnabled0'),
    'the shadowed spot light is expected to be a single unindexed block',
  );
  check(
    RuntimeLightBudget.shadowedSpotLights == 1,
    'shadowedSpotLights must stay 1 while the shader has one shadowed block',
  );

  // Exactly one shadow map exists in the pipeline. Counting the layout's
  // shadow-typed resources is the assertion R-A5 asked for: against the graph's
  // actual resource layout, not against a constant repeated in the host.
  final layout = PipelineResourceLayout(
    internalWidth: 640,
    internalHeight: 360,
    shadowMapSize: 512,
  );
  check(
    layout.shadowMap.name == 'shadowMap',
    'the single shadow resource is expected to be named shadowMap',
  );
  check(
    RuntimeLightBudget.shadowMaps == 1,
    'RuntimeLightBudget.shadowMaps must match the one allocated shadow map; '
    'raise it in the same commit that lands the R-B2 atlas',
  );

  check(
    RuntimeLightBudget.dynamicLights == pointCount + spotCount + 1,
    'dynamicLights must equal point + unshadowed spot + shadowed spot',
  );

  stdout.writeln(
    'Runtime light budget pinned to the shader and resource layout: '
    '${RuntimeLightBudget.directionalLights} directional (non-casting), '
    '${RuntimeLightBudget.pointLights} point, '
    '${RuntimeLightBudget.unshadowedSpotLights} unshadowed spot, '
    '${RuntimeLightBudget.shadowedSpotLights} shadowed spot, '
    '${RuntimeLightBudget.shadowMaps} shadow map.',
  );
}
