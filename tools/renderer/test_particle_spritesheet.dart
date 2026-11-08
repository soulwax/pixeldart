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

final class _MockResourceLibrary implements ResourceLibrary {
  final Map<int, MaterialDefinition> materials = {};
  int _nextSlot = 1;

  @override
  MaterialHandle registerMaterial(MaterialDefinition definition) {
    definition.validate();
    final slot = _nextSlot++;
    materials[slot] = definition;
    return MaterialHandle(slot, 1, definition.key);
  }

  @override
  MeshHandle registerMesh(MeshData data, {String? debugLabel}) {
    return const MeshHandle(1, 1, 'quad');
  }

  @override
  TextureHandle registerTexture({
    required int width,
    required int height,
    int layers = 1,
    bool hasMips = false,
    GpuTextureFilter minFilter = GpuTextureFilter.linear,
    GpuTextureFilter magFilter = GpuTextureFilter.linear,
    GpuTextureWrap wrap = GpuTextureWrap.clampToEdge,
    double anisotropy = 1,
    dynamic pixels,
    String? debugLabel,
  }) {
    return const TextureHandle(1, 1, 'mockTex');
  }

  @override
  dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
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
  const tex = TextureHandle(1, 1, 'atlas');
  const mesh = MeshHandle(1, 1, 'quad');
  const baseMat = MaterialHandle(2, 1, 'baseMat');

  // 0. Validation Negative Tests
  {
    _throws(
      () => ParticleSpriteSheet.uniformGrid(texture: tex, columns: 0, rows: 2),
      'Rejects columns <= 0',
    );
    _throws(
      () => ParticleSpriteSheet.uniformGrid(texture: tex, columns: 2, rows: -1),
      'Rejects rows <= 0',
    );
    _throws(
      () => ParticleSprite(
        name: '',
        index: 0,
        uMin: 0,
        vMin: 0,
        uMax: 1,
        vMax: 1,
      ),
      'Rejects empty name',
    );
    _throws(
      () => SpriteAnimation(
        name: 'empty',
        frameIndices: [],
      ),
      'Rejects empty frameIndices',
    );
  }

  // 1. Uniform Grid Spritesheet Construction & UV Coordinates
  {
    final sheet = ParticleSpriteSheet.uniformGrid(
      texture: tex,
      columns: 2,
      rows: 2,
      originTopLeft: true,
      frameNames: ['orb', 'star', 'ring', 'smoke'],
      frameTags: {
        0: {'glow', 'core'},
        1: {'sparkle', 'light'},
        2: {'shockwave'},
        3: {'puff', 'dark'},
      },
      textureWidth: 256,
      textureHeight: 256,
    );

    _require(sheet.sprites.length == 4, 'Should have 4 sprites');
    _require(sheet.getSprite('orb') != null, 'Orb sprite found');
    _require(sheet.indexOfSprite('star') == 1, 'Star has index 1');
    _require(sheet.getSpriteByIndex(2).name == 'ring', 'Ring is index 2');

    // Check top-down UV orientation
    final orb = sheet.getSprite('orb')!;
    _require((orb.uMin - 0.0).abs() < 1e-5 && (orb.uMax - 0.5).abs() < 1e-5, 'Orb U is [0, 0.5]');
    _require((orb.vMin - 0.5).abs() < 1e-5 && (orb.vMax - 1.0).abs() < 1e-5, 'Orb V is [0.5, 1.0] (top row)');
    _require((orb.uvScaleU - 0.5).abs() < 1e-5, 'Orb scaleU is 0.5');
    _require((orb.uvScaleV - 0.5).abs() < 1e-5, 'Orb scaleV is 0.5');
    _require((orb.uvOffsetU - 0.0).abs() < 1e-5, 'Orb offsetU is 0.0');
    _require((orb.uvOffsetV - 0.5).abs() < 1e-5, 'Orb offsetV is 0.5');

    final smoke = sheet.getSprite('smoke')!;
    _require((smoke.uMin - 0.5).abs() < 1e-5 && (smoke.uMax - 1.0).abs() < 1e-5, 'Smoke U is [0.5, 1.0]');
    _require((smoke.vMin - 0.0).abs() < 1e-5 && (smoke.vMax - 0.5).abs() < 1e-5, 'Smoke V is [0.0, 0.5] (bottom row)');

    // Check tags
    final glowIndices = sheet.indicesWithTag('glow');
    _require(glowIndices.length == 1 && glowIndices.first == 0, 'Tag glow maps to orb');
  }

