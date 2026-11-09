import 'dart:typed_data';

import '../api/frame.dart';
import '../api/handles.dart';
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
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';

final class ResolvedMesh {
  final GpuObject vao;
  final bool isIndexed;
  final int drawCount;
  final bool usesUint32Indices;

  const ResolvedMesh({
    required this.vao,
    required this.isIndexed,
    required this.drawCount,
    this.usesUint32Indices = false,
  });
}

typedef MeshResolver = ResolvedMesh Function(MeshHandle mesh);

typedef MaterialResolver = MaterialDefinition Function(MaterialHandle material);

typedef AlbedoResolver = GpuObject Function(TextureHandle? albedoTexture);

typedef MaterialTextureResolver = GpuObject Function(TextureHandle? texture);

final class WorldProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'safeWorld',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {
      'aPosition': 0,
      'aNormal': 1,
      'aColor': 2,
      'aAlpha': 3,
    },
    requiredUniforms: const [
      'uViewProjection',
      'uModel',
      'uNormalMatrix',
      'uLightDir',
      'uAmbientColor',
      'uAmbientIntensity',
      'uAmbientLightScale',
      'uDirectLightScale',
    ],
  );
}

final class WorldFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final MeshResolver resolveMesh;
  final ResourceRef sceneColorResource;

  WorldFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.resolveMesh,
    this.sceneColorResource = SafeGraphResources.sceneColor,
  });

  @override
  String get id => 'world';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'worldOpaqueTransparent',
        stage: GraphStage.beforeWorld,
        uses: [ResourceUse(sceneColorResource, ResourceAccess.write)],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      WorldProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    return [
      _WorldPass(
        descriptor: PassDescriptor(
          id: 'worldOpaqueTransparent',
          stage: GraphStage.beforeWorld,
          uses: [ResourceUse(sceneColorResource, ResourceAccess.write)],
        ),
        program: program,
        resolveMesh: resolveMesh,
        sceneColorResourceName: sceneColorResource.name,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _WorldPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final MeshResolver resolveMesh;
  final String sceneColorResourceName;

  const _WorldPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
    required this.sceneColorResourceName,
  });

  @override
  void execute(RenderPassContext context) {
    final view = context.viewOf(sceneColorResourceName) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final camera = context.frameScene.camera as CameraView;
    final environment = context.frameScene.environment as FrameEnvironment;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(
      ClearMask.colorAndDepth,
      r: environment.clearColor.r,
      g: environment.clearColor.g,
      b: environment.clearColor.b,
      a: 1,
    );
    encoder.useProgram(program.handle);

    encoder.setUniform(
      'uViewProjection',
      UniformValue.mat4(Float32List.fromList(camera.viewProjection.m)),
    );
    final light = environment.directionalLight;
    final lightDir = light?.direction ?? const Vec3(0, 1, 0);
    encoder.setUniform(
      'uLightDir',
      UniformValue.float3(
        Float32List.fromList([lightDir.x, lightDir.y, lightDir.z]),
      ),
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

    for (final batch in context.frameScene.opaqueBatches) {
      _drawBatch(encoder, batch);
    }
    for (final item in context.frameScene.blendedItemsBackToFront) {
      _drawBatch(encoder, item);
    }
  }

  void _drawBatch(DrawCommandEncoder encoder, Object batch) {
    if (batch is InstanceBatch) {
      // Keep the representative model uniform populated for the shader's
      // explicit non-instanced fallback; the per-member matrices uploaded by
      // setInstanceTransformUniforms are selected with gl_InstanceID below.
      final representative = batch.representative;
      _setModelUniforms(encoder, representative.descriptor.transform);
      setInstanceTransformUniforms(encoder, batch);
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
    } else if (batch is RetainedItemView) {
      disableInstanceTransformUniforms(encoder);
      _setModelUniforms(encoder, batch.descriptor.transform);
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
    } else {
      throw ArgumentError(
        'WorldFeature: frameScene entries must be InstanceBatch or '
        'RetainedItemView, got ${batch.runtimeType}',
      );
    }
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
