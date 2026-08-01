# pixeldart

The name is misleading — this is a full-blown retained-scene **3D renderer for the browser, written in pure Dart on WebGL2**. No Flutter, no engine dependency, no third-party math/ECS/asset library. The only runtime dependency is `package:web`, and it is confined to a single backend directory by a mechanically enforced import boundary.

It renders a modern deferred-flavored pipeline — shadow mapping, depth prepass, SSAO, MRT emissive + bloom, depth of field, LUT color grading — and then deliberately ruins it with a faithful PS1/VHS-era treatment: vertex snapping, affine texture warp, color quantization with ordered dithering, and a six-component VHS recording stage with real frame-to-frame ghosting.

```text
shadow map ─▶ depth prepass ─▶ SSAO (half-res) ─▶ world (MRT: color + emissive)
  ─▶ transparent / particles ─▶ MSAA resolve ─▶ bloom ─▶ DOF ─▶ LUT grade
  ─▶ PS1 quantize + dither ─▶ VHS ─▶ NEAREST present
```

The full pipeline is fifteen passes, pinned in order by a test.

![Everything on: shadows, SSAO, bloom, DOF, grade, PS1 quantize, VHS, fog, affine UV, alpha-masked lattice](.github/screenshots/00-all-features-on.jpg)

## Showcase

Every effect in the stack, isolated by turning it off against the same scene. Left/right pairs are live captures from the demo (`web/renderer_test/`).

| | |
| :---: | :---: |
| ![All features on](.github/screenshots/00-all-features-on.jpg) | ![Raw geometry, post chain off](.github/screenshots/12-post-chain-off-geometry-only.jpg) |
| **Everything on** | **Post chain off** — raw lit geometry underneath |
| ![SSAO off](.github/screenshots/01-ssao-off.jpg) | ![Bloom off](.github/screenshots/02-bloom-off.jpg) |
| **SSAO off** — contact shadows in creases vanish | **Bloom off** — emissive cores stop glowing |
| ![DOF off](.github/screenshots/03-dof-off.jpg) | ![Grade off](.github/screenshots/04-grade-off.jpg) |
| **DOF off** — background snaps into focus | **Grade off** — the LUT's cast removed |
| ![PS1 off](.github/screenshots/05-ps1-off.jpg) | ![VHS off](.github/screenshots/06-vhs-off.jpg) |
| **PS1 off** — no quantize, dither, or vertex snap | **VHS off** — no chroma bleed, tracking, noise, ghosting |
| ![Fog off](.github/screenshots/07-fog-off.jpg) | ![Affine UV off](.github/screenshots/08-affine-uv-off.jpg) |
| **Fog off** | **Affine UV off** — perspective-correct sampling restored |
| ![Alpha mask off](.github/screenshots/09-alpha-mask-off.jpg) | ![Lattice shadow with alpha mask](.github/screenshots/14-lattice-shadow-alpha-mask-on.jpg) |
| **Alpha mask off** — the lattice becomes a solid quad | **Masked shadows** — the cutout pattern reaches the shadow caster |
| ![Depth prepass debug](.github/screenshots/10-depth-prepass-debug.jpg) | ![Depth prepass debug, mask off](.github/screenshots/11-depth-prepass-debug-alpha-mask-off.jpg) |
| **Depth prepass debug** — masked texels cut out of the prepass too | **Same view, mask off** — the lattice depth goes solid |

<details>
<summary>Two more pairs</summary>

| | |
| :---: | :---: |
| ![Lattice shadow, mask off](.github/screenshots/15-lattice-shadow-alpha-mask-off.jpg) | ![Post chain off, mask off](.github/screenshots/13-post-chain-off-alpha-mask-off.jpg) |
| **Lattice shadow with masking off** — a solid quad's shadow | **Post chain and mask both off** |

</details>

## Highlights

- **Validated render graph.** Passes declare typed, versioned resource edges; the whole graph is validated *before the first draw*, never mid-frame. Nine distinct failure kinds (read-before-write, duplicate writers, sampling a multisampled attachment, invalid resolve, format/size mismatch, undeclared same-version read/write, history read without a valid previous frame, dependency cycles, missing capability) — each with its own test fixture. An invalid optional feature builds *zero* passes, not just its own.
- **A mandatory safe graph.** A minimal world → present path using vertex color and fallback textures that must keep rendering through missing textures, failed optional shaders, low capabilities, resize, and context restoration. Everything fancier is layered on top and allowed to fail without taking geometry down with it.
- **Typed, generation-checked GPU handles.** Public handles are logical slot + generation references; stale handles, double release, and draw-after-release are rejected, not undefined. Backend GPU objects additionally carry a private *device epoch*, so a logical mesh handle survives WebGL context loss while an old-epoch GPU object is correctly refused.
- **One backend seam.** Everything above `GpuDevice` is backend-agnostic. Two implementations exist: the real `WebGl2Device`, and a first-class `FakeGpuDevice` that records call order, uniform values, and per-kind resource counts — which is how graph validation, resource lifecycles, loss/restore cycles, and resize handling are proven without a browser.
- **Caller-owned time and determinism.** The renderer receives `timeSeconds`, `frameIndex`, `noiseSeed`, and `historyEpoch` — it never reads a wall clock, accumulates `dt`, or derives randomness from allocation order. Temporal history (VHS ghosting) is invalidated by the caller bumping `historyEpoch`; there is no second reset API.
- **Declared GL state.** Each pass's complete GL state (depth, cull, blend, color mask, scissor) lives in its `PassDescriptor`; a pass cannot add state at execute time that its descriptor did not name. Blend state is per-item, not per-pass — opaque, alpha, and additive draws select their preset inside the draw loop.
- **State-cache diffing.** `WebGlStateCache.diff()` is pure set-difference logic, so the backend only issues GL state calls for fields that actually changed.
- **Zero-cost-off.** SSAO, bloom, and DOF read their per-frame weight and skip their draw calls entirely at zero — distinguishing "profile-disabled" (nothing allocated) from "installed but inactive this frame" (targets warm, zero draws) as a testable contract.

