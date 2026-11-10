import '../webgl/device_api.dart';
import '../api/shaders.dart';
import 'program_source.dart';
import 'shader_bindings.dart';

final class CompiledProgram {
  final String id;
  GpuObject handle;
  final Map<String, int> attributeLocations;
  final Map<String, int> samplerUnits;

  /// Whether [handle] was built from a host override. A pass may only skip
  /// itself on the built-in shader's identity weights when this is false,
  /// since a host shader is free to ignore those weights.
  bool isHostOverride;

  CompiledProgram({
    required this.id,
    required this.handle,
    required this.attributeLocations,
    required this.samplerUnits,
    this.isHostOverride = false,
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
  final Map<ShaderTarget, String> _overrideErrors = {};
  final Map<GpuObject, ShaderTarget> _overrideHandles = {};
  final Map<ShaderTarget, ProgramSource> _variantSources = {};
  PreparedProgramSet? _openSet;
  PreparedShaderOverrides? _openOverrides;

  int publishCount = 0;
  int rejectedReloadCount = 0;

  ProgramLibrary(
    this._device, {
    Map<ShaderSlot, ShaderOverride> overrides = const {},
    this.fallbackToDefaults = false,
  }) : _overrides = Map.unmodifiable(overrides);

  Map<ShaderTarget, String> get overrideErrors =>
      Map.unmodifiable(_overrideErrors);

  CompiledProgram? programFor(String id) => _live[id];

  /// The target [handle] was built for, or null for a built-in program.
  ShaderTarget? targetOfOverride(GpuObject handle) => _overrideHandles[handle];

  bool get hasActiveOverrides => _overrideHandles.isNotEmpty;

  /// Whether the built-in shader behind [target] declares uniform [name],
  /// making it the renderer's to set. False when nothing is installed there.
  bool isEngineUniform(ShaderTarget target, String name) {
    final source = target is ShaderSlot
        ? _sources[target.name]
        : _variantSources[target];
    return source != null && _engineUniforms(source).contains(name);
  }

  /// Compiles a host shader that is not one of the built-in slots. [source]
  /// is its default program and sets the contract it is validated against;
  /// with [allowFallback] a failure compiles the default and is recorded.
  CompiledProgram publishVariant({
    required ProgramSource source,
    required ShaderTarget target,
    required ShaderOverride variant,
    required bool allowFallback,
  }) {
    if (_openSet != null || _openOverrides != null) {
      throw StateError('cannot publish while a program candidate is open');
    }
    source.validate();
    _requireUnusedId(source.id);
    if (_variantSources.containsKey(target)) {
      throw StateError('shader target is already registered: ${target.label}');
    }
    final handle = _compileOverride(source, target, variant, allowFallback);
    final compiled = CompiledProgram(
      id: source.id,
      handle: handle,
      attributeLocations: source.attributeLocations,
      samplerUnits: source.samplerUnits,
      isHostOverride: _overrideHandles.containsKey(handle),
    );
    _live[source.id] = compiled;
    _variantSources[target] = source;
    publishCount += 1;
    return compiled;
  }

  void releaseVariant(ShaderTarget target) {
    final source = _variantSources.remove(target);
    _overrideErrors.remove(target);
    if (source == null) return;
    final program = _live.remove(source.id);
    if (program != null) _deletePrograms([program]);
  }

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
          isHostOverride: _overrideHandles.containsKey(handle),
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
      isHostOverride: _overrideHandles.containsKey(handle),
    );

    final previous = _live[source.id];
    _live[source.id] = compiled;
    _sources[source.id] = source;
    publishCount += 1;
    if (previous != null) {
      _overrideHandles.remove(previous.handle);
      _device.deleteProgram(previous.handle);
    }
    return compiled;
  }

  /// Installs a pass-owned program once. A duplicate ID would leave the
  /// earlier pass holding a deleted GPU handle, so reject it before compiling.
  /// Use [publish] or [tryReload] for an intentional replacement.
  CompiledProgram publishNew(ProgramSource source) {
    _requireUnusedId(source.id);
    return publish(source);
  }

  void _requireUnusedId(String id) {
    if (_live.containsKey(id)) {
      throw StateError('program ID is already installed: $id');
    }
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
        final next = snapshot[slot];
        // Only bound values changed: they are checked, but the program is
        // still the right one.
        if (next != null &&
            _live[source.id]!.isHostOverride &&
            (_overrides[slot]?.sameStages(next) ?? false)) {
          _validateOverride(source, slot, next);
          continue;
        }
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
      live.isHostOverride = _overrideHandles.containsKey(entry.value);
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
    _overrideHandles.clear();
    _variantSources.clear();
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
    return _compileOverride(
      source,
      slot!,
      replacement,
      allowFallback ?? fallbackToDefaults,
    );
  }

