import 'package:pixeldart/rendering/core/frame_telemetry.dart';
import 'package:pixeldart/rendering/rendering.dart';

void main() {
  final telemetry = FrameDrawTelemetry();
  telemetry.beginPass('world');
  telemetry.recordElements(6);
  telemetry.recordArrays(9, instanceCount: 2);
  telemetry.beginPass('present');
  telemetry.recordArrays(3);
  telemetry.beginPass('cull');
  telemetry.recordCull(triangles: 4, instances: 1);

  final snapshot = telemetry.snapshot();
  final world = snapshot['world'];
  if (world == null ||
      world.drawCalls != 2 ||
      world.trianglesSubmitted != 8 ||
      world.instancesSubmitted != 3) {
    throw StateError('world telemetry did not preserve draw semantics');
  }
  final present = snapshot['present'];
  if (present == null ||
      present.drawCalls != 1 ||
      present.trianglesSubmitted != 1) {
    throw StateError('present telemetry did not preserve full-screen draw');
  }
  final cull = snapshot['cull'];
  if (cull == null || cull.trianglesCulled != 4 || cull.instancesCulled != 1) {
    throw StateError('cull telemetry did not preserve visibility totals');
  }

  final stats = FrameStats(frameIndex: 4, passStats: snapshot);
  if (stats.pass('missing').drawCalls != 0 ||
      stats.pass('world').trianglesSubmitted != 8) {
    throw StateError('FrameStats pass lookup is not deterministic');
  }
  print('Frame draw telemetry fixture passed.');
}
