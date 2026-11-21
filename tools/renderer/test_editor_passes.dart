import 'package:pixeldart/rendering/api/editor_overlay.dart';
import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/math/vec.dart';
import 'package:pixeldart/rendering/passes/editor_overlay_pass.dart';

import 'fake_gpu_device.dart';

void _assert(bool cond, String msg) {
  if (!cond) throw StateError('test_editor_passes failed: $msg');
}

void main() {
  // 1. RGBA8 24-bit ID-buffer encode/decode round-trip
  for (final id in [0, 1, 42, 255, 256, 65535, 1234567, 0xFFFFFF]) {
    final (r, g, b, a) = EditorIdBufferCodec.encodeRgba8(id);
    _assert(a == 255, 'alpha must be 255');
    final decoded = EditorIdBufferCodec.decodeRgba8(r, g, b);
    _assert(decoded == id, 'ID $id round-trip failed (got $decoded)');
  }

  // 2. Grid + gizmo overlay vertex upload & clean zero-leak dispose
  final device = FakeGpuDevice();
  final pass = EditorOverlayPass(device);
  pass.updateEditorOverlay(
    const EditorOverlayState(
      grid: EditorGridSpec(enabled: true, cellSize: 1.0, majorEvery: 5),
      lines: [
        EditorGizmoLine(
          start: Vec3.zero,
          end: Vec3(1, 0, 0),
          color: LinearColor(1, 0, 0),
        ),
      ],
      selectedObjectIds: {42},
    ),
  );

  final vertCount = pass.uploadOverlayLines(gridHalfExtent: 4);
  // 9 lines along X + 9 lines along Z = 18 grid lines + 1 gizmo line = 19 lines = 38 vertices
  _assert(vertCount == 38, 'expected 38 overlay vertices, got $vertCount');

  final (r, g, b, _) = EditorIdBufferCodec.encodeRgba8(42);
  pass.recordPickReadback(r, g, b);
  _assert(pass.readLastPickObjectId() == 42, 'picked object ID mismatch');

  pass.dispose();
  _assert(device.liveObjectCount == 0, 'EditorOverlayPass leaked GPU objects');
  print('Editor overlay & ID-buffer picking pass tests passed.');
}
