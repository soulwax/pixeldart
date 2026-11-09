part of 'scene_renderer_impl.dart';

final Expando<List<Map<String, BoundResourceView>>> _passViews = Expando();

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
    configuration = configuration.withShaderOverrides(
      configuration.shaderOverrides,
    );
    final transition = _configurations.begin(configuration);
    if (transition.configuration.delta.isNoop) {
      _configurations.commit(transition);
      _configuration = configuration;
      _allocated = configuration.withSampleCount(_msaa.effective);
      return;
    }
    if (transition.configuration.delta.isShaderOnly) {
      PreparedShaderOverrides? candidate;
      try {
        candidate = _programs!.prepareOverrides(configuration.shaderOverrides);
        _configurations.commit(transition);
        _programs!.commitOverrides(candidate);
        _configuration = configuration;
        _allocated = configuration.withSampleCount(_msaa.effective);
        return;
      } catch (_) {
        if (transition.state == CoordinatedTransitionState.open) {
          _configurations.rollback(transition);
        }
        if (candidate?.state == ProgramSetCandidateState.prepared) {
          _programs!.rollbackOverrides(candidate!);
        }
        rethrow;
      }
    }
    PreparedGpuResourcePlan? candidateResources;
    ProgramLibrary? candidatePrograms;
    FeatureGraph? candidateFeatures;
    try {
      final allocation = _allocateMultisampled(
        configuration,
        _gpuResources!.prepare,
      );
      final prepared = candidateResources = allocation.value;
      candidatePrograms = ProgramLibrary(
        device,
        overrides: configuration.shaderOverrides,
      );
      final candidate = _assembleSafeGraph(
        candidatePrograms,
        allocation.configuration,
        prepared.logical.plan.resources,
      );
      candidateFeatures = candidate.featureGraph;
      _configurations.commit(transition);
      _gpuResources!.commit(prepared);
      final oldFeatures = _featureGraph, oldPrograms = _programs;
      _featureGraph = candidate.featureGraph;
      _graph = candidate.result;
      _programs = candidatePrograms;
      candidatePrograms.fallbackToDefaults = true;
      _configuration = configuration;
      _allocated = allocation.configuration;
      _msaa = allocation.msaa;
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
      _allocated!,
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

    final hasBloom = configuration.profile.installs(PipelineFeatures.bloom);
    final hasShadows = configuration.profile.installs(PipelineFeatures.shadows);
    final sprites = SpritesFeature(
      programLibrary: programs,
      device: device,
      submissions: _frames,
      resolveTexture: _resources!.textures.resolveAlbedo,
      sceneColorResource: ResourceRef(
        name: SafeGraphResources.sceneColor.name,
        format: SafeGraphResources.sceneColor.format,
        width: configuration.internalWidth,
        height: configuration.internalHeight,
        samples: configuration.sampleCount,
      ),
      outputEncoding: configuration.outputEncoding,
      // The safe world pass has no glow output, so its clear stays there.
      clearGlow: hasBloom && !hasShadows,
    );
    final featureGraph = hasShadows
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
                resolveResource('vhsHistory', fallback: 'sceneColor'),
            resolveVhsAlternate: () =>
                resolveResource('vhsHistory', fallback: 'sceneColor'),
            resolveTime: () => _activeFrame!.timeSeconds,
            profile: configuration.profile,
            sprites: sprites,
          )
        : buildSafeGraph(
            programs,
            device: device,
            resolveMesh: resolveMesh,
            internalWidth: configuration.internalWidth,
            internalHeight: configuration.internalHeight,
            sampleCount: configuration.sampleCount,
            outputEncoding: configuration.outputEncoding,
            sprites: sprites,
            bloom: hasBloom,
            resolveResolvedSceneColor: () => resolveResource(
              configuration.sampleCount > 1 ? 'sceneColor#1' : 'sceneColor',
            ),
            resolveBloomBlurH: () =>
                resolveResource('bloomBlurH', fallback: 'sceneColor'),
            resolveBloomBlurV: () =>
                resolveResource('bloomBlurV', fallback: 'sceneColor'),
          );
    final result = featureGraph.build(
      featureContext: RenderFeatureContext(
        capabilities: _capabilities!,
        profile: configuration.profile,
      ),
      availableCapabilities: const {},
      // The graph is built once and reused every frame. Renderer-owned
      // targets are allocated zero-filled, so a history read never sees
      // undefined memory; passes that read history (VHS) track for
      // themselves whether it holds a real frame yet.
      hasValidPreviousFrame: true,
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
    // cull.visible is a subsequence of allItems, so one walk finds the items
    // it dropped without resolving a mesh for every item that was kept.
    final visible = cull.visible;
    var culledTriangles = 0;
    var nextVisible = 0;
    for (final item in allItems) {
      if (nextVisible < visible.length &&
          identical(visible[nextVisible], item)) {
        nextVisible += 1;
      } else {
        culledTriangles += _triangleCount(item.descriptor.mesh);
      }
    }
    final telemetry = FrameDrawTelemetry()..beginPass('cull');
    telemetry.recordCull(
      triangles: culledTriangles,
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
    final declaration = frame.environment.skybox;
    final skyboxHandle = declaration?.texture;
    final skyboxTexture =
        skyboxHandle == null || !_resources!.textures.isResident(skyboxHandle)
        ? null
        : _resources!.textures.resolve(skyboxHandle);
    // A graph is rebuilt whenever its GPU objects change (configure and
    // context restore both do), so its views can be kept with it.
    final passViews = _passViews[graph] ??= [
      for (final pass in graph.passes) _viewsFor(pass, resources),
    ];
    final passes = graph.passes;
    for (var i = 0; i < passes.length; i += 1) {
      final pass = passes[i];
      telemetry.beginPass(pass.descriptor.id);
      pass.execute(
        BoundPassContext(
          views: passViews[i],
          encoder: encoder,
          frameScene: scene,
          skyboxTexture: skyboxTexture,
        ),
      );
    }
    return _FrameExecution(telemetry, cull, culledTriangles);
  }

  Map<String, BoundResourceView> _viewsFor(
    RenderPass pass,
    GpuResourcePlanAdapter resources,
  ) {
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
    return views;
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
