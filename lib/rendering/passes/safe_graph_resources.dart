import '../core/graph_resource.dart';

/// Shared resource identities for §6.1's mandatory safe graph (`world
/// opaque -> world transparent -> present`). One definition per resource so
/// `WorldFeature` and `PresentFeature` always agree on name/format/size —
/// disagreement here is exactly what RV-03's `formatOrSizeMismatch` check
/// exists to catch, so keeping one source avoids ever triggering it by
/// accident.
final class SafeGraphResources {
  const SafeGraphResources._();

  static const ResourceRef sceneColor = ResourceRef(
    name: 'sceneColor',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );

  static const ResourceRef presentTarget = ResourceRef(
    name: 'present',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
