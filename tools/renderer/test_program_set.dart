import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/program_source.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void expectStateError(void Function() action, String message) {
  try {
    action();
  } catch (error) {
    if (error is StateError) return;
    rethrow;
  }
  throw StateError(message);
}

void expectFailure(void Function() action, String message) {
  try {
    action();
  } catch (_) {
    return;
  }
  throw StateError(message);
}

const _vertex = 'attribute aPosition; uniform uViewProjection;';
const _fragment = 'out oColor;';

ProgramSource source(String id, {String vertex = _vertex}) => ProgramSource(
  id: id,
  vertexSource: vertex,
  fragmentSource: _fragment,
  attributeLocations: const {'aPosition': 0},
  requiredUniforms: const ['uViewProjection'],
);

void main() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final oldWorld = library.publish(source('world'));

  final candidate = library.prepareSet([source('world'), source('present')]);
  require(
    library.programFor('world')!.handle == oldWorld.handle,
    'prepare replaced live program',
  );
  expectStateError(
    () => library.prepareSet([source('other')]),
    'overlapping program set accepted',
  );
  library.rollbackSet(candidate);
  require(device.programDeleteCalls == 2, 'rollback leaked candidate programs');
  require(
    library.programFor('world')!.handle == oldWorld.handle,
    'rollback changed live program',
  );

  final committed = library.prepareSet([source('world'), source('present')]);
  library.commitSet(committed);
  require(
    library.programFor('world')!.handle != oldWorld.handle,
    'commit retained old program',
  );
  require(library.programFor('present') != null, 'commit omitted new program');
  require(device.programDeleteCalls == 3, 'commit did not retire old program');

  final oldCommittedWorld = library.programFor('world')!;
  expectFailure(
    () => library.prepareSet([
      source('world'),
      source('broken', vertex: 'FAIL_VERTEX $_vertex'),
    ]),
    'failed program candidate did not throw',
  );
  require(
    library.programFor('world')!.handle == oldCommittedWorld.handle,
    'failed program candidate replaced live set',
  );
  require(
    device.programDeleteCalls == 4,
    'failed program candidate leaked partial compile',
  );
  library.disposeAll();
  require(
    device.programDeleteCalls == 6,
    'dispose did not retire exact program set',
  );
  print('Renderer program-set fixtures passed.');
}
