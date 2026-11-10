import 'graph_resource.dart';

final class PassDeclaration {
  final String id;
  final GraphStage stage;
  final List<ResourceUse> uses;
  final Set<String> requiredCapabilities;
  final bool Function() enabledPredicate;
  final bool isResolve;

  const PassDeclaration({
    required this.id,
    required this.stage,
    required this.uses,
    this.requiredCapabilities = const {},
    this.enabledPredicate = _alwaysEnabled,
    this.isResolve = false,
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
