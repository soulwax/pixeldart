import 'render_feature.dart';
import 'render_graph.dart';

/// Drives §5.6's declare -> validate -> create-passes sequence across a set
/// of installed features. Passes are built only after the whole declared
/// graph validates, so a feature can never construct an executable
/// `RenderPass` against a resource wiring the validator already rejected —
/// this is what makes "mandatory world/present programs build independently
/// of optional effects" (RV-03's gate) hold at the feature level, not just
/// the raw pass-declaration level.
final class FeatureGraph {
  final List<RenderFeature> _installedFeatures;

  FeatureGraph(this._installedFeatures);

  /// Runs `declare()` on every installed feature, validates the combined
  /// graph, and — only if valid — calls `createPasses()` on each feature in
  /// installation order. Returns the validation result and, when valid, the
  /// concrete passes in graph (stage) order.
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
