# PLIB-03 Downstream Host

`tools/test_plib03_downstream_host.dart` is a neutral consumer fixture. It
imports only the stable and advanced Pixeldart facades plus a fixture-owned
fake backend. It does not import The Quarantine, read game assets, touch the
DOM, or reach renderer implementation paths.

The fixture initializes a safe renderer, creates a retained world, submits one
real frame, then disposes the world and renderer. The fake device must report
zero live GPU objects afterward, proving the downstream ownership boundary is
complete.
