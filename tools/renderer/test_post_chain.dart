import 'dart:typed_data';

import 'package:pixeldart/rendering/core/graph_resource.dart';
import 'package:pixeldart/rendering/passes/post_chain.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError('post chain: $message');
}

const _surface = SurfaceMetrics(
  cssWidth: 320,
  cssHeight: 180,
  pixelWidth: 320,
  pixelHeight: 180,
);

FrameInput _frame(int index, PostProcessState post) => FrameInput(
  camera: CameraView(
    view: Mat4.identity(),
    projection: Mat4.identity(),
    viewProjection: Mat4.identity(),
    eye: Vec3.zero,
    forward: const Vec3(0, 0, -1),
    near: 0.1,
    far: 100,
    aspect: 16 / 9,
  ),
  environment: const FrameEnvironment(clearColor: LinearColor(0, 0, 0)),
  post: post,
  frameIndex: index,
  historyEpoch: 0,
  noiseSeed: 1,
  timeSeconds: index / 60,
);

/// One rendered frame, read back from the fake device's command log.
final class _FrameLog {
  final List<String> lines;
  final Map<String, FramePassStats> passes;
  _FrameLog(this.lines, this.passes);

  int drawsIn(String pass) => passes[pass]?.drawCalls ?? 0;

  /// The texture present sampled, and the last offscreen target any pass
  /// rendered into before it. They must be the same object.
  (String sampled, String lastWritten) get presentInput {
    final canvas = lines.lastIndexOf('bindTarget(canvas)');
    require(canvas >= 0, 'present never bound the canvas');
    final sampled = lines
        .skip(canvas)
        .firstWhere((line) => line.startsWith('bindTexture(0, '));
    final written = lines
        .take(canvas)
        .lastWhere(
          (line) =>
              line.startsWith('bindTarget(') && line != 'bindTarget(canvas)',
        );
    return (
      sampled.substring('bindTexture(0, '.length, sampled.length - 1),
      written.substring('bindTarget('.length, written.length - 1),
    );
  }
}

final class _Renderer {
  final FakeGpuDevice device;
  final SceneRendererImpl renderer;
  final RenderWorld world;
  final MeshHandle mesh;
  final MaterialHandle material;
  var _index = 0;

  _Renderer._(this.device, this.renderer, this.world, this.mesh, this.material);

  static Future<_Renderer> start(QualityProfile profile) async {
    final device = FakeGpuDevice();
    final renderer = SceneRendererImpl(device);
    await renderer.initialize(
      RendererConfiguration(
        profile: profile,
        internalWidth: 320,
        internalHeight: 180,
        shadowMapCount: 1,
      ),
      _surface,
    );
    final mesh = renderer.resources.registerMesh(
      MeshData(
        layout: VertexLayoutDescriptor.compatibility14,
        vertices: Float32List(42),
        localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
      ),
    );
    final material = renderer.resources.registerMaterial(
      const MaterialDefinition(key: 'post'),
    );
    return _Renderer._(
      device,
      renderer,
      renderer.createWorld(),
      mesh,
      material,
    );
  }

  _FrameLog draw(PostProcessState post) {
    final before = device.drawLog.length;
    final encoder = renderer.beginFrame(world, _frame(++_index, post));
    encoder.submit(RetainedItemDescriptor(mesh: mesh, material: material));
    final stats = renderer.endFrame();
    return _FrameLog(device.drawLog.sublist(before), stats.passStats);
  }
}

void _routing() {
  final chain = PostChain();
  final device = FakeGpuDevice();
  final a = device.createTarget(const GpuTargetDescriptor(width: 1, height: 1));
  final b = device.createTarget(const GpuTargetDescriptor(width: 1, height: 1));
  const output = ResourceRef(
    name: 'stage',
    format: ResourceFormat.rgba8,
    width: 1,
    height: 1,
  );
  require(identical(chain.source(output, a), a), 'unrouted reads stay bound');
  chain.bypass(output, b);
  require(identical(chain.source(output, a), b), 'bypass forwards the input');
  chain.produced(output, a);
  require(identical(chain.source(output, b), a), 'produced overrides bypass');
}

