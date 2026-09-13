/// Stable host facade for Pixeldart.
///
/// This surface contains contracts a game can safely retain across renderer
/// implementations. Backend construction, passes, generated shaders, and
/// concrete stores intentionally remain outside this library.
library;

export 'rendering/api/capabilities.dart';
export 'rendering/api/frame.dart';
export 'rendering/api/frame_sequencer.dart';
export 'rendering/api/host_bootstrap.dart';
export 'rendering/api/effects.dart';
export 'rendering/api/handles.dart';
export 'rendering/api/lights.dart';
export 'rendering/api/materials.dart';
export 'rendering/api/mesh.dart';
export 'rendering/webgl/device_api.dart' show GpuTextureWrap, GpuTextureFilter;
export 'rendering/geometry/primitives.dart';
export 'rendering/geometry/procedural_textures.dart';
export 'rendering/geometry/terrain.dart';
export 'rendering/geometry/water_surface.dart';
export 'rendering/camera/camera_controller.dart';
export 'rendering/camera/orbit_camera.dart';
export 'rendering/camera/fly_camera.dart';
export 'rendering/camera/smooth_follow_camera.dart';
export 'rendering/camera/camera_shake.dart';
export 'rendering/camera/cinematic_tour_camera.dart';
export 'rendering/api/renderer.dart';
export 'rendering/api/scene.dart';
export 'rendering/scene/scene_node.dart';
export 'rendering/scene/instanced_mesh_node.dart';
export 'rendering/scene/animation.dart';
export 'rendering/math/curves.dart';
export 'rendering/math/spline.dart';
export 'rendering/api/settings.dart';
export 'rendering/api/stats.dart';
export 'rendering/particles/atmospheric_particles.dart';
export 'rendering/particles/atmospheric_presets.dart';
export 'rendering/particles/flow_particles.dart';
export 'rendering/particles/particle_emitter.dart';
export 'rendering/particles/particle_presets.dart';
export 'rendering/particles/particle_shapes.dart';
export 'rendering/scene/particle_emitter_node.dart';
export 'rendering/atmosphere/volumetric_media.dart';
export 'rendering/atmosphere/thermal_field.dart';
export 'rendering/optics/reflection.dart';
export 'rendering/optics/spherical_harmonics.dart';
export 'rendering/optics/cascade_splits.dart';
export 'rendering/optics/environment_response.dart';
export 'rendering/optics/lens_optics.dart';
export 'rendering/optics/camera_motion.dart';
export 'rendering/optics/gerstner_waves.dart';
export 'rendering/optics/buoyant_craft.dart';
export 'rendering/atmosphere/solar_cycle.dart';
export 'rendering/assets/model_definition.dart';
export 'rendering/assets/model_binding.dart';
export 'rendering/assets/model_scene_binding.dart';
export 'assets/packages/model_package.dart';
export 'assets/packages/model_package_loader.dart';
export 'assets/packages/model_package_manifest.dart';
export 'rendering/assets/model_package_diagnostics.dart';
export 'rendering/assets/glb_decoder.dart';
export 'rendering/math/bounds.dart';
export 'rendering/math/ray.dart';
export 'rendering/math/mat4.dart';
export 'rendering/math/quat.dart';
export 'rendering/math/transform.dart';
export 'rendering/math/vec.dart';
