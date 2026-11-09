# Browser renderer lab: first shader fixture

The first live fixtures compare the built-in `present` shader against a
fragment-stage override through `ProgramLibrary`. Each reads the center pixel
**inside the rendered frame**. The override writes
`vec4(0.25, 0.5, 0.75, 1.0)` and expects RGBA `64,128,191,255`.
A third mode, `reload`, commits a second override between frames and then
offers an invalid one. It expects `64,128,191,255` followed by `191,64,32,255`
twice, with the same program object kept live and the bad change rejected.
The runner also requires distinct default/override pixels, the expected
program selection, WebGL error `0`, no JavaScript exceptions, and an identified
hardware adapter.

To run it from `pixeldart` on Windows, first compile the page and serve the
package root:

```powershell
dart compile js -O2 --csp --no-source-maps -o web/renderer_test/main.dart.js web/renderer_test/main.dart
python -m http.server 8090 --bind 127.0.0.1
```

Start Edge with a separate debugging profile in another terminal, then run
the Node fixture:

```powershell
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless=new --remote-debugging-port=9222 --no-first-run "--user-data-dir=$env:TEMP\pixeldart-edge-lab-9222" about:blank
node tools/renderer/run_shader_lab.mjs
```

`PIXELDART_CDP_URL` and `PIXELDART_LAB_URL` can point the runner at a different
local debugging port or served fixture. The runner uses Node's built-in
`fetch` and `WebSocket`; it installs no browser package. Its exit code is
nonzero on a pixel/GL/JavaScript failure or an unknown/software adapter.

## First result (2026-11-10)

- Edge 157, ANGLE on Intel Iris Xe Graphics, D3D11.
- Built-in center readback: `0,14,104,255`.
- Overridden center readback: `64,128,191,255`.
- WebGL error: `0` in both; no JavaScript exceptions; program selection matched
  each mode.

This proves the complete fragment-stage replacement and raw present output
against the built-in control on one hardware/browser pair. Other shader slots,
live reload, world-material
variants, anisotropy comparisons, and MSAA resize/restore fixtures remain to
be added to this lab.
