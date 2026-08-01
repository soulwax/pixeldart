import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/program_source.dart';

import 'fake_gpu_device.dart';

void main() {
  _invalidReloadPreservesPreviousProgram();
  _noProgramLeakAcross25Reloads();
  print('Renderer program library fixtures passed.');
}

const _validVertex = 'attribute aPosition; uniform uViewProjection;';
const _validFragment = 'out oColor;';

ProgramSource _worldProgramSource({String vertexOverride = _validVertex}) =>
    ProgramSource(
      id: 'world',
      vertexSource: vertexOverride,
      fragmentSource: _validFragment,
      attributeLocations: const {'aPosition': 0},
      requiredUniforms: const ['uViewProjection'],
    );

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
