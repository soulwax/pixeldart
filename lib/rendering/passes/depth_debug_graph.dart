import '../core/feature_graph.dart';
import '../core/program_library.dart';
import '../webgl/device_api.dart';
import '../webgl/generated_shaders.dart';
import 'depth_debug.dart';
import 'depth_prepass.dart';
import 'present.dart';
import 'world.dart';

/// A fifth graph alongside safe/textured/shadow (`buildSafeGraph`/
/// `buildTexturedGraph`/`buildShadowGraph`): `depthPrepass -> depthDebug ->
/// present`, exercising §8.4 rung 4's depth prepass as a standalone,
/// directly-inspectable view. `buildShadowGraph` also runs its own real
/// depth prepass every frame now (feeding SSAO) — this graph's copy is
/// deliberately independent (own program ids, own pass instance) rather
/// than reusing that one, so toggling into the debug view can never
/// interfere with the main pipeline's already-fresh depth. Kept as its own
/// assembly, same reasoning as every previous `build*Graph` function.
FeatureGraph buildDepthDebugGraph(
  ProgramLibrary programLibrary, {
  required GpuDevice device,
  required MeshResolver resolveMesh,
  required MaterialResolver resolveMaterial,
  required AlbedoResolver resolveAlbedo,
  required GpuObject Function() resolveSceneDepth,
  required double near,
  required double far,
  required double displayRange,
}) {
  // A distinct programId from buildShadowGraph's own DepthPrepassFeature —
  // same reasoning as this graph's PresentFeature below: two independently
  // constructed features must never publish under the same ProgramLibrary
  // key, or the second one silently deletes the first's compiled program.
  final depthPrepass = DepthPrepassFeature(
    programLibrary: programLibrary,
    vertexSource: depthPrepassVertSrc,
    fragmentSource: depthPrepassFragSrc,
    resolveMesh: resolveMesh,
    resolveMaterial: resolveMaterial,
    resolveAlbedo: resolveAlbedo,
    programId: 'depthPrepassDebug',
  );
  final depthDebug = DepthDebugFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: depthDebugFragSrc,
    device: device,
    resolveSceneDepth: resolveSceneDepth,
    near: near,
    far: far,
    displayRange: displayRange,
  );
  // A distinct programId from buildShadowGraph's own PresentFeature — both
  // graphs share one ProgramLibrary in the bootstrap, and ProgramLibrary
  // .publish deletes the previous program under the same id once a new one
  // compiles, so two PresentFeatures both defaulting to 'present' would
  // have this graph's construction silently delete the other graph's
  // already-compiled present program out from under it.
  final present = PresentFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
    device: device,
    programId: 'presentDepthDebug',
  );
  return FeatureGraph([depthPrepass, depthDebug, present]);
}
