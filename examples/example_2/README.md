# Lantern

A pure-2D dungeon crawl that uses pixeldart's 3D lighting pipeline for its look. The renderer supports exactly four point lights, and the game turns that limit into its central rule.

You are a lantern spirit in a dark room. Find five golden motes to open the portal to the next room. The shades chase you, but they won't enter a burning brazier's light.

- **Only four lights may burn:** yours and three braziers. Touching a fourth brazier lights it and snuffs the oldest.
- Lighting a brazier on top of a shade burns that shade away.
- Each hit shrinks your circle of light. A third hit puts it out.

| Key | Action |
| --- | --- |
| WASD / arrows | move |
| Space | dash (brief invulnerability) / start |
| 1 / 2 / 3 | clean / PS1 / VHS post-processing |
| M | mute |

## What it shows off

- **Orthographic 2D in a 3D renderer.** Discs, rings and slabs face the camera. Per-pixel point lighting, normal maps, emissive bloom and the post stack all apply to them.
- **Normal-mapped 2D surfaces.** The flagstone and brick textures, including their height maps, are generated procedurally at startup. The floor only shows its relief where light reaches it.
- **Light as gameplay.** The gold motes aren't emissive, so you only see them when light glints off their facets. Shades are near-black, so in the dark you only see their emissive eyes.
- **Post effects as feedback.** Getting hit tears the picture with VHS damage that decays. Room transitions fade through exposure rather than a DOM overlay.
- Particle bursts for fire, smoke, gold and the violet of a dissolving shade.

## Build and run

From the project root:

```sh
dart compile js -O2 -o example_2/build/lantern.js example_2/src/main.dart
python -m http.server 8765
```

Open <http://127.0.0.1:8765/example_2/>. URL flags:

- `?autostart` skips the title card.
- `?debug` makes K gather every mote, and pressing K again steps you onto the portal.

## Renderer notes

These are the pixeldart behaviours this game works around. Each is commented at the spot in the code that handles it.

- `OrthoCamera` builds its view as a plain translation looking down −Z, and does its own translation-only shake, because the app's shake engine also rotates the view.
- The emissive term samples an emissive map and contributes nothing without one, so emissive materials bind a 2×2 white texture.
- Nodes are hidden with `visibilityMask`, never by scaling them toward zero. The renderer inverts each node's 3×3 matrix to get normals, and a near-zero scale makes that matrix singular.
