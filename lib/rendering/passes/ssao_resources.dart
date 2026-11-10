import '../core/graph_resource.dart';

final class SsaoResources {
  const SsaoResources._();

  static const ResourceRef ssaoRaw = ResourceRef(
    name: 'ssaoRaw',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef ssaoBlurred = ResourceRef(
    name: 'ssaoBlurred',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );
}
