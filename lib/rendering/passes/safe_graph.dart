import '../core/feature_graph.dart';
import '../core/program_library.dart';
import '../webgl/device_api.dart';
import '../webgl/generated_shaders.dart';
import 'present.dart';
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
}) {
  final world = WorldFeature(
    programLibrary: programLibrary,
    vertexSource: safeWorldVertSrc,
    fragmentSource: safeWorldFragSrc,
    resolveMesh: resolveMesh,
  );
  final present = PresentFeature(
    programLibrary: programLibrary,
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
    device: device,
  );
  return FeatureGraph([world, present]);
}

const List<String> safeGraphFeatureIds = ['world', 'present'];
