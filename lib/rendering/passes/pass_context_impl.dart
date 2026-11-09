import '../core/graph_resource.dart';
import '../core/render_feature.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';

final class BoundResourceView implements ResourceView {
  @override
  final ResourceRef resource;
  final GpuObject gpuObject;
  const BoundResourceView(this.resource, this.gpuObject);
}

final class BoundPassContext implements RenderPassContext {
  final Map<String, BoundResourceView> views;
  final DrawCommandEncoder encoder;
  final GpuObject? skyboxTexture;
  @override
  final FrameSceneData frameScene;

  const BoundPassContext({
    required this.views,
    required this.encoder,
    this.skyboxTexture,
    required this.frameScene,
  });

  @override
  ResourceView viewOf(String resourceName) {
    final view = views[resourceName];
    if (view == null) {
      throw StateError(
        'BoundPassContext: no view declared for "$resourceName" — a pass may '
        'only access resources it named in its own PassDescriptor.uses',
      );
    }
    return view;
  }

  @override
  ResourceView viewOfResource(ResourceRef resource) {
    final exact = views['${resource.name}#${resource.version}'];
    if (exact != null) return exact;
    return viewOf(resource.name);
  }

  @override
  DrawCommandEncoder get commandEncoder => encoder;
}
