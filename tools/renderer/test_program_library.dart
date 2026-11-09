import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/program_source.dart';
import 'package:pixeldart/rendering/api/shaders.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void main() {
  _invalidReloadPreservesPreviousProgram();
  _noProgramLeakAcross25Reloads();
  _hostOverrideUsesDefaultVertex();
  _invalidStartupOverrideUsesDefault();
  _fragmentOutputContract();
  print('Renderer program library fixtures passed.');
}

const _validVertex = 'attribute aPosition; uniform uViewProjection;';
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
