import 'dart:convert';
import 'dart:typed_data';

import '../importers/fbx_import_config.dart';
import '../importers/gltf_normalizer.dart';
import 'model_package_manifest.dart';

/// Emits a deterministic CPU model package from normalized scene records.
final class ModelPackageEmitter {
  static ({ModelPackageManifest manifest, Map<String, Uint8List> payloads})
  emit({
    required String assetId,
    required String sourceFormat,
    required GltfNormalizedScene scene,
    required Map<String, Uint8List> payloads,
  }) {
    final parts = [
      for (var index = 0; index < scene.primitives.length; index++)
        ModelPackagePart(
          id: 'primitive-${index.toString().padLeft(3, '0')}',
          materialSlot: scene.primitives[index].materialIndex,
          lodFiles: {
            'LOD0': 'primitive-${index.toString().padLeft(3, '0')}.qmesh',
          },
        ),
    ];
    // Keep materialSlot valid for deliberately unmaterialed source primitives.
    // A stable default slot is preferable to inventing a renderer fallback.
    final materials = scene.materials.isEmpty
        ? ['default']
        : [for (final material in scene.materials) material.name];
    final base = ModelPackageManifest(
      assetId: assetId,
      packageHash: '0' * 64,
      sourceFormat: sourceFormat,
      parts: parts,
      materials: materials,
      provenance: {'sourceFormat': sourceFormat},
    );
    final hash = computePackageHash(base, payloads);
    return (
      manifest: ModelPackageManifest(
        assetId: assetId,
        packageHash: hash,
        sourceFormat: sourceFormat,
        parts: parts,
        materials: materials,
        provenance: {'sourceFormat': sourceFormat},
      ),
      payloads: {
        for (final entry in payloads.entries)
          entry.key: Uint8List.fromList(entry.value),
      },
    );
  }

  static String computePackageHash(
    ModelPackageManifest manifest,
    Map<String, Uint8List> payloads,
  ) {
    final bytes = <int>[
      ...utf8.encode(manifest.canonicalJson(includeHash: false)),
    ];
    final paths = payloads.keys.toList()..sort();
    for (final path in paths) {
      bytes.addAll(utf8.encode(path));
      bytes.add(0);
      bytes.addAll(payloads[path]!);
    }
    return Sha256.compute(bytes);
  }
}
