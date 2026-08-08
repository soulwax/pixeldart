import 'settings.dart';

enum ConfigurationTransactionState { open, committed, aborted }

final class ConfigurationDelta {
  final Set<String> addedFeatures;
  final Set<String> removedFeatures;
  final bool renderTargetsChanged;
  final bool resourceTablesChanged;
  final bool diagnosticLevelChanged;

  const ConfigurationDelta({
    required this.addedFeatures,
    required this.removedFeatures,
    required this.renderTargetsChanged,
    required this.resourceTablesChanged,
    required this.diagnosticLevelChanged,
  });

  bool get requiresGpuRebuild =>
      addedFeatures.isNotEmpty ||
      removedFeatures.isNotEmpty ||
      renderTargetsChanged ||
      resourceTablesChanged;

  bool get isNoop => !requiresGpuRebuild && !diagnosticLevelChanged;
}

final class ConfigurationTransaction {
  final int baseGeneration;
  final RendererConfiguration target;
  final ConfigurationDelta delta;
  ConfigurationTransactionState _state = ConfigurationTransactionState.open;

  ConfigurationTransaction._({
    required this.baseGeneration,
    required this.target,
    required this.delta,
  });

  ConfigurationTransactionState get state => _state;
}

final class ConfigurationStateMachine {
  RendererConfiguration? _current;
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

  void initialize(RendererConfiguration configuration) {
    _ensureActive();
    if (_current != null) {
      throw StateError('configuration state is already initialized');
    }
    configuration.validate();
    _current = configuration;
    _generation = 1;
  }

  ConfigurationTransaction begin(RendererConfiguration target) {
    _ensureActive();
    final currentConfiguration = current;
    if (_open != null) {
      throw StateError('a configuration transition is already open');
    }
    target.validate();
    final transaction = ConfigurationTransaction._(
      baseGeneration: _generation,
      target: target,
      delta: _delta(currentConfiguration, target),
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
) {
  final added = after.profile.installedFeatures.difference(
    before.profile.installedFeatures,
  );
  final removed = before.profile.installedFeatures.difference(
    after.profile.installedFeatures,
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
    renderTargetsChanged: renderTargetsChanged,
    resourceTablesChanged: resourceTablesChanged,
    diagnosticLevelChanged: before.diagnosticLevel != after.diagnosticLevel,
  );
}
