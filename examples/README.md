# Examples

Four games built on Pixeldart, each using a different part of the renderer. They show what a host writes for itself: game logic, input, HUD and sound. Everything else comes from the public API.

| Example | What it is | Main APIs |
| --- | --- | --- |
| [example_1](example_1/): Pixel Rocket | A 3D chase-camera runner through a meteor field | `loadModel` / `ModelAsset`, particles (`createParticleMaterial`), `stretch`, camera shake, PS1 post |
| [example_2](example_2/): Lantern | A pure-2D dungeon crawl lit only by four point lights | `useOrthoCamera`, normal-mapped procedural textures, emissive, `emitAt`, `onBeforeFrame` |
| [example_3](example_3/): Tidewatch | Inverted tower defense: guide ships through a reef by lighthouse beam | Terrain, Gerstner water, buoyancy, solar cycle, volumetric fog, rain, splines, keyframe clips, `pick(precise:)`, `onTap` |
| [example_4](example_4/): Procession | A pure-2D escort game: gather villagers and lead them home through a growing swarm | `mount2d`, `SpriteLoader`, `AtlasBuilder`, `Camera2D`, `TileLayer`, `SpriteBatch`, `BitmapFont`, `drawSprites` |

## Build and run

From the Pixeldart package root:

```sh
dart pub get
dart compile js -O2 --no-source-maps -o examples/example_1/build/pixelrocket.js examples/example_1/src/main.dart
dart compile js -O2 --no-source-maps -o examples/example_2/build/lantern.js examples/example_2/src/main.dart
dart compile js -O2 --no-source-maps -o examples/example_3/build/tidewatch.js examples/example_3/src/main.dart
dart compile js -O2 --no-source-maps -o examples/example_4/build/procession.js examples/example_4/src/main.dart
python -m http.server 8765 --directory examples   # any static server; the games fetch() their assets
```

Then open <http://127.0.0.1:8765/example_1/>, `/example_2/`, `/example_3/` or `/example_4/`.

Build with `--no-source-maps`: the package-content check (`tools/test_plib11_archive_manifest.dart`) rejects generated `.js.map` files anywhere in the package tree. `build/` folders are gitignored.

## Windows executables

On Windows with the Dart and .NET 10 SDKs installed, build every game from the
Pixeldart package root:

```powershell
.\examples\build_windows.ps1
```

Pass `-Example 1`, `2`, `3` or `4` to build just one. Each example also has
its own `build_windows.ps1` entry point. The resulting single-file x64
executables are `example_1/build/PixelRocket.exe`,
`example_2/build/Lantern.exe`, `example_3/build/Tidewatch.exe` and
`example_4/build/Procession.exe`. They embed their HTML, JavaScript and Kenney
assets, so no static server or separate .NET installation is needed at run
time. They use the installed Microsoft Edge WebView2 Runtime. Pass
`--autostart` to an executable to skip its title card.

## Assets

All downloaded art, models and sounds are CC0, from [Kenney](https://kenney.nl); each `res/CREDITS.txt` lists the packs. Other visuals, including Procession's water tile, are generated at runtime.
