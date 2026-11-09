import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError('shader bindings: $message');
}

void expectThrows<T extends Object>(void Function() body, String what) {
  try {
    body();
  } catch (error) {
    if (error is T) return;
    rethrow;
  }
  throw StateError('shader bindings: $what should have thrown $T');
}

const _tintEffect = ShaderOverride.effect(
  'vec4 effect(vec4 color, vec2 uv) { return vec4(color.rgb * uTint, color.a); }',
  uniforms: {'uTint': ShaderUniform.vec3(1, 0.5, 0.25)},
);

RendererConfiguration _config(
  Map<ShaderSlot, ShaderOverride> shaders, {
  int width = 320,
}) => RendererConfiguration(
  profile: QualityProfile.clean,
  internalWidth: width,
  internalHeight: 180,
  shadowMapCount: 1,
  shaderOverrides: shaders,
);

final class _Host {
  final FakeGpuDevice device;
  final SceneRendererImpl renderer;
  final RenderWorld world;
  final MeshHandle mesh;
  final MaterialHandle material;
  var _index = 0;

  _Host._(this.device, this.renderer, this.world, this.mesh, this.material);

  static Future<_Host> start(Map<ShaderSlot, ShaderOverride> shaders) async {
    final device = FakeGpuDevice();
    final renderer = SceneRendererImpl(device);
    await renderer.initialize(
      _config(shaders),
      SurfaceMetrics.pixels(width: 320, height: 180),
    );
    final mesh = renderer.resources.registerMesh(
      MeshData(
        layout: VertexLayoutDescriptor.compatibility14,
        vertices: Float32List(42),
        localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
      ),
    );
    final material = renderer.resources.registerMaterial(
      const MaterialDefinition(key: 'bindings'),
    );
    return _Host._(device, renderer, renderer.createWorld(), mesh, material);
  }

  TextureHandle texture(String label) => renderer.resources.registerTexture(
    width: 1,
    height: 1,
    pixels: Uint8List.fromList(const [255, 255, 255, 255]),
    debugLabel: label,
  );

  FrameStats draw() {
    device.uniformLog.clear();
    device.drawLog.clear();
    final frame = FrameInput(
      camera: CameraView(
        view: Mat4.identity(),
        projection: Mat4.identity(),
        viewProjection: Mat4.identity(),
        eye: Vec3.zero,
        forward: const Vec3(0, 0, -1),
        near: 0.1,
        far: 100,
        aspect: 16 / 9,
      ),
      environment: const FrameEnvironment(),
      post: const PostProcessState(),
      frameIndex: ++_index,
      historyEpoch: 0,
      noiseSeed: 1,
      timeSeconds: _index / 2,
    );
    final encoder = renderer.beginFrame(world, frame);
    encoder.submit(RetainedItemDescriptor(mesh: mesh, material: material));
    return renderer.endFrame();
  }

  Iterable<UniformValue> sent(String name) => device.uniformLog
      .where((entry) => entry.name == name)
      .map((entry) => entry.value);
}

List<double> _floats(UniformValue value) =>
    (value.value as Float32List).toList();

Future<void> _effectRunsAtDefaultWeights() async {
  final host = await _Host.start(const {ShaderSlot.grade: _tintEffect});
  // colorGradeStrength defaults to 0, where the built-in grade is skipped.
  // A host shader ignores that weight, so it must still draw.
  require(host.draw().passStats['grade']?.drawCalls == 1, 'effect did not run');
  require(host.renderer.shaderErrors.isEmpty, '${host.renderer.shaderErrors}');
  final compiled = host.device.compiledShaderSources
      .map((source) => source.fragment)
      .firstWhere((source) => source.contains('uTint'));
  require(
    compiled.contains('uniform vec3 uTint;') &&
        compiled.contains('uniform sampler2D uScene;') &&
        compiled.contains('#line 1'),
    'effect wrapper is incomplete:\n$compiled',
  );

  await host.renderer.configure(_config(const {}));
  require(
    (host.draw().passStats['grade']?.drawCalls ?? 0) == 0,
    'removing the override must restore the identity skip',
  );
  host.renderer.dispose();
}

Future<void> _effectOnlyWorksOnFilterSlots() async {
  final host = await _Host.start(const {
    ShaderSlot.bloomComposite: ShaderOverride.effect(
      'vec4 effect(vec4 c, vec2 uv) { return c; }',
    ),
  });
  final error = host.renderer.shaderErrors[ShaderSlot.bloomComposite];
  require(
    error != null && error.contains('grade') && error.contains('vhs'),
    'an unsupported slot must name the slots that work: $error',
  );
  host.renderer.dispose();
}

