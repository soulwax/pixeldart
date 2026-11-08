part of 'scene_renderer_impl.dart';

final class _FrameExecution {
  final FrameDrawTelemetry telemetry;
  final CullResult cull;
  final int trianglesCulled;

  const _FrameExecution(this.telemetry, this.cull, this.trianglesCulled);
}

final class _TransientItemView implements RetainedItemView {
  @override
  final InstanceId id;
  @override
  final RetainedItemDescriptor descriptor;
  @override
  final Aabb worldBounds;

  const _TransientItemView(this.id, this.descriptor, this.worldBounds);
}

extension on SceneRendererImpl {
  Future<void> _configure(RendererConfiguration configuration) async {
    _ensureReady();
    if (_activeFrame != null) {
      throw StateError('renderer.configure cannot overlap an active frame');
    }
    final transition = _configurations.begin(configuration);
    if (transition.configuration.delta.isNoop) {
      _configurations.commit(transition);
      _configuration = configuration;
      return;
    }
    PreparedGpuResourcePlan? candidateResources;
    ProgramLibrary? candidatePrograms;
    FeatureGraph? candidateFeatures;
    try {
      candidateResources = _gpuResources!.prepare(configuration);
      candidatePrograms = ProgramLibrary(device);
      final candidate = _assembleSafeGraph(
        candidatePrograms,
        configuration,
        candidateResources.logical.plan.resources,
      );
      candidateFeatures = candidate.featureGraph;
      _configurations.commit(transition);
      _gpuResources!.commit(candidateResources);
      final oldFeatures = _featureGraph, oldPrograms = _programs;
      _featureGraph = candidate.featureGraph;
      _graph = candidate.result;
      _programs = candidatePrograms;
      _configuration = configuration;
      oldFeatures?.disposeAll();
      oldPrograms?.disposeAll();
    } catch (_) {
      if (transition.state == CoordinatedTransitionState.open) {
        _configurations.rollback(transition);
      }
      if (candidateResources?.state == GpuResourceCandidateState.prepared) {
        _gpuResources!.rollback(candidateResources!);
      }
      candidateFeatures?.disposeAll();
      candidatePrograms?.disposeAll();
      rethrow;
    }
  }

  void _resize(SurfaceMetrics surface) {
    _ensureReady();
    surface.validate();
  }

  void _buildSafeGraph() {
    final assembled = _assembleSafeGraph(
      _programs!,
      _configuration!,
      _gpuResources!.current.logical.plan.resources,
    );
    _featureGraph = assembled.featureGraph;
    _graph = assembled.result;
  }

