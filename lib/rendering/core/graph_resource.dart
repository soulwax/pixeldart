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

/// A typed graph edge (§6.2: "Every edge is an explicit typed resource").
/// [version] distinguishes successive writes to the same logical resource —
/// reading and writing the same attachment version without a declared
/// ping-pong pair is a validation failure, not merely discouraged.
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
  String toString() =>
      'ResourceRef($name#$version, $format, ${width}x$height'
      '${samples > 1 ? ' x$samples' : ''})';
}

/// A resource read declared to consume the immediately preceding frame's
/// history rather than the current frame's write, per §6.5. The graph
/// rejects this if no valid previous-frame version exists yet (a fresh
/// history epoch).
final class HistoryRead {
  final String name;
  const HistoryRead(this.name);
}

enum ResourceAccess { read, write, historyRead }

final class ResourceUse {
  final ResourceRef resource;
  final ResourceAccess access;
  const ResourceUse(this.resource, this.access);
}
