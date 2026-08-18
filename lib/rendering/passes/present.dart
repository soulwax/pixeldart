import 'dart:math' as math;
import 'dart:typed_data';

import '../api/effects.dart';
import '../api/frame.dart';
import '../api/lights.dart';
import '../api/settings.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';

/// CPU reference for the final shader's deterministic color contract. It is
/// used by pure color-ramp fixtures; the live image path remains GLSL so the
/// conversion runs per pixel on the GPU.
final class PresentOutputPolicy {
  const PresentOutputPolicy._();

  static double encodingUniform(ColorEncoding encoding) =>
      encoding == ColorEncoding.srgb ? 1 : 0;

  static const double toneMapUniform = 1;

  static List<double> encodeLinearColor(
    Iterable<double> color, {
    double exposure = 1,
    ColorEncoding encoding = ColorEncoding.srgb,
  }) => [
    for (final channel in color)
      _encodeChannel(channel, exposure: exposure, encoding: encoding),
  ];

  static double _encodeChannel(
    double channel, {
    required double exposure,
    required ColorEncoding encoding,
  }) {
    final sceneLinear =
        (channel < 0 ? 0 : channel) * (exposure < 0 ? 0 : exposure);
    final toneMapped = sceneLinear / (1 + sceneLinear);
    if (encoding == ColorEncoding.linear) return toneMapped;
    if (toneMapped <= 0.0031308) return toneMapped * 12.92;
    return 1.055 * _pow(toneMapped, 1 / 2.4) - 0.055;
  }

  static double _pow(double value, double exponent) {
    return math.pow(value, exponent).toDouble();
  }
}

final class PresentProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
    String programId = 'present',
  }) => ProgramSource(
    id: programId,
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uTex': 0, 'uSkyTexture': 1},
    requiredUniforms: const [
      'uExposure',
      'uVignette',
      'uGrain',
      'uOutputEncoding',
      'uToneMap',
      'uClearColor',
      'uSkyHorizon',
      'uSkyZenith',
      'uSkyGround',
      'uSkyEnabled',
      'uSkyHorizonGlow',
      'uSkyStarDensity',
      'uSkyTexture',
      'uSkyTextureEnabled',
      'uSkyRotation',
      'uSkyExposure',
      'uSkyTextureSrgb',
      'uInverseProjection',
      'uInverseView',
      'uCameraPosition',
      'uCloudCoverage',
      'uCloudDensity',
      'uCloudBaseHeight',
      'uCloudThickness',
      'uCloudScale',
      'uCloudWind',
      'uCloudPhase',
      'uCloudDetail',
      'uCloudSilverLining',
      'uCloudSampleCount',
      'uCloudLightDirection',
      'uCloudLightColor',
      'uCloudLightIntensity',
    ],
  );
}

