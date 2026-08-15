import 'dart:io';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
  final bridge = File('external/pixeldart/tools/assets/fbx_blender_export.py');
  check(bridge.existsSync(), 'canonical Blender bridge exists');
  final source = bridge.readAsStringSync();
  for (final marker in [
    'use_custom_normals=True',
    'export_normals=True',
    'export_tangents=True',
    'export_format="GLB"',
    '--source',
    '--out',
  ]) {
    check(source.contains(marker), 'bridge retains $marker');
  }
  check(
    !source.contains('package:quarantine'),
    'bridge has no game dependency',
  );
  print('RF-02 Blender bridge contract passed.');
}
