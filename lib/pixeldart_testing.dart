/// Supported testing facade for Pixeldart contracts.
///
/// Test hosts use this surface for fake-device-compatible interfaces and
/// deterministic planning. The concrete fake device remains a fixture-owned
/// implementation so production packages do not ship test state.
library;

export 'rendering/api/capabilities.dart';
export 'rendering/api/configuration_transition.dart';
export 'rendering/api/frame.dart';
export 'rendering/api/handles.dart';
export 'rendering/api/renderer.dart';
export 'rendering/api/resource_plan.dart';
export 'rendering/api/scene.dart';
export 'rendering/api/stats.dart';
export 'rendering/core/lod_selection.dart';
export 'rendering/webgl/device_api.dart';
