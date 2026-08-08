import '../webgl/device_api.dart';
import 'program_source.dart';

final class CompiledProgram {
  final String id;
  final GpuObject handle;
  final Map<String, int> attributeLocations;
  final Map<String, int> samplerUnits;

  const CompiledProgram({
    required this.id,
    required this.handle,
    required this.attributeLocations,
    required this.samplerUnits,
  });
}

enum ProgramSetCandidateState { prepared, committed, rolledBack }

final class PreparedProgramSet {
  final Map<String, CompiledProgram> programs;
  ProgramSetCandidateState _state = ProgramSetCandidateState.prepared;

  PreparedProgramSet(this.programs);

  ProgramSetCandidateState get state => _state;
}

/// Owns every live program and drives §7.2's atomic sequence: compile,
/// link, validate, assign samplers, publish, delete-the-old-one-only-after.
/// A failed candidate never replaces the last known-good program (§7.2,
/// and RV-03's gate: "invalid reload preserves the previous program").
final class ProgramLibrary {
  final GpuDevice _device;
  final Map<String, CompiledProgram> _live = {};
  PreparedProgramSet? _openSet;

  int publishCount = 0;
  int rejectedReloadCount = 0;

  ProgramLibrary(this._device);

  CompiledProgram? programFor(String id) => _live[id];

  Iterable<CompiledProgram> get allPrograms => _live.values;

  PreparedProgramSet prepareSet(Iterable<ProgramSource> sources) {
    if (_openSet != null) {
      throw StateError('program set candidate is already open');
    }
    final candidates = <String, CompiledProgram>{};
    try {
      for (final source in sources) {
        source.validate();
        if (candidates.containsKey(source.id)) {
          throw ArgumentError('duplicate program ID: ${source.id}');
        }
        final handle = _device.compileProgram(
          vertexSource: source.vertexSource,
          fragmentSource: source.fragmentSource,
          requiredAttributes: source.requiredAttributes,
          requiredUniforms: source.requiredUniforms,
        );
        candidates[source.id] = CompiledProgram(
          id: source.id,
          handle: handle,
          attributeLocations: source.attributeLocations,
          samplerUnits: source.samplerUnits,
        );
      }
    } on ShaderCompileException {
      rejectedReloadCount += 1;
      _deletePrograms(candidates.values);
      rethrow;
    } catch (_) {
      _deletePrograms(candidates.values);
      rethrow;
    }
    final prepared = PreparedProgramSet(Map.unmodifiable(candidates));
    _openSet = prepared;
    return prepared;
  }

  void commitSet(PreparedProgramSet prepared) {
    _checkOpenSet(prepared);
    final oldPrograms = _live.values.toList();
    _live
      ..clear()
      ..addAll(prepared.programs);
    _openSet = null;
    prepared._state = ProgramSetCandidateState.committed;
    publishCount += prepared.programs.length;
    _deletePrograms(oldPrograms);
  }

  void rollbackSet(PreparedProgramSet prepared) {
    _checkOpenSet(prepared);
    _deletePrograms(prepared.programs.values);
    prepared._state = ProgramSetCandidateState.rolledBack;
    _openSet = null;
  }

  /// Compiles [source] and, only on success, publishes it — deleting the
  /// prior program for the same id (if any) after the new one is live. On
  /// failure, throws and leaves any existing program for [source.id]
  /// untouched.
  CompiledProgram publish(ProgramSource source) {
    if (_openSet != null) {
      throw StateError('cannot publish while a program set candidate is open');
    }
    source.validate();
    final GpuObject handle;
    try {
      handle = _device.compileProgram(
        vertexSource: source.vertexSource,
        fragmentSource: source.fragmentSource,
        requiredAttributes: source.requiredAttributes,
        requiredUniforms: source.requiredUniforms,
      );
    } on ShaderCompileException {
      rejectedReloadCount += 1;
      rethrow;
    }

    final compiled = CompiledProgram(
      id: source.id,
      handle: handle,
      attributeLocations: source.attributeLocations,
      samplerUnits: source.samplerUnits,
    );

    final previous = _live[source.id];
    _live[source.id] = compiled;
    publishCount += 1;
    if (previous != null) {
      _device.deleteProgram(previous.handle);
    }
    return compiled;
  }

  /// Attempts a reload; on failure the previous program for [source.id]
  /// (if any) remains published and callable. Returns whether the reload
  /// succeeded, rather than throwing, since a failed compile is an expected
  /// dev-loop outcome, not a fatal error. A malformed [source] (caught by
  /// `validate()`) is a genuine authoring bug and still throws.
  bool tryReload(ProgramSource source) {
    source.validate();
    try {
      publish(source);
      return true;
    } on ShaderCompileException {
      return false;
    }
  }

  void disposeAll() {
    if (_openSet != null) {
      _deletePrograms(_openSet!.programs.values);
      _openSet!._state = ProgramSetCandidateState.rolledBack;
      _openSet = null;
    }
    _deletePrograms(_live.values);
    _live.clear();
  }

  /// Drops logical program references after the device has already discarded
  /// every GPU object during context loss. Unlike [disposeAll], this must not
  /// call delete on stale handles from the previous device epoch.
  void resetAfterContextRestore() {
    _openSet = null;
    _live.clear();
  }

  void _checkOpenSet(PreparedProgramSet prepared) {
    if (!identical(_openSet, prepared) ||
        prepared.state != ProgramSetCandidateState.prepared) {
      throw StateError('program set candidate is not open');
    }
  }

  void _deletePrograms(Iterable<CompiledProgram> programs) {
    for (final program in programs) {
      _device.deleteProgram(program.handle);
    }
  }
}
