import 'dart:io';

/// Anti-cap regression gate (`[S1-B]`):
/// Scans `shaders/rendering/{world,shadow,depth}/**` and fails on any
/// fixed-size `uniform mat4 <name>[<N>]` array declaration.
void main() {
  final forbidden = RegExp(r'\buniform\s+mat4\s+\w+\s*\[\s*\d+\s*\]');
  final dirs = [
    Directory('shaders/rendering/world'),
    Directory('shaders/rendering/shadow'),
    Directory('shaders/rendering/depth'),
  ];

  var scanned = 0;
  final violations = <String>[];

  for (final dir in dirs) {
    if (!dir.existsSync()) {
      throw StateError('Missing shader directory: ${dir.path}');
    }
    for (final entity in dir.listSync(recursive: true)) {
      if (entity is! File) continue;
      scanned++;
      final lines = entity.readAsLinesSync();
      for (var i = 0; i < lines.length; i++) {
        final match = forbidden.firstMatch(lines[i]);
        if (match != null) {
          violations.add('${entity.path}:${i + 1}: ${match.group(0)}');
        }
      }
    }
  }

  if (scanned == 0) {
    throw StateError('No shader files scanned in world/shadow/depth');
  }
  if (violations.isNotEmpty) {
    throw StateError(
      'Fixed uniform mat4[...] caps found in world/shadow/depth shaders:\n'
      '${violations.join('\n')}',
    );
  }
  print(
    'No fixed uniform mat4[N] caps found across $scanned world/shadow/depth shaders.',
  );
}
