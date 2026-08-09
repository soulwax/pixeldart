import '../api/frame.dart';
import '../api/lights.dart';
import '../api/settings.dart';
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
import 'dof.dart';
import 'grade.dart';
import 'present.dart';
import 'ps1.dart';
import 'shadow.dart';
import 'shadowed_world.dart';
import 'ssao.dart';
import 'vhs.dart';
import 'world.dart';
import 'pipeline_resource_layout.dart';
import 'msaa_resolve.dart';

export 'world.dart'
    show AlbedoResolver, MaterialResolver, MaterialTextureResolver;

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
  MaterialTextureResolver? resolveNormal,
  MaterialTextureResolver? resolveOrm,
  MaterialTextureResolver? resolveEmissive,
  required GpuObject Function() resolveShadowMap,
  required SpotLight? Function() resolveCasterLight,
  List<SpotLight> Function()? resolveDirectSpotLights,
  required GpuObject Function() resolveSceneDepth,
  required CameraView Function() resolveCamera,
  required GpuObject Function() resolveSsaoRaw,
  required GpuObject Function() resolveSsaoBlurred,
  required int sceneColorWidth,
  required int sceneColorHeight,
  int shadowMapSize = 512,
  int sampleCount = 1,
  ColorEncoding outputEncoding = ColorEncoding.srgb,
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
  final layout = PipelineResourceLayout(
    internalWidth: sceneColorWidth,
    internalHeight: sceneColorHeight,
    shadowMapSize: shadowMapSize,
    sampleCount: sampleCount,
  );
  final msaaResolve = sampleCount > 1
      ? MsaaResolveFeature(
          device: device,
          sourceResource: layout.sceneColor,
          destinationResource: layout.sceneColorResolved,
        )
      : null;
  final depthPrepass = DepthPrepassFeature(
    programLibrary: programLibrary,
    vertexSource: depthPrepassVertSrc,
    fragmentSource: depthPrepassFragSrc,
    resolveMesh: resolveMesh,
    resolveMaterial: resolveMaterial,
    resolveAlbedo: resolveAlbedo,
    sceneDepthResource: layout.sceneDepth,
  );
  final ssaoOcclusion = SsaoOcclusionFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: ssaoOcclusionFragSrc,
    device: device,
    resolveSceneDepth: resolveSceneDepth,
    resolveCamera: resolveCamera,
    ssaoRawResource: layout.ssaoRaw,
  );
  final ssaoBlur = SsaoBlurFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: ssaoBlurFragSrc,
    device: device,
    resolveSsaoRaw: resolveSsaoRaw,
    resolveSceneDepth: resolveSceneDepth,
    resolveCamera: resolveCamera,
    ssaoWidth: layout.halfWidth,
    ssaoHeight: layout.halfHeight,
    ssaoRawResource: layout.ssaoRaw,
    ssaoBlurredResource: layout.ssaoBlurred,
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
    shadowMapResource: layout.shadowMap,
  );
  final shadowedWorld = ShadowedWorldFeature(
    programLibrary: programLibrary,
    vertexSource: shadowedWorldVertSrc,
    fragmentSource: shadowedWorldFragSrc,
    resolveMesh: resolveMesh,
    resolveMaterial: resolveMaterial,
    resolveAlbedo: resolveAlbedo,
    resolveNormal: resolveNormal,
    resolveOrm: resolveOrm,
    resolveEmissive: resolveEmissive,
    resolveShadowMap: resolveShadowMap,
    resolveLightView: () => lastLightView ?? fallbackLightView,
    resolveCasterLight: resolveCasterLight,
    resolveDirectSpotLights: resolveDirectSpotLights,
    resolveSsaoBlurred: resolveSsaoBlurred,
    useSsao: hasSsao,
    sceneColorWidth: sceneColorWidth,
    sceneColorHeight: sceneColorHeight,
    shadowMapWidth: shadowMapSize,
    shadowMapHeight: shadowMapSize,
    shadowMapResource: layout.shadowMap,
    ssaoResource: layout.ssaoBlurred,
    sceneColorResource: layout.sceneColor,
  );
  // §8.7's bloom pipeline — runs after the MSAA resolve (bootstrap-level,
  // same reasoning as the resolve/present split every prior packet has
  // used), reading the resolved sceneColor's glow attachment rather than
  // the multisampled one, since bindGlowTexture refuses a multisampled
  // target exactly like bindTexture already does for color.
  final postFeatures = <RenderFeature>[];
  var postResource = sampleCount > 1
      ? layout.sceneColorResolved
      : layout.sceneColor;
  if (hasBloom) {
    postFeatures.addAll([
      BloomBlurFeature.horizontal(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomBlurFragSrc,
        device: device,
        resolveSource: resolveResolvedSceneColor,
        texelWidth: layout.halfWidth,
        texelHeight: layout.halfHeight,
        sourceResource: postResource,
        destResource: layout.bloomBlurH,
      ),
      BloomBlurFeature.vertical(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomBlurFragSrc,
        device: device,
        resolveSource: resolveBloomBlurH,
        texelWidth: layout.halfWidth,
        texelHeight: layout.halfHeight,
        sourceResource: layout.bloomBlurH,
        destResource: layout.bloomBlurV,
      ),
      BloomCompositeFeature(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomCompositeFragSrc,
        device: device,
        resolveBloom: resolveBloomBlurV,
        bloomResource: layout.bloomBlurV,
        sceneColorResource: postResource,
        sceneColorPostBloomResource: layout.sceneColorPostBloom,
      ),
    ]);
    postResource = layout.sceneColorPostBloom;
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
        texelWidth: layout.halfWidth,
        texelHeight: layout.halfHeight,
        destResource: layout.dofBlurH,
      ),
      DofBlurFeature.vertical(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomBlurFragSrc,
        device: device,
        resolveSource: resolveDofBlurH,
        texelWidth: layout.halfWidth,
        texelHeight: layout.halfHeight,
        sourceResource: layout.dofBlurH,
        destResource: layout.dofBlurV,
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
        sceneDepthResource: layout.sceneDepth,
        dofBlurredResource: layout.dofBlurV,
        dofOutputResource: layout.dofOutput,
      ),
    ]);
    postResource = layout.dofOutput;
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
        outputResource: layout.gradeOutput,
      ),
    );
    postResource = layout.gradeOutput;
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
        outputResource: layout.ps1Output,
      ),
    );
    postResource = layout.ps1Output;
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
        outputResource: layout.vhsOutput,
      ),
    );
    postResource = layout.vhsOutput;
  }
  final present = PresentFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
    device: device,
    sceneColorResource: postResource,
    outputEncoding: outputEncoding,
  );
  return FeatureGraph([
    depthPrepass,
    if (hasSsao) ssaoOcclusion,
    if (hasSsao) ssaoBlur,
    shadow,
    shadowedWorld,
    if (msaaResolve != null) msaaResolve,
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

  factory PipelineResourcePlan.forProfile(
    QualityProfile profile, {
    int internalWidth = 384,
    int internalHeight = 216,
    int shadowMapSize = 512,
    int sampleCount = 1,
  }) {
    final layout = PipelineResourceLayout(
      internalWidth: internalWidth,
      internalHeight: internalHeight,
      shadowMapSize: shadowMapSize,
      sampleCount: sampleCount,
    );
    final resources = <ResourceRef>{
      layout.sceneColor,
      layout.presentTarget,
      if (sampleCount > 1) layout.sceneColorResolved,
    };
    if (profile.installs(PipelineFeatures.shadows)) {
      resources.addAll([layout.shadowMap, layout.sceneDepth]);
    }
    if (profile.installs(PipelineFeatures.ssao)) {
      resources.addAll([layout.ssaoRaw, layout.ssaoBlurred]);
    }
    if (profile.installs(PipelineFeatures.bloom)) {
      resources.addAll([
        layout.bloomBlurH,
        layout.bloomBlurV,
        layout.sceneColorPostBloom,
      ]);
    }
    if (profile.installs(PipelineFeatures.dof)) {
      resources.addAll([layout.dofBlurH, layout.dofBlurV, layout.dofOutput]);
    }
    if (profile.installs(PipelineFeatures.grade)) {
      resources.add(layout.gradeOutput);
    }
    if (profile.installs(PipelineFeatures.ps1)) {
      resources.add(layout.ps1Output);
    }
    if (profile.installs(PipelineFeatures.vhs)) {
      resources.add(layout.vhsOutput);
    }
    return PipelineResourcePlan(
      resources: Set.unmodifiable(resources),
      hasHistory: profile.installs(PipelineFeatures.vhs),
    );
  }
}
