import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/program_source.dart';
import 'package:pixeldart/rendering/api/shaders.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';
import 'package:pixeldart/rendering/passes/present.dart';
import 'package:pixeldart/rendering/passes/shadowed_world.dart';

import 'fake_gpu_device.dart';

void main() {
  _invalidReloadPreservesPreviousProgram();
  _noProgramLeakAcross25Reloads();
  _hostOverrideUsesDefaultVertex();
  _invalidStartupOverrideUsesDefault();
  _fragmentOutputContract();
  _stageInterfaceContract();
  _realProgramInterfaces();
  _overrideChangeKeepsProgramReference();
  _partialOverrideFailureReleasesCandidates();
  _duplicateRegistrationPreservesLivePrograms();
  print('Renderer program library fixtures passed.');
}

void _duplicateRegistrationPreservesLivePrograms() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final first = library.publishNew(_spriteProgramSource());
  final liveHandle = first.handle;
  final compiles = device.programCompileCalls;
  try {
    library.publishNew(_spriteProgramSource());
    throw StateError('duplicate pass program ID was accepted');
  } on StateError catch (error) {
    if (!error.message.toString().contains('program ID is already installed')) {
      rethrow;
    }
  }
  const shader = ShaderHandle(1);
  try {
    library.publishVariant(
      source: _spriteProgramSource(),
      target: shader,
      variant: const ShaderOverride(fragment: _validFragment),
      allowFallback: false,
    );
    throw StateError('variant replaced a pass-owned program');
  } on StateError catch (error) {
    if (!error.message.toString().contains('program ID is already installed')) {
      rethrow;
    }
  }
  if (!identical(library.programFor('sprites'), first) ||
      first.handle != liveHandle ||
      device.programCompileCalls != compiles ||
      device.programDeleteCalls != 0) {
    throw StateError('duplicate registration disturbed a live program');
  }
  library.disposeAll();
  if (device.liveObjectCount != 0) {
    throw StateError('duplicate registration leaked a program');
  }
}

const _validVertex =
    'layout(location=0) in vec3 aPosition; uniform mat4 uViewProjection;';
const _validFragment = 'out vec4 oColor;';

ProgramSource _worldProgramSource({String vertexOverride = _validVertex}) =>
    ProgramSource(
      id: 'world',
      vertexSource: vertexOverride,
      fragmentSource: _validFragment,
      attributeLocations: const {'aPosition': 0},
      requiredUniforms: const ['uViewProjection'],
    );

ProgramSource _spriteProgramSource() => const ProgramSource(
  id: 'sprites',
  vertexSource: _validVertex,
  fragmentSource: _validFragment,
  attributeLocations: {'aPosition': 0},
  requiredUniforms: ['uViewProjection'],
);

void _hostOverrideUsesDefaultVertex() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(
    device,
    overrides: const {
      ShaderSlot.sprites: ShaderOverride(fragment: 'out vec4 oColor; // HOST'),
    },
  );
  library.publish(_spriteProgramSource());
  if (device.lastCompiledVertexSource != _validVertex ||
      device.lastCompiledFragmentSource != 'out vec4 oColor; // HOST') {
    throw StateError('host fragment did not replace the sprite default');
  }
  library.disposeAll();
  if (device.liveObjectCount != 0) {
    throw StateError('overridden program was not released');
  }
}

