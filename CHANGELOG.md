# Changelog

## 0.2.0 — 2026-09-13

- Added universal high-performance Particle Emitter system (`ParticleEmitter`,
  `ParticleEmitterNode`, `ParticleConfig`, `ParticleBurst`, `SubEmitter`,
  `ParticleShape`) with zero steady-state heap garbage collection.
- Added 12 physics-grounded VFX presets: fire, smoke, sparks, rain, snow,
  explosion, magic orb, dust motes, waterfall splash, steam vent, psychic portal,
  and fireworks.
- Added Particle Spritesheet and metadata system (`ParticleSpriteSheet`,
  `ParticleSprite`, `SpriteAnimation`, `ParticleSpritePlaybackMode`,
  `ParticleSpriteSheetBuilder`) with uniform grid generation (top-down /
  bottom-up UV calculation), JSON/TexturePacker atlas parsing, and
  `ResourceLibrary`/`MaterialStore` binding sharing GPU textures.
- Added rich programmatic sprite emission API (`emitSprite`, `burstSprite`,
  `emitSpriteIndex`, `burstSpriteIndex`, `emitAnimation`, `emitSpriteWithTag`)
  and cascading sub-emitter event triggers on birth, collision, trail, and death.
- Added `ProceduralTextures.particleAtlas` generating 4-quadrant procedural
  RGBA VFX textures (orb, sparkle star, shockwave ring, organic smoke puff).
- Added interactive particle spritesheet controls to the browser showcase demo.

## 0.1.1 — 2026-08-17

- Added deterministic atmospheric particle, bounded volumetric-source,
  reflection, and host-resolved surface-appearance contracts.
- Added source-aware world fog and snow/dissolution shading while keeping
  weather simulation outside Pixeldart.
- Added focused renderer fixtures for particles, volumetric media, reflections,
  and material appearance.

## 0.1.0

- Established the public Pixeldart facade and lifecycle contract.
- Added strict model-package, QMSH, context-recovery, and capability checks.
- Kept game, story, input, save, and source-format policy outside the library.