  // 2. Bottom-up Grid Orientation
  {
    final sheetBottomUp = ParticleSpriteSheet.uniformGrid(
      texture: tex,
      columns: 2,
      rows: 2,
      originTopLeft: false,
    );
    final frame0 = sheetBottomUp.getSpriteByIndex(0);
    _require((frame0.vMin - 0.0).abs() < 1e-5 && (frame0.vMax - 0.5).abs() < 1e-5, 'Bottom-up row 0 is V=[0, 0.5]');
  }

  // 3. Custom Builder and JSON Atlas Parsing
  {
    final builder = ParticleSpriteSheetBuilder();
    builder.addPixelSprite(
      name: 'coin',
      x: 0,
      y: 0,
      width: 32,
      height: 32,
      textureWidth: 128,
      textureHeight: 128,
    );
    builder.addPixelSprite(
      name: 'ruby',
      x: 32,
      y: 0,
      width: 32,
      height: 32,
      textureWidth: 128,
      textureHeight: 128,
      weight: 0.1,
    );
    builder.addAnimation(
      name: 'spin',
      frameIndices: [0, 1],
      frameRate: 10.0,
      isLooping: true,
    );

    final sheet = builder.build(tex);
    _require(sheet.sprites.length == 2, 'Builder created 2 sprites');
    _require(sheet.animations.containsKey('spin'), 'Builder has spin animation');

    final spin = sheet.getAnimation('spin')!;
    _require((spin.duration - 0.2).abs() < 1e-5, 'Spin duration is 0.2s');
    _require(spin.frameIndexAtTime(0.0) == 0, 'Spin frame at 0.0 is 0');
    _require(spin.frameIndexAtTime(0.15) == 1, 'Spin frame at 0.15 is 1');
    _require(spin.frameIndexAtTime(0.25) == 0, 'Spin frame at 0.25 loops to 0');
  }

  // 4. ResourceLibrary Material Binding
  {
    final sheet = ParticleSpriteSheet.uniformGrid(
      texture: tex,
      columns: 2,
      rows: 2,
      frameNames: ['orb', 'star', 'ring', 'smoke'],
    );
    final mockRes = _MockResourceLibrary();
    _require(!sheet.isBound, 'Sheet should not be bound initially');

    sheet.bind(mockRes);
    _require(sheet.isBound, 'Sheet should be bound after bind()');
    _require(sheet.materials.length == 4, 'Should produce 4 material handles');
    _require(mockRes.materials.length == 4, 'Mock library has 4 registered materials');

    // Verify registered material definitions match exact sprite UV scale and offset
    final orbDef = mockRes.materials[sheet.materials[0].slot]!;
    _require((orbDef.uvScaleU - 0.5).abs() < 1e-5, 'Orb material has uvScaleU 0.5');
    _require((orbDef.uvScaleV - 0.5).abs() < 1e-5, 'Orb material has uvScaleV 0.5');
    _require((orbDef.uvOffsetU - 0.0).abs() < 1e-5, 'Orb material has uvOffsetU 0.0');
    _require((orbDef.uvOffsetV - 0.5).abs() < 1e-5, 'Orb material has uvOffsetV 0.5');
  }

