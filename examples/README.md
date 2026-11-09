# Examples

Three small games built on Pixeldart, each using a different part of the renderer. They show what a host writes for itself: game logic, input, HUD and sound. Everything else comes from the public API.

| Example | What it is | Main APIs |
| --- | --- | --- |
| [example_1](example_1/): Pixel Rocket | A 3D chase-camera runner through a meteor field | `loadModel` / `ModelAsset`, particles (`createParticleMaterial`), `stretch`, camera shake, PS1 post |
| [example_2](example_2/): Lantern | A pure-2D dungeon crawl lit only by four point lights | `useOrthoCamera`, normal-mapped procedural textures, emissive, `emitAt`, `onBeforeFrame` |
| [example_3](example_3/): Tidewatch | Inverted tower defense: guide ships through a reef by lighthouse beam | Terrain, Gerstner water, buoyancy, solar cycle, volumetric fog, rain, splines, keyframe clips, `pick(precise:)`, `onTap` |

## Build and run

From the Pixeldart package root:

```sh
dart pub get
dart compile js -O2 --no-source-maps -o examples/example_1/build/pixelrocket.js examples/example_1/src/main.dart
dart compile js -O2 --no-source-maps -o examples/example_2/build/lantern.js examples/example_2/src/main.dart
dart compile js -O2 --no-source-maps -o examples/example_3/build/tidewatch.js examples/example_3/src/main.dart
python -m http.server 8765 --directory examples   # any static server; the games fetch() their assets
```

Then open <http://127.0.0.1:8765/example_1/>, `/example_2/` or `/example_3/`.

Build with `--no-source-maps`: the package-content check (`tools/test_plib11_archive_manifest.dart`) rejects generated `.js.map` files anywhere in the package tree. `build/` folders are gitignored.

## Assets

All models and sounds are CC0, from [Kenney](https://kenney.nl); each `res/CREDITS.txt` lists the packs. Everything else (textures, terrain, water, sky) is generated at runtime.
