enum ResourceFormat { rgba8, rgba16f, depth24, depth32f }

enum GraphStage {
  beforeShadow,
  afterShadow,
  beforeDepth,
  afterDepth,
  beforeWorld,
  afterWorld,
  afterResolve,
  beforeGrade,
  afterGrade,
  beforePresent,
}

final class ResourceRef {
  final String name;
  final ResourceFormat format;
  final int width;
  final int height;
  final int samples;
  final int version;

  const ResourceRef({
    required this.name,
    required this.format,
    required this.width,
    required this.height,
    this.samples = 1,
    this.version = 0,
  });

  bool get isMultisampled => samples > 1;

  ResourceRef nextVersion() => ResourceRef(
    name: name,
    format: format,
    width: width,
    height: height,
    samples: samples,
    version: version + 1,
  );

  bool sameResourceAs(ResourceRef other) => name == other.name;

  bool formatCompatibleWith(ResourceRef other) =>
      format == other.format &&
      width == other.width &&
      height == other.height &&
      samples == other.samples;

  @override
  bool operator ==(Object other) =>
      other is ResourceRef &&
      name == other.name &&
      format == other.format &&
      width == other.width &&
      height == other.height &&
      samples == other.samples &&
      version == other.version;

  @override
  int get hashCode =>
      Object.hash(name, format, width, height, samples, version);

  @override
  String toString() =>
      'ResourceRef($name#$version, $format, ${width}x$height'
      '${samples > 1 ? ' x$samples' : ''})';
}

final class HistoryRead {
  final String name;
  const HistoryRead(this.name);
}

enum ResourceAccess { read, write, historyRead, append }

final class ResourceUse {
  final ResourceRef resource;
  final ResourceAccess access;
  const ResourceUse(this.resource, this.access);
}
