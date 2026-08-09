import '../api/handles.dart';
import '../api/scene.dart';
import '../math/bounds.dart';
import '../math/vec.dart';

final class _TransientItemView implements RetainedItemView {
  @override
  final InstanceId id;
  @override
  final RetainedItemDescriptor descriptor;
  @override
  final Aabb worldBounds;

  const _TransientItemView(this.id, this.descriptor, this.worldBounds);
}

/// RV-09 rung 6's generic transient submission: a concrete implementation
/// of `RenderEncoder` (§5.5) for frame-local shafts, motes, breath, rain,
/// and debug geometry — the same [RetainedItemDescriptor] persistent items
/// already use, so a transient item reaches the exact same draw path
/// (`ShadowedWorldFeature._drawBatch`) with no separate rendering code of
/// its own. `submit()` wraps each descriptor in a minimal `RetainedItemView`
/// (a fixed-radius bounds around the item's own transform translation,
/// since no mesh-local-bounds resolver is available at submission time —
/// adequate for this proof; a production caller with real mesh data would
/// compute tighter bounds). [clear] must be called once per frame, before
/// any `submit()` calls that frame — `RenderEncoder`'s own contract
/// ("borrowed for one frame; invalid after `endFrame()`/`abortFrame()`")
/// is enforced by the same small runtime state machine as [FrameQueue].
enum FrameRenderEncoderState { idle, active, ended, aborted }

final class FrameRenderEncoder implements RenderEncoder {
  final List<RetainedItemView> _items = [];
  FrameRenderEncoderState _state = FrameRenderEncoderState.idle;
  int _nextSlot = 0;

  FrameRenderEncoderState get state => _state;

  void beginFrame() {
    if (_state == FrameRenderEncoderState.active) {
      throw StateError(
        'FrameRenderEncoder.beginFrame called twice without end/abort',
      );
    }
    _items.clear();
    _nextSlot = 0;
    _state = FrameRenderEncoderState.active;
  }

  /// Backwards-compatible spelling for the original bootstrap caller.
  void clear() => beginFrame();

  @override
  void submit(RetainedItemDescriptor transientItem) {
    if (_state != FrameRenderEncoderState.active) {
      throw StateError(
        'FrameRenderEncoder.submit called outside an active frame',
      );
    }
    transientItem.validate();
    final center = transientItem.transform.translation;
    const halfExtent = Vec3(0.5, 0.5, 0.5);
    _items.add(
      _TransientItemView(
        InstanceId(_nextSlot++, 1),
        transientItem,
        Aabb(center - halfExtent, center + halfExtent),
      ),
    );
  }

  List<RetainedItemView> get items => List.unmodifiable(_items);

  List<RetainedItemView> endFrame() {
    if (_state != FrameRenderEncoderState.active) {
      throw StateError(
        'FrameRenderEncoder.endFrame called without an active frame',
      );
    }
    _state = FrameRenderEncoderState.ended;
    return items;
  }

  void abortFrame() {
    if (_state != FrameRenderEncoderState.active) {
      throw StateError(
        'FrameRenderEncoder.abortFrame called without an active frame',
      );
    }
    _items.clear();
    _nextSlot = 0;
    _state = FrameRenderEncoderState.aborted;
  }
}
