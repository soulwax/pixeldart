import '../api/effects.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'pass_context_impl.dart';
import 'post_chain.dart';
import 'ps1_resources.dart';
import 'vhs_resources.dart';

final class VhsProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'vhs',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uScene': 0, 'uHistory': 1},
    requiredUniforms: const [
      'uTime',
      'uChromaWeight',
      'uTrackingWeight',
      'uNoiseWeight',
      'uHeadSwitchWeight',
      'uDropoutWeight',
      'uGhostWeight',
    ],
  );
}

final class VhsFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveHistory;
  final double Function() resolveTime;
  final ResourceRef inputResource;
  final ResourceRef outputResource;
  final PostChain? chain;

  /// A second target the size of [outputResource]. With it and a [chain],
  /// the pass alternates between the two each frame, reading last frame's
  /// output as history and never sampling the target it renders into.
  /// [resolveHistory] is then unused.
  final GpuObject Function()? resolveAlternateTarget;

  VhsFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveHistory,
    required this.resolveTime,
    this.inputResource = Ps1Resources.ps1Output,
    this.outputResource = VhsResources.vhsOutput,
    this.chain,
    this.resolveAlternateTarget,
  });

  @override
  String get id => 'vhs';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.declareHistoryResource(outputResource.name);
    graph.addPass(
      PassDeclaration(
        id: 'vhs',
        stage: GraphStage.afterResolve,
        uses: [
          ResourceUse(inputResource, ResourceAccess.read),
          ResourceUse(outputResource, ResourceAccess.historyRead),
          ResourceUse(outputResource, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      VhsProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    return [
      _VhsPass(
        descriptor: PassDescriptor(
          id: 'vhs',
          stage: GraphStage.afterResolve,
          uses: [
            ResourceUse(inputResource, ResourceAccess.read),
            ResourceUse(outputResource, ResourceAccess.historyRead),
            ResourceUse(outputResource, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveHistory: resolveHistory,
        resolveTime: resolveTime,
        inputResource: inputResource,
        outputResource: outputResource,
        chain: chain,
        resolveAlternateTarget: resolveAlternateTarget,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _VhsPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveHistory;
  final double Function() resolveTime;
  final ResourceRef inputResource;
  final ResourceRef outputResource;
  final PostChain? chain;
  final GpuObject Function()? resolveAlternateTarget;
  bool _writeAlternate = false;
  // Ping-pong history holds a real VHS frame only after a draw; the first
  // draw (and the first after a bypass) ghosts nothing rather than echoing
  // a cleared or stale target.
  bool _historyValid = false;

  _VhsPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveHistory,
    required this.resolveTime,
    required this.inputResource,
    required this.outputResource,
    this.chain,
    this.resolveAlternateTarget,
  });

  @override
  void execute(RenderPassContext context) {
    final sceneView = context.viewOf(inputResource.name) as BoundResourceView;
    final outputView = context.viewOf(outputResource.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final post = context.frameScene.post as PostProcessState;
    final chain = this.chain;
    final input = chain == null
        ? sceneView.gpuObject
        : chain.source(inputResource, sceneView.gpuObject);

    // §8.10: "reduced motion halves jitter and disables ghosting."
    final trackingWeight = post.reducedMotion
        ? post.vhsTrackingWeight * 0.5
        : post.vhsTrackingWeight;
    final ghostWeight = post.reducedMotion ? 0.0 : post.vhsGhostWeight;

    // Every effect is a mix or offset scaled by its weight, so all-zero
    // weights reproduce the input exactly.
    if (chain != null &&
        post.vhsChromaWeight == 0 &&
        trackingWeight == 0 &&
        post.vhsNoiseWeight == 0 &&
        post.vhsHeadSwitchWeight == 0 &&
        post.vhsDropoutWeight == 0 &&
        ghostWeight == 0) {
      chain.bypass(outputResource, input);
      _historyValid = false;
      return;
    }

    var target = outputView.gpuObject;
    var history = resolveHistory();
    var ghost = ghostWeight;
    final alternate = resolveAlternateTarget;
    if (chain != null && alternate != null) {
      final other = alternate();
      history = _writeAlternate ? target : other;
      target = _writeAlternate ? other : target;
      _writeAlternate = !_writeAlternate;
      if (!_historyValid) ghost = 0;
      _historyValid = true;
    }

    encoder.bindTarget(target);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, input);
    encoder.setUniform('uScene', const UniformValue.sampler(0));
    encoder.bindTexture(1, history);
    encoder.setUniform('uHistory', const UniformValue.sampler(1));
    encoder.setUniform('uTime', UniformValue.float1(resolveTime()));
    encoder.setUniform(
      'uChromaWeight',
      UniformValue.float1(post.vhsChromaWeight),
    );
    encoder.setUniform('uTrackingWeight', UniformValue.float1(trackingWeight));
    encoder.setUniform(
      'uNoiseWeight',
      UniformValue.float1(post.vhsNoiseWeight),
    );
    encoder.setUniform(
      'uHeadSwitchWeight',
      UniformValue.float1(post.vhsHeadSwitchWeight),
    );
    encoder.setUniform(
      'uDropoutWeight',
      UniformValue.float1(post.vhsDropoutWeight),
    );
    encoder.setUniform('uGhostWeight', UniformValue.float1(ghost));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
    chain?.produced(outputResource, target);
  }
}
