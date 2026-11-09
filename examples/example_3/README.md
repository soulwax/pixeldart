# Tidewatch

A tower defense game turned inside out: you don't shoot anything, you guide ships home.

You keep a lighthouse on a procedural island. Ships sail four channel lanes through a reef toward your harbour. In daylight their crews navigate on their own. At dusk, at night and in storms they drift unless your beam is on them, and a drifting ship eventually finds the rocks. A lost ship's running light flashes red. When three ships are wrecked, the harbour closes.

| Input | Action |
| --- | --- |
| Mouse | aim the beam across the water |
| Click a ship | fire a flare that guides every ship near it for about 10 s. You carry 3 and get one back for each ship that reaches the harbour. |
| Drag / wheel | orbit / zoom |
| Hold Space | spyglass (depth of field, narrower field of view) |
| M | mute |

Time passes at one game hour every 15 seconds, starting in the afternoon. The first night is always fair. After that, squalls come and go on their own, and each night you survive puts one more ship at sea.

## Renderer features it uses

None of these appear in `example_1` or `example_2`:

- **TerrainGenerator** builds the island and its biome texture. The lighthouse stands on the highest ground found by sampling heights, and palms are placed where the ground is low and gentle.
- **WaterSurfaceMesh and GerstnerWaveEvaluator** make the ocean, deformed on the CPU every frame. Storms rescale the waves taller and longer while holding steepness, so wave crests never fold over themselves.
- **BuoyantVesselBody** makes the ships heave, roll and pitch on those same waves. Channel buoys bob on the same surface.
- **The solar cycle** (`setSolarTime`) drives the sun, ambient light, fog color and sky. Storms raise cloud cover.
- **Volumetric fog** scatters light from the point lights, so the beam, flares and lightning glow in the air. Its density follows weather and darkness.
- **Directional shadows** fall from the sun across the island and ships.
- **An atmospheric rain field** (`AtmosphericPresets.rain`) appears during storms. Lightning is a brief, very bright point light paired with an exposure flash, followed by delayed thunder.
- **CatmullRomSpline3D** shapes the lanes, resampled by arc length so drift is measured in world units.
- **Keyframe animation** (`AnimationClip` with `Vector3Track` and `RotationTrack`): wrecked ships lurch, list over and sink by the bow.
- **Raycast picking** (`app.pick`) for clicking ships, plus `CameraView.screenPointToRay` intersected with the sea plane to aim the beam.
- **Material presets:** ceramic paint, chrome and copper on the lighthouse, plastic on the buoys.
- **Depth of field** for the spyglass.
- **Glossy GLB models** from Kenney's Pirate Kit, textured through its shared palette image.

## Build and run

From the Pixeldart package root:

```sh
dart compile js -O2 --no-source-maps -o examples/example_3/build/tidewatch.js examples/example_3/src/main.dart
python -m http.server 8765 --directory examples
```

Open <http://127.0.0.1:8765/example_3/>. URL flags:

- `?autostart` skips the title card.
- `?hour=22` starts at a chosen hour.
- `?storm=1` starts with a storm (any value from 0 to 1).

They combine, e.g. `?autostart&hour=22&storm=1`.

## Notes

- **The Pirate Kit models** are loaded with `app.loadModel(url, textureFilter: GpuTextureFilter.nearest)`.
  - Their external `Textures/colormap.png` palette resolves relative to each model and loads once.
  - Nearest filtering stops neighbouring palette colours from bleeding into each other.
  - Each model's node hierarchy is kept, since the ships place their masts and sails with node transforms.
- **Picking:** a click (`app.onTap`) picks only ships, with `app.pick(where:, precise: true)`, against their triangles.
- **Aiming:** the beam aims where `app.screenRay(...)` meets the sea (`Ray.intersectGround`).
- **Lanes** walk `CatmullRomSpline3D.sampleAtDistance` / `tangentAtDistance`.
- **Sky:** `app.matchHorizonToFog()` keeps the fogged sea and the sky's horizon the same colour.
- **Bugs this game surfaced**, now fixed in Pixeldart:
  - `Mat4.lookAt` was mirrored, so the camera-facing side of the terrain and the ocean was culled.
  - The GLB decoder rejected the Pirate Kit's slightly skewed authored tangents. It now orthonormalizes every tangent against its normal.
