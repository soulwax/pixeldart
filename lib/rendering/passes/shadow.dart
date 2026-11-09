import 'dart:math' as math;

import '../api/handles.dart';
import '../api/lights.dart';
import '../math/bounds.dart';
import '../api/materials.dart';
import '../api/scene.dart';
import '../core/batching.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/instance_transforms.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../core/shadow_caster_lod.dart';
import '../math/mat4.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'pass_context_impl.dart';
import 'shadow_resources.dart';
import 'world.dart';

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

  factory ShadowLightView.fromDirectionalLight({
    required DirectionalLight light,
    required Aabb bounds,
  }) {
    final center = bounds.center;
    final dir = light.direction.normalized;
    final extent = bounds.extent;
    final radius = math.sqrt(
      extent.x * extent.x + extent.y * extent.y + extent.z * extent.z,
    );

    final eye = center - (dir * radius);
    final up = dir.x.abs() < 0.99 ? const Vec3(1, 0, 0) : const Vec3(0, 1, 0);
    final view = Mat4.lookAt(eye: eye, forward: dir, up: up);

    final projection = Mat4.orthographic(
      left: -radius,
      right: radius,
      bottom: -radius,
      top: radius,
      near: 0.1,
      far: radius * 2.0,
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
    requiredUniforms: const ['uLightViewProjection', 'uModel', 'uAlphaCutoff'],
  );
}

final class ShadowFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;
  final SpotLight? Function() resolveCasterLight;
  final ShadowCasterLodResolver? resolveCasterLod;
  final ShadowCasterMeshResolver? resolveCasterMesh;
  final void Function(ShadowLightView view) onLightViewComputed;
  final ResourceRef shadowMapResource;

  ShadowFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveCasterLight,
    this.resolveCasterLod,
    this.resolveCasterMesh,
    required this.onLightViewComputed,
    this.shadowMapResource = ShadowResources.shadowMap,
  });

  @override
  String get id => 'shadow';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'shadowCaster',
        stage: GraphStage.beforeShadow,
        uses: [ResourceUse(shadowMapResource, ResourceAccess.write)],
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
          uses: [ResourceUse(shadowMapResource, ResourceAccess.write)],
          depthTest: true,
          depthWrite: true,
          cullEnable: true,
        ),
        program: program,
        resolveMesh: resolveMesh,
        resolveMaterial: resolveMaterial,
        resolveAlbedo: resolveAlbedo,
        resolveCasterLight: resolveCasterLight,
        resolveCasterLod: resolveCasterLod,
        resolveCasterMesh: resolveCasterMesh,
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
  final ShadowCasterLodResolver? resolveCasterLod;
  final ShadowCasterMeshResolver? resolveCasterMesh;
  final void Function(ShadowLightView view) onLightViewComputed;

  const _ShadowCasterPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveCasterLight,
    required this.resolveCasterLod,
    required this.resolveCasterMesh,
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
      _drawCaster(encoder, batch, light, lightView);
    }
  }

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
    SpotLight light,
    ShadowLightView lightView,
  ) {
    if (batch is RetainedItemView) {
      if (!batch.descriptor.castsShadow) return;
      final lod = _lodFor(batch, light);
      if (lod == ShadowCasterLod.culled) return;
      disableInstanceTransformUniforms(encoder);
      _setLightUniforms(encoder, batch.descriptor.transform, lightView);
      _setMaterialState(encoder, batch.descriptor.material);
      final meshHandle =
          resolveCasterMesh?.call(batch, light, lod) ?? batch.descriptor.mesh;
      final mesh = resolveMesh(meshHandle);
      encoder.bindVertexArray(mesh.vao);
      if (mesh.isIndexed) {
        encoder.drawElements(
          count: mesh.drawCount,
          offsetBytes: 0,
          index32: mesh.usesUint32Indices,
        );
      } else {
        encoder.drawArrays(first: 0, count: mesh.drawCount);
      }
    } else if (batch is InstanceBatch) {
      final representative = batch.representative;
      if (!representative.descriptor.castsShadow) return;
      final lod = _uniformBatchLod(batch, light);
      if (lod == ShadowCasterLod.culled) return;
      _setLightUniforms(
        encoder,
        representative.descriptor.transform,
        lightView,
      );
      setInstanceTransformUniforms(
        encoder,
        batch,
        includeNormalMatrices: false,
      );
      _setMaterialState(encoder, representative.descriptor.material);
      final meshHandle =
          resolveCasterMesh?.call(representative, light, lod) ??
          representative.descriptor.mesh;
      final mesh = resolveMesh(meshHandle);
      encoder.bindVertexArray(mesh.vao);
      if (mesh.isIndexed) {
        encoder.drawElementsInstanced(
          count: mesh.drawCount,
          offsetBytes: 0,
          instanceCount: batch.instanceCount,
          index32: mesh.usesUint32Indices,
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

  ShadowCasterLod _lodFor(RetainedItemView item, SpotLight light) =>
      resolveCasterLod?.call(item, light) ?? ShadowCasterLod.full;

  ShadowCasterLod _uniformBatchLod(InstanceBatch batch, SpotLight light) {
    final resolver = resolveCasterLod;
    if (resolver == null) return ShadowCasterLod.full;
    ShadowCasterLod? selected;
    for (final member in batch.members) {
      if (!member.descriptor.castsShadow) continue;
      final lod = resolver(member, light);
      if (lod == ShadowCasterLod.culled) continue;
      if (selected == null) {
        selected = lod;
      } else if (selected != lod) {
        // A mixed-tier batch cannot safely swap one mesh for every member;
        // retain the authored mesh as the conservative fallback.
        return ShadowCasterLod.full;
      }
    }
    return selected ?? ShadowCasterLod.culled;
  }

  void _setLightUniforms(
    DrawCommandEncoder encoder,
    Transform transform,
    ShadowLightView lightView,
  ) {
    final model = transform.toMat4();
    encoder.setUniform(
      'uModel',
      UniformValue.mat4(model.m),
    );
    encoder.setUniform(
      'uLightViewProjection',
      UniformValue.mat4(lightView.viewProjection.m),
    );
  }
}
