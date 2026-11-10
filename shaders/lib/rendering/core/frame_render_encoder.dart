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
