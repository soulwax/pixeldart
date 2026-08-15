import 'package:web/web.dart' as web;

import '../api/renderer.dart';
import '../api/renderer_factory.dart';
import 'webgl2_device.dart';

export 'device_api.dart';

/// Owns a browser WebGL device and its context listeners. Hosts retain the
/// lease for the renderer lifetime and call [dispose] exactly once.
final class WebGl2DeviceLease {
  final WebGl2Device device;

  const WebGl2DeviceLease(this.device);

  void dispose() => device.disposeListeners();
}

/// Browser adapter that keeps WebGL2 construction out of host lifecycle code.
/// Returns `null` when the canvas cannot provide WebGL2; no fallback renderer
/// is invented here, so the host can publish its own explicit recovery state.
final class WebGl2RendererFactory {
  final SceneRendererFactory rendererFactory;

  const WebGl2RendererFactory({
    this.rendererFactory = const DefaultSceneRendererFactory(),
  });

  SceneRenderer? create(web.HTMLCanvasElement canvas) {
    final lease = createLease(canvas);
    return lease == null ? null : rendererFactory.create(lease.device);
  }

  WebGl2DeviceLease? createLease(web.HTMLCanvasElement canvas) {
    final context = canvas.getContext('webgl2');
    if (context is! web.WebGL2RenderingContext) return null;
    return WebGl2DeviceLease(WebGl2Device(context));
  }
}
