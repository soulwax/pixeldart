import 'graph_pass.dart';
import 'graph_resource.dart';

/// Declares a graph before any pass runs. All nine invalid cases in plan
/// §6.2 are checked over the full declared set, not discovered mid-frame —
/// "Graph validation fails before rendering."
final class RenderGraphBuilder {
  final List<PassDeclaration> _passes = [];
  final Set<String> _declaredHistoryResources = {};

  void addPass(PassDeclaration pass) {
    _passes.add(pass);
  }

  void declareHistoryResource(String name) {
    _declaredHistoryResources.add(name);
  }

  RenderGraph build({
    required Set<String> availableCapabilities,
    required bool hasValidPreviousFrame,
  }) {
    final failures = _validate(
      availableCapabilities: availableCapabilities,
      hasValidPreviousFrame: hasValidPreviousFrame,
    );
    return RenderGraph._(
      List.unmodifiable(_passes.where((p) => p.enabledPredicate())),
      failures,
    );
  }

  List<GraphValidationFailure> _validate({
    required Set<String> availableCapabilities,
    required bool hasValidPreviousFrame,
  }) {
    final failures = <GraphValidationFailure>[];
    final enabledPasses = _passes.where((p) => p.enabledPredicate()).toList();

    _checkCapabilities(enabledPasses, availableCapabilities, failures);
    _checkMultisampleSampling(enabledPasses, failures);
    _checkHistoryReads(enabledPasses, hasValidPreviousFrame, failures);

    final writers = _collectWriters(enabledPasses, failures);
    _checkReadBeforeWrite(enabledPasses, writers, failures);
    _checkUnversionedReadWrite(enabledPasses, failures);
    _checkFormatAndSizeMismatch(enabledPasses, writers, failures);
    _checkDependencyCycles(enabledPasses, failures);

    return failures;
  }

  void _checkCapabilities(
    List<PassDeclaration> passes,
    Set<String> available,
    List<GraphValidationFailure> failures,
  ) {
    for (final pass in passes) {
      final missing = pass.requiredCapabilities.difference(available);
      if (missing.isNotEmpty) {
        failures.add(
          GraphValidationFailure(
            GraphValidationFailureKind.missingCapability,
            pass.id,
            'missing capabilities: ${missing.join(', ')}',
          ),
        );
      }
    }
  }

  void _checkMultisampleSampling(
    List<PassDeclaration> passes,
    List<GraphValidationFailure> failures,
  ) {
    for (final pass in passes) {
      for (final use in pass.reads) {
        if (use.resource.isMultisampled) {
          failures.add(
            GraphValidationFailure(
              GraphValidationFailureKind.sampledMultisampledAttachment,
              pass.id,
              'reads multisampled resource ${use.resource} directly; '
              'resolve before sampling',
            ),
          );
        }
      }
    }
  }

  void _checkHistoryReads(
    List<PassDeclaration> passes,
    bool hasValidPreviousFrame,
    List<GraphValidationFailure> failures,
  ) {
    if (hasValidPreviousFrame) return;
    for (final pass in passes) {
      for (final use in pass.uses) {
        if (use.access == ResourceAccess.historyRead) {
          failures.add(
            GraphValidationFailure(
              GraphValidationFailureKind.invalidHistoryRead,
              pass.id,
              'history read of ${use.resource.name} with no valid previous frame',
            ),
          );
        }
      }
    }
  }

  Map<String, PassDeclaration> _collectWriters(
    List<PassDeclaration> passes,
    List<GraphValidationFailure> failures,
  ) {
    final writerOf = <String, PassDeclaration>{};
    for (final pass in passes) {
      for (final use in pass.writes) {
        final key = '${use.resource.name}#${use.resource.version}';
        final existing = writerOf[key];
        if (existing != null) {
          failures.add(
            GraphValidationFailure(
              GraphValidationFailureKind.duplicateWriter,
              pass.id,
              '${use.resource} already written by ${existing.id}',
            ),
          );
          continue;
        }
        writerOf[key] = pass;
      }
    }
    return writerOf;
  }

