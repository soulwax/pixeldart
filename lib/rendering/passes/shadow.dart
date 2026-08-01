import 'dart:typed_data';

import '../api/handles.dart';
import '../api/lights.dart';
import '../api/materials.dart';
import '../api/scene.dart';
import '../core/batching.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../math/mat4.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'pass_context_impl.dart';
import 'shadow_resources.dart';
import 'world.dart';

/// The light-space view-projection a shadow caster pass rendered from and a
/// shadowed world pass must sample against — computed once per frame from
/// the caster's own [SpotLight] fields (§8.4: "tight near/far from light
/// bounds"), not authored separately, so the two passes cannot disagree.
final class ShadowLightView {
  final Mat4 viewProjection;
  const ShadowLightView(this.viewProjection);

  factory ShadowLightView.fromSpotLight(SpotLight light) {
    final view = Mat4.lookAt(
      eye: light.position,
      forward: light.direction,
      up: light.direction.x.abs() < 0.99
          ? const Vec3(1, 0, 0)
          : const Vec3(0, 1, 0),
    );
    final fovY = (light.outerConeRadians * 2).clamp(0.1, 3.0);
    final projection = Mat4.perspective(
      fovYRadians: fovY,
      aspect: 1,
      near: 0.05,
      far: light.range,
    );
    return ShadowLightView(projection * view);
  }
}

final class ShadowCasterProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'shadowCaster',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {'aPosition': 0, 'aUvMat': 4},
    samplerUnits: const {'uAlbedo': 0},
    requiredUniforms: const [
      'uLightViewProjection',
      'uModel',
      'uAlphaCutoff',
    ],
  );
}

/// §8.4's shadow-caster depth pass: renders every `castsShadow` item from
/// the light's own view into a depth-only target ([ShadowResources.shadowMap]),
/// writing no color at all. A shadowed world pass (`shadowed_world.dart`)
/// reads the resulting depth texture back to attenuate direct light — kept
/// as its own `RenderFeature` rather than folded into `WorldFeature`, so the
/// already-proven safe/textured graphs stay untouched by this addition,
/// matching the session's established "new capability, new feature" pattern.
final class ShadowFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;
  final SpotLight? Function() resolveCasterLight;
  final void Function(ShadowLightView view) onLightViewComputed;

  ShadowFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveCasterLight,
    required this.onLightViewComputed,
  });

  @override
  String get id => 'shadow';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'shadowCaster',
        stage: GraphStage.beforeShadow,
        uses: [
          const ResourceUse(ShadowResources.shadowMap, ResourceAccess.write),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      ShadowCasterProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    return [
      _ShadowCasterPass(
        descriptor: PassDescriptor(
          id: 'shadowCaster',
          stage: GraphStage.beforeShadow,
          uses: [
            const ResourceUse(
              ShadowResources.shadowMap,
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
        resolveCasterLight: resolveCasterLight,
        onLightViewComputed: onLightViewComputed,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _ShadowCasterPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;
  final SpotLight? Function() resolveCasterLight;
  final void Function(ShadowLightView view) onLightViewComputed;

  const _ShadowCasterPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveCasterLight,
    required this.onLightViewComputed,
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(ShadowResources.shadowMap.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    final light = resolveCasterLight();
    if (light == null) {
      // No shadow-casting light this frame: bind and clear the target so
      // its depth reads as "everything lit" (far-plane depth = 1.0) rather
      // than leaving stale depth from a previous frame's caster.
      encoder.bindTarget(view.gpuObject);
      encoder.applyDrawState(descriptor.toDrawState());
      encoder.clear(ClearMask.depthOnly);
      return;
    }

    final lightView = ShadowLightView.fromSpotLight(light);
    onLightViewComputed(lightView);

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.depthOnly);
    encoder.useProgram(program.handle);
    encoder.setUniform('uAlbedo', const UniformValue.sampler(0));

    for (final batch in context.frameScene.opaqueBatches) {
      _drawCaster(encoder, batch, lightView);
    }
  }

  /// §6.2's "alpha-masked geometry participates in shadow ... routes": the
  /// caster resolves the material for the same reason the world pass does,
  /// so a lattice casts a lattice rather than the solid shadow of its
  /// bounding quad. No affine weight is threaded here — see
  /// shadow_caster.vert for why light space has no equivalent warp.
  ///
  /// [MaterialDefinition.doubleSided] is honoured for the same reason the
  /// world pass honours it, and the omission was a real defect: this pass
  /// applied its own `cullEnable: true` state once and never varied it, so
  /// a single-faced double-sided surface cast nothing at all for whichever
  /// half of a light's travel it happened to face away from. Its shadow
  /// blinked out and back as the caster orbited. A surface the world pass
  /// agrees to shade from both sides must occlude from both sides too.
  void _setMaterialState(DrawCommandEncoder encoder, MaterialHandle handle) {
    final material = resolveMaterial(handle);
    encoder.bindTexture(0, resolveAlbedo(material.albedoTexture));
    encoder.setUniform(
      'uAlphaCutoff',
      UniformValue.float1(
        material.alphaMode == AlphaMode.masked ? material.alphaCutoff : 0,
      ),
    );
    final baseState = descriptor.toDrawState();
    encoder.applyDrawState(
      material.doubleSided ? baseState.withCullEnable(false) : baseState,
    );
  }

  void _drawCaster(
    DrawCommandEncoder encoder,
    Object batch,
    ShadowLightView lightView,
  ) {
    if (batch is RetainedItemView) {
      if (!batch.descriptor.castsShadow) return;
      _setLightUniforms(encoder, batch.descriptor.transform, lightView);
      _setMaterialState(encoder, batch.descriptor.material);
      final mesh = resolveMesh(batch.descriptor.mesh);
      encoder.bindVertexArray(mesh.vao);
      if (mesh.isIndexed) {
        encoder.drawElements(count: mesh.drawCount, offsetBytes: 0);
      } else {
        encoder.drawArrays(first: 0, count: mesh.drawCount);
      }
    } else if (batch is InstanceBatch) {
      final representative = batch.representative;
      if (!representative.descriptor.castsShadow) return;
      _setLightUniforms(
        encoder,
        representative.descriptor.transform,
        lightView,
      );
      _setMaterialState(encoder, representative.descriptor.material);
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
        'ShadowFeature: frameScene entries must be InstanceBatch or '
        'RetainedItemView, got ${batch.runtimeType}',
      );
    }
  }

  void _setLightUniforms(
    DrawCommandEncoder encoder,
    Transform transform,
    ShadowLightView lightView,
  ) {
    final model = transform.toMat4();
    encoder.setUniform('uModel', UniformValue.mat4(Float32List.fromList(model.m)));
    encoder.setUniform(
      'uLightViewProjection',
      UniformValue.mat4(Float32List.fromList(lightView.viewProjection.m)),
    );
  }
}
