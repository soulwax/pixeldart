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
    anisotropicFiltering: true,
    maxAnisotropy: 8,
    contextLossExtension: true,
  );
  final restored = RenderCapabilities.fromMap(source.toMap());
  if (restored.toMap().toString() != source.toMap().toString()) {
    throw StateError('capability serialization changed values');
  }
  final legacyMap = Map<String, Object?>.of(source.toMap())
    ..remove('maxAnisotropy');
  final legacy = RenderCapabilities.fromMap(legacyMap);
  if (legacy.maxAnisotropy != 1) {
    throw StateError('legacy capability maps must default maxAnisotropy to 1x');
  }
  final malformed = Map<String, Object?>.of(source.toMap())
    ..['maxAnisotropy'] = '8';
  var rejected = false;
  try {
    RenderCapabilities.fromMap(malformed);
  } catch (error) {
    if (error is! FormatException) rethrow;
    rejected = true;
  }
  if (!rejected) {
    throw StateError('malformed maxAnisotropy must fail capability validation');
  }
  print('Renderer capability serialization fixtures passed.');
}
