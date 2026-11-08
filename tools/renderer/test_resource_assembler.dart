import 'package:pixeldart/rendering/rendering.dart';

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

RendererConfiguration configuration(QualityProfile profile) =>
    RendererConfiguration(
      profile: profile,
      internalWidth: 384,
      internalHeight: 216,
      shadowMapCount: profile.installs(PipelineFeatures.shadows) ? 1 : 0,
    );

void main() {
  final assembler = ResourcePlanAssembler();
  final safe = OwnedResourcePlan.forConfiguration(
    configuration(QualityProfile.safe),
  );
  final full = OwnedResourcePlan.forConfiguration(
    configuration(QualityProfile.ps1Full),
  );
  assembler.initialize(safe);
  require(assembler.generation == 1, 'assembler did not initialize');

  final prepared = assembler.prepare(full);
  require(
    prepared.state == ResourceAssemblyState.prepared,
    'prepared assembly has wrong state',
  );
  expectStateError(
    () => assembler.prepare(safe),
    'overlapping prepare accepted',
  );
  assembler.rollback(prepared);
  require(
    assembler.current.resources.length == safe.resources.length,
    'rollback changed current ownership',
  );
  expectStateError(
    () => assembler.commit(prepared),
    'rolled-back assembly committed',
  );

  final committed = assembler.prepare(full);
  assembler.commit(committed);
  require(assembler.generation == 2, 'commit did not advance generation');
  require(assembler.current.hasHistory, 'commit lost history ownership');
  expectStateError(
    () => assembler.rollback(committed),
    'committed assembly rolled back',
  );

  assembler.dispose();
  expectStateError(
    () => assembler.prepare(safe),
    'disposed assembler prepared work',
  );
  print('Renderer resource assembler fixtures passed.');
}
