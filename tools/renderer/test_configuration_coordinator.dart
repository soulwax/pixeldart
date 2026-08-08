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
  final coordinator = ConfigurationCoordinator();
  coordinator.initialize(configuration(QualityProfile.safe));
  require(coordinator.generation == 1, 'coordinator did not initialize');

  final full = coordinator.begin(configuration(QualityProfile.ps1Full));
  require(
    full.resources.plan.resources.contains('vhsOutput'),
    'coordinator prepared no VHS resource',
  );
  expectStateError(
    () => coordinator.begin(configuration(QualityProfile.clean)),
    'coordinator accepted overlapping work',
  );
  coordinator.rollback(full);
  require(coordinator.generation == 1, 'rollback advanced generation');
  require(
    !coordinator.currentResources.hasHistory,
    'rollback changed current ownership',
  );
  expectStateError(
    () => coordinator.commit(full),
    'rolled-back work committed',
  );

  final clean = coordinator.begin(configuration(QualityProfile.clean));
  coordinator.commit(clean);
  require(coordinator.generation == 2, 'coordinator commit did not advance');
  require(
    coordinator.current.profile == QualityProfile.clean &&
        !coordinator.currentResources.hasHistory,
    'coordinator committed mismatched state',
  );

  coordinator.dispose();
  expectStateError(
    () => coordinator.begin(configuration(QualityProfile.safe)),
    'disposed coordinator accepted work',
  );
  print('Renderer configuration coordinator fixtures passed.');
}