Future<void> _valuesAreSentOnlyWhenTheyChange() async {
  final host = await _Host.start(const {ShaderSlot.grade: _tintEffect});
  host.draw();
  final first = host.sent('uTint').single;
  require(first.type == UniformType.float3, 'uTint must upload as a vec3');
  require(
    _floats(first)[1] == 0.5,
    'starting value was not uploaded: ${_floats(first)}',
  );
  host.draw();
  require(host.sent('uTint').isEmpty, 'an unchanged value was re-sent');

  final compiles = host.device.programCompileCalls;
  host.renderer.setShaderUniform(
    ShaderSlot.grade,
    'uTint',
    const ShaderUniform.vec3(0, 1, 0),
  );
  host.draw();
  require(_floats(host.sent('uTint').single)[1] == 1, 'live value not sent');
  host.renderer.setShaderUniform(
    ShaderSlot.grade,
    'uTint',
    const ShaderUniform.vec3(0, 1, 0),
  );
  host.draw();
  require(host.sent('uTint').isEmpty, 'an identical set was re-sent');
  require(
    host.device.programCompileCalls == compiles,
    'a uniform change must not recompile',
  );
  host.renderer.dispose();
}

Future<void> _liveValuesSurviveRebuildAndRestore() async {
  final host = await _Host.start(const {ShaderSlot.grade: _tintEffect});
  host.draw();
  host.renderer.setShaderUniform(
    ShaderSlot.grade,
    'uTint',
    const ShaderUniform.vec3(0, 0, 1),
  );

  // An internal resize rebuilds the graph and every program.
  await host.renderer.configure(
    _config(const {ShaderSlot.grade: _tintEffect}, width: 640),
  );
  host.draw();
  require(_floats(host.sent('uTint').single)[2] == 1, 'value lost in rebuild');

  host.device.simulateContextLoss();
  host.device.simulateContextRestore();
  host.draw();
  require(_floats(host.sent('uTint').single)[2] == 1, 'value lost in restore');

  // Editing the override itself starts again from what it declares.
  await host.renderer.configure(
    _config(const {
      ShaderSlot.grade: ShaderOverride.effect(
        'vec4 effect(vec4 color, vec2 uv) { return color * uTint.r; }',
        uniforms: {'uTint': ShaderUniform.vec3(0.25, 0, 0)},
      ),
    }, width: 640),
  );
  host.draw();
  require(_floats(host.sent('uTint').single)[0] == 0.25, 'new override value');
  host.renderer.dispose();
}

Future<void> _valueOnlyOverrideEditDoesNotRecompile() async {
  final host = await _Host.start(const {ShaderSlot.grade: _tintEffect});
  host.draw();
  final compiles = host.device.programCompileCalls;
  await host.renderer.configure(
    _config(const {
      ShaderSlot.grade: ShaderOverride.effect(
        'vec4 effect(vec4 color, vec2 uv) { return vec4(color.rgb * uTint, color.a); }',
        uniforms: {'uTint': ShaderUniform.vec3(0.75, 0, 0)},
      ),
    }),
  );
  require(
    host.device.programCompileCalls == compiles,
    'a value-only override edit must not recompile',
  );
  host.draw();
  require(_floats(host.sent('uTint').single)[0] == 0.75, 'edited value');
  host.renderer.dispose();
}

Future<void> _badBindingsExplainThemselves() async {
  final host = await _Host.start(const {ShaderSlot.grade: _tintEffect});
  final renderer = host.renderer;
  expectThrows<ArgumentError>(
    () => renderer.setShaderUniform(
      ShaderSlot.grade,
      'uTypo',
      const ShaderUniform.float(1),
    ),
    'an undeclared uniform',
  );
  expectThrows<ArgumentError>(
    () => renderer.setShaderUniform(
      ShaderSlot.grade,
      'uTint',
      const ShaderUniform.float(1),
    ),
    'a uniform of the wrong type',
  );
  expectThrows<ArgumentError>(
    () => renderer.setShaderUniform(
      ShaderSlot.grade,
      'uStrength',
      const ShaderUniform.float(1),
    ),
    'an engine uniform',
  );
  expectThrows<ArgumentError>(
    () => renderer.setShaderUniform(
      ShaderSlot.present,
      'uTint',
      const ShaderUniform.float(1),
    ),
    'a slot with no override',
  );
  expectThrows<ArgumentError>(
    () => const ShaderOverride.effect(
      'x',
      uniforms: {'pdTime': ShaderUniform.float(0)},
    ).validate(),
    'the reserved prefix',
  );
  host.renderer.dispose();

  for (final bad in [
    const ShaderOverride.effect(
      'vec4 effect(vec4 c, vec2 uv) { return c; }',
      uniforms: {'uStrength': ShaderUniform.float(1)},
    ),
    const ShaderOverride(
      fragment: 'in vec2 vUv; out vec4 oColor; void main() {}',
      uniforms: {'uMissing': ShaderUniform.float(1)},
    ),
    const ShaderOverride(
      fragment: 'in vec2 vUv; uniform vec2 pdTime; out vec4 oColor;',
    ),
  ]) {
    final rejected = await _Host.start({ShaderSlot.grade: bad});
    require(
      rejected.renderer.shaderErrors.containsKey(ShaderSlot.grade),
      'bad binding was accepted: ${bad.uniforms}',
    );
    rejected.renderer.dispose();
  }
}

