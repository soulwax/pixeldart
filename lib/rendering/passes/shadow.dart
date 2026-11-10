import 'dart:math' as math;
import 'dart:typed_data';

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

  /// Changes whenever a sampled texture's contents change. With it, a
  /// masked caster whose texture is updated in place still redraws.
  final int Function()? resolveContentRevision;

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
    this.resolveContentRevision,
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
    final program = programLibrary.publishNew(
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
        resolveContentRevision: resolveContentRevision,
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
  final int Function()? resolveContentRevision;
  final _CasterSignature _signature = _CasterSignature();
  final List<Object> _casters = [];
  final List<ShadowCasterLod> _lods = [];

  /// Frames whose shadow map was reused because nothing it shows changed.
  int cachedFrames = 0;

  _ShadowCasterPass({
    required this.descriptor,
    required this.program,
    required this.resolveMesh,
    required this.resolveMaterial,
    required this.resolveAlbedo,
    required this.resolveCasterLight,
    required this.resolveCasterLod,
    required this.resolveCasterMesh,
    required this.onLightViewComputed,
    this.resolveContentRevision,
  });

  @override
  void execute(RenderPassContext context) {
    final view =
        context.viewOf(ShadowResources.shadowMap.name) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;

    final light = resolveCasterLight();
    final signature = _signature..begin(view.gpuObject, program.handle);
    if (light == null) {
      // No shadow-casting light this frame: bind and clear the target so
      // its depth reads as "everything lit" (far-plane depth = 1.0) rather
      // than leaving stale depth from a previous frame's caster.
      if (signature.commit()) {
        cachedFrames += 1;
        return;
      }
      encoder.bindTarget(view.gpuObject);
      encoder.applyDrawState(descriptor.toDrawState());
      encoder.clear(ClearMask.depthOnly);
      return;
    }

    final lightView = ShadowLightView.fromSpotLight(light);
    onLightViewComputed(lightView);

    // A shadow map depends only on the light and what it sees. When neither
    // changed since the last frame, the previous map is still exact.
    signature
      ..add(1)
      ..vec(light.position)
      ..vec(light.direction)
      ..add(light.range)
      ..add(light.outerConeRadians)
      ..add((resolveContentRevision?.call() ?? 0).toDouble());
    _casters.clear();
    _lods.clear();
    for (final batch in context.frameScene.opaqueBatches) {
      _planCaster(batch, light);
    }
    if (signature.commit()) {
      cachedFrames += 1;
      return;
    }

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.depthOnly);
    encoder.useProgram(program.handle);
    encoder.setUniform('uAlbedo', const UniformValue.sampler(0));

    for (var i = 0; i < _casters.length; i += 1) {
      _drawCaster(encoder, _casters[i], _lods[i], light, lightView);
    }
  }

  /// Records what [batch] would draw into the signature and the draw list.
  void _planCaster(Object batch, SpotLight light) {
    final signature = _signature;
    if (batch is RetainedItemView) {
      final descriptor = batch.descriptor;
      if (!descriptor.castsShadow) return;
      final lod = _lodFor(batch, light);
      if (lod == ShadowCasterLod.culled) return;
      final mesh =
          resolveCasterMesh?.call(batch, light, lod) ?? descriptor.mesh;
      signature
        ..add(2)
        ..handle(mesh)
        ..ref(resolveMaterial(descriptor.material))
        ..transform(descriptor.transform);
      _casters.add(batch);
      _lods.add(lod);
    } else if (batch is InstanceBatch) {
      final representative = batch.representative;
      if (!representative.descriptor.castsShadow) return;
      final lod = _uniformBatchLod(batch, light);
      if (lod == ShadowCasterLod.culled) return;
      final mesh =
          resolveCasterMesh?.call(representative, light, lod) ??
          representative.descriptor.mesh;
      signature
        ..add(3)
        ..handle(mesh)
        ..ref(resolveMaterial(representative.descriptor.material))
        ..add(batch.instanceCount.toDouble());
      for (final member in batch.members) {
        signature.transform(member.descriptor.transform);
      }
      _casters.add(batch);
      _lods.add(lod);
    } else {
      throw ArgumentError(
        'ShadowFeature: frameScene entries must be InstanceBatch or '
        'RetainedItemView, got ${batch.runtimeType}',
      );
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
    ShadowCasterLod lod,
    SpotLight light,
    ShadowLightView lightView,
  ) {
    if (batch is RetainedItemView) {
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
    encoder.setUniform('uModel', UniformValue.mat4(model.m));
    encoder.setUniform(
      'uLightViewProjection',
      UniformValue.mat4(lightView.viewProjection.m),
    );
  }
}

/// Everything one frame's shadow map depends on, compared exactly against
/// the previous frame's. Two buffers swap roles each frame, so a steady
/// scene allocates nothing.
final class _CasterSignature {
  Float64List _values = Float64List(256);
  Float64List _previous = Float64List(256);
  List<Object?> _refs = [];
  List<Object?> _previousRefs = [];
  int _length = 0;
  int _previousLength = -1;

  void begin(Object target, Object program) {
    _length = 0;
    _refs
      ..clear()
      ..add(target)
      ..add(program);
  }

  void add(double value) {
    if (_length == _values.length) {
      _values = Float64List(_values.length * 2)..setAll(0, _values);
    }
    _values[_length++] = value;
  }

  void ref(Object? object) => _refs.add(object);

  void handle(ResourceHandle handle) {
    add(handle.slot.toDouble());
    add(handle.generation.toDouble());
  }

  void vec(Vec3 v) {
    add(v.x);
    add(v.y);
    add(v.z);
  }

  void transform(Transform t) {
    vec(t.translation);
    add(t.rotation.x);
    add(t.rotation.y);
    add(t.rotation.z);
    add(t.rotation.w);
    add(t.scale);
    vec(t.stretch);
  }

  /// Whether this frame matches the last one. Either way, this frame becomes
  /// the one the next frame is compared against.
  bool commit() {
    var same =
        _length == _previousLength && _refs.length == _previousRefs.length;
    for (var i = 0; same && i < _length; i += 1) {
      same = _values[i] == _previous[i];
    }
    for (var i = 0; same && i < _refs.length; i += 1) {
      same = identical(_refs[i], _previousRefs[i]);
    }
    final spare = _previous;
    _previous = _values;
    _values = spare.length >= _previous.length
        ? spare
        : Float64List(_previous.length);
    final spareRefs = _previousRefs;
    _previousRefs = _refs;
    _refs = spareRefs;
    _previousLength = _length;
    return same;
  }
}
