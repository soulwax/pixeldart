import 'package:pixeldart/rendering/core/graph_resource.dart';
import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/core/render_graph.dart';
import 'package:pixeldart/rendering/passes/bloom_resources.dart';
import 'package:pixeldart/rendering/passes/dof.dart';
import 'package:pixeldart/rendering/passes/dof_resources.dart';
import 'package:pixeldart/rendering/passes/grade.dart';
import 'package:pixeldart/rendering/passes/grade_resources.dart';
import 'package:pixeldart/rendering/passes/pass_context_impl.dart';
import 'package:pixeldart/rendering/passes/ps1.dart';
import 'package:pixeldart/rendering/passes/ps1_resources.dart';
import 'package:pixeldart/rendering/passes/safe_graph_resources.dart';
import 'package:pixeldart/rendering/passes/vhs.dart';
import 'package:pixeldart/rendering/passes/vhs_resources.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

/// RP-3: pins [PipelineFeatures] vocabulary, [QualityProfile] presets, and
/// the parameterized input/source resources on DOF/grade/PS1/VHS that let the
/// pipeline assembler wire alternate chain links when upstream effect groups
/// are excluded. Each parameter must be mutation-live: changing it changes
/// which graph resource a pass declares and reads at execute time.
void main() {
  _pipelineFeaturesVocabulary();
  _qualityProfilePresets();
  _dofSourceResourceIsConfigurable();
  _gradeInputResourceIsConfigurable();
  _ps1InputResourceIsConfigurable();
  _vhsInputResourceIsConfigurable();
  print('Renderer post-chain parameter fixtures passed.');
}

const _featureContext = RenderFeatureContext(
  capabilities: RenderCapabilities.safeMinimum,
  profile: QualityProfile.ps1Full,
);

const _customChainInput = ResourceRef(
  name: 'customChainInput',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
);

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

final class _FakeFrameScene implements FrameSceneData {
  final PostProcessState postState;
  const _FakeFrameScene(this.postState);

  @override
  Iterable<Object> get opaqueBatches => const [];
  @override
  Iterable<Object> get blendedItemsBackToFront => const [];
  @override
  Object get camera => _fakeCamera;
  @override
  Object get environment => const FrameEnvironment();
  @override
  Object get post => postState;
}

final class _RecordingPassContext implements RenderPassContext {
  final Map<String, BoundResourceView> views;
  final DrawCommandEncoder encoder;
  final List<String> viewedResources = [];

  _RecordingPassContext({
    required this.views,
    required this.encoder,
    required this.frameScene,
  });

  @override
  final FrameSceneData frameScene;

  @override
  ResourceView viewOf(String resourceName) {
    viewedResources.add(resourceName);
    final view = views[resourceName];
    if (view == null) {
      throw StateError('no view for $resourceName');
    }
    return view;
  }

  @override
  DrawCommandEncoder get commandEncoder => encoder;
}

void _pipelineFeaturesVocabulary() {
  const ids = [
    PipelineFeatures.shadows,
    PipelineFeatures.ssao,
    PipelineFeatures.bloom,
    PipelineFeatures.dof,
    PipelineFeatures.grade,
    PipelineFeatures.ps1,
    PipelineFeatures.vhs,
  ];
  if (ids.toSet().length != ids.length) {
    throw StateError('PipelineFeatures ids must be unique');
  }
}

