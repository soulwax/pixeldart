import 'package:pixeldart/rendering/rendering.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void expectStateError(void Function() action, String message) {
  try {
    action();
  // ignore: avoid_catching_errors
  } catch (error) {
    if (error is StateError) return;
    rethrow;
  }
  throw StateError(message);
}

RendererConfiguration configuration(
  QualityProfile profile, {
  DiagnosticLevel diagnosticLevel = DiagnosticLevel.errorsOnly,
}) => RendererConfiguration(
  profile: profile,
  internalWidth: 384,
  internalHeight: 216,
  shadowMapCount: profile.installs(PipelineFeatures.shadows) ? 1 : 0,
  diagnosticLevel: diagnosticLevel,
);

void main() {
  final machine = ConfigurationStateMachine();
  machine.initialize(configuration(QualityProfile.safe));
  require(machine.generation == 1, 'initialize must publish generation one');

  final diagnosticsOnly = machine.begin(
    configuration(QualityProfile.safe, diagnosticLevel: DiagnosticLevel.full),
  );
  require(
    !diagnosticsOnly.delta.requiresGpuRebuild,
    'diagnostics-only change requires a GPU rebuild',
  );
  machine.commit(diagnosticsOnly);
  require(machine.generation == 2, 'commit must advance generation');

  final full = machine.begin(configuration(QualityProfile.ps1Full));
  require(
    full.delta.addedFeatures.contains(PipelineFeatures.vhs),
    'full transition misses added VHS',
  );
  require(
    full.delta.requiresGpuRebuild,
    'feature change must rebuild GPU state',
  );
  expectStateError(
    () => machine.begin(configuration(QualityProfile.clean)),
    'overlapping transitions must be rejected',
  );
  machine.abort(full);
  require(
    full.state == ConfigurationTransactionState.aborted,
    'abort state missing',
  );
  expectStateError(
    () => machine.commit(full),
    'aborted transition was committed',
  );

  final clean = machine.begin(configuration(QualityProfile.clean));
  machine.commit(clean);
  require(
    machine.current.profile == QualityProfile.clean,
    'commit lost target profile',
  );

  machine.dispose();
  expectStateError(
    () => machine.begin(configuration(QualityProfile.safe)),
    'disposed state accepted a transition',
  );
  print('Renderer configuration transition fixtures passed.');
}
