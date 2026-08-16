# PLIB-09 Package Content Guard

`tools/test_plib09_package_content.dart` is an offline release hygiene check.
It rejects host-package imports, credential-like tokens, absolute local paths,
and checked-in generated `build/` or `dist/` output under Pixeldart. It does not
replace licence/provenance review or a clean archive dry-run.
