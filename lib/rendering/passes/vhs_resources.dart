import '../core/graph_resource.dart';

final class VhsResources {
  const VhsResources._();

  static const ResourceRef vhsOutput = ResourceRef(
    name: 'vhsOutput',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
