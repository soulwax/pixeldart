# Minimal Host

The neutral first-frame host lives under `web/minimal/` and uses the advanced
facade plus the public browser factory. From the package directory:

```sh
dart compile js web/minimal/main.dart -o web/minimal/main.dart.js -O2
python3 -m http.server 8090 --directory .
```

Open `http://127.0.0.1:8090/web/minimal/`. The canvas publishes
`data-renderer-state="ready"`, `data-renderer-first-frame="true"`, the
effective profile, surface size, and a monotonically increasing frame count.
Use `?profile=safe`, `?profile=standard`, or `?profile=high` to exercise
capability selection. Context loss, resize, and WebGL2-unavailable states are
reported through explicit attributes rather than hidden fallback behavior.

The documented compile command was verified from the package directory with
Dart 3.12.2 and produced a standalone JavaScript bundle successfully. Browser
pixel/lifecycle evidence still requires a real WebGL2 browser run.

That browser run is now recorded: Firefox at `640x360` reached `ready`, emitted
`data-renderer-first-frame="true"`, selected effective `high`, and advanced to
97 frames. The empty-world dark frame is expected for this lifecycle-only host.
