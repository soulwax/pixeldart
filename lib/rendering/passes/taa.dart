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
import 'taa_resources.dart';

final class TaaProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'taaResolve',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uCurrentColor': 0, 'uHistoryColor': 1, 'uDepth': 2},
    requiredUniforms: const [
      'uHistoryWeight',
      'uTexelSize',
    ],
  );
}

/// Temporal Anti-Aliasing (TAA) history accumulation & YCoCg neighborhood clipping pass.
final class TaaResolveFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveCurrentColor;
  final GpuObject Function() resolveHistoryColor;
  final GpuObject Function() resolveDepth;
  final ResourceRef taaOutputResource;

  TaaResolveFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveCurrentColor,
    required this.resolveHistoryColor,
    required this.resolveDepth,
    this.taaOutputResource = TaaResources.taaResolved,
  });

  @override
  String get id => 'taaResolve';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'taaResolve',
        stage: GraphStage.afterResolve,
        uses: [ResourceUse(taaOutputResource, ResourceAccess.write)],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      TaaProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();

    return [
      _TaaResolvePass(
        descriptor: PassDescriptor(
          id: 'taaResolve',
          stage: GraphStage.afterResolve,
          uses: [ResourceUse(taaOutputResource, ResourceAccess.write)],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        destResourceName: taaOutputResource.name,
        resolveCurrentColor: resolveCurrentColor,
        resolveHistoryColor: resolveHistoryColor,
        resolveDepth: resolveDepth,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _TaaResolvePass implements RenderPass {
  @override
  final PassDescriptor descriptor;

  final CompiledProgram program;
  final GpuObject emptyVao;
  final String destResourceName;
  final GpuObject Function() resolveCurrentColor;
  final GpuObject Function() resolveHistoryColor;
  final GpuObject Function() resolveDepth;

  const _TaaResolvePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.destResourceName,
    required this.resolveCurrentColor,
    required this.resolveHistoryColor,
    required this.resolveDepth,
  });

  @override
  void execute(RenderPassContext context) {
    final view = context.viewOf(destResourceName) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorOnly);
    encoder.useProgram(program.handle);

    encoder.bindTexture(0, resolveCurrentColor());
    encoder.bindTexture(1, resolveHistoryColor());
    encoder.bindTexture(2, resolveDepth());
    encoder.setUniform('uCurrentColor', const UniformValue.sampler(0));
    encoder.setUniform('uHistoryColor', const UniformValue.sampler(1));
    encoder.setUniform('uDepth', const UniformValue.sampler(2));
    encoder.setUniform('uHistoryWeight', const UniformValue.float1(0.90));
    encoder.setUniform('uTexelSize', UniformValue.float2(Float32List.fromList([1.0 / 384.0, 1.0 / 216.0])));

    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