Future<void> _identityStagesIssueNoDraws() async {
  final r = await _Renderer.start(QualityProfile.ps1Full);
  // Defaults: DOF 0, grade 0, 8-bit quantize without dither, VHS weights 0.
  final frame = r.draw(const PostProcessState());
  for (final pass in ['dofComposite', 'grade', 'ps1Quantize', 'vhs']) {
    require(frame.drawsIn(pass) == 0, '$pass drew at identity weights');
  }
  final (sampled, written) = frame.presentInput;
  require(
    sampled == written,
    'present must sample the scene directly when the chain is bypassed '
    '(sampled $sampled, last written $written)',
  );
  r.renderer.dispose();
}

Future<void> _activeStagesFeedPresent() async {
  final r = await _Renderer.start(QualityProfile.ps1Full);
  final graded = r.draw(const PostProcessState(colorGradeStrength: 0.7));
  require(graded.drawsIn('grade') == 1, 'grade must draw when weighted');
  require(graded.drawsIn('ps1Quantize') == 0, 'ps1 stays bypassed');
  var (sampled, written) = graded.presentInput;
  require(sampled == written, 'present must sample grade output: $graded');

  final dithered = r.draw(
    const PostProcessState(quantizationBits: 5, depthOfFieldStrength: 0.5),
  );
  require(
    dithered.drawsIn('dofComposite') == 1 &&
        dithered.drawsIn('grade') == 0 &&
        dithered.drawsIn('ps1Quantize') == 1,
    'only weighted stages draw',
  );
  (sampled, written) = dithered.presentInput;
  require(sampled == written, 'present must sample ps1 output');
  r.renderer.dispose();
}

Future<void> _vhsPingPongsWithoutFeedback() async {
  final r = await _Renderer.start(QualityProfile.ps1Full);
  const vhs = PostProcessState(vhsGhostWeight: 0.4, vhsNoiseWeight: 0.2);
  final targets = <String>[];
  // The fake device throws on a draw that samples its own render target,
  // which a single VHS target read as history would do.
  for (var i = 0; i < 4; i += 1) {
    final frame = r.draw(vhs);
    require(frame.drawsIn('vhs') == 1, 'vhs must draw when weighted');
    final (sampled, written) = frame.presentInput;
    require(sampled == written, 'present must sample this frame\'s VHS write');
    targets.add(written);
    final ghost = r.device.lastFloat1('uGhostWeight')!;
    require(
      i == 0 ? ghost == 0 : (ghost - 0.4).abs() < 1e-6,
      'frame $i ghost weight $ghost: the first draw has no history to echo',
    );
  }
  require(
    targets[0] != targets[1] &&
        targets[0] == targets[2] &&
        targets[1] == targets[3],
    'VHS must alternate between its two targets: $targets',
  );

  // reducedMotion disables ghosting; with no other weight VHS is an identity.
  final calm = r.draw(
    const PostProcessState(vhsGhostWeight: 0.4, reducedMotion: true),
  );
  require(calm.drawsIn('vhs') == 0, 'reduced-motion ghost-only VHS must skip');
  r.renderer.dispose();
}

Future<void> _defaultProfileSkipsUnusedEffects() async {
  // `clean` is PixeldartApp.mount's default; most apps leave DOF and grade
  // at zero and should not pay two full-screen passes for them.
  final r = await _Renderer.start(QualityProfile.clean);
  final frame = r.draw(const PostProcessState());
  require(
    frame.drawsIn('dofComposite') == 0 && frame.drawsIn('grade') == 0,
    'clean profile drew disabled DOF/grade',
  );
  final (sampled, written) = frame.presentInput;
  require(sampled == written, 'clean present input');
  r.renderer.dispose();
}

Future<void> main() async {
  _routing();
  await _identityStagesIssueNoDraws();
  await _activeStagesFeedPresent();
  await _vhsPingPongsWithoutFeedback();
  await _defaultProfileSkipsUnusedEffects();
  print('Renderer post-chain fixtures passed.');
}
