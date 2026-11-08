import 'package:pixeldart/pixeldart.dart';

void fail(String msg) => throw StateError('test_post_presets: $msg');

void main() {
  _testPresets();
  _testCopyWith();
  print('Post-processing presets and copyWith tests passed.');
}

void _testPresets() {
  final cinematic = PostProcessState.cinematic();
  cinematic.validate();
  if (cinematic.bloomStrength <= 0) {
    fail('cinematic preset should have bloom enabled');
  }
  if (cinematic.ssaoStrength <= 0) {
    fail('cinematic preset should have ssao enabled');
  }
  if (cinematic.toneMapping != ToneMappingMode.agx) {
    fail('cinematic preset should use AgX tone mapping');
  }

  final clean = PostProcessState.clean();
  clean.validate();
  if (clean.bloomStrength != 0 || clean.grain != 0) {
    fail('clean preset should have zero bloom and grain');
  }
  if (clean.toneMapping != ToneMappingMode.agx) {
    fail('clean preset should use AgX tone mapping');
  }

  final ps1 = PostProcessState.stylizedPs1();
  ps1.validate();
  if (ps1.quantizationBits != 5) {
    fail('ps1 preset should use 5 quantization bits');
  }
  if (ps1.ditherStrength <= 0) {
    fail('ps1 preset should have dithering enabled');
  }

  final vhs = PostProcessState.retroVhs();
  vhs.validate();
  if (vhs.vhsTrackingWeight <= 0 || vhs.vhsChromaWeight <= 0) {
    fail('vhs preset should have tracking and chroma weights enabled');
  }
}

void _testCopyWith() {
  const p1 = PostProcessState(
    exposure: 1.2,
    bloomStrength: 0.4,
    vignette: 0.1,
  );

  final p2 = p1.copyWith(
    exposure: 1.5,
    grain: 0.2,
  );
  p2.validate();

  if (p2.exposure != 1.5) {
    fail('exposure was not updated');
  }
  if (p2.bloomStrength != 0.4) {
    fail('bloomStrength was not preserved');
  }
  if (p2.vignette != 0.1) {
    fail('vignette was not preserved');
  }
  if (p2.grain != 0.2) {
    fail('grain was not updated');
  }
}