## What is implemented and browser-confirmed

| Area | Features |
| --- | --- |
| World | Indexed meshes, per-pass draw state, depth test, backface culling, per-draw material tint, double-sided override, texture sampling with mipmaps, alpha-masked cutout (`discard` in world, depth-prepass, *and* shadow-caster paths) |
| Lighting | Directional + ambient, one spot light with distance/cone falloff, shadow mapping with 2×2 PCF and slope-scaled bias on a depth-only target |
| Depth | Single-sample depth prepass shared by SSAO/DOF, linearized depth debug view |
| AO | Half-resolution 8-sample SSAO reconstructing position from depth and normals from derivatives, depth-aware bilateral blur, modulates ambient only |
| Emissive | Real MRT (`COLOR_ATTACHMENT1`), driven purely by material emissive strength — never inferred from final luma — surviving explicit MSAA resolve |
| Post | Bloom (separable gaussian, additive composite), DOF (circle-of-confusion vs. focus distance/range), 3D-LUT color grade, fog (distance + optional height/density, never applied to emissive) |
| PS1 | Vertex snapping in NDC before the perspective divide, affine UV warp (solved without `noperspective`, gated per material × per frame), color quantization to N bits with Bayer 4×4 ordered dithering |
| VHS | Final recording stage with six independent weights — chroma bleed, tracking jitter, YIQ tape noise, head-switch tear, dropout streaks, frame ghosting via the graph's history/ping-pong mechanism |
| Transients | Frame-local particle submission (alpha motes, additive light shafts) through a persistent grow-only encoder, sorted back-to-front |
| Accessibility | `reducedMotion` halves VHS motion weights and disables ghosting before any uniform reaches a shader |

Everything above renders in the live demo and has been verified on real hardware (ANGLE/D3D11 on NVIDIA and Intel, plus WebKit).

## Running the demo

Prerequisites: a Dart SDK (^3.12).

```sh
dart pub get
dart compile js web/renderer_test/main.dart -o web/renderer_test/main.dart.js -O2
cd web/renderer_test && python -m http.server 8090
```

Open `http://127.0.0.1:8090`. The demo is a self-contained bootstrap: spinning textured cubes, an orbiting spot light with live shadows, a subdivided ground plane, motes and light shafts, and a debug panel that logs every subsystem decision. Live toggles:

| Key | Toggles |
| --- | --- |
| `D` | Depth debug view |
| `F` | Depth of field |
| `G` | Color grade LUT |
| `P` | PS1 quantize + dither + vertex snap |
| `V` | VHS |
| `H` | Fog |
| `S` | SSAO |
| `B` | Bloom |
| `A` | Affine UV warp |
| `M` | Alpha-masked cutout material |

## Architecture

Layers point strictly downward; the renderer never imports application code and never touches the DOM outside its backend directory:

```text
composition root (web/renderer_test — or your app's bootstrap)
        │
reusable renderer API      lib/rendering/api      handles, scene, frame, materials, lights
        │
renderer core              lib/rendering/core     render graph, feature graph, queue,
        │                                         batching, culling, program library
WebGL2 backend             lib/rendering/webgl    device, state cache, resources,
                                                  generated shaders
```

```text
lib/rendering/
  rendering.dart    barrel export
  api/              public contracts: SceneRenderer, RenderWorld, FrameInput,
                    PostProcessState, MaterialDefinition, typed handles, capabilities
  math/             Vec2/3/4, Mat3/4, Quat, Transform (uniform scale only, by contract),
                    Aabb/BoundingSphere, 6-plane Frustum
  core/             validated render graph, RenderFeature/FeatureGraph, frame queue,
                    sort keys, opaque batching, frustum culling, atomic program library
  assets/           QMSH v1 binary mesh decoder, exact-tuple vertex dedup, model
                    definitions with named sockets, content-hashed decode cache,
                    mesh/material stores with context-restore rehydration
  webgl/            GpuDevice seam, WebGl2Device, resource registry, state cache,
                    capability selection, fallback resources, diagnostics
  passes/           world, shadow, depth, SSAO, bloom, DOF, grade, PS1, VHS, present
shaders/rendering/  authored GLSL as real .vert/.frag files + manifest.json
tools/renderer/     test suite, FakeGpuDevice, boundary/size checkers, shader generator
web/renderer_test/  the standalone browser demo
```