Future<void> _automaticUniforms() async {
  final host = await _Host.start(const {
    ShaderSlot.grade: ShaderOverride.effect(
      'vec4 effect(vec4 c, vec2 uv) { return c * pdTime; }',
    ),
  });
  host.draw();
  require(host.sent('pdTime').single.value == 0.5, 'pdTime first frame');
  require(_floats(host.sent('pdResolution').single)[0] == 320, 'pdResolution');
  host.draw();
  require(host.sent('pdTime').single.value == 1.0, 'pdTime must advance');
  require(host.sent('pdResolution').isEmpty, 'unchanged size was re-sent');
  host.renderer.dispose();
}

Future<void> _hostTextures() async {
  final host = await _Host.start(const {
    ShaderSlot.grade: ShaderOverride(
      fragment: '''
#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uNoise;
out vec4 oColor;
void main() { oColor = texture(uScene, vUv) * texture(uNoise, vUv); }
''',
    ),
  });
  host.draw();
  require(
    !host.device.drawLog.any((line) => line.startsWith('bindTexture(8,')),
    'nothing is bound before the host supplies a texture',
  );
  host.renderer.setShaderTexture(
    ShaderSlot.grade,
    'uNoise',
    host.texture('noise'),
  );
  host.draw();
  require(host.sent('uNoise').single.value == 8, 'sampler unit must be 8');
  require(
    host.device.drawLog.any((line) => line.startsWith('bindTexture(8,')),
    'the host texture was not bound',
  );
  host.draw();
  require(host.sent('uNoise').isEmpty, 'sampler unit is program state');
  require(
    host.device.drawLog.any((line) => line.startsWith('bindTexture(8,')),
    'texture units are global, so the bind repeats every frame',
  );
  expectThrows<ArgumentError>(
    () => host.renderer.setShaderTexture(
      ShaderSlot.grade,
      'uScene',
      host.texture('other'),
    ),
    'an engine sampler',
  );
  host.renderer.dispose();
}

Future<void> _overrideMayIgnoreEngineInputs() async {
  // Nothing here reads uLut, uLutSize or uStrength, which the fake device
  // (like a real driver's reflection) would report as missing.
  final host = await _Host.start(const {
    ShaderSlot.grade: ShaderOverride(
      fragment: '''
#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
out vec4 oColor;
void main() { oColor = texture(uScene, vUv); }
''',
    ),
  });
  require(
    host.renderer.shaderErrors.isEmpty,
    'ignoring an engine input must be allowed: ${host.renderer.shaderErrors}',
  );
  host.renderer.dispose();
}

Future<void> _noOverridesNoCost() async {
  final host = await _Host.start(const {});
  host.draw();
  require(host.sent('pdTime').isEmpty, 'no override, no host uniforms');
  require(
    !host.device.drawLog.any((line) => line.startsWith('bindTexture(8,')),
    'no override, no host textures',
  );
  host.renderer.dispose();
}

Future<void> main() async {
  await _effectRunsAtDefaultWeights();
  await _effectOnlyWorksOnFilterSlots();
  await _valuesAreSentOnlyWhenTheyChange();
  await _liveValuesSurviveRebuildAndRestore();
  await _valueOnlyOverrideEditDoesNotRecompile();
  await _badBindingsExplainThemselves();
  await _automaticUniforms();
  await _hostTextures();
  await _overrideMayIgnoreEngineInputs();
  await _noOverridesNoCost();
  print('Renderer shader binding fixtures passed.');
}
