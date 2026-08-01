import '../api/effects.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'dof_resources.dart';
import 'grade_resources.dart';
import 'pass_context_impl.dart';

final class GradeProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'grade',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uScene': 0, 'uLut': 1},
    requiredUniforms: const ['uLutSize', 'uStrength'],
  );
}

/// RV-09 rung 2's LUT grade — §6.2's pass order places this immediately
/// after DOF and before PS1 quantize+dither/VHS, so it reads
/// [DofResources.dofOutput] and writes its own distinct
/// [GradeResources.gradeOutput] rather than a `nextVersion()` of an
/// upstream name (same reasoning DOF itself already established: this
/// shader samples the pre-grade scene as one input texture while writing a
/// different texture, so the two can never share a physical target).
///
/// The LUT itself is asset-like (a texture, not a per-frame render target),
/// resolved via [resolveLut] exactly the way `ShadowedWorldFeature` already
/// resolves its albedo texture — it is never a declared graph resource.
/// §5.3 names "identity LUT" as a mandatory baseline fallback; this feature
/// does not special-case that texture at the shader level (`sampleLut` has
/// no identity-specific branch) — an identity LUT is just a LUT texture
/// whose texels happen to encode a passthrough, and
/// `PostProcessState.colorGradeStrength == 0` already gives the same
/// observable result (`mix(scene, graded, 0) == scene`) without needing a
/// second texture asset loaded at all.
final class GradeFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveLut;
  final double lutSize;

  GradeFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveLut,
    this.lutSize = 16,
  });

  @override
  String get id => 'grade';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'grade',
        stage: GraphStage.afterResolve,
        uses: [
          const ResourceUse(DofResources.dofOutput, ResourceAccess.read),
          const ResourceUse(GradeResources.gradeOutput, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      GradeProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    return [
      _GradePass(
        descriptor: PassDescriptor(
          id: 'grade',
          stage: GraphStage.afterResolve,
          uses: [
            const ResourceUse(DofResources.dofOutput, ResourceAccess.read),
            const ResourceUse(
              GradeResources.gradeOutput,
              ResourceAccess.write,
            ),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        resolveLut: resolveLut,
        lutSize: lutSize,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _GradePass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final GpuObject Function() resolveLut;
  final double lutSize;

  const _GradePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.resolveLut,
    required this.lutSize,
  });

  @override
  void execute(RenderPassContext context) {
    final sceneView =
        context.viewOf(DofResources.dofOutput.name) as BoundResourceView;
    final outputView =
        context.viewOf(GradeResources.gradeOutput.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final post = context.frameScene.post as PostProcessState;

    encoder.bindTarget(outputView.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, sceneView.gpuObject);
    encoder.setUniform('uScene', const UniformValue.sampler(0));
    encoder.bindTexture(1, resolveLut());
    encoder.setUniform('uLut', const UniformValue.sampler(1));
    encoder.setUniform('uLutSize', UniformValue.float1(lutSize));
    encoder.setUniform(
      'uStrength',
      UniformValue.float1(post.colorGradeStrength),
    );
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
