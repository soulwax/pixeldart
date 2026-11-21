/// Renderer-side EditorOverlay contract for Volition Studio Scene View (S2-0):
/// infinite fade grid, gizmo lines/icons, ID-buffer picking, and selection
/// outline specification.
library;

import '../math/vec.dart';
import 'lights.dart';

/// Principal plane for the infinite editor reference grid.
enum EditorGridPlane { xz, xy, yz }

/// Infinite fade-grid configuration rendered in the Scene view.
final class EditorGridSpec {
  final bool enabled;
  final EditorGridPlane plane;
  final double cellSize;
  final int majorEvery;
  final double fadeDistance;
  final LinearColor minorColor;
  final LinearColor majorColor;

  const EditorGridSpec({
    this.enabled = true,
    this.plane = EditorGridPlane.xz,
    this.cellSize = 1.0,
    this.majorEvery = 10,
    this.fadeDistance = 120.0,
    this.minorColor = const LinearColor(0.28, 0.30, 0.34),
    this.majorColor = const LinearColor(0.45, 0.48, 0.54),
  });
}

/// Single 3D line segment submitted to the editor gizmo overlay pass.
final class EditorGizmoLine {
  final Vec3 start;
  final Vec3 end;
  final LinearColor color;
  final bool depthTest;

  const EditorGizmoLine({
    required this.start,
    required this.end,
    required this.color,
    this.depthTest = false,
  });
}

/// Billboarded component icon (camera, light, audio, probe) in the Scene view.
final class EditorGizmoIcon {
  final Vec3 worldPosition;
  final String iconId;
  final LinearColor tint;
  final double sizePixels;
  final int objectId;

  const EditorGizmoIcon({
    required this.worldPosition,
    required this.iconId,
    this.tint = const LinearColor(1.0, 1.0, 1.0),
    this.sizePixels = 24.0,
    this.objectId = 0,
  });
}

/// On-demand ID-buffer pick query at pixel coordinates `(pixelX, pixelY)`.
final class EditorPickRequest {
  final int pixelX;
  final int pixelY;
  final int viewportWidth;
  final int viewportHeight;

  const EditorPickRequest({
    required this.pixelX,
    required this.pixelY,
    required this.viewportWidth,
    required this.viewportHeight,
  });
}

/// Complete per-frame overlay description consumed by `[S2-B]` editor passes.
final class EditorOverlayState {
  final EditorGridSpec grid;
  final List<EditorGizmoLine> lines;
  final List<EditorGizmoIcon> icons;
  final Set<int> selectedObjectIds;
  final LinearColor selectionOutlineColor;
  final double selectionOutlineWidth;
  final EditorPickRequest? pickRequest;

  const EditorOverlayState({
    this.grid = const EditorGridSpec(),
    this.lines = const [],
    this.icons = const [],
    this.selectedObjectIds = const {},
    this.selectionOutlineColor = const LinearColor(1.0, 0.58, 0.12),
    this.selectionOutlineWidth = 2.0,
    this.pickRequest,
  });
}

/// Optional interface implemented by renderers that render Studio editor
/// overlays and on-demand object-ID picking buffers (`[S2-B]`).
abstract interface class EditorOverlaySink {
  void updateEditorOverlay(EditorOverlayState state);
  int? readLastPickObjectId();
}
