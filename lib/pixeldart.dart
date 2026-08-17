/// Stable host facade for Pixeldart.
///
/// This surface contains contracts a game can safely retain across renderer
/// implementations. Backend construction, passes, generated shaders, and
/// concrete stores intentionally remain outside this library.
library;

export 'rendering/api/capabilities.dart';
export 'rendering/api/frame.dart';
export 'rendering/api/effects.dart';
export 'rendering/api/handles.dart';
export 'rendering/api/lights.dart';
export 'rendering/api/materials.dart';
export 'rendering/api/mesh.dart';
export 'rendering/api/renderer.dart';
export 'rendering/api/scene.dart';
export 'rendering/api/settings.dart';
export 'rendering/api/stats.dart';
export 'rendering/particles/atmospheric_particles.dart';
export 'rendering/atmosphere/volumetric_media.dart';
export 'rendering/atmosphere/thermal_field.dart';
export 'rendering/optics/reflection.dart';
export 'rendering/atmosphere/solar_cycle.dart';
export 'rendering/assets/model_definition.dart';
export 'rendering/assets/model_binding.dart';
export 'rendering/assets/model_scene_binding.dart';
export 'assets/packages/model_package.dart';
export 'assets/packages/model_package_loader.dart';
export 'assets/packages/model_package_manifest.dart';
export 'rendering/assets/model_package_diagnostics.dart';
export 'rendering/math/bounds.dart';
export 'rendering/math/mat4.dart';
export 'rendering/math/transform.dart';
export 'rendering/math/vec.dart';
