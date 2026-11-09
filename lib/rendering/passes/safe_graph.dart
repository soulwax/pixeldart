import '../core/feature_graph.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/render_feature.dart';
import '../api/settings.dart';
import '../api/shaders.dart';
import '../webgl/device_api.dart';
import '../webgl/generated_shaders.dart';
import 'host_post.dart';
import 'post_chain.dart';
import 'present.dart';
import 'safe_graph_resources.dart';
import 'bloom.dart';
import 'msaa_resolve.dart';
import 'pipeline_resource_layout.dart';
import 'sprites.dart';
import 'world.dart';

FeatureGraph buildSafeGraph(
  ProgramLibrary programLibrary, {
  required GpuDevice device,
  required MeshResolver resolveMesh,
  int internalWidth = 384,
  int internalHeight = 216,
  int sampleCount = 1,
  ColorEncoding outputEncoding = ColorEncoding.srgb,
  SpritesFeature? sprites,
  bool bloom = false,
  GpuObject Function()? resolveResolvedSceneColor,
  GpuObject Function()? resolveBloomBlurH,
  GpuObject Function()? resolveBloomBlurV,
  Map<String, ShaderOverride> postEffects = const {},
}) {
  final sceneColor = ResourceRef(
    name: SafeGraphResources.sceneColor.name,
    format: SafeGraphResources.sceneColor.format,
    width: internalWidth,
    height: internalHeight,
    samples: sampleCount,
  );
  final resolvedSceneColor = ResourceRef(
    name: sceneColor.name,
    format: sceneColor.format,
    width: internalWidth,
    height: internalHeight,
    version: sceneColor.version + 1,
  );
  final world = WorldFeature(
    programLibrary: programLibrary,
    vertexSource: safeWorldVertSrc,
    fragmentSource: safeWorldFragSrc,
    resolveMesh: resolveMesh,
    sceneColorResource: sceneColor,
  );
  var postResource = sampleCount > 1 ? resolvedSceneColor : sceneColor;
  final postFeatures = <RenderFeature>[];
  if (bloom) {
    final layout = PipelineResourceLayout(
      internalWidth: internalWidth,
      internalHeight: internalHeight,
      shadowMapSize: 1,
      sampleCount: sampleCount,
    );
    postFeatures.addAll([
      BloomBlurFeature.horizontal(
        programLibrary: programLibrary,
        vertexSource: presentVertSrc,
        fragmentSource: bloomBlurFragSrc,
        device: device,
        resolveSource: resolveResolvedSceneColor!,
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
        resolveSource: resolveBloomBlurH!,
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
        resolveBloom: resolveBloomBlurV!,
        bloomResource: layout.bloomBlurV,
        sceneColorResource: postResource,
        sceneColorPostBloomResource: layout.sceneColorPostBloom,
      ),
    ]);
    postResource = layout.sceneColorPostBloom;
  }
  final chain = PostChain();
  postResource = appendPostEffects(
    postFeatures,
    programLibrary: programLibrary,
    device: device,
    effects: postEffects,
    input: postResource,
    width: internalWidth,
    height: internalHeight,
    chain: chain,
  );
  final present = PresentFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
    device: device,
    sceneColorResource: postResource,
    outputEncoding: outputEncoding,
    chain: chain,
  );
  final resolve = sampleCount > 1
      ? MsaaResolveFeature(
          device: device,
          sourceResource: sceneColor,
          destinationResource: resolvedSceneColor,
        )
      : null;
  return FeatureGraph([
    world,
    if (sprites != null) sprites,
    if (resolve != null) resolve,
    ...postFeatures,
    present,
    if (sprites != null) sprites.overlay,
  ]);
}

const List<String> safeGraphFeatureIds = ['world', 'present'];
