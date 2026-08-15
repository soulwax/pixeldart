import 'dart:typed_data';

import 'model_package.dart';
import 'model_package_emitter.dart';
import 'model_package_manifest.dart';
import 'model_package_validator.dart';

/// Resource bounds applied before package bytes enter a decoder or cache.
final class ModelPackageLimits {
  final int maxPayloadBytes;
  final int maxTotalBytes;

  const ModelPackageLimits({
    this.maxPayloadBytes = 64 * 1024 * 1024,
    this.maxTotalBytes = 256 * 1024 * 1024,
  }) : assert(maxPayloadBytes > 0),
       assert(maxTotalBytes >= maxPayloadBytes);
}

/// Source of immutable package metadata and payload bytes.
final class ModelPackageSource {
  final ModelPackageManifest manifest;
  final Future<Uint8List> Function(String path) load;

  const ModelPackageSource({required this.manifest, required this.load});
}

/// Validates and loads a model package without allocating renderer resources.
final class ModelPackageLoader {
  const ModelPackageLoader();

  Future<ValidatedModelPackage> load(
    ModelPackageSource source, {
    ModelPackageLimits limits = const ModelPackageLimits(),
  }) async {
    final manifestErrors = validateModelPackageManifest(source.manifest);
    if (manifestErrors.isNotEmpty) {
      throw FormatException(
        manifestErrors.map((error) => error.message).join('; '),
      );
    }
    final payloads = <String, Uint8List>{};
    for (final part in source.manifest.parts) {
      for (final path in part.lodFiles.values) {
        if (payloads.containsKey(path)) continue;
        final bytes = await source.load(path);
        if (bytes.length > limits.maxPayloadBytes) {
          throw FormatException('model package payload exceeds limit: $path');
        }
        final totalBytes =
            payloads.values.fold<int>(
              0,
              (total, value) => total + value.length,
            ) +
            bytes.length;
        if (totalBytes > limits.maxTotalBytes) {
          throw const FormatException('model package exceeds total byte limit');
        }
        payloads[path] = Uint8List.fromList(bytes);
      }
    }
    final expected = ModelPackageEmitter.computePackageHash(
      source.manifest,
      payloads,
    );
    if (expected != source.manifest.packageHash) {
      throw const FormatException('model package payload hash mismatch');
    }
    return ValidatedModelPackage(manifest: source.manifest, payloads: payloads);
  }
}
