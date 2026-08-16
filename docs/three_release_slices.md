# Three Release Slices

The next productization checks cover compatibility and packaging without
publishing anything:

1. `test_plib10_api_snapshot.dart` catches facade export drift.
2. `test_plib11_archive_manifest.dart` checks required files and generated-output
   exclusion for a candidate archive.
3. `test_package_boundaries.dart` runs these alongside neutrality, host, docs,
   sample-asset, and governance gates.

`dart pub publish --dry-run` is also part of release review. Its current
warnings about the established plural `docs/` and `tools/` directories are
intentional compatibility choices; a clean candidate must still be produced
from a clean git checkout before publication is considered.