/// §6.1's final stage: NEAREST blit of `sceneColor` to the default (canvas)
/// framebuffer. `bindTarget(null)` targets the canvas per
/// `DrawCommandEncoder`'s contract. [programId] defaults to `'present'` but
/// must be overridden to a distinct value whenever two independently-built
/// graphs share one `ProgramLibrary` and are both live in the same frame
/// loop (as `buildShadowGraph` and `buildDepthDebugGraph` are in the
/// renderer-test bootstrap) — `ProgramLibrary.publish` deletes the
/// *previous* program registered under the same id once a new one compiles,
/// so two `PresentFeature`s both defaulting to `'present'` would have the
/// second one silently invalidate the first's already-compiled program,
/// producing a `useProgram: Object already deleted` GL warning the moment
/// the first graph's present pass runs again.
///
/// [sceneColorResource] defaults to `SafeGraphResources.sceneColor` (version
/// 0) but must be overridden to a later version whenever a pass between the
/// world pass and present also *writes* sceneColor — `buildShadowGraph`'s
/// bloom composite does exactly this (§8.7), and reading the base version
/// there would collide with the graph validator's duplicate-writer check
/// (two passes both declaring a write to `sceneColor#0`) the moment bloom
/// tried to declare its own write. `viewOf` only ever keys off the
/// resource's *name*, never its version, so this override changes nothing
/// about which real GPU object gets bound at runtime — it only changes what
/// the declared graph honestly claims about write ordering.
final class PresentFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final String programId;
  final ResourceRef sceneColorResource;
  final ColorEncoding outputEncoding;
  GpuObject? _emptyVao;

  PresentFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    this.programId = 'present',
    this.sceneColorResource = SafeGraphResources.sceneColor,
    this.outputEncoding = ColorEncoding.srgb,
  });

  @override
  String get id => programId;

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'present',
        stage: GraphStage.beforePresent,
        uses: [ResourceUse(sceneColorResource, ResourceAccess.read)],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      PresentProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
        programId: programId,
      ),
    );
    // The present shader draws a full-screen triangle from `gl_VertexID`
    // alone (no vertex attributes) — WebGL2 still requires *some* VAO
    // bound for portability across drivers, so one empty VAO is created
    // once here and reused for the pass's whole lifetime, not per frame.
    final emptyVao = device.createVertexArray();
    _emptyVao = emptyVao;
    return [
      _PresentPass(
        descriptor: PassDescriptor(
          id: 'present',
          stage: GraphStage.beforePresent,
          uses: [ResourceUse(sceneColorResource, ResourceAccess.read)],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        sceneColorResource: sceneColorResource,
        outputEncoding: outputEncoding,
      ),
    ];
  }

  @override
  void dispose() {
    final vao = _emptyVao;
    if (vao != null) {
      device.deleteVertexArray(vao);
      _emptyVao = null;
    }
  }
}

