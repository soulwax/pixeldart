import 'capabilities.dart';
import 'settings.dart';

final class OwnedResourcePlan {
  final Set<String> resources;
  final bool hasHistory;

  const OwnedResourcePlan({required this.resources, required this.hasHistory});

  void validate() {
    if (!resources.contains('sceneColor') || !resources.contains('present')) {
      throw ArgumentError('resource plan must contain sceneColor and present');
    }
    if (resources.any((resource) => resource.isEmpty)) {
      throw ArgumentError('resource plan contains an empty resource ID');
    }
    if (hasHistory != resources.contains('vhsOutput')) {
      throw ArgumentError(
        'resource history does not match vhsOutput ownership',
      );
    }
  }

  factory OwnedResourcePlan.forConfiguration(
    RendererConfiguration configuration,
  ) {
    final resources = <String>{'sceneColor', 'present'};
    final profile = configuration.profile;
    if (profile.installs(PipelineFeatures.shadows)) {
      resources.addAll({'shadowMap', 'sceneDepth'});
    }
    if (profile.installs(PipelineFeatures.ssao)) {
      resources.addAll({'ssaoRaw', 'ssaoBlurred'});
    }
    if (profile.installs(PipelineFeatures.bloom)) {
      resources.addAll({'bloomBlurH', 'bloomBlurV', 'sceneColor#1'});
    }
    if (profile.installs(PipelineFeatures.dof)) {
      resources.addAll({'dofBlurH', 'dofBlurV', 'dofOutput'});
    }
    if (profile.installs(PipelineFeatures.grade)) resources.add('gradeOutput');
    if (profile.installs(PipelineFeatures.ps1)) resources.add('ps1Output');
    final hasHistory = profile.installs(PipelineFeatures.vhs);
    if (hasHistory) resources.add('vhsOutput');
    return OwnedResourcePlan(
      resources: Set.unmodifiable(resources),
      hasHistory: hasHistory,
    );
  }
}

enum ResourceAssemblyState { prepared, committed, rolledBack }

final class PreparedResourceAssembly {
  final int baseGeneration;
  final OwnedResourcePlan plan;
  ResourceAssemblyState _state = ResourceAssemblyState.prepared;

  PreparedResourceAssembly._({
    required this.baseGeneration,
    required this.plan,
  });

  factory PreparedResourceAssembly.initial(OwnedResourcePlan plan) =>
      PreparedResourceAssembly._(baseGeneration: 0, plan: plan);

  ResourceAssemblyState get state => _state;
}

final class ResourcePlanAssembler {
  OwnedResourcePlan? _current;
  PreparedResourceAssembly? _open;
  int _generation = 0;
  bool _disposed = false;

  OwnedResourcePlan get current {
    final value = _current;
    if (value == null) {
      throw StateError('resource assembler is not initialized');
    }
    return value;
  }

  int get generation => _generation;

  void initialize(OwnedResourcePlan plan) {
    _ensureActive();
    if (_current != null) throw StateError('resource assembler is initialized');
    plan.validate();
    _current = plan;
    _generation = 1;
  }

  PreparedResourceAssembly prepare(OwnedResourcePlan plan) {
    _ensureActive();
    if (_current == null) {
      throw StateError('resource assembler is not initialized');
    }
    if (_open != null) throw StateError('resource assembly is already open');
    plan.validate();
    final prepared = PreparedResourceAssembly._(
      baseGeneration: _generation,
      plan: plan,
    );
    _open = prepared;
    return prepared;
  }

  void commit(PreparedResourceAssembly prepared) {
    _ensureActive();
    _checkOpen(prepared);
    if (prepared.baseGeneration != _generation) {
      throw StateError('resource assembly is stale');
    }
    _current = prepared.plan;
    _generation++;
    prepared._state = ResourceAssemblyState.committed;
    _open = null;
  }

  void rollback(PreparedResourceAssembly prepared) {
    _ensureActive();
    _checkOpen(prepared);
    prepared._state = ResourceAssemblyState.rolledBack;
    _open = null;
  }

  void dispose() {
    if (_disposed) return;
    if (_open != null) {
      throw StateError('cannot dispose an open resource assembly');
    }
    _disposed = true;
    _current = null;
  }

  void _ensureActive() {
    if (_disposed) throw StateError('resource assembler is disposed');
  }

  void _checkOpen(PreparedResourceAssembly prepared) {
    if (!identical(_open, prepared) ||
        prepared.state != ResourceAssemblyState.prepared) {
      throw StateError('resource assembly is not prepared');
    }
  }
}