void _fragmentOutputContract() {
  const defaultFragment = '''
layout(location=0) out vec4 oColor;
layout(location=1) out vec4 oGlow;
''';
  ProgramSource source() => const ProgramSource(
    id: 'sprites',
    vertexSource: _validVertex,
    fragmentSource: defaultFragment,
    attributeLocations: {'aPosition': 0},
    requiredUniforms: ['uViewProjection'],
  );

  for (final invalid in [
    'layout(location=0) out vec4 oColor;',
    'layout(location=0) out vec4 oColor;\n'
        'layout(location=2) out vec4 oGlow;',
    'layout(location=0) out vec4 oColor;\n'
        'layout(location=1) out float oGlow;',
    'out vec4 oColor;\nout vec4 oGlow;',
    'layout(location=0) out vec4 oColor;\n'
        'layout(location=0) out vec4 oGlow;',
    'void helper() {}\nlayout(location=0) out vec4 oColor;',
  ]) {
    final device = FakeGpuDevice();
    final library = ProgramLibrary(
      device,
      overrides: {ShaderSlot.sprites: ShaderOverride(fragment: invalid)},
    );
    try {
      library.publish(source());
      throw StateError('invalid fragment outputs were accepted: $invalid');
    } on ShaderCompileException catch (error) {
      if (error.stage != ShaderCompileStage.validation ||
          device.programCompileCalls != 0) {
        throw StateError('output validation did not precede compilation');
      }
    } finally {
      library.disposeAll();
    }
  }

  final device = FakeGpuDevice();
  final library = ProgramLibrary(
    device,
    overrides: const {
      ShaderSlot.sprites: ShaderOverride(
        fragment:
            'layout(location=0) out vec4 color; '
            'layout(location=1) out vec4 glow;',
      ),
    },
  );
  library.publish(source());
  if (device.programCompileCalls != 1) {
    throw StateError('valid fragment outputs were rejected');
  }
  library.disposeAll();

  final depthDevice = FakeGpuDevice();
  final depthLibrary = ProgramLibrary(
    depthDevice,
    overrides: const {
      ShaderSlot.shadowCaster: ShaderOverride(fragment: 'out vec4 color;'),
    },
  );
  try {
    depthLibrary.publish(
      const ProgramSource(
        id: 'shadowCaster',
        vertexSource: _validVertex,
        fragmentSource: 'void main() {}',
        attributeLocations: {'aPosition': 0},
        requiredUniforms: ['uViewProjection'],
      ),
    );
    throw StateError('depth-only pass accepted a color output');
  } on ShaderCompileException catch (error) {
    if (error.stage != ShaderCompileStage.validation) rethrow;
  } finally {
    depthLibrary.disposeAll();
  }
}

void _stageInterfaceContract() {
  const vertex = '''
layout(location=0) in vec3 aPosition;
uniform mat4 uViewProjection;
uniform mat4 uInstanceModels[16];
out vec2 vUv;
void main() { vUv = aPosition.xy; gl_Position = uViewProjection * vec4(aPosition, 1.0); }
''';
  const fragment = '''
in vec2 vUv;
uniform sampler2D uTex;
out vec4 oColor;
void main() { oColor = texture(uTex, vUv); }
''';
  const source = ProgramSource(
    id: 'sprites',
    vertexSource: vertex,
    fragmentSource: fragment,
    attributeLocations: {'aPosition': 0},
    samplerUnits: {'uTex': 0},
    requiredUniforms: ['uViewProjection', 'uTex'],
  );

  final invalid = <ShaderOverride>[
    const ShaderOverride(
      vertex: '''
layout(location=1) in vec3 aPosition;
uniform mat4 uViewProjection;
out vec2 vUv;
''',
    ),
    const ShaderOverride(
      vertex: '''
layout(location=0) in vec2 aPosition;
uniform mat4 uViewProjection;
out vec2 vUv;
''',
    ),
    const ShaderOverride(
      vertex: '''
layout(location=0) in vec3 aPosition;
uniform mat4 uViewProjection;
out vec3 vOther;
''',
    ),
    const ShaderOverride(
      vertex: '''
layout(location=0) in vec3 aPosition;
uniform mat4 uViewProjection;
uniform mat4 uInstanceModels[1];
out vec2 vUv;
''',
    ),
    const ShaderOverride(
      fragment: '''
in vec3 vUv;
uniform sampler2D uTex;
out vec4 oColor;
''',
    ),
    const ShaderOverride(
      fragment: '''
in vec2 vUv;
uniform float uTex;
out vec4 oColor;
''',
    ),
  ];
  for (final replacement in invalid) {
    final device = FakeGpuDevice();
    final library = ProgramLibrary(
      device,
      overrides: {ShaderSlot.sprites: replacement},
    );
    try {
      library.publish(source);
      throw StateError('invalid stage interface was accepted: $replacement');
    } on ShaderCompileException catch (error) {
      if (error.stage != ShaderCompileStage.validation ||
          device.programCompileCalls != 0) {
        throw StateError('stage interface check did not precede compilation');
      }
    } finally {
      library.disposeAll();
    }
  }

  final device = FakeGpuDevice();
  final library = ProgramLibrary(
    device,
    overrides: const {
      ShaderSlot.sprites: ShaderOverride(
        vertex: '''
layout(location=0) in vec3 aPosition;
uniform mat4 uViewProjection;
out vec3 vCustom;
void main() { vCustom = aPosition; gl_Position = uViewProjection * vec4(aPosition, 1.0); }
''',
        fragment: '''
in vec3 vCustom;
uniform sampler2D uTex;
out vec4 oColor;
void main() { oColor = texture(uTex, vCustom.xy); }
''',
      ),
    },
  );
  library.publish(source);
  if (device.programCompileCalls != 1) {
    throw StateError('matching custom stages were rejected');
  }
  library.disposeAll();
}

