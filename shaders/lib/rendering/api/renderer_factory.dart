import '../core/scene_renderer_impl.dart';
import '../webgl/device_api.dart';
import 'renderer.dart';

abstract interface class SceneRendererFactory {
  const SceneRendererFactory();

  SceneRenderer create(GpuDevice device);
}

final class DefaultSceneRendererFactory implements SceneRendererFactory {
  const DefaultSceneRendererFactory();

  @override
  SceneRenderer create(GpuDevice device) => SceneRendererImpl(device);
}
