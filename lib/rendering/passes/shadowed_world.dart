import 'dart:math' as math;
import 'dart:typed_data';

import '../api/effects.dart';
import '../api/frame.dart';
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
import '../math/transform.dart';
import '../math/vec.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/state_cache.dart';
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';
import 'shadow.dart';
import 'shadow_resources.dart';
import 'ssao_resources.dart';
import 'world.dart';

/// A third, independent world program (alongside `safe_world` and
/// `textured_world`) that samples the shadow map `ShadowFeature` wrote —
/// kept as its own feature/pass so neither already-proven world graph
/// gains a new failure mode from this addition.
final class ShadowedWorldProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'shadowedWorld',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {
      'aPosition': 0,
      'aNormal': 1,
      'aColor': 2,
      'aAlpha': 3,
      'aUvMat': 4,
    },
    samplerUnits: const {'uAlbedo': 0, 'uShadowMap': 1, 'uSsao': 2},
    requiredUniforms: const [
      'uViewProjection',
      'uView',
      'uModel',
      'uNormalMatrix',
      'uLightViewProjection',
      'uLightPosition',
      'uLightDirection',
      'uLightRange',
      'uLightInnerCos',
      'uLightOuterCos',
      'uAmbientColor',
      'uAmbientIntensity',
      'uShadowMapTexelSize',
      'uSceneColorSize',
      'uEmissiveStrength',
      'uVertexSnapGrid',
      'uAffineWarpStrength',
      'uAlphaCutoff',
      'uOpaqueCoverage',
      'uFogColor',
      'uFogStart',
      'uFogEnd',
      'uFogHeightFalloff',
      'uFogDensity',
    ],
  );
}

