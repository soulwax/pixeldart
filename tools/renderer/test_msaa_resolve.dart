import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/core/graph_pass.dart';
import 'package:pixeldart/rendering/core/graph_resource.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/core/render_graph.dart';
import 'package:pixeldart/rendering/passes/msaa_resolve.dart';
import 'package:pixeldart/rendering/passes/pass_context_impl.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';
import 'package:pixeldart/rendering/rendering.dart';

import 'fake_gpu_device.dart';

void main() {
  _graphOwnsTheResolveEdge();
  _resolvesFromMultisampleToSingleSample();
  _rejectsNonMultisampledSource();
  _rejectsMultisampledDestination();
  _rejectsMismatchedDimensions();
  print('Renderer MSAA resolve fixtures passed.');
}

void _graphOwnsTheResolveEdge() {
  const source = ResourceRef(
    name: 'sceneColor',
    format: ResourceFormat.rgba8,
    width: 641,
    height: 361,
    samples: 4,
  );
  const destination = ResourceRef(
    name: 'sceneColor',
    format: ResourceFormat.rgba8,
    width: 641,
    height: 361,
    version: 1,
  );
  final device = FakeGpuDevice();
  final feature = MsaaResolveFeature(
    device: device,
    sourceResource: source,
    destinationResource: destination,
  );
  final builder = RenderGraphBuilder()
    ..addPass(
      const PassDeclaration(
        id: 'world',
        stage: GraphStage.beforeWorld,
        uses: [ResourceUse(source, ResourceAccess.write)],
      ),
    );
  feature.declare(
    builder,
    const RenderFeatureContext(
      capabilities: RenderCapabilities.safeMinimum,
      profile: QualityProfile.safe,
    ),
  );
  final graph = builder.build(
    availableCapabilities: const {},
    hasValidPreviousFrame: false,
  );
  if (!graph.isValid) {
    throw StateError('MSAA resolve edge must validate: ${graph.failures}');
  }
  final pass = feature.createPasses(_AlwaysAvailableResources()).single;
  final sourceTarget = device.createTarget(
    const GpuTargetDescriptor(
      width: 641,
      height: 361,
      samples: 4,
      hasDepth: true,
      attachments: GpuTargetAttachment.colorAndGlow,
    ),
  );
  final destinationTarget = device.createTarget(
    const GpuTargetDescriptor(
      width: 641,
      height: 361,
      hasDepth: true,
      attachments: GpuTargetAttachment.colorAndGlow,
    ),
  );
  pass.execute(
    BoundPassContext(
      views: {
        'sceneColor#0': BoundResourceView(source, sourceTarget),
        'sceneColor#1': BoundResourceView(destination, destinationTarget),
      },
      encoder: DeviceDrawCommandEncoder(device),
      frameScene: const _EmptyFrameScene(),
    ),
  );
  if (device.resolveTargetCalls != 1) {
    throw StateError(
      'graph-owned MSAA resolve must issue one resolve call, got '
      '${device.resolveTargetCalls}',
    );
  }
}

final class _AlwaysAvailableResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

final class _EmptyFrameScene implements FrameSceneData {
  const _EmptyFrameScene();
  @override
  Iterable<Object> get opaqueBatches => const [];
  @override
  Iterable<Object> get blendedItemsBackToFront => const [];
  @override
  Object get camera => const Object();
  @override
  Object get environment => const Object();
  @override
  Object get post => const Object();
  @override
  double get timeSeconds => 0;
}

void _resolvesFromMultisampleToSingleSample() {
  final device = FakeGpuDevice();
  final msaaTarget = device.createTarget(
    const GpuTargetDescriptor(
      width: 384,
      height: 216,
      samples: 4,
      hasDepth: true,
    ),
  );
  final resolvedTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, hasDepth: true),
  );

  device.resolveTarget(msaaTarget, resolvedTarget);

  if (device.resolveTargetCalls != 1) {
    throw StateError(
      'expected exactly 1 resolveTarget call, got ${device.resolveTargetCalls}',
    );
  }
}

void _rejectsNonMultisampledSource() {
  final device = FakeGpuDevice();
  final a = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );
  final b = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );

  bool threw = false;
  try {
    device.resolveTarget(a, b);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('expected resolveTarget to reject a single-sample source');
  }
}

void _rejectsMultisampledDestination() {
  final device = FakeGpuDevice();
  final source = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, samples: 4),
  );
  final destination = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, samples: 4),
  );

  bool threw = false;
  try {
    device.resolveTarget(source, destination);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError(
      'expected resolveTarget to reject a multisampled destination',
    );
  }
}

void _rejectsMismatchedDimensions() {
  final device = FakeGpuDevice();
  final source = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216, samples: 4),
  );
  final destination = device.createTarget(
    const GpuTargetDescriptor(width: 192, height: 108),
  );

  bool threw = false;
  try {
    device.resolveTarget(source, destination);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('expected resolveTarget to reject mismatched dimensions');
  }
}
