import '../core/scene_renderer_impl.dart';
import '../webgl/device_api.dart';
import 'renderer.dart';

/// Host-neutral construction seam for the authoritative retained renderer.
///
/// The host owns adapter/device creation; the factory owns which renderer
/// implementation is selected. Construction performs no GPU allocation.
abstract interface class SceneRendererFactory {
  const SceneRendererFactory();

  SceneRenderer create(GpuDevice device);
}

/// Default Pixeldart implementation. Kept tiny so a future backend can be
/// introduced without changing host lifecycle code or the stable contracts.
final class DefaultSceneRendererFactory implements SceneRendererFactory {
  const DefaultSceneRendererFactory();

  @override
  SceneRenderer create(GpuDevice device) => SceneRendererImpl(device);
}
