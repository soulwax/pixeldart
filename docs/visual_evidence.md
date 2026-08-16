# Visual Evidence Index

Pixeldart records visual progress as reproducible browser captures, not as
undocumented screenshots. The package demo generates its geometry/material
inputs, so these probes remain redistributable and deterministic.

| Probe | URL/query | What to inspect |
| --- | --- | --- |
| Isolated model showcase | `?showcase=model` | Three retained parts on a clean pedestal: opaque, emissive, and alpha-masked materials. |
| Instanced submission | `?r09-instances=1` | Three shared cube items with distinct transforms and an actual instanced draw. |
| Texture residency | `?r09-residency=1` | Pending fallback material transitioning to resident texture without handle churn. |
| Full feature graph | default demo | Shadows, post-process passes, fog, grade, PS1/VHS controls, and diagnostics together. |
| Minimal host lifecycle | `web/minimal/?profile=high` | Empty-world clear frame with real Firefox/WebGL2 lifecycle proof: `ready`, first frame, negotiated profile, and advancing frame counter. |

For each probe, capture the canvas at a fixed viewport and retain the DOM
metadata attributes alongside the image. Fake-device fixtures prove decisions
and ownership; only a real WebGL2 capture is visual evidence.

Parent-repository gallery images remain non-normative case-study artifacts and
are intentionally not copied into the package.

Latest neutral-host probe: Firefox at `640x360` reached `ready`, emitted its
first frame, reported effective `high`, and advanced to 97 frames. The captured
image is intentionally a dark clear-color frame because this host submits no
scene items; it proves lifecycle health rather than artistic quality.

Latest model probe: Firefox at `960x540` with `?showcase=model` reported
`data-showcase="model"`, model key `renderer-model-showcase`, three retained
parts, and `data-showcase-model-binding="retained"`. The capture visibly shows
the isolated composition and renderer debug panel; it is model-path evidence,
not game-room art approval.
