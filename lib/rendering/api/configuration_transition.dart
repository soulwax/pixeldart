import 'resource_plan.dart';
import 'settings.dart';

enum ConfigurationTransactionState { open, committed, aborted }

final class ConfigurationDelta {
  final Set<String> addedFeatures;
  final Set<String> removedFeatures;
  final Set<String> addedResources;
  final Set<String> removedResources;
  final bool renderTargetsChanged;
  final bool resourceTablesChanged;
  final bool diagnosticLevelChanged;

  const ConfigurationDelta({
    required this.addedFeatures,
    required this.removedFeatures,
    required this.addedResources,
    required this.removedResources,
    required this.renderTargetsChanged,
    required this.resourceTablesChanged,
    required this.diagnosticLevelChanged,
  });

  bool get requiresGpuRebuild =>
      addedFeatures.isNotEmpty ||
      removedFeatures.isNotEmpty ||
      addedResources.isNotEmpty ||
      removedResources.isNotEmpty ||
      renderTargetsChanged ||
      resourceTablesChanged;

  bool get isNoop => !requiresGpuRebuild && !diagnosticLevelChanged;
}

final class ConfigurationTransaction {
  final int baseGeneration;
  final RendererConfiguration target;
  final OwnedResourcePlan targetResources;
  final ConfigurationDelta delta;
  ConfigurationTransactionState _state = ConfigurationTransactionState.open;

  ConfigurationTransaction._({
    required this.baseGeneration,
    required this.target,
    required this.targetResources,
    required this.delta,
  });

  ConfigurationTransactionState get state => _state;
}

final class ConfigurationStateMachine {
  RendererConfiguration? _current;
  OwnedResourcePlan? _currentResources;
  ConfigurationTransaction? _open;
  int _generation = 0;
  bool _disposed = false;

  RendererConfiguration get current {
    final value = _current;
    if (value == null) {
      throw StateError('configuration state is not initialized');
    }
    return value;
  }

  int get generation => _generation;

  OwnedResourcePlan get currentResources {
    final value = _currentResources;
    if (value == null) {
      throw StateError('resource state is not initialized');
    }
    return value;
  }

  void initialize(RendererConfiguration configuration) {
    _ensureActive();
    if (_current != null) {
      throw StateError('configuration state is already initialized');
    }
    configuration.validate();
    _current = configuration;
    _currentResources = OwnedResourcePlan.forConfiguration(configuration);
    _generation = 1;
  }

  ConfigurationTransaction begin(RendererConfiguration target) {
    _ensureActive();
    final currentConfiguration = current;
    if (_open != null) {
      throw StateError('a configuration transition is already open');
    }
    target.validate();
    final targetResources = OwnedResourcePlan.forConfiguration(target);
    final transaction = ConfigurationTransaction._(
      baseGeneration: _generation,
      target: target,
      targetResources: targetResources,
      delta: _delta(
        currentConfiguration,
        target,
        currentResources,
        targetResources,
      ),
    );
    _open = transaction;
    return transaction;
  }

  void commit(ConfigurationTransaction transaction) {
    _ensureActive();
    _checkOpen(transaction);
    if (transaction.baseGeneration != _generation) {
      throw StateError('configuration transition is stale');
    }
    _current = transaction.target;
    _currentResources = transaction.targetResources;
    _generation++;
    transaction._state = ConfigurationTransactionState.committed;
    _open = null;
  }

  void abort(ConfigurationTransaction transaction) {
    _ensureActive();
    _checkOpen(transaction);
    transaction._state = ConfigurationTransactionState.aborted;
    _open = null;
  }

  void dispose() {
    if (_disposed) return;
    if (_open != null) {
      throw StateError('cannot dispose with an open configuration transition');
    }
    _disposed = true;
    _current = null;
    _currentResources = null;
  }

  void _ensureActive() {
    if (_disposed) throw StateError('configuration state is disposed');
  }

  void _checkOpen(ConfigurationTransaction transaction) {
    if (!identical(_open, transaction) ||
        transaction.state != ConfigurationTransactionState.open) {
      throw StateError('configuration transition is not open');
    }
  }
}

ConfigurationDelta _delta(
  RendererConfiguration before,
  RendererConfiguration after,
  OwnedResourcePlan beforeResources,
  OwnedResourcePlan afterResources,
) {
  final added = after.profile.installedFeatures.difference(
    before.profile.installedFeatures,
  );
  final removed = before.profile.installedFeatures.difference(
    after.profile.installedFeatures,
  );
  final addedResources = afterResources.resources.difference(
    beforeResources.resources,
  );
  final removedResources = beforeResources.resources.difference(
    afterResources.resources,
  );
  final renderTargetsChanged =
      before.profile.kind != after.profile.kind ||
      before.internalWidth != after.internalWidth ||
      before.internalHeight != after.internalHeight ||
      before.sampleCount != after.sampleCount ||
      before.outputEncoding != after.outputEncoding ||
      before.shadowMapCount != after.shadowMapCount ||
      before.shadowMapSize != after.shadowMapSize;
  final resourceTablesChanged =
      before.materialTableCapacity != after.materialTableCapacity ||
      before.lightTableCapacity != after.lightTableCapacity ||
      before.textureArrayLayerCapacity != after.textureArrayLayerCapacity;
  return ConfigurationDelta(
    addedFeatures: Set.unmodifiable(added),
    removedFeatures: Set.unmodifiable(removed),
    addedResources: Set.unmodifiable(addedResources),
    removedResources: Set.unmodifiable(removedResources),
    renderTargetsChanged: renderTargetsChanged,
    resourceTablesChanged: resourceTablesChanged,
    diagnosticLevelChanged: before.diagnosticLevel != after.diagnosticLevel,
  );
}