  // 5. Programmatic Sprite Emission by Name, Index, and Tag
  {
    final sheet = ParticleSpriteSheet.uniformGrid(
      texture: tex,
      columns: 2,
      rows: 2,
      frameNames: ['orb', 'star', 'ring', 'smoke'],
      frameTags: {
        1: {'celestial'},
        2: {'celestial'},
      },
    );
    final mockRes = _MockResourceLibrary();
    sheet.bind(mockRes);

    final emitter = ParticleEmitter(
      mesh: mesh,
      material: baseMat,
      spriteSheet: sheet,
      maxParticles: 100,
    );

    // Emit by name
    final spawnedStar = emitter.emitSprite('star', count: 3);
    _require(spawnedStar == 3, 'Spawned 3 stars');
    _require(emitter.activeCount == 3, 'Active count is 3');

    final diag = emitter.diagnostics(_mockFrame());
    _require(diag.activeCount == 3, 'Diagnostics shows 3 active');

    // Emit by index
    final spawnedRing = emitter.emitSpriteIndex(2, count: 2);
    _require(spawnedRing == 2, 'Spawned 2 rings');
    _require(emitter.activeCount == 5, 'Active count is 5');

    // Emit with tag
    final spawnedTag = emitter.emitSpriteWithTag('celestial', count: 4);
    _require(spawnedTag == 4, 'Spawned 4 celestial particles');
    _require(emitter.activeCount == 9, 'Active count is 9');

    // Verify submission applies the sprite's material
    final encoder = _CollectingEncoder();
    final submitted = emitter.submit(encoder, _mockFrame());
    _require(submitted == 9, 'Submitted 9 particles');
    _require(encoder.items[0].material == sheet.materials[1], 'First item is star material');
    _require(encoder.items[3].material == sheet.materials[2], 'Fourth item is ring material');
  }

  // 6. Animation Progression Over Lifetime
  {
    final sheet = ParticleSpriteSheet.uniformGrid(
      texture: tex,
      columns: 4,
      rows: 1,
      animations: {
        'burn': SpriteAnimation(
          name: 'burn',
          frameIndices: [0, 1, 2, 3],
          frameRate: 10.0,
          isLooping: false,
        ),
      },
    );
    final mockRes = _MockResourceLibrary();
    sheet.bind(mockRes);

    final emitter = ParticleEmitter(
      mesh: mesh,
      material: baseMat,
      spriteSheet: sheet,
      spritePlaybackMode: ParticleSpritePlaybackMode.animatedOverLifetime,
      defaultAnimationName: 'burn',
      minLifetime: 1.0,
      maxLifetime: 1.0,
      maxParticles: 10,
    );

    emitter.emitAnimation('burn', count: 1);
    _require(emitter.activeCount == 1, 'Active count is 1');

    final encoder0 = _CollectingEncoder();
    emitter.submit(encoder0, _mockFrame());
    _require(encoder0.items.first.material == sheet.materials[0], 'Starts at frame 0');

    // Step to 50% lifetime (0.5s)
    emitter.update(0.5);
    final encoder1 = _CollectingEncoder();
    emitter.submit(encoder1, _mockFrame());
    _require(encoder1.items.first.material == sheet.materials[2], 'Midway at frame 2');

    // Step to 95% lifetime
    emitter.update(0.45);
    final encoder2 = _CollectingEncoder();
    emitter.submit(encoder2, _mockFrame());
    _require(encoder2.items.first.material == sheet.materials[3], 'End at frame 3');
  }

  // 7. Looping Animation Progression
  {
    final sheet = ParticleSpriteSheet.uniformGrid(
      texture: tex,
      columns: 2,
      rows: 1,
      animations: {
        'flicker': SpriteAnimation(
          name: 'flicker',
          frameIndices: [0, 1],
          frameRate: 10.0, // 0.1s per frame
          isLooping: true,
        ),
      },
    );
    final mockRes = _MockResourceLibrary();
    sheet.bind(mockRes);

    final emitter = ParticleEmitter(
      mesh: mesh,
      material: baseMat,
      spriteSheet: sheet,
      spritePlaybackMode: ParticleSpritePlaybackMode.loopingAnimation,
      defaultAnimationName: 'flicker',
      minLifetime: 10.0,
      maxLifetime: 10.0,
      maxParticles: 10,
    );

    emitter.burst(1);
    final enc0 = _CollectingEncoder();
    emitter.submit(enc0, _mockFrame());
    _require(enc0.items.first.material == sheet.materials[0], 'Looping starts at frame 0');

    emitter.update(0.12);
    final enc1 = _CollectingEncoder();
    emitter.submit(enc1, _mockFrame());
    _require(enc1.items.first.material == sheet.materials[1], 'Advances to frame 1');

    emitter.update(0.1);
    final enc2 = _CollectingEncoder();
    emitter.submit(enc2, _mockFrame());
    _require(enc2.items.first.material == sheet.materials[0], 'Loops back to frame 0');
  }

