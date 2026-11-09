import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/sprites/sprite_batch.dart';
import 'package:pixeldart/rendering/sprites/sprite_encoder.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError('shader targets: $message');
}

void expectThrows<T extends Object>(void Function() body, String what) {
  try {
    body();
  } catch (error) {
    if (error is T) return;
    rethrow;
  }
  throw StateError('shader targets: $what should have thrown $T');
}

const _invert = ShaderOverride.effect(
  'vec4 effect(vec4 color, vec2 uv) { return vec4(uGain - color.rgb, 1.0); }',
  uniforms: {'uGain': ShaderUniform.vec3(1, 1, 1)},
);
const _dim = ShaderOverride.effect(
  'vec4 effect(vec4 color, vec2 uv) { return color * 0.5; }',
);
const _spriteTint = ShaderOverride.effect(
  'vec4 effect(vec4 color, vec2 uv) { return color * vec4(uTint, 1.0); }',
  uniforms: {'uTint': ShaderUniform.vec3(0, 0, 1)},
);

RendererConfiguration _config(
  QualityProfile profile, {
  Map<String, ShaderOverride> effects = const {},
  int samples = 1,
  int width = 64,
}) => RendererConfiguration(
  profile: profile,
  internalWidth: width,
  internalHeight: 64,
  sampleCount: samples,
  shadowMapCount: profile.installs(PipelineFeatures.shadows) ? 1 : 0,
  postEffects: effects,
);

SpriteBatch _batch() =>
    SpriteBatch()..draw(SpriteRegion.white, 0, 0, width: 8, height: 8);

final class _Host {
  final FakeGpuDevice device;
  final SceneRendererImpl renderer;
  final RenderWorld world;
  var _index = 0;

  _Host(this.device, this.renderer, this.world);

  static Future<_Host> start(RendererConfiguration configuration) async {
    final device = FakeGpuDevice();
    final renderer = SceneRendererImpl(device);
    await renderer.initialize(
      configuration,
      SurfaceMetrics.pixels(width: 64, height: 64),
    );
    return _Host(device, renderer, renderer.createWorld());
  }

  FrameStats draw([void Function(RenderEncoder encoder)? submit]) {
    device.uniformLog.clear();
    device.drawLog.clear();
    final encoder = renderer.beginFrame(
      world,
      FrameInput(
        camera: CameraView(
          view: Mat4.identity(),
          projection: Mat4.identity(),
          viewProjection: Mat4.identity(),
          eye: Vec3.zero,
          forward: const Vec3(0, 0, -1),
          near: 0.1,
          far: 100,
          aspect: 1,
        ),
        environment: const FrameEnvironment(),
        post: const PostProcessState(),
        frameIndex: ++_index,
        historyEpoch: 0,
        noiseSeed: 1,
        timeSeconds: _index.toDouble(),
      ),
    );
    submit?.call(encoder);
    return renderer.endFrame();
  }

  Iterable<UniformValue> sent(String name) => device.uniformLog
      .where((entry) => entry.name == name)
      .map((entry) => entry.value);

  /// The texture present sampled and the last offscreen target written.
  (String, String) get presentInput {
    final lines = device.drawLog;
    final canvas = lines.indexOf('bindTarget(canvas)');
    final sampled = lines
        .skip(canvas)
        .firstWhere((line) => line.startsWith('bindTexture(0, '));
    final written = lines
        .take(canvas)
        .lastWhere((line) => line.startsWith('bindTarget('));
    return (
      sampled.substring('bindTexture(0, '.length, sampled.length - 1),
      written.substring('bindTarget('.length, written.length - 1),
    );
  }
}

List<double> _floats(UniformValue value) =>
    (value.value as Float32List).toList();

Future<void> _postEffectsRunOnEveryProfile() async {
  for (final (profile, samples) in const [
    (QualityProfile.safe, 1),
    (QualityProfile.safe, 4),
    (QualityProfile.flat2d, 1),
    (QualityProfile.minimal, 1),
    (QualityProfile.clean, 4),
    (QualityProfile.ps1Full, 4),
  ]) {
    final host = await _Host.start(
      _config(
        profile,
        samples: samples,
        effects: const {'invert': _invert, 'dim': _dim},
      ),
    );
    require(
      host.renderer.shaderErrors.isEmpty,
      '${host.renderer.shaderErrors}',
    );
    final stats = host.draw();
    require(
      stats.passStats['postEffect:invert']?.drawCalls == 1 &&
          stats.passStats['postEffect:dim']?.drawCalls == 1,
      '${profile.kind.name}: effects did not run',
    );
    final (sampled, written) = host.presentInput;
    require(sampled == written, 'present must sample the last effect');
    host.renderer.dispose();
    require(
      host.device.liveObjectCount == 0,
      '${profile.kind.name}: leaked ${host.device.liveObjectCount} objects',
    );
  }
}

