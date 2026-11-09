import '../webgl/device_api.dart';
import '../api/shaders.dart';
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

final class ProgramLibrary {
  final GpuDevice _device;
  final Map<ShaderSlot, ShaderOverride> _overrides;
  bool fallbackToDefaults;
  final Map<String, CompiledProgram> _live = {};
  final Map<ShaderSlot, String> _overrideErrors = {};
  PreparedProgramSet? _openSet;

  int publishCount = 0;
  int rejectedReloadCount = 0;

  ProgramLibrary(
    this._device, {
    Map<ShaderSlot, ShaderOverride> overrides = const {},
    this.fallbackToDefaults = false,
  }) : _overrides = Map.unmodifiable(overrides);

  Map<ShaderSlot, String> get overrideErrors =>
      Map.unmodifiable(_overrideErrors);

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
        final handle = _compile(source);
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

  CompiledProgram publish(ProgramSource source) {
    if (_openSet != null) {
      throw StateError('cannot publish while a program set candidate is open');
    }
    source.validate();
    final GpuObject handle;
    try {
      handle = _compile(source);
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

  void resetAfterContextRestore() {
    _openSet = null;
    _live.clear();
    _overrideErrors.clear();
  }

  GpuObject _compile(ProgramSource source) {
    final slot = ShaderSlot.forProgramId(source.id);
    final replacement = slot == null ? null : _overrides[slot];
    if (replacement == null) {
      return _device.compileProgram(
        vertexSource: source.vertexSource,
        fragmentSource: source.fragmentSource,
        requiredAttributes: source.requiredAttributes,
        requiredUniforms: source.requiredUniforms,
      );
    }
    try {
      final handle = _device.compileProgram(
        vertexSource: replacement.vertex ?? source.vertexSource,
        fragmentSource: replacement.fragment ?? source.fragmentSource,
        requiredAttributes: source.requiredAttributes,
        requiredUniforms: source.requiredUniforms,
      );
      _overrideErrors.remove(slot);
      return handle;
    } on ShaderCompileException catch (error) {
      if (!fallbackToDefaults) rethrow;
      rejectedReloadCount += 1;
      _overrideErrors[slot!] = error.toString();
      return _device.compileProgram(
        vertexSource: source.vertexSource,
        fragmentSource: source.fragmentSource,
        requiredAttributes: source.requiredAttributes,
        requiredUniforms: source.requiredUniforms,
      );
    }
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
