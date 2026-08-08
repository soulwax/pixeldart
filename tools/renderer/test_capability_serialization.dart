import 'package:pixeldart/rendering/rendering.dart';

void main() {
  final source = RenderCapabilities(
    webglVersion: '2.0',
    rendererString: 'test',
    vendorString: 'test',
    maxTextureSize: 4096,
    maxTextureArrayLayers: 8,
    maxSamples: 4,
    maxVertexAttributes: 16,
    maxColorAttachments: 4,
    contextLossExtension: true,
  );
  final restored = RenderCapabilities.fromMap(source.toMap());
  if (restored.toMap().toString() != source.toMap().toString()) {
    throw StateError('capability serialization changed values');
  }
  print('Renderer capability serialization fixtures passed.');
}
