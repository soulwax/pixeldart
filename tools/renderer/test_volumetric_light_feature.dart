import 'package:pixeldart/rendering/passes/pipeline_resource_layout.dart';
import 'package:pixeldart/rendering/passes/shadow_graph.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/passes/world.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

void main() {
  final source = VolumetricLightProgramSource.build(
    vertexSource: presentVertSrc,
    fragmentSource: volumetricLightFragSrc,
  );
  _require(
    source.requiredUniforms.contains('uViewProjection'),
    'volumetric pass must use the authoritative camera projection',
  );
  _require(
    source.samplerUnits['uSceneDepth'] == 0,
    'volumetric pass must sample the depth prepass at unit zero',
  );
  for (final token in [
    'linearDepth',
    'phaseHenyeyGreenstein',
    'maxSampleCount = 24',
    'uView',
    'uInverseProjection',
    'sourceView',
    'mediumWeight',
    'mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0)',
    'uVolumetricSampleCount',
    'uVolumetricIntensity',
    'jitterSeed',
    'uVolumetricHeightFalloff',
    'uVolumetricDustDensity',
    'dustWeight',
    'uSourcePosition3',
    'uSceneDepth',
  ]) {
    _require(
      volumetricLightFragSrc.contains(token),
      'stock volumetric shader is missing $token',
    );
  }

  final layout = PipelineResourceLayout(
    internalWidth: 641,
    internalHeight: 361,
    shadowMapSize: 768,
    sampleCount: 4,
    volumetric: true,
  );
  _require(
    layout.volumetricLight.width == 321 && layout.volumetricLight.height == 181,
    'volumetric target must follow the configured half-resolution extent',
  );
  _require(
    layout.sceneColorPostVolumetric.version == 2 &&
        layout.sceneColorPostBloom.version == 3,
    'volumetric and bloom composites must chain scene-color versions',
  );
  final cinematic = QualityProfile.cinematic;
  cinematic.validate();
  _require(
    cinematic.installs(PipelineFeatures.volumetric),
    'cinematic profile must install the volumetric feature',
  );
  final resources = PipelineResourcePlan.forProfile(cinematic, sampleCount: 4);
  _require(
    resources.resources.any(
          (resource) => resource.name == layout.volumetricLight.name,
        ) &&
        resources.resources.any(
          (resource) =>
              resource.name == layout.sceneColorPostVolumetric.name &&
              resource.version == layout.sceneColorPostVolumetric.version,
        ) &&
        resources.resources.any(
          (resource) =>
              resource.name == layout.sceneColorPostBloom.name &&
              resource.version == layout.sceneColorPostBloom.version,
        ),
    'cinematic resource plan must own the volumetric and chained targets',
  );
  _graphAcceptsCinematicProfile();
  final camera = CameraView(
    view: Mat4.identity(),
    projection: Mat4.perspective(
      fovYRadians: 1.0,
      aspect: 16 / 9,
      near: 0.1,
      far: 100,
    ),
    viewProjection: Mat4.identity(),
    eye: Vec3.zero,
    forward: const Vec3(0, 0, -1),
    near: 0.1,
    far: 100,
    aspect: 16 / 9,
  );
  final roundTrip = camera.projection * camera.inverseProjection;
  _require(
    (roundTrip.m[0] - 1).abs() < 1e-4 &&
        (roundTrip.m[5] - 1).abs() < 1e-4 &&
        (roundTrip.m[10] - 1).abs() < 1e-4 &&
        (roundTrip.m[15] - 1).abs() < 1e-4,
    'camera inverse projection must reconstruct identity',
  );
  print('Volumetric light feature fixtures passed.');
}

void _graphAcceptsCinematicProfile() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final target = device.createTarget(
    const GpuTargetDescriptor(width: 1, height: 1),
  );
  final texture = device.createTexture(
    const GpuTextureDescriptor(width: 1, height: 1),
  );
  final graph = buildShadowGraph(
    library,
    device: device,
    resolveMesh: (mesh) => ResolvedMesh(
      vao: device.createVertexArray(),
      isIndexed: false,
      drawCount: 3,
    ),
    resolveMaterial: (handle) => const MaterialDefinition(key: 'test'),
    resolveAlbedo: (handle) => texture,
    resolveShadowMap: () => target,
    resolveCasterLight: () => null,
    resolveSceneDepth: () => target,
    resolveCamera: () => CameraView(
      view: Mat4.identity(),
      projection: Mat4.identity(),
      viewProjection: Mat4.identity(),
      eye: Vec3.zero,
      forward: const Vec3(0, 0, -1),
      near: 0.1,
      far: 100,
      aspect: 16 / 9,
    ),
    resolveSsaoRaw: () => target,
    resolveSsaoBlurred: () => target,
    sceneColorWidth: 384,
    sceneColorHeight: 216,
    resolveResolvedSceneColor: () => target,
    resolveBloomBlurH: () => target,
    resolveBloomBlurV: () => target,
    resolveDofBlurH: () => target,
    resolveDofBlurV: () => target,
    resolveGradeLut: () => texture,
    resolveVhsHistory: () => target,
    resolveTime: () => 0,
    profile: QualityProfile.cinematic,
  );
  final result = graph.build(
    featureContext: const RenderFeatureContext(
      capabilities: RenderCapabilities.safeMinimum,
      profile: QualityProfile.cinematic,
    ),
    availableCapabilities: const {},
    hasValidPreviousFrame: true,
    resources: _Resources(),
  );
  _require(
    result.isValid,
    'cinematic graph must validate: ${result.graph.failures}',
  );
  final ids = result.passes.map((pass) => pass.descriptor.id).toList();
  _require(
    ids.contains('volumetricLight') && ids.contains('volumetricComposite'),
    'cinematic graph must install both volumetric passes: $ids',
  );
}

final class _Resources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}
