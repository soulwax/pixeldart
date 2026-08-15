# RF-00 Asset Boundary

Status: complete on 2026-08-15. This document freezes ownership before RF-01
moves implementation.

## Ownership

- `external/pixeldart/lib/assets/importers/**` will own reusable offline source
  records, provenance and neutral glTF validation.
- `external/pixeldart/lib/assets/packages/**` will own source-neutral immutable
  package records and CPU loading.
- `external/pixeldart/lib/rendering/assets/model_scene_binding.dart` will own
  transactional GPU/resource binding.
- `external/pixeldart/tools/assets/**` may use `dart:io` for converter commands
  and file-backed validation. No `lib/**` library may import `dart:io`.
- The game retains source packets, licensing decisions, placement, PVS,
  collision, focus, interactions, portal state and save identity.

## Frozen Prototype Symbols

The root prototypes remain in place until their named migration packet. They
are not new runtime API:

| Current project prototype | Planned replacement | Packet |
| --- | --- | --- |
| `FbxImportConfig`, `FbxPreflightResult`, `validateFbxGeneratedPackage` | split offline import/provenance/package records | RF-01/RF-04 |
| `FbxRuntimePackage`, `FbxRuntimePart` | `ModelPackageManifest`, `ModelPackageLoader` | RF-04/RF-05 |
| `FbxSceneBinding` | `ModelSceneBinding` | RF-06 |
| `FbxDiagnosticController` | model-package diagnostics controller | RF-07 |
| `fbx_pipeline.dart`, `fbx_normalize.dart`, Blender bridge | Pixeldart offline tools | RF-02/RF-03 |

`tools/assets/test_asset_import_boundary.dart` is the executable proof. It
rejects a Pixeldart-to-game package import, `dart:io` in Pixeldart libraries,
and game runtime imports of the current offline conversion implementation.
