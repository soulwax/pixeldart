/// Stable public facade for the model-package pipeline.
///
/// RF-00 intentionally exports empty target libraries only. Subsequent RF
/// packets add immutable source-neutral records here without exposing FBX
/// runtime types.
library;

export 'importers/asset_import_diagnostic.dart';
export 'importers/asset_tool_command.dart';
export 'importers/asset_import_limits.dart';
export 'importers/fbx_import_config.dart';
export 'importers/fbx_import_provenance.dart';
export 'importers/gltf_container.dart';
export 'importers/gltf_normalizer.dart';
export 'importers/gltf_validator.dart';
export 'packages/model_package.dart';
export 'packages/model_package_loader.dart';
export 'packages/model_package_manifest.dart';
export 'packages/model_package_validator.dart';
