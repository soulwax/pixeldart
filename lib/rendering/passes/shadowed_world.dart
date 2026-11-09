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
import '../core/instance_transforms.dart';
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
      'aTangent': 5,
      'aUv1': 6,
    },
    samplerUnits: const {
      'uAlbedo': 0,
      'uShadowMap': 1,
      'uSsao': 2,
      'uNormalMap': 3,
      'uOrmMap': 4,
      'uEmissiveMap': 5,
      'uLightmap': 6,
    },
    requiredUniforms: const [
      'uViewProjection',
      'uView',
      'uModel',
      'uNormalMatrix',
      'uLightViewProjection',
      'uLightPosition',
      'uLightDirection',
      'uLightColor',
      'uLightIntensity',
      'uLightRange',
      'uLightInnerCos',
      'uLightOuterCos',
      'uSpotEnabled',
      'uDirectionalDirection',
      'uDirectionalColor',
      'uDirectionalIntensity',
      'uPointPosition0',
      'uPointColor0',
      'uPointIntensity0',
      'uPointRadius0',
      'uPointPosition1',
      'uPointColor1',
      'uPointIntensity1',
      'uPointRadius1',
      'uPointPosition2',
      'uPointColor2',
      'uPointIntensity2',
      'uPointRadius2',
      'uPointPosition3',
      'uPointColor3',
      'uPointIntensity3',
      'uPointRadius3',
      'uDirectSpotPosition0',
      'uDirectSpotDirection0',
      'uDirectSpotColor0',
      'uDirectSpotIntensity0',
      'uDirectSpotRange0',
      'uDirectSpotInnerCos0',
      'uDirectSpotOuterCos0',
      'uDirectSpotEnabled0',
      'uDirectSpotPosition1',
      'uDirectSpotDirection1',
      'uDirectSpotColor1',
      'uDirectSpotIntensity1',
      'uDirectSpotRange1',
      'uDirectSpotInnerCos1',
      'uDirectSpotOuterCos1',
      'uDirectSpotEnabled1',
      'uDirectSpotPosition2',
      'uDirectSpotDirection2',
      'uDirectSpotColor2',
      'uDirectSpotIntensity2',
      'uDirectSpotRange2',
      'uDirectSpotInnerCos2',
      'uDirectSpotOuterCos2',
      'uDirectSpotEnabled2',
      'uAmbientColor',
      'uAmbientIntensity',
      'uAmbientLightScale',
      'uDirectLightScale',
      'uShadowMapTexelSize',
      'uShadowFilterRadius',
      'uShadowBias',
      'uReflectionColor',
      'uReflectionIntensity',
      'uReflectionConfidence',
      'uSceneColorSize',
      'uEmissiveStrength',
      'uUvScaleOffset',
      'uNormalStrength',
      'uRoughness',
      'uMetallic',
      'uSpecularScale',
      'uOcclusionStrength',
      'uClearcoatStrength',
      'uClearcoatRoughness',
      'uLightmapIntensity',
      'uCameraPosition',
      'uVertexSnapGrid',
      'uAffineWarpStrength',
      'uAlphaCutoff',
      'uOpaqueCoverage',
      'uFogColor',
      'uFogStart',
      'uFogEnd',
      'uFogHeightFalloff',
      'uFogDensity',
      'uReceivesShadow',
      'uRainWetness',
      'uSurfaceSnowCoverage',
      'uSurfaceDissolution',
      'uThermalSourceCount',
      'uThermalSourcePosition0',
      'uThermalSourceRadius0',
      'uThermalSourceDissolution0',
      'uThermalSourcePosition1',
      'uThermalSourceRadius1',
      'uThermalSourceDissolution1',
      'uThermalSourcePosition2',
      'uThermalSourceRadius2',
      'uThermalSourceDissolution2',
      'uThermalSourcePosition3',
      'uThermalSourceRadius3',
      'uThermalSourceDissolution3',
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
  final MaterialTextureResolver? resolveNormal;
  final MaterialTextureResolver? resolveOrm;
  final MaterialTextureResolver? resolveEmissive;
  final MaterialTextureResolver? resolveLightmap;
  final GpuObject Function() resolveShadowMap;
  final ShadowLightView Function() resolveLightView;
  final SpotLight? Function() resolveCasterLight;
  final List<SpotLight> Function()? resolveDirectSpotLights;
  final GpuObject Function() resolveSsaoBlurred;
  final bool useSsao;
  final int sceneColorWidth;
  final int sceneColorHeight;
  final int shadowMapWidth;
  final int shadowMapHeight;
  final ResourceRef shadowMapResource;
  final ResourceRef ssaoResource;
  final ResourceRef sceneColorResource;

  ShadowedWorldFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    this.resolveNormal,
    this.resolveOrm,
    this.resolveEmissive,
    this.resolveLightmap,
    required this.resolveShadowMap,
    required this.resolveLightView,
    required this.resolveCasterLight,
    this.resolveDirectSpotLights,
    required this.resolveSsaoBlurred,
    this.useSsao = true,
    required this.sceneColorWidth,
    required this.sceneColorHeight,
    this.shadowMapWidth = 512,
    this.shadowMapHeight = 512,
    this.shadowMapResource = ShadowResources.shadowMap,
    this.ssaoResource = SsaoResources.ssaoBlurred,
    this.sceneColorResource = SafeGraphResources.sceneColor,
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
          ResourceUse(shadowMapResource, ResourceAccess.read),
          if (useSsao) ResourceUse(ssaoResource, ResourceAccess.read),
          ResourceUse(sceneColorResource, ResourceAccess.write),
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
            ResourceUse(shadowMapResource, ResourceAccess.read),
            if (useSsao) ResourceUse(ssaoResource, ResourceAccess.read),
            ResourceUse(sceneColorResource, ResourceAccess.write),
          ],
        ),
        program: program,
        resolveMesh: resolveMesh,
        resolveMaterial: resolveMaterial,
        resolveAlbedo: resolveAlbedo,
        resolveNormal: resolveNormal,
        resolveOrm: resolveOrm,
        resolveEmissive: resolveEmissive,
        resolveLightmap: resolveLightmap,
        resolveShadowMap: resolveShadowMap,
        resolveLightView: resolveLightView,
        resolveCasterLight: resolveCasterLight,
        resolveDirectSpotLights: resolveDirectSpotLights,
        resolveSsaoBlurred: resolveSsaoBlurred,
        sceneColorWidth: sceneColorWidth,
        sceneColorHeight: sceneColorHeight,
        shadowMapWidth: shadowMapWidth,
        shadowMapHeight: shadowMapHeight,
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
  final MaterialTextureResolver? resolveNormal;
  final MaterialTextureResolver? resolveOrm;
  final MaterialTextureResolver? resolveEmissive;
  final MaterialTextureResolver? resolveLightmap;
  final GpuObject Function() resolveShadowMap;
  final ShadowLightView Function() resolveLightView;
  final SpotLight? Function() resolveCasterLight;
  final List<SpotLight> Function()? resolveDirectSpotLights;
  final GpuObject Function() resolveSsaoBlurred;
  final int sceneColorWidth;
  final int sceneColorHeight;
  final int shadowMapWidth;
  final int shadowMapHeight;

  // What this execution has already sent, so a run of draws only pays for
  // what differs from the draw before it. Uniforms belong to the program
  // and bindings to the texture units, so the record starts over with each
  // execution rather than trusting anything earlier in the frame.
  final Float64List _lastMaterialValues = Float64List(_MaterialSlot.count);
  final List<GpuObject?> _lastTextures = List.filled(7, null);
  bool? _lastUseInstances;

  // One object per distinct state, instead of a new descriptor per draw.
  late final DrawStateDescriptor _passState = descriptor.toDrawState();
  late final DrawStateDescriptor _passStateTwoSided = _passState
      .withCullEnable(false);
  static final DrawStateDescriptor _alphaTwoSided = DrawStateDescriptor
      .blendedDefault
      .withCullEnable(false);
  static final DrawStateDescriptor _additiveTwoSided = DrawStateDescriptor
      .additiveCoverage
      .withCullEnable(false);

  _ShadowedWorldPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveNormal,
    required this.resolveOrm,
    required this.resolveEmissive,
    required this.resolveLightmap,
    required this.resolveShadowMap,
    required this.resolveLightView,
    required this.resolveCasterLight,
    required this.resolveDirectSpotLights,
    required this.resolveSsaoBlurred,
    required this.sceneColorWidth,
    required this.sceneColorHeight,
    required this.shadowMapWidth,
    required this.shadowMapHeight,
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

    _lastMaterialValues.fillRange(0, _MaterialSlot.count, double.nan);
    _lastTextures.fillRange(0, _lastTextures.length, null);
    _lastUseInstances = null;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(_passState);
    encoder.clear(
      ClearMask.colorAndDepth,
      r: environment.clearColor.r,
      g: environment.clearColor.g,
      b: environment.clearColor.b,
      a: 1,
    );
    encoder.useProgram(program.handle);
    encoder.setUniform('uAlbedo', const UniformValue.sampler(0));
    encoder.setUniform('uNormalMap', const UniformValue.sampler(3));
    encoder.setUniform('uOrmMap', const UniformValue.sampler(4));
    encoder.setUniform('uEmissiveMap', const UniformValue.sampler(5));
    encoder.setUniform('uLightmap', const UniformValue.sampler(6));
    encoder.bindTexture(1, resolveShadowMap());
    encoder.setUniform('uShadowMap', const UniformValue.sampler(1));
    encoder.setUniform(
      'uCameraPosition',
      UniformValue.float3(
        Float32List.fromList([camera.eye.x, camera.eye.y, camera.eye.z]),
      ),
    );
    encoder.setUniform(
      'uShadowMapTexelSize',
      UniformValue.float2(
        Float32List.fromList([1.0 / shadowMapWidth, 1.0 / shadowMapHeight]),
      ),
    );
    encoder.setUniform(
      'uShadowFilterRadius',
      UniformValue.float1(environment.shadowFilterRadius),
    );
    encoder.setUniform(
      'uShadowBias',
      UniformValue.float1(environment.shadowBias),
    );
    encoder.bindTexture(2, resolveSsaoBlurred());
    encoder.setUniform('uSsao', const UniformValue.sampler(2));
    // Material-v2 slots use neutral store fallbacks when no resolver is
    // supplied, preserving the old injected single-albedo test seam.
    // Actual map selection is per draw in _setMaterialState below.
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
    final directSpots = [
      for (final light
          in (resolveDirectSpotLights?.call() ?? const <SpotLight>[]))
        if (light.id != casterLight?.id) light,
    ];
    final lightPosition = casterLight?.position ?? const Vec3(0, 1, 0);
    final lightDirection = casterLight?.direction ?? const Vec3(0, -1, 0);
    encoder.setUniform(
      'uLightPosition',
      UniformValue.float3(
        Float32List.fromList([
          lightPosition.x,
          lightPosition.y,
          lightPosition.z,
        ]),
      ),
    );
    encoder.setUniform(
      'uLightDirection',
      UniformValue.float3(
        Float32List.fromList([
          lightDirection.x,
          lightDirection.y,
          lightDirection.z,
        ]),
      ),
    );
    final hasSpot = casterLight != null;
    final spotColor = casterLight?.color ?? LinearColor.black;
    encoder.setUniform(
      'uLightColor',
      UniformValue.float3(
        Float32List.fromList([spotColor.r, spotColor.g, spotColor.b]),
      ),
    );
    encoder.setUniform(
      'uLightIntensity',
      UniformValue.float1(casterLight?.intensity ?? 0),
    );
    encoder.setUniform('uSpotEnabled', UniformValue.float1(hasSpot ? 1 : 0));
    final directional = environment.directionalLight;
    final directionalDirection = directional?.direction ?? const Vec3(0, 1, 0);
    final directionalColor = directional?.color ?? LinearColor.black;
    encoder.setUniform(
      'uDirectionalDirection',
      UniformValue.float3(
        Float32List.fromList([
          directionalDirection.x,
          directionalDirection.y,
          directionalDirection.z,
        ]),
      ),
    );
    encoder.setUniform(
      'uDirectionalColor',
      UniformValue.float3(
        Float32List.fromList([
          directionalColor.r,
          directionalColor.g,
          directionalColor.b,
        ]),
      ),
    );
    encoder.setUniform(
      'uDirectionalIntensity',
      UniformValue.float1(directional?.intensity ?? 0),
    );
    // More point lights than shader slots: keep the most influential at the
    // camera, not merely the first submitted.
    final pointLights = selectPointLights(
      lights: environment.pointLights,
      referencePosition: camera.eye,
    );
    for (var i = 0; i < 4; i++) {
      final light = i < pointLights.length ? pointLights[i] : null;
      final position = light?.position ?? const Vec3(0, 0, 0);
      final color = light?.color ?? LinearColor.black;
      encoder.setUniform(
        'uPointPosition$i',
        UniformValue.float3(
          Float32List.fromList([position.x, position.y, position.z]),
        ),
      );
      encoder.setUniform(
        'uPointColor$i',
        UniformValue.float3(Float32List.fromList([color.r, color.g, color.b])),
      );
      encoder.setUniform(
        'uPointIntensity$i',
        UniformValue.float1(light?.intensity ?? 0),
      );
      encoder.setUniform(
        'uPointRadius$i',
        UniformValue.float1(light?.radius ?? 1),
      );
    }
    for (var i = 0; i < 3; i++) {
      final light = i < directSpots.length ? directSpots[i] : null;
      final position = light?.position ?? Vec3.zero;
      final direction = light?.direction ?? const Vec3(0, -1, 0);
      final color = light?.color ?? LinearColor.black;
      encoder.setUniform(
        'uDirectSpotPosition$i',
        UniformValue.float3(
          Float32List.fromList([position.x, position.y, position.z]),
        ),
      );
      encoder.setUniform(
        'uDirectSpotDirection$i',
        UniformValue.float3(
          Float32List.fromList([direction.x, direction.y, direction.z]),
        ),
      );
      encoder.setUniform(
        'uDirectSpotColor$i',
        UniformValue.float3(Float32List.fromList([color.r, color.g, color.b])),
      );
      encoder.setUniform(
        'uDirectSpotIntensity$i',
        UniformValue.float1(light?.intensity ?? 0),
      );
      encoder.setUniform(
        'uDirectSpotRange$i',
        UniformValue.float1(light?.range ?? 1),
      );
      encoder.setUniform(
        'uDirectSpotInnerCos$i',
        UniformValue.float1(math.cos(light?.innerConeRadians ?? 0.3)),
      );
      encoder.setUniform(
        'uDirectSpotOuterCos$i',
        UniformValue.float1(math.cos(light?.outerConeRadians ?? 0.5)),
      );
      encoder.setUniform(
        'uDirectSpotEnabled$i',
        UniformValue.float1(light == null ? 0 : 1),
      );
    }
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
    encoder.setUniform(
      'uAmbientLightScale',
      UniformValue.float1(environment.ambientLightScale),
    );
    encoder.setUniform(
      'uDirectLightScale',
      UniformValue.float1(environment.directLightScale),
    );
    encoder.setUniform(
      'uReflectionColor',
      UniformValue.float3(
        Float32List.fromList([
          environment.reflectionColor.r,
          environment.reflectionColor.g,
          environment.reflectionColor.b,
        ]),
      ),
    );
    encoder.setUniform(
      'uReflectionIntensity',
      UniformValue.float1(environment.reflectionIntensity),
    );
    encoder.setUniform(
      'uReflectionConfidence',
      UniformValue.float1(environment.reflectionConfidence),
    );
    encoder.setUniform(
      'uRainWetness',
      UniformValue.float1(post.surfaceWetness),
    );
    encoder.setUniform(
      'uSurfaceSnowCoverage',
      UniformValue.float1(post.surfaceSnowCoverage),
    );
    encoder.setUniform(
      'uSurfaceDissolution',
      UniformValue.float1(post.surfaceDissolution),
    );
    final thermalSources = environment.thermalSources.take(4).toList();
    encoder.setUniform(
      'uThermalSourceCount',
      UniformValue.float1(thermalSources.length.toDouble()),
    );
    for (var i = 0; i < 4; i++) {
      final source = i < thermalSources.length ? thermalSources[i] : null;
      final position = source?.position ?? Vec3.zero;
      encoder.setUniform(
        'uThermalSourcePosition$i',
        UniformValue.float3(
          Float32List.fromList([position.x, position.y, position.z]),
        ),
      );
      encoder.setUniform(
        'uThermalSourceRadius$i',
        UniformValue.float1(source?.radiusMeters ?? 1),
      );
      encoder.setUniform(
        'uThermalSourceDissolution$i',
        UniformValue.float1(source?.dissolution01 ?? 0),
      );
    }

    for (final batch in context.frameScene.opaqueBatches) {
      _drawBatch(encoder, batch, post.affineWarpStrength, environment);
    }
    for (final item in context.frameScene.blendedItemsBackToFront) {
      _drawBatch(encoder, item, post.affineWarpStrength, environment);
    }
  }

  void _drawBatch(
    DrawCommandEncoder encoder,
    Object batch,
    double affineWarpStrength,
    FrameEnvironment environment,
  ) {
    if (batch is RetainedItemView) {
      if (_lastUseInstances != false) {
        disableInstanceTransformUniforms(encoder);
        _lastUseInstances = false;
      }
      _setModelUniforms(encoder, batch.descriptor.transform);
      _setMaterialState(
        encoder,
        batch.descriptor.material,
        batch.descriptor.drawMode,
        batch.descriptor.blendMode,
        affineWarpStrength,
        batch.descriptor.receivesShadow,
        environment,
      );
      final mesh = resolveMesh(batch.descriptor.mesh);
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
      _setModelUniforms(encoder, representative.descriptor.transform);
      setInstanceTransformUniforms(encoder, batch);
      _lastUseInstances = true;
      _setMaterialState(
        encoder,
        representative.descriptor.material,
        representative.descriptor.drawMode,
        representative.descriptor.blendMode,
        affineWarpStrength,
        representative.descriptor.receivesShadow,
        environment,
      );
      final mesh = resolveMesh(representative.descriptor.mesh);
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
        'ShadowedWorldFeature: frameScene entries must be InstanceBatch or '
        'RetainedItemView, got ${batch.runtimeType}',
      );
    }
  }

  void _setMaterialState(
    DrawCommandEncoder encoder,
    MaterialHandle handle,
    DrawMode drawMode,
    BlendMode blendMode,
    double affineWarpStrength,
    bool itemReceivesShadow,
    FrameEnvironment environment,
  ) {
    final material = resolveMaterial(handle);
    _bindMaterialTexture(encoder, 0, resolveAlbedo(material.albedoTexture));
    _bindMaterialTexture(
      encoder,
      3,
      (resolveNormal ?? resolveAlbedo)(material.normalTexture),
    );
    _bindMaterialTexture(
      encoder,
      4,
      (resolveOrm ?? resolveAlbedo)(material.ormTexture),
    );
    _bindMaterialTexture(
      encoder,
      5,
      (resolveEmissive ?? resolveAlbedo)(material.emissiveTexture),
    );
    _bindMaterialTexture(
      encoder,
      6,
      (resolveLightmap ?? resolveAlbedo)(material.lightmapTexture),
    );
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
    final last = _lastMaterialValues;
    if (last[_MaterialSlot.tintR] != material.tintR ||
        last[_MaterialSlot.tintG] != material.tintG ||
        last[_MaterialSlot.tintB] != material.tintB) {
      last[_MaterialSlot.tintR] = material.tintR;
      last[_MaterialSlot.tintG] = material.tintG;
      last[_MaterialSlot.tintB] = material.tintB;
      encoder.setUniform(
        'uMaterialTint',
        UniformValue.float3(
          Float32List.fromList([
            material.tintR,
            material.tintG,
            material.tintB,
          ]),
        ),
      );
    }
    _setMaterialFloat(
      encoder,
      _MaterialSlot.emissiveStrength,
      'uEmissiveStrength',
      material.emissiveStrength,
    );
    if (last[_MaterialSlot.uvScaleU] != material.uvScaleU ||
        last[_MaterialSlot.uvScaleV] != material.uvScaleV ||
        last[_MaterialSlot.uvOffsetU] != material.uvOffsetU ||
        last[_MaterialSlot.uvOffsetV] != material.uvOffsetV) {
      last[_MaterialSlot.uvScaleU] = material.uvScaleU;
      last[_MaterialSlot.uvScaleV] = material.uvScaleV;
      last[_MaterialSlot.uvOffsetU] = material.uvOffsetU;
      last[_MaterialSlot.uvOffsetV] = material.uvOffsetV;
      encoder.setUniform(
        'uUvScaleOffset',
        UniformValue.float4(
          Float32List.fromList([
            material.uvScaleU,
            material.uvScaleV,
            material.uvOffsetU,
            material.uvOffsetV,
          ]),
        ),
      );
    }
    _setMaterialFloat(
      encoder,
      _MaterialSlot.normalStrength,
      'uNormalStrength',
      material.normalStrength * environment.normalStrengthScale,
    );
    _setMaterialFloat(
      encoder,
      _MaterialSlot.roughness,
      'uRoughness',
      material.roughness * environment.roughnessScale,
    );
    _setMaterialFloat(
      encoder,
      _MaterialSlot.metallic,
      'uMetallic',
      material.metallic * environment.metallicScale,
    );
    _setMaterialFloat(
      encoder,
      _MaterialSlot.specularScale,
      'uSpecularScale',
      environment.specularScale,
    );
    _setMaterialFloat(
      encoder,
      _MaterialSlot.clearcoatStrength,
      'uClearcoatStrength',
      material.clearcoatStrength,
    );
    _setMaterialFloat(
      encoder,
      _MaterialSlot.clearcoatRoughness,
      'uClearcoatRoughness',
      material.clearcoatRoughness,
    );
    _setMaterialFloat(
      encoder,
      _MaterialSlot.occlusionStrength,
      'uOcclusionStrength',
      material.occlusionStrength,
    );
    _setMaterialFloat(
      encoder,
      _MaterialSlot.lightmapIntensity,
      'uLightmapIntensity',
      material.lightmapIntensity,
    );
    _setMaterialFloat(
      encoder,
      _MaterialSlot.receivesShadow,
      'uReceivesShadow',
      material.receivesShadow && itemReceivesShadow ? 1 : 0,
    );
    // RV-09 rung 6: opaque/masked items keep this pass's own declared
    // (depth-writing, non-blended) state; DrawMode.blended items override
    // it per-draw with an alpha or additive preset selected by
    // [blendMode] — never the pass's default, which would draw them
    // depth-writing and fully opaque despite DrawMode.blended's whole
    // purpose. §6.2's "sorts blended back-to-front" is the caller's job
    // (frameScene.blendedItemsBackToFront's own ordering); this method
    // only ever picks *how* to blend, not the draw order.
    final twoSided = material.doubleSided;
    final state = switch (drawMode) {
      DrawMode.blended => switch (blendMode) {
        BlendMode.alpha =>
          twoSided ? _alphaTwoSided : DrawStateDescriptor.blendedDefault,
        BlendMode.additive =>
          twoSided ? _additiveTwoSided : DrawStateDescriptor.additiveCoverage,
      },
      DrawMode.opaque ||
      DrawMode.masked => twoSided ? _passStateTwoSided : _passState,
    };
    encoder.applyDrawState(state);
  }

  void _setMaterialFloat(
    DrawCommandEncoder encoder,
    int slot,
    String name,
    double value,
  ) {
    if (_lastMaterialValues[slot] == value) return;
    _lastMaterialValues[slot] = value;
    encoder.setUniform(name, UniformValue.float1(value));
  }

  void _bindMaterialTexture(
    DrawCommandEncoder encoder,
    int unit,
    GpuObject texture,
  ) {
    if (identical(_lastTextures[unit], texture)) return;
    _lastTextures[unit] = texture;
    encoder.bindTexture(unit, texture);
  }

  void _setModelUniforms(DrawCommandEncoder encoder, Transform transform) {
    final model = transform.toMat4();
    encoder.setUniform(
      'uModel',
      UniformValue.mat4(model.m),
    );
    encoder.setUniform(
      'uNormalMatrix',
      UniformValue.mat4(model.normalMatrix().m),
    );
  }
}

abstract final class _MaterialSlot {
  static const int tintR = 0;
  static const int tintG = 1;
  static const int tintB = 2;
  static const int emissiveStrength = 3;
  static const int uvScaleU = 4;
  static const int uvScaleV = 5;
  static const int uvOffsetU = 6;
  static const int uvOffsetV = 7;
  static const int normalStrength = 8;
  static const int roughness = 9;
  static const int metallic = 10;
  static const int specularScale = 11;
  static const int clearcoatStrength = 12;
  static const int clearcoatRoughness = 13;
  static const int occlusionStrength = 14;
  static const int lightmapIntensity = 15;
  static const int receivesShadow = 16;
  static const int count = 17;
}
