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
- Sky:
  - The fallback sky's bands followed the screen, not the horizon. A camera looking down painted zenith colour over fully fogged geometry, which left a hard band where the fog was almost complete. The bands now follow the view direction, so a matched horizon meets the fog without a seam.
  - Stars drew as square blocks fixed to the screen. They are now small round points, fixed to the sky.
- Night fog: `SolarCycleEngine` built the fog colour from the sun's transmittance even below the horizon, so night fog, and any horizon matched to it, was a bright mauve. It now fades through twilight to a dark haze.
- Environment reflections used the raw ambient colour without its intensity, so dark scenes still reflected a bright sky.
- `doubleSided` back faces were lit with the front face's normal, so they shaded as if facing away from the viewer. The normal (including the normal-mapped one) is now reversed on back faces.

- VHS could not run through `SceneRenderer`. The graph was built with `hasValidPreviousFrame: false`, so any profile with VHS (`ps1Full`) failed to initialize with `invalidHistoryRead`. Beyond that, the pass sampled `vhsOutput` as history while rendering into it, a WebGL feedback loop that drops the draw. VHS now ping-pongs between `vhsOutput` and a new `vhsHistory` target. It ghosts nothing on its first draw, or on the first draw after a bypass, instead of echoing a cleared or stale frame. The fake test device now rejects any draw that samples its own render target.
- Full-screen features never freed their empty vertex arrays, so every graph rebuild (each canvas resize) leaked a few. Bloom, DOF, SSAO, grade, PS1, VHS and depth debug now release them on dispose.
- The minimal shadowed profile sampled the scene-color target as its missing SSAO input while drawing into that target. The shadowed-world pass now samples neutral white when SSAO is disabled, avoiding a WebGL feedback loop.
- A second graph sharing a `ProgramLibrary` could replace and delete the first graph's live program when pass IDs collided. Pass registration and shader variants now reject duplicate IDs before compiling; deliberate reloads still replace programs.
- Non-power-of-two textures requested one mip level too many from WebGL immutable storage. Mip counts now halve dimensions with integer truncation. Texture descriptors also reject invalid magnification mip filters and minification mip filters without mip storage before GPU allocation.

### Added

- Browser renderer lab starter: URL-selected built-in and overridden `present`
  shaders, in-frame pixel readback, and a Node/CDP runner that rejects
  GL/JavaScript errors and unknown/software adapters. Verified on Edge 157 with
  Intel Iris Xe / D3D11: built-in RGBA `0,14,104,255` versus overridden
  `64,128,191,255` for `vec4(0.25, 0.5, 0.75, 1)`.

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
- **Screen space:** `CameraView.worldToScreenPoint` and `app.worldToClient`, the inverse of `screenPointToRay` / `screenRay`, for placing DOM labels over scene objects.
- **Particles:** `ParticleEmitter.emitAt` (exact-rate streaming from many sources), `bindColorGradient` and `fadeEnvelope`. `ParticleMaterials.soft` and `app.createParticleMaterial`.
- **Lights:** `selectPointLights` ranks point lights by influence when more than four are submitted; `FrameStats.pointLightsDropped`.
- **Sky:** `SkyboxDeclaration.copyWith`, `setSolarTime(coherentHorizon:)` and `app.matchHorizonToFog()`.
- **Fog:** `enableVolumetricFog(jitter:)`.
- **Docs:** `docs/conventions.md`; `examples/`, three games built on the public API.
- **Host shaders:**
  - `ShaderOverride.effect` writes a post effect for `grade`, `ps1Quantize`, `vhs` or `dofComposite` as one GLSL function. Compile errors report the snippet's own line numbers.
  - `ShaderUniform` and `ShaderOverride(uniforms:, textures:)` give overrides typed values with no GL handles. `app.setShaderUniform` and `app.setShaderTexture` change them live without recompiling, and live values survive resizes, graph rebuilds and context restores. Uniforms are uploaded only when they change.
  - `ShaderUniform.int` and `.mat4` bind GLSL integer and matrix uniforms. Matrix values snapshot their source so later edits cannot change a live binding.
  - `pdTime` and `pdResolution` are filled automatically in any override that declares them.
  - `PixeldartApp.loadShaderSource` fetches GLSL from a URL.
  - `RendererConfiguration.postEffects`, `mount(postEffects:)`, `mount2d(postEffects:)` and `app.setPostEffects` add host post-process stages before present on any profile.
  - `app.createSpriteShader` registers a sprite shader, selected per draw with `drawSprites(shader:)`. `ShaderOverride.effect` also works on `sprites`.
  - `app.createWorldShader` registers a shader for the active world profile. `MaterialDefinition(worldShader:)` selects it per material; frame uniforms are restored on program switches and sent only to programs that draw. Resizes and context restores recompile it, and other profiles use their own default.
  - `setShaderUniform` and `setShaderTexture` accept any `ShaderTarget`: a `ShaderSlot`, `ShaderHandle` or `PostEffect`. `shaderErrors` is keyed the same way.
  - `RendererConfiguration.copyWith`.
  - With no override active, none of this adds work to a frame.