void _qualityProfilePresets() {
  if (QualityProfile.safe.installedFeatures.isNotEmpty) {
    throw StateError('safe profile must install no effect groups');
  }
  if (!QualityProfile.minimal.installs(PipelineFeatures.shadows)) {
    throw StateError('minimal profile must install shadows');
  }
  if (QualityProfile.minimal.installedFeatures.length != 1) {
    throw StateError('minimal profile must install only shadows');
  }

  for (final feature in [
    PipelineFeatures.shadows,
    PipelineFeatures.ssao,
    PipelineFeatures.bloom,
    PipelineFeatures.dof,
    PipelineFeatures.grade,
  ]) {
    if (!QualityProfile.clean.installs(feature)) {
      throw StateError('clean profile must install $feature');
    }
  }
  for (final feature in [PipelineFeatures.ps1, PipelineFeatures.vhs]) {
    if (QualityProfile.clean.installs(feature)) {
      throw StateError('clean profile must exclude $feature');
    }
  }

  for (final feature in [
    PipelineFeatures.shadows,
    PipelineFeatures.ssao,
    PipelineFeatures.bloom,
    PipelineFeatures.dof,
    PipelineFeatures.grade,
    PipelineFeatures.ps1,
    PipelineFeatures.vhs,
  ]) {
    if (!QualityProfile.ps1Full.installs(feature)) {
      throw StateError('ps1Full profile must install $feature');
    }
  }
}

Iterable<String> _readResourceNames(RenderFeature feature, String passId) {
  final builder = RenderGraphBuilder();
  feature.declare(builder, _featureContext);
  final graph = builder.build(
    availableCapabilities: const {},
    hasValidPreviousFrame: true,
  );
  final pass = graph.orderedPasses.firstWhere(
    (candidate) => candidate.id == passId,
    orElse: () => throw StateError('pass $passId not declared'),
  );
  return pass.reads.map((use) => use.resource.name);
}

bool _passReads(RenderPass pass, String resourceName) {
  return pass.descriptor.uses.any(
    (use) =>
        use.access != ResourceAccess.write &&
        use.resource.name == resourceName,
  );
}

void _expectReads(
  Iterable<String> reads,
  String expected,
  String what,
) {
  if (!reads.contains(expected)) {
    throw StateError('$what must read $expected, got $reads');
  }
}

FakeGpuDevice _freshDevice() => FakeGpuDevice();

BoundResourceView _viewFor(ResourceRef resource, GpuObject gpuObject) {
  return BoundResourceView(resource, gpuObject);
}

void _expectExecuteReadsInput(
  FakeGpuDevice device,
  RenderPass pass,
  ResourceRef inputResource,
  String outputResourceName,
  String what,
) {
  final outputTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4),
  );
  final inputTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4),
  );
  final context = _RecordingPassContext(
    views: {
      inputResource.name: _viewFor(inputResource, inputTarget),
      outputResourceName: _viewFor(
        ResourceRef(
          name: outputResourceName,
          format: ResourceFormat.rgba8,
          width: 4,
          height: 4,
        ),
        outputTarget,
      ),
    },
    encoder: DeviceDrawCommandEncoder(device),
    frameScene: const _FakeFrameScene(PostProcessState()),
  );
  pass.execute(context);
  if (!context.viewedResources.contains(inputResource.name)) {
    throw StateError(
      '$what execute must view ${inputResource.name}, got '
      '${context.viewedResources}',
    );
  }
}

void _dofSourceResourceIsConfigurable() {
  final device = _freshDevice();
  final library = ProgramLibrary(device);
  final sourceTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4),
  );
  final sceneDepthTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4, hasDepth: true),
  );

  final defaultBlurH = DofBlurFeature.horizontal(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: () => sourceTarget,
  );
  _expectReads(
    _readResourceNames(defaultBlurH, 'dofBlurH'),
    BloomResources.sceneColorPostBloom.name,
    'default dofBlurH',
  );

  final customBlurH = DofBlurFeature.horizontal(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: () => sourceTarget,
    sourceResource: SafeGraphResources.sceneColor,
  );
  _expectReads(
    _readResourceNames(customBlurH, 'dofBlurH'),
    SafeGraphResources.sceneColor.name,
    'custom dofBlurH',
  );

  final defaultComposite = DofCompositeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: dofCompositeFragSrc,
    device: device,
    resolveSharp: () => sourceTarget,
    resolveBlurred: () => sourceTarget,
    resolveSceneDepth: () => sceneDepthTarget,
    resolveCamera: () => _fakeCamera,
  );
  final defaultCompositePass =
      defaultComposite.createPasses(_AlwaysAvailableResources()).single;
  if (!_passReads(
    defaultCompositePass,
    BloomResources.sceneColorPostBloom.name,
  )) {
    throw StateError('default dofComposite must read sceneColorPostBloom');
  }

  final customComposite = DofCompositeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: dofCompositeFragSrc,
    device: device,
    resolveSharp: () => sourceTarget,
    resolveBlurred: () => sourceTarget,
    resolveSceneDepth: () => sceneDepthTarget,
    resolveCamera: () => _fakeCamera,
    sourceResource: _customChainInput,
  );
  final customCompositePass =
      customComposite.createPasses(_AlwaysAvailableResources()).single;
  if (!_passReads(customCompositePass, _customChainInput.name)) {
    throw StateError('custom dofComposite must read customChainInput');
  }
}