A few design decisions worth knowing before reading the code:

- **The graph is declared once at startup, not rebuilt per frame.** Per-frame "skip this pass" logic lives inside each pass's `execute()`, reading the frame's `PostProcessState` — enable predicates are a build-time (profile) concept.
- **Shaders are real files.** Authored GLSL lives under `shaders/rendering/**`; `tools/renderer/shaders.dart` generates `lib/rendering/webgl/generated_shaders.dart` from `manifest.json` and has a `--check` mode for CI. Embedding shader source in handwritten Dart is a boundary violation the checker catches.
- **Program publishes are atomic.** Compile → link → validate → assign samplers → build bindings → publish → only then delete the replaced program. A failed reload leaves the last known-good program live; 25 alternating valid/invalid reloads with exact compile/delete counts prove no leak.
- **Frozen coordinate contract.** Right-handed, +Y up, model forward +Z, column-major matrices, CCW front faces, one shared depth-linearization function, one metre per unit, uniform instance scale — non-uniform scale is rejected at the public API rather than silently mis-lighting normals.
- **Steady-state frames allocate nothing.** After warm-up, a normal frame performs no buffer/texture/target/program creation; dynamic geometry uses persistent grow-only buffers, and growth events are counted in diagnostics.
- **PS1 is not a VHS filter.** Fixed low resolution is a resolution policy, vertex snapping and affine UV live in the world vertex path, quantize/dither is a composite after grade, and VHS is the final recording stage over the already-graded image. They compose because they are separate.

## Testing

```sh
dart analyze                                 # zero issues, including infos
dart run tools/renderer/test_all.dart        # 18 pure test scripts
dart run tools/renderer/check_boundary.dart  # import/layering rules
dart run tools/renderer/check_sizes.dart     # per-file authored-line budgets
dart run tools/renderer/shaders.dart --check # generated shaders in sync
```

The suite runs entirely on the Dart VM against `FakeGpuDevice` — no browser, no test framework dependency. Coverage includes: matrix application order against shader-equivalent fixtures, inverse-transpose normals proven against a case where the naive approach demonstrably fails, projection/depth round-trips, frustum edge cases including boxes straddling the near plane, the full handle rejection vocabulary, 100 resize cycles, 10 context loss/restore cycles with ordered rebuild callbacks, 50 resource lifecycle cycles returning live counts to exactly zero, all nine graph-invalidity fixtures plus a positive control, all eight QMSH corruption cases, the pinned 15-pass pipeline order, and per-draw uniform assertions for the affine and alpha-mask gates.

Two evidence tiers are used deliberately: **pure-proven** (asserted against the fake device) and **browser-confirmed** (observed on a real WebGL2 context). The fake proves *wiring consistency, never GL correctness* — of the seventeen numbered bugs found while building this, at least six were in categories no fake can model: drivers pruning unread attributes, WebGL's buffer binding-point stickiness, attribute-location overwrite ordering, a never-issued GL capability call, framebuffer-vs-texture handle confusion, and WebKit rejecting a draw-buffer count that exceeded the shader's declared outputs. Anything visual is only ever claimed after rendering on real hardware.

## WebGL2 lessons encoded in this codebase

Hard-won, and now guarded by tests or API shape:

- A WebGL buffer's binding-point family is fixed by its **first** `bindBuffer` and can never change — a generic create path that always binds `ARRAY_BUFFER` silently breaks index buffers with only a console warning. Hence `GpuBufferKind`.
- Drivers legitimately optimize away vertex attributes the shader never reads; `getAttribLocation` returning −1 is not an error.
- Two vertex-layout slots feeding one shader location must collapse into one `vertexAttribPointer` call, or the second silently overwrites the first.
- Binding a target with two active draw buffers while the shader declares one output is `GL_INVALID_OPERATION` on WebKit — attachment count must follow the bound program.
- A full-screen `gl_VertexID` triangle still needs a bound VAO in portable WebGL2.
- Reading and writing the same physical texture in one draw is undefined — the graph's versioned resources and history ping-pong exist to make that structurally impossible.
- "Declared as data, never issued as a GL call" is a real bug class (it happened three times); `PassDescriptor.toDrawState()` closes it by construction.

## Status and roadmap

The pipeline is real and confirmed end to end, but the public `SceneRenderer` facade is not implemented yet — the demo drives the feature graph and passes directly. The gap between "renders beautifully" and "usable as a library by strangers" is the roadmap; see [TODO.md](TODO.md) for the honest, itemized list.

## Provenance

Extracted from the renderer elevation program of a private Dart game project, where it was built capability-by-capability in isolation — every feature proven in the standalone demo before any game integration. Git history starts fresh at the extraction; the numbered-bug lore above is what survives of the archaeology.

## License

GPL-3.0 — see [LICENSE](LICENSE). Copyright © 2026 soulwax.
