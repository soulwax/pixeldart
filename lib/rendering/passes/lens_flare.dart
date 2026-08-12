import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'lens_flare_resources.dart';
import 'pass_context_impl.dart';

final class LensFlareProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'lensFlare',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uSceneColor': 0},
    requiredUniforms: const [
      'uThreshold',
      'uStreakIntensity',
      'uGhostIntensity',
    ],
  );
}

/// Cinematic Lens Flare & Anamorphic Streak post-process pass in PixelDart.
final class LensFlareFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveSceneColor;
  final ResourceRef lensFlareOutputResource;

  LensFlareFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSceneColor,
    this.lensFlareOutputResource = LensFlareResources.lensFlareComposite,
  });

  @override
  String get id => 'lensFlare';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'lensFlare',
        stage: GraphStage.afterResolve,
        uses: [ResourceUse(lensFlareOutputResource, ResourceAccess.write)],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      LensFlareProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();

    return [
      _LensFlarePass(
        descriptor: PassDescriptor(
          id: 'lensFlare',
          stage: GraphStage.afterResolve,
          uses: [ResourceUse(lensFlareOutputResource, ResourceAccess.write)],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        destResourceName: lensFlareOutputResource.name,
        resolveSceneColor: resolveSceneColor,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _LensFlarePass implements RenderPass {
  @override
  final PassDescriptor descriptor;

  final CompiledProgram program;
  final GpuObject emptyVao;
  final String destResourceName;
  final GpuObject Function() resolveSceneColor;

  const _LensFlarePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.destResourceName,
    required this.resolveSceneColor,
  });

  @override
  void execute(RenderPassContext context) {
    final view = context.viewOf(destResourceName) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorOnly);
    encoder.useProgram(program.handle);

    encoder.bindTexture(0, resolveSceneColor());
    encoder.setUniform('uSceneColor', const UniformValue.sampler(0));
    encoder.setUniform('uThreshold', const UniformValue.float1(0.85));
    encoder.setUniform('uStreakIntensity', const UniformValue.float1(0.65));
    encoder.setUniform('uGhostIntensity', const UniformValue.float1(0.50));

    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
