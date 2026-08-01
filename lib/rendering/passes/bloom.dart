import 'dart:typed_data';

import '../api/effects.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/state_cache.dart';
import 'bloom_resources.dart';
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';

enum _BloomBlurAxis { horizontal, vertical }

final class BloomBlurProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
    required String programId,
  }) => ProgramSource(
    id: programId,
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uSource': 0},
    requiredUniforms: const ['uTexelStep'],
  );
}

/// §8.7's bloom blur, one pass per axis (separable 5-tap gaussian, run
/// horizontal then vertical rather than one 2D kernel — the standard
/// technique for keeping a wide blur radius affordable). The horizontal
/// pass samples `sceneColor`'s glow attachment directly via
/// `bindGlowTexture` — the "declared emissive attachment" §8.7 requires
/// bloom to read, never inferring glow from final composited color; the
/// vertical pass samples the horizontal pass's own output like any other
/// color texture.
final class BloomBlurFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final String programId;
  final String passId;
  final _BloomBlurAxis _axis;
  final bool sampleGlowAttachment;
  final ResourceRef sourceResource;
  final ResourceRef destResource;
  final GpuObject Function() resolveSource;

  BloomBlurFeature.horizontal({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSource,
  }) : programId = 'bloomBlurH',
       passId = 'bloomBlurH',
       _axis = _BloomBlurAxis.horizontal,
       sampleGlowAttachment = true,
       sourceResource = SafeGraphResources.sceneColor,
       destResource = BloomResources.bloomBlurH;

  BloomBlurFeature.vertical({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSource,
  }) : programId = 'bloomBlurV',
       passId = 'bloomBlurV',
       _axis = _BloomBlurAxis.vertical,
       sampleGlowAttachment = false,
       sourceResource = BloomResources.bloomBlurH,
       destResource = BloomResources.bloomBlurV;

  @override
  String get id => passId;

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: passId,
        stage: GraphStage.afterResolve,
        uses: [
          ResourceUse(sourceResource, ResourceAccess.read),
          ResourceUse(destResource, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      BloomBlurProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
        programId: programId,
      ),
    );
    final emptyVao = device.createVertexArray();
    final texelStep = _axis == _BloomBlurAxis.horizontal
        ? Float32List.fromList([1.0 / destResource.width, 0.0])
        : Float32List.fromList([0.0, 1.0 / destResource.height]);
    return [
      _BloomBlurPass(
        descriptor: PassDescriptor(
          id: passId,
          stage: GraphStage.afterResolve,
          uses: [
            ResourceUse(sourceResource, ResourceAccess.read),
            ResourceUse(destResource, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveSource: resolveSource,
        sampleGlowAttachment: sampleGlowAttachment,
        texelStep: texelStep,
        destResourceName: destResource.name,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _BloomBlurPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveSource;
  final bool sampleGlowAttachment;
  final Float32List texelStep;
  final String destResourceName;

  const _BloomBlurPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveSource,
    required this.sampleGlowAttachment,
    required this.texelStep,
    required this.destResourceName,
  });

  @override
  void execute(RenderPassContext context) {
    // §8.7's gate: "installed zero-weight bloom owns zero draws." The
    // composite pass already multiplies by uBloomStrength before its
    // additive blend, so a stale or never-written blur texture contributes
    // exactly 0 at bloomStrength <= 0 regardless of what it holds — no
    // clear is needed here (unlike SSAO's white fallback, which shadowed
    // world reads directly with no strength-scaling at the read site).
    final strength =
        (context.frameScene.post as PostProcessState).bloomStrength;
    if (strength <= 0) return;

    final view = context.viewOf(destResourceName) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorOnly);
    encoder.useProgram(program.handle);
    if (sampleGlowAttachment) {
      encoder.bindGlowTexture(0, resolveSource());
    } else {
      encoder.bindTexture(0, resolveSource());
    }
    encoder.setUniform('uSource', const UniformValue.sampler(0));
    encoder.setUniform('uTexelStep', UniformValue.float2(texelStep));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}

final class BloomCompositeProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'bloomComposite',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uBloom': 0},
    requiredUniforms: const ['uBloomStrength'],
  );
}

/// §8.7's final stage: additively blends the blurred bloom texture onto the
/// already-resolved `sceneColor` — `blendSrc: one, blendDst: one` so this
/// pass only ever adds light, never replaces or darkens what
/// `shadowedWorld` already wrote. Deliberately does not clear its target
/// (the whole point is compositing on top of existing content) and runs
/// after the MSAA resolve, so it operates on the single-sample `sceneColor`
/// `present` will read next, not the multisampled target.
final class BloomCompositeFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveBloom;

  BloomCompositeFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveBloom,
  });

  @override
  String get id => 'bloomComposite';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'bloomComposite',
        stage: GraphStage.afterResolve,
        uses: [
          const ResourceUse(BloomResources.bloomBlurV, ResourceAccess.read),
          const ResourceUse(SafeGraphResources.sceneColor, ResourceAccess.read),
          ResourceUse(BloomResources.sceneColorPostBloom, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      BloomCompositeProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    return [
      _BloomCompositePass(
        descriptor: PassDescriptor(
          id: 'bloomComposite',
          stage: GraphStage.afterResolve,
          uses: [
            const ResourceUse(BloomResources.bloomBlurV, ResourceAccess.read),
            const ResourceUse(SafeGraphResources.sceneColor, ResourceAccess.read),
            ResourceUse(BloomResources.sceneColorPostBloom, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
          blendEnable: true,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveBloom: resolveBloom,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _BloomCompositePass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveBloom;

  const _BloomCompositePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveBloom,
  });

  @override
  void execute(RenderPassContext context) {
    // §8.7: "installed zero-weight bloom owns zero draws." Unlike DOF/
    // grade/PS1/VHS, this pass blends *in place* onto the exact physical
    // object shadowedWorld already wrote (sceneColorPostBloom is a
    // nextVersion() of sceneColor, not a distinct target) — skipping the
    // draw entirely leaves that content exactly as shadowedWorld left it,
    // which is already correct, so there is nothing to clear or fall back
    // to here at all, not even a bindTarget call.
    final strength =
        (context.frameScene.post as PostProcessState).bloomStrength;
    if (strength <= 0) return;

    final view =
        context.viewOf(SafeGraphResources.sceneColor.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    encoder.bindTarget(view.gpuObject);
    // sceneColor is a colorAndGlow target (2 active draw buffers by
    // default, restored to 2 after every resolveTarget call) but this
    // shader only writes one output — narrow to 1 or some WebGL2
    // implementations raise GL_INVALID_OPERATION (found on WebKit/Safari).
    encoder.setColorAttachmentCount(1);
    // Pure additive: blendDst: one (not the DrawStateDescriptor default of
    // zero, which would replace sceneColor's existing pixel rather than add
    // light to it) — PassDescriptor has no blendSrc/blendDst/blendEquation
    // fields to derive this from toDrawState(), so it's a direct literal
    // here rather than routed through the descriptor's own conversion.
    encoder.applyDrawState(
      const DrawStateDescriptor(
        depthTest: false,
        depthWrite: false,
        cullEnable: false,
        blendEnable: true,
        blendSrc: BlendFactor.one,
        blendDst: BlendFactor.one,
        blendEquation: BlendEquation.add,
      ),
    );
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, resolveBloom());
    encoder.setUniform('uBloom', const UniformValue.sampler(0));
    encoder.setUniform('uBloomStrength', UniformValue.float1(strength));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