final class ShadowedWorldFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;
  final GpuObject Function() resolveShadowMap;
  final ShadowLightView Function() resolveLightView;
  final SpotLight? Function() resolveCasterLight;
  final GpuObject Function() resolveSsaoBlurred;
  final int sceneColorWidth;
  final int sceneColorHeight;

  ShadowedWorldFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveShadowMap,
    required this.resolveLightView,
    required this.resolveCasterLight,
    required this.resolveSsaoBlurred,
    required this.sceneColorWidth,
    required this.sceneColorHeight,
  });

  @override
  String get id => 'shadowedWorld';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'shadowedWorld',
        stage: GraphStage.beforeWorld,
        uses: [
          const ResourceUse(ShadowResources.shadowMap, ResourceAccess.read),
          const ResourceUse(SsaoResources.ssaoBlurred, ResourceAccess.read),
          const ResourceUse(
            SafeGraphResources.sceneColor,
            ResourceAccess.write,
          ),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      ShadowedWorldProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    return [
      _ShadowedWorldPass(
        descriptor: PassDescriptor(
          id: 'shadowedWorld',
          stage: GraphStage.beforeWorld,
          uses: [
            const ResourceUse(ShadowResources.shadowMap, ResourceAccess.read),
            const ResourceUse(SsaoResources.ssaoBlurred, ResourceAccess.read),
            const ResourceUse(
              SafeGraphResources.sceneColor,
              ResourceAccess.write,
            ),
          ],
        ),
        program: program,
        resolveMesh: resolveMesh,
        resolveMaterial: resolveMaterial,
        resolveAlbedo: resolveAlbedo,
        resolveShadowMap: resolveShadowMap,
        resolveLightView: resolveLightView,
        resolveCasterLight: resolveCasterLight,
        resolveSsaoBlurred: resolveSsaoBlurred,
        sceneColorWidth: sceneColorWidth,
        sceneColorHeight: sceneColorHeight,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _ShadowedWorldPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;
  final GpuObject Function() resolveShadowMap;
  final ShadowLightView Function() resolveLightView;
  final SpotLight? Function() resolveCasterLight;
  final GpuObject Function() resolveSsaoBlurred;
  final int sceneColorWidth;
  final int sceneColorHeight;

  const _ShadowedWorldPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveShadowMap,
    required this.resolveLightView,
    required this.resolveCasterLight,
    required this.resolveSsaoBlurred,
    required this.sceneColorWidth,
    required this.sceneColorHeight,
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(SafeGraphResources.sceneColor.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final camera = context.frameScene.camera as CameraView;
    final environment = context.frameScene.environment as FrameEnvironment;
    final post = context.frameScene.post as PostProcessState;
    final lightView = resolveLightView();

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorAndDepth);
    encoder.useProgram(program.handle);
    // Unit 0's *sampler* binding is pass-wide, but which texture sits in
    // that unit is now per-draw (_setMaterialState) — masking has to sample
    // the material's own albedo alpha, so one texture bound once for the
    // whole pass stopped being sufficient the moment two materials could
    // want different ones.
    encoder.setUniform('uAlbedo', const UniformValue.sampler(0));
    encoder.bindTexture(1, resolveShadowMap());
    encoder.setUniform('uShadowMap', const UniformValue.sampler(1));
    encoder.setUniform(
      'uShadowMapTexelSize',
      UniformValue.float2(
        Float32List.fromList([
          1.0 / ShadowResources.shadowMap.width,
          1.0 / ShadowResources.shadowMap.height,
        ]),
      ),
    );
    encoder.bindTexture(2, resolveSsaoBlurred());
    encoder.setUniform('uSsao', const UniformValue.sampler(2));
    encoder.setUniform(
      'uVertexSnapGrid',
      UniformValue.float1(post.vertexSnapGrid),
    );
    encoder.setUniform(
      'uSceneColorSize',
      UniformValue.float2(
        Float32List.fromList([
          sceneColorWidth.toDouble(),
          sceneColorHeight.toDouble(),
        ]),
      ),
    );

    encoder.setUniform(
      'uViewProjection',
      UniformValue.mat4(Float32List.fromList(camera.viewProjection.m)),
    );
    encoder.setUniform(
      'uView',
      UniformValue.mat4(Float32List.fromList(camera.view.m)),
    );
    encoder.setUniform(
      'uLightViewProjection',
      UniformValue.mat4(Float32List.fromList(lightView.viewProjection.m)),
    );
    // §8.5's fog: distance is the required base term; uFogHeightFalloff/
    // uFogDensity are each 0.0 when FrameEnvironment's own nullable fields
    // are null — the shader's fogFactor() is written so 0.0 is an exact
    // no-op for both, not a value this pass has to branch around.
    encoder.setUniform(
      'uFogColor',
      UniformValue.float3(
        Float32List.fromList([
          environment.fogColor.r,
          environment.fogColor.g,
          environment.fogColor.b,
        ]),
      ),
    );
    encoder.setUniform('uFogStart', UniformValue.float1(environment.fogStart));
    encoder.setUniform('uFogEnd', UniformValue.float1(environment.fogEnd));
    encoder.setUniform(
      'uFogHeightFalloff',
      UniformValue.float1(environment.fogHeightFalloff ?? 0),
    );
    encoder.setUniform(
      'uFogDensity',
      UniformValue.float1(environment.fogDensity ?? 0),
    );
    // The same SpotLight the shadow caster pass built its light-space
    // camera from (§8.4: "tight near/far from light bounds") — deriving
    // uLightPosition from anything else (e.g. a separately configured
    // DirectionalLight) would let the lit side and the shadowed side of the
    // scene disagree about where the light actually is, which reads as two
    // lights fighting each other rather than one light casting a shadow.
    final casterLight = resolveCasterLight();
    final lightPosition = casterLight?.position ?? const Vec3(0, 1, 0);
    final lightDirection = casterLight?.direction ?? const Vec3(0, -1, 0);
    encoder.setUniform(
      'uLightPosition',
      UniformValue.float3(
        Float32List.fromList([lightPosition.x, lightPosition.y, lightPosition.z]),
      ),
    );
    encoder.setUniform(
      'uLightDirection',
      UniformValue.float3(
        Float32List.fromList([lightDirection.x, lightDirection.y, lightDirection.z]),
      ),
    );
    encoder.setUniform(
      'uLightRange',
      UniformValue.float1(casterLight?.range ?? 1),
    );
    // Cosines computed CPU-side once per frame rather than per-fragment —
    // smoothstep in the shader compares against cos(angle) directly, which
    // is cheaper and numerically nicer than recovering an angle from a dot
    // product just to re-derive its cosine.
    encoder.setUniform(
      'uLightInnerCos',
      UniformValue.float1(math.cos(casterLight?.innerConeRadians ?? 0.3)),
    );
    encoder.setUniform(
      'uLightOuterCos',
      UniformValue.float1(math.cos(casterLight?.outerConeRadians ?? 0.5)),
    );
    final ambient = environment.ambientColor;
    encoder.setUniform(
      'uAmbientColor',
      UniformValue.float3(
        Float32List.fromList([ambient.r, ambient.g, ambient.b]),
      ),
    );
    encoder.setUniform(
      'uAmbientIntensity',
      UniformValue.float1(environment.ambientIntensity),
    );

    for (final batch in context.frameScene.opaqueBatches) {
      _drawBatch(encoder, batch, post.affineWarpStrength);
    }
    for (final item in context.frameScene.blendedItemsBackToFront) {
      _drawBatch(encoder, item, post.affineWarpStrength);
    }
  }

  void _drawBatch(
    DrawCommandEncoder encoder,
    Object batch,
    double affineWarpStrength,
  ) {
    if (batch is RetainedItemView) {
      _setModelUniforms(encoder, batch.descriptor.transform);
      _setMaterialState(
        encoder,
        batch.descriptor.material,
        batch.descriptor.drawMode,
        batch.descriptor.blendMode,
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
      _setModelUniforms(encoder, representative.descriptor.transform);
      _setMaterialState(
        encoder,
        representative.descriptor.material,
        representative.descriptor.drawMode,
        representative.descriptor.blendMode,
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
        'ShadowedWorldFeature: frameScene entries must be InstanceBatch or '
        'RetainedItemView, got ${batch.runtimeType}',
      );
    }
  }

  /// Resolves the item's material and applies the effects RV-08 rungs 1 and
  /// 6 prove are genuinely wired, not just modeled data: tint color
  /// (`uMaterialTint`), `doubleSided` overriding this pass's own cull state
  /// per-draw via `applyDrawState`, and `emissiveStrength` driving the
  /// declared glow attachment (`oGlow` in the shader) bloom reads — a real
  /// material-driven state change or GPU-attachment write, not merely a
  /// color multiply, is what proves the table actually reaches the draw
  /// path rather than sitting unconsumed the way `MaterialDefinition`/
  /// `MaterialHandle` did before rung 1.
  void _setMaterialState(
    DrawCommandEncoder encoder,
    MaterialHandle handle,
    DrawMode drawMode,
    BlendMode blendMode,
    double affineWarpStrength,
  ) {
    final material = resolveMaterial(handle);
    encoder.bindTexture(0, resolveAlbedo(material.albedoTexture));
    // §6.2/§8.6's alpha-masked route. Zero means "no cutout at all" and is
    // the shader's own branch condition, so opaque and blended materials
    // take a path with no alpha compare in it rather than one that compares
    // against an unreachable threshold — and `MaterialDefinition.validate`
    // forbids a zero cutoff precisely so this sentinel cannot collide with
    // an authored value. Driven by the material's own alphaMode, not the
    // item's DrawMode: DrawMode selects the sort bucket and draw state
    // (§8.6's "masked materials stay in depth-writing opaque order", which
    // the switch below already implements by sharing the opaque branch),
    // while whether a surface has holes in it is a property of the surface.
    encoder.setUniform(
      'uAlphaCutoff',
      UniformValue.float1(
        material.alphaMode == AlphaMode.masked ? material.alphaCutoff : 0,
      ),
    );
    // Bug 18's general fix. Only a blended draw writes real transparency
    // into the target; opaque and masked draws write coverage, which is
    // always 1. Keyed on DrawMode rather than on alphaMode, because this is
    // a question about how the item composites, not about what its surface
    // looks like — an opaque item sampling an alpha-carrying texture is the
    // exact case that was broken, and its material says nothing about
    // blending. See shadowed_world.frag for what the wrong value did.
    encoder.setUniform(
      'uOpaqueCoverage',
      UniformValue.float1(drawMode == DrawMode.blended ? 0 : 1),
    );
    // Affine UV needs both halves to agree: the frame's PS1 weight says how
    // strongly the profile is applied at all, and the material's own
    // affineSampling opts that surface in. Multiplying rather than OR-ing
    // them is what makes a PS1-profiled frame still able to hold
    // perspective-correct surfaces side by side with warped ones — an
    // affineSampling material in a zero-weight frame is exactly as
    // unaffected as a default material, so neither field alone can turn the
    // effect on. This is set per draw, unlike uVertexSnapGrid's once-per-
    // frame set, because only this one varies per material.
    encoder.setUniform(
      'uAffineWarpStrength',
      UniformValue.float1(material.affineSampling ? affineWarpStrength : 0),
    );
    encoder.setUniform(
      'uMaterialTint',
      UniformValue.float3(
        Float32List.fromList([material.tintR, material.tintG, material.tintB]),
      ),
    );
    encoder.setUniform(
      'uEmissiveStrength',
      UniformValue.float1(material.emissiveStrength),
    );
    // RV-09 rung 6: opaque/masked items keep this pass's own declared
    // (depth-writing, non-blended) state; DrawMode.blended items override
    // it per-draw with an alpha or additive preset selected by
    // [blendMode] — never the pass's default, which would draw them
    // depth-writing and fully opaque despite DrawMode.blended's whole
    // purpose. §6.2's "sorts blended back-to-front" is the caller's job
    // (frameScene.blendedItemsBackToFront's own ordering); this method
    // only ever picks *how* to blend, not the draw order.
    final baseState = switch (drawMode) {
      DrawMode.blended => switch (blendMode) {
        BlendMode.alpha => DrawStateDescriptor.blendedDefault,
        BlendMode.additive => DrawStateDescriptor.additiveDefault,
      },
      DrawMode.opaque || DrawMode.masked => descriptor.toDrawState(),
    };
    encoder.applyDrawState(
      material.doubleSided ? baseState.withCullEnable(false) : baseState,
    );
  }

  void _setModelUniforms(DrawCommandEncoder encoder, Transform transform) {
    final model = transform.toMat4();
    encoder.setUniform('uModel', UniformValue.mat4(Float32List.fromList(model.m)));
    encoder.setUniform(
      'uNormalMatrix',
      UniformValue.mat4(Float32List.fromList(model.normalMatrix().m)),
    );
  }
}
