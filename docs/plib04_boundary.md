# PLIB-04 Boundary Gate

`tools/test_plib04_boundary.dart` is a VM-safe static guard for the migration
boundary. It verifies that the browser composition root has no FBX-specific
diagnostic imports or telemetry, that the advanced facade does not expose the
concrete `ModelCache`, and that the explicit testing facade retains the cache
fixture seam required by legacy offline package tests.

This is intentionally not a model-format test. The older generated FBX
manifest wrappers remain offline compatibility tools until they are replaced by
the source-neutral `ValidatedModelPackage` and `ModelPackageSceneBinding` path.
Those wrappers are not a supported browser/runtime integration surface.
