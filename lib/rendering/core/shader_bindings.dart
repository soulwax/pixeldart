import '../api/handles.dart';
import '../api/shaders.dart';
import '../webgl/device_api.dart';

typedef ShaderDeclaration = ({
  String qualifier,
  String type,
  String name,
  int? location,
});

List<ShaderDeclaration> stageDeclarations(String source, String programId) {
  final pattern = RegExp(
    r'^(?:layout\s*\(\s*location\s*=\s*(\d+)\s*\)\s*)?'
    r'(in|out|uniform)\s+(?:(?:lowp|mediump|highp)\s+)?'
    r'([A-Za-z_]\w*)\s+([A-Za-z_]\w*)'
    r'(?:\s*\[\s*(\d+)\s*\])?$',
  );
  final declarations = <ShaderDeclaration>[];
  for (final statement in topLevelStatements(source, programId)) {
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

List<String> topLevelStatements(String source, String programId) {
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

/// The uniforms an override declares, by name, with their GLSL types.
Map<String, String> declaredUniforms(ShaderSlot slot, ShaderOverride override) {
  final declared = <String, String>{};
  for (final source in [override.vertex, override.fragmentFor(slot)]) {
    if (source == null) continue;
    for (final declaration in stageDeclarations(source, slot.name)) {
      if (declaration.qualifier == 'uniform') {
        declared[declaration.name] = declaration.type;
      }
    }
  }
  return declared;
}

final class _SlotBindings {
  final ShaderOverride override;
  final Map<String, ShaderUniform> uniforms;
  final Map<String, TextureHandle> textures;
  final Map<String, int> units = {};
  final Set<String> dirty = {};
  final Map<String, String> declared;
  final bool usesTime;
  final bool usesResolution;
  GpuObject? applied;
  int appliedWidth = 0;
  int appliedHeight = 0;

  _SlotBindings(this.override, this.declared)
    : uniforms = {...override.uniforms},
      textures = {...override.textures},
      usesTime = declared[ShaderOverride.timeUniform] == 'float',
      usesResolution = declared[ShaderOverride.resolutionUniform] == 'vec2' {
    textures.keys.forEach(assignUnit);
  }

  void assignUnit(String name) {
    if (units.containsKey(name)) return;
    if (units.length >= ShaderOverride.maxTextures) {
      throw ArgumentError(
        'at most ${ShaderOverride.maxTextures} host textures per shader; '
        'cannot add $name',
      );
    }
    units[name] = ShaderOverride.firstTextureUnit + units.length;
  }
}

/// Host-owned uniform and texture values for every overridden slot.
///
/// The table outlives program libraries, so values set live survive a resize,
/// a graph rebuild and a context restore. GL keeps uniforms per program, so a
/// value is only sent when it changed or the program is new.
final class ShaderBindingTable {
  final Map<ShaderTarget, _SlotBindings> _slots = {};

  /// Adopts [overrides]. A slot whose override is unchanged keeps its live
  /// values; a new or edited override starts from the values it declares.
  void sync(Map<ShaderTarget, ShaderOverride> overrides) {
    // Registered sprite shaders are added and released one at a time.
    _slots.removeWhere(
      (target, _) =>
          target is! ShaderHandle &&
          target is! WorldShaderHandle &&
          !overrides.containsKey(target),
    );
    for (final entry in overrides.entries) {
      if (_slots[entry.key]?.override == entry.value) continue;
      add(entry.key, entry.value);
    }
  }

  void add(ShaderTarget target, ShaderOverride override) {
    Map<String, String> declared;
    try {
      declared = declaredUniforms(target.contract, override);
    } on ShaderCompileException {
      // Unparseable source has already fallen back to the default program.
      declared = const {};
    }
    _slots[target] = _SlotBindings(override, declared);
  }

  void remove(ShaderTarget target) => _slots.remove(target);

  bool hasUniform(ShaderTarget slot, String name) =>
      _slots[slot]?.uniforms.containsKey(name) ?? false;

  bool hasTexture(ShaderTarget slot, String name) =>
      _slots[slot]?.textures.containsKey(name) ?? false;

  void setUniform(ShaderTarget slot, String name, ShaderUniform value) {
    final bindings = _require(slot);
    if (bindings.uniforms[name] == value) return;
    _checkDeclared(slot, bindings, name, value.glslType);
    bindings.uniforms[name] = value;
    bindings.dirty.add(name);
  }

  void setTexture(ShaderTarget slot, String name, TextureHandle texture) {
    final bindings = _require(slot);
    if (bindings.textures[name] == texture) return;
    _checkDeclared(slot, bindings, name, 'sampler2D');
    bindings.assignUnit(name);
    bindings.textures[name] = texture;
    bindings.dirty.add(name);
  }

  /// Sends [slot]'s pending values to the bound [program] and binds its
  /// textures, which unlike uniforms are global state.
  void apply(
    ShaderTarget slot,
    GpuObject program,
    GpuDevice device, {
    required double timeSeconds,
    required int width,
    required int height,
    required GpuObject Function(TextureHandle) resolveTexture,
  }) {
    final bindings = _slots[slot];
    if (bindings == null) return;
    final fresh = !identical(bindings.applied, program);
    bindings.applied = program;
    for (final entry in bindings.uniforms.entries) {
      if (fresh || bindings.dirty.contains(entry.key)) {
        device.setUniform(entry.key, entry.value.toUniformValue());
      }
    }
    for (final entry in bindings.textures.entries) {
      final unit = bindings.units[entry.key]!;
      if (fresh || bindings.dirty.contains(entry.key)) {
        device.setUniform(entry.key, UniformValue.sampler(unit));
      }
      device.bindTexture(unit, resolveTexture(entry.value));
    }
    bindings.dirty.clear();
    if (bindings.usesTime) {
      device.setUniform(
        ShaderOverride.timeUniform,
        UniformValue.float1(timeSeconds),
      );
    }
    if (bindings.usesResolution &&
        (fresh ||
            bindings.appliedWidth != width ||
            bindings.appliedHeight != height)) {
      bindings.appliedWidth = width;
      bindings.appliedHeight = height;
      device.setUniform(
        ShaderOverride.resolutionUniform,
        ShaderUniform.vec2(
          width.toDouble(),
          height.toDouble(),
        ).toUniformValue(),
      );
    }
  }

  _SlotBindings _require(ShaderTarget slot) =>
      _slots[slot] ??
      (throw ArgumentError(
        'no ShaderOverride is installed on ${slot.label}; add one with '
        'setShader or the shaders map before binding values to it',
      ));

  void _checkDeclared(
    ShaderTarget slot,
    _SlotBindings bindings,
    String name,
    String type,
  ) {
    final declared = bindings.declared[name];
    if (declared == null) {
      throw ArgumentError(
        '${slot.label} override declares no uniform "$name"; it declares '
        '${bindings.declared.keys.toList()}',
      );
    }
    if (declared != type) {
      throw ArgumentError(
        '${slot.label} uniform "$name" is $declared in the shader, not $type',
      );
    }
  }
}
