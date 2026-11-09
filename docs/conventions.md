# Conventions

This page covers the rules Pixeldart assumes but the API can't enforce on its own: coordinates, geometry orientation, the material model, frame order and scene-graph semantics. It ends with a checklist for a blank or wrong-looking frame.

## Coordinates and cameras

- **Right-handed, Y up.** A camera looks down its own −Z.
- `CameraView.look(eye:, forward: (0, 0, -1), up: (0, 1, 0))` puts world +X at screen-right and +Y at screen-up. `Mat4.lookAt` builds a proper rotation (determinant +1); `tools/renderer/test_view_handedness.dart` guards that.
- `CameraView.orthographic(...)` is the parallel-projection counterpart, for 2D games, top-down maps and isometric views. `OrthoCameraController` (or `app.useOrthoCamera`) follows a target, fits a region to any aspect (`fitBounds`) and stops at level edges (`clampBounds`). Its default looks at the XY plane, so a 2D game lays out its sprites in X and Y.
- Picking rays come from `CameraView.screenPointToRay`. They start at the eye for perspective cameras and at the near plane under the pixel for orthographic ones. `app.screenRay(clientX, clientY)` wraps this for window coordinates, and `Ray.intersectGround(height)` turns it into a point on a floor or sea.
- Camera shake perturbs the existing view in view space, so it works for any orientation and projection. Pass `app.shakeCamera(rotation: 0)` for a translation-only shake in 2D.

## Primitive orientation

| Primitive | Lies along / faces |
| --- | --- |
| `plane` | XZ plane, normal +Y |
| `quad` | XY plane, normal +Z |
| `cylinder`, `cone`, `torus`, `capsule` | Axis +Y; the cone's apex is at +Y |
| `cube`, `roundedBox`, `sphere`, `icosphere` | Centred on the origin |

To make a flat 2D sprite face a camera that looks down −Z, rotate a Y-axis primitive by +90° about X, which maps +Y to +Z.

## Faces, culling and blending

- **Front faces are counter-clockwise.** Back faces are culled unless the material sets `doubleSided: true`.
- **Opaque** draws write alpha 1.
- **`BlendMode.alpha`** blends with `srcAlpha, oneMinusSrcAlpha`.
- **`BlendMode.additive`** blends with `srcAlpha, one`: it only ever adds light, scaled by the fragment's coverage. A soft-edged additive sprite therefore adds a soft disc, not its whole quad.
- **The bloom input carries the same alpha as colour.** Glow fades with a sprite instead of blooming its quad.

## Materials

- Missing maps fall back to **neutral** values, so scalars act as plain multipliers:
  - albedo: white
  - normal: flat
  - ORM: white
  - emissive: white
  - lightmap: white
- **Emission** is `emissiveMap × tint × emissiveStrength`. `emissiveStrength` glows on its own with no map, and 0 (the default) emits nothing.
- Particle sprites: `ParticleMaterials.soft(resources, key:, color:, glow:)` (or `app.createParticleMaterial`) binds one shared soft texture as both albedo and emissive map.
- A particle `colorGradient` takes effect once bound to per-age materials:
  - `emitter.bindColorGradient(resources, baseDefinition)` binds it explicitly;
  - `app.addEmitter` binds it automatically for materials the app created.

## Lights

- **One directional light** (the sun or moon, which doesn't cast shadows), **four point lights**, three unshadowed spot lights and one shadowed spot light per pass. `RuntimeLightBudget` holds these numbers.
- **When you submit more point lights than slots**, the most influential at the camera are kept (`selectPointLights`), deterministically by id on ties. `FrameStats.pointLightsDropped` counts the rest.
- **Volumetric fog** scatters light from those same point lights. Dense media need enough steps: `app.enableVolumetricFog` raises the sample count with density and jitters the steps.

## Frame order (`PixeldartApp`)

1. `onBeforeFrame(time, dt)`
2. Animation clips advance
3. The scene graph syncs to the render world
4. The camera controller updates, then shake applies
5. The frame begins
6. Atmospheric particle fields submit
7. Each emitter updates, then submits
8. `onFrame(ctx)`
9. The frame ends

Move or burst emitters in `onBeforeFrame` to see the change in the same frame. Anything set in `onFrame` lands one frame later.

**An exception anywhere in a frame aborts that frame. The loop keeps running.** The error goes to `app.onError`, or is printed once per distinct message when no handler is set.

## Scene graph

- **`visible`** hides a node and its whole subtree, and is inherited. Prefer it to scaling toward zero; near-zero scales are tolerated but wasteful.
- **`visibilityMask`** is a per-item view bit set and is not inherited.
- **Draw state is dirty-tracked.** Changing `material`, `mesh`, `visibilityMask`, `drawMode`, `blendMode`, `castsShadow` or `receivesShadow` reaches the GPU on the next sync, even if the node didn't move.
- **Detaching cleans up.** `removeChild` / `removeFromParent` remove the subtree's draw items at the root's next sync, unless it was re-attached by then; re-parenting simply moves it.
- **`stretch`** is a per-axis scale of a node's own geometry, applied before rotation and uniform `scale`. Children don't inherit it, which keeps transforms composable.

## Models

- `app.loadModel(url)` returns a `ModelAsset`: meshes and materials registered once, with `instantiate()` for as many copies as you need.
- **Node hierarchy** is preserved.
- **Textures:**
  - embedded and `data:` images are decoded;
  - external images (a kit's shared `Textures/colormap.png`) resolve relative to the model's URL and load once;
  - `textureFilter: GpuTextureFilter.nearest` suits palettes and pixel art.
- **Materials:** `KHR_materials_unlit` decodes as a matte dielectric, and `alphaMode` and `doubleSided` are honoured.
- **Non-uniform scale** on a leaf becomes `stretch`. Inherited non-uniform scale is approximated and reported in `ModelAsset.warnings`.

## A blank or wrong-looking frame: checklist

1. **Turn on `showStats: true` in `PixeldartApp.mount`.** Are draws and triangles non-zero?
   - Zero: nothing reached the world. Check that the node is attached under `app.scene` and has both `mesh` and `material`, and that it and its ancestors are `visible`.
2. **Is the object in front of the camera and inside near/far?** For an orthographic camera, check the box size and the eye distance.
3. **Is it single-sided and seen from behind?** Set `doubleSided: true` to confirm, then fix the winding or orientation.
4. **Black instead of lit?** There's no light in range: the light budget, point-light radius and direction all matter. For a glowing look, use `emissiveStrength`.
5. **A square instead of a soft sprite?** The sprite's texture needs alpha, and additive sprites need it too.
6. **Is `app.onError` (or the console) reporting a frame error?** Each aborted frame skips that frame's drawing.
