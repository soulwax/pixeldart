import '../core/graph_resource.dart';
import '../webgl/device_api.dart';

/// Routes the linear post-process chain around stages that would copy their
/// input unchanged.
///
/// Every stage still owns its declared output target, so the graph and the
/// resource plan stay static. Per frame, a stage either draws into a target
/// ([produced]) or, when its weights make it an identity, hands its input
/// forward ([bypass]) and issues no GL calls. Later stages read their input
/// through [source], which returns whatever physically holds that resource's
/// content this frame. Each stage sets its entry every frame it executes, so
/// nothing stale carries over between frames.
final class PostChain {
  final Map<String, GpuObject> _routes = {};

  static String _key(ResourceRef resource) =>
      '${resource.name}#${resource.version}';

  /// The object holding [resource]'s content this frame; [bound] when no
  /// stage rerouted it.
  GpuObject source(ResourceRef resource, GpuObject bound) =>
      _routes[_key(resource)] ?? bound;

  /// [output] is an identity of [input] this frame.
  void bypass(ResourceRef output, GpuObject input) =>
      _routes[_key(output)] = input;

  /// [output]'s content was drawn into [target] this frame.
  void produced(ResourceRef output, GpuObject target) =>
      _routes[_key(output)] = target;
}
