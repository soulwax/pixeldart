import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import 'pass_context_impl.dart';

/// Resolves a multisampled color/depth target into a single-sample graph
/// version before any post pass or present shader samples it.
final class MsaaResolveFeature implements RenderFeature {
  final GpuDevice device;
  final ResourceRef sourceResource;
  final ResourceRef destinationResource;

  const MsaaResolveFeature({
    required this.device,
    required this.sourceResource,
    required this.destinationResource,
  });

  @override
  String get id => 'msaaResolve';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'msaaResolve',
        stage: GraphStage.afterWorld,
        uses: [
          ResourceUse(sourceResource, ResourceAccess.read),
          ResourceUse(destinationResource, ResourceAccess.write),
        ],
        isResolve: true,
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) => [
    _MsaaResolvePass(
      descriptor: PassDescriptor(
        id: 'msaaResolve',
        stage: GraphStage.afterWorld,
        uses: [
          ResourceUse(sourceResource, ResourceAccess.read),
          ResourceUse(destinationResource, ResourceAccess.write),
        ],
        depthTest: false,
        depthWrite: false,
        cullEnable: false,
      ),
      device: device,
      sourceResource: sourceResource,
      destinationResource: destinationResource,
    ),
  ];

  @override
  void dispose() {}
}

final class _MsaaResolvePass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final GpuDevice device;
  final ResourceRef sourceResource;
  final ResourceRef destinationResource;

  const _MsaaResolvePass({
    required this.descriptor,
    required this.device,
    required this.sourceResource,
    required this.destinationResource,
  });

  @override
  void execute(RenderPassContext context) {
    final source = context.viewOfResource(sourceResource) as BoundResourceView;
    final destination =
        context.viewOfResource(destinationResource) as BoundResourceView;
    device.resolveTarget(source.gpuObject, destination.gpuObject);
  }
}
