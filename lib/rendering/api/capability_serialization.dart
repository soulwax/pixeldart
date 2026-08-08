import 'capabilities.dart';

Map<String, Object?> capabilityToMap(RenderCapabilities value) => {
  'webglVersion': value.webglVersion,
  'rendererString': value.rendererString,
  'vendorString': value.vendorString,
  'maxTextureSize': value.maxTextureSize,
  'maxTextureArrayLayers': value.maxTextureArrayLayers,
  'maxSamples': value.maxSamples,
  'maxVertexAttributes': value.maxVertexAttributes,
  'maxColorAttachments': value.maxColorAttachments,
  'anisotropicFiltering': value.anisotropicFiltering,
  'disjointTimerQuery': value.disjointTimerQuery,
  'floatRenderTarget': value.floatRenderTarget,
  'halfFloatRenderTarget': value.halfFloatRenderTarget,
  'contextLossExtension': value.contextLossExtension,
};

RenderCapabilities capabilityFromMap(Map<String, Object?> value) {
  int requiredInt(String key) {
    final result = value[key];
    if (result is! int) throw FormatException('capability $key is malformed');
    return result;
  }

  bool optionalBool(String key) => value[key] is bool && value[key] as bool;
  final capabilities = RenderCapabilities(
    webglVersion: value['webglVersion'] as String?,
    rendererString: value['rendererString'] as String?,
    vendorString: value['vendorString'] as String?,
    maxTextureSize: requiredInt('maxTextureSize'),
    maxTextureArrayLayers: requiredInt('maxTextureArrayLayers'),
    maxSamples: requiredInt('maxSamples'),
    maxVertexAttributes: requiredInt('maxVertexAttributes'),
    maxColorAttachments: requiredInt('maxColorAttachments'),
    anisotropicFiltering: optionalBool('anisotropicFiltering'),
    disjointTimerQuery: optionalBool('disjointTimerQuery'),
    floatRenderTarget: optionalBool('floatRenderTarget'),
    halfFloatRenderTarget: optionalBool('halfFloatRenderTarget'),
    contextLossExtension: optionalBool('contextLossExtension'),
  );
  capabilities.validate();
  return capabilities;
}
