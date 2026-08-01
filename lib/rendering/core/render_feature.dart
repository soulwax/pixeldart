import '../api/capabilities.dart';
import '../webgl/state_cache.dart';
import 'graph_pass.dart';
import 'graph_resource.dart';
import 'render_graph.dart';

/// Passed to `RenderFeature.declare()`; carries only what a feature needs to
/// describe itself into the graph, not live GPU state (§5.6).
final class RenderFeatureContext {
  final RenderCapabilities capabilities;
  final QualityProfile profile;

  const RenderFeatureContext({
    required this.capabilities,
    required this.profile,
  });
}

enum PolygonOffset { none, shadowBias }

/// Full per-pass GL state a feature must declare up front (§5.6, §6.4) —
/// nothing a pass does at `execute()` time may add state this descriptor
/// did not already name.
final class PassDescriptor {
  final String id;
  final GraphStage stage;
  final List<ResourceUse> uses;
  final bool depthTest;
  final bool depthWrite;
  final bool blendEnable;
  final bool cullEnable;
  final PolygonOffset polygonOffset;
  final Set<String> requiredCapabilities;

  const PassDescriptor({
    required this.id,
    required this.stage,
    required this.uses,
    this.depthTest = true,
    this.depthWrite = true,
    this.blendEnable = false,
    this.cullEnable = true,
    this.polygonOffset = PolygonOffset.none,
    this.requiredCapabilities = const {},
  });

  PassDeclaration toPassDeclaration({
    bool Function() enabledPredicate = _alwaysEnabled,
  }) => PassDeclaration(
    id: id,
    stage: stage,
    uses: uses,
    requiredCapabilities: requiredCapabilities,
    enabledPredicate: enabledPredicate,
  );

  /// The real GL state this pass's declaration commits it to — a pass's
  /// `execute()` must apply exactly this via `DrawCommandEncoder
  /// .applyDrawState`, never a hand-authored literal, so the declared
  /// contract this class's own doc comment names ("nothing at execute()
  /// time may add state this descriptor did not already name") is
  /// mechanically true rather than just asserted.
  DrawStateDescriptor toDrawState() => DrawStateDescriptor(
    depthTest: depthTest,
    depthWrite: depthWrite,
    blendEnable: blendEnable,
    cullEnable: cullEnable,
  );

  static bool _alwaysEnabled() => true;
}

/// A resolved, GPU-backend-owned view of one declared resource, handed to a
/// pass's `execute()` — never the raw device or another pass's resources
/// (§5.6: "exposes only the command encoder and resource views declared by
/// the node"). The concrete backend type is opaque here; RV-02's real
/// WebGL implementation supplies the actual bound target/texture behind
/// this handle when graph execution lands.
abstract interface class ResourceView {
  ResourceRef get resource;
}

/// Everything one pass's `execute()` may touch: its own declared resource
/// views, an opaque command-encoder handle, and this frame's already-culled/
/// sorted/batched scene submission. There is no path from this type back to
/// the full resource registry, another pass's private state, or the raw
/// `RenderWorld` — the type itself is the enforcement mechanism, not a
/// runtime check. [frameScene] is populated fresh once per `beginFrame()`,
/// never cached across frames by a pass, since `createPasses()` runs only on
/// graph (re)build, not every frame.
abstract interface class RenderPassContext {
  ResourceView viewOf(String resourceName);
  Object get commandEncoder;
  FrameSceneData get frameScene;
}

/// The queue-stage output for one frame (§5.5): already culled, sorted, and
/// batched, plus the camera/environment a world pass needs to set its
/// per-frame uniforms. A world pass consumes this directly rather than
/// re-deriving it from `RenderWorld`, so culling/sorting/batching logic
/// lives in exactly one place
/// (`lib/rendering/core/{visibility,sort_key,batching}.dart`). [camera] and
/// [environment] are `dynamic`-typed here rather than importing
/// `CameraView`/`FrameEnvironment` directly, to avoid a `lib/rendering/core`
/// -> `lib/rendering/api` dependency edge that the existing module layering
/// does not otherwise have; concrete passes cast to the real API types.
abstract interface class FrameSceneData {
  Iterable<Object> get opaqueBatches;
  Iterable<Object> get blendedItemsBackToFront;
  Object get camera;
  Object get environment;

  /// The frame's `PostProcessState` weights (§5.2) — `dynamic`-typed here
  /// for the same reason [camera]/[environment] are: avoiding a
  /// `lib/rendering/core` -> `lib/rendering/api` dependency edge. RV-09's
  /// DOF is the first pass to read this; concrete passes cast to the real
  /// `PostProcessState` type.
  Object get post;
}

abstract interface class RenderPass {
  PassDescriptor get descriptor;
  void execute(RenderPassContext context);
}

/// Resources a feature's `createPasses()` may bind against — resolved
/// after the graph validates, before any pass executes.
abstract interface class RenderPassResources {
  bool isAvailable(String resourceName);
}

/// A declared render feature (§5.6). `declare()` registers this feature's
/// passes into the graph being built; `createPasses()` is called only after
/// the whole graph validates, so a feature never builds executable passes
/// against resources that turned out to be invalid.
abstract interface class RenderFeature {
  String get id;
  void declare(RenderGraphBuilder graph, RenderFeatureContext context);
  Iterable<RenderPass> createPasses(RenderPassResources resources);
  void dispose();
}
