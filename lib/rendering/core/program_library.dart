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
      if (replacement.fragment != null) {
        _validateFragmentOutputs(
          source.id,
          source.fragmentSource,
          replacement.fragment!,
        );
      }
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

  // The render graph owns attachment locations. A compilable host fragment
  // shader may still write the wrong target, so check its declared outputs
  // against the default pass before asking the GPU to compile it.
  void _validateFragmentOutputs(
    String programId,
    String defaultSource,
    String replacementSource,
  ) {
    final expected = _fragmentOutputs(defaultSource, programId);
    final actual = _fragmentOutputs(replacementSource, programId);
    if (expected.length != actual.length ||
        expected.keys.any(
          (location) => expected[location] != actual[location],
        )) {
      throw ShaderCompileException(
        ShaderCompileStage.validation,
        '$programId fragment outputs must match the default attachment '
        'locations and types: expected $expected, got $actual',
      );
    }
  }

  Map<int, String> _fragmentOutputs(String source, String programId) {
    final withoutComments = source
        .replaceAll(RegExp(r'/\*[\s\S]*?\*/'), '')
        .replaceAll(RegExp(r'//[^\r\n]*'), '')
        .replaceAll(RegExp(r'^\s*#.*$', multiLine: true), '');
    // Ignore function bodies so `out` parameters and local statements cannot
    // be mistaken for fragment attachment declarations.
    final topLevel = StringBuffer();
    var braceDepth = 0;
    for (final codeUnit in withoutComments.codeUnits) {
      if (codeUnit == 123) {
        if (braceDepth == 0) topLevel.write(';');
        braceDepth++;
      } else if (codeUnit == 125) {
        braceDepth--;
        if (braceDepth == 0) topLevel.write(';');
      } else if (braceDepth == 0) {
        topLevel.writeCharCode(codeUnit);
      }
      if (braceDepth < 0) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '$programId has unbalanced fragment shader braces',
        );
      }
    }
    if (braceDepth != 0) {
      throw ShaderCompileException(
        ShaderCompileStage.validation,
        '$programId has unbalanced fragment shader braces',
      );
    }
    final declarationPattern = RegExp(
      r'^(?:layout\s*\(\s*location\s*=\s*(\d+)\s*\)\s*)?'
      r'out\s+(?:(?:lowp|mediump|highp)\s+)?'
      r'(float|vec[234]|int|ivec[234]|uint|uvec[234])\s+'
      r'[A-Za-z_]\w*$',
    );
    final declarations = <RegExpMatch>[];
    for (final statement in topLevel.toString().split(';')) {
      final trimmed = statement.trim();
      final declaration = declarationPattern.firstMatch(trimmed);
      if (declaration != null) {
        declarations.add(declaration);
      } else if (RegExp(
        r'^(?:layout\s*\([^)]*\)\s*)?out\b',
      ).hasMatch(trimmed)) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '$programId has an unsupported fragment output declaration',
        );
      }
    }
    final outputs = <int, String>{};
    for (final declaration in declarations) {
      final explicit = declaration.group(1);
      if (declarations.length > 1 && explicit == null) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '$programId must declare locations for all fragment outputs',
        );
      }
      final location = explicit == null ? 0 : int.parse(explicit);
      if (outputs.containsKey(location)) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '$programId declares fragment output location $location twice',
        );
      }
      outputs[location] = declaration.group(2)!;
    }
    return outputs;
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
