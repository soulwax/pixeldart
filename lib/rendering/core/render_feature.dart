import '../api/capabilities.dart';
import '../webgl/state_cache.dart';
import 'graph_pass.dart';
import 'graph_resource.dart';
import 'render_graph.dart';

final class RenderFeatureContext {
  final RenderCapabilities capabilities;
  final QualityProfile profile;

  const RenderFeatureContext({
    required this.capabilities,
    required this.profile,
  });
}

enum PolygonOffset { none, shadowBias }

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

  DrawStateDescriptor toDrawState() => DrawStateDescriptor(
    depthTest: depthTest,
    depthWrite: depthWrite,
    blendEnable: blendEnable,
    cullEnable: cullEnable,
  );

  static bool _alwaysEnabled() => true;
}

abstract interface class ResourceView {
  ResourceRef get resource;
}

abstract interface class RenderPassContext {
  ResourceView viewOf(String resourceName);

  ResourceView viewOfResource(ResourceRef resource);

  Object get commandEncoder;
  FrameSceneData get frameScene;
}

abstract interface class FrameSceneData {
  Iterable<Object> get opaqueBatches;
  Iterable<Object> get blendedItemsBackToFront;
  Object get camera;
  Object get environment;

  double get timeSeconds;

  Object get post;
}

abstract interface class RenderPass {
  PassDescriptor get descriptor;
  void execute(RenderPassContext context);
}

abstract interface class RenderPassResources {
  bool isAvailable(String resourceName);
}

abstract interface class RenderFeature {
  String get id;
  void declare(RenderGraphBuilder graph, RenderFeatureContext context);
  Iterable<RenderPass> createPasses(RenderPassResources resources);
  void dispose();
}
