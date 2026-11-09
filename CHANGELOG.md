# Changelog

## Unreleased

### Fixed

- `Mat4.lookAt` built a mirrored basis (right = up × forward). This flipped screen-right and culled the camera-facing side of single-sided surfaces and billboards. Guarded by `test_view_handedness`.
- `Mat4.inverse3x3` returned the transposed inverse, so `normalMatrix()` rotated every rotated mesh's normals the wrong way.
- Emissive: `emissiveStrength` had no effect without an `emissiveTexture`; the emissive fallback is now neutral white. Bloom input now carries the fragment's alpha, and additive world draws blend with coverage (`srcAlpha, one`), so soft sprites no longer bloom or draw as squares.
- A context loss and restore that happened between frames left the renderer using GPU objects from the dead context, which drew a black frame. Devices now count restores (`GpuContextGeneration`) and the renderer rehydrates. The WebGL device re-enables its extensions on restore and skips deleting handles from a lost context. Verified live over 10 forced `WEBGL_lose_context` cycles.
- Canvas resizes ignored device-pixel-ratio changes (moving to another monitor, zooming). `SurfaceMetrics.resized` takes a new ratio, and `PixeldartApp` and the minimal host follow it. Verified live over 100 resize/DPR cycles.
- `PixeldartApp`: an exception in a frame stopped the render loop permanently. The frame is now aborted and the loop continues; see `onError`. Resize failures are reported instead of swallowed.
- Detaching a node (`removeChild`) left its draw items rendering.
- A near-zero scale made `normalMatrix()` throw.
- Particle `fadeInFraction`, `fadeOutFraction`, `alphaCurve` and `colorGradient` were validated but never applied.
- GLB decoding:
  - invalid fallback tangents and skewed authored tangents are repaired;
  - material texture slots were treated as image indices;
  - external and `data:` images, `alphaMode`, `doubleSided`, `matrix` nodes and non-uniform scale were ignored;
  - `loadGlb` could put meshes on the wrong nodes.
- Orthographic picking rays all started at the eye.
- Volumetric fog banded at low sample counts.
- `roundedBox` emitted zero-area triangles.
- `radialParticle`'s colour ramp ignored `innerRadius`.
- `test_all` ran without `--enable-asserts`, so 31 assert-based fixtures checked nothing.

### Added

- **Models:** `ModelAsset` and `PixeldartApp.loadModel`: load a model once, instantiate it many times, keep its hierarchy, resolve external textures (with optional nearest filtering), and override materials. `GlbResult` gains `nodeMaterials`, `textureImages` and `warnings`.
- **Cameras:**
  - `CameraView.orthographic` and `OrthoCameraController` / `app.useOrthoCamera` (follow, `fitBounds`, `clampBounds`).
  - Camera shake works for any projection (`rotationScale`, `app.shakeCamera(rotation:)`).
- **Scene graph:**
  - `SceneNode.visible` (inherited).
  - Dirty-tracked draw-state setters.
  - `Transform.stretch` / `SceneNode.stretch` (non-inherited, non-uniform geometry scale) and `Transform.copyWith`.
- **App:** `app.onBeforeFrame`, `app.onError`, `app.onTap`, `app.screenRay`, `app.currentCamera()`, `app.pick(where:, precise:)`, and `SceneNode.raycast(where:, precise:)`.
- **Math:** `Ray.intersectGround` and `CatmullRomSpline3D.tangentAtDistance`.
- **Particles:** `ParticleEmitter.emitAt` (exact-rate streaming from many sources), `bindColorGradient` and `fadeEnvelope`. `ParticleMaterials.soft` and `app.createParticleMaterial`.
- **Lights:** `selectPointLights` ranks point lights by influence when more than four are submitted; `FrameStats.pointLightsDropped`.
- **Sky:** `SkyboxDeclaration.copyWith`, `setSolarTime(coherentHorizon:)` and `app.matchHorizonToFog()`.
- **Fog:** `enableVolumetricFog(jitter:)`.
- **Docs:** `docs/conventions.md`; `examples/`, three games built on the public API.

### Changed

- `SkyboxDeclaration.validate` names every invalid field. `cloudSampleCount` is only checked while clouds are drawn.
- The GLB decoder no longer stores material indices in `SceneNode.sortTiebreaker`.
- The showcase's ocean diorama moved behind the hero stage, and `web/minimal` and `web/showcase` were rebuilt.
- `rf11`, `plib00` and `plib04` skip their host-game audits in a standalone checkout.
- `check_sizes.dart` was removed along with the line budgets.

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
