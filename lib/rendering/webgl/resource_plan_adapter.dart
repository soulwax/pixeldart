import '../api/capabilities.dart';
import '../api/resource_plan.dart';
import '../api/settings.dart';
import 'device_api.dart';

enum GpuResourceCandidateState { prepared, committed, rolledBack }

final class PreparedGpuResourcePlan {
  final PreparedResourceAssembly logical;
  final Map<String, GpuObject> objects;
  GpuResourceCandidateState _state = GpuResourceCandidateState.prepared;

  PreparedGpuResourcePlan({required this.logical, required this.objects});

  GpuResourceCandidateState get state => _state;

  GpuObject objectFor(String resource) {
    final object = objects[resource];
    if (object == null) {
      throw StateError('resource is not in candidate: $resource');
    }
    return object;
  }
}

final class GpuResourcePlanAdapter {
  final GpuDevice device;
  final ResourcePlanAssembler _logical = ResourcePlanAssembler();
  PreparedGpuResourcePlan? _current;
  PreparedGpuResourcePlan? _open;
  bool _disposed = false;

  GpuResourcePlanAdapter(this.device);

  GpuTargetDescriptor descriptorFor(
    String resource,
    RendererConfiguration configuration,
  ) => _descriptor(resource, configuration);

  PreparedGpuResourcePlan get current {
    final value = _current;
    if (value == null) {
      throw StateError('GPU resource adapter is not initialized');
    }
    return value;
  }

  void initialize(RendererConfiguration configuration) {
    _ensureActive();
    if (_current != null) {
      throw StateError('GPU resource adapter is initialized');
    }
    final plan = OwnedResourcePlan.forConfiguration(configuration);
    final objects = _createObjects(plan, configuration);
    _logical.initialize(plan);
    _current = PreparedGpuResourcePlan(
      logical: PreparedResourceAssembly.initial(plan),
      objects: objects,
    );
  }

  PreparedGpuResourcePlan prepare(RendererConfiguration configuration) {
    _ensureActive();
    if (_current == null) {
      throw StateError('GPU resource adapter is not initialized');
    }
    if (_open != null) {
      throw StateError('GPU resource candidate is already open');
    }
    final plan = OwnedResourcePlan.forConfiguration(configuration);
    final logical = _logical.prepare(plan);
    try {
      final candidate = PreparedGpuResourcePlan(
        logical: logical,
        objects: _createObjects(plan, configuration),
      );
      _open = candidate;
      return candidate;
    } catch (_) {
      _logical.rollback(logical);
      rethrow;
    }
  }

  void commit(PreparedGpuResourcePlan candidate) {
    _ensureActive();
    _checkOpen(candidate);
    final old = _current;
    _logical.commit(candidate.logical);
    _current = candidate;
    _open = null;
    if (old != null) _deleteObjects(old.objects);
    candidate._state = GpuResourceCandidateState.committed;
  }

  void rollback(PreparedGpuResourcePlan candidate) {
    _ensureActive();
    _checkOpen(candidate);
    _deleteObjects(candidate.objects);
    _logical.rollback(candidate.logical);
    candidate._state = GpuResourceCandidateState.rolledBack;
    _open = null;
  }

  void rehydrateAfterContextRestore(RendererConfiguration configuration) {
    _ensureActive();
    final current = _current;
    if (current == null) {
      throw StateError('GPU resource adapter is not initialized');
    }
    final plan = OwnedResourcePlan.forConfiguration(configuration);
    final objects = _createObjects(plan, configuration);
    final previous = current.logical.plan.resources;
    // The restored context may negotiate a different sample count, which
    // adds or drops the resolve target; the graph reads names from here.
    final samePlan =
        previous.length == plan.resources.length &&
        previous.containsAll(plan.resources);
    _current = PreparedGpuResourcePlan(
      logical: samePlan
          ? current.logical
          : PreparedResourceAssembly.initial(plan),
      objects: objects,
    );
  }

