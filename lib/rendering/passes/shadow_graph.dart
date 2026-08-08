import '../api/frame.dart';
import '../api/lights.dart';
import '../api/capabilities.dart';
import '../core/feature_graph.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/render_feature.dart';
import '../webgl/device_api.dart';
import '../webgl/generated_shaders.dart';
import '../math/vec.dart';
import 'bloom.dart';
import 'depth_prepass.dart';
import 'depth_resources.dart';
import 'dof.dart';
import 'grade.dart';
import 'present.dart';
import 'ps1.dart';
import 'shadow.dart';
import 'shadowed_world.dart';
import 'ssao.dart';
import 'vhs.dart';
import 'vhs_resources.dart';
import 'world.dart';
import 'safe_graph_resources.dart';
import 'shadow_resources.dart';
import 'ssao_resources.dart';
import 'bloom_resources.dart';
import 'dof_resources.dart';
import 'grade_resources.dart';
import 'ps1_resources.dart';

export 'world.dart' show AlbedoResolver, MaterialResolver;

/// The main graph: `depthPrepass -> ssaoOcclusion -> ssaoBlur -> shadowCaster
/// -> shadowedWorld -> present`, folding §8.4's shadow map (rung 3) and
/// §8.5's SSAO (rung 5, depending on rung 4's depth prepass) into one
/// assembly rather than two, since — unlike `buildDepthDebugGraph`, which
/// exists purely to prove the prepass in isolation — SSAO's whole purpose
/// is feeding `shadowedWorld`'s ambient term, so it has no standalone
/// existence separate from the graph that actually shades geometry.
FeatureGraph buildShadowGraph(
  ProgramLibrary programLibrary, {
  required GpuDevice device,
  required MeshResolver resolveMesh,
  required MaterialResolver resolveMaterial,
  required AlbedoResolver resolveAlbedo,
  required GpuObject Function() resolveShadowMap,
  required SpotLight? Function() resolveCasterLight,
  required GpuObject Function() resolveSceneDepth,
  required CameraView Function() resolveCamera,
  required GpuObject Function() resolveSsaoRaw,
  required GpuObject Function() resolveSsaoBlurred,
  required int sceneColorWidth,
  required int sceneColorHeight,
  required GpuObject Function() resolveResolvedSceneColor,
  required GpuObject Function() resolveBloomBlurH,
  required GpuObject Function() resolveBloomBlurV,
  required GpuObject Function() resolveDofBlurH,
  required GpuObject Function() resolveDofBlurV,
  required GpuObject Function() resolveGradeLut,
  required GpuObject Function() resolveVhsHistory,
  required double Function() resolveTime,
  QualityProfile profile = QualityProfile.ps1Full,
}) {
  if (!profile.installs(PipelineFeatures.shadows)) {
    throw ArgumentError.value(
      profile,
      'profile',
      'buildShadowGraph requires the shadows feature; use buildSafeGraph for a shadow-free profile',
    );
  }
  final hasSsao = profile.installs(PipelineFeatures.ssao);
  final hasBloom = profile.installs(PipelineFeatures.bloom);
  final hasDof = profile.installs(PipelineFeatures.dof);
  final hasGrade = profile.installs(PipelineFeatures.grade);
  final hasPs1 = profile.installs(PipelineFeatures.ps1);
  final hasVhs = profile.installs(PipelineFeatures.vhs);
  final depthPrepass = DepthPrepassFeature(
    programLibrary: programLibrary,
    vertexSource: depthPrepassVertSrc,
    fragmentSource: depthPrepassFragSrc,
    resolveMesh: resolveMesh,
    resolveMaterial: resolveMaterial,
    resolveAlbedo: resolveAlbedo,
  );
  final ssaoOcclusion = SsaoOcclusionFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: ssaoOcclusionFragSrc,
    device: device,
    resolveSceneDepth: resolveSceneDepth,
    resolveCamera: resolveCamera,
  );
  final ssaoBlur = SsaoBlurFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: ssaoBlurFragSrc,
    device: device,
    resolveSsaoRaw: resolveSsaoRaw,
    resolveSceneDepth: resolveSceneDepth,
    resolveCamera: resolveCamera,
  );
  ShadowLightView? lastLightView;
  final fallbackLightView = ShadowLightView.fromSpotLight(
    const SpotLight(
      id: -1,
      position: Vec3(0, 1, 0),
      direction: Vec3(0, -1, 0),
      color: LinearColor.white,
      range: 1,
      innerConeRadians: 0.3,
      outerConeRadians: 0.5,
    ),
  );
  final shadow = ShadowFeature(
    programLibrary: programLibrary,
    vertexSource: shadowCasterVertSrc,
    fragmentSource: shadowCasterFragSrc,
    resolveMesh: resolveMesh,
    resolveMaterial: resolveMaterial,
    resolveAlbedo: resolveAlbedo,
    resolveCasterLight: resolveCasterLight,
    onLightViewComputed: (view) => lastLightView = view,
  );
  final shadowedWorld = ShadowedWorldFeature(
    programLibrary: programLibrary,
    vertexSource: shadowedWorldVertSrc,
    fragmentSource: shadowedWorldFragSrc,
    resolveMesh: resolveMesh,
    resolveMaterial: resolveMaterial,
    resolveAlbedo: resolveAlbedo,
    resolveShadowMap: resolveShadowMap,
    resolveLightView: () => lastLightView ?? fallbackLightView,
    resolveCasterLight: resolveCasterLight,
    resolveSsaoBlurred: resolveSsaoBlurred,
    useSsao: hasSsao,
    sceneColorWidth: sceneColorWidth,
    sceneColorHeight: sceneColorHeight,
  );
  // §8.7's bloom pipeline — runs after the MSAA resolve (bootstrap-level,
  // same reasoning as the resolve/present split every prior packet has
  // used), reading the resolved sceneColor's glow attachment rather than
  // the multisampled one, since bindGlowTexture refuses a multisampled
  // target exactly like bindTexture already does for color.
  final postFeatures = <RenderFeature>[];
  var postResource = SafeGraphResources.sceneColor;
  if (hasBloom) {
    postFeatures.addAll([
      BloomBlurFeature.horizontal(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomBlurFragSrc,
        device: device,
        resolveSource: resolveResolvedSceneColor,
      ),
      BloomBlurFeature.vertical(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomBlurFragSrc,
        device: device,
        resolveSource: resolveBloomBlurH,
      ),
      BloomCompositeFeature(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomCompositeFragSrc,
        device: device,
        resolveBloom: resolveBloomBlurV,
      ),
    ]);
    postResource = BloomResources.sceneColorPostBloom;
  }
  // RV-09's DOF pipeline — runs after bloom's composite, blurring bloom's
  // own physical output (the same `sceneColorTarget` bloom composited onto
  // in place) rather than the pre-bloom scene, so a defocused background
  // shows its glow softened too, not sharp glow floating over a blurred
  // backdrop. Unlike bloom, its composite writes a genuinely distinct
  // target (DofResources.dofOutput) rather than a `nextVersion()` of
  // `sceneColor`, since it must read the sharp scene color as one input
  // while writing a different texture in the same draw call.
  if (hasDof) {
    postFeatures.addAll([
      DofBlurFeature.horizontal(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomBlurFragSrc,
        device: device,
        resolveSource: resolveResolvedSceneColor,
        sourceResource: postResource,
      ),
      DofBlurFeature.vertical(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomBlurFragSrc,
        device: device,
        resolveSource: resolveDofBlurH,
      ),
      DofCompositeFeature(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: dofCompositeFragSrc,
        device: device,
        resolveSharp: resolveResolvedSceneColor,
        resolveBlurred: resolveDofBlurV,
        resolveSceneDepth: resolveSceneDepth,
        resolveCamera: resolveCamera,
        sourceResource: postResource,
      ),
    ]);
    postResource = DofResources.dofOutput;
  }
  // RV-09 rung 2's LUT grade — §6.2 places this immediately after DOF and
  // before PS1 quantize+dither/VHS (neither exists yet). Reads DOF's own
  // output, writes a distinct target for the same reason DOF itself does.
  if (hasGrade) {
    postFeatures.add(
      GradeFeature(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: gradeLutFragSrc,
        device: device,
        resolveLut: resolveGradeLut,
        inputResource: postResource,
      ),
    );
    postResource = GradeResources.gradeOutput;
  }
  // RV-09 rung 3's PS1 quantize+dither — §6.2 places this immediately after
  // LUT grade and before VHS (not built yet).
  if (hasPs1) {
    postFeatures.add(
      Ps1QuantizeFeature(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: ps1QuantizeFragSrc,
        device: device,
        inputResource: postResource,
      ),
    );
    postResource = Ps1Resources.ps1Output;
  }
  // RV-09 rung 4's VHS recording-stage treatment — §6.2's final pre-present
  // stage. Reads ps1Quantize's own output and writes/history-reads its own
  // distinct vhsOutput (a real feedback ping-pong, unlike every prior
  // stage's simple linear read-one-write-another).
  if (hasVhs) {
    postFeatures.add(
      VhsFeature(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: vhsFragSrc,
        device: device,
        resolveHistory: resolveVhsHistory,
        resolveTime: resolveTime,
        inputResource: postResource,
      ),
    );
    postResource = VhsResources.vhsOutput;
  }
  final present = PresentFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
    device: device,
    sceneColorResource: postResource,
  );
  return FeatureGraph([
    depthPrepass,
    if (hasSsao) ssaoOcclusion,
    if (hasSsao) ssaoBlur,
    shadow,
    shadowedWorld,
    ...postFeatures,
    present,
  ]);
}

