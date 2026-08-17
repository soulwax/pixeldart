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
  if (presentFragSrc.contains('rainStreak') ||
      presentFragSrc.contains('uRainIntensity') ||
      presentFragSrc.contains('uRainWindowVisibility')) {
    throw StateError(
      'present shader still contains a screen-space precipitation path',
    );
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
  final requiredUniforms = PresentProgramSource.build(
    vertexSource: presentVertSrc,
    fragmentSource: presentFragSrc,
  ).requiredUniforms;
  if (requiredUniforms.contains('uRainIntensity') ||
      requiredUniforms.contains('uRainWindowVisibility')) {
    throw StateError('present program still requires precipitation uniforms');
  }
  print('Renderer rain effect contract fixture passed.');
}
