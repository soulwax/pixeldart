import '../core/graph_resource.dart';
import '../core/render_feature.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';

/// Backend GPU object plus the [ResourceRef] it was declared against, bound
/// as a target/texture by the pass graph before `execute()` runs.
final class BoundResourceView implements ResourceView {
  @override
  final ResourceRef resource;
  final GpuObject gpuObject;
  const BoundResourceView(this.resource, this.gpuObject);
}

/// Concrete `RenderPassContext` (§5.6). Scoped to exactly the resource
/// views its owning pass declared — a lookup for anything else throws,
/// which is the actual enforcement of "cannot reach another pass's private
/// target," not merely documentation of intent.
final class BoundPassContext implements RenderPassContext {
  final Map<String, BoundResourceView> views;
  final DrawCommandEncoder encoder;
  @override
  final FrameSceneData frameScene;

  const BoundPassContext({
    required this.views,
    required this.encoder,
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
  DrawCommandEncoder get commandEncoder => encoder;
}
