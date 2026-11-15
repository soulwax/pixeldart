/// Built-in debug visualization modes for diagnostics and inspection.
enum DebugViewMode {
  none('none'),
  albedo('albedo'),
  normals('normals'),
  roughness('roughness'),
  lightHeatmap('light-heatmap'),
  overdraw('overdraw');

  final String id;

  const DebugViewMode(this.id);

  bool get isActive => this != DebugViewMode.none;

  static DebugViewMode? fromString(String? name) {
    if (name == null || name.isEmpty) return null;
    return switch (name.toLowerCase().replaceAll('-', '_')) {
      'none' => DebugViewMode.none,
      'albedo' => DebugViewMode.albedo,
      'normals' || 'normal' => DebugViewMode.normals,
      'roughness' || 'rough' => DebugViewMode.roughness,
      'light_heatmap' || 'lightheatmap' => DebugViewMode.lightHeatmap,
      'overdraw' => DebugViewMode.overdraw,
      _ => null,
    };
  }

  /// Canonical uniform name passed to shaders when debug views are active.
  static const String debugViewModeUniform = 'uDebugViewMode';

  /// Integer code associated with this view mode for uniform upload.
  int get code => switch (this) {
    DebugViewMode.none => 0,
    DebugViewMode.albedo => 1,
    DebugViewMode.normals => 2,
    DebugViewMode.roughness => 3,
    DebugViewMode.lightHeatmap => 4,
    DebugViewMode.overdraw => 5,
  };
}