  // 8. Cascading Sub-Emitters with Sprite Targeting
  {
    final sheet = ParticleSpriteSheet.uniformGrid(
      texture: tex,
      columns: 2,
      rows: 2,
      frameNames: ['rocket', 'smoke', 'spark', 'flare'],
    );
    final mockRes = _MockResourceLibrary();
    sheet.bind(mockRes);

    final childEmitter = ParticleEmitter(
      mesh: mesh,
      material: baseMat,
      spriteSheet: sheet,
      maxParticles: 50,
      minLifetime: 0.5,
    );

    final parentEmitter = ParticleEmitter(
      mesh: mesh,
      material: baseMat,
      spriteSheet: sheet,
      minLifetime: 0.2,
      maxLifetime: 0.2,
      maxParticles: 10,
      subEmitters: [
        SubEmitter(
          emitter: childEmitter,
          trigger: SubEmitterTrigger.death,
          count: 3,
          spriteName: 'flare',
        ),
      ],
    );

    parentEmitter.emitSprite('rocket', count: 1);
    _require(parentEmitter.activeCount == 1, 'Parent rocket is alive');
    _require(childEmitter.activeCount == 0, 'Child has not triggered yet');

    // Advance beyond parent lifetime (0.2s) to trigger death event
    parentEmitter.update(0.25);
    _require(parentEmitter.activeCount == 0, 'Parent has expired');
    _require(childEmitter.activeCount == 3, 'Child spawned 3 particles on parent death');

    final childEnc = _CollectingEncoder();
    childEmitter.submit(childEnc, _mockFrame());
    _require(childEnc.items.length == 3, 'Child submitted 3 items');
    _require(childEnc.items.first.material == sheet.materials[3], 'Child particles use flare sprite');
  }

  // 9. Procedural Particle Atlas Generation
  {
    final atlasBytes = ProceduralTextures.particleAtlas(width: 64, height: 64);
    _require(atlasBytes.length == 64 * 64 * 4, 'Atlas buffer length matches 64x64 RGBA');

    // Verify cell 0 (orb) has opaque core
    // In 64x64, cell 0 is x in [0..31], y in [0..31]. Center is (16, 16).
    final orbCenterOffset = (16 * 64 + 16) * 4;
    _require(atlasBytes[orbCenterOffset + 3] > 240, 'Orb center is bright/opaque');

    // Verify cell perimeter is feathered to 0
    final orbCornerOffset = (0 * 64 + 0) * 4;
    _require(atlasBytes[orbCornerOffset + 3] == 0, 'Orb cell corner is zero alpha');
  }

  // 10. High-Throughput Steady-State Simulation
  {
    final sheet = ParticleSpriteSheet.uniformGrid(
      texture: tex,
      columns: 2,
      rows: 2,
    );
    final mockRes = _MockResourceLibrary();
    sheet.bind(mockRes);

    final emitter = ParticleEmitter(
      mesh: mesh,
      material: baseMat,
      spriteSheet: sheet,
      spritePlaybackMode: ParticleSpritePlaybackMode.random,
      rate: 100.0,
      minLifetime: 0.5,
      maxLifetime: 1.0,
      maxParticles: 500,
    );

    // Simulate 200 frames (60 FPS = 3.33 seconds)
    for (var f = 0; f < 200; f++) {
      emitter.update(1.0 / 60.0);
    }
    _require(emitter.activeCount > 0, 'Emitter has active particles in steady state');
    _require(emitter.activeCount <= 500, 'Emitter stays within max capacity');
  }

  print('All particle spritesheet tests passed.');
}