  void _checkReadBeforeWrite(
    List<PassDeclaration> passes,
    Map<String, PassDeclaration> writerOf,
    List<GraphValidationFailure> failures,
  ) {
    for (var i = 0; i < passes.length; i++) {
      final pass = passes[i];
      for (final use in pass.reads) {
        if (use.access == ResourceAccess.historyRead) continue;
        final key = '${use.resource.name}#${use.resource.version}';
        final writer = writerOf[key];
        if (writer == null) {
          failures.add(
            GraphValidationFailure(
              GraphValidationFailureKind.readBeforeWrite,
              pass.id,
              'reads ${use.resource} but no pass writes that version',
            ),
          );
          continue;
        }
        final writerIndex = passes.indexOf(writer);
        if (writerIndex > i) {
          failures.add(
            GraphValidationFailure(
              GraphValidationFailureKind.readBeforeWrite,
              pass.id,
              'reads ${use.resource} before writer ${writer.id} runs',
            ),
          );
        }
      }
    }
  }

  void _checkUnversionedReadWrite(
    List<PassDeclaration> passes,
    List<GraphValidationFailure> failures,
  ) {
    for (final pass in passes) {
      for (final readUse in pass.reads) {
        if (readUse.access == ResourceAccess.historyRead) continue;
        for (final writeUse in pass.writes) {
          if (readUse.resource.sameResourceAs(writeUse.resource) &&
              readUse.resource.version == writeUse.resource.version) {
            failures.add(
              GraphValidationFailure(
                GraphValidationFailureKind.unversionedReadWrite,
                pass.id,
                'reads and writes ${readUse.resource} at the same version; '
                'declare a ping-pong version bump',
              ),
            );
          }
        }
      }
    }
  }

  void _checkFormatAndSizeMismatch(
    List<PassDeclaration> passes,
    Map<String, PassDeclaration> writerOf,
    List<GraphValidationFailure> failures,
  ) {
    for (final pass in passes) {
      for (final use in pass.reads) {
        if (use.access == ResourceAccess.historyRead) continue;
        final key = '${use.resource.name}#${use.resource.version}';
        final writer = writerOf[key];
        if (writer == null) continue;
        final writtenRef = writer.writes
            .firstWhere(
              (w) =>
                  w.resource.sameResourceAs(use.resource) &&
                  w.resource.version == use.resource.version,
            )
            .resource;
        if (!writtenRef.formatCompatibleWith(use.resource)) {
          failures.add(
            GraphValidationFailure(
              GraphValidationFailureKind.formatOrSizeMismatch,
              pass.id,
              'reads ${use.resource} but writer ${writer.id} produced $writtenRef',
            ),
          );
        }
      }
    }
  }

  void _checkDependencyCycles(
    List<PassDeclaration> passes,
    List<GraphValidationFailure> failures,
  ) {
    final resourceToWriteIndex = <String, int>{};
    for (var i = 0; i < passes.length; i++) {
      for (final use in passes[i].writes) {
        resourceToWriteIndex['${use.resource.name}#${use.resource.version}'] =
            i;
      }
    }

    final adjacency = List.generate(passes.length, (_) => <int>{});
    for (var i = 0; i < passes.length; i++) {
      for (final use in passes[i].reads) {
        if (use.access == ResourceAccess.historyRead) continue;
        final key = '${use.resource.name}#${use.resource.version}';
        final writerIndex = resourceToWriteIndex[key];
        if (writerIndex != null && writerIndex != i) {
          adjacency[writerIndex].add(i);
        }
      }
    }

    final visiting = List.filled(passes.length, false);
    final visited = List.filled(passes.length, false);

    bool hasCycleFrom(int node) {
      if (visiting[node]) return true;
      if (visited[node]) return false;
      visiting[node] = true;
      for (final next in adjacency[node]) {
        if (hasCycleFrom(next)) return true;
      }
      visiting[node] = false;
      visited[node] = true;
      return false;
    }

    for (var i = 0; i < passes.length; i++) {
      if (!visited[i] && hasCycleFrom(i)) {
        failures.add(
          GraphValidationFailure(
            GraphValidationFailureKind.dependencyCycle,
            passes[i].id,
            'participates in a resource dependency cycle',
          ),
        );
      }
    }
  }
}

/// A validated (or rejected) graph. [failures] is empty only when every
/// §6.2 check passed; callers must check [isValid] before treating
/// [orderedPasses] as safe to execute.
final class RenderGraph {
  final List<PassDeclaration> orderedPasses;
  final List<GraphValidationFailure> failures;

  const RenderGraph._(this.orderedPasses, this.failures);

  bool get isValid => failures.isEmpty;
}
