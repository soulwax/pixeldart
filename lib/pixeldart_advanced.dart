/// Advanced Pixeldart facade for hosts that own renderer policy.
///
/// Stable application contracts should import `pixeldart.dart`; this library
/// exposes graph planning, capability negotiation, residency, and pass-level
/// controls that can change as the renderer evolves.
library;

export 'rendering/rendering.dart';
export 'rendering/api/renderer_factory.dart';
export 'rendering/core/feature_installation_planner.dart';
export 'rendering/core/lod_selection.dart';
export 'rendering/core/program_set_planner.dart';
export 'rendering/webgl/capability_selection.dart';
export 'rendering/assets/material_residency.dart';
export 'rendering/assets/texture_residency.dart';
export 'rendering/assets/browser_promotion.dart';
export 'rendering/assets/browser_lifecycle_promotion.dart';
export 'rendering/assets/browser_performance_promotion.dart';
