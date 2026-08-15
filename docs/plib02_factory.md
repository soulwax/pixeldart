# PLIB-02 Factory Slice

`DefaultSceneRendererFactory` is the host-neutral construction seam for the
existing `SceneRendererImpl`. It stores no GPU state and performs no fallible
work until the returned renderer's `initialize` call. Hosts still provide the
appropriate `GpuDevice`; backend construction remains outside the stable
renderer lifecycle contract.

The fixture `tools/test_plib02_renderer_factory.dart` proves:

- construction leaves the fake device with zero live resources;
- initialization reaches `RendererState.ready`;
- `endFrame` without an active frame is rejected;
- disposal is idempotent and reaches `RendererState.disposed`.

The minimal standalone browser consumer is now `web/minimal/`: it imports the
public advanced facade plus the browser-only `WebGl2RendererFactory` entry
point, initializes one safe graph,
submits a real empty retained-world frame, and publishes `ready`,
`first-frame`, and `pixeldart` attributes. A headless Firefox launch at
640x360 verified those attributes and the continuous frame counter. The host
also owns resize publication and pauses submissions while the renderer reports
`contextLost`; a forced-loss/restore probe now returns to `ready` with a
monotonic frame counter and cleared frame error. Safe, standard, and high
profile queries all reach a first frame; standard uses an explicit
single-sample constraint while high exercises multisampling. Firefox probes
pass at desktop `1280x720` and mobile-sized `390x844` viewports, and a
WebGL-disabled mobile-sized context reports an explicit legacy fallback.
