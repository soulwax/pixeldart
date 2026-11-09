import 'dart:typed_data';

import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError('world shader targets: $message');
}

RendererConfiguration config(QualityProfile profile, {int width = 64}) =>
    RendererConfiguration(
      profile: profile,
      internalWidth: width,
      internalHeight: 64,
      shadowMapCount: profile.installs(PipelineFeatures.shadows) ? 1 : 0,
    );

ShaderOverride tintedWorldShader(ShaderSlot slot) {
  final source = slot == ShaderSlot.safeWorld
      ? safeWorldFragSrc
      : shadowedWorldFragSrc;
  return ShaderOverride(
    fragment: source
        .replaceFirst('void main(){', 'uniform float uGain;\nvoid main(){')
        .replaceFirst('oColor=vec4(', 'oColor=vec4(uGain*'),
    uniforms: const {'uGain': ShaderUniform.float(0.5)},
  );
}

final class Host {
  final FakeGpuDevice device = FakeGpuDevice();
  late final SceneRendererImpl renderer = SceneRendererImpl(device);
  late final RenderWorld world;
  late final MeshHandle mesh;
  late final MaterialHandle plain;
  late final MaterialHandle tinted;
  late final WorldShaderHandle shader;
  var index = 0;

  Future<void> start(QualityProfile profile) async {
    await renderer.initialize(
      config(profile),
      SurfaceMetrics.pixels(width: 64, height: 64),
    );
    world = renderer.createWorld();
    mesh = renderer.resources.registerMesh(
      MeshData(
        layout: VertexLayoutDescriptor.compatibility14,
        vertices: Float32List(42),
        localBounds: const Aabb(Vec3(-0.2, -0.2, -0.2), Vec3(0.2, 0.2, 0.2)),
      ),
    );
    plain = renderer.resources.registerMaterial(
      const MaterialDefinition(key: 'plain'),
    );
    final contract = profile.installs(PipelineFeatures.shadows)
        ? ShaderSlot.shadowedWorld
        : ShaderSlot.safeWorld;
    shader = renderer.registerWorldShader(
      tintedWorldShader(contract),
      debugLabel: 'tinted',
    );
    require(shader.contract == contract, 'registered under wrong contract');
    tinted = renderer.resources.registerMaterial(
      MaterialDefinition(key: 'tinted', worldShader: shader),
    );
  }

  FrameStats draw({
    bool switchPrograms = true,
    bool useShader = true,
    bool allTinted = false,
  }) {
    device.uniformLog.clear();
    device.drawLog.clear();
    final encoder = renderer.beginFrame(
      world,
      FrameInput(
        camera: CameraView(
          view: Mat4.identity(),
          projection: Mat4.identity(),
          viewProjection: Mat4.identity(),
          eye: Vec3.zero,
          forward: const Vec3(0, 0, -1),
          near: 0.1,
          far: 100,
          aspect: 1,
        ),
        environment: const FrameEnvironment(),
        post: const PostProcessState(),
        frameIndex: ++index,
        historyEpoch: 0,
        noiseSeed: 1,
        timeSeconds: index.toDouble(),
      ),
    );
    if (switchPrograms) {
      encoder.submit(
        RetainedItemDescriptor(
          mesh: mesh,
          material: allTinted ? tinted : plain,
        ),
      );
    }
    encoder.submit(
      RetainedItemDescriptor(mesh: mesh, material: useShader ? tinted : plain),
    );
    if (switchPrograms) {
      encoder.submit(
        RetainedItemDescriptor(
          mesh: mesh,
          material: allTinted ? tinted : plain,
          drawMode: DrawMode.blended,
        ),
      );
    }
    return renderer.endFrame();
  }

  List<UniformValue> sent(String name) => device.uniformLog
      .where((entry) => entry.name == name)
      .map((entry) => entry.value)
      .toList();

  void dispose() {
    renderer.dispose();
    require(device.liveObjectCount == 0, 'GPU objects leaked');
  }
}

Future<void> testProfile(QualityProfile profile) async {
  final host = Host();
  await host.start(profile);
  final liveBeforeBadShader = host.device.liveObjectCount;
  var rejected = false;
  try {
    host.renderer.registerWorldShader(
      const ShaderOverride(fragment: 'FAIL_FRAGMENT'),
    );
  } on ShaderCompileException {
    rejected = true;
  }
  require(rejected, 'invalid world shader was accepted');
  require(
    host.device.liveObjectCount == liveBeforeBadShader,
    'invalid world shader leaked a GPU program',
  );
  final baseCompiles = host.device.programCompileCalls;
  require(host.draw().drawCalls == 3, 'all world draws must run');
  require(host.sent('uGain').single.value == 0.5, 'host uniform missing');
  final firstFrameProjectionUploads = host.sent('uViewProjection').length;
  host.draw(useShader: false);
  final defaultOnlyProjectionUploads = host.sent('uViewProjection').length;
  require(
    firstFrameProjectionUploads == defaultOnlyProjectionUploads + 2,
    'frame projection must be restored at both program switches: '
    '$firstFrameProjectionUploads vs $defaultOnlyProjectionUploads',
  );
  host.draw(allTinted: true);
  require(
    host.sent('uViewProjection').length == defaultOnlyProjectionUploads,
    'custom-only draws must not initialize the unused default program',
  );
  host.renderer.setShaderUniform(
    host.shader,
    'uGain',
    const ShaderUniform.float(0.25),
  );
  host.draw(switchPrograms: false);
  require(host.sent('uGain').single.value == 0.25, 'live uniform update');
  require(
    host.device.programCompileCalls == baseCompiles,
    'live uniform update recompiled a program',
  );

  host.device.simulateContextLoss();
  host.device.simulateContextRestore();
  host.draw(switchPrograms: false);
  require(host.sent('uGain').single.value == 0.25, 'restore lost live value');

  await host.renderer.configure(config(profile, width: 128));
  host.draw(switchPrograms: false);
  require(host.sent('uGain').single.value == 0.25, 'resize lost live value');

  final otherProfile = profile.installs(PipelineFeatures.shadows)
      ? QualityProfile.safe
      : QualityProfile.minimal;
  await host.renderer.configure(config(otherProfile));
  host.draw(switchPrograms: false);
  require(host.sent('uGain').isEmpty, 'wrong-profile shader must fall back');
  await host.renderer.configure(config(profile));
  host.draw(switchPrograms: false);
  require(
    host.sent('uGain').single.value == 0.25,
    'profile return lost shader',
  );

  host.renderer.releaseWorldShader(host.shader);
  host.draw(switchPrograms: false);
  require(host.sent('uGain').isEmpty, 'released shader did not fall back');
  host.dispose();
}

Future<void> main() async {
  await testProfile(QualityProfile.safe);
  await testProfile(QualityProfile.minimal);
  print('Renderer world shader target fixtures passed.');
}