  GpuObject _compileOverride(
    ProgramSource source,
    ShaderTarget target,
    ShaderOverride replacement,
    bool allowFallback,
  ) {
    final contract = target.contract;
    try {
      _validateOverride(source, contract, replacement);
      // A host shader may ignore any engine input, and drivers strip what it
      // ignores. Setting a stripped uniform is a no-op, so the required lists
      // apply to the built-in sources only.
      final handle = _device.compileProgram(
        vertexSource: replacement.vertex ?? source.vertexSource,
        fragmentSource:
            replacement.fragmentFor(contract) ?? source.fragmentSource,
        requiredAttributes: const [],
        requiredUniforms: const [],
      );
      _overrideErrors.remove(target);
      _overrideHandles[handle] = target;
      return handle;
    } on ShaderCompileException catch (error) {
      if (!allowFallback) rethrow;
      rejectedReloadCount += 1;
      _overrideErrors[target] = error.toString();
      return _device.compileProgram(
        vertexSource: source.vertexSource,
        fragmentSource: source.fragmentSource,
        requiredAttributes: source.requiredAttributes,
        requiredUniforms: source.requiredUniforms,
      );
    }
  }

  void _validateOverride(
    ProgramSource source,
    ShaderSlot slot,
    ShaderOverride replacement,
  ) {
    if (replacement.effect != null && slot.effectInput == null) {
      final supported = ShaderSlot.values
          .where((candidate) => candidate.effectInput != null)
          .map((candidate) => candidate.name);
      throw ShaderCompileException(
        ShaderCompileStage.validation,
        '${source.id} has no single color input for ShaderOverride.effect; '
        'it works on ${supported.join(', ')}. Use a full fragment stage here',
      );
    }
    final fragmentSource = replacement.fragmentFor(slot);
    _validateStageInterface(source, replacement.vertex, fragmentSource);
    if (fragmentSource != null) {
      _validateFragmentOutputs(
        source.id,
        source.fragmentSource,
        fragmentSource,
      );
    }
    _validateHostBindings(source, slot, replacement);
  }

  Set<String> _engineUniforms(ProgramSource source) => {
    for (final stage in [source.vertexSource, source.fragmentSource])
      for (final declaration in stageDeclarations(stage, source.id))
        if (declaration.qualifier == 'uniform') declaration.name,
  };

  void _validateHostBindings(
    ProgramSource source,
    ShaderSlot slot,
    ShaderOverride replacement,
  ) {
    final engine = _engineUniforms(source);
    final declared = declaredUniforms(slot, replacement);
    void check(String name, String type) {
      if (engine.contains(name)) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '${source.id} uniform $name is set by the renderer; '
          'give the host value another name',
        );
      }
      final actual = declared[name];
      if (actual == null) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '${source.id} binds $name but its shader declares no such uniform',
        );
      }
      if (actual != type) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '${source.id} uniform $name is $actual in the shader, not $type',
        );
      }
    }

    replacement.uniforms.forEach((name, value) => check(name, value.glslType));
    for (final name in replacement.textures.keys) {
      check(name, 'sampler2D');
    }
    for (final (name, type) in const [
      (ShaderOverride.timeUniform, 'float'),
      (ShaderOverride.resolutionUniform, 'vec2'),
    ]) {
      final actual = declared[name];
      if (actual != null && actual != type) {
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          '${source.id} must declare $name as $type, not $actual',
        );
      }
    }
  }

  void _validateStageInterface(
    ProgramSource source,
    String? vertexSource,
    String? fragmentSource,
  ) {
    final defaultVertex = stageDeclarations(source.vertexSource, source.id);
    final defaultFragment = stageDeclarations(source.fragmentSource, source.id);
    final vertex = vertexSource == null
        ? defaultVertex
        : stageDeclarations(vertexSource, source.id);
    final fragment = fragmentSource == null
        ? defaultFragment
        : stageDeclarations(fragmentSource, source.id);

    for (final attribute in source.attributeLocations.entries) {
      final original = _declarationFor(defaultVertex, 'in', attribute.key);
      final supplied = _declarationFor(vertex, 'in', attribute.key);
      // An attribute the host leaves out is simply unused.
      if (supplied == null) continue;
      if (original == null ||
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

  ShaderDeclaration? _declarationFor(
    List<ShaderDeclaration> declarations,
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
    for (final trimmed in topLevelStatements(source, programId)) {
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

  void _checkOpenOverrides(PreparedShaderOverrides prepared) {
    if (!identical(_openOverrides, prepared) ||
        prepared.state != ProgramSetCandidateState.prepared) {
      throw StateError('shader override candidate is not open');
    }
  }

  void _deletePrograms(Iterable<CompiledProgram> programs) {
    for (final program in programs) {
      _overrideHandles.remove(program.handle);
      _device.deleteProgram(program.handle);
    }
  }

  void _deleteHandles(Iterable<GpuObject> handles) {
    for (final handle in handles) {
      _overrideHandles.remove(handle);
      _device.deleteProgram(handle);
    }
  }
}
