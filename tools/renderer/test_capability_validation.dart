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

  const softwareCaps = RenderCapabilities(
    rendererString: 'Google SwiftShader',
    vendorString: 'Google Inc.',
    maxTextureSize: 4096,
    maxTextureArrayLayers: 8,
    maxSamples: 4,
    maxVertexAttributes: 16,
    maxColorAttachments: 4,
    floatRenderTarget: true,
  );
  final software = selector.selectRuntimeProfile(softwareCaps);
  if (software != QualityProfile.minimal) {
    throw StateError(
      'a software rasterizer reporting full feature support must still be '
      'capped below the clean graph, got ${software.kind.name}',
    );
  }
  final softwareForced = selector.selectRuntimeProfile(
    softwareCaps,
    forceKind: QualityProfileKind.high,
  );
  if (softwareForced.kind != QualityProfileKind.high) {
    throw StateError('an explicit forceKind must override the software cap');
  }
  final rawNegotiation = selector.select(softwareCaps);
  if (rawNegotiation.kind != QualityProfileKind.high) {
    throw StateError(
      'select() must keep reporting the raw capability bits for diagnostics '
      'even when selectRuntimeProfile caps the executable graph',
    );
  }

  print('Renderer capability validation fixtures passed.');
}
