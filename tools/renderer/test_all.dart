import 'dart:io';

const List<String> _scripts = [
  'tools/renderer/test_math.dart',
  'tools/renderer/test_api.dart',
  'tools/renderer/test_webgl_device.dart',
  'tools/renderer/test_render_graph.dart',
  'tools/renderer/test_render_graph_positive.dart',
  'tools/renderer/test_program_library.dart',
  'tools/renderer/test_render_core.dart',
  'tools/renderer/test_frame_queue.dart',
  'tools/renderer/test_qmesh.dart',
  'tools/renderer/test_feature_graph.dart',
  'tools/renderer/test_safe_graph.dart',
  'tools/renderer/test_mesh_store.dart',
  'tools/renderer/test_texture_mips.dart',
  'tools/renderer/test_material_store.dart',
  'tools/renderer/test_texture_store.dart',
  'tools/renderer/test_msaa_resolve.dart',
  'tools/renderer/test_shadow_graph.dart',
  'tools/renderer/test_affine_uv.dart',
  'tools/renderer/test_alpha_mask.dart',
  'tools/renderer/test_zero_cost.dart',
];

void main() {
  var failures = 0;
  for (final script in _scripts) {
    stdout.writeln('--- $script ---');
    final result = Process.runSync('dart', ['run', script]);
    stdout.write(result.stdout);
    if (result.exitCode != 0) {
      failures += 1;
      stderr.write(result.stderr);
      stderr.writeln('FAILED: $script (exit ${result.exitCode})');
    }
  }

  if (failures == 0) {
    stdout.writeln('All ${_scripts.length} renderer test scripts passed.');
    return;
  }
  stderr.writeln(
    '$failures of ${_scripts.length} renderer test scripts failed.',
  );
  exit(1);
}