void _realProgramInterfaces() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(
    device,
    overrides: const {
      ShaderSlot.shadowedWorld: ShaderOverride(
        vertex: '$shadowedWorldVertSrc\n// HOST',
      ),
      ShaderSlot.present: ShaderOverride(fragment: '$presentFragSrc\n// HOST'),
    },
  );
  library.publish(
    ShadowedWorldProgramSource.build(
      vertexSource: shadowedWorldVertSrc,
      fragmentSource: shadowedWorldFragSrc,
    ),
  );
  library.publish(
    PresentProgramSource.build(
      vertexSource: presentVertSrc,
      fragmentSource: presentFragSrc,
    ),
  );
  if (device.programCompileCalls != 2) {
    throw StateError('authored world/present shader contracts were rejected');
  }
  library.disposeAll();
}

void _overrideChangeKeepsProgramReference() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final sprite = library.publish(_spriteProgramSource());
  final world = library.publish(_worldProgramSource());
  final oldHandle = sprite.handle;
  final worldHandle = world.handle;
  final compiles = device.programCompileCalls;
  final candidate = library.prepareOverrides(const {
    ShaderSlot.sprites: ShaderOverride(fragment: 'out vec4 oColor; // HOST'),
  });
  if (device.programCompileCalls != compiles + 1 ||
      sprite.handle != oldHandle ||
      world.handle != worldHandle) {
    throw StateError('shader preparation changed live programs');
  }
  library.commitOverrides(candidate);
  if (!identical(library.programFor('sprites'), sprite) ||
      sprite.handle == oldHandle ||
      world.handle != worldHandle ||
      device.isLive(oldHandle) ||
      !device.isLive(sprite.handle)) {
    throw StateError('shader commit did not update the pass-owned reference');
  }
  final committedHandle = sprite.handle;
  try {
    library.prepareOverrides(const {
      ShaderSlot.sprites: ShaderOverride(fragment: 'out vec3 oColor;'),
    });
    throw StateError('invalid shader change was prepared');
  } on ShaderCompileException catch (error) {
    if (error.stage != ShaderCompileStage.validation ||
        sprite.handle != committedHandle) {
      throw StateError('failed shader preparation disturbed the live program');
    }
  }
  final restoreDefault = library.prepareOverrides(const {});
  library.rollbackOverrides(restoreDefault);
  if (sprite.handle != committedHandle || !device.isLive(committedHandle)) {
    throw StateError('rolling back a valid shader candidate disturbed live');
  }
  library.disposeAll();
  if (device.liveObjectCount != 0) {
    throw StateError('shader reload leaked a program');
  }
}

