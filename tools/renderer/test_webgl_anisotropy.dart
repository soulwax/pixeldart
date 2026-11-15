import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void main() {
  _testAnisotropyDecision();
  _testAnisotropyDeviceIntegration();
  print('Anisotropic texture filtering tests passed.');
}

void _testAnisotropyDecision() {
  // 1. Extension present, requested <= max -> accepted
  final ok = AnisotropyDecision.resolve(
    requested: 4,
    extensionAvailable: true,
    maxSupported: 16,
  );
  assert(ok.effective == 4);
  assert(!ok.usedFallback);

  // 2. Extension present, requested > max -> clamped
  final clamped = AnisotropyDecision.resolve(
    requested: 8,
    extensionAvailable: true,
    maxSupported: 4,
  );
  assert(clamped.effective == 4);
  assert(clamped.usedFallback);

  // 3. Extension absent -> falls back to 1.0
  final fallback = AnisotropyDecision.resolve(
    requested: 8,
    extensionAvailable: false,
    maxSupported: 16,
  );
  assert(fallback.effective == 1.0);
  assert(fallback.usedFallback);

  // 4. Invalid requests throw ArgumentError
  var threw = false;
  try {
    AnisotropyDecision.resolve(
      requested: 0.5,
      extensionAvailable: true,
      maxSupported: 16,
    );
  } catch (_) {
    threw = true;
  }
  assert(threw, 'anisotropy < 1 must throw');

  threw = false;
  try {
    AnisotropyDecision.resolve(
      requested: 32,
      extensionAvailable: true,
      maxSupported: 16,
    );
  } catch (_) {
    threw = true;
  }
  assert(threw, 'anisotropy > 16 must throw');
}

void _testAnisotropyDeviceIntegration() {
  final deviceWithExt = FakeGpuDevice(
    anisotropicFiltering: true,
    maxAnisotropy: 8,
  );
  final tex1 = deviceWithExt.createTexture(
    const GpuTextureDescriptor(width: 128, height: 128, anisotropy: 4),
  );
  assert(deviceWithExt.textureCreateCalls == 1);
  deviceWithExt.deleteTexture(tex1);
  assert(deviceWithExt.textureDeleteCalls == 1);

  final deviceNoExt = FakeGpuDevice(
    anisotropicFiltering: false,
    maxAnisotropy: 1,
  );
  final tex2 = deviceNoExt.createTexture(
    const GpuTextureDescriptor(width: 128, height: 128, anisotropy: 4),
  );
  assert(deviceNoExt.textureCreateCalls == 1);
  deviceNoExt.deleteTexture(tex2);
  assert(deviceNoExt.textureDeleteCalls == 1);
}