Future<void> _noEffectsNoCost() async {
  final plain = await _Host.start(_config(QualityProfile.safe));
  final targets = plain.device.targetCreateCalls;
  final stats = plain.draw();
  require(
    !stats.passStats.keys.any((pass) => pass.startsWith('postEffect:')),
    'an empty stack must add no passes',
  );
  plain.renderer.dispose();

  final one = await _Host.start(
    _config(QualityProfile.safe, effects: const {'dim': _dim}),
  );
  require(
    one.device.targetCreateCalls == targets + 1,
    'each effect owns exactly one target',
  );
  one.renderer.dispose();
}

Future<void> _liveEffectStack() async {
  final host = await _Host.start(
    _config(QualityProfile.safe, effects: const {'invert': _invert}),
  );
  const target = PostEffect('invert');
  host.draw();
  host.renderer.setShaderUniform(
    target,
    'uGain',
    const ShaderUniform.vec3(0.5, 1, 1),
  );
  host.draw();
  require(_floats(host.sent('uGain').single)[0] == 0.5, 'live uniform');

  // A resize rebuilds every program; the live value must come back.
  await host.renderer.configure(
    _config(
      QualityProfile.safe,
      effects: const {'invert': _invert},
      width: 128,
    ),
  );
  host.draw();
  require(_floats(host.sent('uGain').single)[0] == 0.5, 'value lost in resize');

  // A bad live change is refused and leaves the running stack alone.
  var refused = false;
  try {
    await host.renderer.configure(
      _config(
        QualityProfile.safe,
        effects: const {'invert': ShaderOverride.effect('FAIL_FRAGMENT')},
        width: 128,
      ),
    );
  } on ShaderCompileException {
    refused = true;
  }
  require(refused, 'an invalid live effect must be refused');
  require(
    host.draw().passStats['postEffect:invert']?.drawCalls == 1,
    'refused change disturbed the stack',
  );

  await host.renderer.configure(_config(QualityProfile.safe, width: 128));
  require(
    !host.draw().passStats.containsKey('postEffect:invert'),
    'removing the effect must remove its pass',
  );
  expectThrows<ArgumentError>(
    () => host.renderer.setShaderUniform(
      target,
      'uGain',
      const ShaderUniform.vec3(1, 1, 1),
    ),
    'a removed effect',
  );
  host.renderer.dispose();
}

Future<void> _badEffectAtStartupDrawsAsCopy() async {
  final host = await _Host.start(
    _config(
      QualityProfile.safe,
      effects: const {'broken': ShaderOverride.effect('FAIL_FRAGMENT')},
    ),
  );
  require(
    host.renderer.shaderErrors.containsKey(const PostEffect('broken')),
    'startup failure must be reported',
  );
  require(
    host.draw().passStats['postEffect:broken']?.drawCalls == 1,
    'a failed effect still has to carry the image forward',
  );
  host.renderer.dispose();
}

void _effectConfigurationRules() {
  expectThrows<ArgumentError>(
    () => _config(
      QualityProfile.safe,
      effects: const {'vertex': ShaderOverride(vertex: 'void x() {}')},
    ).validate(),
    'a vertex-stage post effect',
  );
  final base = _config(QualityProfile.safe, effects: const {'dim': _dim});
  require(
    base.withSampleCount(4).postEffects.containsKey('dim') &&
        base.withShaderOverrides(const {}).postEffects.containsKey('dim'),
    'copies must keep post effects',
  );
}

