import '../core/feature_graph.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../api/settings.dart';
import '../webgl/device_api.dart';
import '../webgl/generated_shaders.dart';
import 'present.dart';
import 'safe_graph_resources.dart';
import 'msaa_resolve.dart';
import 'world.dart';

/// Assembles §6.1's mandatory safe graph — `world opaque -> world
/// transparent -> present` — from concrete features wired to the real
/// generated shader sources. This is the first tangible artifact plan §16's
/// milestone names: "a safe world-to-present graph." Building the
/// `FeatureGraph`/`ProgramLibrary` wiring against a real `GpuDevice` and
/// confirming it actually renders still needs a browser; this function is
/// proven only against `FakeGpuDevice` so far (`tools/renderer/
/// test_safe_graph.dart`).
FeatureGraph buildSafeGraph(
  ProgramLibrary programLibrary, {
  required GpuDevice device,
  required MeshResolver resolveMesh,
  int internalWidth = 384,
  int internalHeight = 216,
  int sampleCount = 1,
  ColorEncoding outputEncoding = ColorEncoding.srgb,
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
  final present = PresentFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
    device: device,
    sceneColorResource: sampleCount > 1 ? resolvedSceneColor : sceneColor,
    outputEncoding: outputEncoding,
  );
  final resolve = sampleCount > 1
      ? MsaaResolveFeature(
          device: device,
          sourceResource: sceneColor,
          destinationResource: resolvedSceneColor,
        )
      : null;
  return FeatureGraph([world, if (resolve != null) resolve, present]);
}

const List<String> safeGraphFeatureIds = ['world', 'present'];
