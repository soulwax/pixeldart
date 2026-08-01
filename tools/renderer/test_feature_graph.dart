import 'package:pixeldart/rendering/core/feature_graph.dart';
import 'package:pixeldart/rendering/core/graph_pass.dart';
import 'package:pixeldart/rendering/core/graph_resource.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/core/render_graph.dart';
import 'package:pixeldart/rendering/rendering.dart';

const _sceneColor = ResourceRef(
  name: 'sceneColor',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
);
const _presentTarget = ResourceRef(
  name: 'present',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
);

final class _FakeResourceView implements ResourceView {
  @override
  final ResourceRef resource;
  const _FakeResourceView(this.resource);
}

final class _FakePassResources implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

final class _RecordingPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  bool executed = false;

  _RecordingPass(this.descriptor);

  @override
  void execute(RenderPassContext context) {
    executed = true;
    context.viewOf(descriptor.uses.first.resource.name);
  }
}

final class _WorldFeature implements RenderFeature {
  @override
  String get id => 'world';

  final List<_RecordingPass> builtPasses = [];

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'worldOpaque',
        stage: GraphStage.beforeWorld,
        uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
      ),
    );
    graph.addPass(
      PassDeclaration(
        id: 'present',
        stage: GraphStage.beforePresent,
        uses: [
          const ResourceUse(_sceneColor, ResourceAccess.read),
          const ResourceUse(_presentTarget, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final worldPass = _RecordingPass(
      PassDescriptor(
        id: 'worldOpaque',
        stage: GraphStage.beforeWorld,
        uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
      ),
    );
    final presentPass = _RecordingPass(
      PassDescriptor(
        id: 'present',
        stage: GraphStage.beforePresent,
        uses: [const ResourceUse(_presentTarget, ResourceAccess.write)],
      ),
    );
    builtPasses.addAll([worldPass, presentPass]);
    return [presentPass, worldPass]; // deliberately out of graph order
  }

  @override
  void dispose() {}
}

final class _BloomFeature implements RenderFeature {
  final bool installed;
  _BloomFeature(this.installed);

  @override
  String get id => 'bloom';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    if (!installed) return;
    graph.addPass(
      PassDeclaration(
        id: 'bloom',
        stage: GraphStage.afterResolve,
        uses: const [],
        requiredCapabilities: const {'float-render-target'},
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    if (!installed) return const [];
    return [
      _RecordingPass(
        PassDescriptor(
          id: 'bloom',
          stage: GraphStage.afterResolve,
          uses: const [],
        ),
      ),
    ];
  }

  @override
  void dispose() {}
}

/// A misbehaving feature that declares one pass but tries to construct a
/// different one — proves `FeatureGraph` rejects passes a feature never
/// actually put into the graph.
final class _RogueFeature implements RenderFeature {
  @override
  String get id => 'rogue';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'declared',
        stage: GraphStage.afterWorld,
        uses: const [],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) => [
    _RecordingPass(
      PassDescriptor(
        id: 'undeclared',
        stage: GraphStage.afterWorld,
        uses: const [],
      ),
    ),
  ];

  @override
  void dispose() {}
}

void main() {
  _mandatoryFeatureBuildsIndependentOfOptional();
  _invalidGraphNeverBuildsPasses();
  _passesOrderedByGraphStageNotFeatureOrder();
  _passContextExposesOnlyDeclaredResources();
  _undeclaredPassRejected();
  print('Renderer feature-graph fixtures passed.');
}

const _context = RenderFeatureContext(
  capabilities: RenderCapabilities.safeMinimum,
  profile: QualityProfile.safe,
);

void _mandatoryFeatureBuildsIndependentOfOptional() {
  final world = _WorldFeature();
  final withoutBloom = FeatureGraph([world, _BloomFeature(false)]);
  final resultWithout = withoutBloom.build(
    featureContext: _context,
    availableCapabilities: const {},
    hasValidPreviousFrame: false,
    resources: _FakePassResources(),
  );
  if (!resultWithout.isValid || resultWithout.passes.length != 2) {
    throw StateError(
      'world+present must build with 2 passes even with bloom uninstalled: '
      '${resultWithout.graph.failures}',
    );
  }

  final withBloom = FeatureGraph([_WorldFeature(), _BloomFeature(true)]);
  final resultWith = withBloom.build(
    featureContext: _context,
    availableCapabilities: const {'float-render-target'},
    hasValidPreviousFrame: false,
    resources: _FakePassResources(),
  );
  if (!resultWith.isValid || resultWith.passes.length != 3) {
    throw StateError('installing bloom must add exactly one more pass');
  }
}

void _invalidGraphNeverBuildsPasses() {
  final world = _WorldFeature();
  final bloomMissingCapability = _BloomFeature(true);
  final graph = FeatureGraph([world, bloomMissingCapability]);
  final result = graph.build(
    featureContext: _context,
    availableCapabilities: const {}, // bloom requires float-render-target
    hasValidPreviousFrame: false,
    resources: _FakePassResources(),
  );
  if (result.isValid) {
    throw StateError(
      'expected the graph to be invalid due to missing capability',
    );
  }
  if (result.passes.isNotEmpty) {
    throw StateError(
      'an invalid graph must never call createPasses on any feature',
    );
  }
  if (world.builtPasses.isNotEmpty) {
    throw StateError(
      'the mandatory world feature must not build passes either when the '
      'combined graph (including a broken optional feature) is invalid',
    );
  }
}

void _passesOrderedByGraphStageNotFeatureOrder() {
  final world = _WorldFeature();
  final graph = FeatureGraph([world]);
  final result = graph.build(
    featureContext: _context,
    availableCapabilities: const {},
    hasValidPreviousFrame: false,
    resources: _FakePassResources(),
  );
  if (result.passes.map((p) => p.descriptor.id).toList().join(',') !=
      'worldOpaque,present') {
    throw StateError(
      'FeatureGraph must reorder createPasses output to match graph stage '
      'order, not the order a feature happened to return them in — got '
      '${result.passes.map((p) => p.descriptor.id).toList()}',
    );
  }
}

void _passContextExposesOnlyDeclaredResources() {
  final pass = _RecordingPass(
    PassDescriptor(
      id: 'solo',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  final context = _ScopedContext({
    _sceneColor.name: _FakeResourceView(_sceneColor),
  });
  pass.execute(context);
  if (!pass.executed) {
    throw StateError(
      'pass must execute given a context scoped to its own resource',
    );
  }

  bool threw = false;
  try {
    context.viewOf('someOtherPassPrivateTarget');
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError(
      'RenderPassContext must reject a lookup for a resource this pass never declared',
    );
  }
}

void _undeclaredPassRejected() {
  final graph = FeatureGraph([_RogueFeature()]);
  bool threw = false;
  try {
    graph.build(
      featureContext: _context,
      availableCapabilities: const {},
      hasValidPreviousFrame: false,
      resources: _FakePassResources(),
    );
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError(
      'a feature constructing a pass id it never declared into the graph must be rejected',
    );
  }
}

final class _EmptyFrameScene implements FrameSceneData {
  const _EmptyFrameScene();
  @override
  Iterable<Object> get opaqueBatches => const [];
  @override
  Iterable<Object> get blendedItemsBackToFront => const [];
  @override
  Object get camera => const Object();
  @override
  Object get environment => const Object();
  @override
  Object get post => const Object();
}

final class _ScopedContext implements RenderPassContext {
  final Map<String, ResourceView> _views;
  const _ScopedContext(this._views);

  @override
  ResourceView viewOf(String resourceName) {
    final view = _views[resourceName];
    if (view == null) {
      throw StateError('no view declared for "$resourceName"');
    }
    return view;
  }

  @override
  Object get commandEncoder => Object();

  @override
  FrameSceneData get frameScene => const _EmptyFrameScene();
}
