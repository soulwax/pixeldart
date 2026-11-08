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
  _sampleCountFourAllocatesResolveTarget();
  final device = FakeGpuDevice();
  final adapter = GpuResourcePlanAdapter(device);
  final odd = RendererConfiguration(
    profile: QualityProfile.clean,
    internalWidth: 641,
    internalHeight: 361,
    shadowMapCount: 1,
    shadowMapSize: 768,
  );
  final oddScene = adapter.descriptorFor('sceneColor', odd);
  final oddSsao = adapter.descriptorFor('ssaoRaw', odd);
  final oddShadow = adapter.descriptorFor('shadowMap', odd);
  require(
    oddScene.width == 641 && oddScene.height == 361,
    'full-resolution descriptor ignored configured extents',
  );
  require(
    oddSsao.width == 321 && oddSsao.height == 181,
    'half-resolution descriptor must round odd extents up safely',
  );
  require(
    oddShadow.width == 768 && oddShadow.height == 768,
    'shadow descriptor ignored configured shadow-map size',
  );
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

void _sampleCountFourAllocatesResolveTarget() {
  final device = FakeGpuDevice();
  final adapter = GpuResourcePlanAdapter(device);
  final configuration = RendererConfiguration(
    profile: QualityProfile.ps1Full,
    internalWidth: 641,
    internalHeight: 361,
    sampleCount: 4,
    shadowMapCount: 1,
  );
  adapter.initialize(configuration);
  final source = adapter.current.objectFor('sceneColor');
  final resolved = adapter.current.objectFor('sceneColor#1');
  final postBloom = adapter.current.objectFor('sceneColor#2');
  if (identical(source, resolved)) {
    throw StateError('MSAA sceneColor must not alias its resolve target');
  }
  if (!identical(resolved, postBloom)) {
    throw StateError(
      'post-bloom sceneColor#2 should alias the single-sample resolve target',
    );
  }
  final sourceDescriptor = device.targetDescriptor(source);
  final resolvedDescriptor = device.targetDescriptor(resolved);
  if (sourceDescriptor.samples != 4 ||
      resolvedDescriptor.samples != 1 ||
      sourceDescriptor.width != 641 ||
      sourceDescriptor.height != 361 ||
      resolvedDescriptor.width != 641 ||
      resolvedDescriptor.height != 361) {
    throw StateError(
      'MSAA allocation lost configured source/resolve extents: '
      '$sourceDescriptor -> $resolvedDescriptor',
    );
  }
  adapter.dispose();
}
