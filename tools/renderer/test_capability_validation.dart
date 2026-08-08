import 'package:pixeldart/rendering/rendering.dart';

void main() {
  const selector = CapabilityProfileSelector();
  var rejected = false;
  try {
    selector.select(
      const RenderCapabilities(
        maxTextureSize: 0,
        maxTextureArrayLayers: 1,
        maxSamples: 1,
        maxVertexAttributes: 16,
        maxColorAttachments: 1,
      ),
    );
  } on FormatException {
    rejected = true;
  }
  if (!rejected) throw StateError('invalid capability limits must reject');
  selector.select(RenderCapabilities.safeMinimum).validate();
  final strong = selector.selectRuntimeProfile(
    const RenderCapabilities(
      maxTextureSize: 4096,
      maxTextureArrayLayers: 8,
      maxSamples: 4,
      maxVertexAttributes: 16,
      maxColorAttachments: 4,
      floatRenderTarget: true,
    ),
  );
  if (strong != QualityProfile.clean) {
    throw StateError('strong capabilities did not select the clean graph');
  }
  print('Renderer capability validation fixtures passed.');
}
