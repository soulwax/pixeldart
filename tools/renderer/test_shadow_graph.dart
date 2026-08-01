import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/passes/shadow_graph.dart';
import 'package:pixeldart/rendering/passes/world.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

/// Confirms `buildShadowGraph` (the main pipeline: depthPrepass ->
/// ssaoOcclusion -> ssaoBlur -> shadowCaster -> shadowedWorld -> bloomBlurH
/// -> bloomBlurV -> bloomComposite -> dofBlurH -> dofBlurV -> dofComposite ->
/// grade -> ps1Quantize -> vhs -> present) declares a graph the validator
/// actually accepts. This is a pure structural check, not a
/// rendering one — it exists specifically because a duplicate-writer /
/// dependency-cycle bug in bloom's resource-version declarations reached
/// the browser once already (bloomComposite declared a write to the exact
/// same sceneColor#0 version shadowedWorld already writes) before any pure
/// test caught it; this fixture is what should have caught it the first
/// time.
void main() {
  _graphValidatesWithAllFifteenPasses();
  print('Renderer shadow-graph fixtures passed.');
}

final _fakeCamera = CameraView(
  view: Mat4.identity(),
  projection: Mat4.identity(),
  viewProjection: Mat4.identity(),
  eye: Vec3.zero,
  forward: const Vec3(0, 0, -1),
  near: 0.1,
  far: 100,
  aspect: 16 / 9,
);

final class _AlwaysAvailableResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

void _graphValidatesWithAllFifteenPasses() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final sceneDepthTarget = device.createTarget(
    const GpuTargetDescriptor(
      width: 384,
      height: 216,
      attachments: GpuTargetAttachment.depthOnly,
      hasDepth: true,
    ),
  );
  final shadowMapTarget = device.createTarget(
    const GpuTargetDescriptor(
      width: 512,
      height: 512,
      attachments: GpuTargetAttachment.depthOnly,
      hasDepth: true,
    ),
  );
  final ssaoRawTarget = device.createTarget(
    const GpuTargetDescriptor(width: 192, height: 108),
  );
  final ssaoBlurredTarget = device.createTarget(
    const GpuTargetDescriptor(width: 192, height: 108),
  );
  final sceneColorTarget = device.createTarget(
    const GpuTargetDescriptor(
      width: 384,
      height: 216,
      hasDepth: true,
      attachments: GpuTargetAttachment.colorAndGlow,
    ),
  );
  final bloomBlurHTarget = device.createTarget(
    const GpuTargetDescriptor(width: 192, height: 108),
  );
  final bloomBlurVTarget = device.createTarget(
    const GpuTargetDescriptor(width: 192, height: 108),
  );
  final dofBlurHTarget = device.createTarget(
    const GpuTargetDescriptor(width: 192, height: 108),
  );
  final dofBlurVTarget = device.createTarget(
    const GpuTargetDescriptor(width: 192, height: 108),
  );
  final albedoTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final gradeLutTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4 * 4, height: 4),
  );
  final vhsGhostTarget = device.createTarget(
    const GpuTargetDescriptor(width: 384, height: 216),
  );

  final graph = buildShadowGraph(
    library,
    device: device,
    resolveMesh: (mesh) => ResolvedMesh(
      vao: device.createVertexArray(),
      isIndexed: false,
      drawCount: 3,
    ),
    resolveMaterial: (handle) => const MaterialDefinition(key: 'fake'),
    resolveAlbedo: (handle) => albedoTexture,
    resolveShadowMap: () => shadowMapTarget,
    resolveCasterLight: () => null,
    resolveSceneDepth: () => sceneDepthTarget,
    resolveCamera: () => _fakeCamera,
    resolveSsaoRaw: () => ssaoRawTarget,
    resolveSsaoBlurred: () => ssaoBlurredTarget,
    sceneColorWidth: 384,
    sceneColorHeight: 216,
    resolveResolvedSceneColor: () => sceneColorTarget,
    resolveBloomBlurH: () => bloomBlurHTarget,
    resolveBloomBlurV: () => bloomBlurVTarget,
    resolveDofBlurH: () => dofBlurHTarget,
    resolveDofBlurV: () => dofBlurVTarget,
    resolveGradeLut: () => gradeLutTexture,
    resolveVhsHistory: () => vhsGhostTarget,
    resolveTime: () => 0.0,
  );

  final result = graph.build(
    featureContext: const RenderFeatureContext(
      capabilities: RenderCapabilities.safeMinimum,
      profile: QualityProfile.safe,
    ),
    availableCapabilities: const {},
    // vhs's historyRead use requires this — the real bootstrap satisfies
    // it by pre-clearing both ghost ping-pong targets before frame 1, so a
    // valid (if blank) history value always exists; this fixture asserts
    // the graph, not the bootstrap's clear-before-loop behavior, so it
    // simply declares the same "yes, a valid history target exists" the
    // real graph build does.
    hasValidPreviousFrame: true,
    resources: _AlwaysAvailableResources(),
  );

  if (!result.isValid) {
    throw StateError(
      'buildShadowGraph must validate cleanly: ${result.graph.failures}',
    );
  }

  final ids = result.passes.map((p) => p.descriptor.id).toList();
  const expected = [
    'depthPrepass',
    'ssaoOcclusion',
    'ssaoBlur',
    'shadowCaster',
    'shadowedWorld',
    'bloomBlurH',
    'bloomBlurV',
    'bloomComposite',
    'dofBlurH',
    'dofBlurV',
    'dofComposite',
    'grade',
    'ps1Quantize',
    'vhs',
    'present',
  ];
  if (ids.length != expected.length) {
    throw StateError('expected ${expected.length} passes, got $ids');
  }
  for (var i = 0; i < expected.length; i++) {
    if (ids[i] != expected[i]) {
      throw StateError(
        'expected pass $i to be "${expected[i]}", got "${ids[i]}" (full order: $ids)',
      );
    }
  }
}
