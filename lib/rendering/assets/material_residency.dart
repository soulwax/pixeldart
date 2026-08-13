import '../api/materials.dart';
import '../api/handles.dart';
import 'texture_residency.dart';

enum MaterialResidencyStatus { resident, pending, missing, evicted }

final class MaterialResidencyRequest {
  final String key;
  final MaterialDefinition material;
  final int priority;

  const MaterialResidencyRequest({
    required this.key,
    required this.material,
    this.priority = 0,
  });

  void validate() {
    if (key.isEmpty) throw ArgumentError('material residency key is empty');
    material.validate();
  }
}

final class MaterialResidencyResult {
  final MaterialResidencyRequest request;
  final MaterialResidencyStatus status;
  final Map<String, TextureResidencyStatus> textures;

  MaterialResidencyResult({
    required this.request,
    required this.status,
    required Map<String, TextureResidencyStatus> textures,
  }) : textures = Map.unmodifiable(textures);

  bool get isUsable => status == MaterialResidencyStatus.resident;
}

final class MaterialResidencyReport {
  final List<MaterialResidencyResult> results;

  MaterialResidencyReport(Iterable<MaterialResidencyResult> results)
    : results = List.unmodifiable(results);

  int get residentCount => _count(MaterialResidencyStatus.resident);
  int get pendingCount => _count(MaterialResidencyStatus.pending);
  int get missingCount => _count(MaterialResidencyStatus.missing);
  int get evictedCount => _count(MaterialResidencyStatus.evicted);

  int _count(MaterialResidencyStatus status) =>
      results.where((result) => result.status == status).length;
}

/// Aggregates the existing texture residency planner into material-level
/// diagnostics. It never owns or creates a texture/material resource.
final class MaterialResidencyManager {
  final TextureResidencyManager textures;

  MaterialResidencyManager(this.textures);

  MaterialResidencyReport prewarm(Iterable<MaterialResidencyRequest> requests) {
    final byKey = <String, MaterialResidencyRequest>{};
    final textureRequests = <TextureResidencyRequest>[];
    final textureKeyByMaterial = <String, Map<String, String>>{};
    for (final request in requests) {
      request.validate();
      if (byKey.containsKey(request.key)) {
        throw ArgumentError(
          'material residency keys must be unique: ${request.key}',
        );
      }
      byKey[request.key] = request;
      final keys = <String, String>{};
      for (final (slot, handle) in _textureSlots(request.material)) {
        final textureKey = '${request.key}:$slot';
        keys[slot] = textureKey;
        textureRequests.add(
          TextureResidencyRequest(
            key: textureKey,
            handle: handle,
            priority: request.priority,
          ),
        );
      }
      textureKeyByMaterial[request.key] = keys;
    }

    final textureReport = textures.prewarm(textureRequests);
    final byTextureKey = <String, TextureResidencyStatus>{
      for (final result in textureReport.results)
        result.request.key: result.status,
    };
    final ordered = byKey.values.toList()
      ..sort((a, b) {
        final priority = b.priority.compareTo(a.priority);
        return priority == 0 ? a.key.compareTo(b.key) : priority;
      });
    return MaterialResidencyReport([
      for (final request in ordered)
        _result(request, textureKeyByMaterial[request.key]!, byTextureKey),
    ]);
  }

  MaterialResidencyResult _result(
    MaterialResidencyRequest request,
    Map<String, String> textureKeys,
    Map<String, TextureResidencyStatus> statuses,
  ) {
    final textureStatuses = <String, TextureResidencyStatus>{
      for (final entry in textureKeys.entries)
        entry.key: statuses[entry.value]!,
    };
    return MaterialResidencyResult(
      request: request,
      status: aggregate(textureStatuses.values),
      textures: textureStatuses,
    );
  }

  static MaterialResidencyStatus aggregate(
    Iterable<TextureResidencyStatus> statuses,
  ) {
    var result = MaterialResidencyStatus.resident;
    for (final status in statuses) {
      final next = switch (status) {
        TextureResidencyStatus.resident => MaterialResidencyStatus.resident,
        TextureResidencyStatus.pending => MaterialResidencyStatus.pending,
        TextureResidencyStatus.missing => MaterialResidencyStatus.missing,
        TextureResidencyStatus.evicted => MaterialResidencyStatus.evicted,
      };
      if (_severity(next) > _severity(result)) result = next;
    }
    return result;
  }

  static int _severity(MaterialResidencyStatus status) => switch (status) {
    MaterialResidencyStatus.resident => 0,
    MaterialResidencyStatus.pending => 1,
    MaterialResidencyStatus.missing => 2,
    MaterialResidencyStatus.evicted => 3,
  };
}

Iterable<(String, TextureHandle)> _textureSlots(
  MaterialDefinition material,
) sync* {
  if (material.albedoTexture != null) yield ('albedo', material.albedoTexture!);
  if (material.normalTexture != null) yield ('normal', material.normalTexture!);
  if (material.ormTexture != null) yield ('orm', material.ormTexture!);
  if (material.emissiveTexture != null) {
    yield ('emissive', material.emissiveTexture!);
  }
  if (material.lightmapTexture != null) {
    yield ('lightmap', material.lightmapTexture!);
  }
}
