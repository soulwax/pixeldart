# Procession

A pure-2D escort game. Walk from the keep to the scattered hamlets, collect
villagers, and lead them home. Your followers form a line behind you; archers,
knights and mages defend it while the swarm grows through five nights. A flare
pushes nearby monsters back and needs time to recharge.

| Input | Action |
| --- | --- |
| WASD or arrow keys | Walk |
| Hold and drag on the game | Walk toward the pointer; also works by touch |
| Space or the FLARE button | Use a charged flare |
| M | Mute or unmute sound |
| F | Show frame and sprite counts |

Press Space, Enter or tap to start. After a loss or victory, do the same to
begin a fresh run.

## Build and run

From the `pixeldart` package root:

```sh
dart pub get
dart compile js -O2 --no-source-maps -o examples/example_4/build/procession.js examples/example_4/src/main.dart
python -m http.server 8765 --directory examples
```

Open <http://127.0.0.1:8765/example_4/>. The game loads local image, font and
audio files, so it needs a static server rather than `file://`.

URL flags for repeatable checks:

- `?autostart` starts without the title screen.
- `?bot` lets the built-in pathfinding player walk the game.
- `?stress=5000` places that many monsters around the keep and exposes FPS,
  simulation time, build time and sprite counts in the browser title.
- `?debug` enables `K` to advance to the next night.

## Renderer boundary

The host owns map generation, pathfinding, simulation, combat, sound, HUD and
the fixed 60 Hz game clock. Pixeldart provides a 2D mount, input state, atlas
packing, bitmap fonts, culling, retained chunked tile layers, dynamic sprite
batches, camera projection and an ordered sprite pass. The game uses no meshes,
scene nodes or 3D camera. Static ground and decorations use `TileLayer`; people,
monsters and effects use a Y-sorted `SpriteBatch`; night lighting is made from
multiply sprites. This is an example of using the renderer as a library, with
game rules staying in the host.

The art, font, effects and sounds come from Kenney CC0 packs. See
[res/CREDITS.txt](res/CREDITS.txt) for exact sources and modifications.
