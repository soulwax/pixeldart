import 'dart:typed_data';

import 'package:pixeldart/rendering/core/frame_queue.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/resource_registry.dart';

void main() {
  _noCreateDeleteInSteadyStateSubmission();
  _abandonedFrameCannotReplay();
  print('Renderer frame queue fixtures passed.');
}

ResourceRegistry<MeshHandle, MeshData> _meshRegistryWithUnitCube() {
  final registry = ResourceRegistry<MeshHandle, MeshData>(
    (slot, generation, label) => MeshHandle(slot, generation, label),
  );
  registry.declare(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(
        VertexLayoutDescriptor.compatibility14.strideFloats * 3,
      ),
      localBounds: const Aabb(Vec3(-0.5, -0.5, -0.5), Vec3(0.5, 0.5, 0.5)),
    ),
  );
  return registry;
}

MaterialHandle _fakeMaterial() => const MaterialHandle(0, 1, 'fake');

void _noCreateDeleteInSteadyStateSubmission() {
  final meshes = _meshRegistryWithUnitCube();
  final mesh = meshes.liveDescriptors().first.$1;
  final queue = FrameQueue();

  for (var frame = 0; frame < 5; frame++) {
    queue.beginFrame();
    for (var i = 0; i < 8; i++) {
      queue.submit(
        RetainedItemDescriptor(mesh: mesh, material: _fakeMaterial()),
      );
    }
    queue.endFrame();
  }

  queue.beginFrame();
  for (var i = 0; i < 3; i++) {
    queue.submit(RetainedItemDescriptor(mesh: mesh, material: _fakeMaterial()));
  }
  final submitted = queue.endFrame();
  if (submitted.length != 3) {
    throw StateError(
      'a smaller frame after warm-up must report only its own 3 submissions, '
      'not stale entries from the earlier 8-item frames — got ${submitted.length}',
    );
  }
}

void _abandonedFrameCannotReplay() {
  final meshes = _meshRegistryWithUnitCube();
  final mesh = meshes.liveDescriptors().first.$1;
  final queue = FrameQueue();

  queue.beginFrame();
  queue.submit(RetainedItemDescriptor(mesh: mesh, material: _fakeMaterial()));
  queue.submit(RetainedItemDescriptor(mesh: mesh, material: _fakeMaterial()));
  queue.abortFrame();

  bool threw = false;
  try {
    queue.endFrame();
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError(
      'endFrame after abortFrame must not succeed and replay the abandoned submissions',
    );
  }

  queue.beginFrame();
  final submitted = queue.endFrame();
  if (submitted.isNotEmpty) {
    throw StateError(
      'the next frame after an abort must start clean, not carry over the aborted frame\'s items',
    );
  }
}
