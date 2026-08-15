import 'package:pixeldart/pixeldart.dart' as stable;
import 'package:pixeldart/pixeldart_advanced.dart' as advanced;
import 'package:pixeldart/pixeldart_testing.dart' as testing;

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  // Stable consumer: no backend or pass import is needed for scene contracts.
  require(stable.RendererConfiguration.safe.profile.kind == stable.QualityProfileKind.safe, 'stable facade missing configuration');
  stable.Transform.identity.validate();
  require(
    stable.ModelPackageDiagnostics(
      assetId: 'fixture',
      activeLod: 'LOD0',
      attached: false,
      itemCount: 0,
      meshCount: 0,
      cacheReferenceCount: 0,
    ).encode().contains('pixeldart-model-package-diagnostic-v1'),
    'stable facade missing diagnostics',
  );

  // Advanced consumer: policy owners can reach graph/capability contracts.
  require(advanced.QualityProfile.safe.kind == advanced.QualityProfileKind.safe, 'advanced facade missing quality profile');
  require(advanced.CapabilityProfileSelector.featureShadows.isNotEmpty, 'advanced facade missing capability selection');

  // Testing consumer: fixtures can type against the device contract without
  // importing a browser implementation.
  require(testing.GpuDeviceStatus.values.isNotEmpty, 'testing facade missing device status');
  require(testing.RendererState.values.isNotEmpty, 'testing facade missing lifecycle state');
  print('PLIB-01 facade tests passed.');
}