/// Describes the graph-owned targets for a profile before a GPU target is
/// allocated. Excluded groups are absent, so an assembler can prove that
/// profile changes do not leave orphan targets behind.
final class PipelineResourcePlan {
  final Set<ResourceRef> resources;
  final bool hasHistory;

  const PipelineResourcePlan({
    required this.resources,
    required this.hasHistory,
  });

  factory PipelineResourcePlan.forProfile(QualityProfile profile) {
    final resources = <ResourceRef>{
      SafeGraphResources.sceneColor,
      SafeGraphResources.presentTarget,
    };
    if (profile.installs(PipelineFeatures.shadows)) {
      resources.addAll([
        ShadowResources.shadowMap,
        DepthPrepassResources.sceneDepth,
      ]);
    }
    if (profile.installs(PipelineFeatures.ssao)) {
      resources.addAll([SsaoResources.ssaoRaw, SsaoResources.ssaoBlurred]);
    }
    if (profile.installs(PipelineFeatures.bloom)) {
      resources.addAll([
        BloomResources.bloomBlurH,
        BloomResources.bloomBlurV,
        BloomResources.sceneColorPostBloom,
      ]);
    }
    if (profile.installs(PipelineFeatures.dof)) {
      resources.addAll([
        DofResources.dofBlurH,
        DofResources.dofBlurV,
        DofResources.dofOutput,
      ]);
    }
    if (profile.installs(PipelineFeatures.grade)) {
      resources.add(GradeResources.gradeOutput);
    }
    if (profile.installs(PipelineFeatures.ps1)) {
      resources.add(Ps1Resources.ps1Output);
    }
    if (profile.installs(PipelineFeatures.vhs)) {
      resources.add(VhsResources.vhsOutput);
    }
    return PipelineResourcePlan(
      resources: Set.unmodifiable(resources),
      hasHistory: profile.installs(PipelineFeatures.vhs),
    );
  }
}