Future<void> _spriteShaderSelectedPerDraw() async {
  final host = await _Host.start(_config(QualityProfile.safe));
  final compiles = host.device.programCompileCalls;
  final shader = host.renderer.registerSpriteShader(
    _spriteTint,
    debugLabel: 'tint',
  );
  require(
    host.device.programCompileCalls == compiles + 1,
    'registering compiles once',
  );
  require(
    host.device.compiledShaderSources.last.fragment.contains('oGlow') &&
        host.device.compiledShaderSources.last.fragment.contains('uLinearize'),
    'a sprite effect must keep the sprite output contract',
  );

  final batch = _batch();
  final projection = Float32List(16);
  host.draw((encoder) {
    encoder.drawSpritesWith(batch, projection);
    encoder.drawSpritesWith(batch, projection, shader: shader);
    encoder.drawSpritesWith(batch, projection, shader: shader);
    encoder.drawSpritesWith(batch, projection);
  });
  // Three program runs: default, custom (both draws), default.
  require(
    host.sent('uLinearize').length == 3,
    'programs must switch only between differing draws, and each must '
    'receive its engine uniforms: ${host.sent('uLinearize').length}',
  );
  require(_floats(host.sent('uTint').single)[2] == 1, 'starting value sent');

  host.renderer.setShaderUniform(
    shader,
    'uTint',
    const ShaderUniform.vec3(1, 0, 0),
  );
  host.draw((encoder) {
    encoder.drawSpritesWith(batch, projection, shader: shader);
  });
  require(_floats(host.sent('uTint').single)[0] == 1, 'live value sent');

  host.device.simulateContextLoss();
  host.device.simulateContextRestore();
  host.device.compiledShaderSources.clear();
  host.draw((encoder) {
    encoder.drawSpritesWith(batch, projection, shader: shader);
  });
  require(
    host.device.compiledShaderSources.any(
      (source) => source.fragment.contains('uTint'),
    ),
    'context restore must recompile registered shaders',
  );
  require(
    _floats(host.sent('uTint').single)[0] == 1,
    'live value lost in restore',
  );

  await host.renderer.configure(_config(QualityProfile.safe, width: 128));
  host.draw((encoder) {
    encoder.drawSpritesWith(batch, projection, shader: shader);
  });
  require(host.sent('uTint').isNotEmpty, 'shader lost in graph rebuild');

  host.renderer.releaseSpriteShader(shader);
  host.draw((encoder) {
    encoder.drawSpritesWith(batch, projection, shader: shader);
  });
  require(
    host.sent('uTint').isEmpty && host.sent('uLinearize').length == 1,
    'a released shader draws with the default',
  );
  host.renderer.dispose();
  require(host.device.liveObjectCount == 0, 'sprite shaders leaked');
}

Future<void> _invalidSpriteShaderThrows() async {
  final host = await _Host.start(_config(QualityProfile.safe));
  final live = host.device.liveObjectCount;
  expectThrows<ShaderCompileException>(
    () => host.renderer.registerSpriteShader(
      const ShaderOverride.effect('FAIL_FRAGMENT'),
    ),
    'an invalid sprite shader',
  );
  expectThrows<ShaderCompileException>(
    () => host.renderer.registerSpriteShader(
      ShaderOverride(fragment: spriteFragmentWithBadOutputs),
    ),
    'a sprite shader with the wrong outputs',
  );
  require(host.device.liveObjectCount == live, 'a failed register leaked');
  host.renderer.dispose();
}

const spriteFragmentWithBadOutputs = '''
#version 300 es
precision highp float;
in vec2 vUv;
out vec4 oColor;
void main() { oColor = vec4(vUv, 0.0, 1.0); }
''';

Future<void> _defaultSpritesStayCheap() async {
  final host = await _Host.start(_config(QualityProfile.safe));
  final batch = _batch();
  final projection = Float32List(16);
  host.draw();
  final otherPassMatrices = host.sent('uViewProjection').length;
  host.draw((encoder) {
    for (var i = 0; i < 5; i += 1) {
      encoder.drawSpritesWith(batch, projection);
    }
  });
  require(
    host.sent('uLinearize').length == 1,
    'default sprites must bind their program once per stage',
  );
  require(
    host.sent('uViewProjection').length == otherPassMatrices + 1,
    'identical sprite projections must upload once per program run',
  );

  final changed = Float32List.fromList(projection)..[0] = 2;
  host.draw((encoder) {
    encoder.drawSpritesWith(batch, projection);
    encoder.drawSpritesWith(batch, changed);
    encoder.drawSpritesWith(batch, changed);
  });
  require(
    host.sent('uViewProjection').length == otherPassMatrices + 2,
    'a changed projection must upload before its draw',
  );

  final shader = host.renderer.registerSpriteShader(_spriteTint);
  host.draw((encoder) {
    encoder.drawSpritesWith(batch, projection);
    encoder.drawSpritesWith(batch, projection, shader: shader);
    encoder.drawSpritesWith(batch, projection);
  });
  require(
    host.sent('uViewProjection').length == otherPassMatrices + 3,
    'switching programs must upload the projection for each run',
  );
  host.renderer.dispose();
}

Future<void> main() async {
  await _postEffectsRunOnEveryProfile();
  await _noEffectsNoCost();
  await _liveEffectStack();
  await _badEffectAtStartupDrawsAsCopy();
  _effectConfigurationRules();
  await _spriteShaderSelectedPerDraw();
  await _invalidSpriteShaderThrows();
  await _defaultSpritesStayCheap();
  print('Renderer shader target fixtures passed.');
}
