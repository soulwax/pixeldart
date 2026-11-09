import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

void _check(bool condition, String message) {
  if (!condition) throw StateError(message);
}

const _base = RendererConfiguration(
  profile: QualityProfile.safe,
  internalWidth: 64,
  internalHeight: 64,
);

Future<void> main() async {
  final surface = SurfaceMetrics.pixels(width: 64, height: 64);
  final device = FakeGpuDevice();
  final renderer = SceneRendererImpl(device);
  await renderer.initialize(_base, surface);
  final live = device.liveObjectCount;

  var rejected = false;
  try {
    await renderer.configure(
      _base.withShaderOverrides(const {
        ShaderSlot.sprites: ShaderOverride(fragment: 'out vec4 oColor;'),
      }),
    );
  } on ShaderCompileException {
    rejected = true;
  }
  _check(rejected, 'invalid shader change was accepted');
  _check(
    renderer.state == RendererState.ready &&
        renderer.configuration.shaderOverrides.isEmpty &&
        device.liveObjectCount == live,
    'failed shader change disturbed the live graph',
  );

  rejected = false;
  try {
    await renderer.configure(
      _base.withShaderOverrides({
        ShaderSlot.sprites: ShaderOverride(
          fragment: spriteFragSrc.replaceFirst(
            'uniform sampler2D uTex;',
            'uniform float uTex;',
          ),
        ),
      }),
    );
  } on ShaderCompileException catch (error) {
    rejected = error.stage == ShaderCompileStage.validation;
  }
  _check(rejected, 'wrong engine uniform type was accepted');
  _check(
    renderer.configuration.shaderOverrides.isEmpty &&
        device.liveObjectCount == live,
    'rejected interface change disturbed the live graph',
  );

  final custom = _base.withShaderOverrides(const {
    ShaderSlot.sprites: ShaderOverride(fragment: '$spriteFragSrc\n// HOST'),
  });
  await renderer.configure(custom);
  _check(
    renderer.configuration.shaderOverrides.containsKey(ShaderSlot.sprites),
    'valid shader override was not committed',
  );
  _check(
    device.compiledShaderSources.any(
      (source) => source.fragment.contains('// HOST'),
    ),
    'configured renderer did not compile the host shader',
  );
  device.compiledShaderSources.clear();
  device.simulateContextLoss();
  device.simulateContextRestore();
  final world = renderer.createWorld();
  renderer.beginFrame(
    world,
    FrameInput(
      camera: CameraView.look(
        eye: const Vec3(0, 0, 5),
        forward: const Vec3(0, 0, -1),
        fovYRadians: 1,
        aspect: 1,
        near: 0.1,
        far: 100,
      ),
      environment: const FrameEnvironment(),
      post: const PostProcessState(),
      frameIndex: 0,
      historyEpoch: 0,
      noiseSeed: 0,
      timeSeconds: 0,
    ),
  );
  renderer.endFrame();
  _check(
    device.compiledShaderSources.any(
      (source) => source.fragment.contains('// HOST'),
    ),
    'context restoration did not compile the host shader again',
  );
  _check(renderer.shaderErrors.isEmpty, 'override failed after restore');
  renderer.dispose();

  final fallbackDevice = FakeGpuDevice();
  final fallback = SceneRendererImpl(fallbackDevice);
  await fallback.initialize(
    _base.withShaderOverrides(const {
      ShaderSlot.sprites: ShaderOverride(fragment: 'FAIL_FRAGMENT'),
    }),
    surface,
  );
  _check(
    fallback.shaderErrors.containsKey(ShaderSlot.sprites),
    'startup fallback did not report the rejected shader',
  );
  fallback.dispose();
  print('shader override checks passed.');
}
