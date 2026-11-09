# Pixel Rocket

A small meteor-field runner. Steer through tumbling meteors. Crystals give points and green canisters give fuel. Boosting doubles your score but burns fuel three times as fast. Three hits destroy the ship, and running dry stalls it.

| Key | Action |
| --- | --- |
| WASD / arrows | steer |
| Shift | boost (2× score, heavy fuel burn) |
| Space / Enter | launch / retry |
| P | toggle the retro PS1 look |
| M | mute |

`?autostart` skips the title card.

## What it shows

- **`app.loadModel` / `ModelAsset`:** Kenney Space Kit GLBs loaded once and instantiated into a pool of 61 objects. A `materialOverride` gives metal parts some sheen and makes crystals and fuel canisters glow.
- **Emission:** `emissiveStrength` glows with no emissive map, so crystals, canisters and the engine flame bloom.
- **`stretch`:** the engine flame lengthens on boost without fattening.
- **Particles:** soft additive sprites for space dust, impacts and pickups, made with `app.createParticleMaterial`.
- **Feedback:** a real point light at the engine, camera shake on hits, and the PS1 post preset on P.

## Build and run

See [../README.md](../README.md).
