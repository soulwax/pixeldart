import 'package:pixeldart/rendering/api/capabilities.dart';
import 'package:pixeldart/rendering/api/settings.dart';
import 'package:pixeldart/rendering/webgl/resource_plan_adapter.dart';

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

RendererConfiguration configuration(QualityProfile profile) =>
    RendererConfiguration(
      profile: profile,
      internalWidth: 384,
      internalHeight: 216,
      shadowMapCount: profile.installs(PipelineFeatures.shadows) ? 1 : 0,
    );

void main() {
  final device = FakeGpuDevice();
  final adapter = GpuResourcePlanAdapter(device);
  adapter.initialize(configuration(QualityProfile.safe));
  require(
    device.targetCreateCalls == 2,
    'safe initialization target count is wrong',
  );
  final safeScene = adapter.current.objectFor('sceneColor');

  final full = adapter.prepare(configuration(QualityProfile.ps1Full));
  require(
    identical(full.objectFor('sceneColor'), full.objectFor('sceneColor#1')),
    'bloom scene-color version was allocated twice',
  );
  expectStateError(
    () => adapter.prepare(configuration(QualityProfile.clean)),
    'overlapping GPU candidates accepted',
  );
  adapter.rollback(full);
  require(
    device.targetDeleteCalls == 14,
    'rollback did not delete candidate targets',
  );
  require(
    identical(adapter.current.objectFor('sceneColor'), safeScene),
    'rollback changed current target',
  );
  expectStateError(
    () => adapter.commit(full),
    'rolled-back GPU candidate committed',
  );

  final committed = adapter.prepare(configuration(QualityProfile.ps1Full));
  adapter.commit(committed);
  require(device.targetDeleteCalls == 16, 'commit did not retire old targets');
  require(
    adapter.current.objectFor('vhsOutput') == committed.objectFor('vhsOutput'),
    'commit lost target',
  );
  adapter.dispose();
  require(
    device.targetDeleteCalls == 30,
    'dispose did not retire current targets',
  );
  print('Renderer GPU resource-plan adapter fixtures passed.');
}