  void dispose() {
    if (_disposed) return;
    if (_open != null) throw StateError('cannot dispose an open GPU candidate');
    final old = _current;
    if (old != null) _deleteObjects(old.objects);
    _logical.dispose();
    _current = null;
    _disposed = true;
  }

  Map<String, GpuObject> _createObjects(
    OwnedResourcePlan plan,
    RendererConfiguration configuration,
  ) {
    final objects = <String, GpuObject>{};
    final created = <GpuObject>[];
    try {
      final baseResources = plan.resources.where(
        (resource) => !resource.startsWith('sceneColor#'),
      );
      for (final resource in baseResources) {
        final target = device.createTarget(
          _descriptor(resource, configuration),
        );
        created.add(target);
        objects[resource] = target;
      }
      final sceneVersions =
          plan.resources
              .where((resource) => resource.startsWith('sceneColor#'))
              .toList()
            ..sort();
      for (final resource in sceneVersions) {
        final version = int.parse(resource.substring('sceneColor#'.length));
        if (configuration.sampleCount == 1) {
          objects[resource] = objects['sceneColor']!;
        } else if (version >= 2) {
          objects[resource] = objects['sceneColor#1']!;
        } else {
          final target = device.createTarget(
            _descriptor(resource, configuration),
          );
          created.add(target);
          objects[resource] = target;
        }
      }
      return Map.unmodifiable(objects);
    } catch (_) {
      for (final target in created.reversed) {
        device.deleteTarget(target);
      }
      rethrow;
    }
  }

  GpuTargetDescriptor _descriptor(
    String resource,
    RendererConfiguration configuration,
  ) {
    final width = configuration.internalWidth;
    final height = configuration.internalHeight;
    if (resource == 'shadowMap') {
      return GpuTargetDescriptor(
        width: configuration.shadowMapSize,
        height: configuration.shadowMapSize,
        attachments: GpuTargetAttachment.depthOnly,
        hasDepth: true,
      );
    }
    if (resource == 'sceneDepth') {
      return GpuTargetDescriptor(
        width: width,
        height: height,
        attachments: GpuTargetAttachment.depthOnly,
        hasDepth: true,
      );
    }
    final half =
        resource.startsWith('ssao') ||
        resource.startsWith('bloomBlur') ||
        resource.startsWith('dofBlur') ||
        resource.startsWith('volumetricLight');
    final targetWidth = half ? _halfExtent(width) : width;
    final targetHeight = half ? _halfExtent(height) : height;
    if (resource.startsWith('sceneColor#')) {
      // A separate version only exists as the MSAA resolve target. Every
      // pass after the resolve is a full-screen composite with no depth
      // test, and only bloom samples glow, so the target holds just what
      // its readers need and the resolve skips the rest.
      return GpuTargetDescriptor(
        width: width,
        height: height,
        attachments: configuration.profile.installs(PipelineFeatures.bloom)
            ? GpuTargetAttachment.colorAndGlow
            : GpuTargetAttachment.color,
      );
    }
    final sceneColor = resource == 'sceneColor';
    return GpuTargetDescriptor(
      width: targetWidth,
      height: targetHeight,
      samples: sceneColor ? configuration.sampleCount : 1,
      attachments: sceneColor
          ? GpuTargetAttachment.colorAndGlow
          : GpuTargetAttachment.color,
      hasDepth: sceneColor,
    );
  }

  static int _halfExtent(int value) => (value + 1) ~/ 2;

  void _deleteObjects(Map<String, GpuObject> objects) {
    final unique = <GpuObject>{...objects.values};
    for (final object in unique) {
      device.deleteTarget(object);
    }
  }

  void _ensureActive() {
    if (_disposed) throw StateError('GPU resource adapter is disposed');
  }

  void _checkOpen(PreparedGpuResourcePlan candidate) {
    if (!identical(_open, candidate) ||
        candidate.state != GpuResourceCandidateState.prepared) {
      throw StateError('GPU resource candidate is not open');
    }
  }
}
