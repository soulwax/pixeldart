import 'dart:io';

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/core/scene_renderer_impl.dart' show ResourceLibraryImpl;

import 'fake_gpu_device.dart';

// ParticleEmitter.emitAt (exact-rate streaming from many sources), colour
// gradients bound to per-age materials, and the soft particle material.

void check(bool condition, String message) {
  if (!condition) throw StateError('particle streaming: $message');
}

final class _CollectingEncoder implements RenderEncoder {
  final items = <RetainedItemDescriptor>[];

  @override
  void submit(RetainedItemDescriptor item) => items.add(item);
}

FrameInput _frame() => FrameInput(
  camera: CameraView.look(
    eye: const Vec3(0, 0, 10),
    forward: const Vec3(0, 0, -1),
    fovYRadians: 1.0,
    aspect: 16 / 9,
    near: 0.1,
    far: 100,
  ),
  environment: const FrameEnvironment(),
  post: PostProcessState.off,
  frameIndex: 1,
  historyEpoch: 0,
  noiseSeed: 7,
  timeSeconds: 1,
);

void main() {
  final resources = ResourceLibraryImpl(FakeGpuDevice());
  const mesh = MeshHandle(1, 1, 'quad');

  // 1. emitAt hits the requested rate exactly over many uneven frames, per
  //    source, independently.
  {
    final emitter = ParticleEmitter(mesh: mesh, material: const MaterialHandle(2, 1, 'm'), minLifetime: 100, maxParticles: 5000);
    var a = 0, b = 0;
    for (var i = 0; i < 600; i++) {
      final dt = i.isEven ? 0.013 : 0.021; // 10.2 s total
      a += emitter.emitAt(const Vec3(0, 0, 0), 30, dt, source: 'a');
      b += emitter.emitAt(const Vec3(5, 0, 0), 7.5, dt, source: 'b');
    }
    check(a == 306, 'source a must emit 30/s × 10.2 s = 306, got $a');
    check(b == 76, 'source b must emit 7.5/s × 10.2 s = 76 (floor), got $b');
    check(emitter.activeCount == a + b, 'every streamed particle is live');
  }

  // 2. A colour gradient binds to per-age materials and is applied by age.
  {
    final base = ParticleMaterials.softDefinition(resources, key: 'fire');
    final emitter = ParticleEmitter(
      mesh: mesh,
      material: resources.registerMaterial(base),
      minLifetime: 1,
      maxLifetime: 1,
      maxParticles: 64,
      colorGradient: ParticleColorGradient(const [
        ParticleColorStop(0, LinearColor(1, 1, 0)),
        ParticleColorStop(1, LinearColor(1, 0, 0)),
      ]),
    );
    check(emitter.needsColorGradientBinding, 'an unbound gradient is reported');
    emitter.bindColorGradient(resources, base, steps: 5);
    check(emitter.isColorGradientBound && !emitter.needsColorGradientBinding, 'binding is recorded');

    emitter.burst(1, position: Vec3.zero);
    final young = _CollectingEncoder();
    emitter.submit(young, _frame());
    final youngColor = resources.materials.resolve(young.items.single.material);
    check(youngColor.tintG > 0.9, 'a newborn particle uses the gradient start (yellow), got G=${youngColor.tintG}');

    emitter.update(0.9);
    final old = _CollectingEncoder();
    emitter.submit(old, _frame());
    final oldColor = resources.materials.resolve(old.items.single.material);
    check(oldColor.tintG < 0.3, 'an old particle uses the gradient end (red), got G=${oldColor.tintG}');
    check(oldColor.albedoTexture == base.albedoTexture, 'gradient materials keep the base textures');
  }

  // 3. The soft material: one shared texture, bound as albedo and emissive.
  {
    final a = resources.materials.resolve(ParticleMaterials.soft(resources, key: 'a', glow: 3));
    final b = resources.materials.resolve(ParticleMaterials.soft(resources, key: 'b'));
    check(a.albedoTexture != null && a.albedoTexture == b.albedoTexture, 'the soft texture is shared');
    check(a.emissiveTexture == a.albedoTexture, 'the soft texture doubles as the emissive map');
    check(a.alphaMode == AlphaMode.blended && a.emissiveStrength == 3, 'soft material is blended and glows');
  }

  stdout.writeln('Particle streaming fixtures passed.');
}
