import '../math/bounds.dart';
import '../math/transform.dart';
import 'handles.dart';

enum DrawMode { opaque, masked, blended }

/// §8.6's "additive shafts use their own blend state" — only meaningful
/// when [RetainedItemDescriptor.drawMode] is [DrawMode.blended]; opaque and
/// masked items never read this field. [alpha] is the existing default
/// (`DrawStateDescriptor.blendedDefault`, `srcAlpha`/`oneMinusSrcAlpha`) —
/// every blended item before RV-09 rung 6 implicitly meant this one, so it
/// stays the default rather than changing any existing caller's behavior.
enum BlendMode { alpha, additive }

/// A persistent retained-scene item (§5.5): stable mesh/material
/// registration while transform, tint, visibility, and effect flags update
/// in place. Static room dressing is not re-submitted or re-uploaded every
/// frame.
final class RetainedItemDescriptor {
  final MeshHandle mesh;
  final MaterialHandle material;
  final Transform transform;
  final int visibilityMask;
  final DrawMode drawMode;
  final BlendMode blendMode;
  final bool castsShadow;
  final bool receivesShadow;
  final int sortTiebreaker;
  final int? instanceFamilyKey;

  const RetainedItemDescriptor({
    required this.mesh,
    required this.material,
    this.transform = Transform.identity,
    this.visibilityMask = -1,
    this.drawMode = DrawMode.opaque,
    this.blendMode = BlendMode.alpha,
    this.castsShadow = true,
    this.receivesShadow = true,
    this.sortTiebreaker = 0,
    this.instanceFamilyKey,
  });

  void validate() {
    transform.validate();
  }
}

/// A retained item plus the world-space bounds computed for it by the
/// [RenderWorld] implementation, exposed read-only so callers and tests can
/// reason about culling without depending on a GPU backend.
abstract interface class RetainedItemView {
  InstanceId get id;
  RetainedItemDescriptor get descriptor;
  Aabb get worldBounds;
}

/// Owns persistent shells, doors, shutters, fixtures, furniture, and props
/// (§5.5). Renderer-created; callers dispose worlds before the renderer
/// (§5.1).
abstract interface class RenderWorld {
  InstanceId addItem(RetainedItemDescriptor descriptor);
  void updateItem(InstanceId id, RetainedItemDescriptor descriptor);
  void removeItem(InstanceId id);
  RetainedItemView itemView(InstanceId id);
  Iterable<RetainedItemView> get items;
  void dispose();
}

/// Frame-local shafts, motes, breath, rain, debug geometry, and
/// compatibility immediate draws (§5.5). Borrowed for one frame; invalid
/// after `endFrame()`/`abortFrame()`.
abstract interface class RenderEncoder {
  void submit(RetainedItemDescriptor transientItem);
}