  _SafeGraphAssembly _assembleSafeGraph(
    ProgramLibrary programs,
    RendererConfiguration configuration,
    Set<String> resourceNames,
  ) {
    ResolvedMesh resolveMesh(MeshHandle handle) {
      final mesh = _resources!.meshes.resolve(handle);
      return ResolvedMesh(
        vao: mesh.vao,
        isIndexed: mesh.isIndexed,
        drawCount: mesh.isIndexed ? mesh.indexCount : mesh.vertexCount,
        usesUint32Indices: mesh.usesUint32Indices,
      );
    }

    GpuObject resolveResource(String name, {String? fallback}) {
      if (resourceNames.contains(name)) {
        return _gpuResources!.current.objectFor(name);
      }
      final fallbackName = fallback;
      if (fallbackName != null && resourceNames.contains(fallbackName)) {
        return _gpuResources!.current.objectFor(fallbackName);
      }
      throw StateError('resource is not in configured graph: $name');
    }

    final featureGraph =
        configuration.profile.installs(PipelineFeatures.shadows)
        ? buildShadowGraph(
            programs,
            device: device,
            resolveMesh: resolveMesh,
            resolveMaterial: _resources!.materials.resolveForPass,
            resolveAlbedo: _resources!.textures.resolveAlbedo,
            resolveNormal: _resources!.textures.resolveNormal,
            resolveOrm: _resources!.textures.resolveOrm,
            resolveEmissive: _resources!.textures.resolveEmissive,
            resolveLightmap: _resources!.textures.resolveLightmap,
            resolveShadowMap: () => resolveResource('shadowMap'),
            resolveCasterLight: () {
              final lights = _activeFrame?.environment.spotLights;
              return lights == null || lights.isEmpty ? null : lights.first;
            },
            resolveDirectSpotLights: () {
              final frame = _activeFrame;
              if (frame == null) return const [];
              final spots = frame.environment.spotLights;
              final caster = spots.isEmpty ? null : spots.first;
              return selectSpotLights(
                lights: spots,
                referencePosition: frame.camera.eye,
                shadowCaster: caster,
                limit: 3,
              );
            },
            resolveSceneDepth: () => resolveResource('sceneDepth'),
            resolveCamera: () => _activeFrame!.camera,
            resolveSsaoRaw: () =>
                resolveResource('ssaoRaw', fallback: 'sceneColor'),
            resolveSsaoBlurred: () =>
                resolveResource('ssaoBlurred', fallback: 'sceneColor'),
            sceneColorWidth: configuration.internalWidth,
            sceneColorHeight: configuration.internalHeight,
            shadowMapSize: configuration.shadowMapSize,
            sampleCount: configuration.sampleCount,
            outputEncoding: configuration.outputEncoding,
            resolveResolvedSceneColor: () => resolveResource(
              configuration.sampleCount > 1 ? 'sceneColor#1' : 'sceneColor',
            ),
            resolveBloomBlurH: () =>
                resolveResource('bloomBlurH', fallback: 'sceneColor'),
            resolveBloomBlurV: () =>
                resolveResource('bloomBlurV', fallback: 'sceneColor'),
            resolveDofBlurH: () =>
                resolveResource('dofBlurH', fallback: 'sceneColor'),
            resolveDofBlurV: () =>
                resolveResource('dofBlurV', fallback: 'sceneColor'),
            resolveGradeLut: () => _resources!.textures.fallbackAlbedo,
            resolveVhsHistory: () =>
                resolveResource('vhsOutput', fallback: 'sceneColor'),
            resolveTime: () => _activeFrame!.timeSeconds,
            profile: configuration.profile,
          )
        : buildSafeGraph(
            programs,
            device: device,
            resolveMesh: resolveMesh,
            internalWidth: configuration.internalWidth,
            internalHeight: configuration.internalHeight,
            sampleCount: configuration.sampleCount,
            outputEncoding: configuration.outputEncoding,
          );
    final result = featureGraph.build(
      featureContext: RenderFeatureContext(
        capabilities: _capabilities!,
        profile: configuration.profile,
      ),
      availableCapabilities: const {},
      hasValidPreviousFrame: false,
      resources: _PlanResources(resourceNames),
    );
    if (!result.isValid) {
      throw StateError(
        'safe renderer graph is invalid: ${result.graph.failures}',
      );
    }
    return _SafeGraphAssembly(featureGraph, result);
  }

