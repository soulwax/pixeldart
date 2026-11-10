import '../api/shaders.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/generated_shaders.dart';
import 'pass_context_impl.dart';
import 'post_chain.dart';

final String _identityEffect = const ShaderOverride.effect(
  'vec4 effect(vec4 color, vec2 uv) { return color; }',
).fragmentFor(ShaderSlot.grade)!;

/// Appends one stage per host effect after [input] and returns the resource
/// holding the final image. A failed effect at startup draws as a copy and is
/// reported through `shaderErrors`.
ResourceRef appendPostEffects(
  List<RenderFeature> features, {
  required ProgramLibrary programLibrary,
  required GpuDevice device,
  required Map<String, ShaderOverride> effects,
  required ResourceRef input,
  required int width,
  required int height,
  required PostChain chain,
}) {
  var current = input;
  var index = 0;
  for (final entry in effects.entries) {
    final output = ResourceRef(
      name: 'hostPost$index',
      format: ResourceFormat.rgba8,
      width: width,
      height: height,
    );
    features.add(
      _PostEffectFeature(
        programLibrary: programLibrary,
        device: device,
        effect: entry.value,
        target: PostEffect(entry.key),
        input: current,
        output: output,
        chain: chain,
      ),
    );
    current = output;
    index += 1;
  }
  return current;
}

final class _PostEffectFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final GpuDevice device;
  final ShaderOverride effect;
  final PostEffect target;
  final ResourceRef input;
  final ResourceRef output;
  final PostChain chain;
  GpuObject? _emptyVao;

  _PostEffectFeature({
    required this.programLibrary,
    required this.device,
    required this.effect,
    required this.target,
    required this.input,
    required this.output,
    required this.chain,
  });

  String get _passId => 'postEffect:${target.name}';

  List<ResourceUse> get _uses => [
    ResourceUse(input, ResourceAccess.read),
    ResourceUse(output, ResourceAccess.write),
  ];

  @override
  String get id => _passId;

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(id: _passId, stage: GraphStage.afterResolve, uses: _uses),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publishVariant(
      source: ProgramSource(
        id: _passId,
        vertexSource: presentVertSrc,
        fragmentSource: _identityEffect,
        attributeLocations: const {},
        samplerUnits: const {'uScene': 0},
      ),
      target: target,
      variant: effect,
      allowFallback: programLibrary.fallbackToDefaults,
    );
    final emptyVao = device.createVertexArray();
    _emptyVao = emptyVao;
    return [
      _PostEffectPass(
        descriptor: PassDescriptor(
          id: _passId,
          stage: GraphStage.afterResolve,
          uses: _uses,
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        input: input,
        output: output,
        chain: chain,
      ),
    ];
  }

  @override
  void dispose() {
    final vao = _emptyVao;
    if (vao != null) device.deleteVertexArray(vao);
    _emptyVao = null;
  }
}

final class _PostEffectPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final ResourceRef input;
  final ResourceRef output;
  final PostChain chain;

  const _PostEffectPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.input,
    required this.output,
    required this.chain,
  });

  @override
  void execute(RenderPassContext context) {
    final inputView = context.viewOfResource(input) as BoundResourceView;
    final outputView = context.viewOfResource(output) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    encoder.bindTarget(outputView.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, chain.source(input, inputView.gpuObject));
    encoder.setUniform('uScene', const UniformValue.sampler(0));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
    chain.produced(output, outputView.gpuObject);
  }
}
