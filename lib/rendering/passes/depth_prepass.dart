import 'dart:typed_data';

import '../api/effects.dart';
import '../api/frame.dart';
import '../api/handles.dart';
import '../api/materials.dart';
import '../api/scene.dart';
import '../core/batching.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../math/transform.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'depth_resources.dart';
import 'pass_context_impl.dart';
import 'world.dart';

final class DepthPrepassProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
    String programId = 'depthPrepass',
  }) => ProgramSource(
    id: programId,
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {'aPosition': 0, 'aUvMat': 4},
    samplerUnits: const {'uAlbedo': 0},
    requiredUniforms: const [
      'uViewProjection',
      'uModel',
      'uVertexSnapGrid',
      'uAffineWarpStrength',
      'uAlphaCutoff',
    ],
  );
}

/// §8.4 rung 4: "sampleable single-sample scene-depth prepass, required
/// when SSAO or depth-aware transparency is installed, includes opaque +
/// alpha-masked depth." Renders every opaque/alpha-masked item from the
/// *main* camera (unlike `ShadowFeature`'s light-space camera) into a
/// depth-only target so a later pass — SSAO (rung 5) in the real
/// pipeline, a standalone debug view in `buildDepthDebugGraph` — can
/// sample real scene depth before the (possibly multisampled) world pass
/// has even run. Kept as its own feature, same "new capability, new
/// feature" discipline as every prior packet. [programId] defaults to
/// `'depthPrepass'` but must be overridden to a distinct value whenever two
/// independently-built graphs each construct their own `DepthPrepassFeature`
/// against one shared `ProgramLibrary` — `buildShadowGraph` (the real,
/// SSAO-feeding prepass) and `buildDepthDebugGraph` (a standalone proof of
/// the same capability) both do exactly this in the renderer-test
/// bootstrap, and without distinct ids the second graph's `.build()` would
/// silently delete the first's already-compiled program via
/// `ProgramLibrary.publish`'s "delete the previous program under this id"
/// step — the same bug class `PresentFeature.programId` exists to prevent,
/// just discovered a second time here.
final class DepthPrepassFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;
  final String programId;

  DepthPrepassFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    this.programId = 'depthPrepass',
  });

  @override
  String get id => 'depthPrepass';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'depthPrepass',
        stage: GraphStage.beforeDepth,
        uses: [
          const ResourceUse(
            DepthPrepassResources.sceneDepth,
            ResourceAccess.write,
          ),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      DepthPrepassProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
        programId: programId,
      ),
    );
    return [
      _DepthPrepassPass(
        descriptor: PassDescriptor(
          id: 'depthPrepass',
          stage: GraphStage.beforeDepth,
          uses: [
            const ResourceUse(
              DepthPrepassResources.sceneDepth,
              ResourceAccess.write,
            ),
          ],
          depthTest: true,
          depthWrite: true,
          cullEnable: true,
        ),
        program: program,
        resolveMesh: resolveMesh,
        resolveMaterial: resolveMaterial,
        resolveAlbedo: resolveAlbedo,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _DepthPrepassPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;

  const _DepthPrepassPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(DepthPrepassResources.sceneDepth.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final camera = context.frameScene.camera as CameraView;
    final post = context.frameScene.post as PostProcessState;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.depthOnly);
    encoder.useProgram(program.handle);
    // Must match shadowedWorld's own uVertexSnapGrid exactly — see
    // depth_prepass.vert for why a divergence here corrupts SSAO rather
    // than merely looking different.
    encoder.setUniform(
      'uVertexSnapGrid',
      UniformValue.float1(post.vertexSnapGrid),
    );
    encoder.setUniform('uAlbedo', const UniformValue.sampler(0));

    for (final batch in context.frameScene.opaqueBatches) {
      _drawDepthOnly(encoder, batch, camera, post.affineWarpStrength);
    }
  }

  /// The alpha-cutout half of "must match shadowedWorld exactly", alongside
  /// the vertex snap above. All three values are computed from the material
  /// by the identical expressions `_ShadowedWorldPass._setMaterialState`
  /// uses, so a masked surface discards the same fragments in both passes,
  /// an affine-sampled one recovers the same uv, and a double-sided one
  /// keeps the same faces — a divergence in any of them would leave SSAO
  /// occluding against a silhouette nothing ever shaded.
  ///
  /// [MaterialDefinition.doubleSided] was the last of the three to be
  /// wired, and its absence was the same defect the shadow caster had: this
  /// pass culled back faces unconditionally while the world pass did not,
  /// so a double-sided surface seen from behind wrote no depth and the AO
  /// texels behind it were computed against whatever lay further away.
  void _setMaterialState(
    DrawCommandEncoder encoder,
    MaterialHandle handle,
    double affineWarpStrength,
  ) {
    final material = resolveMaterial(handle);
    encoder.bindTexture(0, resolveAlbedo(material.albedoTexture));
    encoder.setUniform(
      'uAlphaCutoff',
      UniformValue.float1(
        material.alphaMode == AlphaMode.masked ? material.alphaCutoff : 0,
      ),
    );
    encoder.setUniform(
      'uAffineWarpStrength',
      UniformValue.float1(material.affineSampling ? affineWarpStrength : 0),
    );
    final baseState = descriptor.toDrawState();
    encoder.applyDrawState(
      material.doubleSided ? baseState.withCullEnable(false) : baseState,
    );
  }

  void _drawDepthOnly(
    DrawCommandEncoder encoder,
    Object batch,
    CameraView camera,
    double affineWarpStrength,
  ) {
    if (batch is RetainedItemView) {
      _setUniforms(encoder, batch.descriptor.transform, camera);
      _setMaterialState(
        encoder,
        batch.descriptor.material,
        affineWarpStrength,
      );
      final mesh = resolveMesh(batch.descriptor.mesh);
      encoder.bindVertexArray(mesh.vao);
      if (mesh.isIndexed) {
        encoder.drawElements(count: mesh.drawCount, offsetBytes: 0);
      } else {
        encoder.drawArrays(first: 0, count: mesh.drawCount);
      }
    } else if (batch is InstanceBatch) {
      final representative = batch.representative;
      _setUniforms(encoder, representative.descriptor.transform, camera);
      _setMaterialState(
        encoder,
        representative.descriptor.material,
        affineWarpStrength,
      );
      final mesh = resolveMesh(representative.descriptor.mesh);
      encoder.bindVertexArray(mesh.vao);
      if (mesh.isIndexed) {
        encoder.drawElementsInstanced(
          count: mesh.drawCount,
          offsetBytes: 0,
          instanceCount: batch.instanceCount,
        );
      } else {
        encoder.drawArraysInstanced(
          first: 0,
          count: mesh.drawCount,
          instanceCount: batch.instanceCount,
        );
      }
    } else {
      throw ArgumentError(
        'DepthPrepassFeature: frameScene entries must be InstanceBatch or '
        'RetainedItemView, got ${batch.runtimeType}',
      );
    }
  }

  void _setUniforms(DrawCommandEncoder encoder, Transform transform, CameraView camera) {
    encoder.setUniform(
      'uViewProjection',
      UniformValue.mat4(Float32List.fromList(camera.viewProjection.m)),
    );
    final model = transform.toMat4();
    encoder.setUniform('uModel', UniformValue.mat4(Float32List.fromList(model.m)));
  }
}