  _FrameExecution _executeGraph(
    RenderWorldImpl world,
    FrameInput frame,
    List<RetainedItemDescriptor> transient,
  ) {
    final graph = _graph;
    final resources = _gpuResources;
    if (graph == null || resources == null) {
      throw StateError('renderer graph is not initialized');
    }
    final allItems = <RetainedItemView>[...world.items];
    for (var i = 0; i < transient.length; i += 1) {
      final descriptor = transient[i];
      final bounds = _resources!.meshes.registry
          .descriptorOf(descriptor.mesh)
          .localBounds
          .transformed(descriptor.transform.toMat4());
      allItems.add(
        _TransientItemView(
          InstanceId(1 << 30 | i, 0, 'transient'),
          descriptor,
          bounds,
        ),
      );
    }
    final cull = cullItems(
      items: allItems,
      frustum: frame.camera.buildFrustum(),
      visibilityMask: frame.visibilityMask,
    );
    var candidateTriangles = 0;
    for (final item in allItems) {
      candidateTriangles += _triangleCount(item.descriptor.mesh);
    }
    var visibleTriangles = 0;
    for (final item in cull.visible) {
      visibleTriangles += _triangleCount(item.descriptor.mesh);
    }
    final visible = cull.visible;
    final telemetry = FrameDrawTelemetry()..beginPass('cull');
    telemetry.recordCull(
      triangles: candidateTriangles - visibleTriangles,
      instances: cull.stats.culled,
    );
    final opaque = <SortableItem<OpaqueSortKey>>[];
    final blended = <SortableItem<BlendedSortKey>>[];
    for (final item in visible) {
      if (item.descriptor.drawMode == DrawMode.blended) {
        final viewSpace = frame.camera.view.transformPoint(
          item.descriptor.transform.translation,
        );
        blended.add(
          SortableItem(
            BlendedSortKey(
              viewSpaceDepth: viewSpace.z,
              instanceId: item.id.slot,
            ),
            item,
          ),
        );
      } else {
        opaque.add(
          SortableItem(
            OpaqueSortKey(
              pipeline: const PipelineHandle(0, 1),
              material: item.descriptor.material,
              mesh: item.descriptor.mesh,
              instanceId: item.id.slot,
            ),
            item,
          ),
        );
      }
    }
    final scene = _FrameScene(
      opaqueBatches: batchOpaque(sortOpaque(opaque)),
      blendedItemsBackToFront: sortBlended(blended),
      camera: frame.camera,
      environment: frame.environment,
      timeSeconds: frame.timeSeconds,
      post: frame.post,
    );
    final encoder = DeviceDrawCommandEncoder(device, telemetry: telemetry);
    for (final pass in graph.passes) {
      telemetry.beginPass(pass.descriptor.id);
      final views = <String, BoundResourceView>{};
      for (final use in pass.descriptor.uses) {
        final resource = use.resource;
        final view = BoundResourceView(
          use.resource,
          resources.current.objectFor(
            resource.version == 0
                ? resource.name
                : '${resource.name}#${resource.version}',
          ),
        );
        views['${resource.name}#${resource.version}'] = view;
        views.putIfAbsent(resource.name, () => view);
      }
      pass.execute(
        BoundPassContext(
          views: views,
          encoder: encoder,
          frameScene: scene,
          skyboxTexture: () {
            final declaration = frame.environment.skybox;
            final handle = declaration?.texture;
            if (handle == null || !_resources!.textures.isResident(handle)) {
              return null;
            }
            return _resources!.textures.resolve(handle);
          }(),
        ),
      );
    }
    return _FrameExecution(
      telemetry,
      cull,
      candidateTriangles - visibleTriangles,
    );
  }

  int _triangleCount(MeshHandle handle) {
    final mesh = _resources!.meshes.resolve(handle);
    return (mesh.indexCount > 0 ? mesh.indexCount : mesh.vertexCount) ~/ 3;
  }
}

final class _SafeGraphAssembly {
  final FeatureGraph featureGraph;
  final FeatureGraphResult result;

  const _SafeGraphAssembly(this.featureGraph, this.result);
}

final class _PlanResources implements RenderPassResources {
  final Set<String> _names;
  const _PlanResources(this._names);

  @override
  bool isAvailable(String resourceName) => _names.contains(resourceName);
}

final class _FrameScene implements FrameSceneData {
  @override
  final Iterable<Object> opaqueBatches;
  @override
  final Iterable<Object> blendedItemsBackToFront;
  @override
  final Object camera;
  @override
  final Object environment;
  @override
  final double timeSeconds;
  @override
  final Object post;

  const _FrameScene({
    required this.opaqueBatches,
    required this.blendedItemsBackToFront,
    required this.camera,
    required this.environment,
    required this.timeSeconds,
    required this.post,
  });
}
