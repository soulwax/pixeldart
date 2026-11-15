import 'dart:typed_data';

import '../api/frame.dart';
import '../api/handles.dart';
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
import '../webgl/generated_shaders.dart';
import '../webgl/state_cache.dart';
import 'depth_resources.dart';
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';
import 'world.dart';

typedef CameraResolver = CameraView Function();

final class DecalDescriptor {
  final MeshHandle mesh;
  final MaterialHandle material;
  final Transform transform;
  final double opacity;
  final Vec4 tint;
  final int stencilRef;
  final StencilFunc stencilFunc;

  const DecalDescriptor({
    required this.mesh,
    required this.material,
    required this.transform,
    this.opacity = 1.0,
    this.tint = const Vec4(1, 1, 1, 1),
    this.stencilRef = 0,
    this.stencilFunc = StencilFunc.always,
  });
}

final class DecalProgramSource {
  static ProgramSource build({
    String vertexSource = decalVertSrc,
    String fragmentSource = decalFragSrc,
  }) => ProgramSource(
    id: 'decal',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {'aPosition': 0, 'aUvMat': 4},
    samplerUnits: const {'uAlbedo': 0},
    requiredUniforms: const [
      'uViewProjection',
      'uModel',
      'uOpacity',
      'uDecalTint',
    ],
  );
}

final class DecalFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final GpuDevice device;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;
  final CameraResolver resolveCamera;
  final ResourceRef colorResource;
  final ResourceRef depthResource;
  final List<DecalDescriptor> Function()? resolveDecals;

  DecalFeature({
    required this.programLibrary,
    required this.device,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveCamera,
    this.colorResource = SafeGraphResources.sceneColor,
    this.depthResource = DepthPrepassResources.sceneDepth,
    this.resolveDecals,
  });

  @override
  String get id => 'decal';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'decal',
        stage: GraphStage.afterWorld,
        uses: [
          ResourceUse(colorResource, ResourceAccess.write),
          ResourceUse(depthResource, ResourceAccess.read),
        ],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publishNew(DecalProgramSource.build());
    return [
      _DecalPass(
        descriptor: PassDescriptor(
          id: 'decal',
          stage: GraphStage.afterWorld,
          uses: [
            ResourceUse(colorResource, ResourceAccess.write),
            ResourceUse(depthResource, ResourceAccess.read),
          ],
          depthTest: true,
          depthWrite: false,
          cullEnable: true,
          blendEnable: true,
        ),
        program: program,
        device: device,
        resolveMesh: resolveMesh,
        resolveMaterial: resolveMaterial,
        resolveAlbedo: resolveAlbedo,
        resolveCamera: resolveCamera,
        resolveDecals: resolveDecals,
        colorResource: colorResource,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _DecalPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuDevice device;
  final MeshResolver resolveMesh;
  final MaterialResolver resolveMaterial;
  final AlbedoResolver resolveAlbedo;
  final CameraResolver resolveCamera;
  final List<DecalDescriptor> Function()? resolveDecals;
  final ResourceRef colorResource;

  const _DecalPass({
    required this.descriptor,
    required this.program,
    required this.device,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveCamera,
    required this.resolveDecals,
    required this.colorResource,
  });

  @override
  void execute(RenderPassContext context) {
    final decals = resolveDecals?.call();
    if (decals == null || decals.isEmpty) return;

    final view = context.viewOf(colorResource.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    encoder.bindTarget(view.gpuObject);
    encoder.useProgram(program.handle);
    encoder.setUniform('uAlbedo', const UniformValue.sampler(0));
    final camera = resolveCamera();
    encoder.setUniform(
      'uViewProjection',
      UniformValue.mat4(camera.viewProjection.m),
    );

    for (final decal in decals) {
      final material = resolveMaterial(decal.material);
      final albedoTex = resolveAlbedo(material.albedoTexture);
      encoder.bindTexture(0, albedoTex);
      encoder.setUniform('uOpacity', UniformValue.float1(decal.opacity));
      encoder.setUniform(
        'uDecalTint',
        UniformValue.float4(
          Float32List.fromList([
            decal.tint.x,
            decal.tint.y,
            decal.tint.z,
            decal.tint.w,
          ]),
        ),
      );
      final model = decal.transform.toMat4();
      encoder.setUniform('uModel', UniformValue.mat4(model.m));

      final drawState = DrawStateDescriptor(
        depthTest: true,
        depthWrite: false,
        depthFunc: DepthFunc.lessEqual,
        cullEnable: true,
        cullFace: CullFace.back,
        blendEnable: true,
        blendSrc: BlendFactor.srcAlpha,
        blendDst: BlendFactor.oneMinusSrcAlpha,
        stencilEnable: decal.stencilFunc != StencilFunc.always,
        stencilFunc: decal.stencilFunc,
        stencilRef: decal.stencilRef,
      );
      encoder.applyDrawState(drawState);

      final mesh = resolveMesh(decal.mesh);
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
    }
  }
}
