import 'configuration_transition.dart';
import 'resource_plan.dart';
import 'settings.dart';

enum CoordinatedTransitionState { open, committed, rolledBack }

final class PreparedConfigurationTransition {
  final ConfigurationTransaction configuration;
  final PreparedResourceAssembly resources;
  CoordinatedTransitionState _state = CoordinatedTransitionState.open;

  PreparedConfigurationTransition({
    required this.configuration,
    required this.resources,
  });

  CoordinatedTransitionState get state => _state;
}

final class ConfigurationCoordinator {
  final ConfigurationStateMachine _configuration = ConfigurationStateMachine();
  final ResourcePlanAssembler _resources = ResourcePlanAssembler();
  PreparedConfigurationTransition? _open;
  bool _disposed = false;

  RendererConfiguration get current => _configuration.current;

  OwnedResourcePlan get currentResources => _resources.current;

  int get generation => _configuration.generation;

  void initialize(RendererConfiguration configuration) {
    _ensureActive();
    final plan = OwnedResourcePlan.forConfiguration(configuration);
    _configuration.initialize(configuration);
    _resources.initialize(plan);
  }

  PreparedConfigurationTransition begin(RendererConfiguration target) {
    _ensureActive();
    if (_open != null) {
      throw StateError('coordinated transition is already open');
    }
    final configuration = _configuration.begin(target);
    try {
      final resources = _resources.prepare(configuration.targetResources);
      final prepared = PreparedConfigurationTransition(
        configuration: configuration,
        resources: resources,
      );
      _open = prepared;
      return prepared;
    } catch (_) {
      _configuration.abort(configuration);
      rethrow;
    }
  }

  void commit(PreparedConfigurationTransition prepared) {
    _ensureActive();
    _checkOpen(prepared);
    _configuration.commit(prepared.configuration);
    _resources.commit(prepared.resources);
    prepared._state = CoordinatedTransitionState.committed;
    _open = null;
  }

  void rollback(PreparedConfigurationTransition prepared) {
    _ensureActive();
    _checkOpen(prepared);
    _configuration.abort(prepared.configuration);
    _resources.rollback(prepared.resources);
    prepared._state = CoordinatedTransitionState.rolledBack;
    _open = null;
  }

  void dispose() {
    if (_disposed) return;
    if (_open != null) {
      throw StateError('cannot dispose an open coordinated transition');
    }
    _configuration.dispose();
    _resources.dispose();
    _disposed = true;
  }

  void _ensureActive() {
    if (_disposed) throw StateError('configuration coordinator is disposed');
  }

  void _checkOpen(PreparedConfigurationTransition prepared) {
    if (!identical(_open, prepared) ||
        prepared.state != CoordinatedTransitionState.open) {
      throw StateError('coordinated transition is not open');
    }
  }
}
