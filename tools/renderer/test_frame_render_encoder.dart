import 'package:pixeldart/rendering/core/frame_render_encoder.dart';
import 'package:pixeldart/rendering/rendering.dart';

void main() {
  final encoder = FrameRenderEncoder();
  _throws(() => encoder.submit(_item()), 'submit before begin');
  encoder.beginFrame();
  encoder.submit(_item());
  if (encoder.items.length != 1 ||
      encoder.state != FrameRenderEncoderState.active) {
    throw StateError('active encoder did not retain its submission');
  }
  final ended = encoder.endFrame();
  if (ended.length != 1 || encoder.state != FrameRenderEncoderState.ended) {
    throw StateError('endFrame did not close the encoder');
  }
  _throws(() => encoder.submit(_item()), 'submit after end');

  encoder.beginFrame();
  encoder.submit(_item());
  encoder.abortFrame();
  if (encoder.items.isNotEmpty ||
      encoder.state != FrameRenderEncoderState.aborted) {
    throw StateError('abortFrame retained transient submissions');
  }
  print('Renderer transient encoder lifecycle fixtures passed.');
}

RetainedItemDescriptor _item() {
  return RetainedItemDescriptor(
    mesh: const MeshHandle(0, 1, 'transient-test'),
    material: const MaterialHandle(0, 1, 'transient-test'),
    transform: Transform.identity,
  );
}

void _throws(void Function() action, String label) {
  try {
    action();
  } catch (_) {
    return;
  }
  throw StateError('$label did not throw');
}