void _gradeInputResourceIsConfigurable() {
  final device = _freshDevice();
  final library = ProgramLibrary(device);
  final lutTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );

  final defaultFeature = GradeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: gradeLutFragSrc,
    device: device,
    resolveLut: () => lutTexture,
  );
  final defaultPass =
      defaultFeature.createPasses(_AlwaysAvailableResources()).single;
  if (!_passReads(defaultPass, DofResources.dofOutput.name)) {
    throw StateError('default grade must read dofOutput');
  }

  final customFeature = GradeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: gradeLutFragSrc,
    device: device,
    resolveLut: () => lutTexture,
    inputResource: _customChainInput,
  );
  final customPass =
      customFeature.createPasses(_AlwaysAvailableResources()).single;
  if (!_passReads(customPass, _customChainInput.name)) {
    throw StateError('custom grade must read customChainInput');
  }
  _expectExecuteReadsInput(
    device,
    customPass,
    _customChainInput,
    GradeResources.gradeOutput.name,
    'grade',
  );
}

void _ps1InputResourceIsConfigurable() {
  final device = _freshDevice();
  final library = ProgramLibrary(device);

  final defaultFeature = Ps1QuantizeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: ps1QuantizeFragSrc,
    device: device,
  );
  final defaultPass =
      defaultFeature.createPasses(_AlwaysAvailableResources()).single;
  if (!_passReads(defaultPass, GradeResources.gradeOutput.name)) {
    throw StateError('default ps1Quantize must read gradeOutput');
  }

  final customFeature = Ps1QuantizeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: ps1QuantizeFragSrc,
    device: device,
    inputResource: _customChainInput,
  );
  final customPass =
      customFeature.createPasses(_AlwaysAvailableResources()).single;
  if (!_passReads(customPass, _customChainInput.name)) {
    throw StateError('custom ps1Quantize must read customChainInput');
  }
  _expectExecuteReadsInput(
    device,
    customPass,
    _customChainInput,
    Ps1Resources.ps1Output.name,
    'ps1Quantize',
  );
}

void _vhsInputResourceIsConfigurable() {
  final device = _freshDevice();
  final library = ProgramLibrary(device);
  final ghostTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4),
  );

  final defaultFeature = VhsFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: vhsFragSrc,
    device: device,
    resolveHistory: () => ghostTarget,
    resolveTime: () => 0.0,
  );
  final defaultPass =
      defaultFeature.createPasses(_AlwaysAvailableResources()).single;
  if (!_passReads(defaultPass, Ps1Resources.ps1Output.name)) {
    throw StateError('default vhs must read ps1Output');
  }

  final customFeature = VhsFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: vhsFragSrc,
    device: device,
    resolveHistory: () => ghostTarget,
    resolveTime: () => 0.0,
    inputResource: _customChainInput,
  );
  final customPass =
      customFeature.createPasses(_AlwaysAvailableResources()).single;
  if (!_passReads(customPass, _customChainInput.name)) {
    throw StateError('custom vhs must read customChainInput');
  }
  _expectExecuteReadsInput(
    device,
    customPass,
    _customChainInput,
    VhsResources.vhsOutput.name,
    'vhs',
  );
}
