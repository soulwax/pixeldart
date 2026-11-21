/// Renderer-side Editor Overlay & On-Demand ID-Buffer Picking Pass (`[S2-B]`).
library;

import 'dart:typed_data';

import '../api/editor_overlay.dart';
import '../webgl/device_api.dart';

/// Packs and unpacks 24-bit object IDs into RGBA8 channels for the editor
/// ID-buffer pick target.
abstract final class EditorIdBufferCodec {
  static (int r, int g, int b, int a) encodeRgba8(int objectId) {
    final id = objectId.clamp(0, 0xFFFFFF);
    return (id & 0xFF, (id >> 8) & 0xFF, (id >> 16) & 0xFF, 255);
  }

  static int decodeRgba8(int r, int g, int b) =>
      (r & 0xFF) | ((g & 0xFF) << 8) | ((b & 0xFF) << 16);
}

/// CPU-side geometry builder & GPU upload driver for [EditorOverlayState]
/// (infinite fade grid lines, gizmo line segments, and on-demand pick target).
final class EditorOverlayPass implements EditorOverlaySink {
  final GpuDevice device;
  EditorOverlayState _state = const EditorOverlayState();
  GpuObject? _lineBuffer;
  int _lineBufferCapacityBytes = 0;
  int? _lastPickedObjectId;

  EditorOverlayPass(this.device);

  EditorOverlayState get state => _state;

  @override
  void updateEditorOverlay(EditorOverlayState state) {
    _state = state;
  }

  @override
  int? readLastPickObjectId() => _lastPickedObjectId;

  /// Records a completed GPU ID-buffer readback pixel `(r, g, b)`.
  void recordPickReadback(int r, int g, int b) {
    final id = EditorIdBufferCodec.decodeRgba8(r, g, b);
    _lastPickedObjectId = id == 0 ? null : id;
  }

  /// Packs grid lines + gizmo line segments into interleaved `[x, y, z, r, g, b]`
  /// floats (6 floats per vertex, 2 vertices per line segment).
  Float32List buildLineVertices({int gridHalfExtent = 10}) {
    final verts = <double>[];

    if (_state.grid.enabled && gridHalfExtent > 0) {
      final step = _state.grid.cellSize;
      final extent = gridHalfExtent * step;
      for (var i = -gridHalfExtent; i <= gridHalfExtent; i++) {
        final coord = i * step;
        final isMajor = i == 0 || (i % _state.grid.majorEvery == 0);
        final c = isMajor ? _state.grid.majorColor : _state.grid.minorColor;
        switch (_state.grid.plane) {
          case EditorGridPlane.xz:
            verts.addAll([-extent, 0, coord, c.r, c.g, c.b]);
            verts.addAll([extent, 0, coord, c.r, c.g, c.b]);
            verts.addAll([coord, 0, -extent, c.r, c.g, c.b]);
            verts.addAll([coord, 0, extent, c.r, c.g, c.b]);
          case EditorGridPlane.xy:
            verts.addAll([-extent, coord, 0, c.r, c.g, c.b]);
            verts.addAll([extent, coord, 0, c.r, c.g, c.b]);
            verts.addAll([coord, -extent, 0, c.r, c.g, c.b]);
            verts.addAll([coord, extent, 0, c.r, c.g, c.b]);
          case EditorGridPlane.yz:
            verts.addAll([0, -extent, coord, c.r, c.g, c.b]);
            verts.addAll([0, extent, coord, c.r, c.g, c.b]);
            verts.addAll([0, coord, -extent, c.r, c.g, c.b]);
            verts.addAll([0, coord, extent, c.r, c.g, c.b]);
        }
      }
    }

    for (final line in _state.lines) {
      final c = line.color;
      verts.addAll([line.start.x, line.start.y, line.start.z, c.r, c.g, c.b]);
      verts.addAll([line.end.x, line.end.y, line.end.z, c.r, c.g, c.b]);
    }

    return Float32List.fromList(verts);
  }

  /// Uploads current grid & gizmo vertices to the GPU buffer and returns the
  /// uploaded vertex count.
  int uploadOverlayLines({int gridHalfExtent = 10}) {
    final data = buildLineVertices(gridHalfExtent: gridHalfExtent);
    if (data.isEmpty) return 0;
    final bytes = data.lengthInBytes;
    if (_lineBuffer == null || _lineBufferCapacityBytes < bytes) {
      if (_lineBuffer != null) device.deleteBuffer(_lineBuffer!);
      _lineBufferCapacityBytes = bytes;
      _lineBuffer = device.createBuffer(
        GpuBufferDescriptor(
          byteLength: bytes,
          usage: GpuBufferUsage.dynamicDraw,
        ),
      );
    }
    device.uploadBuffer(_lineBuffer!, data);
    return data.length ~/ 6;
  }

  void dispose() {
    if (_lineBuffer != null) {
      device.deleteBuffer(_lineBuffer!);
      _lineBuffer = null;
      _lineBufferCapacityBytes = 0;
    }
  }
}
