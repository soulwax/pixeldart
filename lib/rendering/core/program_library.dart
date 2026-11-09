import '../webgl/device_api.dart';
import '../api/shaders.dart';
import 'program_source.dart';

final class CompiledProgram {
  final String id;
  GpuObject handle;
  final Map<String, int> attributeLocations;
  final Map<String, int> samplerUnits;

  CompiledProgram({
    required this.id,
    required this.handle,
    required this.attributeLocations,
    required this.samplerUnits,
  });
}

enum ProgramSetCandidateState { prepared, committed, rolledBack }

final class PreparedProgramSet {
  final Map<String, CompiledProgram> programs;
  final Map<String, ProgramSource> sources;
  ProgramSetCandidateState _state = ProgramSetCandidateState.prepared;

  PreparedProgramSet(this.programs, [this.sources = const {}]);

  ProgramSetCandidateState get state => _state;
}

final class PreparedShaderOverrides {
  final Map<ShaderSlot, ShaderOverride> overrides;
  final Map<String, GpuObject> replacements;
  ProgramSetCandidateState _state = ProgramSetCandidateState.prepared;

  PreparedShaderOverrides(this.overrides, this.replacements);

  ProgramSetCandidateState get state => _state;
}

final class ProgramLibrary {
  final GpuDevice _device;
  Map<ShaderSlot, ShaderOverride> _overrides;
  bool fallbackToDefaults;
  final Map<String, CompiledProgram> _live = {};
  final Map<String, ProgramSource> _sources = {};
  final Map<ShaderSlot, String> _overrideErrors = {};
  PreparedProgramSet? _openSet;
  PreparedShaderOverrides? _openOverrides;

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
    if (_openSet != null || _openOverrides != null) {
      throw StateError('program set candidate is already open');
    }
    final candidates = <String, CompiledProgram>{};
    final candidateSources = <String, ProgramSource>{};
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
        candidateSources[source.id] = source;
      }
    } on ShaderCompileException {
      rejectedReloadCount += 1;
      _deletePrograms(candidates.values);
      rethrow;
    } catch (_) {
      _deletePrograms(candidates.values);
      rethrow;
    }
    final prepared = PreparedProgramSet(
      Map.unmodifiable(candidates),
      Map.unmodifiable(candidateSources),
    );
    _openSet = prepared;
    return prepared;
  }

  void commitSet(PreparedProgramSet prepared) {
    _checkOpenSet(prepared);
    final oldPrograms = _live.values.toList();
    _live
      ..clear()
      ..addAll(prepared.programs);
    _sources
      ..clear()
      ..addAll(prepared.sources);
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
    if (_openSet != null || _openOverrides != null) {
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
    _sources[source.id] = source;
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

  /// Compile only installed slots whose overrides changed. The live program
  /// objects stay in place so render passes can keep their references.
  PreparedShaderOverrides prepareOverrides(
    Map<ShaderSlot, ShaderOverride> overrides,
  ) {
    if (_openSet != null || _openOverrides != null) {
      throw StateError('program candidate is already open');
    }
    for (final replacement in overrides.values) {
      replacement.validate();
    }
    final snapshot = Map<ShaderSlot, ShaderOverride>.unmodifiable(overrides);
    final candidates = <String, GpuObject>{};
    try {
      for (final source in _sources.values) {
        final slot = ShaderSlot.forProgramId(source.id);
        if (slot == null || _overrides[slot] == snapshot[slot]) continue;
        candidates[source.id] = _compile(
          source,
          overrides: snapshot,
          allowFallback: false,
        );
      }
    } on ShaderCompileException {
      rejectedReloadCount += 1;
      _deleteHandles(candidates.values);
      rethrow;
    } catch (_) {
      _deleteHandles(candidates.values);
      rethrow;
    }
    return _openOverrides = PreparedShaderOverrides(
      snapshot,
      Map.unmodifiable(candidates),
    );
  }

  void commitOverrides(PreparedShaderOverrides prepared) {
    _checkOpenOverrides(prepared);
    final retired = <GpuObject>[];
    for (final entry in prepared.replacements.entries) {
      final live = _live[entry.key]!;
      retired.add(live.handle);
      live.handle = entry.value;
    }
    for (final slot in ShaderSlot.values) {
      if (_overrides[slot] != prepared.overrides[slot]) {
        _overrideErrors.remove(slot);
      }
    }
    _overrides = prepared.overrides;
    _openOverrides = null;
    prepared._state = ProgramSetCandidateState.committed;
    publishCount += prepared.replacements.length;
    _deleteHandles(retired);
  }

  void rollbackOverrides(PreparedShaderOverrides prepared) {
    _checkOpenOverrides(prepared);
    _deleteHandles(prepared.replacements.values);
    _openOverrides = null;
    prepared._state = ProgramSetCandidateState.rolledBack;
  }

  void disposeAll() {
    if (_openOverrides != null) {
      _deleteHandles(_openOverrides!.replacements.values);
      _openOverrides!._state = ProgramSetCandidateState.rolledBack;
      _openOverrides = null;
    }
    if (_openSet != null) {
      _deletePrograms(_openSet!.programs.values);
      _openSet!._state = ProgramSetCandidateState.rolledBack;
      _openSet = null;
    }
    _deletePrograms(_live.values);
    _live.clear();
    _sources.clear();
  }

  void resetAfterContextRestore() {
    _openSet = null;
    _openOverrides = null;
    _live.clear();
    _sources.clear();
    _overrideErrors.clear();
  }

  GpuObject _compile(
    ProgramSource source, {
    Map<ShaderSlot, ShaderOverride>? overrides,
    bool? allowFallback,
  }) {
    final slot = ShaderSlot.forProgramId(source.id);
    final replacement = slot == null ? null : (overrides ?? _overrides)[slot];
    if (replacement == null) {
      return _device.compileProgram(
        vertexSource: source.vertexSource,
        fragmentSource: source.fragmentSource,
        requiredAttributes: source.requiredAttributes,
        requiredUniforms: source.requiredUniforms,
      );
    }
    try {
      _validateStageInterface(source, replacement);
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
      if (!(allowFallback ?? fallbackToDefaults)) rethrow;
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

  void _validateStageInterface(
    ProgramSource source,
    ShaderOverride replacement,
  ) {
    final defaultVertex = _stageDeclarations(source.vertexSource, source.id);
    final defaultFragment = _stageDeclarations(
      source.fragmentSource,
      source.id,
    );
    final vertex = replacement.vertex == null
        ? defaultVertex
        : _stageDeclarations(replacement.vertex!, source.id);
    final fragment = replacement.fragment == null
        ? defaultFragment
        : _stageDeclarations(replacement.fragment!, source.id);

    for (final attribute in source.attributeLocations.entries) {
      final original = _declarationFor(defaultVertex, 'in', attribute.key);
      final supplied = _declarationFor(vertex, 'in', attribute.key);
      if (original == null ||
          supplied == null ||
          supplied.type != original.type ||
          supplied.location != attribute.value) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '${source.id} vertex input ${attribute.key} must keep '
          '${original?.type ?? 'its default type'} at location ${attribute.value}',
        );
      }
    }

    final defaultUniforms = <String, String>{
      for (final declaration in [...defaultVertex, ...defaultFragment])
        if (declaration.qualifier == 'uniform')
          declaration.name: declaration.type,
    };
    for (final declaration in [...vertex, ...fragment]) {
      final expected = defaultUniforms[declaration.name];
      if (declaration.qualifier == 'uniform' &&
          expected != null &&
          declaration.type != expected) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '${source.id} uniform ${declaration.name} must keep type $expected',
        );
      }
    }

    for (final input in fragment.where((item) => item.qualifier == 'in')) {
      final output = _declarationFor(vertex, 'out', input.name);
      if (output == null || output.type != input.type) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '${source.id} fragment input ${input.name} (${input.type}) '
          'has no matching vertex output',
        );
      }
    }
  }

  _ShaderDeclaration? _declarationFor(
    List<_ShaderDeclaration> declarations,
    String qualifier,
    String name,
  ) {
    for (final declaration in declarations) {
      if (declaration.qualifier == qualifier && declaration.name == name) {
        return declaration;
      }
    }
    return null;
  }

  List<_ShaderDeclaration> _stageDeclarations(String source, String programId) {
    final pattern = RegExp(
      r'^(?:layout\s*\(\s*location\s*=\s*(\d+)\s*\)\s*)?'
      r'(in|out|uniform)\s+(?:(?:lowp|mediump|highp)\s+)?'
      r'([A-Za-z_]\w*)\s+([A-Za-z_]\w*)'
      r'(?:\s*\[\s*(\d+)\s*\])?$',
    );
    final declarations = <_ShaderDeclaration>[];
    for (final statement in _topLevelStatements(source, programId)) {
      final match = pattern.firstMatch(statement);
      if (match == null) continue;
      final arrayLength = match.group(5);
      declarations.add((
        qualifier: match.group(2)!,
        type: arrayLength == null
            ? match.group(3)!
            : '${match.group(3)}[$arrayLength]',
        name: match.group(4)!,
        location: match.group(1) == null ? null : int.parse(match.group(1)!),
      ));
    }
    return declarations;
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
    final declarationPattern = RegExp(
      r'^(?:layout\s*\(\s*location\s*=\s*(\d+)\s*\)\s*)?'
      r'out\s+(?:(?:lowp|mediump|highp)\s+)?'
      r'(float|vec[234]|int|ivec[234]|uint|uvec[234])\s+'
      r'[A-Za-z_]\w*$',
    );
    final declarations = <RegExpMatch>[];
    for (final trimmed in _topLevelStatements(source, programId)) {
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

  List<String> _topLevelStatements(String source, String programId) {
    final withoutComments = source
        .replaceAll(RegExp(r'/\*[\s\S]*?\*/'), '')
        .replaceAll(RegExp(r'//[^\r\n]*'), '')
        .replaceAll(RegExp(r'^\s*#.*$', multiLine: true), '');
    // Ignore function bodies so parameters and local statements cannot be
    // mistaken for stage interface declarations.
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
          '$programId has unbalanced shader source braces',
        );
      }
    }
    if (braceDepth != 0) {
      throw ShaderCompileException(
        ShaderCompileStage.validation,
        '$programId has unbalanced shader source braces',
      );
    }
    return topLevel
        .toString()
        .split(';')
        .map((statement) => statement.trim())
        .where((statement) => statement.isNotEmpty)
        .toList();
  }

  void _checkOpenSet(PreparedProgramSet prepared) {
    if (!identical(_openSet, prepared) ||
        prepared.state != ProgramSetCandidateState.prepared) {
      throw StateError('program set candidate is not open');
    }
  }

  void _checkOpenOverrides(PreparedShaderOverrides prepared) {
    if (!identical(_openOverrides, prepared) ||
        prepared.state != ProgramSetCandidateState.prepared) {
      throw StateError('shader override candidate is not open');
    }
  }

  void _deletePrograms(Iterable<CompiledProgram> programs) {
    for (final program in programs) {
      _device.deleteProgram(program.handle);
    }
  }

  void _deleteHandles(Iterable<GpuObject> handles) {
    for (final handle in handles) {
      _device.deleteProgram(handle);
    }
  }
}

typedef _ShaderDeclaration = ({
  String qualifier,
  String type,
  String name,
  int? location,
});
