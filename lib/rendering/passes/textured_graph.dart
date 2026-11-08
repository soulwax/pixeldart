import '../core/feature_graph.dart';
import '../core/program_library.dart';
import '../webgl/device_api.dart';
import '../webgl/generated_shaders.dart';
import 'present.dart';
import 'textured_world.dart';
import 'world.dart';

/// A second graph alongside the mandatory safe graph (`buildSafeGraph`):
/// `texturedWorld -> present`, exercising the sampler2D/mipmap path
/// `WorldFeature` deliberately never touches. Kept as its own assembly
/// function, not a flag on `buildSafeGraph`, so the safe graph's own
/// already-proven correctness has no new code path through it.
FeatureGraph buildTexturedGraph(
  ProgramLibrary programLibrary, {
  required GpuDevice device,
  required MeshResolver resolveMesh,
  required GpuObject Function() resolveAlbedoTexture,
}) {
  final texturedWorld = TexturedWorldFeature(
    programLibrary: programLibrary,
    vertexSource: texturedWorldVertSrc,
    fragmentSource: texturedWorldFragSrc,
    resolveMesh: resolveMesh,
    resolveAlbedoTexture: resolveAlbedoTexture,
  );
  final present = PresentFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
    device: device,
  );
  return FeatureGraph([texturedWorld, present]);
}