final class _PresentPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final ResourceRef sceneColorResource;
  final ColorEncoding outputEncoding;

  const _PresentPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.sceneColorResource,
    required this.outputEncoding,
  });

  @override
  void execute(RenderPassContext context) {
    final source =
        context.viewOfResource(sceneColorResource) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(null);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindVertexArray(emptyVao);
    encoder.bindTexture(0, source.gpuObject);
    final skyboxTexture = context is BoundPassContext
        ? context.skyboxTexture
        : null;
    if (skyboxTexture != null) {
      encoder.bindTexture(1, skyboxTexture);
    }
    final post = context.frameScene.post as PostProcessState;
    final environment = context.frameScene.environment as FrameEnvironment;
    final camera = context.frameScene.camera as CameraView;
    encoder.setUniform('uExposure', UniformValue.float1(post.exposure));
    encoder.setUniform('uVignette', UniformValue.float1(post.vignette));
    encoder.setUniform('uGrain', UniformValue.float1(post.grain));
    encoder.setUniform(
      'uOutputEncoding',
      UniformValue.float1(PresentOutputPolicy.encodingUniform(outputEncoding)),
    );
    encoder.setUniform(
      'uToneMap',
      const UniformValue.float1(PresentOutputPolicy.toneMapUniform),
    );
    final clear = environment.clearColor;
    final skybox = environment.skybox;
    final horizon = skybox?.horizon ?? environment.ambientColor;
    final zenith = LinearColor(
      skybox?.zenith.r ?? (clear.r * 0.72 + horizon.r * 0.28),
      skybox?.zenith.g ?? (clear.g * 0.72 + horizon.g * 0.28),
      skybox?.zenith.b ?? (clear.b * 0.72 + horizon.b * 0.28),
    );
    final ground = LinearColor(
      skybox?.ground.r ?? clear.r * 0.90,
      skybox?.ground.g ?? clear.g * 0.90,
      skybox?.ground.b ?? clear.b * 0.90,
    );
    encoder
      ..setUniform(
        'uClearColor',
        UniformValue.float3(Float32List.fromList([clear.r, clear.g, clear.b])),
      )
      ..setUniform(
        'uSkyHorizon',
        UniformValue.float3(
          Float32List.fromList([horizon.r, horizon.g, horizon.b]),
        ),
      )
      ..setUniform(
        'uSkyZenith',
        UniformValue.float3(
          Float32List.fromList([zenith.r, zenith.g, zenith.b]),
        ),
      )
      ..setUniform(
        'uSkyGround',
        UniformValue.float3(
          Float32List.fromList([ground.r, ground.g, ground.b]),
        ),
      )
      ..setUniform('uSkyEnabled', UniformValue.float1(skybox == null ? 0 : 1))
      ..setUniform(
        'uSkyHorizonGlow',
        UniformValue.float1(skybox?.horizonGlow ?? 0),
      )
      ..setUniform(
        'uSkyStarDensity',
        UniformValue.float1(skybox?.starDensity ?? 0),
      )
      ..setUniform('uSkyTexture', const UniformValue.sampler(1))
      ..setUniform(
        'uSkyTextureEnabled',
        UniformValue.float1(skybox != null && skyboxTexture != null ? 1 : 0),
      )
      ..setUniform(
        'uSkyRotation',
        UniformValue.float1(skybox?.rotationRadians ?? 0),
      )
      ..setUniform('uSkyExposure', UniformValue.float1(skybox?.exposure ?? 1))
      ..setUniform(
        'uSkyTextureSrgb',
        UniformValue.float1(skybox?.textureIsSrgb == true ? 1 : 0),
      )
      ..setUniform(
        'uInverseProjection',
        UniformValue.mat4(Float32List.fromList(camera.inverseProjection.m)),
      )
      ..setUniform(
        'uInverseView',
        UniformValue.mat4(Float32List.fromList(camera.inverseView.m)),
      )
      ..setUniform(
        'uCameraPosition',
        UniformValue.float3(
          Float32List.fromList([camera.eye.x, camera.eye.y, camera.eye.z]),
        ),
      )
      ..setUniform(
        'uCloudCoverage',
        UniformValue.float1(skybox?.cloudCoverage ?? 0),
      )
      ..setUniform(
        'uCloudDensity',
        UniformValue.float1(skybox?.cloudDensity ?? 0),
      )
      ..setUniform(
        'uCloudBaseHeight',
        UniformValue.float1(skybox?.cloudBaseHeight ?? 650),
      )
      ..setUniform(
        'uCloudThickness',
        UniformValue.float1(skybox?.cloudThickness ?? 350),
      )
      ..setUniform('uCloudScale', UniformValue.float1(skybox?.cloudScale ?? 0))
      ..setUniform(
        'uCloudWind',
        UniformValue.float2(
          Float32List.fromList([
            skybox?.cloudWindX ?? 0,
            skybox?.cloudWindZ ?? 0,
          ]),
        ),
      )
      ..setUniform('uCloudPhase', UniformValue.float1(skybox?.cloudPhase ?? 0))
      ..setUniform(
        'uCloudDetail',
        UniformValue.float1(skybox?.cloudDetail ?? 0),
      )
      ..setUniform(
        'uCloudSilverLining',
        UniformValue.float1(skybox?.cloudSilverLining ?? 0),
      )
      ..setUniform(
        'uCloudSampleCount',
        UniformValue.float1((skybox?.cloudSampleCount ?? 4).toDouble()),
      )
      ..setUniform(
        'uCloudLightDirection',
        UniformValue.float3(
          Float32List.fromList([
            environment.directionalLight?.direction.x ?? 0,
            environment.directionalLight?.direction.y ?? 1,
            environment.directionalLight?.direction.z ?? 0,
          ]),
        ),
      )
      ..setUniform(
        'uCloudLightColor',
        UniformValue.float3(
          Float32List.fromList([
            environment.directionalLight?.color.r ?? 1,
            environment.directionalLight?.color.g ?? 1,
            environment.directionalLight?.color.b ?? 1,
          ]),
        ),
      )
      ..setUniform(
        'uCloudLightIntensity',
        UniformValue.float1(environment.directionalLight?.intensity ?? 0),
      );
    encoder.drawArrays(first: 0, count: 3);
  }
}
