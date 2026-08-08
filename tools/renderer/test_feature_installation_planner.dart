import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/core/render_graph.dart';

final class _Feature implements RenderFeature {
  @override
  final String id;
  _Feature(this.id);
  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {}
  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) => const [];
  @override
  void dispose() {}
}

void main() {
  const planner = FeatureInstallationPlanner();
  final base = _Feature('world');
  final planned = planner.plan(
    profile: QualityProfile.clean,
    base: base,
    optional: {
      PipelineFeatures.bloom: _Feature(PipelineFeatures.bloom),
      PipelineFeatures.dof: _Feature(PipelineFeatures.dof),
      PipelineFeatures.grade: _Feature(PipelineFeatures.grade),
      PipelineFeatures.shadows: _Feature(PipelineFeatures.shadows),
      PipelineFeatures.ssao: _Feature(PipelineFeatures.ssao),
    },
  );
  if (planned.map((feature) => feature.id).join(',') !=
      'world,bloom,dof,grade,shadows,ssao') {
    throw StateError('feature installation order is not canonical');
  }
  print('Renderer feature-installation planner fixtures passed.');
}