void _partialOverrideFailureReleasesCandidates() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final sprite = library.publish(_spriteProgramSource());
  final present = library.publish(
    const ProgramSource(
      id: 'present',
      vertexSource: _validVertex,
      fragmentSource: _validFragment,
      attributeLocations: {'aPosition': 0},
      requiredUniforms: ['uViewProjection'],
    ),
  );
  final live = device.liveObjectCount;
  final spriteHandle = sprite.handle;
  final presentHandle = present.handle;
  try {
    library.prepareOverrides(const {
      ShaderSlot.sprites: ShaderOverride(fragment: 'out vec4 oColor; // NEW'),
      ShaderSlot.present: ShaderOverride(fragment: 'out vec3 oColor;'),
    });
    throw StateError('partially invalid program set was accepted');
  } on ShaderCompileException catch (error) {
    if (error.stage != ShaderCompileStage.validation ||
        sprite.handle != spriteHandle ||
        present.handle != presentHandle ||
        device.liveObjectCount != live) {
      throw StateError('partial override failure leaked or changed a program');
    }
  }
  library.disposeAll();
}

void _invalidStartupOverrideUsesDefault() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(
    device,
    overrides: const {
      ShaderSlot.sprites: ShaderOverride(fragment: 'FAIL_FRAGMENT'),
    },
    fallbackToDefaults: true,
  );
  library.publish(_spriteProgramSource());
  if (device.lastCompiledFragmentSource != _validFragment ||
      !library.overrideErrors.containsKey(ShaderSlot.sprites)) {
    throw StateError('invalid override did not report and use default');
  }
  library.disposeAll();
}

void _invalidReloadPreservesPreviousProgram() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);

  final good = library.publish(_worldProgramSource());
  final badReloaded = library.tryReload(
    _worldProgramSource(vertexOverride: 'FAIL_VERTEX $_validVertex'),
  );
  if (badReloaded) {
    throw StateError('a failing reload must report failure');
  }
  final stillLive = library.programFor('world');
  if (stillLive == null || stillLive.handle != good.handle) {
    throw StateError('an invalid reload must preserve the previous program');
  }
  if (device.programDeleteCalls != 0) {
    throw StateError('a rejected candidate must never delete the live program');
  }
}

void _noProgramLeakAcross25Reloads() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);

  library.publish(_worldProgramSource());
  for (var i = 0; i < 25; i++) {
    final ok = library.tryReload(
      _worldProgramSource(
        vertexOverride: i.isEven ? _validVertex : 'FAIL_VERTEX $_validVertex',
      ),
    );
    if (i.isEven && !ok) {
      throw StateError('reload $i was expected to succeed');
    }
    if (!i.isEven && ok) {
      throw StateError('reload $i was expected to fail');
    }
  }

  // 1 initial publish + 13 successful reloads (even i in [0, 24]) = 14
  // successful compiles; `compileProgram` only counts on success, matching
  // resource-accounting semantics elsewhere in this fake.
  final expectedSuccessfulPublishes = 1 + 13;
  if (device.programCompileCalls != expectedSuccessfulPublishes) {
    throw StateError(
      'expected $expectedSuccessfulPublishes successful compiles, '
      'got ${device.programCompileCalls}',
    );
  }
  if (device.programDeleteCalls != expectedSuccessfulPublishes - 1) {
    throw StateError(
      'expected exactly ${expectedSuccessfulPublishes - 1} deletes '
      '(one fewer than successful publishes, since the first publish has nothing to replace), '
      'got ${device.programDeleteCalls} — a leak or an over-delete',
    );
  }
  if (library.programFor('world') == null) {
    throw StateError(
      'the world program must still be live after 25 mixed reloads',
    );
  }
}
