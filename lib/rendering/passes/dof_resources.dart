import '../core/graph_resource.dart';

final class DofResources {
  const DofResources._();

  static const ResourceRef dofBlurH = ResourceRef(
    name: 'dofBlurH',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef dofBlurV = ResourceRef(
    name: 'dofBlurV',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef dofOutput = ResourceRef(
    name: 'dofOutput',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
