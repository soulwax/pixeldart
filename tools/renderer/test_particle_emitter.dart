import 'package:pixeldart/pixeldart.dart';

void _require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void _throws(void Function() fn, String message) {
  try {
    fn();
  } catch (_) {
    return;
  }
  throw StateError('Expected failure: $message');
}

final class _CollectingEncoder implements RenderEncoder {
  final items = <RetainedItemDescriptor>[];

  @override
  void submit(RetainedItemDescriptor item) => items.add(item);
}

FrameInput _mockFrame({Vec3 eye = const Vec3(0, 0, 10), Vec3 forward = const Vec3(0, 0, -1)}) {
  return FrameInput(
    camera: CameraView.look(
      eye: eye,
      forward: forward,
      fovYRadians: 1.0,
      aspect: 16 / 9,
      near: 0.1,
      far: 100.0,
    ),
    environment: const FrameEnvironment(),
    post: PostProcessState.off,
    frameIndex: 1,
    historyEpoch: 0,
    noiseSeed: 42,
    timeSeconds: 1.0,
  );
}

void main() {
  const mesh = MeshHandle(1, 1, 'quad');
  const mat = MaterialHandle(2, 1, 'fire');

  // 1. Validation tests
  {
    _throws(
      () => ParticleEmitter(
        mesh: MeshHandle.invalid,
        material: mat,
      ),
      'Rejects invalid mesh',
    );
    _throws(
      () => ParticleEmitter(
        mesh: mesh,
        material: mat,
        rate: -5,
      ),
      'Rejects negative rate',
    );
    _throws(
      () => ParticleEmitter(
        mesh: mesh,
        material: mat,
        minLifetime: 2.0,
        maxLifetime: 1.0,
      ),
      'Rejects maxLifetime < minLifetime',
    );
  }

  // 2. Capacity, continuous rate, and burst tests
  {
    final emitter = ParticleEmitter(
      mesh: mesh,
      material: mat,
      rate: 50.0,
      minLifetime: 1.0,
      maxLifetime: 1.0,
      maxParticles: 100,
      seed: 42,
    );
    _require(emitter.activeCount == 0, 'Initially zero active particles');
    _require(emitter.capacity == 100, 'Capacity matches maxParticles');

    // Update 0.5s at 50 particles/s => ~25 particles spawned
    emitter.update(0.5);
    _require(emitter.activeCount == 25, 'Expected 25 active particles: got ${emitter.activeCount}');
    _require(emitter.totalSpawned == 25, 'Expected 25 total spawned');

    // Trigger explicit burst
    final burstSpawned = emitter.burst(30);
    _require(burstSpawned == 30, 'Burst spawned 30');
    _require(emitter.activeCount == 55, 'Expected 55 active particles');

    // Advance beyond lifetime (1.0s) to test recycling
    emitter.rate = 0.0;
    emitter.update(1.2);
    _require(emitter.activeCount == 0, 'All particles expired after lifetime');
    _require(emitter.totalDied == 55, 'Total died matches 55');
  }

  // 3. Gravity and drag physics tests
  {
    final emitter = ParticleEmitter(
      mesh: mesh,
      material: mat,
      rate: 0.0,
      gravity: const Vec3(0, -10, 0),
      dragCoefficient: 0.0,
      minSpeed: 0.0,
      maxSpeed: 0.0,
      minLifetime: 2.0,
      maxParticles: 10,
      seed: 999,
    );

    emitter.burst(1);
    _require(emitter.activeCount == 1, 'Burst spawned 1 particle');

    // After 1 second of free fall with g = -10 m/s^2, y should be -5 m (0.5 * g * t^2)
    emitter.update(1.0);
    final bounds = emitter.computeBounds();
    _require(bounds.center.y < -4.8 && bounds.center.y > -5.2, 'Gravity accelerated particle: ${bounds.center.y}');

    // Test drag dampening
    final dragEmitter = ParticleEmitter(
      mesh: mesh,
      material: mat,
      shape: const PointShape(direction: Vec3.unitX),
      minSpeed: 10.0,
      maxSpeed: 10.0,
      dragCoefficient: 2.0,
      minLifetime: 3.0,
      maxParticles: 10,
      seed: 888,
    );
    dragEmitter.burst(1);
    dragEmitter.update(1.0);
    // With drag=2 and t=1, velocity should decay by factor exp(-2) ~= 0.135
    final diag = dragEmitter.diagnostics(_mockFrame());
    _require(diag.averageSpeed < 2.0, 'Drag dampened velocity: ${diag.averageSpeed}');
  }

  // 4. Ground collision plane tests
  {
    final bounceEmitter = ParticleEmitter(
      mesh: mesh,
      material: mat,
      shape: const PointShape(direction: Vec3(0, -1, 0)),
      minSpeed: 10.0,
      maxSpeed: 10.0,
      minLifetime: 2.0,
      collisionPlane: const ParticleCollisionPlane(
        point: Vec3(0, 0, 0),
        normal: Vec3(0, 1, 0),
        restitution: 0.8,
        friction: 0.0,
        action: ParticleCollisionAction.bounce,
      ),
      maxParticles: 5,
      seed: 777,
    );
    bounceEmitter.transform = Transform.at(const Vec3(0, 5, 0));
    bounceEmitter.burst(1);

    // Initial position y=5, vy=-10. After 0.6s, without collision it would be at y = -1.
    // With collision plane at y=0, it should bounce back above 0 with positive vy!
    bounceEmitter.update(0.6);
    final bounds = bounceEmitter.computeBounds();
    _require(bounds.center.y >= 0.0, 'Collision plane prevented penetration: ${bounds.center.y}');
  }

  // 5. Attractor and kill radius tests
  {
    final attractorEmitter = ParticleEmitter(
      mesh: mesh,
      material: mat,
      shape: const PointShape(),
      minSpeed: 0.0,
      maxSpeed: 0.0,
      minLifetime: 5.0,
      attractor: const ParticleAttractor(
        position: Vec3(0, 10, 0),
        strength: 80.0,
        range: 20.0,
        killRadius: 2.0,
      ),
      maxParticles: 10,
      seed: 555,
    );
    attractorEmitter.burst(1);
    _require(attractorEmitter.activeCount == 1, 'Spawned 1 for attractor');

    // The particle should be pulled towards y=10 and absorbed when reaching killRadius
    for (var step = 0; step < 30; step++) {
      attractorEmitter.update(0.1);
    }
    _require(attractorEmitter.activeCount == 0, 'Attractor killRadius absorbed particle');
  }

  // 6. Color gradient and size curve modulation
  {
    final grad = ParticleColorGradient([
      const ParticleColorStop(0.0, LinearColor(1, 0, 0)),
      const ParticleColorStop(0.5, LinearColor(0, 1, 0)),
      const ParticleColorStop(1.0, LinearColor(0, 0, 1)),
    ]);
    final midColor = grad.sample(0.25);
    _require(midColor.r > 0.4 && midColor.g > 0.4, 'Gradient linearly interpolated: $midColor');

    final sizeEmitter = ParticleEmitter(
      mesh: mesh,
      material: mat,
      minStartSize: 1.0,
      maxStartSize: 1.0,
      minEndSize: 5.0,
      maxEndSize: 5.0,
      sizeCurve: Curves.linear,
      minLifetime: 1.0,
      maxLifetime: 1.0,
      maxParticles: 10,
      seed: 111,
    );
    sizeEmitter.burst(1);
    sizeEmitter.update(0.5);
    final bounds = sizeEmitter.computeBounds();
    // At t=0.5, size should be 1 + (5 - 1)*0.5 = 3.0. Half size = 1.5
    final size = bounds.max.x - bounds.min.x;
    _require((size - 3.0).abs() < 0.1, 'Size interpolated over lifetime: $size');
  }

  // 7. Determinism test
  {
    ParticleEmitter runSim(int seed) {
      final em = ParticleEmitter(
        mesh: mesh,
        material: mat,
        rate: 20.0,
        minSpeed: 2.0,
        maxSpeed: 5.0,
        noiseStrength: 1.0,
        seed: seed,
      );
      em.update(0.5);
      return em;
    }

    final em1 = runSim(12345);
    final em2 = runSim(12345);
    final b1 = em1.computeBounds();
    final b2 = em2.computeBounds();
    _require(em1.activeCount == em2.activeCount, 'Deterministic active count match');
    _require(b1.min == b2.min && b1.max == b2.max, 'Deterministic bounds match');
  }

  // 8. RenderEncoder submission and frustum culling
  {
    final emitter = ParticleEmitter(
      mesh: mesh,
      material: mat,
      alignment: ParticleAlignment.velocityStretched,
      minSpeed: 5.0,
      maxSpeed: 5.0,
      maxParticles: 20,
      seed: 333,
    );
    emitter.burst(5);

    final encoder = _CollectingEncoder();
    final frame = _mockFrame();
    final submitted = emitter.submit(encoder, frame);

    _require(submitted == 5, 'All visible particles submitted');
    _require(encoder.items.length == 5, 'Encoder received 5 descriptors');
    _require(
      encoder.items.every((it) => it.instanceFamilyKey == emitter.instanceFamilyKey),
      'Instance family key applied to all descriptors',
    );
    _require(
      encoder.items.every((it) => it.mesh == mesh && it.material == mat),
      'Mesh and material handles match',
    );

    // Test diagnostics
    final diag = emitter.diagnostics(frame);
    diag.validate();
    _require(diag.activeCount == 5, 'Diagnostics activeCount match');
    _require(diag.frustumVisibleCount == 5, 'Diagnostics visibleCount match');
    _require(diag.frustumCulledCount == 0, 'Diagnostics culledCount match');
  }

  print('Particle emitter fixtures passed.');
}
