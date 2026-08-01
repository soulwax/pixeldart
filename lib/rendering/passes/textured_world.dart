import 'dart:typed_data';

import '../api/frame.dart';
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
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';
import 'world.dart';

/// A second, independent world program alongside the vertex-color-only
/// safe-graph `WorldFeature` — this one samples `uAlbedo` and multiplies it
/// against vertex color, matching `shaders/rendering/world/
/// textured_world.vert|frag`. Deliberately kept as its own feature/pass
/// rather than a branch inside `WorldFeature`, so the safe graph's own
/// proven correctness is never at risk from this addition — it shares the
/// `MeshResolver` contract but nothing else.
final class TexturedWorldProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'texturedWorld',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {
      'aPosition': 0,
      'aNormal': 1,
      'aColor': 2,
      'aAlpha': 3,
      'aUvMat': 4,
    },
    samplerUnits: const {'uAlbedo': 0},
    requiredUniforms: const [
      'uViewProjection',
      'uModel',
      'uNormalMatrix',
      'uLightDir',
      'uAmbientColor',
      'uAmbientIntensity',
    ],
  );
}

final class TexturedWorldFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final MeshResolver resolveMesh;
  final GpuObject Function() resolveAlbedoTexture;

  TexturedWorldFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.resolveMesh,
    required this.resolveAlbedoTexture,
  });

  @override
  String get id => 'texturedWorld';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'texturedWorld',
        stage: GraphStage.beforeWorld,
        uses: [const ResourceUse(SafeGraphResources.sceneColor, ResourceAccess.write)],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      TexturedWorldProgramSource.build(vertexSource: vertexSource, fragmentSource: fragmentSource),
    );
    return [
      _TexturedWorldPass(
        descriptor: PassDescriptor(
          id: 'texturedWorld',
          stage: GraphStage.beforeWorld,
          uses: [const ResourceUse(SafeGraphResources.sceneColor, ResourceAccess.write)],
        ),
        program: program,
        resolveMesh: resolveMesh,
        resolveAlbedoTexture: resolveAlbedoTexture,
      ),
    ];
  }

  @override
  void dispose() {}
}

final class _TexturedWorldPass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final MeshResolver resolveMesh;
  final GpuObject Function() resolveAlbedoTexture;

  const _TexturedWorldPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
    required this.resolveAlbedoTexture,
  });

  @override
  void execute(RenderPassContext context) {
    final view = context.viewOf(SafeGraphResources.sceneColor.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final camera = context.frameScene.camera as CameraView;
    final environment = context.frameScene.environment as FrameEnvironment;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorAndDepth);
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, resolveAlbedoTexture());
    encoder.setUniform('uAlbedo', const UniformValue.sampler(0));

    encoder.setUniform(
      'uViewProjection',
      UniformValue.mat4(Float32List.fromList(camera.viewProjection.m)),
    );
    final light = environment.directionalLight;
    final lightDir = light?.direction ?? const Vec3(0, 1, 0);
    encoder.setUniform(
      'uLightDir',
      UniformValue.float3(Float32List.fromList([lightDir.x, lightDir.y, lightDir.z])),
    );
    final ambient = environment.ambientColor;
    encoder.setUniform(
      'uAmbientColor',
      UniformValue.float3(Float32List.fromList([ambient.r, ambient.g, ambient.b])),
    );
    encoder.setUniform('uAmbientIntensity', UniformValue.float1(environment.ambientIntensity));

    for (final batch in context.frameScene.opaqueBatches) {
      _drawBatch(encoder, batch);
    }
    for (final item in context.frameScene.blendedItemsBackToFront) {
      _drawBatch(encoder, item);
    }
  }

  void _drawBatch(DrawCommandEncoder encoder, Object batch) {
    if (batch is RetainedItemView) {
      _setModelUniforms(encoder, batch.descriptor.transform);
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
      final mesh = resolveMesh(representative.descriptor.mesh);
      encoder.bindVertexArray(mesh.vao);
      if (mesh.isIndexed) {
        encoder.drawElementsInstanced(
          count: mesh.drawCount,
          offsetBytes: 0,
          instanceCount: batch.instanceCount,
        );
      } else {
        encoder.drawArraysInstanced(first: 0, count: mesh.drawCount, instanceCount: batch.instanceCount);
      }
    } else {
      throw ArgumentError(
        'TexturedWorldFeature: frameScene entries must be InstanceBatch or '
        'RetainedItemView, got ${batch.runtimeType}',
      );
    }
  }

  void _setModelUniforms(DrawCommandEncoder encoder, Transform transform) {
    final model = transform.toMat4();
    encoder.setUniform('uModel', UniformValue.mat4(Float32List.fromList(model.m)));
    encoder.setUniform('uNormalMatrix', UniformValue.mat4(Float32List.fromList(model.normalMatrix().m)));
  }
}
