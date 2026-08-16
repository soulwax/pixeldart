import 'package:pixeldart/rendering/api/effects.dart';
import 'package:pixeldart/rendering/passes/present.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

void main() {
  const dry = PostProcessState();
  dry.validate();
  const wet = PostProcessState(rainIntensity: 0.73, surfaceWetness: 0.61);
  wet.validate();
  if (wet.surfaceWetness != 0.61) {
    throw StateError('surface wetness did not retain its value');
  }
  const closed = PostProcessState(
    rainIntensity: 0.73,
    rainWindowVisibility: 0.12,
  );
  closed.validate();
  if (closed.rainWindowVisibility != 0.12) {
    throw StateError('rain window visibility did not retain its value');
  }
  if (presentFragSrc.contains('rainStreak') == false ||
      !presentFragSrc.contains('uRainIntensity') ||
      !presentFragSrc.contains('clamp(uRainIntensity,0.,1.)')) {
    throw StateError('present shader does not expose deterministic rain');
  }
  var rejected = false;
  try {
    const PostProcessState(rainIntensity: -0.01).validate();
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    rejected = true;
  }
  if (!rejected) throw StateError('negative rain intensity was accepted');
  rejected = false;
  try {
    const PostProcessState(surfaceWetness: 1.01).validate();
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    rejected = true;
  }
  if (!rejected) throw StateError('surface wetness above one was accepted');
  rejected = false;
  try {
    const PostProcessState(rainIntensity: 1.01).validate();
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    rejected = true;
  }
  if (!rejected) throw StateError('rain intensity above one was accepted');
  rejected = false;
  try {
    const PostProcessState(rainWindowVisibility: 1.01).validate();
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    rejected = true;
  }
  if (!rejected) {
    throw StateError('rain window visibility above one was accepted');
  }
  if (!PresentProgramSource.build(
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
  ).requiredUniforms.contains('uRainIntensity')) {
    throw StateError('present program omitted the rain uniform');
  }
  if (!PresentProgramSource.build(
        vertexSource: presentVertSrc,
        fragmentSource: presentFragSrc,
      ).requiredUniforms.contains('uRainWindowVisibility') ||
      !presentFragSrc.contains('clamp(uRainWindowVisibility,0.,1.)')) {
    throw StateError('present program omitted the aperture rain uniform');
  }
  print('Renderer rain effect contract fixture passed.');
}
