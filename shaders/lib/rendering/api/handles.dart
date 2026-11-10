sealed class ResourceHandle {
  final int slot;
  final int generation;
  final String? debugLabel;

  const ResourceHandle(this.slot, this.generation, this.debugLabel);

  bool get isValid => slot >= 0;

  @override
  bool operator ==(Object other) =>
      other.runtimeType == runtimeType &&
      other is ResourceHandle &&
      slot == other.slot &&
      generation == other.generation;

  @override
  int get hashCode => Object.hash(runtimeType, slot, generation);
}

final class MeshHandle extends ResourceHandle {
  const MeshHandle(super.slot, super.generation, [super.debugLabel]);

  static const MeshHandle invalid = MeshHandle(-1, 0);

  @override
  String toString() =>
      'MeshHandle(#$slot.$generation${_labelSuffix(debugLabel)})';
}

final class TextureHandle extends ResourceHandle {
  const TextureHandle(super.slot, super.generation, [super.debugLabel]);

  static const TextureHandle invalid = TextureHandle(-1, 0);

  @override
  String toString() =>
      'TextureHandle(#$slot.$generation${_labelSuffix(debugLabel)})';
}

final class MaterialHandle extends ResourceHandle {
  const MaterialHandle(super.slot, super.generation, [super.debugLabel]);

  static const MaterialHandle invalid = MaterialHandle(-1, 0);

  @override
  String toString() =>
      'MaterialHandle(#$slot.$generation${_labelSuffix(debugLabel)})';
}

final class SamplerHandle extends ResourceHandle {
  const SamplerHandle(super.slot, super.generation, [super.debugLabel]);

  static const SamplerHandle invalid = SamplerHandle(-1, 0);

  @override
  String toString() =>
      'SamplerHandle(#$slot.$generation${_labelSuffix(debugLabel)})';
}

final class PipelineHandle extends ResourceHandle {
  const PipelineHandle(super.slot, super.generation, [super.debugLabel]);

  static const PipelineHandle invalid = PipelineHandle(-1, 0);

  @override
  String toString() =>
      'PipelineHandle(#$slot.$generation${_labelSuffix(debugLabel)})';
}

final class InstanceId extends ResourceHandle {
  const InstanceId(super.slot, super.generation, [super.debugLabel]);

  static const InstanceId invalid = InstanceId(-1, 0);

  @override
  String toString() =>
      'InstanceId(#$slot.$generation${_labelSuffix(debugLabel)})';
}

String _labelSuffix(String? label) => label == null ? '' : ' "$label"';

enum HandleRejection {
  wrongKind,
  staleGeneration,
  doubleRelease,
  releasedResource,
}

final class HandleException implements Exception {
  final HandleRejection reason;
  final ResourceHandle handle;
  const HandleException(this.reason, this.handle);

  @override
  String toString() => 'HandleException(${reason.name}, $handle)';
}
