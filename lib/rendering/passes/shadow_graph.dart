import '../api/frame.dart';
import '../api/lights.dart';
import '../core/feature_graph.dart';
import '../core/program_library.dart';
import '../webgl/device_api.dart';
import '../webgl/generated_shaders.dart';
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
import 'vhs_resources.dart';
import 'world.dart';

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
}) {
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
    resolveLightView: () =>
        lastLightView ??
        (throw StateError(
          'buildShadowGraph: shadowedWorld pass ran before shadowCaster '
          'computed a light view this frame — the shadow pass must execute '
          'first, matching its beforeShadow/beforeWorld stage ordering',
        )),
    resolveCasterLight: resolveCasterLight,
    resolveSsaoBlurred: resolveSsaoBlurred,
    sceneColorWidth: sceneColorWidth,
    sceneColorHeight: sceneColorHeight,
  );
  // §8.7's bloom pipeline — runs after the MSAA resolve (bootstrap-level,
  // same reasoning as the resolve/present split every prior packet has
  // used), reading the resolved sceneColor's glow attachment rather than
  // the multisampled one, since bindGlowTexture refuses a multisampled
  // target exactly like bindTexture already does for color.
  final bloomBlurH = BloomBlurFeature.horizontal(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: resolveResolvedSceneColor,
  );
  final bloomBlurV = BloomBlurFeature.vertical(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: resolveBloomBlurH,
  );
  final bloomComposite = BloomCompositeFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: bloomCompositeFragSrc,
    device: device,
    resolveBloom: resolveBloomBlurV,
  );
  // RV-09's DOF pipeline — runs after bloom's composite, blurring bloom's
  // own physical output (the same `sceneColorTarget` bloom composited onto
  // in place) rather than the pre-bloom scene, so a defocused background
  // shows its glow softened too, not sharp glow floating over a blurred
  // backdrop. Unlike bloom, its composite writes a genuinely distinct
  // target (DofResources.dofOutput) rather than a `nextVersion()` of
  // `sceneColor`, since it must read the sharp scene color as one input
  // while writing a different texture in the same draw call.
  final dofBlurH = DofBlurFeature.horizontal(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: resolveResolvedSceneColor,
  );
  final dofBlurV = DofBlurFeature.vertical(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: bloomBlurFragSrc,
    device: device,
    resolveSource: resolveDofBlurH,
  );
  final dofComposite = DofCompositeFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: dofCompositeFragSrc,
    device: device,
    resolveSharp: resolveResolvedSceneColor,
    resolveBlurred: resolveDofBlurV,
    resolveSceneDepth: resolveSceneDepth,
    resolveCamera: resolveCamera,
  );
  // RV-09 rung 2's LUT grade — §6.2 places this immediately after DOF and
  // before PS1 quantize+dither/VHS (neither exists yet). Reads DOF's own
  // output, writes a distinct target for the same reason DOF itself does.
  final grade = GradeFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: gradeLutFragSrc,
    device: device,
    resolveLut: resolveGradeLut,
  );
  // RV-09 rung 3's PS1 quantize+dither — §6.2 places this immediately after
  // LUT grade and before VHS (not built yet).
  final ps1Quantize = Ps1QuantizeFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: ps1QuantizeFragSrc,
    device: device,
  );
  // RV-09 rung 4's VHS recording-stage treatment — §6.2's final pre-present
  // stage. Reads ps1Quantize's own output and writes/history-reads its own
  // distinct vhsOutput (a real feedback ping-pong, unlike every prior
  // stage's simple linear read-one-write-another).
  final vhs = VhsFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: vhsFragSrc,
    device: device,
    resolveHistory: resolveVhsHistory,
    resolveTime: resolveTime,
  );
  final present = PresentFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
    device: device,
    sceneColorResource: VhsResources.vhsOutput,
  );
  return FeatureGraph([
    depthPrepass,
    ssaoOcclusion,
    ssaoBlur,
    shadow,
    shadowedWorld,
    bloomBlurH,
    bloomBlurV,
    bloomComposite,
    dofBlurH,
    dofBlurV,
    dofComposite,
    grade,
    ps1Quantize,
    vhs,
    present,
  ]);
}
