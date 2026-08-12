import 'dart:typed_data';

import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'pass_context_impl.dart';
import 'ssss_resources.dart';

final class SsssProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
    required String id,
  }) => ProgramSource(
    id: id,
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uColor': 0, 'uDepth': 1},
    requiredUniforms: const [
      'uDirection',
      'uScatterRadius',
      'uDepthThreshold',
    ],
  );
}

/// Screen-Space Subsurface Scattering (SSSS) bilateral blur feature in PixelDart.
final class SsssFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveSceneColor;
  final GpuObject Function() resolveSceneDepth;
  final ResourceRef ssssOutputResource;

  SsssFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSceneColor,
    required this.resolveSceneDepth,
    this.ssssOutputResource = SsssResources.ssssPong,
  });

  @override
  String get id => 'ssss';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'ssssHorizontal',
        stage: GraphStage.afterWorld,
        uses: [ResourceUse(SsssResources.ssssPing, ResourceAccess.write)],
      ),
    );
    graph.addPass(
      PassDeclaration(
        id: 'ssssVertical',
        stage: GraphStage.afterWorld,
        uses: [ResourceUse(ssssOutputResource, ResourceAccess.write)],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final programH = programLibrary.publish(
      SsssProgramSource.build(
        id: 'ssssHorizontal',
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final programV = programLibrary.publish(
      SsssProgramSource.build(
        id: 'ssssVertical',
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();

    return [
      _SsssPass(
        descriptor: PassDescriptor(
          id: 'ssssHorizontal',
          stage: GraphStage.afterWorld,
          uses: [ResourceUse(SsssResources.ssssPing, ResourceAccess.write)],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: programH,
        emptyVao: emptyVao,
        destResourceName: SsssResources.ssssPing.name,
        resolveInputColor: resolveSceneColor,
        resolveDepth: resolveSceneDepth,
        direction: Float32List.fromList([1.0, 0.0]),
      ),
      _SsssPass(
        descriptor: PassDescriptor(
          id: 'ssssVertical',
          stage: GraphStage.afterWorld,
          uses: [ResourceUse(ssssOutputResource, ResourceAccess.write)],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: programV,
        emptyVao: emptyVao,
        destResourceName: ssssOutputResource.name,
        resolveInputColor: resolveSceneColor,
        resolveDepth: resolveSceneDepth,
        direction: Float32List.fromList([0.0, 1.0]),
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _SsssPass implements RenderPass {
  @override
  final PassDescriptor descriptor;

  final CompiledProgram program;
  final GpuObject emptyVao;
  final String destResourceName;
  final GpuObject Function() resolveInputColor;
  final GpuObject Function() resolveDepth;
  final Float32List direction;

  const _SsssPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.destResourceName,
    required this.resolveInputColor,
    required this.resolveDepth,
    required this.direction,
  });

  @override
  void execute(RenderPassContext context) {
    final view = context.viewOf(destResourceName) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorOnly);
    encoder.useProgram(program.handle);

    encoder.bindTexture(0, resolveInputColor());
    encoder.bindTexture(1, resolveDepth());
    encoder.setUniform('uColor', const UniformValue.sampler(0));
    encoder.setUniform('uDepth', const UniformValue.sampler(1));
    encoder.setUniform('uDirection', UniformValue.float2(direction));
    encoder.setUniform('uScatterRadius', UniformValue.float3(Float32List.fromList([3.67, 1.37, 0.68])));
    encoder.setUniform('uDepthThreshold', const UniformValue.float1(0.08));

    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
