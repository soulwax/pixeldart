import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/api/settings.dart';
import 'package:pixeldart/rendering/api/shaders.dart';
import 'package:pixeldart/rendering/math/vec.dart';

import 'shaders.dart' as shader_gen;

void _assert(bool cond, String msg) {
  if (!cond) throw StateError('test_shader_includes failed: $msg');
}

void main() {
  // 1. Recursive #include resolution
  const fixture = '''
#version 300 es
#include "include/common_math.glsl"
void main() { float k = vrpSaturate(VRP_PI); }
''';
  final resolved = shader_gen.resolveShaderIncludes(
    fixture,
    'test_fixture.frag',
  );
  _assert(resolved.contains('const float VRP_PI'), 'include body was inlined');
  _assert(!resolved.contains('#include'), 'include directive was replaced');

  // 2. ShaderVariantKey define injection
  final key = ShaderVariantKey(ShaderSlot.shadowedWorld, {
    ShaderKeyword.normalMap,
    ShaderKeyword.hdr,
    ShaderKeyword.shadowsPcf,
  });
  final defined = key.injectDefines(resolved);
  _assert(defined.contains('#define VRP_HDR 1'), 'VRP_HDR injected');
  _assert(defined.contains('#define VRP_NORMAL_MAP 1'), 'VRP_NORMAL_MAP injected');
  _assert(defined.startsWith('#version 300 es\n#define '), '#version stays line 1');

  // 3. RenderPipelineSettings JSON round-trip & std140 light layout
  final settings = RenderPipelineSettings.forTier(VrpQualityTier.high);
  final roundTrip = RenderPipelineSettings.fromJson(settings.toJson());
  _assert(roundTrip.maxVisibleLights == 256, 'maxVisibleLights round-trip');
  _assert(roundTrip.totalClusters == 16 * 9 * 24, 'cluster count');

  final dirData = GpuDirectionalLightLayout.pack(
    const DirectionalLight(
      direction: Vec3(0, -1, 0),
      color: LinearColor.white,
      intensity: 3.5,
    ),
    cascadeCount: 4,
  );
  _assert(dirData.length == GpuDirectionalLightLayout.floatCount, 'dir layout');

  print('VRP S3-0 shader includes, variants, settings & light layout tests passed.');
}
