import 'render_feature.dart';
import 'render_graph.dart';

final class FeatureGraph {
  final List<RenderFeature> _installedFeatures;

  FeatureGraph(this._installedFeatures);

  FeatureGraphResult build({
    required RenderFeatureContext featureContext,
    required Set<String> availableCapabilities,
    required bool hasValidPreviousFrame,
    required RenderPassResources resources,
  }) {
    final builder = RenderGraphBuilder();
    for (final feature in _installedFeatures) {
      feature.declare(builder, featureContext);
    }

    final graph = builder.build(
      availableCapabilities: availableCapabilities,
      hasValidPreviousFrame: hasValidPreviousFrame,
    );

    if (!graph.isValid) {
      return FeatureGraphResult(graph: graph, passes: const []);
    }

    final declaredIds = graph.orderedPasses.map((p) => p.id).toSet();
    final passes = <RenderPass>[];
    for (final feature in _installedFeatures) {
      for (final pass in feature.createPasses(resources)) {
        if (!declaredIds.contains(pass.descriptor.id)) {
          throw StateError(
            'RenderFeature "${feature.id}" created a pass "${pass.descriptor.id}" '
            'that it never declared into the graph',
          );
        }
        passes.add(pass);
      }
    }

    passes.sort((a, b) {
      final ai = graph.orderedPasses.indexWhere((p) => p.id == a.descriptor.id);
      final bi = graph.orderedPasses.indexWhere((p) => p.id == b.descriptor.id);
      return ai.compareTo(bi);
    });

    return FeatureGraphResult(graph: graph, passes: passes);
  }

  void disposeAll() {
    for (final feature in _installedFeatures) {
      feature.dispose();
    }
  }
}

final class FeatureGraphResult {
  final RenderGraph graph;
  final List<RenderPass> passes;

  const FeatureGraphResult({required this.graph, required this.passes});

  bool get isValid => graph.isValid;
}
