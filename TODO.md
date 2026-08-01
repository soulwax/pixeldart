# TODO

The honest gap list between "the pipeline renders and is proven" and "a library
strangers can depend on." Ordered roughly by leverage. Items marked **(spec'd)**
have a detailed design already; they are unbuilt, not undesigned.

## Public API surface

- [ ] **Implement `SceneRenderer`.** The interface exists (`initialize` /
      `configure` / `resize` / `beginFrame` / `endFrame` / `abortFrame` /
      `dispose`) but has no concrete implementation — the demo drives the
      feature graph and passes directly. This is the single biggest gap.
      **(spec'd)**
- [ ] **`configure()` as an atomic between-frame graph rebuild** — prepare a
      full replacement feature set, swap between frames, reset temporal
      history; never compile or allocate from `beginFrame`. **(spec'd)**
- [ ] **`dispose()` with exact accounting** — releasing every owned CPU and GPU
      resource, provable by diagnostics returning to the pre-renderer
      baseline.
- [ ] **Enforce the `RenderEncoder` lifecycle at runtime** — a stale encoder
      (after `endFrame`/`abortFrame`) should reject submissions instead of
      relying on caller discipline.
- [ ] **`TextureStore`.** No texture store exists; the demo manages its one
      checkerboard texture by hand. `MaterialDefinition.albedoTexture` /
      `emissiveTexture` currently have nothing to resolve against.
- [ ] **Per-instance transform streaming.** Instanced draws are wired, but all
      members of a batch share one transform — a flagged placeholder, not a
      silent default. Stream per-instance attributes from a persistent buffer.
- [ ] Planned-but-unbuilt modules: `core/frame_arena`, `core/dynamic_batch`,
      `core/resource_library`, `webgl/texture_store`, `webgl/frame_targets`.

## Graph and pass system

- [ ] **Express MSAA resolve as a graph stage.** It works, but as bootstrap
      plumbing between two pass contexts; features cannot declare or validate
      a resolve.
- [ ] **Profile exclusion ("owns zero targets").** No quality-profile-driven
      feature installation exists — every feature's GPU targets are always
      allocated. A profile-excluded feature should compile no program,
      allocate nothing, and add no pass. **(spec'd)**
- [ ] **Extend zero-cost-off to grade, PS1 quantize, and VHS.** Each still runs
      its full-screen shader at zero weight (deliberately deferred — their
      per-pixel cost is small next to SSAO/blur — but the contract should be
      uniform).
- [ ] **Skippable DOF composite.** `dofComposite` writes a distinct target the
      downstream chain depends on, so unlike bloom it cannot skip without a
      fallback copy path.
- [ ] **Guard against program-id collisions.** Two graphs sharing one
      `ProgramLibrary` silently delete each other's programs unless every
      feature parameterizes its ids — fixed reactively twice, no general
      validation yet.
- [ ] **Reconcile the safe-graph shape.** Spec says three passes
      (opaque → transparent → present); the built graph validates with two,
      handling blended items inside the world pass. Decide which is canonical.
- [ ] **Stencil state** — absent from `DrawStateDescriptor` entirely.
- [ ] **Decal stage** between world-opaque and transparents. **(spec'd)**

## Lighting and shadows

- [ ] **Multiple lights.** Only one spot light is ever active. Needs the
      capability-bounded per-draw light subset with stable-ID tie-breaking and
      submitted/selected/rejected reporting. **(spec'd)**
- [ ] **Multiple shadow casters + capability-driven shadow resolution**
      (512²/two casters standard, 256²/three casters fallback), with caster
      priority/influence selection surfaced in diagnostics. **(spec'd)**
- [ ] **Directional-light shadows** (spot-only today; point-light cube shadows
      are explicitly out of scope for v1).
- [ ] **Static shadow caching** — cache static casters, invalidate on
      moving caster/light or changed geometry.
- [ ] **Front-face culling during the shadow/depth pass.**
- [ ] **Debug views** beyond linearized depth: normals, direct, ambient,
      shadow factor, material, fog factor, light volumes.

## Materials and textures

- [ ] **Consume the rest of `MaterialDefinition`.** `albedoTexture`,
      `emissiveTexture`, `uvScale`/`uvOffset`, roughness/specular response are
      modeled but unread. (Live today: tint, `doubleSided`, `affineSampling`,
      scalar `emissiveStrength`, `alphaMode` + `alphaCutoff`.)
- [ ] **Material table capacity splitting** — deterministic per-batch material
      tables that split a batch at UBO/texture-table capacity instead of
      dropping materials. **(spec'd)**
- [ ] **Texture array groups** — device support exists, but no array-group
      aggregation, layer-order validation, or catalog.
- [ ] **A real LUT asset + loader** — only a procedurally built demo LUT
      exists.
- [ ] **Visually confirm `doubleSided`** — reachable and type-checked, never
      exercised by a fixture.
- [ ] **Alpha-mask × affine interaction fixture** — masking cuts out against
      the prepass while affine warps the world-pass UVs; add a fixture proving
      the two gates compose without cutout/shading divergence.

## PS1 treatment (remaining pieces)

- [ ] **Vertex lighting** — move N·L/shadow/ambient to per-vertex under the
      PS1 profile. Riskiest remaining piece: must be gated so the confirmed
      per-fragment look is untouched when off.
- [ ] **Fixed low internal resolution** — internal resolution currently tracks
      the canvas; fixing it (e.g. 384×216 + NEAREST upscale) touches sizing on
      nearly every target. Deserves a dedicated pass.
- [ ] **Affine UV in the textured/safe world programs** (currently only the
      shadowed world path), and decide what affine means for mip selection.

## Color

- [ ] **Linear/sRGB audit.** The renderer shades and grades in display-referred
      values with no explicit final encode — documented as the de facto
      convention rather than reworked. Needed before PBR or HDR-authored
      assets make sense.

## Determinism, comfort, accessibility

- [ ] **Temporal-determinism tests** — pin time/seed/input-sequence/epoch and
      prove byte-identical RGBA across 120 frames with temporal effects off.
      VHS noise is currently seeded by raw `uTime`/`gl_FragCoord`, un-pinned.
- [ ] **Exercise `reducedMotion` live** — implemented, but no demo toggle
      flips it.
- [ ] **A real photosensitivity/luminance comfort gate** — current comfort
      clamps (DOF focus range, VHS tracking ceiling, fog onset) are hand-picked
      magnitudes, not tested against a documented contract.
- [ ] **Visual-stability gates** — no mostly-black frames over 600 frames, no
      NaN/inf reaching a uniform or target, no full-frame luminance collapse.

## Robustness (proven pure, not yet proven live)

- [ ] **Real context loss/restore in a browser** — the listeners, epoch state
      machine, and `MeshStore` rehydration are pure-tested; nothing has been
      driven through a forced `WEBGL_lose_context` cycle on real hardware.
      Gate: 10 cycles.
- [ ] **Real canvas resize/DPR change** — 100 cycles pass against the fake;
      no live canvas has been resized.
- [ ] **Steady-state no-allocation assertion** — the instrumentation exists
      (the fake records creates/deletes and uniforms); the test asserting zero
      GPU-object churn in a warm frame has not been written. Cheap now.
- [ ] **Draw-count assertions for skip paths** — assert SSAO/bloom/DOF issue
      zero draws at zero weight, now that the fake records per-draw uniforms.

## Verification infrastructure

- [ ] **Renderer lab** — a browser verification runner: URL-selected fixtures
      and profiles, final offscreen `readPixels` evidence (never OS
      screenshots — a recorded incident showed a false cyan capture while the
      framebuffer readback was neutral), golden/diff artifacts, console and
      WebGL error capture, adapter proof that rejects software renderers,
      built from Node built-ins only. Twenty fixtures are already enumerated,
      from an unlit triangle through forced context loss. **(spec'd)**
- [ ] **Golden + perf baseline system** — keyed by fixture/browser/adapter/
      profile/resolution; SSIM ≥ 0.995 for shaded goldens on a pinned
      adapter, semantic probes across vendors.
- [ ] **Ratify the performance budget table.** Proposed and never measured:
      60 Hz; CPU submit p95 ≤ 4 ms; GPU p95 ≤ 12 ms; ≤ 40 draws for a
      representative two-room scene; ≤ 64 MiB GPU resources. Measure on real
      hardware (180 warm-up frames, ≥ 600 measured, three runs, medians),
      then change numbers only with recorded evidence.
- [ ] **Full diagnostics snapshot** — per-pass CPU time, GPU timer queries
      (async, keyed to source frame, disjoint results discarded), draw/
      triangle/cull/batch counts, target formats and completeness, live+peak
      bytes by kind, context-loss counts, offscreen readback hook. **(spec'd)**
- [ ] **Culling and instancing acceptance by pixels** — both are proven at the
      visible-list level; the metamorphic contract (identical pixels with
      culling on/off, individual vs. instanced) has never run as a pixel
      comparison, and culling's net CPU value has never been measured.
- [ ] **CI** — GitHub Actions running the static gate: `dart format
      --set-exit-if-changed`, `dart analyze`, `test_all`, `check_boundary`,
      `check_sizes`, `shaders.dart --check`.

## Asset pipeline

- [ ] **Run QMSH through the real GPU path** — the decoder is proven against
      all corruption fixtures, but the demo builds `MeshData` in Dart; no real
      QMSH bytes have ever reached a live draw.
- [ ] **An OBJ → QMSH producer** (none exists here, by prior design).
- [ ] **Model catalog / sidecar validation** — schema, provenance and license
      checks, deterministic source hashing, turntable capture. **(spec'd)**
- [ ] **Soft particles** — depth-fade blended particles against scene depth.
- [ ] **Transient stress story** — six motes is not a stress test; no culling
      or instancing path exists for large transient counts, and transient
      bounds are a fixed radius, not mesh-accurate.

## Housekeeping

- [ ] **Tighten the per-file line budgets back down.** The original caps
      (300 per pass, 350 per device/tool file) were ratified during the
      elevation program and eight files have since outgrown them
      (`shadowed_world` 475, `fake_gpu_device` 498, `test_alpha_mask` 472,
      `webgl2_device_draw` 423, `dof`, `ssao`, `bloom`, `webgl2_device`).
      `budgets.json` was raised to current reality at extraction; split these
      along natural seams and lower the caps again.
- [ ] Decide package publication (currently `publish_to: none`) and, if
      publishing, split the demo out of the package.
- [ ] Example snippets in the README once `SceneRenderer` exists — the current
      entry point (feature graph + passes, as the demo does it) is too much
      ceremony to present as the API.
