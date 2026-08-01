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

/// Owns every live program and drives §7.2's atomic sequence: compile,
/// link, validate, assign samplers, publish, delete-the-old-one-only-after.
/// A failed candidate never replaces the last known-good program (§7.2,
/// and RV-03's gate: "invalid reload preserves the previous program").
final class ProgramLibrary {
  final GpuDevice _device;
  final Map<String, CompiledProgram> _live = {};

  int publishCount = 0;
  int rejectedReloadCount = 0;

  ProgramLibrary(this._device);

  CompiledProgram? programFor(String id) => _live[id];

  Iterable<CompiledProgram> get allPrograms => _live.values;

  /// Compiles [source] and, only on success, publishes it — deleting the
  /// prior program for the same id (if any) after the new one is live. On
  /// failure, throws and leaves any existing program for [source.id]
  /// untouched.
  CompiledProgram publish(ProgramSource source) {
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
    for (final program in _live.values) {
      _device.deleteProgram(program.handle);
    }
    _live.clear();
  }
}
