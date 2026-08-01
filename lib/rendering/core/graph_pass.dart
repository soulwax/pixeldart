import 'graph_resource.dart';

/// One declared pass node. A feature's `declare()` call (§5.6) submits one
/// or more of these to a `RenderGraphBuilder`; validation runs over the
/// full declared set before any pass executes.
final class PassDeclaration {
  final String id;
  final GraphStage stage;
  final List<ResourceUse> uses;
  final Set<String> requiredCapabilities;
  final bool Function() enabledPredicate;

  const PassDeclaration({
    required this.id,
    required this.stage,
    required this.uses,
    this.requiredCapabilities = const {},
    this.enabledPredicate = _alwaysEnabled,
  });

  static bool _alwaysEnabled() => true;

  Iterable<ResourceUse> get reads => uses.where(
    (u) =>
        u.access == ResourceAccess.read ||
        u.access == ResourceAccess.historyRead,
  );
  Iterable<ResourceUse> get writes =>
      uses.where((u) => u.access == ResourceAccess.write);

  @override
  String toString() => 'PassDeclaration($id @ $stage)';
}

enum GraphValidationFailureKind {
  readBeforeWrite,
  duplicateWriter,
  sampledMultisampledAttachment,
  invalidResolve,
  formatOrSizeMismatch,
  unversionedReadWrite,
  invalidHistoryRead,
  dependencyCycle,
  missingCapability,
}

final class GraphValidationFailure {
  final GraphValidationFailureKind kind;
  final String passId;
  final String detail;

  const GraphValidationFailure(this.kind, this.passId, this.detail);

  @override
  String toString() =>
      'GraphValidationFailure(${kind.name} in $passId: $detail)';
}
