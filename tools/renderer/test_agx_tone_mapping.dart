import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/passes/present.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

void main() {
  // Test enum and policy mapping
  if (PresentOutputPolicy.toneMapUniformFor(ToneMappingMode.off) != 0.0) {
    throw StateError('ToneMappingMode.off should map to 0.0');
  }
  if (PresentOutputPolicy.toneMapUniformFor(ToneMappingMode.reinhard) != 1.0) {
    throw StateError('ToneMappingMode.reinhard should map to 1.0');
  }
  if (PresentOutputPolicy.toneMapUniformFor(ToneMappingMode.aces) != 2.5) {
    throw StateError('ToneMappingMode.aces should map to 2.5');
  }
  if (PresentOutputPolicy.toneMapUniformFor(ToneMappingMode.agx) != 3.5) {
    throw StateError('ToneMappingMode.agx should map to 3.5');
  }

  // Test PostProcessState default and custom modes
  const defaultState = PostProcessState();
  if (defaultState.toneMapping != ToneMappingMode.reinhard) {
    throw StateError('default toneMapping should be ToneMappingMode.reinhard');
  }

  const agxState = PostProcessState(toneMapping: ToneMappingMode.agx);
  agxState.validate();
  if (agxState.toneMapping != ToneMappingMode.agx) {
    throw StateError('custom toneMapping should be preserved');
  }

  // Verify shader contract contains the tone mapping functions
  if (!presentFragSrc.contains('vec3 reinhardToneMap(vec3 color)')) {
    throw StateError('presentFragSrc missing reinhardToneMap');
  }
  if (!presentFragSrc.contains('vec3 acesToneMap(vec3 color)')) {
    throw StateError('presentFragSrc missing acesToneMap');
  }
  if (!presentFragSrc.contains('vec3 agxToneMap(vec3 color)')) {
    throw StateError('presentFragSrc missing agxToneMap');
  }

  print('AgX and ACES tone mapping tests passed.');
}