- **MSAA:** `sampleCount` is now a request. The renderer clamps it to `RenderCapabilities.maxSamples`, and steps down (halving to 1×) when a multisampled framebuffer is incomplete. It negotiates again after a context restore. `renderer.msaa` / `app.msaa` report the requested and effective counts and a `MsaaFallbackReason`; `renderer.configuration` keeps the request. `app.setSampleCount(n)` changes it between frames; `RendererConfiguration.withSampleCount` copies a configuration.

### Changed

- Adjacent sprite batches with the same projection now upload the view-projection matrix once per shader program run.
- Shadowed-world draws now cache alpha cutoff, opaque coverage and affine warp strength across adjacent materials and draw modes, avoiding redundant uniform uploads.
- Performance (main-thread busy time, 6 s of play):
  - Pixel Rocket: 43% → 24%.
  - Lantern: 17% → 10%.
  - Tidewatch: 68% → 23%.

  How:
  - Uniform locations are cached per program. They had been looked up by name on every set, which was a third of frame CPU.
  - `WaterSurfaceMesh.updateWaves` evaluates displacement and normal in one pass and rotates each wave's phase along a grid row instead of calling sin/cos per vertex.
  - `Transform.toMat4` writes one buffer (`Mat4.compose`).
  - `PixeldartApp` re-reads the canvas size only after a `ResizeObserver` reports a change, instead of forcing layout every frame.

- Zero-cost post chain: DOF composite, LUT grade, PS1 quantize and VHS no longer draw a full-screen pass when their settings make them an identity. That covers DOF strength 0, grade strength 0, 8-bit quantization without dither, and all VHS weights 0 after reduced motion. A per-graph `PostChain` forwards the stage's input, so the next stage and present sample it directly. The default `clean` profile, with DOF and grade off, saves two full-screen passes per frame. Covered by `test_post_chain`.
- Shader overrides may ignore engine attributes and uniforms. They were rejected as "missing required" when a host shader didn't use one, including when the driver stripped a declared but unused input.
- Static shadow caching: the shadow pass skips its redraw when nothing the light sees has changed. It records the light, every caster's mesh, material, LOD and transform, the texture content revision and the shadow-map target, and compares them exactly with the previous frame's, with no hashing and no allocation in a steady scene. A static scene, or one where only the camera, light colour or intensity changes, renders its shadow map once. Verified on D3D11: a cached frame is byte-identical to a redrawn one. Covered by `test_shadow_cache`.
- The MSAA resolve target holds only what later passes read. It has color always, glow only when bloom is installed, and never depth, since no pass after the resolve depth-tests or samples it. The resolve blits only attachments both sides own. Before this, every MSAA frame copied depth (and glow without bloom) into storage nobody read. At 1080p that is up to about 16 MiB of memory and two full-screen blits per frame. 1× still allocates no multisample storage and runs no resolve.

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
