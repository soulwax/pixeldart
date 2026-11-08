/// Named GLSL source plus the binding metadata a program needs before it
/// can be trusted to draw (§7.2). Attribute locations and sampler unit
/// assignments are explicit and fixed per program, never left to driver
/// allocation order.
final class ProgramSource {
  final String id;
  final String vertexSource;
  final String fragmentSource;
  final Map<String, int> attributeLocations;
  final Map<String, int> samplerUnits;
  final List<String> requiredUniforms;

  const ProgramSource({
    required this.id,
    required this.vertexSource,
    required this.fragmentSource,
    required this.attributeLocations,
    this.samplerUnits = const {},
    this.requiredUniforms = const [],
  });

  List<String> get requiredAttributes => attributeLocations.keys.toList();

  void validate() {
    if (id.isEmpty) {
      throw ArgumentError('ProgramSource.id must not be empty');
    }
    final usedLocations = <int>{};
    for (final entry in attributeLocations.entries) {
      if (entry.value < 0) {
        throw ArgumentError(
          'ProgramSource "$id": attribute "${entry.key}" has a negative location',
        );
      }
      if (!usedLocations.add(entry.value)) {
        throw ArgumentError(
          'ProgramSource "$id": duplicate attribute location ${entry.value}',
        );
      }
    }
    final usedUnits = <int>{};
    for (final entry in samplerUnits.entries) {
      if (entry.value < 0) {
        throw ArgumentError(
          'ProgramSource "$id": sampler "${entry.key}" has a negative unit',
        );
      }
      if (!usedUnits.add(entry.value)) {
        throw ArgumentError(
          'ProgramSource "$id": duplicate sampler unit ${entry.value}',
        );
      }
    }
  }
}
