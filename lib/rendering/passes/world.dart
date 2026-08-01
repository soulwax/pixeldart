import 'dart:typed_data';

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
import '../math/vec.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import 'pass_context_impl.dart';
import 'safe_graph_resources.dart';

/// What `_WorldPass` needs to issue one draw call for a resolved mesh:
/// its VAO plus enough shape information to choose `drawArrays` vs.
/// `drawElements` and the correct vertex/index count. Deliberately not the
/// full `UploadedMesh` type from `lib/rendering/assets/mesh_store.dart` —
/// `lib/rendering/passes` does not depend on `lib/rendering/assets`, so a
/// resolver can be backed by `MeshStore` or, in pure tests, a trivial fake.
final class ResolvedMesh {
  final GpuObject vao;
  final bool isIndexed;
  final int drawCount;

  const ResolvedMesh({
    required this.vao,
    required this.isIndexed,
    required this.drawCount,
  });
}

/// Resolves a logical [MeshHandle] to its live GPU draw data. Real
/// resolution is `MeshStore.resolve` (RV-06 Phase B) — `WorldFeature` takes
/// this as an injected function so the pass itself has no direct dependency
/// on that store, and a pure test can supply a trivial fake without waiting
/// on it.
typedef MeshResolver = ResolvedMesh Function(MeshHandle mesh);

/// Resolves a logical [MaterialHandle] to its live [MaterialDefinition].
/// Real resolution is `MaterialStore.resolve` (RV-08 rung 1) — kept as an
/// injected function, mirroring [MeshResolver], so a pass has no direct
/// dependency on `lib/rendering/assets` and a pure test can supply a
/// trivial fake. Lives here rather than beside the one pass that first
/// needed it: the depth prepass and the shadow caster both resolve
/// materials too now, to honour §6.2's "alpha-masked geometry participates
/// in shadow, prepass, and opaque depth-writing routes."
typedef MaterialResolver = MaterialDefinition Function(MaterialHandle material);

/// Resolves a [MaterialDefinition.albedoTexture] to the live GPU texture a
/// draw must bind. `null` means the material authored no albedo of its own
/// and takes the caller's fallback — the state every material in the
/// renderer-test bootstrap was in before alpha masking needed a second
/// texture, so a resolver that ignores its argument reproduces the previous
/// single-texture behaviour exactly. No `TextureStore` exists yet (the
/// counterpart to `MeshStore`/`MaterialStore` is unbuilt), which is why
/// this is a resolver over the handle rather than a store lookup.
typedef AlbedoResolver = GpuObject Function(TextureHandle? albedoTexture);

/// The safe-graph world program: vertex-lit, vertex-color, matches
/// `shaders/rendering/world/safe_world.vert|frag` exactly (attribute
/// locations, uniform names).
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
    ],
  );
}

/// §6.1's mandatory world stage: opaque then transparent, vertex color and
/// fallback textures only, no optional targets. Declares exactly one write
/// to `sceneColor` (opaque) followed by a read+same-target continuation for
/// transparent geometry — the pass graph treats them as one program run
/// across two draw batches, not two separate resource versions, since both
/// write into the same accumulating color target within one pass.
final class WorldFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final MeshResolver resolveMesh;

  WorldFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.resolveMesh,
  });

  @override
  String get id => 'world';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'worldOpaqueTransparent',
        stage: GraphStage.beforeWorld,
        uses: [
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
          uses: [
            const ResourceUse(
              SafeGraphResources.sceneColor,
              ResourceAccess.write,
            ),
          ],
        ),
        program: program,
        resolveMesh: resolveMesh,
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

  const _WorldPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(SafeGraphResources.sceneColor.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final camera = context.frameScene.camera as CameraView;
    final environment = context.frameScene.environment as FrameEnvironment;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorAndDepth);
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

    for (final batch in context.frameScene.opaqueBatches) {
      _drawBatch(encoder, batch);
    }
    for (final item in context.frameScene.blendedItemsBackToFront) {
      _drawBatch(encoder, item);
    }
  }

  void _drawBatch(DrawCommandEncoder encoder, Object batch) {
    if (batch is InstanceBatch) {
      // Per-instance transforms need a real instance attribute stream
      // (RV-04's "persistent instance buffers" line item, not yet built);
      // a single shared uModel would be wrong for a batch whose members
      // have different transforms by definition. Using the representative
      // item's transform is a known, deliberate placeholder — every
      // instance in the batch currently renders at the same place — not a
      // silent approximation, and it must not be mistaken for correct
      // instanced rendering.
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
        encoder.drawArraysInstanced(
          first: 0,
          count: mesh.drawCount,
          instanceCount: batch.instanceCount,
        );
      }
    } else if (batch is RetainedItemView) {
      _setModelUniforms(encoder, batch.descriptor.transform);
      final mesh = resolveMesh(batch.descriptor.mesh);
      encoder.bindVertexArray(mesh.vao);
      if (mesh.isIndexed) {
        encoder.drawElements(count: mesh.drawCount, offsetBytes: 0);
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
      UniformValue.mat4(Float32List.fromList(model.m)),
    );
    encoder.setUniform(
      'uNormalMatrix',
      UniformValue.mat4(Float32List.fromList(model.normalMatrix().m)),
    );
  }
}
